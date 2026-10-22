'use client'

/** Accessible labels of the video controls, FR and EN, and the language they are read in */

import { useEffect, useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'

export type UiLang = 'en' | 'fr'

export const VIDEO_COPY = {
  en: { play: 'Play video', pause: 'Pause video' },
  fr: { play: 'Lire la vidéo', pause: 'Mettre la vidéo en pause' },
} as const

/** The prop when given, otherwise the document's (`<html lang>`), then the site's */
export function useVideoLang(lang?: UiLang): UiLang {
  const { lang: site } = useLanguage()
  const [fromDocument, setFromDocument] = useState<UiLang | null>(null)
  useEffect(() => {
    if (lang) return
    const html = document.documentElement.lang
    if (html) setFromDocument(html.toLowerCase().startsWith('fr') ? 'fr' : 'en')
  }, [lang])
  return lang ?? fromDocument ?? site
}
