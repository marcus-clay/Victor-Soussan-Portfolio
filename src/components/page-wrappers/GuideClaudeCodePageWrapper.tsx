'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const GuideClaudeCodePage = dynamic(() => import('@/views/GuideClaudeCodePage'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#FDFDFC] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
    </div>
  ),
})

export default function GuideClaudeCodePageWrapper({
  lang,
  view,
}: {
  lang: 'en' | 'fr'
  view: string
}) {
  const router = useRouter()

  return (
    <GuideClaudeCodePage
      systemTheme="light"
      lang={lang}
      view={view}
      onNavigate={(target) => {
        if (target === 'blog') {
          router.push(`/${lang}/ressources`)
        } else if (target === 'index') {
          router.push(`/${lang}/guide/claude-code`)
        } else {
          router.push(`/${lang}/guide/claude-code/${target}`)
        }
      }}
    />
  )
}
