'use client'

import { useRouter } from 'next/navigation'
import GuideShipToShowPage from '@/views/GuideShipToShowPage'


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
