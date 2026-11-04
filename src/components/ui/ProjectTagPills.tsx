import { getProjectTags } from '@/data/projectTags'

const LABEL = { en: 'Sector and type', fr: 'Secteur et type' } as const

/**
 * The sector and the type of a project as outlined pills: on the covers of the home carousel and in the hero of each case
 * study, so the same words read the same way in both places. `light` is for light text on a photograph or a dark ground.
 * Nothing is drawn for a project without tags.
 */
export default function ProjectTagPills({
  projectId,
  lang,
  light = false,
  className = '',
}: {
  projectId: string
  lang: 'en' | 'fr'
  light?: boolean
  className?: string
}) {
  const tags = getProjectTags(projectId, lang)
  if (!tags.length) return null
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label={LABEL[lang]}>
      {tags.map((tag) => (
        <li
          key={tag}
          className={`inline-flex min-h-8 items-center rounded-full border px-3 text-micro uppercase tracking-[0.08em] ${
            light ? 'border-white/40 text-white/90' : 'border-gray-900/20 text-gray-700'
          }`}
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}
