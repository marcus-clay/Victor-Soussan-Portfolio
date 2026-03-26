'use client'

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CaretRight, ArrowRight } from '@phosphor-icons/react'
import { getProjects, type Project } from '@/data/projectsData'
import ShortProjectView from '@/components/ShortProjectView'
import AuthorContactCard from '@/components/AuthorContactCard'
import CaseStudyTOCBar from '@/components/CaseStudyTOCBar'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { scrollToElement } from '@/utils/smoothScroll'

type ProjectId = 'toolkit' | 'dailymotion' | 'connect' | 'sqool' | 'sqool-classe' | 'france-vae' | 'pagesjaunes' | 'androidwear' | 'riskos'

// Projects with dark theme (breadcrumb adapts accordingly)
const DARK_PROJECTS: string[] = ['riskos']

// TOC sections per project
type TOCSections = { id: string; label_en: string; label_fr: string }[]

// Summary view TOC
const SUMMARY_TOC: Record<string, TOCSections> = {
  toolkit: [
    { id: 'hero', label_en: 'Top', label_fr: 'Haut' },
    { id: 'role', label_en: 'Role', label_fr: 'Rôle' },
    { id: 'scope', label_en: 'Scope', label_fr: 'Périmètre' },
    { id: 'journey', label_en: 'Journey', label_fr: 'Parcours' },
    { id: 'highlights', label_en: 'Highlights', label_fr: 'Points clés' },
    { id: 'outcome', label_en: 'Outcome', label_fr: 'Résultats' },
    { id: 'testimonial', label_en: 'Testimonial', label_fr: 'Témoignage' },
  ],
  connect: [
    { id: 'hero', label_en: 'Top', label_fr: 'Haut' },
    { id: 'context', label_en: 'Context', label_fr: 'Contexte' },
    { id: 'role', label_en: 'Role', label_fr: 'Rôle' },
    { id: 'journey', label_en: 'Journey', label_fr: 'Parcours' },
    { id: 'scope', label_en: 'Scope', label_fr: 'Périmètre' },
    { id: 'highlights', label_en: 'Highlights', label_fr: 'Points clés' },
    { id: 'user-testing', label_en: 'User testing', label_fr: 'Tests utilisateurs' },
    { id: 'outcome', label_en: 'Outcome', label_fr: 'Résultats' },
    { id: 'testimonial', label_en: 'Testimonial', label_fr: 'Témoignage' },
  ],
  dailymotion: [
    { id: 'hero', label_en: 'Top', label_fr: 'Haut' },
    { id: 'context', label_en: 'Context', label_fr: 'Contexte' },
    { id: 'role', label_en: 'Role', label_fr: 'Rôle' },
    { id: 'journey', label_en: 'Modules', label_fr: 'Modules' },
    { id: 'scope', label_en: 'Scope', label_fr: 'Périmètre' },
    { id: 'highlights', label_en: 'Highlights', label_fr: 'Points clés' },
    { id: 'outcome', label_en: 'Outcome', label_fr: 'Résultats' },
  ],
  sqool: [
    { id: 'hero', label_en: 'Top', label_fr: 'Haut' },
    { id: 'role', label_en: 'Role', label_fr: 'Rôle' },
    { id: 'scope', label_en: 'Scope', label_fr: 'Périmètre' },
    { id: 'journey', label_en: 'Journey', label_fr: 'Parcours' },
    { id: 'highlights', label_en: 'Highlights', label_fr: 'Points clés' },
    { id: 'insights', label_en: 'Insights', label_fr: 'Enseignements' },
    { id: 'outcome', label_en: 'Outcome', label_fr: 'Résultats' },
    { id: 'testimonial', label_en: 'Testimonial', label_fr: 'Témoignage' },
  ],
  'sqool-classe': [
    { id: 'hero', label_en: 'Top', label_fr: 'Haut' },
    { id: 'context', label_en: 'Context', label_fr: 'Contexte' },
    { id: 'role', label_en: 'Role', label_fr: 'Rôle' },
    { id: 'modules', label_en: 'Modules', label_fr: 'Modules' },
    { id: 'scope', label_en: 'Scope', label_fr: 'Périmètre' },
    { id: 'highlights', label_en: 'Highlights', label_fr: 'Points clés' },
    { id: 'outcome', label_en: 'Outcome', label_fr: 'Résultats' },
    { id: 'testimonial', label_en: 'Testimonial', label_fr: 'Témoignage' },
  ],
  'france-vae': [
    { id: 'hero', label_en: 'Top', label_fr: 'Haut' },
    { id: 'initiatives', label_en: 'Initiatives', label_fr: 'Initiatives' },
    { id: 'role', label_en: 'Role', label_fr: 'Rôle' },
    { id: 'outcome', label_en: 'Outcome', label_fr: 'Résultats' },
    { id: 'testimonial', label_en: 'Testimonial', label_fr: 'Témoignage' },
  ],
  pagesjaunes: [
    { id: 'hero', label_en: 'Top', label_fr: 'Haut' },
    { id: 'context', label_en: 'Context', label_fr: 'Contexte' },
    { id: 'role', label_en: 'Role', label_fr: 'Rôle' },
    { id: 'journey', label_en: 'Journey', label_fr: 'Parcours' },
    { id: 'scope', label_en: 'Scope', label_fr: 'Périmètre' },
    { id: 'insights', label_en: 'Insights', label_fr: 'Enseignements' },
    { id: 'outcome', label_en: 'Outcome', label_fr: 'Résultats' },
  ],
  riskos: [
    { id: 'top', label_en: 'Top', label_fr: 'Haut' },
    { id: 'why', label_en: 'Context', label_fr: 'Contexte' },
    { id: 'insight', label_en: 'Observation', label_fr: 'Observation' },
    { id: 'design-question', label_en: 'Approach', label_fr: 'Approche' },
    { id: 'triage', label_en: 'Triage', label_fr: 'Triage' },
    { id: 'ai-analysis', label_en: 'AI analysis', label_fr: 'Analyse IA' },
    { id: 'decision', label_en: 'Decision', label_fr: 'Décision' },
    { id: 'false-positive', label_en: 'False alarms', label_fr: 'Fausses alertes' },
    { id: 'queue', label_en: 'Queue', label_fr: 'File d\'attente' },
    { id: 'learnings', label_en: 'Observations', label_fr: 'Observations' },
  ],
}

// Full case study view TOC
const FULL_TOC: Record<string, TOCSections> = {
  toolkit: [
    { id: 'top', label_en: 'Top', label_fr: 'Haut' },
    { id: 'hero', label_en: 'Intro', label_fr: 'Intro' },
    { id: 'overview', label_en: 'Overview', label_fr: 'Vue d\'ensemble' },
    { id: 'context', label_en: 'Context', label_fr: 'Contexte' },
    { id: 'phase1', label_en: 'Phase 1', label_fr: 'Phase 1' },
    { id: 'phase2', label_en: 'Phase 2', label_fr: 'Phase 2' },
    { id: 'phase3', label_en: 'Phase 3', label_fr: 'Phase 3' },
    { id: 'design-system', label_en: 'Design System', label_fr: 'Design System' },
    { id: 'impact', label_en: 'Impact', label_fr: 'Impact' },
  ],
  connect: [
    { id: 'top', label_en: 'Top', label_fr: 'Haut' },
    { id: 'hero', label_en: 'Intro', label_fr: 'Intro' },
    { id: 'overview', label_en: 'Overview', label_fr: 'Aperçu' },
    { id: 'dashboard', label_en: 'Dashboard', label_fr: 'Dashboard' },
    { id: 'bulle', label_en: 'La Bulle', label_fr: 'La Bulle' },
  ],
  dailymotion: [
    { id: 'top', label_en: 'Top', label_fr: 'Haut' },
    { id: 'hero', label_en: 'Intro', label_fr: 'Intro' },
    { id: 'overview', label_en: 'Overview', label_fr: 'Vue d\'ensemble' },
    { id: 'modules', label_en: 'Key Modules', label_fr: 'Modules clés' },
    { id: 'upload', label_en: 'Upload & Management', label_fr: 'Upload & Gestion' },
    { id: 'live', label_en: 'Live Console', label_fr: 'Console Live' },
    { id: 'player', label_en: 'Player Manager', label_fr: 'Gestionnaire Player' },
    { id: 'design-system', label_en: 'Design System', label_fr: 'Design System' },
  ],
  sqool: [
    { id: 'top', label_en: 'Top', label_fr: 'Haut' },
    { id: 'hero', label_en: 'Intro', label_fr: 'Intro' },
    { id: 'context', label_en: 'Context', label_fr: 'Contexte' },
    { id: 'phase1', label_en: '2019-2020', label_fr: '2019-2020' },
    { id: 'phase2', label_en: '2021', label_fr: '2021' },
    { id: 'phase3', label_en: '2022-2024', label_fr: '2022-2024' },
    { id: 'apps', label_en: 'Apps', label_fr: 'Apps' },
    { id: 'impact', label_en: 'Impact', label_fr: 'Impact' },
  ],
  'sqool-classe': [
    { id: 'top', label_en: 'Top', label_fr: 'Haut' },
    { id: 'hero', label_en: 'Intro', label_fr: 'Intro' },
    { id: 'context', label_en: 'Context', label_fr: 'Contexte' },
    { id: 'approach', label_en: 'Approach', label_fr: 'Approche' },
    { id: 'teacher', label_en: 'Teacher', label_fr: 'Enseignant' },
    { id: 'students', label_en: 'Students', label_fr: 'Élèves' },
    { id: 'impact', label_en: 'Impact', label_fr: 'Impact' },
  ],
  'france-vae': [
    { id: 'top', label_en: 'Top', label_fr: 'Haut' },
    { id: 'context', label_en: 'Context', label_fr: 'Contexte' },
    { id: 'initiative-1', label_en: 'VAE Collective', label_fr: 'VAE Collective' },
    { id: 'initiative-2', label_en: 'Product Ops', label_fr: 'Product Ops' },
    { id: 'initiative-3', label_en: 'Research', label_fr: 'Recherche' },
    { id: 'initiative-4', label_en: 'Workshops', label_fr: 'Ateliers' },
    { id: 'initiative-5', label_en: 'AI', label_fr: 'IA' },
    { id: 'ui-delivery', label_en: 'UI & Delivery', label_fr: 'UI & Livraison' },
    { id: 'learnings', label_en: 'Learnings', label_fr: 'Apprentissages' },
  ],
  pagesjaunes: [
    { id: 'top', label_en: 'Top', label_fr: 'Haut' },
    { id: 'overview', label_en: 'Overview', label_fr: 'Aperçu' },
    { id: 'homepage', label_en: 'Homepage', label_fr: 'Homepage' },
    { id: 'search', label_en: 'Search Engine', label_fr: 'Moteur' },
    { id: 'onboarding', label_en: 'Onboarding', label_fr: 'Onboarding' },
    { id: 'navigation', label_en: 'Navigation', label_fr: 'Navigation' },
    { id: 'account', label_en: 'Account', label_fr: 'Compte' },
    { id: 'micro-interactions', label_en: 'Motion', label_fr: 'Motion' },
    { id: 'wear', label_en: 'Android Wear', label_fr: 'Android Wear' },
    { id: 'design-system', label_en: 'Design System', label_fr: 'Design System' },
    { id: 'team', label_en: 'Team', label_fr: 'Équipe' },
    { id: 'impact', label_en: 'Impact', label_fr: 'Impact' },
    { id: 'learnings', label_en: 'Learnings', label_fr: 'Apprentissages' },
  ],
  androidwear: [
    { id: 'top', label_en: 'Top', label_fr: 'Haut' },
    { id: 'overview', label_en: 'Overview', label_fr: 'Vue d\'ensemble' },
    { id: 'research', label_en: 'Research', label_fr: 'Recherche' },
    { id: 'design', label_en: 'Screen Design', label_fr: 'Design' },
    { id: 'specs', label_en: 'Specifications', label_fr: 'Spécifications' },
    { id: 'implementation', label_en: 'Implementation', label_fr: 'Implémentation' },
    { id: 'results', label_en: 'Results', label_fr: 'Résultats' },
  ],
  riskos: [
    { id: 'top', label_en: 'Top', label_fr: 'Haut' },
    { id: 'why', label_en: 'Context', label_fr: 'Contexte' },
    { id: 'insight', label_en: 'Observation', label_fr: 'Observation' },
    { id: 'design-question', label_en: 'Approach', label_fr: 'Approche' },
    { id: 'triage', label_en: 'Triage', label_fr: 'Triage' },
    { id: 'ai-analysis', label_en: 'AI analysis', label_fr: 'Analyse IA' },
    { id: 'decision', label_en: 'Decision', label_fr: 'Décision' },
    { id: 'false-positive', label_en: 'False alarms', label_fr: 'Fausses alertes' },
    { id: 'queue', label_en: 'Queue', label_fr: 'File d\'attente' },
    { id: 'learnings', label_en: 'Observations', label_fr: 'Observations' },
  ],
}


const loadingSpinner = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-gray-200 border-t-[#2D5CF3] rounded-full animate-spin" />
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
  full: { en: 'Full case study', fr: 'Case study complet' },
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
  const isDark = DARK_PROJECTS.includes(projectId)
  const isScrollingDown = useScrollDirection(5)

  // Toggle dark theme on nav, footer, and main for dark-themed projects
  useEffect(() => {
    if (!isDark) return
    const nav = document.getElementById('site-nav')
    const footer = document.getElementById('site-footer')
    const main = document.getElementById('main-content')
    nav?.classList.add('nav-dark')
    footer?.classList.add('footer-dark')
    main?.classList.add('main-dark')
    return () => {
      nav?.classList.remove('nav-dark')
      footer?.classList.remove('footer-dark')
      main?.classList.remove('main-dark')
    }
  }, [isDark])

  // Check if this is a short-format project
  const allProjects = getProjects(lang)
  const project = allProjects.find((p) => p.id === projectId)

  const isShort = project?.format === 'short'
  const CaseStudyComponent = !isShort ? CASE_STUDY_COMPONENTS[projectId as ProjectId] : null

  if (!isShort && !CaseStudyComponent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Project not found</p>
      </div>
    )
  }

  const projectName = project?.title || projectId
  const viewLabel = VIEW_LABELS[view]?.[lang]

  // Map URL view to internal viewMode for backward compatibility
  const viewMode = view === 'full' ? 'caseStudy' : view === 'gallery' ? 'gallery' : 'executive'

  // TOC: pick the right sections based on view
  const tocSource = view === 'full' ? FULL_TOC[projectId] : view === 'summary' ? SUMMARY_TOC[projectId] : null
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

  const hasTOC = tocItems.length > 0
  // Show swap only when TOC is available and user has scrolled past hero
  const shouldSwap = hasTOC && showTOC && isScrollingDown

  return (
    <>
      {/* Sticky sub-bar: swaps between breadcrumb and TOC */}
      <div
        className={`sticky z-10 backdrop-blur-xl ${
          isDark
            ? 'bg-[#0a0a0a]/80 border-white/5'
            : 'bg-[#FCFCFD]/80 border-gray-200'
        }`}
        style={{ top: 'var(--nav-height, 72px)', transition: 'top 250ms cubic-bezier(0.23, 1, 0.32, 1)' }}
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
            <div className="max-w-[1200px] mx-auto px-4 md:px-6 w-full h-10 flex items-center">
              <nav className="flex items-center gap-1.5 text-[13px] min-w-0 overflow-hidden">
                <Link
                  href={`/${lang}/projets`}
                  className={`transition-colors hover:underline flex-shrink-0 ${
                    isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'
                  }`}
                >
                  {lang === 'fr' ? 'Projets' : 'Projects'}
                </Link>
                <CaretRight size={10} className={`flex-shrink-0 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                {viewLabel ? (
                  <>
                    <Link
                      href={`/${lang}/project/${projectId}/summary`}
                      className={`transition-colors hover:underline flex-shrink-0 ${
                        isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'
                      }`}
                    >
                      {projectName}
                    </Link>
                    <CaretRight size={10} className={`flex-shrink-0 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                    <span className={`truncate font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {viewLabel}
                    </span>
                  </>
                ) : (
                  <span className={`truncate font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
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
                isDark={isDark}
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
            const urlView = mode === 'executive' ? 'summary' : mode === 'caseStudy' ? 'full' : 'gallery'
            router.push(`/${lang}/project/${projectId}/${urlView}`)
          }}
          onContact={() => router.push(`/${lang}/contact`)}
        />
      ) : null}

      {/* Bottom: related projects + Contact CTA */}
      <CaseStudyFooter lang={lang} projectId={projectId} isDark={isDark} allProjects={allProjects} />
    </>
  )
}

// ─── Smart related projects: same category first, then different ─────────────

function getRelatedProjects(current: Project, allProjects: Project[]): Project[] {
  const others = allProjects.filter((p) => p.id !== current.id && p.format === 'case-study')
  // Same category first
  const sameCategory = others.filter((p) => p.category === current.category)
  const diffCategory = others.filter((p) => p.category !== current.category)
  // Score by shared deliverable keywords as tiebreaker
  const scored = [...sameCategory, ...diffCategory].map((p) => {
    const shared = p.deliverables.filter((d) =>
      current.deliverables.some((cd) => cd.toLowerCase().includes(d.toLowerCase().split(' ')[0]))
    ).length
    return { project: p, score: (p.category === current.category ? 10 : 0) + shared }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 2).map((s) => s.project)
}

// ─── Footer: related projects + contact CTA ──────────────────────────────────

function CaseStudyFooter({
  lang,
  projectId,
  isDark,
  allProjects,
}: {
  lang: 'en' | 'fr'
  projectId: string
  isDark: boolean
  allProjects: Project[]
}) {
  const currentProject = allProjects.find((p) => p.id === projectId)
  const suggestions = useMemo(() => {
    if (!currentProject) return []
    return getRelatedProjects(currentProject, allProjects)
  }, [currentProject, allProjects])

  return (
    <div className={`${isDark ? 'bg-[#111113]' : 'bg-[#F5F5F7]'}`}>
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        {/* Related projects */}
        {suggestions.length > 0 && (
          <div>
            <p className={`text-[11px] font-semibold uppercase tracking-widest mb-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {lang === 'fr' ? 'Projets similaires' : 'Related projects'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestions.map((proj) => (
                <Link
                  key={proj.id}
                  href={`/${lang}/project/${proj.id}/summary`}
                  className={`group block rounded-xl border cursor-pointer active:scale-[0.98] overflow-hidden ${
                    isDark
                      ? 'bg-[#1D1D1F] border-white/5 hover:border-white/15 hover:shadow-lg'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                  style={{ transition: 'transform 160ms cubic-bezier(0.23, 1, 0.32, 1), border-color 200ms ease, box-shadow 200ms ease' }}
                >
                  {/* Cover image */}
                  {proj.coverImage && (
                    <div
                      className="relative aspect-[16/9] overflow-hidden flex items-center justify-center p-3"
                      style={{ backgroundColor: proj.cardBg || (isDark ? '#111111' : '#f4f4f5') }}
                    >
                      <img
                        src={proj.coverImage.startsWith('/') ? proj.coverImage : `/images/${proj.coverImage}`}
                        alt={proj.title}
                        className="max-w-full max-h-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03] rounded-lg"
                      />
                    </div>
                  )}
                  {/* Text content */}
                  <div className="p-5">
                    <p className={`text-[11px] font-medium uppercase tracking-wider mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {proj.role} · {proj.period}
                    </p>
                    <p className={`text-base font-semibold mb-1.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {proj.title}
                    </p>
                    <p className={`text-sm leading-relaxed line-clamp-2 mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {proj.summary}
                    </p>
                    <span className={`inline-flex items-center gap-1.5 text-sm font-medium text-[#2D5CF3]`}>
                      {lang === 'fr' ? 'Voir le projet' : 'View project'}
                      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-10">
          <AuthorContactCard lang={lang} isDark={isDark} />
        </div>
      </div>
    </div>
  )
}
