'use client'

import { useRouter } from 'next/navigation'
import ConsultingPage from '@/views/ConsultingPage'

export default function ConsultingPageWrapper({ lang }: { lang: 'en' | 'fr' }) {
  const router = useRouter()

  return (
    <ConsultingPage
      systemTheme="light"
      lang={lang}
      onBack={() => router.back()}
      onContact={() => router.push(`/${lang}/contact`)}
      onProjectClick={(id) => router.push(`/${lang}/project/${id}/summary`)}
    />
  )
}
