/**
 * Motion policy of the site.
 *
 * Every transition here is short (150 to 500 ms) and travels a few pixels at most: fades,
 * small scales, accordion heights. None of it is the large parallax or full-screen movement
 * that triggers vestibular discomfort, so it stays on for everyone. Visitors who ask the
 * system for reduced motion get the parts that do travel (page and section entrances)
 * as plain fades (see `--rise-scale` in globals.css), no rubber banding on carousels,
 * no smooth scrolling, and a pause button on every video.
 *
 * This hook is the single place to change that policy for the Framer Motion components.
 */
export function useReducedMotion(): boolean {
  return false
}
