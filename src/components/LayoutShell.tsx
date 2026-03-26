'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

// Routes that use their own full-screen layout (no Nav/Footer)
const BARE_ROUTES = ['/presentation', '/quote']

export default function LayoutShell({
  lang,
  nav,
  footer,
  children,
}: {
  lang: string
  nav: ReactNode
  footer: ReactNode
  children: ReactNode
}) {
  const pathname = usePathname()
  const isBare = BARE_ROUTES.some((route) => pathname.includes(route))

  if (isBare) {
    return <>{children}</>
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      {nav}
      <main id="main-content" style={{ paddingTop: 'var(--nav-height, 72px)', transition: 'padding-top 250ms cubic-bezier(0.23, 1, 0.32, 1)' }}>
        {children}
      </main>
      {footer}
    </>
  )
}
