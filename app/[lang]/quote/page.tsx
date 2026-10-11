import type { Metadata } from 'next'
import QuotePageWrapper from '@/components/page-wrappers/QuotePageWrapper'
import { buildMetadata, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: 'quote',
    title: lang === 'fr' ? 'Devis' : 'Quote',
    description: lang === 'fr' ? 'G\u00e9n\u00e9rateur de devis pour une mission de product design.' : 'Quote generator for a product design engagement.',
    noindex: true,
  })
}

export default async function QuotePage({ params }: Props) {
  const lang = toLang((await params).lang)
  return <QuotePageWrapper lang={lang} />
}
