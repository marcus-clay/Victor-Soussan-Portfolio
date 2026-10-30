'use client'

// The gestures of a journey film, laid over a screen of the patient app (390 × 844 space): a finger that
// presses, a field that fills, a code typed digit by digit, a part of the screen that appears after a wait.
// Each one starts `at` seconds into its step and reads the film clock, so a pause freezes it on the frame.
// With reduced motion they show their final state.

import React from 'react'
import { motion } from 'framer-motion'
import { Camera, LockSimple, Microphone, PhoneDisconnect, Star } from '@phosphor-icons/react'
import { useReducedMotion } from '@/components/case-study/controls'
import { easeOut, phase, useFilmTime } from '@/components/case-study/FilmClock'

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]
const FONT = 'Inter, system-ui, sans-serif'
const GREEN = '#27713d'

/**
 * A finger pressing a control: a disc lands, presses, lifts and leaves a ring. With `press`, the control
 * under it darkens for the time of the press, as a real button does.
 */
export function Touch({ x, y, at, press }: { x: number; y: number; at: number; press?: { w: number; h: number; r: number } }) {
  const reduce = useReducedMotion()
  const t = useFilmTime(0.016)
  if (reduce || t < at || t > at + 1.2) return null
  // Lands (0 to 0.16 s), presses (to 0.36 s), lifts (to 0.54 s), then fades; the ring leaves on the lift
  const land = easeOut(phase(t, at, 0.16))
  const down = easeOut(phase(t, at + 0.16, 0.2))
  const up = easeOut(phase(t, at + 0.36, 0.18))
  const leave = phase(t, at + 0.6, 0.3)
  const scale = 1.15 - 0.15 * land - 0.12 * down + 0.12 * up
  const ring = phase(t, at + 0.36, 0.6)
  const dim = Math.max(0, 1 - Math.abs((t - (at + 0.36)) / 0.22))
  const disc = 'translate(-50%, -50%) scale('
  return (
    <>
      {press && (
        <span
          aria-hidden="true"
          style={{ position: 'absolute', left: x - press.w / 2, top: y - press.h / 2, width: press.w, height: press.h, borderRadius: press.r, background: 'rgba(0,0,0,0.14)', opacity: dim }}
        />
      )}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 44,
          height: 44,
          borderRadius: 22,
          background: 'rgba(110,110,110,0.38)',
          boxShadow: '0 0 0 2px rgba(255,255,255,0.9), 0 4px 14px rgba(0,0,0,0.25)',
          opacity: land * (1 - leave),
          transform: `${disc}${scale})`,
        }}
      />
      {ring > 0 && ring < 1 && (
        <span
          aria-hidden="true"
          style={{ position: 'absolute', left: x, top: y, width: 44, height: 44, borderRadius: 22, boxShadow: '0 0 0 2px rgba(120,120,120,0.6)', opacity: 0.55 * (1 - ring), transform: `${disc}${1 + 0.9 * easeOut(ring)})` }}
        />
      )}
    </>
  )
}

/**
 * A text field that takes the focus (green outline, caret) at `focusAt`, then fills one character every
 * 1 / `cps` seconds from `at`, over the placeholder of the screen. With `pairs`, digits are grouped by two,
 * as a phone number is.
 */
export function TypeField({ x, y, w, h, text, at, focusAt = at, field, pairs, size = 15, cps = 6 }: {
  x: number
  y: number
  w: number
  h: number
  text: string
  at: number
  focusAt?: number
  /** The whole field, for its focus outline */
  field?: { x: number; y: number; w: number; h: number; r: number }
  pairs?: boolean
  size?: number
  cps?: number
}) {
  const reduce = useReducedMotion()
  const t = useFilmTime(0.016)
  const count = reduce ? text.length : Math.max(0, Math.min(text.length, Math.floor((t - at) * cps) + (t >= at ? 1 : 0)))
  const typed = text.slice(0, count)
  const shown = pairs ? (typed.match(/.{1,2}/g) ?? []).join(' ') : typed
  const focused = reduce || t >= focusAt
  return (
    <>
      {field && focused && (
        <span aria-hidden="true" style={{ position: 'absolute', left: field.x, top: field.y, width: field.w, height: field.h, borderRadius: field.r, boxShadow: `inset 0 0 0 1.5px ${GREEN}, 0 0 0 4px rgba(39,113,61,0.12)`, opacity: reduce ? 1 : easeOut(phase(t, focusAt, 0.15)) }} />
      )}
      <span aria-hidden="true" style={{ position: 'absolute', left: x, top: y, width: w, height: h, background: '#fff', display: focused ? 'flex' : 'none', alignItems: 'center', fontFamily: FONT, fontSize: size, color: '#111', whiteSpace: 'pre' }}>
        {shown}
        {!reduce && <span style={{ width: 1.5, height: size + 4, marginLeft: 1, background: GREEN, opacity: count > 0 && t - at - (count - 1) / cps < 0.4 ? 1 : Math.floor(t * 2) % 2 ? 0.15 : 1 }} />}
      </span>
    </>
  )
}

/** The six boxes of a one-time code, filled one digit at a time; the next box to fill carries the green outline. */
export function CodeBoxes({ x, y, digits, at, every = 0.2, gap = 8, box = 48, height = 55 }: { x: number; y: number; digits: string; at: number; every?: number; gap?: number; box?: number; height?: number }) {
  const reduce = useReducedMotion()
  const t = useFilmTime()
  const typed = reduce ? digits.length : Math.max(0, Math.min(digits.length, Math.floor((t - at) / every) + (t >= at ? 1 : 0)))
  return (
    <>
      {digits.split('').map((d, i) => {
        const active = i === Math.min(typed, digits.length - 1) && typed < digits.length
        return (
          <span
            key={i}
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: x + i * (box + gap),
              top: y,
              width: box,
              height,
              borderRadius: 8,
              background: '#fff',
              boxShadow: active ? `inset 0 0 0 1.5px ${GREEN}` : 'inset 0 0 0 1px #dfe3e7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FONT,
              fontSize: 22,
              fontWeight: 500,
              color: '#111',
            }}
          >
            {i < typed && <Digit value={d} p={reduce ? 1 : easeOut(phase(t, at + i * every, 0.18))} />}
          </span>
        )
      })}
    </>
  )
}

function Digit({ value, p }: { value: string; p: number }) {
  return <span style={{ opacity: p, transform: `scale(${0.8 + 0.2 * p})`, filter: p < 1 ? `blur(${2 * (1 - p)}px)` : undefined }}>{value}</span>
}

/** Hides a part of the screen until `until`, then fades out to reveal it: a box that gets checked, a result that arrives. */
export function Reveal({ x, y, w, h, r = 0, until, color = '#fff', border }: { x: number; y: number; w: number; h: number; r?: number; until: number; color?: string; border?: string }) {
  const reduce = useReducedMotion()
  const t = useFilmTime(0.016)
  const gone = phase(t, until, 0.18)
  if (reduce || gone >= 1) return null
  return (
    <span
      aria-hidden="true"
      style={{ position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: r, background: color, boxShadow: border ? `inset 0 0 0 1.5px ${border}` : undefined, opacity: 1 - gone }}
    />
  )
}

/**
 * The position in the queue going down, over the number printed on the screen: each new value rises 8 px
 * out of a 2 px blur while the old one leaves upward (number pop-in).
 */
export function Countdown({ x, y, w, h, values, at, every, size = 40 }: { x: number; y: number; w: number; h: number; values: number[]; at: number; every: number; size?: number }) {
  const reduce = useReducedMotion()
  const t = useFilmTime(0.016)
  const i = reduce ? values.length - 1 : Math.max(0, Math.min(values.length - 1, Math.floor((t - at) / every) + (t >= at ? 1 : 0) - 1))
  const since = reduce || i === 0 ? 1 : easeOut(phase(t, at + (i - 1) * every + every, 0.25))
  const digit = (v: number, p: number, dir: 1 | -1) => (
    <span
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: dir === 1 ? p : 1 - p,
        transform: `translateY(${dir === 1 ? 8 * (1 - p) : -8 * p}px)`,
        filter: p < 1 ? `blur(${2 * (dir === 1 ? 1 - p : p)}px)` : undefined,
      }}
    >
      {v}
    </span>
  )
  return (
    <span aria-hidden="true" style={{ position: 'absolute', left: x, top: y, width: w, height: h, background: '#fff', overflow: 'hidden', fontFamily: FONT, fontSize: size, fontWeight: 600, letterSpacing: '-0.02em', color: '#111', fontVariantNumeric: 'tabular-nums' }}>
      {i > 0 && since < 1 && digit(values[i - 1], since, -1)}
      {digit(values[i], since, 1)}
    </span>
  )
}

/** A ring that breathes twice around an element that just got selected. */
export function Selected({ x, y, w, h, r = 19, at }: { x: number; y: number; w: number; h: number; r?: number; at: number }) {
  const reduce = useReducedMotion()
  const t = useFilmTime(0.016)
  const p = reduce ? 1 : easeOut(phase(t, at, 0.2))
  return (
    <span
      aria-hidden="true"
      style={{ position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: r, background: 'rgba(39,113,61,0.08)', boxShadow: `inset 0 0 0 1.5px ${GREEN}`, opacity: p, transform: `scale(${0.97 + 0.03 * p})` }}
    />
  )
}

/**
 * The listing of the app in a store, drawn in the app's own colors: the icon, the name, the install button
 * that turns into a progress ring, then into "Ouvrir". Not the page of a given store.
 */
export function StoreScreen({ icon, shots, installAt, openAt }: { icon: string; shots: string[]; installAt: number; openAt: number }) {
  const reduce = useReducedMotion()
  const t = useFilmTime()
  const phase = reduce ? 'open' : t < installAt + 0.3 ? 'get' : t < openAt - 0.4 ? 'loading' : 'open'
  const progress = Math.max(0, Math.min(1, (t - installAt - 0.3) / (openAt - installAt - 0.8)))
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', fontFamily: FONT, color: '#111' }}>
      <div style={{ position: 'absolute', left: 20, right: 20, top: 74, display: 'flex', gap: 16 }}>
        <img src={icon} alt="" width={104} height={104} style={{ width: 104, height: 104, borderRadius: 24, boxShadow: '0 0 0 1px rgba(0,0,0,0.06)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 6, minWidth: 0 }}>
          <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' }}>Tessan</span>
          <span style={{ fontSize: 14, color: '#6b7280', marginTop: 2 }}>Un médecin en quelques minutes</span>
          <div style={{ marginTop: 'auto', height: 32, display: 'flex', alignItems: 'center' }}>
            {phase === 'loading' ? (
              <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                <circle cx="16" cy="16" r="13" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <circle cx="16" cy="16" r="13" fill="none" stroke={GREEN} strokeWidth="3" strokeLinecap="round" strokeDasharray={`${progress * 81.7} 81.7`} transform="rotate(-90 16 16)" />
                <rect x="12" y="12" width="8" height="8" rx="1.5" fill={GREEN} />
              </svg>
            ) : (
              <span style={{ height: 32, padding: '0 20px', borderRadius: 16, background: GREEN, color: '#fff', fontSize: 15, fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}>
                {phase === 'get' ? 'Installer' : 'Ouvrir'}
              </span>
            )}
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 20, right: 20, top: 206, display: 'flex', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid #eef0f2' }}>
        {[
          ['4,7', 'note'],
          ['2 M', 'patients'],
          ['Santé', 'catégorie'],
        ].map(([v, l]) => (
          <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <span style={{ fontSize: 17, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              {v}
              {l === 'note' && <Star size={13} weight="fill" color="#6b7280" />}
            </span>
            <span style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{l}</span>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', left: 20, top: 296, display: 'flex', gap: 10 }}>
        {shots.map((s) => (
          <img key={s} src={s} alt="" width={160} height={284} style={{ width: 160, height: 284, borderRadius: 16, objectFit: 'cover', boxShadow: '0 0 0 1px rgba(0,0,0,0.06)' }} />
        ))}
      </div>
      <p style={{ position: 'absolute', left: 20, right: 20, top: 604, margin: 0, fontSize: 14, lineHeight: 1.5, color: '#4b5563' }}>
        Consultez un médecin en vidéo, sans rendez-vous, depuis chez vous ou dans une cabine Tessan en pharmacie.
      </p>
    </div>
  )
}

/** The first image of the app while it opens: the wordmark on the Tessan green. */
export function SplashScreen({ logo }: { logo: string }) {
  const reduce = useReducedMotion()
  return (
    <div style={{ position: 'absolute', inset: 0, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.img
        src={logo}
        alt=""
        width={162}
        height={36}
        initial={reduce ? false : { opacity: 0, transform: 'scale(0.94)' }}
        animate={{ opacity: 1, transform: 'scale(1)' }}
        transition={{ duration: 0.5, delay: 0.15, ease: EASE_OUT }}
        style={{ width: 162, height: 36, filter: 'brightness(0) invert(1)' }}
      />
    </div>
  )
}

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * The video consultation: the doctor of the waiting room on the call, a timer that runs, a ring that
 * follows the voice, the patient's own picture in a corner, and the three controls.
 */
export function VideoCallScreen({ doctor, initials, specialty, connectFor = 0.9 }: { doctor: string; initials: string; specialty: string; connectFor?: number }) {
  const reduce = useReducedMotion()
  const t = useFilmTime(0.1)
  // The call connects, then runs in fast motion: a few seconds of the film cover a few minutes of consultation
  const live = reduce || t >= connectFor
  const seconds = Math.max(1, Math.floor((t - connectFor) * 40) + 1)
  const arrive = reduce ? 1 : easeOut(phase(t, connectFor - 0.1, 0.35))
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #122823 0%, #1f3833 48%, #09120f 100%)', fontFamily: FONT, color: '#fff' }}>
      <div style={{ position: 'absolute', left: 20, right: 20, top: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontVariantNumeric: 'tabular-nums' }}>
          <span style={{ width: 7, height: 7, borderRadius: 4, background: live ? '#63c583' : '#f5c84b' }} />
          {live ? `${Math.floor(seconds / 60)}:${pad(seconds % 60)}` : 'Connexion…'}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, opacity: 0.6 }}>
          <LockSimple size={11} />
          Chiffré de bout en bout
        </span>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.45 + 0.55 * arrive, transform: `scale(${0.96 + 0.04 * arrive})` }}>
        <div style={{ position: 'relative', width: 96, height: 96 }}>
          {!reduce &&
            [0, 0.9].map((d) => {
              const p = (((t - connectFor - 0.4 - d) % 1.8) + 1.8) % 1.8 / 1.8
              return (
                <span
                  key={d}
                  aria-hidden="true"
                  style={{ position: 'absolute', inset: 0, borderRadius: 48, boxShadow: '0 0 0 2px #63c583', opacity: !live || t < connectFor + 0.4 + d ? 0 : 0.4 * Math.sin(Math.PI * p), transform: `scale(${1 + 0.45 * easeOut(p)})` }}
                />
              )
            })}
          <span style={{ position: 'absolute', inset: 0, borderRadius: 48, background: '#5b5fe0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, fontWeight: 600 }}>{initials}</span>
        </div>
        <span style={{ marginTop: 18, fontSize: 17, fontWeight: 600 }}>{doctor}</span>
        <span style={{ marginTop: 4, fontSize: 13, opacity: 0.6 }}>{specialty}</span>
      </div>
      <div style={{ position: 'absolute', right: 16, top: 560, width: 100, height: 140, borderRadius: 16, background: 'linear-gradient(180deg, #3a4d48 0%, #2a3a36 100%)', boxShadow: '0 0 0 1px rgba(255,255,255,0.12)', overflow: 'hidden' }}>
        <span style={{ position: 'absolute', left: 32, top: 34, width: 36, height: 42, borderRadius: 21, background: 'rgba(255,255,255,0.22)' }} />
        <span style={{ position: 'absolute', left: 18, top: 86, width: 64, height: 70, borderRadius: 32, background: 'rgba(255,255,255,0.16)' }} />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 739, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 26 }}>
        <span style={{ width: 52, height: 52, borderRadius: 26, background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Microphone size={22} />
        </span>
        <span style={{ width: 64, height: 64, borderRadius: 32, background: '#ff3b30', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PhoneDisconnect size={28} weight="fill" />
        </span>
        <span style={{ width: 52, height: 52, borderRadius: 26, background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Camera size={22} />
        </span>
      </div>
    </div>
  )
}

const KEYS: [string, string][] = [
  ['1', ''],
  ['2', 'ABC'],
  ['3', 'DEF'],
  ['4', 'GHI'],
  ['5', 'JKL'],
  ['6', 'MNO'],
  ['7', 'PQRS'],
  ['8', 'TUV'],
  ['9', 'WXYZ'],
  ['', ''],
  ['0', ''],
  ['del', ''],
]

/**
 * The number pad of the phone: it rises when the field is touched, each key lights up as its digit is typed
 * (in step with a `TypeField` that shares `typeAt` and `cps`), then it goes down before the button is pressed.
 */
export function NumPad({ showAt, hideAt, text = '', typeAt = 0, cps = 1, suggestion }: {
  showAt: number
  hideAt: number
  text?: string
  typeAt?: number
  cps?: number
  /** One-time code offered above the keys, read from the text messages */
  suggestion?: { label: string; pressAt: number }
}) {
  const reduce = useReducedMotion()
  const t = useFilmTime(0.016)
  if (reduce) return null
  const rise = easeOut(phase(t, showAt, 0.3))
  const fall = phase(t, hideAt, 0.25)
  const shown = rise * (1 - fall * fall)
  if (shown <= 0) return null
  // The key under the finger right now, if any: a press lasts 0.12 s from the moment its character appears
  const i = Math.floor((t - typeAt) * cps)
  const pressed = i >= 0 && i < text.length && t - typeAt - i / cps < 0.12 ? text[i] : null
  const H = suggestion ? 294 : 250
  const suggestionDown = suggestion && t >= suggestion.pressAt && t < suggestion.pressAt + 0.25
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: H, background: '#d3d6dc', transform: `translateY(${(1 - shown) * 100}%)`, padding: '8px 6px 0', fontFamily: FONT }}>
      {suggestion && (
        <div style={{ height: 36, margin: '-2px 0 8px', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 14, color: '#111', background: suggestionDown ? 'rgba(0,0,0,0.1)' : 'transparent' }}>
          <span style={{ color: '#6b7280' }}>Depuis Messages</span>
          <span style={{ fontWeight: 600, letterSpacing: '0.06em' }}>{suggestion.label}</span>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
        {KEYS.map(([d, letters], k) => {
          const blank = d === '' || d === 'del'
          return (
            <span
              key={k}
              style={{
                height: 46,
                borderRadius: 6,
                background: blank ? 'transparent' : pressed === d ? '#b6bac2' : '#fff',
                boxShadow: blank ? 'none' : '0 1px 0 rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#111',
              }}
            >
              {d === 'del' ? <span style={{ fontSize: 18 }}>⌫</span> : <span style={{ fontSize: 24, lineHeight: 1 }}>{d}</span>}
              {letters && <span style={{ fontSize: 9, letterSpacing: '0.16em', fontWeight: 600 }}>{letters}</span>}
            </span>
          )
        })}
      </div>
    </div>
  )
}

/** A text message banner that drops from the top of the screen, brings the code, and goes back up. */
export function SmsBanner({ at, until, title, body }: { at: number; until: number; title: string; body: string }) {
  const reduce = useReducedMotion()
  const t = useFilmTime(0.016)
  if (reduce) return null
  const drop = easeOut(phase(t, at, 0.4))
  const lift = phase(t, until, 0.3)
  const y = -110 + 110 * drop - 110 * lift * lift
  if (drop <= 0 || lift >= 1) return null
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: 10,
        right: 10,
        top: 50,
        padding: '12px 14px',
        borderRadius: 22,
        background: 'rgba(250,250,250,0.94)',
        backdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: '0 10px 30px -8px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(0,0,0,0.08)',
        transform: `translateY(${y}px)`,
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        fontFamily: FONT,
        color: '#111',
      }}
    >
      <span style={{ width: 36, height: 36, borderRadius: 9, background: '#34c759', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ width: 18, height: 14, borderRadius: 7, background: '#fff' }} />
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{title}</span>
        <span style={{ fontSize: 13, color: '#3c3c43' }}>{body}</span>
      </span>
      <span style={{ marginLeft: 'auto', alignSelf: 'flex-start', fontSize: 11, color: '#8a8a8e' }}>maintenant</span>
    </div>
  )
}

/** A checkbox that gets checked under the finger: the box fills with a small pop, then the check draws itself. */
export function CheckboxCheck({ x, y, size = 25, at, color = '#1d5c37' }: { x: number; y: number; size?: number; at: number; color?: string }) {
  const reduce = useReducedMotion()
  const t = useFilmTime(0.016)
  const fill = reduce ? 1 : easeOut(phase(t, at + 0.04, 0.16))
  const draw = reduce ? 1 : easeOut(phase(t, at + 0.14, 0.22))
  // A slight press then a pop past the resting size, as the box answers the finger
  const pop = reduce ? 1 : t < at ? 1 : t < at + 0.1 ? 1 - 0.08 * phase(t, at, 0.1) : 0.92 + 0.08 * easeOut(phase(t, at + 0.1, 0.25)) + 0.04 * Math.sin(Math.PI * phase(t, at + 0.1, 0.25))
  return (
    <span aria-hidden="true" style={{ position: 'absolute', left: x - 1, top: y - 1, width: size + 2, height: size + 2, background: '#fff', borderRadius: 7 }}>
      <span
        style={{
          position: 'absolute',
          inset: 1,
          borderRadius: 6,
          background: fill > 0 ? color : '#fff',
          opacity: 1,
          boxShadow: fill > 0 ? 'none' : 'inset 0 0 0 1.5px #cfd4da',
          transform: `scale(${pop})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 16 16" fill="none" style={{ opacity: fill }}>
          <path d="M3.5 8.5 6.5 11.5 12.5 4.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="14" strokeDashoffset={14 * (1 - draw)} />
        </svg>
      </span>
    </span>
  )
}
