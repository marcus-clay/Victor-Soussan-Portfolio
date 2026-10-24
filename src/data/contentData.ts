/**
 * Unified content data for the Resources page.
 * Single source of truth for all content items: articles, guides, templates.
 *
 * Re-exports from signalsData (articles) and adds templates + guide entry.
 * The guide chapters remain in guideClaudeCodeData.ts (they have their own structure).
 */

import { SIGNALS, CATEGORY_COLORS, CATEGORY_LABELS } from './signalsData'
import type { Signal, SignalCategory } from './signalsData'
import { GUIDE_META } from './guideClaudeCodeData'
import { SHIP_TO_SHOW_META } from './guideShipToShowData'
import { TEMPLATE_ENTRIES } from './templatesData'
import type { ResourceArt } from './templatesData'

// --- Content types ---

export type ContentType = 'article' | 'guide' | 'template'

export interface ContentItem {
  id: string
  type: ContentType
  title_en: string
  title_fr: string
  excerpt_en: string
  excerpt_fr: string
  date: string
  category?: SignalCategory
  // For articles (from signals)
  body_en?: string
  body_fr?: string
  body_long_en?: string
  body_long_fr?: string
  heroImage?: string
  // For templates (external links)
  link?: string
  /** Illustration key of a template (`/images/resources/doc-<art>-light.svg`), as on the About cards */
  art?: ResourceArt
  // For guides
  chapterCount?: number
}

// --- Build unified content list ---

// Articles from signals
const ARTICLES: ContentItem[] = SIGNALS.map((s) => ({
  id: s.id,
  type: 'article' as const,
  title_en: s.title_en,
  title_fr: s.title_fr,
  excerpt_en: s.body_en,
  excerpt_fr: s.body_fr,
  body_en: s.body_en,
  body_fr: s.body_fr,
  body_long_en: s.body_long_en,
  body_long_fr: s.body_long_fr,
  heroImage: s.heroImage,
  date: s.date,
  category: s.category,
}))

// Guide Claude Code as a single content item
const GUIDE_ITEM: ContentItem = {
  id: 'guide-claude-code',
  type: 'guide',
  title_en: 'Getting started with Claude Code',
  title_fr: GUIDE_META.title_fr,
  excerpt_en: 'Complete guide for designers: from installation to deployment, visual quality, skills, and Figma MCP.',
  excerpt_fr: 'Guide complet pour les designers : de l\'installation au déploiement, qualité visuelle, skills et Figma MCP.',
  date: GUIDE_META.date,
  category: 'ai',
  chapterCount: 9,
  heroImage: '/images/guide-claude-code/hero-cover.webp',
}

// Guide Ship to Show as a single content item
const GUIDE_SHIP_TO_SHOW_ITEM: ContentItem = {
  id: 'guide-ship-to-show',
  type: 'guide',
  title_en: 'Ship to Show',
  title_fr: 'Ship to Show',
  excerpt_en: 'A 7-phase framework to turn a prototype into a portfolio case study with animated videos, bilingual narrative, and an integration pack.',
  excerpt_fr: 'Framework en 7 phases pour transformer un prototype en case study portfolio avec vidéos animées, contenu narratif bilingue et pack d\'intégration.',
  date: SHIP_TO_SHOW_META.date,
  category: 'ai',
}

// Templates: titles, descriptions and links come from templatesData, shared with the About cards.
const TEMPLATES: ContentItem[] = TEMPLATE_ENTRIES.map((t) => ({
  id: t.id,
  type: 'template' as const,
  title_en: t.title.en,
  title_fr: t.title.fr,
  excerpt_en: t.desc.en,
  excerpt_fr: t.desc.fr,
  date: '2024-01',
  category: t.category,
  link: t.link,
  art: t.art,
}))

// --- Exports ---

// All content items, sorted by date (newest first)
export const ALL_CONTENT: ContentItem[] = [
  GUIDE_ITEM,
  GUIDE_SHIP_TO_SHOW_ITEM,
  ...ARTICLES,
  ...TEMPLATES,
].sort((a, b) => b.date.localeCompare(a.date))

// Filtered getters
export const getArticles = () => ALL_CONTENT.filter((c) => c.type === 'article')
export const getGuides = () => ALL_CONTENT.filter((c) => c.type === 'guide')
export const getTemplates = () => ALL_CONTENT.filter((c) => c.type === 'template')

// Featured content for homepage (guide + top signal)
export const FEATURED_CONTENT_IDS = ['guide-claude-code', 'claude-code-figma-mcp']
export const getFeaturedContent = () =>
  FEATURED_CONTENT_IDS.map((id) => ALL_CONTENT.find((c) => c.id === id)).filter(Boolean) as ContentItem[]

// Re-export for backward compatibility
export { CATEGORY_COLORS, CATEGORY_LABELS }
export type { SignalCategory, Signal }

// Content type labels and colors
export const TYPE_LABELS: Record<ContentType, { en: string; fr: string }> = {
  article: { en: 'Article', fr: 'Article' },
  guide: { en: 'Guide', fr: 'Guide' },
  template: { en: 'Template', fr: 'Template' },
}

export const TYPE_COLORS: Record<ContentType, { bg: string; text: string }> = {
  article: { bg: 'bg-gray-100', text: 'text-gray-500' },
  guide: { bg: 'bg-gray-100', text: 'text-gray-500' },
  template: { bg: 'bg-gray-100', text: 'text-gray-500' },
}
