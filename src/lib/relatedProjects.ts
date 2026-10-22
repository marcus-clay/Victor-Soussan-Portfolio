import { getProjectTags } from '@/data/projectTags'
import type { Project } from '@/data/projectsData'
import type { RelatedItem } from '@/components/RelatedContent'

const coverSrc = (project: Project) =>
  project.coverImage.startsWith('/') ? project.coverImage : `/images/${project.coverImage}`

/**
 * Follow-up of a case study or a short project: the next case study first (in the order of
 * the projects page, looping at the end), then two others, preferring the same category.
 * Three cards at most. `nextLabel` is TRANSLATIONS[lang].related.next_project.
 */
export function relatedProjects(
  lang: 'en' | 'fr',
  projects: Project[],
  currentId: string,
  nextLabel: string,
): RelatedItem[] {
  const studies = projects.filter((p) => p.format === 'case-study')
  const index = studies.findIndex((p) => p.id === currentId)
  const current = projects.find((p) => p.id === currentId)

  // A short project has no "next": the case studies of the same category lead.
  const next = index === -1 ? null : studies[(index + 1) % studies.length]
  const rest = studies.filter((p) => p.id !== currentId && p.id !== next?.id)
  const sameCategoryFirst = [...rest].sort(
    (a, b) => Number(b.category === current?.category) - Number(a.category === current?.category),
  )
  const picks = next ? [next, ...sameCategoryFirst.slice(0, 2)] : sameCategoryFirst.slice(0, 3)

  return picks.map((project) => ({
    href: `/${lang}/project/${project.id}`,
    title: project.title,
    label: project === next ? nextLabel : getProjectTags(project.id, lang).join(' · ') || project.role,
    description: project.summary,
    cover: { src: coverSrc(project) },
  }))
}
