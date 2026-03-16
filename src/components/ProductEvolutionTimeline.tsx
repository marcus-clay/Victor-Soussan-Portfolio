/**
 * ProductEvolutionTimeline - Apple Keynote-style interactive visualization
 * Adapted from DiagramProductEvolution.tsx
 *
 * Features:
 * - Focus mode with card carousel
 * - Overview mode with all phases visible
 * - Swipe gestures for mobile
 * - Theme-aware (light/dark)
 * - i18n support (en/fr)
 */

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  CheckCircle as CheckCircle2,
  Stack as Layers,
  Lightning as Zap,
  Trophy
} from '@phosphor-icons/react';

// --- DATA ---

const PHASES_EN = [
  {
    id: 1,
    title: "Foundation",
    duration: "Months 1-3",
    icon: Layers,
    description: "Establishing the core architecture and essential workflows.",
    features: [
      "Core authentication & navigation architecture",
      "Project creation & management workflows",
      "Task library with drag-drop sequences",
      "Planning V1 with colorful task cards",
      "Subscription system (individual + enterprise)",
      "PDF export functionality"
    ]
  },
  {
    id: 2,
    title: "Feature Expansion",
    duration: "Months 4-8",
    icon: Zap,
    description: "Enhancing interactivity and visual systems.",
    features: [
      "Advanced planning interactions (multi-select)",
      "Dynamic island adaptive menu system",
      "Refined task card aesthetic (V2 visual system)",
      "Fluid zoom timeline (daily to quarterly)",
      "Project hub for multi-site managers",
      "Stakeholder management features"
    ]
  },
  {
    id: 3,
    title: "Platform Maturity",
    duration: "Months 9-12",
    icon: Trophy,
    description: "Scalability, mobile strategy, and refinement.",
    features: [
      "Visual complexity management (hierarchy)",
      "Mobile strategy with platform-specific design",
      "Navigation evolution (direct access)",
      "Consolidated mobile navigation (4 groups)",
      "Activity enrichment (photo annotation)",
      "Design system scalability (120+ screens)"
    ]
  }
];

const PHASES_FR = [
  {
    id: 1,
    title: "Fondation",
    duration: "Mois 1-3",
    icon: Layers,
    description: "Mise en place de l'architecture et des workflows essentiels.",
    features: [
      "Architecture d'authentification & navigation",
      "Workflows de création & gestion de projet",
      "Bibliothèque de tâches avec glisser-déposer",
      "Planning V1 avec cartes de tâches colorées",
      "Système d'abonnement (individuel + entreprise)",
      "Export PDF"
    ]
  },
  {
    id: 2,
    title: "Expansion",
    duration: "Mois 4-8",
    icon: Zap,
    description: "Amélioration de l'interactivité et du système visuel.",
    features: [
      "Interactions planning avancées (multi-select)",
      "Menu adaptatif dynamic island",
      "Esthétique cartes V2 (système visuel affiné)",
      "Timeline zoom fluide (jour à trimestre)",
      "Hub projet pour gestionnaires multi-sites",
      "Gestion des parties prenantes"
    ]
  },
  {
    id: 3,
    title: "Maturité Plateforme",
    duration: "Mois 9-12",
    icon: Trophy,
    description: "Scalabilité, stratégie mobile et raffinement.",
    features: [
      "Gestion complexité visuelle (hiérarchie)",
      "Stratégie mobile avec design plateforme",
      "Évolution navigation (accès direct)",
      "Navigation mobile consolidée (4 groupes)",
      "Enrichissement activité (annotation photo)",
      "Scalabilité design system (120+ écrans)"
    ]
  }
];

interface ProductEvolutionTimelineProps {
  systemTheme: 'light' | 'dark';
  lang?: 'en' | 'fr';
}

const ProductEvolutionTimeline: React.FC<ProductEvolutionTimelineProps> = ({
  systemTheme,
  lang = 'fr'
}) => {
  const [activePhase, setActivePhase] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<'overview' | 'focus'>('focus');

  const isDark = systemTheme === 'dark';
  const PHASES = lang === 'fr' ? PHASES_FR : PHASES_EN;

  // Trigger initial animation
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleNext = () => {
    if (activePhase < PHASES.length - 1) setActivePhase(prev => prev + 1);
  };

  const handlePrev = () => {
    if (activePhase > 0) setActivePhase(prev => prev - 1);
  };

  // Swipe Logic
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  return (
    <div className={`relative w-full rounded-3xl overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${
      isDark ? 'bg-[#1a1a1a]' : 'bg-[#F5F5F7]'
    }`}>

      {/* --- HEADER --- */}
      <header className={`relative p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
        isDark
          ? 'bg-gradient-to-b from-[#1a1a1a] to-transparent'
          : 'bg-gradient-to-b from-[#F5F5F7] to-transparent'
      }`}>
        <div>
          <h2 className={`text-xl md:text-2xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-[#1D1D1F]'}`}>
            {lang === 'fr' ? 'Évolution Produit' : 'Product Evolution'}
          </h2>
          <p className={`text-sm mt-1 font-medium ${isDark ? 'text-gray-400' : 'text-[#86868B]'}`}>
            {lang === 'fr' ? 'Parcours de 12 mois' : '12-Month Journey'}
          </p>
        </div>

        {/* View Toggle */}
        <div className={`backdrop-blur-md border shadow-sm rounded-full p-1 flex ${
          isDark
            ? 'bg-white/10 border-white/10'
            : 'bg-white/80 border-white/20'
        }`}>
          <button
            onClick={() => setViewMode('focus')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              viewMode === 'focus'
                ? isDark
                  ? 'bg-white text-black shadow-md'
                  : 'bg-[#1D1D1F] text-white shadow-md'
                : isDark
                  ? 'text-gray-400 hover:text-white'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            Focus
          </button>
          <button
            onClick={() => setViewMode('overview')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              viewMode === 'overview'
                ? isDark
                  ? 'bg-white text-black shadow-md'
                  : 'bg-[#1D1D1F] text-white shadow-md'
                : isDark
                  ? 'text-gray-400 hover:text-white'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            {lang === 'fr' ? 'Vue globale' : 'Overview'}
          </button>
        </div>
      </header>

      {/* --- MAIN STAGE --- */}
      <main className="relative w-full pb-8">

        {viewMode === 'focus' ? (
          <div
            className="w-full px-4 md:px-8 flex flex-col items-center relative z-10 touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >

            {/* Progress Indicator */}
            <div className="flex items-center gap-3 mb-8">
              {PHASES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhase(idx)}
                  className={`h-2 rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    idx === activePhase
                      ? `w-12 ${isDark ? 'bg-white' : 'bg-[#1D1D1F]'}`
                      : `w-2 ${isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-[#D1D1D6] hover:bg-[#86868B]'}`
                  }`}
                />
              ))}
            </div>

            {/* Main Card Container */}
            <div className="relative w-full max-w-4xl h-[420px] md:h-[460px]">
              {PHASES.map((phase, idx) => {
                const isActive = idx === activePhase;
                const isPrev = idx < activePhase;
                const isNext = idx > activePhase;
                const PhaseIcon = phase.icon;

                return (
                  <div
                    key={phase.id}
                    className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] origin-bottom
                      ${isActive ? 'opacity-100 scale-100 translate-x-0 z-20' : ''}
                      ${isPrev ? 'opacity-0 scale-90 -translate-x-24 z-10' : ''}
                      ${isNext ? 'opacity-0 scale-95 translate-x-24 z-10 blur-sm' : ''}
                    `}
                  >
                    <div className={`rounded-[24px] md:rounded-[32px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.15)] border w-full h-full overflow-hidden flex flex-col md:flex-row select-none ${
                      isDark
                        ? 'bg-[#2a2a2a] border-white/10'
                        : 'bg-white border-white/50'
                    }`}>

                      {/* Left: Identity */}
                      <div className={`md:w-1/3 border-b md:border-b-0 md:border-r p-6 md:p-10 flex flex-col justify-between ${
                        isDark
                          ? 'bg-[#222] border-white/5'
                          : 'bg-[#FAFAFA] border-[#E5E5E5]'
                      }`}>
                        <div>
                          <div className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl shadow-lg mb-6 md:mb-8 ${
                            isDark ? 'bg-white text-black' : 'bg-[#1D1D1F] text-white'
                          }`}>
                            <PhaseIcon size={24} strokeWidth={2} />
                          </div>
                          <div className={`uppercase tracking-widest text-[10px] font-bold mb-2 ${
                            isDark ? 'text-gray-500' : 'text-[#86868B]'
                          }`}>
                            Phase {phase.id}
                          </div>
                          <h3 className={`text-2xl md:text-3xl font-bold leading-tight mb-2 ${
                            isDark ? 'text-white' : 'text-[#1D1D1F]'
                          }`}>
                            {phase.title}
                          </h3>
                          <div className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${
                            isDark ? 'bg-white/10 text-gray-300' : 'bg-[#E8E8ED] text-[#1D1D1F]'
                          }`}>
                            {phase.duration}
                          </div>
                        </div>
                        <p className={`text-sm leading-relaxed mt-4 md:mt-6 ${
                          isDark ? 'text-gray-400' : 'text-[#86868B]'
                        }`}>
                          {phase.description}
                        </p>
                      </div>

                      {/* Right: Features */}
                      <div className="md:w-2/3 p-6 md:p-10 overflow-y-auto">
                        <h4 className={`text-xs font-semibold uppercase tracking-wider mb-6 md:mb-8 ${
                          isDark ? 'text-gray-500' : 'text-[#86868B]'
                        }`}>
                          {lang === 'fr' ? 'Livrables clés' : 'Key Deliverables'}
                        </h4>
                        <ul className="space-y-4 md:space-y-6">
                          {phase.features.map((feature, fIdx) => (
                            <li
                              key={fIdx}
                              className="flex items-start gap-3 md:gap-4 group"
                              style={{
                                transitionDelay: `${isActive ? 300 + (fIdx * 100) : 0}ms`
                              }}
                            >
                              <div className={`mt-0.5 transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                <CheckCircle2 size={18} className="text-blue-500" strokeWidth={2.5} />
                              </div>
                              <span className={`text-sm md:text-[17px] font-medium leading-relaxed transition-all duration-700 ${
                                isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                              } ${isDark ? 'text-gray-200' : 'text-[#1D1D1F]'}`}>
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Controls (Floating) */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full max-w-5xl flex justify-between pointer-events-none px-2 md:px-0 z-50">
              <button
                onClick={handlePrev}
                disabled={activePhase === 0}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md shadow-lg border flex items-center justify-center pointer-events-auto transition-all duration-300 hover:scale-110 disabled:opacity-0 disabled:cursor-default ${
                  isDark
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'bg-white/80 border-white/50 text-[#1D1D1F]'
                }`}
              >
                <ArrowRight size={18} className="rotate-180" />
              </button>
              <button
                onClick={handleNext}
                disabled={activePhase === PHASES.length - 1}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md shadow-lg border flex items-center justify-center pointer-events-auto transition-all duration-300 hover:scale-110 disabled:opacity-0 disabled:cursor-default ${
                  isDark
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'bg-white/80 border-white/50 text-[#1D1D1F]'
                }`}
              >
                <ArrowRight size={18} />
              </button>
            </div>

          </div>
        ) : (
          /* Overview View */
          <div className="w-full px-4 md:px-8 flex flex-col md:flex-row gap-4 md:gap-6 items-stretch justify-center">
            {PHASES.map((phase) => {
              const PhaseIcon = phase.icon;
              return (
                <div
                  key={phase.id}
                  className={`flex-1 rounded-[20px] md:rounded-[24px] shadow-sm border p-6 md:p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 group ${
                    isDark
                      ? 'bg-[#2a2a2a] border-white/10 hover:shadow-xl hover:shadow-white/5'
                      : 'bg-white border-[#E5E5E5] hover:shadow-xl'
                  }`}
                >
                  <div className="mb-4 md:mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl transition-colors duration-500 ${
                        isDark
                          ? 'bg-white/5 text-gray-300 group-hover:bg-white group-hover:text-black'
                          : 'bg-[#F5F5F7] text-[#1D1D1F] group-hover:bg-[#1D1D1F] group-hover:text-white'
                      }`}>
                        <PhaseIcon size={20} strokeWidth={2} />
                      </div>
                      <div>
                        <div className={`text-[10px] uppercase font-bold tracking-wider ${
                          isDark ? 'text-gray-500' : 'text-[#86868B]'
                        }`}>
                          Phase {phase.id}
                        </div>
                        <div className={`text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-[#1D1D1F]'}`}>
                          {phase.duration}
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className={`text-lg md:text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1D1D1F]'}`}>
                    {phase.title}
                  </h3>

                  <div className="flex-1 space-y-2 md:space-y-3">
                    {phase.features.slice(0, 4).map((f, i) => (
                      <div key={i} className={`flex items-center gap-2 text-xs md:text-sm ${
                        isDark ? 'text-gray-400' : 'text-[#424245]'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                          isDark
                            ? 'bg-gray-600 group-hover:bg-blue-400'
                            : 'bg-[#D1D1D6] group-hover:bg-blue-500'
                        }`} />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                    {phase.features.length > 4 && (
                      <div className={`text-xs pl-3.5 italic ${isDark ? 'text-gray-500' : 'text-[#86868B]'}`}>
                        + {phase.features.length - 4} {lang === 'fr' ? 'de plus' : 'more'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>
    </div>
  );
};

export default ProductEvolutionTimeline;
