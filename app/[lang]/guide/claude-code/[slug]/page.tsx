import type { Metadata } from 'next'
import { GUIDE_CHAPTERS, GUIDE_META } from '@/data/guideClaudeCodeData'
import GuideClaudeCodePageWrapper from '@/components/page-wrappers/GuideClaudeCodePageWrapper'

type Props = { params: Promise<{ lang: string; slug: string }> }

export function generateStaticParams() {
  const langs = ['en', 'fr']
  return langs.flatMap((lang) =>
    GUIDE_CHAPTERS.map((ch) => ({ lang, slug: ch.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const chapter = GUIDE_CHAPTERS.find((ch) => ch.slug === slug)
  const title = chapter
    ? `${chapter.title} - ${GUIDE_META.title}`
    : GUIDE_META.title
  return {
    title,
    description: chapter?.intro || GUIDE_META.subtitle,
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/guide/claude-code/${slug}`,
      languages: {
        fr: `https://www.victorsoussan.fr/fr/guide/claude-code/${slug}`,
        en: `https://www.victorsoussan.fr/en/guide/claude-code/${slug}`,
      },
    },
  }
}

export default async function GuideChapterPage({ params }: Props) {
  const { lang: langParam, slug } = await params
  const lang = (langParam === 'fr' ? 'fr' : 'en') as 'en' | 'fr'
  const chapter = GUIDE_CHAPTERS.find((ch) => ch.slug === slug)

  if (!chapter) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Chapter not found</p>
      </div>
    )
  }

  return <GuideClaudeCodePageWrapper lang={lang} view={slug} />
}
