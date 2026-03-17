import type { Metadata } from 'next'
import { SIGNALS } from '@/data/signalsData'
import SignalDetailPageWrapper from '@/components/page-wrappers/SignalDetailPageWrapper'

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
  const description = signal
    ? (lang === 'fr' ? signal.body_fr : signal.body_en)?.slice(0, 160)
    : ''

  return {
    title,
    description,
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
  const { lang: langParam, id } = await params
  const lang = (langParam === 'fr' ? 'fr' : 'en') as 'en' | 'fr'
  const signal = SIGNALS.find((s) => s.id === id)

  if (!signal) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Signal not found</p>
      </div>
    )
  }

  return <SignalDetailPageWrapper lang={lang} signalId={id} />
}
