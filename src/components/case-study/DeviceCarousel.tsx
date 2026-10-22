'use client'

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import DeviceMockup, { type DeviceKind, type DeviceScreen } from '@/components/case-study/DeviceMockup'
import { useSnapScroller } from '@/hooks/useSnapScroller'

export interface CarouselScreen extends DeviceScreen {
  /** Name of the screen, shown under the device and used as its accessible name */
  label: string
  aspect?: number
}

interface DeviceCarouselProps {
  kind: DeviceKind
  screens: CarouselScreen[]
  /** Accessible name of the whole strip */
  ariaLabel: string
  prevLabel: string
  nextLabel: string
  /** Opens a screen in the page lightbox */
  onZoom: (key: string) => void
}

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
const pad2 = (n: number) => String(n).padStart(2, '0')

/**
 * Screens at reading size on the shared grey stage. A phone is 260px wide (wider than a thumbnail,
 * narrower than the column), so three or four are visible and the rest is one swipe away. A strip
 * with few screens sits centered. Drag, arrows and keys go through `useSnapScroller`, the same
 * spring as every carousel of the site; touch and trackpad scrolling stay native.
 */
export default function DeviceCarousel({ kind, screens, ariaLabel, prevLabel, nextLabel, onZoom }: DeviceCarouselProps) {
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

  const total = screens.length
  const atStart = index === 0
  const atEnd = index >= total - 1
  const width = kind === 'phone' ? 'w-[min(66vw,260px)]' : 'w-[min(82vw,640px)]'

  return (
    <div className="relative bg-[#E8E8E8] rounded-xl overflow-hidden ring-1 ring-black/[0.04]">
      <div
        ref={trackRef}
        {...bind}
        onScroll={(e) => updateIndex(e.currentTarget.scrollLeft)}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        className="snap-scroller snap-rubber no-scrollbar flex gap-8 md:gap-12 overflow-x-auto snap-x snap-mandatory px-8 md:px-14 pt-10 md:pt-14 pb-5 scroll-pl-8 md:scroll-pl-14 cursor-grab"
      >
        {screens.map((screen, i) => (
          <figure
            key={screen.video ?? screen.src}
            className={`shrink-0 snap-start ${width} ${i === 0 ? 'ml-auto' : ''} ${i === total - 1 ? 'mr-auto' : ''} m-0`}
          >
            <DeviceMockup
              kind={kind}
              screen={screen}
              label={screen.label}
              aspect={screen.aspect}
              onZoom={() => onZoom(screen.video ?? screen.src)}
              focused={i === index}
              className={screen.video && i !== index ? 'opacity-60 transition-opacity duration-300 ease-out' : 'transition-opacity duration-300 ease-out'}
            />
            <figcaption className="mt-4 text-center text-xs text-gray-500">{screen.label}</figcaption>
          </figure>
        ))}
      </div>

      {total > 1 && (
        <div className="flex items-center gap-3 px-8 md:px-14 pb-6 md:pb-8">
          <p className="min-w-[4.5rem] text-xs text-gray-500 tabular-nums" aria-live="off">
            {pad2(index + 1)} / {pad2(total)}
          </p>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              aria-label={prevLabel}
              aria-disabled={atStart}
              onClick={() => !atStart && scrollToIndex(index - 1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 transition-[background-color,transform,opacity] duration-150 [@media(hover:hover)]:hover:bg-gray-100 active:scale-[0.96] aria-disabled:opacity-40 aria-disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              <ArrowLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={nextLabel}
              aria-disabled={atEnd}
              onClick={() => !atEnd && scrollToIndex(index + 1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 transition-[background-color,transform,opacity] duration-150 [@media(hover:hover)]:hover:bg-gray-100 active:scale-[0.96] aria-disabled:opacity-40 aria-disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
