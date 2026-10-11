import type { Metadata } from 'next'
import VisualArchivePageWrapper from '@/components/page-wrappers/VisualArchivePageWrapper'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, pageLd, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

const COPY = {
  fr: { title: 'Archive visuelle', description: 'Archive visuelle de Victor Soussan : études d’interface, prototypes et expérimentations de design.' },
  en: { title: 'Visual Archive', description: 'Visual archive of Victor Soussan: interface studies, prototypes and design experiments.' },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: 'visual-archive',
    title: COPY[lang].title,
    description: COPY[lang].description,
    noindex: true,
  })
}

export default async function Page({ params }: Props) {
  const lang = toLang((await params).lang)
  return (
    <>
      <JsonLd
        data={pageLd({
          lang,
          path: 'visual-archive',
          type: 'WebPage',
          name: COPY[lang].title,
          description: COPY[lang].description,
          crumbs: [{ name: COPY[lang].title, path: 'visual-archive' }],
        })}
      />
      <VisualArchivePageWrapper lang={lang} />
    </>
  )
}
