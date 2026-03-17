'use client'

import { useRouter } from 'next/navigation'
import WorkPage from '@/views/WorkPage'

export default function WorkPageWrapper({ lang }: { lang: 'en' | 'fr' }) {
  const router = useRouter()

  return (
    <WorkPage
      systemTheme="light"
      lang={lang}
      onProjectClick={(id: string) => router.push(`/${lang}/project/${id}/summary`)}
      onBack={() => router.back()}
    />
  )
}
