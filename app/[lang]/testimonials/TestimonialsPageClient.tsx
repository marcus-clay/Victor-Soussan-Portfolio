'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { ActRule } from '@/components/case-study/ActSection'
import RelatedContent, { type RelatedItem } from '@/components/RelatedContent'
import { getTestimonials, type Category } from '@/data/testimonialsData'
import { TRANSLATIONS } from '@/data/translations'
import CategoryFilter, { type FilterOption } from '@/components/testimonials/CategoryFilter'
import FeaturedQuote from '@/components/testimonials/FeaturedQuote'
import QuoteCard from '@/components/testimonials/QuoteCard'

/** Strongest testimonial, shown at display scale (verbatim lead sentences, rest on demand). */
const FEATURED_ID = 'pierre-marie-nigay'

/** Testimonials whose author worked on a published case study. */
const CASE_STUDIES: Record<string, { id: string; name: string }> = {
  'pierre-marie-nigay': { id: 'toolkit', name: 'Toolkit' },
}

const FILTER_ORDER: Category[] = ['All', 'Clients', 'Management', 'Design', 'Product & Tech']

export default function TestimonialsPageClient({ lang }: { lang: 'en' | 'fr' }) {
  const testimonials = getTestimonials(lang)
  const t = TRANSLATIONS[lang].testimonials
  const [category, setCategory] = useState<Category>('All')
  // On load the whole page fades in (template.tsx). After the first filter change, the
  // swapped content fades in with the same `.page-in`.
  const [touched, setTouched] = useState(false)

  const options: FilterOption[] = useMemo(() => {
    const labelFor: Record<Category, string> = {
      All: t.filter_all,
      Clients: t.filter_clients,
      Management: t.filter_management,
      Design: t.filter_design,
      'Product & Tech': t.filter_product,
    }
    return FILTER_ORDER.map((value) => ({
      value,
      label: labelFor[value],
      count: value === 'All' ? testimonials.length : testimonials.filter((x) => x.category === value).length,
    }))
  }, [t, testimonials])

  const visible = testimonials.filter((x) => category === 'All' || x.category === category)
  const featured = visible.find((x) => x.id === FEATURED_ID)
  const others = visible.filter((x) => x.id !== FEATURED_ID)
  const countLabel = (visible.length === 1 ? t.count_one : t.count_other).replace('{n}', String(visible.length))
  const caseStudy = featured ? CASE_STUDIES[featured.id] : undefined

  const related: RelatedItem[] = [
    { title: t.crosslink_approach_title, description: t.crosslink_approach_desc, href: `/${lang}/approche` },
    { title: t.crosslink_projects_title, description: t.crosslink_projects_desc, href: `/${lang}/projets` },
  ]

  const handleFilter = (value: Category) => {
    if (value === category) return
    setTouched(true)
    setCategory(value)
  }

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      {/* En-tête : nom de la page et une ligne, pleine largeur, aligné à gauche */}
      <header className="wrap pt-10 md:pt-16 pb-12 md:pb-16">
        <h1 className="text-display text-gray-900">
          {t.title}
        </h1>
        <p className="mt-6 md:mt-8 text-lead-lg text-gray-600 max-w-[54ch]">
          {t.subtitle}
        </p>
      </header>

      {/* Filtre, citation mise en avant et grille : un seul groupe, un seul bord gauche */}
      <section className="wrap pb-16 md:pb-24" aria-label={t.title}>
        {/* Le compteur est annoncé à chaque changement de filtre */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CategoryFilter
            options={options}
            value={category}
            onChange={handleFilter}
            label={t.filters_label}
          />
          <p aria-live="polite" className="text-sm tabular-nums text-gray-500">
            {countLabel}
          </p>
        </div>

        {featured && (
          <div
            key={`featured-${category}`}
            className={`mt-10 md:mt-14 ${touched ? 'page-in' : ''}`}
            role="group"
            aria-label={featured.author}
          >
            <FeaturedQuote
              item={featured}
              caseStudyHref={caseStudy ? `/${lang}/project/${caseStudy.id}` : undefined}
              labels={{
                readFull: t.read_full,
                readLess: t.read_less,
                linkedinProfile: t.linkedin_profile,
                caseStudyLink: caseStudy ? t.case_study_link.replace('{name}', caseStudy.name) : undefined,
              }}
            />
          </div>
        )}

        {others.length > 0 && (
          <div
            key={`grid-${category}`}
            className={`${featured ? 'mt-14 md:mt-16' : 'mt-10 md:mt-14'} ${touched ? 'page-in' : ''}`}
          >
            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {others.map((item) => (
                <QuoteCard
                  key={item.id}
                  item={item}
                  labels={{
                    readMore: t.read_more,
                    readLess: t.read_less,
                    linkedinProfile: t.linkedin_profile,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Suite de la lecture : un lien discret vers LinkedIn, puis le bloc commun de contenus liés */}
      <ActRule />
      <section className="wrap pt-12 md:pt-16 pb-16 md:pb-24">
        <a
          href="https://www.linkedin.com/in/victorsoussan-product-design/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-4
            transition-[color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]
            [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97]"
        >
          {t.linkedin_cta_button}
          <ArrowUpRight size={12} weight="bold" aria-hidden="true" />
        </a>
      </section>
      <RelatedContent heading={TRANSLATIONS[lang].related.keep_reading} items={related} id="related" />
    </div>
  )
}
