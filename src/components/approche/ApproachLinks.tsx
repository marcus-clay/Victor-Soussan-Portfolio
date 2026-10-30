import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { HERO, type Language } from '@/data/approcheData'

// The links of the Approach page: an underlined text link with its arrow, and the one primary action
// (the same pill at the top and at the bottom of the page).

const LINK_PRESS = 'transition-[color,transform] duration-150 ease-out active:scale-[0.97]'

export const TEXT_LINK = `group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 [@media(hover:hover)]:hover:decoration-gray-900 ${LINK_PRESS}`

const PILL =
  'inline-flex min-h-11 items-center gap-2 rounded-full bg-gray-900 px-5 text-sm font-medium text-white shadow-sm [@media(hover:hover)]:hover:bg-black [@media(hover:hover)]:hover:shadow-md active:scale-[0.97] transition-[background-color,box-shadow,transform] duration-150 ease-out'

export function CtaButton({ lang }: { lang: Language }) {
  const { cta } = HERO[lang]
  return (
    <Link href={`/${lang}${cta.href}`} className={PILL}>
      {cta.label}
      <ArrowRight size={14} weight="bold" aria-hidden="true" />
    </Link>
  )
}

export function ArrowLink({ href, children, draggable }: { href: string; children: ReactNode; draggable?: boolean }) {
  return (
    <Link href={href} className={TEXT_LINK} draggable={draggable}>
      {children}
      <ArrowRight
        size={12}
        weight="bold"
        aria-hidden="true"
        className="transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:translate-x-0.5"
      />
    </Link>
  )
}
