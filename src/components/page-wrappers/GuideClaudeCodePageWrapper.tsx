'use client'

import { useRouter } from 'next/navigation'
import GuideClaudeCodePage from '@/views/GuideClaudeCodePage'


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
