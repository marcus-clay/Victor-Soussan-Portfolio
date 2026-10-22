'use client'

/**
 * VideoPlayer: autoplay loop video with a persistent play/pause toggle.
 * - Plays automatically (muted, loop) while on screen and pauses off screen, so videos below
 *   the fold are not decoded until the reader gets near them. Metadata is still fetched up
 *   front: without it the video has no size and the page shifts when it starts. At most three
 *   videos play at once on a page (useAutoplayVideo).
 * - A manual pause is respected: scrolling never restarts a video the reader stopped
 * - Play/Pause button always visible at bottom-right (dim at rest, bright on hover / when paused),
 *   28px button with a 44px hit area
 * - Until the first frame is there, the optional `poster` stays visible, or a soft neutral tint holds the place
 * - Controls are rendered only once the file has answered, and never if it failed to load
 * - prefers-reduced-motion: reduce: nothing starts by itself. A large play button invites the
 *   reader to start it, and it stops again when it leaves the screen.
 */

import React, { useRef, useState } from 'react'
import { Play, Pause } from '@phosphor-icons/react'
import { useAutoplayVideo } from '@/components/media/useAutoplayVideo'
import { VIDEO_COPY, useVideoLang, type UiLang } from '@/components/media/videoLabels'

interface VideoPlayerProps {
  src: string
  /** Classes applied to the <video> element itself */
  className?: string
  /** Classes applied to the outer container div */
  containerClassName?: string
  caption?: string
  /** Aspect ratio wrapper class e.g. "aspect-video" */
  aspectClassName?: string
  /** Picture shown until the video has a frame of its own */
  poster?: string
  /** Language of the button labels. Default: the document's. */
  lang?: UiLang
}

export default function VideoPlayer({
  src,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  caption,
  aspectClassName,
  poster,
  lang,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const { playing, ready, loaded, failed, reduced, toggle } = useAutoplayVideo(videoRef)
  const copy = VIDEO_COPY[useVideoLang(lang)]

  const onToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggle()
  }

  // Reduced motion: the reader starts the video, so the way to do it is large and obvious
  const controls = loaded && !failed
  const invite = controls && reduced && !playing

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
        poster={poster}
        loop
        muted
        playsInline
        preload="metadata"
        className={className}
        style={{ display: 'block' }}
      />

      {/* Place holder tint until the first frame (translucent: reads on light and dark pages).
          Not with a poster: the picture itself holds the place. */}
      {!poster && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-neutral-500/[0.14] transition-opacity duration-200 ease-out"
          style={{ opacity: ready || failed ? 0 : 1 }}
        />
      )}

      {invite && (
        <button
          type="button"
          onClick={onToggle}
          aria-label={copy.play}
          className="absolute inset-0 z-10 m-auto flex items-center justify-center w-14 h-14 rounded-full
            before:absolute before:-inset-3 before:content-['']
            bg-black/60 text-white ring-1 ring-white/20 backdrop-blur-md cursor-pointer
            transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]
            active:scale-[0.97] [@media(hover:hover)]:hover:bg-black/75"
        >
          <Play size={22} weight="fill" aria-hidden="true" />
        </button>
      )}

      {controls && (
        <>
          {/* Play / Pause button: bottom-right */}
        <button
          type="button"
          onClick={onToggle}
          aria-label={playing ? copy.pause : copy.play}
          aria-hidden={invite || undefined}
          tabIndex={invite ? -1 : undefined}
          className="absolute bottom-3 right-3 z-10 flex items-center justify-center w-7 h-7 rounded-full
            before:absolute before:-inset-2 before:content-['']
            bg-black/50 text-white
            transition-opacity duration-200 ease-out"
          style={{
            opacity: invite ? 0 : isHovered || !playing ? 0.9 : 0.35,
            pointerEvents: invite ? 'none' : undefined,
          }}
        >
          {playing
            ? <Pause size={11} weight="fill" />
            : <Play  size={11} weight="fill" />
          }
        </button>
        </>
      )}
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
