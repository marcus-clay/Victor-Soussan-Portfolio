import type { Metadata } from 'next'
import ServicesPageWrapper from '@/components/page-wrappers/ServicesPageWrapper'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, pageLd, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

const COPY = {
  fr: { title: 'Expertises', description: 'Design systems, recherche utilisateur, cadrage produit et prototypage assisté par IA pour les équipes produit B2B, EdTech et services publics.' },
  en: { title: 'Services', description: 'Design systems, user research, product framing and AI-assisted prototyping for B2B, EdTech and public service product teams.' },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: 'services',
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
          path: 'services',
          type: 'WebPage',
          name: COPY[lang].title,
          description: COPY[lang].description,
          crumbs: [{ name: COPY[lang].title, path: 'services' }],
        })}
      />
      <ServicesPageWrapper lang={lang} />
    </>
  )
}
