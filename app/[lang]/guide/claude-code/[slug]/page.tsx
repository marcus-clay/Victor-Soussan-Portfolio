import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { GUIDE_CHAPTERS, GUIDE_META } from '@/data/guideClaudeCodeData'
import { GUIDE_SLUG_PAIRS } from '@/data/guideSlugs'
import GuideClaudeCodePageWrapper from '@/components/page-wrappers/GuideClaudeCodePageWrapper'
import JsonLd from '@/components/JsonLd'
import { guideChapterLead, relatedContent } from '@/lib/related'
import { articleLd, breadcrumbLd, buildMetadata, clip, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string; slug: string }> }

export function generateStaticParams() {
  // The header's language switch reads its own small copy of the slugs: fail the build if it drifts
  const drift = GUIDE_CHAPTERS.some((ch, i) => GUIDE_SLUG_PAIRS[i]?.[0] !== ch.slug_en || GUIDE_SLUG_PAIRS[i]?.[1] !== ch.slug_fr)
  if (drift || GUIDE_SLUG_PAIRS.length !== GUIDE_CHAPTERS.length) throw new Error('src/data/guideSlugs.ts no longer matches GUIDE_CHAPTERS')
  const langs = ['en', 'fr']
  return langs.flatMap((lang) =>
    GUIDE_CHAPTERS.map((ch) => ({ lang, slug: lang === 'fr' ? ch.slug_fr : ch.slug_en }))
  )
}

const findChapter = (slug: string) => GUIDE_CHAPTERS.find((ch) => ch.slug_en === slug || ch.slug_fr === slug)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam, slug } = await params
  const lang = toLang(langParam)
  const chapter = findChapter(slug)
  if (!chapter) return { robots: { index: false, follow: false } }

  const guideTitle = lang === 'fr' ? GUIDE_META.title_fr : GUIDE_META.title_en
  const chapterTitle = lang === 'fr' ? chapter.title_fr : chapter.title_en
  return buildMetadata({
    lang,
    path: `guide/claude-code/${lang === 'fr' ? chapter.slug_fr : chapter.slug_en}`,
    altPaths: {
      fr: `guide/claude-code/${chapter.slug_fr}`,
      en: `guide/claude-code/${chapter.slug_en}`,
    },
    // Short suffix keeps the chapter title whole inside the SEO budget; skipped when the chapter already names Claude Code.
    title: chapterTitle.includes('Claude Code') ? chapterTitle : `${chapterTitle} | Claude Code`,
    description: `${lang === 'fr' ? chapter.intro_fr : chapter.intro_en} ${lang === 'fr' ? 'Guide Claude Code pour product designers, par Victor Soussan.' : 'Claude Code guide for product designers, by Victor Soussan.'}`,
    type: 'article',
    publishedTime: GUIDE_META.date,
    section: guideTitle,
  })
}

export default async function GuideChapterPage({ params }: Props) {
  const { lang: langParam, slug } = await params
  const lang = toLang(langParam)
  const chapter = findChapter(slug)
  if (!chapter) notFound()

  const guideTitle = lang === 'fr' ? GUIDE_META.title_fr : GUIDE_META.title_en
  const chapterTitle = lang === 'fr' ? chapter.title_fr : chapter.title_en
  const path = `guide/claude-code/${lang === 'fr' ? chapter.slug_fr : chapter.slug_en}`
  // A chapter reached under the other language's slug moves to its own address (one URL per page)
  if (slug !== (lang === 'fr' ? chapter.slug_fr : chapter.slug_en)) permanentRedirect(`/${lang}/${path}`)
  const words = chapter.sections
    .map((s) => (lang === 'fr' ? s.content_fr : s.content_en))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length

  return (
    <>
      <JsonLd
        data={[
          articleLd({
            lang,
            path,
            type: 'TechArticle',
            headline: `${chapterTitle} | ${guideTitle}`,
            description: clip(lang === 'fr' ? chapter.intro_fr : chapter.intro_en, 158),
            datePublished: GUIDE_META.date,
            section: guideTitle,
            wordCount: words,
            keywords: ['Claude Code', 'Figma', 'Product Design', 'AI prototyping'],
          }),
          breadcrumbLd(lang, [
            { name: lang === 'fr' ? 'Ressources' : 'Resources', path: 'ressources' },
            { name: guideTitle, path: 'guide/claude-code' },
            { name: chapterTitle, path },
          ]),
        ]}
      />
      <GuideClaudeCodePageWrapper
        lang={lang}
        view={slug}
        related={relatedContent(lang, 'guide-claude-code', guideChapterLead(lang, GUIDE_CHAPTERS.indexOf(chapter)))}
      />
    </>
  )
}
