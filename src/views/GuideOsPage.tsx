'use client'

/**
 * GuideOsPage - "A personal OS with Claude Code" (single-page guide)
 * Same grammar as GuideShipToShowPage: a full-width header, then one hairline-separated section per topic on
 * the one content column (.act-wide), with a sticky table-of-contents bar once the reader has scrolled.
 * Content: src/data/guideOsData.ts, in step with the `personal-os` skill.
 */

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowSquareOut, ArrowUpRight, CaretRight, Calendar, Clock, DownloadSimple } from '@phosphor-icons/react'
import AuthorContactCard from '../components/AuthorContactCard'
import CaseStudyTOCBar from '../components/CaseStudyTOCBar'
import { ActRule } from '../components/case-study/ActSection'
import RelatedContent, { type RelatedItem } from '../components/RelatedContent'
import CodeBlock from '../components/guide/CodeBlock'
import OsHero from '../components/guide/OsHero'
import PromptCard from '../components/guide/PromptCard'
import { SHIP_TO_SHOW_META } from '../data/guideShipToShowData'
import { PILL, RepoLink } from '../components/claude/ui'
import { SKILLS } from '../data/skillsCatalogue'
import {
  GUIDE_OS_META, OS_SECTIONS, OS_WHY, OS_NEEDS, OS_INSTALL, OS_STEPS_INTRO, OS_STEPS, OS_DAILY,
  OS_USECASES, OS_EXAMPLE, OS_SAFETY, OS_MORE, OS_LABELS,
  type BuildStep, type L, type UseCase, type BeforeAfter,
} from '../data/guideOsData'
import { TRANSLATIONS } from '../data/translations'
import { useReveal } from '../lib/motion'
import { scrollToElement } from '../utils/smoothScroll'

type Lang = 'en' | 'fr'

interface Props {
  lang: Lang
  /** Follow-up cards (computed on the server) */
  related: RelatedItem[]
}

const TAG_STYLE = 'bg-gray-100 text-gray-600'
/** One section on the content column: same rhythm for every block of the page */
const SECTION = 'act-wide pt-12 md:pt-16 pb-12 md:pb-16'
const H2 = 'text-subhead text-gray-900 max-w-[26ch] mb-5'
const BODY = 'text-base text-gray-600 max-w-[62ch]'
const OVERLINE = 'text-micro font-medium uppercase tracking-[0.08em] text-gray-500'
const CARD = 'rounded-2xl border border-gray-100 bg-white p-6'
const BUTTON = PILL
const LINK = 'group inline-flex items-center gap-1.5 text-gray-900 [@media(hover:hover)]:hover:text-gray-500 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 rounded-sm'

/** A short bullet list in the grammar of the resource brief */
function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-[1.6] text-gray-600">
          <span aria-hidden="true" className="mt-[0.62em] h-1 w-1 shrink-0 rounded-full bg-gray-400" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function Section({ id, last = false, children }: { id: string; last?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <ActRule />
      <div className={last ? 'act-wide pt-12 md:pt-16 pb-16 md:pb-24' : SECTION}>{children}</div>
    </section>
  )
}

function WhySection({ lang }: { lang: Lang }) {
  const reveal = useReveal()
  return (
    <Section id="why">
      <h2 className={H2}>{OS_WHY.title[lang]}</h2>
      <p className={BODY}>{OS_WHY.intro[lang]}</p>

      <h3 className={`${OVERLINE} mt-10 mb-4`}>{OS_WHY.partsTitle[lang]}</h3>
      <dl className="grid gap-x-12 gap-y-0 lg:grid-cols-2">
        {OS_WHY.parts.map((p) => (
          <div key={p.name} className="border-t border-gray-100 py-4">
            <dt className="font-mono text-xs font-medium text-gray-900">{p.name}</dt>
            <dd className="mt-1.5 text-sm leading-[1.6] text-gray-600 max-w-[52ch]">{p.text[lang]}</dd>
          </div>
        ))}
      </dl>

      <h3 className={`${OVERLINE} mt-12 mb-4`}>{OS_WHY.benefitsTitle[lang]}</h3>
      <ul className="grid gap-4 md:grid-cols-3">
        {OS_WHY.benefits.map((b, i) => (
          <motion.li key={b.title.en} {...reveal(i)} className={CARD}>
            <p className="text-title-3 text-gray-900">{b.title[lang]}</p>
            <p className="mt-2 text-sm leading-[1.6] text-gray-600">{b.text[lang]}</p>
          </motion.li>
        ))}
      </ul>
    </Section>
  )
}

function NeedsSection({ lang }: { lang: Lang }) {
  return (
    <Section id="needs">
      <h2 className={H2}>{OS_NEEDS.title[lang]}</h2>
      <ul className="grid gap-x-12 gap-y-6 md:grid-cols-3">
        {OS_NEEDS.items.map((n, i) => (
          <li key={n.title.en} className="border-t border-gray-100 pt-4">
            <p className="text-xs font-medium tabular-nums text-gray-500">0{i + 1}</p>
            <p className="mt-1 text-title-3 text-gray-900">{n.title[lang]}</p>
            <p className="mt-2 text-sm leading-[1.6] text-gray-600">{n.text[lang]}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-gray-500 max-w-[62ch]">{OS_NEEDS.optional[lang]}</p>
      <p className="mt-2 text-sm text-gray-600">
        <Link href={`/${lang}/guide/claude-code`} className={LINK}>
          <span className="link-line">{lang === 'fr' ? 'Installer Claude Code : le guide' : 'Installing Claude Code: the guide'}</span>
        </Link>
      </p>
    </Section>
  )
}

function InstallSection({ lang }: { lang: Lang }) {
  const t = (l: L) => l[lang]
  return (
    <Section id="install">
      <h2 className={H2}>{t(OS_INSTALL.title)}</h2>
      <p className={`${BODY} mb-6`}>{t(OS_INSTALL.intro)}</p>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <a href={GUIDE_OS_META.skillUrl} className={BUTTON} download>
          <DownloadSimple size={16} weight="bold" aria-hidden="true" />
          {t(OS_INSTALL.download)}
        </a>
        <p className="text-xs text-gray-500">{t(OS_INSTALL.downloadHint)}</p>
        <RepoLink href={SKILLS.find((k) => k.id === 'personal-os')!.href} muted />
      </div>

      <div className="mt-10 space-y-8">
        {OS_INSTALL.targets.map((target) => (
          <div key={target.id} className="min-w-0">
            <h3 className="text-title-3 text-gray-900">{t(target.title)}</h3>
            <p className="mt-1.5 mb-3 text-sm text-gray-600">{t(target.text)}</p>
            {target.command && <CodeBlock code={target.command} lang={lang} file="terminal" copy />}
          </div>
        ))}
      </div>

      <div className="mt-10 max-w-[62ch]">
        <h3 className="text-title-3 text-gray-900">{t(OS_INSTALL.startTitle)}</h3>
        <p className="mt-1.5 mb-3 text-sm text-gray-600">{t(OS_INSTALL.startText)}</p>
        <PromptCard label={OS_LABELS.prompt[lang]} text={t(OS_INSTALL.startPrompt)} lang={lang} />
        <p className="mt-4 text-sm text-gray-600">
          <Link href={`/${lang}/skills/personal-os`} className={LINK}>
            <span className="link-line">{t(OS_INSTALL.catalogue)}</span>
            <ArrowRight size={14} weight="bold" aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
          </Link>
        </p>
      </div>

      {/* The no-install route: the structure by hand */}
      <aside className={`${CARD} mt-12 md:p-8`}>
        <h3 className="text-title-3 text-gray-900">{t(OS_INSTALL.manual.title)}</h3>
        <p className="mt-2 mb-4 text-sm leading-[1.6] text-gray-600 max-w-[62ch]">{t(OS_INSTALL.manual.text)}</p>
        <CodeBlock code={OS_INSTALL.manual.command} lang={lang} file="terminal" copy />
      </aside>
    </Section>
  )
}

function StepItem({ step, index, lang }: { step: BuildStep; index: number; lang: Lang }) {
  const reveal = useReveal()
  return (
    <motion.li {...reveal(0)} id={`step-${step.id}`} className="min-w-0 border-t border-gray-100 pt-6 scroll-mt-28">
      <p className={OVERLINE}>{OS_LABELS.step[lang]} {index + 1} / {OS_STEPS.length}</p>
      <h3 className="mt-2 text-title-2 text-gray-900">{step.title[lang]}</h3>
      <p className={`${BODY} mt-3 text-sm`}>{step.intro[lang]}</p>

      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="min-w-0">
          <PromptCard label={OS_LABELS.prompt[lang]} text={step.prompt[lang]} lang={lang} />
        </div>
        <div className="min-w-0">
          <p className={`${OVERLINE} mb-3`}>{OS_LABELS.result[lang]}</p>
          <Bullets items={step.result[lang]} />
        </div>
      </div>

      {step.snippets.length > 0 && (
        <div className="mt-6 space-y-4">
          {step.snippets.map((s) => (
            <CodeBlock key={s.file} code={s.code[lang]} lang={lang} file={s.file} caption={s.caption?.[lang]} />
          ))}
        </div>
      )}
    </motion.li>
  )
}

function BuildSection({ lang }: { lang: Lang }) {
  return (
    <Section id="build">
      <h2 className={H2}>{OS_SECTIONS[3].label[lang]}</h2>
      <p className={`${BODY} mb-10`}>{OS_STEPS_INTRO[lang]}</p>
      <ol className="space-y-12 md:space-y-14">
        {OS_STEPS.map((step, i) => (
          <StepItem key={step.id} step={step} index={i} lang={lang} />
        ))}
      </ol>
    </Section>
  )
}

function DailySection({ lang }: { lang: Lang }) {
  const reveal = useReveal()
  return (
    <Section id="daily">
      <h2 className={H2}>{OS_DAILY.title[lang]}</h2>
      <p className={`${BODY} mb-8`}>{OS_DAILY.intro[lang]}</p>
      <ul className="grid gap-4 md:grid-cols-2">
        {OS_DAILY.routines.map((r, i) => (
          <motion.li key={r.title.en} {...reveal(i)} className={CARD}>
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-title-3 text-gray-900">{r.title[lang]}</p>
              <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                <Clock size={12} aria-hidden="true" />
                {r.time[lang]}
              </span>
            </div>
            <p className="mt-2 text-sm leading-[1.6] text-gray-600">{r.text[lang]}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {r.commands.map((c) => (
                <code key={c} className="rounded-full bg-gray-100 px-3 py-1.5 font-mono text-xs text-gray-700">{c}</code>
              ))}
            </div>
          </motion.li>
        ))}
      </ul>
    </Section>
  )
}

function UseCaseCard({ item, index, lang }: { item: UseCase; index: number; lang: Lang }) {
  const reveal = useReveal()
  const L = OS_USECASES.labels
  return (
    <motion.li {...reveal(index % 2)} className={`${CARD} min-w-0`}>
      <p className="text-xs font-medium tabular-nums text-gray-500">0{index + 1}</p>
      <h3 className="mt-1 text-title-3 text-gray-900">{item.title[lang]}</h3>
      <dl className="mt-4 space-y-4 text-sm leading-[1.6]">
        <div>
          <dt className={OVERLINE}>{L.situation[lang]}</dt>
          <dd className="mt-1 text-gray-600">{item.situation[lang]}</dd>
        </div>
        <div>
          <dt className={OVERLINE}>{L.ask[lang]}</dt>
          <dd className="mt-1 rounded-xl bg-gray-50 px-3.5 py-3 text-gray-900">{item.ask[lang]}</dd>
        </div>
        <div>
          <dt className={OVERLINE}>{L.does[lang]}</dt>
          <dd className="mt-1 text-gray-600">{item.does[lang]}</dd>
        </div>
      </dl>
    </motion.li>
  )
}

function UseCasesSection({ lang }: { lang: Lang }) {
  return (
    <Section id="usecases">
      <h2 className={H2}>{OS_USECASES.title[lang]}</h2>
      <p className={`${BODY} mb-8`}>{OS_USECASES.intro[lang]}</p>
      <ol className="grid gap-4 lg:grid-cols-2 lg:items-start">
        {OS_USECASES.items.map((item, i) => (
          <UseCaseCard key={item.title.en} item={item} index={i} lang={lang} />
        ))}
      </ol>
    </Section>
  )
}

function ChangeBlock({ change, lang }: { change: BeforeAfter; lang: Lang }) {
  return (
    <li className="min-w-0 border-t border-gray-100 pt-6">
      <h4 className="text-title-3 text-gray-900">{change.title[lang]}</h4>
      <p className="mt-2 mb-4 text-sm leading-[1.6] text-gray-600 max-w-[62ch]">{change.text[lang]}</p>
      <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
        <CodeBlock code={change.before[lang]} lang={lang} file={`${OS_EXAMPLE.beforeLabel[lang]} · ${change.file}`} />
        <CodeBlock code={change.after[lang]} lang={lang} file={`${OS_EXAMPLE.afterLabel[lang]} · ${change.file}`} />
      </div>
    </li>
  )
}

function ExampleSection({ lang }: { lang: Lang }) {
  const E = OS_EXAMPLE
  return (
    <Section id="example">
      <h2 className={H2}>{E.title[lang]}</h2>
      <p className={`${BODY} mb-8`}>{E.intro[lang]}</p>

      <h3 className="text-title-2 text-gray-900 mb-4">{E.noteTitle[lang]}</h3>
      <CodeBlock code={E.note[lang]} lang={lang} file={E.noteFile} />

      <h3 className="text-title-2 text-gray-900 mt-10 mb-4">{E.spottedTitle[lang]}</h3>
      <Bullets items={E.spotted[lang]} />

      <h3 className="text-title-2 text-gray-900 mt-12 mb-6">{E.resultTitle[lang]}</h3>
      <ul className="space-y-10">
        {E.changes.map((c) => (
          <ChangeBlock key={c.id} change={c} lang={lang} />
        ))}
      </ul>
      <p className={`${BODY} mt-10 text-sm`}>{E.closing[lang]}</p>
    </Section>
  )
}

function SafetySection({ lang }: { lang: Lang }) {
  return (
    <Section id="safety">
      <h2 className={H2}>{OS_SAFETY.title[lang]}</h2>
      <p className={`${BODY} mb-8`}>{OS_SAFETY.intro[lang]}</p>
      <ol className="grid gap-x-12 gap-y-0 lg:grid-cols-2">
        {OS_SAFETY.rules.map((r, i) => (
          <li key={r.title.en} className="border-t border-gray-100 py-4">
            <p className="text-xs font-medium tabular-nums text-gray-500">0{i + 1}</p>
            <p className="mt-1 text-title-3 text-gray-900">{r.title[lang]}</p>
            <p className="mt-1.5 text-sm leading-[1.6] text-gray-600 max-w-[52ch]">{r.text[lang]}</p>
          </li>
        ))}
      </ol>

      <h3 className="text-title-2 text-gray-900 mt-12 mb-4">{OS_SAFETY.faqTitle[lang]}</h3>
      <dl className="grid gap-x-12 lg:grid-cols-2">
        {OS_SAFETY.faq.map((f) => (
          <div key={f.q.en} className="border-t border-gray-100 py-4">
            <dt className="text-title-3 text-gray-900">{f.q[lang]}</dt>
            <dd className="mt-1.5 text-sm leading-[1.6] text-gray-600 max-w-[52ch]">{f.a[lang]}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

function MoreSection({ lang }: { lang: Lang }) {
  return (
    <Section id="more" last>
      <h2 className={H2}>{OS_MORE.title[lang]}</h2>
      <ul className="grid gap-4 md:grid-cols-3">
        {OS_MORE.links.map((l) => (
          <li key={l.path}>
            <Link
              href={`/${lang}/${l.path}`}
              className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 transition-[border-color,transform] duration-300 ease-media [@media(hover:hover)]:hover:border-gray-200 [@media(hover:hover)]:hover:-translate-y-0.5"
            >
              <span className="flex items-center justify-between gap-3 text-title-3 text-gray-900">
                {l.title[lang]}
                <ArrowSquareOut size={16} aria-hidden="true" className="shrink-0 text-gray-400" />
              </span>
              <span className="mt-2 text-sm leading-[1.6] text-gray-600">{l.text[lang]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default function GuideOsPage({ lang, related }: Props) {
  const meta = GUIDE_OS_META
  const author = SHIP_TO_SHOW_META.author
  const [activeSection, setActiveSection] = useState('')
  const [showTOC, setShowTOC] = useState(false)

  // Active section for the TOC bar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id)
      },
      { rootMargin: '-112px 0px -60% 0px', threshold: 0 },
    )
    OS_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // The TOC bar appears after 300px of scroll
  useEffect(() => {
    const onScroll = () => setShowTOC(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div data-scroll-container className="min-h-screen bg-[#FCFCFD]">
      {/* Breadcrumb bar, sticky below the Nav; swapped for the TOC bar once the reader has scrolled */}
      <div
        className="sticky z-10 backdrop-blur-xl bg-[#FCFCFD]/80"
        style={{ top: 'var(--nav-height, 64px)', transition: 'top 250ms cubic-bezier(0.23, 1, 0.32, 1)' }}
      >
        {showTOC ? (
          <CaseStudyTOCBar
            sections={OS_SECTIONS.map((s) => ({ id: s.id, label: s.label[lang] }))}
            activeSection={activeSection}
            onSectionClick={scrollToElement}
            lang={lang}
          />
        ) : (
          <div className="wrap h-10 flex items-center">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs min-w-0 overflow-hidden">
              <Link
                href={`/${lang}/ressources`}
                className="flex-shrink-0 text-gray-500 [@media(hover:hover)]:hover:underline [@media(hover:hover)]:hover:text-gray-900"
              >
                {OS_LABELS.resources[lang]}
              </Link>
              <CaretRight size={10} className="flex-shrink-0 text-gray-300" aria-hidden="true" />
              <span className="truncate font-medium text-gray-900">{meta.title[lang]}</span>
            </nav>
          </div>
        )}
      </div>

      <article>
        <header className="wrap pt-10 md:pt-16 pb-10 md:pb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {meta.categories[lang].map((cat) => (
              <span key={cat} className={`px-2.5 py-1 rounded-full text-micro font-semibold ${TAG_STYLE}`}>{cat}</span>
            ))}
          </div>
          <h1 className="text-headline text-balance max-w-[26ch] text-gray-900">{meta.title[lang]}</h1>
          <p className="mt-6 md:mt-8 text-lead-lg text-gray-600 max-w-[54ch]">{meta.subtitle[lang]}</p>
          <div className="mt-6 md:mt-8 flex items-center gap-3 text-gray-500">
            <img src={author.image} alt={author.name} className="w-9 h-9 rounded-full object-cover" />
            <div className="text-xs">
              <span className="font-medium text-gray-900">{author.name}</span>
              <span className="mx-2" aria-hidden="true">&middot;</span>
              <span className="inline-flex items-center gap-1">
                <Calendar size={12} aria-hidden="true" />
                {new Date(meta.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="mx-2" aria-hidden="true">&middot;</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={12} aria-hidden="true" />{meta.readTime[lang]}
              </span>
            </div>
          </div>
        </header>

        <div className="act-wide pb-4 md:pb-6">
          <OsHero lang={lang} />
        </div>

        <WhySection lang={lang} />
        <NeedsSection lang={lang} />
        <InstallSection lang={lang} />
        <BuildSection lang={lang} />
        <DailySection lang={lang} />
        <UseCasesSection lang={lang} />
        <ExampleSection lang={lang} />
        <SafetySection lang={lang} />
        <MoreSection lang={lang} />
      </article>

      <RelatedContent heading={TRANSLATIONS[lang].related.keep_reading} items={related} id="related" />
      <AuthorContactCard lang={lang} />
    </div>
  )
}
