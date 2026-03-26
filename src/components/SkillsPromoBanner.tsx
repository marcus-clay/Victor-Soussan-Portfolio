'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, Lightning, ArrowRight } from '@phosphor-icons/react'

const DISMISS_KEY = 'skills-promo-dismissed'

// Don't show on the skills page itself or on the guide pages
const HIDDEN_PATHS = ['/guide/claude-code/skills', '/guide/claude-code']

/**
 * SkillsPromoBanner — Floating sticky banner at the bottom of the viewport.
 * Appears after scrolling 40% of the page. Dismissable.
 * Promotes the Claude Code skills collection for designers.
 */
export default function SkillsPromoBanner({ lang }: { lang: string }) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(true)
  const pathname = usePathname()

  // Check if already dismissed this session
  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(DISMISS_KEY)
    setDismissed(!!wasDismissed)
  }, [])

  // Show after scrolling 40% of the page
  useEffect(() => {
    if (dismissed) return

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      setVisible(scrollPercent > 0.35)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [dismissed])

  const dismiss = () => {
    setDismissed(true)
    setVisible(false)
    sessionStorage.setItem(DISMISS_KEY, '1')
  }

  // Hide on specific pages
  if (HIDDEN_PATHS.some(p => pathname.includes(p))) return null
  if (dismissed || !visible) return null

  const isEn = lang === 'en'

  return (
    <div
      className="fixed bottom-6 left-1/2 z-[60] w-[calc(100%-48px)] max-w-lg"
      style={{
        transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(100px)',
        opacity: visible ? 1 : 0,
        transition: 'transform 500ms cubic-bezier(0.23, 1, 0.32, 1), opacity 400ms ease',
      }}
    >
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        {/* Dismiss button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); dismiss() }}
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-black/5 active:scale-[0.9]"
          style={{ transition: 'background-color 150ms ease, color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
          aria-label="Dismiss"
        >
          <X size={14} weight="bold" />
        </button>

        <Link
          href={`/${lang}/guide/claude-code/skills`}
          className="flex items-center gap-4 p-4 pr-10 cursor-pointer"
        >
          {/* Animated icon */}
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Lightning size={20} weight="fill" className="text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 mb-0.5">
              {isEn ? 'Skills for designers' : 'Skills pour designers'}
            </p>
            <p className="text-xs text-gray-500 leading-snug">
              {isEn
                ? 'Free Claude Code skills to ship better UI, faster.'
                : 'Skills Claude Code gratuits pour livrer de meilleures UI, plus vite.'}
            </p>
          </div>

          <ArrowRight size={16} className="text-gray-400 flex-shrink-0" />
        </Link>
      </div>
    </div>
  )
}
