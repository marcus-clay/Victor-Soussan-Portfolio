/**
 * Thin analytics layer. Everything here is a no-op until the visitor has accepted
 * statistics cookies (GA4 and Clarity are only injected after consent). Vercel Web
 * Analytics and Speed Insights are cookieless and run for everyone.
 */

export const GA_MEASUREMENT_ID = 'G-60L2D7P9CB'
export const CLARITY_PROJECT_ID = 'uz9rgl6od9'

export const CONSENT_KEY = 'vs-consent'
export const CONSENT_EVENT = 'vs:consent-change'
export const CONSENT_OPEN_EVENT = 'vs:consent-open'

export type Consent = 'granted' | 'denied' | null

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: (...args: unknown[]) => void
  }
}

export function readConsent(): Consent {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

export function writeConsent(value: Exclude<Consent, null>) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value)
  } catch {
    /* storage can be blocked, the choice then lasts for this page only */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }))
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))
}

type Params = Record<string, string | number | boolean | undefined>

/** Custom event. Silently ignored when analytics is not loaded (no consent, blocker, SSR). */
export function track(name: string, params: Params = {}) {
  if (typeof window === 'undefined') return
  try {
    window.gtag?.('event', name, params)
    window.clarity?.('event', name)
  } catch {
    /* never let analytics break the page */
  }
}

export interface PageContext {
  content_group: 'home' | 'project' | 'article' | 'guide' | 'page'
  content_id?: string
  content_view?: string
}

/** Derive a content group from the URL so reports can be split by section. */
export function pageContext(pathname: string): PageContext {
  const parts = pathname.split('/').filter(Boolean) // [lang, section, id, view]
  const [, section, id, view] = parts
  if (!section) return { content_group: 'home' }
  if (section === 'project') return { content_group: 'project', content_id: id, content_view: view }
  if (section === 'signal') return { content_group: 'article', content_id: id }
  if (section === 'guide') return { content_group: 'guide', content_id: [id, view].filter(Boolean).join('/') }
  return { content_group: 'page', content_id: section }
}
