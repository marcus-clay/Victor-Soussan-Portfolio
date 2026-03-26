/**
 * Smooth scroll utilities with sticky header offset compensation.
 *
 * scrollToElement: scrolls to a DOM element, accounting for sticky nav + subbar.
 * smoothScrollTo: Apple HIG-inspired JS scroll with ease-out quint (for containers).
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

/**
 * Scroll to a DOM element by ID with proper sticky offset.
 * Uses native smooth scroll (off-main-thread, best performance).
 */
export function scrollToElement(elementId: string): void {
  if (elementId === 'hero' || elementId === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.getElementById(elementId)
  if (!el) return

  const targetY = el.getBoundingClientRect().top + window.scrollY - getStickyOffset()
  window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' })
}

// ─── Legacy: JS-animated scroll for non-window containers ───────────────────

const easeOutQuint = (t: number): number => 1 - Math.pow(1 - t, 5);

export function smoothScrollTo(
  container: HTMLElement | Window,
  targetTop: number,
  durationOverride?: number
): void {
  const isWindow = container === window;
  const currentTop = isWindow
    ? window.pageYOffset || document.documentElement.scrollTop
    : (container as HTMLElement).scrollTop;

  const distance = Math.abs(targetTop - currentTop);
  if (distance < 1) return;

  const duration = durationOverride ?? Math.min(900, Math.max(400, distance * 0.6));
  let startTime: number | null = null;

  const animate = (time: number) => {
    if (startTime === null) startTime = time;
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const position = currentTop + (targetTop - currentTop) * easeOutQuint(progress);

    if (isWindow) {
      window.scrollTo(0, position);
    } else {
      (container as HTMLElement).scrollTop = position;
    }

    if (elapsed < duration) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
}
