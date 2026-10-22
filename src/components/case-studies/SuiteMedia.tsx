'use client'

/**
 * Visuals shared by the three SQOOL case studies (Connect, SQOOL, SQOOL Classe).
 *
 * - MediaStage: one large visual at the full width of the act column, on the flat grey
 *   (#E8E8E8) used by every case study panel. `inset` is for visuals with a white or
 *   transparent margin: they sit on the grey with room around them instead of floating.
 * - MediaCarousel: several visuals of one idea in a horizontal strip. Each slide keeps the
 *   natural ratio of its image (never cropped, never a thumbnail), the strip uses the
 *   site-wide `useSnapScroller` (native touch, 1:1 mouse drag, momentum, rubber band) and
 *   the arrows go through the same spring.
 *
 * Both open the page's lightbox through `onOpen`, so every visual stays reachable there.
 */

import { useCallback, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import VideoPlayer from '@/components/VideoPlayer'
import { imgDims } from '@/utils/imageDimensions'
import { zoomable } from '@/utils/zoomable'
import { useSnapScroller } from '@/hooks/useSnapScroller'

export interface SuiteMediaItem {
  src: string
  caption: string
  type?: 'image' | 'video'
  /** The visual has a white or transparent margin: pad it on the grey stage */
  inset?: boolean
  /** Width over height of a video (images use their natural size). Default 16/9 */
  ratio?: number
}

const EASE = 'ease-[cubic-bezier(0.23,1,0.32,1)]'
const FRAME = `group relative block w-full overflow-hidden rounded-2xl bg-[#E8E8E8] cursor-zoom-in ring-1 ring-black/[0.04] transition-[transform,box-shadow] duration-300 ${EASE} [@media(hover:hover)]:hover:ring-black/[0.08] [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99]`
const MEDIA = `block w-full h-auto transition-transform duration-300 ${EASE} [@media(hover:hover)]:group-hover:scale-[1.02]`

/** `fill`: the frame has a fixed height (carousel, from md), the visual fills it without cropping. */
function Visual({ item, eager, fill }: { item: SuiteMediaItem; eager?: boolean; fill?: boolean }) {
  if (item.type === 'video') {
    return (
      <VideoPlayer
        src={item.src}
        containerClassName={fill ? 'md:h-full' : ''}
        className={fill ? `${MEDIA} md:h-full md:object-cover` : MEDIA}
      />
    )
  }
  const img = (
    <img
      src={item.src}
      {...imgDims(item.src)}
      alt=""
      loading={eager ? 'eager' : 'lazy'}
      className={`${MEDIA} ${fill ? 'md:h-full md:object-contain' : ''} ${item.inset ? 'rounded-lg shadow-sm' : ''}`}
    />
  )
  return item.inset ? <div className={`p-4 md:p-8 ${fill ? 'md:h-full md:box-border' : ''}`}>{img}</div> : img
}

/** One large visual, full width of the act column, with its caption. */
export function MediaStage({
  item,
  onOpen,
  className = '',
}: {
  item: SuiteMediaItem
  onOpen: (src: string) => void
  className?: string
}) {
  return (
    <figure className={className}>
      <div {...zoomable(() => onOpen(item.src))} aria-label={item.caption} className={FRAME}>
        <Visual item={item} />
      </div>
      <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed max-w-[62ch]">{item.caption}</figcaption>
    </figure>
  )
}

const pad2 = (n: number) => String(n).padStart(2, '0')

export function MediaCarousel({
  items,
  label,
  labels,
  onOpen,
  className = '',
}: {
  items: SuiteMediaItem[]
  /** Accessible name of the strip */
  label: string
  labels: { prev: string; next: string; slide: string }
  onOpen: (src: string) => void
  className?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(items.length < 2)

  const update = useCallback(
    (scrollLeft: number) => {
      const el = trackRef.current
      if (!el) return
      const end = scrollLeft >= el.scrollWidth - el.clientWidth - 1
      setAtStart(scrollLeft <= 1)
      setAtEnd(end)
      // The slide whose left edge is nearest to the strip's left edge (the last one at the end)
      const slides = Array.from(el.children) as HTMLElement[]
      let best = 0
      let dist = Infinity
      slides.forEach((s, i) => {
        const d = Math.abs(s.offsetLeft - el.offsetLeft - scrollLeft)
        if (d < dist) {
          dist = d
          best = i
        }
      })
      setIndex(end ? slides.length - 1 : best)
    },
    []
  )

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

  const button =
    'inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-[background-color,transform,opacity] duration-150 [@media(hover:hover)]:hover:bg-gray-100 active:scale-[0.96] aria-disabled:opacity-40 aria-disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'

  return (
    <div className={className}>
      <div
        ref={trackRef}
        {...bind}
        onScroll={(e) => update(e.currentTarget.scrollLeft)}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        className="snap-scroller snap-rubber no-scrollbar flex items-start gap-3 md:gap-5 overflow-x-auto snap-x snap-mandatory cursor-grab"
      >
        {items.map((item, i) => {
          const d = imgDims(item.src)
          const ratio = item.type === 'video' ? item.ratio ?? 16 / 9 : d.width && d.height ? d.width / d.height : 16 / 10
          return (
            <figure
              key={item.src}
              aria-roledescription="slide"
              aria-label={`${labels.slide} ${i + 1} / ${items.length}`}
              className="shrink-0 snap-start w-[88%] md:w-auto md:max-w-[92%]"
            >
              {/* Phones: the slide takes most of the width, its height follows the image.
                  From md: every slide of the strip has the same height, its width follows the ratio. */}
              <div
                {...zoomable(() => onOpen(item.src))}
                aria-label={item.caption}
                className={`${FRAME} md:w-auto md:max-w-full md:h-[clamp(300px,36vw,500px)]`}
                style={{ aspectRatio: String(ratio) }}
              >
                <Visual item={item} eager={i === 0} fill />
              </div>
              {/* The caption never widens a narrow slide: it wraps under the visual */}
              <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed md:w-0 md:min-w-full">{item.caption}</figcaption>
            </figure>
          )
        })}
      </div>

      {items.length > 1 && (
        <div className="mt-5 flex items-center justify-between">
          <p className="text-xs text-gray-500 tabular-nums" aria-hidden="true">
            {pad2(index + 1)} / {pad2(items.length)}
          </p>
          <div className="flex items-center gap-2">
            <button type="button" aria-label={labels.prev} aria-disabled={atStart} onClick={() => step(-1)} className={button}>
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button type="button" aria-label={labels.next} aria-disabled={atEnd} onClick={() => step(1)} className={button}>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
