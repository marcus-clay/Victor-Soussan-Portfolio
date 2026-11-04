'use client'

import React, { useEffect, useRef, useState } from 'react'
import { CaretDown, Check, MagnifyingGlass, X } from '@phosphor-icons/react'

/**
 * The controls shared by the libraries of the site (the skills catalogue, the resources): one search, one filter, one
 * count. Written once so that a state or a gesture changes in both places at once.
 *
 *  - LibraryBar: a translucent bar that stays under the header from md up; its lower edge fades out instead of ending on
 *    a line, so the cards slide beneath it without a hard seam.
 *  - SearchField: the search, the largest control, with "/" to jump to it and a clear button.
 *  - LibraryFilters: the filter as pills from md up (the main ones, then "More" for the others) and as one menu on a phone.
 *  - ResultsMeta and EmptyResults: the count, said to screen readers on every change, and what to show when nothing fits.
 */

const EASE = 'ease-[cubic-bezier(0.23,1,0.32,1)]'

/** Lowercase, without accents: what a search compares */
export const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

/** Sets or removes the given parameters of the address without adding a history entry (a null or empty value removes it) */
export function writeParams(params: Record<string, string | null | undefined>) {
  const url = new URL(window.location.href)
  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.set(key, value)
    else url.searchParams.delete(key)
  }
  window.history.replaceState(window.history.state, '', url)
}

export type FilterOption = { key: string; label: string; count: number }

// ---------------------------------------------------------------------------------------------------------------------

export function LibraryBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-40 pb-5 md:sticky md:top-[var(--nav-height,56px)]">
      {/* The material lives on its own layer, so that its lower edge can fade without clipping the menu */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(253,253,252,0.86) 70%, rgba(253,253,252,0))',
          backdropFilter: 'blur(16px) saturate(160%)',
          WebkitBackdropFilter: 'blur(16px) saturate(160%)',
          maskImage: 'linear-gradient(to bottom, #000 calc(100% - 20px), transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 calc(100% - 20px), transparent)',
        }}
      />
      <div className="wrap pt-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">{children}</div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------------------------------------------------

export function SearchField({
  value,
  onChange,
  placeholder,
  label,
  clearLabel,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  label: string
  clearLabel: string
}) {
  const ref = useRef<HTMLInputElement>(null)

  // "/" jumps to the search, as long as nothing is being typed elsewhere. No animation: a key is not a gesture.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
      const el = document.activeElement
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || (el as HTMLElement).isContentEditable)) return
      e.preventDefault()
      ref.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <form role="search" onSubmit={(e) => e.preventDefault()} className="relative md:max-w-[480px] md:flex-1">
      <MagnifyingGlass size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
      <input
        ref={ref}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className="peer min-h-11 w-full rounded-full bg-white pl-11 pr-12 text-[15px] text-gray-900 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.09)] outline-none transition-shadow duration-150 placeholder:text-gray-500 focus:shadow-[inset_0_0_0_1.5px_#111827,0_0_0_4px_rgba(17,24,39,0.06)] [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button
          type="button"
          onClick={() => {
            onChange('')
            ref.current?.focus()
          }}
          aria-label={clearLabel}
          className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 transition-colors duration-150 [@media(hover:hover)]:hover:bg-black/[0.05] [@media(hover:hover)]:hover:text-gray-900"
        >
          <X size={16} aria-hidden="true" />
        </button>
      ) : (
        <kbd
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 hidden h-6 min-w-6 -translate-y-1/2 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-1.5 font-mono text-xs text-gray-500 transition-opacity duration-150 peer-focus:opacity-0 md:inline-flex"
        >
          /
        </kbd>
      )}
    </form>
  )
}

// ---------------------------------------------------------------------------------------------------------------------

/**
 * A button that opens a short list when it is asked for. The list opens under the button, aligned on its right edge so
 * that it stays inside the page, and scales from that corner; a click outside or Escape closes it. It opens in 250 ms
 * (smooth ease-out) and closes in 150 ms: closing gets out of the way. Each row says how many items it holds.
 */
function FilterMenu({
  value,
  options,
  onChange,
  label,
  trigger,
  triggerClassName,
}: {
  value: string
  options: FilterOption[]
  onChange: (v: string) => void
  label: string
  trigger: React.ReactNode
  triggerClassName: string
}) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        button.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    // The chosen row takes the focus, so the arrow of a keyboard user starts where they are
    const frame = requestAnimationFrame(() => (root.current?.querySelector<HTMLElement>('[aria-checked="true"]') ?? root.current?.querySelector<HTMLElement>('[role="menuitemradio"]'))?.focus())
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
      cancelAnimationFrame(frame)
    }
  }, [open])

  const choose = (key: string) => {
    onChange(key)
    setOpen(false)
    button.current?.focus()
  }

  return (
    <div ref={root} className="relative">
      <button ref={button} type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} className={triggerClassName}>
        {trigger}
        <CaretDown size={14} aria-hidden="true" className={`shrink-0 transition-transform duration-200 ${EASE} motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} />
      </button>
      <div
        role="menu"
        aria-label={label}
        className={`absolute right-0 top-[calc(100%+8px)] z-50 w-[min(calc(100vw-2.5rem),280px)] origin-top-right rounded-2xl bg-white p-1.5 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)] transition-[opacity,transform,visibility] motion-reduce:transition-none ${
          open
            ? 'visible scale-100 opacity-100 duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
            : 'invisible scale-[0.97] opacity-0 duration-150 ease-out'
        }`}
      >
        {options.map((o) => {
          const on = value === o.key
          return (
            <button
              key={o.key}
              type="button"
              role="menuitemradio"
              aria-checked={on}
              onClick={() => choose(o.key)}
              className={`flex min-h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 text-left text-[13px] transition-colors duration-150 [@media(hover:hover)]:hover:bg-black/[0.04] ${on ? 'font-semibold text-gray-900' : 'text-gray-700'}`}
            >
              <span>{o.label}</span>
              <span className="flex items-center gap-2 tabular-nums text-gray-400">
                {o.count}
                {on ? <Check size={14} weight="bold" aria-hidden="true" className="text-gray-900" /> : <span className="w-3.5" aria-hidden="true" />}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const PILL =
  `flex min-h-11 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full px-4 text-[13px] font-medium transition-[background-color,color,transform] duration-150 ${EASE} active:scale-[0.97] disabled:cursor-default disabled:opacity-40 disabled:active:scale-100`
const PILL_OFF = 'bg-black/[0.05] text-gray-900 [@media(hover:hover)]:hover:bg-black/[0.08]'
const PILL_ON = 'bg-gray-900 text-white'

/**
 * The filter. From md up: "All", the main options as pills, then "More" with the others in a list (when the chosen one is
 * in that list, the "More" pill takes its name and the dark fill, so the choice stays visible). On a phone: one button
 * that opens the whole list. `mainKeys` lists the pills; leave it out to make every option a pill.
 */
export function LibraryFilters({
  value,
  options,
  onChange,
  label,
  more,
  mainKeys,
}: {
  value: string
  options: FilterOption[]
  onChange: (v: string) => void
  /** The name of the filter ("Theme", "Category"), for the group and the phone button */
  label: string
  more: string
  mainKeys?: string[]
}) {
  const pills = options.filter((o) => o.key === 'all' || !mainKeys || mainKeys.includes(o.key))
  const rest = options.filter((o) => o.key !== 'all' && mainKeys && !mainKeys.includes(o.key))
  const inRest = rest.find((o) => o.key === value)
  return (
    <div className="md:ml-auto">
      <div className="md:hidden">
        <FilterMenu
          value={value}
          options={options}
          onChange={onChange}
          label={label}
          trigger={
            <span className="truncate">
              <span className="text-gray-500">{label}</span> {options.find((o) => o.key === value)?.label}
            </span>
          }
          triggerClassName={`${PILL} w-full justify-between bg-black/[0.05] text-gray-900`}
        />
      </div>
      <div className="hidden md:block">
        <div role="group" aria-label={label} className="flex items-center gap-2">
          {pills.map((o) => (
            <button key={o.key} type="button" aria-pressed={value === o.key} disabled={o.count === 0 && value !== o.key} onClick={() => onChange(o.key)} className={`${PILL} ${value === o.key ? PILL_ON : PILL_OFF}`}>
              {o.label}
            </button>
          ))}
          {rest.length > 0 && (
            <FilterMenu value={value} options={rest} onChange={onChange} label={more} trigger={inRest?.label ?? more} triggerClassName={`${PILL} ${inRest ? PILL_ON : PILL_OFF}`} />
          )}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------------------------------------------------

/** The count: said to screen readers on every change, shown only once something is filtered, with the way back */
export function ResultsMeta({
  filtering,
  text,
  resetLabel,
  onReset,
  children,
}: {
  filtering: boolean
  text: string
  resetLabel: string
  onReset: () => void
  /** Extra chips beside the count (a tag being filtered, for example) */
  children?: React.ReactNode
}) {
  return (
    <div className="mb-8 flex min-h-6 flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
      <p aria-live="polite" className={`tabular-nums ${filtering ? '' : 'sr-only'}`}>
        {text}
      </p>
      {children}
      {filtering && (
        <button
          type="button"
          onClick={onReset}
          className="cursor-pointer text-gray-900 underline decoration-gray-900/25 underline-offset-4 transition-colors duration-150 [@media(hover:hover)]:hover:decoration-gray-900"
        >
          {resetLabel}
        </button>
      )}
    </div>
  )
}

export function EmptyResults({ message, resetLabel, onReset }: { message: string; resetLabel: string; onReset: () => void }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white px-6 py-12 text-center">
      <p className="text-base text-gray-900">{message}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 inline-flex min-h-11 items-center rounded-full border border-gray-200 px-5 text-sm font-medium text-gray-900 transition-[border-color,transform] duration-200 ease-out active:scale-[0.97] [@media(hover:hover)]:hover:border-gray-300"
      >
        {resetLabel}
      </button>
    </div>
  )
}
