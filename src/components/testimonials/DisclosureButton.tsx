'use client'

import { CaretDown } from '@phosphor-icons/react'

/** Text button with a 44px target. Left edge aligned with the text above it (-ml-3 px-3). */
export default function DisclosureButton({
  open,
  controls,
  onToggle,
  labelClosed,
  labelOpen,
}: {
  open: boolean
  controls: string
  onToggle: () => void
  labelClosed: string
  labelOpen: string
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={controls}
      className="-ml-3 inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-gray-900
        transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]
        [@media(hover:hover)]:hover:bg-gray-100 active:scale-[0.97]"
    >
      {open ? labelOpen : labelClosed}
      <CaretDown
        size={14}
        weight="bold"
        aria-hidden="true"
        className={`text-gray-500 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${open ? 'rotate-180' : ''}`}
      />
    </button>
  )
}
