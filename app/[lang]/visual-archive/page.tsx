import type { Metadata } from 'next'
import VisualArchivePageWrapper from '@/components/page-wrappers/VisualArchivePageWrapper'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    robots: { index: false, follow: false },
    title: lang === 'fr' ? 'Archive visuelle' : 'Visual Archive',
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/visual-archive`,
      languages: { fr: 'https://www.victorsoussan.fr/fr/visual-archive', en: 'https://www.victorsoussan.fr/en/visual-archive' },
    },
  }
}

export default async function VisualArchivePage({ params }: Props) {
  const { lang } = await params
  return <VisualArchivePageWrapper lang={lang as 'en' | 'fr'} />
}
