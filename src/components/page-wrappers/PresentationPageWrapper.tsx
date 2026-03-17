'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const ExecutivePage = dynamic(() => import('@/views/ExecutivePage'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gray-200 border-t-[#2D5CF3] rounded-full animate-spin" />
    </div>
  ),
})

export default function PresentationPageWrapper({ lang }: { lang: 'en' | 'fr' }) {
  const router = useRouter()

  return (
    <ExecutivePage
      language={lang}
      systemTheme="light"
      onClose={() => router.push(`/${lang}`)}
      onBookCall={() => window.open('https://calendly.com/victorsoussan/30min', '_blank')}
      onContact={() => router.push(`/${lang}/contact`)}
      onOpenResume={() => router.push(`/${lang}/resume`)}
    />
  )
}
