'use client'

// Helpers shared by the interactive figures of the case studies: the pill style of their buttons and the motion preference.

import { useEffect, useState } from 'react'

export const PILL =
  'inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'

/**
 * The motion preference, read after mount: the server renders the same markup as the first client render,
 * then a reader who asked for reduced motion gets the calmer version.
 */
export function useReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduce(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduce
}
