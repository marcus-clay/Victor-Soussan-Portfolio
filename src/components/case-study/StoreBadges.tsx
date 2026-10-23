// Official App Store and Google Play badges, with the line that says since when the app is out.
// Badge artwork comes from Apple and Google as provided (Google's padding trimmed so both badges share a height).

import React from 'react'
import { track } from '@/lib/analytics'

export interface StoreLinks {
  apple: string
  google: string
}

interface StoreBadgesProps {
  lang: 'en' | 'fr'
  stores: StoreLinks
  /** Line shown next to the badges, e.g. "Disponible depuis le 15 juillet 2026" */
  label: string
  /** App icon shown before the line */
  icon?: string
  /** Accessible names of the two links */
  appleLabel: string
  googleLabel: string
  /** Name used in the analytics event, to tell where the badges were clicked */
  source: string
  className?: string
}

const BADGE_HEIGHT = 44

// Width / height of each badge file, so the layout is reserved before the image loads.
const BADGES = {
  apple: { fr: { src: '/images/stores/app-store-fr.svg', ratio: 126.50751 / 40 }, en: { src: '/images/stores/app-store-en.svg', ratio: 119.66407 / 40 } },
  google: { fr: { src: '/images/stores/google-play-fr.webp', ratio: 646 / 192 }, en: { src: '/images/stores/google-play-en.webp', ratio: 564 / 168 } },
} as const

const LINK_CLASS =
  'block rounded-lg active:scale-[0.97] transition-[transform,opacity] duration-150 ease-out [@media(hover:hover)]:hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'

export default function StoreBadges({ lang, stores, label, icon, appleLabel, googleLabel, source, className = '' }: StoreBadgesProps) {
  const items = [
    { id: 'app_store', href: stores.apple, name: appleLabel, badge: BADGES.apple[lang] },
    { id: 'google_play', href: stores.google, name: googleLabel, badge: BADGES.google[lang] },
  ]

  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 ${className}`}>
      <div className="flex items-center gap-3">
        {icon && <img src={icon} alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-[22%] shadow-[0_0_0_1px_rgba(17,17,17,0.06)]" />}
        <p className="text-sm text-gray-600">{label}</p>
      </div>
      <ul className="flex flex-wrap items-center gap-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_CLASS}
              onClick={() => track('store_badge_click', { store: item.id, source })}
            >
              <img
                src={item.badge.src}
                alt={item.name}
                width={Math.round(BADGE_HEIGHT * item.badge.ratio)}
                height={BADGE_HEIGHT}
                loading="lazy"
                className="block h-11 w-auto"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
