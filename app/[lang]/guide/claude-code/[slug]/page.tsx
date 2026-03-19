import type { Metadata } from 'next'
import { GUIDE_CHAPTERS, GUIDE_META } from '@/data/guideClaudeCodeData'
import GuideClaudeCodePageWrapper from '@/components/page-wrappers/GuideClaudeCodePageWrapper'

type Props = { params: Promise<{ lang: string; slug: string }> }

export function generateStaticParams() {
  const langs = ['en', 'fr']
  return langs.flatMap((lang) =>
    GUIDE_CHAPTERS.map((ch) => ({ lang, slug: lang === 'fr' ? ch.slug_fr : ch.slug_en }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const l = (lang === 'fr' ? 'fr' : 'en') as 'en' | 'fr'
  const chapter = GUIDE_CHAPTERS.find((ch) => ch.slug_en === slug || ch.slug_fr === slug)
  const chapterTitle = chapter ? (l === 'fr' ? chapter.title_fr : chapter.title_en) : null
  const guideTitle = l === 'fr' ? GUIDE_META.title_fr : GUIDE_META.title_en
  const title = chapterTitle ? `${chapterTitle} - ${guideTitle}` : guideTitle
  const chapterIntro = chapter ? (l === 'fr' ? chapter.intro_fr : chapter.intro_en) : null
  const guideSubtitle = l === 'fr' ? GUIDE_META.subtitle_fr : GUIDE_META.subtitle_en
  return {
    title,
    description: chapterIntro || guideSubtitle,
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/guide/claude-code/${slug}`,
      languages: {
        fr: `https://www.victorsoussan.fr/fr/guide/claude-code/${chapter?.slug_fr ?? slug}`,
        en: `https://www.victorsoussan.fr/en/guide/claude-code/${chapter?.slug_en ?? slug}`,
      },
    },
  }
}

export default async function GuideChapterPage({ params }: Props) {
  const { lang: langParam, slug } = await params
  const lang = (langParam === 'fr' ? 'fr' : 'en') as 'en' | 'fr'
  const chapter = GUIDE_CHAPTERS.find((ch) => ch.slug_en === slug || ch.slug_fr === slug)

  if (!chapter) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Chapter not found</p>
      </div>
    )
  }

  return <GuideClaudeCodePageWrapper lang={lang} view={slug} />
}
