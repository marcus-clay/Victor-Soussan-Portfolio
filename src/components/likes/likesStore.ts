'use client'

/**
 * The shared state of the likes of the page.
 *
 * Every like button announces its key here; the keys announced within the same ~50 ms are asked
 * together in ONE `GET /api/likes?keys=...`, whatever the number of visuals on the page. The state is
 * shared, so two buttons of the same media (the visual and its lightbox) always agree.
 *
 * A click updates the screen at once and is sent behind it; if the service refuses, the state goes back
 * to what the service last confirmed. Clicks that come while a request is in flight are merged: only the
 * state the visitor ends on is sent.
 *
 * The visitor is an anonymous random id drawn once and kept in localStorage (`vs-visitor`), sent in the
 * `x-visitor` header. No cookie, nothing personal.
 */

import { useCallback, useEffect, useSyncExternalStore } from 'react'

export interface LikeEntry {
  count: number
  liked: boolean
  /** The service has answered for this key */
  ready: boolean
}

const EMPTY: LikeEntry = { count: 0, liked: false, ready: false }
const VISITOR_KEY = 'vs-visitor'
const BATCH_DELAY = 50
const BATCH_SIZE = 30
const ENDPOINT = '/api/likes'

/** null = not known yet, false = the service is off (nothing is drawn) */
let enabled: boolean | null = null
const entries = new Map<string, LikeEntry>()
const confirmed = new Map<string, { count: number; liked: boolean }>()
const requested = new Set<string>()
const queue = new Set<string>()
const busy = new Set<string>()
const listeners = new Set<() => void>()
let timer: ReturnType<typeof setTimeout> | null = null
let memoryVisitor: string | null = null

function emit() {
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function setEntry(key: string, next: LikeEntry) {
  entries.set(key, next)
  emit()
}

function visitorId(): string {
  try {
    const stored = window.localStorage.getItem(VISITOR_KEY)
    if (stored && /^[A-Za-z0-9_-]{16,64}$/.test(stored)) return stored
    const fresh = randomId()
    window.localStorage.setItem(VISITOR_KEY, fresh)
    return fresh
  } catch {
    // Storage is blocked: the id lives as long as the page
    return (memoryVisitor ??= randomId())
  }
}

function randomId(): string {
  const bytes = new Uint8Array(18)
  crypto.getRandomValues(bytes)
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/* --------------------------------- reading ---------------------------------- */

function schedule() {
  if (timer) return
  timer = setTimeout(flush, BATCH_DELAY)
}

async function flush() {
  timer = null
  const keys = Array.from(queue)
  queue.clear()
  if (!keys.length) return
  for (let i = 0; i < keys.length; i += BATCH_SIZE) {
    void fetchBatch(keys.slice(i, i + BATCH_SIZE))
  }
}

async function fetchBatch(keys: string[]) {
  try {
    const res = await fetch(`${ENDPOINT}?keys=${encodeURIComponent(keys.join(','))}`, {
      headers: { 'x-visitor': visitorId() },
    })
    if (!res.ok) throw new Error(String(res.status))
    const data = (await res.json()) as { enabled?: boolean; counts?: Record<string, number>; liked?: Record<string, boolean> }
    if (!data.enabled) {
      enabled = false
      emit()
      return
    }
    enabled = true
    for (const key of keys) {
      // A click made while the answer was coming wins over the answer
      if (busy.has(key)) continue
      const state = { count: Number(data.counts?.[key]) || 0, liked: Boolean(data.liked?.[key]) }
      confirmed.set(key, state)
      entries.set(key, { ...state, ready: true })
    }
    emit()
  } catch {
    // Unreachable service: draw nothing rather than a counter that cannot be trusted
    if (enabled === null) {
      enabled = false
      emit()
    }
  }
}

function announce(key: string) {
  if (requested.has(key)) return
  requested.add(key)
  queue.add(key)
  schedule()
}

/* --------------------------------- writing ---------------------------------- */

async function post(key: string, liked: boolean): Promise<{ count: number; liked: boolean }> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-visitor': visitorId() },
    body: JSON.stringify({ key, liked }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(String(res.status))
  return (await res.json()) as { count: number; liked: boolean }
}

async function sync(key: string) {
  if (busy.has(key)) return
  busy.add(key)
  try {
    for (;;) {
      const target = entries.get(key)?.liked ?? false
      const base = confirmed.get(key) ?? { count: 0, liked: false }
      if (target === base.liked) break
      try {
        const result = await post(key, target)
        confirmed.set(key, { count: result.count, liked: result.liked })
        const current = entries.get(key) ?? EMPTY
        // If the visitor clicked again meanwhile, keep what they see; the next turn sends it
        setEntry(key, current.liked === result.liked ? { count: result.count, liked: result.liked, ready: true } : { ...current, count: Math.max(0, result.count + (current.liked ? 1 : 0) - (result.liked ? 1 : 0)) })
      } catch {
        const back = confirmed.get(key) ?? { count: 0, liked: false }
        setEntry(key, { ...back, ready: true })
        break
      }
    }
  } finally {
    busy.delete(key)
  }
}

function toggle(key: string) {
  const current = entries.get(key) ?? EMPTY
  if (!current.ready) return
  const liked = !current.liked
  setEntry(key, { count: Math.max(0, current.count + (liked ? 1 : -1)), liked, ready: true })
  void sync(key)
}

/* --------------------------------- hooks ------------------------------------ */

const getEnabled = () => enabled
const getServerEnabled = () => null

export interface UseLike {
  /** null until the service has answered; false when it is off */
  enabled: boolean | null
  count: number
  liked: boolean
  ready: boolean
  toggle: () => void
}

/**
 * The like state of a media. `active` false (a button that is not drawn, for instance on a touch
 * screen) keeps the key out of the request.
 */
export function useLike(key: string, active = true): UseLike {
  useEffect(() => {
    if (active) announce(key)
  }, [key, active])

  const isEnabled = useSyncExternalStore(subscribe, getEnabled, getServerEnabled)
  const entry = useSyncExternalStore(
    subscribe,
    () => entries.get(key) ?? EMPTY,
    () => EMPTY,
  )
  const onToggle = useCallback(() => toggle(key), [key])
  return { enabled: isEnabled, count: entry.count, liked: entry.liked, ready: entry.ready, toggle: onToggle }
}
