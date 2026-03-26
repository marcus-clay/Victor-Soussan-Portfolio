'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, Lightning, ArrowRight } from '@phosphor-icons/react'

const DISMISS_KEY = 'skills-promo-dismissed'
const HIDDEN_PATHS = ['/guide/claude-code/skills', '/guide/claude-code']

export default function SkillsPromoBanner({ lang }: { lang: string }) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    setDismissed(!!sessionStorage.getItem(DISMISS_KEY))
  }, [])

  useEffect(() => {
    if (dismissed) return
    const handleScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      setVisible(pct > 0.3)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [dismissed])

  const dismiss = () => {
    setDismissed(true)
    setVisible(false)
    sessionStorage.setItem(DISMISS_KEY, '1')
  }

  if (HIDDEN_PATHS.some(p => pathname.includes(p))) return null
  if (dismissed || !visible) return null

  const isEn = lang === 'en'

  return (
    <div
      className="fixed bottom-6 left-1/2 z-[60]"
      style={{
        transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(80px)',
        opacity: visible ? 1 : 0,
        transition: 'transform 500ms cubic-bezier(0.23, 1, 0.32, 1), opacity 400ms ease',
      }}
    >
      <div
        className="relative rounded-full overflow-hidden flex items-center"
        style={{
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <Link
          href={`/${lang}/guide/claude-code/skills`}
          className="flex items-center gap-3 pl-2.5 pr-4 py-2 cursor-pointer"
        >
          {/* Icon */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0">
            <Lightning size={16} weight="fill" className="text-white" />
          </div>

          {/* Text */}
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-gray-900 leading-tight">
              {isEn ? 'Claude Code skills for designers' : 'Skills Claude Code pour designers'}
            </p>
            <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
              {isEn ? 'Free skills to ship better UI, faster' : 'Skills gratuits pour livrer de meilleures UI'}
            </p>
          </div>

          <ArrowRight size={14} className="text-gray-400 flex-shrink-0 ml-1" />
        </Link>

        {/* Dismiss */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); dismiss() }}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-black/5 mr-1.5 active:scale-[0.9]"
          style={{ transition: 'background-color 150ms ease, color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
          aria-label="Dismiss"
        >
          <X size={12} weight="bold" />
        </button>
      </div>
    </div>
  )
}
