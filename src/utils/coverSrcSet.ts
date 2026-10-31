import { IMAGE_DIMENSIONS } from '@/data/imageDimensions'

/**
 * Covers that ship with 400w / 800w / 1200w variants next to their original (same folder, `-400w.webp`…),
 * so a phone or a small card never downloads the 2000 px file. Add a cover here once its variants exist.
 */
const RESPONSIVE_COVERS = new Set([
  '/images/thumbnail-toolkit.webp',
  '/images/thumbnail-dailymotion-web-platform.webp',
  '/images/thumbnail-connect.webp',
  '/images/thumbnail-sqool-suite.webp',
  '/images/thumbnail-pagesjaunes-multidevices.webp',
  '/images/francevae/thumbnail_france_vae.webp',
  '/images/pagesjaunes/Android%20wear/android_wear_thumbnail%2002.webp',
  '/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui%20modes.webp',
  '/images/riskos/cover-riskos-ipad-v2.webp',
  '/images/tessan/cover_tessan_app_v3.webp',
  '/images/tessan/cover_tessan_hub_v6.webp',
  '/images/tessan/cover_tessan_os.webp',
  '/images/tessan/cover_tessan_systeme.webp',
  '/images/thumbnail_sqool_classe.webp',
  '/images/thumbnail_condamine_apps.webp',
])

/** srcset of a cover with variants (the original listed at its real width), undefined otherwise */
export function coverSrcSet(src: string): string | undefined {
  if (!RESPONSIVE_COVERS.has(src)) return undefined
  const base = src.replace(/\.webp$/, '')
  const width = (IMAGE_DIMENSIONS[src] ?? IMAGE_DIMENSIONS[decodeURIComponent(src)])?.[0] ?? 1920
  return `${base}-400w.webp 400w, ${base}-800w.webp 800w, ${base}-1200w.webp 1200w, ${src} ${width}w`
}
