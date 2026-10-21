import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CATEGORY_LABELS, SIGNALS } from '@/data/signalsData'
import SignalDetailPageWrapper from '@/components/page-wrappers/SignalDetailPageWrapper'
import JsonLd from '@/components/JsonLd'
import { relatedContent } from '@/lib/related'
import { articleLd, breadcrumbLd, buildMetadata, clip, isoDate, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string; id: string }> }

export function generateStaticParams() {
  const langs = ['en', 'fr']
  return langs.flatMap((lang) => SIGNALS.map((s) => ({ lang, id: s.id })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam, id } = await params
  const lang = toLang(langParam)
  const signal = SIGNALS.find((s) => s.id === id)
  if (!signal) return { robots: { index: false, follow: false } }

  return buildMetadata({
    lang,
    path: `signal/${id}`,
    title: lang === 'fr' ? signal.title_fr : signal.title_en,
    description: lang === 'fr' ? signal.body_fr : signal.body_en,
    type: 'article',
    publishedTime: isoDate(signal.date),
    section: CATEGORY_LABELS[signal.category][lang],
  })
}

export default async function SignalPage({ params }: Props) {
  const { lang: langParam, id } = await params
  const lang = toLang(langParam)
  const signal = SIGNALS.find((s) => s.id === id)

  if (!signal) notFound()

  const title = lang === 'fr' ? signal.title_fr : signal.title_en
  const summary = lang === 'fr' ? signal.body_fr : signal.body_en
  const long = (lang === 'fr' ? signal.body_long_fr : signal.body_long_en) ?? summary
  const section = CATEGORY_LABELS[signal.category][lang]

  return (
    <>
      <JsonLd
        data={[
          articleLd({
            lang,
            path: `signal/${id}`,
            headline: title,
            description: clip(summary, 158),
            datePublished: isoDate(signal.date) ?? '2024-01-01',
            image: signal.heroImage,
            section,
            wordCount: long.split(/\s+/).filter(Boolean).length,
            keywords: [section, 'Product Design', 'Victor Soussan'],
          }),
          breadcrumbLd(lang, [
            { name: lang === 'fr' ? 'Ressources' : 'Resources', path: 'ressources' },
            { name: title, path: `signal/${id}` },
          ]),
        ]}
      />
      <SignalDetailPageWrapper lang={lang} signalId={id} related={relatedContent(lang, id)} />
    </>
  )
}
