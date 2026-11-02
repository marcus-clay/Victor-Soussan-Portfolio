/**
 * The six templates, in one place and without any JSX, so server code can read them.
 * The About carousel (resourcesData.tsx), the Resources grid (contentData.ts) and the template pages
 * (/ressources/[slug]) all build from this list: one title, one description and one address per
 * language. The reading content lives in templateBodies.ts, the card pictures in ResourceScene.tsx.
 */

import type { SignalCategory } from './signalsData'
import { TEMPLATE_BODIES, type TemplateBody } from './templateBodies'

export interface TemplateEntry {
  id: string
  category: SignalCategory
  /** Two or three tag ids from resourceTags.ts */
  tags: string[]
  /** Address under /ressources/, one per language */
  slug: { en: string; fr: string }
  title: { en: string; fr: string }
  desc: { en: string; fr: string }
  /** <title> of the page, under about 60 characters with the site suffix */
  seoTitle: { en: string; fr: string }
  /** Meta description, 120 to 158 characters */
  seoDesc: { en: string; fr: string }
}

export const TEMPLATE_ENTRIES: TemplateEntry[] = [
  {
    id: 'template-design-scoping',
    category: 'methodology',
    tags: ['cadrage', 'ideation', 'documentation'],
    slug: { en: 'design-scoping', fr: 'cadrage-de-conception' },
    title: { en: "Template: Design Scoping", fr: "Modèle : cadrage de conception" },
    desc: {
      en: "A framework to frame design problems, scope, and goals before starting UI.",
      fr: "Le document que je remplis avant d’ouvrir Figma pour mettre tout le monde d’accord sur le « pourquoi ».",
    },
    seoTitle: { en: "Design scoping template", fr: "Modèle de cadrage de conception" },
    seoDesc: {
      en: "A one-page template to frame a design topic before opening Figma: context, problem, goals, concepts, prototypes and next steps.",
      fr: "Un modèle d’une page pour cadrer un sujet de conception avant d’ouvrir Figma : contexte, problématique, objectifs, concepts, prototypes et prochaines étapes.",
    },
  },
  {
    id: 'template-po-design-sync',
    category: 'methodology',
    tags: ['rituels', 'product-owner'],
    slug: { en: 'po-design-sync', fr: 'synchro-po-design' },
    title: { en: "Process: PO / Design Sync", fr: "Rituel : point PO et design" },
    desc: {
      en: "Rituals and workflows to align Product Owners and Designers efficiently.",
      fr: "Comment organiser la collaboration de la semaine pour éviter l’effet tunnel.",
    },
    seoTitle: { en: "PO and design sync: a two-meeting ritual", fr: "Synchro PO et design : un rituel en deux réunions" },
    seoDesc: {
      en: "Two thirty-minute meetings, alternating each week, to keep design one sprint ahead of the Product Owner and prepare the sprint planning.",
      fr: "Deux réunions de trente minutes, en alternance chaque semaine, pour garder le design un sprint en avance du PO et préparer le sprint planning.",
    },
  },
  {
    id: 'template-design-teardown',
    category: 'craft',
    tags: ['atelier', 'ideation'],
    slug: { en: 'design-teardown-workshop', fr: 'atelier-design-teardown' },
    title: { en: "Workshop: Design Teardown", fr: "Atelier : Design Teardown" },
    desc: {
      en: "Workshop template for analyzing and critiquing existing interfaces collectively.",
      fr: "Un modèle pour auditer une interface existante en équipe et repérer la dette UX.",
    },
    seoTitle: { en: "Design teardown: a three-hour workshop", fr: "Design teardown : un atelier de trois heures" },
    seoDesc: {
      en: "A three-hour express ideation workshop for four or five people: framing, comparative analysis, sketching and convergence, with the timing of each step.",
      fr: "Un atelier d’idéation express de trois heures pour quatre ou cinq personnes : cadrage, analyse comparative, dessin, convergence, durée de chaque temps.",
    },
  },
  {
    id: 'template-feature-checklist',
    category: 'craft',
    tags: ['checklist', 'cadrage', 'accessibilite'],
    slug: { en: 'feature-design-checklist', fr: 'checklist-conception-fonctionnalite' },
    title: { en: "Checklist: Feature Design", fr: "Checklist : concevoir une fonctionnalité" },
    desc: {
      en: "A granular checklist to ensure quality from kickoff to handoff.",
      fr: "De quoi ne rien oublier avant le développement : cas limites, états vides, erreurs, adaptation aux écrans.",
    },
    seoTitle: { en: "Feature design checklist: 25 points", fr: "Checklist de conception : 25 points" },
    seoDesc: {
      en: "Three questions and twenty-five points to review before a feature is considered designed: context, feedback, errors, accessibility, empty states, launch.",
      fr: "Trois questions et vingt-cinq points à vérifier avant de considérer une fonctionnalité conçue : contexte, retours, erreurs, accessibilité, états vides.",
    },
  },
  {
    id: 'template-ui-slicing',
    category: 'craft',
    tags: ['handoff', 'figma'],
    slug: { en: 'ui-slicing', fr: 'decouper-une-interface' },
    title: { en: "Process: UI Slicing", fr: "Méthode : découper une interface" },
    desc: {
      en: "Methodology to break down interfaces into atomic components for devs.",
      fr: "Comment je découpe une interface en composants (React, design atomique) pour les développeurs.",
    },
    seoTitle: { en: "UI slicing: one board per ticket", fr: "Découper une interface : une planche par ticket" },
    seoDesc: {
      en: "How to slice an interface into atomic tickets for front-end developers: a before/after board per ticket, one sentence per change, specs kept apart.",
      fr: "Découper une interface en tickets atomiques pour les développeurs front : une planche avant/après par ticket, une phrase par changement, les specs à part.",
    },
  },
  {
    id: 'template-figma-file-status',
    category: 'craft',
    tags: ['figma', 'documentation'],
    slug: { en: 'figma-file-status', fr: 'statuts-fichiers-figma' },
    title: { en: "Figma: File Status", fr: "Figma : nommage et statuts des fichiers" },
    desc: {
      en: "Naming conventions and status tags for keeping Figma files clean.",
      fr: "Comment je gère les statuts (WIP, Review, Dev Ready) pour que chacun s’y retrouve.",
    },
    seoTitle: { en: "Figma file statuses: Explo, WIP, Ready to dev", fr: "Statuts des fichiers Figma : Explo, WIP, Ready to dev" },
    seoDesc: {
      en: "Four statuses and a page naming convention so that designers, Product Owners and developers read the same Figma file the same way.",
      fr: "Quatre statuts et une convention de nommage des pages pour que designers, PO et développeurs lisent le même fichier Figma de la même façon.",
    },
  },
]

/** Address of a template page in one language, without the language prefix. */
export const templatePath = (t: TemplateEntry, lang: 'en' | 'fr') => `ressources/${t.slug[lang]}`

/** A template found by its address in either language. */
export const findTemplateBySlug = (slug: string) =>
  TEMPLATE_ENTRIES.find((t) => t.slug.en === slug || t.slug.fr === slug)

/** The reading content of a template in one language. */
export const templateBody = (t: TemplateEntry, lang: 'en' | 'fr'): TemplateBody => TEMPLATE_BODIES[t.id][lang]

/** [english, french] address pairs, for the language switch of the header. */
export const TEMPLATE_SLUG_PAIRS: [en: string, fr: string][] = TEMPLATE_ENTRIES.map((t) => [t.slug.en, t.slug.fr])
