import type { Metadata } from 'next'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = langParam === 'fr' ? 'fr' : 'en'
  const description = lang === 'fr'
    ? 'Senior Product Design Lead avec 15+ ans d\'experience. Specialise en Design System, UX Research, et transformation digitale.'
    : 'Senior Product Design Lead with 15+ years of experience. Specialized in Design Systems, UX Research, and digital transformation.'

  return {
    title: { absolute: 'Victor Soussan | Product Design Lead' },
    description,
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}`,
      languages: {
        'fr': 'https://www.victorsoussan.fr/fr',
        'en': 'https://www.victorsoussan.fr/en',
      },
    },
  }
}

export default async function HomePage({ params }: Props) {
  const { lang: langParam } = await params
  const lang = langParam === 'fr' ? 'fr' : 'en'

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold tracking-[-0.03em] mb-6 text-gray-900">
          Victor Soussan
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          {lang === 'fr'
            ? 'Product Design Lead, 15+ ans'
            : 'Product Design Lead, 15+ years'}
        </p>
        <p className="text-gray-500">
          {lang === 'fr'
            ? 'Migration Next.js en cours. Les sections homepage arrivent ici.'
            : 'Next.js migration in progress. Homepage sections coming here.'}
        </p>
      </div>
    </div>
  )
}
