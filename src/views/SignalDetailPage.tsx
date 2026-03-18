/**
 * SignalDetailPage - Blog article view for a single signal
 * Layout unified with GuideClaudeCodePage: CaseStudyTOCSidebar, breadcrumb, article-body styles
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, ArrowRight } from '@phosphor-icons/react';
import { SIGNALS, CATEGORY_COLORS, CATEGORY_LABELS } from '../data/signalsData';
import CaseStudyTOCSidebar from '../components/CaseStudyTOCSidebar';

interface Props {
  signalId: string;
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  onBack: () => void;
  onOpenSignal?: (signalId: string) => void;
}

interface TOCItem {
  id: string;
  label: string;
}

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

  // Track active section for TOC
  useEffect(() => {
    if (!signal) return;
    const container = articleRef.current?.closest('[data-scroll-container]') as HTMLElement | null;
    if (!container) return;
    const handleScroll = () => {
      const headings = document.querySelectorAll('[id^="section-"]');
      let current = '';
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 120) current = heading.id;
      });
      setActiveSection(current);
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [signal]);

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
  const hasTOC = tocItems.length >= 2;

  const formattedDate = new Date(signal.date + '-01').toLocaleDateString(
    lang === 'fr' ? 'fr-FR' : 'en-US',
    { month: 'long', year: 'numeric' }
  );

  const textContent = rawContent.replace(/<[^>]*>/g, '');
  const wordCount = textContent.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 230));
  const catColors = CATEGORY_COLORS[signal.category];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label="Signal detail"
      data-scroll-container
      className={`fixed inset-0 md:top-16 z-[100] overflow-y-auto ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FCFCFD]'}`}
    >
      {/* Breadcrumb - sticky */}
      <div className={`sticky top-0 z-10 border-b ${isDark ? 'bg-[#0a0a0a] border-white/5' : 'bg-[#FCFCFD] border-gray-200'}`}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-10 flex items-center">
          <nav className="flex items-center gap-1.5 text-[13px] min-w-0 overflow-hidden">
            <button
              onClick={onBack}
              className={`transition-colors cursor-pointer hover:underline flex-shrink-0 ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}
            >
              Blog
            </button>
            <ArrowRight size={10} className={`flex-shrink-0 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
            <span className={`truncate font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </span>
          </nav>
        </div>
      </div>

      {/* Left TOC sidebar (CaseStudyTOCSidebar) */}
      {hasTOC && (
        <CaseStudyTOCSidebar
          sections={tocItems}
          activeSection={activeSection}
          onSectionClick={(sectionId: string) => {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          isDark={isDark}
          isVisible={true}
          lang={lang}
        />
      )}

      {/* Main content */}
      <div className={`max-w-[1200px] mx-auto px-6 ${hasTOC ? 'lg:pl-[216px]' : ''} pb-20`}>
        <article ref={articleRef} className="flex-1 min-w-0 pt-8 md:pt-10">

          {/* Hero: content-first (matches guide layout) */}
          <div className="mb-10">
            {/* Category tag */}
            <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold mb-4 ${
              isDark ? catColors.bgDark : catColors.bg
            } ${catColors.text}`}>
              {CATEGORY_LABELS[signal.category][lang]}
            </span>

            {/* Title */}
            <h1 className={`text-3xl sm:text-4xl md:text-[2.5rem] font-bold tracking-[-0.03em] leading-[1.15] mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {title}
            </h1>

            {/* Meta row with author */}
            <div className={`flex items-center gap-3 pb-6 mb-6 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
              <img
                src="/images/photos victor/image_victor_home.png"
                alt="Victor Soussan"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Victor Soussan
                </p>
                <div className={`flex flex-wrap items-center gap-3 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {readingTime} min {lang === 'en' ? 'read' : 'de lecture'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero image (if signal has one) */}
          {signal.heroImage && (
            <figure className="mb-10">
              <img
                src={signal.heroImage}
                alt={title}
                className="w-full rounded-xl"
              />
            </figure>
          )}

          {/* Article body */}
          <div
            className={`article-body ${isDark ? 'article-body-dark' : ''}`}
            dangerouslySetInnerHTML={{ __html: processedHtml }}
          />

          {/* Author card */}
          <div className={`mt-14 p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/5' : 'bg-white border-gray-100'}`}>
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

          {/* Related articles (inline, below author) */}
          {relatedSignals.length > 0 && (
            <div className="mt-14">
              <p className={`text-[11px] font-semibold uppercase tracking-widest mb-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {lang === 'en' ? 'More articles' : 'Autres articles'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {relatedSignals.map(rs => {
                  const rsColors = CATEGORY_COLORS[rs.category];
                  return (
                    <button
                      key={rs.id}
                      onClick={() => onOpenSignal ? onOpenSignal(rs.id) : null}
                      className={`group text-left rounded-xl transition-all duration-200 cursor-pointer p-4 hover:-translate-y-0.5 ${
                        isDark
                          ? 'bg-[#1D1D1F] ring-1 ring-white/5 hover:ring-white/15 hover:shadow-lg'
                          : 'bg-white ring-1 ring-gray-200/60 hover:ring-gray-300/80 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mb-2 ${
                        isDark ? rsColors.bgDark : rsColors.bg
                      } ${rsColors.text}`}>
                        {CATEGORY_LABELS[rs.category][lang]}
                      </span>
                      <p className={`text-sm font-bold leading-snug line-clamp-2 mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {lang === 'en' ? rs.title_en : rs.title_fr}
                      </p>
                      <span className={`flex items-center gap-1 text-xs font-medium ${isDark ? 'text-blue-400' : 'text-[#2D5CF3]'}`}>
                        {lang === 'en' ? 'Read' : 'Lire'}
                        <ArrowRight size={10} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Back to blog */}
          <div className="mt-14 flex justify-center">
            <button
              onClick={onBack}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-sm hover:shadow-md"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              {lang === 'en' ? 'All articles' : 'Tous les articles'}
            </button>
          </div>
        </article>
      </div>

      {/* Article typography (shared with GuideClaudeCodePage) */}
      <style>{`
        .article-body p {
          margin-bottom: 1.75rem;
          line-height: 1.85;
          font-size: 1rem;
          color: #4b5563;
          max-width: 65ch;
        }
        .article-body strong { font-weight: 600; color: #1f2937; }
        .article-body h2, .article-body h3 {
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.3;
          color: #111827;
        }
        .article-body h2 {
          font-size: 1.375rem;
          margin-top: 3rem;
          margin-bottom: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid #f3f4f6;
          scroll-margin-top: 5rem;
        }
        .article-body h2:first-child { margin-top: 0; padding-top: 0; border-top: none; }
        .article-body h3 {
          font-size: 1.125rem;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .article-body ul, .article-body ol { margin-top: 0.75rem; margin-bottom: 1.75rem; padding-left: 1.5rem; }
        .article-body ul { list-style-type: disc; }
        .article-body ol { list-style-type: decimal; }
        .article-body li { margin-bottom: 0.75rem; line-height: 1.75; font-size: 1rem; color: #4b5563; }
        .article-body a { color: #2D5CF3; text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.2s; }
        .article-body a:hover { border-bottom-color: #2D5CF3; }
        .article-body img { border-radius: 12px; max-width: 100%; margin: 2.5rem 0; cursor: zoom-in; transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease; }
        .article-body img:hover { transform: scale(1.01); box-shadow: 0 12px 40px rgba(0,0,0,0.1); }
        .article-body pre { background: #18181b; color: #e4e4e7; padding: 20px 24px; border-radius: 12px; overflow-x: auto; margin: 2rem 0; font-size: 13px; line-height: 1.7; border: 1px solid rgba(255,255,255,0.06); }
        .article-body pre code { background: none; padding: 0; font-size: inherit; color: inherit; }
        .article-body code { background: #f4f4f5; padding: 3px 7px; border-radius: 5px; font-family: ui-monospace, SFMono-Regular, monospace; font-size: 0.8125rem; color: #18181b; }
        .article-body blockquote { border-left: 3px solid #2D5CF3; padding: 1rem 1.25rem; margin: 2rem 0; font-style: italic; color: #6b7280; background: #f9fafb; border-radius: 0 8px 8px 0; line-height: 1.7; }
        .article-body table { width: 100%; border-collapse: collapse; margin: 2rem 0; font-size: 0.875rem; }
        .article-body th { font-weight: 600; padding: 12px 16px; text-align: left; background: #f4f4f5; color: #111827; font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 0.04em; }
        .article-body td { padding: 12px 16px; border-bottom: 1px solid #f4f4f5; color: #4b5563; }
        .article-body tr:nth-child(even) td { background: #fafafa; }
        @media (min-width: 768px) {
          .article-body p, .article-body li { font-size: 1.0625rem; }
          .article-body h2 { font-size: 1.5rem; margin-top: 3.5rem; }
          .article-body h3 { font-size: 1.25rem; }
        }
        .article-body-dark p, .article-body-dark li { color: #a1a1aa; }
        .article-body-dark strong { color: #e4e4e7; }
        .article-body-dark h2, .article-body-dark h3 { color: #ffffff; }
        .article-body-dark h2 { border-top-color: rgba(255,255,255,0.05); }
        .article-body-dark blockquote { color: #71717a; background: rgba(255,255,255,0.03); }
        .article-body-dark code { background: rgba(255,255,255,0.08); color: #e2e8f0; }
        .article-body-dark th { background: rgba(255,255,255,0.05); color: #fff; }
        .article-body-dark td { border-bottom-color: rgba(255,255,255,0.05); color: #a1a1aa; }
        .article-body-dark tr:nth-child(even) td { background: rgba(255,255,255,0.02); }
        .article-body-dark img:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
      `}</style>
    </motion.div>
  );
};

export default SignalDetailPage;
