import type { Metadata } from 'next'
import { getTestimonials } from '@/data/testimonialsData'
import Link from 'next/link'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = langParam === 'fr' ? 'fr' : 'en'
  return {
    title: lang === 'fr' ? 'Temoignages' : 'Testimonials',
    description: lang === 'fr'
      ? 'Ce que disent les collaborateurs, clients et partenaires de Victor Soussan.'
      : 'What collaborators, clients and partners say about Victor Soussan.',
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/testimonials`,
      languages: {
        fr: 'https://www.victorsoussan.fr/fr/testimonials',
        en: 'https://www.victorsoussan.fr/en/testimonials',
      },
    },
  }
}

export default async function TestimonialsPage({ params }: Props) {
  const { lang: langParam } = await params
  const lang = (langParam === 'fr' ? 'fr' : 'en') as 'en' | 'fr'
  const testimonials = getTestimonials(lang)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#FCFCFD]/80 border-b border-gray-100">
        <div className="w-full pl-6 pr-2.5 h-16 flex items-center justify-between">
          <span className="font-semibold text-lg tracking-[-0.02em] text-gray-900">
            {lang === 'fr' ? 'Temoignages' : 'Testimonials'}
          </span>
          <Link
            href={`/${lang}`}
            className="relative p-3 rounded-full transition-colors hover:bg-gray-100 before:absolute before:inset-[-12px] before:content-['']"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-[-0.02em] text-gray-900">
            {lang === 'fr' ? 'Temoignages' : 'Testimonials'}
          </h1>
          <p className="mt-3 text-base text-gray-600 leading-relaxed max-w-2xl">
            {lang === 'fr'
              ? 'Ce que disent les personnes avec lesquelles j\'ai travaille.'
              : 'What the people I have worked with say.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <blockquote className="text-sm text-gray-700 leading-relaxed mb-5">
                &ldquo;{t.content}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-500">
                  {t.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900 truncate">{t.author}</span>
                    {t.linkedin && (
                      <a
                        href={t.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0A66C2] hover:text-[#004182] transition-colors flex-shrink-0"
                        aria-label={`${t.author} LinkedIn`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{t.role}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{t.date}</span>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
