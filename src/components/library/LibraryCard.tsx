import React from 'react'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/ssr'

/**
 * The card of the libraries of the site (the skills of the catalogue, the skills of the Claude page, the resources): one
 * template, so that a measure changes everywhere at once. A white card with a hairline, a corner radius that is the picture's
 * plus its margin (12 + 20 = 32, so the two corners are concentric), the picture inset on a soft grey panel, then the words
 * on the picture's own edge: what it is, its name, one line about it. The whole card is the hover scope: the picture reacts
 * (the skill pictures drift a little, the resource pictures play their story) and the arrow moves the way it points.
 */
const CARD =
  'group flex h-full flex-col overflow-hidden rounded-[28px] border border-gray-100 bg-white outline-offset-4 md:rounded-[32px] ' +
  'transition-[transform,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.985] ' +
  '[@media(hover:hover)]:hover:border-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-900'

export default function LibraryCard({
  href,
  picture,
  eyebrow,
  title,
  summary,
  mono = false,
}: {
  href: string
  /** The picture, already inset: give it `m-4 md:m-5` (see LIBRARY_PICTURE) */
  picture: React.ReactNode
  eyebrow: string
  title: string
  summary: string
  /** Skills are named in monospace, resources in the page's sans */
  mono?: boolean
}) {
  return (
    <Link href={href} draggable={false} data-hover-scope className={CARD}>
      {picture}
      <div className="flex flex-1 flex-col px-4 pb-5 pt-3 md:px-5 md:pb-6 md:pt-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs text-gray-500">{eyebrow}</p>
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="shrink-0 text-gray-900 transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:translate-x-0.5"
          />
        </div>
        <h3
          className={`mt-2 font-semibold leading-snug text-gray-900 transition-colors duration-150 [@media(hover:hover)]:group-hover:text-gray-500 ${
            mono ? 'font-mono text-[17px] tracking-[-0.01em]' : 'text-[19px] tracking-[-0.02em]'
          }`}
        >
          {title}
        </h3>
        <p className="mt-2 max-w-[44ch] text-sm text-gray-600">{summary}</p>
      </div>
    </Link>
  )
}

/** The margin of the picture inside the card */
export const LIBRARY_PICTURE = 'm-4 md:m-5'
