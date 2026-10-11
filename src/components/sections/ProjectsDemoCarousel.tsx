'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Pause } from '@phosphor-icons/react'
import { getProjects } from '@/data/projectsData'
import { useSnapScroller } from '@/hooks/useSnapScroller'

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1]

// Matches max-w-[740px] mx-auto px-6 — first card left-aligns with content column
const CONTENT_LEFT = 'max(24px, calc(50vw - 346px))'
// Must equal CONTENT_LEFT: cards are 692px wide, so clientWidth − cardWidth − CONTENT_LEFT = CONTENT_LEFT.
const CONTENT_RIGHT = CONTENT_LEFT
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
  const [inView, setInView] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)

  const trackRef = useRef<HTMLDivElement>(null)
  const userStartedRef = useRef(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const animating = useRef(false)
  const trackPl = useRef(24) // cached paddingLeft, updated on resize

  // ── State sync ─────────────────────────────────────────────────────────────
  const detectActive = useCallback(() => {
    if (animating.current) return
    const track = trackRef.current
    if (!track) return
    const pl = trackPl.current
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

  // Direct DOM opacity update — bypasses React for per-frame smoothness.
  // Only the media dims with distance: the text keeps full opacity so inactive
  // slides stay readable (WCAG AA) while the depth effect is preserved.
  const updateOpacities = useCallback((scrollLeft: number) => {
    const track = trackRef.current
    if (!track) return
    const pl = trackPl.current
    const cards = track.querySelectorAll<HTMLElement>('[data-card]')
    cards.forEach((card) => {
      const dist = Math.abs(card.offsetLeft - pl - scrollLeft)
      const normalized = Math.min(dist / CARD_WIDTH_PX, 1)
      const media = card.querySelector<HTMLElement>('[data-card-media]')
      if (media) media.style.opacity = String(1 - 0.28 * normalized)
    })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    // Cache paddingLeft so we don't call getComputedStyle on every scroll frame
    const updatePl = () => { trackPl.current = parseFloat(getComputedStyle(track).paddingLeft) }
    updatePl()
    window.addEventListener('resize', updatePl)
    return () => window.removeEventListener('resize', updatePl)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let timer: ReturnType<typeof setTimeout>
    const onScroll = () => {
      // Live opacity tracking on every scroll frame
      updateOpacities(track.scrollLeft)
      // Eager activeIndex: fire before scrollend when card is nearly centred
      if (!animating.current) {
        const pl = trackPl.current
        const cards = track.querySelectorAll<HTMLElement>('[data-card]')
        let closest = 0, minDist = Infinity
        cards.forEach((card, i) => {
          const dist = Math.abs(card.offsetLeft - pl - track.scrollLeft)
          if (dist < minDist) { minDist = dist; closest = i }
        })
        if (minDist < 20) setActiveIndex(closest)
      }
      // Debounced full sync = fallback for Safari <17 which lacks scrollend
      clearTimeout(timer)
      timer = setTimeout(detectActive, 60)
    }
    track.addEventListener('scrollend', detectActive, { passive: true })
    track.addEventListener('scroll', onScroll, { passive: true })
    detectActive()
    updateOpacities(track.scrollLeft)
    return () => {
      clearTimeout(timer)
      track.removeEventListener('scrollend', detectActive)
      track.removeEventListener('scroll', onScroll)
    }
  }, [detectActive, updateOpacities])

  // Respect reduced motion: videos start paused and the visitor can press play
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  // Stop decoding video while the carousel is off screen
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 })
    io.observe(track)
    return () => io.disconnect()
  }, [])

  // A new card or a change of motion preference resets the manual pause state
  useEffect(() => {
    setIsPaused(reduceMotion)
  }, [activeIndex, reduceMotion])

  // Play the active video only when visible and not paused; pause the others
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      const blockedByMotionPref = window.matchMedia('(prefers-reduced-motion: reduce)').matches && !userStartedRef.current
      if (i === activeIndex && inView && !isPaused && !blockedByMotionPref) video.play().catch(() => {})
      else video.pause()
    })
  }, [activeIndex, inView, isPaused])

  const togglePause = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRefs.current[activeIndex]
    if (!video) return
    if (isPaused) { userStartedRef.current = true; video.play().catch(() => {}); setIsPaused(false) }
    else { video.pause(); setIsPaused(true) }
  }, [activeIndex, isPaused])

  // ── Scrolling: snap, momentum, spring, rubber band (shared hook) ───────────
  const { bind, scrollToIndex } = useSnapScroller(trackRef, {
    pageLimit: 1,
    onProgress: updateOpacities,
    onSettle: () => { animating.current = false; detectActive() },
  })

  const goTo = useCallback((index: number) => {
    animating.current = true
    setActiveIndex(index)
    scrollToIndex(index)
  }, [scrollToIndex])

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
        <h2 className="text-title-2 text-gray-900">
          {isEn ? 'Work' : 'Projets'}
        </h2>
        <a
          href={`/${lang}/projets`}
          className="group text-sm text-gray-500 hover:text-gray-900 inline-flex items-center gap-1 py-2.5 -my-2.5"
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
          className="snap-scroller snap-rubber flex gap-7 [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label={isEn ? 'Selected projects' : 'Projets sélectionnés'}
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
          {...bind}
          onPointerCancel={bind.onPointerUp}
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
                  data-card-media=""
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
                    className="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white/70 hover:bg-black/50 hover:text-white active:scale-95 transition-[background-color,color,transform,opacity] duration-150 before:absolute before:-inset-1.5 before:content-['']"
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
                    <span className="text-micro font-medium uppercase tracking-[0.08em]" style={{ color: '#6B7280' }}>
                      {item.role}
                    </span>
                    <span className="text-micro tabular-nums" style={{ color: '#6B7280' }}>
                      {item.year}
                    </span>
                  </div>

                  {/* Title: a real link, so the project is reachable by keyboard, screen reader and crawler.
                      The card's onClick still performs the client-side navigation. */}
                  <p className="text-title-3 mb-1">
                    <a
                      href={`/${lang}${item.path}`}
                      className="relative"
                      tabIndex={isActive ? 0 : -1}
                      onClick={(e) => { if (!e.metaKey && !e.ctrlKey && !e.shiftKey) e.preventDefault() }}
                      style={{
                        color: isActive ? '#111827' : '#6B7280',
                        transition: 'color 80ms ease',
                      }}
                    >
                      {item.title}
                      <span className="sr-only">{isEn ? ', view case study' : ', voir l\u2019\u00e9tude de cas'}</span>
                    </a>
                  </p>

                  {/* Summary — always visible, one step lighter when inactive (both pass AA) */}
                  <p
                    className="text-sm leading-relaxed line-clamp-2 mb-3"
                    style={{
                      color: isActive ? '#4B5563' : '#6B7280',
                      transition: 'color 80ms ease',
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
      <div className="flex items-center justify-center mt-3">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={isEn ? `Go to project ${i + 1}: ${item.title}` : `Aller au projet ${i + 1} : ${item.title}`}
            aria-current={i === activeIndex ? 'true' : undefined}
            className="flex items-center justify-center h-6 px-[9.5px]"
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', flexShrink: 0 }}
          >
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                width: i === activeIndex ? 16 : 5,
                height: 5,
                borderRadius: 3,
                background: i === activeIndex ? '#111827' : '#D1D5DB',
                transition: 'width 240ms cubic-bezier(0.23,1,0.32,1), background-color 180ms ease',
              }}
            />
          </button>
        ))}
      </div>

    </motion.section>
  )
}
