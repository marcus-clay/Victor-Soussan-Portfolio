import { LanguageProvider } from '@/providers/LanguageProvider'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }]
}

type Lang = 'en' | 'fr'

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: langParam } = await params
  const lang = (langParam === 'fr' ? 'fr' : 'en') as Lang

  return (
    <LanguageProvider lang={lang}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      <Nav lang={lang} />
      <main id="main-content" className="pt-16">
        {children}
      </main>
      <Footer lang={lang} />
    </LanguageProvider>
  )
}
