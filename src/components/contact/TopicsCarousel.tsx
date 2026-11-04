'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUp } from '@phosphor-icons/react'
import { PILL } from '@/components/claude/ui'
import TopicPicture from './TopicPicture'
import { useSnapScroller } from '@/hooks/useSnapScroller'

/**
 * The talk topics as one horizontal strip of cards. Same interaction grammar as the home
 * filmstrip and the testimonials: `useSnapScroller` (drag with momentum, rubber band, native
 * touch), the strip starts on the page margin, position and arrows sit below on the margin.
 * The cards are the tile of the Claude block of the home (soft grey, 28 px corners, hairline ring, black pill)
 * on the light dot grid of the project cards. Their button does not write an email: it takes the visitor back to
 * the top of the page, where the ways to get in touch are. Each card opens on a small black and white picture of its topic, in place of a number.
 * On a phone the cards are that strip; from md up there are only four of them and the arrows would serve nothing:
 * they stand on the page grid (two by two, four in a row from xl) and the strip's controls are gone.
 */

export interface TopicCard {
  /** The picture of the topic (topic-scenes.tsx) */
  scene: string
  title: string
  desc: string
  /** Where the button leads: the contact page itself, whose top holds the ways to get in touch */
  href: string
}

interface TopicsCarouselProps {
  lang: 'en' | 'fr'
  topics: TopicCard[]
  cardLabel: string
  labels: { track: string; prev: string; next: string }
}

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
const pad2 = (n: number) => String(n).padStart(2, '0')

export default function TopicsCarousel({ lang, topics, cardLabel, labels }: TopicsCarouselProps) {
  const total = topics.length
  const trackRef = useRef<HTMLDivElement>(null)
  const pointsRef = useRef<number[]>([])
  const indexRef = useRef(0)
  const [index, setIndex] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback((scrollLeft: number) => {
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
  }, [])

  const { bind, scrollToIndex, getSnapPoints } = useSnapScroller(trackRef, { onProgress: update })

  // The strip starts on the page margin, also on screens wider than --wrap-max
  useIsoLayoutEffect(() => {
    const el = trackRef.current
    if (!el) return
    const apply = () => {
      // From md up the cards are a grid on the page's own columns: nothing to align, nothing to snap
      if (window.matchMedia('(min-width: 768px)').matches) {
        el.style.paddingLeft = ''
        el.style.paddingRight = ''
        el.style.scrollPaddingLeft = ''
        return
      }
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

  // The button is a link to the page the visitor is on: it goes back to the top, smoothly, and puts the focus on the
  // page title so that keyboard and screen reader users arrive there too
  const toTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    const title = document.querySelector<HTMLElement>('main h1')
    if (title) {
      title.setAttribute('tabindex', '-1')
      title.focus({ preventScroll: true })
    }
  }

  const buttonClass =
    'inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-[background-color,transform,opacity] duration-150 [@media(hover:hover)]:hover:bg-gray-100 active:scale-[0.96] aria-disabled:opacity-40 aria-disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'

  return (
    <div>
      <div
        ref={trackRef}
        {...bind}
        onScroll={(e) => update(e.currentTarget.scrollLeft)}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={labels.track}
        className="snap-scroller snap-rubber no-scrollbar flex items-stretch gap-3 overflow-x-auto snap-x snap-mandatory pl-5 pr-5 scroll-pl-5 cursor-grab md:mx-auto md:grid md:max-w-[var(--wrap-max)] md:grid-cols-2 md:gap-5 md:overflow-visible md:px-[var(--pad)] md:cursor-auto xl:grid-cols-4"
      >
        {topics.map((topic, i) => (
          <article
            key={topic.title}
            data-hover-scope
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${total}`}
            style={{
              backgroundColor: '#F4F4F2',
              backgroundImage: 'radial-gradient(rgba(17, 24, 39, 0.07) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
            className="group flex min-h-[22rem] w-[78vw] max-w-[22rem] shrink-0 snap-start flex-col justify-between rounded-[28px] p-6 text-left ring-1 ring-inset ring-black/[0.04] md:min-h-0 md:w-auto md:max-w-none md:p-7"
          >
            <div>
              <TopicPicture scene={topic.scene} lang={lang} />
              <h3 className="mt-6 text-[22px] font-semibold leading-[1.15] tracking-[-0.02em] text-gray-900 text-balance md:text-[24px]">{topic.title}</h3>
              <p className="mt-3 text-base text-gray-600">{topic.desc}</p>
            </div>
            <a href={topic.href} onClick={toTop} draggable={false} className={`${PILL} mt-8 w-fit`}>
              {cardLabel}
              <ArrowUp size={16} weight="bold" aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>

      <div className="wrap mt-8 flex items-center gap-x-4 md:hidden">
        <p className="min-w-[4.5rem] text-sm tabular-nums text-gray-900" aria-live="off">
          {pad2(index + 1)} / {pad2(total)}
        </p>
        <div className="flex items-center gap-2">
          <button type="button" aria-label={labels.prev} aria-disabled={atStart} onClick={() => !atStart && step(-1)} className={buttonClass}>
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button type="button" aria-label={labels.next} aria-disabled={atEnd} onClick={() => !atEnd && step(1)} className={buttonClass}>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
