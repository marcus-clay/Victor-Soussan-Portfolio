'use client'

// The waiting-room notifications of the Tessan app, shown the way an operating system shows them:
// lock screen, Dynamic Island, notification center on iOS; collapsed and expanded cards, heads-up and
// Live Updates chip on Android. One state at a time, walked through from the queue to the consultation,
// then the edge cases. Everything is drawn in code from the Figma copy, so it stays sharp and can move.

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowsClockwise,
  BatteryFull,
  Camera,
  CellSignalFull,
  Check,
  CircleNotch,
  DotsThree,
  Flashlight,
  LockSimple,
  WifiHigh,
} from '@phosphor-icons/react'
import {
  NOTIFICATIONS_COPY,
  NOTIFICATION_STATES,
  type CardValue,
  type Gauge as GaugeValue,
  type Lang,
  type NotificationState,
} from '@/data/tessanNotifications'
import DeviceMockup from '@/components/case-study/DeviceMockup'
import ScaledScreen from '@/components/case-study/ScaledScreen'
import { PILL, PlayPauseButton, Segmented, useReducedMotion } from '@/components/case-study/controls'

const GREEN = '#276e3f'
const GREEN_ON_DARK = '#63c583'
const IOS_FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", system-ui, sans-serif'
const ANDROID_FONT = '"Google Sans", Roboto, system-ui, sans-serif'
const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]
const WALLPAPER_DARK = 'radial-gradient(120% 80% at 50% 0%, #34503f 0%, #1c2b23 55%, #111a15 100%)'
const WALLPAPER_LIGHT = 'linear-gradient(160deg, #eef3ee 0%, #d3e0d6 100%)'
const AUTO_ADVANCE_MS = 5200
const COUNTDOWN_START = 107

type Platform = 'ios' | 'android'
type CardTheme = 'dark' | 'light'

const formatClock = (total: number) => `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`

/* ------------------------------------------------------------------ small building blocks */

function AppIcon({ size, mono = false }: { size: number; mono?: boolean }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.24,
        background: mono ? 'rgba(255,255,255,0.92)' : GREEN,
        color: mono ? '#121212' : '#fff',
        fontSize: size * 0.58,
        fontWeight: 700,
        lineHeight: 1,
        fontFamily: IOS_FONT,
      }}
      className="inline-flex shrink-0 items-center justify-center"
    >
      T
    </span>
  )
}

function GaugeBar({ value, tone, height = 4 }: { value: GaugeValue; tone: 'onDark' | 'onLight' | 'onDarkCard'; height?: number }) {
  const reduce = useReducedMotion()
  if (value === null) return null
  const track = tone === 'onDark' ? 'rgba(255,255,255,0.2)' : tone === 'onDarkCard' ? '#525252' : '#dedede'
  const fill = tone === 'onDark' ? '#ffffff' : GREEN
  return (
    <div aria-hidden="true" style={{ height, borderRadius: height / 2, background: track, overflow: 'hidden' }}>
      {value === 'indeterminate' ? (
        reduce ? (
          <div style={{ width: '30%', height: '100%', background: fill }} />
        ) : (
          <motion.div
            style={{ width: '28%', height: '100%', background: fill, borderRadius: height / 2 }}
            animate={{ transform: ['translateX(-100%)', 'translateX(360%)'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        )
      ) : (
        <div
          style={{
            height: '100%',
            width: '100%',
            background: fill,
            transformOrigin: 'left',
            transform: `scaleX(${value})`,
            transition: 'transform 600ms cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        />
      )}
    </div>
  )
}

function Spin({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  if (reduce) return <span className="inline-flex">{children}</span>
  return (
    <motion.span className="inline-flex" animate={{ rotate: 360 }} transition={{ duration: 1.3, repeat: Infinity, ease: 'linear' }}>
      {children}
    </motion.span>
  )
}

function ValueMark({ value, clock, color }: { value: CardValue; clock: string; color: string }) {
  if (value.kind === 'text') return <span style={{ fontSize: 48, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em' }}>{value.text}</span>
  if (value.kind === 'countdown') return <span style={{ fontSize: 22, fontWeight: 700, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{clock}</span>
  if (value.icon === 'live') return <span style={{ width: 14, height: 14, borderRadius: 7, background: GREEN_ON_DARK }} />
  if (value.icon === 'pending') return <DotsThree size={32} weight="bold" color={color} />
  if (value.icon === 'sync')
    return (
      <Spin>
        <ArrowsClockwise size={26} weight="bold" color={color} />
      </Spin>
    )
  return (
    <Spin>
      <CircleNotch size={26} weight="bold" color={color} />
    </Spin>
  )
}

/* ------------------------------------------------------------------ iOS surfaces */

/** The Live Activity as it sits on the lock screen and in the notification center. */
function IosCard({ s, theme, clock }: { s: NotificationState; theme: CardTheme; clock: string }) {
  const dark = theme === 'dark'
  const fg = dark ? '#ffffff' : '#111111'
  const sub = dark ? 'rgba(255,255,255,0.62)' : '#757575'
  const { ios } = s
  return (
    <div
      style={{
        borderRadius: 23,
        padding: 16,
        fontFamily: IOS_FONT,
        color: fg,
        background: dark ? 'rgba(37,37,37,0.6)' : '#ffffff',
        backdropFilter: dark ? 'blur(24px) saturate(160%)' : undefined,
        WebkitBackdropFilter: dark ? 'blur(24px) saturate(160%)' : undefined,
        boxShadow: dark ? 'inset 0 0 0 0.5px rgba(255,255,255,0.14)' : '0 1px 3px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.06)',
      }}
    >
      <AppIcon size={24} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
        <div style={{ flex: 1, fontSize: 18, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' }}>{ios.title}</div>
        <div style={{ minWidth: 30, display: 'flex', justifyContent: 'flex-end' }}>
          <ValueMark value={ios.value} clock={clock} color={fg} />
        </div>
      </div>
      {ios.gauge !== null && (
        <div style={{ marginTop: 10 }}>
          <GaugeBar value={ios.gauge} tone={dark ? 'onDark' : 'onLight'} />
        </div>
      )}
      <p style={{ margin: '8px 0 0', fontSize: 12, lineHeight: 1.35, color: sub }}>{ios.body}</p>
      {ios.button && (
        <div
          style={{
            marginTop: 12,
            height: 40,
            borderRadius: 12,
            background: GREEN,
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {ios.button}
        </div>
      )}
    </div>
  )
}

function IslandCompactContent({ s }: { s: NotificationState }) {
  const c = s.ios.compact
  if (!c) return null
  const color = c.tone === 'green' ? GREEN_ON_DARK : '#ffffff'
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', padding: '0 12px 0 10px', fontFamily: IOS_FONT }}>
      <AppIcon size={20} />
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 14, fontWeight: 600, color }}>
        {c.icon === 'check' && <Check size={13} weight="bold" color={color} />}
        {c.icon === 'live' && <span style={{ width: 8, height: 8, borderRadius: 4, background: color }} />}
        {c.text}
      </span>
    </div>
  )
}

function IslandExpandedContent({ s, clock, expiresIn }: { s: NotificationState; clock: string; expiresIn: string }) {
  const e = s.ios.expanded
  if (!e) return null
  return (
    <div style={{ padding: '14px 16px', fontFamily: IOS_FONT, color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <AppIcon size={22} />
        <span style={{ flex: 1, fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>{e.title}</span>
        {e.countdown && (
          <span style={{ fontSize: 12, fontWeight: 600, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
            {expiresIn} {clock}
          </span>
        )}
      </div>
      {e.body && <p style={{ margin: '6px 0 0', fontSize: 12, lineHeight: 1.3, color: 'rgba(255,255,255,0.7)' }}>{e.body}</p>}
      {e.gauge !== null && (
        <div style={{ marginTop: 10 }}>
          <GaugeBar value={e.gauge} tone="onDark" />
        </div>
      )}
      {e.button && (
        <div
          style={{
            marginTop: 12,
            height: 36,
            borderRadius: 18,
            background: GREEN,
            fontSize: 12,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {e.button}
        </div>
      )}
    </div>
  )
}

/** The island of the phone: idle, or compact with the state of the waiting room. */
function PhoneIsland({ s }: { s: NotificationState }) {
  const reduce = useReducedMotion()
  const active = !!s.ios.compact
  return (
    <div style={{ position: 'absolute', top: 11, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
      <motion.div
        initial={false}
        animate={{ width: active ? 200 : 126 }}
        transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.45, bounce: 0.1 }}
        style={{ height: 37, borderRadius: 19, background: '#000', overflow: 'hidden' }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={s.id}
            style={{ height: '100%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14 }}
          >
            <IslandCompactContent s={s} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function IosBanner({ title, body }: { title: string; body: string }) {
  return (
    <div
      style={{
        borderRadius: 22,
        padding: '12px 14px',
        fontFamily: IOS_FONT,
        color: '#fff',
        background: 'rgba(58,58,60,0.82)',
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.28), inset 0 0 0 0.5px rgba(255,255,255,0.14)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
        <AppIcon size={18} />
        <span style={{ fontWeight: 600, opacity: 0.85 }}>Tessan</span>
        <span style={{ opacity: 0.55 }}>maintenant</span>
      </div>
      <div style={{ marginTop: 6, fontSize: 15, fontWeight: 700 }}>{title}</div>
      <div style={{ marginTop: 2, fontSize: 13, opacity: 0.85, lineHeight: 1.3 }}>{body}</div>
    </div>
  )
}

function StatusBar({ time, android }: { time: string; android?: React.ReactNode }) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 52, fontFamily: IOS_FONT, color: '#fff' }}>
      <span style={{ position: 'absolute', left: 32, top: 18, fontSize: 16, fontWeight: 600 }}>{time}</span>
      <span style={{ position: 'absolute', right: 26, top: 19, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        {android}
        <CellSignalFull size={17} weight="fill" />
        <WifiHigh size={17} weight="bold" />
        <BatteryFull size={21} weight="fill" />
      </span>
    </div>
  )
}

function IosScreen({ s, clock, banner, copy, island }: { s: NotificationState; clock: string; banner: boolean; copy: (typeof NOTIFICATIONS_COPY)[Lang]; island: boolean }) {
  const reduce = useReducedMotion()
  const alert = s.ios.alert
  return (
    <div style={{ position: 'absolute', inset: 0, background: WALLPAPER_DARK, fontFamily: IOS_FONT, color: '#fff', overflow: 'hidden' }}>
      <StatusBar time={copy.time} />
      {island ? (
        <PhoneIsland s={s} />
      ) : (
        <span aria-hidden="true" style={{ position: 'absolute', top: 0, left: '50%', width: 164, height: 30, marginLeft: -82, background: '#000', borderRadius: '0 0 20px 20px' }} />
      )}
      <div style={{ position: 'absolute', top: 76, left: 0, right: 0, textAlign: 'center' }}>
        <LockSimple size={18} weight="fill" color="rgba(255,255,255,0.85)" />
        <div style={{ marginTop: 8, fontSize: 21, fontWeight: 500, color: 'rgba(255,255,255,0.88)' }}>{copy.date.ios}</div>
        <div style={{ marginTop: -4, fontSize: 96, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{copy.time}</div>
      </div>
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 104 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={s.id}
            initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(10px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
          >
            <IosCard s={s} theme="dark" clock={clock} />
          </motion.div>
        </AnimatePresence>
      </div>
      <span style={{ position: 'absolute', left: 40, bottom: 44, width: 48, height: 48, borderRadius: 24, background: 'rgba(60,60,60,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Flashlight size={22} weight="fill" color="#fff" />
      </span>
      <span style={{ position: 'absolute', right: 40, bottom: 44, width: 48, height: 48, borderRadius: 24, background: 'rgba(60,60,60,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Camera size={22} weight="fill" color="#fff" />
      </span>
      <span style={{ position: 'absolute', left: '50%', bottom: 8, width: 140, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.85)', transform: 'translateX(-50%)' }} />
      <AnimatePresence>
        {banner && alert && (
          <motion.div
            key={`banner-${s.id}`}
            style={{ position: 'absolute', top: 58, left: 12, right: 12 }}
            initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(-24px) scale(0.96)' }}
            animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
            exit={{ opacity: 0, transform: reduce ? 'none' : 'translateY(-16px) scale(0.98)' }}
            transition={{ duration: 0.32, ease: EASE_OUT }}
          >
            <IosBanner title={alert.title} body={alert.body} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** The Dynamic Island at reading size: compact, then it opens on press. */
/** Expanded height of the island: the minimum, or the maximum when there is a button or a long text. */
function islandHeight(s: NotificationState) {
  const e = s.ios.expanded
  return e && (e.button || (e.body?.length ?? 0) > 60) ? 174 : 86
}

function IslandDemo({
  s,
  open,
  onToggle,
  clock,
  copy,
}: {
  s: NotificationState
  open: boolean
  onToggle: () => void
  clock: string
  copy: (typeof NOTIFICATIONS_COPY)[Lang]
}) {
  const reduce = useReducedMotion()
  const full = islandHeight(s)
  const height = open ? full : 36
  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-label={open ? copy.controls.collapseIsland : copy.controls.expandIsland}
      onClick={onToggle}
      onKeyDown={(ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault()
          onToggle()
        }
      }}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: full, cursor: 'pointer', outlineOffset: 4 }}
      className="active:scale-[0.99] transition-transform duration-150 ease-out focus-visible:outline-2 focus-visible:outline-white"
    >
      <motion.div
        initial={false}
        animate={{ width: open ? 374 : 228, height, borderRadius: open ? 28 : 18 }}
        transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.5, bounce: 0.12 }}
        style={{ background: '#000', overflow: 'hidden', position: 'relative', maxWidth: '100%' }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: open ? 0 : 1, transition: 'opacity 140ms ease-out' }}>
          <IslandCompactContent s={s} />
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: 374, opacity: open ? 1 : 0, transition: `opacity ${open ? '220ms 120ms' : '100ms'} ease-out` }}>
          <IslandExpandedContent s={s} clock={clock} expiresIn={copy.expiresIn} />
        </div>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ Android surfaces */

function AndroidCard({ s, clock, theme = 'light' }: { s: NotificationState; clock: string; theme?: CardTheme }) {
  const a = s.android
  const dark = theme === 'dark'
  return (
    <div
      style={{
        borderRadius: 16,
        padding: 16,
        background: dark ? '#1e1e1e' : '#fafafa',
        color: dark ? '#f2f2f2' : '#121212',
        fontFamily: ANDROID_FONT,
        boxShadow: dark ? '0 0 0 0.5px rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: dark ? '#9e9e9e' : '#666' }}>
        <AppIcon size={16} />
        <span style={{ fontWeight: 600 }}>Tessan</span>
        <span>· maintenant</span>
        {s.id === 'medecin_disponible' || s.id === 'reprise' ? (
          <span style={{ marginLeft: 'auto', fontVariantNumeric: 'tabular-nums', fontWeight: 600, color: dark ? '#f2f2f2' : '#121212' }}>{clock}</span>
        ) : null}
      </div>
      <div style={{ marginTop: 10, fontSize: 15, fontWeight: 700, lineHeight: 1.25 }}>{a.title}</div>
      <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.35, color: dark ? '#bababa' : '#595959' }}>{a.body}</div>
      {a.gauge !== null && (
        <div style={{ marginTop: 12 }}>
          <GaugeBar value={a.gauge} tone={dark ? 'onDarkCard' : 'onLight'} height={6} />
        </div>
      )}
      {a.button && (
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{ height: 40, padding: '0 18px', borderRadius: 999, background: GREEN, color: '#fff', fontSize: 13, fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}>
            {a.button}
          </span>
        </div>
      )}
    </div>
  )
}

function AndroidCollapsed({ s, theme = 'light' }: { s: NotificationState; theme?: CardTheme }) {
  const a = s.android
  const dark = theme === 'dark'
  return (
    <div
      style={{
        height: 56,
        borderRadius: 16,
        padding: '0 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: dark ? '#1e1e1e' : '#fafafa',
        color: dark ? '#f2f2f2' : '#121212',
        fontFamily: ANDROID_FONT,
        boxShadow: dark ? '0 0 0 0.5px rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)',
      }}
    >
      <AppIcon size={24} />
      <span style={{ flex: 1, minWidth: 0, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.collapsed}</span>
      {a.gauge !== null && (
        <div style={{ width: 56 }}>
          <GaugeBar value={a.gauge} tone={dark ? 'onDarkCard' : 'onLight'} />
        </div>
      )}
    </div>
  )
}

function LiveChip({ label }: { label: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 20, padding: '0 8px 0 6px', borderRadius: 10, background: '#292929', color: '#fff', fontSize: 10, fontWeight: 600, fontFamily: ANDROID_FONT }}>
      <AppIcon size={12} mono />
      {label}
    </span>
  )
}

function AndroidScreen({ s, clock, banner, copy, theme }: { s: NotificationState; clock: string; banner: boolean; copy: (typeof NOTIFICATIONS_COPY)[Lang]; theme: CardTheme }) {
  const reduce = useReducedMotion()
  const headsUp = s.id === 'bientot' || s.id === 'medecin_disponible'
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 0%, #2c3f47 0%, #18262c 55%, #0f171b 100%)', fontFamily: ANDROID_FONT, color: '#fff', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 36, fontSize: 13, fontWeight: 600 }}>
        <span style={{ position: 'absolute', left: 24, top: 9 }}>{copy.time}</span>
        <span style={{ position: 'absolute', right: 20, top: 8, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          {s.android.chip && <LiveChip label={s.android.chip} />}
          <CellSignalFull size={14} weight="fill" />
          <WifiHigh size={14} weight="bold" />
          <BatteryFull size={16} weight="fill" />
        </span>
      </div>
      <div style={{ position: 'absolute', top: 96, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontSize: 86, fontWeight: 300, lineHeight: 1, letterSpacing: '-0.02em' }}>09:41</div>
        <div style={{ marginTop: 6, fontSize: 18, fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{copy.date.android}</div>
      </div>
      <div style={{ position: 'absolute', left: 15, right: 15, bottom: 96 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={s.id}
            initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(10px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
          >
            <AndroidCard s={s} clock={clock} theme={theme} />
          </motion.div>
        </AnimatePresence>
      </div>
      <span style={{ position: 'absolute', left: '50%', bottom: 10, width: 120, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.8)', transform: 'translateX(-50%)' }} />
      <AnimatePresence>
        {banner && headsUp && (
          <motion.div
            key={`headsup-${s.id}`}
            style={{ position: 'absolute', top: 44, left: 24, right: 24 }}
            initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(-24px) scale(0.96)' }}
            animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
            exit={{ opacity: 0, transform: reduce ? 'none' : 'translateY(-16px) scale(0.98)' }}
            transition={{ duration: 0.32, ease: EASE_OUT }}
          >
            <AndroidCard s={{ ...s, android: { ...s.android, button: undefined, gauge: s.android.gauge } }} clock={clock} theme={theme} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ layout helpers */

/** Draws a block designed at `design` px wide at the width its column gives it. */
function FitWidth({ design, height, maxScale = 1.25, children }: { design: number; height: number; maxScale?: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setScale(Math.min(maxScale, el.clientWidth / design))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [design, maxScale])
  return (
    <div ref={ref} className="w-full min-w-0 overflow-hidden">
      <div className="mx-auto" style={{ width: design * scale, height: height * scale }}>
        <div style={{ width: design, height, transform: `scale(${scale})`, transformOrigin: 'top left' }}>{children}</div>
      </div>
    </div>
  )
}

function Plate({ tone, children }: { tone: 'dark' | 'light' | 'android'; children: React.ReactNode }) {
  const background = tone === 'dark' ? WALLPAPER_DARK : tone === 'light' ? WALLPAPER_LIGHT : 'radial-gradient(120% 120% at 50% 0%, #2c3f47 0%, #18262c 70%, #0f171b 100%)'
  return (
    <div className="rounded-xl p-3 sm:p-4 ring-1 ring-black/[0.06]" style={{ background }}>
      {children}
    </div>
  )
}

function SurfaceLabel({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="mb-2 flex min-h-8 items-center justify-between gap-3">
      <p className="text-xs font-medium text-gray-500">{children}</p>
      {action}
    </div>
  )
}

const Enter = ({ delay = 0, children }: { delay?: number; children: React.ReactNode }) => {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(8px)' }}
      animate={{ opacity: 1, transform: 'translateY(0px)' }}
      transition={{ duration: 0.24, ease: EASE_OUT, delay: reduce ? 0 : delay }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ showcase */

export default function NotificationsShowcase({ lang }: { lang: Lang }) {
  const copy = NOTIFICATIONS_COPY[lang]
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)

  const [platform, setPlatform] = useState<Platform>('ios')
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [inView, setInView] = useState(false)
  const [tick, setTick] = useState(0)
  const [banner, setBanner] = useState(false)
  const [islandOpen, setIslandOpen] = useState(false)
  const [theme, setTheme] = useState<CardTheme>('dark')
  const [androidTheme, setAndroidTheme] = useState<CardTheme>('light')
  const [island, setIsland] = useState(true)

  const s = NOTIFICATION_STATES[index]
  const clock = formatClock(COUNTDOWN_START - (tick % 60))
  const auto = playing && inView && !reduce

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // The countdown runs while the block is on screen, without motion preferences it stays at its first value.
  useEffect(() => {
    if (!inView || reduce) return
    const id = window.setInterval(() => setTick((t) => t + 1), 1000)
    return () => window.clearInterval(id)
  }, [inView, reduce])

  // The walk-through advances by itself until the reader takes over.
  useEffect(() => {
    if (!auto) return
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % NOTIFICATION_STATES.length), AUTO_ADVANCE_MS)
    return () => window.clearTimeout(id)
  }, [auto, index])

  // A banner and a vibration announce the two moments where the patient must act.
  useEffect(() => {
    if (!s.ios.alert) {
      setBanner(false)
      return
    }
    const show = window.setTimeout(() => setBanner(true), reduce ? 0 : 350)
    const hide = window.setTimeout(() => setBanner(false), 3600)
    return () => {
      window.clearTimeout(show)
      window.clearTimeout(hide)
    }
  }, [s.id, s.ios.alert, platform, reduce])

  // The island opens after the state change, once the eye has found it.
  useEffect(() => {
    if (reduce) {
      setIslandOpen(true)
      return
    }
    setIslandOpen(false)
    const id = window.setTimeout(() => setIslandOpen(true), 1000)
    return () => window.clearTimeout(id)
  }, [s.id, reduce])

  const pick = useCallback((i: number) => {
    setIndex(i)
    setPlaying(false)
  }, [])

  const flow = NOTIFICATION_STATES.map((st, i) => ({ st, i })).filter(({ st }) => st.group === 'flow')
  const edge = NOTIFICATION_STATES.map((st, i) => ({ st, i })).filter(({ st }) => st.group === 'edge')

  const renderPills = (items: { st: NotificationState; i: number }[], numbered: boolean) =>
    items.map(({ st, i }, n) => {
      const active = i === index
      return (
        <button
          key={st.id}
          type="button"
          aria-pressed={active}
          onClick={() => pick(i)}
          className={`${PILL} ${active ? 'bg-gray-900 text-white' : 'bg-white/80 text-gray-700 ring-1 ring-black/[0.06] [@media(hover:hover)]:hover:bg-white'}`}
        >
          {numbered && <span className={`text-xs tabular-nums ${active ? 'text-white/70' : 'text-gray-500'}`}>{n + 1}</span>}
          {st.label[lang]}
        </button>
      )
    })

  return (
    <div ref={rootRef} className="bg-[#E8E8E8] rounded-xl overflow-hidden ring-1 ring-black/[0.04] p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label={copy.controls.platform} className="inline-flex rounded-full bg-white/70 p-1 ring-1 ring-black/[0.06]">
          {(['ios', 'android'] as const).map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={platform === p}
              onClick={() => {
                setPlatform(p)
                setPlaying(false)
              }}
              className={`${PILL} ${platform === p ? 'bg-gray-900 text-white' : 'text-gray-700 [@media(hover:hover)]:hover:bg-white'}`}
            >
              {copy.platforms[p]}
            </button>
          ))}
        </div>
        {platform === 'ios' && (
          <Segmented
            label={copy.controls.device}
            value={island ? 'island' : 'notch'}
            options={[
              { id: 'island', label: copy.controls.withIsland },
              { id: 'notch', label: copy.controls.withoutIsland },
            ]}
            onChange={(next) => {
              setIsland(next === 'island')
              setPlaying(false)
            }}
          />
        )}
        {!reduce && <PlayPauseButton playing={playing} onToggle={() => setPlaying((v) => !v)} playLabel={copy.controls.play} pauseLabel={copy.controls.pause} />}
      </div>

      <div role="group" aria-label={copy.controls.steps} className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
        {renderPills(flow, true)}
        <span className="mx-2 hidden h-5 w-px bg-black/10 sm:block" aria-hidden="true" />
        {renderPills(edge, false)}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={s.id}
            initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(8px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="lg:pt-4"
            aria-live="polite"
          >
            <h3 className="text-title-2 text-gray-900">{s.label[lang]}</h3>
            <dl className="mt-5 space-y-5 max-w-[46ch]">
              <div>
                <dt className="text-xs font-medium text-gray-500">{copy.context}</dt>
                <dd className="mt-1 text-base text-gray-900">{s.context[lang]}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500">{copy.scenario}</dt>
                <dd className="mt-1 text-base text-gray-600">{s.scenario[lang]}</dd>
              </div>
            </dl>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={platform}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="grid items-start gap-6 md:grid-cols-[minmax(200px,260px)_minmax(0,1fr)]"
          >
            <div className="min-w-0">
              <SurfaceLabel>{copy.surfaces.lock}</SurfaceLabel>
              <DeviceMockup
                kind="phone"
                screen={{ src: '' }}
                label={`${copy.surfaces.lock}, ${platform === 'ios' ? 'iOS' : 'Android'}`}
                hideIsland
                className="mx-auto w-[min(260px,72vw)] md:w-full"
                custom={
                  <ScaledScreen>
                    {platform === 'ios' ? (
                      <IosScreen s={s} clock={clock} banner={banner} copy={copy} island={island} />
                    ) : (
                      <AndroidScreen s={s} clock={clock} banner={banner} copy={copy} theme={androidTheme} />
                    )}
                  </ScaledScreen>
                }
              />
            </div>

            <div className="min-w-0 space-y-6">
              {platform === 'ios' ? (
                <>
                  {!island && (
                    <Enter>
                      <SurfaceLabel>{copy.surfaces.banner}</SurfaceLabel>
                      <Plate tone="dark">
                        <FitWidth design={366} height={s.ios.alert ? 98 : 92} maxScale={1.15}>
                          <IosBanner title={s.ios.alert?.title ?? s.ios.title} body={s.ios.alert?.body ?? s.ios.body} />
                        </FitWidth>
                      </Plate>
                    </Enter>
                  )}
                  {island && s.ios.compact && s.ios.expanded && (
                    <Enter>
                      <SurfaceLabel>{copy.surfaces.island}</SurfaceLabel>
                      <Plate tone="dark">
                        <FitWidth design={374} height={islandHeight(s)} maxScale={1.15}>
                          <IslandDemo s={s} open={islandOpen} onToggle={() => setIslandOpen((v) => !v)} clock={clock} copy={copy} />
                        </FitWidth>
                      </Plate>
                    </Enter>
                  )}
                  <Enter delay={0.05}>
                    <SurfaceLabel
                      action={
                        <Segmented
                          compact
                          label={copy.controls.theme}
                          value={theme}
                          options={[
                            { id: 'dark', label: copy.controls.dark },
                            { id: 'light', label: copy.controls.light },
                          ]}
                          onChange={setTheme}
                        />
                      }
                    >
                      {copy.surfaces.center}
                    </SurfaceLabel>
                    <Plate tone={theme === 'dark' ? 'dark' : 'light'}>
                      <FitWidth design={358} height={s.ios.button ? 258 : s.ios.gauge !== null ? 168 : 150} maxScale={1.15}>
                        <IosCard s={s} theme={theme} clock={clock} />
                      </FitWidth>
                    </Plate>
                  </Enter>
                </>
              ) : (
                <>
                  <Enter>
                    <SurfaceLabel
                      action={
                        <Segmented
                          compact
                          label={copy.controls.theme}
                          value={androidTheme}
                          options={[
                            { id: 'light', label: copy.controls.light },
                            { id: 'dark', label: copy.controls.dark },
                          ]}
                          onChange={setAndroidTheme}
                        />
                      }
                    >
                      {copy.surfaces.collapsed}
                    </SurfaceLabel>
                    <Plate tone="android">
                      <FitWidth design={340} height={56} maxScale={1.2}>
                        <AndroidCollapsed s={s} theme={androidTheme} />
                      </FitWidth>
                    </Plate>
                  </Enter>
                  <Enter delay={0.05}>
                    <SurfaceLabel>{copy.surfaces.expanded}</SurfaceLabel>
                    <Plate tone="android">
                      <FitWidth design={360} height={s.android.button ? 190 : 150} maxScale={1.15}>
                        <AndroidCard s={s} clock={clock} theme={androidTheme} />
                      </FitWidth>
                    </Plate>
                  </Enter>
                  {s.android.chip && (
                    <Enter delay={0.1}>
                      <SurfaceLabel>{copy.surfaces.chip}</SurfaceLabel>
                      <Plate tone="android">
                        <FitWidth design={358} height={32} maxScale={1.2}>
                          <div style={{ position: 'relative', height: 32, color: '#fff', fontFamily: ANDROID_FONT, fontSize: 13, fontWeight: 600 }}>
                            <span style={{ position: 'absolute', left: 8, top: 7 }}>{copy.time}</span>
                            <span style={{ position: 'absolute', right: 8, top: 6, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                              <LiveChip label={s.android.chip} />
                              <CellSignalFull size={14} weight="fill" />
                              <WifiHigh size={14} weight="bold" />
                              <BatteryFull size={16} weight="fill" />
                            </span>
                          </div>
                        </FitWidth>
                      </Plate>
                    </Enter>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
