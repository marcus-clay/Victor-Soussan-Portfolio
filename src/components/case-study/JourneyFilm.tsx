'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useSpring, useTransform, useVelocity } from 'framer-motion'
import { Pause } from '@phosphor-icons/react'
import { CenterPlay, CornerButton, CornerControls } from '@/components/media/PlayerControls'
import DeviceMockup from '@/components/case-study/DeviceMockup'
import ScaledScreen from '@/components/case-study/ScaledScreen'
import { FilmClockContext, easeOut, phase, useFilmTime, type FilmClock } from '@/components/case-study/FilmClock'

/** How a screen arrives: pushed from the right, raised from the bottom (a camera), cross-faded, or opened from the store like an app. */
export type FilmTransition = 'push' | 'up' | 'fade' | 'launch'

/** A move of the camera, in the 390 × 844 space of the screen */
export interface FilmShot {
  at: number
  x: number
  y: number
  zoom: number
}

/** A press of the finger: where, when (seconds into the step), and the control that darkens under it. */
export interface FilmTap {
  x: number
  y: number
  at: number
  press?: { w: number; h: number; r: number }
  /** Seconds on the glass, shorter for keys typed in a row */
  hold?: number
}

export interface FilmStep {
  /** Still picture of the screen (390 × 844 ratio) */
  src?: string
  /** Screen drawn in code, when there is no picture of it */
  screen?: React.ReactNode
  /** Gestures and moments played over the screen, timed from the start of the step */
  overlay?: React.ReactNode
  /** Where the finger presses on this screen */
  taps?: FilmTap[]
  /** Where the camera looks: from `at`, it frames the point (x, y) of the screen at `zoom`. Without shots it rests on the whole phone. */
  camera?: FilmShot[]
  /** Seconds on screen: the step ends right after its last gesture, so the next screen answers the press */
  duration: number
  transition?: FilmTransition
}

interface JourneyFilmProps {
  steps: FilmStep[]
  /** Accessible name of the film */
  label: string
  labels: { play: string; pause: string }
}

/**
 * How the change of screen moves. A camera raised from the bottom goes back down when it closes, so the
 * screen under it is simply revealed: things leave the way they came. At the end of the journey the last
 * screen fades out and the first one fades back in.
 */
type Move = 'push' | 'up' | 'down' | 'fade' | 'loop' | 'launch'

// iOS navigation curve: the new screen arrives fast and settles long
const EASE_NAV: [number, number, number, number] = [0.32, 0.72, 0, 1]
const LOOP_FADE = 0.6
const at = (x: string, y: string, s = 1) => `translate3d(${x}, ${y}, 0) scale(${s})`
/** Where an app opened from the store grows from: the "Ouvrir" button */
const LAUNCH_ORIGIN = '46% 19%'

const SCREEN_VARIANTS = {
  initial: (move: Move) =>
    move === 'push'
      ? { transform: at('100%', '0%'), opacity: 1, filter: 'blur(3px)', zIndex: 1 }
      : move === 'up'
        ? { transform: at('0%', '100%'), opacity: 1, zIndex: 1 }
        : move === 'down'
          ? { transform: at('0%', '0%', 0.97), opacity: 0.7, zIndex: 0 }
          : move === 'launch'
            ? { transform: at('0%', '0%', 0.12), opacity: 0, borderRadius: 120, zIndex: 1 }
            : { transform: at('0%', '0%'), opacity: 0, zIndex: 1 },
  animate: (move: Move) => ({
    transform: at('0%', '0%'),
    opacity: 1,
    filter: 'blur(0px)',
    borderRadius: 0,
    zIndex: 1,
    transition:
      move === 'loop'
        ? { duration: LOOP_FADE, delay: LOOP_FADE + 0.15, ease: 'easeOut' as const }
        : move === 'launch'
          ? { duration: 0.55, ease: EASE_NAV, opacity: { duration: 0.18 } }
          : { duration: move === 'fade' ? 0.3 : 0.5, ease: EASE_NAV },
  }),
  exit: (move: Move) =>
    move === 'push'
      ? { transform: at('-28%', '0%'), opacity: 0.75, filter: 'blur(2px)', zIndex: 0, transition: { duration: 0.5, ease: EASE_NAV } }
      : move === 'up' || move === 'launch'
        ? { transform: at('0%', '0%', 0.97), opacity: 0.7, zIndex: 0, transition: { duration: 0.5, ease: EASE_NAV } }
        : move === 'down'
          ? { transform: at('0%', '100%'), opacity: 1, zIndex: 2, transition: { duration: 0.45, ease: EASE_NAV } }
          : { transform: at('0%', '0%'), opacity: 0, zIndex: 2, transition: { duration: move === 'loop' ? LOOP_FADE : 0.3, ease: 'easeInOut' as const } },
}


/** One screen of the film with the clock of its own step, frozen once the step is over. */
function StepLayer({ stepKey, clockFor, move, reduce, step }: { stepKey: string; clockFor: (key: string) => FilmClock; move: Move; reduce: boolean; step: FilmStep }) {
  const clock = useMemo(() => clockFor(stepKey), [clockFor, stepKey])
  return (
    <motion.div
      custom={reduce ? 'fade' : move}
      variants={SCREEN_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#F5F7F9', boxShadow: '0 0 28px -10px rgba(0,0,0,0.3)', willChange: 'transform, opacity', transformOrigin: move === 'launch' ? LAUNCH_ORIGIN : '50% 50%' }}
    >
      <FilmClockContext.Provider value={clock}>
        {step.src && <img src={step.src} alt="" width={390} height={844} draggable={false} style={{ display: 'block', width: 390, height: 844 }} />}
        {step.screen}
        {step.taps?.map((tap, i) => tap.press && <PressHighlight key={i} tap={tap} />)}
        {step.overlay}
      </FilmClockContext.Provider>
    </motion.div>
  )
}

/** The control under the finger darkens the moment it is touched and clears when the finger lifts. */
function PressHighlight({ tap }: { tap: FilmTap }) {
  const t = useFilmTime(0.016)
  const p = tap.press!
  const on = phase(t, tap.at, 0.04) * (1 - phase(t, tap.at + (tap.hold ?? FINGER_HOLD), 0.15))
  if (on <= 0) return null
  return <span aria-hidden="true" style={{ position: 'absolute', left: tap.x - p.w / 2, top: tap.y - p.h / 2, width: p.w, height: p.h, borderRadius: p.r, background: 'rgba(0,0,0,0.13)', opacity: on }} />
}

/** How long a finger stays on the glass for a tap, and how far it drifts once lifted */
const FINGER_HOLD = 0.2
const FINGER_DRIFT = { x: 16, y: 44 }
/** The finger comes from below the screen the first time */
const FINGER_HOME = { x: 330, y: 930 }

const lerp = (a: number, b: number, p: number) => a + (b - a) * p
const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)

/**
 * The reader's finger: one fingertip that travels above the glass from one control to the next, lands,
 * presses, lifts and drifts away, so the film reads as a person using the app. Above the glass it is light
 * and its shadow is long; on the glass it is darker and its shadow short.
 */
function Finger({ taps, from }: { taps: FilmTap[]; from: { x: number; y: number } }) {
  const t = useFilmTime(0.016)

  let x = from.x
  let y = from.y
  let prev = from
  let free = 0
  let settled = true
  for (const tap of taps) {
    const start = Math.max(free, tap.at - 0.5)
    const end = tap.at - 0.04
    if (t < start) {
      x = prev.x
      y = prev.y
      settled = false
      break
    }
    if (t < end) {
      const p = easeInOut((t - start) / Math.max(0.05, end - start))
      // A light arc, as a hand moves: a little higher in the middle of the way
      x = lerp(prev.x, tap.x, p)
      y = lerp(prev.y, tap.y, p) - Math.sin(Math.PI * p) * 18
      settled = false
      break
    }
    x = tap.x
    y = tap.y
    prev = tap
    free = tap.at + (tap.hold ?? FINGER_HOLD)
  }
  const last = taps[taps.length - 1]
  if (settled && last) {
    const lift = easeOut(phase(t, last.at + (last.hold ?? FINGER_HOLD), 0.45))
    x = last.x + FINGER_DRIFT.x * lift
    y = last.y + FINGER_DRIFT.y * lift
  }

  // On the glass: 0 in the air, 1 pressed
  let contact = 0
  for (const tap of taps) contact = Math.max(contact, phase(t, tap.at - 0.04, 0.04) * (1 - phase(t, tap.at + (tap.hold ?? FINGER_HOLD), 0.06)))
  // Shown while it travels and a moment after a press; gone on screens it does not touch
  let shown = 0
  let prevRelease = -Infinity
  for (const tap of taps) {
    const start = Math.max(prevRelease, tap.at - 0.5)
    shown = Math.max(shown, phase(t, start - 0.15, 0.2) * (1 - phase(t, tap.at + (tap.hold ?? FINGER_HOLD) + 0.5, 0.35)))
    prevRelease = tap.at + (tap.hold ?? FINGER_HOLD)
  }
  if (shown <= 0) return null
  const height = 1 - contact
  // The press answers with a spring: it squashes on contact, rebounds past its size, then settles
  let press = 0
  let ripple: { p: number; tap: FilmTap } | null = null
  for (const tap of taps) {
    const since = t - tap.at
    if (since >= 0 && since < 0.9) {
      press = spring(since)
      ripple = { p: since / 0.65, tap }
    }
  }
  const scale = (1.1 - 0.1 * contact) * (1 - 0.16 * press)
  return (
    <>
      {ripple && ripple.p < 1 && (
        <>
          <Wave x={ripple.tap.x} y={ripple.tap.y} p={ripple.p} strength={1} />
          <Wave x={ripple.tap.x} y={ripple.tap.y} p={ripple.p - 0.18} strength={0.55} />
        </>
      )}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 58,
          height: 62,
          borderRadius: '50%',
          // Liquid glass: a clear lens that bends what is under it, a bright rim where the light catches,
          // a soft inner shade at the bottom, and a shadow that shortens as the finger meets the glass
          background: 'radial-gradient(120% 110% at 32% 24%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.2) 42%, rgba(255,255,255,0.06) 72%, rgba(255,255,255,0.14) 100%)',
          backdropFilter: 'blur(5px) saturate(180%) brightness(1.06)',
          WebkitBackdropFilter: 'blur(5px) saturate(180%) brightness(1.06)',
          boxShadow: [
            'inset 0 0 0 1px rgba(255,255,255,0.75)',
            'inset 0 1.5px 1px rgba(255,255,255,0.9)',
            'inset 0 -6px 12px rgba(0,0,0,0.12)',
            `0 ${3 + 12 * height}px ${10 + 16 * height}px rgba(0,0,0,${0.14 + 0.1 * contact})`,
          ].join(', '),
          opacity: shown * (0.7 + 0.3 * contact),
          transform: `translate(-50%, -50%) scale(${scale})`,
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />
    </>
  )
}

/** Underdamped spring of the press, from 0 (rest) to 1 (fully squashed), over about 0.9 s */
function spring(since: number) {
  const squash = phase(since, 0, 0.07)
  if (since < 0.07) return easeOut(squash)
  const u = since - 0.07
  // Released: it swings back past its size once, then settles
  return Math.exp(-7 * u) * Math.cos(13 * u)
}

/** A thin ring of light that spreads from the point of contact and fades: the glass answering the tap. */
function Wave({ x, y, p, strength }: { x: number; y: number; p: number; strength: number }) {
  if (p <= 0 || p >= 1) return null
  const e = easeOut(p)
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 58,
        height: 58,
        borderRadius: '50%',
        boxShadow: `0 0 0 ${1.5 * (1 - e) + 0.5}px rgba(255,255,255,0.95), 0 0 10px rgba(0,0,0,0.12), inset 0 0 10px rgba(255,255,255,0.35)`,
        opacity: strength * 0.75 * (1 - p),
        transform: `translate(-50%, -50%) scale(${1 + 1.5 * e})`,
        pointerEvents: 'none',
        zIndex: 4,
      }}
    />
  )
}

/** The camera at rest: the whole phone */
const REST = { x: 195, y: 422, zoom: 1 }
// Phone geometry, as shares of its width (see DeviceMockup): bezel, screen height, phone height
const BEZEL = 0.034
const SCREEN_H = (1 - 2 * BEZEL) * (844 / 390)
const PHONE_H = SCREEN_H + 2 * BEZEL

/**
 * The camera over the phone, as in a product film: it pushes in on the part of the screen where the action
 * is and pulls back out, on a critically damped spring so it never overshoots. While it travels, a blur that
 * grows with its speed gives the move its motion blur.
 */
function Camera({ shots, stepKey, reduce, children }: { shots?: FilmShot[]; stepKey: string; reduce: boolean; children: React.ReactNode }) {
  const t = useFilmTime(0.016)
  const carry = useRef(REST)
  const lastKey = useRef(stepKey)
  if (lastKey.current !== stepKey) {
    lastKey.current = stepKey
    if (!shots?.length) carry.current = REST
  }
  let target = carry.current
  for (const shot of shots ?? []) if (t >= shot.at) target = shot
  if (reduce) target = REST
  carry.current = target

  const spring = { stiffness: 85, damping: 21, mass: 1 }
  const x = useSpring(REST.x, spring)
  const y = useSpring(REST.y, spring)
  const zoom = useSpring(REST.zoom, spring)
  useEffect(() => {
    x.set(target.x)
    y.set(target.y)
    zoom.set(target.zoom)
  }, [target, x, y, zoom])

  const vx = useVelocity(x)
  const vy = useVelocity(y)
  const vz = useVelocity(zoom)
  const transform = useTransform([x, y, zoom], ([px, py, z]: number[]) => {
    const u = BEZEL + (1 - 2 * BEZEL) * (px / 390)
    const v = (BEZEL + SCREEN_H * (py / 844)) / PHONE_H
    return `translate3d(${(0.5 - u) * z * 100}%, ${(0.5 - v) * z * 100}%, 0) scale(${z})`
  })
  const filter = useTransform([vx, vy, vz], ([a, b, c]: number[]) => {
    const blur = Math.min(2.5, (Math.abs(a) + Math.abs(b)) / 520 + Math.abs(c) * 1.6)
    return blur < 0.15 ? 'none' : `blur(${blur.toFixed(2)}px)`
  })

  return <motion.div style={{ transform, filter, transformOrigin: '50% 50%', willChange: 'transform, filter' }}>{children}</motion.div>
}

/**
 * A journey of the app played as a film in one large phone on the grey stage, from the first screen to the
 * last: each press leads to the next screen, fields fill in, the camera reads a card, then the film fades out
 * and starts again. It plays on its own while it is on screen, like the videos of the site, and stops when it
 * leaves or when the tab is hidden. One small button pauses it. It plays the same with reduced motion: the
 * film is the content of the figure.
 */
export default function JourneyFilm({ steps, label, labels }: JourneyFilmProps) {
  // The film plays in full whatever the system motion setting: it is the content (see useGestureReducedMotion)
  const reduce = false
  const rootRef = useRef<HTMLDivElement>(null)
  const elapsed = useRef(0)
  const pausedByUser = useRef(false)
  const onScreen = useRef(false)
  const listeners = useRef(new Set<() => void>())
  const frozen = useRef(new Map<string, number>())
  const [index, setIndex] = useState(0)
  const [run, setRun] = useState(0)
  const [move, setMove] = useState<Move>('fade')
  const [playing, setPlaying] = useState(false)

  const total = steps.length
  const stepKey = `${index}-${run}`
  const keyRef = useRef(stepKey)
  keyRef.current = stepKey

  const clockFor = useCallback(
    (key: string): FilmClock => ({
      now: () => (key === keyRef.current ? elapsed.current : (frozen.current.get(key) ?? 0)),
      subscribe: (listener) => {
        listeners.current.add(listener)
        return () => listeners.current.delete(listener)
      },
    }),
    []
  )

  // Every picture is fetched once the film comes near, so no screen arrives blank
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        steps.forEach((s) => {
          if (s.src) new Image().src = s.src
        })
        observer.disconnect()
      },
      { rootMargin: '600px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [steps])

  // On screen it plays, off screen or in a hidden tab it stops; a reader who paused it is never restarted
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const sync = () => setPlaying(onScreen.current && !document.hidden && !pausedByUser.current && !reduce)
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen.current = entry.isIntersecting
        sync()
      },
      { threshold: 0.45 }
    )
    observer.observe(el)
    document.addEventListener('visibilitychange', sync)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [reduce])

  // The clock: gestures follow it frame by frame, and the next screen comes as soon as the step is over
  useEffect(() => {
    if (!playing) return
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      // A long frame (a tab coming back) never skips a gesture
      elapsed.current += Math.min(0.1, (now - last) / 1000)
      last = now
      listeners.current.forEach((l) => l())
      // The first screen waits for the end of the fade that brought it back
      if (elapsed.current >= steps[index].duration + (index === 0 && run > 0 ? LOOP_FADE * 2 : 0)) {
        const next = (index + 1) % total
        let how: Move = 'loop'
        if (next !== 0) how = steps[index].transition === 'up' && steps[next].transition !== 'up' ? 'down' : (steps[next].transition ?? 'push')
        frozen.current.set(keyRef.current, elapsed.current)
        elapsed.current = 0
        setMove(how)
        setIndex(next)
        setRun((r) => r + 1)
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing, index, run, steps, total])

  // The first screen of a new lap starts its gestures once it is fully back
  const step = steps[index]
  const delayed = index === 0 && run > 0
  const shownStep = useMemo(
    () =>
      delayed
        ? {
            ...step,
            screen: step.screen && <DelayedClock by={LOOP_FADE * 2}>{step.screen}</DelayedClock>,
            overlay: step.overlay && <DelayedClock by={LOOP_FADE * 2}>{step.overlay}</DelayedClock>,
            taps: step.taps?.map((tap) => ({ ...tap, at: tap.at + LOOP_FADE * 2 })),
            camera: step.camera?.map((shot) => ({ ...shot, at: shot.at + LOOP_FADE * 2 })),
          }
        : step,
    [delayed, step]
  )

  // The finger starts where it left the previous screen it touched
  const fingerFrom = useMemo(() => {
    for (let i = index - 1; i >= 0; i--) {
      const last = steps[i].taps?.[steps[i].taps!.length - 1]
      if (last) return { x: last.x + FINGER_DRIFT.x, y: last.y + FINGER_DRIFT.y }
    }
    return FINGER_HOME
  }, [index, steps])
  const fingerClock = useMemo(() => clockFor(stepKey), [clockFor, stepKey])

  const toggle = () => {
    pausedByUser.current = playing
    setPlaying(!playing)
  }

  const screen = (
    <div className="absolute inset-0 overflow-hidden bg-[#F5F7F9]">
      <ScaledScreen>
        <AnimatePresence initial={false} custom={reduce ? 'fade' : move}>
          <StepLayer key={stepKey} stepKey={stepKey} clockFor={clockFor} move={move} reduce={reduce} step={shownStep} />
        </AnimatePresence>
        <FilmClockContext.Provider value={fingerClock}>
          <Finger key={stepKey} taps={shownStep.taps ?? []} from={fingerFrom} />
        </FilmClockContext.Provider>
      </ScaledScreen>
    </div>
  )

  return (
    <div ref={rootRef} role="group" aria-label={label} className="relative bg-[#E8E8E8] rounded-xl overflow-hidden ring-1 ring-black/[0.04]">
      <div className="flex justify-center px-6 pt-10 pb-12 md:pt-14 md:pb-16">
        <div className="w-[min(74vw,340px)] md:w-[360px]">
          <FilmClockContext.Provider value={fingerClock}>
            <Camera shots={shownStep.camera} stepKey={stepKey} reduce={reduce}>
              <DeviceMockup kind="phone" screen={{ src: steps[0].src ?? '' }} label={label} custom={screen} />
            </Camera>
          </FilmClockContext.Provider>
        </div>
      </div>
      {/* Same controls as every player of the site: stopped, the large play in the middle; playing, the small
          pause in the bottom right corner of the grey container */}
      {!playing && <CenterPlay onClick={toggle} label={labels.play} />}
      {playing && (
        <CornerControls fallbackClassName="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-20">
          <CornerButton onClick={toggle} label={labels.pause} dim>
            <Pause size={11} weight="fill" aria-hidden="true" />
          </CornerButton>
        </CornerControls>
      )}
    </div>
  )
}

/** Shifts the clock of the gestures it holds, so they start once the screen has faded back in. */
function DelayedClock({ by, children }: { by: number; children: React.ReactNode }) {
  const parent = React.useContext(FilmClockContext)
  const clock = useMemo<FilmClock | null>(() => (parent ? { now: () => Math.max(0, parent.now() - by), subscribe: parent.subscribe } : null), [parent, by])
  return <FilmClockContext.Provider value={clock}>{children}</FilmClockContext.Provider>
}
