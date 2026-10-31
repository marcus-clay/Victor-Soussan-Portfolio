import Link from 'next/link'
import { TRANSLATIONS } from '@/data/translations'

interface AuthorContactCardProps {
  lang: 'en' | 'fr'
  /** Contextual message. Falls back to a generic collaboration prompt. */
  message?: string
}

/**
 * Author block that closes case studies, articles and guides, after the related content.
 * Same rhythm as RelatedContent (hairline, then pt-12 md:pt-16 and pb-16 md:pb-24), no card
 * around it, one primary action in a black button; LinkedIn stays a quiet text link.
 */
export default function AuthorContactCard({ lang, message }: AuthorContactCardProps) {
  const defaultMessage = lang === 'fr'
    ? 'Envie de collaborer sur un projet similaire ? Discutons.'
    : 'Interested in working on a similar project? Let\'s talk.'

  return (
    <section aria-label="Victor Soussan" className="border-t border-gray-100">
      <div className="wrap pt-12 md:pt-16 pb-16 md:pb-24">
        <div className="flex max-w-[680px] items-start gap-4">
          <img
            src="/images/photos victor/image_victor_home.webp"
            alt=""
            width={56}
            height={56}
            loading="lazy"
            className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
          />
          <div>
            <p className="text-base font-medium text-gray-900">Victor Soussan</p>
            <p className="text-sm text-gray-500">Lead Product Designer</p>
            <p className="mt-4 max-w-[56ch] text-sm text-gray-600">{message || defaultMessage}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link
                href={`/${lang}/contact`}
                className="btn-dark inline-flex min-h-11 items-center rounded-full bg-gray-900 px-5 text-sm font-medium text-white hover:bg-black active:scale-[0.97]"
                style={{ transition: 'background-color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
              >
                {TRANSLATIONS[lang].nav.contact}
              </Link>
              <a
                href="https://www.linkedin.com/in/victorsoussan-product-design/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-sm text-gray-600 transition-colors duration-150 hover:text-gray-500"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
