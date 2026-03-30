'use client'

import { motion } from 'framer-motion'
import { LinkedinLogo, ArrowRight, Compass, Briefcase, Star, Quotes as Quote } from '@phosphor-icons/react'
import { getTestimonials } from '@/data/testimonialsData'
import { TRANSLATIONS } from '@/data/translations'
import Link from 'next/link'

const easeOut = [0.23, 1, 0.32, 1] as const

export default function TestimonialsPageClient({ lang }: { lang: 'en' | 'fr' }) {
  const testimonials = getTestimonials(lang)
  const t = TRANSLATIONS[lang].testimonials

  const crosslinks = [
    {
      title: t.crosslink_approach_title,
      desc: t.crosslink_approach_desc,
      href: `/${lang}/approche`,
      icon: Compass,
    },
    {
      title: t.crosslink_projects_title,
      desc: t.crosslink_projects_desc,
      href: `/${lang}/projets`,
      icon: Briefcase,
    },
    {
      title: t.crosslink_expertise_title,
      desc: t.crosslink_expertise_desc,
      href: `/${lang}/services`,
      icon: Star,
    },
  ]

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-20">
        {/* Page header */}
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gray-900 leading-[1.08]"
          >
            {t.title}
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="mt-4 text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl"
          >
            {t.subtitle}
          </motion.p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: (index % 3) * 0.06, ease: easeOut }}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm flex flex-col hover:border-gray-200"
              style={{ transition: 'border-color 200ms ease-out, box-shadow 300ms ease-out' }}
            >
              {/* Author */}
              <div className="flex items-center mb-5">
                <img
                  src={`/images/people/${item.image}`}
                  alt={item.author}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0 bg-gray-100 mr-3.5 border-2 border-white shadow-sm"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-gray-900 leading-tight truncate">{item.author}</span>
                    {item.linkedin && (
                      <a
                        href={item.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 text-gray-400 hover:text-[#0077b5] active:scale-[0.9]"
                        style={{ transition: 'color 150ms ease-out, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
                        aria-label={`${item.author} LinkedIn`}
                      >
                        <LinkedinLogo size={15} />
                      </a>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 mt-0.5 block">{item.role}</span>
                </div>
              </div>

              {/* Quote */}
              <div className="relative flex-1 mb-4">
                <Quote size={20} className="absolute -top-2 -left-1 transform -scale-x-100 text-gray-100" />
                <p className="leading-relaxed text-[14.5px] relative z-10 pt-1 text-gray-600">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 pt-3.5 mt-auto flex justify-between items-center">
                <span className="text-[11px] font-medium text-gray-400">{item.date}</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded text-gray-400 bg-gray-50">{item.category}</span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* LinkedIn CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mt-16 rounded-2xl border border-gray-100 bg-white p-8 md:p-10"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-[#0A66C2]/[0.08] flex items-center justify-center">
                <LinkedinLogo size={32} weight="fill" className="text-[#0A66C2]" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-bold tracking-[-0.02em] text-gray-900 mb-2">
                {t.linkedin_cta_title}
              </h2>
              <p className="text-base text-gray-500 leading-relaxed max-w-xl">
                {t.linkedin_cta_desc}
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/victorsoussan/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-[#0A66C2] text-white hover:bg-[#004182] shadow-sm hover:shadow-md flex-shrink-0 active:scale-[0.97]"
              style={{ transition: 'background-color 200ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 200ms ease' }}
            >
              {t.linkedin_cta_button}
              <ArrowRight size={16} weight="bold" />
            </a>
          </div>
        </motion.div>

        {/* Cross-link cards */}
        <div className="mt-16">
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-gray-900 mb-6">
            {t.crosslink_title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {crosslinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: easeOut }}
              >
                <Link
                  href={link.href}
                  className="group block rounded-2xl border border-gray-100 bg-white p-6 hover:border-gray-200 hover:shadow-md transition-[border-color,box-shadow,transform] duration-200 ease-out hover:scale-[1.01]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-100 transition-colors duration-200">
                      <link.icon size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900">{link.title}</span>
                        <ArrowRight size={14} weight="bold" className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-[color,transform] duration-200" />
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{link.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
