import type { Metadata } from 'next'
import { GUIDE_META } from '@/data/guideClaudeCodeData'
import GuideClaudeCodePageWrapper from '@/components/page-wrappers/GuideClaudeCodePageWrapper'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'fr' ? GUIDE_META.title_fr : GUIDE_META.title_en,
    description: lang === 'fr' ? GUIDE_META.subtitle_fr : GUIDE_META.subtitle_en,
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
  const { lang: langParam } = await params
  const lang = (langParam === 'fr' ? 'fr' : 'en') as 'en' | 'fr'

  return <GuideClaudeCodePageWrapper lang={lang} view="index" />
}
