import React from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, DownloadSimple } from '@phosphor-icons/react/ssr'
import CopyCommand from './CopyCommand'
import InstallTabs, { type InstallTab } from './InstallTabs'
import { SkillPicture, accentOfSkill } from './SkillScene'
import VideoPlayer from '@/components/VideoPlayer'
import ShareButton from '@/components/share/ShareButton'
import { RepoLink, ROW, ROW_ARROW, TEXT_LINK, TEXT_LINK_MUTED } from '@/components/claude/ui'
import { archiveUrl, getTheme, installCommand, relatedSkills, type Lang, type SkillEntry } from '@/data/skillsCatalogue'

/**
 * The page of one skill, in the order a reader asks the questions. First what it is: the name, then one grouped
 * block (description, benefits, result), with the picture of its card beside it from lg up. Then how to install it,
 * one tool at a time in tabs. Then the other skills of the same theme. The text column stays near 600 px wide; the
 * page never splits into two wide columns.
 */

const COPY = {
  en: {
    skills: 'Skills',
    claude: 'Claude',
    own: 'Free to use',
    reco: 'Recommended',
    description: 'Description',
    benefits: 'Benefits',
    result: 'Result',
    install: 'Install',
    tools: 'Installation by tool',
    copy: 'Copy',
    copied: 'Copied',
    claudeCode: 'Claude Code',
    codex: 'Codex',
    claudeAi: 'Claude.ai',
    codeSteps: 'Paste the command in a terminal. In a new session, type /skills to check that the skill is listed.',
    codexSteps: 'Paste the command in a terminal. Codex reads the skills in ~/.agents/skills.',
    claudeAiSteps: 'Download the archive. In Claude.ai, open Settings, Capabilities, Skills, then upload the file.',
    download: 'Download the archive',
    demos: 'Live demos',
    quickTitle: 'Install in Claude Code',
    quickSteps: 'Paste it in a terminal, then type /skills in a new session.',
    quickSource: 'Install from the source',
    otherTools: 'Codex, Claude.ai',
    films: 'The demos',
    filmsLabel: 'Demo by device',
    fromSource: 'Follow the installation steps on the page of the source.',
    related: 'In the same theme',
    all: 'All the skills',
    by: 'By',
    license: 'license',
    freeMit: 'MIT license',
  },
  fr: {
    skills: 'Skills',
    claude: 'Claude',
    own: 'Libre accès',
    reco: 'Recommandée',
    description: 'Description',
    benefits: 'Bénéfices',
    result: 'Résultat',
    install: 'Installer',
    tools: 'Installation selon l’outil',
    copy: 'Copier',
    copied: 'Copié',
    claudeCode: 'Claude Code',
    codex: 'Codex',
    claudeAi: 'Claude.ai',
    codeSteps: 'Collez la commande dans un terminal. Dans une nouvelle session, tapez /skills pour vérifier que la skill apparaît.',
    codexSteps: 'Collez la commande dans un terminal. Codex lit les skills du dossier ~/.agents/skills.',
    claudeAiSteps: 'Téléchargez l’archive. Dans Claude.ai, ouvrez Réglages, Capacités, Skills, puis importez le fichier.',
    download: 'Télécharger l’archive',
    demos: 'Les démos en direct',
    quickTitle: 'Installer dans Claude Code',
    quickSteps: 'Collez-la dans un terminal, puis tapez /skills dans une nouvelle session.',
    quickSource: 'Installer depuis la source',
    otherTools: 'Codex, Claude.ai',
    films: 'Les démos',
    filmsLabel: 'Démo selon l’appareil',
    fromSource: 'Suivez les étapes d’installation sur la page de la source.',
    related: 'Dans le même thème',
    all: 'Toutes les skills',
    by: 'Par',
    license: 'licence',
    freeMit: 'Licence MIT',
  },
} as const

/** French typography: a no-break space before : ; ? ! */
const nb = (s: string, lang: Lang) => (lang === 'fr' ? s.replace(/ ([:;?!»])/g, ' $1').replace(/« /g, '« ') : s)

export default function SkillDetail({ skill, lang }: { skill: SkillEntry; lang: Lang }) {
  const c = COPY[lang]
  const own = skill.origin === 'own'
  const theme = getTheme(skill.themes[0])
  const accent = accentOfSkill(skill)
  const claudeCode = installCommand(skill, '~/.claude/skills')
  const codex = installCommand(skill, '~/.agents/skills')
  const zip = archiveUrl(skill)
  const related = relatedSkills(skill)

  const licence = own ? c.freeMit : `${c.by} ${skill.author}${skill.license ? `, ${c.license} ${skill.license}` : ''}`

  const tabs: InstallTab[] = [
    {
      id: 'claude-code',
      label: c.claudeCode,
      panel: claudeCode ? (
        <div className="space-y-3">
          <CopyCommand command={claudeCode} label={c.copy} copiedLabel={c.copied} />
          <p className="max-w-[52ch] text-sm text-gray-600">{nb(c.codeSteps, lang)}</p>
        </div>
      ) : (
        <div className="space-y-1">
          <p className="max-w-[52ch] text-sm text-gray-600">{c.fromSource}</p>
          <RepoLink href={skill.href} />
        </div>
      ),
    },
  ]
  if (codex) {
    tabs.push({
      id: 'codex',
      label: c.codex,
      panel: (
        <div className="space-y-3">
          <CopyCommand command={codex} label={c.copy} copiedLabel={c.copied} />
          <p className="max-w-[52ch] text-sm text-gray-600">{c.codexSteps}</p>
        </div>
      ),
    })
  }
  if (zip) {
    tabs.push({
      id: 'claude-ai',
      label: c.claudeAi,
      panel: (
        <div className="space-y-1">
          <p className="max-w-[52ch] text-sm text-gray-600">{nb(c.claudeAiSteps, lang)}</p>
          <a href={zip} className={TEXT_LINK}>
            <DownloadSimple size={16} aria-hidden="true" />
            <span className="link-line">{c.download}</span>
          </a>
        </div>
      ),
    })
  }

  const filmTabs: InstallTab[] = (skill.films ?? []).map((f) => ({
    id: f.id,
    label: f.label[lang],
    panel: (
      <figure>
        <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[#E8E8E8] ring-1 ring-inset ring-black/[0.04] sm:aspect-[16/10]">
          <VideoPlayer
            src={f.src}
            poster={f.poster}
            lang={lang}
            containerClassName="h-full w-full"
            className="h-full w-full object-contain"
          />
        </div>
        <figcaption className="mt-3 text-sm text-gray-500">{nb(f.caption[lang], lang)}</figcaption>
      </figure>
    ),
  }))

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      <header className="wrap pt-10 pb-14 md:pt-16 md:pb-20">
        <div className="mb-8 flex items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="min-w-0 text-sm text-gray-500">
            <Link href={`/${lang}/claude`} className="transition-colors duration-150 [@media(hover:hover)]:hover:text-gray-900">{c.claude}</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href={`/${lang}/skills`} className="transition-colors duration-150 [@media(hover:hover)]:hover:text-gray-900">{c.skills}</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-gray-900">{skill.name}</span>
          </nav>
          <ShareButton target="page" variant="pill" title={skill.name} />
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-start lg:gap-x-16">
          <div className="max-w-[600px]">
            <h1 className="break-words font-mono text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-gray-900 md:text-[44px]">{skill.name}</h1>
            <p className="mt-3 text-sm text-gray-500">
              {theme.label[lang]} · {own ? c.own : c.reco}
            </p>

            {/* The practical block: the install in Claude Code, at the top, as the way in. The full section below keeps every tool. */}
            <div className="mt-8 rounded-2xl bg-[#F4F4F2] p-4 ring-1 ring-inset ring-black/[0.04] md:p-5">
              <p className="mb-3 text-sm font-medium text-gray-900">{claudeCode ? c.quickTitle : c.quickSource}</p>
              {claudeCode ? (
                <>
                  <CopyCommand command={claudeCode} label={c.copy} copiedLabel={c.copied} />
                  <p className="mt-3 max-w-[52ch] text-sm text-gray-600">{c.quickSteps}</p>
                </>
              ) : (
                <p className="max-w-[48ch] text-sm text-gray-600">{c.fromSource}</p>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-x-5">
                {zip && (
                  <a href={zip} className={TEXT_LINK}>
                    <DownloadSimple size={16} aria-hidden="true" />
                    <span className="link-line">{c.download}</span>
                  </a>
                )}
                {!claudeCode && <RepoLink href={skill.href} />}
                {tabs.length > 1 && (
                  <a href="#skill-install-section" className={TEXT_LINK_MUTED}>
                    <span className="link-line">{c.otherTools}</span>
                    <ArrowRight size={14} weight="bold" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

            <dl className="mt-8 divide-y divide-gray-100 border-y border-gray-100 text-[15px]">
              <div className="grid gap-x-8 gap-y-1.5 py-4 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
                <dt className="text-sm text-gray-500">{c.description}</dt>
                <dd className="text-gray-700">{nb(skill.summary[lang], lang)}</dd>
              </div>
              <div className="grid gap-x-8 gap-y-1.5 py-4 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
                <dt className="text-sm text-gray-500">{c.benefits}</dt>
                <dd>
                  <ul className="space-y-2 text-gray-700">
                    {skill.benefits[lang].map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-gray-400" aria-hidden="true" />
                        {nb(b, lang)}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="grid gap-x-8 gap-y-1.5 py-4 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
                <dt className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.hex }} aria-hidden="true" />
                  {c.result}
                </dt>
                <dd className="text-gray-900">{nb(skill.outcome[lang], lang)}</dd>
              </div>
            </dl>

            <div className="mt-4 flex flex-wrap items-center gap-x-5">
              {claudeCode && <RepoLink href={skill.href} />}
              {skill.demos && (
                <a href={skill.demos} target="_blank" rel="noopener noreferrer" className={`group ${TEXT_LINK_MUTED}`}>
                  <span className="link-line">{c.demos}</span>
                  <ArrowUpRight size={12} weight="bold" aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
              <span className="text-sm text-gray-400">{licence}</span>
            </div>
          </div>

          <div data-hover-scope className="rounded-2xl border border-gray-100 bg-white p-2.5 md:p-3">
            <SkillPicture skill={skill} lang={lang} />
          </div>
        </div>
      </header>

      {filmTabs.length > 0 && (
        <section className="wrap border-t border-gray-200 pb-10 pt-8 md:pb-14" aria-labelledby="skill-films">
          <div className="max-w-[880px]">
            <h2 id="skill-films" className="text-title-3 text-gray-900">{c.films}</h2>
            <div className="mt-5">
              <InstallTabs tabs={filmTabs} label={c.filmsLabel} />
            </div>
          </div>
        </section>
      )}

      <section id="skill-install-section" className="wrap scroll-mt-24 border-t border-gray-200 pb-10 pt-8 md:pb-14" aria-labelledby="skill-install">
        <div className="max-w-[600px]">
          <h2 id="skill-install" className="text-title-3 text-gray-900">{c.install}</h2>
          <div className="mt-5">
            <InstallTabs tabs={tabs} label={c.tools} />
          </div>
        </div>
      </section>

      <section className="wrap border-t border-gray-200 pb-16 pt-8 md:pb-24" aria-labelledby="skill-related">
        <div className="max-w-[600px]">
          <h2 id="skill-related" className="text-title-3 text-gray-900">{c.related}</h2>
          {related.length > 0 && (
            <div className="mt-2 divide-y divide-gray-100 border-b border-gray-100">
              {related.map((r) => (
                <Link key={r.id} href={`/${lang}/skills/${r.id}`} className={ROW}>
                  <div className="min-w-0">
                    <h3 className="font-mono text-[15px] font-semibold tracking-[-0.01em] text-gray-900">{r.name}</h3>
                    <p className="mt-1 max-w-[56ch] text-sm text-gray-600">{nb(r.summary[lang], lang)}</p>
                  </div>
                  <ArrowRight size={16} aria-hidden="true" className={ROW_ARROW} />
                </Link>
              ))}
            </div>
          )}
          <Link href={`/${lang}/skills`} className={`group ${TEXT_LINK} mt-4`}>
            <span className="link-line">{c.all}</span>
            <ArrowRight size={14} weight="bold" aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
