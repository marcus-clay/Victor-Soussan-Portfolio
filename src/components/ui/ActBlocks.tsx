import type { ReactNode } from 'react'
import Reveal from '@/components/ui/Reveal'

/**
 * Small pieces shared by the numbered pages (Approach, About): the intermediate title inside an
 * act, the space between blocks, and the disclosure pill that keeps detail one level down.
 */

/** Blocks of an act are separated by the same space */
export const BLOCK = 'mt-12 md:mt-16'

/** Intermediate title inside an act: the same h3 everywhere, so blocks read as the same kind of thing */
export function SubTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <Reveal as="h3" className={`mb-4 text-title-3 text-gray-900 md:mb-5 ${className}`}>
      {children}
    </Reveal>
  )
}

/** Summary first, detail one level down: the pill opens a <details>, its content fades in (.disclosure-body) */
export function Disclosure({
  open,
  close,
  className = '',
  children,
}: {
  open: string
  close: string
  className?: string
  children: ReactNode
}) {
  return (
    <details className={`group ${className}`}>
      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center rounded-full border border-gray-200 px-5 text-sm font-medium text-gray-900 transition-[color,border-color,transform] duration-150 ease-out active:scale-[0.97] [@media(hover:hover)]:hover:border-gray-300 [@media(hover:hover)]:hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 [&::-webkit-details-marker]:hidden">
        <span className="group-open:hidden">{open}</span>
        <span className="hidden group-open:inline">{close}</span>
      </summary>
      {children}
    </details>
  )
}
