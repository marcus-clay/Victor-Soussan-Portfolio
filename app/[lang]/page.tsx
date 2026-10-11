import type { Metadata } from 'next'
import HomepageClient from '@/components/page-wrappers/HomepageClient'
import JsonLd from '@/components/JsonLd'
import { PERSON_ID, buildMetadata, pageLd, toLang } from '@/lib/seo'

type Props = {
  params: Promise<{ lang: string }>
}

const COPY = {
  fr: {
    title: 'Victor Soussan | Lead Product Designer B2B et B2G, France',
    description: 'Lead Product Designer avec 15 ans d\u2019exp\u00e9rience, sp\u00e9cialiste du product design B2B et B2G en France. Design systems, interfaces m\u00e9tier, prototypage IA.',
  },
  en: {
    title: 'Victor Soussan | Lead Product Designer, B2B and B2G, France',
    description: 'Lead Product Designer with 15 years of experience, specialist in B2B and B2G product design in France. Design systems, business interfaces, AI prototyping.',
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: '',
    title: COPY[lang].title,
    absoluteTitle: true,
    description: COPY[lang].description,
  })
}

export default async function HomePage({ params }: Props) {
  const lang = toLang((await params).lang)

  return (
    <>
      <JsonLd
        data={pageLd({
          lang,
          path: '',
          type: 'ProfilePage',
          name: COPY[lang].title,
          description: COPY[lang].description,
          mainEntity: { '@id': PERSON_ID },
        })}
      />
      <HomepageClient lang={lang} />
    </>
  )
}
