'use client'

import type { ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Height transition by animating the grid row from 0fr to 1fr: the content keeps its natural
 * height, no measuring, no JS timer. The text stays in the DOM (crawlable, printable) and is
 * hidden from assistive technology while collapsed.
 */
export default function Collapsible({
  id,
  open,
  children,
}: {
  id: string
  open: boolean
  children: ReactNode
}) {
  const prefersReduced = useReducedMotion()
  return (
    <div
      id={id}
      aria-hidden={!open}
      className="grid transition-[grid-template-rows,opacity] ease-[cubic-bezier(0.23,1,0.32,1)]"
      style={{
        gridTemplateRows: open ? '1fr' : '0fr',
        opacity: open ? 1 : 0,
        transitionDuration: prefersReduced ? '0ms' : '220ms',
      }}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  )
}
