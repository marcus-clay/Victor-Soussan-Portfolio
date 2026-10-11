'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

// A template remounts on every navigation, so the content of each new page rises in
// (CSS animation: opacity + 8px, 380ms). The homepage hero runs its own staggered
// entrance, so it is left alone.
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isHome = /^\/(en|fr)\/?$/.test(pathname)
  return <div className={isHome ? undefined : 'page-in'}>{children}</div>
}
