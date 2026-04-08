'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getProjects } from '@/data/projectsData'
import { PROJETS_GRID_ITEMS, GALLERY_PROJECTS } from '@/data/galleryData'
import type { Project } from '@/data/projectsData'

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1]

// Matches max-w-[740px] mx-auto px-6 — first card left-aligns with h1
const CONTENT_LEFT = 'max(24px, calc(50vw - 346px))'
// Smaller right padding: lets the next card bleed in and signals scrollability
const CONTENT_RIGHT = '48px'


const CARD_WIDTH_PX = 380
const CARD_GAP_PX = 28
// 300ms feels instant without being jarring. 500ms was the main source of perceived lag.
const SCROLL_DURATION = 300

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function ArrowDiag({ style }: { style?: React.CSSProperties }) {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

function ArrowDiagMd() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}


function coverSrc(project: Project): string {
  return project.coverImage.startsWith('/')
    ? project.coverImage
    : `/images/${project.coverImage}`
}

function projectHref(project: Project, lang: string): string {
  return `/${lang}/project/${project.id}/summary`
}

const THUMB_W = 132
const THUMB_H = 88

const GALLERY_GRID_DATA = PROJETS_GRID_ITEMS.map(item => {
  const p = GALLERY_PROJECTS.find(g => g.id === item.projectId)
  return { src: item.src, projectId: item.projectId, name: p?.name ?? item.projectId }
})

function GalleryGrid({ lang }: { lang: 'en' | 'fr' }) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const check = () => {
      setCanScrollLeft(el.scrollLeft > 8)
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
    }
    el.addEventListener('scroll', check, { passive: true })
    check()
    return () => el.removeEventListener('scroll', check)
  }, [])

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 hidden sm:block"
        style={{ background: 'linear-gradient(to right, #FDFDFC 20%, transparent)', opacity: canScrollLeft ? 1 : 0, transition: 'opacity 200ms ease' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 hidden sm:block"
        style={{ background: 'linear-gradient(to left, #FDFDFC 20%, transparent)', opacity: canScrollRight ? 1 : 0, transition: 'opacity 200ms ease' }} />

      <div
        ref={gridRef}
        className="[&::-webkit-scrollbar]:hidden"
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridTemplateRows: `repeat(4, ${THUMB_H}px)`,
          gridAutoColumns: `${THUMB_W}px`,
          gap: '10px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          paddingLeft: CONTENT_LEFT,
          paddingRight: '48px',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
      >
        {GALLERY_GRID_DATA.map((item, i) => (
          <Link
            key={i}
            href={`/${lang}/visual-archive#gallery-${item.projectId}`}
            className="block rounded-lg overflow-hidden bg-[#F0F0EF] cursor-pointer"
          >
            <img
              src={item.src}
              alt={`${item.name} — UI`}
              loading="lazy"
              draggable={false}
              className="w-full h-full object-cover"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

interface CarouselSectionProps {
  title: string
  projects: Project[]
  lang: 'en' | 'fr'
  animationDelay?: number
}

function CarouselSection({ title, projects, lang, animationDelay = 0 }: CarouselSectionProps) {
  const isEn = lang === 'en'
  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  // React state — updated only at rest (snap settle), never during scroll/drag/animation
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Refs — mutated directly to avoid re-renders during hot paths
  const dragging = useRef(false)   // true while pointer is held
  const animating = useRef(false)  // true while RAF scroll is running
  const hasMoved = useRef(false)
  const pointerId = useRef<number | null>(null) // stored to defer setPointerCapture
  const dragStartX = useRef(0)
  const dragStartScrollLeft = useRef(0)
  const dragLastX = useRef(0)
  const dragLastTime = useRef(0)
  const dragVelocity = useRef(0)

  // ── State sync ────────────────────────────────────────────────────────────
  // Only runs when nothing is in motion. Called once after animation/drag settles.
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

  // Native scroll (touch/trackpad) — safe to sync since no RAF is running
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', detectActive, { passive: true })
    detectActive()
    return () => track.removeEventListener('scroll', detectActive)
  }, [detectActive])

  useEffect(() => { return () => cancelAnimationFrame(rafRef.current) }, [])

  // ── Programmatic scroll ───────────────────────────────────────────────────
  // Sets animating = true so detectActive skips during the RAF loop.
  // Re-enables snap and syncs state on the final frame.
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
      el.scrollLeft = start + diff * easeInOutCubic(t)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(frame)
      } else {
        animating.current = false
        el.style.scrollSnapType = prevSnap || ''
        detectActive() // single state sync at settle
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
    setActiveIndex(index) // optimistic update so opacity shifts immediately
  }, [smoothScrollTo])

  // ── Drag / swipe ──────────────────────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    if (e.pointerType === 'touch') return // native scroll handles touch — no conflict
    const track = trackRef.current
    if (!track) return
    dragging.current = true
    hasMoved.current = false
    pointerId.current = e.pointerId
    dragStartX.current = e.clientX
    dragStartScrollLeft.current = track.scrollLeft
    dragLastX.current = e.clientX
    dragLastTime.current = performance.now()
    dragVelocity.current = 0
    // Do NOT call setPointerCapture here — capturing immediately prevents
    // click events from reaching child <Link> elements on a plain tap.
    // Capture is set lazily in onPointerMove once drag is confirmed (>4px).
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
      if (!hasMoved.current && pointerId.current !== null) {
        // Capture only after confirmed drag so plain taps reach child <Link>
        track.setPointerCapture(pointerId.current)
      }
      hasMoved.current = true
    }
    track.style.scrollSnapType = 'none'
    track.scrollLeft = dragStartScrollLeft.current - dx
    // velocity only — no React setState
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
    if (velocity > 0.4 || dx > threshold) {
      target = Math.min(projects.length - 1, activeIndex + 1)
    } else if (velocity < -0.4 || dx < -threshold) {
      target = Math.max(0, activeIndex - 1)
    }
    goTo(target)
  }, [activeIndex, projects.length, goTo])

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (hasMoved.current) {
      e.preventDefault()
      e.stopPropagation()
      hasMoved.current = false
    }
  }, [])

  return (
    <section>
      {/* Section header — symmetric margins, only the track bleeds to 48px */}
      <motion.div
        className="mb-8"
        style={{ paddingLeft: CONTENT_LEFT, paddingRight: CONTENT_LEFT }}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: animationDelay, ease: EASE }}
      >
        <div className="flex items-baseline gap-2.5">
          <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900">{title}</h2>
          <span className="text-[11px] tabular-nums text-gray-400">{projects.length}</span>
        </div>
      </motion.div>

      {/* Scroll track — enters 120ms after section header for layered disclosure */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: animationDelay + 0.12, ease: EASE }}
      >
        <div
          ref={trackRef}
          className="flex [&::-webkit-scrollbar]:hidden"
          style={{
            gap: `${CARD_GAP_PX}px`,
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
          onMouseLeave={() => { if (!dragging.current) setHoveredId(null) }}
        >
          {projects.map((project, index) => {
            const isHovered = hoveredId === project.id
            const isPast = index < activeIndex
            const opacity = isHovered ? 1 : isPast ? 0.3 : hoveredId !== null ? 0.4 : 1
            const src = coverSrc(project)
            const year = project.period.split(' – ')[0]

            return (
              <div
                key={project.id}
                data-card=""
                className="flex-shrink-0"
                style={{
                  width: `min(${CARD_WIDTH_PX}px, calc(100vw - 48px))`,
                  scrollSnapAlign: 'start',
                  opacity,
                  // Opacity-only transition — stays on compositor, never triggers layout
                  transition: 'opacity 260ms ease',
                  willChange: 'opacity',
                }}
                onMouseEnter={() => setHoveredId(project.id)}
              >
                <Link href={projectHref(project, lang)} className="block" draggable={false}>
                  {/* Cover */}
                  <div
                    className="relative w-full rounded-2xl overflow-hidden mb-4"
                    style={{
                      aspectRatio: '16/10',
                      boxShadow: isHovered
                        ? '0 0 0 1px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.06)'
                        : '0 0 0 1px rgba(0,0,0,0.04)',
                      transform: isHovered ? 'scale(1.01)' : 'scale(1)',
                      // Only transform + box-shadow — GPU composited, no layout
                      transition: 'box-shadow 220ms ease, transform 300ms cubic-bezier(0.23,1,0.32,1)',
                    }}
                  >
                    <img
                      src={src}
                      alt={project.title}
                      loading={index < 2 ? 'eager' : 'lazy'}
                      draggable={false}
                      className="w-full h-full object-cover"
                      style={{
                        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                        transition: 'transform 400ms cubic-bezier(0.23,1,0.32,1)',
                        // Promote to GPU layer — prevents repaint during transform
                        willChange: 'transform',
                      }}
                    />
                    {project.videoUrl && (
                      <div
                        className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                        style={{
                          background: 'rgba(255,255,255,0.8)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255,255,255,0.9)',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? 'translateY(0)' : 'translateY(3px)',
                          transition: 'opacity 180ms ease, transform 220ms cubic-bezier(0.23,1,0.32,1)',
                        }}
                      >
                        <svg width={8} height={8} viewBox="0 0 10 10" fill="rgba(0,0,0,0.6)" aria-hidden="true">
                          <path d="M2 1.5l6 3.5-6 3.5V1.5z" />
                        </svg>
                        <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(0,0,0,0.55)', lineHeight: 1 }}>
                          Video
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Meta row */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className="text-[11px] truncate max-w-[65%]"
                      style={{ color: isHovered ? '#6B7280' : '#9CA3AF', transition: 'color 160ms ease' }}
                    >
                      {project.role}
                    </span>
                    <span
                      className="text-[11px] tabular-nums flex-shrink-0"
                      style={{ color: isHovered ? '#6B7280' : '#9CA3AF', transition: 'color 160ms ease' }}
                    >
                      {year}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-[15px] leading-snug tracking-[-0.01em] mb-1.5"
                    style={{
                      fontWeight: isHovered ? 500 : 400,
                      color: isHovered ? '#000' : '#111827',
                      transition: 'color 160ms ease',
                    }}
                  >
                    {project.title}
                  </h2>

                  {/* Summary */}
                  <p
                    className="text-sm leading-relaxed line-clamp-2 mb-3"
                    style={{ color: isHovered ? '#4B5563' : '#6B7280', transition: 'color 160ms ease' }}
                  >
                    {project.summary}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-1">
                    <span
                      className="text-xs"
                      style={{ color: isHovered ? '#374151' : '#9CA3AF', transition: 'color 160ms ease' }}
                    >
                      {isEn ? 'View project' : 'Voir le projet'}
                    </span>
                    <ArrowDiag
                      style={{
                        color: isHovered ? '#374151' : '#9CA3AF',
                        transform: isHovered ? 'translate(1px,-1px)' : 'translate(0,0)',
                        transition: 'color 160ms ease, transform 200ms cubic-bezier(0.23,1,0.32,1)',
                      }}
                    />
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

        {/* Left fade — desktop only */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 hidden sm:block"
          style={{
            background: 'linear-gradient(to left, transparent, rgba(253,253,252,0.7) 60%, #FDFDFC 100%)',
            opacity: canScrollLeft ? 1 : 0,
            transition: 'opacity 200ms ease',
            transitionDelay: canScrollLeft ? '60ms' : '0ms',
          }}
        />

        {/* Right fade — desktop only */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 hidden sm:block"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(253,253,252,0.7) 60%, #FDFDFC 100%)',
            opacity: canScrollRight ? 1 : 0,
            transition: 'opacity 200ms ease',
          }}
        />
      </motion.div>

      {/* Navigation dots */}
      {projects.length > 1 && (
        <div
          className="flex items-center justify-center gap-1.5 mt-5"
          style={{ paddingLeft: CONTENT_LEFT, paddingRight: CONTENT_LEFT }}
        >
          {projects.map((_, i) => (
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
      )}
    </section>
  )
}

export default function ProjetsPageClient({ lang }: { lang: 'en' | 'fr' }) {
  const isEn = lang === 'en'
  const projects = getProjects(lang)

  const workProjects = projects.filter(p => p.category === 'product-design')
  const experimentProjects = projects.filter(p => p.category === 'ai-experiment')

  return (
    <div className="min-h-screen bg-[#FDFDFC]">

      {/* Page header — top offset matches homepage h1 at every breakpoint */}
      <motion.div
        style={{ paddingLeft: CONTENT_LEFT, paddingRight: CONTENT_LEFT }}
        className="pt-32 sm:pt-40 md:pt-48 mb-16 md:mb-20"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <h1 className="text-base font-semibold tracking-[-0.01em] text-gray-900">
          {isEn ? 'Work' : 'Projets'}
        </h1>
        <p className="mt-1 text-base text-gray-500 leading-relaxed max-w-[52ch]">
          {isEn
            ? 'Product design, design systems and AI-assisted prototyping.'
            : 'Design produit, design systems et prototypage assisté par IA.'}
        </p>
      </motion.div>

      <CarouselSection
        title={isEn ? 'Work' : 'Travaux'}
        projects={workProjects}
        lang={lang}
        animationDelay={0.08}
      />

      <div className="mt-24 md:mt-32">
        <CarouselSection
          title={isEn ? 'Experiments' : 'Expérimentations'}
          projects={experimentProjects}
          lang={lang}
          animationDelay={0.12}
        />
      </div>

      {/* Visual gallery teaser */}
      <div className="pb-24 md:pb-40">

        {/* Header — stays within the content column, same alignment as carousels */}
        <motion.div
          className="mt-32 pt-16 md:pt-20 border-t border-gray-100 mb-8"
          style={{ paddingLeft: CONTENT_LEFT, paddingRight: CONTENT_LEFT }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-1.5">
            {isEn ? 'Interface gallery' : 'Galerie d\u2019interfaces'}
          </h2>
          <p className="text-sm text-gray-500 max-w-[50ch] leading-relaxed mb-4">
            {isEn
              ? 'Screens and prototypes from enterprise apps, SaaS platforms and design systems I\u2019ve worked on.'
              : '\u00c9crans et prototypes d\u2019applications m\u00e9tier, plateformes SaaS et design systems.'}
          </p>
          <Link
            href={`/${lang}/visual-archive#gallery-scrim`}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900"
            style={{ transition: 'color 140ms ease' }}
          >
            {isEn ? 'Design details' : 'Détails design'}
            <ArrowDiagMd />
          </Link>
        </motion.div>

        {/* Horizontal scroll grid — bleeds off-canvas right, handles own padding */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
        >
          <GalleryGrid lang={lang} />
        </motion.div>

      </div>

    </div>
  )
}
