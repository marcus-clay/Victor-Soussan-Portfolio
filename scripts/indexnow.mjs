#!/usr/bin/env node
/**
 * IndexNow: tells Bing (which feeds ChatGPT search), Yandex, Seznam and Naver that pages changed,
 * instead of waiting for their next crawl. Reads the live sitemap, so it only sends real, canonical URLs.
 *
 *   node scripts/indexnow.mjs          URLs whose lastmod is within the last 14 days, plus the homepages
 *   node scripts/indexnow.mjs --all    every URL of the sitemap (first submission, or after a site-wide change)
 *   node scripts/indexnow.mjs --dry    print what would be sent
 *
 * The key is public by design: it is served at /<key>.txt to prove the site owns the submission.
 */
const HOST = 'www.victorsoussan.fr'
const KEY = '1578b081d49cf8f55131e6007c4c14dd'
const RECENT_DAYS = 14

const args = new Set(process.argv.slice(2))
const all = args.has('--all')
const dry = args.has('--dry')

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text()
const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => ({
  loc: block.match(/<loc>(.*?)<\/loc>/)?.[1],
  lastmod: block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
}))

const since = Date.now() - RECENT_DAYS * 86_400_000
const homes = new Set([`https://${HOST}/fr`, `https://${HOST}/en`])
const urls = [
  ...new Set(
    entries
      .filter((e) => e.loc && (all || homes.has(e.loc) || (e.lastmod && Date.parse(e.lastmod) >= since)))
      .map((e) => e.loc)
  ),
  ...(all ? [`https://${HOST}/llms.txt`] : []),
]

console.log(`${urls.length} URL(s) of ${entries.length} in the sitemap`)
if (dry) {
  console.log(urls.join('\n'))
  process.exit(0)
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
})
// 200 and 202 both mean accepted; 403 means the key file is not reachable yet, 422 a URL outside the host
console.log(`IndexNow: ${res.status} ${res.statusText}`)
if (res.status >= 300) process.exit(1)
