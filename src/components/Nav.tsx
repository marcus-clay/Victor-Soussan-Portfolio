'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  List as MenuIcon,
  X,
} from '@phosphor-icons/react'
import { TRANSLATIONS } from '@/data/translations'

type Lang = 'en' | 'fr'

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.12 } },
  exit: { opacity: 0, transition: { duration: 0.14 } },
}

const panelVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE_OUT } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.14, ease: [0.55, 0, 1, 0.45] as [number, number, number, number] } },
}

const MENU_ITEMS = [
  { id: 'home', route: '', labelKey: null },
  { id: 'projets', route: 'projets', labelKey: 'projects' as const },
  { id: 'services', route: 'services', labelKey: 'services' as const },
  { id: 'approche', route: 'approche', labelKey: 'approach' as const },
  { id: 'testimonials', route: 'testimonials', labelKey: 'testimonials' as const },
  { id: 'about', route: 'about', labelKey: 'bio' as const },
  { id: 'ressources', route: 'ressources', labelKey: 'blog' as const },
  { id: 'contact', route: 'contact', labelKey: 'contact' as const },
]

export default function Nav({ lang }: { lang: Lang }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Stays true while menu is open OR animating out — drives nav background
  // to avoid backdrop-blur clipping the still-visible panel during exit
  const [isMenuMounted, setIsMenuMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkNav, setIsDarkNav] = useState(false)
  const [pageTitle, setPageTitle] = useState<string | null>(null)
  const [showPageTitle, setShowPageTitle] = useState(false)
  const pathname = usePathname()
  const content = TRANSLATIONS[lang].nav
  const otherLang = lang === 'en' ? 'fr' : 'en'

  // Scroll to top on every navigation
  useEffect(() => {
    window.scrollTo(0, 0)
    setIsMobileMenuOpen(false)
    // isMenuMounted cleared by onExitComplete after panel finishes exiting
  }, [pathname])

  const openMenu = () => { setIsMenuMounted(true); setIsMobileMenuOpen(true) }
  const closeMenu = () => { setIsMobileMenuOpen(false) }
  const toggleMenu = () => { isMobileMenuOpen ? closeMenu() : openMenu() }

  // Track scroll for header height transition + update CSS variable
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10
      setIsScrolled(scrolled)
      document.documentElement.style.setProperty('--nav-height', scrolled ? '56px' : '64px')
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Detect dark nav mode (set by CaseStudyPageWrapper via DOM class)
  useEffect(() => {
    const nav = document.getElementById('site-nav')
    if (!nav) return
    const check = () => setIsDarkNav(nav.classList.contains('nav-dark'))
    check()
    const observer = new MutationObserver(check)
    observer.observe(nav, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [pathname])

  // Observe the first h1 on the page for contextual title
  useEffect(() => {
    setShowPageTitle(false)
    setPageTitle(null)

    // Delay observer setup so it doesn't fire during page transition
    const timer = setTimeout(() => {
      const h1 = document.querySelector('h1')
      if (!h1) return

      const isHomepage = pathname === `/${lang}` || pathname === `/${lang}/`
      if (isHomepage) {
        setPageTitle('Lead Product Designer')
      } else {
        // Prefer explicit nav title override (e.g. client name on case studies)
        const navTitleEl = document.querySelector('[data-nav-title]')
        const titleText = navTitleEl?.textContent?.trim() || h1.textContent?.trim() || null
        setPageTitle(titleText)
      }

      // Only show title after user has scrolled past the h1
      // Start with hidden, let scroll reveal it
      let hasScrolled = false
      const onScroll = () => { hasScrolled = true }
      window.addEventListener('scroll', onScroll, { once: true, passive: true })

      const observer = new IntersectionObserver(
        ([entry]) => {
          // Don't show on initial observation (page load), only after scroll
          if (!hasScrolled && !entry.isIntersecting) return
          setShowPageTitle(!entry.isIntersecting)
        },
        { threshold: 0, rootMargin: '-72px 0px 0px 0px' }
      )
      observer.observe(h1)

      return () => {
        observer.disconnect()
        window.removeEventListener('scroll', onScroll)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname])

  const isActive = (route: string) => {
    if (route === '') return pathname === `/${lang}`
    return pathname.startsWith(`/${lang}/${route}`)
  }

  return (
    <>
      {/* Top bar — content-width, always burger */}
      <nav
        id="site-nav"
        className={`fixed top-0 w-full z-50 backdrop-blur-xl ${
          isMenuMounted
            ? 'bg-[#FDFDFC]'
            : isScrolled ? 'bg-[#FDFDFC]/80' : 'bg-transparent'
        }`}
        style={{
          height: isScrolled ? 56 : 64,
          transition: 'height 250ms cubic-bezier(0.23, 1, 0.32, 1), background-color 200ms ease',
        }}
      >
        <div className="max-w-[740px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo + contextual page title */}
          <div className="flex items-baseline gap-0 min-w-0 overflow-hidden">
            {(() => {
              const isHomepage = pathname === `/${lang}` || pathname === `/${lang}/` || pathname === `/${lang}/v2` || pathname === `/${lang}/v2/`
              return (
                <>
                  <Link
                    href={`/${lang}`}
                    className="relative z-10 font-semibold text-base tracking-[-0.01em] text-gray-900 whitespace-nowrap hover:opacity-70 flex-shrink-0 py-2 -my-2 pr-1"
                    style={{
                      opacity: (isHomepage && !showPageTitle && !isMobileMenuOpen) ? 0 : 1,
                      transition: 'opacity 250ms ease',
                      pointerEvents: (isHomepage && !showPageTitle && !isMobileMenuOpen) ? 'none' : 'auto',
                    }}
                  >
                    Victor Soussan
                  </Link>

                  {/* Subtitle — visible on scroll OR when menu is open */}
                  <div
                    className="flex items-baseline gap-0 min-w-0 overflow-hidden"
                    style={{
                      opacity: (showPageTitle || isMobileMenuOpen) ? 1 : 0,
                      transition: 'opacity 250ms ease',
                      maxWidth: (showPageTitle || isMobileMenuOpen) ? 'min(300px, calc(100vw - 220px))' : 0,
                      pointerEvents: (showPageTitle || isMobileMenuOpen) ? 'auto' : 'none',
                    }}
                  >
                    <span className="text-gray-300 mx-2 text-[13px] flex-shrink-0">
                      {(isHomepage || isMobileMenuOpen) ? '\u00b7' : '/'}
                    </span>
                    <span className="text-[13px] font-medium text-gray-500 truncate">
                      {isMobileMenuOpen && !showPageTitle ? 'Lead Product Designer' : pageTitle}
                    </span>
                  </div>
                </>
              )
            })()}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1.5">
            {/* Lang switcher — always visible, gets pushed left when Contact appears */}
            <Link
              href={`/${otherLang}${pathname.replace(`/${lang}`, '')}`}
              className="px-2.5 py-1.5 text-sm font-medium rounded-full text-gray-400 hover:text-gray-900 hover:bg-black/[0.04]"
              style={{ transition: 'background-color 150ms ease, color 150ms ease' }}
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </Link>

            {/* Contact — slides out from the X button, pushing FR/EN left */}
            <AnimatePresence initial={false}>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{
                    opacity: 1,
                    width: 'auto',
                    transition: {
                      width: { duration: 0.25, ease: EASE_OUT },
                      opacity: { duration: 0.15, delay: 0.08 },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    width: 0,
                    transition: {
                      opacity: { duration: 0.1 },
                      width: { duration: 0.18, ease: EASE_OUT, delay: 0.06 },
                    },
                  }}
                  style={{ overflow: 'hidden', flexShrink: 0 }}
                >
                  <Link
                    href={`/${lang}/contact`}
                    onClick={closeMenu}
                    className="inline-flex px-3.5 py-1.5 text-sm font-medium rounded-full bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.97] whitespace-nowrap"
                    style={{ transition: 'background-color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
                  >
                    Contact
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              className="relative p-2 rounded-full hover:bg-black/[0.04] active:scale-[0.95]"
              style={{ transition: 'background-color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
              onClick={toggleMenu}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {/* Fixed-size container so button never reflows during icon transition */}
              <div style={{ position: 'relative', width: 20, height: 20 }}>
                <AnimatePresence initial={false}>
                  {isMobileMenuOpen ? (
                    <motion.span
                      key="x"
                      initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                      transition={{ duration: 0.15, ease: EASE_OUT }}
                      style={{ display: 'flex', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center' }}
                    >
                      <X size={20} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
                      transition={{ duration: 0.15, ease: EASE_OUT }}
                      style={{ display: 'flex', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center' }}
                    >
                      <MenuIcon size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu overlay — shared for all breakpoints */}
      <AnimatePresence onExitComplete={() => setIsMenuMounted(false)}>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-40 bg-black/20"
              onClick={closeMenu}
            />

            {/* Menu panel — drops from header, same content width */}
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`fixed left-0 right-0 z-50 ${
                isDarkNav
                  ? 'bg-[#1D1D1F]'
                  : 'bg-[#FDFDFC] border-b border-gray-100'
              }`}
              style={{ top: isScrolled ? 56 : 64 }}
            >
              <div className="max-w-[740px] mx-auto px-6 py-4">
                <div className="flex flex-col">
                  {MENU_ITEMS.map((item, index) => {
                    const active = isActive(item.route)
                    const label = item.labelKey
                      ? content[item.labelKey]
                      : lang === 'en' ? 'Home' : 'Accueil'

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: {
                            duration: 0.15,
                            delay: 0.05 + index * 0.02,
                          },
                        }}
                        exit={{
                          opacity: 0,
                          transition: { duration: 0.08 },
                        }}
                      >
                        <Link
                          href={`/${lang}/${item.route}`}
                          onClick={closeMenu}
                          className={`-mx-3 px-3 py-2.5 rounded-lg transition-colors duration-150 block ${
                            active
                              ? (isDarkNav ? 'text-white font-medium' : 'text-gray-900 font-medium')
                              : (isDarkNav ? 'text-gray-400 hover:text-white hover:bg-white/[0.08]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100')
                          }`}
                        >
                          <span className="text-sm">{label}</span>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
