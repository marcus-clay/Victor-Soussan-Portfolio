'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react'
import {
  ALL_CONTENT,
  TYPE_LABELS,
} from '@/data/contentData'
import type { ContentItem, ContentType } from '@/data/contentData'

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

  const getHref = (item: ContentItem): string => {
    if (item.type === 'template' && item.link) return item.link
    if (item.type === 'guide') {
      if (item.id === 'guide-ship-to-show') return `/${lang}/guide/ship-to-show`
      return `/${lang}/guide/claude-code`
    }
    return `/${lang}/signal/${item.id}`
  }

  const isExternal = (item: ContentItem) => item.type === 'template'

  const renderRow = (item: ContentItem) => {
    const href = getHref(item)
    const external = isExternal(item)
    const typeLabel = TYPE_LABELS[item.type][lang]
    const title = isEn ? item.title_en : item.title_fr

    const row = (
      <div className="py-5 -mx-3 px-3 rounded-lg hover:bg-gray-100/60 active:bg-gray-100 transition-colors duration-150 cursor-pointer group">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <span className="text-xs text-gray-400">{typeLabel}</span>
            <h3 className="text-base font-medium text-gray-900 mb-1 line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-1">
              {isEn ? item.excerpt_en : item.excerpt_fr}
            </p>
          </div>
          <span className="flex-shrink-0 mt-5 text-gray-400 group-hover:text-gray-900 transition-colors duration-150">
            {external ? <ArrowUpRight size={16} /> : <ArrowRight size={16} />}
          </span>
        </div>
      </div>
    )

    if (external) {
      return (
        <a key={item.id} href={href} target="_blank" rel="noopener noreferrer">
          {row}
        </a>
      )
    }

    return (
      <Link key={item.id} href={href}>
        {row}
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      <div className="max-w-[740px] mx-auto px-6 pt-32 md:pt-40 pb-24 md:pb-40">
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
            className="text-base font-semibold tracking-[-0.01em] text-gray-900"
          >
            {isEn ? 'Resources' : 'Ressources'}
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="mt-3 text-base text-gray-500 leading-relaxed max-w-[55ch]"
          >
            {isEn
              ? 'Articles, guides, templates, and insights on product design and AI.'
              : 'Articles, guides, templates et retours d\'experience sur le design produit et l\'IA.'}
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ease-out cursor-pointer ${
                activeFilter === f.key
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {f.label}
              <span className={`ml-1.5 ${activeFilter === f.key ? 'text-white/60' : 'text-gray-400'}`}>
                {f.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Content list */}
        <div className="divide-y divide-gray-100">
          {filtered.map((item) => renderRow(item))}
        </div>

        {/* Agents & Prompts — minimal row */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mt-16 pt-10 border-t border-gray-100"
        >
          <a
            href="https://www.condamine.studio/agents-prompts"
            target="_blank"
            rel="noopener noreferrer"
            className="group block -mx-3 px-3 py-5 rounded-lg hover:bg-gray-100/60 active:bg-gray-100 transition-colors duration-150 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <span className="text-xs text-gray-400">Condamine Studio</span>
                <h3 className="text-base font-medium text-gray-900 mb-1">
                  {isEn ? 'AI Agents & Prompts' : 'Agents IA et prompts'}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed max-w-[50ch]">
                  {isEn
                    ? '32 curated agents and prompt frameworks for design, development, marketing, and productivity.'
                    : '32 agents et frameworks de prompts pour le design, le developpement, le marketing et la productivite.'}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-3 text-sm text-gray-500 group-hover:text-gray-900 transition-colors duration-150">
                  {isEn ? 'Explore the collection' : 'Explorer la collection'}
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          </a>
        </motion.section>
      </div>
    </div>
  )
}
