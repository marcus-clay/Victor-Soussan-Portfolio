import type { Metadata } from 'next'
import ConsultingPageWrapper from '@/components/page-wrappers/ConsultingPageWrapper'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, pageLd, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

const COPY = {
  fr: { title: 'Consulting', description: 'Victor Soussan, consultant senior en design produit. Accompagnement UX, product design et stratégie pour le B2B, le B2G et le B2B2C.' },
  en: { title: 'Consulting', description: 'Victor Soussan, senior product design consultant. UX, product design and strategy for B2B, B2G and B2B2C.' },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: 'consulting',
    title: COPY[lang].title,
    description: COPY[lang].description,
    noindex: true,
  })
}

export default async function Page({ params }: Props) {
  const lang = toLang((await params).lang)
  return (
    <>
      <JsonLd
        data={pageLd({
          lang,
          path: 'consulting',
          type: 'WebPage',
          name: COPY[lang].title,
          description: COPY[lang].description,
          crumbs: [{ name: COPY[lang].title, path: 'consulting' }],
        })}
      />
      <ConsultingPageWrapper lang={lang} />
    </>
  )
}
