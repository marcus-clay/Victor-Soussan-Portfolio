/**
 * SignalsPage - Short-form thought leadership content
 * Micro-posts on product design, leadership, methodology, craft & AI
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check, Link as Link2 } from '@phosphor-icons/react';
import { SIGNALS, CATEGORY_COLORS, CATEGORY_LABELS } from '../data/signalsData';
import type { Signal, SignalCategory } from '../data/signalsData';

type Language = 'en' | 'fr';
type FilterCategory = SignalCategory | 'all';

interface SignalsPageProps {
  systemTheme: 'light' | 'dark';
  lang: Language;
  onBack: () => void;
  onOpenSignal: (signalId: string) => void;
  onOpenGuide?: () => void;
}

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const TRANSLATIONS = {
  en: {
    back: 'Close',
    page_title: 'Blog',
    page_subtitle: 'Perspectives on product design, leadership and methodology. Short reads drawn from fifteen years of practice.',
    items: 'articles',
    read_more: 'Read more',
    copied: 'Link copied',
  },
  fr: {
    back: 'Fermer',
    page_title: 'Blog',
    page_subtitle: 'Réflexions sur le design produit, le leadership et la méthodologie. Lectures courtes tirées de quinze ans de pratique.',
    items: 'articles',
    read_more: 'Lire la suite',
    copied: 'Lien copié',
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const SignalsPage: React.FC<SignalsPageProps> = ({ systemTheme, lang, onBack, onOpenSignal, onOpenGuide }) => {
  const isDark = systemTheme === 'dark';
  const t = TRANSLATIONS[lang];
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSignals = activeFilter === 'all'
    ? SIGNALS
    : SIGNALS.filter(s => s.category === activeFilter);

  const filters: FilterCategory[] = ['all', 'leadership', 'methodology', 'strategy', 'craft', 'ai'];

  const getTitle = useCallback((s: Signal) => lang === 'en' ? s.title_en : s.title_fr, [lang]);
  const getBody = useCallback((s: Signal) => lang === 'en' ? s.body_en : s.body_fr, [lang]);

  const handleCopy = useCallback((e: React.MouseEvent, signal: Signal) => {
    e.stopPropagation();
    const url = `${window.location.origin}/signal/${signal.id}?lang=${lang}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(signal.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, [lang]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="signals-page-title"
      className={`fixed inset-0 md:top-16 z-[100] overflow-y-auto ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-[#FCFCFD]'
      }`}
    >
      {/* Header - mobile only, desktop uses persistent nav */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl md:hidden ${
        isDark ? 'bg-[#0a0a0a]/80' : 'bg-[#FCFCFD]/80'
      }`}>
        <div className="w-full pl-6 pr-2.5 h-16 flex items-center justify-between">
          <span id="signals-page-title" className={`font-semibold text-lg tracking-[-0.02em] ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t.page_title}
          </span>
          <button
            onClick={onBack}
            aria-label="Close"
            className={`relative p-3 rounded-full transition-colors cursor-pointer before:absolute before:inset-[-12px] before:content-[''] ${
              isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
            }`}
          >
            <X size={24} />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">

        {/* Header */}
        <div className="mb-10 md:mb-14">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>{t.page_title}</h1>
          <p className={`text-base md:text-lg max-w-2xl ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>{t.page_subtitle}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === f
                  ? isDark
                    ? 'bg-white text-gray-900'
                    : 'bg-gray-900 text-white'
                  : isDark
                    ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {CATEGORY_LABELS[f][lang]}
            </button>
          ))}
        </div>

        {/* Featured Guide card */}
        {onOpenGuide && (
          <button
            onClick={onOpenGuide}
            className={`w-full text-left mb-8 p-6 md:p-8 rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden relative group ${
              isDark
                ? 'bg-[#1D1D1F] border-white/5 hover:border-white/15 hover:shadow-xl'
                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-xl'
            }`}
          >
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#7B61FF]/10 via-[#D946EF]/5 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#7B61FF]/10 text-[#7B61FF]">Guide</span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#2D5CF3]/10 text-[#2D5CF3]">Claude Code</span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600">Ressources</span>
                </div>
                <h3 className={`text-lg md:text-xl font-bold tracking-[-0.02em] mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {lang === 'en' ? 'Getting Started with Claude Code' : 'Bien d\u00e9marrer avec Claude Code'}
                </h3>
                <p className={`text-sm leading-relaxed max-w-xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {lang === 'en'
                    ? 'A complete guide for designers: 9 chapters covering setup, workflows, deployment, visual quality, and skills.'
                    : 'Guide complet pour les designers : 9 chapitres couvrant installation, workflows, d\u00e9ploiement, qualit\u00e9 visuelle et skills.'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-[#2D5CF3] font-medium text-sm flex-shrink-0">
                <span>{lang === 'en' ? 'Read' : 'Lire'}</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </button>
        )}

        {/* Signals grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSignals.map(signal => {
              const colors = CATEGORY_COLORS[signal.category];
              const isCopied = copiedId === signal.id;
              return (
                <motion.article
                  key={signal.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => onOpenSignal(signal.id)}
                  className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
                    isDark
                      ? 'bg-[#1D1D1F] ring-1 ring-white/5 hover:ring-white/15'
                      : 'bg-white ring-1 ring-gray-200/60 hover:ring-gray-300/80 shadow-sm'
                  }`}
                >
                  <div className="p-5 md:p-6 flex flex-col min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        isDark ? colors.bgDark : colors.bg
                      } ${colors.text}`}>
                        {CATEGORY_LABELS[signal.category][lang]}
                      </span>
                      <button
                        onClick={(e) => handleCopy(e, signal)}
                        className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${
                          isCopied
                            ? 'text-green-500'
                            : isDark
                              ? 'text-gray-600 hover:text-gray-300 hover:bg-white/5'
                              : 'text-gray-300 hover:text-gray-600 hover:bg-gray-100'
                        }`}
                        title={isCopied ? t.copied : 'Copy link'}
                      >
                        {isCopied ? <Check size={14} /> : <Link2 size={14} />}
                      </button>
                    </div>

                    <h3 className={`text-lg md:text-xl font-bold mb-2 leading-snug tracking-[-0.02em] transition-colors line-clamp-3 ${
                      isDark ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-[#2D5CF3]'
                    }`}>
                      {getTitle(signal)}
                    </h3>

                    <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {getBody(signal)}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-sm font-medium transition-colors ${
                          isDark ? 'text-blue-400' : 'text-[#2D5CF3]'
                        }`}>
                          {t.read_more}
                        </span>
                        <ArrowRight size={14} className={`transition-transform group-hover:translate-x-1 ${
                          isDark ? 'text-blue-400' : 'text-[#2D5CF3]'
                        }`} />
                      </div>
                      <time className={`text-[11px] ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                        {new Date(signal.date + '-01').toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                          month: 'short',
                          year: 'numeric',
                        })}
                      </time>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default SignalsPage;
