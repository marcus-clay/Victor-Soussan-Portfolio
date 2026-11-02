'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EASE_SMOOTH, useReveal } from '@/lib/motion'
import { ActRule } from '@/components/case-study/ActSection'
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react'
import { CATEGORY_LABELS, getResources, TYPE_LABELS, type ContentItem, type SignalCategory } from '@/data/contentData'
import { RESOURCE_TAGS } from '@/data/resourceTags'
import { ResourcePicture } from '@/components/resources/ResourceScene'

/**
 * Resources: one library of guides and templates (methods, processes, documents), as a grid of
 * illustrated cards on the anatomy of the About carousel. Two rows of pills narrow it: the
 * categories first, then the tags found in the chosen category. The articles live on the Blog.
 */

type CategoryFilter = 'all' | SignalCategory

const CARD =
  'group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white outline-offset-4 ' +
  'transition-[transform,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.985] ' +
  '[@media(hover:hover)]:hover:border-gray-200'

const PILL =
  'inline-flex items-center min-h-11 px-4 rounded-full text-sm font-medium transition-[background-color,color,transform] duration-200 ease-out active:scale-[0.97] cursor-pointer'
const PILL_ON = 'bg-gray-900 text-white [@media(hover:hover)]:hover:bg-black'
const PILL_OFF = 'text-gray-600 [@media(hover:hover)]:hover:text-gray-500'
/** The tag pills, one step quieter than the categories: a hairline, no fill until chosen */
const TAG =
  'inline-flex items-center min-h-9 px-3 rounded-full text-xs font-medium border transition-[background-color,color,border-color,transform] duration-200 ease-out active:scale-[0.97] cursor-pointer'
const TAG_ON = 'border-gray-900 bg-gray-900 text-white'
const TAG_OFF = 'border-gray-200 text-gray-600 [@media(hover:hover)]:hover:border-gray-300 [@media(hover:hover)]:hover:text-gray-900'

function hrefOf(item: ContentItem, lang: 'en' | 'fr'): string {
  if (item.type === 'template' && item.slug) return `/${lang}/ressources/${item.slug[lang]}`
  return item.id === 'guide-ship-to-show' ? `/${lang}/guide/ship-to-show` : `/${lang}/guide/claude-code`
}

/** `?cat=craft&tag=figma` opens the grid on a selection; anything unknown falls back to everything. */
function readSelectionFromUrl(categories: SignalCategory[], tags: string[]): { cat: CategoryFilter; tag: string | null } {
  const params = new URLSearchParams(window.location.search)
  const cat = params.get('cat')
  const tag = params.get('tag')
  return {
    cat: categories.includes(cat as SignalCategory) ? (cat as SignalCategory) : 'all',
    tag: tag && tags.includes(tag) ? tag : null,
  }
}

function Picture({ item, lang }: { item: ContentItem; lang: 'en' | 'fr' }) {
  return <ResourcePicture id={item.id} lang={lang} className="m-2" />
}

function ResourceCard({ item, lang }: { item: ContentItem; lang: 'en' | 'fr' }) {
  const isEn = lang === 'en'
  const kind = TYPE_LABELS[item.type][lang]
  const detail = item.type === 'guide' && item.chapterCount ? ` · ${item.chapterCount} ${isEn ? 'chapters' : 'chapitres'}` : ''
  return (
    <Link href={hrefOf(item, lang)} className={CARD} draggable={false}>
      <Picture item={item} lang={lang} />
      <div className="flex flex-1 flex-col p-5 pt-4 md:p-6 md:pt-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs text-gray-500">{kind}{detail}</p>
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="shrink-0 text-gray-900 transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:translate-x-0.5"
          />
        </div>
        <h3 className="mt-2 text-title-3 text-gray-900 transition-colors duration-150 [@media(hover:hover)]:group-hover:text-gray-500">
          {isEn ? item.title_en : item.title_fr}
        </h3>
        <p className="mt-3 text-sm text-gray-600">{isEn ? item.excerpt_en : item.excerpt_fr}</p>
        {item.tags && item.tags.length > 0 && (
          <p className="mt-4 flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-500">
            {item.tags.map((tag) => (
              <span key={tag}>{RESOURCE_TAGS[tag]?.[lang] ?? tag}</span>
            ))}
          </p>
        )}
      </div>
    </Link>
  )
}

export default function RessourcesPageClient({ lang }: { lang: 'en' | 'fr' }) {
  const isEn = lang === 'en'
  const reveal = useReveal()
  const reduceMotion = useReducedMotion()
  const all = useMemo(() => getResources(), [])

  // The categories and the tags that exist in the library, in the order they first appear
  const categories = useMemo(() => Array.from(new Set(all.map((c) => c.category).filter(Boolean))) as SignalCategory[], [all])
  const allTags = useMemo(() => Array.from(new Set(all.flatMap((c) => c.tags ?? []))), [all])

  const [cat, setCat] = useState<CategoryFilter>('all')
  const [tag, setTag] = useState<string | null>(null)

  // The page is statically rendered, so a shared link is applied right after mount.
  useEffect(() => {
    const sel = readSelectionFromUrl(categories, allTags)
    setCat(sel.cat)
    setTag(sel.tag)
  }, [categories, allTags])

  const writeUrl = (nextCat: CategoryFilter, nextTag: string | null) => {
    const url = new URL(window.location.href)
    if (nextCat === 'all') url.searchParams.delete('cat')
    else url.searchParams.set('cat', nextCat)
    if (nextTag) url.searchParams.set('tag', nextTag)
    else url.searchParams.delete('tag')
    window.history.replaceState(window.history.state, '', url)
  }

  const inCategory = cat === 'all' ? all : all.filter((c) => c.category === cat)
  // The tags offered are those of the chosen category, so a tag never empties the grid
  const tagsOffered = Array.from(new Set(inCategory.flatMap((c) => c.tags ?? [])))
  const shown = tag ? inCategory.filter((c) => c.tags?.includes(tag)) : inCategory

  const selectCat = (next: CategoryFilter) => {
    const nextTag = tag && (next === 'all' ? all : all.filter((c) => c.category === next)).some((c) => c.tags?.includes(tag)) ? tag : null
    setCat(next)
    setTag(nextTag)
    writeUrl(next, nextTag)
  }
  const selectTag = (next: string) => {
    const nextTag = next === tag ? null : next
    setTag(nextTag)
    writeUrl(cat, nextTag)
  }

  const catPills: { key: CategoryFilter; label: string; count: number }[] = [
    { key: 'all', label: isEn ? 'All' : 'Tout', count: all.length },
    ...categories.map((c) => ({ key: c, label: CATEGORY_LABELS[c][lang], count: all.filter((r) => r.category === c).length })),
  ]

  // A card arrives and leaves as a short fade with a slight scale: under reduced motion, the fade alone
  const cardMotion = {
    initial: { opacity: 0, scale: reduceMotion ? 1 : 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: reduceMotion ? 1 : 0.98 },
    transition: { duration: 0.2, ease: EASE_SMOOTH },
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
            ? 'Methods, processes and documents from my practice, for peers and for designers starting out.'
            : 'Méthodes, process et documents tirés de ma pratique, pour les pairs et pour les designers qui débutent.'}
        </p>
      </header>

      {/* Filters and grid: one group, same left edge as the header */}
      <section className="wrap pb-16 md:pb-24" aria-label={isEn ? 'Resources' : 'Ressources'}>
        <div className="flex flex-wrap gap-2" role="group" aria-label={isEn ? 'Category' : 'Catégorie'}>
          {catPills.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => selectCat(f.key)}
              aria-pressed={cat === f.key}
              className={`${PILL} ${cat === f.key ? PILL_ON : PILL_OFF}`}
            >
              {f.label}
              <span className={`ml-1.5 ${cat === f.key ? 'text-white/70' : 'text-gray-500'}`}>{f.count}</span>
            </button>
          ))}
        </div>
        <div className="mt-3 mb-8 flex flex-wrap gap-2" role="group" aria-label={isEn ? 'Tag' : 'Tag'}>
          {tagsOffered.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => selectTag(t)}
              aria-pressed={tag === t}
              className={`${TAG} ${tag === t ? TAG_ON : TAG_OFF}`}
            >
              {RESOURCE_TAGS[t]?.[lang] ?? t}
            </button>
          ))}
        </div>

        <motion.ul {...reveal()} className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((item) => (
              <motion.li key={item.id} layout={!reduceMotion} {...cardMotion} className="min-w-0 list-none">
                <ResourceCard item={item} lang={lang} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </section>

      {/* Agents and prompts: one row, same grammar as the lists of the site */}
      <ActRule />
      <motion.section {...reveal()} className="wrap pt-12 md:pt-16 pb-16 md:pb-24">
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
