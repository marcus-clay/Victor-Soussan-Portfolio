'use client'

// A journey of the patient app, read in one place: a single phone plays the screens one after the other,
// and the list of steps beside it is both the table of contents and the control. Clicking a step goes
// there, the phone follows, and the walk-through starts again by itself until the reader takes over.
// One phone, one journey, its steps as the way in: no lone screen followed by a strip of the same screens.

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DeviceMockup from '@/components/case-study/DeviceMockup'
import ScaledScreen from '@/components/case-study/ScaledScreen'
import { PlayPauseButton, Segmented, useReducedMotion } from '@/components/case-study/controls'

export interface JourneyStep {
  /** Picture of the screen, 780 × 1688 */
  src: string
  /** Name of the screen, read in the list of steps */
  label: string
  /** What the screen does for the patient, shown under the active step */
  caption?: string
  /** Time spent on the screen when the walk-through plays by itself, in ms */
  dwell?: number
  /** Animated moment laid over the screen when the step becomes active (390 × 844 space) */
  overlay?: React.ReactNode
}

export interface Journey {
  id: string
  /** Name of the journey, shown on its tab when there are several */
  label: string
  /** One sentence on what the journey tests or shows, shown under the list */
  line?: string
  steps: JourneyStep[]
}

interface JourneyPlayerProps {
  journeys: Journey[]
  ariaLabel: string
  labels: { play: string; pause: string; journeys: string; steps: string }
}

const DEFAULT_DWELL = 2600
const PUSH = { duration: 0.42, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] }
const pad2 = (n: number) => String(n).padStart(2, '0')

/** Screens enter from the side of travel and the one that leaves recedes a little: the way iOS pushes a screen. */
const screenVariants = {
  enter: (dir: number) => ({ transform: dir === 0 ? 'translateX(0%)' : `translateX(${dir > 0 ? 100 : -30}%)`, opacity: dir === 0 ? 0 : 1 }),
  center: { transform: 'translateX(0%)', opacity: 1 },
  exit: (dir: number) => ({ transform: dir === 0 ? 'translateX(0%)' : `translateX(${dir > 0 ? -30 : 100}%)`, opacity: dir === 0 ? 0 : 1 }),
}

export default function JourneyPlayer({ journeys, ariaLabel, labels }: JourneyPlayerProps) {
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [jIndex, setJIndex] = useState(0)
  const [sIndex, setSIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [playing, setPlaying] = useState(true)
  const [inView, setInView] = useState(false)

  const journey = journeys[jIndex]
  const steps = journey.steps
  const step = steps[sIndex]
  const auto = playing && inView && !reduce

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // The screens of the journey are loaded once it is near, so the push never waits for a picture.
  useEffect(() => {
    if (!inView) return
    for (const s of steps) {
      const img = new Image()
      img.src = s.src
    }
  }, [inView, steps])

  const goTo = useCallback(
    (next: number, byUser = true) => {
      setDirection(next === sIndex ? 0 : next === 0 && sIndex === steps.length - 1 ? 0 : next > sIndex ? 1 : -1)
      setSIndex(next)
      if (byUser) setPlaying(false)
    },
    [sIndex, steps.length]
  )

  // The walk-through advances by itself until the reader takes over, then starts again from the first screen.
  useEffect(() => {
    if (!auto) return
    const id = window.setTimeout(() => goTo((sIndex + 1) % steps.length, false), step.dwell ?? DEFAULT_DWELL)
    return () => window.clearTimeout(id)
  }, [auto, sIndex, steps.length, step.dwell, goTo])

  const switchJourney = (id: string) => {
    const next = journeys.findIndex((j) => j.id === id)
    if (next === -1 || next === jIndex) return
    setJIndex(next)
    setSIndex(0)
    setDirection(0)
    setPlaying(true)
  }

  const dwell = (step.dwell ?? DEFAULT_DWELL) / 1000

  return (
    <div ref={rootRef} role="group" aria-label={ariaLabel} className="bg-[#E8E8E8] rounded-xl overflow-hidden ring-1 ring-black/[0.04] p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {journeys.length > 1 ? (
          <Segmented label={labels.journeys} value={journey.id} options={journeys.map((j) => ({ id: j.id, label: j.label }))} onChange={switchJourney} />
        ) : (
          <span />
        )}
        {!reduce && <PlayPauseButton playing={playing} onToggle={() => setPlaying((v) => !v)} playLabel={labels.play} pauseLabel={labels.pause} />}
      </div>

      <div className="mt-6 grid items-center gap-8 md:grid-cols-[minmax(220px,290px)_minmax(0,1fr)] md:gap-12 lg:gap-16">
        <div className="min-w-0">
          <DeviceMockup
            kind="phone"
            screen={{ src: step.src }}
            label={step.label}
            className="mx-auto w-[min(66vw,270px)] md:w-full"
            custom={
              <div className="relative h-full w-full overflow-hidden bg-white">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.img
                    key={`${journey.id}-${sIndex}`}
                    src={step.src}
                    alt=""
                    draggable={false}
                    custom={direction}
                    variants={screenVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={reduce || direction === 0 ? { duration: 0.2, ease: 'easeOut' } : PUSH}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </AnimatePresence>
                {step.overlay && (
                  <div className="pointer-events-none absolute inset-0">
                    <ScaledScreen>
                      <React.Fragment key={`${journey.id}-${sIndex}-overlay`}>{step.overlay}</React.Fragment>
                    </ScaledScreen>
                  </div>
                )}
              </div>
            }
          />
        </div>

        <div className="min-w-0">
          {/* Phones: numbered steps in a row, the active one named under them. From md: the list is the table of contents. */}
          <div className="md:hidden">
            <ol aria-label={labels.steps} className="flex flex-wrap justify-center gap-2">
              {steps.map((s, i) => (
                <li key={s.src + i}>
                  <button
                    type="button"
                    aria-label={s.label}
                    aria-current={i === sIndex ? 'step' : undefined}
                    onClick={() => goTo(i)}
                    className={`relative inline-flex h-11 min-w-11 items-center justify-center rounded-full text-sm font-medium tabular-nums transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.95] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ${
                      i === sIndex ? 'bg-gray-900 text-white' : 'bg-white/80 text-gray-600 ring-1 ring-black/[0.06]'
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ol>
            <div className="mt-5 text-center" aria-live="polite">
              <p className="text-title-3 text-gray-900">{step.label}</p>
              {step.caption && <p className="mx-auto mt-1 max-w-[40ch] text-sm text-gray-600">{step.caption}</p>}
            </div>
          </div>

          <ol aria-label={labels.steps} className="hidden md:block -mx-3">
            {steps.map((s, i) => {
              const active = i === sIndex
              return (
                <li key={s.src + i}>
                  <button
                    type="button"
                    aria-current={active ? 'step' : undefined}
                    onClick={() => goTo(i)}
                    className={`group relative block w-full rounded-xl px-3 py-2.5 text-left transition-[background-color] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gray-900 ${
                      active ? 'bg-white/80' : '[@media(hover:hover)]:hover:bg-white/50'
                    }`}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className={`w-6 shrink-0 text-xs tabular-nums transition-colors duration-150 ${active ? 'text-gray-900' : 'text-gray-500'}`}>{pad2(i + 1)}</span>
                      <span className={`text-sm font-medium transition-colors duration-150 ${active ? 'text-gray-900' : 'text-gray-600'}`}>{s.label}</span>
                    </span>
                    {s.caption && (
                      <span className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${active ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <span className="overflow-hidden">
                          <span className="block max-w-[46ch] pl-9 pt-1 pb-1 text-sm text-gray-600">{s.caption}</span>
                        </span>
                      </span>
                    )}
                    {active && auto && (
                      <span aria-hidden="true" className="absolute inset-x-3 bottom-0 h-px bg-black/10">
                        <motion.span
                          key={`${journey.id}-${sIndex}-bar`}
                          className="block h-full origin-left bg-gray-900"
                          initial={{ transform: 'scaleX(0)' }}
                          animate={{ transform: 'scaleX(1)' }}
                          transition={{ duration: dwell, ease: 'linear' }}
                        />
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ol>

          {journey.line && <p className="mt-5 max-w-[46ch] text-sm text-gray-600">{journey.line}</p>}
          <p className="sr-only" aria-live="polite">{`${pad2(sIndex + 1)} / ${pad2(steps.length)}, ${step.label}`}</p>
        </div>
      </div>
    </div>
  )
}
