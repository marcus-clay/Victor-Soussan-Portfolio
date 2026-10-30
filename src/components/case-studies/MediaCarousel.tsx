'use client'

import { useCallback, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { useSnapScroller } from '@/hooks/useSnapScroller'
import { imgDims } from '@/utils/imageDimensions'
import { zoomable } from '@/utils/zoomable'

export interface CarouselItem {
  src: string
  /** Accessible name of the slide, shown as a one-line caption under it */
  name: string
}

interface MediaCarouselProps {
  items: CarouselItem[]
  /** Names the strip for assistive technology */
  label: string
  labels: { prev: string; next: string }
  onZoom: (src: string) => void
}

const pad2 = (n: number) => String(n).padStart(2, '0')

/**
 * A strip of large photographs (about three quarters of the column on desktop, nine tenths on
 * phones, the next one peeking). Same grammar as every carousel of the site: `useSnapScroller`
 * for drag, momentum and rubber band, arrows and a counter below, a click opens the lightbox.
 * Used where a block needs more than one big image: the making-of of a project.
 */
export default function MediaCarousel({ items, label, labels, onZoom }: MediaCarouselProps) {
  const total = items.length
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback((scrollLeft: number) => {
    const el = trackRef.current
    if (!el) return
    const end = scrollLeft >= el.scrollWidth - el.clientWidth - 1
    setAtStart(scrollLeft <= 1)
    setAtEnd(end)
    const children = Array.from(el.children) as HTMLElement[]
    if (!children.length) return
    const box = el.getBoundingClientRect()
    let best = 0
    let dist = Infinity
    children.forEach((child, i) => {
      const d = Math.abs(child.getBoundingClientRect().left - box.left)
      if (d < dist) {
        dist = d
        best = i
      }
    })
    setIndex(end ? children.length - 1 : best)
  }, [])

  const { bind, scrollToIndex, getSnapPoints } = useSnapScroller(trackRef, { onProgress: update })

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
        aria-label={label}
        className="snap-scroller snap-rubber no-scrollbar flex snap-x snap-mandatory items-start gap-3 overflow-x-auto md:gap-5 cursor-grab"
      >
        {items.map((item, i) => (
          <figure
            key={item.src}
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${total}`}
            className="w-[88%] shrink-0 snap-start md:w-[74%]"
          >
            <div
              {...zoomable(() => onZoom(item.src))}
              aria-label={item.name}
              className={`group cursor-zoom-in overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition-[border-color,box-shadow,transform] duration-300 ease-media active:duration-150 active:ease-out [@media(hover:hover)]:hover:border-gray-200 [@media(hover:hover)]:hover:shadow-lg [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99]`}
            >
              <img
                loading="lazy"
                src={item.src}
                {...imgDims(item.src)}
                alt=""
                draggable={false}
                className={`block h-auto w-full transition-transform duration-300 ease-media [@media(hover:hover)]:group-hover:scale-[1.02]`}
              />
            </div>
            <figcaption className="mt-3 text-xs text-gray-500">{item.name}</figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-x-4">
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
