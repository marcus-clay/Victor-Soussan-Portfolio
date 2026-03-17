import type { Metadata } from 'next'
import ServicesPageWrapper from '@/components/page-wrappers/ServicesPageWrapper'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'fr' ? 'Expertises' : 'Services',
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/services`,
      languages: { fr: 'https://www.victorsoussan.fr/fr/services', en: 'https://www.victorsoussan.fr/en/services' },
    },
  }
}

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params
  return <ServicesPageWrapper lang={lang as 'en' | 'fr'} />
}
