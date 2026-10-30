'use client'

/**
 * The controls every player of the site shares, drawn after the case study videos (`VideoPlayer`):
 * - stopped, a large white disc with a play icon in the middle of the media, so it reads as a player;
 * - playing, a small dark pause button in the bottom right corner of the grey container, dim at rest
 *   and clear on hover, 28px with a 44px hit area.
 *
 * A grey container that holds devices (a strip, a stage) opens a corner with `StageCorner`: the controls of
 * the media inside it are drawn there, at the corner of the container rather than at the corner of the
 * device screen. Without a corner the controls sit in the corner of the media itself.
 */

import React, { createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { Play } from '@phosphor-icons/react'

const CornerContext = createContext<HTMLElement | null>(null)
const SetCornerContext = createContext<(el: HTMLElement | null) => void>(() => {})

/** Opens the controls corner of a grey container; the container places a `CornerSlot` where the corner is. */
export function StageCorner({ children }: { children: React.ReactNode }) {
  const [slot, setSlot] = useState<HTMLElement | null>(null)
  return (
    <SetCornerContext.Provider value={setSlot}>
      <CornerContext.Provider value={slot}>{children}</CornerContext.Provider>
    </SetCornerContext.Provider>
  )
}

/** Where the controls of the media of a `StageCorner` are drawn. */
export function CornerSlot({ className = 'absolute bottom-3 right-3 z-20' }: { className?: string }) {
  const setSlot = useContext(SetCornerContext)
  return <div ref={setSlot} className={`flex items-center gap-2 empty:hidden ${className}`} />
}

/** The controls of a media, drawn in the corner of its grey container when it has one. */
export function CornerControls({ children, fallbackClassName = 'absolute bottom-3 right-3 z-20' }: { children: React.ReactNode; fallbackClassName?: string }) {
  const slot = useContext(CornerContext)
  if (slot) return createPortal(children, slot)
  return <div className={`flex items-center gap-2 ${fallbackClassName}`}>{children}</div>
}

/** The large play button in the middle of a stopped media. */
export function CenterPlay({ onClick, label, className = '' }: { onClick: (e: React.MouseEvent) => void; label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={(e) => e.stopPropagation()}
      aria-label={label}
      className={`absolute inset-0 z-10 m-auto flex items-center justify-center w-14 h-14 rounded-full
        before:absolute before:-inset-3 before:content-['']
        bg-white/90 text-gray-900 shadow-lg backdrop-blur-md cursor-pointer
        transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]
        active:scale-[0.96] [@media(hover:hover)]:hover:scale-105
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ${className}`}
    >
      <Play size={20} weight="fill" aria-hidden="true" className="ml-0.5" />
    </button>
  )
}

/** A small round control of the corner (pause, replay, open larger). */
export function CornerButton({ onClick, label, children, dim = false }: { onClick: (e: React.MouseEvent) => void; label: string; children: React.ReactNode; dim?: boolean }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onClick(e)
      }}
      onKeyDown={(e) => e.stopPropagation()}
      aria-label={label}
      className={`relative flex items-center justify-center w-7 h-7 rounded-full
        before:absolute before:-inset-2 before:content-['']
        bg-black/50 text-white
        transition-[opacity,transform] duration-200 ease-out active:scale-[0.96]
        ${dim ? 'opacity-35 [@media(hover:hover)]:hover:opacity-90 [@media(hover:hover)]:group-hover:opacity-90' : 'opacity-90'}
        focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900`}
    >
      {children}
    </button>
  )
}
