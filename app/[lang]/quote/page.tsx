import type { Metadata } from 'next'

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
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-3xl font-bold tracking-[-0.02em]">
          {lang === 'fr' ? 'Devis' : 'Quote'}
        </h1>
        <p className="mt-4 text-gray-500">Migration in progress</p>
      </div>
    </div>
  )
}
