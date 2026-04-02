'use client'

import React, { useState } from 'react';
import Link from 'next/link';

function ArrowDiag({ size = 14, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

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
}) => {
  const isEn = lang === 'en';
  const guideSignal = featuredSignals.find(s => s.id === 'claude-code-figma-mcp');
  const [hoveredGuide, setHoveredGuide] = useState(false);
  const [hoveredSignal, setHoveredSignal] = useState(false);

  return (
    <section className="py-24 md:py-40 px-6">
      <div className="max-w-[692px] mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900">
            {isEn ? 'Resources' : 'Ressources'}
          </h2>
          <Link
            href={`/${lang}/ressources`}
            className="group text-sm text-gray-400 hover:text-gray-900 transition-colors duration-150 flex items-center gap-1"
          >
            {isEn ? 'All articles' : 'Tous les articles'}
            <ArrowDiag
              size={14}
              style={{
                transition: 'transform 150ms cubic-bezier(0.23, 1, 0.32, 1)',
                transform: 'translate(0, 0)',
              }}
            />
          </Link>
        </div>

        <div className="flex flex-col divide-y divide-gray-100">

          {/* Guide Claude Code */}
          <Link
            href={`/${lang}/guide/claude-code`}
            onMouseEnter={() => setHoveredGuide(true)}
            onMouseLeave={() => setHoveredGuide(false)}
            className="group -mx-3 px-3 py-5 rounded-xl text-left w-full block"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">Guide</span>
              <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
              <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                {guideChapters.length} {isEn ? 'chapters' : 'chapitres'}
              </span>
            </div>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3
                  className="text-sm leading-snug mb-1.5"
                  style={{
                    fontWeight: hoveredGuide ? 500 : 400,
                    color: hoveredGuide ? '#000000' : '#111827',
                    transition: 'color 180ms ease, font-weight 0ms',
                  }}
                >
                  {isEn ? 'Getting started with Claude Code' : 'Bien démarrer avec Claude Code'}
                </h3>
                <p
                  className="text-sm leading-relaxed line-clamp-2"
                  style={{
                    color: hoveredGuide ? '#4B5563' : '#6B7280',
                    transition: 'color 180ms ease',
                  }}
                >
                  {isEn
                    ? 'A practical guide for designers who want to bring AI coding tools into their workflow, from first setup to a deployed interface.'
                    : "Un guide pratique pour les designers qui souhaitent intégrer les outils de code assisté par IA dans leur pratique, de l'installation à la première interface déployée."}
                </p>
              </div>
              <ArrowDiag
                size={14}
                style={{
                  flexShrink: 0,
                  marginTop: 2,
                  color: '#9CA3AF',
                  opacity: hoveredGuide ? 1 : 0,
                  transform: hoveredGuide ? 'translate(0,0)' : 'translate(-4px,4px)',
                  transition: 'opacity 180ms ease, transform 240ms cubic-bezier(0.23, 1, 0.32, 1)',
                }}
              />
            </div>
          </Link>

          {/* Featured Signal */}
          {guideSignal && (
            <Link
              href={`/${lang}/signal/${guideSignal.id}`}
              onMouseEnter={() => setHoveredSignal(true)}
              onMouseLeave={() => setHoveredSignal(false)}
              className="group -mx-3 px-3 py-5 rounded-xl text-left w-full block"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                  {isEn ? 'AI' : 'IA'}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3
                    className="text-sm leading-snug mb-1.5"
                    style={{
                      fontWeight: hoveredSignal ? 500 : 400,
                      color: hoveredSignal ? '#000000' : '#111827',
                      transition: 'color 180ms ease, font-weight 0ms',
                    }}
                  >
                    {isEn ? guideSignal.title_en : guideSignal.title_fr}
                  </h3>
                  <p
                    className="text-sm leading-relaxed line-clamp-2"
                    style={{
                      color: hoveredSignal ? '#4B5563' : '#6B7280',
                      transition: 'color 180ms ease',
                    }}
                  >
                    {(isEn ? guideSignal.body_en : guideSignal.body_fr).substring(0, 160)}
                  </p>
                </div>
                <ArrowDiag
                  size={14}
                  style={{
                    flexShrink: 0,
                    marginTop: 2,
                    color: '#9CA3AF',
                    opacity: hoveredSignal ? 1 : 0,
                    transform: hoveredSignal ? 'translate(0,0)' : 'translate(-4px,4px)',
                    transition: 'opacity 180ms ease, transform 240ms cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                />
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
