// Sector and type of project, shown on project cards instead of the role.
// Short, concrete words, three at most, from the sector to the kind of product.

type Tags = { en: string[]; fr: string[] }

const PROJECT_TAGS: Record<string, Tags> = {
  tessan: { en: ['Health', 'Mobile app', 'AI'], fr: ['Santé', 'Application mobile', 'IA'] },
  riskos: { en: ['Finance', 'AI', 'Prototype'], fr: ['Finance', 'IA', 'Prototype'] },
  toolkit: { en: ['Construction', 'SaaS', 'Startup'], fr: ['Construction', 'SaaS', 'Startup'] },
  dailymotion: { en: ['Media', 'B2B', 'Platform'], fr: ['Média', 'B2B', 'Plateforme'] },
  'france-vae': { en: ['Public service', 'Employment', 'Web'], fr: ['Service public', 'Emploi', 'Web'] },
  connect: { en: ['Education', 'SaaS', 'Tablet'], fr: ['Éducation', 'SaaS', 'Tablette'] },
  sqool: { en: ['Education', 'Software', 'Hardware'], fr: ['Éducation', 'Logiciel', 'Matériel'] },
  'sqool-classe': { en: ['Education', 'Real time', 'Tablet'], fr: ['Éducation', 'Temps réel', 'Tablette'] },
  pagesjaunes: { en: ['Local search', 'Mobile', 'Consumer'], fr: ['Recherche locale', 'Mobile', 'Grand public'] },
  androidwear: { en: ['Wearable', 'Mobile', 'Consumer'], fr: ['Objet connecté', 'Mobile', 'Grand public'] },
  'condamine-apps': { en: ['AI', 'Web', 'Prototyping'], fr: ['IA', 'Web', 'Prototypage'] },
  'design-system-figma-claude': { en: ['Design system', 'AI', 'Tooling'], fr: ['Design system', 'IA', 'Outillage'] },
}

/** Tags of a project in the page language; empty when the project has none. */
export const getProjectTags = (id: string, lang: 'en' | 'fr'): string[] => PROJECT_TAGS[id]?.[lang] ?? []
