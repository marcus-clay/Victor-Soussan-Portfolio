'use client'

import React, { useState, useCallback, useMemo } from 'react'
import type { GalleryItem } from './BentoGallery'
import EnhancedLightbox from './media/EnhancedLightbox'

interface GalleryCarouselProps {
  items: GalleryItem[]
  lang: 'en' | 'fr'
  projectId: string
  /** Scroll speed in pixels per second. Default 30. */
  speed?: number
  isDark?: boolean
}

// Filter out photos and wireframes, keep only polished UI screens and videos
const EXCLUDE_KEYWORDS = ['wireframe', 'sketch', 'photo', 'portrait', 'team', 'workshop', 'sprint', 'post-it', 'whiteboard', 'early_wireframe']

function isUIItem(item: GalleryItem): boolean {
  const srcLower = item.src.toLowerCase()
  const captionLower = (item.caption || '').toLowerCase()
  return !EXCLUDE_KEYWORDS.some(kw => srcLower.includes(kw) || captionLower.includes(kw))
}

/**
 * GalleryCarousel — Full-width auto-scrolling gallery with lightbox.
 * CSS animation off main thread. Pauses on hover. Click opens lightbox.
 * Filters to show only polished UI screens (no photos, no wireframes).
 */
export default function GalleryCarousel({
  items,
  lang,
  projectId,
  speed = 30,
  isDark = false,
}: GalleryCarouselProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [videoStartTime, setVideoStartTime] = useState(0)

  // Filter for UI screens only, limit to 10 for performance
  const carouselItems = useMemo(() => items.filter(isUIItem).slice(0, 10), [items])

  const openLightbox = useCallback((idx: number) => {
    const originalIdx = idx % carouselItems.length
    const fullIdx = items.findIndex(i => i.src === carouselItems[originalIdx].src)
    if (fullIdx !== -1) {
      setLightboxIndex(fullIdx)
      setVideoStartTime(0)
      setLightboxOpen(true)
    }
  }, [carouselItems, items])

  const lightboxItems = useMemo(() => items.map(item => ({
    src: item.src,
    caption: item.caption,
    type: item.type,
  })), [items])

  if (carouselItems.length < 3) return null

  // Card width + gap. Larger cards for visual impact.
  const cardW = 420
  const gap = 20
  const totalWidth = carouselItems.length * (cardW + gap)
  const duration = totalWidth / speed

  return (
    <>
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxItems}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        lang={lang}
        projectId={projectId}
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
          {[...carouselItems, ...carouselItems].map((item, idx) => (
            <button
              key={`${item.src}-${idx}`}
              onClick={() => openLightbox(idx)}
              className={`flex-shrink-0 rounded-2xl overflow-hidden cursor-zoom-in group active:scale-[0.98] border shadow-sm ${
                isDark
                  ? 'border-white/[0.06] hover:border-white/[0.12] shadow-black/30 hover:shadow-lg hover:shadow-black/40'
                  : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
              }`}
              style={{
                width: `${cardW}px`,
                transition: 'transform 160ms cubic-bezier(0.23, 1, 0.32, 1), border-color 200ms ease, box-shadow 300ms ease',
              }}
            >
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  muted
                  playsInline
                  autoPlay
                  loop
                  preload="metadata"
                  className="w-full aspect-[16/10] object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className="w-full aspect-[16/10] object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
