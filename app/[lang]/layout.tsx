import { LanguageProvider } from '@/providers/LanguageProvider'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import LayoutShell from '@/components/LayoutShell'

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
      <LayoutShell lang={lang} nav={<Nav lang={lang} />} footer={<Footer lang={lang} />}>
        {children}
      </LayoutShell>
    </LanguageProvider>
  )
}
