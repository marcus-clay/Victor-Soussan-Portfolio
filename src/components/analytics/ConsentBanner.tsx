'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { CONSENT_OPEN_EVENT, writeConsent, type Consent } from '@/lib/analytics'

const COPY = {
  fr: {
    title: 'Statistiques de visite',
    body: 'J’utilise Google Analytics et Microsoft Clarity pour comprendre quelles pages sont lues et améliorer le site. Aucun cookie n’est déposé sans votre accord.',
    accept: 'Accepter',
    refuse: 'Refuser',
  },
  en: {
    title: 'Visit statistics',
    body: 'I use Google Analytics and Microsoft Clarity to understand which pages get read and to improve the site. No cookie is set without your consent.',
    accept: 'Accept',
    refuse: 'Decline',
  },
} as const

/**
 * Consent banner. Both answers carry the same weight (CNIL requirement) and the choice can be
 * reopened from the footer. Rendered only after mount, fixed position, so it never shifts layout.
 */
export default function ConsentBanner({ choice }: { choice: Consent }) {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const [open, setOpen] = useState(choice === null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    setOpen(choice === null)
  }, [choice])

  useEffect(() => {
    const reopen = () => setOpen(true)
    window.addEventListener(CONSENT_OPEN_EVENT, reopen)
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen)
  }, [])

  // Let the page paint first, then slide the banner in.
  useEffect(() => {
    if (!open) { setShown(false); return }
    const id = window.setTimeout(() => setShown(true), 1200)
    return () => window.clearTimeout(id)
  }, [open])

  if (!open) return null

  const answer = (value: 'granted' | 'denied') => {
    writeConsent(value)
    setShown(false)
    setOpen(false)
  }

  const button =
    'flex-1 h-10 px-4 rounded-full text-sm font-medium inline-flex items-center justify-center transition-[background-color,border-color,transform] duration-150 active:scale-[0.97]'

  return (
    <div
      role="dialog"
      aria-label={t.title}
      aria-live="polite"
      className="fixed z-[70] bottom-4 left-4 right-4 sm:right-auto sm:bottom-5 sm:left-5 sm:w-[380px]"
      style={{
        transform: shown ? 'translateY(0)' : 'translateY(24px)',
        opacity: shown ? 1 : 0,
        transition: 'transform 500ms cubic-bezier(0.23, 1, 0.32, 1), opacity 350ms ease',
        pointerEvents: shown ? 'auto' : 'none',
      }}
    >
      <div
        className="rounded-2xl p-4 bg-white/95 border border-gray-100 shadow-lg"
        style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}
      >
        <p className="text-sm font-semibold text-gray-900 mb-1">{t.title}</p>
        <p className="text-xs text-gray-600 mb-4">{t.body}</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => answer('denied')} className={`${button} bg-white text-gray-900 border border-gray-200 hover:bg-gray-100`}>
            {t.refuse}
          </button>
          <button type="button" onClick={() => answer('granted')} className={`${button} bg-white text-gray-900 border border-gray-200 hover:bg-gray-100`}>
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
