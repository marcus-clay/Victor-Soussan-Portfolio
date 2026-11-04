import { createHash } from 'node:crypto'
import { NextResponse, type NextRequest } from 'next/server'
import { isMediaKey } from '@/lib/mediaKey'

/**
 * Likes of the visuals of the site.
 *
 *   GET  /api/likes?keys=a,b,c   ->  { enabled, counts: { a: 3 }, liked: { a: true } }
 *   POST /api/likes {key, liked} ->  { count, liked }
 *
 * One like per visitor and per media: each key is a SET of visitors (Redis SADD / SREM / SCARD /
 * SISMEMBER), never a bare counter. The visitor is an anonymous random id the browser draws once
 * and sends in the `x-visitor` header (no cookie, no IP address, nothing personal); it is hashed
 * before it is stored.
 *
 * Storage: Upstash Redis through its REST API (plain `fetch`, no dependency), configured by
 * UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_URL / KV_REST_API_TOKEN, the
 * names Vercel injects). Without them, development uses a memory store so everything can be tried;
 * production answers `enabled: false` and the interface draws nothing.
 */

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || ''
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || ''
const HAS_REDIS = Boolean(REDIS_URL && REDIS_TOKEN)
const ENABLED = HAS_REDIS || process.env.NODE_ENV !== 'production'

const MAX_KEYS = 40
const WRITES_PER_MINUTE = 30
const VISITOR_PATTERN = /^[A-Za-z0-9_-]{16,64}$/
const PREFIX = 'vs:likes:'

type Command = (string | number)[]

/* ---------------------------------------------------------------------------------------------
 * Stores
 * ------------------------------------------------------------------------------------------- */

interface Store {
  /** Likes count and whether `visitor` likes, for each key */
  read(keys: string[], visitor: string | null): Promise<{ counts: Record<string, number>; liked: Record<string, boolean> }>
  /** Adds or removes the like, and returns the new state */
  write(key: string, visitor: string, liked: boolean): Promise<{ count: number; liked: boolean }>
  /** Counts a write of this visitor in the current minute; true while under the limit */
  allow(visitor: string): Promise<boolean>
}

async function redis(commands: Command[]): Promise<unknown[]> {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`redis ${res.status}`)
  const out = (await res.json()) as { result?: unknown; error?: string }[]
  return out.map((entry) => {
    if (entry.error) throw new Error(entry.error)
    return entry.result
  })
}

const redisStore: Store = {
  async read(keys, visitor) {
    const commands: Command[] = []
    for (const key of keys) {
      commands.push(['SCARD', PREFIX + key])
      if (visitor) commands.push(['SISMEMBER', PREFIX + key, visitor])
    }
    const results = commands.length ? await redis(commands) : []
    const counts: Record<string, number> = {}
    const liked: Record<string, boolean> = {}
    let i = 0
    for (const key of keys) {
      counts[key] = Number(results[i++]) || 0
      liked[key] = visitor ? Number(results[i++]) === 1 : false
    }
    return { counts, liked }
  },
  async write(key, visitor, liked) {
    const [, count] = await redis([[liked ? 'SADD' : 'SREM', PREFIX + key, visitor], ['SCARD', PREFIX + key]])
    return { count: Number(count) || 0, liked }
  },
  async allow(visitor) {
    const rateKey = `vs:rl:${visitor}`
    const [count] = await redis([['INCR', rateKey], ['EXPIRE', rateKey, 60, 'NX']])
    return Number(count) <= WRITES_PER_MINUTE
  },
}

/** Development only: lives as long as the server process */
const globalForLikes = globalThis as unknown as {
  __vsLikes?: Map<string, Set<string>>
  __vsLikesRate?: Map<string, { count: number; reset: number }>
}
const memorySets = (globalForLikes.__vsLikes ??= new Map())
const memoryRate = (globalForLikes.__vsLikesRate ??= new Map())

const memoryStore: Store = {
  async read(keys, visitor) {
    const counts: Record<string, number> = {}
    const liked: Record<string, boolean> = {}
    for (const key of keys) {
      const set = memorySets.get(key)
      counts[key] = set?.size ?? 0
      liked[key] = Boolean(visitor && set?.has(visitor))
    }
    return { counts, liked }
  },
  async write(key, visitor, liked) {
    let set = memorySets.get(key)
    if (!set) memorySets.set(key, (set = new Set()))
    if (liked) set.add(visitor)
    else set.delete(visitor)
    return { count: set.size, liked }
  },
  async allow(visitor) {
    const now = Date.now()
    const entry = memoryRate.get(visitor)
    if (!entry || entry.reset < now) {
      memoryRate.set(visitor, { count: 1, reset: now + 60_000 })
      return true
    }
    entry.count += 1
    return entry.count <= WRITES_PER_MINUTE
  },
}

const store: Store = HAS_REDIS ? redisStore : memoryStore

/* ---------------------------------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------------------------------- */

/** The stored form of a visitor id: a hash, so the raw id never sits in the database */
function visitorOf(request: NextRequest): string | null {
  const raw = request.headers.get('x-visitor')
  if (!raw || !VISITOR_PATTERN.test(raw)) return null
  return createHash('sha256').update(raw).digest('hex').slice(0, 32)
}

function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin')
  if (!origin) return true
  try {
    return new URL(origin).host === request.headers.get('host')
  } catch {
    return false
  }
}

const NO_STORE = { 'Cache-Control': 'no-store' }

/* ---------------------------------------------------------------------------------------------
 * Routes
 * ------------------------------------------------------------------------------------------- */

export async function GET(request: NextRequest) {
  if (!ENABLED) {
    return NextResponse.json(
      { enabled: false, counts: {}, liked: {} },
      { headers: { 'Cache-Control': 'public, max-age=60, s-maxage=300' } },
    )
  }

  const raw = request.nextUrl.searchParams.get('keys') ?? ''
  const keys = Array.from(new Set(raw.split(',').filter(isMediaKey))).slice(0, MAX_KEYS)
  const visitor = visitorOf(request)

  try {
    const { counts, liked } = await store.read(keys, visitor)
    return NextResponse.json(
      { enabled: true, counts, liked },
      // The answer depends on the visitor: private, and only for a few seconds
      { headers: { 'Cache-Control': 'private, max-age=3', Vary: 'x-visitor' } },
    )
  } catch {
    // The service is out of reach: the interface draws nothing rather than a broken counter
    return NextResponse.json({ enabled: false, counts: {}, liked: {} }, { headers: NO_STORE })
  }
}

export async function POST(request: NextRequest) {
  if (!ENABLED) return NextResponse.json({ error: 'disabled' }, { status: 503, headers: NO_STORE })
  if (!sameOrigin(request)) return NextResponse.json({ error: 'forbidden' }, { status: 403, headers: NO_STORE })

  const visitor = visitorOf(request)
  if (!visitor) return NextResponse.json({ error: 'visitor' }, { status: 400, headers: NO_STORE })

  let body: { key?: unknown; liked?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'body' }, { status: 400, headers: NO_STORE })
  }
  if (typeof body.key !== 'string' || !isMediaKey(body.key) || typeof body.liked !== 'boolean') {
    return NextResponse.json({ error: 'body' }, { status: 400, headers: NO_STORE })
  }

  try {
    if (!(await store.allow(visitor))) {
      return NextResponse.json({ error: 'rate' }, { status: 429, headers: { ...NO_STORE, 'Retry-After': '60' } })
    }
    const result = await store.write(body.key, visitor, body.liked)
    return NextResponse.json(result, { headers: NO_STORE })
  } catch {
    return NextResponse.json({ error: 'unavailable' }, { status: 503, headers: NO_STORE })
  }
}
