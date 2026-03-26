'use client'

import React from 'react'

interface CarouselVideo {
  src: string
  label: string
  projectId: string
}

const SHOWCASE_VIDEOS: CarouselVideo[] = [
  { src: '/assets/projets/riskos/videos/01-hero-triage.mp4', label: 'RiskOS', projectId: 'riskos' },
  { src: '/videos/connect/connect-dashboard-prototype-compressed.mp4', label: 'Connect', projectId: 'connect' },
  { src: '/assets/projets/riskos/videos/02-ai-insight.mp4', label: 'RiskOS', projectId: 'riskos' },
  { src: '/videos/connect/interaction-bulle-connect-compressed.mp4', label: 'La Bulle', projectId: 'connect' },
  { src: '/assets/projets/riskos/videos/03-decision-ellipses.mp4', label: 'RiskOS', projectId: 'riskos' },
  { src: '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4', label: 'Dailymotion', projectId: 'dailymotion' },
  { src: '/assets/projets/riskos/videos/05-false-positive.mp4', label: 'RiskOS', projectId: 'riskos' },
  { src: '/videos/connect/Video-demo-bulle-interactions-compressed.mp4', label: 'La Bulle', projectId: 'connect' },
]

/**
 * ProjectVideoCarousel — Auto-scrolling showcase of project videos.
 * Placed on the homepage below the hero, above the fold.
 * CSS animation off main thread, pauses on hover.
 */
export default function ProjectVideoCarousel() {
  const cardW = 480
  const gap = 16
  const totalWidth = SHOWCASE_VIDEOS.length * (cardW + gap)
  const duration = totalWidth / 25 // ~25px/s for a calm, cinematic pace

  return (
    <div className="w-full overflow-hidden py-6">
      <div
        className="gallery-carousel-track flex"
        style={{
          ['--duration' as string]: `${duration}s`,
          gap: `${gap}px`,
          width: `${totalWidth * 2}px`,
        } as React.CSSProperties}
      >
        {[...SHOWCASE_VIDEOS, ...SHOWCASE_VIDEOS].map((video, idx) => (
          <div
            key={`${video.src}-${idx}`}
            className="flex-shrink-0 rounded-2xl overflow-hidden group border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg"
            style={{
              width: `${cardW}px`,
              transition: 'border-color 200ms ease, box-shadow 300ms ease',
            }}
          >
            <video
              src={video.src}
              muted
              playsInline
              autoPlay
              loop
              preload="metadata"
              className="w-full aspect-[16/10] object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
