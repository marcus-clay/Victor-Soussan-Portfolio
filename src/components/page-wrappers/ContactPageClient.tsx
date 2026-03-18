'use client'

import React, { useState, useCallback } from 'react'
import {
  EnvelopeSimple,
  Phone,
  LinkedinLogo,
  MapPin,
  Copy,
  Check,
  CalendarBlank,
  ArrowUpRight,
} from '@phosphor-icons/react'

const EMAIL = 'victorsoussan@gmail.com'

const CONTACT_ITEMS = [
  { id: 'email', href: `mailto:${EMAIL}`, icon: EnvelopeSimple, copyable: true },
  { id: 'phone', href: 'tel:+33615989400', icon: Phone },
  { id: 'linkedin', href: 'https://linkedin.com/in/victorsoussan', icon: LinkedinLogo, external: true },
  { id: 'location', icon: MapPin },
]

const LABELS: Record<string, { en: string; fr: string }> = {
  email: { en: 'Email', fr: 'Email' },
  phone: { en: 'Phone', fr: 'Téléphone' },
  linkedin: { en: 'LinkedIn', fr: 'LinkedIn' },
  location: { en: 'Location', fr: 'Localisation' },
}

const VALUES: Record<string, string> = {
  email: EMAIL,
  phone: '+33 6 15 98 94 00',
  linkedin: 'linkedin.com/in/victorsoussan',
  location: 'Paris, France',
}

export default function ContactPageClient({ lang }: { lang: 'en' | 'fr' }) {
  const [copied, setCopied] = useState(false)
  const isEn = lang === 'en'

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-[900px] mx-auto px-6 pt-20 pb-28">
        {/* Header */}
        <div className="mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gray-900 leading-[1.08]">
            {isEn ? "Let's work together" : 'Travaillons ensemble'}
          </h1>
          <p className="mt-5 text-lg md:text-xl text-gray-500 leading-relaxed max-w-[50ch]">
            {isEn
              ? 'I reply within 24 hours. A 30-minute call is enough to frame the need.'
              : 'Je réponds sous 24h. Un premier échange de 30 minutes suffit pour cadrer le besoin.'}
          </p>
        </div>

        {/* Contact items — clean list, no heavy cards */}
        <div className="mb-20">
          {CONTACT_ITEMS.map((item, idx) => {
            const Icon = item.icon
            const label = LABELS[item.id][lang]
            const value = VALUES[item.id]
            const isLast = idx === CONTACT_ITEMS.length - 1

            const row = (
              <div className={`group flex items-center gap-5 py-6 ${!isLast ? 'border-b border-gray-100' : ''}`}>
                <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200/80 transition-colors">
                  <Icon size={20} className="text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">
                    {label}
                  </p>
                  <p className="text-lg font-medium text-gray-900 truncate">{value}</p>
                </div>
                {item.copyable && (
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleCopy()
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors flex-shrink-0 cursor-pointer"
                    title={isEn ? 'Copy email' : 'Copier l\'email'}
                  >
                    {copied ? (
                      <>
                        <Check size={14} weight="bold" className="text-emerald-500" />
                        <span className="text-emerald-600">{isEn ? 'Copied' : 'Copié'}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>{isEn ? 'Copy' : 'Copier'}</span>
                      </>
                    )}
                  </button>
                )}
                {item.href && !item.copyable && (
                  <ArrowUpRight size={18} className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                )}
              </div>
            )

            if (!item.href) {
              return <div key={item.id}>{row}</div>
            }

            return (
              <a
                key={item.id}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                {row}
              </a>
            )
          })}
        </div>

        {/* Book a call — centered, generous space */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 mb-6">
            <CalendarBlank size={26} className="text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-gray-900 mb-3">
            {isEn ? "Let's discuss your project" : 'Discutons de votre projet'}
          </h2>
          <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-[45ch] mx-auto">
            {isEn
              ? "30 minutes, no strings attached. We frame the need, I assess if I can help."
              : "30 minutes, sans engagement. On cadre le besoin, j'estime si je peux aider."}
          </p>
          <a
            href="https://calendar.app.google/Zyp3tRyA2M9QByun6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#2D5CF3] text-white font-medium hover:bg-[#2450d9] shadow-sm hover:shadow-md transition-all"
          >
            <CalendarBlank size={18} weight="bold" />
            {isEn ? 'Book 30 min' : 'Réserver 30 min'}
          </a>
          <p className="mt-4 text-xs text-gray-400">
            {isEn ? 'Free, no commitment' : 'Gratuit, sans engagement'}
          </p>
        </div>
      </div>
    </div>
  )
}
