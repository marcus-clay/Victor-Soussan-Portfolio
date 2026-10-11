'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import {
  CLARITY_PROJECT_ID,
  CONSENT_EVENT,
  GA_MEASUREMENT_ID,
  pageContext,
  readConsent,
  track,
  type Consent,
} from '@/lib/analytics'
import ConsentBanner from './ConsentBanner'

const SCROLL_STEPS = [25, 50, 75, 100]

/** Open an inline script safely: gtag stub, consent defaults, config without automatic page_view. */
const GA_INIT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
`

const CLARITY_INIT = `
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
`

export default function Analytics() {
  const pathname = usePathname()
  const [consent, setConsent] = useState<Consent>(null)
  const [ready, setReady] = useState(false)
  const lastPath = useRef<string | null>(null)

  // Read the stored choice after mount (keeps server and client markup identical).
  useEffect(() => {
    setConsent(readConsent())
    setReady(true)
    const onChange = (e: Event) => setConsent((e as CustomEvent<Consent>).detail ?? readConsent())
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [])

  const enabled = consent === 'granted'

  // Page views on first load and on every client-side navigation.
  useEffect(() => {
    if (!enabled || !pathname) return
    const previous = lastPath.current
    lastPath.current = pathname
    // Wait for gtag (injected after hydration) and a tick so document.title reflects the new route.
    const href = window.location.href
    let tries = 0
    const send = () => {
      if (!window.gtag) {
        if (tries++ < 80) window.setTimeout(send, 100)
        return
      }
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_location: href,
        page_title: document.title,
        language: document.documentElement.lang,
        ...pageContext(pathname),
      })
      if (previous) {
        const [prevLang, ...prevRest] = previous.split('/').filter(Boolean)
        const [lang, ...rest] = pathname.split('/').filter(Boolean)
        if (prevLang !== lang && prevRest.join('/') === rest.join('/')) {
          track('language_switch', { from: prevLang, to: lang })
        }
      }
    }
    // Not cancelled on route change: a page view that is still waiting for gtag must not be lost.
    window.setTimeout(send, 0)
  }, [enabled, pathname])

  // Scroll depth milestones, reset on each page.
  useEffect(() => {
    if (!enabled) return
    const fired = new Set<number>()
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const total = document.documentElement.scrollHeight - window.innerHeight
        if (total <= 0) return
        const pct = Math.min(100, Math.round((window.scrollY / total) * 100))
        for (const step of SCROLL_STEPS) {
          if (pct >= step && !fired.has(step)) {
            fired.add(step)
            track('scroll_depth', { percent: step, page_path: pathname })
          }
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [enabled, pathname])

  // Delegated link tracking: contact, downloads, outbound.
  useEffect(() => {
    if (!enabled) return
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href') || ''
      if (href.startsWith('mailto:')) return track('contact_click', { method: 'email', page_path: pathname })
      if (href.startsWith('tel:')) return track('contact_click', { method: 'phone', page_path: pathname })
      if (/\.pdf($|\?)/i.test(href)) return track('file_download', { file_url: href, page_path: pathname })
      if (/^https?:\/\//i.test(href)) {
        let url: URL
        try { url = new URL(href) } catch { return }
        if (url.host === window.location.host || url.host === 'www.victorsoussan.fr') return
        if (/linkedin\.com/.test(url.host)) return track('contact_click', { method: 'linkedin', link_url: href, page_path: pathname })
        if (/calendar\.app\.google|calendly\.com/.test(url.host)) return track('contact_click', { method: 'booking', link_url: href, page_path: pathname })
        track('outbound_click', { link_url: href, link_domain: url.host, page_path: pathname })
      }
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [enabled, pathname])

  return (
    <>
      {/* Cookieless, runs for every visitor. Needs "Web Analytics" and "Speed Insights" enabled on the Vercel project. */}
      <VercelAnalytics />
      <SpeedInsights />

      {enabled && (
        <>
          <Script id="ga4-src" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: GA_INIT }} />
          <Script id="clarity-init" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: CLARITY_INIT }} />
        </>
      )}

      {ready && <ConsentBanner choice={consent} />}
    </>
  )
}
