import type { Metadata } from 'next'
import Link from 'next/link'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = langParam === 'fr' ? 'fr' : 'en'
  return {
    title: 'Contact',
    description: lang === 'fr'
      ? 'Contactez Victor Soussan, Lead Product Designer base a Paris.'
      : 'Get in touch with Victor Soussan, Lead Product Designer based in Paris.',
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/contact`,
      languages: {
        fr: 'https://www.victorsoussan.fr/fr/contact',
        en: 'https://www.victorsoussan.fr/en/contact',
      },
    },
  }
}

type ContactLink = {
  id: string
  href?: string
  label: { en: string; fr: string }
  value: string
  icon: string
  external?: boolean
}

const CONTACT_LINKS: ContactLink[] = [
  {
    id: 'email',
    href: 'mailto:victorsoussan@gmail.com',
    label: { en: 'Email', fr: 'Email' },
    value: 'victorsoussan@gmail.com',
    icon: 'envelope',
  },
  {
    id: 'phone',
    href: 'tel:+33615989400',
    label: { en: 'Phone', fr: 'Telephone' },
    value: '+33 6 15 98 94 00',
    icon: 'phone',
  },
  {
    id: 'linkedin',
    href: 'https://linkedin.com/in/victorsoussan',
    label: { en: 'LinkedIn', fr: 'LinkedIn' },
    value: 'linkedin.com/in/victorsoussan',
    icon: 'linkedin',
    external: true,
  },
  {
    id: 'location',
    label: { en: 'Location', fr: 'Localisation' },
    value: 'Paris, France',
    icon: 'mappin',
  },
]

function ContactIcon({ type }: { type: string }) {
  switch (type) {
    case 'envelope':
      return (
        <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
          <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"/>
        </svg>
      )
    case 'phone':
      return (
        <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
          <path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.75-.55L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z"/>
        </svg>
      )
    case 'linkedin':
      return (
        <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
          <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM112,176V120a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm0-68a12,12,0,1,1,12,12A12,12,0,0,1,112,108ZM88,176V120a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm56,0V140a20,20,0,0,1,40,0v36a8,8,0,0,1-16,0V140a4,4,0,0,0-8,0v36a8,8,0,0,1-16,0Z"/>
        </svg>
      )
    case 'mappin':
      return (
        <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
          <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Zm0-150a40,40,0,1,0,40,40A40,40,0,0,0,128,72Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,136Z"/>
        </svg>
      )
    default:
      return null
  }
}

export default async function ContactPage({ params }: Props) {
  const { lang: langParam } = await params
  const lang = (langParam === 'fr' ? 'fr' : 'en') as 'en' | 'fr'

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#FCFCFD]/80 border-b border-gray-100">
        <div className="w-full pl-6 pr-2.5 h-16 flex items-center justify-between">
          <span className="font-semibold text-lg tracking-[-0.02em] text-gray-900">
            Contact
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
      <main className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-[-0.02em] text-gray-900">
            {lang === 'fr' ? 'Entrons en contact' : 'Get in touch'}
          </h1>
          <p className="mt-3 text-base text-gray-600 leading-relaxed">
            {lang === 'fr'
              ? 'Disponible pour des missions de consulting en product design et UX.'
              : 'Available for consulting engagements in product design and UX.'}
          </p>
        </div>

        {/* Contact links */}
        <div className="space-y-4 mb-12">
          {CONTACT_LINKS.map((item) => {
            const content = (
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
                  <ContactIcon type={item.icon} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {item.label[lang]}
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate">{item.value}</p>
                </div>
                {(item.href || item.external) && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 flex-shrink-0">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </div>
            )

            if (!item.href) {
              return <div key={item.id}>{content}</div>
            }

            return (
              <a
                key={item.id}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                {content}
              </a>
            )
          })}
        </div>

        {/* Book a call CTA */}
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-900 tracking-[-0.02em]">
            {lang === 'fr' ? 'Planifier un appel' : 'Book a call'}
          </h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
            {lang === 'fr'
              ? '30 minutes pour discuter de votre projet et voir comment je peux vous aider.'
              : '30 minutes to discuss your project and how I can help.'}
          </p>
          <a
            href="https://calendly.com/victorsoussan/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-[#2D5CF3] text-white font-medium shadow-sm hover:bg-[#2450d9] hover:shadow-md transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
              <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132Zm-88,40a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z"/>
            </svg>
            {lang === 'fr' ? 'Reserver un creneau' : 'Book a 30-min call'}
          </a>
        </div>
      </main>
    </div>
  )
}
