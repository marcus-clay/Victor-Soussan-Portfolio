import type { Metadata } from 'next'
import RessourcesPageClient from '@/components/page-wrappers/RessourcesPageClient'
import JsonLd from '@/components/JsonLd'
import { getGuides } from '@/data/contentData'
import { TEMPLATE_ENTRIES, templatePath } from '@/data/templatesData'
import { buildMetadata, itemListLd, pageLd, pageUrl, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

const COPY = {
  fr: { title: 'Guides et modèles pour le product design', description: 'Guides pas à pas et modèles de documents tirés de la pratique de Victor Soussan, Lead Product Designer\u00a0: cadrage, rituels, checklists, Figma, Claude Code.' },
  en: { title: 'Guides and templates for product design', description: 'Step-by-step guides and document templates from the practice of Victor Soussan, Lead Product Designer: scoping, rituals, checklists, Figma, Claude Code.' },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: 'ressources',
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
          path: 'ressources',
          type: 'CollectionPage',
          name: COPY[lang].title,
          description: COPY[lang].description,
          crumbs: [{ name: COPY[lang].title, path: 'ressources' }],
        }),
        itemListLd([
          ...getGuides().map((g) => ({
            name: lang === 'fr' ? g.title_fr : g.title_en,
            url: pageUrl(lang, g.id === 'guide-ship-to-show' ? 'guide/ship-to-show' : 'guide/claude-code'),
          })),
          ...TEMPLATE_ENTRIES.map((t) => ({ name: t.title[lang], url: pageUrl(lang, templatePath(t, lang)) })),
        ])]}
      />
      <RessourcesPageClient lang={lang} />
    </>
  )
}
