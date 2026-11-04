/**
 * The stable identity of a media (an image or a video of the site), shared by the likes and by the shared links.
 * It is derived from the path of the file, never from its size or its format, so the same visual keeps one key
 * through every responsive size, optimisation or re-encoding: `/images/sqool/hero-01-800w.webp` and
 * `/images/sqool/hero-01.webp` are both `sqool/hero-01`.
 *
 * A key is lowercase, made of a-z, 0-9, `-`, `_` and `/`, and at most MAX_KEY characters: the likes service
 * and the `?m=` address of a shared media accept nothing else (see isMediaKey).
 */

export const MAX_KEY = 120

const KEY_PATTERN = /^[a-z0-9][a-z0-9/_-]{0,119}$/

/** True when `value` is a well-formed media key. */
export const isMediaKey = (value: string): boolean => KEY_PATTERN.test(value)

export function mediaKey(src: string): string {
  let path = src.split('#')[0].split('?')[0]
  // Remote files (Cloudinary and the like): keep the path after the host
  path = path.replace(/^https?:\/\/[^/]+/i, '')
  try {
    path = decodeURIComponent(path)
  } catch {
    /* keep the raw path */
  }
  const parts = path
    .toLowerCase()
    .replace(/\.[a-z0-9]{2,5}$/, '') // extension
    .replace(/-(compressed|optimized|poster|thumb)$/, '')
    .replace(/-\d{2,4}w$/, '') // responsive size suffix: -400w, -1200w
    .split('/')
    .filter(Boolean)
    // the folder that says what kind of file it is carries no identity
    .filter((p, i, all) => !(i === 0 && ['images', 'videos', 'public', 'image', 'video', 'upload'].includes(p) && all.length > 1))
  const key = parts
    .join('/')
    .replace(/[\s.]+/g, '-')
    .replace(/[^a-z0-9/_-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^[-/_]+|[-/_]+$/g, '')
  return key.length > MAX_KEY ? key.slice(-MAX_KEY).replace(/^[-/_]+/, '') : key
}
