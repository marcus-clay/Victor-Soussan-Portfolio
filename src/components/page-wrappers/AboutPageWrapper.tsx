'use client'

import { useRouter } from 'next/navigation'
import AboutPage from '@/views/AboutPage'
import { getResources } from '@/data/resourcesData'

export default function AboutPageWrapper({ lang }: { lang: 'en' | 'fr' }) {
  const router = useRouter()
  const resources = getResources(lang)

  return (
    <AboutPage
      systemTheme="light"
      lang={lang}
      onBack={() => router.back()}
      onContact={() => router.push(`/${lang}/contact`)}
      resources={resources}
    />
  )
}
