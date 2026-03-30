import type { Metadata } from 'next'
import ApprochePageWrapper from '@/components/page-wrappers/ApprochePageWrapper'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'fr' ? 'Approche' : 'Approach',
    description: lang === 'fr'
      ? '15 ans de design produit B2B condensés en un système de travail : processus, convictions, recherche utilisateur, collaboration PM/Designer.'
      : '15 years of B2B product design refined into a working system: process, beliefs, user research, PM/Designer collaboration.',
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/approche`,
      languages: { fr: 'https://www.victorsoussan.fr/fr/approche', en: 'https://www.victorsoussan.fr/en/approche' },
    },
  }
}

export default async function ApprochePage({ params }: Props) {
  const { lang } = await params
  return <ApprochePageWrapper lang={lang as 'en' | 'fr'} />
}
