import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CaseStudyPageWrapper from '@/components/page-wrappers/CaseStudyPageWrapper'
import JsonLd from '@/components/JsonLd'
import { getProjects } from '@/data/projectsData'
import { breadcrumbLd, buildMetadata, creativeWorkLd, toLang, type Lang } from '@/lib/seo'

const CASE_STUDY_IDS = ['toolkit', 'dailymotion', 'connect', 'sqool', 'sqool-classe', 'france-vae', 'pagesjaunes', 'androidwear', 'riskos'] as const
const SHORT_PROJECT_IDS = ['condamine-apps', 'design-system-figma-claude'] as const
const VIEW_MODES = ['summary', 'full', 'gallery'] as const

type Props = { params: Promise<{ lang: string; id: string; view: string }> }

export function generateStaticParams() {
  const langs = ['en', 'fr']
  const caseStudyParams = langs.flatMap((lang) =>
    CASE_STUDY_IDS.flatMap((id) => VIEW_MODES.map((view) => ({ lang, id, view })))
  )
  // Short projects only need 'summary' view
  const shortParams = langs.flatMap((lang) =>
    SHORT_PROJECT_IDS.map((id) => ({ lang, id, view: 'summary' }))
  )
  return [...caseStudyParams, ...shortParams]
}

const VIEW_TITLE: Record<Lang, Record<string, (name: string) => string>> = {
  en: {
    summary: (n) => `${n}, project overview`,
    full: (n) => `${n}: product design case study`,
    gallery: (n) => `${n}, project gallery`,
  },
  fr: {
    summary: (n) => `${n}, aper\u00e7u du projet`,
    full: (n) => `${n} : \u00e9tude de cas product design`,
    gallery: (n) => `${n}, galerie du projet`,
  },
}

const VIEW_DESC: Record<Lang, Record<string, (name: string, period: string, summary: string) => string>> = {
  en: {
    summary: (n, p, s) => `${s} ${n}, ${p}, by Victor Soussan.`,
    full: (n, p, s) => `Full case study of ${n} (${p}). ${s}`,
    gallery: (n, p, s) => `Screens and visuals from ${n} (${p}). ${s}`,
  },
  fr: {
    summary: (n, p, s) => `${s} ${n}, ${p}, par Victor Soussan.`,
    full: (n, p, s) => `\u00c9tude de cas compl\u00e8te de ${n} (${p}). ${s}`,
    gallery: (n, p, s) => `\u00c9crans et visuels de ${n} (${p}). ${s}`,
  },
}

function findProject(lang: Lang, id: string) {
  return getProjects(lang).find((p) => p.id === id)
}

function ogImageFor(id: string, cover: string | undefined) {
  if (id === 'riskos') return { url: '/images/riskos/02-case-detail.png', width: 1920, height: 1080 }
  // Large PNG covers exceed the 5 MB limit of several social networks: keep the default card for those.
  if (cover && /\.(webp|jpe?g)$/i.test(cover)) return { url: cover }
  return undefined
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam, id, view } = await params
  const lang = toLang(langParam)
  const project = findProject(lang, id)
  if (!project || !VIEW_TITLE[lang][view]) return { robots: { index: false, follow: false } }

  return buildMetadata({
    lang,
    path: `project/${id}/${view}`,
    title: VIEW_TITLE[lang][view](project.title),
    description: VIEW_DESC[lang][view](project.title, project.period, project.shortDescription || project.summary),
    noindex: view === 'gallery',
    image: ogImageFor(id, project.coverImage),
  })
}

export default async function ProjectPage({ params }: Props) {
  const { lang: langParam, id, view } = await params
  const lang = toLang(langParam)
  const project = findProject(lang, id)
  if (!project || !VIEW_TITLE[lang][view]) notFound()

  const year = project.period.match(/\d{4}/)?.[0]
  const name = VIEW_TITLE[lang][view](project.title)

  return (
    <>
      <JsonLd
        data={[
          creativeWorkLd({
            lang,
            path: `project/${id}/${view}`,
            name,
            description: project.shortDescription || project.summary,
            image: ogImageFor(id, project.coverImage)?.url ?? project.coverImage,
            datePublished: year ? `${year}-01-01` : undefined,
            genre: 'Product design',
          }),
          breadcrumbLd(lang, [
            { name: lang === 'fr' ? 'Projets' : 'Projects', path: 'projets' },
            { name: project.title, path: `project/${id}/summary` },
            ...(view === 'summary' ? [] : [{ name: VIEW_TITLE[lang][view](project.title), path: `project/${id}/${view}` }]),
          ]),
        ]}
      />
      <CaseStudyPageWrapper lang={lang} projectId={id} view={view} />
    </>
  )
}
