import type { Metadata } from 'next'
import CaseStudyPageWrapper from '@/components/page-wrappers/CaseStudyPageWrapper'

const CASE_STUDY_IDS = ['toolkit', 'dailymotion', 'connect', 'sqool', 'sqool-classe', 'france-vae', 'pagesjaunes', 'androidwear'] as const
const SHORT_PROJECT_IDS = ['condamine-apps', 'design-system-figma-claude'] as const
const VIEW_MODES = ['summary', 'full', 'gallery'] as const

const PROJECT_NAMES: Record<string, string> = {
  toolkit: 'Toolkit',
  dailymotion: 'Dailymotion',
  connect: 'SQOOL Connect',
  sqool: 'SQOOL Suite',
  'sqool-classe': 'SQOOL Classe',
  'france-vae': 'France VAE',
  pagesjaunes: 'PagesJaunes',
  androidwear: 'Android Wear',
  'condamine-apps': 'Condamine Apps',
  'design-system-figma-claude': 'Design System with Claude Code',
}

const VIEW_LABELS: Record<string, string> = {
  summary: 'Overview',
  full: 'Case Study',
  gallery: 'Gallery',
}

type Props = { params: Promise<{ lang: string; id: string; view: string }> }

export function generateStaticParams() {
  const langs = ['en', 'fr']
  const caseStudyParams = langs.flatMap((lang) =>
    CASE_STUDY_IDS.flatMap((id) =>
      VIEW_MODES.map((view) => ({ lang, id, view }))
    )
  )
  // Short projects only need 'summary' view
  const shortParams = langs.flatMap((lang) =>
    SHORT_PROJECT_IDS.map((id) => ({ lang, id, view: 'summary' }))
  )
  return [...caseStudyParams, ...shortParams]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id, view } = await params
  const projectName = PROJECT_NAMES[id] || id
  const viewLabel = VIEW_LABELS[view] || view

  return {
    title: `${projectName} - ${viewLabel}`,
    description: `${projectName} project ${viewLabel.toLowerCase()} by Victor Soussan, Lead Product Designer.`,
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
  const { lang: langParam, id, view } = await params
  const lang = (langParam === 'fr' ? 'fr' : 'en') as 'en' | 'fr'

  return <CaseStudyPageWrapper lang={lang} projectId={id} view={view} />
}
