import type { Metadata } from 'next'
import TestimonialsPageClient from './TestimonialsPageClient'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = langParam === 'fr' ? 'fr' : 'en'
  return {
    title: lang === 'fr' ? 'Témoignages' : 'Testimonials',
    description: lang === 'fr'
      ? 'Ce que disent les collaborateurs, clients et partenaires de Victor Soussan.'
      : 'What collaborators, clients and partners say about Victor Soussan.',
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/testimonials`,
      languages: {
        fr: 'https://www.victorsoussan.fr/fr/testimonials',
        en: 'https://www.victorsoussan.fr/en/testimonials',
      },
    },
  }
}

export default async function TestimonialsPage({ params }: Props) {
  const { lang: langParam } = await params
  const lang = (langParam === 'fr' ? 'fr' : 'en') as 'en' | 'fr'
  return <TestimonialsPageClient lang={lang} />
}
