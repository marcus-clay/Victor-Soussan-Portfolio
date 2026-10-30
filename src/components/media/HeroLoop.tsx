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
 *   picture, then rewinds to the first frame. A card flagged `active` (the one a carousel rests on)
 *   also plays without any hover, so the strip is never still on a desktop. On touch screens (no
 *   hover) it plays while the card is centred in the viewport (60% visible).
 * - `auto`: plays in a loop as soon as a sliver of the panel shows and pauses when it leaves. The case
 *   study hero no longer uses it: like the covers of the Work page, it plays on hover (`preview`).
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
import { HOVER_ZOOM_EASE, HOVER_ZOOM_MS, type HeroVideo } from '@/data/heroVideos'

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

/** Share of the card in view: enough for the case study hero and for a carousel's resting card, centred on touch */
const PARTLY = 0.25
const CENTRED = 0.6
/** The case study hero plays from its first rows in view: under a long title it starts at the fold */
const HERO_START = 0.08

/** How long the video takes to fade in and out over the picture */
const FADE_MS = 300
/** Opacity crossfade: symmetric, so neither the video nor the picture pops at either end */
const CROSSFADE_EASE = 'cubic-bezier(0.45, 0, 0.55, 1)'
/** Hover zoom when the caller does not pass its own curve: the curve of every image hover of the site */
const MOVE_EASE = 'cubic-bezier(0.23, 1, 0.32, 1)'
/** Softening applied while the video dissolves back into the picture */
const EXIT_BLUR_PX = 2

interface HeroLoopProps {
  src: string
  /** Same classes as the cover picture (fit, padding, hover zoom), so the video frames like it */
  mediaClassName: string
  mediaStyle?: CSSProperties
  /** `preview`: card (hover, or centred on touch). `auto`: plays while visible. */
  mode?: 'preview' | 'auto'
  /** `preview` with a mouse: the card a carousel rests on plays without hover (never under reduced motion) */
  active?: boolean
  /** The device screen the loop plays in, for a cover in perspective (see HeroVideo) */
  screen?: HeroVideo['screen']
}

/** Base size of the projected screen; the transform scales it to the corners */
const SCREEN_W = 1000

/**
 * matrix3d that maps a w × h box (origin top left) onto four points: the projective transform of a
 * rectangle onto any quadrilateral, so a flat video sits on a screen seen at an angle.
 */
function quadMatrix(w: number, h: number, [p0, p1, p2, p3]: [number, number][]) {
  const [x0, y0] = p0
  const [x1, y1] = p1
  const [x2, y2] = p2
  const [x3, y3] = p3
  const dx1 = x1 - x2
  const dx2 = x3 - x2
  const dy1 = y1 - y2
  const dy2 = y3 - y2
  const sx = x0 - x1 + x2 - x3
  const sy = y0 - y1 + y2 - y3
  const den = dx1 * dy2 - dx2 * dy1
  const g = (sx * dy2 - dx2 * sy) / den
  const k = (dx1 * sy - sx * dy1) / den
  const a = x1 - x0 + g * x1
  const b = x3 - x0 + k * x3
  const d = y1 - y0 + g * y1
  const e = y3 - y0 + k * y3
  return `matrix3d(${[a / w, d / w, 0, g / w, b / h, e / h, 0, k / h, 0, 0, 1, 0, x0, y0, 0, 1].join(',')})`
}

export default function HeroLoop({ src, mediaClassName, mediaStyle, mode = 'preview', active = false, screen }: HeroLoopProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  // Size of the frame, for a loop projected onto a screen in perspective
  const [box, setBox] = useState<{ w: number; h: number } | null>(null)
  useEffect(() => {
    const el = wrapRef.current
    if (!screen || !el) return
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [screen])
  const videoRef = useRef<HTMLVideoElement>(null)

  const [idle, setIdle] = useState(false)
  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)
  const [partly, setPartly] = useState(false)
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
    // Below its lowest threshold the browser reports isIntersecting: false, so the ratio is read instead.
    // A tall card cut by the fold (about a third visible on a laptop) still counts as partly visible.
    const visibleObserver = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.isIntersecting ? entry.intersectionRatio : 0
        setPartly(ratio >= PARTLY - 0.01)
        setVisible(ratio >= (mode === 'auto' ? HERO_START : CENTRED) - 0.01)
      },
      { threshold: [HERO_START, PARTLY, CENTRED] },
    )
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

  const restingCard = active && partly && !reduced
  const wants = mounted && (mode === 'auto' ? visible : canHover ? hovering || restingCard : visible)
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

  // The picture's hover zoom and the fade share one duration, so the video moves like the picture.
  // Each property gets its own curve: the opacity crossfade is symmetric (a strong ease-out would
  // show the video almost at once), the hover zoom keeps the picture's curve. The blur only runs on
  // the way out, when a mid-loop frame dissolves into the still picture: it lets the eye read one
  // object changing instead of two overlapping. Coming in the first frame is the picture's own
  // framing (see HeroVideo), so it needs no mask and the picture stays crisp.
  const frameClass = `absolute inset-0 z-[1] ${mediaClassName} ${shown ? 'opacity-100' : 'opacity-0'}`
  const frameStyle: CSSProperties = {
    ...mediaStyle,
    filter: shown ? 'blur(0px)' : `blur(${EXIT_BLUR_PX}px)`,
    // `scale` carries the hover zoom of the animated visuals (HERO_HOVER_ZOOM), in step with the picture
    transitionProperty: shown ? 'opacity, transform, scale' : 'opacity, transform, scale, filter',
    // The hover zoom runs on its own slow curve, the same as the picture's
    transitionDuration: [`${FADE_MS}ms`, `${HOVER_ZOOM_MS}ms`, `${HOVER_ZOOM_MS}ms`, ...(shown ? [] : [`${FADE_MS}ms`])].join(', '),
    transitionTimingFunction: [
      CROSSFADE_EASE,
      mediaStyle?.transitionTimingFunction ?? MOVE_EASE,
      HOVER_ZOOM_EASE,
      ...(shown ? [] : [CROSSFADE_EASE]),
    ].join(', '),
  }

  const video = mounted && (
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
      className={screen ? 'block h-full w-full object-cover' : frameClass}
      style={screen ? undefined : frameStyle}
    />
  )

  return (
    <div ref={wrapRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
      {screen
        ? mounted &&
          box && (
            // A layer the size of the frame carries the fade and the hover zoom; inside it, the video is laid
            // onto the screen of the device, at the angle of the picture
            <div className={frameClass} style={{ ...frameStyle, objectFit: undefined }}>
              <div
                className="absolute left-0 top-0 overflow-hidden bg-black"
                style={{
                  width: SCREEN_W,
                  height: SCREEN_W / screen.ratio,
                  transformOrigin: '0 0',
                  transform: quadMatrix(
                    SCREEN_W,
                    SCREEN_W / screen.ratio,
                    screen.corners.map(([x, y]) => [x * box.w, y * box.h] as [number, number]),
                  ),
                }}
              >
                {video}
              </div>
            </div>
          )
        : video}
    </div>
  )
}
