'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useReveal } from '@/lib/motion'
import { ActRule } from '@/components/case-study/ActSection'
import { ArrowUpRight } from '@phosphor-icons/react'
import { RelatedCard, type RelatedItem } from '@/components/RelatedContent'
import {
  ALL_CONTENT,
  CATEGORY_LABELS,
  TYPE_LABELS,
} from '@/data/contentData'
import type { ContentItem, ContentType } from '@/data/contentData'

type FilterType = 'all' | ContentType

const FILTER_KEYS: FilterType[] = ['all', 'article', 'guide', 'template']

/** `?type=template` opens the list on one type; anything else falls back to the full list. */
const readFilterFromUrl = (): FilterType => {
  const type = new URLSearchParams(window.location.search).get('type')
  return FILTER_KEYS.includes(type as FilterType) ? (type as FilterType) : 'all'
}

/** Cards shown before the Show all button: three rows of three (Hick), the rest stays in the DOM. */
const INITIAL_VISIBLE = 9

/**
 * Order of the full list: guides, then templates (the only items with an illustration, the same
 * documents as the About cards), then articles. Inside each group the date order of ALL_CONTENT
 * is kept. A filtered list is already one group.
 */
const GROUP_ORDER: Record<ContentType, number> = { guide: 0, template: 1, article: 2 }

export default function RessourcesPageClient({ lang }: { lang: 'en' | 'fr' }) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [showAll, setShowAll] = useState(false)
  const isEn = lang === 'en'
  const reveal = useReveal()

  // The page is statically rendered, so a shared link is applied right after mount.
  useEffect(() => {
    setActiveFilter(readFilterFromUrl())
  }, [])

  const selectFilter = (key: FilterType) => {
    setActiveFilter(key)
    setShowAll(false)
    const url = new URL(window.location.href)
    if (key === 'all') url.searchParams.delete('type')
    else url.searchParams.set('type', key)
    window.history.replaceState(window.history.state, '', url)
  }

  const filtered = activeFilter === 'all'
    ? [...ALL_CONTENT].sort((a, b) => GROUP_ORDER[a.type] - GROUP_ORDER[b.type])
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

  /** Same card as the related content at the end of a page: cover (when there is one), label, title, text. */
  const toCard = (item: ContentItem): RelatedItem => {
    const meta =
      item.type === 'guide' && item.chapterCount
        ? `${item.chapterCount} ${isEn ? 'chapters' : 'chapitres'}`
        : item.category
          ? CATEGORY_LABELS[item.category][lang]
          : null
    const cover = item.art
      ? { src: `/images/resources/doc-${item.art}-light.svg`, tone: '#FAFAF8', fit: 'contain' as const }
      : item.heroImage
        ? { src: item.heroImage }
        : undefined
    return {
      href: getHref(item),
      title: isEn ? item.title_en : item.title_fr,
      label: [TYPE_LABELS[item.type][lang], meta].filter(Boolean).join(' · '),
      description: isEn ? item.excerpt_en : item.excerpt_fr,
      external: isExternal(item),
      cover,
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      {/* Header: page name and one line, full width, left aligned */}
      <header className="wrap pt-10 md:pt-16 pb-12 md:pb-16">
        <h1 className="text-display text-gray-900">
          {isEn ? 'Resources' : 'Ressources'}
        </h1>
        <p className="mt-6 md:mt-8 text-lead-lg text-gray-600 max-w-[54ch]">
          {isEn
            ? 'Articles, guides, templates, and insights on product design and AI.'
            : 'Articles, guides, templates et retours d\'expérience sur le design produit et l\'IA.'}
        </p>
      </header>

      {/* Filters and list: one group, same left edge as the header */}
      <section className="wrap pb-16 md:pb-24" aria-label={isEn ? 'Resources' : 'Ressources'}>
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => selectFilter(f.key)}
              className={`inline-flex items-center min-h-11 px-4 rounded-full text-sm font-medium transition-[background-color,color,transform] duration-200 ease-out active:scale-[0.97] cursor-pointer ${
                activeFilter === f.key
                  ? 'bg-gray-900 text-white [@media(hover:hover)]:hover:bg-black'
                  : 'text-gray-600 [@media(hover:hover)]:hover:text-gray-500'
              }`}
            >
              {f.label}
              <span className={`ml-1.5 ${activeFilter === f.key ? 'text-white/70' : 'text-gray-500'}`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* items-start: a card without a cover keeps its own height instead of stretching beside an illustrated one */}
        <ul className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <li key={item.id} className={`min-w-0${!showAll && i >= INITIAL_VISIBLE ? ' hidden' : ''}`}>
              <RelatedCard item={toCard(item)} />
            </li>
          ))}
        </ul>

        {!showAll && filtered.length > INITIAL_VISIBLE && (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="mt-6 inline-flex min-h-11 cursor-pointer items-center rounded-full border border-gray-200 px-5 text-sm font-medium text-gray-900 transition-[color,border-color,transform] duration-150 ease-out [@media(hover:hover)]:hover:border-gray-300 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97]"
          >
            {isEn
              ? `Show all ${filtered.length}`
              : `Voir les ${filtered.length}`}
          </button>
        )}
      </section>

      {/* Agents and prompts: one row, same grammar as the list above */}
      <ActRule />
      <motion.section
        {...reveal()}
        className="wrap pt-12 md:pt-16 pb-16 md:pb-24"
      >
        <a
          href="https://www.condamine.studio/agents-prompts"
          target="_blank"
          rel="noopener noreferrer"
          className="group block -mx-3 px-3 py-5 rounded-lg [@media(hover:hover)]:hover:bg-gray-100 active:bg-gray-100 transition-colors duration-150 cursor-pointer"
        >
          <span className="text-xs text-gray-500">Condamine Studio</span>
          <h3 className="text-title-3 text-gray-900 mb-1">
            {isEn ? 'AI Agents & Prompts' : 'Agents IA et prompts'}
          </h3>
          <p className="text-base text-gray-600 max-w-[62ch]">
            {isEn
              ? '32 curated agents and prompt frameworks for design, development, marketing, and productivity.'
              : '32 agents et frameworks de prompts pour le design, le développement, le marketing et la productivité.'}
          </p>
          <span className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-gray-900 transition-colors duration-150 [@media(hover:hover)]:group-hover:text-gray-500">
            {isEn ? 'Explore the collection' : 'Explorer la collection'}
            <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        </a>
      </motion.section>
    </div>
  )
}
