import React from 'react'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/ssr'
import { ACTS, ACTS_INTRO } from '@/data/approcheData'
import HomeBlock from './HomeBlock'
import Reveal from '@/components/ui/Reveal'

interface MethodSectionProps {
  lang: 'en' | 'fr'
}

const COPY = {
  fr: { more: 'Lire l’approche complète' },
  en: { more: 'Read the full approach' },
} as const

/**
 * The three steps of the method (Cadrer, Matérialiser, Arbitrer), with the copy of the Approche
 * page. The numbers are a sequence, so they are set in tabular figures.
 */
export default function MethodSection({ lang }: MethodSectionProps) {
  const t = COPY[lang]
  const intro = ACTS_INTRO[lang]

  return (
    <HomeBlock id="method" title={intro.title}>
      <ol className="divide-y divide-gray-100 border-b border-gray-100">
        {ACTS.map((phase, i) => (
          <Reveal
            as="li"
            key={phase.id}
            className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[4rem_minmax(0,15rem)_1fr] gap-x-4 md:gap-x-6 gap-y-2 py-6 md:py-8"
          >
            <span className="text-sm text-gray-500 tabular-nums pt-1.5 md:pt-2">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="text-subhead text-gray-900">{phase.title[lang]}</h3>
            <p className="col-start-2 md:col-start-3 text-base text-gray-600 max-w-[48ch] md:pt-1.5">
              {phase.description[lang]}
            </p>
          </Reveal>
        ))}
      </ol>

      <Link
        href={`/${lang}/approche`}
        className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-500 transition-colors duration-150"
      >
        {t.more}
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-300 ease-out group-hover:translate-x-1"
        />
      </Link>
    </HomeBlock>
  )
}
