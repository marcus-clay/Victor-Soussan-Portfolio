/**
 * Finding a shared media in the page: the element whose file has the key of the `?m=` address.
 * Works from what is in the DOM (src, srcset, poster, Next image proxy), so no page has to declare its media.
 */

import { mediaKey } from '@/lib/mediaKey'

/** The file behind an address, even when it goes through the Next image proxy (`/_next/image?url=…`) */
function sourceOf(raw: string | null): string | null {
  if (!raw) return null
  const first = raw.split(',')[0].trim().split(/\s+/)[0]
  if (!first || first.startsWith('data:')) return null
  const proxied = first.match(/[?&]url=([^&]+)/)
  if (first.includes('/_next/image') && proxied) {
    try {
      return decodeURIComponent(proxied[1])
    } catch {
      return null
    }
  }
  return first
}

function isVisible(el: HTMLElement): boolean {
  const r = el.getBoundingClientRect()
  return r.width >= 24 && r.height >= 24
}

/** The first element of the page showing this media, preferring one that has a size on screen. */
export function findMediaElement(key: string): HTMLElement | null {
  let fallback: HTMLElement | null = null
  const nodes = document.querySelectorAll<HTMLElement>('img, video, source')
  for (const node of Array.from(nodes)) {
    if (node.closest('[role="dialog"], [data-share-menu]')) continue
    const candidates = [node.getAttribute('src'), node.getAttribute('srcset'), node.getAttribute('poster'), (node as HTMLImageElement).currentSrc]
    const match = candidates.some((raw) => {
      const file = sourceOf(raw)
      return file ? mediaKey(file) === key : false
    })
    if (!match) continue
    const owner = node.tagName === 'SOURCE' ? ((node.closest('video, picture')?.querySelector('img, video') as HTMLElement | null) ?? node.parentElement) : node
    if (!owner) continue
    if (isVisible(owner)) return owner
    fallback = fallback ?? owner
  }
  return fallback
}

/** The `#id` of a strip of visuals, from its first visual: stable between renders, languages and sizes. */
export const stripId = (firstSrc: string) => `strip-${mediaKey(firstSrc).replace(/\//g, '-')}`
