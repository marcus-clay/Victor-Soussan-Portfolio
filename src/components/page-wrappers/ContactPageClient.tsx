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
  {
    id: 'email',
    href: `mailto:${EMAIL}`,
    icon: EnvelopeSimple,
    color: 'bg-blue-50 text-blue-600',
    copyable: true,
  },
  {
    id: 'phone',
    href: 'tel:+33615989400',
    icon: Phone,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 'linkedin',
    href: 'https://linkedin.com/in/victorsoussan',
    icon: LinkedinLogo,
    color: 'bg-sky-50 text-sky-600',
    external: true,
  },
  {
    id: 'location',
    icon: MapPin,
    color: 'bg-orange-50 text-orange-600',
  },
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
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-20">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gray-900 leading-[1.08]">
            Contact
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-500 leading-relaxed max-w-[55ch]">
            {isEn
              ? 'Available for product design consulting, lead roles, and strategic engagements.'
              : 'Disponible pour des missions de consulting en product design, des rôles de lead, et des engagements stratégiques.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left column: Contact cards */}
          <div className="lg:col-span-3 space-y-4">
            {CONTACT_ITEMS.map((item) => {
              const Icon = item.icon
              const label = LABELS[item.id][lang]
              const value = VALUES[item.id]

              const inner = (
                <div className="group flex items-center gap-5 p-5 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <Icon size={22} weight="regular" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">
                      {label}
                    </p>
                    <p className="text-base font-medium text-gray-900 truncate">{value}</p>
                  </div>
                  {item.copyable && (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleCopy()
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors flex-shrink-0"
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
                return <div key={item.id}>{inner}</div>
              }

              return (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                >
                  {inner}
                </a>
              )
            })}
          </div>

          {/* Right column: Book a call CTA */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white border border-gray-100 p-8 sticky top-24">
              <div className="w-14 h-14 rounded-2xl bg-[#2D5CF3]/10 flex items-center justify-center mb-6">
                <CalendarBlank size={28} className="text-[#2D5CF3]" />
              </div>
              <h2 className="text-xl font-bold tracking-[-0.02em] text-gray-900 mb-3">
                {isEn ? 'Book a call' : 'Planifier un appel'}
              </h2>
              <p className="text-base text-gray-500 leading-relaxed mb-6">
                {isEn
                  ? '30 minutes to discuss your project, your challenges, and how I can help.'
                  : '30 minutes pour discuter de votre projet, de vos enjeux, et de comment je peux vous aider.'}
              </p>
              <a
                href="https://calendar.app.google/Zyp3tRyA2M9QByun6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#2D5CF3] text-white font-medium shadow-sm hover:bg-[#2450d9] hover:shadow-md transition-all"
              >
                <CalendarBlank size={18} weight="bold" />
                {isEn ? 'Book a 30-min call' : 'Réserver un créneau'}
              </a>
              <p className="mt-4 text-xs text-gray-400 text-center">
                {isEn ? 'Free, no commitment' : 'Gratuit, sans engagement'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
