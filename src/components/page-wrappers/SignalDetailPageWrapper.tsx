'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import type { RelatedItem } from '@/components/RelatedContent'

const SignalDetailPage = dynamic(() => import('@/views/SignalDetailPage'), {
  loading: () => (
    <div className="min-h-screen bg-[#FDFDFC] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
    </div>
  ),
})

export default function SignalDetailPageWrapper({
  lang,
  signalId,
  related,
}: {
  lang: 'en' | 'fr'
  signalId: string
  related: RelatedItem[]
}) {
  const router = useRouter()

  return (
    <div className="[&>div]:!relative [&>div]:!inset-auto [&>div]:!z-auto min-h-screen">
      <SignalDetailPage
        signalId={signalId}
        systemTheme="light"
        lang={lang}
        related={related}
        onBack={() => router.push(`/${lang}/ressources`)}
      />
    </div>
  )
}
