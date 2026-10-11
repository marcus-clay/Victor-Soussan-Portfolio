import { useLayoutEffect } from 'react';

/**
 * Page scroll lock for overlays (lightboxes, galleries).
 *
 * The lock only sets `overflow: hidden`. It never moves the page, so the scroll
 * position stays exactly where it was and nothing has to be restored. The layout
 * does not shift either, because the root keeps `scrollbar-gutter: stable`.
 *
 * Locks are reference counted: two overlays open at once release the page only
 * when the last one closes. As a safety net, the position recorded at lock time is
 * put back (instantly, bypassing the root `scroll-behavior: smooth`) if anything
 * moved the page while the overlay was open.
 */
let locks = 0;
let savedY = 0;

function lock() {
  if (locks++ > 0) return;
  savedY = window.scrollY;
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

function unlock() {
  if (--locks > 0) return;
  locks = 0;
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  if (Math.abs(window.scrollY - savedY) > 1) {
    window.scrollTo({ top: savedY, behavior: 'instant' as ScrollBehavior });
  }
}

export function useScrollLock(active: boolean) {
  useLayoutEffect(() => {
    if (!active) return;
    const trigger = document.activeElement as HTMLElement | null;
    lock();
    return () => {
      unlock();
      // Hand focus back to whatever opened the overlay, without scrolling to it.
      if (trigger && trigger !== document.body && trigger.isConnected) {
        trigger.focus({ preventScroll: true });
      }
    };
  }, [active]);
}
