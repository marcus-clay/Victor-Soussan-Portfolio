'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const SignalDetailPage = dynamic(() => import('@/views/SignalDetailPage'), {
  loading: () => (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gray-200 border-t-[#2D5CF3] rounded-full animate-spin" />
    </div>
  ),
})

export default function SignalDetailPageWrapper({
  lang,
  signalId,
}: {
  lang: 'en' | 'fr'
  signalId: string
}) {
  const router = useRouter()

  return (
    <SignalDetailPage
      signalId={signalId}
      systemTheme="light"
      lang={lang}
      onBack={() => router.push(`/${lang}/ressources`)}
      onOpenSignal={(id) => router.push(`/${lang}/signal/${id}`)}
    />
  )
}
