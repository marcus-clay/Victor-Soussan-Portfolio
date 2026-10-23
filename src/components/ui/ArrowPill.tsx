import { ArrowRight } from '@phosphor-icons/react/ssr'

/**
 * White arrow pill shown in the corner of a linked card on hover (same one as the cards of the
 * homepage filmstrip): 200ms, ease-out, from 90% scale and transparent to full. Hover only
 * (devices that can hover), and also on keyboard focus, so touch screens never see it stuck.
 *
 * Use: the card is the link (`group relative`), the pill sits inside the media frame.
 *
 *   <Link href={...} className="group relative block ...">
 *     <img ... />
 *     <ArrowPill />
 *   </Link>
 *
 * `size="md"` is the filmstrip size (48px, 32px from the corner); `size="sm"` is for grid cards
 * (40px, 16px from the corner). The pill never takes pointer events.
 */
export default function ArrowPill({ size = 'md', className = '' }: { size?: 'sm' | 'md'; className?: string }) {
  const box = size === 'md' ? 'right-8 top-8 h-12 w-12' : 'right-4 top-4 h-10 w-10'
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-[3] ${box} hidden items-center justify-center rounded-full bg-white text-gray-900 shadow-sm ring-1 ring-black/[0.06] opacity-0 scale-90 transition-[opacity,transform] duration-200 ease-out [@media(hover:hover)]:flex group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100 ${className}`}
    >
      <ArrowRight size={size === 'md' ? 20 : 18} weight="regular" />
    </span>
  )
}
