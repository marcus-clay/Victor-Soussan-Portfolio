'use client'

import React, { useState } from 'react'

function ArrowDiag() {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

interface BulleDemoSectionProps {
  lang: 'en' | 'fr'
  onNavigate: (path: string) => void
}

export default function BulleDemoSection({ lang, onNavigate }: BulleDemoSectionProps) {
  const isEn = lang === 'en'
  const [hovered, setHovered] = useState(false)

  return (
    <section className="pb-24 md:pb-40 px-6">
      <div className="max-w-[692px] mx-auto">

        {/* Category label */}
        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-[0.08em] mb-5">
          {isEn ? 'Interaction design' : 'Design d\u2019interaction'}
        </p>

        {/* Video card — dark bg matches the app UI, motion is the content */}
        <button
          onClick={() => onNavigate('/project/connect/summary')}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-full text-left rounded-2xl overflow-hidden block"
          aria-label={isEn ? 'View Connect case study' : 'Voir l\u2019étude de cas Connect'}
          style={{
            background: '#111113',
            transform: hovered ? 'scale(1.005)' : 'scale(1)',
            boxShadow: hovered
              ? '0 20px 60px -12px rgba(0,0,0,0.22)'
              : '0 4px 24px -4px rgba(0,0,0,0.10)',
            transition: 'transform 360ms cubic-bezier(0.23,1,0.32,1), box-shadow 360ms cubic-bezier(0.23,1,0.32,1)',
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-auto block"
            src="/videos/connect/Video-demo-bulle-interactions-02-compressed.mp4"
          />
        </button>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {isEn ? 'Connect — Messaging interface' : 'Connect — Interface de messagerie'}
          </p>
          <button
            onClick={() => onNavigate('/project/connect/summary')}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors duration-150"
          >
            {isEn ? 'View case study' : 'Voir l\u2019étude de cas'}
            <ArrowDiag />
          </button>
        </div>

      </div>
    </section>
  )
}
