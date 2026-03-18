import type { Metadata } from 'next'
import WorkPageWrapper from '@/components/page-wrappers/WorkPageWrapper'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'fr' ? 'Projets' : 'Projects',
    description: lang === 'fr'
      ? 'Études de cas et projets en design produit, design systems et prototypage.'
      : 'Case studies and projects in product design, design systems, and prototyping.',
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/projets`,
      languages: {
        fr: 'https://www.victorsoussan.fr/fr/projets',
        en: 'https://www.victorsoussan.fr/en/projets',
      },
    },
  }
}

export default async function ProjetsPage({ params }: Props) {
  const { lang } = await params
  return <WorkPageWrapper lang={lang as 'en' | 'fr'} />
}
