'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useReveal } from '@/lib/motion'
import { ActRule } from '@/components/case-study/ActSection'
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react'
import { getGuides, getTemplates, TYPE_LABELS, type ContentItem } from '@/data/contentData'
import { TemplateDiagramThumb } from '@/components/templates/TemplateDiagrams'

/**
 * Resources: the guides and the templates, as a grid of illustrated cards (same anatomy as the
 * resource cards of the About carousel: a picture on the pale ground, the kind, the title, one
 * line). A guide shows its paper figure, a template a still of its diagram. The articles live on
 * the Blog page.
 */

const CARD =
  'group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white outline-offset-4 ' +
  'transition-[transform,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.985] ' +
  '[@media(hover:hover)]:hover:border-gray-200'

const GRID = 'grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3'

function hrefOf(item: ContentItem, lang: 'en' | 'fr'): string {
  if (item.type === 'template' && item.slug) return `/${lang}/ressources/${item.slug[lang]}`
  return item.id === 'guide-ship-to-show' ? `/${lang}/guide/ship-to-show` : `/${lang}/guide/claude-code`
}

function Picture({ item, lang }: { item: ContentItem; lang: 'en' | 'fr' }) {
  if (item.type === 'template') return <TemplateDiagramThumb id={item.id} lang={lang} className="m-2" />
  if (!item.illustration) return null
  return (
    <div className="m-2 aspect-[13/10] overflow-hidden rounded-xl bg-[#FAFAF8] ring-1 ring-inset ring-black/[0.04]">
      <div className="h-full w-full transition-transform duration-300 ease-media [@media(hover:hover)]:group-hover:scale-[1.03]">
        <img
          src={`/images/resources/doc-${item.illustration}-light.svg`}
          alt=""
          width={520}
          height={400}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="block h-full w-full object-contain"
        />
      </div>
    </div>
  )
}

function ResourceCard({ item, lang, index, reveal }: { item: ContentItem; lang: 'en' | 'fr'; index: number; reveal: ReturnType<typeof useReveal> }) {
  const isEn = lang === 'en'
  const kind = TYPE_LABELS[item.type][lang]
  const detail = item.type === 'guide' && item.chapterCount ? ` · ${item.chapterCount} ${isEn ? 'chapters' : 'chapitres'}` : ''
  return (
    <motion.li {...reveal(index)} className="min-w-0 list-none">
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
        </div>
      </Link>
    </motion.li>
  )
}

export default function RessourcesPageClient({ lang }: { lang: 'en' | 'fr' }) {
  const isEn = lang === 'en'
  const reveal = useReveal()
  const guides = getGuides()
  const templates = getTemplates()

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      {/* Header: page name and one line, full width, left aligned */}
      <header className="wrap pt-10 md:pt-16 pb-12 md:pb-16">
        <h1 className="text-display text-gray-900">
          {isEn ? 'Resources' : 'Ressources'}
        </h1>
        <p className="mt-6 md:mt-8 text-lead-lg text-gray-600 max-w-[54ch]">
          {isEn
            ? 'Guides and templates from my day-to-day practice: documents to copy, methods to follow step by step.'
            : 'Guides et modèles tirés de ma pratique\u00a0: des documents à reprendre, des méthodes à suivre pas à pas.'}
        </p>
      </header>

      {/* Guides */}
      <section className="wrap pb-12 md:pb-16" aria-labelledby="guides-heading">
        <h2 id="guides-heading" className="text-title-2 text-gray-900 mb-6 md:mb-8">Guides</h2>
        <ul className={GRID}>
          {guides.map((item, i) => <ResourceCard key={item.id} item={item} lang={lang} index={i} reveal={reveal} />)}
        </ul>
      </section>

      {/* Templates */}
      <section className="wrap pb-16 md:pb-24" aria-labelledby="templates-heading">
        <h2 id="templates-heading" className="text-title-2 text-gray-900 mb-6 md:mb-8">{isEn ? 'Templates' : 'Modèles'}</h2>
        <ul className={GRID}>
          {templates.map((item, i) => <ResourceCard key={item.id} item={item} lang={lang} index={i} reveal={reveal} />)}
        </ul>
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
