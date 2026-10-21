import type { Metadata } from 'next'
import TestimonialsPageClient from './TestimonialsPageClient'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, pageLd, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

const COPY = {
  fr: { title: 'Témoignages', description: 'Ce que disent les collaborateurs, clients et partenaires de Victor Soussan : approche, collaboration et résultats.' },
  en: { title: 'Testimonials', description: 'What collaborators, clients and partners say about working with Victor Soussan: approach, collaboration and results.' },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: 'testimonials',
    title: COPY[lang].title,
    description: COPY[lang].description,
  })
}

export default async function Page({ params }: Props) {
  const lang = toLang((await params).lang)
  return (
    <>
      <JsonLd
        data={pageLd({
          lang,
          path: 'testimonials',
          type: 'WebPage',
          name: COPY[lang].title,
          description: COPY[lang].description,
          crumbs: [{ name: COPY[lang].title, path: 'testimonials' }],
        })}
      />
      <TestimonialsPageClient lang={lang} />
    </>
  )
}
