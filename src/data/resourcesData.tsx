import type { Language } from './translations';
import { getResources as libraryItems, TYPE_LABELS, type ContentItem } from './contentData';

/**
 * The cards of the About carousel: the whole library (guides, templates, decks), each with the words of
 * the Resources grid and the id of its scene (ResourceScene). Newest first, like the grid.
 */

export interface Resource {
  id: string;
  title: string;
  type: string;
  desc: string;
  link: string;
}

function hrefOf(item: ContentItem, lang: Language): string {
  if ((item.type === 'template' || item.type === 'deck') && item.slug) return `/${lang}/ressources/${item.slug[lang]}`;
  return item.id === 'guide-ship-to-show' ? `/${lang}/guide/ship-to-show` : `/${lang}/guide/claude-code`;
}

export const getResources = (lang: Language): Resource[] =>
  libraryItems().map((item) => ({
    id: item.id,
    title: lang === 'fr' ? item.title_fr : item.title_en,
    type: TYPE_LABELS[item.type][lang],
    desc: lang === 'fr' ? item.excerpt_fr : item.excerpt_en,
    link: hrefOf(item, lang),
  }));
