/**
 * GuideClaudeCodePage - Guide with index page + individual chapter sub-pages
 * view='index' → landing page with chapter cards
 * view={slug}  → single chapter article with breadcrumb
 */

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Clock, Calendar, List,
  LinkedinLogo, Envelope, BookOpen, CaretRight, X,
} from '@phosphor-icons/react';
import { GUIDE_META, GUIDE_CHAPTERS } from '../data/guideClaudeCodeData';
import CaseStudyTOCSidebar from '../components/CaseStudyTOCSidebar';

interface Props {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  view: string; // 'index' or chapter slug
  onNavigate: (target: string) => void; // 'blog', 'index', or chapter slug
}

const TAG_STYLES: Record<string, string> = {
  'Claude Code': 'bg-[#7B61FF]/10 text-[#7B61FF]',
  'Guide': 'bg-[#2D5CF3]/10 text-[#2D5CF3]',
  'Ressources': 'bg-emerald-500/10 text-emerald-600',
};

// ─── Index Page ───────────────────────────────────────────────────────────────

const GuideIndex: React.FC<{ isDark: boolean; lang: string; onNavigate: (t: string) => void }> = ({ isDark, lang, onNavigate }) => (
  <div className="max-w-[1200px] mx-auto px-6 pb-20 pt-8 md:pt-10">
    {/* Title + meta : full width, left-aligned */}
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {GUIDE_META.categories.map((cat) => (
          <span key={cat} className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${TAG_STYLES[cat]}`}>
            {cat}
          </span>
        ))}
      </div>
      <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.08] mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {GUIDE_META.title}
      </h1>
      <p className={`text-lg md:text-xl leading-relaxed mb-6 max-w-[55ch] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {GUIDE_META.subtitle}
      </p>
      <div className={`flex items-center gap-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
        <img src={GUIDE_META.author.image} alt={GUIDE_META.author.name} className="w-9 h-9 rounded-full object-cover" />
        <div className="text-sm">
          <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{GUIDE_META.author.name}</span>
          <span className="mx-2">·</span>
          <span className="inline-flex items-center gap-1"><Calendar size={12} />{new Date(GUIDE_META.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span className="mx-2">·</span>
          <span className="inline-flex items-center gap-1"><Clock size={12} />{GUIDE_META.readTime}</span>
        </div>
      </div>
    </div>

    {/* Hero image : full 1200px width */}
    <figure className="mb-10">
      <img src={GUIDE_META.heroImage} alt={GUIDE_META.heroAlt} className="w-full rounded-xl" />
      <figcaption className={`mt-3 text-[13px] leading-relaxed max-w-3xl ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
        Claude Code ouvre aux designers la possibilité de concevoir, produire et déployer des livrables réels, directement utilisables. Un lien à partager à son équipe, à présenter à ses décideurs, à faire tester à ses usagers pour délimiter un scope et raffiner une solution. Avec un peu de méthode et des partis pris affirmés, le cycle entre une décision de design et quelque chose de testable se réduit à l'essentiel.
      </figcaption>
    </figure>

    {/* 2-column layout: sidebar info + main content — matches chapter pages */}
    <div className="flex gap-8 xl:gap-12">
      {/* Left column: guide info (matches TOC column width) */}
      <aside className="hidden lg:block w-48 xl:w-56 flex-shrink-0">
        <div className="sticky top-14">
          <p className={`text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            <BookOpen size={14} />
            {lang === 'en' ? 'About this guide' : 'À propos'}
          </p>
          <div className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <p className="mb-3">9 chapitres couvrant l'installation, les workflows, le déploiement, la qualité visuelle et les skills.</p>
            <p>Pour designers qui travaillent dans Figma et veulent produire des livrables fonctionnels.</p>
          </div>
          <div className={`pt-4 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
            <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {lang === 'en' ? 'Prerequisites' : 'Prérequis'}
            </p>
            <ul className={`text-sm space-y-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <li>Claude Pro ou Max</li>
              <li>App Desktop Claude</li>
              <li>VSCode (optionnel)</li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Right column: main content */}
      <div className="flex-1 min-w-0">
        {/* Intro callout */}
        <div className={`p-6 rounded-xl border-l-4 border-amber-400 mb-14 ${isDark ? 'bg-amber-900/10' : 'bg-amber-50'}`}>
          <p className={`text-[15px] leading-[1.8] ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Beaucoup de guides sur Claude Code s'adressent à des développeurs. Celui-ci part d'un point de vue différent : tu es designer, tu travailles dans Figma, tu penses en interfaces, en flux, en composants. <strong>Tu n'as pas forcément envie d'apprendre à coder pour de bon. Et tu n'en as pas besoin.</strong>
          </p>
        </div>

        {/* Chapter cards */}
        <h2 className={`text-2xl md:text-[1.75rem] font-bold tracking-[-0.02em] mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {lang === 'en' ? 'Table of contents' : 'Ce que couvre ce guide'}
        </h2>
        <div className="flex flex-col gap-4 mb-14">
          {GUIDE_CHAPTERS.map((ch) => (
            <button
              key={ch.slug}
              onClick={() => onNavigate(ch.slug)}
              className={`group text-left p-4 md:p-5 rounded-xl border transition-all duration-200 cursor-pointer hover:-translate-y-0.5 ${
                isDark
                  ? 'bg-[#1D1D1F] border-white/5 hover:border-white/15 hover:shadow-lg'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                  isDark ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500'
                }`}>
                  {ch.number}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-base font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {ch.title}
                  </h3>
                  <p className={`text-sm leading-relaxed line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {ch.intro}
                  </p>
                </div>
                <ArrowRight size={16} className={`flex-shrink-0 mt-1.5 transition-transform group-hover:translate-x-1 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
              </div>
            </button>
          ))}
        </div>

        {/* Author card */}
        <div className={`p-6 rounded-xl border ${isDark ? 'bg-[#1D1D1F] border-white/5' : 'bg-white border-gray-100'}`}>
          <div className="flex items-start gap-4">
            <img src={GUIDE_META.author.image} alt={GUIDE_META.author.name} className="w-14 h-14 rounded-full object-cover" />
            <div>
              <p className={`font-bold mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>{GUIDE_META.author.name}</p>
              <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{GUIDE_META.author.role}</p>
              <p className={`text-sm leading-relaxed mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{GUIDE_META.author.bio}</p>
              <div className="flex gap-3">
                <a href={GUIDE_META.author.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2D5CF3] hover:underline">LinkedIn</a>
                <a href={GUIDE_META.author.website} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2D5CF3] hover:underline">Portfolio</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Chapter Page ─────────────────────────────────────────────────────────────

const GuideChapter: React.FC<{
  isDark: boolean; lang: string; slug: string; onNavigate: (t: string) => void;
}> = ({ isDark, lang, slug, onNavigate }) => {
  const chapterIdx = GUIDE_CHAPTERS.findIndex(c => c.slug === slug);
  const chapter = GUIDE_CHAPTERS[chapterIdx];
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const articleRef = useRef<HTMLDivElement>(null);

  // Image lightbox via event delegation
  useEffect(() => {
    const container = articleRef.current;
    if (!container) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' && target.closest('.article-body')) {
        e.preventDefault();
        setLightboxSrc((target as HTMLImageElement).src);
      }
    };
    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, []);

  // Track active section for left TOC
  useEffect(() => {
    if (!chapter) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );
    chapter.sections.forEach((_, i) => {
      const el = document.getElementById(`section-${slug}-${i}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [chapter, slug]);

  // Scroll to top on chapter change
  useEffect(() => {
    // Find the scrollable container (the fixed div with overflow-y-auto)
    const scrollContainer = articleRef.current?.closest('[data-scroll-container]');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0 });
    } else {
      window.scrollTo({ top: 0 });
    }
    setActiveSection('');
  }, [slug]);

  if (!chapter) {
    return (
      <div className="max-w-[900px] mx-auto px-6 py-20 text-center">
        <p className={`text-lg mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Chapitre introuvable</p>
        <button onClick={() => onNavigate('index')} className="text-[#2D5CF3] font-medium hover:underline">
          Retour au guide
        </button>
      </div>
    );
  }

  const prev = chapterIdx > 0 ? GUIDE_CHAPTERS[chapterIdx - 1] : null;
  const next = chapterIdx < GUIDE_CHAPTERS.length - 1 ? GUIDE_CHAPTERS[chapterIdx + 1] : null;

  return (
    <>
      {/* Lightbox — portaled to body to escape z-index stacking context */}
      {createPortal(
        <AnimatePresence>
          {lightboxSrc && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm cursor-zoom-out p-4 md:p-10"
              onClick={() => setLightboxSrc(null)}
            >
              <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10" onClick={() => setLightboxSrc(null)}>
                <X size={24} />
              </button>
              <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} src={lightboxSrc} alt="" className="max-w-full max-h-full rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* ─── Left sidebar: CaseStudyTOCSidebar (section TOC) ─── */}
      <CaseStudyTOCSidebar
        sections={chapter.sections.map((sec, i) => ({
          id: `section-${slug}-${i}`,
          label: sec.heading,
        }))}
        activeSection={activeSection}
        onSectionClick={(sectionId: string) => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        isDark={isDark}
        isVisible={true}
        lang={lang as 'en' | 'fr'}
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:pl-[216px] pb-20">
          {/* ─── Article content ─── */}
          <article ref={articleRef} className="flex-1 min-w-0 pt-8 md:pt-10">
            {/* Chapter header */}
            <div className="mb-12">
              <span className={`text-[11px] font-semibold uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Chapitre {chapter.number} / {GUIDE_CHAPTERS.length}
              </span>
              <h1 className={`text-3xl sm:text-4xl md:text-[2.5rem] font-bold tracking-[-0.03em] leading-[1.15] mt-3 mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {chapter.title}
              </h1>
              <p className={`text-base md:text-lg leading-relaxed max-w-[65ch] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {chapter.intro}
              </p>
            </div>

            {/* Sections */}
            {chapter.sections.map((section, sIdx) => (
              <div
                key={sIdx}
                id={`section-${slug}-${sIdx}`}
                className={`mb-14 scroll-mt-20 ${sIdx > 0 ? `pt-10 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}` : ''}`}
              >
                <h2 className={`text-xl md:text-2xl font-bold tracking-[-0.02em] leading-tight mb-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {section.heading}
                </h2>
                <div className={`article-body ${isDark ? 'article-body-dark' : ''}`} dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
            ))}

            {/* Prev / Next navigation */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 mt-12 pt-8 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
              {prev ? (
                <button
                  onClick={() => onNavigate(prev.slug)}
                  className={`group text-left p-4 rounded-xl border transition-all cursor-pointer hover:-translate-y-0.5 ${
                    isDark ? 'bg-[#1D1D1F] border-white/5 hover:border-white/15' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <span className={`text-[11px] font-medium uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    <ArrowLeft size={10} className="inline mr-1" />
                    {lang === 'en' ? 'Previous' : 'Précédent'}
                  </span>
                  <p className={`text-sm font-semibold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{prev.title}</p>
                </button>
              ) : <div />}
              {next ? (
                <button
                  onClick={() => onNavigate(next.slug)}
                  className={`group text-left p-4 rounded-xl border transition-all cursor-pointer hover:-translate-y-0.5 ${
                    isDark ? 'bg-[#1D1D1F] border-white/5 hover:border-white/15' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <span className={`text-[11px] font-medium uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {lang === 'en' ? 'Next' : 'Suivant'}
                    <ArrowRight size={10} className="inline ml-1" />
                  </span>
                  <p className={`text-sm font-semibold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{next.title}</p>
                </button>
              ) : <div />}
            </div>

            {/* Contact CTA (only on last chapter) */}
            {!next && (
              <div className={`mt-10 p-6 md:p-8 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/5' : 'bg-white border-gray-100'}`}>
                <h3 className={`text-lg font-bold tracking-[-0.02em] mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {lang === 'en' ? 'Need help getting started?' : 'Besoin d\'accompagnement pour démarrer ?'}
                </h3>
                <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {lang === 'en'
                    ? 'I help design teams integrate Claude Code into their workflows: workshops, pair sessions, project setup.'
                    : 'J\'accompagne les équipes design dans l\'intégration de Claude Code : ateliers, sessions en binôme, mise en place de projets.'}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={GUIDE_META.author.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-sm hover:shadow-md transition-all">
                    <LinkedinLogo size={16} weight="bold" /> LinkedIn
                  </a>
                  <a href="mailto:victor@victorsoussan.fr" className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${isDark ? 'bg-white/5 text-white hover:bg-white/10 ring-1 ring-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                    <Envelope size={16} /> Email
                  </a>
                </div>
              </div>
            )}

            {/* Back to guide index */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => onNavigate('index')}
                className={`group inline-flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                {lang === 'en' ? 'Back to guide' : 'Retour au guide'}
              </button>
            </div>
          </article>
      </div>

      {/* ─── Right sidebar: Chapter navigation (outside 1200px container) ─── */}
      <aside className="hidden 2xl:block fixed right-6 top-28 w-48 z-10">
        <p className={`text-[11px] font-semibold uppercase tracking-widest mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          {lang === 'en' ? 'Chapters' : 'Chapitres'}
        </p>
        <ul className="space-y-0.5">
          {GUIDE_CHAPTERS.map((ch) => (
            <li key={ch.slug}>
              <button
                onClick={() => onNavigate(ch.slug)}
                className={`text-left text-[12px] leading-snug py-1.5 px-2.5 rounded-lg w-full transition-colors cursor-pointer ${
                  ch.slug === slug
                    ? isDark ? 'text-white bg-white/5 font-medium' : 'text-gray-900 bg-gray-100 font-medium'
                    : isDark ? 'text-gray-500 hover:text-gray-300 hover:bg-white/5' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="inline-block w-4 text-[10px] opacity-50">{ch.number}.</span>
                {ch.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const GuideClaudeCodePage: React.FC<Props> = ({ systemTheme, lang, view, onNavigate }) => {
  const isDark = systemTheme === 'dark';
  const isIndex = view === 'index';
  const chapter = !isIndex ? GUIDE_CHAPTERS.find(c => c.slug === view) : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      data-scroll-container
      className={`fixed inset-0 md:top-16 z-[100] overflow-y-auto ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FCFCFD]'}`}
    >
      {/* Breadcrumb bar - sticky */}
      <div className={`sticky top-0 z-10 border-b ${isDark ? 'bg-[#0a0a0a] border-white/5' : 'bg-[#FCFCFD] border-gray-200'}`}>
        <div className={`max-w-[1200px] mx-auto px-4 md:px-6 h-10 flex items-center justify-between ${!isIndex ? 'lg:pl-[216px]' : ''}`}>
          <nav className="flex items-center gap-1.5 text-[13px] min-w-0 overflow-hidden">
            <button onClick={() => onNavigate('blog')} className={`transition-colors cursor-pointer hover:underline flex-shrink-0 ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}>
              Blog
            </button>
            <CaretRight size={10} className={`flex-shrink-0 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
            {isIndex ? (
              <span className={`truncate font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{GUIDE_META.title}</span>
            ) : (
              <>
                <button onClick={() => onNavigate('index')} className={`transition-colors cursor-pointer hover:underline flex-shrink-0 ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}>
                  Guide
                </button>
                <CaretRight size={10} className={`flex-shrink-0 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                <span className={`truncate font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {chapter ? chapter.title : view}
                </span>
              </>
            )}
          </nav>
          {!isIndex && (
            <button
              onClick={() => onNavigate('index')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer flex-shrink-0 lg:hidden ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
            >
              <List size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {isIndex ? (
        <GuideIndex isDark={isDark} lang={lang} onNavigate={onNavigate} />
      ) : (
        <GuideChapter isDark={isDark} lang={lang} slug={view} onNavigate={onNavigate} />
      )}

      {/* Article typography — generous spacing, strong hierarchy */}
      <style>{`
        /* ── Base text ── */
        .article-body p {
          margin-bottom: 1.75rem;
          line-height: 1.85;
          font-size: 1rem;
          color: #4b5563;
          max-width: 65ch;
        }
        .article-body strong { font-weight: 600; color: #1f2937; }

        /* ── Headings: strong contrast with body ── */
        .article-body h3 {
          font-size: 1.375rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-top: 3rem;
          margin-bottom: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid #f3f4f6;
          color: #111827;
          line-height: 1.3;
        }
        .article-body h3:first-child { margin-top: 0; padding-top: 0; border-top: none; }

        /* ── Lists ── */
        .article-body ul, .article-body ol { margin-top: 0.75rem; margin-bottom: 1.75rem; padding-left: 1.5rem; }
        .article-body ul { list-style-type: disc; }
        .article-body ol { list-style-type: decimal; }
        .article-body li { margin-bottom: 0.75rem; line-height: 1.75; font-size: 1rem; color: #4b5563; }

        /* ── Links ── */
        .article-body a { color: #2D5CF3; text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.2s; }
        .article-body a:hover { border-bottom-color: #2D5CF3; }

        /* ── Images: generous vertical breathing room ── */
        .article-body img {
          border-radius: 12px;
          max-width: 100%;
          margin: 2.5rem 0;
          cursor: zoom-in;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }
        .article-body img:hover {
          transform: scale(1.01);
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
        }

        /* ── Code blocks ── */
        .article-body pre {
          background: #18181b;
          color: #e4e4e7;
          padding: 20px 24px;
          border-radius: 12px;
          overflow-x: auto;
          margin: 2rem 0;
          font-size: 13px;
          line-height: 1.7;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .article-body pre code { background: none; padding: 0; font-size: inherit; color: inherit; }
        .article-body code {
          background: #f4f4f5;
          padding: 3px 7px;
          border-radius: 5px;
          font-family: ui-monospace, SFMono-Regular, 'SF Mono', monospace;
          font-size: 0.8125rem;
          color: #18181b;
        }

        /* ── Blockquotes ── */
        .article-body blockquote {
          border-left: 3px solid #2D5CF3;
          padding: 1rem 1.25rem;
          margin: 2rem 0;
          font-style: italic;
          color: #6b7280;
          background: #f9fafb;
          border-radius: 0 8px 8px 0;
          line-height: 1.7;
        }

        /* ── Tables ── */
        .article-body table { width: 100%; border-collapse: collapse; margin: 2rem 0; font-size: 0.875rem; border-radius: 8px; overflow: hidden; }
        .article-body th { font-weight: 600; padding: 12px 16px; text-align: left; background: #f4f4f5; color: #111827; font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 0.04em; }
        .article-body td { padding: 12px 16px; border-bottom: 1px solid #f4f4f5; color: #4b5563; }
        .article-body tr:nth-child(even) td { background: #fafafa; }

        /* ── Callouts ── */
        .article-body .callout {
          border-left: 4px solid #f59e0b;
          padding: 1.25rem 1.5rem;
          border-radius: 0 12px 12px 0;
          margin: 2rem 0;
          background: #fffbeb;
          font-size: 0.9375rem;
          line-height: 1.7;
        }

        /* ── Horizontal rules ── */
        .article-body hr { border: none; border-top: 1px solid #e5e7eb; margin: 2.5rem 0; }

        /* ── Desktop refinements ── */
        @media (min-width: 768px) {
          .article-body p, .article-body li { font-size: 1.0625rem; }
          .article-body h3 { font-size: 1.5rem; margin-top: 3.5rem; }
        }

        /* ── Dark mode ── */
        .article-body-dark p, .article-body-dark li { color: #a1a1aa; }
        .article-body-dark strong { color: #e4e4e7; }
        .article-body-dark h3 { color: #ffffff; border-top-color: rgba(255,255,255,0.05); }
        .article-body-dark blockquote { color: #71717a; background: rgba(255,255,255,0.03); }
        .article-body-dark code { background: rgba(255,255,255,0.08); color: #e2e8f0; }
        .article-body-dark th { background: rgba(255,255,255,0.05); color: #fff; }
        .article-body-dark td { border-bottom-color: rgba(255,255,255,0.05); color: #a1a1aa; }
        .article-body-dark tr:nth-child(even) td { background: rgba(255,255,255,0.02); }
        .article-body-dark .callout { background: rgba(245,158,11,0.06); color: #d4d4d8; }
        .article-body-dark img:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
        .article-body-dark hr { border-top-color: rgba(255,255,255,0.05); }
      `}</style>
    </motion.div>
  );
};

export default GuideClaudeCodePage;
