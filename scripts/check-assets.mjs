// Fails when source code references a file in /public that does not exist, or when a
// file name in /public holds characters that break on Linux hosting (decomposed
// accents, mojibake). Run: npm run check:assets
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const PUBLIC = 'public'
const SOURCES = ['src', 'app']
const EXT = 'webp|png|jpe?g|gif|svg|mp4|webm|mov|pdf|ico|md|txt|woff2?|json|docx|pptx|avif'
const ref = new RegExp(`['"\`](/(?:images|videos|articles|cv|prototypes|fonts|icons|logos|assets|downloads|favicon[^'"\`\\n]*)[^'"\`\\n]*?\\.(?:${EXT}))['"\`]`, 'gi')

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    statSync(p).isDirectory() ? walk(p, out) : out.push(p)
  }
  return out
}

const problems = []

// 1. File names that are not stable across systems
for (const file of walk(PUBLIC)) {
  const rel = file.slice(PUBLIC.length)
  if (rel !== rel.normalize('NFC')) problems.push(`decomposed accent in file name: ${rel}`)
  if (/[─-╿ü]/.test(rel) && /[╠]/.test(rel)) problems.push(`mojibake in file name: ${rel}`)
}

// 2. References to files that do not exist
let checked = 0
for (const file of SOURCES.flatMap(d => walk(d)).filter(f => ['.ts', '.tsx', '.css'].includes(extname(f)))) {
  const text = readFileSync(file, 'utf8')
  for (const m of text.matchAll(ref)) {
    const path = m[1]
    if (path.includes('${')) continue
    checked++
    const clean = decodeURIComponent(path.split('?')[0].split('#')[0])
    if (!existsSync(join(PUBLIC, clean))) problems.push(`missing ${clean}  (in ${file})`)
  }
}

console.log(`${checked} asset references checked`)
if (problems.length) {
  console.error(problems.map(p => `  - ${p}`).join('\n'))
  process.exit(1)
}
console.log('no missing assets')
