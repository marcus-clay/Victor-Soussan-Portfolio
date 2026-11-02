import type { Metadata } from 'next'
import SkillsCataloguePageClient from '@/components/page-wrappers/SkillsCataloguePageClient'
import JsonLd from '@/components/JsonLd'
import { SKILLS } from '@/data/skillsCatalogue'
import { buildMetadata, itemListLd, pageLd, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

const COPY = {
  fr: {
    title: 'Catalogue de skills Claude pour le design',
    description: 'Skills pour Claude et Codex autour du produit, du design, du prototypage et de l’animation : bénéfices, résultat attendu et recherche pour filtrer.',
  },
  en: {
    title: 'Claude skills catalogue for design',
    description: 'Skills for Claude and Codex around product, design, prototyping and animation: each with its benefits and its outcome, and a search to filter them.',
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({ lang, path: 'skills', title: COPY[lang].title, description: COPY[lang].description })
}

export default async function Page({ params }: Props) {
  const lang = toLang((await params).lang)
  return (
    <>
      <JsonLd
        data={[
          ...pageLd({
            lang,
            path: 'skills',
            type: 'CollectionPage',
            name: COPY[lang].title,
            description: COPY[lang].description,
            crumbs: [
              { name: 'Claude', path: 'claude' },
              { name: COPY[lang].title, path: 'skills' },
            ],
          }),
          itemListLd(SKILLS.map((s) => ({ name: s.name, url: s.href }))),
        ]}
      />
      <SkillsCataloguePageClient lang={lang} />
    </>
  )
}
