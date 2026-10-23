'use client'

/**
 * ThumbVideo: a video thumbnail that plays in place.
 *
 * - Muted, looping, plays while on screen and pauses off screen (see useAutoplayVideo: at most
 *   three videos play at once on a page). The thumbnail moving is what tells it is a video: no
 *   badge, no control. Clicking it opens the viewer, as for a picture.
 * - Reduced motion: nothing starts by itself, the poster or first frame stays still.
 * - Until the first frame is there, the optional `poster` stays visible, or a soft neutral tint
 *   holds the place. A file that fails to load leaves the tint and nothing else.
 *
 * `className` goes to the <video>, `containerClassName` to the wrapper.
 */

import React, { useRef } from 'react'
import { useAutoplayVideo } from './useAutoplayVideo'

interface ThumbVideoProps {
  src: string
  poster?: string
  className?: string
  containerClassName?: string
}

export default function ThumbVideo({
  src,
  poster,
  className = 'w-full h-auto block',
  containerClassName = '',
}: ThumbVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const { ready } = useAutoplayVideo(ref)

  return (
    <div className={`relative ${containerClassName}`} style={{ isolation: 'isolate' }}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        loop
        muted
        playsInline
        preload="metadata"
        className={className}
        style={{ display: 'block' }}
      />
      {/* Place holder tint, translucent so it reads on light and dark pages. Not with a poster:
          the picture itself holds the place. */}
      {!poster && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-neutral-500/[0.14] transition-opacity duration-200 ease-out"
          style={{ opacity: ready ? 0 : 1 }}
        />
      )}
    </div>
  )
}
