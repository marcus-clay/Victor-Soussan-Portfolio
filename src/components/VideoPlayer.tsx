'use client'

/**
 * VideoPlayer: autoplay loop video with a persistent play/pause toggle.
 * - Plays automatically (muted, loop) while on screen and pauses off screen, so videos below
 *   the fold are not downloaded or decoded until the reader gets near them. Metadata is still
 *   fetched up front: without it the video has no size and the page shifts when it starts.
 * - A manual pause is respected: scrolling never restarts a video the reader stopped
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

  const pausedByUser = useRef(false)

  // Play while visible, pause when scrolled away. Muted + playsInline lets browsers allow
  // autoplay; if one refuses, the play button stays available. The margin starts the
  // download a little before the video enters the viewport.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!pausedByUser.current) video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    )
    observer.observe(video)
    return () => observer.disconnect()
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
      pausedByUser.current = true
      video.pause()
    } else {
      pausedByUser.current = false
      video.play().catch(() => {})
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

      {/* Play / Pause button: bottom-right */}
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
