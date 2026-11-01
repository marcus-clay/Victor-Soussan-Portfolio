/**
 * ReadingPage: the long-reading layout shared by the articles and the templates.
 * Same grammar as the case-study body: a full-width header, then ONE content column (.act-wide).
 * Each h2 of the HTML opens a numbered section (hairline, number in the gutter, title and text); text
 * caps its own measure in `ch`. The header is a title and one quiet line of metadata. Below the
 * text: the follow-up cards, then the author block.
 */

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import CaseStudyTOCBar from '../components/CaseStudyTOCBar';
import AuthorContactCard from '../components/AuthorContactCard';
import RelatedContent, { type RelatedItem } from '../components/RelatedContent';
import { ActRule } from '../components/case-study/ActSection';
import { ArticleBody, ArticleBodyStyles } from '../components/article/ArticleBody';
import { scrollToElement } from '../utils/smoothScroll';

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
 * Cuts the HTML at every h2: the text before the first h2 is the introduction, then one chunk per
 * section (the h2 is the first element of its chunk). Words and order are untouched.
 */
function splitAtH2(html: string): { intro: string; sections: string[] } {
  const parts = html.split(/(?=<h2 id=")/);
  if (parts.length > 0 && !parts[0].startsWith('<h2')) {
    return { intro: parts[0], sections: parts.slice(1) };
  }
  return { intro: '', sections: parts };
}

/** Reading time at 220 words per minute, counted on the text only (tags become spaces). */
export function readingLabelFor(html: string, lang: 'en' | 'fr'): string {
  const wordCount = html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / 220));
  return lang === 'fr' ? `${minutes} min de lecture` : `${minutes} min read`;
}

export interface ReadingPageProps {
  lang: 'en' | 'fr';
  title: string;
  /** The quiet line under the title: category, date, reading time... in order. */
  meta: React.ReactNode[];
  /** The whole text, h2 sections included. */
  html: string;
  heroImage?: string;
  /** Follow-up cards (computed on the server) */
  related: RelatedItem[];
  relatedHeading: string;
  /** Breadcrumb: the parent page */
  backLabel: string;
  onBack: () => void;
  isDark?: boolean;
}

const ReadingPage: React.FC<ReadingPageProps> = ({
  lang, title, meta, html, heroImage, related, relatedHeading, backLabel, onBack, isDark = false,
}) => {
  const articleRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [showTOC, setShowTOC] = useState(false);

  // Track active section for TOC
  useEffect(() => {
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
  }, []);

  const { tocItems, processedHtml } = parseAndInjectTOC(html);
  const hasTOC = tocItems.length >= 2;
  const { intro, sections } = splitAtH2(processedHtml);

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
              {backLabel}
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

          {/* One quiet line of metadata */}
          <p className="mt-6 md:mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
            {meta.map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="text-gray-300" aria-hidden="true">·</span>}
                {item}
              </React.Fragment>
            ))}
          </p>
        </header>

        {/* Hero image (if any): the full column */}
        {heroImage && (
          <figure className="act-wide m-0 pb-12 md:pb-16">
            <img
              src={heroImage}
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
            closes the text. */}
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

      {/* Follow-up: related content, then the author block */}
      <RelatedContent heading={relatedHeading} items={related} id="related" />
      <AuthorContactCard lang={lang} />

      <ArticleBodyStyles />
    </div>
  );
};

export default ReadingPage;
