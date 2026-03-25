import React from 'react';
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react';

interface Signal {
  id: string;
  title_en: string;
  title_fr: string;
  body_en: string;
  body_fr: string;
  category: string;
}

interface FeaturedSectionProps {
  lang: 'en' | 'fr';
  featuredSignals: Signal[];
  guideChapters: { slug_en: string; slug_fr: string; title_en: string; title_fr: string }[];
  onNavigate: (path: string) => void;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  lang,
  featuredSignals,
  guideChapters,
  onNavigate,
}) => {
  const isEn = lang === 'en';
  const guideSignal = featuredSignals.find(s => s.id === 'claude-code-figma-mcp');
  const otherSignal = featuredSignals.find(s => s.id !== 'claude-code-figma-mcp') || featuredSignals[0];

  return (
    <section className="py-12 md:py-20 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-gray-900">
            {isEn ? 'Resources' : 'Ressources'}
          </h2>
          <button
            onClick={() => onNavigate('/ressources')}
            className="group text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
          >
            {isEn ? 'All articles' : 'Tous les articles'}
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Two cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Guide Claude Code */}
          <button
            onClick={() => onNavigate('/guide/claude-code')}
            className="group text-left rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-lg hover:border-gray-200 transition-[box-shadow,border-color] duration-200 ease-out cursor-pointer"
          >
            <div className="aspect-[16/9] overflow-hidden bg-[#1a1a1e] relative">
              <img
                src="/images/guide-claude-code/hero-cover.png"
                alt="Guide Claude Code"
                className="absolute inset-0 w-[125%] h-[125%] object-cover object-top group-hover:scale-[1.03] transition-transform duration-300 ease-out origin-top"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">Guide</span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">Claude Code</span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{guideChapters.length} {isEn ? 'chapters' : 'chapitres'}</span>
              </div>
              <h3 className="text-lg font-bold tracking-[-0.02em] text-gray-900 mb-2">
                {isEn ? 'Getting started with Claude Code' : 'Bien demarrer avec Claude Code'}
              </h3>
              <p className="text-base text-gray-500 leading-relaxed mb-4 line-clamp-2">
                {isEn
                  ? 'Complete guide for designers: from installation to deployment, visual quality, skills, and Figma MCP.'
                  : 'Guide complet pour les designers : de l\'installation au deploiement, qualite visuelle, skills et Figma MCP.'}
              </p>
              <span className="text-sm font-medium text-[#2D5CF3] flex items-center gap-1">
                {isEn ? 'Read the guide' : 'Lire le guide'} <ArrowUpRight size={14} />
              </span>
            </div>
          </button>

          {/* Card 2: Featured Signal - Figma + Claude */}
          {guideSignal && (
            <button
              onClick={() => onNavigate(`/signal/${guideSignal.id}`)}
              className="group text-left rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-lg hover:border-gray-200 transition-[box-shadow,border-color] duration-200 ease-out cursor-pointer flex flex-col"
            >
              {/* Visual: Figma + Claude icons - same height as guide card */}
              <div className="aspect-[16/9] flex items-center justify-center gap-5 bg-gray-50">
                <svg width="40" height="58" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                  <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                  <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                  <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                  <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                </svg>
                <span className="text-3xl text-gray-300 font-light">+</span>
                <span className="text-3xl font-semibold text-gray-400 tracking-tight">Claude</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 w-fit mb-3">{isEn ? 'AI' : 'IA'}</span>
                <h3 className="text-lg font-bold tracking-[-0.02em] text-gray-900 mb-3">
                  {isEn ? guideSignal.title_en : guideSignal.title_fr}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-3">
                  {(isEn ? guideSignal.body_en : guideSignal.body_fr).substring(0, 200)}...
                </p>
                <span className="text-sm font-medium text-gray-900 flex items-center gap-1">
                  {isEn ? 'Read' : 'Lire'} <ArrowUpRight size={14} />
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
