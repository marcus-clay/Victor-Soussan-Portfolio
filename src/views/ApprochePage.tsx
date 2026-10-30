import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Plus } from '@phosphor-icons/react/dist/ssr'
import { ActHeader, ActRule, ActTitle } from '@/components/case-study/ActSection'
import RelatedContent, { type RelatedItem } from '@/components/RelatedContent'
import { TRANSLATIONS } from '@/data/translations'
import { imgDims } from '@/utils/imageDimensions'
import CardGrid from '@/components/ui/CardGrid'
import ContentCard from '@/components/ui/ContentCard'
import CardCarousel from '@/components/ui/CardCarousel'
import { BLOCK, Disclosure, SubTitle } from '@/components/ui/ActBlocks'
import Reveal from '@/components/ui/Reveal'
import {
  ConceptDiagram,
  DesignCalendarDiagram,
  FidelityDiagram,
  VisionToLotsDiagram,
  MaturityDiagram,
  RhythmDiagram,
  RoadmapStructureDiagram,
  ScalesDiagram,
} from '@/components/approche/ApproachDiagrams'
import ApprocheToc from '@/components/approche/ApprocheToc'
import ReadingProgress from '@/components/ui/ReadingProgress'
import TaglineReveal from '@/components/ui/TaglineReveal'
import FeaturedQuote from '@/components/testimonials/FeaturedQuote'
import TestimonialsLink from '@/components/testimonials/TestimonialsLink'
import { getTestimonials } from '@/data/testimonialsData'
import { ClientsStrip, getDomains, getDomainsCopy } from '@/views/ExpertiseSections'
import {
  type Language,
  HERO,
  SITUATIONS_COPY,
  SITUATIONS,
  BEFORE_SCREEN,
  ARTEFACTS,
  WORKING_WITH_ME,
  COLLABORATION,
  HORIZONS,
  PAGE_STRUCTURE,
  SCALES,
  ROADMAP,
  CONCEPT,
  CTA_SECTION,
} from '@/data/approcheData'

interface ApprochePageProps {
  lang: Language
  related: RelatedItem[]
}

const LINK_PRESS =
  'transition-[color,transform] duration-150 ease-out active:scale-[0.97]'

export const TEXT_LINK = `group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 [@media(hover:hover)]:hover:decoration-gray-900 ${LINK_PRESS}`

/** The one primary action of the page: the same button at the top and at the bottom */
const PILL =
  'inline-flex min-h-11 items-center gap-2 rounded-full bg-gray-900 px-5 text-sm font-medium text-white shadow-sm [@media(hover:hover)]:hover:bg-black [@media(hover:hover)]:hover:shadow-md active:scale-[0.97] transition-[background-color,box-shadow,transform] duration-150 ease-out'

export function CtaButton({ lang }: { lang: Language }) {
  const { cta } = HERO[lang]
  return (
    <Link href={`/${lang}${cta.href}`} className={PILL}>
      {cta.label}
      <ArrowRight size={14} weight="bold" aria-hidden="true" />
    </Link>
  )
}

export function ArrowLink({ href, children, draggable }: { href: string; children: ReactNode; draggable?: boolean }) {
  return (
    <Link href={href} className={TEXT_LINK} draggable={draggable}>
      {children}
      <ArrowRight
        size={12}
        weight="bold"
        aria-hidden="true"
        className="transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:translate-x-0.5"
      />
    </Link>
  )
}

const DISCLOSURE: Record<Language, { more: string; less: string; rituals: string; ritualsHide: string; deliverables: string; deliverablesHide: string }> = {
  fr: { more: 'Lire la suite', less: 'Voir moins', rituals: 'Voir les rituels', ritualsHide: 'Masquer les rituels', deliverables: 'Voir les livrables', deliverablesHide: 'Masquer les livrables' },
  en: { more: 'Read more', less: 'Show less', rituals: 'See the rituals', ritualsHide: 'Hide the rituals', deliverables: 'See the deliverables', deliverablesHide: 'Hide the deliverables' },
}

export const CAROUSEL_LABELS: Record<'artefacts' | 'domains', Record<Language, { track: string; prev: string; next: string }>> = {
  artefacts: {
    fr: { track: 'Documents de travail, du plus brut au plus abouti', prev: 'Document précédent', next: 'Document suivant' },
    en: { track: 'Working documents, from the roughest to the most finished', prev: 'Previous document', next: 'Next document' },
  },
  domains: {
    fr: { track: 'Domaines d’intervention', prev: 'Domaine précédent', next: 'Domaine suivant' },
    en: { track: 'Areas of work', prev: 'Previous area', next: 'Next area' },
  },
}

// ---------------------------------------------------------------------------
// Three scales: a subject, a roadmap, an organisation
// ---------------------------------------------------------------------------

function Scales({ lang }: { lang: Language }) {
  const copy = SCALES[lang]

  return (
    <section id="scales" aria-label={copy.title} className="scroll-mt-24">
      <ActHeader index="01" title={copy.title} lead={copy.lead} />

      <div className="act-wide pb-12 md:pb-20">
        <ScalesDiagram lang={lang} />

        {/* One column per scale: what I do there, what it leaves behind */}
        <ol className={`${BLOCK} grid list-none grid-cols-1 gap-x-8 gap-y-10 p-0 md:grid-cols-3`}>
          {copy.items.map((item, i) => (
            <Reveal as="li" key={item.id} className="border-t border-gray-200 pt-5">
              <p className="text-micro uppercase tracking-[0.08em] tabular-nums text-gray-500">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 text-title-3 text-gray-900">{item.name}</h3>
              <p className="mt-4 text-xs font-medium text-gray-500">{copy.columns.does}</p>
              <p className="mt-1.5 text-base text-gray-600">{item.does}</p>
              <p className="mt-4 text-xs font-medium text-gray-500">{copy.columns.produces}</p>
              <p className="mt-1.5 text-sm text-gray-900">{item.produces}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Structuring a roadmap: levels of structure, several PMs, a shared design calendar
// ---------------------------------------------------------------------------

function Roadmap({ lang }: { lang: Language }) {
  const copy = ROADMAP[lang]

  return (
    <section id="roadmap" aria-label={copy.title} className="scroll-mt-24">
      <ActHeader index="02" title={copy.title} lead={copy.lead} />

      <div className="act-wide pb-12 md:pb-20">
        <SubTitle>{copy.structureTitle}</SubTitle>
        <p className="mb-6 max-w-[62ch] text-base text-gray-600 md:mb-8">{copy.structureText}</p>
        <RoadmapStructureDiagram lang={lang} />

        <SubTitle className={BLOCK}>{copy.visionTitle}</SubTitle>
        <p className="mb-6 max-w-[62ch] text-base text-gray-600 md:mb-8">{copy.visionText}</p>
        <VisionToLotsDiagram lang={lang} />

        <SubTitle className={BLOCK}>{copy.calendarTitle}</SubTitle>
        <p className="mb-6 max-w-[62ch] text-base text-gray-600 md:mb-8">{copy.calendarText}</p>
        <DesignCalendarDiagram lang={lang} />
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Situations: the same job, three starting points
// ---------------------------------------------------------------------------

function Situations({ lang }: { lang: Language }) {
  const copy = SITUATIONS_COPY[lang]
  const ps = PAGE_STRUCTURE[lang]

  return (
    <section id="situations" aria-label={copy.title} className="scroll-mt-24">
      <ActHeader index="03" title={copy.title} lead={copy.intro} />

      <div className="act-wide pb-12 md:pb-20">
        <SubTitle>{ps.situationsDiagram}</SubTitle>
        <MaturityDiagram lang={lang} />

        {/* Summary first: the three starting points, one line each. The reader finds their own
            situation, and only that row opens onto the role, the output and the proof. */}
        <ul className={`${BLOCK} border-y border-gray-100`}>
          {SITUATIONS.map((s, i) => (
            <Reveal as="li" key={s.id} className="border-b border-gray-100 last:border-b-0">
              <details name="situations" open={i === 0} className="group">
                <summary
                  className="-mx-3 grid min-h-11 cursor-pointer list-none grid-cols-[1fr_auto] items-start gap-x-4 gap-y-1 rounded-xl px-3 py-6 transition-colors duration-150 ease-out active:bg-gray-200/70 md:grid-cols-12 md:gap-x-6 md:py-8 [&::-webkit-details-marker]:hidden [@media(hover:hover)]:hover:bg-gray-100"
                >
                  <h4 className="text-title-3 text-gray-900 md:col-span-4">{s.name[lang]}</h4>
                  <span
                    aria-hidden="true"
                    className="row-span-2 mt-0.5 flex size-6 items-center justify-center text-gray-500 transition-[transform,color] duration-200 ease-out group-open:rotate-45 group-open:text-gray-900 motion-reduce:transition-none md:order-last md:col-span-1 md:col-start-12 md:row-span-1 md:justify-self-end"
                  >
                    <Plus size={18} weight="bold" />
                  </span>
                  <p className="text-base text-gray-600 md:col-span-7 md:col-start-5">{s.context[lang]}</p>
                </summary>

                <div className="disclosure-body grid grid-cols-1 gap-x-6 gap-y-6 pb-8 md:grid-cols-12 md:pb-10">
                  <div className="md:col-span-4 md:col-start-5">
                    <p className="text-xs font-medium text-gray-500">{copy.columns.role}</p>
                    <p className="mt-1.5 max-w-[48ch] text-base text-gray-900">{s.role[lang]}</p>
                  </div>
                  <div className="md:col-span-3 md:col-start-9">
                    <p className="text-xs font-medium text-gray-500">{copy.columns.outputs}</p>
                    <p className="mt-1.5 text-base text-gray-600">{s.outputs[lang]}</p>
                  </div>
                  <div className="md:col-span-7 md:col-start-5">
                    <p className="max-w-[56ch] text-sm text-gray-600">{s.proof.text[lang]}</p>
                    {s.proof.link && (
                      <div className="mt-1">
                        <ArrowLink href={`/${lang}${s.proof.link.href}`}>
                          {copy.proofLink} {s.proof.link.label[lang]}
                        </ArrowLink>
                      </div>
                    )}
                  </div>
                </div>
              </details>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Before the screen: working documents, fidelity rising
// ---------------------------------------------------------------------------

function BeforeScreen({ lang }: { lang: Language }) {
  const copy = BEFORE_SCREEN[lang]
  const ps = PAGE_STRUCTURE[lang]

  return (
    <section id="before-screen" aria-label={copy.title} className="scroll-mt-24">
      <ActRule />
      <div className="act-text pt-9 md:pt-14 pb-8 md:pb-12">
        <ActTitle index="04" title={copy.title} />
        {/* The statement of the act, lit word by word as it rises: the one authored moment of the page */}
        <TaglineReveal text={copy.tagline} className="text-lead-lg text-gray-900 max-w-[40ch]" />
      </div>

      <div className="act-wide">
        <SubTitle>{ps.fidelity}</SubTitle>
        <p className="mb-6 max-w-[62ch] text-base text-gray-600 md:mb-8">{copy.caption}</p>
        <FidelityDiagram lang={lang} />

        {/* In the phases that stay blurry for a long time, a diagram moves the exchange forward */}
        <SubTitle className={BLOCK}>{ps.concept}</SubTitle>
        <p className="mb-6 max-w-[62ch] text-base text-gray-600 md:mb-8">{CONCEPT[lang].text}</p>
        <ConceptDiagram lang={lang} />

        <SubTitle className={`${BLOCK} !mb-6 md:!mb-8`}>{ps.documents}</SubTitle>
      </div>

      {/* Real artefacts, from the roughest to the most finished: the order is the message */}
      <CardCarousel labels={CAROUSEL_LABELS.artefacts[lang]} itemClassName="w-[72vw] max-w-[22rem] md:w-[22rem]">
        {ARTEFACTS.map((item) => {
          const dims = imgDims(item.src)
          return (
            <figure key={item.src} className="m-0">
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-[#F3F3F1] p-2 ring-1 ring-inset ring-black/[0.05] md:p-3">
                <img
                  src={item.src}
                  {...dims}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="max-h-full max-w-full rounded-lg object-contain ring-1 ring-black/[0.06]"
                />
              </div>
              <figcaption className="mt-3 text-sm text-gray-600">{item.label[lang]}</figcaption>
            </figure>
          )
        })}
      </CardCarousel>

      <div className="act-wide pt-12 md:pt-16 pb-12 md:pb-24">
        <SubTitle>{ps.prototype}</SubTitle>
        <p className="max-w-[62ch] text-base text-gray-600">{copy.prototype}</p>
        <div className="mt-1">
          <ArrowLink href={`/${lang}${copy.prototypeLink.href}`}>{copy.prototypeLink.label}</ArrowLink>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// What it is like to work with me
// ---------------------------------------------------------------------------

function WorkingWithMe({ lang }: { lang: Language }) {
  const w = WORKING_WITH_ME[lang]
  const ps = PAGE_STRUCTURE[lang]

  const t = TRANSLATIONS[lang].testimonials
  const quote = getTestimonials(lang).find((item) => item.id === 'pierre-marie-nigay')

  return (
    <section id="working" aria-label={w.title} className="scroll-mt-24">
      <ActHeader index="05" title={w.title} lead={w.paragraphs[0]} />

      <div className="act-wide pb-12 md:pb-20">
        {/* The lead says it; the rest is one level down */}
        <Disclosure open={DISCLOSURE[lang].more} close={DISCLOSURE[lang].less}>
          <div className="disclosure-body mt-5 max-w-[62ch] space-y-5">
            {w.paragraphs.slice(1).map((p) => (
              <p key={p} className="text-base text-gray-600">{p}</p>
            ))}
          </div>
        </Disclosure>

        {/* One client's words, next to the claim they support (workshops before the product existed), then
            the way to the others: the testimonials are read in full on their own page only */}
        {quote && (
          <>
            <SubTitle className={BLOCK}>{ps.client}</SubTitle>
            <Reveal>
              <FeaturedQuote
                item={quote}
                caseStudyHref={`/${lang}/project/toolkit`}
                labels={{
                  readFull: t.read_full,
                  readLess: t.read_less,
                  linkedinProfile: t.linkedin_profile,
                  caseStudyLink: t.case_study_link.replace('{name}', 'Toolkit'),
                }}
              />
            </Reveal>
          </>
        )}
        <TestimonialsLink lang={lang} className="mt-8 md:mt-10" />
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// The rituals behind the rhythm, by horizon: every week, every sprint, over several weeks
// ---------------------------------------------------------------------------

export function Horizons({ lang }: { lang: Language }) {
  const h = HORIZONS[lang]

  return (
    <div className="mt-6 md:mt-8">
      <ol aria-label={h.label} className="grid list-none grid-cols-1 gap-px overflow-hidden rounded-2xl bg-gray-100 p-0 ring-1 ring-inset ring-black/[0.06] md:grid-cols-3">
        {h.columns.map((col) => (
          <li key={col.title} className="bg-white px-5 py-5 md:px-6 md:py-6">
            <p className="text-base font-medium text-gray-900">{col.title}</p>
            <ul className="mt-3 space-y-2">
              {col.items.map((item) => (
                <li
                  key={item}
                  className="relative pl-4 text-sm text-gray-600 before:absolute before:left-0 before:top-[9px] before:h-1 before:w-1 before:rounded-full before:bg-gray-300 before:content-['']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p className="mt-5 max-w-[62ch] text-sm text-gray-500">{h.footer}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// With each discipline: four short cards, then the rhythm of a week
// ---------------------------------------------------------------------------

function Disciplines({ lang }: { lang: Language }) {
  const collab = COLLABORATION[lang]
  const ps = PAGE_STRUCTURE[lang]

  return (
    <section id="disciplines" aria-label={collab.title} className="scroll-mt-24">
      <ActHeader index="06" title={collab.title} lead={ps.disciplinesLead} />

      <div className="act-wide pb-12 md:pb-20">
        <SubTitle>{ps.counterparts}</SubTitle>
        <CardGrid cols={2} label={collab.title}>
          {collab.blocks.map((block) => (
            <ContentCard key={block.id} title={block.label} body={block.body} />
          ))}
        </CardGrid>

        <SubTitle className={BLOCK}>{ps.rhythm}</SubTitle>
        <RhythmDiagram lang={lang} />

        {/* The rituals behind it, by horizon, one level down */}
        <Disclosure className="mt-8 md:mt-10" open={DISCLOSURE[lang].rituals} close={DISCLOSURE[lang].ritualsHide}>
          <div className="disclosure-body">
            <Horizons lang={lang} />
          </div>
        </Disclosure>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Domains: what can be handed over, one card each, on a tinted band that sets the catalogue
// apart from the story above it (the band is the separator)
// ---------------------------------------------------------------------------

export function Domains({ lang }: { lang: Language }) {
  const copy = getDomainsCopy(lang)
  const ps = PAGE_STRUCTURE[lang]
  const domains = getDomains(lang)

  return (
    <section id="domains" aria-label={copy.title} className="scroll-mt-24 bg-[#F7F7F5] pb-12 md:pb-20">
      <ActHeader index="07" title={copy.title} lead={ps.domainsLead} />

      <CardCarousel labels={CAROUSEL_LABELS.domains[lang]} itemClassName="w-[82vw] max-w-[24rem] md:w-[24rem]">
        {domains.map((d) => (
          <article
            key={d.id}
            id={d.id}
            className="flex scroll-mt-24 flex-col rounded-2xl border border-gray-100 bg-white p-5 md:p-6"
          >
            <h3 className="text-title-3 text-gray-900">{d.title}</h3>
            <p className="mt-3 text-base text-gray-900">{d.claim}</p>
            {d.proof && <p className="mt-3 text-sm text-gray-500">{d.proof}</p>}
            <Disclosure className="mt-4" open={DISCLOSURE[lang].deliverables} close={DISCLOSURE[lang].deliverablesHide}>
              <ul className="disclosure-body mt-4 space-y-2">
                {d.deliverables.map((item) => (
                  <li
                    key={item}
                    className="relative pl-4 text-sm text-gray-600 before:absolute before:left-0 before:top-[9px] before:h-1 before:w-1 before:rounded-full before:bg-gray-300 before:content-['']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Disclosure>
            <div className="mt-auto flex flex-wrap gap-x-5 pt-5">
              {d.projects.map((project) => (
                <ArrowLink key={project.id} href={`/${lang}/project/${project.id}`} draggable={false}>
                  {project.title}
                </ArrowLink>
              ))}
            </div>
          </article>
        ))}
      </CardCarousel>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ApprochePage({ lang, related }: ApprochePageProps) {
  const hero = HERO[lang]
  const cta = CTA_SECTION[lang]
  const ps = PAGE_STRUCTURE[lang]

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      {/* Nav reads this for the contextual page title */}
      <span data-nav-title className="sr-only">{hero.title}</span>

      <ReadingProgress />
      <ApprocheToc sections={ps.toc} lang={lang} />

      <header className="wrap pt-10 md:pt-16 pb-12 md:pb-16">
        <h1 className="text-display text-gray-900 text-balance">
          {hero.statement}
        </h1>
        <p className="mt-6 md:mt-8 text-lead-lg text-gray-600 max-w-[54ch]">
          {hero.lead}
        </p>
        <div className="mt-8 md:mt-10">
          <CtaButton lang={lang} />
        </div>
      </header>

      {/* Nine numbered acts, the same grammar as a case study: number in the gutter, title, lead,
          then intermediate titles. The table of contents above lists them. From the widest scale of the
          work (a subject, a roadmap, an organisation) down to the deliverables and the rhythm. */}
      <Scales lang={lang} />
      <Roadmap lang={lang} />
      <Situations lang={lang} />
      <BeforeScreen lang={lang} />
      <WorkingWithMe lang={lang} />
      <Disciplines lang={lang} />
      <Domains lang={lang} />
      <ClientsStrip lang={lang} index="08" />

      <section id="contact" aria-label="Contact" className="scroll-mt-24">
        <ActHeader index="09" title={cta.message} />
        <div className="act-wide pb-14 md:pb-16">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <CtaButton lang={lang} />
            <a
              href="https://www.linkedin.com/in/victorsoussan-product-design/"
              target="_blank"
              rel="noopener noreferrer"
              className={TEXT_LINK}
            >
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
