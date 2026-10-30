import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Shared motion constants for Framer Motion components.
 *
 * One standard for the whole site:
 * - Page load: a plain fade of the whole page (`.page-in`, app/[lang]/template.tsx).
 * - Page headers build at load in CSS (`.build-line`, `.build-rise`, `.build-media`).
 * - Scroll reveals below the fold: opacity, 8px and a 2px blur, 400ms, smooth-out,
 *   once. Under `prefers-reduced-motion` the travel and blur are dropped (plain fade).
 */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.23, 1, 0.32, 1]
/** Entrances (same curve as --ease-smooth in globals.css) */
export const EASE_SMOOTH: [number, number, number, number] = [0.22, 1, 0.36, 1]
export const REVEAL_DURATION = 0.4
export const REVEAL_TRAVEL = 8
/** Delay between two siblings of a revealed list (seconds), capped at five steps */
export const REVEAL_STEP = 0.04

/**
 * Props for a block that fades in as it enters the viewport.
 * `const reveal = useReveal()` once per component, then `<motion.div {...reveal(index)} />`.
 * `index` is the position in a list (0 for a lone block). `immediate` skips the entrance
 * for blocks that are already on screen when the page loads (a lead image, for example).
 */
export function useReveal(margin = '-60px') {
  // The server cannot know the visitor's reduced-motion setting, so the hook only acts on it once
  // mounted: `initial` is the same on the server and on the first client render (no hydration
  // mismatch), and reduced motion drops the 8px through the transition instead (the block is
  // still transparent when it snaps, so the reveal reads as a plain fade).
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const reduce = mounted && prefersReduced
  return (index = 0, immediate = false) => {
    const delay = Math.min(index, 5) * REVEAL_STEP
    return {
      initial: immediate ? (false as const) : { opacity: 0, y: REVEAL_TRAVEL, filter: 'blur(2px)' },
      whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
      viewport: { once: true, margin },
      transition: {
        duration: REVEAL_DURATION,
        ease: EASE_SMOOTH,
        delay,
        ...(reduce ? { y: { duration: 0, delay }, filter: { duration: 0, delay } } : {}),
      },
    }
  }
}
