import type { Metadata } from 'next'
import AboutPageWrapper from '@/components/page-wrappers/AboutPageWrapper'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, pageLd, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

const COPY = {
  fr: { title: 'À propos', description: 'Victor Soussan, Lead Product Designer à Paris. Design produit B2B et B2G : SaaS, EdTech, services publics, design systems, prototypage assisté par IA.' },
  en: { title: 'About', description: 'Victor Soussan, Lead Product Designer in Paris. B2B and B2G product design in France: SaaS, EdTech, public services, design systems, AI-assisted prototyping.' },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: 'about',
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
          path: 'about',
          type: 'AboutPage',
          name: COPY[lang].title,
          description: COPY[lang].description,
          crumbs: [{ name: COPY[lang].title, path: 'about' }],
        })}
      />
      <AboutPageWrapper lang={lang} />
    </>
  )
}
