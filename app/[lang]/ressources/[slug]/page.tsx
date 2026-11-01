import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CATEGORY_LABELS } from '@/data/signalsData'
import { TEMPLATE_ENTRIES, findTemplateBySlug, templateBody, templatePath } from '@/data/templatesData'
import TemplateDetailPageWrapper from '@/components/page-wrappers/TemplateDetailPageWrapper'
import JsonLd from '@/components/JsonLd'
import { relatedContent } from '@/lib/related'
import { breadcrumbLd, buildMetadata, creativeWorkLd, toLang } from '@/lib/seo'

/**
 * The six templates, one address per language (/fr/ressources/cadrage-de-conception,
 * /en/ressources/design-scoping). A slug reached under the other language redirects in next.config.ts
 * (the [lang] layout sets dynamicParams to false, so only the listed addresses render).
 */

type Props = { params: Promise<{ lang: string; slug: string }> }

/** The day the templates moved from Notion to the site. */
const TEMPLATES_PUBLISHED = '2026-11-01'

export function generateStaticParams() {
  const langs = ['en', 'fr'] as const
  return langs.flatMap((lang) => TEMPLATE_ENTRIES.map((t) => ({ lang, slug: t.slug[lang] })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam, slug } = await params
  const lang = toLang(langParam)
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
