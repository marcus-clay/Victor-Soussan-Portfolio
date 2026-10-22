import { useReducedMotion } from 'framer-motion'

/**
 * Shared motion constants for Framer Motion components.
 *
 * One standard for the whole site:
 * - Page load: a plain fade of the whole page (`.page-in`, app/[lang]/template.tsx).
 *   Headers and heroes do not animate on their own at load.
 * - Scroll reveals below the fold: opacity plus 8px at most, 320ms, ease-out-expo,
 *   once. Under `prefers-reduced-motion` the 8px is dropped (plain fade).
 */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.23, 1, 0.32, 1]
export const REVEAL_DURATION = 0.32
export const REVEAL_TRAVEL = 8
/** Delay between two siblings of a revealed list (seconds), capped at five steps */
export const REVEAL_STEP = 0.06

/**
 * Props for a block that fades in as it enters the viewport.
 * `const reveal = useReveal()` once per component, then `<motion.div {...reveal(index)} />`.
 * `index` is the position in a list (0 for a lone block). `immediate` skips the entrance
 * for blocks that are already on screen when the page loads (a lead image, for example).
 */
export function useReveal(margin = '-60px') {
  const reduce = useReducedMotion()
  const travel = reduce ? 0 : REVEAL_TRAVEL
  return (index = 0, immediate = false) => ({
    initial: immediate ? (false as const) : { opacity: 0, y: travel },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin },
    transition: {
      duration: REVEAL_DURATION,
      ease: EASE_OUT_EXPO,
      delay: Math.min(index, 5) * REVEAL_STEP,
    },
  })
}
