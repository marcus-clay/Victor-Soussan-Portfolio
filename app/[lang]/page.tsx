import type { Metadata } from 'next'
import HomepageClient from '@/components/page-wrappers/HomepageClient'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = langParam === 'fr' ? 'fr' : 'en'
  const description = lang === 'fr'
    ? 'Senior Product Design Lead avec 15+ ans d\'experience. Specialise en Design System, UX Research, et transformation digitale.'
    : 'Senior Product Design Lead with 15+ years of experience. Specialized in Design Systems, UX Research, and digital transformation.'

  return {
    title: { absolute: 'Victor Soussan | Product Design Lead' },
    description,
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
