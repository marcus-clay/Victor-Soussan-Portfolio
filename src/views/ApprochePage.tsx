import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { ActRule, ActTitle } from '@/components/case-study/ActSection'
import RelatedContent, { type RelatedItem } from '@/components/RelatedContent'
import { TRANSLATIONS } from '@/data/translations'
import { imgDims } from '@/utils/imageDimensions'
import CardGrid from '@/components/ui/CardGrid'
import ContentCard from '@/components/ui/ContentCard'
import {
  type Language,
  type Act,
  HERO,
  CONTRAST,
  ACTS_INTRO,
  ACTS,
  ACT_LABELS,
  COLLABORATION,
  RHYTHM,
  CTA_SECTION,
} from '@/data/approcheData'

interface ApprochePageProps {
  lang: Language
  related: RelatedItem[]
}

const LINK_PRESS =
  'transition-[color,transform] duration-150 ease-out active:scale-[0.97]'

// ---------------------------------------------------------------------------
// Contrast: the usual sequence next to the method
// ---------------------------------------------------------------------------

function ContrastPanel({
  title,
  note,
  steps,
  muted,
}: {
  title: string
  note: string
  steps: string[]
  muted?: boolean
}) {
  return (
    <ContentCard title={title} headingLevel="h2" body={note}>
      <ol className="mt-3 divide-y divide-gray-100 border-t border-gray-100">
        {steps.map((step, i) => (
          <li key={step} className="flex items-baseline gap-4 py-3">
            <span className="w-5 shrink-0 text-xs font-medium tabular-nums text-gray-500">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className={`text-base ${muted ? 'text-gray-500' : 'text-gray-900'}`}>{step}</span>
          </li>
        ))}
      </ol>
    </ContentCard>
  )
}

// ---------------------------------------------------------------------------
// One act: hairline, number in the gutter, title, explanation, deliverables, visual, proof
// ---------------------------------------------------------------------------

/**
 * Long explanations are cut at a sentence boundary near the middle so they read as two short
 * paragraphs. Only the layout changes: the words and their order are untouched.
 */
function splitAtSentence(text: string): string[] {
  if (text.length < 260) return [text]
  const sentences = text.split(/(?<=[.!?]) (?=[A-ZÀ-ÖØ-Þ])/)
  if (sentences.length < 4) return [text]
  let best = 1
  let bestGap = Infinity
  let head = 0
  for (let i = 1; i < sentences.length; i++) {
    head += sentences[i - 1].length + 1
    const gap = Math.abs(head - text.length / 2)
    if (gap < bestGap) {
      bestGap = gap
      best = i
    }
  }
  return [sentences.slice(0, best).join(' '), sentences.slice(best).join(' ')]
}

function ActBlock({ act, index, lang }: { act: Act; index: number; lang: Language }) {
  const labels = ACT_LABELS[lang]
  const detail = splitAtSentence(act.detail[lang])

  return (
    <section aria-label={act.title[lang]}>
      <ActRule />
      <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-20">
        {/* 1. Opening: number, title, and the one sentence to read if nothing else is read */}
        <div className="md:max-w-[66.666%]">
          <ActTitle index={String(index + 1).padStart(2, '0')} title={act.title[lang]} />
          <p className="text-lead-lg text-gray-900 max-w-[40ch]">{act.description[lang]}</p>
        </div>

        {/* 2. The evidence: three real artefacts of the work, read left to right */}
        <ol aria-label={act.title[lang]} className="mt-8 grid list-none grid-cols-1 gap-x-6 gap-y-8 p-0 md:mt-10 md:grid-cols-3">
          {act.evidence.map((item) => {
            const dims = imgDims(item.src)
            return (
              <li key={item.src} className="min-w-0">
                <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-[#F3F3F1] p-3 ring-1 ring-inset ring-black/[0.05]">
                  <img
                    src={item.src}
                    {...dims}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full rounded-lg object-contain ring-1 ring-black/[0.06]"
                  />
                </div>
                <p className="mt-3 text-sm text-gray-600">{item.label[lang]}</p>
              </li>
            )
          })}
        </ol>

        {/* 3. Three chunks in plain columns: how it goes, what comes out, what it proved.
            Space groups each column; boxes would stretch to the tallest, rules would add noise. */}
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 md:mt-12 md:grid-cols-3">
          <div>
            <p className="text-xs text-gray-500">{labels.practice}</p>
            <div className="mt-3 space-y-3">
              {detail.map((chunk) => (
                <p key={chunk} className="text-base text-gray-600">{chunk}</p>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500">{labels.deliverables}</p>
            <ul className="mt-3 space-y-5">
              {act.deliverables.map((d) => (
                <li key={d.activity.en}>
                  <p className="text-base font-medium text-gray-900">{d.activity[lang]}</p>
                  <p className="mt-1 text-sm text-gray-600">{d.output[lang]}</p>
                  <p className="mt-1 text-xs text-gray-500">{d.format[lang]}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs text-gray-500">{labels.proof}</p>
            <h3 className="mt-3 text-title-3 text-gray-900">{act.proof.heading[lang]}</h3>
            <p className="mt-2 text-sm text-gray-600">{act.proof.body[lang]}</p>
            <div className="mt-2 flex flex-wrap gap-x-5">
              {act.proof.links.map((link) => (
                <Link
                  key={link.href}
                  href={`/${lang}${link.href}`}
                  className={`group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 [@media(hover:hover)]:hover:decoration-gray-900 ${LINK_PRESS}`}
                >
                  {labels.proofLink} {link.label[lang]}
                  <ArrowRight
                    size={12}
                    weight="bold"
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Weekly rhythm: Discovery and Delivery, Monday to Friday
// ---------------------------------------------------------------------------

function WeeklyRhythm({ lang }: { lang: Language }) {
  const r = RHYTHM[lang]

  return (
    <div className="mt-12 md:mt-16">
      <h3 className="text-title-3 text-gray-900">{r.label}</h3>
      {/* One column per day: the two tracks, Discovery then Delivery */}
      <ol aria-label={r.label} className="mt-8 grid list-none grid-cols-1 gap-x-8 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {r.days4.map((day, dayIdx) => (
          <li key={day} className="min-w-0">
            <p className="text-base font-medium text-gray-900">{day}</p>
            <dl className="mt-3 space-y-3">
              {r.modes.map((mode, modeIdx) => (
                <div key={mode}>
                  <dt className="text-xs text-gray-500">{mode}</dt>
                  <dd className="mt-0.5 text-sm text-gray-600">{r.cells4[modeIdx][dayIdx]}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ol>
      <p className="mt-8 max-w-[62ch] text-sm text-gray-500">{r.footer}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ApprochePage({ lang, related }: ApprochePageProps) {
  const hero = HERO[lang]
  const contrast = CONTRAST[lang]
  const intro = ACTS_INTRO[lang]
  const collab = COLLABORATION[lang]
  const cta = CTA_SECTION[lang]

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      {/* Nav reads this before falling back to the long statement in the h1 */}
      <span data-nav-title className="sr-only">{hero.title}</span>

      {/* ================================================================== */}
      {/* ACT 0: the claim                                                    */}
      {/* ================================================================== */}
      <header className="wrap pt-10 md:pt-16 pb-12 md:pb-16">
        <h1 className="text-display text-gray-900 text-balance">
          {hero.statement}
        </h1>
        <p className="mt-6 md:mt-8 text-lead-lg text-gray-600 max-w-[54ch]">
          {hero.lead}
        </p>
      </header>

      {/* ================================================================== */}
      {/* Contrast: the usual sequence versus the method                      */}
      {/* ================================================================== */}
      <div className="wrap pb-12 md:pb-14">
        <CardGrid cols={2}>
          <ContrastPanel {...contrast.usual} muted />
          <ContrastPanel {...contrast.mine} />
        </CardGrid>
      </div>

      {/* ================================================================== */}
      {/* The three acts, linked by one vertical line in the gutter           */}
      {/* ================================================================== */}
      <div className="act-wide pb-6">
        <h2 className="text-title-3 text-gray-900">{intro.title}</h2>
        <p className="mt-1 text-sm text-gray-500 max-w-[65ch]">{intro.subtitle}</p>
      </div>

      <div className="relative mx-auto w-full max-w-[var(--wrap-max)]">
        {/* Continuity: the line runs through the three acts, behind the hairlines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 top-[4.5rem] left-[calc(var(--pad)+2rem)] hidden border-l border-gray-100 md:block"
        />
        {ACTS.map((act, i) => (
          <ActBlock key={act.id} act={act} index={i} lang={lang} />
        ))}
      </div>

      {/* ================================================================== */}
      {/* Working together and weekly rhythm                                  */}
      {/* ================================================================== */}
      <section aria-label={collab.title}>
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <h2 className="text-title-2 text-gray-900">{collab.title}</h2>
          <CardGrid cols={3} label={collab.title} className="mt-6 md:mt-8">
            {collab.blocks.map((block) => (
              <ContentCard key={block.id} title={block.label} body={block.body} />
            ))}
          </CardGrid>
          <WeeklyRhythm lang={lang} />
        </div>
      </section>

      {/* ================================================================== */}
      {/* Close: quiet contact and related writing                            */}
      {/* ================================================================== */}
      <section aria-label="Contact">
        <ActRule />
        <div className="act-wide pt-10 md:pt-12 pb-14 md:pb-16">
          <div className="grid gap-10 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-6">
              <p className="text-lead-lg text-gray-900 max-w-[28ch]">{cta.message}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href="mailto:victor@victorsoussan.fr"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gray-900 px-5 text-sm font-medium text-white shadow-sm [@media(hover:hover)]:hover:bg-black [@media(hover:hover)]:hover:shadow-md active:scale-[0.97] transition-[background-color,box-shadow,transform] duration-150 ease-out"
                >
                  {cta.email}
                </a>
                <a
                  href="https://www.linkedin.com/in/victorsoussan-product-design/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 [@media(hover:hover)]:hover:decoration-gray-900 ${LINK_PRESS}`}
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

          </div>
        </div>
      </section>

      <RelatedContent heading={TRANSLATIONS[lang].related.keep_reading} items={related} id="related" />
    </div>
  )
}
