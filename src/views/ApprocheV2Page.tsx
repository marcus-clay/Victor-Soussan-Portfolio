import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { ActHeader } from '@/components/case-study/ActSection'
import RelatedContent, { type RelatedItem } from '@/components/RelatedContent'
import { TRANSLATIONS } from '@/data/translations'
import { BLOCK, SubTitle } from '@/components/ui/ActBlocks'
import Reveal from '@/components/ui/Reveal'
import ApprocheToc from '@/components/approche/ApprocheToc'
import ApproachExplorer from '@/components/approche/ApproachExplorer'
import ReadingProgress from '@/components/ui/ReadingProgress'
import FeaturedQuote from '@/components/testimonials/FeaturedQuote'
import TestimonialsLink from '@/components/testimonials/TestimonialsLink'
import { getTestimonials } from '@/data/testimonialsData'
import { ClientsStrip } from '@/views/ExpertiseSections'
import { CTA_SECTION, type Language } from '@/data/approcheData'
import { V2_HERO, V2_JOB, V2_RESULTS, V2_SHORT_TOC } from '@/data/approcheV2Data'
import { ArrowLink, CtaButton, TEXT_LINK } from '@/components/approche/ApproachLinks'

/**
 * Approach, second version, for a one-minute read. Three questions in the order a reader asks them: what do
 * you do (the introduction), how do you do it (the two halves of the job as one explorer, one step at a time,
 * each with its drawing), and what did it lead to (four results in a sentence each, then a client's word that closes the proofs).
 * The detail lives in the case studies each step links to.
 */
export default function ApprocheV2Page({ lang, related }: { lang: Language; related: RelatedItem[] }) {
  const hero = V2_HERO[lang]
  const job = V2_JOB[lang]
  const res = V2_RESULTS[lang]
  const cta = CTA_SECTION[lang]
  const t = TRANSLATIONS[lang].testimonials
  const quote = getTestimonials(lang).find((item) => item.id === 'charlotte-rifflet')

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      <span data-nav-title className="sr-only">{hero.title}</span>
      <ReadingProgress />
      <ApprocheToc sections={V2_SHORT_TOC[lang]} lang={lang} />

      <header className="wrap pt-10 md:pt-16 pb-10 md:pb-12">
        <h1 className="build-line text-display text-gray-900 text-balance">{hero.title}</h1>
        <p className="build-rise mt-6 md:mt-8 text-lead-lg text-gray-600 max-w-[54ch]" style={{ ['--d' as string]: '120ms' }}>{hero.lead}</p>
        <div className="build-rise mt-8 md:mt-10" style={{ ['--d' as string]: '200ms' }}>
          <CtaButton lang={lang} />
        </div>
      </header>

      {/* 01 How: the two halves of the job, one step at a time */}
      <section id="job" aria-label={job.title} className="scroll-mt-24">
        <ActHeader index="01" title={job.title} lead={job.lead} />
        <div className="act-wide pb-12 md:pb-20">
          <ApproachExplorer lang={lang} />
        </div>
      </section>

      {/* 02 What it led to: four results in a sentence each, then a client's word that closes the proofs */}
      <section id="results" aria-label={res.title} className="scroll-mt-24">
        <ActHeader index="02" title={res.title} lead={res.lead} />
        <div className="act-wide pb-12 md:pb-20">
          <ul className="list-none divide-y divide-gray-100 border-y border-gray-100 p-0">
            {res.facts.map((fact) => (
              <Reveal as="li" key={fact.link.label} className="grid grid-cols-1 gap-y-1 py-4 md:grid-cols-[14rem_1fr] md:gap-x-6 md:py-5">
                <div>
                  <ArrowLink href={`/${lang}${fact.link.href}`}>{fact.link.label}</ArrowLink>
                </div>
                <p className="max-w-[62ch] text-base text-gray-600 md:pt-2.5">{fact.text}</p>
              </Reveal>
            ))}
          </ul>

          {quote && (
            <>
              <SubTitle className={BLOCK}>{res.quoteLabel}</SubTitle>
              <Reveal>
                <FeaturedQuote
                  item={quote}
                  caseStudyHref={`/${lang}/project/sqool`}
                  labels={{
                    readFull: t.read_full,
                    readLess: t.read_less,
                    linkedinProfile: t.linkedin_profile,
                    caseStudyLink: t.case_study_link.replace('{name}', 'SQOOL'),
                  }}
                />
              </Reveal>
            </>
          )}
          <TestimonialsLink lang={lang} className="mt-8 md:mt-10" />
        </div>
      </section>

      <ClientsStrip lang={lang} index="03" />

      <section id="contact" aria-label="Contact" className="scroll-mt-24">
        <ActHeader index="04" title={cta.message} />
        <div className="act-wide pb-14 md:pb-16">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <CtaButton lang={lang} />
            <a href="https://www.linkedin.com/in/victorsoussan-product-design/" target="_blank" rel="noopener noreferrer" className={TEXT_LINK}>
              LinkedIn
              <ArrowUpRight
                size={12}
                weight="bold"
                className="transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:translate-x-0.5 [@media(hover:hover)]:group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </section>

      <RelatedContent heading={TRANSLATIONS[lang].related.keep_reading} items={related} id="related" />
    </div>
  )
}
