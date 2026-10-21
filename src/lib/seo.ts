import type { Metadata } from 'next'

/**
 * Single source of truth for SEO: canonical host, metadata builder and JSON-LD builders.
 * Every page goes through buildMetadata() so canonical, hreflang, Open Graph and Twitter
 * stay consistent with the sitemap.
 */

export const SITE_URL = 'https://www.victorsoussan.fr'
export const SITE_NAME = 'Victor Soussan'
export const DEFAULT_OG_IMAGE = {
  url: '/images/og_victor_soussan.jpg',
  width: 1200,
  height: 630,
  alt: 'Victor Soussan, Lead Product Designer',
}

export type Lang = 'en' | 'fr'
export const LANGS: readonly Lang[] = ['en', 'fr']
export const toLang = (value: string | undefined): Lang => (value === 'fr' ? 'fr' : 'en')

export const OG_LOCALE: Record<Lang, string> = { en: 'en_US', fr: 'fr_FR' }
export const HTML_LANG: Record<Lang, string> = { en: 'en', fr: 'fr' }

/** Absolute URL for a path that already contains the language prefix, or any site path. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  return `${SITE_URL}${path === '/' ? '' : path.startsWith('/') ? path : `/${path}`}`
}

/** Path for a page: pagePath is what follows the language prefix ('' for the homepage). */
export function pageUrl(lang: Lang, pagePath = ''): string {
  return pagePath ? `${SITE_URL}/${lang}/${pagePath}` : `${SITE_URL}/${lang}`
}

/** Trim to a sentence-friendly length at a word boundary. */
export function clip(text: string | undefined, max = 158): string {
  if (!text) return ''
  const clean = text
    .replace(/[#*_`>]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (clean.length <= max) return clean
  // Prefer ending on a full sentence: a description cut mid-sentence reads as broken in the results.
  const window = clean.slice(0, max + 1)
  let end = -1
  for (let i = window.length - 1; i >= 80; i--) {
    if ('.!?'.includes(window[i]) && (i === window.length - 1 || window[i + 1] === ' ')) {
      end = i
      break
    }
  }
  if (end >= 0) return clean.slice(0, end + 1)
  const cut = clean.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : cut.length).replace(/[\s,;:.\-]+$/, '')}\u2026`
}

const TITLE_SUFFIX = ` | ${SITE_NAME}`
const TITLE_BUDGET = 62

export interface MetaOptions {
  lang: Lang
  /** Path after the language prefix, '' for the homepage. Used for canonical + og:url. */
  path: string
  /** Same page in the other language when the slug differs (guide chapters). */
  altPaths?: Partial<Record<Lang, string>>
  title: string
  description: string
  /** Skip the " | Victor Soussan" suffix (homepage). */
  absoluteTitle?: boolean
  noindex?: boolean
  image?: { url: string; width?: number; height?: number; alt?: string }
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  section?: string
}

export function buildMetadata(o: MetaOptions): Metadata {
  const { lang } = o
  const other: Lang = lang === 'fr' ? 'en' : 'fr'
  const pathFor = (l: Lang) => o.altPaths?.[l] ?? o.path
  const canonical = pageUrl(lang, pathFor(lang))
  const languages: Record<string, string> = {
    en: pageUrl('en', pathFor('en')),
    fr: pageUrl('fr', pathFor('fr')),
    'x-default': pageUrl('en', pathFor('en')),
  }

  // Keep titles inside the ~60 character budget Google shows: drop the brand suffix when it would overflow.
  const withSuffix = o.title + TITLE_SUFFIX
  const useAbsolute = o.absoluteTitle || withSuffix.length > TITLE_BUDGET
  const title = useAbsolute ? { absolute: o.title.length > 70 ? clip(o.title, 70) : o.title } : o.title
  const fullTitle = useAbsolute ? (typeof title === 'string' ? title : title.absolute) : withSuffix

  const description = clip(o.description, 158)
  const image = o.image ?? DEFAULT_OG_IMAGE

  return {
    title,
    description,
    alternates: { canonical, languages },
    robots: o.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: o.type ?? 'website',
      url: canonical,
      siteName: SITE_NAME,
      locale: OG_LOCALE[lang],
      alternateLocale: [OG_LOCALE[other]],
      title: fullTitle,
      description,
      images: [{ url: image.url, width: image.width, height: image.height, alt: image.alt ?? fullTitle }],
      ...(o.type === 'article'
        ? {
            publishedTime: o.publishedTime,
            modifiedTime: o.modifiedTime ?? o.publishedTime,
            authors: [SITE_NAME],
            section: o.section,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.url],
    },
  }
}

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const LINKEDIN_URL = 'https://www.linkedin.com/in/victorsoussan-product-design'

export function personLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_NAME,
    givenName: 'Victor',
    familyName: 'Soussan',
    jobTitle: 'Lead Product Designer',
    description:
      lang === 'fr'
        ? 'Lead Product Designer avec 15 ans d\u2019exp\u00e9rience, sp\u00e9cialiste du product design B2B et B2G en France. Design systems, interfaces m\u00e9tier complexes, prototypage assist\u00e9 par IA.'
        : 'Lead Product Designer with 15 years of experience, specialist in B2B and B2G product design in France. Design systems, complex business interfaces, AI-assisted prototyping.',
    url: SITE_URL,
    image: `${SITE_URL}/images/victor-soussan.webp`,
    address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' },
    sameAs: [LINKEDIN_URL, 'https://github.com/marcus-clay', 'https://www.condamine.studio'],
    knowsAbout: [
      'Product Design', 'B2B Product Design', 'B2G Product Design', 'UX Research', 'Design Systems',
      'AI-Assisted Design', 'Claude Code', 'Figma', 'SaaS B2B', 'EdTech', 'Public Services',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Lead Product Designer',
      occupationLocation: { '@type': 'Country', name: 'France' },
      skills: 'Product design, design systems, UX research, B2B and B2G interfaces, AI-assisted prototyping',
    },
    knowsLanguage: ['fr', 'en', 'es'],
    alumniOf: { '@type': 'EducationalOrganization', name: 'ISCOM Paris' },
  }
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: 'Victor Soussan Portfolio',
    description: 'Portfolio of Victor Soussan, Lead Product Designer based in Paris.',
    inLanguage: ['fr-FR', 'en'],
    publisher: { '@id': PERSON_ID },
    author: { '@id': PERSON_ID },
  }
}

export interface Crumb {
  name: string
  /** Path after the language prefix; omit for the current page's own URL handled by caller. */
  path: string
}

export function breadcrumbLd(lang: Lang, crumbs: Crumb[]) {
  const home = lang === 'fr' ? 'Accueil' : 'Home'
  const items = [{ name: home, path: '' }, ...crumbs]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: pageUrl(lang, c.path),
    })),
  }
}

export interface WebPageLdOptions {
  lang: Lang
  path: string
  name: string
  description: string
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'ProfilePage'
  image?: string
  datePublished?: string
  dateModified?: string
  mainEntity?: Record<string, unknown>
}

export function webPageLd(o: WebPageLdOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': o.type ?? 'WebPage',
    '@id': `${pageUrl(o.lang, o.path)}#webpage`,
    url: pageUrl(o.lang, o.path),
    name: o.name,
    description: o.description,
    inLanguage: o.lang === 'fr' ? 'fr-FR' : 'en',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': PERSON_ID },
    ...(o.image ? { primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(o.image) } } : {}),
    ...(o.datePublished ? { datePublished: o.datePublished } : {}),
    ...(o.dateModified ? { dateModified: o.dateModified } : {}),
    ...(o.mainEntity ? { mainEntity: o.mainEntity } : {}),
  }
}

export interface ArticleLdOptions {
  lang: Lang
  path: string
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  image?: string
  section?: string
  type?: 'Article' | 'TechArticle'
  wordCount?: number
  keywords?: string[]
}

export function articleLd(o: ArticleLdOptions) {
  const url = pageUrl(o.lang, o.path)
  return {
    '@context': 'https://schema.org',
    '@type': o.type ?? 'Article',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    headline: clip(o.headline, 110),
    description: o.description,
    inLanguage: o.lang === 'fr' ? 'fr-FR' : 'en',
    datePublished: o.datePublished,
    dateModified: o.dateModified ?? o.datePublished,
    image: [absoluteUrl(o.image ?? DEFAULT_OG_IMAGE.url)],
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
    ...(o.section ? { articleSection: o.section } : {}),
    ...(o.wordCount ? { wordCount: o.wordCount } : {}),
    ...(o.keywords?.length ? { keywords: o.keywords.join(', ') } : {}),
  }
}

export function creativeWorkLd(o: {
  lang: Lang
  path: string
  name: string
  description: string
  image?: string
  datePublished?: string
  genre?: string
}) {
  const url = pageUrl(o.lang, o.path)
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${url}#work`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    name: o.name,
    description: o.description,
    inLanguage: o.lang === 'fr' ? 'fr-FR' : 'en',
    creator: { '@id': PERSON_ID },
    author: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
    ...(o.image ? { image: absoluteUrl(o.image) } : {}),
    ...(o.datePublished ? { datePublished: o.datePublished } : {}),
    ...(o.genre ? { genre: o.genre } : {}),
  }
}

export function itemListLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: it.url,
    })),
  }
}

/** Normalise 'YYYY-MM' or 'YYYY' to an ISO date accepted by schema.org. */
export function isoDate(value: string | undefined): string | undefined {
  if (!value) return undefined
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10)
  if (/^\d{4}-\d{2}$/.test(value)) return `${value}-01`
  if (/^\d{4}$/.test(value)) return `${value}-01-01`
  return undefined
}

/** WebPage + BreadcrumbList for a standard page. crumbs excludes the home entry, which is added automatically. */
export function pageLd(o: WebPageLdOptions & { crumbs?: Crumb[] }) {
  const { crumbs, ...page } = o
  return [webPageLd(page), ...(crumbs?.length ? [breadcrumbLd(o.lang, crumbs)] : [])]
}
