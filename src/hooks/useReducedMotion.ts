/**
 * Motion policy of the site.
 *
 * Every transition here is short (150 to 320 ms) and travels a few pixels at most: fades,
 * small scales, accordion heights. None of it is the large parallax or full-screen movement
 * that triggers vestibular discomfort, so it stays on for everyone. Page loads are a plain
 * fade (`.page-in` in globals.css). Visitors who ask the system for reduced motion also get
 * the below-the-fold reveals as plain fades (see `useReveal` in src/lib/motion.ts), no
 * rubber banding on carousels, no smooth scrolling, and a pause button on every video.
 *
 * This hook is the single place to change that policy for the Framer Motion components.
 */
export function useReducedMotion(): boolean {
  return false
}
