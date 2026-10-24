import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { ActHeader, ActRule, ActTitle } from '@/components/case-study/ActSection'
import RelatedContent, { type RelatedItem } from '@/components/RelatedContent'
import { TRANSLATIONS } from '@/data/translations'
import { imgDims } from '@/utils/imageDimensions'
import CardGrid from '@/components/ui/CardGrid'
import ContentCard from '@/components/ui/ContentCard'
import CardCarousel from '@/components/ui/CardCarousel'
import { BLOCK, Disclosure, SubTitle } from '@/components/ui/ActBlocks'
import Reveal from '@/components/ui/Reveal'
import MaturityDiagram from '@/components/approche/MaturityDiagram'
import FidelityDiagram from '@/components/approche/FidelityDiagram'
import TracksDiagram from '@/components/approche/TracksDiagram'
import ApprocheToc from '@/components/approche/ApprocheToc'
import ReadingProgress from '@/components/ui/ReadingProgress'
import TaglineReveal from '@/components/ui/TaglineReveal'
import FeaturedQuote from '@/components/testimonials/FeaturedQuote'
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
  RHYTHM,
  PAGE_STRUCTURE,
  CTA_SECTION,
} from '@/data/approcheData'

interface ApprochePageProps {
  lang: Language
  related: RelatedItem[]
}

const LINK_PRESS =
  'transition-[color,transform] duration-150 ease-out active:scale-[0.97]'

const TEXT_LINK = `group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 [@media(hover:hover)]:hover:decoration-gray-900 ${LINK_PRESS}`

/** The one primary action of the page: the same button at the top and at the bottom */
const PILL =
  'inline-flex min-h-11 items-center gap-2 rounded-full bg-gray-900 px-5 text-sm font-medium text-white shadow-sm [@media(hover:hover)]:hover:bg-black [@media(hover:hover)]:hover:shadow-md active:scale-[0.97] transition-[background-color,box-shadow,transform] duration-150 ease-out'

function CtaButton({ lang }: { lang: Language }) {
  const { cta } = HERO[lang]
  return (
    <Link href={`/${lang}${cta.href}`} className={PILL}>
      {cta.label}
      <ArrowRight size={14} weight="bold" aria-hidden="true" />
    </Link>
  )
}

function ArrowLink({ href, children, draggable }: { href: string; children: ReactNode; draggable?: boolean }) {
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

const DISCLOSURE: Record<Language, { more: string; less: string; week: string; weekHide: string; deliverables: string; deliverablesHide: string }> = {
  fr: { more: 'Lire la suite', less: 'Voir moins', week: 'Voir une semaine type', weekHide: 'Masquer la semaine type', deliverables: 'Voir les livrables', deliverablesHide: 'Masquer les livrables' },
  en: { more: 'Read more', less: 'Show less', week: 'See a typical week', weekHide: 'Hide the typical week', deliverables: 'See the deliverables', deliverablesHide: 'Hide the deliverables' },
}

const CAROUSEL_LABELS: Record<'artefacts' | 'domains', Record<Language, { track: string; prev: string; next: string }>> = {
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
// Situations: the same job, three starting points
// ---------------------------------------------------------------------------

function Situations({ lang }: { lang: Language }) {
  const copy = SITUATIONS_COPY[lang]
  const ps = PAGE_STRUCTURE[lang]

  return (
    <section id="situations" aria-label={copy.title} className="scroll-mt-24">
      <ActHeader index="01" title={copy.title} lead={copy.intro} />

      <div className="act-wide pb-12 md:pb-20">
        <SubTitle>{ps.situationsDiagram}</SubTitle>
        <Reveal className="max-w-[26rem]">
          <MaturityDiagram lang={lang} />
        </Reveal>

        <SubTitle className={BLOCK}>{ps.situationsTable}</SubTitle>
        <div>
          {/* Column labels from md up. On a phone each block carries its own label. */}
          <div
            aria-hidden="true"
            className="hidden border-b border-gray-100 pb-3 text-xs text-gray-500 md:grid md:grid-cols-12 md:gap-x-6"
          >
            <span className="md:col-span-3">{copy.columns.situation}</span>
            <span className="md:col-span-5">{copy.columns.role}</span>
            <span className="md:col-span-4">{copy.columns.outputs}</span>
          </div>

          <ul className="divide-y divide-gray-100 border-t border-gray-100 md:border-t-0">
            {SITUATIONS.map((s) => (
              <Reveal as="li" key={s.id} className="grid grid-cols-1 gap-y-6 py-8 md:grid-cols-12 md:gap-x-6 md:py-10">
                <div className="md:col-span-3">
                  <h4 className="text-title-3 text-gray-900">{s.name[lang]}</h4>
                  <p className="mt-2 text-sm text-gray-500">{s.context[lang]}</p>
                </div>

                <div className="md:col-span-5">
                  <p className="text-xs text-gray-500 md:hidden">{copy.columns.role}</p>
                  <p className="mt-1 max-w-[52ch] text-base text-gray-900 md:mt-0">{s.role[lang]}</p>
                </div>

                <div className="md:col-span-4">
                  <p className="text-xs text-gray-500 md:hidden">{copy.columns.outputs}</p>
                  <p className="mt-1 text-base text-gray-600 md:mt-0">{s.outputs[lang]}</p>
                  <p className="mt-5 text-sm text-gray-500">{s.proof.text[lang]}</p>
                  {s.proof.link && (
                    <div className="mt-1">
                      <ArrowLink href={`/${lang}${s.proof.link.href}`}>
                        {copy.proofLink} {s.proof.link.label[lang]}
                      </ArrowLink>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
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
        <ActTitle index="02" title={copy.title} />
        {/* The statement of the act, lit word by word as it rises: the one authored moment of the page */}
        <TaglineReveal text={copy.tagline} className="text-lead-lg text-gray-900 max-w-[40ch]" />
      </div>

      <div className="act-wide">
        <SubTitle>{ps.fidelity}</SubTitle>
        <p className="mb-6 max-w-[62ch] text-base text-gray-600 md:mb-8">{copy.caption}</p>
        <Reveal className="max-w-[26rem]">
          <FidelityDiagram lang={lang} />
        </Reveal>

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
  // A client's own words, next to the claim they support: workshops before the product existed
  const quote = getTestimonials(lang).find((item) => item.id === 'pierre-marie-nigay')

  return (
    <section id="working" aria-label={w.title} className="scroll-mt-24">
      <ActHeader index="03" title={w.title} lead={w.paragraphs[0]} />

      <div className="act-wide pb-12 md:pb-20">
        {/* The lead says it; the rest is one level down */}
        <Disclosure open={DISCLOSURE[lang].more} close={DISCLOSURE[lang].less}>
          <div className="disclosure-body mt-5 max-w-[62ch] space-y-5">
            {w.paragraphs.slice(1).map((p) => (
              <p key={p} className="text-base text-gray-600">{p}</p>
            ))}
          </div>
        </Disclosure>

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
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Weekly rhythm: a week as a calendar, Discovery and Delivery tracks across four columns
// ---------------------------------------------------------------------------

/** "Frame hypotheses. Who to talk to. Protocol." becomes three short lines, like entries of a calendar */
const toLines = (cell: string) => cell.split(/(?<=\.) /).filter(Boolean)

function WeeklyRhythm({ lang }: { lang: Language }) {
  const r = RHYTHM[lang]
  const last = r.days4.length - 1

  return (
    <div className="mt-6 md:mt-8">
      {/* From lg: one grid, a rail of track names on the left and four day columns whose rows line up
          (subgrid). Below lg the days stack and each cell names its own track. */}
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-inset ring-black/[0.06]">
        <ol
          aria-label={r.label}
          className="grid list-none divide-y divide-gray-100 p-0 lg:grid-cols-[7.5rem_repeat(4,minmax(0,1fr))] lg:grid-rows-[auto_1fr_1fr] lg:divide-y-0"
        >
          {/* Track names (decorative: each cell is named for assistive technology) */}
          <li aria-hidden="true" className="hidden bg-[#F7F7F5] lg:row-span-3 lg:grid lg:grid-rows-subgrid">
            <span />
            {r.modes.map((mode) => (
              <span key={mode} className="border-t border-gray-100 px-5 py-5 text-xs font-medium text-gray-500">
                {mode}
              </span>
            ))}
          </li>

          {r.days4.map((day, dayIdx) => (
            <li
              key={day}
              className="lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:border-l lg:border-gray-100"
            >
              <div className="px-5 pb-3 pt-5 lg:pb-4">
                <p className="text-base font-medium text-gray-900">{day}</p>
                <p
                  className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                    dayIdx === last ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {r.phases[dayIdx]}
                </p>
              </div>

              {r.modes.map((mode, modeIdx) => (
                <div key={mode} className="px-5 pb-5 pt-1 lg:border-t lg:border-gray-100 lg:py-5">
                  <p className="text-xs font-medium text-gray-500 lg:sr-only">{mode}</p>
                  <p className="mt-1.5 space-y-0.5 text-sm text-gray-600 lg:mt-0">
                    {toLines(r.cells4[modeIdx][dayIdx]).map((line) => (
                      <span key={line} className="block">{line}</span>
                    ))}
                  </p>
                </div>
              ))}
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-5 max-w-[62ch] text-sm text-gray-500">{r.footer}</p>
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
      <ActHeader index="04" title={collab.title} lead={ps.disciplinesLead} />

      <div className="act-wide pb-12 md:pb-20">
        <SubTitle>{ps.counterparts}</SubTitle>
        <CardGrid cols={2} label={collab.title}>
          {collab.blocks.map((block) => (
            <ContentCard key={block.id} title={block.label} body={block.body} />
          ))}
        </CardGrid>

        <SubTitle className={BLOCK}>{ps.rhythm}</SubTitle>
        <Reveal className="max-w-[26rem]">
          <TracksDiagram lang={lang} />
        </Reveal>

        {/* The calendar of a week is one level down */}
        <Disclosure className="mt-8 md:mt-10" open={DISCLOSURE[lang].week} close={DISCLOSURE[lang].weekHide}>
          <div className="disclosure-body">
            <WeeklyRhythm lang={lang} />
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

function Domains({ lang }: { lang: Language }) {
  const copy = getDomainsCopy(lang)
  const ps = PAGE_STRUCTURE[lang]
  const domains = getDomains(lang)

  return (
    <section id="domains" aria-label={copy.title} className="scroll-mt-24 bg-[#F7F7F5] pb-12 md:pb-20">
      <ActHeader index="05" title={copy.title} lead={ps.domainsLead} />

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

      {/* Seven numbered acts, the same grammar as a case study: number in the gutter, title, lead,
          then intermediate titles. The table of contents above lists them. */}
      <Situations lang={lang} />
      <BeforeScreen lang={lang} />
      <WorkingWithMe lang={lang} />
      <Disciplines lang={lang} />
      <Domains lang={lang} />
      <ClientsStrip lang={lang} index="06" />

      <section id="contact" aria-label="Contact" className="scroll-mt-24">
        <ActHeader index="07" title={cta.message} />
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
