import { getProjects } from '@/data/projectsData'
import type { Lang } from '@/lib/seo'

/**
 * Shared by the canonical project page (/project/[id]) and the noindex gallery (/project/[id]/gallery).
 * Titles stay under the 62 character budget enforced by buildMetadata.
 */

export const CASE_STUDY_IDS = ['toolkit', 'dailymotion', 'connect', 'sqool', 'sqool-classe', 'france-vae', 'pagesjaunes', 'androidwear', 'riskos'] as const
export const SHORT_PROJECT_IDS = ['condamine-apps', 'design-system-figma-claude'] as const

export const PROJECT_TITLE: Record<Lang, Record<'caseStudy' | 'short' | 'gallery', (name: string) => string>> = {
  en: {
    caseStudy: (n) => `${n}: product design case study`,
    short: (n) => `${n}, project overview`,
    gallery: (n) => `${n}, project gallery`,
  },
  fr: {
    caseStudy: (n) => `${n} : étude de cas product design`,
    short: (n) => `${n}, aperçu du projet`,
    gallery: (n) => `${n}, galerie du projet`,
  },
}

export const PROJECT_DESC: Record<Lang, Record<'caseStudy' | 'short' | 'gallery', (name: string, summary: string) => string>> = {
  en: {
    caseStudy: (n, s) => `Full case study of ${n}. ${s}`,
    short: (n, s) => `${s} ${n}, by Victor Soussan.`,
    gallery: (n, s) => `Screens and visuals from ${n}. ${s}`,
  },
  fr: {
    caseStudy: (n, s) => `Étude de cas complète de ${n}. ${s}`,
    short: (n, s) => `${s} ${n}, par Victor Soussan.`,
    gallery: (n, s) => `Écrans et visuels de ${n}. ${s}`,
  },
}

export function findProject(lang: Lang, id: string) {
  return getProjects(lang).find((p) => p.id === id)
}

export function ogImageFor(id: string, cover: string | undefined) {
  if (id === 'riskos') return { url: '/images/riskos/02-case-detail.png', width: 1920, height: 1080 }
  // Large PNG covers exceed the 5 MB limit of several social networks: keep the default card for those.
  if (cover && /\.(webp|jpe?g)$/i.test(cover)) return { url: cover }
  return undefined
}
