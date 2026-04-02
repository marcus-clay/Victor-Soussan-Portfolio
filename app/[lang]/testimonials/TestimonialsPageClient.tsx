'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, LinkedinLogoIcon } from '@phosphor-icons/react'
import { getTestimonials } from '@/data/testimonialsData'
import { TRANSLATIONS } from '@/data/translations'
import Link from 'next/link'
import Avatar from '@/components/Avatar'

const easeOut = [0.23, 1, 0.32, 1] as const

export default function TestimonialsPageClient({ lang }: { lang: 'en' | 'fr' }) {
  const testimonials = getTestimonials(lang)
  const t = TRANSLATIONS[lang].testimonials
  const prefersReduced = useReducedMotion()

  const crosslinks = [
    { title: t.crosslink_approach_title, href: `/${lang}/approche` },
    { title: t.crosslink_projects_title, href: `/${lang}/projets` },
    { title: t.crosslink_expertise_title, href: `/${lang}/services` },
  ]

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      <div className="max-w-[740px] mx-auto px-6 pt-32 md:pt-40 pb-24 md:pb-40">

        {/* Page header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="text-base font-semibold tracking-[-0.01em] text-gray-900"
          >
            {t.title}
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="mt-3 text-base text-gray-500 leading-relaxed max-w-[55ch]"
          >
            {t.subtitle}
          </motion.p>
        </motion.div>

        {/* Testimonials list */}
        <div className="divide-y divide-gray-100">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (index % 6) * 0.04, ease: easeOut }}
              className="py-8 first:pt-0"
            >
              {/* Opening quote mark */}
              <div
                className="text-4xl text-gray-200 leading-none mb-3 select-none"
                aria-hidden="true"
                style={{ fontFamily: 'Georgia, serif', lineHeight: 1 }}
              >
                &ldquo;
              </div>

              <p className="text-base text-gray-700 leading-relaxed">
                {item.content}
              </p>

              {/* Attribution row — full row is a link when linkedin exists */}
              <div className="mt-5">
                {item.linkedin ? (
                  <motion.a
                    href={item.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.author} — ${item.role} on LinkedIn`}
                    className="flex items-center py-2 rounded cursor-pointer
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-1"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    whileTap={{ scale: 0.98 }}
                    transition={{ scale: { duration: 0.1, ease: easeOut } }}
                  >
                    {/* Avatar — width + opacity together */}
                    <motion.div
                      variants={{
                        rest: { width: 0, opacity: 0 },
                        hover: { width: 48, opacity: 1 },
                      }}
                      transition={{ duration: prefersReduced ? 0 : 0.2, ease: easeOut }}
                      className="overflow-hidden flex-shrink-0"
                    >
                      <Avatar
                        filename={item.image}
                        alt={item.author}
                        className="w-9 h-9 rounded-full bg-gray-100 mr-3 flex-shrink-0"
                      />
                    </motion.div>

                    {/* Name + role */}
                    <div className="min-w-0 flex-1">
                      <span className="text-sm font-medium text-gray-900 block">{item.author}</span>
                      <span className="text-sm text-gray-500">{item.role}</span>
                    </div>

                    {/* View profile — opacity only, always visible on touch */}
                    <motion.div
                      variants={{
                        rest: { opacity: 0 },
                        hover: { opacity: 1 },
                      }}
                      transition={{ duration: prefersReduced ? 0 : 0.15, ease: easeOut }}
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
                    <span className="text-sm font-medium text-gray-900">{item.author}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-500">{item.role}</span>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* LinkedIn CTA */}
        <div className="mt-12">
          <a
            href="https://www.linkedin.com/in/victorsoussan/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-1 rounded"
          >
            {t.linkedin_cta_button}
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Cross-links */}
        <div className="mt-20">
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
            {t.crosslink_title}
          </h2>
          <div className="divide-y divide-gray-100">
            {crosslinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.3, delay: i * 0.04, ease: easeOut }}
              >
                <Link
                  href={link.href}
                  className="group flex items-center justify-between py-4 -mx-3 px-3 rounded-lg
                    hover:bg-black/[.04] active:bg-black/[.06] transition-colors duration-150
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-1"
                >
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-150">
                    {link.title}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-gray-400 group-hover:text-gray-600 transition-colors duration-150 flex-shrink-0"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
