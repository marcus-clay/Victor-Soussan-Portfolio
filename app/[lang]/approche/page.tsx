import type { Metadata } from 'next'
import ApprochePageWrapper from '@/components/page-wrappers/ApprochePageWrapper'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, pageLd, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

const COPY = {
  fr: { title: 'Approche', description: 'Poser un cadre là où il n’y en a pas, organiser la recherche et le travail en commun, produire les documents de travail, puis affiner les maquettes.' },
  en: { title: 'Approach', description: 'Setting a frame where there is none, organising collaboration and user research, producing working documents, then raising fidelity.' },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: 'approche',
    title: COPY[lang].title,
    description: COPY[lang].description,
  })
}

export default async function Page({ params }: Props) {
  const lang = toLang((await params).lang)
  return (
    <>
      <JsonLd
        data={pageLd({
          lang,
          path: 'approche',
          type: 'WebPage',
          name: COPY[lang].title,
          description: COPY[lang].description,
          crumbs: [{ name: COPY[lang].title, path: 'approche' }],
        })}
      />
      <ApprochePageWrapper lang={lang} />
    </>
  )
}
