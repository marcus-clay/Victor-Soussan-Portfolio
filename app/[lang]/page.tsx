import type { Metadata } from 'next'
import HomepageClient from '@/components/page-wrappers/HomepageClient'
import JsonLd from '@/components/JsonLd'
import { PERSON_ID, buildMetadata, pageLd, toLang } from '@/lib/seo'

type Props = {
  params: Promise<{ lang: string }>
}

const COPY = {
  fr: {
    title: 'Victor Soussan | Lead Product Designer, IA, B2B et B2G',
    description: 'Lead Product Designer en France, 15 ans d\u2019exp\u00e9rience. Je con\u00e7ois des produits B2B et B2G avec l\u2019IA\u00a0: design, gestion de projet et d\u00e9veloppement front.',
  },
  en: {
    title: 'Victor Soussan | Lead Product Designer, AI, B2B and B2G',
    description: 'Lead Product Designer in France, 15 years of experience. I design B2B and B2G products with AI across design, project management and front-end development.',
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
