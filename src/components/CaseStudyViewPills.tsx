'use client'

import Link from 'next/link'
import { BookOpen, Images } from '@phosphor-icons/react'

interface CaseStudyViewPillsProps {
  lang: 'en' | 'fr'
  projectId: string
  showFull?: boolean
  showGallery?: boolean
  isDark?: boolean
}

export default function CaseStudyViewPills({
  lang,
  projectId,
  showFull = true,
  showGallery = true,
  isDark = false,
}: CaseStudyViewPillsProps) {
  if (!showFull && !showGallery) return null

  const pillCls = isDark
    ? 'bg-white/[0.08] hover:bg-white hover:text-gray-900 text-gray-300 border border-white/[0.1] hover:border-white/0'
    : 'bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-700 border border-gray-200 hover:border-gray-900'

  const pillStyle = {
    transition: [
      'background-color 150ms ease-out',
      'border-color 150ms ease-out',
      'color 120ms ease-out',
      'transform 160ms cubic-bezier(0.23, 1, 0.32, 1)',
    ].join(', '),
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-5">
      {showFull && (
        <Link
          href={`/${lang}/project/${projectId}/full`}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium active:scale-[0.95] select-none ${pillCls}`}
          style={pillStyle}
        >
          <BookOpen size={14} weight="regular" />
          {lang === 'fr' ? 'Case study complet' : 'Full case study'}
        </Link>
      )}
      {showGallery && (
        <Link
          href={`/${lang}/project/${projectId}/gallery`}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium active:scale-[0.95] select-none ${pillCls}`}
          style={pillStyle}
        >
          <Images size={14} weight="regular" />
          {lang === 'fr' ? 'Galerie' : 'Gallery'}
        </Link>
      )}
    </div>
  )
}
