'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CaretDown, Check, MagnifyingGlass, X } from '@phosphor-icons/react'
import {
  SKILLS,
  SKILLS_REPO,
  SKILL_THEMES,
  getTheme,
  searchText,
  type Lang,
  type SkillEntry,
  type ThemeId,
} from '@/data/skillsCatalogue'
import { SkillPicture, accentOfSkill } from '@/components/skills/SkillScene'
import { RepoLink } from '@/components/claude/ui'
import SkillsHeroStage from '@/components/claude/SkillsHeroStage'

/**
 * The skills catalogue: one grid of illustrated cards, organised by theme, with a search that looks into
 * names, summaries, benefits, outcomes and keywords in both languages. The data lives in
 * `src/data/skillsCatalogue.ts`: adding an entry there adds a card here.
 *
 * Two controls only: the search, the main tool, is the largest element and sits first; the theme is one button
 * that opens a short list. Both sit on a translucent bar that stays under the header while the cards pass
 * beneath it (from md up). Each card leads to the page of its skill.
 */

type ThemeFilter = 'all' | ThemeId

const CARD =
  'group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white outline-offset-4 ' +
  'transition-[transform,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.985] ' +
  '[@media(hover:hover)]:hover:border-gray-200'

/** One curve for everything that moves in the controls: strong ease-out, short */
const EASE = 'ease-[cubic-bezier(0.23,1,0.32,1)]'

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

const COPY = {
  en: {
    title: 'Skills',
    lead: 'Skills for Claude and Codex around product, design, prototyping and animation. Mine are free to use; the others credit their author and link to their source.',
    repo: 'The GitHub repository',
    search: 'Search a skill, a theme, a need',
    searchLabel: 'Search the skills',
    clear: 'Clear the search',
    all: 'All',
    themes: 'Theme',
    more: 'More',
    result: (n: number) => `${n} skill${n > 1 ? 's' : ''}`,
    none: 'No skill matches this search.',
    reset: 'Reset the filters',
    outcome: 'Outcome',
    free: 'Free to use, MIT',
    ownTag: 'Free to use',
    recoTag: 'Recommended',
    installTitle: 'Install a skill',
    installLead: 'Each skill page gives the command to copy. The three ways to install, in short.',
    steps: [
      ['Claude.ai', 'Settings, Capabilities, Skills, then upload the zip as is.'],
      ['Claude Code', 'Unzip the archive into ~/.claude/skills.'],
      ['Codex', 'Unzip the archive into ~/.agents/skills.'],
    ],
  },
  fr: {
    title: 'Skills',
    lead: 'Des skills pour Claude et Codex autour du produit, du design, du prototypage et de l’animation. Les miennes sont en libre accès ; les autres citent leur auteur et renvoient à leur source.',
    repo: 'Le dépôt GitHub',
    search: 'Rechercher une skill, un thème, un besoin',
    searchLabel: 'Rechercher parmi les skills',
    clear: 'Effacer la recherche',
    all: 'Tout',
    themes: 'Thème',
    more: 'Plus',
    result: (n: number) => `${n} skill${n > 1 ? 's' : ''}`,
    none: 'Aucune skill ne correspond à cette recherche.',
    reset: 'Réinitialiser les filtres',
    outcome: 'Résultat',
    free: 'Libre accès, MIT',
    ownTag: 'Libre accès',
    recoTag: 'Recommandée',
    installTitle: 'Installer une skill',
    installLead: 'Chaque page de skill donne la commande à copier. Les trois façons d’installer, en bref.',
    steps: [
      ['Claude.ai', 'Réglages, Capacités, Skills, puis téléverser le zip tel quel.'],
      ['Claude Code', 'Décompresser l’archive dans ~/.claude/skills.'],
      ['Codex', 'Décompresser l’archive dans ~/.agents/skills.'],
    ],
  },
} as const

function readSelectionFromUrl(): { q: string; theme: ThemeFilter } {
  const params = new URLSearchParams(window.location.search)
  const theme = params.get('theme')
  return {
    q: params.get('q') ?? '',
    theme: SKILL_THEMES.some((t) => t.id === theme) ? (theme as ThemeId) : 'all',
  }
}

type ThemeOption = { key: ThemeFilter; label: string; count: number }

/** The three themes shown as pills; the others sit behind "More" */
const MAIN_THEMES: ThemeFilter[] = ['product', 'design', 'prototyping']

/**
 * A button that opens a short list of themes when it is asked for. The list opens under the button, aligned on
 * its right edge so that it stays inside the page, and scales from that corner (150 ms, ease-out); a click
 * outside or Escape closes it. It opens in 250 ms (smooth ease-out) and closes in 150 ms: closing gets out of the way.
 * Each row says how many skills it holds. The button is given by the caller: the
 * full "Theme" button on a phone, the "More" pill from md up.
 */
function ThemeMenu({
  value,
  options,
  onChange,
  label,
  trigger,
  triggerClassName,
}: {
  value: ThemeFilter
  options: ThemeOption[]
  onChange: (v: ThemeFilter) => void
  label: string
  trigger: React.ReactNode
  triggerClassName: string
}) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        button.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    // The chosen row takes the focus, so the arrow of a keyboard user starts where they are
    const frame = requestAnimationFrame(() => (root.current?.querySelector<HTMLElement>('[aria-checked="true"]') ?? root.current?.querySelector<HTMLElement>('[role="menuitemradio"]'))?.focus())
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
      cancelAnimationFrame(frame)
    }
  }, [open])

  const choose = (key: ThemeFilter) => {
    onChange(key)
    setOpen(false)
    button.current?.focus()
  }

  return (
    <div ref={root} className="relative">
      <button ref={button} type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} className={triggerClassName}>
        {trigger}
        <CaretDown size={14} aria-hidden="true" className={`shrink-0 transition-transform duration-200 ${EASE} motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} />
      </button>
      <div
        role="menu"
        aria-label={label}
        className={`absolute right-0 top-[calc(100%+8px)] z-50 w-[min(calc(100vw-2.5rem),280px)] origin-top-right rounded-2xl bg-white p-1.5 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)] transition-[opacity,transform,visibility] motion-reduce:transition-none ${
          open
            ? 'visible scale-100 opacity-100 duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
            : 'invisible scale-[0.97] opacity-0 duration-150 ease-out'
        }`}
      >
        {options.map((o) => {
          const on = value === o.key
          return (
            <button
              key={o.key}
              type="button"
              role="menuitemradio"
              aria-checked={on}
              onClick={() => choose(o.key)}
              className={`flex min-h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 text-left text-[13px] transition-colors duration-150 [@media(hover:hover)]:hover:bg-black/[0.04] ${on ? 'font-semibold text-gray-900' : 'text-gray-700'}`}
            >
              <span>{o.label}</span>
              <span className="flex items-center gap-2 tabular-nums text-gray-400">
                {o.count}
                {on ? <Check size={14} weight="bold" aria-hidden="true" className="text-gray-900" /> : <span className="w-3.5" aria-hidden="true" />}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const PILL =
  `flex min-h-11 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full px-4 text-[13px] font-medium transition-[background-color,color,transform] duration-150 ${EASE} active:scale-[0.97] disabled:cursor-default disabled:opacity-40 disabled:active:scale-100`
const PILL_OFF = 'bg-black/[0.05] text-gray-900 [@media(hover:hover)]:hover:bg-black/[0.08]'
const PILL_ON = 'bg-gray-900 text-white'

/**
 * The themes, from md up: "All", the three main themes, then "More" with the other ones in a list. When the chosen
 * theme is one of those in the list, the "More" pill takes its name and the dark fill, so the choice stays visible.
 */
function ThemePills({ value, options, onChange, label, more }: { value: ThemeFilter; options: ThemeOption[]; onChange: (v: ThemeFilter) => void; label: string; more: string }) {
  const pills = options.filter((o) => o.key === 'all' || MAIN_THEMES.includes(o.key))
  const rest = options.filter((o) => o.key !== 'all' && !MAIN_THEMES.includes(o.key))
  const inRest = rest.find((o) => o.key === value)
  return (
    <div role="group" aria-label={label} className="flex items-center gap-2">
      {pills.map((o) => (
        <button key={o.key} type="button" aria-pressed={value === o.key} disabled={o.count === 0 && value !== o.key} onClick={() => onChange(o.key)} className={`${PILL} ${value === o.key ? PILL_ON : PILL_OFF}`}>
          {o.label}
        </button>
      ))}
      {rest.length > 0 && (
        <ThemeMenu value={value} options={rest} onChange={onChange} label={more} trigger={inRest?.label ?? more} triggerClassName={`${PILL} ${inRest ? PILL_ON : PILL_OFF}`} />
      )}
    </div>
  )
}

function SkillCard({ skill, lang }: { skill: SkillEntry; lang: Lang }) {
  const c = COPY[lang]
  const accent = accentOfSkill(skill)
  const theme = getTheme(skill.themes[0])
  return (
    <Link href={`/${lang}/skills/${skill.id}`} className={CARD} draggable={false}>
      <SkillPicture skill={skill} lang={lang} className="m-2" />
      <div className="flex flex-1 flex-col p-5 pt-4 md:p-6 md:pt-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs text-gray-500">
            {theme.label[lang]} · {skill.origin === 'own' ? c.ownTag : c.recoTag}
          </p>
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="shrink-0 text-gray-900 transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:translate-x-0.5"
          />
        </div>
        <h3 className="mt-2 font-mono text-[17px] font-semibold leading-snug tracking-[-0.01em] text-gray-900 transition-colors duration-150 [@media(hover:hover)]:group-hover:text-gray-500">
          {skill.name}
        </h3>
        <p className="mt-2 text-sm text-gray-600">{skill.summary[lang]}</p>
        <ul className="mt-4 space-y-1.5 text-sm text-gray-700">
          {skill.benefits[lang].map((b) => (
            <li key={b} className="flex gap-2.5">
              <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-gray-400" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-gray-100 pt-3">
          <p className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.hex }} aria-hidden="true" />
            {c.outcome}
          </p>
          <p className="mt-1 text-sm text-gray-900">{skill.outcome[lang]}</p>
        </div>
        <p className="mt-auto pt-4 text-xs text-gray-500">
          {skill.author ? `${skill.author}${skill.license ? ` · ${skill.license}` : ''}` : c.free}
        </p>
      </div>
    </Link>
  )
}

export default function SkillsCataloguePageClient({ lang }: { lang: Lang }) {
  const c = COPY[lang]
  const [q, setQ] = useState('')
  const [theme, setTheme] = useState<ThemeFilter>('all')
  const searchRef = useRef<HTMLInputElement>(null)

  // The page is statically rendered, so a shared link is applied right after mount.
  useEffect(() => {
    const sel = readSelectionFromUrl()
    setQ(sel.q)
    setTheme(sel.theme)
  }, [])

  // "/" jumps to the search, as long as nothing is being typed elsewhere. No animation: a key is not a gesture.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
      const el = document.activeElement
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || (el as HTMLElement).isContentEditable)) return
      e.preventDefault()
      searchRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const writeUrl = (nextQ: string, nextTheme: ThemeFilter) => {
    const url = new URL(window.location.href)
    if (nextQ) url.searchParams.set('q', nextQ)
    else url.searchParams.delete('q')
    if (nextTheme !== 'all') url.searchParams.set('theme', nextTheme)
    else url.searchParams.delete('theme')
    window.history.replaceState(window.history.state, '', url)
  }

  const index = useMemo(() => new Map(SKILLS.map((s) => [s.id, searchText(s)])), [])
  const terms = norm(q).split(/\s+/).filter(Boolean)
  const fits = (s: SkillEntry, themeId: ThemeFilter) =>
    (themeId === 'all' || s.themes.includes(themeId)) &&
    terms.every((t) => index.get(s.id)!.includes(t))
  const shown = SKILLS.filter((s) => fits(s, theme))
  const filtering = terms.length > 0 || theme !== 'all'

  // Without a search, the cards sit under their theme (each one under the first of its themes); with one, in a single list
  const groups: { id: string; label: string; items: SkillEntry[] }[] = terms.length
    ? [{ id: 'results', label: '', items: shown }].filter((g) => g.items.length > 0)
    : (theme === 'all' ? SKILL_THEMES : SKILL_THEMES.filter((t) => t.id === theme))
        .map((t) => ({ id: t.id, label: t.label[lang], items: shown.filter((s) => (theme === 'all' ? s.themes[0] === t.id : true)) }))
        .filter((g) => g.items.length > 0)

  const update = (nextQ: string, nextTheme: ThemeFilter) => {
    setQ(nextQ)
    setTheme(nextTheme)
    writeUrl(nextQ, nextTheme)
  }

  // A theme is offered while it has something to show with the other filters; the chosen one always stays
  const themeOptions: ThemeOption[] = [
    { key: 'all', label: c.all, count: SKILLS.filter((s) => fits(s, 'all')).length },
    ...SKILL_THEMES.map((t) => ({ key: t.id as ThemeFilter, label: t.label[lang], count: SKILLS.filter((s) => fits(s, t.id)).length })).filter((t) => t.count > 0 || t.key === theme),
  ]

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      <header className="wrap pt-10 md:pt-16 pb-12 md:pb-16">
        <h1 className="text-display text-gray-900">{c.title}</h1>
        <p className="mt-6 md:mt-8 text-lead-lg text-gray-600 max-w-[54ch]">{c.lead}</p>
        <div className="mt-6">
          <RepoLink href={SKILLS_REPO} />
        </div>
        {/* The picture of the page: the catalogue and what happens when someone uses it (Stageshow) */}
        <div className="mt-10 overflow-hidden rounded-[28px] bg-[#F4F4F2] ring-1 ring-inset ring-black/[0.04] md:mt-14">
          <div className="aspect-[358/440] w-full min-[560px]:aspect-[960/500]">
            <SkillsHeroStage lang={lang} />
          </div>
        </div>
      </header>

      {/* The controls: a translucent bar that stays under the header from md up. Its lower edge fades out
          instead of ending on a line, so the cards slide beneath it without a hard seam. */}
      <div className="relative z-40 pb-5 md:sticky md:top-[var(--nav-height,56px)]">
        {/* The material lives on its own layer, so that its lower edge can fade without clipping the menu */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(253,253,252,0.86) 70%, rgba(253,253,252,0))',
            backdropFilter: 'blur(16px) saturate(160%)',
            WebkitBackdropFilter: 'blur(16px) saturate(160%)',
            maskImage: 'linear-gradient(to bottom, #000 calc(100% - 20px), transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, #000 calc(100% - 20px), transparent)',
          }}
        />
        <div className="wrap pt-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <form role="search" onSubmit={(e) => e.preventDefault()} className="relative md:max-w-[480px] md:flex-1">
              <MagnifyingGlass size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                ref={searchRef}
                type="search"
                value={q}
                onChange={(e) => update(e.target.value, theme)}
                placeholder={c.search}
                aria-label={c.searchLabel}
                className="peer min-h-11 w-full rounded-full bg-white pl-11 pr-12 text-[15px] text-gray-900 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.09)] outline-none transition-shadow duration-150 placeholder:text-gray-500 focus:shadow-[inset_0_0_0_1.5px_#111827,0_0_0_4px_rgba(17,24,39,0.06)] [&::-webkit-search-cancel-button]:hidden"
              />
              {q ? (
                <button
                  type="button"
                  onClick={() => {
                    update('', theme)
                    searchRef.current?.focus()
                  }}
                  aria-label={c.clear}
                  className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 transition-colors duration-150 [@media(hover:hover)]:hover:bg-black/[0.05] [@media(hover:hover)]:hover:text-gray-900"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              ) : (
                <kbd
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 hidden h-6 min-w-6 -translate-y-1/2 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-1.5 font-mono text-xs text-gray-500 transition-opacity duration-150 peer-focus:opacity-0 md:inline-flex"
                >
                  /
                </kbd>
              )}
            </form>
            <div className="md:ml-auto">
              <div className="md:hidden">
                <ThemeMenu
                  value={theme}
                  options={themeOptions}
                  onChange={(t) => update(q, t)}
                  label={c.themes}
                  trigger={
                    <span className="truncate">
                      <span className="text-gray-500">{c.themes}</span> {themeOptions.find((o) => o.key === theme)?.label}
                    </span>
                  }
                  triggerClassName={`${PILL} w-full justify-between bg-black/[0.05] text-gray-900`}
                />
              </div>
              <div className="hidden md:block">
                <ThemePills value={theme} options={themeOptions} onChange={(t) => update(q, t)} label={c.themes} more={c.more} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="wrap pb-16 md:pb-24" aria-label={c.title}>
        {/* The count: said to screen readers on every change, shown only once something is filtered */}
        <div className="mb-8 flex min-h-6 items-center gap-4 text-sm text-gray-500">
          <p aria-live="polite" className={`tabular-nums ${filtering ? '' : 'sr-only'}`}>
            {c.result(shown.length)}
          </p>
          {filtering && (
            <button
              type="button"
              onClick={() => update('', 'all')}
              className="cursor-pointer text-gray-900 underline decoration-gray-900/25 underline-offset-4 transition-colors duration-150 [@media(hover:hover)]:hover:decoration-gray-900"
            >
              {c.reset}
            </button>
          )}
        </div>

        {groups.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-12 text-center">
            <p className="text-base text-gray-900">{c.none}</p>
            <button
              type="button"
              onClick={() => update('', 'all')}
              className="mt-4 inline-flex min-h-11 items-center rounded-full border border-gray-200 px-5 text-sm font-medium text-gray-900 transition-[border-color,transform] duration-200 ease-out active:scale-[0.97] [@media(hover:hover)]:hover:border-gray-300"
            >
              {c.reset}
            </button>
          </div>
        ) : (
          groups.map((g) => (
            <section key={g.id} className="mb-12 md:mb-16 last:mb-0" aria-label={g.label || c.title}>
              {g.label && (
                <div className="mb-5 flex items-baseline justify-between gap-4 border-t border-gray-200 pt-5">
                  <h2 className="text-title-2 text-gray-900">{g.label}</h2>
                  {theme !== 'all' && <p className="text-xs text-gray-500 tabular-nums">{c.result(g.items.length)}</p>}
                </div>
              )}
              <ul className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((s) => (
                  <li key={s.id} className="min-w-0 list-none">
                    <SkillCard skill={s} lang={lang} />
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </section>

      {/* How to install */}
      <section className="wrap border-t border-gray-200 pt-10 pb-20 md:pb-28" aria-labelledby="skills-install">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          <div className="col-span-12 md:col-span-4">
            <h2 id="skills-install" className="text-title-2 text-gray-900">{c.installTitle}</h2>
            <p className="mt-3 max-w-[36ch] text-sm text-gray-600">{c.installLead}</p>
          </div>
          <ol className="col-span-12 divide-y divide-gray-100 border-b border-gray-100 md:col-span-8">
            {c.steps.map(([tool, how]) => (
              <li key={tool} className="grid grid-cols-[110px_1fr] gap-4 py-4 text-sm">
                <span className="font-medium text-gray-900">{tool}</span>
                <span className="text-gray-600">{how}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}
