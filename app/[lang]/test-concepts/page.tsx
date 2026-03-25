import type { Metadata } from 'next'
import ConceptsShowcase from '@/components/page-wrappers/ConceptsShowcase'

type Props = { params: Promise<{ lang: string }> }

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return { title: `Design Concepts – ${lang.toUpperCase()}` }
}

export default async function TestConceptsPage({ params }: Props) {
  const { lang } = await params
  return <ConceptsShowcase />
}
