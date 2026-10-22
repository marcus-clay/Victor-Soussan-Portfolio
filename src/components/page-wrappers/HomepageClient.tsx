'use client'

import React from 'react'
import type { Language } from '@/data/translations'
import { TRANSLATIONS } from '@/data/translations'
import { SIGNALS, FEATURED_SIGNAL_IDS } from '@/data/signalsData'
import { GUIDE_CHAPTERS } from '@/data/guideClaudeCodeData'
import HeroSection from '@/components/sections/HeroSection'
import ProjectFilmstrip from '@/components/sections/ProjectFilmstrip'
import PositioningSection from '@/components/sections/PositioningSection'
import MethodSection from '@/components/sections/MethodSection'
import FeaturedSection from '@/components/sections/FeaturedSection'
import ContactCTASection from '@/components/sections/ContactCTASection'

interface HomepageClientProps {
  lang: Language
}

/**
 * Homepage: positioning sentence, then the nine case studies as a filmstrip, then the same
 * wide grammar (page margins, hairline-separated blocks) for positioning, method, resources
 * and contact.
 */
export default function HomepageClient({ lang }: HomepageClientProps) {
  const featuredSignals = FEATURED_SIGNAL_IDS.map((id) => SIGNALS.find((s) => s.id === id)).filter(
    Boolean
  ) as typeof SIGNALS

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      <HeroSection lang={lang} />
      <ProjectFilmstrip lang={lang} />
      <PositioningSection lang={lang} />
      <MethodSection lang={lang} />
      <FeaturedSection lang={lang} featuredSignals={featuredSignals} guideChapters={GUIDE_CHAPTERS} />
      <ContactCTASection lang={lang} content={TRANSLATIONS[lang]} />
    </div>
  )
}
