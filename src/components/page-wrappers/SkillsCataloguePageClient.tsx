'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
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
import { SkillPicture } from '@/components/skills/SkillScene'
import { RepoLink } from '@/components/claude/ui'
import SkillsHeroStage from '@/components/claude/SkillsHeroStage'
import LibraryCard, { LIBRARY_PICTURE } from '@/components/library/LibraryCard'
import { EmptyResults, LibraryBar, LibraryFilters, ResultsMeta, SearchField, normalize, writeParams, type FilterOption } from '@/components/library/LibraryControls'

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

/** One curve for everything that moves in the controls: strong ease-out, short */
const EASE = 'ease-[cubic-bezier(0.23,1,0.32,1)]'

const norm = normalize

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

/** The three themes shown as pills; the others sit behind "More" */
const MAIN_THEMES: ThemeFilter[] = ['product', 'design', 'prototyping']

function SkillCard({ skill, lang }: { skill: SkillEntry; lang: Lang }) {
  const c = COPY[lang]
  const theme = getTheme(skill.themes[0])
  return (
    <LibraryCard
      href={`/${lang}/skills/${skill.id}`}
      mono
      picture={<SkillPicture skill={skill} lang={lang} className={LIBRARY_PICTURE} />}
      eyebrow={`${theme.label[lang]} · ${skill.origin === 'own' ? c.ownTag : c.recoTag}`}
      title={skill.name}
      summary={skill.summary[lang]}
    />
  )
}

export default function SkillsCataloguePageClient({ lang }: { lang: Lang }) {
  const c = COPY[lang]
  const [q, setQ] = useState('')
  const [theme, setTheme] = useState<ThemeFilter>('all')

  // The page is statically rendered, so a shared link is applied right after mount.
  useEffect(() => {
    const sel = readSelectionFromUrl()
    setQ(sel.q)
    setTheme(sel.theme)
  }, [])

  const writeUrl = (nextQ: string, nextTheme: ThemeFilter) => writeParams({ q: nextQ, theme: nextTheme !== 'all' ? nextTheme : null })

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
  const themeOptions: FilterOption[] = [
    { key: 'all', label: c.all, count: SKILLS.filter((s) => fits(s, 'all')).length },
    ...SKILL_THEMES.map((t) => ({ key: t.id as ThemeFilter, label: t.label[lang], count: SKILLS.filter((s) => fits(s, t.id)).length })).filter((t) => t.count > 0 || t.key === theme),
  ]

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      <header className="wrap pt-10 md:pt-16 pb-12 md:pb-16">
        <h1 className="build-line text-display text-gray-900">{c.title}</h1>
        <p className="build-rise mt-6 md:mt-8 text-lead-lg text-gray-600 max-w-[54ch]" style={{ ['--d' as string]: '120ms' }}>{c.lead}</p>
        <div className="build-rise mt-6" style={{ ['--d' as string]: '200ms' }}>
          <RepoLink href={SKILLS_REPO} />
        </div>
        {/* The picture of the page: the catalogue and what happens when someone uses it (Stageshow) */}
        <div className="build-media mt-10 overflow-hidden rounded-[28px] bg-[#F4F4F2] ring-1 ring-inset ring-black/[0.04] md:mt-14" style={{ ['--d' as string]: '280ms' }}>
          <div className="aspect-[358/440] w-full min-[560px]:aspect-[960/500]">
            <SkillsHeroStage lang={lang} />
          </div>
        </div>
      </header>

      {/* The controls, shared with the resources (src/components/library/LibraryControls.tsx) */}
      <LibraryBar>
        <SearchField value={q} onChange={(v) => update(v, theme)} placeholder={c.search} label={c.searchLabel} clearLabel={c.clear} />
        <LibraryFilters value={theme} options={themeOptions} onChange={(t) => update(q, t as ThemeFilter)} label={c.themes} more={c.more} mainKeys={MAIN_THEMES} />
      </LibraryBar>

      <section className="wrap pb-16 md:pb-24" aria-label={c.title}>
        <ResultsMeta filtering={filtering} text={c.result(shown.length)} resetLabel={c.reset} onReset={() => update('', 'all')} />

        {groups.length === 0 ? (
          <EmptyResults message={c.none} resetLabel={c.reset} onReset={() => update('', 'all')} />
        ) : (
          groups.map((g) => (
            <section key={g.id} className="mb-12 md:mb-16 last:mb-0" aria-label={g.label || c.title}>
              {g.label && (
                <div className="mb-5 flex items-baseline justify-between gap-4 border-t border-gray-200 pt-5">
                  <h2 className="text-title-2 text-gray-900">{g.label}</h2>
                  {theme !== 'all' && <p className="text-xs text-gray-500 tabular-nums">{c.result(g.items.length)}</p>}
                </div>
              )}
              <ul className="grid gap-5 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
