import type { Metadata } from 'next'
import ConceptsShowcase from '@/components/page-wrappers/ConceptsShowcase'
import { buildMetadata, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: 'test-concepts',
    title: 'Design Concepts',
    description: 'Internal design concept showcase.',
    noindex: true,
  })
}

export default async function TestConceptsPage() {
  return <ConceptsShowcase />
}
