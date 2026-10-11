import { useCallback, useEffect, useMemo, useRef } from 'react';
import type React from 'react';
import { animate } from 'framer-motion';

/**
 * Shared behaviour for every horizontal carousel on the site.
 *
 * Touch and trackpad scrolling stay native (CSS scroll-snap gives the browser's
 * own momentum and magnetism). This hook adds what the browser does not do:
 *
 *  - mouse drag that tracks the pointer 1:1 and keeps the grab offset
 *  - momentum projection on release (Apple's decelerationRate 0.998 formula),
 *    so a flick lands on the snap point the gesture was heading to
 *  - a critically damped spring from the live position, handing off the release
 *    velocity (small bounce only when a flick carried momentum)
 *  - rubber banding at both ends instead of a hard stop
 *  - interruptible motion: a press, a wheel or a touch stops the spring in place
 *  - arrows and dots go through the same spring; ArrowLeft/Right on the track
 *  - reduced motion: no spring, no rubber band, positions are set directly
 *
 * Rubber banding uses the individual `translate` property on the direct children
 * (see `.snap-rubber` in globals.css) so it never fights their own transforms.
 */

const DECELERATION = 0.998;

/** Where a gesture released at `velocity` (px/s) would come to rest, as a distance. */
export const projectMomentum = (velocity: number) =>
  ((velocity / 1000) * DECELERATION) / (1 - DECELERATION);

/** Resistance that grows with the overshoot: real things slow before they stop. */
const rubberband = (overshoot: number, dimension: number, constant = 0.55) =>
  (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export interface SnapScrollerOptions {
  /** Which edge of the item meets the container edge. Default 'start'. */
  align?: 'start' | 'center';
  /** false = free momentum scrolling that does not land on items. Default true. */
  snap?: boolean;
  /** Most items a single flick may travel (1 = paging). Default unlimited. */
  pageLimit?: number;
  /** Elastic overscroll while dragging past either end. Default true. */
  rubberBand?: boolean;
  /** Selector for the snap items, default: the direct children. */
  itemSelector?: string;
  /** Called on every frame of a programmatic or released motion. */
  onProgress?: (scrollLeft: number) => void;
  /** Called when a motion has settled. */
  onSettle?: () => void;
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useSnapScroller(
  ref: React.RefObject<HTMLElement | null>,
  options: SnapScrollerOptions = {}
) {
  const opts = useRef(options);
  opts.current = options;

  const motion = useRef<{ stop: () => void }[]>([]);
  const savedSnapType = useRef<string | null>(null);
  const rb = useRef(0);
  /** Index a running motion is heading to (so rapid key presses accumulate). */
  const heading = useRef<number | null>(null);

  const drag = useRef({
    active: false,
    moved: false,
    interrupted: false,
    startX: 0,
    startScroll: 0,
    max: 0,
    samples: [] as { t: number; s: number }[],
  });

  const setRb = useCallback((value: number) => {
    rb.current = value;
    ref.current?.style.setProperty('--rb', `${value}px`);
  }, [ref]);

  const releaseSnapType = useCallback(() => {
    const el = ref.current;
    if (el && savedSnapType.current !== null) {
      el.style.scrollSnapType = savedSnapType.current;
      savedSnapType.current = null;
    }
  }, [ref]);

  /**
   * Stop any running motion where it is. Native snapping comes back right away
   * unless `keepSnapOff` (we are about to move the carousel ourselves, and the
   * browser would otherwise yank it to the nearest snap point in between).
   */
  const stop = useCallback((keepSnapOff = false) => {
    motion.current.forEach(m => m.stop());
    motion.current = [];
    heading.current = null;
    if (!keepSnapOff) releaseSnapType();
  }, [releaseSnapType]);

  const getSnapPoints = useCallback((): number[] => {
    const el = ref.current;
    if (!el) return [];
    const { align = 'start', itemSelector } = opts.current;
    const items = itemSelector
      ? Array.from(el.querySelectorAll<HTMLElement>(itemSelector))
      : (Array.from(el.children) as HTMLElement[]);
    const max = el.scrollWidth - el.clientWidth;
    const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    const box = el.getBoundingClientRect();
    return items.map(item => {
      const r = item.getBoundingClientRect();
      const left = r.left - rb.current; // ignore the live rubber-band offset
      const x = align === 'center'
        ? el.scrollLeft + (left + r.width / 2) - (box.left + el.clientWidth / 2)
        : el.scrollLeft + (left - box.left - pad);
      return clamp(x, 0, max);
    });
  }, [ref]);

  const nearestIndex = (points: number[], x: number) => {
    let best = 0;
    let dist = Infinity;
    points.forEach((p, i) => {
      const d = Math.abs(p - x);
      if (d < dist) { dist = d; best = i; }
    });
    return best;
  };

  /** Animate (or jump, under reduced motion) to a scroll offset, from the live position. */
  const scrollToOffset = useCallback((target: number, velocity = 0) => {
    const el = ref.current;
    if (!el) return;
    const from = el.scrollLeft;
    stop(true);
    const max = el.scrollWidth - el.clientWidth;
    const to = clamp(target, 0, max);

    if ((Math.abs(to - from) < 0.5 && rb.current === 0)) {
      el.scrollLeft = to;
      setRb(0);
      releaseSnapType();
      opts.current.onProgress?.(to);
      opts.current.onSettle?.();
      return;
    }

    // Native snapping would fight the spring: park it while we move.
    if (savedSnapType.current === null) savedSnapType.current = el.style.scrollSnapType;
    el.style.scrollSnapType = 'none';

    const momentum = Math.abs(velocity) > 800 && to > 0 && to < max;
    const main = animate(from, to, {
      type: 'spring',
      bounce: momentum ? 0.12 : 0,
      duration: 0.5,
      velocity,
      onUpdate: v => {
        el.scrollLeft = v;
        opts.current.onProgress?.(v);
      },
      onComplete: () => {
        motion.current = [];
        heading.current = null;
        el.scrollLeft = to;
        opts.current.onProgress?.(to);
        releaseSnapType();
        opts.current.onSettle?.();
      },
    });
    motion.current = [main];

    if (rb.current !== 0) {
      motion.current.push(
        animate(rb.current, 0, { type: 'spring', bounce: 0, duration: 0.45, onUpdate: setRb })
      );
    }
  }, [ref, stop, setRb, releaseSnapType]);

  const scrollToIndex = useCallback((index: number, velocity = 0) => {
    const points = getSnapPoints();
    if (!points.length) return;
    const i = clamp(index, 0, points.length - 1);
    scrollToOffset(points[i], velocity);
    heading.current = motion.current.length ? i : null;
  }, [getSnapPoints, scrollToOffset]);

  /** Nearest snap index to the live position. */
  const currentIndex = useCallback(() => {
    const el = ref.current;
    if (!el) return 0;
    return nearestIndex(getSnapPoints(), el.scrollLeft);
  }, [ref, getSnapPoints]);

  // Anything native takes over: stop our spring where it is (interruptibility).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const interrupt = () => { if (motion.current.length) stop(); };
    el.addEventListener('wheel', interrupt, { passive: true });
    el.addEventListener('touchstart', interrupt, { passive: true });
    return () => {
      el.removeEventListener('wheel', interrupt);
      el.removeEventListener('touchstart', interrupt);
      stop();
    };
  }, [ref, stop]);

  const bind = useMemo(() => ({
    onPointerDown: (e: React.PointerEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el || e.button !== 0 || e.pointerType !== 'mouse') return;
      // Grab a moving carousel and it stays under the pointer: stop the spring in
      // place and keep native snapping off until the gesture ends.
      const interrupted = motion.current.length > 0;
      stop(true);
      const d = drag.current;
      d.active = true;
      d.moved = false;
      d.interrupted = interrupted;
      d.startX = e.clientX;
      d.startScroll = el.scrollLeft;
      d.max = el.scrollWidth - el.clientWidth;
      d.samples = [{ t: performance.now(), s: el.scrollLeft }];
      el.style.cursor = 'grabbing';
    },

    onPointerMove: (e: React.PointerEvent<HTMLElement>) => {
      const el = ref.current;
      const d = drag.current;
      if (!el || !d.active) return;
      const dx = e.clientX - d.startX;
      if (!d.moved) {
        if (Math.abs(dx) < 4) return;
        d.moved = true;
        el.setPointerCapture(e.pointerId);
        el.style.userSelect = 'none';
        if (savedSnapType.current === null) savedSnapType.current = el.style.scrollSnapType;
        el.style.scrollSnapType = 'none';
      }
      const desired = d.startScroll - dx;
      let offset = 0;
      if (desired < 0) offset = opts.current.rubberBand === false ? 0 : rubberband(-desired, el.clientWidth);
      else if (desired > d.max) offset = opts.current.rubberBand === false ? 0 : -rubberband(desired - d.max, el.clientWidth);
      if (prefersReducedMotion()) offset = 0;
      const scroll = clamp(desired, 0, d.max);
      el.scrollLeft = scroll;
      setRb(offset);
      opts.current.onProgress?.(scroll);

      const now = performance.now();
      d.samples.push({ t: now, s: desired });
      while (d.samples.length > 2 && now - d.samples[0].t > 100) d.samples.shift();
    },

    onPointerUp: (e: React.PointerEvent<HTMLElement>) => {
      const el = ref.current;
      const d = drag.current;
      if (!el || !d.active) return;
      d.active = false;
      el.style.cursor = 'grab';
      el.style.userSelect = '';
      if (el.hasPointerCapture?.(e.pointerId)) el.releasePointerCapture(e.pointerId);
      if (!d.moved) {
        // Pressed a moving carousel and let go: settle on the nearest item
        if (d.interrupted) scrollToIndex(nearestIndex(getSnapPoints(), el.scrollLeft));
        return;
      }

      // Release velocity from the last ~100ms of samples. A pause before letting go means 0.
      const now = performance.now();
      const first = d.samples[0];
      const last = d.samples[d.samples.length - 1];
      let velocity = 0;
      if (now - last.t < 80 && last.t > first.t) velocity = ((last.s - first.s) / (last.t - first.t)) * 1000;

      const { snap = true, pageLimit = Infinity } = opts.current;
      const max = d.max;
      const rest = clamp(el.scrollLeft, 0, max) + projectMomentum(velocity);

      if (!snap) {
        scrollToOffset(clamp(rest, 0, max), velocity);
        return;
      }
      const points = getSnapPoints();
      if (!points.length) return;
      const from = nearestIndex(points, d.startScroll);
      const to = clamp(nearestIndex(points, rest), from - pageLimit, from + pageLimit);
      const i = clamp(to, 0, points.length - 1);
      scrollToOffset(points[i], velocity);
      heading.current = motion.current.length ? i : null;
    },

    onDragStart: (e: React.DragEvent) => e.preventDefault(),

    // Swallow the click that ends a drag, so releasing over a link does not open it
    onClickCapture: (e: React.MouseEvent) => {
      if (drag.current.moved) {
        e.preventDefault();
        e.stopPropagation();
        drag.current.moved = false;
      }
    },

    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const t = e.target as HTMLElement;
      if (t.closest('input, textarea, select, video, [contenteditable]')) return;
      e.preventDefault();
      scrollToIndex((heading.current ?? currentIndex()) + (e.key === 'ArrowRight' ? 1 : -1));
    },
  }), [ref, stop, setRb, scrollToOffset, scrollToIndex, getSnapPoints, currentIndex]);

  return { bind, scrollToIndex, scrollToOffset, currentIndex, getSnapPoints, stop };
}
