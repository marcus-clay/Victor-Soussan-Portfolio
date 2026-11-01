'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import type { RelatedItem } from '@/components/RelatedContent'

const TemplateDetailPage = dynamic(() => import('@/views/TemplateDetailPage'), {
  loading: () => (
    <div className="min-h-screen bg-[#FDFDFC] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
    </div>
  ),
})

export default function TemplateDetailPageWrapper({
  lang,
  templateId,
  related,
}: {
  lang: 'en' | 'fr'
  templateId: string
  related: RelatedItem[]
}) {
  const router = useRouter()

  return (
    <div className="min-h-screen">
      <TemplateDetailPage
        templateId={templateId}
        lang={lang}
        related={related}
        onBack={() => router.push(`/${lang}/ressources?type=template`)}
      />
    </div>
  )
}
