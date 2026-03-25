import type { Metadata } from 'next'
import { SHIP_TO_SHOW_META } from '@/data/guideShipToShowData'
import GuideShipToShowPageWrapper from '@/components/page-wrappers/GuideShipToShowPageWrapper'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const l = (lang === 'fr' ? 'fr' : 'en') as 'en' | 'fr'
  return {
    title: `${SHIP_TO_SHOW_META.title_fr} - ${l === 'fr' ? SHIP_TO_SHOW_META.subtitle_fr : SHIP_TO_SHOW_META.subtitle_en}`,
    description: l === 'fr' ? SHIP_TO_SHOW_META.subtitle_fr : SHIP_TO_SHOW_META.subtitle_en,
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/guide/ship-to-show`,
      languages: {
        fr: `https://www.victorsoussan.fr/fr/guide/ship-to-show`,
        en: `https://www.victorsoussan.fr/en/guide/ship-to-show`,
      },
    },
  }
}

export default async function ShipToShowGuidePage({ params }: Props) {
  const { lang: langParam } = await params
  const lang = (langParam === 'fr' ? 'fr' : 'en') as 'en' | 'fr'

  return <GuideShipToShowPageWrapper lang={lang} />
}
