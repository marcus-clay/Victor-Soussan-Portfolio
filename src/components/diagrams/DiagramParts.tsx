'use client'

// The parts every drawn diagram of the site shares (Approach page, template pages, About): the pale panel the
// drawing sits on, the arrowhead, the milestone diamond, and the ink and grey tones.

import React from 'react'

export const INK = '#111827'
export const LINE = '#D1D5DB'
export const PALE = '#E5E7EB'
export const GRID = '#ECECE9'

/**
 * The pale panel every diagram sits on; scrolls sideways on narrow screens. While part of the drawing is
 * hidden to the right, that edge fades out, so a reader on a phone sees there is more to slide to.
 */
export function Panel({ children, minWidth = 720 }: { children: React.ReactNode; minWidth?: number }) {
  const scroller = React.useRef<HTMLDivElement>(null)
  const [more, setMore] = React.useState(false)
  React.useEffect(() => {
    const el = scroller.current
    if (!el) return
    const check = () => setMore(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
    check()
    el.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      el.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])
  const fade = more ? 'linear-gradient(to right, #000 calc(100% - 56px), transparent)' : undefined
  return (
    <div className="overflow-hidden rounded-2xl bg-[#F7F7F5] ring-1 ring-inset ring-black/[0.04]">
      <div ref={scroller} className="no-scrollbar overflow-x-auto" style={{ maskImage: fade, WebkitMaskImage: fade }}>
        <div className="px-5 py-6 md:px-10 md:py-10" style={{ minWidth }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// Motion goes on a wrapper: a CSS transform on the shape itself would replace its SVG transform
export function Arrowhead({ x, y, angle, tone = INK, style }: { x: number; y: number; angle: number; tone?: string; style?: React.CSSProperties }) {
  return (
    <g style={style}>
      <path d="M-7 -4.5 L0 0 L-7 4.5" transform={`translate(${x} ${y}) rotate(${angle})`} fill="none" stroke={tone} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  )
}

/** A milestone: a small square turned on its point */
export function Diamond({ x, y, size = 12, filled = true, tone = INK, style }: { x: number; y: number; size?: number; filled?: boolean; tone?: string; style?: React.CSSProperties }) {
  return (
    <g style={style}>
      <rect x={x - size / 2} y={y - size / 2} width={size} height={size} rx="2" fill={filled ? tone : '#FFFFFF'} stroke={tone} strokeWidth={filled ? 0 : 1.5} transform={`rotate(45 ${x} ${y})`} />
    </g>
  )
}
