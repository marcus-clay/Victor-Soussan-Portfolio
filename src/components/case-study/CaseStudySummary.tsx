import type { ReactNode } from 'react'

export interface SummaryItem {
  title: string
  detail?: string
}

export interface SummaryMetric {
  value: string
  label: string
}

interface CaseStudySummaryProps {
  lang: 'en' | 'fr'
  /** Two to four sentences: why the project existed */
  context: string
  /** Two to four sentences: my role and the team around it */
  role: string
  /** Optional short role list (label and detail) shown under the role paragraph */
  roleItems?: SummaryItem[]
  /** Four to six deliverables: a title and an optional detail line each */
  deliverables: SummaryItem[]
  /** Optional: up to three sourced numbers, shown as one strip under the columns */
  metrics?: SummaryMetric[]
}

const COPY = {
  en: { summary: 'Summary', context: 'Context', role: 'My role', deliverables: 'Deliverables' },
  fr: { summary: 'Synthèse', context: 'Contexte', role: 'Mon rôle', deliverables: 'Réalisations et livrables' },
} as const

/**
 * The case study in one screen, right after the hero and the client testimonial: context,
 * role and deliverables as three equal columns (similarity, common region), then the sourced
 * numbers. The narration below goes deeper; nothing here is repeated word for word there.
 */
/** One row of the fact sheet: the term on the left, its content on the right (proximity, one reading axis). */
function Row({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-y-3 py-6 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-x-8 md:py-8">
      <dt className="border-t border-gray-200 pt-3 text-sm font-medium text-gray-900 md:pt-4">{term}</dt>
      <dd className="m-0 min-w-0">{children}</dd>
    </div>
  )
}

/**
 * The case study as a fact sheet, right after the hero and the client testimonial: one reading
 * axis, a narrow label column and one 62ch text column, rows separated by hairlines, then the
 * sourced numbers at the same width. The narration below goes deeper; nothing here is repeated
 * word for word there.
 */
export default function CaseStudySummary({ lang, context, role, roleItems, deliverables, metrics }: CaseStudySummaryProps) {
  const t = COPY[lang]
  return (
    <section id="summary" aria-labelledby="summary-title" className="pb-16 md:pb-28">
      <div className="wrap" aria-hidden="true">
        <div className="border-t border-gray-100" />
      </div>
      <div className="act-wide pt-9 md:pt-14">
        <h2 id="summary-title" className="text-subhead text-gray-900 mb-8 md:mb-10">
          {t.summary}
        </h2>

        <div className="md:max-w-[52rem]">
          <dl className="m-0">
            <Row term={t.context}>
              <p className="max-w-[62ch] text-base text-gray-600">{context}</p>
            </Row>

            <Row term={t.role}>
              <p className="max-w-[62ch] text-base text-gray-600">{role}</p>
              {roleItems && roleItems.length > 0 && (
                <ul className="mt-5 max-w-[62ch] space-y-2">
                  {roleItems.map((item) => (
                    <li key={item.title} className="flex items-baseline justify-between gap-4 text-sm">
                      <span className="font-medium text-gray-900">{item.title}</span>
                      {item.detail && <span className="text-right text-gray-500">{item.detail}</span>}
                    </li>
                  ))}
                </ul>
              )}
            </Row>

            <Row term={t.deliverables}>
              <ul className="max-w-[62ch] space-y-4">
                {deliverables.map((item) => (
                  <li key={item.title}>
                    <p className="text-base font-medium text-gray-900">{item.title}</p>
                    {item.detail && <p className="mt-1 text-sm text-gray-600">{item.detail}</p>}
                  </li>
                ))}
              </ul>
            </Row>
          </dl>

          {metrics && metrics.length > 0 && (
            <dl
              className="m-0 mt-10 grid gap-px overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 md:mt-12"
              style={{ gridTemplateColumns: `repeat(${Math.min(metrics.length, 3)}, minmax(0, 1fr))` }}
            >
              {metrics.slice(0, 3).map((m) => (
                <div key={m.label} className="bg-[#FDFDFC] px-4 py-5 md:px-6 md:py-7">
                  <dd className="m-0 text-title-1 tabular-nums text-gray-900">{m.value}</dd>
                  <dt className="mt-2 max-w-[22ch] text-sm text-gray-500">{m.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  )
}
