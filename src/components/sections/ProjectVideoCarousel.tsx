'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { MagnifyingGlassPlus, Pause, Play } from '@phosphor-icons/react'
import EnhancedLightbox from '@/components/media/EnhancedLightbox'

interface CarouselVideo {
  src: string
  label: string
  projectId: string
}

const SHOWCASE_VIDEOS: CarouselVideo[] = [
  { src: '/assets/projets/riskos/videos/01-hero-triage.mp4', label: 'RiskOS', projectId: 'riskos' },
  { src: '/videos/connect/connect-dashboard-prototype-compressed.mp4', label: 'SQOOL Connect', projectId: 'connect' },
  { src: '/assets/projets/riskos/videos/02-ai-insight.mp4', label: 'RiskOS', projectId: 'riskos' },
  { src: '/videos/connect/interaction-bulle-connect-compressed.mp4', label: 'La Bulle', projectId: 'connect' },
  { src: '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4', label: 'Dailymotion', projectId: 'dailymotion' },
  { src: '/assets/projets/riskos/videos/03-decision-ellipses.mp4', label: 'RiskOS', projectId: 'riskos' },
  { src: '/videos/connect/connect-design-sprint-compressed.mp4', label: 'Connect Sprint', projectId: 'connect' },
  { src: '/images/pagesjaunes/micro-interactions/Anim_remarketing_historique.mp4', label: 'PagesJaunes', projectId: 'pagesjaunes' },
  { src: '/assets/projets/riskos/videos/05-false-positive.mp4', label: 'RiskOS', projectId: 'riskos' },
  { src: '/videos/dailymotion/video_2025-11-10_02.26.48.mp4', label: 'Dailymotion', projectId: 'dailymotion' },
  { src: '/videos/connect/Video-demo-bulle-interactions-compressed.mp4', label: 'La Bulle', projectId: 'connect' },
  { src: '/images/pagesjaunes/micro-interactions/anim_favoris.mp4', label: 'PagesJaunes', projectId: 'pagesjaunes' },
]

const CARD_HEIGHT = 600

/**
 * ProjectVideoCarousel — 600px tall auto-scrolling video showcase.
 * Pause/play per video with liquid glass button.
 * Hover: only hovered video plays, others pause.
 * Click: open in lightbox.
 */
export default function ProjectVideoCarousel({ lang = 'fr' }: { lang?: 'en' | 'fr' }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [pausedVideos, setPausedVideos] = useState<Set<number>>(new Set())
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [videoStartTime, setVideoStartTime] = useState(0)
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({})

  // Card width derived from height to maintain 16:9
  const cardW = Math.round(CARD_HEIGHT * (16 / 9))
  const gap = 20
  const totalWidth = SHOWCASE_VIDEOS.length * (cardW + gap)
  const duration = totalWidth / 25

  // Pause/play videos based on hover + manual pause state
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([idxStr, video]) => {
      if (!video) return
      const idx = Number(idxStr)
      const originalIdx = idx % SHOWCASE_VIDEOS.length

      // Manually paused: always pause
      if (pausedVideos.has(originalIdx)) {
        video.pause()
        return
      }

      if (hoveredIdx === null) {
        video.play().catch(() => {})
      } else if (idx % SHOWCASE_VIDEOS.length === hoveredIdx % SHOWCASE_VIDEOS.length) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [hoveredIdx, pausedVideos])

  const togglePause = useCallback((e: React.MouseEvent, idx: number) => {
    e.stopPropagation()
    const originalIdx = idx % SHOWCASE_VIDEOS.length
    setPausedVideos(prev => {
      const next = new Set(prev)
      if (next.has(originalIdx)) {
        next.delete(originalIdx)
      } else {
        next.add(originalIdx)
      }
      return next
    })
  }, [])

  const openLightbox = useCallback((idx: number) => {
    const originalIdx = idx % SHOWCASE_VIDEOS.length
    const video = videoRefs.current[idx]
    setVideoStartTime(video?.currentTime ?? 0)
    setLightboxIndex(originalIdx)
    setLightboxOpen(true)
  }, [])

  const lightboxItems = SHOWCASE_VIDEOS.map(v => ({
    src: v.src,
    caption: v.label,
    type: 'video' as const,
  }))

  return (
    <>
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxItems}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        lang={lang}
        projectId="homepage"
        videoStartTime={videoStartTime}
      />

      <div className="w-full overflow-hidden">
        <div
          className="gallery-carousel-track flex"
          style={{
            ['--duration' as string]: `${duration}s`,
            gap: `${gap}px`,
            width: `${totalWidth * 2}px`,
          } as React.CSSProperties}
        >
          {[...SHOWCASE_VIDEOS, ...SHOWCASE_VIDEOS].map((video, idx) => {
            const originalIdx = idx % SHOWCASE_VIDEOS.length
            const isHovered = hoveredIdx !== null &&
              (originalIdx === hoveredIdx % SHOWCASE_VIDEOS.length)
            const isPaused = pausedVideos.has(originalIdx)

            return (
              <div
                key={`${video.src}-${idx}`}
                className="flex-shrink-0 rounded-2xl overflow-hidden relative"
                style={{
                  width: `${cardW}px`,
                  height: `${CARD_HEIGHT}px`,
                  transition: 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 300ms cubic-bezier(0.23, 1, 0.32, 1)',
                  transform: isHovered ? 'scale(1.01)' : 'scale(1)',
                  boxShadow: isHovered
                    ? '0 24px 48px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)'
                    : '0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Video */}
                <button
                  onClick={() => openLightbox(idx)}
                  className="w-full h-full cursor-zoom-in block"
                >
                  <video
                    ref={el => { videoRefs.current[idx] = el }}
                    src={video.src}
                    muted
                    playsInline
                    autoPlay
                    loop
                    preload="metadata"
                    className="w-full h-full object-cover"
                    style={{
                      transition: 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1)',
                      transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                    }}
                  />
                </button>

                {/* Hover overlay: gradient + label + lightbox icon */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 200ms ease',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 40%, transparent 100%)',
                  }}
                />
                <div
                  className="absolute bottom-5 left-5 flex items-center gap-2 pointer-events-none"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(4px)',
                    transition: 'opacity 200ms ease, transform 250ms cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                >
                  <span className="text-white text-sm font-semibold drop-shadow-lg">
                    {video.label}
                  </span>
                </div>

                {/* Lightbox icon — hover only */}
                <div
                  className="absolute bottom-5 right-16 pointer-events-none"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 200ms ease',
                  }}
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(12px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                      border: '1px solid rgba(255,255,255,0.25)',
                    }}
                  >
                    <MagnifyingGlassPlus size={16} className="text-white" weight="bold" />
                  </div>
                </div>

                {/* Pause/Play button — always visible, liquid glass */}
                <button
                  onClick={(e) => togglePause(e, idx)}
                  className="absolute bottom-5 right-5 z-10 active:scale-[0.9]"
                  style={{
                    transition: 'transform 160ms cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                  aria-label={isPaused ? 'Play' : 'Pause'}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(12px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                      border: '1px solid rgba(255,255,255,0.25)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                  >
                    {isPaused ? (
                      <Play size={14} className="text-white ml-0.5" weight="fill" />
                    ) : (
                      <Pause size={14} className="text-white" weight="fill" />
                    )}
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
