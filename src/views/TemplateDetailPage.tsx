/**
 * TemplateDetailPage: one of the six templates as a reading page (same layout as an article).
 * The opening paragraphs say what the document is for, the h2 sections are the template itself.
 */

import React from 'react';
import { CATEGORY_LABELS } from '../data/signalsData';
import { TEMPLATE_ENTRIES, templateBody } from '../data/templatesData';
import { TYPE_LABELS } from '../data/contentData';
import { TRANSLATIONS } from '../data/translations';
import ReadingPage, { readingLabelFor } from './ReadingPage';
import { ResourceBrief } from '../components/resources/ResourceBrief';
import { ResourceHero } from '../components/resources/ResourceScene';
import { TemplateDiagram } from '../components/templates/TemplateDiagrams';
import type { RelatedItem } from '../components/RelatedContent';

interface Props {
  templateId: string;
  lang: 'en' | 'fr';
  onBack: () => void;
  /** Follow-up cards (computed on the server) */
  related: RelatedItem[];
}

const TemplateDetailPage: React.FC<Props> = ({ templateId, lang, onBack, related }) => {
  const entry = TEMPLATE_ENTRIES.find((t) => t.id === templateId);
  if (!entry) return null;

  const content = templateBody(entry, lang);
  const html = `${content.intro}\n${content.body}`;

  return (
    <ReadingPage
      lang={lang}
      title={entry.title[lang]}
      meta={[
        <span key="type">{TYPE_LABELS.template[lang]}</span>,
        <span key="category">{CATEGORY_LABELS[entry.category][lang]}</span>,
        <span key="reading">{readingLabelFor(html, lang)}</span>,
      ]}
      html={html}
      hero={<ResourceHero id={entry.id} lang={lang} />}
      brief={<ResourceBrief id={entry.id} lang={lang} />}
      figure={<TemplateDiagram id={entry.id} lang={lang} />}
      related={related}
      relatedHeading={TRANSLATIONS[lang].related.keep_reading}
      backLabel={lang === 'fr' ? 'Ressources' : 'Resources'}
      onBack={onBack}
    />
  );
};

export default TemplateDetailPage;
