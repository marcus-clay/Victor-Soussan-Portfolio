'use client'

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { getProjects } from '@/data/projectsData'
import { getTestimonials } from '@/data/testimonialsData'
import { getProjectTags } from '@/data/projectTags'
import { CASE_STUDY_SHELL } from '@/data/caseStudyShell'
import { imgDims } from '@/utils/imageDimensions'
import { useSnapScroller } from '@/hooks/useSnapScroller'

/**
 * Four case studies, drawn at random on every page load, as one horizontal strip of large cards.
 * Each card is a single link to the project. Interaction (drag with momentum, rubber band, arrows, keyboard) comes from
 * `useSnapScroller`; touch and trackpad scrolling stay native.
 */

interface ProjectFilmstripProps {
  lang: 'en' | 'fr'
}

const COPY = {
  en: {
    label: 'Case studies',
    track: 'Case studies, scroll sideways',
    prev: 'Previous case study',
    next: 'Next case study',
    all: 'All projects',
    facts: 'Sector and type',
  },
  fr: {
    label: 'Études de cas',
    track: 'Études de cas, défilement horizontal',
    prev: 'Étude de cas précédente',
    next: 'Étude de cas suivante',
    all: 'Tous les projets',
    facts: 'Secteur et type',
  },
} as const

// Thumbnails that ship with 400w / 800w / 1200w variants next to the 1920w original.
const RESPONSIVE_THUMBS = new Set([
  '/images/thumbnail-toolkit.webp',
  '/images/thumbnail-dailymotion-web-platform.webp',
  '/images/thumbnail-connect.webp',
  '/images/thumbnail-sqool-suite.webp',
  '/images/thumbnail-pagesjaunes-multidevices.webp',
])

function srcSetFor(src: string): string | undefined {
  if (!RESPONSIVE_THUMBS.has(src)) return undefined
  const base = src.replace(/\.webp$/, '')
  return `${base}-400w.webp 400w, ${base}-800w.webp 800w, ${base}-1200w.webp 1200w, ${src} 1920w`
}

// useLayoutEffect warns during server rendering in React 18
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const MAX_QUOTE = 190

// How many cards the strip shows
const SHOWN = 4

/**
 * Card width: 84vw as before, but capped so the whole card and the controls under it fit in the
 * viewport. 176px = sticky nav (64) + gap under the nav (16) + gap above the controls (40) +
 * controls (44) + bottom gap (12); 1.5 is the 3:2 ratio of the card.
 */
const CARD_WIDTH = 'w-[min(86vw,calc((100svh_-_176px)_*_1.5))] md:w-[min(84vw,calc((100svh_-_176px)_*_1.5))]'

/** Fisher-Yates on a copy. Only called in the browser, after mount. */
function shuffled<T>(items: T[]): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

const SENTENCE = /.+?[.!?](?=\s|$)/g

/**
 * Which sentence of a testimonial is quoted by default: the first one that fits. The first
 * sentence of the Toolkit founder's testimonial is a negation that reads cut off on its own, so
 * the third is used. Every quote is a whole sentence of the original, word for word.
 */
const QUOTE_SENTENCE: Record<string, number> = { 'pierre-marie-nigay': 2 }

/**
 * One verbatim pull quote per project. Two projects may share a testimonial (SQOOL and SQOOL
 * Classe): the second one takes the next sentence that fits, so the strip never repeats itself.
 */
function pullQuotes(
  projects: { id: string; testimonialId?: string }[],
  testimonials: { id: string; content: string }[],
): Record<string, string> {
  const used = new Map<string, Set<number>>()
  const quotes: Record<string, string> = {}
  for (const project of projects) {
    const testimonial = project.testimonialId ? testimonials.find((x) => x.id === project.testimonialId) : undefined
    if (!testimonial) continue
    const sentences = (testimonial.content.match(SENTENCE) ?? []).map((x) => x.trim())
    const taken = used.get(testimonial.id) ?? new Set<number>()
    const start = QUOTE_SENTENCE[testimonial.id] ?? 0
    const order = [...sentences.keys()].sort((x, y) => ((x - start + sentences.length) % sentences.length) - ((y - start + sentences.length) % sentences.length))
    const pick = order.find((i) => !taken.has(i) && sentences[i].length <= MAX_QUOTE && sentences[i].length >= 40)
    if (pick === undefined) continue
    taken.add(pick)
    used.set(testimonial.id, taken)
    quotes[project.id] = sentences[pick]
  }
  return quotes
}

const pad2 = (n: number) => String(n).padStart(2, '0')

/** True when the text laid over this ground must be light (relative luminance below 0.45). */
function isDarkGround(hex: string): boolean {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex)
  if (!m) return false
  const n = parseInt(m[1], 16)
  const lin = (c: number) => {
    const v = c / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  }
  const lum = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255)
  return lum < 0.45
}

export default function ProjectFilmstrip({ lang }: ProjectFilmstripProps) {
  const t = COPY[lang]
  const eligible = getProjects(lang).filter((p) => p.format === 'case-study' && CASE_STUDY_SHELL[p.id])
  const testimonials = getTestimonials(lang)
  // Quotes are chosen over the whole set, so a project keeps the same quote whichever four are drawn
  const quotes = pullQuotes(eligible, testimonials)

  // The page is static, so the draw happens in the browser. Until then the first four are rendered
  // (what crawlers and no-JS visitors get) and kept transparent, to avoid showing one set and then swapping it.
  const [pickedIds, setPickedIds] = useState<string[] | null>(null)
  const projects = pickedIds
    ? pickedIds.map((id) => eligible.find((p) => p.id === id)).filter((p): p is (typeof eligible)[number] => !!p)
    : eligible.slice(0, SHOWN)
  const total = projects.length

  const trackRef = useRef<HTMLDivElement>(null)
  const pointsRef = useRef<number[]>([])
  const indexRef = useRef(0)
  const [index, setIndex] = useState(0)

  const updateIndex = useCallback((scrollLeft: number) => {
    const points = pointsRef.current
    if (!points.length) return
    let best = 0
    let dist = Infinity
    points.forEach((p, i) => {
      const d = Math.abs(p - scrollLeft)
      if (d < dist) {
        dist = d
        best = i
      }
    })
    if (best !== indexRef.current) {
      indexRef.current = best
      setIndex(best)
    }
  }, [])

  const { bind, scrollToIndex, getSnapPoints } = useSnapScroller(trackRef, { onProgress: updateIndex })

  useIsoLayoutEffect(() => {
    setPickedIds(shuffled(eligible.map((p) => p.id)).slice(0, SHOWN))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  // The strip starts on the page margin (20px, 40px from md, plus the free space of the
  // container on screens wider than --wrap-max). Padding and scroll-padding are set in px so the hook and the
  // browser's own snapping agree on where a card rests.
  useIsoLayoutEffect(() => {
    const el = trackRef.current
    if (!el) return
    const apply = () => {
      const root = getComputedStyle(document.documentElement)
      const gutter = parseFloat(root.getPropertyValue('--pad')) || 20
      const max = parseFloat(root.getPropertyValue('--wrap-max')) || 1920
      const pad = Math.max(gutter, (el.clientWidth - max) / 2 + gutter)
      el.style.paddingLeft = `${pad}px`
      el.style.paddingRight = `${pad}px`
      el.style.scrollPaddingLeft = `${pad}px`
      pointsRef.current = getSnapPoints()
      updateIndex(el.scrollLeft)
    }
    // Moving cards in the DOM (the random draw) can shift a snapping container: start on the first card
    el.scrollLeft = 0
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(el)
    return () => ro.disconnect()
  }, [getSnapPoints, updateIndex, pickedIds])

  const atStart = index === 0
  const atEnd = index === total - 1

  const easing = 'cubic-bezier(0.23,1,0.32,1)'

  return (
    <section
      aria-labelledby="filmstrip-title"
      className={`pb-16 md:pb-28 transition-opacity duration-200 ease-out ${pickedIds ? 'opacity-100' : 'opacity-0 filmstrip-pending'}`}
    >
      <noscript>
        <style>{'.filmstrip-pending{opacity:1!important}'}</style>
      </noscript>
      <h2 id="filmstrip-title" className="sr-only">
        {t.label}
      </h2>

      <div
        ref={trackRef}
        {...bind}
        onScroll={(e) => updateIndex(e.currentTarget.scrollLeft)}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={t.track}
        className="snap-scroller snap-rubber no-scrollbar flex gap-3 md:gap-5 overflow-x-auto snap-x snap-mandatory py-6 -my-6 pl-5 pr-5 md:pl-10 md:pr-10 scroll-pl-5 md:scroll-pl-10 cursor-grab"
      >
        {projects.map((project, i) => {
          const shell = CASE_STUDY_SHELL[project.id]
          const testimonial = project.testimonialId
            ? testimonials.find((x) => x.id === project.testimonialId)
            : undefined
          const quote = quotes[project.id] ?? null
          const titleId = `filmstrip-${project.id}-title`
          const summaryId = `filmstrip-${project.id}-summary`
          const srcSet = srcSetFor(shell.visual)
          const photo = shell.fit === 'cover'
          // Light text on photographs (dark veil) and on dark grounds, dark text on light grounds
          const light = photo || isDarkGround(shell.tone)

          return (
            <Link
              key={project.id}
              href={`/${lang}/project/${project.id}`}
              aria-labelledby={titleId}
              aria-describedby={summaryId}
              draggable={false}
              className={`hero-panel group block shrink-0 snap-start [container-type:inline-size] ${CARD_WIDTH} min-w-[300px] max-w-[1215px] aspect-[3/2] select-none shadow-sm transition-[transform,box-shadow] duration-300 [@media(hover:hover)]:hover:scale-[1.01] [@media(hover:hover)]:hover:shadow-lg active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900`}
              style={{ backgroundColor: shell.tone, transitionTimingFunction: easing }}
            >
              <img
                src={shell.visual}
                srcSet={srcSet}
                sizes={srcSet ? '(min-width: 1450px) 1215px, 86vw' : undefined}
                {...imgDims(shell.visual)}
                alt=""
                draggable={false}
                loading={i < 2 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : undefined}
                className={`absolute inset-0 z-[1] w-full h-full transition-transform duration-300 [@media(hover:hover)]:group-hover:scale-[1.02] ${
                  shell.fit === 'cover' || shell.fit === 'bleed' ? 'object-cover' : 'object-contain p-[4%] pb-[12%] md:pb-[14%]'
                }`}
                style={{
                  transitionTimingFunction: easing,
                  ...(shell.position ? { objectPosition: shell.position } : {}),
                }}
              />

              {/* Ground fade: the image dissolves into its own tone where the text sits (or into a
                  dark veil for photographs), so the caption reads as part of the picture. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[46%]"
                style={{
                  background: photo
                    ? 'linear-gradient(to top, rgba(0,0,0,0.62), rgba(0,0,0,0))'
                    : `linear-gradient(to top, ${shell.tone} 12%, ${shell.tone}00 100%)`,
                }}
              />

              {/* Hover: a white pill with an arrow, top right, like the case study cards of the reference.
                  Only where a pointer can hover; the whole card is already the link. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute z-[3] right-8 top-8 hidden h-12 w-12 items-center justify-center rounded-full bg-white text-gray-900 opacity-0 scale-90 transition-[opacity,transform] duration-200 ease-out [@media(hover:hover)]:flex [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:scale-100"
              >
                <ArrowRight size={20} weight="regular" />
              </span>

              {/* Caption: directly on the picture, lower left */}
              <div className="absolute z-[3] left-4 bottom-4 md:left-8 md:bottom-8 xl:left-10 xl:bottom-10 max-w-[calc(100%-2rem)] md:max-w-[34rem]">
                <h3 id={titleId} className={`text-subhead ${light ? 'text-white' : 'text-gray-900'}`}>
                  {project.title}
                </h3>
                <p
                  id={summaryId}
                  className={`hidden sm:block mt-2 text-lead-lg line-clamp-2 ${light ? 'text-white/75' : 'text-gray-600'}`}
                >
                  {project.summary}
                </p>
                <ul className="hidden sm:flex flex-wrap gap-2 mt-4 md:mt-5" aria-label={t.facts}>
                  {getProjectTags(project.id, lang).map((fact) => (
                    <li
                      key={fact}
                      className={`inline-flex min-h-8 items-center rounded-full border px-3 text-micro uppercase tracking-[0.08em] ${
                        light ? 'border-white/40 text-white/90' : 'border-gray-900/20 text-gray-700'
                      }`}
                    >
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quote plate: translucent, lower right, only when the card is wide enough to sit beside the caption
                  (the card width follows the viewport height), only for projects with a testimonial */}
              {testimonial && quote && (
                <figure
                  className={`hidden [@container(min-width:1010px)]:block absolute z-[3] right-10 bottom-10 w-[24rem] 2xl:w-[28rem] rounded-2xl p-6 backdrop-blur-xl ring-1 ${
                    light
                      ? 'bg-black/35 ring-white/10 text-white'
                      : 'bg-white/70 ring-black/[0.06] text-gray-900'
                  }`}
                >
                  <blockquote className="text-base leading-snug">
                    {lang === 'fr' ? `« ${quote} »` : `“${quote}”`}
                  </blockquote>
                  <figcaption className={`mt-3 text-sm ${light ? 'text-white/70' : 'text-gray-600'}`}>
                    {testimonial.author}, {testimonial.role}
                  </figcaption>
                </figure>
              )}
            </Link>
          )
        })}
      </div>

      {/* Position, previous and next, on the page margin */}
      <div className="wrap mt-8 md:mt-10 flex items-center gap-4">
        <p className="text-sm text-gray-900 tabular-nums min-w-[4.5rem]" aria-live="off">
          {pad2(index + 1)} / {pad2(total)}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={t.prev}
            aria-disabled={atStart}
            onClick={() => !atStart && scrollToIndex(index - 1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-[background-color,transform,opacity] duration-150 [@media(hover:hover)]:hover:bg-gray-100 active:scale-[0.96] aria-disabled:opacity-40 aria-disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={t.next}
            aria-disabled={atEnd}
            onClick={() => !atEnd && scrollToIndex(index + 1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-[background-color,transform,opacity] duration-150 [@media(hover:hover)]:hover:bg-gray-100 active:scale-[0.96] aria-disabled:opacity-40 aria-disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
        <Link
          href={`/${lang}/projets`}
          className="ml-auto inline-flex min-h-11 items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150"
        >
          {t.all}
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
