import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CATEGORY_LABELS } from '@/data/signalsData'
import { TEMPLATE_ENTRIES, findTemplateBySlug, templatePath } from '@/data/templatesData'
import { DECK_ENTRIES, deckPath, findDeckBySlug } from '@/data/decksData'
import TemplateDetailPageWrapper from '@/components/page-wrappers/TemplateDetailPageWrapper'
import DeckDetailPageWrapper from '@/components/page-wrappers/DeckDetailPageWrapper'
import JsonLd from '@/components/JsonLd'
import { relatedContent } from '@/lib/related'
import { breadcrumbLd, buildMetadata, creativeWorkLd, toLang } from '@/lib/seo'

/**
 * The templates and the deck templates, one address per language (/fr/ressources/cadrage-de-conception,
 * /en/ressources/design-scoping, /fr/ressources/deck-revue-de-concept). A slug reached under the other language redirects in next.config.ts
 * (the [lang] layout sets dynamicParams to false, so only the listed addresses render).
 */

type Props = { params: Promise<{ lang: string; slug: string }> }

/** The day the templates moved from Notion to the site, and the day the decks were published. */
const TEMPLATES_PUBLISHED = '2026-11-01'
const DECKS_PUBLISHED = '2026-11-02'

export function generateStaticParams() {
  const langs = ['en', 'fr'] as const
  return langs.flatMap((lang) => [
    ...TEMPLATE_ENTRIES.map((t) => ({ lang, slug: t.slug[lang] })),
    ...DECK_ENTRIES.map((d) => ({ lang, slug: d.slug[lang] })),
  ])
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam, slug } = await params
  const lang = toLang(langParam)
  const deck = findDeckBySlug(slug)
  if (deck) {
    return buildMetadata({
      lang,
      path: deckPath(deck, lang),
      altPaths: { en: deckPath(deck, 'en'), fr: deckPath(deck, 'fr') },
      title: deck.seoTitle[lang],
      description: deck.seoDesc[lang],
      type: 'article',
      publishedTime: DECKS_PUBLISHED,
      section: CATEGORY_LABELS[deck.category][lang],
    })
  }
  const entry = findTemplateBySlug(slug)
  if (!entry) return { robots: { index: false, follow: false } }

  return buildMetadata({
    lang,
    path: templatePath(entry, lang),
    altPaths: { en: templatePath(entry, 'en'), fr: templatePath(entry, 'fr') },
    title: entry.seoTitle[lang],
    description: entry.seoDesc[lang],
    type: 'article',
    publishedTime: TEMPLATES_PUBLISHED,
    section: CATEGORY_LABELS[entry.category][lang],
  })
}

export default async function TemplatePage({ params }: Props) {
  const { lang: langParam, slug } = await params
  const lang = toLang(langParam)
  const deck = findDeckBySlug(slug)
  if (deck) {
    const dpath = deckPath(deck, lang)
    return (
      <>
        <JsonLd
          data={[
            creativeWorkLd({
              lang,
              path: dpath,
              name: deck.title[lang],
              description: deck.seoDesc[lang],
              datePublished: DECKS_PUBLISHED,
              genre: lang === 'fr' ? 'Modèle de présentation' : 'Presentation template',
            }),
            breadcrumbLd(lang, [
              { name: lang === 'fr' ? 'Ressources' : 'Resources', path: 'ressources' },
              { name: deck.title[lang], path: dpath },
            ]),
          ]}
        />
        <DeckDetailPageWrapper lang={lang} deckId={deck.id} related={relatedContent(lang, deck.id)} />
      </>
    )
  }
  const entry = findTemplateBySlug(slug)
  if (!entry) notFound()

  const path = templatePath(entry, lang)

  const title = entry.title[lang]

  return (
    <>
      <JsonLd
        data={[
          creativeWorkLd({
            lang,
            path,
            name: title,
            description: entry.seoDesc[lang],
            datePublished: TEMPLATES_PUBLISHED,
            genre: lang === 'fr' ? 'Modèle de document' : 'Document template',
          }),
          breadcrumbLd(lang, [
            { name: lang === 'fr' ? 'Ressources' : 'Resources', path: 'ressources' },
            { name: title, path },
          ]),
        ]}
      />
      <TemplateDetailPageWrapper lang={lang} templateId={entry.id} related={relatedContent(lang, entry.id)} />
    </>
  )
}
