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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-3xl font-bold tracking-[-0.02em]">{GUIDE_META.title}</h1>
        <p className="mt-2 text-gray-400">{GUIDE_META.subtitle}</p>
        <nav className="mt-12 space-y-4">
          {GUIDE_CHAPTERS.map((ch) => (
            <Link
              key={ch.slug}
              href={`/${lang}/guide/claude-code/${ch.slug}`}
              className="block p-4 rounded-xl bg-[#1D1D1F] border border-white/5 hover:border-white/10 transition-colors"
            >
              <span className="text-sm text-gray-500">Chapitre {ch.number}</span>
              <h2 className="text-lg font-semibold mt-1">{ch.title}</h2>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">{ch.intro}</p>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
