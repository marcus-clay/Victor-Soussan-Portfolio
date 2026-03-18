'use client'

import { useRouter } from 'next/navigation'
import AboutPageRedesign from '@/views/AboutPageRedesign'
import { getResources } from '@/data/resourcesData'

export default function AboutPageWrapper({ lang }: { lang: 'en' | 'fr' }) {
  const router = useRouter()
  const resources = getResources(lang)

  return (
    <AboutPageRedesign
      lang={lang}
      onBack={() => router.back()}
      onContact={() => router.push(`/${lang}/contact`)}
      resources={resources}
    />
  )
}
