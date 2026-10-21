'use client'

import { useRouter } from 'next/navigation'
import GuideClaudeCodePage from '@/views/GuideClaudeCodePage'
import type { RelatedItem } from '@/components/RelatedContent'


export default function GuideClaudeCodePageWrapper({
  lang,
  view,
  related,
}: {
  lang: 'en' | 'fr'
  view: string
  related: RelatedItem[]
}) {
  const router = useRouter()

  return (
    <GuideClaudeCodePage
      systemTheme="light"
      lang={lang}
      view={view}
      related={related}
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
