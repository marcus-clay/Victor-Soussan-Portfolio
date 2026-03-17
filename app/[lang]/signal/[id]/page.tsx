import type { Metadata } from 'next'
import { SIGNALS } from '@/data/signalsData'

type Props = { params: Promise<{ lang: string; id: string }> }

export function generateStaticParams() {
  const langs = ['en', 'fr']
  return langs.flatMap((lang) =>
    SIGNALS.map((s) => ({ lang, id: s.id }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params
  const signal = SIGNALS.find((s) => s.id === id)
  const title = signal
    ? (lang === 'fr' ? signal.title_fr : signal.title_en)
    : 'Signal'
  return {
    title,
    description: signal
      ? (lang === 'fr' ? signal.body_fr : signal.body_en)
      : '',
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/signal/${id}`,
      languages: {
        fr: `https://www.victorsoussan.fr/fr/signal/${id}`,
        en: `https://www.victorsoussan.fr/en/signal/${id}`,
      },
    },
  }
}

export default async function SignalPage({ params }: Props) {
  const { lang, id } = await params
  const signal = SIGNALS.find((s) => s.id === id)
  if (!signal) return <div>Signal not found</div>
  const title = lang === 'fr' ? signal.title_fr : signal.title_en

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-3xl font-bold tracking-[-0.02em]">{title}</h1>
        <p className="mt-4 text-gray-500">Migration in progress</p>
      </div>
    </div>
  )
}
