'use client'

import { createContext, useContext, type ReactNode } from 'react'

type Lang = 'en' | 'fr'

interface LanguageContextType {
  lang: Lang
}

const LanguageContext = createContext<LanguageContextType>({ lang: 'fr' })

export function useLanguage() {
  return useContext(LanguageContext)
}

export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <LanguageContext.Provider value={{ lang }}>
      {children}
    </LanguageContext.Provider>
  )
}
