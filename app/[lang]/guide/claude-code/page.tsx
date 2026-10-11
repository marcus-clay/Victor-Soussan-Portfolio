import type { Metadata } from 'next'
import { GUIDE_CHAPTERS, GUIDE_META } from '@/data/guideClaudeCodeData'
import GuideClaudeCodePageWrapper from '@/components/page-wrappers/GuideClaudeCodePageWrapper'
import JsonLd from '@/components/JsonLd'
import { breadcrumbLd, buildMetadata, itemListLd, pageUrl, toLang, webPageLd } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

const DESC = {
  fr: 'Guide gratuit pour les designers : installer Claude Code, prototyper des interfaces, connecter Figma et d\u00e9ployer, en 9 chapitres.',
  en: 'Free guide for designers: set up Claude Code, prototype interfaces, connect Figma and deploy, in 9 chapters.',
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: 'guide/claude-code',
    title: lang === 'fr' ? `${GUIDE_META.title_fr}, guide pour designers` : `${GUIDE_META.title_en}, a guide for designers`,
    description: DESC[lang],
    type: 'article',
    publishedTime: GUIDE_META.date,
  })
}

export default async function GuideIndexPage({ params }: Props) {
  const lang = toLang((await params).lang)
  const title = lang === 'fr' ? GUIDE_META.title_fr : GUIDE_META.title_en

  return (
    <>
      <JsonLd
        data={[
          webPageLd({ lang, path: 'guide/claude-code', type: 'CollectionPage', name: title, description: DESC[lang], datePublished: GUIDE_META.date }),
          breadcrumbLd(lang, [
            { name: lang === 'fr' ? 'Ressources' : 'Resources', path: 'ressources' },
            { name: title, path: 'guide/claude-code' },
          ]),
          itemListLd(
            GUIDE_CHAPTERS.map((ch) => ({
              name: lang === 'fr' ? ch.title_fr : ch.title_en,
              url: pageUrl(lang, `guide/claude-code/${lang === 'fr' ? ch.slug_fr : ch.slug_en}`),
            }))
          ),
        ]}
      />
      <GuideClaudeCodePageWrapper lang={lang} view="index" />
    </>
  )
}
