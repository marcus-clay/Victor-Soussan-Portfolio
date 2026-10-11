// Downscales oversized WebP/JPG/PNG files in place (max width 2200px, ~2x the widest layout).
// usage: node scripts/downscale-images.mjs [--apply] dir [dir...]
import sharp from 'sharp'
import { readdir, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const MAX = 2200
const args = process.argv.slice(2)
const apply = args.includes('--apply')
const dirs = args.filter((a) => !a.startsWith('--'))

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) yield* walk(p)
    else yield p
  }
}

let n = 0, before = 0, after = 0
for (const dir of dirs) {
  for await (const file of walk(dir)) {
    if (!/\.(webp|jpe?g)$/i.test(file)) continue
    let meta
    try { meta = await sharp(file).metadata() } catch { continue }
    if (!meta.width || meta.width <= MAX) continue
    const size = (await stat(file)).size
    const pipeline = sharp(file).rotate().resize({ width: MAX, withoutEnlargement: true })
    const out = /\.webp$/i.test(file) ? pipeline.webp({ quality: 80, effort: 5 }) : pipeline.jpeg({ quality: 82, mozjpeg: true })
    const buf = await out.toBuffer()
    // Never make a file bigger
    const newSize = Math.min(buf.length, size)
    n++; before += size; after += newSize
    if (apply && buf.length < size) {
      await writeFile(file, buf)
    }
  }
}
console.log(`${apply ? 'applied' : 'dry run'}: ${n} files, ${(before / 1e6).toFixed(1)} MB -> ${(after / 1e6).toFixed(1)} MB`)
