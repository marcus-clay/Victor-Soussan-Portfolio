'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import Avatar from '@/components/Avatar'
import { getProjects } from '@/data/projectsData'
import { getTestimonials, type Testimonial } from '@/data/testimonialsData'
import { TRANSLATIONS } from '@/data/translations'
import { useSnapScroller } from '@/hooks/useSnapScroller'
import Collapsible from './Collapsible'
import DisclosureButton from './DisclosureButton'
import { getExcerpt, splitSentences } from './excerpt'

/**
 * Testimonials as one horizontal strip of large cards, for the About page. Same interaction
 * grammar as the home filmstrip: `useSnapScroller` gives drag with momentum, rubber band,
 * arrows and keyboard; touch and trackpad scrolling stay native.
 *
 * Quotes are never rewritten. Each card shows a pull quote (one or two whole sentences taken
 * word for word from the testimonial); the complete text opens in place, in the same card.
 */

interface TestimonialCarouselProps {
  lang: 'en' | 'fr'
  /** Label of the link to the full testimonials page */
  allLabel: string
}

const COPY = {
  en: {
    track: 'Testimonials, scroll sideways',
    prev: 'Previous testimonial',
    next: 'Next testimonial',
  },
  fr: {
    track: 'Témoignages, défilement horizontal',
    prev: 'Témoignage précédent',
    next: 'Témoignage suivant',
  },
} as const

/**
 * Testimonials shown, in reading order, with the sentences used as pull quote: [first, end)
 * (indices from `splitSentences`, identical in English and French). The ones left out are
 * either too short to carry a card or only exist in English in the French site. All stay
 * available on the testimonials page.
 */
const SELECTION: ReadonlyArray<readonly [id: string, from: number, to: number]> = [
  ['charlotte-rifflet', 0, 2],
  ['pierre-marie-nigay', 2, 3],
  ['boris-aime', 0, 1],
  ['justine-le-tellier', 2, 3],
  ['frederic-rodriguez', 1, 2],
  ['achref-akkari', 0, 2],
  ['hortense-jan', 2, 4],
  ['hubert-bloch', 1, 2],
]

// useLayoutEffect warns during server rendering in React 18
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const pad2 = (n: number) => String(n).padStart(2, '0')

interface Slide {
  item: Testimonial
  pull: string
  /** Case study the author worked on, when there is one */
  project?: { id: string; name: string }
}

/** Quotation marks of each language (French: guillemets with narrow no-break spaces). */
function quoted(text: string, lang: 'en' | 'fr') {
  return lang === 'fr' ? `« ${text} »` : `“${text}”`
}

function Card({
  slide,
  lang,
  active,
  labels,
}: {
  slide: Slide
  lang: 'en' | 'fr'
  active: boolean
  labels: { readFull: string; readLess: string; caseStudy?: string }
}) {
  const [open, setOpen] = useState(false)
  const { item, pull, project } = slide
  const pullId = `about-quote-${item.id}-pull`
  const fullId = `about-quote-${item.id}-full`

  return (
    <figure className="flex w-[84vw] max-w-[460px] shrink-0 snap-start flex-col rounded-2xl border border-gray-100 bg-white p-6 md:w-[460px] md:p-8">
      {/* The pull quote leaves room for the full text; the card keeps a steady height at rest */}
      <blockquote className={`text-lead-lg ${open ? '' : 'md:min-h-[6lh]'}`}>
        <Collapsible id={pullId} open={!open}>
          <p
            className={`transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              active ? 'text-gray-900' : 'text-gray-600'
            }`}
          >
            {quoted(pull, lang)}
          </p>
        </Collapsible>
        <Collapsible id={fullId} open={open}>
          <p className="text-base text-gray-600">{quoted(item.content, lang)}</p>
        </Collapsible>
      </blockquote>

      <div className="mt-2">
        <DisclosureButton
          open={open}
          controls={fullId}
          onToggle={() => setOpen((v) => !v)}
          labelClosed={labels.readFull}
          labelOpen={labels.readLess}
        />
      </div>

      <figcaption className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-5">
        <Avatar
          filename={item.image}
          alt=""
          className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100"
        />
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900">{item.author}</p>
          <p className="text-sm text-gray-600">{item.role}</p>
        </div>
      </figcaption>

      {project && labels.caseStudy && (
        <Link
          href={`/${lang}/project/${project.id}`}
          draggable={false}
          className="group mt-2 -mb-2 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-medium text-gray-900 transition-colors duration-150 [@media(hover:hover)]:hover:text-gray-500"
        >
          {labels.caseStudy}
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      )}
    </figure>
  )
}

export default function TestimonialCarousel({ lang, allLabel }: TestimonialCarouselProps) {
  const t = COPY[lang]
  const tt = TRANSLATIONS[lang].testimonials

  const slides = useMemo<Slide[]>(() => {
    const all = getTestimonials(lang)
    const projects = getProjects(lang).filter((p) => p.format === 'case-study')
    const out: Slide[] = []
    for (const [id, from, to] of SELECTION) {
      const item = all.find((x) => x.id === id)
      if (!item) continue
      const sentences = splitSentences(item.content)
      // Sentences beyond the text fall back to the shared excerpt rule
      const pull = sentences[from] ? sentences.slice(from, to).join(' ') : getExcerpt(item.content).excerpt
      const project = projects.find((p) => p.testimonialId === id)
      out.push({ item, pull, project: project ? { id: project.id, name: project.navTitle ?? project.title } : undefined })
    }
    return out
  }, [lang])

  const total = slides.length

  const trackRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(0)
  const [index, setIndex] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const pointsRef = useRef<number[]>([])

  const update = useCallback(
    (scrollLeft: number) => {
      const el = trackRef.current
      const points = pointsRef.current
      if (!el || !points.length) return
      const end = scrollLeft >= el.scrollWidth - el.clientWidth - 1
      setAtStart(scrollLeft <= 1)
      setAtEnd(end)
      // On wide screens the last cards share one resting point: at the end, the count reads full
      let best = points.length - 1
      if (!end) {
        let dist = Infinity
        points.forEach((p, i) => {
          const d = Math.abs(p - scrollLeft)
          if (d < dist) {
            dist = d
            best = i
          }
        })
      }
      if (best !== indexRef.current) {
        indexRef.current = best
        setIndex(best)
      }
    },
    [],
  )

  const { bind, scrollToIndex, getSnapPoints } = useSnapScroller(trackRef, { onProgress: update })

  // The strip starts on the page margin (same left edge as `.wrap`, also on screens wider than
  // --wrap-max). Padding and scroll-padding are set in px so the hook and the browser's own
  // snapping agree on where a card rests.
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
      update(el.scrollLeft)
    }
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(el)
    return () => ro.disconnect()
  }, [getSnapPoints, update])

  // Previous and next move to the neighbouring resting point, so they keep working when
  // several cards share the last one.
  const step = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const points = getSnapPoints()
    const x = el.scrollLeft
    let target = -1
    if (dir === 1) target = points.findIndex((p) => p > x + 2)
    else points.forEach((p, i) => { if (p < x - 2) target = i })
    if (target >= 0) scrollToIndex(target)
  }

  const buttonClass =
    'inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-[background-color,transform,opacity] duration-150 [@media(hover:hover)]:hover:bg-gray-100 active:scale-[0.96] aria-disabled:opacity-40 aria-disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'

  return (
    <div>
      <div className="wrap">
        <h2 className="text-title-2 text-gray-900 mb-8 md:mb-10">{tt.title}</h2>
      </div>

      <div
        ref={trackRef}
        {...bind}
        onScroll={(e) => update(e.currentTarget.scrollLeft)}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={t.track}
        className="snap-scroller snap-rubber no-scrollbar flex items-start gap-3 md:gap-5 overflow-x-auto snap-x snap-mandatory pl-5 pr-5 md:pl-10 md:pr-10 scroll-pl-5 md:scroll-pl-10 cursor-grab"
      >
        {slides.map((slide, i) => (
          <Card
            key={slide.item.id}
            slide={slide}
            lang={lang}
            active={i === index}
            labels={{
              readFull: tt.read_full,
              readLess: tt.read_less,
              caseStudy: slide.project ? tt.case_study_link.replace('{name}', slide.project.name) : undefined,
            }}
          />
        ))}
      </div>

      {/* Position, previous and next, on the page margin; link to every testimonial */}
      <div className="wrap mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 md:mt-10">
        <p className="min-w-[4.5rem] text-sm tabular-nums text-gray-900" aria-live="off">
          {pad2(index + 1)} / {pad2(total)}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={t.prev}
            aria-disabled={atStart}
            onClick={() => !atStart && step(-1)}
            className={buttonClass}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={t.next}
            aria-disabled={atEnd}
            onClick={() => !atEnd && step(1)}
            className={buttonClass}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
        <Link
          href={`/${lang}/testimonials`}
          className="group inline-flex min-h-11 w-full items-center gap-1.5 text-sm text-gray-900 transition-colors duration-200 [@media(hover:hover)]:hover:text-gray-500 md:ml-auto md:w-auto"
        >
          {allLabel}
          <ArrowRight
            size={13}
            aria-hidden="true"
            className="transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  )
}
