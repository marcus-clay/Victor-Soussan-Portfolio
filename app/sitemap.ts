import type { MetadataRoute } from 'next'
import { GUIDE_CHAPTERS, GUIDE_META } from '@/data/guideClaudeCodeData'
import { SHIP_TO_SHOW_META } from '@/data/guideShipToShowData'
import { SIGNALS } from '@/data/signalsData'
import { getProjects } from '@/data/projectsData'
import { LANGS, isoDate, pageUrl } from '@/lib/seo'

/**
 * Only indexable, canonical, 200 URLs belong here. Pages marked noindex (consulting, visual-archive,
 * resume, quote, presentation, project galleries) and redirects are deliberately left out: listing them
 * is what makes Search Console report "Excluded by noindex" and "Page with redirect".
 *
 * lastModified comes from real content dates, never from the build time: a lastmod that changes on
 * every deploy teaches Google to ignore the field.
 */

const INDEXABLE_STATIC = ['', 'about', 'approche', 'projets', 'services', 'ressources', 'testimonials', 'contact']

// Update when the copy of the main pages changes in a meaningful way.
const SITE_CONTENT_UPDATED = '2026-10-12'

type Entry = { path: Record<(typeof LANGS)[number], string>; lastModified: string }

function toEntries(items: Entry[]): MetadataRoute.Sitemap {
  return items.flatMap((item) =>
    LANGS.map((lang) => ({
      url: pageUrl(lang, item.path[lang]),
      lastModified: item.lastModified,
      alternates: {
        languages: {
          en: pageUrl('en', item.path.en),
          fr: pageUrl('fr', item.path.fr),
          'x-default': pageUrl('en', item.path.en),
        },
      },
    }))
  )
}

const same = (p: string) => ({ en: p, fr: p })

export default function sitemap(): MetadataRoute.Sitemap {
  const items: Entry[] = []

  for (const route of INDEXABLE_STATIC) {
    items.push({ path: same(route), lastModified: SITE_CONTENT_UPDATED })
  }

  // Projects: one canonical URL each. /summary and /full redirect to it, galleries are noindex.
  for (const p of getProjects('en')) {
    const year = p.period.match(/\d{4}/g)?.pop()
    const lastModified = isoDate(year ? `${year}` : undefined) ?? SITE_CONTENT_UPDATED
    items.push({ path: same(`project/${p.id}`), lastModified })
  }

  // Articles
  for (const s of SIGNALS) {
    items.push({ path: same(`signal/${s.id}`), lastModified: isoDate(s.date) ?? SITE_CONTENT_UPDATED })
  }

  // Guides
  items.push({ path: same('guide/ship-to-show'), lastModified: isoDate(SHIP_TO_SHOW_META.date) ?? SITE_CONTENT_UPDATED })
  items.push({ path: same('guide/claude-code'), lastModified: isoDate(GUIDE_META.date) ?? SITE_CONTENT_UPDATED })
  for (const ch of GUIDE_CHAPTERS) {
    items.push({
      path: { en: `guide/claude-code/${ch.slug_en}`, fr: `guide/claude-code/${ch.slug_fr}` },
      lastModified: isoDate(GUIDE_META.date) ?? SITE_CONTENT_UPDATED,
    })
  }

  return toEntries(items)
}
