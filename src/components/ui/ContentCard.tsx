import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

export interface ContentCardProps {
  /** Small grey line above the title (category, step, mode) */
  label?: string
  /** Card title. Without a title, `body` becomes the main line of the card */
  title?: string
  /** Heading level of the title; pick the one that follows the group heading */
  headingLevel?: 'h2' | 'h3' | 'h4'
  /** Short text under the title */
  body?: string
  /** Anything that comes after the body: a list, paragraphs, links. Never another card */
  children?: ReactNode
  /** Makes the whole card one link (the hit area is the card itself, always above 44px) */
  href?: string
  /** Visible text of the link row at the bottom of a linked card */
  linkLabel?: string
  className?: string
}

const BASE =
  'flex-1 min-w-0 rounded-2xl border border-gray-100 bg-white p-5 md:p-6 text-left'

/**
 * One container, one level: a card never holds another card. Anatomy, top to bottom, tight
 * inside (proximity): optional label, title, body, free content. Cards of one group sit in a
 * `CardGrid`, which gives them equal heights.
 */
export default function ContentCard({
  label,
  title,
  headingLevel = 'h3',
  body,
  children,
  href,
  linkLabel,
  className = '',
}: ContentCardProps) {
  const Heading = headingLevel
  const content = (
    <>
      {label && <p className="mb-1.5 text-xs text-gray-500">{label}</p>}
      {title && <Heading className="text-title-3 text-gray-900">{title}</Heading>}
      {body && (
        <p className={title ? 'mt-2 text-sm text-gray-600' : 'text-base text-gray-900'}>{body}</p>
      )}
      {children && <div className={title || body ? 'mt-3' : label ? 'mt-0' : ''}>{children}</div>}
      {href && linkLabel && (
        <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-gray-900">
          {linkLabel}
          <ArrowRight
            size={12}
            weight="bold"
            aria-hidden="true"
            className="transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:translate-x-0.5"
          />
        </span>
      )}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={`group block ${BASE} transition-[border-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:hover:border-gray-200 active:scale-[0.98] ${className}`}
      >
        {content}
      </Link>
    )
  }

  return <div className={`${BASE} ${className}`}>{content}</div>
}
