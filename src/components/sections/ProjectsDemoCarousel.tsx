'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Pause } from '@phosphor-icons/react'
import { getProjects } from '@/data/projectsData'

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1]

// Matches max-w-[740px] mx-auto px-6 — first card left-aligns with content column
const CONTENT_LEFT = 'max(24px, calc(50vw - 346px))'
// Must equal CONTENT_LEFT: cards are 692px wide, so clientWidth − cardWidth − CONTENT_LEFT = CONTENT_LEFT.
// Any less and the last card can never reach its snap position (maxScrollLeft falls short).
const CONTENT_RIGHT = CONTENT_LEFT
// 460ms with a strong ease-out — feels intentional on card click, snappy on swipe
const SCROLL_DURATION = 460

// Strong ease-out: cubic-bezier(0.23, 1, 0.32, 1) approximated as a pure function
function easeOutStrong(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function ArrowDiag({ style }: { style?: React.CSSProperties }) {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

// Carousel project IDs and their video sources — order defines display order
const CAROUSEL_IDS = ['connect', 'riskos', 'toolkit', 'dailymotion', 'pagesjaunes'] as const

const VIDEO_SRCS: Record<string, string> = {
  connect:     '/videos/connect/Video-demo-bulle-interactions-02-compressed.mp4',
  riskos:      '/videos/riskos/00-live-prototype.mp4',
  toolkit:     '/videos/toolkit/video_-_task_manipulation.mp4',
  dailymotion: '/videos/dailymotion/video_-_cancel_upload.mp4',
  pagesjaunes: '/images/pj-and-app-onboarding-animation.mp4',
}

const CASE_STUDY_PATHS: Record<string, string> = {
  connect:     '/project/connect/summary',
  riskos:      '/project/riskos/summary',
  toolkit:     '/project/toolkit/summary',
  dailymotion: '/project/dailymotion/summary',
  pagesjaunes: '/project/pagesjaunes/summary',
}

interface ProjectsDemoCarouselProps {
  lang: 'en' | 'fr'
  onNavigate: (path: string) => void
}

// Approximate card width for swipe threshold calculation
const CARD_WIDTH_PX = 692

export default function ProjectsDemoCarousel({ lang, onNavigate }: ProjectsDemoCarouselProps) {
  const isEn = lang === 'en'
  const allProjects = getProjects(lang)

  // Merge project data with carousel config
  const items = CAROUSEL_IDS.map(id => {
    const project = allProjects.find(p => p.id === id)!
    return {
      id,
      src: VIDEO_SRCS[id],
      path: CASE_STUDY_PATHS[id],
      role: project.role,
      year: project.period.split(' – ')[0],
      title: project.title,
      summary: project.summary,
    }
  })

  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [hoveredInfo, setHoveredInfo] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Info panel swap — keeps content visible at all times, CSS transitions = interruptible
  const [displayIndex, setDisplayIndex] = useState(0)
  const [isSwapping, setIsSwapping] = useState(false)
  const swapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Refs — mutated directly to avoid re-renders during hot paths
  const dragging = useRef(false)
  const animating = useRef(false)
  const hasMoved = useRef(false)
  const dragStartX = useRef(0)
  const dragStartScrollLeft = useRef(0)
  const dragLastX = useRef(0)
  const dragLastTime = useRef(0)
  const dragVelocity = useRef(0)

  // ── State sync ─────────────────────────────────────────────────────────────
  // Reads computed paddingLeft so it works at every breakpoint — same pattern as ProjetsPageClient
  const detectActive = useCallback(() => {
    if (dragging.current || animating.current) return
    const track = trackRef.current
    if (!track) return
    const pl = parseFloat(getComputedStyle(track).paddingLeft)
    const cards = track.querySelectorAll<HTMLElement>('[data-card]')
    let closest = 0
    let minDist = Infinity
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - pl - track.scrollLeft)
      if (dist < minDist) { minDist = dist; closest = i }
    })
    setActiveIndex(closest)
    setCanScrollLeft(track.scrollLeft > 8)
    setCanScrollRight(track.scrollLeft < track.scrollWidth - track.clientWidth - 8)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', detectActive, { passive: true })
    detectActive()
    return () => track.removeEventListener('scroll', detectActive)
  }, [detectActive])

  useEffect(() => { return () => cancelAnimationFrame(rafRef.current) }, [])

  // Play active video, pause all others. Reset isPaused when the active card changes.
  useEffect(() => {
    setIsPaused(false)
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      if (i === activeIndex) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [activeIndex])

  const togglePause = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRefs.current[activeIndex]
    if (!video) return
    if (isPaused) {
      video.play().catch(() => {})
      setIsPaused(false)
    } else {
      video.pause()
      setIsPaused(true)
    }
  }, [activeIndex, isPaused])

  // Crossfade the info panel without ever going to opacity 0.
  // 1. Fade out to 0.15 + blur(3px) — masks the text swap moment
  // 2. After 55ms swap displayIndex, fade back in
  // clearTimeout on every new activeIndex change = always interruptible
  useEffect(() => {
    if (swapTimerRef.current) clearTimeout(swapTimerRef.current)
    setIsSwapping(true)
    swapTimerRef.current = setTimeout(() => {
      setDisplayIndex(activeIndex)
      setIsSwapping(false)
      swapTimerRef.current = null
    }, 55)
    return () => {
      if (swapTimerRef.current) clearTimeout(swapTimerRef.current)
    }
  }, [activeIndex])

  // ── Programmatic scroll ────────────────────────────────────────────────────
  // Disables snap during animation to prevent jank, re-enables at settle
  const smoothScrollTo = useCallback((el: HTMLElement, target: number) => {
    cancelAnimationFrame(rafRef.current)
    const start = el.scrollLeft
    const diff = target - start
    if (Math.abs(diff) < 1) return
    animating.current = true
    const prevSnap = el.style.scrollSnapType
    el.style.scrollSnapType = 'none'
    const t0 = performance.now()
    function frame(now: number) {
      const t = Math.min((now - t0) / SCROLL_DURATION, 1)
      el.scrollLeft = start + diff * easeOutStrong(t)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(frame)
      } else {
        animating.current = false
        el.style.scrollSnapType = prevSnap || ''
        detectActive()
      }
    }
    rafRef.current = requestAnimationFrame(frame)
  }, [detectActive])

  const goTo = useCallback((index: number) => {
    const track = trackRef.current
    if (!track) return
    const pl = parseFloat(getComputedStyle(track).paddingLeft)
    const cards = track.querySelectorAll<HTMLElement>('[data-card]')
    const card = cards[index]
    if (!card) return
    smoothScrollTo(track, card.offsetLeft - pl)
    setActiveIndex(index)
  }, [smoothScrollTo])

  // ── Drag / swipe ───────────────────────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    const track = trackRef.current
    if (!track) return
    dragging.current = true
    hasMoved.current = false
    dragStartX.current = e.clientX
    dragStartScrollLeft.current = track.scrollLeft
    dragLastX.current = e.clientX
    dragLastTime.current = performance.now()
    dragVelocity.current = 0
    // Pointer capture is set lazily in onPointerMove once drag is confirmed (dx > 4px).
    // Setting it here would capture the pointer on every tap, causing click events to
    // fire on the track instead of child elements (cards, pause button).
    cancelAnimationFrame(rafRef.current)
    animating.current = false
    track.style.cursor = 'grabbing'
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    const track = trackRef.current
    if (!track) return
    const dx = e.clientX - dragStartX.current
    if (Math.abs(dx) > 4) {
      if (!hasMoved.current) {
        // Set capture only once drag is confirmed — preserves child onClick behavior for taps
        track.setPointerCapture(e.pointerId)
      }
      hasMoved.current = true
    }
    track.style.scrollSnapType = 'none'
    track.scrollLeft = dragStartScrollLeft.current - dx
    const now = performance.now()
    const dt = now - dragLastTime.current
    if (dt > 0) dragVelocity.current = (dragLastX.current - e.clientX) / dt
    dragLastX.current = e.clientX
    dragLastTime.current = now
  }, [])

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    dragging.current = false
    const track = trackRef.current
    if (!track) return
    track.style.cursor = 'grab'
    if (!hasMoved.current) {
      track.style.scrollSnapType = 'x mandatory'
      return
    }
    const dx = dragStartX.current - e.clientX
    const velocity = dragVelocity.current
    const threshold = CARD_WIDTH_PX * 0.28
    let target = activeIndex
    if (velocity > 0.4 || dx > threshold) target = Math.min(items.length - 1, activeIndex + 1)
    else if (velocity < -0.4 || dx < -threshold) target = Math.max(0, activeIndex - 1)
    goTo(target)
  }, [activeIndex, items.length, goTo])

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (hasMoved.current) {
      e.preventDefault()
      e.stopPropagation()
      hasMoved.current = false
    }
  }, [])

  // Use displayIndex so content only swaps at the midpoint of the crossfade
  const activeItem = items[displayIndex]

  // Reveal on first scroll into view
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px 0px 0px' })

  return (
    <motion.section
      ref={sectionRef}
      id="work"
      className="pt-24 md:pt-40 pb-24 md:pb-40"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >

      {/* Header row — symmetric margins, only the track bleeds to 48px */}
      <div className="max-w-[740px] mx-auto px-6 flex items-center justify-between mb-8">
        <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900">
          {isEn ? 'Work' : 'Projets'}
        </h2>
        <a
          href={`/${lang}/projets`}
          className="group text-sm text-gray-400 hover:text-gray-900 inline-flex items-center gap-1"
          style={{ transition: 'color 150ms ease' }}
        >
          {isEn ? 'All projects' : 'Tous les projets'}
          <ArrowDiag />
        </a>
      </div>

      {/* Scroll track — paddingLeft aligns first card to content column, no clip wrapper needed */}
      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-7 [&::-webkit-scrollbar]:hidden"
          style={{
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollPaddingLeft: CONTENT_LEFT,
            paddingLeft: CONTENT_LEFT,
            paddingRight: CONTENT_RIGHT,
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            cursor: 'grab',
            userSelect: 'none',
            paddingBottom: '12px',
          } as React.CSSProperties}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={onClickCapture}
        >
          {items.map((item, index) => {
            return (
              <div
                key={item.id}
                data-card=""
                className="flex-shrink-0"
                style={{
                  width: 'min(692px, calc(100vw - 48px))',
                  scrollSnapAlign: 'start',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (index !== activeIndex) goTo(index)
                  else onNavigate(item.path)
                }}
              >
                <div
                  className="relative rounded-2xl overflow-hidden bg-[#111113]"
                  style={{ aspectRatio: '16 / 10' }}
                >
                  <video
                    ref={(el) => { videoRefs.current[index] = el }}
                    loop
                    muted
                    playsInline
                    preload={index === 0 ? 'auto' : 'none'}
                    className="w-full h-full object-cover"
                    src={item.src}
                  />

                  {/* Play / pause button — bottom-right, only visible on active card */}
                  <button
                    onClick={togglePause}
                    aria-label={isPaused ? (lang === 'fr' ? 'Lire' : 'Play') : (lang === 'fr' ? 'Pause' : 'Pause')}
                    className="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white/70 hover:bg-black/50 hover:text-white active:scale-95 transition-[background-color,color,transform,opacity] duration-150"
                    style={{
                      opacity: index === activeIndex ? 1 : 0,
                      pointerEvents: index === activeIndex ? 'auto' : 'none',
                    }}
                  >
                    {isPaused
                      ? <Play size={12} weight="fill" />
                      : <Pause size={12} weight="fill" />
                    }
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Left fade */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24"
          style={{
            background: 'linear-gradient(to left, transparent 0%, rgba(253,253,252,0.4) 40%, rgba(253,253,252,0.85) 75%, #FDFDFC 100%)',
            opacity: canScrollLeft ? 1 : 0,
            transition: 'opacity 200ms ease',
            transitionDelay: canScrollLeft ? '60ms' : '0ms',
          }}
        />

        {/* Right fade */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24"
          style={{
            background: 'linear-gradient(to right, transparent 0%, rgba(253,253,252,0.4) 40%, rgba(253,253,252,0.85) 75%, #FDFDFC 100%)',
            opacity: canScrollRight ? 1 : 0,
            transition: 'opacity 200ms ease',
          }}
        />
      </div>

      {/* Info panel — entire area is a click target for the case study */}
      <div
        className="mt-4 cursor-pointer"
        style={{ paddingLeft: CONTENT_LEFT, paddingRight: CONTENT_LEFT }}
        onMouseEnter={() => setHoveredInfo(true)}
        onMouseLeave={() => setHoveredInfo(false)}
        onClick={() => onNavigate(activeItem.path)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate(activeItem.path) }}
        aria-label={isEn ? `View case study: ${activeItem.title}` : `Voir l'étude de cas : ${activeItem.title}`}
      >
        {/* CSS transitions = interruptible, no queue, content never disappears */}
        <div
          style={{
            opacity: isSwapping ? 0.12 : 1,
            filter: isSwapping ? 'blur(3px)' : 'blur(0px)',
            transition: isSwapping
              ? 'opacity 55ms ease-in, filter 55ms ease-in'
              : 'opacity 130ms ease-out, filter 130ms ease-out',
          }}
        >
          {/* Meta row — role + year */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.08em]" style={{ color: '#9CA3AF' }}>
              {activeItem.role}
            </span>
            <span className="text-[11px] tabular-nums" style={{ color: '#9CA3AF' }}>
              {activeItem.year}
            </span>
          </div>

          {/* Title */}
          <p className="text-sm leading-snug tracking-[-0.01em] mb-1" style={{ fontWeight: 500, color: '#111827' }}>
            {activeItem.title}
          </p>

          {/* Summary */}
          <p className="text-sm leading-relaxed line-clamp-2 mb-3" style={{ color: '#6B7280' }}>
            {activeItem.summary}
          </p>

          {/* CTA — progressive disclosure on hover, always visible on touch */}
          <span
            className="inline-flex items-center gap-1.5 text-sm pointer-events-none [@media(hover:none)]:!opacity-100 [@media(hover:none)]:![transform:translate(0,0)]"
            style={{
              color: '#374151',
              opacity: hoveredInfo ? 1 : 0,
              transform: hoveredInfo ? 'translate(0, 0)' : 'translate(0, 3px)',
              transition: 'opacity 180ms ease, transform 240ms cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            {isEn ? 'View case study' : 'Étude de cas'}
            <ArrowDiag
              style={{
                opacity: hoveredInfo ? 1 : 0,
                transform: hoveredInfo ? 'translate(0, 0)' : 'translate(-3px, 3px)',
                transition: 'opacity 180ms ease, transform 240ms cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            />
          </span>
        </div>
      </div>

    </motion.section>
  )
}
