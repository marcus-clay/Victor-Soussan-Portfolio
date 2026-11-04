'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { EASE_OUT_EXPO as EASE_OUT, useReveal } from '@/lib/motion'
import { CATEGORY_LABELS, getArticles, type ContentItem } from '@/data/contentData'

/** Rows shown before "Show all": one screen of choices at a time (Hick), the rest stays in the DOM. */
const INITIAL_VISIBLE = 10

/** Articles shown first, whatever their date (newest pin first) */
const PINNED_IDS = ['experimentation-chatgpt-2022']

/**
 * The blog: every article, newest first, as rows on the site's list grammar (the guides and the
 * templates live on the Resources page).
 */
export default function BlogPageClient({ lang }: { lang: 'en' | 'fr' }) {
  const [showAll, setShowAll] = useState(false)
  const reveal = useReveal()
  const isEn = lang === 'en'
  const all = getArticles()
  const articles = [...PINNED_IDS.map((id) => all.find((a) => a.id === id)).filter(Boolean) as ContentItem[], ...all.filter((a) => !PINNED_IDS.includes(a.id))]

  const renderRow = (item: ContentItem) => {
    const title = isEn ? item.title_en : item.title_fr
    const date = new Date(item.date + '-01').toLocaleDateString(isEn ? 'en-US' : 'fr-FR', { month: 'long', year: 'numeric' })
    return (
      <Link key={item.id} href={`/${lang}/signal/${item.id}`}>
        <motion.div
          initial="rest"
          whileHover="hover"
          animate="rest"
          className="py-5 -mx-3 px-3 rounded-lg [@media(hover:hover)]:hover:bg-gray-100 active:bg-gray-100 transition-colors duration-150 cursor-pointer"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-x-2 text-xs text-gray-500">
                {item.category && <span>{CATEGORY_LABELS[item.category][lang]}</span>}
                {item.category && <span className="text-gray-300" aria-hidden="true">·</span>}
                <time dateTime={item.date}>{date}</time>
              </p>
              <h3 className="text-title-3 text-gray-900 mt-1 mb-1 line-clamp-2">{title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2 max-w-[70ch]">{isEn ? item.excerpt_en : item.excerpt_fr}</p>
            </div>
            <motion.span
              variants={{ rest: { x: 0, color: '#9CA3AF' }, hover: { x: 3, color: '#111827' } }}
              transition={{ duration: 0.15, ease: EASE_OUT }}
              className="flex-shrink-0 mt-5"
            >
              <ArrowRight size={16} />
            </motion.span>
          </div>
        </motion.div>
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      {/* Header: page name and one line, full width, left aligned */}
      <header className="wrap pt-10 md:pt-16 pb-12 md:pb-16">
        <h1 className="build-line text-display text-gray-900">Blog</h1>
        <p className="build-rise mt-6 md:mt-8 text-lead-lg text-gray-600 max-w-[54ch]" style={{ ['--d' as string]: '120ms' }}>
          {isEn
            ? 'Notes from practice on product design, design teams and working with AI.'
            : 'Retours d’expérience sur le design produit, les équipes design et le travail avec l’IA.'}
        </p>
      </header>

      <motion.section {...reveal()} className="wrap pb-16 md:pb-24" aria-label="Blog">
        <div className="divide-y divide-gray-100">
          {articles.map((item, i) => (
            <div key={item.id} className={!showAll && i >= INITIAL_VISIBLE ? 'hidden' : undefined}>
              {renderRow(item)}
            </div>
          ))}
        </div>

        {!showAll && articles.length > INITIAL_VISIBLE && (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="mt-6 inline-flex min-h-11 cursor-pointer items-center rounded-full border border-gray-200 px-5 text-sm font-medium text-gray-900 transition-[color,border-color,transform] duration-150 ease-out [@media(hover:hover)]:hover:border-gray-300 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97]"
          >
            {isEn ? `Show all ${articles.length}` : `Voir les ${articles.length}`}
          </button>
        )}
      </motion.section>
    </div>
  )
}
