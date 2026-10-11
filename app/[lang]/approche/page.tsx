import type { Metadata } from 'next'
import ApprochePageWrapper from '@/components/page-wrappers/ApprochePageWrapper'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, pageLd, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

const COPY = {
  fr: { title: 'Approche', description: '15 ans de design produit B2B condensés en un système de travail : processus, convictions, recherche utilisateur, collaboration PM/Designer.' },
  en: { title: 'Approach', description: '15 years of B2B product design refined into a working system: process, beliefs, user research, PM/Designer collaboration.' },
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
