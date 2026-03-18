'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Language } from '@/data/translations'
import { TRANSLATIONS } from '@/data/translations'
import { getProjects } from '@/data/projectsData'
import { getResources } from '@/data/resourcesData'
import { getTestimonials } from '@/data/testimonialsData'
import { LAB_PREVIEWS } from '@/data/labData'
import Avatar from '@/components/Avatar'
import ScrollExpandCard from '@/components/ScrollExpandCard'
import HeroSection from '@/components/sections/HeroSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import BiographySection from '@/components/sections/BiographySection'
import ServicesSection from '@/components/sections/ServicesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import LabSection from '@/components/sections/LabSection'

interface HomepageClientProps {
  lang: Language
}

export default function HomepageClient({ lang }: HomepageClientProps) {
  const router = useRouter()
  // Cast needed: TRANSLATIONS uses `as const` (readonly), sections expect mutable arrays
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content = JSON.parse(JSON.stringify(TRANSLATIONS[lang])) as any
  const projects = getProjects(lang)
  const resources = getResources(lang)
  const testimonials = getTestimonials(lang)
  const [expandedService, setExpandedService] = useState<string | null>(null)

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

      <BiographySection
        systemTheme="light"
        lang={lang}
        content={content}
        resources={resources}
        Avatar={Avatar}
        openModalWithUrl={navigate}
      />

      <ServicesSection
        systemTheme="light"
        lang={lang}
        content={content}
        expandedService={expandedService}
        setExpandedService={setExpandedService}
      />

      <LabSection
        systemTheme="light"
        lang={lang}
        content={content}
        labPreviews={LAB_PREVIEWS}
      />

      <TestimonialsSection
        systemTheme="light"
        lang={lang}
        content={content}
        testimonials={testimonials}
        Avatar={Avatar}
        openModalWithUrl={navigate}
      />
    </div>
  )
}
