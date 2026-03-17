import type { Metadata } from 'next'

const PROJECT_IDS = ['toolkit', 'dailymotion', 'connect', 'sqool', 'sqool-classe', 'france-vae', 'pagesjaunes', 'androidwear'] as const
const VIEW_MODES = ['summary', 'full', 'gallery'] as const

type Props = { params: Promise<{ lang: string; id: string; view: string }> }

export function generateStaticParams() {
  const langs = ['en', 'fr']
  return langs.flatMap((lang) =>
    PROJECT_IDS.flatMap((id) =>
      VIEW_MODES.map((view) => ({ lang, id, view }))
    )
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id, view } = await params
  const projectName = id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  return {
    title: `${projectName} - ${view}`,
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/project/${id}/${view}`,
      languages: {
        fr: `https://www.victorsoussan.fr/fr/project/${id}/${view}`,
        en: `https://www.victorsoussan.fr/en/project/${id}/${view}`,
      },
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { id, view } = await params
  const projectName = id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-3xl font-bold tracking-[-0.02em]">{projectName}</h1>
        <p className="mt-2 text-gray-400 capitalize">{view}</p>
        <p className="mt-4 text-gray-500">Migration in progress</p>
      </div>
    </div>
  )
}
