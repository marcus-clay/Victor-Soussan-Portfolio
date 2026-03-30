import type { MetadataRoute } from 'next'
import { GUIDE_CHAPTERS } from '@/data/guideClaudeCodeData'

const BASE_URL = 'https://www.victorsoussan.fr'

const STATIC_ROUTES = [
  '', 'about', 'approche', 'projets', 'services', 'consulting', 'ressources',
  'visual-archive', 'testimonials', 'contact', 'resume', 'quote', 'presentation',
]

const PROJECT_IDS = [
  'toolkit', 'dailymotion', 'connect', 'sqool', 'sqool-classe',
  'france-vae', 'pagesjaunes', 'androidwear', 'riskos',
]

const SHORT_PROJECT_IDS = [
  'condamine-apps', 'design-system-figma-claude',
]

const VIEW_MODES = ['summary', 'full', 'gallery']

const SIGNAL_IDS = [
  'hiring-solo-designer', 'design-thinking-public-service', 'roadmap-zero-to-one',
  'design-system-five-brands', 'ai-prototyping-50-apps', 'scoping-is-the-work',
  'designer-to-lead', 'designing-for-unwilling-users', 'storybook-negotiation',
  'ai-training-non-designers', 'delivery-cycles', 'structurer-le-flou',
  'culture-design-organisation', 'binome-pm-designer', 'claude-code-figma-mcp',
  'design-system-figma-claude-code', 'claude-code-full-project',
]

const LANGS = ['en', 'fr'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Static routes
  for (const lang of LANGS) {
    for (const route of STATIC_ROUTES) {
      const path = route ? `/${lang}/${route}` : `/${lang}`
      entries.push({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            fr: `${BASE_URL}/fr/${route}`,
            en: `${BASE_URL}/en/${route}`,
          },
        },
      })
    }
  }

  // Signal routes
  for (const lang of LANGS) {
    for (const id of SIGNAL_IDS) {
      entries.push({
        url: `${BASE_URL}/${lang}/signal/${id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            fr: `${BASE_URL}/fr/signal/${id}`,
            en: `${BASE_URL}/en/signal/${id}`,
          },
        },
      })
    }
  }

  // Project routes
  for (const lang of LANGS) {
    for (const id of PROJECT_IDS) {
      for (const view of VIEW_MODES) {
        entries.push({
          url: `${BASE_URL}/${lang}/project/${id}/${view}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: {
              fr: `${BASE_URL}/fr/project/${id}/${view}`,
              en: `${BASE_URL}/en/project/${id}/${view}`,
            },
          },
        })
      }
    }
  }

  // Short project routes (summary only)
  for (const lang of LANGS) {
    for (const id of SHORT_PROJECT_IDS) {
      entries.push({
        url: `${BASE_URL}/${lang}/project/${id}/summary`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            fr: `${BASE_URL}/fr/project/${id}/summary`,
            en: `${BASE_URL}/en/project/${id}/summary`,
          },
        },
      })
    }
  }

  // Guide Ship to Show
  for (const lang of LANGS) {
    entries.push({
      url: `${BASE_URL}/${lang}/guide/ship-to-show`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          fr: `${BASE_URL}/fr/guide/ship-to-show`,
          en: `${BASE_URL}/en/guide/ship-to-show`,
        },
      },
    })
  }

  // Guide Claude Code index
  for (const lang of LANGS) {
    entries.push({
      url: `${BASE_URL}/${lang}/guide/claude-code`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          fr: `${BASE_URL}/fr/guide/claude-code`,
          en: `${BASE_URL}/en/guide/claude-code`,
        },
      },
    })
  }

  // Guide chapters (bilingual slugs with proper hreflang)
  for (const ch of GUIDE_CHAPTERS) {
    for (const lang of LANGS) {
      const slug = lang === 'en' ? ch.slug_en : ch.slug_fr
      entries.push({
        url: `${BASE_URL}/${lang}/guide/claude-code/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            fr: `${BASE_URL}/fr/guide/claude-code/${ch.slug_fr}`,
            en: `${BASE_URL}/en/guide/claude-code/${ch.slug_en}`,
          },
        },
      })
    }
  }

  return entries
}
