'use client'

import type { Category } from '@/data/testimonialsData'

export interface FilterOption {
  value: Category
  label: string
  count: number
}

/**
 * Segmented filter. Buttons with aria-pressed (one pressed at a time), 44px targets.
 * Selected = filled gray-900 pill, the others outlined.
 */
export default function CategoryFilter({
  options,
  value,
  onChange,
  label,
}: {
  options: FilterOption[]
  value: Category
  onChange: (value: Category) => void
  label: string
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium
              transition-[background-color,border-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]
              active:scale-[0.97] ${
                selected
                  ? 'border-gray-900 bg-gray-900 text-white [@media(hover:hover)]:hover:bg-black'
                  : 'border-gray-200 bg-transparent text-gray-900 [@media(hover:hover)]:hover:bg-gray-100'
              }`}
          >
            {option.label}
            <span className={`tabular-nums ${selected ? 'text-white/70' : 'text-gray-500'}`}>
              {option.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
