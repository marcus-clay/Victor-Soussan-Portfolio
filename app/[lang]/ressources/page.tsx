import type { Metadata } from 'next'
import RessourcesPageClient from '@/components/page-wrappers/RessourcesPageClient'
import JsonLd from '@/components/JsonLd'
import { SIGNALS } from '@/data/signalsData'
import { buildMetadata, itemListLd, pageLd, pageUrl, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

const COPY = {
  fr: { title: 'Ressources', description: 'Articles, guides, templates et retours d’expérience sur le product design et l’IA.' },
  en: { title: 'Resources', description: 'Articles, guides, templates, and insights on product design and AI.' },
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
