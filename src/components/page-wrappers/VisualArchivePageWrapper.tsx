'use client'

import { useRouter } from 'next/navigation'
import VisualArchivePage from '@/views/VisualArchivePage'

export default function VisualArchivePageWrapper({ lang }: { lang: 'en' | 'fr' }) {
  const router = useRouter()

  return (
    <VisualArchivePage
      systemTheme="light"
      lang={lang}
      onBack={() => router.back()}
    />
  )
}
