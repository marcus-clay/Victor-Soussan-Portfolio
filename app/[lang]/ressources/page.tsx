import type { Metadata } from 'next'
import RessourcesPageClient from '@/components/page-wrappers/RessourcesPageClient'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = langParam === 'fr' ? 'fr' : 'en'
  return {
    title: lang === 'fr' ? 'Ressources' : 'Resources',
    description: lang === 'fr'
      ? 'Articles, guides, templates et retours d\'expérience sur le product design et l\'IA.'
      : 'Articles, guides, templates, and insights on product design and AI.',
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/ressources`,
      languages: {
        fr: 'https://www.victorsoussan.fr/fr/ressources',
        en: 'https://www.victorsoussan.fr/en/ressources',
      },
    },
  }
}

export default async function RessourcesPage({ params }: Props) {
  const { lang: langParam } = await params
  const lang = (langParam === 'fr' ? 'fr' : 'en') as 'en' | 'fr'

  return <RessourcesPageClient lang={lang} />
}
