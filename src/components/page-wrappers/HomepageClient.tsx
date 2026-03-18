'use client'

import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Language } from '@/data/translations'
import { TRANSLATIONS } from '@/data/translations'
import { getProjects } from '@/data/projectsData'
import { getTestimonials } from '@/data/testimonialsData'
import { getFeaturedContent } from '@/data/contentData'
import { SIGNALS, FEATURED_SIGNAL_IDS } from '@/data/signalsData'
import { GUIDE_CHAPTERS } from '@/data/guideClaudeCodeData'
import Avatar from '@/components/Avatar'
import ScrollExpandCard from '@/components/ScrollExpandCard'
import HeroSection from '@/components/sections/HeroSection'
import FeaturedSection from '@/components/sections/FeaturedSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import GalleryPreviewSection from '@/components/sections/GalleryPreviewSection'
import ExpertisePreviewSection from '@/components/sections/ExpertisePreviewSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactCTASection from '@/components/sections/ContactCTASection'

interface HomepageClientProps {
  lang: Language
}

export default function HomepageClient({ lang }: HomepageClientProps) {
  const router = useRouter()
  // Cast needed: TRANSLATIONS uses `as const` (readonly), sections expect mutable arrays
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content = JSON.parse(JSON.stringify(TRANSLATIONS[lang])) as any
  const projects = getProjects(lang)
  const testimonials = getTestimonials(lang)
  const featuredSignals = FEATURED_SIGNAL_IDS.map(id => SIGNALS.find(s => s.id === id)).filter(Boolean) as typeof SIGNALS

  const navigate = useCallback((path: string) => {
    router.push(`/${lang}${path}`)
  }, [router, lang])

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const openProjectWithUrl = useCallback((
    projectId: 'toolkit' | 'dailymotion' | 'connect' | 'sqool' | 'sqool-classe' | 'france-vae' | 'pagesjaunes' | 'androidwear',
    viewMode: 'caseStudy' | 'gallery' | 'executive'
  ) => {
    const viewMap = {
      caseStudy: 'full',
      gallery: 'gallery',
      executive: 'summary',
    }
    router.push(`/${lang}/project/${projectId}/${viewMap[viewMode]}`)
  }, [router, lang])

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <HeroSection
        systemTheme="light"
        lang={lang}
        content={content}
        Avatar={Avatar}
        scrollToSection={scrollToSection}
        openModalWithUrl={navigate}
      />

      <FeaturedSection
        lang={lang}
        featuredSignals={featuredSignals}
        guideChapters={GUIDE_CHAPTERS}
        onNavigate={navigate}
      />

      <ProjectsSection
        systemTheme="light"
        lang={lang}
        content={content}
        projects={projects}
        ScrollExpandCard={ScrollExpandCard}
        openProjectWithUrl={openProjectWithUrl}
        openModalWithUrl={navigate}
        setIframeModalUrl={() => {}}
      />

      <GalleryPreviewSection
        lang={lang}
        content={content}
        onNavigate={navigate}
      />

      <ExpertisePreviewSection
        lang={lang}
        content={content}
        onNavigate={navigate}
      />

      <TestimonialsSection
        systemTheme="light"
        lang={lang}
        content={content}
        testimonials={testimonials}
        Avatar={Avatar}
        openModalWithUrl={navigate}
      />

      <ContactCTASection
        lang={lang}
        content={content}
      />
    </div>
  )
}
