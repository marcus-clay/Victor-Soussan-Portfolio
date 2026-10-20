import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CaseStudyPageWrapper from '@/components/page-wrappers/CaseStudyPageWrapper'
import JsonLd from '@/components/JsonLd'
import { CASE_STUDY_IDS, PROJECT_DESC, PROJECT_TITLE, SHORT_PROJECT_IDS, findProject, ogImageFor } from '@/lib/projectMeta'
import { breadcrumbLd, buildMetadata, creativeWorkLd, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string; id: string }> }

export function generateStaticParams() {
  return ['en', 'fr'].flatMap((lang) => [...CASE_STUDY_IDS, ...SHORT_PROJECT_IDS].map((id) => ({ lang, id })))
}

/** One canonical URL per project: the full case study, or the project page for short formats. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam, id } = await params
  const lang = toLang(langParam)
  const project = findProject(lang, id)
  if (!project) return { robots: { index: false, follow: false } }

  const kind = project.format === 'case-study' ? 'caseStudy' : 'short'
  return buildMetadata({
    lang,
    path: `project/${id}`,
    title: PROJECT_TITLE[lang][kind](project.title),
    description: PROJECT_DESC[lang][kind](project.title, project.period, project.shortDescription || project.summary),
    image: ogImageFor(id, project.coverImage),
  })
}

export default async function ProjectPage({ params }: Props) {
  const { lang: langParam, id } = await params
  const lang = toLang(langParam)
  const project = findProject(lang, id)
  if (!project) notFound()

  const kind = project.format === 'case-study' ? 'caseStudy' : 'short'
  const year = project.period.match(/\d{4}/)?.[0]

  return (
    <>
      <JsonLd
        data={[
          creativeWorkLd({
            lang,
            path: `project/${id}`,
            name: PROJECT_TITLE[lang][kind](project.title),
            description: project.shortDescription || project.summary,
            image: ogImageFor(id, project.coverImage)?.url ?? project.coverImage,
            datePublished: year ? `${year}-01-01` : undefined,
            genre: 'Product design',
          }),
          breadcrumbLd(lang, [
            { name: lang === 'fr' ? 'Projets' : 'Projects', path: 'projets' },
            { name: project.title, path: `project/${id}` },
          ]),
        ]}
      />
      <CaseStudyPageWrapper lang={lang} projectId={id} view={kind === 'caseStudy' ? 'full' : 'summary'} />
    </>
  )
}
