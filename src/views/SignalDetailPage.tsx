/**
 * SignalDetailPage - Blog article view for a single signal, on the shared reading layout (ReadingPage).
 * The header is the title and one quiet line of metadata: the long excerpt (370 to 980 characters, a
 * summary of the opening paragraph) is not repeated as a standfirst, the opening paragraph itself
 * leads the text.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { SIGNALS, CATEGORY_LABELS } from '../data/signalsData';
import type { RelatedItem } from '../components/RelatedContent';
import { TRANSLATIONS } from '../data/translations';
import ReadingPage, { readingLabelFor } from './ReadingPage';

interface Props {
  signalId: string;
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  onBack: () => void;
  /** Follow-up cards (computed on the server): next article first, then related content */
  related: RelatedItem[];
}

const SignalDetailPage: React.FC<Props> = ({ signalId, systemTheme, lang, onBack, related }) => {
  const signal = SIGNALS.find(s => s.id === signalId);
  const isDark = systemTheme === 'dark';

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

  const formattedDate = new Date(signal.date + '-01').toLocaleDateString(
    lang === 'fr' ? 'fr-FR' : 'en-US',
    { month: 'long', year: 'numeric' }
  );

  return (
    <ReadingPage
      lang={lang}
      title={title}
      meta={[
        <span key="category">{CATEGORY_LABELS[signal.category][lang]}</span>,
        <time key="date" dateTime={signal.date}>{formattedDate}</time>,
        <span key="reading">{readingLabelFor(rawContent, lang)}</span>,
      ]}
      html={rawContent}
      heroImage={signal.heroImage}
      related={related}
      relatedHeading={TRANSLATIONS[lang].related.keep_reading}
      backLabel="Blog"
      onBack={onBack}
      isDark={isDark}
    />
  );
};

export default SignalDetailPage;
