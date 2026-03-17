import type { Metadata } from 'next'
import { GUIDE_CHAPTERS, GUIDE_META } from '@/data/guideClaudeCodeData'

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
  const { slug } = await params
  const chapter = GUIDE_CHAPTERS.find((ch) => ch.slug === slug)
  if (!chapter) return <div>Chapter not found</div>

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <p className="text-sm text-gray-500 mb-4">
          {GUIDE_META.title} &middot; Chapitre {chapter.number}
        </p>
        <h1 className="text-3xl font-bold tracking-[-0.02em]">{chapter.title}</h1>
        <p className="mt-4 text-gray-400 leading-relaxed">{chapter.intro}</p>
        <p className="mt-8 text-gray-500">Migration in progress</p>
      </div>
    </div>
  )
}
