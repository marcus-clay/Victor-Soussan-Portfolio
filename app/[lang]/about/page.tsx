import type { Metadata } from 'next'
import AboutPageWrapper from '@/components/page-wrappers/AboutPageWrapper'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'fr' ? 'À propos' : 'About',
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/about`,
      languages: { fr: 'https://www.victorsoussan.fr/fr/about', en: 'https://www.victorsoussan.fr/en/about' },
    },
  }
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params
  return <AboutPageWrapper lang={lang as 'en' | 'fr'} />
}
