'use client'

/**
 * useAutoplayVideo: plays a muted looping video while it is on screen, pauses it when it leaves.
 *
 * - One arbiter for the whole page: at most MAX_PLAYING videos play at the same time. When more
 *   are visible, the ones most in view win. A video the visitor started by hand always plays.
 * - A manual pause is respected: scrolling never restarts a video the visitor stopped.
 * - prefers-reduced-motion: reduce means no automatic playback. The visitor starts the video
 *   (a visible play button is the component's job), and it stops again when it leaves the screen.
 * - Tab hidden: everything pauses, and resumes when the tab comes back.
 *
 * Returns what the interface needs to show: playing, ready (a frame is available), loaded (the file
 * answered, so controls make sense) and failed (the file did not load: show no control at all).
 */

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'

const MAX_PLAYING = 3

interface Entry {
  video: HTMLVideoElement
  ratio: number
  visible: boolean
  userPaused: boolean
  forced: boolean
  auto: boolean
}

const entries = new Set<Entry>()
let frame = 0
let listening = false
let suspended = false

/** A viewer (lightbox) covers the page: nothing behind it needs to play. Pass false to resume. */
export function setAutoplaySuspended(value: boolean) {
  if (suspended === value) return
  suspended = value
  if (typeof document !== 'undefined') schedule()
}

function arbitrate() {
  frame = 0
  const hidden = document.hidden || suspended
  const wanting = [...entries].filter(
    (e) => !hidden && e.visible && !e.userPaused && (e.auto || e.forced)
  )
  // Started by hand first, then the most visible, then the ones already playing (no flip-flop)
  wanting.sort(
    (a, b) =>
      Number(b.forced) - Number(a.forced) ||
      b.ratio - a.ratio ||
      Number(!b.video.paused) - Number(!a.video.paused)
  )
  const forcedCount = wanting.filter((e) => e.forced).length
  const allowed = new Set(wanting.slice(0, Math.max(MAX_PLAYING, forcedCount)))
  entries.forEach((e) => {
    if (allowed.has(e)) {
      if (e.video.paused) e.video.play().catch(() => {})
    } else if (!e.video.paused) {
      e.video.pause()
    }
  })
}

function schedule() {
  if (frame) return
  frame = requestAnimationFrame(arbitrate)
}

function listen() {
  if (listening) return
  listening = true
  document.addEventListener('visibilitychange', schedule)
}

export function useAutoplayVideo(
  ref: RefObject<HTMLVideoElement | null>,
  { autoplay = true }: { autoplay?: boolean } = {}
) {
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [reduced, setReduced] = useState(false)
  const entry = useRef<Entry | null>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    listen()

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const e: Entry = {
      video,
      ratio: 0,
      visible: false,
      userPaused: false,
      forced: false,
      auto: autoplay && !mq.matches,
    }
    entry.current = e
    entries.add(e)
    setReduced(mq.matches)

    const onMotion = () => {
      e.auto = autoplay && !mq.matches
      setReduced(mq.matches)
      if (!e.auto && !e.forced && !video.paused) video.pause()
      schedule()
    }
    mq.addEventListener('change', onMotion)

    const observer = new IntersectionObserver(
      (items) => {
        const last = items[items.length - 1]
        e.visible = last.isIntersecting
        e.ratio = last.intersectionRatio
        // Leaving the screen ends a manual start; coming back is the automatic rules again
        if (!e.visible) e.forced = false
        schedule()
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    observer.observe(video)

    const onPlaying = () => {
      setPlaying(true)
      setReady(true)
    }
    const onPause = () => setPlaying(false)
    const onMeta = () => setLoaded(true)
    const onData = () => {
      setLoaded(true)
      setReady(true)
    }
    const onError = () => setFailed(true)
    video.addEventListener('playing', onPlaying)
    video.addEventListener('pause', onPause)
    video.addEventListener('loadedmetadata', onMeta)
    video.addEventListener('loadeddata', onData)
    video.addEventListener('error', onError)
    // The file can already be there (cache, fast refresh)
    if (video.error) onError()
    else if (video.readyState >= 2) onData()
    else if (video.readyState >= 1) onMeta()
    setPlaying(!video.paused)

    return () => {
      mq.removeEventListener('change', onMotion)
      observer.disconnect()
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('loadedmetadata', onMeta)
      video.removeEventListener('loadeddata', onData)
      video.removeEventListener('error', onError)
      entries.delete(e)
      entry.current = null
    }
  }, [ref, autoplay])

  /** The visitor's own play or pause */
  const toggle = useCallback(() => {
    const e = entry.current
    const video = ref.current
    if (!e || !video) return
    if (!video.paused) {
      e.userPaused = true
      e.forced = false
      video.pause()
    } else {
      e.userPaused = false
      e.forced = true
      video.play().catch(() => {})
      schedule()
    }
  }, [ref])

  return { playing, ready, loaded, failed, reduced, toggle }
}
