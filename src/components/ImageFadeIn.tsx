'use client'

import { useEffect } from 'react'

/**
 * Lets lazy images fade in when they finish loading (see `.img-fade` in globals.css).
 * Renders nothing. `data-loaded` is used instead of a class because React owns the
 * class attribute and would wipe a class it did not set.
 */
export default function ImageFadeIn() {
  useEffect(() => {
    const root = document.documentElement
    // load and error do not bubble, but they can be caught in the capture phase
    const mark = (e: Event) => {
      const t = e.target
      if (t instanceof HTMLImageElement && t.dataset.loaded === undefined) t.dataset.loaded = ''
    }
    // Set up once the page has finished hydrating (the browser is idle): marking pictures earlier writes an
    // attribute into parts of the page React has not taken over yet, which it reports as a mismatch
    const setup = () => {
      // Already loaded: marked without animating
      document.querySelectorAll<HTMLImageElement>('img').forEach(img => {
        if (img.complete) img.dataset.loaded = 'instant'
      })
      root.classList.add('img-fade')
      document.addEventListener('load', mark, true)
      document.addEventListener('error', mark, true)
    }
    const w = window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void }
    const id = w.requestIdleCallback ? w.requestIdleCallback(setup, { timeout: 1200 }) : window.setTimeout(setup, 300)
    return () => {
      if (w.cancelIdleCallback) w.cancelIdleCallback(id)
      else window.clearTimeout(id)
      document.removeEventListener('load', mark, true)
      document.removeEventListener('error', mark, true)
      root.classList.remove('img-fade')
    }
  }, [])

  return null
}
