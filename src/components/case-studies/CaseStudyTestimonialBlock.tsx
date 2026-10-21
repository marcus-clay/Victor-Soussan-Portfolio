'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
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
// text-base (16px) × leading-relaxed (1.625) × 4 lines = 104px = 6.5rem
const COLLAPSED_LINES = 4
const COLLAPSED_MAX_HEIGHT = '6.5rem'

export default function CaseStudyTestimonialBlock({
  quote,
  author,
  role,
  image,
  linkedin,
  lang,
}: CaseStudyTestimonialBlockProps) {
  const [expanded, setExpanded] = useState(false)
  // Whether the quote really runs past the collapsed height at the current width.
  // A character count cannot know this: at 390px a 160 character quote already needs more
  // than four lines, while a longer quote on desktop may fit.
  const [overflows, setOverflows] = useState(false)
  const quoteRef = useRef<HTMLParagraphElement>(null)
  const prefersReduced = useReducedMotion()
  const contentId = useId()

  useEffect(() => {
    const el = quoteRef.current
    if (!el) return
    const measure = () => {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 26
      setOverflows(el.scrollHeight > lineHeight * COLLAPSED_LINES + 1)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [quote])

  const collapsed = overflows && !expanded
  const quoted = lang === 'fr' ? `« ${quote} »` : `“${quote}”`
  const linkedinLabel = lang === 'fr'
    ? `${author}, ${role} (profil LinkedIn)`
    : `${author}, ${role} (LinkedIn profile)`

  return (
    <div className="mt-10 rise-in">
      <div className="relative">
        <motion.div
          id={contentId}
          initial={false}
          animate={{ height: collapsed ? COLLAPSED_MAX_HEIGHT : 'auto' }}
          transition={{ duration: prefersReduced ? 0 : 0.18, ease: EASE_OUT }}
          className="overflow-hidden"
        >
          <p ref={quoteRef} className="text-base text-gray-600 leading-relaxed">
            {quoted}
          </p>
        </motion.div>

        {collapsed && (
          <div
            className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #FDFDFC 0%, transparent 100%)' }}
            aria-hidden="true"
          />
        )}
      </div>

      {overflows && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-controls={contentId}
          className="mt-1 inline-flex items-center gap-1 min-h-11 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150 rounded"
        >
          {expanded
            ? (lang === 'fr' ? 'Réduire' : 'Read less')
            : (lang === 'fr' ? 'Lire la suite' : 'Read more')}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.2, ease: EASE_OUT }}
            className="inline-flex"
            aria-hidden="true"
          >
            <CaretDown size={12} weight="bold" />
          </motion.span>
        </button>
      )}

      {/* Attribution row */}
      <div className="mt-2">
        {linkedin ? (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={linkedinLabel}
            className="flex items-center gap-3 min-h-11 rounded transition-transform duration-150 active:scale-[0.98]"
          >
            <Avatar
              filename={image}
              alt=""
              className="w-7 h-7 rounded-full bg-gray-100 flex-shrink-0"
            />
            <span className="flex flex-col sm:flex-row sm:items-center sm:gap-2 min-w-0 flex-1">
              <span className="text-sm font-medium text-gray-900 flex-shrink-0">{author}</span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" aria-hidden="true" />
              <span className="text-sm text-gray-500 sm:truncate">{role}</span>
            </span>
            <span className="flex items-center gap-1 flex-shrink-0 pl-2" aria-hidden="true">
              <LinkedinLogo size={14} weight="fill" className="text-[#0A66C2] flex-shrink-0" />
              <span className="hidden sm:inline text-sm font-medium text-[#0A66C2] whitespace-nowrap">
                {lang === 'fr' ? 'Voir le profil' : 'View profile'}
              </span>
            </span>
          </a>
        ) : (
          <div className="flex items-center gap-3 min-h-11">
            <Avatar
              filename={image}
              alt=""
              className="w-7 h-7 rounded-full bg-gray-100 flex-shrink-0"
            />
            <span className="flex flex-col sm:flex-row sm:items-center sm:gap-2 min-w-0">
              <span className="text-sm font-medium text-gray-900">{author}</span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" aria-hidden="true" />
              <span className="text-sm text-gray-500">{role}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
