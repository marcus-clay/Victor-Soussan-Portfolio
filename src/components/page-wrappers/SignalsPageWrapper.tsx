'use client'

import { useRouter } from 'next/navigation'
import SignalsPage from '@/views/SignalsPage'

export default function SignalsPageWrapper({ lang }: { lang: 'en' | 'fr' }) {
  const router = useRouter()

  return (
    <SignalsPage
      systemTheme="light"
      lang={lang}
      onBack={() => router.back()}
      onOpenSignal={(id) => router.push(`/${lang}/signal/${id}`)}
      onOpenGuide={() => router.push(`/${lang}/guide/claude-code`)}
    />
  )
}
