import type { Metadata } from 'next'
import ProjetsPageClient from '@/components/page-wrappers/ProjetsPageClient'
import JsonLd from '@/components/JsonLd'
import { getProjects } from '@/data/projectsData'
import { buildMetadata, itemListLd, pageLd, pageUrl, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

const COPY = {
  fr: { title: 'Projets', description: 'Études de cas et projets en design produit, design systems et prototypage assisté par IA.' },
  en: { title: 'Projects', description: 'Case studies and projects in product design, design systems, and AI-assisted prototyping.' },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: 'projets',
    title: COPY[lang].title,
    description: COPY[lang].description,
  })
}

export default async function Page({ params }: Props) {
  const lang = toLang((await params).lang)
  return (
    <>
      <JsonLd
        data={[...pageLd({
          lang,
          path: 'projets',
          type: 'CollectionPage',
          name: COPY[lang].title,
          description: COPY[lang].description,
          crumbs: [{ name: COPY[lang].title, path: 'projets' }],
        }),
        itemListLd(
          getProjects(lang).map((pr) => ({
            name: pr.title,
            url: pageUrl(lang, `project/${pr.id}`),
          }))
        )]}
      />
      <ProjetsPageClient lang={lang} />
    </>
  )
}
