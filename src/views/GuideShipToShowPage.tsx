/**
 * GuideShipToShowPage - Single-page methodology guide
 * Follows the same visual language as GuideClaudeCodePage (light theme, article typography)
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Clock, Calendar, CaretRight, Check,
  GithubLogo, ArrowSquareOut,
  Terminal, Package, FilmStrip, PencilLine, Rocket, Crosshair, TreeStructure,
} from '@phosphor-icons/react';
import AuthorContactCard from '../components/AuthorContactCard';
import {
  SHIP_TO_SHOW_META,
  SHIP_TO_SHOW_PHASES,
  SHIP_TO_SHOW_PROBLEM,
  SHIP_TO_SHOW_SOLUTION,
  SHIP_TO_SHOW_PREREQUISITES,
  SHIP_TO_SHOW_INSTALL,
} from '../data/guideShipToShowData';

interface Props {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  onNavigate: (target: string) => void;
}

const TAG_STYLES: Record<string, string> = {
  'Méthodologie': 'bg-gray-100 text-gray-500',
  'Methodology': 'bg-gray-100 text-gray-500',
  'Claude Code': 'bg-gray-100 text-gray-500',
};

const PHASE_ICONS = [Crosshair, TreeStructure, Package, FilmStrip, PencilLine, Terminal, Rocket];

const PHASE_COLORS = [
  { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200' },
  { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200' },
  { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200' },
  { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200' },
  { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200' },
  { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200' },
  { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200' },
];

const GuideShipToShowPage: React.FC<Props> = ({ lang, onNavigate }) => {
  const meta = SHIP_TO_SHOW_META;
  const categories = lang === 'fr' ? meta.categories_fr : meta.categories_en;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      data-scroll-container
      className="min-h-screen bg-[#FCFCFD]"
    >
      {/* Breadcrumb bar - sticky below Nav */}
      <div className="sticky z-10 backdrop-blur-xl bg-[#FCFCFD]/80 border-gray-200" style={{ top: 'var(--nav-height, 72px)', transition: 'top 250ms cubic-bezier(0.23, 1, 0.32, 1)' }}>
        <div className="max-w-[740px] mx-auto px-4 md:px-6 h-10 flex items-center">
          <nav className="flex items-center gap-1.5 text-[13px] min-w-0 overflow-hidden">
            <button
              onClick={() => onNavigate('ressources')}
              className="transition-colors cursor-pointer hover:underline flex-shrink-0 text-gray-400 hover:text-gray-900"
            >
              {lang === 'fr' ? 'Ressources' : 'Resources'}
            </button>
            <CaretRight size={10} className="flex-shrink-0 text-gray-300" />
            <span className="truncate font-medium text-gray-900">
              {meta.title_fr}
            </span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[740px] mx-auto px-6 pb-20 pt-8 md:pt-10">
        {/* ─── Hero ─── */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <span key={cat} className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${TAG_STYLES[cat as string] || 'bg-gray-100 text-gray-600'}`}>
                {cat}
              </span>
            ))}
          </div>
          <h1 className="text-base font-semibold tracking-[-0.01em] mb-4 text-gray-900">
            {meta.title_fr}
          </h1>
          <p className="text-base leading-relaxed mb-6 max-w-[55ch] text-gray-500">
            {lang === 'fr' ? meta.subtitle_fr : meta.subtitle_en}
          </p>
          <div className="flex items-center gap-3 text-gray-400">
            <img src={meta.author.image} alt={meta.author.name} className="w-9 h-9 rounded-full object-cover" />
            <div className="text-sm">
              <span className="font-medium text-gray-900">{meta.author.name}</span>
              <span className="mx-2">&middot;</span>
              <span className="inline-flex items-center gap-1">
                <Calendar size={12} />
                {new Date(meta.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="mx-2">&middot;</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={12} />{meta.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div>
            {/* ─── The Problem ─── */}
            <section id="problem" className="mb-14 scroll-mt-28">
              <h2 className="text-base font-semibold tracking-[-0.01em] mb-5 text-gray-900">
                {lang === 'fr' ? 'Le problème' : 'The problem'}
              </h2>
              <p className="text-base md:text-[1.0625rem] leading-[1.85] text-gray-600 max-w-[65ch]">
                {lang === 'fr' ? SHIP_TO_SHOW_PROBLEM.fr : SHIP_TO_SHOW_PROBLEM.en}
              </p>
            </section>

            {/* ─── The Framework ─── */}
            <section className="mb-14 scroll-mt-28">
              <div className="p-6 rounded-xl border-l-2 border-gray-200 bg-gray-50/50 mb-8">
                <p className="text-[15px] leading-[1.8] text-gray-700">
                  {lang === 'fr' ? SHIP_TO_SHOW_SOLUTION.fr : SHIP_TO_SHOW_SOLUTION.en}
                </p>
              </div>
            </section>

            {/* ─── The 7 Phases ─── */}
            <section id="phases" className="mb-14 scroll-mt-28">
              <h2 className="text-base font-semibold tracking-[-0.01em] mb-8 text-gray-900">
                {lang === 'fr' ? 'Les 7 phases' : 'The 7 phases'}
              </h2>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[19px] top-8 bottom-8 w-px bg-gray-200 hidden md:block" />

                <div className="flex flex-col gap-6">
                  {SHIP_TO_SHOW_PHASES.map((phase, idx) => {
                    const Icon = PHASE_ICONS[idx];
                    const color = PHASE_COLORS[idx];
                    return (
                      <motion.div
                        key={phase.number}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1], delay: idx * 0.06 }}
                        className="relative flex gap-4 md:gap-6"
                      >
                        {/* Phase number circle */}
                        <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-xl ${color.bg} ${color.border} border flex items-center justify-center`}>
                          <Icon size={18} weight="bold" className={color.text} />
                        </div>

                        {/* Phase content */}
                        <div className="flex-1 min-w-0 pb-2">
                          {/* Header */}
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                            <h3 className="text-base font-semibold tracking-[-0.01em] text-gray-900">
                              {phase.number}. {lang === 'fr' ? phase.name_fr : phase.name_en}
                            </h3>
                            <span className="text-[13px] text-gray-400 flex items-center gap-1">
                              <Clock size={12} /> {phase.duration}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-gray-500 leading-relaxed mb-3 max-w-[60ch]">
                            {lang === 'fr' ? phase.description_fr : phase.description_en}
                          </p>

                          {/* Input / Output */}
                          <div className="flex flex-wrap gap-3 mb-3">
                            <span className="inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1 rounded-md bg-gray-100 text-gray-500">
                              <span className="font-semibold text-gray-600">{lang === 'fr' ? 'Entrée' : 'Input'}:</span>
                              {lang === 'fr' ? phase.input_fr : phase.input_en}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1 rounded-md bg-gray-100 text-gray-500">
                              <span className="font-semibold text-gray-600">{lang === 'fr' ? 'Sortie' : 'Output'}:</span>
                              {lang === 'fr' ? phase.output_fr : phase.output_en}
                            </span>
                          </div>

                          {/* Checklist */}
                          <ul className="space-y-1.5">
                            {(lang === 'fr' ? phase.checklist_fr : phase.checklist_en).map((item, cIdx) => (
                              <li key={cIdx} className="flex items-start gap-2 text-[13px] text-gray-500">
                                <Check size={14} weight="bold" className="flex-shrink-0 mt-0.5 text-gray-300" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ─── Installation ─── */}
            <section id="install" className="mb-14 scroll-mt-28 pt-10 border-t border-gray-100">
              <h2 className="text-base font-semibold tracking-[-0.01em] mb-5 text-gray-900">
                {lang === 'fr' ? 'Installation comme skill Claude Code' : 'Install as a Claude Code skill'}
              </h2>
              <p className="text-[15px] leading-[1.75] text-gray-600 mb-4 max-w-[60ch]">
                {lang === 'fr'
                  ? 'Une commande pour installer le skill. Ensuite, taper /ship-to-show dans n\'importe quel projet pour lancer le framework.'
                  : 'One command to install the skill. Then type /ship-to-show in any project to launch the framework.'}
              </p>
              <pre className="bg-[#18181b] text-[#e4e4e7] p-5 rounded-xl overflow-x-auto text-[13px] leading-[1.7] border border-white/[0.06] mb-4">
                <code>{SHIP_TO_SHOW_INSTALL.command}</code>
              </pre>
              <p className="text-[13px] text-gray-400">
                {lang === 'fr' ? 'Puis invoquer avec ' : 'Then invoke with '}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[12px] font-mono text-gray-700">{SHIP_TO_SHOW_INSTALL.invocation}</code>
              </p>
            </section>

            {/* ─── Example: RiskOS ─── */}
            <section id="example" className="mb-14 scroll-mt-28 pt-10 border-t border-gray-100">
              <h2 className="text-base font-semibold tracking-[-0.01em] mb-5 text-gray-900">
                {lang === 'fr' ? 'Exemple : RiskOS' : 'Example: RiskOS'}
              </h2>
              <p className="text-[15px] leading-[1.75] text-gray-600 mb-5 max-w-[60ch]">
                {lang === 'fr'
                  ? 'Le framework a été conçu et testé sur RiskOS, un prototype de détection de fraude augmentée par IA agentique. Le case study complet a été produit en une session de 2h30, du prototype brut à la page publiée.'
                  : 'The framework was designed and tested on RiskOS, an AI-augmented fraud detection prototype. The complete case study was produced in a single 2h30 session, from raw prototype to published page.'}
              </p>
              <a
                href={`/${lang}/project/${meta.exampleProject.slug}/summary`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.97] ring-1 ring-black shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                style={{ transition: 'background-color 200ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
              >
                {lang === 'fr' ? 'Voir le case study RiskOS' : 'View the RiskOS case study'}
                <ArrowSquareOut size={16} />
              </a>
            </section>

            {/* ─── GitHub CTA ─── */}
            <section className="mb-14 scroll-mt-28 pt-10 border-t border-gray-100">
              <div className="p-6 md:p-8 rounded-2xl border bg-white border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0">
                    <GithubLogo size={24} weight="bold" className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold tracking-[-0.01em] mb-1 text-gray-900">
                      {lang === 'fr' ? 'Code source et documentation' : 'Source code and documentation'}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4 text-gray-500 max-w-[50ch]">
                      {lang === 'fr'
                        ? 'Le skill complet, les prompts de chaque phase et la documentation sont disponibles sur GitHub.'
                        : 'The full skill, phase prompts, and documentation are available on GitHub.'}
                    </p>
                    <a
                      href={meta.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.97] ring-1 ring-black shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                      style={{ transition: 'background-color 200ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
                    >
                      <GithubLogo size={16} weight="bold" />
                      {lang === 'fr' ? 'Voir sur GitHub' : 'View on GitHub'}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── Author + Contact CTA ─── */}
            <AuthorContactCard lang={lang} />

            {/* Back to resources */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => onNavigate('ressources')}
                className="group inline-flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer text-gray-500 hover:text-gray-900"
              >
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                {lang === 'fr' ? 'Retour aux ressources' : 'Back to resources'}
              </button>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GuideShipToShowPage;
