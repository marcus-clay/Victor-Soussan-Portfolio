import type { Metadata } from 'next'
import HomepageClient from '@/components/page-wrappers/HomepageClient'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = langParam === 'fr' ? 'fr' : 'en'
  const description = lang === 'fr'
    ? 'Lead Product Designer avec plus de 15 ans d\u2019exp\u00e9rience. Sp\u00e9cialis\u00e9 en Design Systems, UX Research et transformation digitale.'
    : 'Lead Product Designer with 15+ years of experience. Specialized in Design Systems, UX Research, and digital transformation.'
  const shareDescription = lang === 'fr'
    ? 'Lead Product Designer, 15 ans de conception produit. Design systems, interfaces complexes, prototypage assist\u00e9 par IA.'
    : 'Lead Product Designer, 15+ years of product design. Design systems, complex interfaces, AI-assisted prototyping.'
  const title = 'Victor Soussan | Lead Product Designer'
  const image = '/images/og_victor_soussan.jpg'

  return {
    title: { absolute: title },
    description,
    openGraph: {
      type: 'website',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: lang === 'fr' ? 'en_US' : 'fr_FR',
      siteName: 'Victor Soussan Portfolio',
      url: `https://www.victorsoussan.fr/${lang}`,
      title,
      description: shareDescription,
      images: [{ url: image, width: 1200, height: 630, alt: 'Victor Soussan, Lead Product Designer' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: shareDescription,
      images: [image],
    },
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}`,
      languages: {
        'fr': 'https://www.victorsoussan.fr/fr',
        'en': 'https://www.victorsoussan.fr/en',
      },
    },
  }
}

export default async function HomePage({ params }: Props) {
  const { lang: langParam } = await params
  const lang = (langParam === 'fr' ? 'fr' : 'en') as 'en' | 'fr'

  return <HomepageClient lang={lang} />
}
