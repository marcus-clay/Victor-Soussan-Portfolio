'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowCounterClockwise, Pause, Play } from '@phosphor-icons/react'
import { getIframeSrc } from '@/data/sqoolPrototypesData'

// The prototypes are authored at this size and scaled to the width of the device that holds them
const NATIVE_W = 1200
const NATIVE_H = 900

type PlayerState = 'loading' | 'ready' | 'playing' | 'paused'

interface PrototypeScreenProps {
  /** Prototype id in `public/prototypes` (T3, SC7...) */
  id: string
  title: string
  /** In a strip of prototypes only the focused one plays: leaving the focus pauses it */
  focused?: boolean
  labels: { play: string; pause: string; replay: string }
}

const BUTTON =
  'flex h-[clamp(28px,5cqw,38px)] w-[clamp(28px,5cqw,38px)] items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-[background-color,transform] duration-150 [@media(hover:hover)]:hover:bg-black/75 active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

/**
 * An interactive prototype (an animated flow of the SQOOL Classe work) shown inside a device frame.
 * The prototype page is embedded and driven by `postMessage` (play, pause, restart). It starts on
 * demand, never on its own, and the page can still be scrolled or swiped past it until it plays.
 */
export default function PrototypeScreen({ id, title, focused = true, labels }: PrototypeScreenProps) {
  const boxRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [state, setState] = useState<PlayerState>('loading')
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

  // A prototype that loses the focus of the strip stops where it is
  useEffect(() => {
    if (!focused && state === 'playing') {
      send('pause')
      setState('paused')
    }
  }, [focused, state, send])

  const play = () => {
    send('play')
    setState('playing')
  }
  const pause = () => {
    send('pause')
    setState('paused')
  }
  const replay = () => {
    send('restart')
    setState('playing')
  }

  const idle = state === 'ready' || state === 'paused'

  return (
    <div ref={boxRef} className="absolute inset-0 overflow-hidden bg-[#F2F2F7]">
      <iframe
        ref={frameRef}
        src={getIframeSrc(id)}
        title={title}
        loading="lazy"
        tabIndex={-1}
        sandbox="allow-scripts allow-same-origin"
        onLoad={() => setState((s) => (s === 'loading' ? 'ready' : s))}
        className={`block transition-opacity duration-300 ${state === 'loading' ? 'opacity-0' : 'opacity-100'}`}
        style={{
          border: 'none',
          width: NATIVE_W,
          height: NATIVE_H,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
          pointerEvents: idle ? 'none' : 'auto',
        }}
      />

      {state === 'loading' && (
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-black/10 border-t-transparent" />
        </div>
      )}

      {idle && (
        <button
          type="button"
          onClick={play}
          onKeyDown={(e) => e.stopPropagation()}
          aria-label={`${labels.play}: ${title}`}
          className="group absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/[0.04] transition-colors duration-150 [@media(hover:hover)]:hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gray-900"
        >
          <span className="flex h-[clamp(40px,11cqw,64px)] w-[clamp(40px,11cqw,64px)] items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition-transform duration-150 ease-out [@media(hover:hover)]:group-hover:scale-105">
            <Play size={20} weight="fill" aria-hidden="true" className="ml-0.5" />
          </span>
        </button>
      )}

      {state === 'playing' && (
        <div className="absolute bottom-[2.5cqw] right-[2.5cqw] z-10 flex items-center gap-[1.5cqw]">
          <button type="button" onClick={pause} onKeyDown={(e) => e.stopPropagation()} aria-label={labels.pause} className={BUTTON}>
            <Pause size={13} weight="fill" aria-hidden="true" />
          </button>
          <button type="button" onClick={replay} onKeyDown={(e) => e.stopPropagation()} aria-label={labels.replay} className={BUTTON}>
            <ArrowCounterClockwise size={13} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
