'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
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

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]
// text-base (16px) × leading-relaxed (1.625) × 4 lines = ~6rem
const COLLAPSED_MAX_HEIGHT = '6rem'
// 220 chars ≈ ~3 sentences — below this the expand adds no value
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
  const prefersReduced = useReducedMotion()
  const contentId = `cs-testimonial-${author.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className="mt-10 group/card"
    >
      <div className="border-l-2 border-gray-200 pl-5">

        {/* Opening quote mark */}
        <div
          className="text-3xl text-gray-200 leading-none mb-3 select-none"
          aria-hidden="true"
          style={{ fontFamily: 'Georgia, serif', lineHeight: 1 }}
        >
          &ldquo;
        </div>

        {/* Quote area — full area is clickable when long */}
        <button
          type="button"
          onClick={() => isLong ? setExpanded((prev) => !prev) : undefined}
          aria-expanded={isLong ? expanded : undefined}
          aria-controls={isLong ? contentId : undefined}
          className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 rounded-lg"
          style={{ cursor: isLong ? 'pointer' : 'default' }}
        >
          {/* Quote content — clipped when collapsed */}
          <div className="relative">
            <motion.div
              id={contentId}
              initial={{ height: COLLAPSED_MAX_HEIGHT }}
              animate={{ height: expanded ? 'auto' : COLLAPSED_MAX_HEIGHT }}
              transition={{ duration: prefersReduced ? 0 : 0.18, ease: EASE_OUT }}
              className="overflow-hidden"
            >
              <p className="text-base text-gray-600 leading-relaxed group-hover/card:text-gray-900 transition-colors duration-150">
                {quote}
              </p>
            </motion.div>

            {/* Fade mask — disappears on hover to avoid background mismatch */}
            {isLong && !expanded && (
              <div
                className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none group-hover/card:opacity-0 transition-opacity duration-150"
                style={{ background: 'linear-gradient(to top, #FDFDFC 0%, transparent 100%)' }}
              />
            )}
          </div>

          {/* Caret indicator — always visible on mobile, hover-only on desktop */}
          {isLong && (
            <div className="mt-2.5 flex items-center gap-1 text-sm text-gray-400 opacity-100 md:opacity-0 md:group-hover/card:opacity-100 transition-opacity duration-150">
              <span>
                {expanded
                  ? (lang === 'fr' ? 'Réduire' : 'Read less')
                  : (lang === 'fr' ? 'Lire la suite' : 'Read more')}
              </span>
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: prefersReduced ? 0 : 0.2, ease: EASE_OUT }}
                className="inline-flex"
              >
                <CaretDown size={12} weight="bold" />
              </motion.span>
            </div>
          )}
        </button>

        {/* Attribution row */}
        <div className="mt-4">
          {linkedin ? (
            <motion.a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${author} — ${role} on LinkedIn`}
              className="flex items-center py-1.5 rounded cursor-pointer
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-1"
              initial="rest"
              whileHover="hover"
              animate="rest"
              whileTap={{ scale: 0.98 }}
              transition={{ scale: { duration: 0.1, ease: EASE_OUT } }}
            >
              {/* Avatar — width + opacity slide in on hover */}
              <motion.div
                variants={{
                  rest: { width: 0, opacity: 0 },
                  hover: { width: 40, opacity: 1 },
                }}
                transition={{ duration: prefersReduced ? 0 : 0.2, ease: EASE_OUT }}
                className="overflow-hidden flex-shrink-0"
              >
                <Avatar
                  filename={image}
                  alt={author}
                  className="w-7 h-7 rounded-full bg-gray-100 mr-3 flex-shrink-0"
                />
              </motion.div>

              {/* Name + role */}
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-sm font-medium text-gray-900 flex-shrink-0">{author}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm text-gray-500 truncate">{role}</span>
              </div>

              {/* View profile — opacity reveal on hover, always visible on touch */}
              <motion.div
                variants={{
                  rest: { opacity: 0 },
                  hover: { opacity: 1 },
                }}
                transition={{ duration: prefersReduced ? 0 : 0.15, ease: EASE_OUT }}
                className="flex items-center gap-1 flex-shrink-0 pl-2 [@media(hover:none)]:!opacity-100"
              >
                <LinkedinLogo size={14} weight="fill" className="text-[#0A66C2] flex-shrink-0" />
                <span className="text-sm font-medium text-[#0A66C2] whitespace-nowrap">
                  {lang === 'fr' ? 'Voir le profil' : 'View profile'}
                </span>
              </motion.div>
            </motion.a>
          ) : (
            <div className="flex items-center gap-2 py-1.5">
              <Avatar
                filename={image}
                alt={author}
                className="w-7 h-7 rounded-full bg-gray-100 flex-shrink-0"
              />
              <span className="text-sm font-medium text-gray-900 flex-shrink-0">{author}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" aria-hidden="true" />
              <span className="text-sm text-gray-500 truncate">{role}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
