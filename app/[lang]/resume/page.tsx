import type { Metadata } from 'next'
import ResumePageWrapper from '@/components/page-wrappers/ResumePageWrapper'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, pageLd, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

const COPY = {
  fr: { title: 'CV', description: 'CV de Victor Soussan, Lead Product Designer : expérience, compétences et projets sélectionnés.' },
  en: { title: 'Resume', description: 'Resume of Victor Soussan, Lead Product Designer: experience, skills and selected projects.' },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: 'resume',
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
          path: 'resume',
          type: 'WebPage',
          name: COPY[lang].title,
          description: COPY[lang].description,
          crumbs: [{ name: COPY[lang].title, path: 'resume' }],
        })}
      />
      <ResumePageWrapper lang={lang} />
    </>
  )
}
