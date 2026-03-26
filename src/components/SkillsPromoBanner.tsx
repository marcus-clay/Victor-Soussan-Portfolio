'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, Lightning, ArrowRight } from '@phosphor-icons/react'

const DISMISS_KEY = 'skills-promo-dismissed'
const HIDDEN_PATHS = ['/guide/claude-code']

export default function SkillsPromoBanner({ lang }: { lang: string }) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(true)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Wait for hydration before doing anything
  useEffect(() => {
    setMounted(true)
    setDismissed(!!sessionStorage.getItem(DISMISS_KEY))
  }, [])

  // Reset visibility on navigation
  useEffect(() => {
    setVisible(false)
  }, [pathname])

  useEffect(() => {
    if (!mounted || dismissed) return
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total > 0) setVisible(window.scrollY / total > 0.3)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted, dismissed])

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDismissed(true)
    setVisible(false)
    sessionStorage.setItem(DISMISS_KEY, '1')
  }

  if (!mounted || dismissed) return null
  if (HIDDEN_PATHS.some(p => pathname.includes(p))) return null

  const isEn = lang === 'en'

  return (
    <div
      className="fixed bottom-5 left-1/2 z-[60] max-w-[calc(100%-32px)] sm:max-w-none"
      style={{
        transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(80px)',
        opacity: visible ? 1 : 0,
        transition: 'transform 500ms cubic-bezier(0.23, 1, 0.32, 1), opacity 400ms ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        className="relative flex items-center gap-3 pl-2.5 pr-2 py-2 rounded-full"
        style={{
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <Link
          href={`/${lang}/guide/claude-code/skills`}
          className="flex items-center gap-2.5 cursor-pointer min-w-0"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0">
            <Lightning size={14} weight="fill" className="text-white" />
          </div>
          <span className="text-[13px] font-semibold text-gray-900 whitespace-nowrap">
            {isEn ? 'Claude Code skills' : 'Skills Claude Code'}
          </span>
          <ArrowRight size={12} className="text-gray-400 flex-shrink-0" />
        </Link>

        <button
          onClick={dismiss}
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-black/5 active:scale-[0.9]"
          style={{ transition: 'background-color 150ms ease, color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
          aria-label="Dismiss"
        >
          <X size={12} weight="bold" />
        </button>
      </div>
    </div>
  )
}
