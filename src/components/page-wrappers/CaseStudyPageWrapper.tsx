'use client'

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CaretRight } from '@phosphor-icons/react'
import { getProjects, type Project } from '@/data/projectsData'
import ShortProjectView from '@/components/ShortProjectView'
import AuthorContactCard from '@/components/AuthorContactCard'
import CaseStudyTOCBar from '@/components/CaseStudyTOCBar'
import RelatedContent from '@/components/RelatedContent'
import { relatedProjects } from '@/lib/relatedProjects'
import { TRANSLATIONS } from '@/data/translations'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { scrollToElement } from '@/utils/smoothScroll'

type ProjectId = 'toolkit' | 'dailymotion' | 'connect' | 'sqool' | 'sqool-classe' | 'france-vae' | 'pagesjaunes' | 'androidwear' | 'riskos'

// Dark theme disabled: all projects render light
const DARK_PROJECTS: string[] = []

// TOC sections per project
type TOCSections = { id: string; label_en: string; label_fr: string }[]

// Case study TOC (the canonical page is always the full view)
const FULL_TOC: Record<string, TOCSections> = {
  toolkit: [
    { id: 'top', label_en: "Intro", label_fr: "Intro" },
    { id: 'summary', label_en: "Summary", label_fr: "Synthèse" },
    { id: 'context', label_en: "Context and approach", label_fr: "Contexte et approche" },
    { id: 'phases', label_en: "Three phases", label_fr: "Trois phases" },
    { id: 'design-system', label_en: "Design system", label_fr: "Design system" },
    { id: 'impact', label_en: "Impact", label_fr: "Impact" },
  ],
  connect: [
    { id: 'top', label_en: "Intro", label_fr: "Intro" },
    { id: 'summary', label_en: "Summary", label_fr: "Synthèse" },
    { id: 'dashboard', label_en: "The dashboard", label_fr: "Le tableau de bord" },
    { id: 'bulle', label_en: "La Bulle", label_fr: "La Bulle" },
  ],
  dailymotion: [
    { id: 'top', label_en: "Intro", label_fr: "Intro" },
    { id: 'summary', label_en: "Summary", label_fr: "Synthèse" },
    { id: 'approach', label_en: "Three workflows", label_fr: "Trois flux" },
    { id: 'design-system', label_en: "Design system", label_fr: "Design system" },
    { id: 'results', label_en: "Results", label_fr: "Résultats" },
  ],
  sqool: [
    { id: 'top', label_en: "Intro", label_fr: "Intro" },
    { id: 'summary', label_en: "Summary", label_fr: "Synthèse" },
    { id: 'approach', label_en: "Approach", label_fr: "Démarche" },
    { id: 'product', label_en: "Product", label_fr: "Produit" },
    { id: 'learnings', label_en: "Learnings", label_fr: "Enseignements" },
  ],
  'sqool-classe': [
    { id: 'top', label_en: "Intro", label_fr: "Intro" },
    { id: 'summary', label_en: "Summary", label_fr: "Synthèse" },
    { id: 'approach', label_en: "Approach", label_fr: "Démarche" },
    { id: 'product', label_en: "Product", label_fr: "Produit" },
    { id: 'results', label_en: "Results", label_fr: "Résultats" },
  ],
  'france-vae': [
    { id: 'top', label_en: "Intro", label_fr: "Intro" },
    { id: 'summary', label_en: "Summary", label_fr: "Synthèse" },
    { id: 'approach', label_en: "Approach", label_fr: "Démarche" },
    { id: 'product', label_en: "Product", label_fr: "Produit" },
    { id: 'learnings', label_en: "Learnings", label_fr: "Enseignements" },
  ],
  pagesjaunes: [
    { id: 'top', label_en: "Intro", label_fr: "Intro" },
    { id: 'summary', label_en: "Summary", label_fr: "Synthèse" },
    { id: 'approach', label_en: "Approach", label_fr: "Approche" },
    { id: 'product', label_en: "Product", label_fr: "Produit" },
    { id: 'results', label_en: "Results and learnings", label_fr: "Résultats et apprentissages" },
  ],
  androidwear: [
    { id: 'top', label_en: "Intro", label_fr: "Intro" },
    { id: 'summary', label_en: "Summary", label_fr: "Synthèse" },
    { id: 'context', label_en: "Context", label_fr: "Contexte" },
    { id: 'approach', label_en: "Approach", label_fr: "Approche" },
    { id: 'product', label_en: "Product", label_fr: "Produit" },
    { id: 'results', label_en: "Results and learnings", label_fr: "Résultats et apprentissages" },
  ],
  riskos: [
    { id: 'top', label_en: "Intro", label_fr: "Intro" },
    { id: 'summary', label_en: "Summary", label_fr: "Synthèse" },
    { id: 'context', label_en: "Context", label_fr: "Contexte" },
    { id: 'approach', label_en: "Approach", label_fr: "Approche" },
    { id: 'product', label_en: "Product", label_fr: "Produit" },
    { id: 'learnings', label_en: "Observations", label_fr: "Observations" },
  ],
}


const loadingSpinner = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
  </div>
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CASE_STUDY_COMPONENTS: Record<ProjectId, React.ComponentType<any>> = {
  toolkit: dynamic(() => import('@/views/case-studies/ToolkitPage'), { loading: loadingSpinner }),
  dailymotion: dynamic(() => import('@/views/case-studies/DailymotionPage'), { loading: loadingSpinner }),
  connect: dynamic(() => import('@/views/case-studies/ConnectPage'), { loading: loadingSpinner }),
  sqool: dynamic(() => import('@/views/case-studies/SqoolPage'), { loading: loadingSpinner }),
  'sqool-classe': dynamic(() => import('@/views/case-studies/SqoolClassePage'), { loading: loadingSpinner }),
  'france-vae': dynamic(() => import('@/views/case-studies/FranceVaePage'), { loading: loadingSpinner }),
  pagesjaunes: dynamic(() => import('@/views/case-studies/PagesJaunesPage'), { loading: loadingSpinner }),
  androidwear: dynamic(() => import('@/views/case-studies/AndroidWearPage'), { loading: loadingSpinner }),
  riskos: dynamic(() => import('@/views/case-studies/RiskOSPage'), { loading: loadingSpinner }),
}

const VIEW_LABELS: Record<string, Record<string, string>> = {
  gallery: { en: 'Gallery', fr: 'Galerie' },
}

export default function CaseStudyPageWrapper({
  lang,
  projectId,
  view,
}: {
  lang: 'en' | 'fr'
  projectId: string
  view: string
}) {
  const router = useRouter()
  const isScrollingDown = useScrollDirection(5)

  // Check if this is a short-format project
  const allProjects = getProjects(lang)
  const project = allProjects.find((p) => p.id === projectId)

  const isShort = project?.format === 'short'
  const CaseStudyComponent = !isShort ? CASE_STUDY_COMPONENTS[projectId as ProjectId] : null

  const projectName = project?.title || projectId
  const viewLabel = VIEW_LABELS[view]?.[lang]

  // Map URL view to internal viewMode for backward compatibility
  const viewMode = view === 'full' ? 'caseStudy' : view === 'gallery' ? 'gallery' : 'executive'

  // TOC: pick the right sections based on view
  const tocSource = view === 'full' ? FULL_TOC[projectId] : null
  const tocItems = useMemo(() => {
    if (!tocSource) return []
    return tocSource.map(s => ({ id: s.id, label: lang === 'fr' ? s.label_fr : s.label_en }))
  }, [tocSource, lang])

  const firstSectionId = tocItems[0]?.id || 'hero'
  const [activeSection, setActiveSection] = useState(firstSectionId)
  const [showTOC, setShowTOC] = useState(false)

  // Track scroll for TOC active section
  useEffect(() => {
    if (tocItems.length === 0) return
    const topId = tocItems[0]?.id
    const handleScroll = () => {
      const scrollY = window.scrollY
      setShowTOC(scrollY > 300)

      if (scrollY < 100) {
        setActiveSection(topId)
        return
      }
      const sectionEls = tocItems
        .filter(s => s.id !== topId)
        .map(s => ({ id: s.id, el: document.getElementById(s.id) }))
        .filter(s => s.el)

      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const rect = sectionEls[i].el!.getBoundingClientRect()
        if (rect.top <= 200) {
          setActiveSection(sectionEls[i].id)
          return
        }
      }
      setActiveSection(topId)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tocItems])

  const scrollToSection = scrollToElement

  // Early return stays below every hook so the hook order never changes between renders
  if (!isShort && !CaseStudyComponent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Project not found</p>
      </div>
    )
  }

  const hasTOC = tocItems.length > 0
  // Show swap only when TOC is available and user has scrolled past hero
  const shouldSwap = hasTOC && showTOC && isScrollingDown

  return (
    <>
      {/* Nav title override: Nav.tsx reads [data-nav-title] before falling back to h1 */}
      <span data-nav-title className="sr-only">{project?.navTitle ?? projectName}</span>

      {/* Sticky sub-bar: swaps between breadcrumb and TOC */}
      <div
        className="sticky z-10 backdrop-blur-xl bg-[#FDFDFC]/80"
        style={{ top: 'var(--nav-height, 64px)', transition: 'top 250ms cubic-bezier(0.23, 1, 0.32, 1)' }}
      >
        {/* Breadcrumb (clipped container for swap animation) */}
        <div className="relative h-10 overflow-hidden">
          <div
            className="absolute inset-0 flex items-center"
            style={{
              transform: shouldSwap ? 'translateY(-100%)' : 'translateY(0)',
              opacity: shouldSwap ? 0 : 1,
              transition: shouldSwap
                ? 'transform 200ms cubic-bezier(0.23, 1, 0.32, 1), opacity 150ms ease'
                : 'transform 280ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms ease 80ms',
            }}
          >
            <div className="wrap h-10 flex items-center">
              <nav aria-label={lang === 'fr' ? 'Fil d\'Ariane' : 'Breadcrumb'} className="flex items-center gap-1.5 text-xs min-w-0 overflow-hidden h-10">
                <Link
                  href={`/${lang}/projets`}
                  className="text-gray-500 hover:text-gray-900 transition-colors hover:underline flex-shrink-0 inline-flex items-center h-10"
                >
                  {lang === 'fr' ? 'Projets' : 'Projects'}
                </Link>
                <CaretRight size={10} className="flex-shrink-0 text-gray-300" />
                {viewLabel ? (
                  <>
                    <Link
                      href={`/${lang}/project/${projectId}`}
                      className="text-gray-500 hover:text-gray-900 transition-colors hover:underline flex-shrink-0 inline-flex items-center h-10"
                    >
                      {projectName}
                    </Link>
                    <CaretRight size={10} className="flex-shrink-0 text-gray-300" />
                    <span aria-current="page" className="truncate font-medium text-gray-900">
                      {viewLabel}
                    </span>
                  </>
                ) : (
                  <span aria-current="page" className="truncate font-medium text-gray-900">
                    {projectName}
                  </span>
                )}
              </nav>
            </div>
          </div>

          {/* TOC bar (slides up from below, stays in clipped area) */}
          {hasTOC && (
            <div
              className="absolute inset-0"
              style={{
                transform: shouldSwap ? 'translateY(0)' : 'translateY(100%)',
                opacity: shouldSwap ? 1 : 0,
                transition: shouldSwap
                  ? 'transform 280ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms ease 60ms'
                  : 'transform 200ms cubic-bezier(0.23, 1, 0.32, 1), opacity 150ms ease',
              }}
            >
              <CaseStudyTOCBar
                sections={tocItems}
                activeSection={activeSection}
                onSectionClick={scrollToSection}
                isDark={false}
                lang={lang}
              />
            </div>
          )}
        </div>
      </div>

      {/* Content: short project or case study */}
      {isShort && project ? (
        <ShortProjectView project={project} lang={lang} />
      ) : CaseStudyComponent ? (
        <CaseStudyComponent
          systemTheme="light"
          lang={lang}
          viewMode={viewMode}
          onClose={() => router.push(`/${lang}/projets`)}
          onToggleTheme={() => {}}
          onViewModeChange={(mode: string) => {
            // The canonical page is the case study itself; only the gallery has its own URL.
            router.push(mode === 'gallery' ? `/${lang}/project/${projectId}/gallery` : `/${lang}/project/${projectId}`)
          }}
          onContact={() => router.push(`/${lang}/contact`)}
        />
      ) : null}

      {/* Bottom: related projects, then contact */}
      <CaseStudyFooter lang={lang} projectId={projectId} allProjects={allProjects} />
    </>
  )
}

// Footer: related projects (the next one first), then the contact block

function CaseStudyFooter({
  lang,
  projectId,
  allProjects,
}: {
  lang: 'en' | 'fr'
  projectId: string
  allProjects: Project[]
}) {
  const t = TRANSLATIONS[lang].related
  const items = useMemo(
    () => relatedProjects(lang, allProjects, projectId, t.next_project),
    [lang, allProjects, projectId, t.next_project],
  )

  return (
    <>
      <RelatedContent heading={t.keep_reading} items={items} id="related" />
      <AuthorContactCard lang={lang} />
    </>
  )
}
