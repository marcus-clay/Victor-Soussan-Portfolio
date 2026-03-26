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
  const [pageTitle, setPageTitle] = useState<string | null>(null)
  const [showPageTitle, setShowPageTitle] = useState(false)
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

  // Observe the first h1 on the page for contextual title
  useEffect(() => {
    setShowPageTitle(false)
    setPageTitle(null)

    // Wait for DOM to settle after navigation
    const timer = setTimeout(() => {
      const h1 = document.querySelector('h1')
      if (!h1) return

      setPageTitle(h1.textContent?.trim() || null)

      const observer = new IntersectionObserver(
        ([entry]) => setShowPageTitle(!entry.isIntersecting),
        { threshold: 0, rootMargin: '-72px 0px 0px 0px' }
      )
      observer.observe(h1)
      return () => observer.disconnect()
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  const isActive = (route: string) => {
    if (route === '') return pathname === `/${lang}`
    return pathname.startsWith(`/${lang}/${route}`)
  }

  return (
    <>
      {/* Desktop + Mobile top bar */}
      <nav
        id="site-nav"
        className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl"
        style={{
          transition: 'height 250ms cubic-bezier(0.23, 1, 0.32, 1)',
          height: isScrolled ? 56 : 72,
        }}
      >
        <div className="w-full px-6 h-full flex items-center justify-between">
          {/* Logo + contextual page title */}
          <div className="flex items-baseline gap-0 min-w-0 flex-shrink-0">
            <Link
              href={`/${lang}`}
              className="font-semibold text-[15px] tracking-[-0.02em] text-gray-900 whitespace-nowrap hover:opacity-70 flex-shrink-0"
              style={{ transition: 'opacity 150ms ease' }}
            >
              Victor Soussan
            </Link>

            {/* Page title — fades in when h1 scrolls behind header */}
            {pageTitle && (
              <div
                className="flex items-baseline gap-0 min-w-0 overflow-hidden"
                style={{
                  opacity: showPageTitle ? 1 : 0,
                  transition: 'opacity 250ms ease',
                  maxWidth: showPageTitle ? 300 : 0,
                  pointerEvents: showPageTitle ? 'auto' : 'none',
                }}
              >
                <span className="text-gray-300 mx-2 text-[13px] flex-shrink-0">/</span>
                <span className="text-[13px] font-medium text-gray-500 truncate">
                  {pageTitle}
                </span>
              </div>
            )}
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.route)
              return (
                <Link
                  key={item.id}
                  href={`/${lang}/${item.route}`}
                  className={`px-3 py-1.5 rounded-full text-[13px] whitespace-nowrap ${
                    active
                      ? 'text-gray-900 font-semibold'
                      : 'text-gray-500 font-medium hover:text-gray-900 hover:bg-black/[0.04]'
                  }`}
                  style={{ transition: 'background-color 150ms ease, color 150ms ease' }}
                >
                  {content[item.labelKey]}
                </Link>
              )
            })}

            {/* Separator */}
            <div className="w-px h-4 bg-gray-200 mx-1" />

            {/* Language switch */}
            <Link
              href={`/${otherLang}${pathname.replace(`/${lang}`, '')}`}
              className="px-2.5 py-1.5 text-[13px] font-medium rounded-full text-gray-400 hover:text-gray-900 hover:bg-black/[0.04] whitespace-nowrap"
              style={{ transition: 'background-color 150ms ease, color 150ms ease' }}
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </Link>

            {/* Contact button */}
            <Link
              href={`/${lang}/contact`}
              className="ml-1.5 px-4 py-1.5 text-[13px] font-medium rounded-full bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.97]"
              style={{ transition: 'background-color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
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
              style={{ top: isScrolled ? 56 : 72, transition: 'top 250ms cubic-bezier(0.23, 1, 0.32, 1)' }}
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
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                        index < arr.length - 1 ? 'border-b border-gray-50' : ''
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                          active
                            ? 'bg-[#2D5CF3] text-white shadow-md shadow-blue-500/25'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        <Icon size={18} weight={active ? 'bold' : 'regular'} />
                      </div>
                      <span
                        className={`text-[15px] tracking-[-0.02em] ${
                          active ? 'text-gray-900 font-semibold' : 'text-gray-600'
                        }`}
                      >
                        {label}
                      </span>
                      {active && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2D5CF3]" />
                      )}
                    </Link>
                  )
                })}
              </div>

              {/* Language row */}
              <div className="px-3 pb-3 pt-1">
                <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-1">
                  <Link
                    href={`/${otherLang}${pathname.replace(`/${lang}`, '')}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-gray-800 bg-white/60 hover:bg-white/80 shadow-sm transition-all"
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
