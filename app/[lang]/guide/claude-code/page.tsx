import type { Metadata } from 'next'
import Link from 'next/link'
import { GUIDE_CHAPTERS, GUIDE_META } from '@/data/guideClaudeCodeData'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: GUIDE_META.title,
    description: GUIDE_META.subtitle,
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/guide/claude-code`,
      languages: {
        fr: `https://www.victorsoussan.fr/fr/guide/claude-code`,
        en: `https://www.victorsoussan.fr/en/guide/claude-code`,
      },
    },
  }
}

export default async function GuideIndexPage({ params }: Props) {
  const { lang } = await params

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-3xl font-bold tracking-[-0.02em] text-gray-900">{GUIDE_META.title}</h1>
        <p className="mt-2 text-gray-600">{GUIDE_META.subtitle}</p>
        <nav className="mt-12 space-y-4">
          {GUIDE_CHAPTERS.map((ch) => (
            <Link
              key={ch.slug}
              href={`/${lang}/guide/claude-code/${ch.slug}`}
              className="block p-4 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <span className="text-sm text-gray-500">Chapter {ch.number}</span>
              <h2 className="text-lg font-semibold text-gray-900 mt-1">{ch.title}</h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{ch.intro}</p>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
