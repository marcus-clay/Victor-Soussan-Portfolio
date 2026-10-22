'use client'

import { createElement, useEffect, useLayoutEffect, useRef } from 'react'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

/**
 * Scroll reveal for blocks below the first screen: a fade and a short rise (10px, 280ms,
 * ease-out-expo), once per element, siblings that enter together staggered by 50ms.
 *
 * Why it never hides text by mistake:
 * - The server HTML and the first client render carry no hidden state. Content is visible
 *   without JavaScript, and during hydration.
 * - Only after mount, and only for blocks that start below the fold, the element is put in
 *   the hidden state (`data-rv="pending"`, see app/globals.css). Anything already on screen, or
 *   already scrolled past, is never hidden, so the first screen is not delayed (LCP).
 * - If IntersectionObserver is missing, or the visitor asks for reduced motion, nothing is
 *   hidden at all.
 * - Opacity and `translate` only: no layout shift. Once the transition ends, the attribute
 *   and the inline variable are removed, so hover and state styles are left untouched.
 *
 * `kind="line"` draws a hairline from the left instead (scaleX), used by `ActRule`.
 */

const STEP_MS = 50
const MAX_STEPS = 5
const SETTLE_MS = 600

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

let observer: IntersectionObserver | null = null
// An IntersectionObserver always delivers a first notification for every target it watches. If
// none arrives within a second and a half, the observer is broken (or stubbed out): every hidden
// block is shown, so text can never stay at opacity 0.
const WATCHDOG_MS = 1500
let alive = false
let watchdog = 0

function armWatchdog() {
  if (alive || watchdog) return
  watchdog = window.setTimeout(() => {
    watchdog = 0
    if (alive) return
    document.querySelectorAll<HTMLElement>('[data-rv]').forEach((el) => {
      observer?.unobserve(el)
      release(el)
    })
  }, WATCHDOG_MS)
}

function release(el: HTMLElement) {
  delete el.dataset.rv
  el.style.removeProperty('--rv-delay')
}

function getObserver(): IntersectionObserver {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      alive = true
      const ready = entries
        .filter((e) => e.isIntersecting || e.boundingClientRect.bottom <= 0)
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top ||
            a.boundingClientRect.left - b.boundingClientRect.left,
        )
      ready.forEach((entry, i) => {
        const el = entry.target as HTMLElement
        observer?.unobserve(el)
        // Scrolled past before it was ever seen (jump to an anchor): no point animating it
        if (!entry.isIntersecting) {
          release(el)
          return
        }
        const delay = Math.min(i, MAX_STEPS) * STEP_MS
        el.style.setProperty('--rv-delay', `${delay}ms`)
        el.dataset.rv = 'in'
        window.setTimeout(() => release(el), delay + SETTLE_MS)
      })
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0 },
  )
  return observer
}

/** Hides `el` until it scrolls into view. Returns the cleanup. */
export function armReveal(el: HTMLElement, kind?: 'line'): () => void {
  if (typeof IntersectionObserver === 'undefined') return () => {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  const rect = el.getBoundingClientRect()
  // Visible now (first screen) or already above the viewport: stays as is
  if (rect.top < window.innerHeight || rect.bottom <= 0) return () => {}

  if (kind) el.dataset.rvKind = kind
  el.dataset.rv = 'pending'
  const io = getObserver()
  io.observe(el)
  armWatchdog()
  return () => {
    io.unobserve(el)
    release(el)
    delete el.dataset.rvKind
  }
}

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'li' | 'ul' | 'ol' | 'dl' | 'h2' | 'h3' | 'p' | 'span' | 'figure'
  kind?: 'line'
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export default function Reveal({ as = 'div', kind, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    return armReveal(el, kind)
  }, [kind])
  return createElement(as, { ref, ...rest }, children)
}
