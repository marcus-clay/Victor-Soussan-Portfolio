import type { Metadata } from 'next'
import BlogPageClient from '@/components/page-wrappers/BlogPageClient'
import JsonLd from '@/components/JsonLd'
import { SIGNALS } from '@/data/signalsData'
import { buildMetadata, itemListLd, pageLd, pageUrl, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

const COPY = {
  fr: {
    title: 'Blog\u00a0: design produit, équipe et IA',
    description: 'Les articles de Victor Soussan, Lead Product Designer\u00a0: retours d’expérience sur le design produit B2B et B2G, la direction d’équipe design et le travail avec l’IA.',
  },
  en: {
    title: 'Blog: product design, teams and AI',
    description: 'Articles by Victor Soussan, Lead Product Designer: notes from practice on B2B and B2G product design, leading design teams and working with AI.',
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: 'blog',
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
          path: 'blog',
          type: 'CollectionPage',
          name: COPY[lang].title,
          description: COPY[lang].description,
          crumbs: [{ name: 'Blog', path: 'blog' }],
        }),
        itemListLd(
          SIGNALS.map((sig) => ({
            name: lang === 'fr' ? sig.title_fr : sig.title_en,
            url: pageUrl(lang, `signal/${sig.id}`),
          }))
        )]}
      />
      <BlogPageClient lang={lang} />
    </>
  )
}
