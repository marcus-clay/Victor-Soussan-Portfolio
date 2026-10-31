import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { getTestimonials } from '@/data/testimonialsData'

/**
 * The testimonials live on their own page. Elsewhere (Approach, About) a single line points to them, with
 * their count read from the data, so no page repeats a quote the reader has already seen.
 */
const COPY = {
  fr: { text: (n: number) => `Ce que mes clients, managers et équipes disent de notre collaboration : ${n} témoignages.`, link: 'Lire les témoignages' },
  en: { text: (n: number) => `What my clients, managers and teams say about working together: ${n} testimonials.`, link: 'Read the testimonials' },
} as const

export default function TestimonialsLink({ lang, className = '' }: { lang: 'en' | 'fr'; className?: string }) {
  const copy = COPY[lang]
  return (
    <div className={`flex flex-col items-start gap-1 ${className}`}>
      <p className="max-w-[62ch] text-base text-gray-600">{copy.text(getTestimonials(lang).length)}</p>
      <Link
        href={`/${lang}/testimonials`}
        className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-gray-900 transition-[color,transform] duration-150 ease-out active:scale-[0.97]"
      >
        <span className="link-line">{copy.link}</span>
        <ArrowRight size={12} weight="bold" aria-hidden="true" className="transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}
