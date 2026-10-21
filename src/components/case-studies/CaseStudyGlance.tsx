import type { Project } from '@/data/projectsData'

/**
 * Layer 1 of a case study: what a reader needs in under two minutes, built only from
 * the project data (summary, role, period, missions, deliverables). Server-renderable.
 */
export default function CaseStudyGlance({ project, lang }: { project: Project; lang: 'en' | 'fr' }) {
  const fr = lang === 'fr'
  return (
    <section aria-label={fr ? 'Aperçu du projet' : 'Project at a glance'} className="max-w-[740px] mx-auto px-6 pb-16 md:pb-24">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8">
        <p className="text-micro font-semibold uppercase tracking-widest text-gray-500 mb-4">
          {fr ? 'Aperçu' : 'At a glance'}
        </p>
        <p className="text-base leading-relaxed text-gray-600 mb-6">{project.summary}</p>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
          <div>
            <dt className="text-xs text-gray-500 mb-1">{fr ? 'Rôle' : 'Role'}</dt>
            <dd className="text-sm font-medium text-gray-900">{project.role}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500 mb-1">{fr ? 'Période' : 'Period'}</dt>
            <dd className="text-sm font-medium text-gray-900">{project.period}</dd>
          </div>
        </dl>

        {project.missions.length > 0 && (
          <div className="mb-6">
            <p className="text-xs text-gray-500 mb-2">{fr ? 'Ce que j’ai fait' : 'What I did'}</p>
            <ul className="space-y-2">
              {project.missions.map((mission) => (
                <li key={mission} className="text-sm leading-relaxed text-gray-600">
                  {mission}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.deliverables.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 mb-2">{fr ? 'Livrables' : 'Deliverables'}</p>
            <ul className="flex flex-wrap gap-2">
              {project.deliverables.map((item) => (
                <li key={item} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
