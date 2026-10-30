'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowCounterClockwise, ArrowsOut, Pause, Play, X } from '@phosphor-icons/react'
import { getIframeSrc } from '@/data/sqoolPrototypesData'
import DeviceMockup from '@/components/case-study/DeviceMockup'
import { useScrollLock } from '@/hooks/useScrollLock'
import { useReducedMotion } from '@/components/case-study/controls'
import { CenterPlay, CornerButton, CornerControls } from '@/components/media/PlayerControls'

// The prototypes are authored at this size and scaled to the width of the device that holds them
const NATIVE_W = 1200
const NATIVE_H = 900

type PlayerState = 'loading' | 'ready' | 'playing' | 'paused'

/** What a prototype page exposes to the host page (same origin): its time, and resuming at a given time */
interface ProtoControl {
  time: () => number
  /** Resolves once the prototype stands, paused, at that time */
  seek: (time: number) => Promise<void>
  play: () => void
  pause: () => void
}

const controlOf = (frame: HTMLIFrameElement | null): ProtoControl | undefined => {
  try {
    return (frame?.contentWindow as (Window & { protoControl?: ProtoControl }) | null)?.protoControl
  } catch {
    return undefined
  }
}

interface PrototypeScreenProps {
  /** Prototype id in `public/prototypes` (T3, SC7...) */
  id: string
  title: string
  /** In a strip of prototypes only the focused one plays: leaving the focus pauses it */
  focused?: boolean
  labels: { play: string; pause: string; replay: string; expand: string; close: string }
}

const LIGHTBOX_BUTTON =
  'flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-xl transition-[background-color,transform] duration-150 ease-out [@media(hover:hover)]:hover:bg-black/60 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

// Icon swap: 150 ms, 2 px of blur
const SWAP = {
  initial: { opacity: 0, transform: 'scale(0.8)', filter: 'blur(2px)' },
  animate: { opacity: 1, transform: 'scale(1)', filter: 'blur(0px)' },
  exit: { opacity: 0, transform: 'scale(0.8)', filter: 'blur(2px)' },
  transition: { duration: 0.15, ease: 'easeInOut' as const },
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** The prototype page at its native size, scaled to the width of the box that holds it. */
const ScaledFrame = React.forwardRef<HTMLIFrameElement, { id: string; title: string; visible: boolean; onLoad: () => void; lazy?: boolean }>(
  function ScaledFrame({ id, title, visible, onLoad, lazy }, ref) {
    const boxRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(0.5)
    useEffect(() => {
      const el = boxRef.current
      if (!el) return
      const measure = () => setScale(el.clientWidth / NATIVE_W)
      measure()
      const observer = new ResizeObserver(measure)
      observer.observe(el)
      return () => observer.disconnect()
    }, [])
    return (
      <div ref={boxRef} className="absolute inset-0 overflow-hidden bg-[#f5f5f7]">
        <iframe
          ref={ref}
          src={getIframeSrc(id)}
          title={title}
          loading={lazy ? 'lazy' : undefined}
          tabIndex={-1}
          sandbox="allow-scripts allow-same-origin"
          onLoad={onLoad}
          className={`block transition-opacity duration-300 ease-out ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{ border: 'none', width: NATIVE_W, height: NATIVE_H, transformOrigin: 'top left', transform: `scale(${scale})`, pointerEvents: 'none' }}
        />
      </div>
    )
  }
)

/**
 * An interactive prototype (an animated flow of the SQOOL Classe work) shown inside a device frame.
 * The prototype page is embedded and driven by `postMessage` (play, pause, restart). It plays while it
 * is in front and on screen, like the videos of the site; stopped, a large play button sits in the middle.
 * A click on the screen opens it larger in a lightbox, where it carries on from the same moment; closing
 * the lightbox brings the inline player to the moment the reader left.
 */
export default function PrototypeScreen({ id, title, focused = true, labels }: PrototypeScreenProps) {
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const pausedByUser = useRef(false)
  const [onScreen, setOnScreen] = useState(false)
  const [state, setState] = useState<PlayerState>('loading')
  const [lightbox, setLightbox] = useState<{ time: number; playing: boolean } | null>(null)

  // The frame is in the server HTML, so its load event can fire before React attaches `onLoad`.
  // The page is same-origin: read its state once on mount, so the player never waits for an event it missed.
  useEffect(() => {
    const frame = frameRef.current
    try {
      const doc = frame?.contentDocument
      if (doc && doc.readyState === 'complete' && frame?.contentWindow?.location.href !== 'about:blank') {
        setState((s) => (s === 'loading' ? 'ready' : s))
      }
    } catch {
      // cross-origin or not reachable: the onLoad handler stays the only signal
    }
  }, [])

  const send = useCallback((message: 'play' | 'pause' | 'restart') => {
    frameRef.current?.contentWindow?.postMessage(message, '*')
  }, [])

  // Like every video of the site, the prototype in front plays once half of it is on screen and stops when it
  // leaves; one that loses the focus of the strip stops where it is. A reader who paused it is never restarted.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (state === 'loading' || lightbox) return
    const wanted = focused && onScreen && !pausedByUser.current && !reduce
    if (wanted && state !== 'playing') {
      send('play')
      setState('playing')
    } else if (!(focused && onScreen) && state === 'playing') {
      send('pause')
      setState('paused')
    }
  }, [focused, onScreen, state, reduce, lightbox, send])

  const play = () => {
    pausedByUser.current = false
    send('play')
    setState('playing')
  }
  const pause = () => {
    pausedByUser.current = true
    send('pause')
    setState('paused')
  }
  const replay = () => {
    pausedByUser.current = false
    send('restart')
    setState('playing')
  }

  // The lightbox takes over from the moment the inline player is at; a prototype never started plays from the start
  const expand = () => {
    const playing = state === 'playing' || state === 'ready'
    const time = controlOf(frameRef.current)?.time() ?? 0
    send('pause')
    if (state === 'playing') setState('paused')
    setLightbox({ time, playing })
  }

  const closeLightbox = (time: number, playing: boolean) => {
    setLightbox(null)
    const control = controlOf(frameRef.current)
    pausedByUser.current = !playing
    setState(playing ? 'playing' : 'paused')
    void (control ? control.seek(time) : Promise.resolve()).then(() => {
      if (playing) send('play')
    })
  }

  const idle = state === 'ready' || state === 'paused'

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-[#f5f5f7]">
      <ScaledFrame ref={frameRef} id={id} title={title} visible={state !== 'loading'} lazy onLoad={() => setState((s) => (s === 'loading' ? 'ready' : s))} />

      {state === 'loading' && (
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-black/10 border-t-transparent" />
        </div>
      )}

      {state !== 'loading' && (
        <button
          type="button"
          onClick={expand}
          onKeyDown={(e) => e.stopPropagation()}
          aria-label={`${labels.expand}: ${title}`}
          className={`absolute inset-0 z-10 cursor-zoom-in transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gray-900 ${
            idle ? 'bg-black/[0.04] [@media(hover:hover)]:hover:bg-black/10' : 'bg-transparent'
          }`}
        />
      )}

      {idle && <CenterPlay onClick={play} label={`${labels.play}: ${title}`} className="z-20" />}

      {/* Corner of the grey container: pause and replay while it plays, and the way to open it larger */}
      {state !== 'loading' && focused && (
        <CornerControls fallbackClassName="absolute bottom-[2.5cqw] right-[2.5cqw] z-20">
          {state === 'playing' && (
            <>
              <CornerButton onClick={pause} label={labels.pause} dim>
                <Pause size={11} weight="fill" aria-hidden="true" />
              </CornerButton>
              <CornerButton onClick={replay} label={labels.replay} dim>
                <ArrowCounterClockwise size={12} aria-hidden="true" />
              </CornerButton>
            </>
          )}
          <CornerButton onClick={expand} label={`${labels.expand}: ${title}`} dim>
            <ArrowsOut size={12} aria-hidden="true" />
          </CornerButton>
        </CornerControls>
      )}

      <PrototypeLightbox open={lightbox !== null} id={id} title={title} startAt={lightbox?.time ?? 0} startPlaying={lightbox?.playing ?? true} labels={labels} onClose={closeLightbox} />
    </div>
  )
}

interface PrototypeLightboxProps {
  open: boolean
  id: string
  title: string
  startAt: number
  startPlaying: boolean
  labels: PrototypeScreenProps['labels']
  onClose: (time: number, playing: boolean) => void
}

/**
 * The prototype at the size of the screen, on the black of the site's lightbox. A second copy of the
 * prototype page loads hidden, jumps to the moment the inline player was at, then fades in and carries on.
 * Opening scales the tablet up from 0.96 over 250 ms, closing goes back down in 150 ms: the close gets out of
 * the way faster than the open arrives. Escape, the backdrop and the close button leave it; the page never moves.
 */
function PrototypeLightbox({ open, id, title, startAt, startPlaying, labels, onClose }: PrototypeLightboxProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  useScrollLock(open)
  if (!mounted) return null
  return createPortal(
    <AnimatePresence>{open && <LightboxBody key="proto-lightbox" id={id} title={title} startAt={startAt} startPlaying={startPlaying} labels={labels} onClose={onClose} />}</AnimatePresence>,
    document.body
  )
}

function LightboxBody({ id, title, startAt, startPlaying, labels, onClose }: Omit<PrototypeLightboxProps, 'open'>) {
  const reduce = useReducedMotion()
  const frameRef = useRef<HTMLIFrameElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(startPlaying)

  const close = useCallback(() => {
    const time = controlOf(frameRef.current)?.time() ?? startAt
    onClose(time, playing)
  }, [onClose, playing, startAt])

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    return () => previous?.focus?.()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  // Once the copy has loaded: bring it to the moment while hidden, then show it and play or hold
  const onLoad = () => {
    const control = controlOf(frameRef.current)
    void (control ? control.seek(startAt) : Promise.resolve()).then(() => {
      if (startPlaying) {
        if (control) control.play()
        else frameRef.current?.contentWindow?.postMessage('play', '*')
      }
      setReady(true)
    })
  }

  const toggle = () => {
    const control = controlOf(frameRef.current)
    if (playing) control?.pause()
    else control?.play()
    setPlaying(!playing)
  }

  const replay = () => {
    frameRef.current?.contentWindow?.postMessage('restart', '*')
    setPlaying(true)
  }

  return (
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-4 py-20 md:px-10">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.92, transition: { duration: 0.25, ease: EASE_OUT } }}
        exit={{ opacity: 0, transition: { duration: 0.15, ease: EASE_OUT } }}
        onClick={close}
      />

      <motion.div
        className="relative w-[min(100%,1280px,calc((100svh-180px)*1.25))]"
        initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'scale(0.96)' }}
        animate={{ opacity: 1, transform: 'scale(1)', transition: { duration: 0.25, ease: EASE_OUT } }}
        exit={reduce ? { opacity: 0, transition: { duration: 0.15 } } : { opacity: 0, transform: 'scale(0.96)', transition: { duration: 0.15, ease: EASE_OUT } }}
      >
        <DeviceMockup
          kind="tablet"
          screen={{ src: '' }}
          label={title}
          custom={
            <>
              <ScaledFrame ref={frameRef} id={id} title={title} visible={ready} onLoad={onLoad} />
              {!ready && (
                <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                  <span className="h-6 w-6 animate-spin rounded-full border-2 border-black/10 border-t-transparent" />
                </div>
              )}
            </>
          }
        />
        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="min-w-0 truncate text-sm text-white/70">{title}</p>
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" onClick={toggle} aria-label={playing ? labels.pause : labels.play} className={LIGHTBOX_BUTTON}>
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span key={playing ? 'pause' : 'play'} {...SWAP} className="flex">
                  {playing ? <Pause size={16} weight="fill" aria-hidden="true" /> : <Play size={16} weight="fill" aria-hidden="true" className="ml-0.5" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <button type="button" onClick={replay} aria-label={labels.replay} className={LIGHTBOX_BUTTON}>
              <ArrowCounterClockwise size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.div>

      <button ref={closeRef} type="button" onClick={close} aria-label={labels.close} className={`absolute right-4 top-4 z-20 ${LIGHTBOX_BUTTON}`}>
        <X size={22} aria-hidden="true" />
      </button>
    </div>
  )
}
