'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, LinkedinLogoIcon } from '@phosphor-icons/react'
import Avatar from '@/components/Avatar'
import type { Testimonial } from '@/data/testimonialsData'
import Collapsible from './Collapsible'
import DisclosureButton from './DisclosureButton'
import { getLeadSentences } from './excerpt'

interface FeaturedLabels {
  readFull: string
  readLess: string
  linkedinProfile: string
  caseStudyLink?: string
}

/**
 * The strongest testimonial at display scale. The first three sentences carry the point and
 * stay visible; the remainder opens in place.
 */
export default function FeaturedQuote({
  item,
  labels,
  caseStudyHref,
}: {
  item: Testimonial
  labels: FeaturedLabels
  caseStudyHref?: string
}) {
  const [open, setOpen] = useState(false)
  const { excerpt, rest } = getLeadSentences(item.content, 3)
  const restId = `quote-${item.id}-rest`

  return (
    <figure className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-6">
      <Avatar
        filename={item.image}
        alt={item.author}
        className="h-20 w-20 rounded-full bg-gray-100 lg:col-span-4 lg:row-span-2 lg:h-auto lg:w-full lg:max-w-[420px] lg:self-start lg:rounded-2xl lg:aspect-square"
      />

      <div className="lg:col-span-8">
        <blockquote>
          <p className="text-subhead font-medium text-gray-900">{excerpt}</p>
          {rest && (
            <Collapsible id={restId} open={open}>
              <p className="max-w-[62ch] pt-5 text-base text-gray-600">{rest}</p>
            </Collapsible>
          )}
        </blockquote>
        {rest && (
          <div className="mt-4">
            <DisclosureButton
              open={open}
              controls={restId}
              onToggle={() => setOpen((v) => !v)}
              labelClosed={labels.readFull}
              labelOpen={labels.readLess}
            />
          </div>
        )}
      </div>

      <figcaption className="flex flex-wrap items-center gap-x-6 gap-y-2 self-end lg:col-span-8">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900">{item.author}</p>
          <p className="text-xs text-gray-500">{item.role}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-2">
          {caseStudyHref && labels.caseStudyLink && (
            <Link
              href={caseStudyHref}
              className="-ml-3 inline-flex min-h-11 items-center gap-1 rounded-lg px-3 text-sm font-medium text-gray-900
                transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]
                [@media(hover:hover)]:hover:bg-gray-100 active:scale-[0.97]"
            >
              {labels.caseStudyLink}
              <ArrowUpRight size={14} aria-hidden="true" className="text-gray-500" />
            </Link>
          )}
          {item.linkedin && (
            <a
              href={item.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={labels.linkedinProfile.replace('{name}', item.author)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-gray-500
                transition-[background-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]
                [@media(hover:hover)]:hover:bg-gray-100 [@media(hover:hover)]:hover:text-gray-900 active:scale-[0.97]"
            >
              <LinkedinLogoIcon size={20} weight="fill" aria-hidden="true" />
            </a>
          )}
        </div>
      </figcaption>
    </figure>
  )
}
