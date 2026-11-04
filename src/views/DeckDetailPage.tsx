/**
 * DeckDetailPage: a deck template as a reading page, kept short. The opening says what the deck is for,
 * the slides scroll in a carousel on a grey panel, the sections are a plain list, the files are one tap
 * away under the title.
 */

import React from 'react';
import { ArrowDown } from '@phosphor-icons/react';
import { CATEGORY_LABELS } from '../data/signalsData';
import { DECK_ENTRIES, deckFile, deckSlide } from '../data/decksData';
import { TYPE_LABELS } from '../data/contentData';
import { TRANSLATIONS } from '../data/translations';
import CardCarousel from '../components/ui/CardCarousel';
import ReadingPage, { readingLabelFor } from './ReadingPage';
import { ResourceBrief } from '../components/resources/ResourceBrief';
import { ResourceHero } from '../components/resources/ResourceScene';
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
  // One opening paragraph, the sections as a list, one line on the typeface: nothing else
  const html = `${deck.intro[lang].split('</p>')[0]}</p>
<h2>${isFr ? 'Ce que contient le deck' : 'What the deck contains'}</h2>
<ol>${sections.map((s) => `<li>${s}</li>`).join('')}</ol>
<p>${isFr
    ? 'Chaque slide porte un texte d’exemple qui dit quoi y mettre. La police est Public Sans, libre, à installer avant d’ouvrir le fichier.'
    : 'Every slide carries example copy that says what goes there. The typeface is Public Sans, free, to install before opening the file.'}</p>`;

  const slides = Array.from({ length: deck.slides[lang] }, (_, i) => i + 1);
  const labels = isFr
    ? { track: 'Les slides du deck', prev: 'Slide précédente', next: 'Slide suivante' }
    : { track: 'The slides of the deck', prev: 'Previous slide', next: 'Next slide' };

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
      hero={<ResourceHero id={deck.id} lang={lang} />}
      brief={<ResourceBrief id={deck.id} lang={lang} />}
      figure={
        // The slides, one after the other on the grey panel of the diagrams; swipe, drag or arrows
        <div className="overflow-hidden rounded-2xl bg-[#F7F7F5] ring-1 ring-inset ring-black/[0.04] py-5 md:py-6">
          <CardCarousel labels={labels} itemClassName="w-[78vw] max-w-[34rem] md:w-[34rem]">
            {slides.map((n) => (
              <img
                key={n}
                src={deckSlide(deck, lang, n)}
                alt={`Slide ${n}`}
                width={1280}
                height={720}
                loading={n > 3 ? 'lazy' : undefined}
                decoding="async"
                draggable={false}
                className="block w-full rounded-xl bg-white ring-1 ring-inset ring-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.12)]"
              />
            ))}
          </CardCarousel>
        </div>
      }
      related={related}
      relatedHeading={TRANSLATIONS[lang].related.keep_reading}
      backLabel={isFr ? 'Ressources' : 'Resources'}
      onBack={onBack}
    />
  );
};

export default DeckDetailPage;
