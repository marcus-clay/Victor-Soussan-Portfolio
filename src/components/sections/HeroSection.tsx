import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/ssr'
import { TRANSLATIONS } from '@/data/translations'

interface HeroSectionProps {
  lang: 'en' | 'fr'
}

/**
 * Opening of the homepage: the role as the display title, one short line under it that sums up
 * the practice and the use of AI, then one paragraph and the two actions. The name lives in the
 * site header, which stays visible from the first screen. Stays a single <header> holding the
 * page's only h1 (the site header watches it).
 */
export default function HeroSection({ lang }: HeroSectionProps) {
  const hero = TRANSLATIONS[lang].hero
  const isEn = lang === 'en'

  return (
    <header className="wrap pt-10 md:pt-16 pb-10 md:pb-14">
      <h1 className="text-gray-900">
        <span className="build-line block text-display">{hero.title}</span>
        <span className="sr-only">, </span>
        <span className="build-line mt-2 block text-subhead font-normal text-gray-500 md:mt-3" style={{ ['--i' as string]: 1 }}>{hero.formula}</span>
      </h1>

      <p className="build-rise mt-8 md:mt-10 max-w-[56ch] text-lead-lg text-gray-600 md:hidden" style={{ ['--d' as string]: '160ms' }}>
        {hero.descShort}
      </p>
      <p className="build-rise hidden md:block mt-10 max-w-[56ch] text-lead-lg text-gray-600" style={{ ['--d' as string]: '160ms' }}>
        {hero.desc}
      </p>

      <div className="build-rise mt-6 flex flex-wrap items-center gap-x-6 gap-y-1" style={{ ['--d' as string]: '220ms' }}>
        <Link
          href={`/${lang}/approche`}
          className="group inline-flex min-h-11 items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 active:opacity-60 transition-[color,opacity] duration-150"
        >
          {isEn ? 'My approach' : 'Mon approche'}
          <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <span className="text-gray-300 select-none" aria-hidden="true">·</span>
        <Link
          href={`/${lang}/contact`}
          className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-gray-900 hover:text-gray-500 active:opacity-60 transition-[color,opacity] duration-150"
        >
          {isEn ? "Let's talk" : 'Parlons-en'}
          <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </header>
  )
}
