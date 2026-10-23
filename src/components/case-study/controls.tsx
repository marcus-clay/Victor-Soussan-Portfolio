'use client'

// Controls and helpers shared by the interactive figures of the case studies
// (notifications, journeys): a segmented control, the play / pause button, the motion preference.

import React, { useEffect, useState } from 'react'
import { Pause, Play } from '@phosphor-icons/react'

export const PILL =
  'inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'

/**
 * The motion preference, read after mount: the server renders the same markup as the first client render,
 * then a reader who asked for reduced motion gets the calmer version.
 */
export function useReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduce(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduce
}

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
  compact = false,
}: {
  label: string
  value: T
  options: { id: T; label: string }[]
  onChange: (next: T) => void
  compact?: boolean
}) {
  return (
    <div role="group" aria-label={label} className={`inline-flex rounded-full bg-white/70 ring-1 ring-black/[0.06] ${compact ? 'p-0.5' : 'p-1'}`}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={value === o.id}
          onClick={() => onChange(o.id)}
          className={
            compact
              ? `relative inline-flex h-8 items-center rounded-full px-3 text-xs font-medium transition-[background-color,color] duration-150 ease-out before:absolute before:-inset-1 before:content-[''] ${value === o.id ? 'bg-gray-900 text-white' : 'text-gray-700'}`
              : `${PILL} ${value === o.id ? 'bg-gray-900 text-white' : 'text-gray-700 [@media(hover:hover)]:hover:bg-white'}`
          }
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function PlayPauseButton({ playing, onToggle, playLabel, pauseLabel }: { playing: boolean; onToggle: () => void; playLabel: string; pauseLabel: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? pauseLabel : playLabel}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-gray-900 ring-1 ring-black/[0.06] transition-[background-color,transform] duration-150 ease-out active:scale-[0.95] [@media(hover:hover)]:hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
    >
      {playing ? <Pause size={16} weight="fill" /> : <Play size={16} weight="fill" />}
    </button>
  )
}
