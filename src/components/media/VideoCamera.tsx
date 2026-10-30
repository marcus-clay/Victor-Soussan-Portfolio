'use client'

/**
 * The camera of a recorded prototype, as in a product film: it follows the video's own time, pushes in on
 * the part of the screen where the action is (a field being filled, a menu, a panel) and pulls back to the
 * whole screen when the screen changes. Critically damped springs, so it never overshoots; while it travels,
 * a blur that grows with its speed gives the move its motion blur. The shots come from `videoCameras.ts`
 * (measured on the video: where the picture changes, and when).
 *
 * The recordings already show their own pointer, so nothing is drawn over them: only the framing moves.
 */

import React, { useEffect } from 'react'
import { motion, useSpring, useTransform, useVelocity } from 'framer-motion'
import type { VideoShot } from '@/data/videoCameras'

const REST: VideoShot = { at: 0, x: 0.5, y: 0.5, zoom: 1 }
const SPRING = { stiffness: 85, damping: 21, mass: 1 }

function shotAt(shots: VideoShot[], t: number) {
  let current = REST
  for (const shot of shots) if (t >= shot.at) current = shot
  return current
}

export default function VideoCamera({ videoRef, shots, children }: { videoRef: React.RefObject<HTMLVideoElement | null>; shots: VideoShot[]; children: React.ReactNode }) {
  const x = useSpring(REST.x, SPRING)
  const y = useSpring(REST.y, SPRING)
  const zoom = useSpring(REST.zoom, SPRING)

  // The camera reads the video's clock on every frame while it plays; paused, it holds its framing
  useEffect(() => {
    let frame = 0
    let last: VideoShot | null = null
    const tick = () => {
      const video = videoRef.current
      if (video) {
        const shot = shotAt(shots, video.currentTime)
        if (shot !== last) {
          last = shot
          x.set(shot.x)
          y.set(shot.y)
          zoom.set(shot.zoom)
        }
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [videoRef, shots, x, y, zoom])

  const vx = useVelocity(x)
  const vy = useVelocity(y)
  const vz = useVelocity(zoom)
  const transform = useTransform([x, y, zoom], ([px, py, z]: number[]) => `translate3d(${(0.5 - px) * z * 100}%, ${(0.5 - py) * z * 100}%, 0) scale(${z})`)
  const filter = useTransform([vx, vy, vz], ([a, b, c]: number[]) => {
    // Same scale as the journey films: the speed across the frame (shares per second) and the speed of the zoom
    const blur = Math.min(2.5, (Math.abs(a) + Math.abs(b)) * 1.2 + Math.abs(c) * 1.6)
    return blur < 0.15 ? 'none' : `blur(${blur.toFixed(2)}px)`
  })

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div className="h-full w-full" style={{ transform, filter, transformOrigin: '50% 50%', willChange: 'transform, filter' }}>
        {children}
      </motion.div>
    </div>
  )
}
