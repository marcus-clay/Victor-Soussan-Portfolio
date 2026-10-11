// Converts heavy PNG/JPG files referenced by the code to WebP next to the original.
// usage: node scripts/optimize-images.mjs "public/images/a.png" "public/images/b.jpg" ...
import sharp from 'sharp'
import { stat } from 'node:fs/promises'

const MAX_WIDTH = 2000
for (const file of process.argv.slice(2)) {
  const out = file.replace(/\.(png|jpe?g)$/i, '.webp')
  const meta = await sharp(file).metadata()
  const width = Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH)
  await sharp(file).resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(out)
  const before = (await stat(file)).size
  const after = (await stat(out)).size
  console.log(`${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB  ${out}`)
}
