/**
 * Sharing: the addresses that come back to the right place, and the few ways to send them.
 *
 * - A page is shared by its own address, a section by its `#id`, a media by `?m=<key>` (the key comes
 *   from `mediaKey`, see src/lib/mediaKey.ts).
 * - Addresses are absolute on the canonical host, keep the language prefix of the page and never carry
 *   a tracking parameter: they are built from the path only, whatever the visitor's address bar says.
 */

import { SITE_URL } from '@/lib/seo'
import { isMediaKey } from '@/lib/mediaKey'
import { trackShare, type ShareMethod, type ShareTarget } from '@/lib/analytics'

export type { ShareMethod, ShareTarget }

export const MEDIA_PARAM = 'm'

/** The address to share for the current page: the page, one of its sections (`hash`) or one of its media (`media`). */
export function shareUrl({ hash, media }: { hash?: string; media?: string } = {}): string {
  const path = window.location.pathname.replace(/\/+$/, '') || ''
  const query = media && isMediaKey(media) ? `?${MEDIA_PARAM}=${media}` : ''
  const fragment = hash && !media ? `#${encodeURIComponent(hash)}` : ''
  return `${SITE_URL}${path}${query}${fragment}`
}

/** The media key carried by the current address, when it is well formed (anything else is ignored). */
export function readMediaParam(): string | null {
  if (typeof window === 'undefined') return null
  const value = new URLSearchParams(window.location.search).get(MEDIA_PARAM)
  return value && isMediaKey(value) ? value : null
}

/**
 * Puts the media in the address bar (or takes it out with null) without adding a history entry, so the
 * address is always one that can be shared. Other parameters and the hash are left alone.
 */
export function writeMediaParam(key: string | null) {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  params.delete(MEDIA_PARAM)
  let query = params.toString()
  if (key && isMediaKey(key)) query += `${query ? '&' : ''}${MEDIA_PARAM}=${key}`
  const next = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
  if (next !== current) window.history.replaceState(window.history.state, '', next)
}

/** True when the browser offers its own share sheet (phones, Safari, Edge and Chrome on Windows). */
export function canNativeShare(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function'
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    /* clipboard API blocked (insecure context, permissions): fall back to a selection */
  }
  try {
    const field = document.createElement('textarea')
    field.value = text
    field.setAttribute('readonly', '')
    field.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none'
    document.body.appendChild(field)
    field.select()
    const ok = document.execCommand('copy')
    field.remove()
    return ok
  } catch {
    return false
  }
}

export const linkedinHref = (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

export const mailHref = (url: string, title: string) =>
  `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n\n${url}`)}`

// One flag for the whole page: a viewer with its own keys (the lightbox) leaves Escape and the arrows to an open menu
let openMenus = 0
export const isShareMenuOpen = () => openMenus > 0
export function setShareMenuOpen(open: boolean) {
  openMenus = Math.max(0, openMenus + (open ? 1 : -1))
}

export { trackShare }
