'use client'

// The clock of a journey film. Every gesture laid over a screen reads its time here, so pausing the film
// freezes the finger, the typing and the counters on the frame where they are, and a screen that leaves
// keeps its last frame while it slides out. Outside a film, a gesture runs on its own clock.

import { createContext, useContext, useEffect, useState } from 'react'
import { useReducedMotion } from '@/components/case-study/controls'

export interface FilmClock {
  /** Seconds since the step started, frozen while the film is paused */
  now: () => number
  /** Called on every frame the film plays */
  subscribe: (listener: () => void) => () => void
}

export const FilmClockContext = createContext<FilmClock | null>(null)

/** Seconds since the gesture's step started. */
export function useFilmTime(step = 0.05) {
  const clock = useContext(FilmClockContext)
  const [t, setT] = useState(() => (clock ? clock.now() : 0))
  useEffect(() => {
    if (clock) {
      setT(clock.now())
      return clock.subscribe(() => setT(clock.now()))
    }
    const start = performance.now()
    const id = window.setInterval(() => setT((performance.now() - start) / 1000), step * 1000)
    return () => window.clearInterval(id)
  }, [clock, step])
  return t
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

/** Share of a phase that started at `start` and lasts `duration`, between 0 and 1. */
export const phase = (t: number, start: number, duration: number) => clamp01((t - start) / duration)

/** Strong ease-out, for anything that arrives or answers a press. */
export const easeOut = (p: number) => 1 - Math.pow(1 - p, 3)

/**
 * Reduced motion for a gesture. Inside a film it is always off: the films are the content of the page (the
 * reader watches the app being used), so the finger, the camera and the screens play in full even when the
 * system asks for reduced motion (decision of 30 October 2026). Outside a film, the system setting applies.
 */
export function useGestureReducedMotion() {
  const inFilm = useContext(FilmClockContext) !== null
  const reduce = useReducedMotion()
  return inFilm ? false : reduce
}
