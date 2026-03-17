'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

type ProjectId = 'toolkit' | 'dailymotion' | 'connect' | 'sqool' | 'sqool-classe' | 'france-vae' | 'pagesjaunes' | 'androidwear'
type ViewMode = 'caseStudy' | 'gallery' | 'executive'

const VIEW_MAP: Record<string, ViewMode> = {
  summary: 'executive',
  full: 'caseStudy',
  gallery: 'gallery',
}

const loadingSpinner = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-gray-200 border-t-[#2D5CF3] rounded-full animate-spin" />
  </div>
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CASE_STUDY_COMPONENTS: Record<ProjectId, React.ComponentType<any>> = {
  toolkit: dynamic(() => import('@/views/case-studies/ToolkitPage'), { ssr: false, loading: loadingSpinner }),
  dailymotion: dynamic(() => import('@/views/case-studies/DailymotionPage'), { ssr: false, loading: loadingSpinner }),
  connect: dynamic(() => import('@/views/case-studies/ConnectPage'), { ssr: false, loading: loadingSpinner }),
  sqool: dynamic(() => import('@/views/case-studies/SqoolPage'), { ssr: false, loading: loadingSpinner }),
  'sqool-classe': dynamic(() => import('@/views/case-studies/SqoolClassePage'), { ssr: false, loading: loadingSpinner }),
  'france-vae': dynamic(() => import('@/views/case-studies/FranceVaePage'), { ssr: false, loading: loadingSpinner }),
  pagesjaunes: dynamic(() => import('@/views/case-studies/PagesJaunesPage'), { ssr: false, loading: loadingSpinner }),
  androidwear: dynamic(() => import('@/views/case-studies/AndroidWearPage'), { ssr: false, loading: loadingSpinner }),
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
  const viewMode = VIEW_MAP[view] || 'executive'
  const CaseStudyComponent = CASE_STUDY_COMPONENTS[projectId as ProjectId]

  if (!CaseStudyComponent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Project not found</p>
      </div>
    )
  }

  return (
    <CaseStudyComponent
      systemTheme="light"
      lang={lang}
      viewMode={viewMode}
      onClose={() => router.push(`/${lang}/work`)}
      onToggleTheme={() => {}}
      onViewModeChange={(mode: ViewMode) => {
        const urlView = mode === 'executive' ? 'summary' : mode === 'caseStudy' ? 'full' : 'gallery'
        router.push(`/${lang}/project/${projectId}/${urlView}`)
      }}
      onContact={() => router.push(`/${lang}/contact`)}
    />
  )
}
