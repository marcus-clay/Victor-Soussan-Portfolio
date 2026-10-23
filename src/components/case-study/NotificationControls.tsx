'use client'

// The two controls of the notifications figure: a segmented control for the platform, and a row of quiet text
// tabs for the cases. Both are the same kind of object as the system ones: a thumb or an underline that slides
// to the selected item (a critically damped spring, so it can be redirected mid-move), keys that move the
// selection, and no fill on the items that are not selected.

import React, { useEffect, useId, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/components/case-study/controls'

const SLIDE = { type: 'spring', duration: 0.4, bounce: 0 } as const

/** Moves the selection with the arrow keys, Home and End, and focuses the new item. */
function useArrowKeys(count: number, current: number, select: (next: number) => void, itemSelector: string) {
  return (event: React.KeyboardEvent<HTMLElement>) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    let next = -1
    if (event.key in keys) next = (current + keys[event.key] + count) % count
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = count - 1
    if (next === -1) return
    event.preventDefault()
    select(next)
    const items = event.currentTarget.querySelectorAll<HTMLElement>(itemSelector)
    items[next]?.focus()
  }
}

export function PlatformSegmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { id: T; label: string }[]
  onChange: (next: T) => void
}) {
  const reduce = useReducedMotion()
  const uid = useId()
  const current = options.findIndex((o) => o.id === value)
  const onKeyDown = useArrowKeys(options.length, current, (i) => onChange(options[i].id), '[role=radio]')
  return (
    <div role="radiogroup" aria-label={label} onKeyDown={onKeyDown} className="relative inline-flex rounded-full bg-black/[0.07] p-[3px]">
      {options.map((o) => {
        const active = o.id === value
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(o.id)}
            className={`relative inline-flex h-10 min-w-24 items-center justify-center rounded-full px-5 text-sm font-medium transition-[color,transform] duration-150 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ${
              active ? 'text-gray-900' : 'text-gray-500 [@media(hover:hover)]:hover:text-gray-800'
            }`}
          >
            {active && (
              <motion.span
                layoutId={`${uid}-thumb`}
                transition={reduce ? { duration: 0 } : SLIDE}
                className="absolute inset-0 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(0,0,0,0.04)]"
                aria-hidden="true"
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export interface TabItem {
  id: string
  label: string
  /** A new group starts after a thin divider */
  group: string
}

export function StateTabs({ label, items, value, onChange }: { label: string; items: TabItem[]; value: number; onChange: (next: number) => void }) {
  const reduce = useReducedMotion()
  const uid = useId()
  const listRef = useRef<HTMLDivElement>(null)
  const onKeyDown = useArrowKeys(items.length, value, onChange, '[role=tab]')

  // On a narrow screen the row scrolls: the selected tab is brought to the middle, without moving the page.
  useEffect(() => {
    const list = listRef.current
    const tab = list?.querySelectorAll<HTMLElement>('[role=tab]')[value]
    if (!list || !tab) return
    const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2
    list.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' })
  }, [value, reduce])

  return (
    <div className="border-b border-black/10">
      <div ref={listRef} role="tablist" aria-label={label} onKeyDown={onKeyDown} className="no-scrollbar mx-auto flex w-fit max-w-full overflow-x-auto">
        {items.map((item, i) => {
          const active = i === value
          const startsGroup = i > 0 && items[i - 1].group !== item.group
          return (
            <React.Fragment key={item.id}>
              {startsGroup && <span aria-hidden="true" className="mx-2 my-auto h-4 w-px shrink-0 bg-black/15" />}
              <button
                type="button"
                role="tab"
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                onClick={() => onChange(i)}
                className={`relative h-11 shrink-0 whitespace-nowrap px-3 text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gray-900 ${
                  active ? 'text-gray-900' : 'text-gray-500 [@media(hover:hover)]:hover:text-gray-800'
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId={`${uid}-underline`}
                    transition={reduce ? { duration: 0 } : SLIDE}
                    className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-gray-900"
                    aria-hidden="true"
                  />
                )}
              </button>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
