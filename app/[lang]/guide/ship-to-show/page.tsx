import type { Metadata } from 'next'
import { SHIP_TO_SHOW_META } from '@/data/guideShipToShowData'
import GuideShipToShowPageWrapper from '@/components/page-wrappers/GuideShipToShowPageWrapper'
import JsonLd from '@/components/JsonLd'
import { articleLd, breadcrumbLd, buildMetadata, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  const subtitle = lang === 'fr' ? SHIP_TO_SHOW_META.subtitle_fr : SHIP_TO_SHOW_META.subtitle_en
  return buildMetadata({
    lang,
    path: 'guide/ship-to-show',
    title: `${SHIP_TO_SHOW_META.title_en}: ${lang === 'fr' ? 'du prototype au case study' : 'from prototype to case study'}`,
    description: `${subtitle}. ${lang === 'fr' ? 'Méthode pas à pas par Victor Soussan, Lead Product Designer : vidéos animées, récit bilingue et pack d’intégration.' : 'Step-by-step method by Victor Soussan, Lead Product Designer: animated videos, bilingual narrative and integration pack.'}`,
    type: 'article',
    publishedTime: SHIP_TO_SHOW_META.date,
  })
}

export default async function ShipToShowGuidePage({ params }: Props) {
  const lang = toLang((await params).lang)
  const subtitle = lang === 'fr' ? SHIP_TO_SHOW_META.subtitle_fr : SHIP_TO_SHOW_META.subtitle_en

  return (
    <>
      <JsonLd
        data={[
          articleLd({
            lang,
            path: 'guide/ship-to-show',
            headline: `${SHIP_TO_SHOW_META.title_en}: ${subtitle}`,
            description: subtitle,
            datePublished: SHIP_TO_SHOW_META.date,
            keywords: ['Claude Code', 'Portfolio', 'Case study', 'Product design'],
          }),
          breadcrumbLd(lang, [
            { name: lang === 'fr' ? 'Ressources' : 'Resources', path: 'ressources' },
            { name: SHIP_TO_SHOW_META.title_en, path: 'guide/ship-to-show' },
          ]),
        ]}
      />
      <GuideShipToShowPageWrapper lang={lang} />
    </>
  )
}
