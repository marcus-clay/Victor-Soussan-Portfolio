'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import DeviceMockup from '@/components/case-study/DeviceMockup'

export interface FlowItem {
  id: string
  title: string
  /** What the flow shows, in one sentence */
  line: string
  /** Still of the first screen, shown until the clip plays */
  poster: string
  video: string
}

interface FlowPlayerProps {
  items: FlowItem[]
  /** Accessible name of the whole player */
  ariaLabel: string
  prevLabel: string
  nextLabel: string
  /** Screen ratio of the clips (width / height) */
  aspect?: number
}

const pad2 = (n: number) => String(n).padStart(2, '0')

/**
 * Several clips of the same kind of screen, played one at a time on the same grey stage, counter and arrows
 * as the strips of the page. Side by side, five phones moving together give the eye nothing to follow: here
 * a single phone plays, with its caption under it, and the next clip starts when the first one ends. The clip
 * only plays while the stage is on screen. With reduced motion nothing starts on its own: the still stays,
 * and the arrows change the screen.
 */
export default function FlowPlayer({ items, ariaLabel, prevLabel, nextLabel, aspect }: FlowPlayerProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const visibleRef = useRef(false)
  const reducedRef = useRef(false)
  const [index, setIndex] = useState(0)
  const [ready, setReady] = useState(false)

  const item = items[index]
  const total = items.length

  const play = useCallback(() => {
    const video = videoRef.current
    if (video) void video.play().catch(() => {})
  }, [])

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // The clip plays while the stage is on screen and pauses when it leaves.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        const video = videoRef.current
        if (!video) return
        if (entry.isIntersecting && !reducedRef.current) play()
        else video.pause()
      },
      { threshold: 0.35 }
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [play])

  // A new clip starts from its first image.
  useEffect(() => {
    setReady(false)
    if (visibleRef.current && !reducedRef.current) play()
  }, [index, play])

  const go = (next: number) => setIndex((next + total) % total)

  return (
    <div ref={rootRef} role="group" aria-roledescription="carousel" aria-label={ariaLabel} className="bg-[#E8E8E8] rounded-xl overflow-hidden ring-1 ring-black/[0.04]">
      <figure className="m-0 px-8 md:px-14 pt-10 md:pt-14 pb-5">
        <div className="mx-auto w-[min(66vw,260px)]">
          <DeviceMockup
            kind="phone"
            screen={{ src: item.poster }}
            label={item.title}
            aspect={aspect}
            custom={
              <div className="relative h-full w-full bg-white">
                <img src={item.poster} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover object-top" />
                <video
                  ref={videoRef}
                  src={item.video}
                  muted
                  playsInline
                  preload="metadata"
                  aria-label={item.title}
                  onPlaying={() => setReady(true)}
                  onEnded={() => !reducedRef.current && go(index + 1)}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-200 ease-out"
                  style={{ opacity: ready ? 1 : 0 }}
                />
              </div>
            }
          />
        </div>
        <figcaption className="mt-4 text-center text-xs text-gray-500">
          {item.title}
          <span className="mx-auto mt-1 block max-w-[46ch] text-sm text-gray-600">{item.line}</span>
        </figcaption>
      </figure>

      <div className="flex items-center gap-3 px-8 md:px-14 pb-6 md:pb-8">
        <p className="min-w-[4.5rem] text-xs text-gray-500 tabular-nums" aria-live="off">
          {pad2(index + 1)} / {pad2(total)}
        </p>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            aria-label={prevLabel}
            onClick={() => go(index - 1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 transition-[background-color,transform,opacity] duration-150 [@media(hover:hover)]:hover:bg-gray-100 active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            <ArrowLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={() => go(index + 1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 transition-[background-color,transform,opacity] duration-150 [@media(hover:hover)]:hover:bg-gray-100 active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
