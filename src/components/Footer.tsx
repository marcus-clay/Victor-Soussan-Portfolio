'use client'

import Link from 'next/link'
import {
  LinkedinLogo,
  Envelope as Mail,
  Globe,
} from '@phosphor-icons/react'
import { TRANSLATIONS } from '@/data/translations'

type Lang = 'en' | 'fr'

export default function Footer({ lang }: { lang: Lang }) {
  const content = TRANSLATIONS[lang].nav
  const otherLang = lang === 'en' ? 'fr' : 'en'

  return (
    <footer id="site-footer" className="py-16 border-t bg-[#FDFDFC] border-gray-100 transition-colors duration-200">
      <div className="max-w-[740px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 mb-12">
          {/* Brand Column */}
          <div className="flex-1">
            <span className="font-semibold text-base tracking-[-0.01em] text-gray-900 block mb-1">
              Victor Soussan
            </span>
            <p className="text-sm text-gray-500 mb-4">
              Lead Product Designer
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/in/victorsoussan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 transition-colors duration-150"
                aria-label="LinkedIn"
              >
                <LinkedinLogo size={18} />
              </a>
              <a
                href="mailto:victorsoussan@gmail.com"
                className="text-gray-400 hover:text-gray-900 transition-colors duration-150"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${lang}/projets`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  {content.projects}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  {content.bio}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  {content.services}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/ressources`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  {content.blog}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:victorsoussan@gmail.com" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  victorsoussan@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+33615989400" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  +33 6 15 98 94 00
                </a>
              </li>
              <li>
                <span className="text-sm text-gray-500">Paris, France</span>
              </li>
              <li>
                <a
                  href="https://calendar.app.google/Zyp3tRyA2M9QByun6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150 underline underline-offset-4 decoration-gray-300"
                >
                  {lang === 'en' ? 'Book a call' : 'Réserver un appel'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Victor Soussan. {lang === 'en' ? 'All rights reserved.' : 'Tous droits reserves.'}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href={`/${otherLang}`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              <Globe size={16} />
              {lang === 'en' ? 'Francais' : 'English'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
