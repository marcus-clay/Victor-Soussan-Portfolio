'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const GuideShipToShowPage = dynamic(() => import('@/views/GuideShipToShowPage'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gray-200 border-t-[#2D5CF3] rounded-full animate-spin" />
    </div>
  ),
})

export default function GuideShipToShowPageWrapper({
  lang,
}: {
  lang: 'en' | 'fr'
}) {
  const router = useRouter()

  return (
    <GuideShipToShowPage
      systemTheme="light"
      lang={lang}
      onNavigate={(target) => {
        if (target === 'ressources') {
          router.push(`/${lang}/ressources`)
        } else if (target.startsWith('project-')) {
          const slug = target.replace('project-', '')
          router.push(`/${lang}/project/${slug}/summary`)
        } else {
          router.push(`/${lang}/${target}`)
        }
      }}
    />
  )
}
