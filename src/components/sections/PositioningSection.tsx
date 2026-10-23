import React from 'react'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/ssr'
import { TRANSLATIONS } from '@/data/translations'
import { imgDims } from '@/utils/imageDimensions'
import Reveal from '@/components/ui/Reveal'

interface PositioningSectionProps {
  lang: 'en' | 'fr'
}

const PORTRAIT = '/images/image-victor-soussan-2027.jpg'

const COPY = {
  fr: { caption: 'Victor Soussan', role: 'Lead Product Designer, Paris', more: 'Lire mon parcours' },
  en: { caption: 'Victor Soussan', role: 'Lead Product Designer, Paris', more: 'Read my background' },
} as const

/** French typography: a no-break space before : ; ? ! so a line never starts with one. */
const frTypo = (s: string) => s.replace(/ ([:;?!])/g, ' $1')

/**
 * Positioning block: the portrait and one large statement, on the same hairline grammar as the
 * other blocks. The statement is the existing bio paragraph on the hybrid profile (the hero
 * keeps its own description).
 */
export default function PositioningSection({ lang }: PositioningSectionProps) {
  const t = COPY[lang]
  const raw = TRANSLATIONS[lang].bio.p2
  const statement = lang === 'fr' ? frTypo(raw) : raw

  return (
    <section aria-label={t.caption} className="pb-16 md:pb-28">
      <div className="wrap">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 border-t border-gray-200 pt-6 md:pt-8">
          <Reveal as="figure" className="col-span-8 col-start-1 sm:col-span-5 md:col-span-3">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
              <img
                src={PORTRAIT}
                {...imgDims(PORTRAIT)}
                alt={t.caption}
                loading="lazy"
                className="h-full w-full object-cover object-[50%_40%]"
              />
            </div>
            <figcaption className="mt-3 text-sm">
              <span className="font-medium text-gray-900">{t.caption}</span>
              <span className="block text-gray-500">{t.role}</span>
            </figcaption>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-7 lg:col-start-5 flex flex-col justify-between gap-8">
            <p className="text-subhead text-gray-900 text-pretty">{statement}</p>
            <Link
              href={`/${lang}/about`}
              className="group inline-flex min-h-11 w-fit items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-500 transition-colors duration-150"
            >
              {t.more}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
