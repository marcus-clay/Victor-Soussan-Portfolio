import type { Metadata } from 'next'
import WorkPageWrapper from '@/components/page-wrappers/WorkPageWrapper'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'fr' ? 'Projets' : 'Work',
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/work`,
      languages: { fr: 'https://www.victorsoussan.fr/fr/work', en: 'https://www.victorsoussan.fr/en/work' },
    },
  }
}

export default async function WorkPage({ params }: Props) {
  const { lang } = await params
  return <WorkPageWrapper lang={lang as 'en' | 'fr'} />
}
