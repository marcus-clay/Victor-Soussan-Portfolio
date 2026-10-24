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

const MENU_ITEMS = [
  { id: 'home', route: '', labelKey: null },
  { id: 'projets', route: 'projets', labelKey: 'projects' as const },
  { id: 'approche', route: 'approche', labelKey: 'approach' as const },
  { id: 'testimonials', route: 'testimonials', labelKey: 'testimonials' as const },
  { id: 'about', route: 'about', labelKey: 'bio' as const },
  { id: 'ressources', route: 'ressources', labelKey: 'blog' as const },
  { id: 'contact', route: 'contact', labelKey: 'contact' as const },
]

// The four entries kept in the bar from md up. Everything else lives in the menu.
const PRIMARY_IDS = ['projets', 'approche', 'about'] as const

export default function Nav({ lang }: { lang: Lang }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Stays true while menu is open OR animating out — drives nav background
  // to avoid backdrop-blur clipping the still-visible panel during exit
  const [isMenuMounted, setIsMenuMounted] = useState(false)
  // True once the menu has been painted closed and may go to open: the CSS transitions need
  // a painted starting state (see openMenu)
  const [entered, setEntered] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkNav, setIsDarkNav] = useState(false)
  const [pageTitle, setPageTitle] = useState<string | null>(null)
  const [showPageTitle, setShowPageTitle] = useState(false)
  const pathname = usePathname()
  const content = TRANSLATIONS[lang].nav
  const otherLang = lang === 'en' ? 'fr' : 'en'

  // The router already puts a new page at the top, instantly. Scrolling here as well ran
  // through the root `scroll-behavior: smooth` and made every page glide up after it loaded.
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setEntered(false)
    // isMenuMounted is cleared when the panel has finished leaving (handlePanelTransitionEnd)
  }, [pathname])

  const openMenu = () => {
    setIsMobileMenuOpen(true)
    // Still on screen (reopened while leaving): reverse at once, from where it is. Otherwise mount it
    // closed and switch to open two frames later, so the browser has a closed state to transition from.
    if (isMenuMounted) setEntered(true)
    else setIsMenuMounted(true)
  }
  const closeMenu = () => { setIsMobileMenuOpen(false); setEntered(false) }

  useEffect(() => {
    if (!isMobileMenuOpen || entered) return
    let id = requestAnimationFrame(() => { id = requestAnimationFrame(() => setEntered(true)) })
    return () => cancelAnimationFrame(id)
  }, [isMobileMenuOpen, entered])

  // Unmount when the panel has finished leaving; the timer is the safety net if no event comes
  const handlePanelTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || isMobileMenuOpen) return
    if (e.propertyName === 'transform' || e.propertyName === 'opacity') setIsMenuMounted(false)
  }
  useEffect(() => {
    if (isMobileMenuOpen || !isMenuMounted) return
    const id = setTimeout(() => setIsMenuMounted(false), 600)
    return () => clearTimeout(id)
  }, [isMobileMenuOpen, isMenuMounted])
  const toggleMenu = () => { isMobileMenuOpen ? closeMenu() : openMenu() }

  // Track scroll for header height transition + update CSS variable.
  // Two thresholds (hysteresis) and one update per frame: the header never flips back and
  // forth when the scroll position sits right on the limit.
  useEffect(() => {
    let scrolled = window.scrollY > 24
    let frame = 0
    const apply = (value: boolean) => {
      setIsScrolled(value)
      document.documentElement.style.setProperty('--nav-height', value ? 'var(--nav-height-scrolled)' : 'var(--nav-height-top)')
    }
    const handleScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const y = window.scrollY
        const next = scrolled ? y > 6 : y > 24
        if (next !== scrolled) {
          scrolled = next
          apply(next)
        }
      })
    }
    apply(scrolled)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frame) cancelAnimationFrame(frame)
    }
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
      // On the homepage the identity (name + role) lives in the hero, so the header
      // takes over only once the whole hero has left the viewport, not just the h1.
      const target: Element = isHomepage ? (h1.closest('header') ?? h1) : h1
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
      observer.observe(target)

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
        aria-label={lang === 'fr' ? 'Navigation principale' : 'Main navigation'}
        className={`fixed top-0 w-full z-50 backdrop-blur-xl [transform:translateZ(0)] ${
          isMenuMounted
            ? 'bg-[#FDFDFC]'
            : isScrolled ? 'bg-[#FDFDFC]/80' : 'bg-transparent'
        }`}
        style={{
          height: 'var(--nav-height)',
          // Solid at once when the menu opens, so the bar and the panel read as one surface
          transition: `height 250ms cubic-bezier(0.23, 1, 0.32, 1), background-color ${isMenuMounted ? '0ms' : '200ms'} ease`,
        }}
      >
        <div className="wrap h-full flex items-center justify-between">
          {/* Logo + contextual page title */}
          <div className="flex items-baseline gap-0 min-w-0 flex-1 overflow-hidden">
            {(() => {
              const isHomepage = pathname === `/${lang}` || pathname === `/${lang}/` || pathname === `/${lang}/v2` || pathname === `/${lang}/v2/`
              return (
                <>
                  <Link
                    href={`/${lang}`}
                    className="relative z-10 font-semibold text-base tracking-[-0.01em] text-gray-900 hover:text-gray-600 active:text-gray-500 whitespace-nowrap flex-shrink-0 py-2 -my-2 pr-0 sm:pr-1"
                    style={{
                      opacity: (isHomepage && !showPageTitle && !isMobileMenuOpen) ? 0 : 1,
                      transform: (isHomepage && !showPageTitle && !isMobileMenuOpen) ? 'translateY(4px)' : 'translateY(0)',
                      // Colour is listed here because the inline transition replaces any class-level one
                      transition: 'opacity 250ms ease, transform 350ms cubic-bezier(0.23, 1, 0.32, 1), color 150ms ease',
                      pointerEvents: (isHomepage && !showPageTitle && !isMobileMenuOpen) ? 'none' : 'auto',
                    }}
                  >
                    Victor Soussan
                  </Link>

                  {/* Subtitle — visible on scroll OR when menu is open */}
                  <div
                    className="hidden sm:flex items-baseline gap-0 min-w-0 overflow-hidden"
                    style={{
                      opacity: (showPageTitle || isMobileMenuOpen) ? 1 : 0,
                      transform: (showPageTitle || isMobileMenuOpen) ? 'translateY(0)' : 'translateY(4px)',
                      // The role follows the name by a beat, so the two read as one arrival
                      transition: `opacity 250ms ease ${(showPageTitle || isMobileMenuOpen) ? '70ms' : '0ms'}, transform 350ms cubic-bezier(0.23, 1, 0.32, 1) ${(showPageTitle || isMobileMenuOpen) ? '70ms' : '0ms'}`,
                      maxWidth: (showPageTitle || isMobileMenuOpen) ? '100%' : 0,
                      pointerEvents: (showPageTitle || isMobileMenuOpen) ? 'auto' : 'none',
                    }}
                  >
                    <span className="text-gray-300 mx-1.5 sm:mx-2 text-xs max-[400px]:text-micro flex-shrink-0">
                      {(isHomepage || isMobileMenuOpen) ? '\u00b7' : '/'}
                    </span>
                    <span className="text-xs max-[400px]:text-micro font-medium text-gray-500 truncate">
                      {isMobileMenuOpen && !showPageTitle ? 'Lead Product Designer' : pageTitle}
                    </span>
                  </div>
                </>
              )
            })()}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-0.5 sm:gap-1.5 flex-shrink-0">
            {/* Main entries, from md up */}
            <ul className="hidden md:flex items-center gap-0.5 mr-2 lg:mr-4">
              {MENU_ITEMS.filter((item) => (PRIMARY_IDS as readonly string[]).includes(item.id)).map((item) => {
                const active = isActive(item.route)
                return (
                  <li key={item.id}>
                    <Link
                      href={`/${lang}/${item.route}`}
                      aria-current={active ? 'page' : undefined}
                      className={`inline-flex min-h-10 items-center px-3.5 text-sm rounded-full hover:bg-black/[0.04] active:scale-[0.97] ${
                        active ? 'font-semibold text-gray-900' : 'font-medium text-gray-600 hover:text-gray-900'
                      }`}
                      style={{ transition: 'background-color 150ms ease, color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
                    >
                      {item.labelKey ? content[item.labelKey] : ''}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Lang switcher */}
            <Link
              href={`/${otherLang}${pathname.replace(`/${lang}`, '')}`}
              className="px-2 sm:px-2.5 py-1.5 text-sm font-medium rounded-full text-gray-500 hover:text-gray-900 hover:bg-black/[0.04] active:scale-[0.96]"
              style={{ transition: 'background-color 150ms ease, color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </Link>

            {/* Contact: always in the bar, the one filled button of the header */}
            <Link
              href={`/${lang}/contact`}
              onClick={closeMenu}
              className="nav-cta ml-0.5 sm:ml-1 inline-flex min-h-10 items-center px-3.5 sm:px-4 text-sm font-medium rounded-full bg-gray-900 text-white hover:bg-black active:scale-[0.97] whitespace-nowrap"
              style={{ transition: 'background-color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
            >
              {content.contact}
            </Link>

            <button
              className="relative p-2 rounded-full hover:bg-black/[0.04] active:scale-[0.95]"
              style={{ transition: 'background-color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
              onClick={toggleMenu}
              aria-label={lang === 'fr' ? (isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu') : isMobileMenuOpen ? 'Close menu' : 'Open menu'}
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

      {/* Menu overlay, shared for all breakpoints. Scrim, panel and rows are CSS transitions between
          two states (.menu-* in globals.css), not Motion animations: the resting style is the open
          state, so no frame can show a half-written value when a transition ends. */}
      {isMenuMounted && (
        <>
          <div
            data-state={entered ? 'open' : 'closed'}
            className="menu-scrim fixed inset-0 z-40 bg-black/20"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Window under the bar: it clips the panel while it slides down from behind the bar, and
              leaves 16px below for the small bounce when the panel arrives */}
          <div
            className="fixed inset-x-0 z-50 overflow-hidden pb-4 pointer-events-none"
            style={{ top: 'var(--nav-height)', transition: 'top 250ms cubic-bezier(0.23, 1, 0.32, 1)' }}
          >
            {/* The panel reaches 16px above the window (-mt-4 / pt-4), so the bounce never opens a gap under the bar */}
            <div
              data-state={entered ? 'open' : 'closed'}
              onTransitionEnd={handlePanelTransitionEnd}
              className={`menu-panel pointer-events-auto -mt-4 pt-4 max-h-[calc(100svh-var(--nav-height)+1rem)] overflow-y-auto overscroll-contain ${
                isDarkNav
                  ? 'bg-[#1D1D1F]'
                  : 'bg-[#FDFDFC] border-b border-gray-100'
              }`}
            >
              <div className="wrap py-5 md:py-6">
                <div className="flex flex-col">
                  {MENU_ITEMS.map((item, index) => {
                    const active = isActive(item.route)
                    const label = item.labelKey
                      ? content[item.labelKey]
                      : lang === 'en' ? 'Home' : 'Accueil'

                    return (
                      <div
                        key={item.id}
                        data-state={entered ? 'open' : 'closed'}
                        className="menu-row"
                        style={{ '--i': index } as React.CSSProperties}
                      >
                        <Link
                            href={`/${lang}/${item.route}`}
                            onClick={closeMenu}
                            aria-current={active ? 'page' : undefined}
                            className={`-mx-3 px-3 py-3.5 rounded-xl transition-colors duration-150 flex items-center gap-4 ${
                              active
                                ? (isDarkNav ? 'text-white font-semibold bg-white/[0.08] active:bg-white/[0.12]' : 'text-gray-900 font-semibold bg-black/[0.04] active:bg-black/[0.07]')
                                : (isDarkNav ? 'text-gray-400 font-medium hover:text-white hover:bg-white/[0.08] active:bg-white/[0.12]' : 'text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200/70')
                            }`}
                          >
                            {/* Dot like the table of contents: a fixed 8px slot on every row, the dot grows
                                inside it, so the labels stay aligned whichever row is active */}
                            <span aria-hidden="true" className="relative flex-shrink-0 w-2 h-2">
                              <span
                                className={`absolute inset-0 rounded-full transition-transform duration-200 ease-out ${
                                  isDarkNav ? 'bg-white' : 'bg-gray-900'
                                } ${active ? 'scale-100' : 'scale-0'}`}
                              />
                            </span>
                            <span className="text-lg">{label}</span>
                          </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
