/**
 * ConsultingPage - Corporate consulting landing page
 * Positions Victor as a senior independent consultant for B2B, B2G, B2B2C.
 * Clay Christensen JTBD approach: starts with frustrations, not features.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';
import {
  X,
  Target,
  Users,
  Lightning as Zap,
  ArrowClockwise as RefreshCw,
  MagnifyingGlass as Search,
  Stack as Layers,
  Calendar,
  Briefcase,
  CheckCircle as CheckCircle2,
  ArrowRight,
  Envelope as Mail,
  CaretDown as ChevronDown,
  ArrowSquareOut as ExternalLink,
} from '@phosphor-icons/react';
import CaseStudyTOCSidebar from '../components/CaseStudyTOCSidebar';
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

// Icon mapping
const ICON_MAP: Record<string, React.FC<{ size?: number | string; className?: string }>> = {
  Target, Users, Zap, RefreshCw, Search, Layers, Calendar, Briefcase,
};

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
    back: 'Back',
    page_title: 'Consulting',
    page_subtitle: 'Design consulting for complex digital products',
    page_intro: 'Product strategy, user research and design for teams building enterprise tools, B2B/B2G platforms, SaaS products and public services. 15 years of product design experience. I work alongside digital directors, product leadership and engineering teams, at the intersection of strategy, methodology and execution.',
    availability: 'Available for missions starting Q2 2026',
    cta_primary: 'Discuss your project',
    // Situations
    situations_title: 'You may recognize these situations',
    situations_intro: 'Each phase of a digital product carries specific challenges where design and user research change the outcome. The symptoms are often visible, the structural causes less so.',
    col_symptom: 'What you observe',
    col_cause: 'What is happening',
    col_cost: 'What it costs you',
    situations_cta: 'These situations are addressable. Here is how I approach them.',
    // Methodology
    methodology_title: 'How an engagement works',
    methodology_intro: 'A clear process, from the first conversation to autonomous continuation. Each phase produces concrete deliverables that your team can act on immediately.',
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
    // Offerings
    offerings_title: 'Service offerings',
    offerings_intro: 'Five formats that can be combined according to your context, your phase, and your budget.',
    offerings_note: 'Each engagement is scoped individually. These indications reflect typical project ranges.',
    tjm_note: 'Indicative daily rate: 700 EUR excl. VAT. Adjusted based on format, duration, and scope.',
    deliverables_label: 'Deliverables',
    duration_label: 'Duration',
    // Scenarios
    scenarios_title: 'Concrete engagement scenarios',
    scenarios_intro: 'Three realistic situations, from the first conversation to measurable outcomes. Based on actual project experience.',
    scenario_context: 'Context',
    scenario_timeline: 'How it unfolds',
    scenario_outcome: 'Outcome',
    scenario_offerings: 'Offerings involved',
    // References
    references_title: 'Reference clients',
    references_intro: 'Organizations I have worked with, the scope of the engagement, and what it produced.',
    view_case_study: 'View case study',
    // Delivery
    delivery_title: 'Delivery modes',
    delivery_intro: 'Three formats to match the way your organization works and the nature of the engagement.',
    best_for: 'Best suited for',
    // CTA
    cta_title: 'Let\u2019s talk about your product challenges',
    cta_desc: 'Whether you have a defined scope or are still exploring, a 30-minute conversation is the best way to determine if my approach fits your context. No commitment, no pitch deck.',
    cta_button: 'Schedule a conversation',
    cta_email: 'Or write to me directly',
  },
  fr: {
    back: 'Retour',
    page_title: 'Consulting',
    page_subtitle: 'Consulting design pour produits num\u00e9riques complexes',
    page_intro: 'Strat\u00e9gie produit, recherche utilisateur et design pour les \u00e9quipes qui construisent des outils m\u00e9tier, des plateformes B2B/B2G, des produits SaaS et des services publics. 15 ans d\u2019exp\u00e9rience en conception produit. Je travaille aux c\u00f4t\u00e9s des directions digitales, des \u00e9quipes produit et de l\u2019engineering, \u00e0 l\u2019intersection de la strat\u00e9gie, de la m\u00e9thodologie et de l\u2019ex\u00e9cution.',
    availability: 'Disponible pour des missions \u00e0 partir du T2 2026',
    cta_primary: 'Parlons de votre projet',
    // Situations
    situations_title: 'Vous vous reconnaissez peut-\u00eatre',
    situations_intro: 'Chaque phase d\u2019un produit num\u00e9rique porte des enjeux sp\u00e9cifiques o\u00f9 le design et la recherche utilisateur changent la donne. Les sympt\u00f4mes sont souvent visibles, les causes structurelles moins.',
    col_symptom: 'Ce que vous observez',
    col_cause: 'Ce qui se passe',
    col_cost: 'Ce que \u00e7a vous co\u00fbte',
    situations_cta: 'Ces situations sont adressables. Voici comment j\u2019interviens.',
    // Methodology
    methodology_title: 'Comment se d\u00e9roule une mission',
    methodology_intro: 'Un processus clair, de la premi\u00e8re conversation \u00e0 l\u2019autonomie de votre \u00e9quipe. Chaque phase produit des livrables concrets sur lesquels votre \u00e9quipe peut agir imm\u00e9diatement.',
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
    // Offerings
    offerings_title: 'Offres de service',
    offerings_intro: 'Cinq formats combinables selon votre contexte, votre phase produit et votre budget.',
    offerings_note: 'Chaque mission est cadr\u00e9e individuellement. Ces indications refl\u00e8tent des fourchettes courantes.',
    tjm_note: 'TJM indicatif : 700 \u20ac HT. Ajust\u00e9 selon le format, la dur\u00e9e et le p\u00e9rim\u00e8tre.',
    deliverables_label: 'Livrables',
    duration_label: 'Dur\u00e9e',
    // Scenarios
    scenarios_title: 'Mises en situation concr\u00e8tes',
    scenarios_intro: 'Trois situations r\u00e9alistes, de la premi\u00e8re conversation aux r\u00e9sultats mesurables. Bas\u00e9es sur des projets r\u00e9els.',
    scenario_context: 'Contexte',
    scenario_timeline: 'Comment \u00e7a se d\u00e9roule',
    scenario_outcome: 'R\u00e9sultat',
    scenario_offerings: 'Offres impliqu\u00e9es',
    // References
    references_title: 'Clients de r\u00e9f\u00e9rence',
    references_intro: 'Les organisations avec lesquelles j\u2019ai travaill\u00e9, le p\u00e9rim\u00e8tre de la mission, et ce que \u00e7a a produit.',
    view_case_study: 'Voir le case study',
    // Delivery
    delivery_title: 'Modalit\u00e9s de prestation',
    delivery_intro: 'Trois formats pour s\u2019adapter au fonctionnement de votre organisation et \u00e0 la nature de la mission.',
    best_for: 'Id\u00e9al pour',
    // CTA
    cta_title: 'Parlons de vos enjeux produit',
    cta_desc: 'Que vous ayez un p\u00e9rim\u00e8tre d\u00e9fini ou que vous exploriez encore vos options, une conversation de 30 minutes est le meilleur moyen de d\u00e9terminer si mon approche correspond \u00e0 votre contexte. Sans engagement.',
    cta_button: 'Prendre rendez-vous',
    cta_email: 'Ou \u00e9crivez-moi directement',
  },
};

// Accent colors per offering for visual variety
const OFFERING_COLORS = [
  { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20' },
  { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20' },
  { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/20' },
  { bg: 'bg-teal-500/10', text: 'text-teal-500', border: 'border-teal-500/20' },
  { bg: 'bg-rose-500/10', text: 'text-rose-500', border: 'border-rose-500/20' },
];

const ConsultingPage: React.FC<ConsultingPageProps> = ({ systemTheme, lang, onBack, onContact, onProjectClick }) => {
  const isDark = systemTheme === 'dark';
  const t = TRANSLATIONS[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('top');
  const [showTOC, setShowTOC] = useState(false);
  const [activeScenario, setActiveScenario] = useState(0);
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set());

  const sections = TOC_SECTIONS[lang];
  const isEn = lang === 'en';

  // Helper to get localized field
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

  // Scroll to section
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

  // Toggle phase expansion (mobile)
  const togglePhase = (id: string) => {
    setExpandedPhases(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Get icon component
  const getIcon = (name: string) => ICON_MAP[name] || Target;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`fixed inset-0 md:top-16 z-[100] overflow-y-auto ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-[#FCFCFD]'
      }`}
    >
      {/* Header - Mobile only */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl md:hidden ${
        isDark ? 'bg-[#0a0a0a]/80' : 'bg-[#FCFCFD]/80'
      }`}>
        <div className="w-full pl-6 pr-2.5 h-16 flex items-center justify-between">
          <span className={`font-semibold text-lg tracking-[-0.02em] ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t.page_title}
          </span>
          <button
            onClick={onBack}
            className={`relative p-3 rounded-full transition-colors cursor-pointer before:absolute before:inset-[-12px] before:content-[''] ${
              isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
            }`}
          >
            <X size={24} />
          </button>
        </div>
      </header>

      {/* TOC Sidebar */}
      <CaseStudyTOCSidebar
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isDark={isDark}
        isVisible={showTOC}
        lang={lang}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">

        {/* ========== HERO ========== */}
        <div className="mb-20 md:mb-28">
          {/* Availability badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 ${
            isDark ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600'
          }`}>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {t.availability}
          </div>

          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t.page_subtitle}
          </h1>

          <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mb-8 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t.page_intro}
          </p>

          <button
            onClick={onContact}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D5CF3] text-white rounded-full font-medium hover:bg-[#2450d9] transition-colors shadow-sm hover:shadow-md"
          >
            <Mail size={18} />
            {t.cta_primary}
            <ArrowRight size={16} />
          </button>
        </div>

        {/* ========== SECTION 1: SITUATIONS ========== */}
        <section id="situations" className="mb-20 md:mb-28">
          <div className={`border-t mb-10 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />
          <span className="text-xs font-mono text-[#2D5CF3] uppercase tracking-[0.2em] mb-4 block">01</span>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t.situations_title}
          </h2>
          <p className={`text-base md:text-lg leading-relaxed max-w-2xl mb-12 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t.situations_intro}
          </p>

          <div className="space-y-4">
            {LIFECYCLE_PHASES.map((phase) => {
              const Icon = getIcon(phase.icon);
              const isExpanded = expandedPhases.has(phase.id);

              return (
                <div
                  key={phase.id}
                  className={`rounded-2xl border overflow-hidden transition-colors ${
                    isDark ? 'bg-[#1D1D1F] border-white/5' : 'bg-white border-gray-100'
                  }`}
                >
                  {/* Phase header - clickable on mobile */}
                  <button
                    onClick={() => togglePhase(phase.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between md:cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isDark ? 'bg-[#2D5CF3]/10' : 'bg-blue-50'
                      }`}>
                        <Icon size={20} className="text-[#2D5CF3]" />
                      </div>
                      <h3 className={`text-lg font-semibold tracking-[-0.01em] ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {l(phase, 'title')}
                      </h3>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`md:hidden transition-transform ${isExpanded ? 'rotate-180' : ''} ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    />
                  </button>

                  {/* Phase content - always visible on desktop, toggle on mobile */}
                  <div className={`${isExpanded ? 'block' : 'hidden'} md:block px-6 pb-6`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      {/* Symptom */}
                      <div className={`rounded-xl p-4 ${isDark ? 'bg-amber-500/5' : 'bg-amber-50/60'}`}>
                        <span className={`text-xs font-medium uppercase tracking-wider mb-2 block ${
                          isDark ? 'text-amber-400/70' : 'text-amber-600/70'
                        }`}>
                          {t.col_symptom}
                        </span>
                        <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {l(phase, 'symptom')}
                        </p>
                      </div>

                      {/* Cause */}
                      <div className={`rounded-xl p-4 ${isDark ? 'bg-red-500/5' : 'bg-red-50/60'}`}>
                        <span className={`text-xs font-medium uppercase tracking-wider mb-2 block ${
                          isDark ? 'text-red-400/70' : 'text-red-600/70'
                        }`}>
                          {t.col_cause}
                        </span>
                        <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {l(phase, 'cause')}
                        </p>
                      </div>

                      {/* Cost */}
                      <div className={`rounded-xl p-4 ${isDark ? 'bg-blue-500/5' : 'bg-blue-50/60'}`}>
                        <span className={`text-xs font-medium uppercase tracking-wider mb-2 block ${
                          isDark ? 'text-blue-400/70' : 'text-blue-600/70'
                        }`}>
                          {t.col_cost}
                        </span>
                        <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {l(phase, 'cost')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Transition CTA */}
          <p className={`mt-8 text-base md:text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {t.situations_cta}
          </p>
        </section>

        {/* ========== SECTION 2: METHODOLOGY ========== */}
        <section id="methodology" className="mb-20 md:mb-28">
          <div className={`border-t mb-10 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />
          <span className="text-xs font-mono text-[#2D5CF3] uppercase tracking-[0.2em] mb-4 block">02</span>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t.methodology_title}
          </h2>
          <p className={`text-base md:text-lg leading-relaxed max-w-2xl mb-12 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t.methodology_intro}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.method_phases.map((phase) => (
              <div
                key={phase.num}
                className={`rounded-2xl border p-6 ${
                  isDark ? 'bg-[#1D1D1F] border-white/5' : 'bg-white border-gray-100'
                }`}
              >
                <span className={`text-4xl md:text-5xl font-bold tracking-[-0.03em] block mb-4 ${
                  isDark ? 'text-white/[0.06]' : 'text-gray-900/[0.04]'
                }`}>
                  {phase.num}
                </span>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    isDark ? 'bg-[#2D5CF3]/10 text-[#2D5CF3]' : 'bg-blue-50 text-[#2D5CF3]'
                  }`}>
                    {phase.duration}
                  </span>
                </div>

                <h3 className={`text-lg font-semibold tracking-[-0.01em] mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {phase.title}
                </h3>

                <p className={`text-sm md:text-base leading-relaxed mb-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {phase.desc}
                </p>

                <div className={`pt-4 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {phase.deliverable}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========== SECTION 3: OFFERINGS ========== */}
        <section id="offerings" className="mb-20 md:mb-28">
          <div className={`border-t mb-10 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />
          <span className="text-xs font-mono text-[#2D5CF3] uppercase tracking-[0.2em] mb-4 block">03</span>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t.offerings_title}
          </h2>
          <p className={`text-base md:text-lg leading-relaxed max-w-2xl mb-12 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t.offerings_intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OFFERINGS.map((offering, idx) => {
              const Icon = getIcon(offering.icon);
              const color = OFFERING_COLORS[idx % OFFERING_COLORS.length];

              return (
                <div
                  key={offering.id}
                  className={`rounded-2xl border overflow-hidden ${
                    isDark ? 'bg-[#1D1D1F] border-white/5' : 'bg-white border-gray-100'
                  }`}
                >
                  <div className={`h-1 ${color.bg.replace('/10', '/30')}`} />
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color.bg}`}>
                        <Icon size={20} className={color.text} />
                      </div>
                      <div>
                        <h3 className={`text-lg font-semibold tracking-[-0.01em] ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {l(offering, 'title')}
                        </h3>
                        <span className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {t.duration_label}: {l(offering, 'duration')}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className={`text-sm md:text-base leading-relaxed mb-4 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {l(offering, 'desc')}
                    </p>

                    {/* Deliverables */}
                    <div className={`pt-4 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                      <span className={`text-xs font-medium uppercase tracking-wider mb-2 block ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {t.deliverables_label}
                      </span>
                      <ul className="space-y-1.5">
                        {(isEn ? offering.deliverables_en : offering.deliverables_fr).map((d, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 size={14} className={`mt-0.5 flex-shrink-0 ${color.text}`} />
                            <span className={`text-sm md:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* TJM indication + note */}
          <div className={`mt-6 p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <p className={`text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.tjm_note}
            </p>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {t.offerings_note}
            </p>
          </div>
        </section>

        {/* ========== SECTION 4: SCENARIOS ========== */}
        <section id="scenarios" className="mb-20 md:mb-28">
          <div className={`border-t mb-10 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />
          <span className="text-xs font-mono text-[#2D5CF3] uppercase tracking-[0.2em] mb-4 block">04</span>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t.scenarios_title}
          </h2>
          <p className={`text-base md:text-lg leading-relaxed max-w-2xl mb-12 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t.scenarios_intro}
          </p>

          {/* Scenario tabs */}
          <div className={`flex gap-2 mb-8 overflow-x-auto pb-2`}>
            {SCENARIOS.map((scenario, idx) => (
              <button
                key={scenario.id}
                onClick={() => setActiveScenario(idx)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeScenario === idx
                    ? 'bg-[#2D5CF3] text-white'
                    : isDark
                      ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {l(scenario, 'title').split(':')[0]}
                <span className={`ml-2 text-xs ${activeScenario === idx ? 'text-white/70' : isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {l(scenario, 'duration')}
                </span>
              </button>
            ))}
          </div>

          {/* Active scenario */}
          <AnimatePresence mode="wait">
            {SCENARIOS.map((scenario, idx) => {
              if (idx !== activeScenario) return null;
              return (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-2xl border overflow-hidden ${
                    isDark ? 'bg-[#1D1D1F] border-white/5' : 'bg-white border-gray-100'
                  }`}
                >
                  <div className="p-6 md:p-8">
                    {/* Title */}
                    <h3 className={`text-xl font-semibold tracking-[-0.01em] mb-6 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {l(scenario, 'title')}
                    </h3>

                    {/* Context */}
                    <div className="mb-8">
                      <span className={`text-xs font-medium uppercase tracking-wider mb-2 block ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {t.scenario_context}
                      </span>
                      <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {l(scenario, 'context')}
                      </p>
                    </div>

                    {/* Timeline */}
                    <div className="mb-8">
                      <span className={`text-xs font-medium uppercase tracking-wider mb-4 block ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {t.scenario_timeline}
                      </span>
                      <div className="space-y-3">
                        {scenario.steps.map((step, i) => (
                          <div key={i} className="flex gap-4">
                            {/* Timeline dot + line */}
                            <div className="flex flex-col items-center">
                              <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${
                                i === 0 ? 'bg-[#2D5CF3]' : isDark ? 'bg-gray-600' : 'bg-gray-300'
                              }`} />
                              {i < scenario.steps.length - 1 && (
                                <div className={`w-px flex-1 my-1 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                              )}
                            </div>
                            {/* Step content */}
                            <div className="pb-4">
                              <span className={`text-xs font-semibold ${isDark ? 'text-[#2D5CF3]' : 'text-[#2D5CF3]'}`}>
                                {l(step, 'label')}
                              </span>
                              <p className={`text-sm md:text-base leading-relaxed mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {l(step, 'detail')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Outcome */}
                    <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-green-500/5' : 'bg-green-50/60'}`}>
                      <span className={`text-xs font-medium uppercase tracking-wider mb-2 block ${
                        isDark ? 'text-green-400/70' : 'text-green-600/70'
                      }`}>
                        {t.scenario_outcome}
                      </span>
                      <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {l(scenario, 'outcome')}
                      </p>
                    </div>

                    {/* Offerings involved */}
                    <div>
                      <span className={`text-xs font-medium uppercase tracking-wider mb-2 block ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {t.scenario_offerings}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {scenario.offerings.map((offeringId) => {
                          const offering = OFFERINGS.find(o => o.id === offeringId);
                          if (!offering) return null;
                          return (
                            <span
                              key={offeringId}
                              className={`text-xs font-medium px-3 py-1 rounded-full ${
                                isDark ? 'bg-white/5 text-gray-300' : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {l(offering, 'title')}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* CTA after scenarios */}
          <div className="mt-8 text-center">
            <button
              onClick={onContact}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D5CF3] text-white rounded-full font-medium hover:bg-[#2450d9] transition-colors shadow-sm hover:shadow-md"
            >
              <Mail size={18} />
              {t.cta_primary}
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* ========== SECTION 5: REFERENCES ========== */}
        <section id="references" className="mb-20 md:mb-28">
          <div className={`border-t mb-10 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />
          <span className="text-xs font-mono text-[#2D5CF3] uppercase tracking-[0.2em] mb-4 block">05</span>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t.references_title}
          </h2>
          <p className={`text-base md:text-lg leading-relaxed max-w-2xl mb-12 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t.references_intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REFERENCES.map((ref) => (
              <div
                key={ref.id}
                className={`rounded-2xl border p-6 ${
                  isDark ? 'bg-[#1D1D1F] border-white/5' : 'bg-white border-gray-100'
                }`}
              >
                {/* Client logo */}
                <div className={`h-14 mb-5 flex items-center`}>
                  <img
                    src={ref.logo}
                    alt={ref.client}
                    className={`h-full w-auto max-w-[180px] object-contain ${
                      isDark ? 'brightness-0 invert opacity-70' : 'opacity-80'
                    }`}
                  />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {l(ref, 'sector')}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>|</span>
                  <span className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {l(ref, 'duration')}
                  </span>
                </div>

                {/* Scope */}
                <p className={`text-sm md:text-base leading-relaxed mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {l(ref, 'scope')}
                </p>

                {/* Outcome */}
                <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <p className={`text-sm md:text-base font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {l(ref, 'outcome')}
                  </p>
                </div>

                {/* Case study link */}
                {ref.caseStudyId && onProjectClick && (
                  <button
                    onClick={() => onProjectClick(ref.caseStudyId!)}
                    className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                      isDark ? 'text-[#2D5CF3] hover:text-[#5b7ff5]' : 'text-[#2D5CF3] hover:text-[#2450d9]'
                    }`}
                  >
                    {t.view_case_study}
                    <ExternalLink size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ========== SECTION 6: DELIVERY MODES ========== */}
        <section id="delivery" className="mb-20 md:mb-28">
          <div className={`border-t mb-10 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />
          <span className="text-xs font-mono text-[#2D5CF3] uppercase tracking-[0.2em] mb-4 block">06</span>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t.delivery_title}
          </h2>
          <p className={`text-base md:text-lg leading-relaxed max-w-2xl mb-12 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t.delivery_intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DELIVERY_MODES.map((mode) => {
              const Icon = getIcon(mode.icon);
              return (
                <div
                  key={mode.id}
                  className={`rounded-2xl border p-6 ${
                    isDark ? 'bg-[#1D1D1F] border-white/5' : 'bg-white border-gray-100'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                    isDark ? 'bg-[#2D5CF3]/10' : 'bg-blue-50'
                  }`}>
                    <Icon size={20} className="text-[#2D5CF3]" />
                  </div>

                  <h3 className={`text-lg font-semibold tracking-[-0.01em] mb-1 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {l(mode, 'title')}
                  </h3>

                  <span className={`text-xs font-medium mb-3 block ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {l(mode, 'duration')}
                  </span>

                  <p className={`text-sm md:text-base leading-relaxed mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {l(mode, 'desc')}
                  </p>

                  <div className={`pt-4 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                    <span className={`text-xs font-medium uppercase tracking-wider mb-2 block ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {t.best_for}
                    </span>
                    <ul className="space-y-1.5">
                      {(isEn ? mode.best_for_en : mode.best_for_fr).map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-[#2D5CF3]" />
                          <span className={`text-sm md:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========== SECTION 7: FINAL CTA ========== */}
        <section id="cta" className="mb-16">
          <div className={`border-t mb-10 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />
          <div className={`rounded-2xl border p-8 md:p-12 text-center ${
            isDark ? 'bg-[#1D1D1F] border-white/5' : 'bg-white border-gray-100'
          }`}>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-[-0.02em] mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.cta_title}
            </h2>

            <p className={`text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-8 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {t.cta_desc}
            </p>

            <button
              onClick={onContact}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#2D5CF3] text-white rounded-full font-medium text-lg hover:bg-[#2450d9] transition-colors shadow-sm hover:shadow-md"
            >
              <Mail size={20} />
              {t.cta_button}
              <ArrowRight size={18} />
            </button>

            <p className={`mt-6 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {t.cta_email}:{' '}
              <a
                href="mailto:victorsoussan@gmail.com"
                className={`font-medium transition-colors ${
                  isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                victorsoussan@gmail.com
              </a>
            </p>
          </div>
        </section>

      </div>
    </motion.div>
  );
};

export default ConsultingPage;
