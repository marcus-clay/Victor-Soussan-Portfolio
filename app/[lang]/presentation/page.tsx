import type { Metadata } from 'next'
import PresentationPageWrapper from '@/components/page-wrappers/PresentationPageWrapper'
import { buildMetadata, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: 'presentation',
    title: lang === 'fr' ? 'Pr\u00e9sentation ex\u00e9cutive' : 'Executive Presentation',
    description: lang === 'fr'
      ? 'Pr\u00e9sentation ex\u00e9cutive de Victor Soussan, Lead Product Designer avec 15 ans d\u2019exp\u00e9rience.'
      : 'Executive presentation of Victor Soussan, Lead Product Designer with 15 years of experience.',
    noindex: true,
  })
}

export default async function PresentationPage({ params }: Props) {
  const lang = toLang((await params).lang)
  return <PresentationPageWrapper lang={lang} />
}
