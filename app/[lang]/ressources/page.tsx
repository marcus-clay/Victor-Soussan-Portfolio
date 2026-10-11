import type { Metadata } from 'next'
import RessourcesPageClient from '@/components/page-wrappers/RessourcesPageClient'
import JsonLd from '@/components/JsonLd'
import { SIGNALS } from '@/data/signalsData'
import { buildMetadata, itemListLd, pageLd, pageUrl, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

const COPY = {
  fr: { title: 'Ressources product design et IA', description: 'Articles, guides et templates sur le product design B2B et B2G, les design systems et le prototypage assisté par IA, par Victor Soussan, Lead Product Designer.' },
  en: { title: 'Product design and AI resources', description: 'Articles, guides and templates on B2B and B2G product design, design systems and AI-assisted prototyping, by Victor Soussan, Lead Product Designer.' },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: 'ressources',
    title: COPY[lang].title,
    description: COPY[lang].description,
  })
}

export default async function Page({ params }: Props) {
  const lang = toLang((await params).lang)
  return (
    <>
      <JsonLd
        data={[...pageLd({
          lang,
          path: 'ressources',
          type: 'CollectionPage',
          name: COPY[lang].title,
          description: COPY[lang].description,
          crumbs: [{ name: COPY[lang].title, path: 'ressources' }],
        }),
        itemListLd(
          SIGNALS.map((sig) => ({
            name: lang === 'fr' ? sig.title_fr : sig.title_en,
            url: pageUrl(lang, `signal/${sig.id}`),
          }))
        )]}
      />
      <RessourcesPageClient lang={lang} />
    </>
  )
}
