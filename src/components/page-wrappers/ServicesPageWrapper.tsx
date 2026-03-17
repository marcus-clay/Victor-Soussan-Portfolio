'use client'

import { useRouter } from 'next/navigation'
import ServicesPage from '@/views/ServicesPage'

export default function ServicesPageWrapper({ lang }: { lang: 'en' | 'fr' }) {
  const router = useRouter()

  return (
    <ServicesPage
      systemTheme="light"
      lang={lang}
      onBack={() => router.back()}
      onContact={() => router.push(`/${lang}/contact`)}
    />
  )
}
