'use client'

// Animated moments laid over a screen of the patient app (390 × 844 space): a tap, a card scanned by the
// camera, a pulse on an element. Each one plays once when it mounts, so the player mounts it when its step
// becomes active. With reduced motion they show their final state without moving, except inside a film,
// which plays in full.

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from '@phosphor-icons/react'
import { useGestureReducedMotion } from '@/components/case-study/FilmClock'

const GREEN_ON_DARK = '#63c583'
const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]
const FONT = 'Inter, system-ui, sans-serif'

/** A finger pressing a control: a soft disc that grows and fades. */
export function TapOverlay({ x, y, delay = 0.5 }: { x: number; y: number; delay?: number }) {
  const reduce = useGestureReducedMotion()
  if (reduce) return null
  return (
    <motion.span
      aria-hidden="true"
      initial={{ opacity: 0, transform: 'translate(-50%, -50%) scale(0.4)' }}
      animate={{ opacity: [0, 0.5, 0], transform: ['translate(-50%, -50%) scale(0.4)', 'translate(-50%, -50%) scale(1)', 'translate(-50%, -50%) scale(1.5)'] }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT, times: [0, 0.25, 1] }}
      style={{ position: 'absolute', left: x, top: y, width: 64, height: 64, borderRadius: 32, background: 'rgba(17,17,17,0.35)' }}
    />
  )
}

/** A soft ring that breathes twice around an element to say "this one changed". */
export function PulseOverlay({ x, y, width, height, radius = 14, delay = 0.5 }: { x: number; y: number; width: number; height: number; radius?: number; delay?: number }) {
  const reduce = useGestureReducedMotion()
  return (
    <motion.span
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={reduce ? { opacity: 0 } : { opacity: [0, 1, 0, 1, 0] }}
      transition={{ duration: 1.8, delay, ease: 'easeInOut' }}
      style={{ position: 'absolute', left: x - 3, top: y - 3, width: width + 6, height: height + 6, borderRadius: radius + 3, boxShadow: '0 0 0 2px rgba(39,110,63,0.55)' }}
    />
  )
}

const CHIP = (
  <span aria-hidden="true" style={{ position: 'absolute', left: 22, top: 62, width: 38, height: 30, borderRadius: 6, background: 'linear-gradient(135deg, #e6d49b 0%, #b99a52 100%)', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.18)' }} />
)

function BankCard() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 16, background: 'linear-gradient(135deg, #2e343e 0%, #12161c 100%)', color: '#fff', fontFamily: FONT, boxShadow: '0 18px 40px -12px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.08)' }}>
      {CHIP}
      <span style={{ position: 'absolute', left: 22, bottom: 56, fontSize: 18, letterSpacing: '0.14em', fontVariantNumeric: 'tabular-nums', opacity: 0.92 }}>•••• •••• •••• 4242</span>
      <span style={{ position: 'absolute', left: 22, bottom: 24, fontSize: 11, letterSpacing: '0.08em', opacity: 0.6 }}>[PRÉNOM] [NOM]</span>
      <span style={{ position: 'absolute', right: 22, bottom: 24, fontSize: 11, letterSpacing: '0.08em', opacity: 0.6, fontVariantNumeric: 'tabular-nums' }}>04/27</span>
    </div>
  )
}

function VitaleCard() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 16, background: 'linear-gradient(135deg, #f1f7f2 0%, #bcdcc5 100%)', color: '#16402a', fontFamily: FONT, boxShadow: '0 18px 40px -12px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(22,64,42,0.12)' }}>
      <span style={{ position: 'absolute', left: 22, top: 22, fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }}>carte Vitale</span>
      {CHIP}
      <span style={{ position: 'absolute', left: 22, bottom: 56, fontSize: 16, letterSpacing: '0.1em', fontVariantNumeric: 'tabular-nums', opacity: 0.85 }}>1 •• •• ••• ••• ••</span>
      <span style={{ position: 'absolute', left: 22, bottom: 24, fontSize: 11, letterSpacing: '0.08em', opacity: 0.65 }}>[PRÉNOM] [NOM]</span>
    </div>
  )
}

const BRACKET = 3
function Bracket({ corner, tone }: { corner: 'tl' | 'tr' | 'bl' | 'br'; tone: string }) {
  const top = corner[0] === 't'
  const left = corner[1] === 'l'
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        [top ? 'top' : 'bottom']: -2,
        [left ? 'left' : 'right']: -2,
        width: 30,
        height: 30,
        borderColor: tone,
        borderStyle: 'solid',
        borderWidth: 0,
        [top ? 'borderTopWidth' : 'borderBottomWidth']: BRACKET,
        [left ? 'borderLeftWidth' : 'borderRightWidth']: BRACKET,
        [`border${top ? 'Top' : 'Bottom'}${left ? 'Left' : 'Right'}Radius`]: 12,
        transition: 'border-color 220ms ease-out',
      }}
    />
  )
}

/**
 * The camera step: the card slides into the frame, a line reads it from top to bottom, the corners turn
 * green and a pill confirms. Positioned over the frame drawn in the screen of the app (320 × 202).
 */
export function CardScanOverlay({ kind, frame, doneLabel }: { kind: 'bank' | 'vitale'; frame: { x: number; y: number }; doneLabel: string }) {
  const reduce = useGestureReducedMotion()
  const W = 320
  const H = 202
  const T0 = 0.45
  return (
    <div style={{ position: 'absolute', left: frame.x, top: frame.y, width: W, height: H }}>
      <motion.div
        initial={reduce ? false : { opacity: 0, transform: 'translateY(300px) rotate(-8deg) scale(0.92)' }}
        animate={{ opacity: 1, transform: 'translateY(0px) rotate(0deg) scale(0.955)' }}
        transition={{ type: 'spring', duration: 1, bounce: 0.1, delay: T0 }}
        style={{ position: 'absolute', inset: 0 }}
      >
        {kind === 'bank' ? <BankCard /> : <VitaleCard />}
      </motion.div>

      {!reduce && (
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, transform: 'translateY(0px)' }}
          animate={{ opacity: [0, 1, 1, 0], transform: ['translateY(8px)', `translateY(${H - 10}px)`, `translateY(${H - 10}px)`, `translateY(${H - 10}px)`] }}
          transition={{ duration: 1.3, delay: T0 + 1.2, times: [0, 0.1, 0.92, 1], ease: 'easeInOut' }}
          style={{ position: 'absolute', left: 10, right: 10, top: 0, height: 2, borderRadius: 1, background: GREEN_ON_DARK, boxShadow: `0 0 14px 2px ${GREEN_ON_DARK}` }}
        />
      )}

      <motion.span
        aria-hidden="true"
        initial={false}
        animate={reduce ? { transform: 'scale(1)' } : { transform: ['scale(1)', 'scale(1)', 'scale(1.035)', 'scale(1)'] }}
        transition={{ duration: 2.9, delay: T0, times: [0, 0.8, 0.9, 1] }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <ColoredBrackets delay={T0 + 2.5} reduce={reduce} />
      </motion.span>

      <motion.span
        initial={reduce ? false : { opacity: 0, transform: 'translate(-50%, 10px)' }}
        animate={{ opacity: 1, transform: 'translate(-50%, 0px)' }}
        transition={{ duration: 0.35, delay: T0 + 2.7, ease: EASE_OUT }}
        style={{ position: 'absolute', left: '50%', bottom: -18, display: 'inline-flex', alignItems: 'center', gap: 8, height: 36, padding: '0 14px 0 8px', borderRadius: 18, background: 'rgba(255,255,255,0.96)', color: '#16402a', fontFamily: FONT, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}
      >
        <span style={{ width: 22, height: 22, borderRadius: 11, background: '#276e3f', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <Check size={13} weight="bold" color="#fff" />
        </span>
        {doneLabel}
      </motion.span>
    </div>
  )
}

function ColoredBrackets({ delay, reduce }: { delay: number; reduce: boolean }) {
  const [done, setDone] = React.useState(reduce)
  React.useEffect(() => {
    if (reduce) {
      setDone(true)
      return
    }
    const id = window.setTimeout(() => setDone(true), delay * 1000)
    return () => window.clearTimeout(id)
  }, [delay, reduce])
  const tone = done ? GREEN_ON_DARK : 'rgba(255,255,255,0.7)'
  return (
    <>
      <Bracket corner="tl" tone={tone} />
      <Bracket corner="tr" tone={tone} />
      <Bracket corner="bl" tone={tone} />
      <Bracket corner="br" tone={tone} />
    </>
  )
}

/**
 * Plays its animation while the screen is on screen, and again every `period` ms, so a phone in a row of
 * phones shows its moment without any control. Out of view it is removed, so it starts over when it returns.
 */
export function LoopOverlay({ children, period = 7000 }: { children: React.ReactNode; period?: number }) {
  const reduce = useGestureReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)
  const [run, setRun] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || reduce) return
    const id = window.setInterval(() => setRun((r) => r + 1), period)
    return () => window.clearInterval(id)
  }, [visible, reduce, period])

  return (
    <>
      <span ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0 }} />
      {(visible || reduce) && <React.Fragment key={run}>{children}</React.Fragment>}
    </>
  )
}
