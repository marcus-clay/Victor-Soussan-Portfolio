'use client'

import { motion } from 'framer-motion'
import { getTestimonials } from '@/data/testimonialsData'

export default function TestimonialsPageClient({ lang }: { lang: 'en' | 'fr' }) {
  const testimonials = getTestimonials(lang)

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-20">
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gray-900 leading-[1.08]"
          >
            {lang === 'fr' ? 'Témoignages' : 'Testimonials'}
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="mt-4 text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl"
          >
            {lang === 'fr'
              ? 'Ce que disent les personnes avec lesquelles j\'ai travaillé.'
              : 'What the people I have worked with say.'}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: (index % 3) * 0.06, ease: [0.23, 1, 0.32, 1] }}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-[box-shadow,border-color] duration-200 ease-out hover:border-gray-200 flex flex-col"
            >
              <blockquote className="text-base text-gray-700 leading-relaxed mb-5 flex-1">
                &ldquo;{t.content}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50 mt-auto">
                <img
                  src={`/images/${t.image}`}
                  alt={t.author}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0 bg-gray-100"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900 truncate">{t.author}</span>
                    {t.linkedin && (
                      <a
                        href={t.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0A66C2] hover:text-[#004182] transition-colors duration-200 flex-shrink-0"
                        aria-label={`${t.author} LinkedIn`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{t.role}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{t.date}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
