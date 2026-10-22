import React from 'react'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/ssr'
import HomeBlock from './HomeBlock'

interface Signal {
  id: string
  title_en: string
  title_fr: string
  body_en: string
  body_fr: string
  category: string
}

interface FeaturedSectionProps {
  lang: 'en' | 'fr'
  featuredSignals: Signal[]
  guideChapters: { slug_en: string; slug_fr: string; title_en: string; title_fr: string }[]
  onNavigate?: (path: string) => void
}

/**
 * Resources teaser: the Claude Code guide and the featured article, as two rows on the same
 * hairline grammar as the rest of the page. Hover uses the site's list pattern.
 */
const FeaturedSection: React.FC<FeaturedSectionProps> = ({ lang, featuredSignals, guideChapters }) => {
  const isEn = lang === 'en'
  const guideSignal = featuredSignals.find((s) => s.id === 'claude-code-figma-mcp')

  const rowClass =
    'group -mx-3 px-3 py-5 md:py-6 rounded-lg flex items-start justify-between gap-6 hover:bg-gray-100 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'
  const arrow = (
    <ArrowRight
      size={16}
      aria-hidden="true"
      className="mt-1 shrink-0 text-gray-500 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-gray-900"
    />
  )

  return (
    <HomeBlock id="resources" title={isEn ? 'Resources' : 'Ressources'}>
      <div className="divide-y divide-gray-100 border-b border-gray-100">
        <Link href={`/${lang}/guide/claude-code`} className={rowClass}>
          <div className="min-w-0">
            <h3 className="text-title-3 text-gray-900">
              {isEn ? 'Getting started with Claude Code' : 'Bien démarrer avec Claude Code'}
            </h3>
            <p className="mt-1.5 max-w-[60ch] text-sm text-gray-600 line-clamp-2">
              {isEn
                ? 'A practical guide for designers who want to bring AI coding tools into their workflow, from first setup to a deployed interface.'
                : 'Un guide pratique pour les designers qui souhaitent intégrer les outils de code assisté par IA dans leur pratique, de l’installation à la première interface déployée.'}
            </p>
            <p className="mt-2 text-xs text-gray-500 tabular-nums">
              Guide · {guideChapters.length} {isEn ? 'chapters' : 'chapitres'}
            </p>
          </div>
          {arrow}
        </Link>

        {guideSignal && (
          <Link href={`/${lang}/signal/${guideSignal.id}`} className={rowClass}>
            <div className="min-w-0">
              <h3 className="text-title-3 text-gray-900">{isEn ? guideSignal.title_en : guideSignal.title_fr}</h3>
              <p className="mt-1.5 max-w-[60ch] text-sm text-gray-600 line-clamp-2">
                {isEn ? guideSignal.body_en : guideSignal.body_fr}
              </p>
              <p className="mt-2 text-xs text-gray-500">{isEn ? 'Article · AI' : 'Article · IA'}</p>
            </div>
            {arrow}
          </Link>
        )}
      </div>

      <Link
        href={`/${lang}/ressources`}
        className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-500 transition-colors duration-150"
      >
        {isEn ? 'All articles' : 'Tous les articles'}
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-300 ease-out group-hover:translate-x-1"
        />
      </Link>
    </HomeBlock>
  )
}

export default FeaturedSection
