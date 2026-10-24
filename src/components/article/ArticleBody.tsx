/**
 * ArticleBody: the long-reading body of articles and guide chapters (HTML from the data files).
 *
 * Typographic rules of a book page: hierarchy comes from size, weight and whitespace, structure from
 * hairlines. No cards, no shadows, no coloured accents.
 *
 * It lives inside the page's single content column (`.act-wide`, same left edge and same right
 * edge as every case-study section). Text caps its own measure, so the column itself stays wide:
 * - paragraphs, lists, h3, figure captions, callouts: 62ch
 * - lead paragraph: 40ch (only when it is short, see LEAD_MAX_CHARS)
 * - h2: 26ch (same as an act title)
 * - pull quote: 34ch
 * - code blocks, tables, images, rules: the full column
 * Type sizes come from the Tailwind type roles (text-base, text-lead-lg, text-subhead, text-title-3,
 * text-sm, text-xs) through arbitrary variants, never from pixel values. The stylesheet below only
 * carries colour, spacing and shape.
 *
 * The tags and classes covered are those of the 17 articles (p, h2, strong) and of the guide
 * chapters (h3, ul, ol, li, a, code, pre, table, blockquote, img, `.callout`), plus figure and
 * figcaption for future captioned images.
 */

import React, { useMemo } from 'react';

/** Above this length the first paragraph stays at body size: a lead has to read in one glance. */
const LEAD_MAX_CHARS = 280;

const TYPE_AND_MEASURE = [
  // Reading text: 16px, line-height 1.7
  '[&_p]:text-base [&_p]:leading-[1.7] [&_p]:max-w-[62ch]',
  '[&_ul]:text-base [&_ul]:max-w-[62ch] [&_ol]:text-base [&_ol]:max-w-[62ch]',
  '[&_li]:text-base [&_li]:leading-[1.7]',
  // Lead paragraph (short opening paragraph only)
  '[&_.lead]:text-lead-lg [&_.lead]:leading-[1.5] [&_.lead]:max-w-[40ch]',
  // Pull quote: subhead size, normal weight
  '[&_blockquote]:text-subhead [&_blockquote]:!font-normal [&_blockquote]:leading-[1.25] [&_blockquote]:max-w-[34ch]',
  // Headings
  '[&_h2]:text-subhead [&_h2]:max-w-[26ch] [&_h2]:text-balance',
  '[&_h3]:text-title-3 [&_h3]:max-w-[62ch] [&_h3]:text-balance',
  // Wide blocks keep the full column and use the small roles
  '[&_pre]:text-xs [&_pre]:leading-[1.7]',
  '[&_code]:text-xs',
  '[&_table]:text-sm [&_th]:text-sm',
  '[&_figcaption]:text-xs [&_figcaption]:max-w-[62ch]',
  '[&_.callout]:text-sm [&_.callout]:leading-[1.6] [&_.callout]:max-w-[62ch] [&_.callout_p]:text-sm [&_.callout_li]:text-sm',
].join(' ');

/**
 * Small structural passes on the author HTML (words and order are untouched):
 * - tables get a scroll wrapper, so a wide table scrolls inside the column on phones
 * - code blocks become keyboard focusable, so their horizontal scroll is reachable without a mouse
 * - with `lead`, a short first paragraph is marked as the lead
 */
function enhanceHtml(html: string, lead: boolean): string {
  let out = html
    .replace(/<table(?=[\s>])/g, '<div class="table-scroll" tabindex="0"><table')
    .replace(/<\/table>/g, '</table></div>')
    .replace(/<pre(?=[\s>])/g, '<pre tabindex="0"');

  if (lead) {
    const first = out.match(/^\s*<p>([\s\S]*?)<\/p>/);
    if (first && first[1].replace(/<[^>]*>/g, '').trim().length <= LEAD_MAX_CHARS) {
      out = out.replace(/^\s*<p>/, '<p class="lead">');
    }
  }
  return out;
}

interface ArticleBodyProps {
  html: string;
  isDark?: boolean;
  /** The first paragraph of this chunk is the article's opening: it becomes the lead if it is short */
  lead?: boolean;
}

export function ArticleBody({ html, isDark = false, lead = false }: ArticleBodyProps) {
  const enhanced = useMemo(() => enhanceHtml(html, lead), [html, lead]);
  return (
    <div
      className={`article-body ${TYPE_AND_MEASURE} ${isDark ? 'article-body-dark' : ''}`}
      dangerouslySetInnerHTML={{ __html: enhanced }}
    />
  );
}

/** Colour, spacing and shape of the article body. Rendered once per page. */
export function ArticleBodyStyles() {
  return (
    <style>{`
      .article-body > :last-child { margin-bottom: 0; }

      /* Text: gray-700 on #FDFDFC is about 10:1, headings and strong go to gray-900 */
      .article-body p { margin: 0 0 1.2em; color: #374151; }
      .article-body p.lead { color: #111827; margin-bottom: 1.5rem; }
      .article-body strong { font-weight: 600; color: #111827; }

      /* Headings: spacing only, hairlines belong to the section, not to the heading */
      .article-body h2, .article-body h3 { color: #111827; scroll-margin-top: 7rem; }
      .article-body h2 { margin: 3rem 0 1.5rem; }
      .article-body h3 { margin: 2.75rem 0 0.5rem; }
      .article-body h2:first-child, .article-body h3:first-child { margin-top: 0; }

      /* Lists: small gray bullets or tabular numbers, no browser markers */
      .article-body ul, .article-body ol { margin: 0 0 1.2em; padding-left: 1.5rem; list-style: none; }
      .article-body ol { counter-reset: article-item; }
      .article-body li { position: relative; margin-bottom: 0.5rem; color: #374151; }
      .article-body li:last-child { margin-bottom: 0; }
      .article-body ul > li::before { content: ''; position: absolute; left: -1.1rem; top: calc(0.85em - 2px); width: 4px; height: 4px; border-radius: 50%; background: #9ca3af; }
      .article-body ol > li { counter-increment: article-item; }
      .article-body ol > li::before { content: counter(article-item) '.'; position: absolute; left: -1.75rem; width: 1.4rem; text-align: right; color: #646b77; font-variant-numeric: tabular-nums; }
      .article-body li > ul, .article-body li > ol { margin: 0.5rem 0 0; padding-left: 1.25rem; }
      .article-body li > p { margin-bottom: 0.5rem; }

      /* Links: quiet underline */
      .article-body a { color: #111827; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #d1d5db; transition: color var(--duration-quick, 150ms), text-decoration-color var(--duration-quick, 150ms); }
      @media (hover: hover) {
        .article-body a:hover { color: #6b7280; text-decoration-color: #9ca3af; }
      }
      .article-body a:focus-visible, .article-body pre:focus-visible, .article-body .table-scroll:focus-visible { outline: 2px solid #111827; outline-offset: 2px; border-radius: 4px; }

      /* Images and figures: the full column at most, hairline ring (outline, so it follows the radius), caption below */
      .article-body figure { margin: 2rem 0; }
      .article-body img { display: block; max-width: 100%; height: auto; border-radius: 12px; margin: 2rem 0; outline: 1px solid rgba(0,0,0,0.06); outline-offset: -1px; cursor: zoom-in; transition: outline-color var(--duration-slow, 400ms) cubic-bezier(0.22, 1, 0.36, 1), transform var(--duration-slow, 400ms) cubic-bezier(0.22, 1, 0.36, 1); }
      .article-body figure img { margin: 0; }
      .article-body figcaption { margin-top: 0.75rem; color: #646b77; text-align: left; }
      @media (hover: hover) and (pointer: fine) {
        .article-body img:hover { outline-color: rgba(0,0,0,0.14); transform: scale(1.01); }
      }

      /* Code: light surface, hairline, no shadow */
      .article-body pre { background: #f9fafb; color: #1f2937; padding: 1rem 1.25rem; border-radius: 8px; overflow-x: auto; margin: 1.75rem 0; border: 1px solid #e5e7eb; tab-size: 2; }
      .article-body pre code { background: none; padding: 0; border-radius: 0; font-size: inherit; line-height: inherit; color: inherit; }
      .article-body code { background: #f3f4f6; padding: 0.1em 0.35em; border-radius: 4px; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace; color: #1f2937; }

      /* Pull quote: one black hairline above as the single accent, set at the column edge */
      .article-body blockquote { margin: 2.5rem 0; padding: 1.25rem 0 0; border-top: 1px solid #111827; font-style: normal; color: #111827; }
      .article-body blockquote p { font-size: inherit; line-height: inherit; max-width: none; margin: 0; color: inherit; }
      .article-body blockquote p + p { margin-top: 0.75em; }

      /* Tables: top and bottom rule, one hairline under the header, no vertical lines, no zebra */
      .article-body .table-scroll { overflow-x: auto; margin: 2rem 0; border-top: 1px solid #111827; border-bottom: 1px solid #111827; }
      .article-body table { width: 100%; min-width: 32rem; border-collapse: collapse; font-variant-numeric: tabular-nums; }
      .article-body th { font-weight: 600; text-align: left; vertical-align: bottom; padding: 0.75rem 1.5rem 0.75rem 0; border-bottom: 1px solid #d1d5db; color: #111827; line-height: 1.4; }
      .article-body td { text-align: left; vertical-align: top; padding: 0.625rem 1.5rem 0.625rem 0; color: #374151; line-height: 1.5; }
      .article-body tbody tr:first-child td { padding-top: 0.875rem; }
      .article-body tbody tr:last-child td { padding-bottom: 0.875rem; }
      .article-body th:last-child, .article-body td:last-child { padding-right: 0; }

      /* Callouts (guides): hairlines above and below instead of a panel */
      .article-body .callout { padding: 0.875rem 0; margin: 1.75rem 0; border-top: 1px solid #d1d5db; border-bottom: 1px solid #d1d5db; color: #374151; }

      /* Rules */
      .article-body hr { border: none; border-top: 1px solid #e5e7eb; margin: 2.5rem 0; }

      /* Dark */
      .article-body-dark p, .article-body-dark li { color: #a1a1aa; }
      .article-body-dark p.lead { color: #ffffff; }
      .article-body-dark strong { color: #e4e4e7; }
      .article-body-dark h2, .article-body-dark h3 { color: #ffffff; }
      .article-body-dark ul > li::before { background: #71717a; }
      .article-body-dark ol > li::before { color: #71717a; }
      .article-body-dark a { color: #ffffff; text-decoration-color: rgba(255,255,255,0.3); }
      .article-body-dark a:focus-visible, .article-body-dark pre:focus-visible, .article-body-dark .table-scroll:focus-visible { outline-color: #ffffff; }
      .article-body-dark img { outline-color: rgba(255,255,255,0.1); }
      .article-body-dark figcaption { color: #a1a1aa; }
      .article-body-dark pre { background: rgba(255,255,255,0.04); color: #e4e4e7; border-color: rgba(255,255,255,0.08); }
      .article-body-dark code { background: rgba(255,255,255,0.08); color: #e2e8f0; }
      .article-body-dark blockquote { color: #ffffff; border-top-color: #ffffff; }
      .article-body-dark .table-scroll { border-top-color: #ffffff; border-bottom-color: #ffffff; }
      .article-body-dark th { color: #ffffff; border-bottom-color: rgba(255,255,255,0.15); }
      .article-body-dark td { color: #a1a1aa; }
      .article-body-dark .callout { color: #d4d4d8; border-top-color: rgba(255,255,255,0.15); border-bottom-color: rgba(255,255,255,0.15); }
      .article-body-dark hr { border-top-color: rgba(255,255,255,0.05); }
      @media (hover: hover) and (pointer: fine) {
        .article-body-dark img:hover { outline-color: rgba(255,255,255,0.22); }
      }
    `}</style>
  );
}
