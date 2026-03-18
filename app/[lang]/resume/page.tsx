import type { Metadata } from 'next'
import ResumePageWrapper from '@/components/page-wrappers/ResumePageWrapper'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'fr' ? 'CV' : 'Resume',
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/resume`,
      languages: { fr: 'https://www.victorsoussan.fr/fr/resume', en: 'https://www.victorsoussan.fr/en/resume' },
    },
  }
}

export default async function ResumePage({ params }: Props) {
  const { lang } = await params
  return <ResumePageWrapper lang={lang as 'en' | 'fr'} />
}
