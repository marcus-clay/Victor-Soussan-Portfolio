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

/**
 * CaseStudyViewPills — Glass-style pills for navigating to full case study and gallery.
 * Placed under the hero description in each Executive summary.
 * Apple liquid glass aesthetic: backdrop-blur, semi-transparent, subtle border.
 */
export default function CaseStudyViewPills({
  lang,
  projectId,
  showFull = true,
  showGallery = true,
  isDark = false,
}: CaseStudyViewPillsProps) {
  if (!showFull && !showGallery) return null

  const pillCls = isDark
    ? 'bg-white/[0.06] hover:bg-white/[0.12] text-gray-300 hover:text-white border-white/[0.08] hover:border-white/[0.15]'
    : 'bg-black/[0.03] hover:bg-black/[0.06] text-gray-500 hover:text-gray-900 border-black/[0.06] hover:border-black/[0.1]'

  return (
    <div className="flex flex-wrap items-center gap-2 mt-5">
      {showFull && (
        <Link
          href={`/${lang}/project/${projectId}/full`}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-medium border backdrop-blur-md active:scale-[0.96] ${pillCls}`}
          style={{ transition: 'background-color 200ms ease, color 200ms ease, border-color 200ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
        >
          <BookOpen size={14} />
          {lang === 'fr' ? 'Case study complet' : 'Full case study'}
        </Link>
      )}
      {showGallery && (
        <Link
          href={`/${lang}/project/${projectId}/gallery`}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-medium border backdrop-blur-md active:scale-[0.96] ${pillCls}`}
          style={{ transition: 'background-color 200ms ease, color 200ms ease, border-color 200ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
        >
          <Images size={14} />
          {lang === 'fr' ? 'Galerie' : 'Gallery'}
        </Link>
      )}
    </div>
  )
}
