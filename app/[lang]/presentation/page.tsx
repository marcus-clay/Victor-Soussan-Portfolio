import type { Metadata } from 'next'
import PresentationPageWrapper from '@/components/page-wrappers/PresentationPageWrapper'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = langParam === 'fr' ? 'fr' : 'en'
  return {
    title: lang === 'fr' ? 'Presentation Executive' : 'Executive Presentation',
    description: lang === 'fr'
      ? 'Presentation executive de Victor Soussan, Lead Product Designer avec 15+ ans d\'experience.'
      : 'Executive presentation of Victor Soussan, Lead Product Designer with 15+ years of experience.',
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/presentation`,
      languages: {
        fr: 'https://www.victorsoussan.fr/fr/presentation',
        en: 'https://www.victorsoussan.fr/en/presentation',
      },
    },
  }
}

export default async function PresentationPage({ params }: Props) {
  const { lang: langParam } = await params
  const lang = (langParam === 'fr' ? 'fr' : 'en') as 'en' | 'fr'

  return <PresentationPageWrapper lang={lang} />
}
