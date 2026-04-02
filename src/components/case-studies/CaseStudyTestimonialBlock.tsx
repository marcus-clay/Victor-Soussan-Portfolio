'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LinkedinLogo, CaretDown } from '@phosphor-icons/react'
import Avatar from '@/components/Avatar'

interface CaseStudyTestimonialBlockProps {
  quote: string
  author: string
  role: string
  image: string
  linkedin?: string
  lang: 'en' | 'fr'
}

const EASE_OUT = [0.23, 1, 0.32, 1] as const
// ~4 lines of text at text-base / leading-relaxed
const COLLAPSED_MAX_HEIGHT = '6rem'
const LONG_THRESHOLD = 220

export default function CaseStudyTestimonialBlock({
  quote,
  author,
  role,
  image,
  linkedin,
  lang,
}: CaseStudyTestimonialBlockProps) {
  const isLong = quote.length > LONG_THRESHOLD
  const [expanded, setExpanded] = useState(false)
  const contentId = `cs-testimonial-${author.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className="mt-10"
    >
      {/*
        Pull-quote container: left border as structural signal (not a colored accent —
        neutral gray fits the editorial column), subtle warm tint, no shadow.
        The border-l gives it hierarchy without boxing it.
      */}
      <div className="border-l-2 border-gray-200 pl-5">

        {/* Quote body — clipped when collapsed */}
        <div className="relative">
          <div
            id={contentId}
            style={{
              maxHeight: isLong && !expanded ? COLLAPSED_MAX_HEIGHT : '1200px',
              overflow: 'hidden',
              transition: expanded
                ? 'max-height 600ms cubic-bezier(0.23, 1, 0.32, 1)'
                : 'max-height 350ms cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            <p className="text-base text-gray-600 leading-relaxed">{quote}</p>
          </div>

          {/* Fade mask — hints at truncated content */}
          {isLong && !expanded && (
            <div
              className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, #FDFDFC 0%, transparent 100%)',
              }}
            />
          )}
        </div>

        {/* Expand / collapse */}
        {isLong && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            aria-controls={contentId}
            className="mt-2.5 flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700
              transition-colors duration-150 rounded
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-1"
          >
            <span>
              {expanded
                ? lang === 'fr' ? 'Réduire' : 'Read less'
                : lang === 'fr' ? 'Lire la suite' : 'Read more'}
            </span>
            <CaretDown
              size={12}
              weight="bold"
              className="transition-transform duration-300 ease-out"
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>
        )}

        {/* Attribution row */}
        <div className="mt-4">
          {linkedin ? (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${author} — ${role} on LinkedIn`}
              className="group inline-flex items-center gap-2.5 -mx-1.5 px-1.5 py-1.5 rounded-lg
                hover:bg-black/[.04] active:bg-black/[.06]
                transition-colors duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-1"
            >
              <Avatar
                filename={image}
                alt={author}
                className="w-7 h-7 rounded-full bg-gray-100 flex-shrink-0"
              />
              <span className="text-sm font-medium text-gray-900">{author}</span>
              <span className="w-0.5 h-0.5 rounded-full bg-gray-300 flex-shrink-0" aria-hidden="true" />
              <span className="text-sm text-gray-500">{role}</span>
              <LinkedinLogo
                size={14}
                weight="fill"
                className="flex-shrink-0 text-gray-400 group-hover:text-[#0A66C2] transition-colors duration-200 ml-0.5"
              />
            </a>
          ) : (
            <div className="inline-flex items-center gap-2.5 py-1.5">
              <Avatar
                filename={image}
                alt={author}
                className="w-7 h-7 rounded-full bg-gray-100 flex-shrink-0"
              />
              <span className="text-sm font-medium text-gray-900">{author}</span>
              <span className="w-0.5 h-0.5 rounded-full bg-gray-300 flex-shrink-0" aria-hidden="true" />
              <span className="text-sm text-gray-500">{role}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
