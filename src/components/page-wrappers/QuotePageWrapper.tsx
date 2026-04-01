'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { TRANSLATIONS } from '@/data/translations'

const QuoteGeneratorModal = dynamic(
  () => import('@/components/QuoteGeneratorModal'),
  {
    loading: () => (
      <div className="min-h-screen bg-[#FDFDFC] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
      </div>
    ),
  }
)

export default function QuotePageWrapper({ lang }: { lang: 'en' | 'fr' }) {
  const router = useRouter()
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content = JSON.parse(JSON.stringify(TRANSLATIONS[lang])) as any

  return (
    <>
      <QuoteGeneratorModal
        isOpen={true}
        onClose={() => router.push(`/${lang}`)}
        systemTheme="light"
        lang={lang}
        content={content}
        onToast={(msg: string) => {
          setToastMessage(msg)
          setShowToast(true)
          setTimeout(() => setShowToast(false), 3000)
        }}
      />
      {showToast && toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg">
          {toastMessage}
        </div>
      )}
    </>
  )
}
