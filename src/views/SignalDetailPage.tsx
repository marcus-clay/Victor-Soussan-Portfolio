/**
 * SignalDetailPage - Blog article view for a single signal
 * Same grammar as the case-study body: a full-width header, then ONE content column (.act-wide).
 * Each h2 opens a numbered section (hairline, number in the gutter, title and text); text caps its
 * own measure in `ch`. The header is a title and one quiet line of metadata: the long excerpt
 * (370 to 980 characters, a summary of the opening paragraph) is not repeated as a standfirst, the
 * opening paragraph itself leads the text.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { SIGNALS, CATEGORY_LABELS } from '../data/signalsData';
import CaseStudyTOCBar from '../components/CaseStudyTOCBar';
import AuthorContactCard from '../components/AuthorContactCard';
import RelatedContent, { type RelatedItem } from '../components/RelatedContent';
import { ActRule } from '../components/case-study/ActSection';
import { ArticleBody, ArticleBodyStyles } from '../components/article/ArticleBody';
import { TRANSLATIONS } from '../data/translations';
import { scrollToElement } from '../utils/smoothScroll';

interface Props {
  signalId: string;
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  onBack: () => void;
  /** Follow-up cards (computed on the server): next article first, then related content */
  related: RelatedItem[];
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

/**
 * Cuts the article HTML at every h2: the text before the first h2 is the introduction, then one
 * chunk per section (the h2 is the first element of its chunk). Words and order are untouched.
 */
function splitAtH2(html: string): { intro: string; sections: string[] } {
  const parts = html.split(/(?=<h2 id=")/);
  if (parts.length > 0 && !parts[0].startsWith('<h2')) {
    return { intro: parts[0], sections: parts.slice(1) };
  }
  return { intro: '', sections: parts };
}

const SignalDetailPage: React.FC<Props> = ({ signalId, systemTheme, lang, onBack, related }) => {
  const signal = SIGNALS.find(s => s.id === signalId);
  const isDark = systemTheme === 'dark';
  const articleRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [showTOC, setShowTOC] = useState(false);

  // Track active section for TOC
  useEffect(() => {
    if (!signal) return;
    const handleScroll = () => {
      setShowTOC(window.scrollY > 300);
      const headings = document.querySelectorAll('[id^="section-"]');
      let current = '';
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 120) current = heading.id;
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
            <p className="text-base mb-4">{lang === 'en' ? 'Signal not found' : 'Signal introuvable'}</p>
            <button onClick={onBack} className="text-gray-500 [@media(hover:hover)]:hover:text-gray-900 font-medium">
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
  const { intro, sections } = splitAtH2(processedHtml);

  const formattedDate = new Date(signal.date + '-01').toLocaleDateString(
    lang === 'fr' ? 'fr-FR' : 'en-US',
    { month: 'long', year: 'numeric' }
  );

  // Reading time: 220 words per minute, words counted on the text only (tags become spaces)
  const wordCount = rawContent.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.round(wordCount / 220));
  const readingLabel = lang === 'fr' ? `${readingTime}\u00A0min de lecture` : `${readingTime} min read`;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FCFCFD]'}`}>
      {/* Breadcrumb - sticky below Nav */}
      <div className={`sticky z-10 backdrop-blur-xl ${isDark ? 'bg-[#0a0a0a]/80 border-white/5' : 'bg-[#FCFCFD]/80 border-gray-200'}`} style={{ top: 'var(--nav-height, 64px)', transition: 'top 250ms cubic-bezier(0.23, 1, 0.32, 1)' }}>
        <div className="wrap h-10 flex items-center">
          <nav className="flex items-center gap-1.5 text-xs min-w-0 overflow-hidden">
            <button
              onClick={onBack}
              className={`transition-colors cursor-pointer flex-shrink-0 [@media(hover:hover)]:hover:underline ${isDark ? 'text-gray-500 [@media(hover:hover)]:hover:text-white' : 'text-gray-500 [@media(hover:hover)]:hover:text-gray-900'}`}
            >
              {lang === 'fr' ? 'Ressources' : 'Resources'}
            </button>
            <ArrowRight size={10} className={`flex-shrink-0 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
            <span className={`truncate font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </span>
          </nav>
        </div>
      </div>

      {/* Sticky TOC bar */}
      {hasTOC && showTOC && (
        <div
          className="sticky z-10 backdrop-blur-xl bg-[#FCFCFD]/80"
          style={{ top: 'var(--nav-height, 64px)', transition: 'top 250ms cubic-bezier(0.23, 1, 0.32, 1)' }}
        >
          <CaseStudyTOCBar
            sections={tocItems}
            activeSection={activeSection}
            onSectionClick={scrollToElement}
            isDark={false}
            lang={lang}
          />
        </div>
      )}

      {/* Header full width (same as Approche), then everything lives in the one content column */}
      <article ref={articleRef}>
        <header className="wrap pt-10 md:pt-16 pb-12 md:pb-16">
          <h1 className={`text-headline text-balance max-w-[26ch] ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h1>

          {/* One quiet line: category, date, reading time */}
          <p className="mt-6 md:mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
            <span>{CATEGORY_LABELS[signal.category][lang]}</span>
            <span className="text-gray-300" aria-hidden="true">·</span>
            <time dateTime={signal.date}>{formattedDate}</time>
            <span className="text-gray-300" aria-hidden="true">·</span>
            <span>{readingLabel}</span>
          </p>
        </header>

        {/* Hero image (if signal has one): the full column */}
        {signal.heroImage && (
          <figure className="act-wide m-0 pb-12 md:pb-16">
            <img
              src={signal.heroImage}
              alt={title}
              className="w-full max-h-[70vh] object-cover rounded-xl ring-1 ring-inset ring-black/[0.05]"
            />
          </figure>
        )}

        {/* Introduction: the text before the first h2 */}
        {intro && (
          <div className={`act-wide ${sections.length > 0 ? 'pb-12 md:pb-16' : 'pb-16 md:pb-24'}`}>
            <ArticleBody html={intro} isDark={isDark} lead />
          </div>
        )}

        {/* One section per h2: hairline across the container, number in the gutter (above the title
            on phones), then title and text on the column. The hairline above the related block
            closes the article. */}
        {sections.map((html, i) => (
          <section key={i}>
            <ActRule />
            <div className={`act-wide pt-12 md:pt-16 ${i === sections.length - 1 ? 'pb-16 md:pb-24' : 'pb-12 md:pb-16'}`}>
              <span
                className="block md:absolute md:left-[var(--pad)] md:top-[4.45rem] mb-3 md:mb-0 text-xs font-medium text-gray-500 tabular-nums"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <ArticleBody html={html} isDark={isDark} />
            </div>
          </section>
        ))}
      </article>

      {/* Follow-up: next article first, then related content, then the author block */}
      <RelatedContent heading={TRANSLATIONS[lang].related.keep_reading} items={related} id="related" />
      <AuthorContactCard lang={lang} />

      <ArticleBodyStyles />
    </div>
  );
};

export default SignalDetailPage;
