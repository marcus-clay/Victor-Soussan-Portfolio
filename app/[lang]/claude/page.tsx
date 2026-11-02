import type { Metadata } from 'next'
import ClaudePageClient from '@/components/page-wrappers/ClaudePageClient'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, pageLd, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

const COPY = {
  fr: {
    title: 'Claude, Claude Code et skills pour designers',
    description: 'Mon expérience de la conception avec des agents, un guide pour démarrer et des skills en libre accès, à transmettre à vos pairs et aux débutants.',
  },
  en: {
    title: 'Claude, Claude Code and skills for designers',
    description: 'My experience of designing with agents, a guide to get started and skills free to use, to pass on to your peers and to anyone starting with Claude.',
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({ lang, path: 'claude', title: COPY[lang].title, description: COPY[lang].description })
}

export default async function Page({ params }: Props) {
  const lang = toLang((await params).lang)
  return (
    <>
      <JsonLd
        data={pageLd({
          lang,
          path: 'claude',
          type: 'CollectionPage',
          name: COPY[lang].title,
          description: COPY[lang].description,
          crumbs: [{ name: 'Claude', path: 'claude' }],
        })}
      />
      <ClaudePageClient lang={lang} />
    </>
  )
}
