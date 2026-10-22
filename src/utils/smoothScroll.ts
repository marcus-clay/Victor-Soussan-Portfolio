/**
 * Smooth scroll utilities with sticky header offset compensation.
 *
 * scrollToElement: scrolls to a DOM element, accounting for sticky nav + subbar.
 * smoothScrollTo: controlled JS scroll with ease-out quint (for containers and window).
 */

/**
 * Compute the total sticky offset: nav height (CSS var) + sub-bar (40px) + padding.
 */
function getStickyOffset(): number {
  const navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '64',
    10
  )
  // 40px for breadcrumb/TOC bar + 24px breathing room
  return navHeight + 40 + 24
}

// ─── Easing ──────────────────────────────────────────────────────────────────

const easeOutQuint = (t: number): number => 1 - Math.pow(1 - t, 5)

// The animation in flight. A press, a wheel, a touch or a key stops it where it is, so the
// reader is never fighting the page for control of the scroll.
let cancelActive: (() => void) | null = null

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Scroll window to targetTop with a controlled ease-out quint animation.
 * Duration scales with distance (min 400ms, max 700ms) for consistent feel.
 * The animation yields to any user input, and jumps straight to the target when the
 * reader asks for reduced motion.
 */
export function smoothScrollTo(
  container: HTMLElement | Window,
  targetTop: number,
  durationOverride?: number
): void {
  const isWindow = container === window
  const currentTop = isWindow
    ? window.pageYOffset || document.documentElement.scrollTop
    : (container as HTMLElement).scrollTop

  const distance = Math.abs(targetTop - currentTop)
  if (distance < 1) return

  cancelActive?.()

  if (isWindow && prefersReducedMotion()) {
    window.scrollTo(0, targetTop)
    return
  }

  const duration = durationOverride ?? Math.min(700, Math.max(380, distance * 0.5))
  let startTime: number | null = null
  let frame = 0

  const stop = () => {
    cancelAnimationFrame(frame)
    INTERRUPTS.forEach((type) => window.removeEventListener(type, stop))
    if (cancelActive === stop) cancelActive = null
  }
  cancelActive = stop
  INTERRUPTS.forEach((type) => window.addEventListener(type, stop, { passive: true }))

  const animate = (time: number) => {
    if (startTime === null) startTime = time
    const elapsed = time - startTime
    const progress = Math.min(elapsed / duration, 1)
    const position = currentTop + (targetTop - currentTop) * easeOutQuint(progress)

    if (isWindow) {
      window.scrollTo(0, position)
    } else {
      (container as HTMLElement).scrollTop = position
    }

    if (elapsed < duration) {
      frame = requestAnimationFrame(animate)
    } else {
      stop()
    }
  }

  frame = requestAnimationFrame(animate)
}

const INTERRUPTS = ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const

/**
 * Scroll to a DOM element by ID with proper sticky offset.
 * Uses controlled JS animation for consistent cross-browser easing.
 */
export function scrollToElement(elementId: string): void {
  if (elementId === 'hero' || elementId === 'top') {
    smoothScrollTo(window, 0)
    return
  }
  const el = document.getElementById(elementId)
  if (!el) return

  const targetY = el.getBoundingClientRect().top + window.scrollY - getStickyOffset()
  smoothScrollTo(window, Math.max(0, targetY))
}
