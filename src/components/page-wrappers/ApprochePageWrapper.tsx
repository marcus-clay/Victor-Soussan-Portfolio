'use client'

import { useRouter } from 'next/navigation'
import ApprochePage from '@/views/ApprochePage'
import { getProjects } from '@/data/projectsData'
import { SIGNALS } from '@/data/signalsData'
import { RELATED_PROJECT_IDS, RELATED_ARTICLE_IDS } from '@/data/approcheData'

export default function ApprochePageWrapper({ lang }: { lang: 'en' | 'fr' }) {
  const router = useRouter()
  const allProjects = getProjects(lang)
  const allSignals = SIGNALS

  const relatedProjects = RELATED_PROJECT_IDS
    .map((id) => allProjects.find((p) => p.id === id))
    .filter(Boolean)
    .map((p) => ({
      id: p!.id,
      title: p!.title,
      summary: p!.summary,
      cover: p!.coverImage,
    }))

  const relatedArticles = RELATED_ARTICLE_IDS
    .map((id) => allSignals.find((s) => s.id === id))
    .filter(Boolean)
    .map((s) => ({
      id: s!.id,
      title: lang === 'fr' ? s!.title_fr : s!.title_en,
      summary: lang === 'fr' ? s!.body_fr.slice(0, 140) + '...' : s!.body_en.slice(0, 140) + '...',
    }))

  return (
    <ApprochePage
      lang={lang}
      onBack={() => router.back()}
      onContact={() => router.push(`/${lang}/contact`)}
      relatedProjects={relatedProjects}
      relatedArticles={relatedArticles}
    />
  )
}
