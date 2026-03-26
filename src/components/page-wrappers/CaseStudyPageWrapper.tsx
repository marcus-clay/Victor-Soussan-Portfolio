'use client'

import { useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CaretRight, ArrowRight } from '@phosphor-icons/react'
import { getProjects, type Project } from '@/data/projectsData'
import ShortProjectView from '@/components/ShortProjectView'
import AuthorContactCard from '@/components/AuthorContactCard'
import GalleryCarousel from '@/components/GalleryCarousel'
import {
  getToolkitGalleryItems,
  getDailymotionGalleryItems,
  getConnectGalleryItems,
  getSqoolGalleryItems,
  type GalleryItem,
} from '@/components/BentoGallery'

type ProjectId = 'toolkit' | 'dailymotion' | 'connect' | 'sqool' | 'sqool-classe' | 'france-vae' | 'pagesjaunes' | 'androidwear' | 'riskos'

// Projects with dark theme (breadcrumb adapts accordingly)
const DARK_PROJECTS: string[] = ['riskos']

// Gallery items getter per project (for carousel)
const GALLERY_GETTERS: Record<string, (lang: 'en' | 'fr') => GalleryItem[]> = {
  toolkit: getToolkitGalleryItems,
  dailymotion: getDailymotionGalleryItems,
  connect: getConnectGalleryItems,
  sqool: getSqoolGalleryItems,
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
  return (
    <>
      {/* Breadcrumb - sticky below Nav, adapts to dark/light theme */}
      <div className={`sticky top-16 z-10 border-b backdrop-blur-xl ${
        isDark
          ? 'bg-[#0a0a0a]/80 border-white/5'
          : 'bg-[#FCFCFD]/80 border-gray-200'
      }`}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-10 flex items-center">
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

      {/* Gallery carousel — auto-scrolling preview (summary view, projects with gallery) */}
      {view === 'summary' && GALLERY_GETTERS[projectId] && (
        <div className={`py-10 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
          <div className="max-w-[1200px] mx-auto px-6 mb-4">
            <p className={`text-[11px] font-semibold uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {lang === 'fr' ? 'Aperçu galerie' : 'Gallery preview'}
            </p>
          </div>
          <GalleryCarousel
            items={GALLERY_GETTERS[projectId](lang)}
            lang={lang}
            projectId={projectId}
            isDark={isDark}
          />
        </div>
      )}

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
                  {/* Cover image — uncropped, full thumbnail visible */}
                  {proj.coverImage && (
                    <div
                      className="relative aspect-[16/9] overflow-hidden flex items-center justify-center p-3"
                      style={{ backgroundColor: proj.cardBg || (isDark ? '#111113' : '#f4f4f5') }}
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
                    <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${isDark ? 'text-blue-400' : 'text-[#2D5CF3]'}`}>
                      {lang === 'fr' ? 'Voir le projet' : 'View project'}
                      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Contact CTA — design system component */}
        <div className="mt-10">
          <AuthorContactCard lang={lang} isDark={isDark} />
        </div>
      </div>
    </div>
  )
}
