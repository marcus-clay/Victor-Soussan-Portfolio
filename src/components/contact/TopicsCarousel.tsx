'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { useSnapScroller } from '@/hooks/useSnapScroller'

/**
 * The talk topics as one horizontal strip of dark cards. Same interaction grammar as the home
 * filmstrip and the testimonials: `useSnapScroller` (drag with momentum, rubber band, native
 * touch), the strip starts on the page margin, position and arrows sit below on the margin.
 * The cards are the one high-contrast object of the page: ink ground, white title.
 */

export interface TopicCard {
  title: string
  desc: string
  /** Opens a pre-filled email about this topic */
  href: string
}

interface TopicsCarouselProps {
  topics: TopicCard[]
  cardLabel: string
  labels: { track: string; prev: string; next: string }
}

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
const pad2 = (n: number) => String(n).padStart(2, '0')

export default function TopicsCarousel({ topics, cardLabel, labels }: TopicsCarouselProps) {
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
        className="snap-scroller snap-rubber no-scrollbar flex items-stretch gap-3 md:gap-5 overflow-x-auto snap-x snap-mandatory pl-5 pr-5 md:pl-10 md:pr-10 scroll-pl-5 md:scroll-pl-10 cursor-grab"
      >
        {topics.map((topic, i) => (
          <article
            key={topic.title}
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${total}`}
            className="flex min-h-[19rem] w-[78vw] max-w-[22rem] shrink-0 snap-start flex-col justify-between rounded-2xl bg-[#0a0a0a] p-6 text-left md:min-h-[21rem] md:w-[22rem] md:p-7"
          >
            <div>
              <p className="text-xs tabular-nums text-gray-400">{pad2(i + 1)}</p>
              <h3 className="mt-4 text-subhead text-white text-balance">{topic.title}</h3>
              <p className="mt-3 text-sm text-gray-400">{topic.desc}</p>
            </div>
            <a
              href={topic.href}
              draggable={false}
              className="group mt-8 inline-flex min-h-11 w-fit items-center gap-1.5 rounded-full bg-white px-5 text-sm font-medium text-gray-900 transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] [@media(hover:hover)]:hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {cardLabel}
              <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>

      <div className="wrap mt-8 flex items-center gap-x-4 md:mt-10">
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
