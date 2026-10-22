'use client'

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import VideoPlayer from '@/components/VideoPlayer'
import { useSnapScroller } from '@/hooks/useSnapScroller'
import { imgDims } from '@/utils/imageDimensions'
import { zoomable } from '@/utils/zoomable'

/**
 * Visuals of the Dailymotion and France VAE case studies, shown large on the shared grey stage
 * (#E8E8E8) like the Tessan page: one figure at the width of the content column, or a strip of
 * figures that snap one by one (same spring as every carousel of the site).
 *
 * A visual that is already painted on the stage grey (`onStage`) sits directly on it, so the
 * stage and the picture read as one surface. Any other visual (white screens, slides, photos)
 * is placed as a card on the stage with room around it, never cropped.
 */
export interface StageItem {
  src: string
  type?: 'image' | 'video'
  /** Short name of the visual: shown under it, used as its accessible name and its lightbox caption */
  caption: string
  /** The picture already carries the stage grey as its own background */
  onStage?: boolean
  /** Widest the visual gets, in px (tall or square visuals that would otherwise fill the column) */
  maxWidth?: number
  /** Natural size, needed for a video (a picture takes its size from the dimensions table) */
  size?: [number, number]
}

const STAGE = 'bg-[#E8E8E8] rounded-xl overflow-hidden ring-1 ring-black/[0.04]'
const CARD = 'rounded-lg overflow-hidden bg-white ring-1 ring-black/[0.06] shadow-sm'
const EASE = 'ease-[cubic-bezier(0.23,1,0.32,1)]'

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
const pad2 = (n: number) => String(n).padStart(2, '0')

function sizeOf(item: StageItem): [number, number] | undefined {
  if (item.size) return item.size
  const d = imgDims(item.src)
  return d.width && d.height ? [d.width, d.height] : undefined
}

/** The picture or the video, at the width of its holder, with its box reserved before it loads */
function Media({ item, priority }: { item: StageItem; priority?: boolean }) {
  const size = sizeOf(item)
  const zoomFx = `transition-transform duration-300 ${EASE} [@media(hover:hover)]:group-hover:scale-[1.02]`
  if (item.type === 'video') {
    return (
      <div style={size ? { aspectRatio: `${size[0]} / ${size[1]}` } : undefined}>
        <VideoPlayer src={item.src} className={`w-full h-full block object-cover ${zoomFx}`} />
      </div>
    )
  }
  return (
    <img
      src={item.src}
      width={size?.[0]}
      height={size?.[1]}
      alt=""
      loading={priority ? 'eager' : 'lazy'}
      className={`w-full h-auto block ${zoomFx}`}
    />
  )
}

/** The visual placed on the stage: seamless when it carries the grey, as a card otherwise */
function Placed({ item, priority }: { item: StageItem; priority?: boolean }) {
  const inner = (
    <div
      className={item.onStage ? 'mx-auto' : `mx-auto ${CARD}`}
      style={item.maxWidth ? { maxWidth: item.maxWidth } : undefined}
    >
      <Media item={item} priority={priority} />
    </div>
  )
  return item.onStage ? inner : <div className="p-[4%] md:p-[5%]">{inner}</div>
}

/** One visual on its own stage, at the width of the content column */
export function StageFigure({
  item,
  onZoom,
  priority,
}: {
  item: StageItem
  onZoom: (src: string) => void
  priority?: boolean
}) {
  return (
    <figure className="m-0">
      <div
        {...zoomable(() => onZoom(item.src))}
        aria-label={item.caption}
        className={`group ${STAGE} cursor-zoom-in transition-[box-shadow,transform] duration-300 ${EASE} [@media(hover:hover)]:hover:ring-black/[0.08] [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99]`}
      >
        <Placed item={item} priority={priority} />
      </div>
      <figcaption className="mt-3 text-left text-xs text-gray-500 leading-relaxed">{item.caption}</figcaption>
    </figure>
  )
}

/**
 * Item width of the strip: from the shape of the visual, so every item of a strip is about the
 * same height (640px on desktop) and stays readable, whatever its proportions.
 */
function stripWidth(item: StageItem): string {
  const size = sizeOf(item)
  const ratio = size ? size[0] / size[1] : 1.6
  const cap = item.maxWidth ?? Math.min(1000, Math.round(640 * ratio))
  return `min(84vw, ${cap}px)`
}

/**
 * Several visuals of one idea in a single stage: each at reading size, the next one peeking in.
 * Drag, arrows and arrow keys go through `useSnapScroller`; touch and trackpad stay native.
 */
export function StageCarousel({
  items,
  ariaLabel,
  prevLabel,
  nextLabel,
  onZoom,
}: {
  items: StageItem[]
  ariaLabel: string
  prevLabel: string
  nextLabel: string
  onZoom: (src: string) => void
}) {
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
    const el = trackRef.current
    if (!el) return
    const apply = () => {
      pointsRef.current = getSnapPoints()
      updateIndex(el.scrollLeft)
    }
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(el)
    return () => ro.disconnect()
  }, [getSnapPoints, updateIndex])

  const total = items.length
  const atStart = index === 0
  const atEnd = index >= total - 1
  const button =
    'inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 transition-[background-color,transform,opacity] duration-150 [@media(hover:hover)]:hover:bg-gray-100 active:scale-[0.96] aria-disabled:opacity-40 aria-disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'

  return (
    <div className={`relative ${STAGE}`}>
      <div
        ref={trackRef}
        {...bind}
        onScroll={(e) => updateIndex(e.currentTarget.scrollLeft)}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        className="snap-scroller snap-rubber no-scrollbar flex gap-6 md:gap-10 overflow-x-auto snap-x snap-mandatory px-6 md:px-10 pt-8 md:pt-12 pb-5 scroll-pl-6 md:scroll-pl-10 cursor-grab"
      >
        {items.map((item) => (
          <figure key={item.src} className="m-0 shrink-0 snap-start" style={{ width: stripWidth(item) }}>
            <div
              {...zoomable(() => onZoom(item.src))}
              aria-label={item.caption}
              className={`group cursor-zoom-in ${item.onStage ? '' : CARD}`}
            >
              <Media item={item} />
            </div>
            <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">{item.caption}</figcaption>
          </figure>
        ))}
      </div>

      {total > 1 && (
        <div className="flex items-center gap-3 px-6 md:px-10 pb-5 md:pb-7">
          <p className="min-w-[4.5rem] text-xs text-gray-500 tabular-nums" aria-live="off">
            {pad2(index + 1)} / {pad2(total)}
          </p>
          <div className="ml-auto flex items-center gap-2">
            <button type="button" aria-label={prevLabel} aria-disabled={atStart} onClick={() => !atStart && scrollToIndex(index - 1)} className={button}>
              <ArrowLeft size={16} aria-hidden="true" />
            </button>
            <button type="button" aria-label={nextLabel} aria-disabled={atEnd} onClick={() => !atEnd && scrollToIndex(index + 1)} className={button}>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
