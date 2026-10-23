/**
 * Reading progress: a 2px line at the very top of the window, brand blue, that fills from left
 * to right as the page scrolls. Pure CSS (`animation-timeline: scroll()`, see `.reading-progress`
 * in app/globals.css): no scroll listener, no JS. Browsers without scroll-driven animations do
 * not show it at all (display: none), which leaves the page exactly as it was.
 */
export default function ReadingProgress() {
  return <div className="reading-progress" aria-hidden="true" />
}
