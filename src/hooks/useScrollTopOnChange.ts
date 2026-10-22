import { useEffect, useRef } from 'react'

/**
 * Scrolls to the top when `dep` changes after the first render (switching between the
 * case study and its gallery, for example). Nothing happens on mount: a page never
 * scrolls by itself when it loads, so back navigation and #hash links keep their position.
 */
export function useScrollTopOnChange(dep: unknown, enabled = true) {
  const previous = useRef(dep)
  useEffect(() => {
    if (previous.current === dep) return
    previous.current = dep
    if (enabled) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [dep, enabled])
}
