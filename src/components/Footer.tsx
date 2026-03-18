'use client'

import Link from 'next/link'
import {
  LinkedinLogo,
  Envelope as Mail,
  ArrowUpRight,
  Globe,
} from '@phosphor-icons/react'
import { TRANSLATIONS } from '@/data/translations'

type Lang = 'en' | 'fr'

export default function Footer({ lang }: { lang: Lang }) {
  const content = TRANSLATIONS[lang].nav
  const otherLang = lang === 'en' ? 'fr' : 'en'

  return (
    <footer className="py-16 px-6 md:px-10 border-t bg-white border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-bold text-lg text-gray-900">
                Victor Soussan
              </span>
            </div>
            <p className="text-sm mb-4 max-w-sm text-gray-600">
              {lang === 'en'
                ? 'Lead Product Designer. Strategy, user research and product design for teams building enterprise tools and digital services.'
                : 'Lead Product Designer. Strategie, recherche utilisateur et design produit pour les equipes qui construisent des outils metier et des services numeriques.'}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/in/victorsoussan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinLogo size={20} />
              </a>
              <a
                href="mailto:victorsoussan@gmail.com"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link href={`/${lang}/work`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {content.projects}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {content.bio}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {content.services}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/testimonials`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {content.testimonials}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/consulting`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Column */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Condamine Studio</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.condamine.studio/apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center"
                >
                  Condamine Apps
                  <ArrowUpRight size={12} className="ml-1" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.condamine.studio/agents-prompts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center"
                >
                  Agents & Prompts
                  <ArrowUpRight size={12} className="ml-1" />
                </a>
              </li>
              <li>
                <Link
                  href={`/${lang}/visual-archive`}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {lang === 'en' ? 'Gallery' : 'Galerie'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/signals`}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:victorsoussan@gmail.com" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  victorsoussan@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+33615989400" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  +33 6 15 98 94 00
                </a>
              </li>
              <li>
                <span className="text-sm text-gray-600">Paris, France</span>
              </li>
              <li>
                <a
                  href="https://calendar.app.google/Zyp3tRyA2M9QByun6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#2D5CF3] hover:text-[#2450d9] transition-colors"
                >
                  {lang === 'en' ? 'Book a call' : 'Reserver un appel'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
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
