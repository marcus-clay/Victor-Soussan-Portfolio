import type { Metadata } from 'next'
import SignalsPageWrapper from '@/components/page-wrappers/SignalsPageWrapper'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = langParam === 'fr' ? 'fr' : 'en'
  return {
    title: lang === 'fr' ? 'Blog' : 'Blog',
    description: lang === 'fr'
      ? 'Articles et reflexions sur le product design, le leadership, l\'IA et les methodes de travail.'
      : 'Articles and insights on product design, leadership, AI and work methodologies.',
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/signals`,
      languages: {
        fr: 'https://www.victorsoussan.fr/fr/signals',
        en: 'https://www.victorsoussan.fr/en/signals',
      },
    },
  }
}

export default async function SignalsPage({ params }: Props) {
  const { lang: langParam } = await params
  const lang = (langParam === 'fr' ? 'fr' : 'en') as 'en' | 'fr'

  return <SignalsPageWrapper lang={lang} />
}
