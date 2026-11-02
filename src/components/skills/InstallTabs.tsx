'use client'

import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import './install-tabs.css'

/**
 * One way to install at a time: a short row of tabs (the tool), and under it the panel of the chosen tool. The chosen
 * tab is a dark pill that slides to the next one (250 ms, smooth ease-out) while the labels change colour; the panel
 * then rises in 4px with a fade. The pill is placed without a transition on the first paint and on resize. Arrow keys
 * move between tabs. Under reduced motion the pill jumps and the panel only fades.
 */
export interface InstallTab {
  id: string
  label: string
  panel: React.ReactNode
}

const TAB =
  'relative z-10 min-h-11 cursor-pointer whitespace-nowrap rounded-full px-4 text-[13px] font-medium transition-[color,transform] duration-150 ease-out active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'

export default function InstallTabs({ tabs, label }: { tabs: InstallTab[]; label: string }) {
  const [current, setCurrent] = useState(tabs[0].id)
  const [touched, setTouched] = useState(false)
  const base = useId()
  const list = useRef<HTMLDivElement>(null)
  const pill = useRef<HTMLSpanElement>(null)
  const index = Math.max(0, tabs.findIndex((t) => t.id === current))

  // Put the pill under the chosen tab; no transition until it has been placed once
  const place = (animate: boolean) => {
    const el = list.current?.querySelectorAll<HTMLElement>('[role="tab"]')[index]
    const p = pill.current
    if (!el || !p) return
    if (!animate) p.style.transition = 'none'
    p.style.width = `${el.offsetWidth}px`
    p.style.transform = `translateX(${el.offsetLeft}px)`
    if (!animate) {
      void p.offsetWidth
      p.style.transition = ''
    }
  }
  const placeNow = useRef(place)
  placeNow.current = place
  useLayoutEffect(() => place(touched), [index]) // eslint-disable-line react-hooks/exhaustive-deps
  // Re-place without a transition when the page is resized or the fonts arrive (the tabs change width)
  useEffect(() => {
    const onResize = () => placeNow.current(false)
    window.addEventListener('resize', onResize)
    document.fonts?.ready.then(onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const choose = (id: string) => {
    setTouched(true)
    setCurrent(id)
  }
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = tabs[(index + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]
    choose(next.id)
    document.getElementById(`${base}-tab-${next.id}`)?.focus()
  }

  if (tabs.length === 1) return <div>{tabs[0].panel}</div>

  return (
    <div>
      <div ref={list} role="tablist" aria-label={label} onKeyDown={onKeyDown} className="relative flex gap-2">
        <span ref={pill} aria-hidden="true" className="it-pill" />
        {tabs.map((t) => {
          const on = t.id === current
          return (
            <button
              key={t.id}
              id={`${base}-tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`${base}-panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => choose(t.id)}
              className={`${TAB} ${on ? 'text-white' : 'bg-black/[0.05] text-gray-900 [@media(hover:hover)]:hover:bg-black/[0.08]'}`}
            >
              {t.label}
            </button>
          )
        })}
      </div>
      {tabs.map((t) => (
        <div
          key={t.id}
          id={`${base}-panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${t.id}`}
          hidden={t.id !== current}
          className={`mt-4 ${touched ? 'it-panel' : ''}`}
        >
          {t.panel}
        </div>
      ))}
    </div>
  )
}
