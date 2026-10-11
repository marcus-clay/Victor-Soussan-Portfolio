'use client'

import { useLayoutEffect } from 'react'

/**
 * Lets lazy images fade in when they finish loading (see `.img-fade` in globals.css).
 * Renders nothing. `data-loaded` is used instead of a class because React owns the
 * class attribute and would wipe a class it did not set.
 */
export default function ImageFadeIn() {
  useLayoutEffect(() => {
    const root = document.documentElement

    // Already on screen and loaded: mark without animating, before the first paint
    document.querySelectorAll<HTMLImageElement>('img').forEach(img => {
      if (img.complete) img.dataset.loaded = 'instant'
    })
    root.classList.add('img-fade')

    // load and error do not bubble, but they can be caught in the capture phase
    const mark = (e: Event) => {
      const t = e.target
      if (t instanceof HTMLImageElement && t.dataset.loaded === undefined) t.dataset.loaded = ''
    }
    document.addEventListener('load', mark, true)
    document.addEventListener('error', mark, true)
    return () => {
      document.removeEventListener('load', mark, true)
      document.removeEventListener('error', mark, true)
      root.classList.remove('img-fade')
    }
  }, [])

  return null
}
