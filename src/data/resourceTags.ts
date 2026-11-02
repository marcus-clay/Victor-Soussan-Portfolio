/**
 * The tags of the resources (guides and templates), in both languages. A resource carries two or three
 * tag ids; the Resources grid filters on them, inside the chosen category. Add a tag here before using
 * it on an entry, so every label exists in both languages.
 */

export const RESOURCE_TAGS: Record<string, { en: string; fr: string }> = {
  cadrage: { en: 'Scoping', fr: 'Cadrage' },
  ideation: { en: 'Ideation', fr: 'Idéation' },
  rituels: { en: 'Rituals', fr: 'Rituels' },
  atelier: { en: 'Workshop', fr: 'Atelier' },
  checklist: { en: 'Checklist', fr: 'Checklist' },
  handoff: { en: 'Developer handoff', fr: 'Passation aux développeurs' },
  figma: { en: 'Figma', fr: 'Figma' },
  documentation: { en: 'Documentation', fr: 'Documentation' },
  'product-owner': { en: 'Product Owner', fr: 'Product Owner' },
  accessibilite: { en: 'Accessibility', fr: 'Accessibilité' },
  'claude-code': { en: 'Claude Code', fr: 'Claude Code' },
  prototypage: { en: 'Prototyping', fr: 'Prototypage' },
  'case-study': { en: 'Case study', fr: 'Case study' },
  presentation: { en: 'Presentation', fr: 'Présentation' },
  decision: { en: 'Decision', fr: 'Décision' },
  recherche: { en: 'User research', fr: 'Recherche utilisateur' },
}

export type ResourceTag = keyof typeof RESOURCE_TAGS
