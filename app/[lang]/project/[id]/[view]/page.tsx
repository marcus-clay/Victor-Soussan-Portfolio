import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CaseStudyPageWrapper from '@/components/page-wrappers/CaseStudyPageWrapper'
import JsonLd from '@/components/JsonLd'
import { CASE_STUDY_IDS, PROJECT_DESC, PROJECT_TITLE, findProject, ogImageFor } from '@/lib/projectMeta'
import { breadcrumbLd, buildMetadata, creativeWorkLd, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string; id: string; view: string }> }

/**
 * Only the gallery lives under /project/[id]/[view]. It stays reachable for existing links but is noindex:
 * the canonical page of a project is /project/[id]. /summary and /full redirect there (see next.config.ts).
 */
export function generateStaticParams() {
  return ['en', 'fr'].flatMap((lang) => CASE_STUDY_IDS.map((id) => ({ lang, id, view: 'gallery' })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam, id, view } = await params
  const lang = toLang(langParam)
  const project = findProject(lang, id)
  if (!project || view !== 'gallery') return { robots: { index: false, follow: false } }

  return buildMetadata({
    lang,
    path: `project/${id}/gallery`,
    title: PROJECT_TITLE[lang].gallery(project.title),
    description: PROJECT_DESC[lang].gallery(project.title, project.period, project.shortDescription || project.summary),
    noindex: true,
    image: ogImageFor(id, project.coverImage),
  })
}

export default async function ProjectGalleryPage({ params }: Props) {
  const { lang: langParam, id, view } = await params
  const lang = toLang(langParam)
  const project = findProject(lang, id)
  if (!project || project.format !== 'case-study' || view !== 'gallery') notFound()

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(lang, [
            { name: lang === 'fr' ? 'Projets' : 'Projects', path: 'projets' },
            { name: project.title, path: `project/${id}` },
            { name: PROJECT_TITLE[lang].gallery(project.title), path: `project/${id}/gallery` },
          ]),
        ]}
      />
      <CaseStudyPageWrapper lang={lang} projectId={id} view="gallery" />
    </>
  )
}
