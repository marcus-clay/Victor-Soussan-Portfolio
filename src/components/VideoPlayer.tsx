'use client'

/**
 * VideoPlayer — autoplay loop video with a persistent play/pause toggle.
 * - Plays automatically (muted, loop), except under prefers-reduced-motion
 * - Play/Pause button always visible at bottom-right (dim at rest, bright on hover / when paused)
 * - Click anywhere on video also toggles playback
 */

import React, { useRef, useState, useEffect } from 'react'
import { Play, Pause } from '@phosphor-icons/react'

interface VideoPlayerProps {
  src: string
  /** Classes applied to the <video> element itself */
  className?: string
  /** Classes applied to the outer container div */
  containerClassName?: string
  caption?: string
  /** Aspect ratio wrapper class e.g. "aspect-video" */
  aspectClassName?: string
}

export default function VideoPlayer({
  src,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  caption,
  aspectClassName,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Autoplay unless the visitor asked the system for reduced motion.
  // The `autoPlay` attribute is left off on purpose: it would start playback
  // before this check can run. A click on play still works either way.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      video.pause()
      setIsPlaying(false)
    } else {
      video.play().catch(() => {})
    }
  }, [])

  // Sync state if browser pauses externally (tab visibility, etc.)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
    }
  }, [])

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
  }

  const inner = (
    <div
      className={`relative group ${containerClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ isolation: 'isolate' }}
    >
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        preload="metadata"
        className={className}
        style={{ display: 'block' }}
      />

      {/* Play / Pause button — bottom-right */}
      <button
        onClick={toggle}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
        className="absolute bottom-3 right-3 z-10 flex items-center justify-center w-7 h-7 rounded-full
          before:absolute before:-inset-2 before:content-['']
          bg-black/50 text-white
          transition-opacity duration-200 ease-out"
        style={{
          opacity: isHovered || !isPlaying ? 0.9 : 0.35,
        }}
      >
        {isPlaying
          ? <Pause size={11} weight="fill" />
          : <Play  size={11} weight="fill" />
        }
      </button>
    </div>
  )

  if (!caption && !aspectClassName) return inner

  return (
    <div>
      {aspectClassName ? (
        <div className={aspectClassName}>{inner}</div>
      ) : inner}
      {caption && (
        <p className="mt-3 text-sm text-gray-500 leading-relaxed">{caption}</p>
      )}
    </div>
  )
}
