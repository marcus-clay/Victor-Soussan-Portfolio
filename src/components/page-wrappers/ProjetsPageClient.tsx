'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getProjects } from '@/data/projectsData'
import { PROJETS_GRID_ITEMS, GALLERY_PROJECTS } from '@/data/galleryData'
import type { Project } from '@/data/projectsData'
import { useReveal } from '@/lib/motion'
import { ActRule } from '@/components/case-study/ActSection'

// Left edge of the `wrap` container (same as the header): the first thumbnail aligns with the h1.
// Percentages resolve against the full-width parent, so no scrollbar width is involved.
const CONTENT_LEFT = 'max(var(--pad), calc((100% - var(--wrap-max)) / 2 + var(--pad)))'
// Right padding: lets the next thumbnail bleed in and signals scrollability
const CONTENT_RIGHT = 'var(--pad)'

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

  // Drag state: refs to avoid re-renders on hot path
  const dragging = useRef(false)
  const hasMoved = useRef(false)
  const pointerId = useRef<number | null>(null)
  const dragStartX = useRef(0)
  const dragStartScrollLeft = useRef(0)
  const dragLastX = useRef(0)
  const dragLastTime = useRef(0)
  const dragVelocity = useRef(0)

  const syncBounds = useCallback(() => {
    const el = gridRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }, [])

  // scrollend fires once after snap/momentum settles; debounced scroll = Safari <17 fallback
  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    let timer: ReturnType<typeof setTimeout>
    const onScroll = () => { clearTimeout(timer); timer = setTimeout(syncBounds, 80) }
    el.addEventListener('scrollend', syncBounds, { passive: true })
    el.addEventListener('scroll', onScroll, { passive: true })
    syncBounds()
    return () => {
      clearTimeout(timer)
      el.removeEventListener('scrollend', syncBounds)
      el.removeEventListener('scroll', onScroll)
    }
  }, [syncBounds])

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    if (e.pointerType === 'touch') return
    const el = gridRef.current
    if (!el) return
    dragging.current = true
    hasMoved.current = false
    pointerId.current = e.pointerId
    dragStartX.current = e.clientX
    dragStartScrollLeft.current = el.scrollLeft
    dragLastX.current = e.clientX
    dragLastTime.current = performance.now()
    dragVelocity.current = 0
    el.style.cursor = 'grabbing'
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    const el = gridRef.current
    if (!el) return
    const dx = e.clientX - dragStartX.current
    if (Math.abs(dx) > 4 && !hasMoved.current && pointerId.current !== null) {
      el.setPointerCapture(pointerId.current)
      hasMoved.current = true
    }
    el.scrollLeft = dragStartScrollLeft.current - dx
    const now = performance.now()
    const dt = now - dragLastTime.current
    if (dt > 0) dragVelocity.current = (dragLastX.current - e.clientX) / dt
    dragLastX.current = e.clientX
    dragLastTime.current = now
  }, [])

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return
    dragging.current = false
    const el = gridRef.current
    if (!el) return
    el.style.cursor = 'grab'
    // Fling: scrollBy with behavior:'smooth' triggers native momentum + CSS snap settle
    if (hasMoved.current && Math.abs(dragVelocity.current) > 0.15) {
      el.scrollBy({ left: dragVelocity.current * 250, behavior: 'smooth' })
    }
    syncBounds()
  }, [syncBounds])

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (hasMoved.current) {
      e.preventDefault()
      e.stopPropagation()
      hasMoved.current = false
    }
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
          // Snap aligns to column boundaries: items in the same column share the same
          // offsetLeft so CSS deduplicates snap points, effectively one snap per column
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: CONTENT_LEFT,
          paddingLeft: CONTENT_LEFT,
          paddingRight: CONTENT_RIGHT,
          paddingTop: '12px',
          paddingBottom: '12px',
          cursor: 'grab',
          userSelect: 'none',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
      >
        {GALLERY_GRID_DATA.map((item, i) => (
          <Link
            key={i}
            href={`/${lang}/visual-archive#gallery-${item.projectId}`}
            className="group block rounded-lg overflow-hidden bg-[#F0F0EF] cursor-pointer ring-1 ring-inset ring-black/[0.04] hover:ring-black/[0.1] hover:shadow-md active:scale-[0.98] transition-[box-shadow,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
            draggable={false}
            style={{ scrollSnapAlign: 'start' }}
          >
            <img
              src={item.src}
              alt={`${item.name} (UI)`}
              loading="lazy"
              draggable={false}
              className="w-full h-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Project grid: two large cards open the list, the rest follow on a three-column rhythm
// ---------------------------------------------------------------------------

function ProjectCard({
  project,
  lang,
  large,
  index,
}: {
  project: Project
  lang: 'en' | 'fr'
  large: boolean
  index: number
}) {
  return (
    <Link
      href={`/${lang}/project/${project.id}`}
      className={`group block rounded-2xl outline-offset-4 active:scale-[0.985] transition-transform duration-150 ease-out ${
        large ? 'lg:col-span-6' : 'lg:col-span-4'
      }`}
      draggable={false}
    >
      {/* One region per card: the cover. Text sits outside it, tight to the cover's lower edge. */}
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-[#F3F3F2] ring-1 ring-inset ring-black/[0.05]">
        <img
          src={coverSrc(project)}
          alt=""
          loading={index < 2 ? 'eager' : 'lazy'}
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]"
        />
      </div>

      <p className="mt-4 truncate text-xs text-gray-500">{project.role}</p>
      <h3 className="mt-1 text-title-3 text-gray-900 transition-colors duration-150 [@media(hover:hover)]:group-hover:text-gray-500">
        {project.title}
      </h3>
      <p className="mt-1.5 max-w-[56ch] text-sm text-gray-600 line-clamp-2">{project.summary}</p>
    </Link>
  )
}

function ProjectGrid({
  title,
  projects,
  lang,
  featured,
}: {
  title: string
  projects: Project[]
  lang: 'en' | 'fr'
  /** Number of leading cards shown at double width */
  featured: number
}) {
  const reveal = useReveal()
  return (
    <section aria-label={title}>
      <motion.div className="wrap mb-8 md:mb-10" {...reveal()}>
        <div className="flex items-baseline gap-2.5">
          <h2 className="text-title-2 text-gray-900">{title}</h2>
          <span className="text-micro tabular-nums text-gray-500">{projects.length}</span>
        </div>
      </motion.div>

      <div className="wrap grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-12 lg:gap-y-14">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} lang={lang} large={i < featured} index={i} />
        ))}
      </div>
    </section>
  )
}

export default function ProjetsPageClient({ lang }: { lang: 'en' | 'fr' }) {
  const reveal = useReveal()
  const isEn = lang === 'en'
  const projects = getProjects(lang)

  const workProjects = projects.filter(p => p.category === 'product-design')
  const experimentProjects = projects.filter(p => p.category === 'ai-experiment')

  return (
    <div className="min-h-screen bg-[#FDFDFC]">

      {/* Page header: top offset matches homepage h1 at every breakpoint */}
      <header className="wrap pt-10 md:pt-16 pb-12 md:pb-16">
        <h1 className="text-headline text-gray-900">
          {isEn ? 'Work' : 'Projets'}
        </h1>
        <p className="mt-4 text-lead-lg text-gray-600 max-w-[54ch]">
          {isEn
            ? 'Product design, design systems and AI-assisted prototyping.'
            : 'Design produit, design systems et prototypage assisté par IA.'}
        </p>
      </header>

      <div className="pb-16 md:pb-24">
        <ProjectGrid
          title={isEn ? 'Work' : 'Travaux'}
          projects={workProjects}
          lang={lang}
          featured={2}
        />
      </div>

      <ActRule />
      <div className="pt-12 md:pt-16 pb-16 md:pb-24">
        <ProjectGrid
          title={isEn ? 'Experiments' : 'Expérimentations'}
          projects={experimentProjects}
          lang={lang}
          featured={0}
        />
      </div>

      {/* Visual gallery teaser */}
      <ActRule />
      <div className="pt-12 md:pt-16 pb-16 md:pb-24">

        {/* Header: same left edge as the grids */}
        <motion.div className="wrap mb-8" {...reveal()}>
          <h2 className="text-title-2 text-gray-900 mb-2">
            {isEn ? 'Interface gallery' : 'Galerie d’interfaces'}
          </h2>
          <p className="text-base text-gray-600 max-w-[62ch] mb-4">
            {isEn
              ? 'Screens and prototypes from enterprise apps, SaaS platforms and design systems I’ve worked on.'
              : 'Écrans et prototypes d’applications métier, plateformes SaaS et design systems.'}
          </p>
          <Link
            href={`/${lang}/visual-archive#gallery-scrim`}
            className="inline-flex items-center gap-1.5 min-h-11 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97] transition-[color,transform] duration-150"
          >
            {isEn ? 'Design details' : 'Détails design'}
            <ArrowDiagMd />
          </Link>
        </motion.div>

        {/* Horizontal scroll grid: bleeds off-canvas right, handles own padding */}
        <motion.div {...reveal(1)}>
          <GalleryGrid lang={lang} />
        </motion.div>

      </div>

    </div>
  )
}
