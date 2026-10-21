import type { Metadata } from 'next'
import ResumePageWrapper from '@/components/page-wrappers/ResumePageWrapper'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, pageLd, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

const COPY = {
  fr: { title: 'CV Lead Product Designer B2B et B2G', description: 'CV de Victor Soussan, Lead Product Designer avec 15 ans d’expérience, spécialiste du product design B2B et B2G en France : parcours, compétences et projets.' },
  en: { title: 'Lead Product Designer resume, B2B and B2G', description: 'Resume of Victor Soussan, Lead Product Designer with 15 years of experience in B2B and B2G product design in France: career, skills and projects.' },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: 'resume',
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
