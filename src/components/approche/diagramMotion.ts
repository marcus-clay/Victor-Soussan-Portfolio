'use client'

// The motion of the Approach diagrams: each one draws itself as it comes into view, once half of its height shows,
// and again each time it comes back after leaving the screen entirely.
// Lines draw from their start (stroke-dashoffset on a path of length 1), blocks rise 8px out of nothing
// and bars grow from the left, staggered so the eye reads the diagram in its own order. No loop, nothing
// that moves after it has settled; with reduced motion the diagram is simply there.

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

/** True while the diagram is in view (from half of it shown), false once it has fully left; always true with reduced motion. */
export function useDiagramReveal<T extends Element>() {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Drawn once half of its height is on screen, reset only once it is entirely gone, so it never flickers
        // at the edge. Height only: on a phone a wide drawing scrolls sideways in its panel, and the part hidden
        // to the right would otherwise keep it from ever reaching half.
        const height = entry.boundingClientRect.height
        if (entry.isIntersecting && height > 0 && entry.intersectionRect.height / height >= 0.5) setShown(true)
        else if (!entry.isIntersecting) setShown(false)
      },
      { threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, shown }
}

/** A line that draws itself; the path needs `pathLength={1}`. */
export const draw = (shown: boolean, delay = 0, duration = 900): CSSProperties => ({
  strokeDasharray: 1,
  strokeDashoffset: shown ? 0 : 1,
  transition: `stroke-dashoffset ${duration}ms ${EASE} ${delay}ms`,
})

/** A block or a label that rises into place. */
export const rise = (shown: boolean, delay = 0): CSSProperties => ({
  opacity: shown ? 1 : 0,
  transform: shown ? 'translateY(0px)' : 'translateY(8px)',
  transformBox: 'fill-box',
  transition: `opacity 500ms ${EASE} ${delay}ms, transform 500ms ${EASE} ${delay}ms`,
})

/** A bar that grows from its left edge, as time does. */
export const grow = (shown: boolean, delay = 0, duration = 700): CSSProperties => ({
  transform: shown ? 'scaleX(1)' : 'scaleX(0)',
  transformBox: 'fill-box',
  transformOrigin: 'left center',
  transition: `transform ${duration}ms ${EASE} ${delay}ms`,
})

/** A frame that opens from its centre, a little, as a zoom out. */
export const open = (shown: boolean, delay = 0): CSSProperties => ({
  opacity: shown ? 1 : 0,
  transform: shown ? 'scale(1)' : 'scale(0.96)',
  transformBox: 'fill-box',
  transformOrigin: 'center',
  transition: `opacity 600ms ${EASE} ${delay}ms, transform 700ms ${EASE} ${delay}ms`,
})

/**
 * The living part of a diagram, once it has drawn itself: milliseconds into a loop of `cycleMs`, or null when
 * the diagram is out of view, the tab is hidden, or the reader asked for reduced motion (the drawing then
 * stays still). One meaningful motion per diagram, that says its idea again; it starts after the drawing.
 */
export function useLoop(shown: boolean, cycleMs: number, delayMs = 1800) {
  const [t, setT] = useState<number | null>(null)
  useEffect(() => {
    if (!shown || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setT(null)
      return
    }
    let frame = 0
    let start = 0
    let last = 0
    const begin = window.setTimeout(() => {
      const tick = (now: number) => {
        if (document.hidden) {
          // A hidden tab freezes the loop where it was
          if (last) start += now - last
        } else {
          if (!start) start = now
          setT((now - start) % cycleMs)
        }
        last = now
        frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, delayMs)
    return () => {
      window.clearTimeout(begin)
      cancelAnimationFrame(frame)
    }
  }, [shown, cycleMs, delayMs])
  return t
}

/** Share of a phase that starts at `start` and lasts `duration`, between 0 and 1 (0 when the loop is off) */
export const seg = (t: number | null, start: number, duration: number) => (t == null ? 0 : Math.max(0, Math.min(1, (t - start) / duration)))

/** Strong ease-in-out, for things that travel across the drawing */
export const travel = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)

/** A flash that lights at `start` and fades over `duration`: 1, then down to 0 */
export const flash = (t: number | null, start: number, duration = 700) => (t == null || t < start ? 0 : 1 - seg(t, start, duration))
