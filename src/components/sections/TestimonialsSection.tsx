'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { LinkedinLogoIcon, CaretDownIcon } from '@phosphor-icons/react'

interface Testimonial {
  id: string
  author: string
  role: string
  date: string
  content: string
  image: string
  linkedin?: string
  category: 'All' | 'Management' | 'Design' | 'Product & Tech' | 'Clients'
}

interface TestimonialsSectionProps {
  systemTheme: 'light' | 'dark'
  lang: 'en' | 'fr'
  content: {
    testimonials: {
      title: string
      subtitle: string
      view_all: string
    }
  }
  testimonials: Testimonial[]
  Avatar: React.FC<{ filename: string; alt: string; className?: string; isDark?: boolean }>
  openModalWithUrl: (path: string) => void
}

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]
// text-base (16px) × leading-relaxed (1.625) × 4 lines = 104px ≈ 6.5rem
const COLLAPSED_MAX_HEIGHT = '6.5rem'
// 300 chars ≈ ~3–4 sentences — below this threshold the expand adds no value
const LONG_THRESHOLD = 300

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  content,
  lang,
  testimonials,
  Avatar,
}) => {
  const top3 = testimonials.slice(0, 3)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const prefersReduced = useReducedMotion()

  return (
    <section id="testimonials" className="py-24 md:py-40 px-6">
      <div className="max-w-[692px] mx-auto">
        <h2 className="text-base font-semibold tracking-[-0.01em] mb-10 md:mb-14 text-gray-900">
          {content.testimonials.title}
        </h2>

        <div className="flex flex-col divide-y divide-gray-100">
          {top3.map((t, i) => {
            const isExpanded = expandedId === t.id
            const isLong = t.content.length > LONG_THRESHOLD
            const contentId = `quote-${t.id}`

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.35, delay: i * 0.06, ease: EASE_OUT }}
                className="py-8 first:pt-0 group/card"
              >
                {/* Quote area — full area is clickable when long */}
                <button
                  type="button"
                  onClick={() => isLong ? setExpandedId(isExpanded ? null : t.id) : undefined}
                  aria-expanded={isLong ? isExpanded : undefined}
                  aria-controls={isLong ? contentId : undefined}
                  className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 rounded-lg"
                  style={{ cursor: isLong ? 'pointer' : 'default' }}
                >
                  {/* Opening quote mark */}
                  <div
                    className="text-3xl text-gray-200 leading-none mb-3 select-none"
                    aria-hidden="true"
                    style={{ fontFamily: 'Georgia, serif', lineHeight: 1 }}
                  >
                    &ldquo;
                  </div>

                  {/* Quote content — clipped when collapsed */}
                  <div className="relative">
                    <motion.div
                      id={contentId}
                      initial={{ height: COLLAPSED_MAX_HEIGHT }}
                      animate={{ height: isExpanded ? 'auto' : COLLAPSED_MAX_HEIGHT }}
                      transition={{ duration: prefersReduced ? 0 : 0.18, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <p className="text-base text-gray-700 leading-relaxed group-hover/card:text-gray-900 transition-colors duration-150">
                        {t.content}
                      </p>
                    </motion.div>

                    {/* Fade mask — fades out on hover to avoid background mismatch */}
                    {isLong && !isExpanded && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none group-hover/card:opacity-0 transition-opacity duration-150"
                        style={{ background: 'linear-gradient(to top, #FDFDFC 0%, transparent 100%)' }}
                      />
                    )}
                  </div>

                  {/* Caret indicator — always visible on mobile, hover-only on desktop */}
                  {isLong && (
                    <div className="mt-3 flex items-center gap-1 text-sm text-gray-400 opacity-100 md:opacity-0 md:group-hover/card:opacity-100 transition-opacity duration-150">
                      <span>
                        {isExpanded
                          ? (lang === 'fr' ? 'Réduire' : 'Read less')
                          : (lang === 'fr' ? 'Lire la suite' : 'Read more')}
                      </span>
                      <motion.span
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: prefersReduced ? 0 : 0.2, ease: EASE_OUT }}
                        className="inline-flex"
                      >
                        <CaretDownIcon size={12} weight="bold" />
                      </motion.span>
                    </div>
                  )}
                </button>

                {/* Attribution row */}
                <div className="mt-4">
                  {t.linkedin ? (
                    <motion.a
                      href={t.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.author} — ${t.role} on LinkedIn`}
                      className="flex items-center py-2 rounded cursor-pointer
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-1"
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                      whileTap={{ scale: 0.98 }}
                      transition={{ scale: { duration: 0.1, ease: EASE_OUT } }}
                    >
                      {/* Avatar — width + opacity together */}
                      <motion.div
                        variants={{
                          rest: { width: 0, opacity: 0 },
                          hover: { width: 44, opacity: 1 },
                        }}
                        transition={{ duration: prefersReduced ? 0 : 0.2, ease: EASE_OUT }}
                        className="overflow-hidden flex-shrink-0"
                      >
                        <Avatar
                          filename={t.image}
                          alt={t.author}
                          className="w-8 h-8 rounded-full bg-gray-100 mr-3 flex-shrink-0"
                        />
                      </motion.div>

                      {/* Name + role */}
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="text-sm font-medium text-gray-900 flex-shrink-0">{t.author}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" aria-hidden="true" />
                        <span className="text-sm text-gray-500 truncate">{t.role}</span>
                      </div>

                      {/* View profile — opacity only, always visible on touch */}
                      <motion.div
                        variants={{
                          rest: { opacity: 0 },
                          hover: { opacity: 1 },
                        }}
                        transition={{ duration: prefersReduced ? 0 : 0.15, ease: EASE_OUT }}
                        className="flex items-center gap-1 flex-shrink-0 pl-2 [@media(hover:none)]:!opacity-100"
                      >
                        <LinkedinLogoIcon size={14} weight="fill" className="text-[#0A66C2] flex-shrink-0" />
                        <span className="text-sm font-medium text-[#0A66C2] whitespace-nowrap">
                          {lang === 'fr' ? 'Voir le profil' : 'View profile'}
                        </span>
                      </motion.div>
                    </motion.a>
                  ) : (
                    <div className="flex items-center gap-2 py-2">
                      <span className="text-sm font-medium text-gray-900 flex-shrink-0">{t.author}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm text-gray-500 truncate">{t.role}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 md:mt-14">
          <Link
            href={`/${lang}/testimonials`}
            className="group text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-150 flex items-center gap-1.5
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-1 rounded"
          >
            {content.testimonials.view_all}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150"
              aria-hidden="true"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
