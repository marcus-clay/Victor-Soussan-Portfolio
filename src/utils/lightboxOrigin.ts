/**
 * Remembers which media the visitor just clicked, so a lightbox can open from it and return to
 * it (a shared-element transition: the picture travels, it does not just appear).
 *
 * Lightboxes are opened by many different pages through their own state, so instead of threading
 * an element through every call site, one capture-phase click listener records the media inside
 * the clicked control. The lightbox reads it once, right after it opens.
 */

const FRESH_MS = 800
const MIN_SIZE = 24

let last: { el: HTMLElement; at: number } | null = null
let installed = false

function mediaFor(target: Element): HTMLElement | null {
  if (target.closest('[role="dialog"]')) return null
  const direct = target.closest('img, video')
  if (direct) return direct as HTMLElement
  // The click landed on a wrapper (overlay, caption, padding): look inside the control around it
  const host = target.closest('[data-lightbox-source], [role="button"], button, a, figure, li, article')
  const found = host?.querySelector('img, video')
  return (found as HTMLElement | null) ?? null
}

export function installLightboxOrigin() {
  if (installed || typeof document === 'undefined') return
  installed = true
  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as Element | null
      if (!target || typeof target.closest !== 'function') return
      const el = mediaFor(target)
      last = el ? { el, at: Date.now() } : null
    },
    true
  )
}

/** The media clicked just before the lightbox opened, or null when it was opened another way */
export function takeLightboxOrigin(): HTMLElement | null {
  const entry = last
  last = null
  if (!entry || Date.now() - entry.at > FRESH_MS || !entry.el.isConnected) return null
  const r = entry.el.getBoundingClientRect()
  if (r.width < MIN_SIZE || r.height < MIN_SIZE) return null
  // Fully off screen: nothing to travel from
  if (r.bottom < 0 || r.top > window.innerHeight || r.right < 0 || r.left > window.innerWidth) return null
  return entry.el
}
