import type { Metadata } from 'next'
import QuotePageWrapper from '@/components/page-wrappers/QuotePageWrapper'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'fr' ? 'Devis' : 'Quote',
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/quote`,
      languages: { fr: 'https://www.victorsoussan.fr/fr/quote', en: 'https://www.victorsoussan.fr/en/quote' },
    },
  }
}

export default async function QuotePage({ params }: Props) {
  const { lang } = await params
  return <QuotePageWrapper lang={lang as 'en' | 'fr'} />
}
