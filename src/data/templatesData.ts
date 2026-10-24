/**
 * The six Notion templates, in one place and without any JSX, so server code can read them.
 * The About cards (resourcesData.tsx) and the Resources list (contentData.ts) both build from
 * this list: one title and one description per template, whichever page shows it.
 */

import type { SignalCategory } from './signalsData'

export type ResourceArt = 'scoping' | 'sync' | 'teardown' | 'checklist' | 'slicing' | 'status'

export interface TemplateEntry {
  id: string
  /** Illustration key of the About card (`/images/resources/doc-<art>-light.svg`) */
  art: ResourceArt
  category: SignalCategory
  link: string
  title: { en: string; fr: string }
  desc: { en: string; fr: string }
}

export const TEMPLATE_ENTRIES: TemplateEntry[] = [
  {
    id: 'template-design-scoping',
    art: 'scoping',
    category: 'methodology',
    link: "https://victor-soussan.notion.site/Template-Id-ation-Cadrage-de-conception-22ea519b0dea810f9d50cf4eeb7f0c48",
    title: { en: "Template: Design Scoping", fr: "Modèle : cadrage de conception" },
    desc: {
      en: "A framework to frame design problems, scope, and goals before starting UI.",
      fr: "Le document que je remplis avant d’ouvrir Figma pour mettre tout le monde d’accord sur le « pourquoi ».",
    },
  },
  {
    id: 'template-po-design-sync',
    art: 'sync',
    category: 'methodology',
    link: "https://victor-soussan.notion.site/Process-de-synchro-PO-Design-22ea519b0dea815690c0c5e178b61bf7",
    title: { en: "Process: PO / Design Sync", fr: "Rituel : point PO et design" },
    desc: {
      en: "Rituals and workflows to align Product Owners and Designers efficiently.",
      fr: "Comment organiser la collaboration de la semaine pour éviter l’effet tunnel.",
    },
  },
  {
    id: 'template-design-teardown',
    art: 'teardown',
    category: 'craft',
    link: "https://victor-soussan.notion.site/Template-Id-ation-Atelier-Design-Teardown-22ea519b0dea81b09215c004b04ef56d",
    title: { en: "Workshop: Design Teardown", fr: "Atelier : Design Teardown" },
    desc: {
      en: "Workshop template for analyzing and critiquing existing interfaces collectively.",
      fr: "Un modèle pour auditer une interface existante en équipe et repérer la dette UX.",
    },
  },
  {
    id: 'template-feature-checklist',
    art: 'checklist',
    category: 'craft',
    link: "https://victor-soussan.notion.site/LONG-Checklist-Design-d-une-nouvelle-fonctionnalit-112a519b0dea8119b5ecc4084f3c0e53",
    title: { en: "Checklist: Feature Design", fr: "Checklist : concevoir une fonctionnalité" },
    desc: {
      en: "A granular checklist to ensure quality from kickoff to handoff.",
      fr: "De quoi ne rien oublier avant le développement : cas limites, états vides, erreurs, adaptation aux écrans.",
    },
  },
  {
    id: 'template-ui-slicing',
    art: 'slicing',
    category: 'craft',
    link: "https://victor-soussan.notion.site/Process-D-couper-finement-une-UI-22ea519b0dea81158739d163fc196f0c",
    title: { en: "Process: UI Slicing", fr: "Méthode : découper une interface" },
    desc: {
      en: "Methodology to break down interfaces into atomic components for devs.",
      fr: "Comment je découpe une interface en composants (React, design atomique) pour les développeurs.",
    },
  },
  {
    id: 'template-figma-file-status',
    art: 'status',
    category: 'craft',
    link: "https://victor-soussan.notion.site/Figma-Status-des-maquettes-et-prototypes-22ea519b0dea8121a1acd9e1fd59212f",
    title: { en: "Figma: File Status", fr: "Figma : nommage et statuts des fichiers" },
    desc: {
      en: "Naming conventions and status tags for keeping Figma files clean.",
      fr: "Comment je gère les statuts (WIP, Review, Dev Ready) pour que chacun s’y retrouve.",
    },
  },
]
