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
  heroImage: '/images/guide-claude-code/hero-cover.png',
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

// Templates (from resourcesData, converted to ContentItem)
const TEMPLATES: ContentItem[] = [
  {
    id: 'template-design-scoping',
    type: 'template',
    title_en: 'Template: Design Scoping',
    title_fr: 'Template : Cadrage Design',
    excerpt_en: 'A structured approach to clarifying design problems, scope, and goals before opening Figma.',
    excerpt_fr: 'Le document que je remplis avant d\'ouvrir Figma pour aligner tout le monde sur le \'Pourquoi\'.',
    date: '2024-01',
    category: 'methodology',
    link: 'https://victor-soussan.notion.site/Template-Id-ation-Cadrage-de-conception-22ea519b0dea810f9d50cf4eeb7f0c48',
  },
  {
    id: 'template-po-design-sync',
    type: 'template',
    title_en: 'Process: PO / Design Sync',
    title_fr: 'Rituel : Synchro PO / Design',
    excerpt_en: 'Rituals and workflows to align Product Owners and Designers efficiently.',
    excerpt_fr: 'Comment organiser la collaboration hebdomadaire pour éviter l\'effet tunnel.',
    date: '2024-01',
    category: 'methodology',
    link: 'https://victor-soussan.notion.site/Process-de-synchro-PO-Design-22ea519b0dea815690c0c5e178b61bf7',
  },
  {
    id: 'template-design-teardown',
    type: 'template',
    title_en: 'Workshop: Design Teardown',
    title_fr: 'Atelier : Design Teardown',
    excerpt_en: 'Workshop template for analyzing and critiquing existing interfaces collectively.',
    excerpt_fr: 'Template pour auditer une interface existante en équipe et identifier les dettes UX.',
    date: '2024-01',
    category: 'craft',
    link: 'https://victor-soussan.notion.site/Template-Id-ation-Atelier-Design-Teardown-22ea519b0dea81b09215c004b04ef56d',
  },
  {
    id: 'template-feature-checklist',
    type: 'template',
    title_en: 'Checklist: Feature Design',
    title_fr: 'Checklist : Design de fonctionnalité',
    excerpt_en: 'A granular checklist to ensure quality from kickoff to handoff.',
    excerpt_fr: 'Rien ne doit être oublié avant le dev : edge cases, états vides, erreurs, responsive.',
    date: '2024-01',
    category: 'craft',
    link: 'https://victor-soussan.notion.site/LONG-Checklist-Design-d-une-nouvelle-fonctionnalit-112a519b0dea8119b5ecc4084f3c0e53',
  },
  {
    id: 'template-ui-slicing',
    type: 'template',
    title_en: 'Process: UI Slicing',
    title_fr: 'Méthode : Découpage UI (Slicing)',
    excerpt_en: 'Methodology to break down interfaces into atomic components for devs.',
    excerpt_fr: 'Comment je découpe une interface en composants React/Atomic pour les développeurs.',
    date: '2024-01',
    category: 'craft',
    link: 'https://victor-soussan.notion.site/Process-D-couper-finement-une-UI-22ea519b0dea81158739d163fc196f0c',
  },
  {
    id: 'template-figma-file-status',
    type: 'template',
    title_en: 'Figma: File Status',
    title_fr: 'Figma : Convention de nommage',
    excerpt_en: 'Naming conventions and status tags for keeping Figma files clean.',
    excerpt_fr: 'Comment je gère les statuts (WIP, Review, Dev Ready) pour qu\'on s\'y retrouve.',
    date: '2024-01',
    category: 'craft',
    link: 'https://victor-soussan.notion.site/Figma-Status-des-maquettes-et-prototypes-22ea519b0dea8121a1acd9e1fd59212f',
  },
]

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
