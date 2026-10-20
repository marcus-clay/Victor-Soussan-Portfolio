// Crawls every URL of sitemap.xml and checks what Google reads: HTTP status, canonical
// (self-referencing), title and description length, robots, one h1, hreflang and JSON-LD validity.
// Run against a running server: npm run audit:sitemap -- http://localhost:3000
// Exit code 1 when a problem is found.
const BASE = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '')
const TITLE_MAX = 62
const DESC_MIN = 120
const DESC_MAX = 158
const CONCURRENCY = 6

const decode = (s) =>
  s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

const attr = (tag, name) => decode(tag.match(new RegExp(`${name}=["']([^"']*)["']`, 'i'))?.[1] ?? '')

async function sitemapUrls() {
  const res = await fetch(`${BASE}/sitemap.xml`)
  if (!res.ok) throw new Error(`sitemap.xml answered ${res.status}`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
}

// The sitemap lists production URLs; fetch the same path from the server under test.
const toLocal = (url) => `${BASE}${new URL(url).pathname}`

async function audit(url) {
  const problems = []
  const res = await fetch(toLocal(url), { redirect: 'manual' })
  if (res.status !== 200) return [`status ${res.status}`]
  const html = await res.text()

  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '')
  if (!title) problems.push('missing title')
  else if (title.length > TITLE_MAX) problems.push(`title ${title.length} chars: ${title}`)
  else if (title.endsWith('…')) problems.push(`title clipped: ${title}`)

  const metaTags = html.match(/<meta [^>]*>/g) ?? []
  const description = decode(
    attr(metaTags.find((t) => /name=["']description["']/.test(t)) ?? '', 'content'),
  )
  if (!description) problems.push('missing description')
  else if (description.length < DESC_MIN || description.length > DESC_MAX)
    problems.push(`description ${description.length} chars`)

  const robots = attr(metaTags.find((t) => /name=["']robots["']/.test(t)) ?? '', 'content')
  if (/noindex/.test(robots)) problems.push('noindex page listed in the sitemap')

  const linkTags = html.match(/<link [^>]*>/g) ?? []
  const canonical = attr(linkTags.find((t) => /rel=["']canonical["']/.test(t)) ?? '', 'href')
  if (!canonical) problems.push('missing canonical')
  else if (canonical !== url) problems.push(`canonical differs from sitemap URL: ${canonical}`)

  const alternates = linkTags.filter((t) => /rel=["']alternate["']/.test(t) && /hreflang/i.test(t))
  if (!alternates.some((t) => /hreflang=["']x-default["']/i.test(t))) problems.push('missing x-default hreflang')

  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length
  if (h1Count !== 1) problems.push(`${h1Count} h1`)

  const htmlLang = html.match(/<html[^>]*\blang=["']([^"']+)["']/)?.[1]
  const pathLang = new URL(url).pathname.split('/')[1]
  if (htmlLang !== pathLang) problems.push(`html lang "${htmlLang}" differs from path "${pathLang}"`)

  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1])
    } catch {
      problems.push('invalid JSON-LD')
    }
  }
  return problems
}

const urls = await sitemapUrls()
const failures = []
let next = 0
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (next < urls.length) {
      const url = urls[next++]
      try {
        const problems = await audit(url)
        if (problems.length) failures.push({ url, problems })
      } catch (error) {
        failures.push({ url, problems: [`request failed: ${error.message}`] })
      }
    }
  }),
)

for (const { url, problems } of failures.sort((a, b) => a.url.localeCompare(b.url))) {
  console.log(`\n${url}`)
  for (const p of problems) console.log(`  - ${p}`)
}
console.log(`\n${urls.length} URLs checked, ${failures.length} with problems`)
process.exit(failures.length ? 1 : 0)
