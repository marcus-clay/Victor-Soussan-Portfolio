'use client'

import { useState } from 'react'
import { LinkedinLogoIcon } from '@phosphor-icons/react'
import Avatar from '@/components/Avatar'
import type { Testimonial } from '@/data/testimonialsData'
import Collapsible from './Collapsible'
import DisclosureButton from './DisclosureButton'
import { getExcerpt } from './excerpt'

interface QuoteCardLabels {
  readMore: string
  readLess: string
  linkedinProfile: string
}

/**
 * One quote. Same anatomy for every card: excerpt, optional disclosure, a hairline, then the
 * author. Cards only expand, they are not links, so they do not scale on hover.
 */
export default function QuoteCard({
  item,
  labels,
}: {
  item: Testimonial
  labels: QuoteCardLabels
}) {
  const [open, setOpen] = useState(false)
  const { excerpt, rest } = getExcerpt(item.content, { maxChars: 220, maxSentences: 2 })
  const restId = `quote-${item.id}-rest`

  return (
    <article
      className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 transition-colors duration-200
        [@media(hover:hover)]:hover:border-gray-200 md:p-6"
    >
      <blockquote>
        <p className="text-base text-gray-600">{excerpt}</p>
        {rest && (
          <Collapsible id={restId} open={open}>
            <p className="pt-3 text-base text-gray-600">{rest}</p>
          </Collapsible>
        )}
      </blockquote>

      {rest && (
        <div className="mt-2">
          <DisclosureButton
            open={open}
            controls={restId}
            onToggle={() => setOpen((v) => !v)}
            labelClosed={labels.readMore}
            labelOpen={labels.readLess}
          />
        </div>
      )}

      <footer className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-5">
        <Avatar
          filename={item.image}
          alt=""
          className="h-11 w-11 flex-shrink-0 rounded-full bg-gray-100"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">{item.author}</p>
          <p className="text-xs text-gray-500">{item.role}</p>
        </div>
        {item.linkedin && (
          <a
            href={item.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labels.linkedinProfile.replace('{name}', item.author)}
            className="-mr-2 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-gray-500
              transition-[background-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]
              [@media(hover:hover)]:hover:bg-gray-100 [@media(hover:hover)]:hover:text-gray-900 active:scale-[0.97]"
          >
            <LinkedinLogoIcon size={20} weight="fill" aria-hidden="true" />
          </a>
        )}
      </footer>
    </article>
  )
}
