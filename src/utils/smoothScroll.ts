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
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72',
    10
  )
  // 40px for breadcrumb/TOC bar + 24px breathing room
  return navHeight + 40 + 24
}

// ─── Easing ──────────────────────────────────────────────────────────────────

const easeOutQuint = (t: number): number => 1 - Math.pow(1 - t, 5)

/**
 * Scroll window to targetTop with a controlled ease-out quint animation.
 * Duration scales with distance (min 400ms, max 700ms) for consistent feel.
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

  const duration = durationOverride ?? Math.min(700, Math.max(380, distance * 0.5))
  let startTime: number | null = null

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
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

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
