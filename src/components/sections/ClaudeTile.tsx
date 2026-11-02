import React from 'react'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/ssr'
import ClaudeCodeStage from '@/components/claude/ClaudeCodeStage'
import { NewTag, PILL, TEXT_LINK } from '@/components/claude/ui'
import type { Lang } from '@/data/skillsCatalogue'

/**
 * The Claude tile at the top of the homepage's Resources block: one large, quiet tile with the words on the left
 * and a made-up Claude Code window on the right (src/components/claude/ClaudeCodeStage.tsx), running off the
 * tile's right and bottom edges. The tile is the page's neutral grey, not a colour: the colour comes from the small
 * green tag and from the terminal. Below md the words sit above the picture.
 */

const COPY = {
  en: {
    title: 'Designing with Claude',
    label: 'New',
    text: 'Skills free to use, a guide to build a personal OS, and the way I work with agents.',
    cta: 'Explore',
    skills: 'Skills catalogue',
    guide: 'Personal OS guide',
  },
  fr: {
    title: 'Concevoir avec Claude',
    label: 'Nouveau',
    text: 'Des skills en libre accès, un guide pour construire un OS personnel et ma façon de travailler avec des agents.',
    cta: 'Découvrir',
    skills: 'Catalogue de skills',
    guide: 'Guide de l’OS personnel',
  },
} as const

export default function ClaudeTile({ lang }: { lang: Lang }) {
  const c = COPY[lang]
  const fr = (s: string) => (lang === 'fr' ? s.replace(/ ([:;?!»])/g, ' $1') : s)
  return (
    <div className="overflow-hidden rounded-[28px] bg-[#F4F4F2] ring-1 ring-inset ring-black/[0.04]">
      <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="flex flex-col justify-center p-6 pb-2 md:p-10 md:pb-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="text-[26px] font-semibold leading-[1.1] tracking-[-0.025em] text-gray-900 md:text-[28px]">{c.title}</h3>
            <NewTag>{c.label}</NewTag>
          </div>
          <p className="mt-4 max-w-[36ch] text-base text-gray-600">{fr(c.text)}</p>
          <div className="mt-6">
            <Link href={`/${lang}/claude`} className={PILL}>
              {c.cta}
              <ArrowRight className="btn-arrow" size={16} weight="bold" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-6">
            <Link href={`/${lang}/skills`} className={`group ${TEXT_LINK}`}>
              <span className="link-line">{c.skills}</span>
            </Link>
            <Link href={`/${lang}/guide/os-personnel`} className={`group ${TEXT_LINK}`}>
              <span className="link-line">{fr(c.guide)}</span>
            </Link>
          </div>
        </div>
        <div className="aspect-[358/420] w-full min-[480px]:aspect-[560/440] md:self-end">
          <ClaudeCodeStage lang={lang} />
        </div>
      </div>
    </div>
  )
}
