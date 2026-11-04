'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EASE_SMOOTH, useReveal } from '@/lib/motion'
import { ActRule } from '@/components/case-study/ActSection'
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react'
import { CATEGORY_LABELS, getResources, guidePath, TYPE_LABELS, type ContentItem, type SignalCategory } from '@/data/contentData'
import { RESOURCE_TAGS } from '@/data/resourceTags'
import { EmptyResults, LibraryBar, LibraryFilters, ResultsMeta, SearchField, normalize, writeParams, type FilterOption } from '@/components/library/LibraryControls'
import { ResourcePicture } from '@/components/resources/ResourceScene'
import LibraryCard, { LIBRARY_PICTURE } from '@/components/library/LibraryCard'
import ResourcesHeroStage from '@/components/resources/ResourcesHeroStage'

/**
 * Resources: one library of guides, templates and decks (methods, processes, documents), as large tiles on the grammar of
 * the Claude tile of the home. The search and the filter are the ones of the skills catalogue
 * (src/components/library/LibraryControls.tsx): a search first, then the theme, on a translucent bar that stays under the
 * header. A tag arriving from a link (`?tag=`) filters too and shows as a chip next to the count. The articles live on the Blog.
 */

type CategoryFilter = 'all' | SignalCategory

const COPY = {
  en: {
    search: 'Search a resource, a theme, a need',
    searchLabel: 'Search the resources',
    clear: 'Clear the search',
    all: 'All',
    theme: 'Theme',
    more: 'More',
    result: (n: number) => `${n} resource${n > 1 ? 's' : ''}`,
    none: 'No resource matches this search.',
    reset: 'Reset the filters',
    removeTag: 'Remove the tag',
  },
  fr: {
    search: 'Rechercher une ressource, un thème, un besoin',
    searchLabel: 'Rechercher parmi les ressources',
    clear: 'Effacer la recherche',
    all: 'Tout',
    theme: 'Thème',
    more: 'Plus',
    result: (n: number) => `${n} ressource${n > 1 ? 's' : ''}`,
    none: 'Aucune ressource ne correspond à cette recherche.',
    reset: 'Réinitialiser les filtres',
    removeTag: 'Retirer le tag',
  },
} as const

/** What the search looks into, in both languages: the title, the excerpt, the tags, the type and the theme */
function searchText(item: ContentItem): string {
  const tags = (item.tags ?? []).flatMap((t) => [t, RESOURCE_TAGS[t]?.en ?? '', RESOURCE_TAGS[t]?.fr ?? ''])
  return normalize(
    [item.title_en, item.title_fr, item.excerpt_en, item.excerpt_fr, TYPE_LABELS[item.type].en, TYPE_LABELS[item.type].fr, item.category ? CATEGORY_LABELS[item.category].en : '', item.category ? CATEGORY_LABELS[item.category].fr : '', ...tags].join(' '),
  )
}

function hrefOf(item: ContentItem, lang: 'en' | 'fr'): string {
  if ((item.type === 'template' || item.type === 'deck') && item.slug) return `/${lang}/ressources/${item.slug[lang]}`
  return `/${lang}/${guidePath(item.id)}`
}

/** `?q=figma&cat=craft&tag=figma` opens the library on a selection; anything unknown falls back to everything. */
function readSelectionFromUrl(categories: SignalCategory[], tags: string[]): { q: string; cat: CategoryFilter; tag: string | null } {
  const params = new URLSearchParams(window.location.search)
  const cat = params.get('cat')
  const tag = params.get('tag')
  return {
    q: params.get('q') ?? '',
    cat: categories.includes(cat as SignalCategory) ? (cat as SignalCategory) : 'all',
    tag: tag && tags.includes(tag) ? tag : null,
  }
}

function kindOf(item: ContentItem, lang: 'en' | 'fr') {
  const isEn = lang === 'en'
  const detail = item.type === 'guide' && item.chapterCount ? ` · ${item.chapterCount} ${isEn ? 'chapters' : 'chapitres'}` : ''
  return `${TYPE_LABELS[item.type][lang]}${detail}`
}

/** One resource, on the card shared with the skills: its picture, then what it is, its title and one line about it. */
function ResourceCard({ item, lang }: { item: ContentItem; lang: 'en' | 'fr' }) {
  const isEn = lang === 'en'
  const fr = (t: string) => (isEn ? t : t.replace(/ ([:;?!»])/g, '\u00a0$1'))
  return (
    <LibraryCard
      href={hrefOf(item, lang)}
      picture={<ResourcePicture id={item.id} lang={lang} className={LIBRARY_PICTURE} />}
      eyebrow={kindOf(item, lang)}
      title={fr(isEn ? item.title_en : item.title_fr)}
      summary={fr(isEn ? item.excerpt_en : item.excerpt_fr)}
    />
  )
}

export default function RessourcesPageClient({ lang }: { lang: 'en' | 'fr' }) {
  const isEn = lang === 'en'
  const c = COPY[lang]
  const reveal = useReveal()
  const reduceMotion = useReducedMotion()
  const all = useMemo(() => getResources(), [])
  const index = useMemo(() => new Map(all.map((r) => [r.id, searchText(r)])), [all])

  // The categories and the tags that exist in the library, in the order they first appear
  const categories = useMemo(() => Array.from(new Set(all.map((r) => r.category).filter(Boolean))) as SignalCategory[], [all])
  const allTags = useMemo(() => Array.from(new Set(all.flatMap((r) => r.tags ?? []))), [all])

  const [q, setQ] = useState('')
  const [cat, setCat] = useState<CategoryFilter>('all')
  const [tag, setTag] = useState<string | null>(null)

  // The page is statically rendered, so a shared link is applied right after mount.
  useEffect(() => {
    const sel = readSelectionFromUrl(categories, allTags)
    setQ(sel.q)
    setCat(sel.cat)
    setTag(sel.tag)
  }, [categories, allTags])

  const update = (next: { q?: string; cat?: CategoryFilter; tag?: string | null }) => {
    const nq = next.q ?? q
    const ncat = next.cat ?? cat
    const ntag = next.tag === undefined ? tag : next.tag
    setQ(nq)
    setCat(ncat)
    setTag(ntag)
    writeParams({ q: nq, cat: ncat !== 'all' ? ncat : null, tag: ntag })
  }

  const terms = normalize(q).split(/\s+/).filter(Boolean)
  const fits = (r: ContentItem, category: CategoryFilter) =>
    (category === 'all' || r.category === category) && (!tag || !!r.tags?.includes(tag)) && terms.every((t) => index.get(r.id)!.includes(t))
  const shown = all.filter((r) => fits(r, cat))
  const filtering = terms.length > 0 || cat !== 'all' || !!tag

  // A theme is offered while it has something to show with the other filters; the chosen one always stays
  const options: FilterOption[] = [
    { key: 'all', label: c.all, count: all.filter((r) => fits(r, 'all')).length },
    ...categories
      .map((k) => ({ key: k as string, label: CATEGORY_LABELS[k][lang], count: all.filter((r) => fits(r, k)).length }))
      .filter((o) => o.count > 0 || o.key === cat),
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
        <h1 className="build-line text-display text-gray-900">
          {isEn ? 'Resources' : 'Ressources'}
        </h1>
        <p className="build-rise mt-6 md:mt-8 text-lead-lg text-gray-600 max-w-[54ch]" style={{ ['--d' as string]: '120ms' }}>
          {isEn
            ? 'Methods, processes and documents from my practice, for peers and for designers starting out.'
            : 'Méthodes, process et documents tirés de ma pratique, pour les pairs et pour les designers qui débutent.'}
        </p>
        {/* The picture of the page: the library and what happens when someone uses it (Stageshow), like the skills page */}
        <div className="build-media mt-10 overflow-hidden rounded-[28px] bg-[#F4F4F2] ring-1 ring-inset ring-black/[0.04] md:mt-14" style={{ ['--d' as string]: '280ms' }}>
          <div className="aspect-[358/440] w-full min-[560px]:aspect-[960/500]">
            <ResourcesHeroStage lang={lang} />
          </div>
        </div>
      </header>

      {/* The controls, shared with the skills catalogue */}
      <LibraryBar>
        <SearchField value={q} onChange={(v) => update({ q: v })} placeholder={c.search} label={c.searchLabel} clearLabel={c.clear} />
        <LibraryFilters value={cat} options={options} onChange={(k) => update({ cat: k as CategoryFilter })} label={c.theme} more={c.more} />
      </LibraryBar>

      <section className="wrap pb-20 md:pb-32" aria-label={isEn ? 'Resources' : 'Ressources'}>
        <ResultsMeta filtering={filtering} text={c.result(shown.length)} resetLabel={c.reset} onReset={() => update({ q: '', cat: 'all', tag: null })}>
          {tag && (
            <button
              type="button"
              onClick={() => update({ tag: null })}
              aria-label={`${c.removeTag} ${RESOURCE_TAGS[tag]?.[lang] ?? tag}`}
              className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full bg-gray-900 px-3 text-xs font-medium text-white transition-transform duration-150 ease-out active:scale-[0.97]"
            >
              {RESOURCE_TAGS[tag]?.[lang] ?? tag}
              <span aria-hidden="true">×</span>
            </button>
          )}
        </ResultsMeta>

        {shown.length === 0 ? (
          <EmptyResults message={c.none} resetLabel={c.reset} onReset={() => update({ q: '', cat: 'all', tag: null })} />
        ) : (
          <motion.ul {...reveal()} className="grid gap-5 sm:grid-cols-2 md:gap-8 lg:grid-cols-3" aria-live="polite">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((item) => (
                <motion.li key={item.id} layout={!reduceMotion} {...cardMotion} className="min-w-0 list-none">
                  <ResourceCard item={item} lang={lang} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
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
