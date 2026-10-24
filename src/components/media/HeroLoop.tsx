'use client'

/**
 * HeroLoop: the looping hero video of a project, laid over its cover picture. Purely decorative: no
 * control is rendered, the picture stays in the page as it is (poster, LCP element and fallback), and
 * the video is aria-hidden.
 *
 * It adds, inside the same positioned parent as the picture, a muted, looping, inline video framed
 * exactly like the picture (same classes and object-position), invisible until its first frame is
 * playing, then cross-faded in over 300 ms. If the file is missing or fails to decode, the video is
 * removed and the picture simply stays: nothing else is ever added to the page.
 *
 * Two modes:
 * - `preview` (cards: home strip, projects grid, related projects): with a mouse, the loop plays while
 *   the pointer is over the card (or a keyboard focus is on it) and, on leaving, fades back to the
 *   picture, then rewinds to the first frame. On touch screens (no hover) it plays while the card is
 *   centred in the viewport (60% visible).
 * - `auto` (the case study hero): plays in a loop while at least a quarter of the panel is visible and
 *   pauses when it leaves.
 *
 * Common rules:
 * - The video element is only created once the page has loaded and is idle, and once the card is within
 *   600px of the viewport, so no video request competes with the LCP picture or with far-away cards.
 * - At most two loops play at once on the page; a hidden tab pauses them all.
 * - The data saver: no video at all, the picture stays.
 * - `prefers-reduced-motion: reduce`: nothing starts by itself (no `auto` hero, no centred card on touch),
 *   the picture stays. A mouse hover or a keyboard focus on a card is a deliberate gesture, so the loop
 *   still plays then: reduced motion asks for a gentler equivalent, not for the absence of feedback.
 *
 * The parent must be `position: relative` (or absolute) and clip its content. This component renders an
 * `absolute inset-0` wrapper without a z-index, so the video (z-1) takes part in the parent's stacking
 * context: a gradient at z-2 and a caption at z-3 stay above it. The wrapper ignores the pointer; the
 * hover is read on the parent.
 */

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

// ---------------------------------------------------------------------------
// Playback budget: at most MAX_PLAYING loops decode at once, whatever the page
// ---------------------------------------------------------------------------

const MAX_PLAYING = 2

interface Slot {
  run: (on: boolean) => void
}

/** Loops that want to play, the one that asked last first */
const queue: Slot[] = []
let listening = false

function reconcile() {
  queue.forEach((slot, i) => slot.run(i < MAX_PLAYING))
}

function enter(slot: Slot) {
  if (!listening && typeof document !== 'undefined') {
    listening = true
    // A hidden tab pauses everything, a visible one resumes what was wanted
    document.addEventListener('visibilitychange', reconcile)
  }
  if (!queue.includes(slot)) queue.unshift(slot)
  reconcile()
}

function leave(slot: Slot) {
  const i = queue.indexOf(slot)
  if (i >= 0) queue.splice(i, 1)
  slot.run(false)
  reconcile()
}

// ---------------------------------------------------------------------------

/** How long the video takes to fade in and out over the picture */
const FADE_MS = 300

interface HeroLoopProps {
  src: string
  /** Same classes as the cover picture (fit, padding, hover zoom), so the video frames like it */
  mediaClassName: string
  mediaStyle?: CSSProperties
  /** `preview`: card (hover, or centred on touch). `auto`: plays while visible. */
  mode?: 'preview' | 'auto'
}

export default function HeroLoop({ src, mediaClassName, mediaStyle, mode = 'preview' }: HeroLoopProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [idle, setIdle] = useState(false)
  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [canHover, setCanHover] = useState(true)
  const [dataOk, setDataOk] = useState(false)
  const [reduced, setReduced] = useState(true)
  const [shown, setShown] = useState(false)
  const [failed, setFailed] = useState(false)

  const lastOn = useRef(false)
  const wantsRef = useRef(false)
  const restTimer = useRef<number | undefined>(undefined)

  const slot = useRef<Slot>({
    run: (on) => {
      lastOn.current = on
      const video = videoRef.current
      if (!video) return
      if (on && !document.hidden) video.play().catch(() => {})
      else video.pause()
    },
  }).current

  // The video request starts after the page has loaded, so it never competes with the LCP picture
  useEffect(() => {
    let cancelled = false
    let handle: number | undefined
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    const go = () => {
      if (!cancelled) setIdle(true)
    }
    const schedule = () => {
      if (w.requestIdleCallback) handle = w.requestIdleCallback(go, { timeout: 2000 })
      else handle = window.setTimeout(go, 300)
    }
    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })
    return () => {
      cancelled = true
      window.removeEventListener('load', schedule)
      if (handle !== undefined) {
        if (w.requestIdleCallback && w.cancelIdleCallback) w.cancelIdleCallback(handle)
        else window.clearTimeout(handle)
      }
    }
  }, [])

  // The data saver: no video. Reduced motion: no autoplay. Hover or touch: how a card is previewed.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const hover = window.matchMedia('(hover: hover) and (pointer: fine)')
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const sync = () => {
      setDataOk(!conn?.saveData)
      setReduced(reduce.matches)
      setCanHover(hover.matches)
    }
    sync()
    reduce.addEventListener('change', sync)
    hover.addEventListener('change', sync)
    return () => {
      reduce.removeEventListener('change', sync)
      hover.removeEventListener('change', sync)
    }
  }, [])

  // Near the viewport (any side, 600px): create the video element. Visible: the case study hero
  // plays from a quarter of the panel, a card on touch screens from 60% (centred).
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          nearObserver.disconnect()
        }
      },
      { rootMargin: '600px' },
    )
    const visibleObserver = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: mode === 'auto' ? 0.25 : 0.6,
    })
    nearObserver.observe(el)
    visibleObserver.observe(el)
    return () => {
      nearObserver.disconnect()
      visibleObserver.disconnect()
    }
  }, [mode])

  // Preview with a mouse: the card (the link around the picture) is the hover target. A keyboard
  // focus on it counts too.
  useEffect(() => {
    if (mode !== 'preview') return
    const card = wrapRef.current?.parentElement
    if (!card) return
    const enterCard = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') setHovering(true)
    }
    const leaveCard = () => setHovering(false)
    const focusIn = () => {
      if (card.matches(':focus-visible') || card.querySelector(':focus-visible')) setHovering(true)
    }
    card.addEventListener('pointerenter', enterCard)
    card.addEventListener('pointerleave', leaveCard)
    card.addEventListener('pointercancel', leaveCard)
    card.addEventListener('focusin', focusIn)
    card.addEventListener('focusout', leaveCard)
    return () => {
      card.removeEventListener('pointerenter', enterCard)
      card.removeEventListener('pointerleave', leaveCard)
      card.removeEventListener('pointercancel', leaveCard)
      card.removeEventListener('focusin', focusIn)
      card.removeEventListener('focusout', leaveCard)
    }
  }, [mode])

  // With reduced motion only a hovered card can play: elsewhere no video is created (nothing to download)
  const hoverOnly = mode === 'preview' && canHover
  const canPlay = dataOk && (!reduced || hoverOnly)
  const mounted = idle && near && canPlay && !failed

  const wants = mounted && (mode === 'auto' ? visible : canHover ? hovering : visible)
  wantsRef.current = wants

  // Join or leave the playback budget. In preview, the video fades out first, then pauses and rewinds
  // to its first frame, so the next hover starts from the picture's own framing.
  useEffect(() => {
    window.clearTimeout(restTimer.current)
    if (wants) {
      enter(slot)
      return
    }
    if (mode === 'preview') {
      setShown(false)
      restTimer.current = window.setTimeout(() => {
        leave(slot)
        const video = videoRef.current
        if (video && !wantsRef.current) video.currentTime = 0
      }, FADE_MS)
    } else {
      leave(slot)
    }
  }, [wants, mode, slot])

  useEffect(
    () => () => {
      window.clearTimeout(restTimer.current)
      leave(slot)
    },
    [slot],
  )

  // A video that mounts while its slot is already granted starts right away
  useEffect(() => {
    if (mounted && lastOn.current) slot.run(true)
  }, [mounted, slot])

  // A file that is missing or cannot be decoded leaves the picture alone: nothing of this component stays in the page
  if (failed) return null

  return (
    <div ref={wrapRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
      {mounted && (
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          onPlaying={() => {
            if (wantsRef.current) setShown(true)
          }}
          onError={() => setFailed(true)}
          className={`absolute inset-0 z-[1] ${mediaClassName} ${shown ? 'opacity-100' : 'opacity-0'}`}
          // The picture's hover zoom and the fade share one transition, so the video moves like the picture
          style={{
            ...mediaStyle,
            transitionProperty: 'opacity, transform',
            transitionDuration: `${FADE_MS}ms`,
          }}
        />
      )}
    </div>
  )
}
