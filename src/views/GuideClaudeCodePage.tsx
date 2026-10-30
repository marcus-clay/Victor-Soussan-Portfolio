/**
 * GuideClaudeCodePage - Guide with index page + individual chapter sub-pages
 * view='index' → landing page with chapter cards
 * view={slug}  → single chapter article with breadcrumb
 * Same grammar as the case-study body: a full-width header, then ONE content column (.act-wide).
 * Every chapter section is a hairline, its title and its text; text caps its own measure in `ch`.
 */

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToElement } from '../utils/smoothScroll';
import {
  ArrowRight, Clock, Calendar, List,
  CaretRight, X,
} from '@phosphor-icons/react';
import { GUIDE_META, GUIDE_CHAPTERS } from '../data/guideClaudeCodeData';
import CaseStudyTOCBar from '../components/CaseStudyTOCBar';
import AuthorContactCard from '../components/AuthorContactCard';
import RelatedContent, { type RelatedItem } from '../components/RelatedContent';
import { ActRule } from '../components/case-study/ActSection';
import { ArticleBody, ArticleBodyStyles } from '../components/article/ArticleBody';
import { TRANSLATIONS } from '../data/translations';
import { useReveal } from '../lib/motion';

const MotionLink = motion.create(Link);

/** Address of a guide destination: the resources page, the guide index, or a chapter. Real links, so search
 *  engines follow them and readers can open a chapter in a new tab. */
const guideHref = (lang: string, target: string) =>
  target === 'blog' ? `/${lang}/ressources` : target === 'index' ? `/${lang}/guide/claude-code` : `/${lang}/guide/claude-code/${target}`;

interface Props {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  view: string; // 'index' or chapter slug
  onNavigate: (target: string) => void; // 'blog', 'index', or chapter slug
  /** Follow-up cards (computed on the server): next and previous chapter, then other resources */
  related: RelatedItem[];
}

const TAG_STYLE = 'bg-gray-100 text-gray-600';

// ─── Index Page ───────────────────────────────────────────────────────────────

const GuideIndex: React.FC<{ isDark: boolean; lang: string; onNavigate: (t: string) => void }> = ({ isDark, lang, onNavigate }) => {
  const reveal = useReveal();
  return (
  <>
    {/* Header: full width, like Approche */}
    <header className="wrap pt-10 md:pt-16 pb-12 md:pb-16">
      <div className="flex flex-wrap gap-2 mb-6">
        {(lang === 'fr' ? GUIDE_META.categories_fr : GUIDE_META.categories_en).map((cat) => (
          <span key={cat} className={`px-2.5 py-1 rounded-full text-micro font-semibold ${TAG_STYLE}`}>
            {cat}
          </span>
        ))}
      </div>
      <h1 className={`text-headline text-balance max-w-[26ch] ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {lang === 'fr' ? GUIDE_META.title_fr : GUIDE_META.title_en}
      </h1>
      <p className={`mt-6 md:mt-8 text-lead-lg max-w-[54ch] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {lang === 'fr' ? GUIDE_META.subtitle_fr : GUIDE_META.subtitle_en}
      </p>
      <div className="mt-6 md:mt-8 flex items-center gap-3 text-gray-500">
        <img src={GUIDE_META.author.image} alt={GUIDE_META.author.name} className="w-9 h-9 rounded-full object-cover" />
        <div className="text-xs">
          <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{GUIDE_META.author.name}</span>
          <span className="mx-2" aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1"><Calendar size={12} aria-hidden="true" />{new Date(GUIDE_META.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span className="mx-2" aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1"><Clock size={12} aria-hidden="true" />{GUIDE_META.readTime}</span>
        </div>
      </div>
    </header>

    {/* Hero figure: the full column */}
    <figure className="act-wide m-0 pb-12 md:pb-16">
      <img src={GUIDE_META.heroImage} alt={lang === 'fr' ? GUIDE_META.heroAlt_fr : GUIDE_META.heroAlt_en} className="w-full max-h-[70vh] object-cover rounded-2xl ring-1 ring-inset ring-black/[0.05]" />
      <figcaption className="mt-3 text-sm text-gray-500 max-w-[62ch]">
        {lang === 'en'
          ? 'Claude Code gives designers the ability to design, produce, and deploy real, usable deliverables. A link to share with your team, to present to stakeholders, to put in front of users to define scope and refine a solution. With a bit of method and strong design opinions, the cycle between a design decision and something testable shrinks to the essentials.'
          : 'Claude Code ouvre aux designers la possibilité de concevoir, produire et déployer des livrables réels, directement utilisables. Un lien à partager à son équipe, à présenter à ses décideurs, à faire tester à ses usagers pour délimiter un scope et raffiner une solution. Avec un peu de méthode et des partis pris affirmés, le cycle entre une décision de design et quelque chose de testable se réduit à l\'essentiel.'}
      </figcaption>
    </figure>

    {/* Intro: plain text on the column, no tinted panel */}
    <div className="act-wide pb-12 md:pb-16">
      <p className={`text-base max-w-[62ch] ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {lang === 'en'
          ? <>Most Claude Code guides are written for developers. This one starts from a different place: you're a designer, you work in Figma, you think in interfaces, flows, and components. <strong>You don't necessarily want to learn to code for real. And you don't have to.</strong></>
          : <>Beaucoup de guides sur Claude Code s'adressent à des développeurs. Celui-ci part d'un point de vue différent : tu es designer, tu travailles dans Figma, tu penses en interfaces, en flux, en composants. <strong>Tu n'as pas forcément envie d'apprendre à coder pour de bon. Et tu n'en as pas besoin.</strong></>}
      </p>
    </div>

    {/* Chapter cards */}
    <section>
      <ActRule />
      <div className="act-wide pt-12 md:pt-16 pb-16 md:pb-24">
        <h2 className={`text-subhead max-w-[26ch] mb-8 md:mb-10 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {lang === 'en' ? 'Table of contents' : 'Ce que couvre ce guide'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {GUIDE_CHAPTERS.map((ch, idx) => {
            const chSlug = lang === 'fr' ? ch.slug_fr : ch.slug_en;
            const chTitle = lang === 'fr' ? ch.title_fr : ch.title_en;
            const chIntro = lang === 'fr' ? ch.intro_fr : ch.intro_en;
            return (
            <MotionLink
              key={chSlug}
              {...reveal(idx)}
              href={guideHref(lang, chSlug)}
              className={`group block text-left h-full p-5 md:p-6 rounded-2xl border cursor-pointer active:scale-[0.98] ${
                isDark
                  ? 'bg-[#1D1D1F] border-white/5 [@media(hover:hover)]:hover:border-white/15'
                  : 'bg-white border-gray-100 [@media(hover:hover)]:hover:border-gray-200'
              }`}
              style={{ transition: 'transform 160ms cubic-bezier(0.23, 1, 0.32, 1), border-color 150ms ease' }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <p className="mb-1.5 text-xs tabular-nums text-gray-500">{ch.number}</p>
                  <h3 className={`text-title-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {chTitle}
                  </h3>
                  <p className={`mt-2 text-sm line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {chIntro}
                  </p>
                </div>
                <ArrowRight size={16} aria-hidden="true" className={`flex-shrink-0 mt-1 transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-1 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
            </MotionLink>
            );
          })}
        </div>
      </div>
    </section>
  </>
  );
};

// ─── Chapter Page ─────────────────────────────────────────────────────────────

const GuideChapter: React.FC<{
  isDark: boolean; lang: string; slug: string; onNavigate: (t: string) => void;
}> = ({ isDark, lang, slug, onNavigate }) => {
  const chapterIdx = GUIDE_CHAPTERS.findIndex(c => c.slug_en === slug || c.slug_fr === slug);
  const chapter = GUIDE_CHAPTERS[chapterIdx];
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [showTOC, setShowTOC] = useState(false);
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

  // The lightbox portal needs document.body, which does not exist during server rendering.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Track active section for left TOC
  useEffect(() => {
    if (!chapter) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-112px 0px -60% 0px', threshold: 0 }
    );
    chapter.sections.forEach((_, i) => {
      const el = document.getElementById(`section-${slug}-${i}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [chapter, slug]);

  // Show TOC bar after scrolling 300px
  useEffect(() => {
    const handleScroll = () => setShowTOC(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // New chapter: reset the active section. The router already puts a new page at the top,
  // and nothing scrolls on mount.
  useEffect(() => {
    setActiveSection('');
  }, [slug]);

  if (!chapter) {
    return (
      <div className="wrap py-16 md:py-24">
        <p className={`text-base mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{lang === 'en' ? 'Chapter not found' : 'Chapitre introuvable'}</p>
        <Link href={guideHref(lang, 'index')} className="text-gray-500 font-medium [@media(hover:hover)]:hover:text-gray-900 [@media(hover:hover)]:hover:underline">
          {lang === 'en' ? 'Back to guide' : 'Retour au guide'}
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Lightbox: portaled to body to escape z-index stacking context */}
      {mounted && createPortal(
        <AnimatePresence>
          {lightboxSrc && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm cursor-zoom-out p-4 md:p-10"
              onClick={() => setLightboxSrc(null)}
            >
              <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white [@media(hover:hover)]:hover:bg-white/20 transition-colors z-10" onClick={() => setLightboxSrc(null)}>
                <X size={24} />
              </button>
              <motion.img initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }} src={lightboxSrc} alt="" className="max-w-full max-h-full rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Sticky TOC bar */}
      {showTOC && (
        <div
          className={`sticky z-10 backdrop-blur-xl ${isDark ? 'bg-[#0a0a0a]/80' : 'bg-[#FCFCFD]/80'}`}
          style={{ top: 'var(--nav-height, 64px)', transition: 'top 250ms cubic-bezier(0.23, 1, 0.32, 1)' }}
        >
          <CaseStudyTOCBar
            sections={chapter.sections.map((sec, i) => ({
              id: `section-${slug}-${i}`,
              label: lang === 'fr' ? sec.heading_fr : sec.heading_en,
            }))}
            activeSection={activeSection}
            onSectionClick={scrollToElement}
            isDark={isDark}
            lang={lang as 'en' | 'fr'}
          />
        </div>
      )}

      <article ref={articleRef}>
        {/* Chapter header: full width, like Approche */}
        <header className="wrap pt-10 md:pt-16 pb-12 md:pb-16">
          <span className="text-micro font-semibold uppercase tracking-[0.08em] text-gray-500">
            {lang === 'en' ? 'Chapter' : 'Chapitre'} {chapter.number} / {GUIDE_CHAPTERS.length}
          </span>
          <h1 className={`mt-6 text-headline text-balance max-w-[26ch] ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {lang === 'fr' ? chapter.title_fr : chapter.title_en}
          </h1>
          <p className={`mt-6 md:mt-8 text-lead-lg max-w-[54ch] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {lang === 'fr' ? chapter.intro_fr : chapter.intro_en}
          </p>
        </header>

        {/* Sections: hairline across the container, title and text on the one content column */}
        {chapter.sections.map((section, sIdx) => (
          <section key={sIdx} id={`section-${slug}-${sIdx}`} className="scroll-mt-28">
            <ActRule />
            <div className={`act-wide pt-12 md:pt-16 ${sIdx === chapter.sections.length - 1 ? 'pb-16 md:pb-24' : 'pb-12 md:pb-16'}`}>
              <h2 className={`text-subhead max-w-[26ch] mb-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {lang === 'fr' ? section.heading_fr : section.heading_en}
              </h2>
              <ArticleBody html={lang === 'fr' ? section.content_fr : section.content_en} isDark={isDark} />
            </div>
          </section>
        ))}
      </article>

      {/* ─── Right sidebar: chapter navigation. Shown from 1700px, where it no longer overlaps the 1120px content column ─── */}
      <aside className="hidden min-[1700px]:block fixed right-14 top-28 w-48 z-10">
        <p className="text-micro font-semibold uppercase tracking-[0.08em] mb-4 text-gray-500">
          {lang === 'en' ? 'Chapters' : 'Chapitres'}
        </p>
        <ul className="space-y-0.5">
          {GUIDE_CHAPTERS.map((ch) => {
            const chSlug = lang === 'fr' ? ch.slug_fr : ch.slug_en;
            return (
            <li key={chSlug}>
              <Link
                href={guideHref(lang, chSlug)}
                aria-current={chSlug === slug ? 'page' : undefined}
                className={`block text-left text-xs leading-snug py-1.5 px-2.5 rounded-lg w-full transition-colors cursor-pointer ${
                  chSlug === slug
                    ? isDark ? 'text-white bg-white/5 font-medium' : 'text-gray-900 bg-gray-100 font-medium'
                    : isDark ? 'text-gray-500 [@media(hover:hover)]:hover:text-gray-300 [@media(hover:hover)]:hover:bg-white/[0.08]' : 'text-gray-500 [@media(hover:hover)]:hover:text-gray-900 [@media(hover:hover)]:hover:bg-gray-100'
                }`}
              >
                <span className="inline-block w-4 text-micro opacity-50">{ch.number}.</span>
                {lang === 'fr' ? ch.title_fr : ch.title_en}
              </Link>
            </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const GuideClaudeCodePage: React.FC<Props> = ({ systemTheme, lang, view, onNavigate, related }) => {
  const isDark = systemTheme === 'dark';
  const isIndex = view === 'index';
  const chapter = !isIndex ? GUIDE_CHAPTERS.find(c => c.slug_en === view || c.slug_fr === view) : null;

  return (
    <div
      data-scroll-container
      className={`min-h-screen ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FCFCFD]'}`}
    >
      {/* Breadcrumb bar - sticky below Nav */}
      <div className={`sticky z-10 backdrop-blur-xl ${isDark ? 'bg-[#0a0a0a]/80 border-white/5' : 'bg-[#FCFCFD]/80 border-gray-200'}`} style={{ top: 'var(--nav-height, 64px)', transition: 'top 250ms cubic-bezier(0.23, 1, 0.32, 1)' }}>
        <div className="wrap h-10 flex items-center justify-between">
          <nav className="flex items-center gap-1.5 text-xs min-w-0 overflow-hidden">
            <Link href={guideHref(lang, 'blog')} className={`transition-colors flex-shrink-0 [@media(hover:hover)]:hover:underline ${isDark ? 'text-gray-500 [@media(hover:hover)]:hover:text-white' : 'text-gray-500 [@media(hover:hover)]:hover:text-gray-900'}`}>
              {lang === 'fr' ? 'Ressources' : 'Resources'}
            </Link>
            <CaretRight size={10} className={`flex-shrink-0 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
            {isIndex ? (
              <span className={`truncate font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{lang === 'fr' ? GUIDE_META.title_fr : GUIDE_META.title_en}</span>
            ) : (
              <>
                <Link href={guideHref(lang, 'index')} className={`transition-colors flex-shrink-0 [@media(hover:hover)]:hover:underline ${isDark ? 'text-gray-500 [@media(hover:hover)]:hover:text-white' : 'text-gray-500 [@media(hover:hover)]:hover:text-gray-900'}`}>
                  Guide
                </Link>
                <CaretRight size={10} className={`flex-shrink-0 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                <span className={`truncate font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {chapter ? (lang === 'fr' ? chapter.title_fr : chapter.title_en) : view}
                </span>
              </>
            )}
          </nav>
          {!isIndex && (
            <Link
              href={guideHref(lang, 'index')}
              aria-label={lang === 'fr' ? 'Sommaire du guide' : 'Guide contents'}
              className={`p-1.5 rounded-lg transition-colors flex-shrink-0 lg:hidden ${isDark ? '[@media(hover:hover)]:hover:bg-white/10' : '[@media(hover:hover)]:hover:bg-gray-100'}`}
            >
              <List size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      {isIndex ? (
        <GuideIndex isDark={isDark} lang={lang} onNavigate={onNavigate} />
      ) : (
        <GuideChapter isDark={isDark} lang={lang} slug={view} onNavigate={onNavigate} />
      )}

      {/* Follow-up: same block as every content page, then the author block */}
      <RelatedContent heading={TRANSLATIONS[lang].related.keep_reading} items={related} id="related" />
      <AuthorContactCard
        lang={lang}
        message={lang === 'en'
          ? 'I help design teams integrate Claude Code into their workflows: workshops, pair sessions, project setup.'
          : 'J\'accompagne les équipes design dans l\'intégration de Claude Code : ateliers, sessions en binôme, mise en place de projets.'}
      />

      <ArticleBodyStyles />
    </div>
  );
};

export default GuideClaudeCodePage;
