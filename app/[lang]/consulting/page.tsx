import type { Metadata } from 'next'
import ConsultingPageWrapper from '@/components/page-wrappers/ConsultingPageWrapper'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = langParam === 'fr' ? 'fr' : 'en'
  return {
    title: lang === 'fr' ? 'Consulting' : 'Consulting',
    description: lang === 'fr'
      ? 'Victor Soussan, consultant senior en design produit. Accompagnement UX, product design et strategie pour B2B, B2G, B2B2C.'
      : 'Victor Soussan, senior product design consultant. UX, product design and strategy for B2B, B2G, B2B2C.',
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/consulting`,
      languages: {
        fr: 'https://www.victorsoussan.fr/fr/consulting',
        en: 'https://www.victorsoussan.fr/en/consulting',
      },
    },
  }
}

export default async function ConsultingPage({ params }: Props) {
  const { lang: langParam } = await params
  const lang = (langParam === 'fr' ? 'fr' : 'en') as 'en' | 'fr'

  return <ConsultingPageWrapper lang={lang} />
}
