'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useReveal } from '@/lib/motion'
import { useSnapScroller } from '@/hooks/useSnapScroller'
import { imgDims } from '@/utils/imageDimensions'
import { zoomable } from '@/utils/zoomable'

export interface WatchScreen {
  src: string
  /** Two to four words: the name of the screen, shown under it and used as its accessible name */
  label: string
}

interface WatchScreenGroupProps {
  /** Two or three screens that belong together */
  screens: WatchScreen[]
  /** Names the group for assistive technology */
  groupLabel: string
  onZoom: (src: string) => void
}

/**
 * Two or three watch screens on one flat grey plate (#E8E8E8, the stage grey of the hero panels).
 * From md the screens sit side by side, never wider than 400px: the exports are 374px wide, so a
 * wider cell would only enlarge pixels. On phones the same row becomes a horizontal snap strip
 * (`useSnapScroller`, as every carousel of the site) with the next screen peeking, so each screen
 * keeps a readable size instead of shrinking to a third of the width.
 * Tall screens (lists that scroll) keep their natural height and align on the top edge.
 */
export default function WatchScreenGroup({ screens, groupLabel, onZoom }: WatchScreenGroupProps) {
  const reveal = useReveal()
  const trackRef = useRef<HTMLDivElement>(null)
  const { bind } = useSnapScroller(trackRef, { rubberBand: false })
  const cols =
    screens.length === 2
      ? 'md:grid-cols-[repeat(2,minmax(0,400px))]'
      : 'md:grid-cols-[repeat(3,minmax(0,400px))]'

  return (
    <motion.div {...reveal()} className="overflow-hidden rounded-2xl bg-[#E8E8E8] py-5 md:px-10 md:py-10">
      <div
        ref={trackRef}
        {...bind}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={groupLabel}
        className={`snap-scroller snap-rubber no-scrollbar flex snap-x snap-mandatory items-start gap-3 overflow-x-auto scroll-pl-4 px-4 md:grid md:justify-center md:gap-8 md:overflow-visible md:px-0 ${cols}`}
      >
        {screens.map((screen) => (
          <figure key={screen.src} className="w-[76%] shrink-0 snap-start sm:w-[46%] md:w-auto">
            <div
              {...zoomable(() => onZoom(screen.src))}
              aria-label={screen.label}
              className={`group cursor-zoom-in overflow-hidden rounded-2xl ring-1 ring-black/[0.04] shadow-sm transition-[box-shadow,transform] duration-300 ease-media active:duration-150 active:ease-out [@media(hover:hover)]:hover:shadow-lg [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99]`}
            >
              <img
                loading="lazy"
                src={screen.src}
                {...imgDims(screen.src)}
                alt=""
                draggable={false}
                className={`block h-auto w-full transition-transform duration-300 ease-media [@media(hover:hover)]:group-hover:scale-[1.02]`}
              />
            </div>
            <figcaption className="mt-3 text-xs text-gray-500">{screen.label}</figcaption>
          </figure>
        ))}
      </div>
    </motion.div>
  )
}
