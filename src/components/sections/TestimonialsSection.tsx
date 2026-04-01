'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LinkedinLogo, CaretDown } from '@phosphor-icons/react'

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
const LONG_THRESHOLD = 220

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  content,
  lang,
  testimonials,
  openModalWithUrl,
  Avatar,
}) => {
  const top3 = testimonials.slice(0, 3)
  const [expandedId, setExpandedId] = useState<string | null>(null)

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
                className="py-8 first:pt-0"
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
                  <div
                    id={contentId}
                    style={{
                      maxHeight: isExpanded ? '1200px' : COLLAPSED_MAX_HEIGHT,
                      overflow: 'hidden',
                      transition: isExpanded
                        ? 'max-height 600ms cubic-bezier(0.23, 1, 0.32, 1)'
                        : 'max-height 350ms cubic-bezier(0.23, 1, 0.32, 1)',
                    }}
                  >
                    <p className="text-base text-gray-700 leading-relaxed">{t.content}</p>
                  </div>

                  {/* Fade mask — signals more content below */}
                  {isLong && !isExpanded && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
                      style={{ background: 'linear-gradient(to top, #FDFDFC 0%, transparent 100%)' }}
                    />
                  )}
                </div>

                {/* Expand / collapse toggle */}
                {isLong && (
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : t.id)}
                    aria-expanded={isExpanded}
                    aria-controls={contentId}
                    className="mt-3 flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700
                      transition-colors duration-150
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-1 rounded"
                  >
                    <span>
                      {isExpanded
                        ? (lang === 'fr' ? 'Réduire' : 'Read less')
                        : (lang === 'fr' ? 'Lire la suite' : 'Read more')}
                    </span>
                    <CaretDown
                      size={12}
                      weight="bold"
                      className="transition-transform duration-300 ease-out"
                      style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                )}

                {/* Attribution row — full row is a link when linkedin exists */}
                <div className="mt-4">
                  {t.linkedin ? (
                    <a
                      href={t.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.author} — ${t.role} on LinkedIn`}
                      className="group flex items-center gap-3 -mx-3 px-3 py-2 rounded-lg
                        hover:bg-black/[.04] active:bg-black/[.06]
                        transition-colors duration-150
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-1"
                    >
                      <Avatar
                        filename={t.image}
                        alt={t.author}
                        className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0"
                      />
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="text-sm font-medium text-gray-900 flex-shrink-0">{t.author}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" aria-hidden="true" />
                        <span className="text-sm text-gray-500 truncate">{t.role}</span>
                      </div>
                      <LinkedinLogo
                        size={18}
                        weight="fill"
                        className="flex-shrink-0 text-gray-400 group-hover:text-[#0A66C2] transition-colors duration-200"
                      />
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 py-2">
                      <Avatar
                        filename={t.image}
                        alt={t.author}
                        className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0"
                      />
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm font-medium text-gray-900 flex-shrink-0">{t.author}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" aria-hidden="true" />
                        <span className="text-sm text-gray-500 truncate">{t.role}</span>
                      </div>
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
