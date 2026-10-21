'use client'

import Link from 'next/link'
import { ArrowUpRight, Images } from '@phosphor-icons/react'
import { CASE_STUDY_SHELL } from '@/data/caseStudyShell'
import { imgDims } from '@/utils/imageDimensions'
import { zoomable } from '@/utils/zoomable'

export interface HeroMeta {
  label: string
  value: string
}

interface CaseStudyHeroProps {
  lang: 'en' | 'fr'
  projectId: string
  title: string
  intro: string
  /** Role, period, team, scope: two to four entries, shown as a compact definition list */
  meta: HeroMeta[]
  /** Short description of the hero image for assistive technology */
  visualAlt: string
  /** Link to the product itself, when it is public */
  externalHref?: string
  externalLabel?: string
  /** Hide the gallery link for a project that has no gallery view */
  hideGallery?: boolean
  /** Opens the image in the page's lightbox */
  onZoom?: () => void
}

const COPY = {
  en: { gallery: 'View the gallery', logoSuffix: 'logo' },
  fr: { gallery: 'Voir la galerie', logoSuffix: 'logo' },
} as const

/**
 * The same opening for every case study: client mark, title, introduction, a short
 * definition list, the way to the gallery, and a visual panel of one size for all nine
 * projects (4:3 on phones, 21:9 from md). Left column carries identity, right column carries
 * the reading, so the eye lands on title first and the paragraph second.
 */
export default function CaseStudyHero({
  lang,
  projectId,
  title,
  intro,
  meta,
  visualAlt,
  externalHref,
  externalLabel,
  hideGallery,
  onZoom,
}: CaseStudyHeroProps) {
  const shell = CASE_STUDY_SHELL[projectId]
  if (!shell) return null
  const t = COPY[lang]

  return (
    <header id="hero" className="wrap pt-8 md:pt-14 pb-14 md:pb-24">
      {/* Phones: identity, intro, visual, then facts and actions. From md: identity left over
          the visual, intro and facts right. */}
      <div className="grid grid-cols-12 gap-x-6 gap-y-8 md:gap-y-10">
        <div className="order-1 col-span-12 md:col-span-7 md:row-span-2 md:col-start-1 md:row-start-1">
          {shell.logo ? (
            <img
              src={shell.logo}
              {...imgDims(shell.logo)}
              alt={`${shell.client}, ${t.logoSuffix}`}
              className="h-7 md:h-8 w-auto max-w-[200px] object-contain object-left"
            />
          ) : (
            <p className="text-title-2 text-gray-900">{shell.client}</p>
          )}
          <h1 className="text-headline text-gray-900 mt-6 md:mt-8 max-w-[18ch] md:max-w-[16ch] lg:max-w-[18ch]">
            {title}
          </h1>
        </div>

        <p className="order-2 col-span-12 md:col-span-5 md:col-start-8 md:row-start-1 text-lead-lg text-gray-600 max-w-[54ch] md:self-start">
          {intro}
        </p>

        {/* Hero visual: same panel for every project */}
        <figure
          className={`hero-panel hero-panel-flat order-3 col-span-12 md:order-none md:row-start-3 aspect-[3/2] ${onZoom ? 'cursor-zoom-in' : ''}`}
          style={{ backgroundColor: shell.tone }}
          {...(onZoom ? zoomable(() => onZoom()) : {})}
          aria-label={onZoom ? visualAlt : undefined}
        >
          <img
            src={shell.visual}
            {...imgDims(shell.visual)}
            alt={onZoom ? '' : visualAlt}
            loading="eager"
            fetchPriority="high"
            className={`hero-panel-img relative z-[1] w-full h-full ${
              shell.fit === 'cover' ? 'object-cover' : 'object-contain p-[5%] md:p-[3.5%]'
            }`}
            style={shell.position ? { objectPosition: shell.position } : undefined}
          />
        </figure>

        <div className="order-4 col-span-12 md:col-span-5 md:col-start-8 md:row-start-2 md:self-end flex flex-col gap-7">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-gray-200 pt-5">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-xs text-gray-500">{item.label}</dt>
                <dd className="text-sm font-medium text-gray-900 mt-0.5 tabular-nums">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {!hideGallery && (
              <Link
                href={`/${lang}/project/${projectId}/gallery`}
                className="inline-flex items-center gap-2 min-h-11 px-5 rounded-full bg-gray-900 hover:bg-black text-white text-sm font-medium shadow-sm hover:shadow-md active:scale-[0.97] transition-[background-color,box-shadow,transform] duration-150"
              >
                <Images size={16} weight="regular" aria-hidden="true" />
                {t.gallery}
              </Link>
            )}
            {externalHref && (
              <a
                href={externalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 min-h-11 text-sm font-medium text-gray-900 hover:text-gray-500 transition-colors duration-150"
              >
                {externalLabel}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
