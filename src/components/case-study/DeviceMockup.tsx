'use client'

import React, { useEffect, useRef, useState } from 'react'
import { zoomable } from '@/utils/zoomable'

export type DeviceKind = 'phone' | 'tablet' | 'browser'

export interface DeviceScreen {
  /** Still picture of the screen, or the poster of a video */
  src: string
  /** Looping clip of the interaction, played while the device is on screen */
  video?: string
  width?: number
  height?: number
}

interface DeviceMockupProps {
  kind: DeviceKind
  screen: DeviceScreen
  /** Name of the screen, read by assistive technology */
  label: string
  /** Width / height of the screen. Phone defaults to 390 / 844, tablet and browser to 4 / 3 and 16 / 10 */
  aspect?: number
  /** Opens the screen in the page lightbox */
  onZoom?: () => void
  /** Address shown in the browser bar */
  url?: string
  className?: string
}

const DEFAULT_ASPECT: Record<DeviceKind, number> = { phone: 390 / 844, tablet: 4 / 3, browser: 16 / 10 }

/** Plays a clip only while it is visible, and never when the visitor asks for reduced motion. */
function ScreenMedia({ screen, label, eager }: { screen: DeviceScreen; label: string; eager?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || reduced) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.35 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [reduced, screen.video])

  if (screen.video && !reduced) {
    return (
      <video
        ref={videoRef}
        src={screen.video}
        poster={screen.src}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        className="block w-full h-full object-cover object-top"
      />
    )
  }
  return (
    <img
      src={screen.src}
      width={screen.width}
      height={screen.height}
      alt=""
      loading={eager ? 'eager' : 'lazy'}
      draggable={false}
      className="block w-full h-full object-cover object-top"
    />
  )
}

/**
 * A screen inside a device, drawn in CSS so that the screen stays sharp at any size and the
 * frame never carries a baked shadow. Every length is a share of the device width (`cqw`),
 * so a phone at 200px and a phone at 420px keep the same proportions.
 */
export default function DeviceMockup({ kind, screen, label, aspect, onZoom, url, className = '' }: DeviceMockupProps) {
  const ratio = aspect ?? DEFAULT_ASPECT[kind]
  const interactive = onZoom ? { ...zoomable(() => onZoom()), 'aria-label': label } : {}

  const press =
    'transition-transform duration-[160ms] ease-out active:scale-[0.985] [@media(hover:hover)]:hover:scale-[1.01]'

  if (kind === 'phone') {
    return (
      <div className={`relative [container-type:inline-size] ${className}`}>
        <div
          {...interactive}
          className={`relative bg-[#0E0F11] p-[3.4cqw] [border-radius:15.5cqw] shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_0_0_0.5px_rgba(0,0,0,0.5),0_2.4cqw_6cqw_-3cqw_rgba(17,17,17,0.28)] ${
            onZoom ? `cursor-zoom-in ${press}` : ''
          }`}
        >
          <div className="relative overflow-hidden bg-white [border-radius:12.2cqw]" style={{ aspectRatio: ratio }}>
            <ScreenMedia screen={screen} label={label} />
            {/* Dynamic Island */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 -translate-x-1/2 bg-[#0E0F11] [top:3cqw] [width:30cqw] [height:8.6cqw] [border-radius:4.3cqw]"
            />
          </div>
        </div>
        {/* Side buttons */}
        <span aria-hidden="true" className="absolute bg-[#1B1C1F] [left:-0.7cqw] [top:24cqw] [width:0.9cqw] [height:7cqw] [border-radius:0.4cqw]" />
        <span aria-hidden="true" className="absolute bg-[#1B1C1F] [left:-0.7cqw] [top:36cqw] [width:0.9cqw] [height:12cqw] [border-radius:0.4cqw]" />
        <span aria-hidden="true" className="absolute bg-[#1B1C1F] [right:-0.7cqw] [top:40cqw] [width:0.9cqw] [height:17cqw] [border-radius:0.4cqw]" />
      </div>
    )
  }

  if (kind === 'tablet') {
    return (
      <div className={`relative [container-type:inline-size] ${className}`}>
        <div
          {...interactive}
          className={`relative bg-[#0E0F11] p-[2.4cqw] [border-radius:4.4cqw] shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_0_0_0.5px_rgba(0,0,0,0.5),0_2.4cqw_6cqw_-3cqw_rgba(17,17,17,0.28)] ${
            onZoom ? `cursor-zoom-in ${press}` : ''
          }`}
        >
          <div className="relative overflow-hidden bg-white [border-radius:2.2cqw]" style={{ aspectRatio: ratio }}>
            <ScreenMedia screen={screen} label={label} />
          </div>
        </div>
      </div>
    )
  }

  // browser
  return (
    <div className={`relative [container-type:inline-size] ${className}`}>
      <div
        {...interactive}
        className={`relative overflow-hidden bg-[#F4F4F5] [border-radius:1.6cqw] shadow-[0_0_0_1px_rgba(17,17,17,0.1),0_2cqw_5cqw_-2.5cqw_rgba(17,17,17,0.22)] ${
          onZoom ? `cursor-zoom-in ${press}` : ''
        }`}
      >
        <div className="flex items-center bg-[#F4F4F5] [height:4.6cqw] [padding-inline:1.8cqw] [gap:0.9cqw]" aria-hidden="true">
          <span className="rounded-full bg-[#D4D4D8] [width:1cqw] [height:1cqw]" />
          <span className="rounded-full bg-[#D4D4D8] [width:1cqw] [height:1cqw]" />
          <span className="rounded-full bg-[#D4D4D8] [width:1cqw] [height:1cqw]" />
          {url && (
            <span className="mx-auto truncate rounded-full bg-white text-center text-gray-500 [height:2.8cqw] [width:38cqw] [line-height:2.8cqw] [font-size:1.5cqw]">
              {url}
            </span>
          )}
        </div>
        <div className="relative overflow-hidden bg-white" style={{ aspectRatio: ratio }}>
          <ScreenMedia screen={screen} label={label} />
        </div>
      </div>
    </div>
  )
}
