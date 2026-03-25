'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight, BookOpen, FileText, Notebook } from '@phosphor-icons/react'
import {
  ALL_CONTENT,
  TYPE_LABELS,
  TYPE_COLORS,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from '@/data/contentData'
import type { ContentItem, ContentType, SignalCategory } from '@/data/contentData'

type FilterType = 'all' | ContentType

export default function RessourcesPageClient({ lang }: { lang: 'en' | 'fr' }) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const isEn = lang === 'en'

  const filtered = activeFilter === 'all'
    ? ALL_CONTENT
    : ALL_CONTENT.filter((c) => c.type === activeFilter)

  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: isEn ? 'All' : 'Tout', count: ALL_CONTENT.length },
    { key: 'article', label: isEn ? 'Articles' : 'Articles', count: ALL_CONTENT.filter(c => c.type === 'article').length },
    { key: 'guide', label: isEn ? 'Guides' : 'Guides', count: ALL_CONTENT.filter(c => c.type === 'guide').length },
    { key: 'template', label: isEn ? 'Templates' : 'Templates', count: ALL_CONTENT.filter(c => c.type === 'template').length },
  ]

  const typeIcon = (type: ContentType) => {
    switch (type) {
      case 'guide': return <BookOpen size={16} weight="bold" />
      case 'template': return <Notebook size={16} weight="bold" />
      default: return <FileText size={16} weight="bold" />
    }
  }

  const getHref = (item: ContentItem): string => {
    if (item.type === 'template' && item.link) return item.link
    if (item.type === 'guide') {
      if (item.id === 'guide-ship-to-show') return `/${lang}/guide/ship-to-show`
      return `/${lang}/guide/claude-code`
    }
    return `/${lang}/signal/${item.id}`
  }

  const isExternal = (item: ContentItem) => item.type === 'template'

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-20">
        {/* Header */}
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
            {isEn ? 'Resources' : 'Ressources'}
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="mt-4 text-lg md:text-xl text-gray-500 leading-relaxed max-w-[55ch]"
          >
            {isEn
              ? 'Articles, guides, templates, and insights on product design and AI.'
              : 'Articles, guides, templates et retours d\'expérience sur le design produit et l\'IA.'}
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-[background-color,color,border-color,transform] duration-200 ease-out cursor-pointer active:scale-[0.97] ${
                activeFilter === f.key
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {f.label}
              <span className={`ml-1.5 ${activeFilter === f.key ? 'text-white/60' : 'text-gray-400'}`}>
                {f.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => {
            const typeColor = TYPE_COLORS[item.type]
            const categoryColor = item.category ? CATEGORY_COLORS[item.category] : null
            const categoryLabel = item.category ? CATEGORY_LABELS[item.category]?.[lang] : null
            const href = getHref(item)
            const external = isExternal(item)

            const card = (
              <div className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-gray-200 transition-[box-shadow,border-color] duration-200 ease-out h-full flex flex-col">
                {/* Type + category badges */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${typeColor.bg} ${typeColor.text}`}>
                    {typeIcon(item.type)}
                    {TYPE_LABELS[item.type][lang]}
                  </span>
                  {categoryLabel && categoryColor && (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColor.bg} ${categoryColor.text}`}>
                      {categoryLabel}
                    </span>
                  )}
                </div>

                {/* Guide: show chapter count */}
                {item.type === 'guide' && item.chapterCount && (
                  <span className="text-xs text-gray-400 mb-2">{item.chapterCount} {isEn ? 'chapters' : 'chapitres'}</span>
                )}

                {/* Title */}
                <h3 className="text-base font-bold tracking-[-0.01em] text-gray-900 mb-2 group-hover:text-[#2D5CF3] transition-colors duration-200 ease-out line-clamp-2">
                  {isEn ? item.title_en : item.title_fr}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4 flex-1">
                  {isEn ? item.excerpt_en : item.excerpt_fr}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                  <span className="text-xs text-gray-400">{item.date}</span>
                  <span className="text-sm font-medium text-[#2D5CF3] flex items-center gap-1">
                    {item.type === 'template'
                      ? (isEn ? 'Open' : 'Ouvrir')
                      : (isEn ? 'Read' : 'Lire')}
                    {external ? <ArrowUpRight size={14} /> : <ArrowRight size={14} />}
                  </span>
                </div>
              </div>
            )

            if (external) {
              return (
                <a key={item.id} href={href} target="_blank" rel="noopener noreferrer">
                  {card}
                </a>
              )
            }

            return (
              <Link key={item.id} href={href}>
                {card}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
