'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Pause } from '@phosphor-icons/react'
import { getProjects } from '@/data/projectsData'

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1]

// Matches max-w-[740px] mx-auto px-6 — first card left-aligns with content column
const CONTENT_LEFT = 'max(24px, calc(50vw - 346px))'
// Must equal CONTENT_LEFT: cards are 692px wide, so clientWidth − cardWidth − CONTENT_LEFT = CONTENT_LEFT.
const CONTENT_RIGHT = CONTENT_LEFT
const SCROLL_DURATION = 460

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

const CARD_WIDTH_PX = 692

export default function ProjectsDemoCarousel({ lang, onNavigate }: ProjectsDemoCarouselProps) {
  const isEn = lang === 'en'
  const allProjects = getProjects(lang)

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
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const dragging = useRef(false)
  const animating = useRef(false)
  const hasMoved = useRef(false)
  const dragStartX = useRef(0)
  const dragStartScrollLeft = useRef(0)
  const dragLastX = useRef(0)
  const dragLastTime = useRef(0)
  const dragVelocity = useRef(0)

  // ── State sync ─────────────────────────────────────────────────────────────
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
    let timer: ReturnType<typeof setTimeout>
    // Debounced scroll = fallback for Safari <17 which lacks scrollend
    const onScroll = () => { clearTimeout(timer); timer = setTimeout(detectActive, 120) }
    track.addEventListener('scrollend', detectActive, { passive: true })
    track.addEventListener('scroll', onScroll, { passive: true })
    detectActive()
    return () => {
      clearTimeout(timer)
      track.removeEventListener('scrollend', detectActive)
      track.removeEventListener('scroll', onScroll)
    }
  }, [detectActive])

  useEffect(() => { return () => cancelAnimationFrame(rafRef.current) }, [])

  // Play active video, pause others
  useEffect(() => {
    setIsPaused(false)
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      if (i === activeIndex) video.play().catch(() => {})
      else video.pause()
    })
  }, [activeIndex])

  const togglePause = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRefs.current[activeIndex]
    if (!video) return
    if (isPaused) { video.play().catch(() => {}); setIsPaused(false) }
    else { video.pause(); setIsPaused(true) }
  }, [activeIndex, isPaused])

  // ── Programmatic scroll ────────────────────────────────────────────────────
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
    if (e.pointerType === 'touch') return // native scroll handles touch — no conflict
    const track = trackRef.current
    if (!track) return
    dragging.current = true
    hasMoved.current = false
    dragStartX.current = e.clientX
    dragStartScrollLeft.current = track.scrollLeft
    dragLastX.current = e.clientX
    dragLastTime.current = performance.now()
    dragVelocity.current = 0
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
      if (!hasMoved.current) track.setPointerCapture(e.pointerId)
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
    const threshold = CARD_WIDTH_PX * 0.18
    let target = activeIndex
    if (velocity > 0.25 || dx > threshold) target = Math.min(items.length - 1, activeIndex + 1)
    else if (velocity < -0.25 || dx < -threshold) target = Math.max(0, activeIndex - 1)
    goTo(target)
  }, [activeIndex, items.length, goTo])

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (hasMoved.current) {
      e.preventDefault()
      e.stopPropagation()
      hasMoved.current = false
    }
  }, [])

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

      {/* Header row */}
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

      {/* Scroll track — full card (video + info) scrolls as one unit */}
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
            paddingBottom: '4px',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            cursor: 'grab',
            userSelect: 'none',
          } as React.CSSProperties}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={onClickCapture}
        >
          {items.map((item, index) => {
            const isActive = index === activeIndex
            const isHovered = hoveredIndex === index

            return (
              <div
                key={item.id}
                data-card=""
                className="flex-shrink-0"
                style={{
                  width: 'min(692px, calc(100vw - 48px))',
                  scrollSnapAlign: 'start',
                  cursor: 'pointer',
                  opacity: isActive ? 1 : 0.5,
                  transition: 'opacity 300ms ease',
                }}
                onClick={() => {
                  if (index !== activeIndex) goTo(index)
                  else onNavigate(item.path)
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Video */}
                <div
                  className="relative rounded-2xl overflow-hidden bg-[#111113]"
                  style={{
                    aspectRatio: '16 / 10',
                    transform: isActive && isHovered ? 'scale(1.005)' : 'scale(1)',
                    transition: 'transform 300ms cubic-bezier(0.23,1,0.32,1)',
                  }}
                >
                  <video
                    ref={(el) => { videoRefs.current[index] = el }}
                    loop
                    muted
                    playsInline
                    preload={index === 0 ? 'auto' : index === 1 ? 'metadata' : 'none'}
                    className="w-full h-full object-cover"
                    src={item.src}
                  />

                  {/* Play / pause — only visible on active card */}
                  <button
                    onClick={togglePause}
                    aria-label={isPaused ? (lang === 'fr' ? 'Lire' : 'Play') : (lang === 'fr' ? 'Pause' : 'Pause')}
                    className="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white/70 hover:bg-black/50 hover:text-white active:scale-95 transition-[background-color,color,transform,opacity] duration-150"
                    style={{
                      opacity: isActive ? 1 : 0,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    {isPaused ? <Play size={12} weight="fill" /> : <Pause size={12} weight="fill" />}
                  </button>
                </div>

                {/* Info — always present in the card, never needs crossfade */}
                <div className="mt-4">
                  {/* Meta row */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-medium uppercase tracking-[0.08em]" style={{ color: '#9CA3AF' }}>
                      {item.role}
                    </span>
                    <span className="text-[11px] tabular-nums" style={{ color: '#9CA3AF' }}>
                      {item.year}
                    </span>
                  </div>

                  {/* Title */}
                  <p
                    className="text-sm leading-snug tracking-[-0.01em] mb-1"
                    style={{
                      fontWeight: 500,
                      color: isActive ? '#111827' : '#6B7280',
                      transition: 'color 200ms ease',
                    }}
                  >
                    {item.title}
                  </p>

                  {/* Summary — only shown on active card */}
                  <p
                    className="text-sm leading-relaxed line-clamp-2 mb-3"
                    style={{
                      color: '#6B7280',
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 200ms ease',
                    }}
                  >
                    {item.summary}
                  </p>

                  {/* CTA — progressive disclosure on hover (desktop), always visible on touch */}
                  <span
                    className="inline-flex items-center gap-1.5 text-sm pointer-events-none [@media(hover:none)]:!opacity-100 [@media(hover:none)]:![transform:translate(0,0)]"
                    style={{
                      color: '#374151',
                      opacity: isActive && isHovered ? 1 : 0,
                      transform: isActive && isHovered ? 'translate(0, 0)' : 'translate(0, 3px)',
                      transition: 'opacity 180ms ease, transform 240ms cubic-bezier(0.23, 1, 0.32, 1)',
                    }}
                  >
                    {isEn ? 'View case study' : 'Étude de cas'}
                    <ArrowDiag
                      style={{
                        opacity: isActive && isHovered ? 1 : 0,
                        transform: isActive && isHovered ? 'translate(0, 0)' : 'translate(-3px, 3px)',
                        transition: 'opacity 180ms ease, transform 240ms cubic-bezier(0.23, 1, 0.32, 1)',
                      }}
                    />
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Left fade — desktop only: on mobile the card fills the viewport, gradients cut into content */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-14 hidden sm:block"
          style={{
            background: 'linear-gradient(to left, transparent 0%, rgba(253,253,252,0.6) 50%, #FDFDFC 100%)',
            opacity: canScrollLeft ? 1 : 0,
            transition: 'opacity 200ms ease',
            transitionDelay: canScrollLeft ? '60ms' : '0ms',
          }}
        />

        {/* Right fade — desktop only */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-14 hidden sm:block"
          style={{
            background: 'linear-gradient(to right, transparent 0%, rgba(253,253,252,0.6) 50%, #FDFDFC 100%)',
            opacity: canScrollRight ? 1 : 0,
            transition: 'opacity 200ms ease',
          }}
        />
      </div>

      {/* Navigation dots */}
      <div className="flex items-center justify-center gap-1.5 mt-5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to project ${i + 1}`}
            style={{
              width: i === activeIndex ? 16 : 5,
              height: 5,
              borderRadius: 3,
              background: i === activeIndex ? '#111827' : '#D1D5DB',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'width 240ms cubic-bezier(0.23,1,0.32,1), background-color 180ms ease',
              flexShrink: 0,
            }}
          />
        ))}
      </div>

    </motion.section>
  )
}
