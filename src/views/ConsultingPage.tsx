/**
 * ConsultingPage - Minimalist consulting page (Emil Kowalski aesthetic)
 * Narrow container, divide-y sections, no cards, no colors, no shadows.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';
import {
  ArrowRight,
  Envelope as Mail,
} from '@phosphor-icons/react';
import CaseStudyTOCBar from '../components/CaseStudyTOCBar';
import {
  LIFECYCLE_PHASES,
  OFFERINGS,
  SCENARIOS,
  REFERENCES,
  DELIVERY_MODES,
} from '../data/consultingData';

type Language = 'en' | 'fr';

interface ConsultingPageProps {
  systemTheme: 'light' | 'dark';
  lang: Language;
  onBack: () => void;
  onContact: () => void;
  onProjectClick?: (projectId: string) => void;
}

const SECTION_IDS = ['situations', 'methodology', 'offerings', 'scenarios', 'references', 'delivery', 'cta'];

const TOC_SECTIONS = {
  en: [
    { id: 'top', label: 'Top' },
    { id: 'situations', label: 'Situations' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'offerings', label: 'Offerings' },
    { id: 'scenarios', label: 'Scenarios' },
    { id: 'references', label: 'References' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'cta', label: 'Get Started' },
  ],
  fr: [
    { id: 'top', label: 'D\u00e9but' },
    { id: 'situations', label: 'Situations' },
    { id: 'methodology', label: 'M\u00e9thodologie' },
    { id: 'offerings', label: 'Offres' },
    { id: 'scenarios', label: 'Mises en situation' },
    { id: 'references', label: 'R\u00e9f\u00e9rences' },
    { id: 'delivery', label: 'Modalit\u00e9s' },
    { id: 'cta', label: 'D\u00e9marrer' },
  ],
};

const TRANSLATIONS = {
  en: {
    page_title: 'Consulting',
    page_subtitle: 'Design consulting for complex digital products',
    page_intro: 'Product strategy, user research and design for teams building enterprise tools, B2B/B2G platforms, SaaS products and public services. 15 years of product design experience. I work alongside digital directors, product leadership and engineering teams, at the intersection of strategy, methodology and execution.',
    availability: 'Available for missions starting Q2 2026',
    cta_primary: 'Discuss your project',
    situations_title: 'You may recognize these situations',
    situations_intro: 'Each phase of a digital product carries specific challenges where design and user research change the outcome.',
    col_symptom: 'What you observe',
    col_cause: 'What is happening',
    col_cost: 'What it costs you',
    situations_cta: 'These situations are addressable. Here is how I approach them.',
    methodology_title: 'How an engagement works',
    methodology_intro: 'A clear process, from the first conversation to autonomous continuation. Each phase produces concrete deliverables.',
    method_phases: [
      {
        num: '01',
        title: 'Diagnostic',
        duration: '1-2 weeks',
        desc: 'I audit the current product, user flows, and decision-making processes. I interview stakeholders and end users to map the gaps between business intent and user reality.',
        deliverable: 'Diagnosis document with prioritized opportunities, risk mapping, and a recommended action plan.',
      },
      {
        num: '02',
        title: 'Framing',
        duration: '1-2 weeks',
        desc: 'We align on the problem perimeter, success criteria and constraints. I facilitate workshops with your team to build shared understanding and define what the first cycle will produce.',
        deliverable: 'Scoping document with validated hypotheses, success metrics, and a detailed execution plan.',
      },
      {
        num: '03',
        title: 'Execution',
        duration: '4-12 weeks',
        desc: 'Short, iterative cycles. Each cycle produces a testable artifact: a prototype, a tested flow, a design system foundation. I work embedded with your product and engineering teams.',
        deliverable: 'Functional prototypes, tested user flows, documented design decisions, implementation-ready specifications.',
      },
      {
        num: '04',
        title: 'Handoff',
        duration: '1-2 weeks',
        desc: 'I document everything produced, train your team on new processes, and establish the rituals and tools for autonomous continuation.',
        deliverable: 'Complete project documentation, team training materials, and a follow-up recommendations memo.',
      },
    ],
    offerings_title: 'Service offerings',
    offerings_intro: 'Five formats that can be combined according to your context, your phase, and your budget.',
    offerings_note: 'Each engagement is scoped individually. These indications reflect typical project ranges.',
    tjm_note: 'Indicative daily rate: 700 EUR excl. VAT. Adjusted based on format, duration, and scope.',
    deliverables_label: 'Deliverables',
    duration_label: 'Duration',
    scenarios_title: 'Concrete engagement scenarios',
    scenarios_intro: 'Three realistic situations, from the first conversation to measurable outcomes.',
    scenario_context: 'Context',
    scenario_timeline: 'How it unfolds',
    scenario_outcome: 'Outcome',
    scenario_offerings: 'Offerings involved',
    references_title: 'Reference clients',
    references_intro: 'Organizations I have worked with, the scope of the engagement, and what it produced.',
    view_case_study: 'View case study',
    delivery_title: 'Delivery modes',
    delivery_intro: 'Three formats to match the way your organization works and the nature of the engagement.',
    best_for: 'Best suited for',
    cta_title: 'Let\u2019s talk about your product challenges',
    cta_desc: 'Whether you have a defined scope or are still exploring, a 30-minute conversation is the best way to determine if my approach fits your context. No commitment, no pitch deck.',
    cta_button: 'Schedule a conversation',
    cta_email: 'Or write to me directly',
  },
  fr: {
    page_title: 'Consulting',
    page_subtitle: 'Consulting design pour produits num\u00e9riques complexes',
    page_intro: 'Strat\u00e9gie produit, recherche utilisateur et design pour les \u00e9quipes qui construisent des outils m\u00e9tier, des plateformes B2B/B2G, des produits SaaS et des services publics. 15 ans d\u2019exp\u00e9rience en conception produit. Je travaille aux c\u00f4t\u00e9s des directions digitales, des \u00e9quipes produit et de l\u2019engineering, \u00e0 l\u2019intersection de la strat\u00e9gie, de la m\u00e9thodologie et de l\u2019ex\u00e9cution.',
    availability: 'Disponible pour des missions \u00e0 partir du T2 2026',
    cta_primary: 'Parlons de votre projet',
    situations_title: 'Vous vous reconnaissez peut-\u00eatre',
    situations_intro: 'Chaque phase d\u2019un produit num\u00e9rique porte des enjeux sp\u00e9cifiques o\u00f9 le design et la recherche utilisateur changent la donne.',
    col_symptom: 'Ce que vous observez',
    col_cause: 'Ce qui se passe',
    col_cost: 'Ce que \u00e7a vous co\u00fbte',
    situations_cta: 'Ces situations sont adressables. Voici comment j\u2019interviens.',
    methodology_title: 'Comment se d\u00e9roule une mission',
    methodology_intro: 'Un processus clair, de la premi\u00e8re conversation \u00e0 l\u2019autonomie de votre \u00e9quipe. Chaque phase produit des livrables concrets.',
    method_phases: [
      {
        num: '01',
        title: 'Diagnostic',
        duration: '1-2 semaines',
        desc: 'J\u2019audite le produit existant, les parcours utilisateurs et les processus de d\u00e9cision. J\u2019interviewe les parties prenantes et les utilisateurs pour cartographier les \u00e9carts entre l\u2019intention m\u00e9tier et la r\u00e9alit\u00e9 d\u2019usage.',
        deliverable: 'Document de diagnostic avec opportunit\u00e9s prioris\u00e9es, cartographie des risques et plan d\u2019action recommand\u00e9.',
      },
      {
        num: '02',
        title: 'Cadrage',
        duration: '1-2 semaines',
        desc: 'On aligne le p\u00e9rim\u00e8tre du probl\u00e8me, les crit\u00e8res de succ\u00e8s et les contraintes. J\u2019anime des ateliers avec votre \u00e9quipe pour construire une compr\u00e9hension partag\u00e9e et d\u00e9finir ce que le premier cycle produira.',
        deliverable: 'Document de cadrage avec hypoth\u00e8ses valid\u00e9es, m\u00e9triques de succ\u00e8s et plan d\u2019ex\u00e9cution d\u00e9taill\u00e9.',
      },
      {
        num: '03',
        title: 'R\u00e9alisation',
        duration: '4-12 semaines',
        desc: 'Des cycles courts et it\u00e9ratifs. Chaque cycle produit un artefact testable : un prototype, un parcours test\u00e9, une fondation de design system. Je travaille en int\u00e9gration avec vos \u00e9quipes produit et engineering.',
        deliverable: 'Prototypes fonctionnels, parcours test\u00e9s, d\u00e9cisions design document\u00e9es, sp\u00e9cifications exploitables.',
      },
      {
        num: '04',
        title: 'Passation',
        duration: '1-2 semaines',
        desc: 'Je documente tout ce qui a \u00e9t\u00e9 produit, je forme votre \u00e9quipe aux nouveaux processus, et je mets en place les rituels et outils pour la continuit\u00e9 autonome.',
        deliverable: 'Documentation compl\u00e8te du projet, supports de formation, m\u00e9mo de recommandations pour la suite.',
      },
    ],
    offerings_title: 'Offres de service',
    offerings_intro: 'Cinq formats combinables selon votre contexte, votre phase produit et votre budget.',
    offerings_note: 'Chaque mission est cadr\u00e9e individuellement. Ces indications refl\u00e8tent des fourchettes courantes.',
    tjm_note: 'TJM indicatif : 700 \u20ac HT. Ajust\u00e9 selon le format, la dur\u00e9e et le p\u00e9rim\u00e8tre.',
    deliverables_label: 'Livrables',
    duration_label: 'Dur\u00e9e',
    scenarios_title: 'Mises en situation concr\u00e8tes',
    scenarios_intro: 'Trois situations r\u00e9alistes, de la premi\u00e8re conversation aux r\u00e9sultats mesurables.',
    scenario_context: 'Contexte',
    scenario_timeline: 'Comment \u00e7a se d\u00e9roule',
    scenario_outcome: 'R\u00e9sultat',
    scenario_offerings: 'Offres impliqu\u00e9es',
    references_title: 'Clients de r\u00e9f\u00e9rence',
    references_intro: 'Les organisations avec lesquelles j\u2019ai travaill\u00e9, le p\u00e9rim\u00e8tre de la mission, et ce que \u00e7a a produit.',
    view_case_study: 'Voir le case study',
    delivery_title: 'Modalit\u00e9s de prestation',
    delivery_intro: 'Trois formats pour s\u2019adapter au fonctionnement de votre organisation et \u00e0 la nature de la mission.',
    best_for: 'Id\u00e9al pour',
    cta_title: 'Parlons de vos enjeux produit',
    cta_desc: 'Que vous ayez un p\u00e9rim\u00e8tre d\u00e9fini ou que vous exploriez encore vos options, une conversation de 30 minutes est le meilleur moyen de d\u00e9terminer si mon approche correspond \u00e0 votre contexte. Sans engagement.',
    cta_button: 'Prendre rendez-vous',
    cta_email: 'Ou \u00e9crivez-moi directement',
  },
};

const ConsultingPage: React.FC<ConsultingPageProps> = ({ lang, onContact, onProjectClick }) => {
  const t = TRANSLATIONS[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('top');
  const [showTOC, setShowTOC] = useState(false);
  const isEn = lang === 'en';

  const sections = TOC_SECTIONS[lang];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const l = useCallback((obj: any, field: string): string => {
    const key = `${field}_${lang}`;
    return (obj[key] as string) || '';
  }, [lang]);

  // Scroll detection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowTOC(container.scrollTop > 300);
      let current = 'top';
      for (let i = 0; i < SECTION_IDS.length; i++) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            current = SECTION_IDS[i];
          }
        }
      }
      setActiveSection(current);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    if (!containerRef.current) return;
    if (sectionId === 'top') {
      smoothScrollTo(containerRef.current, 0);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const offset = containerRef.current.scrollTop + (elRect.top - containerRect.top) - 80;
      smoothScrollTo(containerRef.current, offset);
    }
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="consulting-page-title"
      className="fixed inset-0 md:top-16 z-[100] overflow-y-auto bg-[#FDFDFC]"
    >
      {/* Sticky TOC bar */}
      {showTOC && (
        <div
          className="sticky z-10 backdrop-blur-xl bg-[#FDFDFC]/80"
          style={{ top: 'var(--nav-height, 72px)', transition: 'top 250ms cubic-bezier(0.23, 1, 0.32, 1)' }}
        >
          <CaseStudyTOCBar
            sections={sections}
            activeSection={activeSection}
            onSectionClick={scrollToSection}
            isDark={false}
            lang={lang}
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-[740px] mx-auto px-6 pt-32 md:pt-40">

        {/* ========== HERO ========== */}
        <div className="pb-24 md:pb-40">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-6">
            {t.availability}
          </p>

          <h1
            id="consulting-page-title"
            className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4"
          >
            {t.page_subtitle}
          </h1>

          <p className="text-base text-gray-500 leading-relaxed mb-8">
            {t.page_intro}
          </p>

          <button
            onClick={onContact}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            {t.cta_primary}
            <ArrowRight size={14} />
          </button>
        </div>

        {/* ========== SITUATIONS ========== */}
        <section id="situations" className="py-24 md:py-40 border-t border-gray-100">
          <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-2">
            {t.situations_title}
          </h2>
          <p className="text-base text-gray-500 leading-relaxed mb-10">
            {t.situations_intro}
          </p>

          {/* Table header */}
          <div className="hidden md:grid grid-cols-4 gap-4 pb-3 mb-0">
            <div className="text-xs text-gray-400 uppercase tracking-wider" />
            <div className="text-xs text-gray-400 uppercase tracking-wider">{t.col_symptom}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">{t.col_cause}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">{t.col_cost}</div>
          </div>

          {/* Table rows */}
          <div className="divide-y divide-gray-100">
            {LIFECYCLE_PHASES.map((phase) => (
              <div key={phase.id} className="py-5 md:grid md:grid-cols-4 md:gap-4">
                <div className="text-sm font-medium text-gray-900 mb-3 md:mb-0">
                  {l(phase, 'title')}
                </div>
                {/* Mobile labels */}
                <div className="mb-3 md:mb-0">
                  <span className="text-xs text-gray-400 uppercase tracking-wider md:hidden block mb-1">{t.col_symptom}</span>
                  <p className="text-base text-gray-500 leading-relaxed">{l(phase, 'symptom')}</p>
                </div>
                <div className="mb-3 md:mb-0">
                  <span className="text-xs text-gray-400 uppercase tracking-wider md:hidden block mb-1">{t.col_cause}</span>
                  <p className="text-base text-gray-500 leading-relaxed">{l(phase, 'cause')}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider md:hidden block mb-1">{t.col_cost}</span>
                  <p className="text-base text-gray-500 leading-relaxed">{l(phase, 'cost')}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-gray-500">
            {t.situations_cta}
          </p>
        </section>

        {/* ========== METHODOLOGY ========== */}
        <section id="methodology" className="py-24 md:py-40 border-t border-gray-100">
          <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-2">
            {t.methodology_title}
          </h2>
          <p className="text-base text-gray-500 leading-relaxed mb-10">
            {t.methodology_intro}
          </p>

          <div className="divide-y divide-gray-100">
            {t.method_phases.map((phase) => (
              <div key={phase.num} className="py-5">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-xs text-gray-400">{phase.num}</span>
                  <h3 className="text-base font-medium text-gray-900">{phase.title}</h3>
                  <span className="text-xs text-gray-400 ml-auto">{phase.duration}</span>
                </div>
                <p className="text-base text-gray-500 leading-relaxed mb-3 pl-8">
                  {phase.desc}
                </p>
                <p className="text-sm text-gray-400 leading-relaxed pl-8">
                  {phase.deliverable}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========== OFFERINGS ========== */}
        <section id="offerings" className="py-24 md:py-40 border-t border-gray-100">
          <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-2">
            {t.offerings_title}
          </h2>
          <p className="text-base text-gray-500 leading-relaxed mb-10">
            {t.offerings_intro}
          </p>

          <div className="divide-y divide-gray-100">
            {OFFERINGS.map((offering) => (
              <div key={offering.id} className="py-5">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-base font-medium text-gray-900">
                    {l(offering, 'title')}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {l(offering, 'duration')}
                  </span>
                </div>
                <p className="text-base text-gray-500 leading-relaxed mb-3">
                  {l(offering, 'desc')}
                </p>
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
                    {t.deliverables_label}
                  </span>
                  <ul className="space-y-1">
                    {(isEn ? offering.deliverables_en : offering.deliverables_fr).map((d, i) => (
                      <li key={i} className="text-sm text-gray-500 pl-3 relative before:absolute before:left-0 before:top-[0.6em] before:w-1 before:h-1 before:rounded-full before:bg-gray-300">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-5 border-t border-gray-100">
            <p className="text-sm text-gray-500">{t.tjm_note}</p>
            <p className="text-sm text-gray-400 mt-1">{t.offerings_note}</p>
          </div>
        </section>

        {/* ========== SCENARIOS ========== */}
        <section id="scenarios" className="py-24 md:py-40 border-t border-gray-100">
          <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-2">
            {t.scenarios_title}
          </h2>
          <p className="text-base text-gray-500 leading-relaxed mb-10">
            {t.scenarios_intro}
          </p>

          <div className="divide-y divide-gray-100">
            {SCENARIOS.map((scenario) => (
              <div key={scenario.id} className="py-6">
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="text-base font-medium text-gray-900">
                    {l(scenario, 'title')}
                  </h3>
                  <span className="text-xs text-gray-400 flex-shrink-0 ml-4">
                    {l(scenario, 'duration')}
                  </span>
                </div>

                {/* Context */}
                <div className="mb-4">
                  <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                    {t.scenario_context}
                  </span>
                  <p className="text-base text-gray-500 leading-relaxed">
                    {l(scenario, 'context')}
                  </p>
                </div>

                {/* Timeline */}
                <div className="mb-4">
                  <span className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
                    {t.scenario_timeline}
                  </span>
                  <div className="space-y-2">
                    {scenario.steps.map((step, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="text-xs text-gray-400 w-24 flex-shrink-0 pt-0.5">
                          {l(step, 'label')}
                        </span>
                        <p className="text-base text-gray-500 leading-relaxed">
                          {l(step, 'detail')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcome */}
                <div className="mb-4">
                  <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                    {t.scenario_outcome}
                  </span>
                  <p className="text-base text-gray-500 leading-relaxed">
                    {l(scenario, 'outcome')}
                  </p>
                </div>

                {/* Offerings involved */}
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                    {t.scenario_offerings}
                  </span>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {scenario.offerings.map((offeringId) => {
                      const offering = OFFERINGS.find(o => o.id === offeringId);
                      if (!offering) return null;
                      return (
                        <span key={offeringId} className="text-sm text-gray-500">
                          {l(offering, 'title')}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={onContact}
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              {t.cta_primary}
              <ArrowRight size={14} />
            </button>
          </div>
        </section>

        {/* ========== REFERENCES ========== */}
        <section id="references" className="py-24 md:py-40 border-t border-gray-100">
          <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-2">
            {t.references_title}
          </h2>
          <p className="text-base text-gray-500 leading-relaxed mb-10">
            {t.references_intro}
          </p>

          <div className="divide-y divide-gray-100">
            {REFERENCES.map((ref) => (
              <div key={ref.id} className="py-5">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-sm font-medium text-gray-900">{ref.client}</h3>
                  <span className="text-xs text-gray-400">{l(ref, 'duration')}</span>
                </div>
                <p className="text-xs text-gray-400 mb-2">{l(ref, 'sector')}</p>
                <p className="text-base text-gray-500 leading-relaxed mb-1">{l(ref, 'scope')}</p>
                <p className="text-base text-gray-500 leading-relaxed">{l(ref, 'outcome')}</p>
                {ref.caseStudyId && onProjectClick && (
                  <button
                    onClick={() => onProjectClick(ref.caseStudyId!)}
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mt-2"
                  >
                    {t.view_case_study}
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ========== DELIVERY MODES ========== */}
        <section id="delivery" className="py-24 md:py-40 border-t border-gray-100">
          <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-2">
            {t.delivery_title}
          </h2>
          <p className="text-base text-gray-500 leading-relaxed mb-10">
            {t.delivery_intro}
          </p>

          <div className="divide-y divide-gray-100">
            {DELIVERY_MODES.map((mode) => (
              <div key={mode.id} className="py-5">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-base font-medium text-gray-900">
                    {l(mode, 'title')}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {l(mode, 'duration')}
                  </span>
                </div>
                <p className="text-base text-gray-500 leading-relaxed mb-3">
                  {l(mode, 'desc')}
                </p>
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
                    {t.best_for}
                  </span>
                  <ul className="space-y-1">
                    {(isEn ? mode.best_for_en : mode.best_for_fr).map((item, i) => (
                      <li key={i} className="text-sm text-gray-500 pl-3 relative before:absolute before:left-0 before:top-[0.6em] before:w-1 before:h-1 before:rounded-full before:bg-gray-300">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========== CTA ========== */}
        <section id="cta" className="py-24 md:py-40 border-t border-gray-100">
          <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-2">
            {t.cta_title}
          </h2>

          <p className="text-base text-gray-500 leading-relaxed mb-8">
            {t.cta_desc}
          </p>

          <button
            onClick={onContact}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
          >
            <Mail size={14} />
            {t.cta_button}
            <ArrowRight size={14} />
          </button>

          <p className="text-sm text-gray-400">
            {t.cta_email}:{' '}
            <a
              href="mailto:victorsoussan@gmail.com"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              victorsoussan@gmail.com
            </a>
          </p>
        </section>

      </div>
    </motion.div>
  );
};

export default ConsultingPage;
