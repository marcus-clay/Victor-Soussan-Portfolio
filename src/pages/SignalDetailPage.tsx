/**
 * SignalDetailPage - Blog article view for a single signal
 * Features: gradient hero with border-radius, TOC sidebar, related articles, back button
 */

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeft, Clock, Calendar, ArrowRight } from '@phosphor-icons/react';
import { SIGNALS, CATEGORY_COLORS, CATEGORY_LABELS } from '../data/signalsData';

interface Props {
  signalId: string;
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  onBack: () => void;
  onOpenSignal?: (signalId: string) => void;
}

const GRADIENT_MAP: Record<string, string> = {
  ai: 'from-[#7B61FF] via-[#D946EF] to-[#F472B6]',
  methodology: 'from-[#38BDF8] via-[#6366F1] to-[#4F46E5]',
  strategy: 'from-[#FBBF24] via-[#F97316] to-[#EF4444]',
  leadership: 'from-[#34D399] via-[#14B8A6] to-[#0891B2]',
  craft: 'from-[#FB7185] via-[#E879F9] to-[#A855F7]',
};

interface TOCItem {
  id: string;
  label: string;
}

// Parse h2 headings and inject IDs into HTML content
function parseAndInjectTOC(html: string): { tocItems: TOCItem[]; processedHtml: string } {
  const tocItems: TOCItem[] = [];
  let index = 0;
  const processedHtml = html.replace(/<h2[^>]*>(.*?)<\/h2>/gi, (_match, innerText) => {
    const plainText = innerText.replace(/<[^>]*>/g, '').trim();
    const id = `section-${index}`;
    tocItems.push({ id, label: plainText });
    index++;
    return `<h2 id="${id}">${innerText}</h2>`;
  });
  return { tocItems, processedHtml };
}

const SignalDetailPage: React.FC<Props> = ({ signalId, systemTheme, lang, onBack, onOpenSignal }) => {
  const signal = SIGNALS.find(s => s.id === signalId);
  const isDark = systemTheme === 'dark';
  const articleRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  // Related signals: same category, excluding current
  const relatedSignals = useMemo(() => {
    if (!signal) return [];
    const sameCat = SIGNALS.filter(s => s.category === signal.category && s.id !== signal.id);
    const others = SIGNALS.filter(s => s.category !== signal.category && s.id !== signal.id);
    return [...sameCat, ...others].slice(0, 3);
  }, [signal]);

  if (!signal) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-[60] ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-[#FCFCFD] text-gray-900'}`}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-lg mb-4">{lang === 'en' ? 'Signal not found' : 'Signal introuvable'}</p>
            <button onClick={onBack} className="text-[#2D5CF3] font-medium">
              {lang === 'en' ? 'Go back' : 'Retour'}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  const title = lang === 'en' ? signal.title_en : signal.title_fr;
  const bodyLong = lang === 'en' ? signal.body_long_en : signal.body_long_fr;
  const bodyShort = lang === 'en' ? signal.body_en : signal.body_fr;
  const rawContent = bodyLong || `<p>${bodyShort}</p>`;
  const { tocItems, processedHtml } = parseAndInjectTOC(rawContent);
  const colors = CATEGORY_COLORS[signal.category];
  const gradient = GRADIENT_MAP[signal.category] || GRADIENT_MAP.ai;

  const formattedDate = new Date(signal.date + '-01').toLocaleDateString(
    lang === 'fr' ? 'fr-FR' : 'en-US',
    { month: 'long', year: 'numeric' }
  );

  const textContent = rawContent.replace(/<[^>]*>/g, '');
  const wordCount = textContent.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 230));
  const hasTOC = tocItems.length >= 2;

  // Track active section for TOC highlight
  useEffect(() => {
    if (!hasTOC) return;
    const container = articleRef.current?.closest('[data-scroll-container]') as HTMLElement | null;
    if (!container) return;

    const handleScroll = () => {
      const headings = tocItems.map(t => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
      let current = '';
      for (const heading of headings) {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 120) current = heading.id;
      }
      setActiveSection(current);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [hasTOC, tocItems]);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      data-scroll-container
      className={`fixed inset-0 z-[60] overflow-y-auto ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FCFCFD]'}`}
    >
      {/* Sticky header */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl ${
        isDark ? 'bg-[#0a0a0a]/80' : 'bg-[#FCFCFD]/80'
      }`}>
        <div className="w-full pl-4 md:pl-6 pr-2.5 h-14 md:h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${
              isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">{lang === 'en' ? 'Back' : 'Retour'}</span>
          </button>
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

      {/* Main layout: TOC | Article | Related */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-20">
        <div className="flex gap-8 xl:gap-12 relative">

          {/* Left column: TOC (desktop only) */}
          {hasTOC && (
            <aside className="hidden lg:block w-48 xl:w-56 flex-shrink-0 pt-8">
              <nav className="sticky top-24">
                <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {lang === 'en' ? 'Contents' : 'Sommaire'}
                </p>
                <ul className="space-y-1.5">
                  {tocItems.map(item => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`text-left text-sm leading-snug py-1.5 px-3 rounded-lg w-full transition-colors cursor-pointer ${
                          activeSection === item.id
                            ? isDark
                              ? 'text-white bg-white/5 font-medium'
                              : 'text-gray-900 bg-gray-100 font-medium'
                            : isDark
                              ? 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                              : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}

          {/* Center column: Article */}
          <article ref={articleRef} className="flex-1 min-w-0 max-w-3xl mx-auto pt-6 md:pt-8">
            {/* Hero gradient with border-radius inside content */}
            <div className={`relative w-full h-40 md:h-52 rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} mb-8`}>
              <div className="absolute -top-1/2 -right-1/4 w-3/4 h-full rounded-full bg-white/15 blur-3xl" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Category badge */}
            <div className="mb-5">
              <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${
                isDark ? colors.bgDark : colors.bg
              } ${colors.text}`}>
                {CATEGORY_LABELS[signal.category][lang]}
              </span>
            </div>

            {/* Title */}
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.03em] leading-tight mb-5 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {title}
            </h1>

            {/* Meta row */}
            <div className={`flex flex-wrap items-center gap-4 mb-8 md:mb-10 pb-8 md:pb-10 border-b ${
              isDark ? 'border-white/10' : 'border-gray-200'
            }`}>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                <time className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {formattedDate}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {readingTime} min {lang === 'en' ? 'read' : 'de lecture'}
                </span>
              </div>
              <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Victor Soussan
              </span>
            </div>

            {/* Mobile TOC (if headings exist) */}
            {hasTOC && (
              <div className={`lg:hidden mb-8 p-4 rounded-xl border ${
                isDark ? 'bg-[#1D1D1F] border-white/5' : 'bg-gray-50 border-gray-100'
              }`}>
                <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {lang === 'en' ? 'Contents' : 'Sommaire'}
                </p>
                <ul className="space-y-1.5">
                  {tocItems.map(item => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`text-left text-sm py-1 cursor-pointer transition-colors ${
                          isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article body */}
            <div
              className={`prose prose-lg max-w-none ${isDark ? 'prose-invert' : ''}`}
              style={{
                ['--tw-prose-body' as string]: isDark ? '#a1a1aa' : '#4b5563',
                ['--tw-prose-headings' as string]: isDark ? '#ffffff' : '#111827',
                ['--tw-prose-bold' as string]: isDark ? '#e4e4e7' : '#1f2937',
              }}
              dangerouslySetInnerHTML={{ __html: processedHtml }}
            />

            {/* Author card */}
            <div className={`mt-12 md:mt-16 p-6 rounded-2xl border ${
              isDark ? 'bg-[#1D1D1F] border-white/5' : 'bg-white border-gray-100'
            }`}>
              <div className="flex items-center gap-4">
                <img
                  src="/images/photos victor/image_victor_home.png"
                  alt="Victor Soussan"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Victor Soussan</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Lead Product Designer</p>
                </div>
              </div>
            </div>

            {/* Related articles (mobile / tablet) */}
            <div className="xl:hidden mt-12">
              <p className={`text-xs font-semibold uppercase tracking-widest mb-5 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {lang === 'en' ? 'More articles' : 'Autres articles'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {relatedSignals.map(rs => {
                  const rsGradient = GRADIENT_MAP[rs.category] || GRADIENT_MAP.ai;
                  const rsColors = CATEGORY_COLORS[rs.category];
                  return (
                    <button
                      key={rs.id}
                      onClick={() => onOpenSignal ? onOpenSignal(rs.id) : null}
                      className={`text-left rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer ${
                        isDark
                          ? 'bg-[#1D1D1F] ring-1 ring-white/5 hover:ring-white/15'
                          : 'bg-white ring-1 ring-gray-200/60 hover:ring-gray-300/80 shadow-sm'
                      }`}
                    >
                      <div className={`h-20 bg-gradient-to-br ${rsGradient} relative overflow-hidden`}>
                        <div className="absolute -top-1/2 -right-1/4 w-3/4 h-full rounded-full bg-white/15 blur-3xl" />
                      </div>
                      <div className="p-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mb-2 ${
                          isDark ? rsColors.bgDark : rsColors.bg
                        } ${rsColors.text}`}>
                          {CATEGORY_LABELS[rs.category][lang]}
                        </span>
                        <p className={`text-sm font-bold leading-snug line-clamp-2 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {lang === 'en' ? rs.title_en : rs.title_fr}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Back to signals button */}
            <div className="mt-12 md:mt-16 flex justify-center">
              <button
                onClick={onBack}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-sm hover:shadow-md"
              >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                {lang === 'en' ? 'All articles' : 'Tous les articles'}
              </button>
            </div>
          </article>

          {/* Right column: Related articles (desktop XL only) */}
          <aside className="hidden xl:block w-56 flex-shrink-0 pt-8">
            <div className="sticky top-24">
              <p className={`text-xs font-semibold uppercase tracking-widest mb-5 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {lang === 'en' ? 'More articles' : 'Autres articles'}
              </p>
              <div className="space-y-4">
                {relatedSignals.map(rs => {
                  const rsGradient = GRADIENT_MAP[rs.category] || GRADIENT_MAP.ai;
                  const rsColors = CATEGORY_COLORS[rs.category];
                  return (
                    <button
                      key={rs.id}
                      onClick={() => onOpenSignal ? onOpenSignal(rs.id) : null}
                      className={`group/related text-left w-full rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer ${
                        isDark
                          ? 'bg-[#1D1D1F] ring-1 ring-white/5 hover:ring-white/15'
                          : 'bg-white ring-1 ring-gray-200/60 hover:ring-gray-300/80 shadow-sm'
                      }`}
                    >
                      <div className={`h-16 bg-gradient-to-br ${rsGradient} relative overflow-hidden`}>
                        <div className="absolute -top-1/2 -right-1/4 w-3/4 h-full rounded-full bg-white/15 blur-3xl" />
                      </div>
                      <div className="p-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mb-1.5 ${
                          isDark ? rsColors.bgDark : rsColors.bg
                        } ${rsColors.text}`}>
                          {CATEGORY_LABELS[rs.category][lang]}
                        </span>
                        <p className={`text-xs font-bold leading-snug line-clamp-3 transition-colors ${
                          isDark ? 'text-white group-hover/related:text-blue-400' : 'text-gray-900 group-hover/related:text-[#2D5CF3]'
                        }`}>
                          {lang === 'en' ? rs.title_en : rs.title_fr}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <span className={`text-[11px] font-medium ${
                            isDark ? 'text-blue-400' : 'text-[#2D5CF3]'
                          }`}>
                            {lang === 'en' ? 'Read' : 'Lire'}
                          </span>
                          <ArrowRight size={10} className={isDark ? 'text-blue-400' : 'text-[#2D5CF3]'} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Inline styles for article typography */}
      <style>{`
        .prose h2 {
          font-size: 1.375rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.3;
          scroll-margin-top: 6rem;
        }
        .prose p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
          font-size: 1rem;
        }
        .prose strong {
          font-weight: 600;
        }
        .prose ul {
          margin-top: 0.75rem;
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
          line-height: 1.65;
          font-size: 1rem;
        }
        @media (min-width: 768px) {
          .prose h2 {
            font-size: 1.625rem;
          }
          .prose p, .prose li {
            font-size: 1.0625rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default SignalDetailPage;
