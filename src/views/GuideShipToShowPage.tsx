/**
 * GuideShipToShowPage - Single-page methodology guide
 * Same grammar as the case-study body: a full-width header, then one hairline-separated section
 * per topic, all on the one content column (.act-wide). Text caps its own measure in `ch`.
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  Clock, Calendar, CaretRight, Check,
  GithubLogo, ArrowSquareOut,
} from '@phosphor-icons/react';
import AuthorContactCard from '../components/AuthorContactCard';
import { ActRule } from '../components/case-study/ActSection';
import RelatedContent, { type RelatedItem } from '../components/RelatedContent';
import { TRANSLATIONS } from '../data/translations';
import { useReveal } from '../lib/motion';
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
  /** Follow-up cards (computed on the server): the other guide first, then related articles */
  related: RelatedItem[];
}

const TAG_STYLE = 'bg-gray-100 text-gray-600';

/** One section on the content column: same rhythm for every block of the page */
const SECTION = 'act-wide pt-12 md:pt-16 pb-12 md:pb-16';
/** Section title: same role as an act title */
const H2 = 'text-subhead text-gray-900 max-w-[26ch] mb-5';
const BUTTON =
  'btn-dark inline-flex items-center gap-2 min-h-11 px-5 rounded-full text-sm font-medium bg-gray-900 text-white [@media(hover:hover)]:hover:bg-black active:scale-[0.97]';
const BUTTON_TRANSITION = { transition: 'background-color 200ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' };

const GuideShipToShowPage: React.FC<Props> = ({ lang, onNavigate, related }) => {
  const reveal = useReveal();
  const meta = SHIP_TO_SHOW_META;
  const categories = lang === 'fr' ? meta.categories_fr : meta.categories_en;

  return (
    <div data-scroll-container className="min-h-screen bg-[#FCFCFD]">
      {/* Breadcrumb bar - sticky below Nav */}
      <div className="sticky z-10 backdrop-blur-xl bg-[#FCFCFD]/80 border-gray-200" style={{ top: 'var(--nav-height, 64px)', transition: 'top 250ms cubic-bezier(0.23, 1, 0.32, 1)' }}>
        <div className="wrap h-10 flex items-center">
          <nav className="flex items-center gap-1.5 text-xs min-w-0 overflow-hidden">
            <button
              onClick={() => onNavigate('ressources')}
              className="transition-colors cursor-pointer flex-shrink-0 text-gray-500 [@media(hover:hover)]:hover:underline [@media(hover:hover)]:hover:text-gray-900"
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

      <article>
        {/* ─── Header: full width, like Approche ─── */}
        <header className="wrap pt-10 md:pt-16 pb-12 md:pb-16">
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <span key={cat} className={`px-2.5 py-1 rounded-full text-micro font-semibold ${TAG_STYLE}`}>
                {cat}
              </span>
            ))}
          </div>
          <h1 className="text-headline text-balance max-w-[26ch] text-gray-900">
            {meta.title_fr}
          </h1>
          <p className="mt-6 md:mt-8 text-lead-lg text-gray-600 max-w-[54ch]">
            {lang === 'fr' ? meta.subtitle_fr : meta.subtitle_en}
          </p>
          <div className="mt-6 md:mt-8 flex items-center gap-3 text-gray-500">
            <img src={meta.author.image} alt={meta.author.name} className="w-9 h-9 rounded-full object-cover" />
            <div className="text-xs">
              <span className="font-medium text-gray-900">{meta.author.name}</span>
              <span className="mx-2" aria-hidden="true">&middot;</span>
              <span className="inline-flex items-center gap-1">
                <Calendar size={12} aria-hidden="true" />
                {new Date(meta.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="mx-2" aria-hidden="true">&middot;</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={12} aria-hidden="true" />{meta.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* ─── The Problem ─── */}
        <section id="problem" className="scroll-mt-28">
          <ActRule />
          <div className={SECTION}>
            <h2 className={H2}>
              {lang === 'fr' ? 'Le problème' : 'The problem'}
            </h2>
            <p className="text-base text-gray-600 max-w-[62ch]">
              {lang === 'fr' ? SHIP_TO_SHOW_PROBLEM.fr : SHIP_TO_SHOW_PROBLEM.en}
            </p>
          </div>
        </section>

        {/* ─── The Framework ─── */}
        <section className="scroll-mt-28">
          <ActRule />
          <div className={SECTION}>
            <p className="text-base text-gray-700 max-w-[62ch]">
              {lang === 'fr' ? SHIP_TO_SHOW_SOLUTION.fr : SHIP_TO_SHOW_SOLUTION.en}
            </p>
          </div>
        </section>

        {/* ─── The 7 Phases: plain blocks, hairline on top, two columns from lg ─── */}
        <section id="phases" className="scroll-mt-28">
          <ActRule />
          <div className={SECTION}>
            <h2 className="text-subhead text-gray-900 max-w-[26ch] mb-8 md:mb-10">
              {lang === 'fr' ? 'Les 7 phases' : 'The 7 phases'}
            </h2>

            <ol className="grid gap-x-12 gap-y-8 md:gap-y-10 lg:grid-cols-2">
              {SHIP_TO_SHOW_PHASES.map((phase, idx) => (
                <motion.li
                  key={phase.number}
                  {...reveal(idx)}
                  className="min-w-0 border-t border-gray-100 pt-5"
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-title-3 text-gray-900">
                      {phase.number}. {lang === 'fr' ? phase.name_fr : phase.name_en}
                    </h3>
                    <span className="text-xs text-gray-500 inline-flex items-center gap-1">
                      <Clock size={12} aria-hidden="true" /> {phase.duration}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-2 text-sm text-gray-600 max-w-[62ch]">
                    {lang === 'fr' ? phase.description_fr : phase.description_en}
                  </p>

                  {/* Input / Output */}
                  <dl className="mt-3 space-y-1 text-xs text-gray-500">
                    <div>
                      <dt className="inline font-semibold text-gray-700">{lang === 'fr' ? 'Entrée' : 'Input'}: </dt>
                      <dd className="inline">{lang === 'fr' ? phase.input_fr : phase.input_en}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold text-gray-700">{lang === 'fr' ? 'Sortie' : 'Output'}: </dt>
                      <dd className="inline">{lang === 'fr' ? phase.output_fr : phase.output_en}</dd>
                    </div>
                  </dl>

                  {/* Checklist */}
                  <ul className="mt-3 space-y-1.5">
                    {(lang === 'fr' ? phase.checklist_fr : phase.checklist_en).map((item, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2 text-xs text-gray-500">
                        <Check size={14} weight="bold" aria-hidden="true" className="flex-shrink-0 mt-px text-gray-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── Installation ─── */}
        <section id="install" className="scroll-mt-28">
          <ActRule />
          <div className={SECTION}>
            <h2 className={H2}>
              {lang === 'fr' ? 'Installation comme skill Claude Code' : 'Install as a Claude Code skill'}
            </h2>
            <p className="text-base text-gray-600 mb-5 max-w-[62ch]">
              {lang === 'fr'
                ? 'Une commande pour installer le skill. Ensuite, taper /ship-to-show dans n\'importe quel projet pour lancer le framework.'
                : 'One command to install the skill. Then type /ship-to-show in any project to launch the framework.'}
            </p>
            <pre className="bg-[#18181b] text-[#e4e4e7] p-5 rounded-2xl overflow-x-auto text-xs leading-[1.7] border border-white/[0.06] mb-4">
              <code>{SHIP_TO_SHOW_INSTALL.command}</code>
            </pre>
            <p className="text-xs text-gray-500">
              {lang === 'fr' ? 'Puis invoquer avec ' : 'Then invoke with '}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-gray-700">{SHIP_TO_SHOW_INSTALL.invocation}</code>
            </p>
          </div>
        </section>

        {/* ─── Example: RiskOS ─── */}
        <section id="example" className="scroll-mt-28">
          <ActRule />
          <div className={SECTION}>
            <h2 className={H2}>
              {lang === 'fr' ? 'Exemple : RiskOS' : 'Example: RiskOS'}
            </h2>
            <p className="text-base text-gray-600 mb-5 max-w-[62ch]">
              {lang === 'fr'
                ? 'Le framework a été conçu et testé sur RiskOS, un prototype de détection de fraude augmentée par IA agentique. Le case study complet a été produit en une session de 2h30, du prototype brut à la page publiée.'
                : 'The framework was designed and tested on RiskOS, an AI-augmented fraud detection prototype. The complete case study was produced in a single 2h30 session, from raw prototype to published page.'}
            </p>
            <a
              href={`/${lang}/project/${meta.exampleProject.slug}`}
              className={BUTTON}
              style={BUTTON_TRANSITION}
            >
              {lang === 'fr' ? 'Voir le case study RiskOS' : 'View the RiskOS case study'}
              <ArrowSquareOut size={16} aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* ─── GitHub: plain block, no tile ─── */}
        <section className="scroll-mt-28">
          <ActRule />
          <div className="act-wide pt-12 md:pt-16 pb-16 md:pb-24">
            <h2 className={H2}>
              {lang === 'fr' ? 'Code source et documentation' : 'Source code and documentation'}
            </h2>
            <p className="text-base text-gray-600 mb-5 max-w-[62ch]">
              {lang === 'fr'
                ? 'Le skill complet, les prompts de chaque phase et la documentation sont disponibles sur GitHub.'
                : 'The full skill, phase prompts, and documentation are available on GitHub.'}
            </p>
            <a
              href={meta.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={BUTTON}
              style={BUTTON_TRANSITION}
            >
              <GithubLogo size={16} weight="bold" aria-hidden="true" />
              {lang === 'fr' ? 'Voir sur GitHub' : 'View on GitHub'}
            </a>
          </div>
        </section>
      </article>

      {/* Follow-up: same block as every content page, then the author block */}
      <RelatedContent heading={TRANSLATIONS[lang].related.keep_reading} items={related} id="related" />
      <AuthorContactCard lang={lang} />
    </div>
  );
};

export default GuideShipToShowPage;
