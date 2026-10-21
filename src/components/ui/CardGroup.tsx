import type { ReactNode } from 'react'

export interface CardGroupProps {
  /** Short heading of the group */
  title: string
  /** h2 for a section of the page, h3 for a group inside a section */
  headingLevel?: 'h2' | 'h3'
  /** One short paragraph under the heading */
  lead?: string
  /** Anchor id (the sticky table of contents scrolls to it) */
  id?: string
  /** Usually a `CardGrid` */
  children: ReactNode
  className?: string
}

/**
 * A heading, an optional lead, then the cards. Tight between heading and cards (they belong
 * together), generous between one group and the next: the caller spaces groups apart.
 */
export default function CardGroup({
  title,
  headingLevel = 'h2',
  lead,
  id,
  children,
  className = '',
}: CardGroupProps) {
  const Heading = headingLevel
  return (
    <div id={id} className={`${id ? 'scroll-mt-28' : ''} ${className}`}>
      <Heading className={headingLevel === 'h2' ? 'text-title-2 text-gray-900' : 'text-title-3 text-gray-900'}>
        {title}
      </Heading>
      {lead && <p className="mt-3 max-w-[65ch] text-base text-gray-600">{lead}</p>}
      <div className="mt-6 md:mt-8">{children}</div>
    </div>
  )
}
