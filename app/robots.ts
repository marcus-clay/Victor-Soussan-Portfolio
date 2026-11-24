import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

/**
 * Answer engines named one by one: '*' already lets them in, but an explicit group keeps the intent
 * visible if a disallow is added later. Search crawlers (OAI-SearchBot, Claude-SearchBot, PerplexityBot)
 * decide whether the site can be cited in answers; training crawlers (GPTBot, ClaudeBot, Google-Extended)
 * feed what the models know without searching.
 */
const AI_AGENTS = [
  'OAI-SearchBot', 'ChatGPT-User', 'GPTBot',
  'Claude-SearchBot', 'Claude-User', 'ClaudeBot',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    // /_next/ must stay crawlable: Google needs the JS and CSS bundles to render pages.
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      { userAgent: AI_AGENTS, allow: '/', disallow: ['/api/'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
