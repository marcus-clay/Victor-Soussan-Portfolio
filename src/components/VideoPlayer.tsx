'use client'

/**
 * VideoPlayer: autoplay loop video with a persistent play/pause toggle.
 * - Plays automatically (muted, loop) while on screen and pauses off screen, so videos below
 *   the fold are not decoded until the reader gets near them. Metadata is still fetched up
 *   front: without it the video has no size and the page shifts when it starts. At most three
 *   videos play at once on a page (useAutoplayVideo).
 * - A manual pause is respected: scrolling never restarts a video the reader stopped
 * - Same rule as every player of the site: stopped, a large play button sits in the middle so the
 *   video reads as a player; playing, a small pause button sits at the bottom right (dim at rest,
 *   bright on hover), 28px with a 44px hit area
 * - Until the first frame is there, the optional `poster` stays visible, or a soft neutral tint holds the place
 * - Controls are rendered only once the file has answered, and never if it failed to load
 * - prefers-reduced-motion: reduce: nothing starts by itself; the large play button invites the
 *   reader to start it, and it stops again when it leaves the screen.
 */

import React, { useRef } from 'react'
import { Pause } from '@phosphor-icons/react'
import { CenterPlay, CornerButton, CornerControls } from '@/components/media/PlayerControls'
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
  const { playing, ready, loaded, failed, toggle } = useAutoplayVideo(videoRef)
  const copy = VIDEO_COPY[useVideoLang(lang)]

  const onToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggle()
  }

  // Stopped (paused by the reader, or waiting under reduced motion): the way to start it is large and obvious
  const controls = loaded && !failed
  const invite = controls && !playing

  const inner = (
    <div
      className={`relative group ${containerClassName}`}
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

      {invite && <CenterPlay onClick={onToggle} label={copy.play} />}

      {controls && playing && (
        <CornerControls>
          <CornerButton onClick={() => toggle()} label={copy.pause} dim>
            <Pause size={11} weight="fill" aria-hidden="true" />
          </CornerButton>
        </CornerControls>
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
