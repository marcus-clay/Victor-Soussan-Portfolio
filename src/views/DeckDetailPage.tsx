/**
 * DeckDetailPage: a deck template as a reading page. The opening says what the deck is for, the gallery
 * shows every slide, the sections list what the reader will find, and the files are one tap away.
 */

import React from 'react';
import { ArrowDown } from '@phosphor-icons/react';
import { CATEGORY_LABELS } from '../data/signalsData';
import { DECK_ENTRIES, deckFile, deckSlide } from '../data/decksData';
import { TYPE_LABELS } from '../data/contentData';
import { TRANSLATIONS } from '../data/translations';
import ReadingPage, { readingLabelFor } from './ReadingPage';
import type { RelatedItem } from '../components/RelatedContent';

interface Props {
  deckId: string;
  lang: 'en' | 'fr';
  onBack: () => void;
  related: RelatedItem[];
}

const BUTTON =
  'btn-dark inline-flex items-center gap-2 min-h-11 px-5 rounded-full text-sm font-medium bg-gray-900 text-white [@media(hover:hover)]:hover:bg-black active:scale-[0.97]';
const QUIET =
  'inline-flex items-center gap-2 min-h-11 px-5 rounded-full border border-gray-200 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:border-gray-300 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97]';
const TRANSITION = { transition: 'background-color 200ms ease, border-color 150ms ease, color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' };

const DeckDetailPage: React.FC<Props> = ({ deckId, lang, onBack, related }) => {
  const deck = DECK_ENTRIES.find((d) => d.id === deckId);
  if (!deck) return null;
  const isFr = lang === 'fr';

  const sections = deck.sections[lang];
  const html = `${deck.intro[lang]}
<h2>${isFr ? 'Ce que contient le deck' : 'What the deck contains'}</h2>
<ol>${sections.map((s) => `<li>${s}</li>`).join('')}</ol>
<h2>${isFr ? 'Comment s’en servir' : 'How to use it'}</h2>
<p>${isFr
    ? 'Ouvrir le fichier PowerPoint, remplacer chaque texte d’exemple par le vôtre, supprimer les slides inutiles. Les gabarits (couverture, section, énoncé, colonnes, cartes, tableau, calendrier) se dupliquent depuis le menu des dispositions. La police est Public Sans : elle est libre, à installer avant d’ouvrir le fichier.'
    : 'Open the PowerPoint file, replace each example text with yours, delete the slides you do not need. The layouts (cover, section, statement, columns, cards, table, timeline) can be duplicated from the layout menu. The typeface is Public Sans: it is free, install it before opening the file.'}</p>`;

  const slides = Array.from({ length: deck.slides[lang] }, (_, i) => i + 1);

  return (
    <ReadingPage
      lang={lang}
      title={deck.title[lang]}
      meta={[
        <span key="type">{TYPE_LABELS.deck[lang]}</span>,
        <span key="category">{CATEGORY_LABELS[deck.category][lang]}</span>,
        <span key="slides">{deck.slides[lang]} slides</span>,
        <span key="reading">{readingLabelFor(html, lang)}</span>,
      ]}
      actions={
        <div className="flex flex-wrap gap-3">
          <a href={deckFile(deck, lang, 'pptx')} download className={BUTTON} style={TRANSITION}>
            {isFr ? 'Télécharger le PowerPoint' : 'Download the PowerPoint'}
            <ArrowDown size={14} weight="bold" aria-hidden="true" />
          </a>
          <a href={deckFile(deck, lang, 'pdf')} download className={QUIET} style={TRANSITION}>
            PDF
          </a>
        </div>
      }
      html={html}
      figure={
        <ul className="grid grid-cols-2 gap-3 md:gap-4" aria-label={isFr ? 'Les slides du deck' : 'The slides of the deck'}>
          {slides.map((n) => (
            <li key={n} className="min-w-0">
              <img
                src={deckSlide(deck, lang, n)}
                alt={`${isFr ? 'Slide' : 'Slide'} ${n}`}
                width={1280}
                height={720}
                loading={n > 4 ? 'lazy' : undefined}
                decoding="async"
                className="block w-full rounded-lg ring-1 ring-inset ring-black/[0.06] bg-white"
              />
            </li>
          ))}
        </ul>
      }
      related={related}
      relatedHeading={TRANSLATIONS[lang].related.keep_reading}
      backLabel={isFr ? 'Ressources' : 'Resources'}
      onBack={onBack}
    />
  );
};

export default DeckDetailPage;
