'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  List as MenuIcon,
  X,
  House as Home,
  FolderOpen,
  Images,
  Stack as Layers,
  ChatCircle as MessageCircle,
  User,
  Envelope as Mail,
  Globe,
  BookOpen,
} from '@phosphor-icons/react'
import { TRANSLATIONS } from '@/data/translations'

type Lang = 'en' | 'fr'

const NAV_ITEMS = [
  { id: 'projets', route: 'projets', labelKey: 'projects' as const },
  { id: 'visual-archive', route: 'visual-archive', labelKey: 'archive' as const },
  { id: 'services', route: 'services', labelKey: 'services' as const },
  { id: 'testimonials', route: 'testimonials', labelKey: 'testimonials' as const },
  { id: 'about', route: 'about', labelKey: 'bio' as const },
  { id: 'ressources', route: 'ressources', labelKey: 'blog' as const },
]

const MOBILE_NAV_ITEMS = [
  { id: 'home', route: '', labelKey: null, icon: Home },
  { id: 'projets', route: 'projets', labelKey: 'projects' as const, icon: FolderOpen },
  { id: 'visual-archive', route: 'visual-archive', labelKey: 'archive' as const, icon: Images },
  { id: 'services', route: 'services', labelKey: 'services' as const, icon: Layers },
  { id: 'testimonials', route: 'testimonials', labelKey: 'testimonials' as const, icon: MessageCircle },
  { id: 'about', route: 'about', labelKey: 'bio' as const, icon: User },
  { id: 'ressources', route: 'ressources', labelKey: 'blog' as const, icon: BookOpen },
  { id: 'contact', route: 'contact', labelKey: 'contact' as const, icon: Mail },
]

export default function Nav({ lang }: { lang: Lang }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const content = TRANSLATIONS[lang].nav
  const otherLang = lang === 'en' ? 'fr' : 'en'

  // Track scroll for header height transition + update CSS variable
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10
      setIsScrolled(scrolled)
      document.documentElement.style.setProperty('--nav-height', scrolled ? '56px' : '72px')
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (route: string) => {
    if (route === '') return pathname === `/${lang}`
    return pathname.startsWith(`/${lang}/${route}`)
  }

  return (
    <>
      {/* Desktop + Mobile top bar */}
      <nav
        id="site-nav"
        className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/80"
        style={{
          transition: 'height 250ms cubic-bezier(0.23, 1, 0.32, 1)',
          height: isScrolled ? 56 : 72,
        }}
      >
        <div className="w-full px-6 h-full flex items-center justify-between">
          {/* Logo — 16px, comfortable hitbox */}
          <Link
            href={`/${lang}`}
            className="font-semibold text-base tracking-[-0.02em] text-gray-900 whitespace-nowrap py-2 -my-2 pr-4 -mr-2"
            style={{ transition: 'opacity 200ms ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          >
            Victor Soussan
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5 text-sm font-medium">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.route)
              return (
                <Link
                  key={item.id}
                  href={`/${lang}/${item.route}`}
                  className={`relative px-3 py-2 rounded-full whitespace-nowrap ${
                    active
                      ? 'text-gray-900 bg-black/[0.04]'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-black/[0.04]'
                  }`}
                  style={{ transition: 'background-color 200ms ease, color 200ms ease' }}
                >
                  {content[item.labelKey]}
                  {active && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-[#2D5CF3]" />
                  )}
                </Link>
              )
            })}

            {/* Language switch — same pill size as nav items */}
            <Link
              href={`/${otherLang}${pathname.replace(`/${lang}`, '')}`}
              className="px-3 py-2 text-sm font-medium rounded-full text-gray-500 hover:text-gray-900 hover:bg-black/[0.04] whitespace-nowrap"
              style={{ transition: 'background-color 200ms ease, color 200ms ease' }}
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </Link>

            {/* Contact button */}
            <Link
              href={`/${lang}/contact`}
              className="ml-1 px-5 py-2 text-sm font-medium rounded-full bg-gray-900 text-white hover:bg-gray-800 shadow-sm hover:shadow-md active:scale-[0.97]"
              style={{ transition: 'background-color 200ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 200ms ease' }}
            >
              {content.contact}
            </Link>
          </div>

          {/* Mobile burger button */}
          <button
            className="md:hidden relative p-2 rounded-full hover:bg-black/5 active:scale-[0.95]"
            style={{ transition: 'background-color 200ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="fixed left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-xl md:hidden"
              style={{ top: isScrolled ? 56 : 64 }}
            >
              <div className="px-4 py-3">
                {MOBILE_NAV_ITEMS.map((item, index, arr) => {
                  const active = isActive(item.route)
                  const Icon = item.icon
                  const label = item.labelKey
                    ? content[item.labelKey]
                    : lang === 'en' ? 'Home' : 'Accueil'

                  return (
                    <Link
                      key={item.id}
                      href={`/${lang}/${item.route}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                        index < arr.length - 1 ? 'border-b border-gray-50' : ''
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                          active
                            ? 'bg-[#2D5CF3] text-white shadow-lg shadow-blue-500/30'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        <Icon size={20} weight={active ? 'bold' : 'regular'} />
                      </div>
                      <span
                        className={`text-base tracking-[-0.02em] ${
                          active ? 'text-gray-900 font-semibold' : 'text-gray-600'
                        }`}
                      >
                        {label}
                      </span>
                      {active && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-[#2D5CF3]" />
                      )}
                    </Link>
                  )
                })}
              </div>

              {/* Language row */}
              <div className="px-4 pb-4 pt-1">
                <div className="flex items-center gap-2 rounded-2xl bg-gray-50 p-1.5">
                  <Link
                    href={`/${otherLang}${pathname.replace(`/${lang}`, '')}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-gray-800 bg-white/60 hover:bg-white/80 shadow-sm transition-all"
                  >
                    <Globe size={18} weight="regular" />
                    <span className="text-sm font-medium">
                      {lang === 'en' ? 'Français' : 'English'}
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
