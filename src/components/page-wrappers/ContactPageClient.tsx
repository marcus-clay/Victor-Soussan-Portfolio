'use client'

import React, { useState, useCallback } from 'react'
import {
  CalendarBlank,
  Copy,
  Check,
  LinkedinLogo,
  ArrowUpRight,
} from '@phosphor-icons/react'

const EMAIL = 'victorsoussan@gmail.com'

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

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gray-900 leading-[1.08] mb-5">
          {isEn ? "Let's talk" : 'Discutons'}
        </h1>

        <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-[55ch] mb-20">
          {isEn
            ? 'Open to product design missions, team leadership roles, and interesting problems where design makes a measurable difference.'
            : 'Ouvert aux missions de design produit, aux rôles de leadership, et aux problèmes intéressants où le design fait une différence mesurable.'}
        </p>

        {/* What I can help with */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-10 mb-20">
          <h2 className="text-base font-bold text-gray-900 mb-6">
            {isEn ? 'What I can help with' : 'Ce que je peux apporter'}
          </h2>
          <ul className="space-y-4">
            <li className="flex items-baseline gap-3 text-base text-gray-600 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0 mt-2" />
              <span>
                <span className="font-semibold text-gray-900">{isEn ? 'Product Design' : 'Design Produit'}</span>
                {isEn
                  ? ' — UX/UI, design systems, prototyping, from framing to dev handoff'
                  : ' — UX/UI, design systems, prototypage, du cadrage au handoff dev'}
              </span>
            </li>
            <li className="flex items-baseline gap-3 text-base text-gray-600 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0 mt-2" />
              <span>
                <span className="font-semibold text-gray-900">{isEn ? 'Team Leadership' : 'Leadership'}</span>
                {isEn
                  ? ' — hiring, mentoring, design ops, delivery cadence'
                  : ' — recrutement, mentoring, design ops, cadence de livraison'}
              </span>
            </li>
            <li className="flex items-baseline gap-3 text-base text-gray-600 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0 mt-2" />
              <span>
                <span className="font-semibold text-gray-900">{isEn ? 'AI Prototyping' : 'Prototypage IA'}</span>
                {isEn
                  ? ' — Claude Code, Figma MCP, concept to deployed prototype in hours'
                  : ' — Claude Code, Figma MCP, du concept au prototype déployé en quelques heures'}
              </span>
            </li>
          </ul>
        </div>

        {/* Book a call */}
        <div className="mb-20">
          <a
            href="https://calendar.app.google/Zyp3tRyA2M9QByun6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#2D5CF3] text-white font-semibold text-base hover:bg-[#2450d9] shadow-sm hover:shadow-md transition-all"
          >
            <CalendarBlank size={20} weight="bold" />
            {isEn ? 'Book a call' : 'Réserver un appel'}
          </a>
        </div>

        {/* Prefer async */}
        <div className="mb-20">
          <p className="text-sm text-gray-400 mb-3">
            {isEn ? 'Prefer async?' : 'Plutôt par écrit ?'}
          </p>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="text-lg font-medium text-gray-900 hover:text-[#2D5CF3] transition-colors"
            >
              {EMAIL}
            </a>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              title={isEn ? 'Copy email' : 'Copier l\'email'}
            >
              {copied ? (
                <Check size={18} weight="bold" className="text-emerald-500" />
              ) : (
                <Copy size={18} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Connect */}
        <div className="rounded-2xl border border-gray-200 bg-white px-8 py-6">
          <p className="text-sm font-semibold text-gray-900 mb-4">
            {isEn ? 'Connect' : 'Retrouvez-moi'}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://linkedin.com/in/victorsoussan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <LinkedinLogo size={20} />
              LinkedIn
            </a>
            <a
              href="https://www.condamine.studio/apps"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowUpRight size={16} />
              Condamine Apps
            </a>
            <a
              href="tel:+33615989400"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              +33 6 15 98 94 00
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
