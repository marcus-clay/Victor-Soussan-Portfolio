'use client'

import { useRouter } from 'next/navigation'
import GuideShipToShowPage from '@/views/GuideShipToShowPage'
import type { RelatedItem } from '@/components/RelatedContent'


export default function GuideShipToShowPageWrapper({
  lang,
  related,
}: {
  lang: 'en' | 'fr'
  related: RelatedItem[]
}) {
  const router = useRouter()

  return (
    <GuideShipToShowPage
      systemTheme="light"
      lang={lang}
      related={related}
      onNavigate={(target) => {
        if (target === 'ressources') {
          router.push(`/${lang}/ressources`)
        } else if (target.startsWith('project-')) {
          const slug = target.replace('project-', '')
          router.push(`/${lang}/project/${slug}`)
        } else {
          router.push(`/${lang}/${target}`)
        }
      }}
    />
  )
}
