'use client'

import { LinkedinLogo, Envelope } from '@phosphor-icons/react'

interface AuthorContactCardProps {
  lang: 'en' | 'fr'
  isDark?: boolean
  /** Contextual message. Falls back to a generic collaboration prompt. */
  message?: string
}

/**
 * AuthorContactCard — Design system component.
 * Reusable author card with contact CTAs (LinkedIn + Email).
 * Used at the bottom of case studies, guides, and articles.
 */
export default function AuthorContactCard({ lang, isDark = false, message }: AuthorContactCardProps) {
  const defaultMessage = lang === 'fr'
    ? 'Envie de collaborer sur un projet similaire ? Discutons.'
    : 'Interested in working on a similar project? Let\'s talk.'

  return (
    <div className={`p-6 md:p-8 rounded-2xl border ${
      isDark ? 'bg-[#1D1D1F] border-white/5' : 'bg-white border-gray-100'
    }`}>
      <div className="flex items-start gap-4">
        <img
          src="/images/photos victor/image_victor_home.png"
          alt="Victor Soussan"
          className="w-14 h-14 rounded-full object-cover flex-shrink-0"
        />
        <div>
          <p className={`font-bold mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Victor Soussan
          </p>
          <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Lead Product Designer
          </p>
          <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {message || defaultMessage}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.linkedin.com/in/victorsoussan/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.97] ring-1 ring-black shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              style={{ transition: 'background-color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
            >
              <LinkedinLogo size={16} weight="bold" /> LinkedIn
            </a>
            <a
              href="mailto:victor@victorsoussan.fr"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium active:scale-[0.97] ${
                isDark
                  ? 'bg-white/5 text-white hover:bg-white/10 ring-1 ring-white/10'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200 ring-1 ring-black/[0.06]'
              }`}
              style={{ transition: 'background-color 200ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
            >
              <Envelope size={16} /> Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
