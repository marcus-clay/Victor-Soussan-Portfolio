import type { Metadata, Viewport } from 'next'
import { Public_Sans } from 'next/font/google'
import '../globals.css'
import { LanguageProvider } from '@/providers/LanguageProvider'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import LayoutShell from '@/components/LayoutShell'
import JsonLd from '@/components/JsonLd'
import Analytics from '@/components/analytics/Analytics'
import {
  DEFAULT_OG_IMAGE,
  HTML_LANG,
  OG_LOCALE,
  SITE_NAME,
  SITE_URL,
  personLd,
  toLang,
  websiteLd,
} from '@/lib/seo'

const publicSans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-public-sans',
})

// Only /en and /fr exist. Anything else is a 404 instead of an on-demand render.
export const dynamicParams = false

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }]
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

const DESCRIPTION = {
  fr: 'Lead Product Designer, 15 ans de conception produit. Design systems, interfaces complexes, prototypage assisté par IA. SaaS B2B, EdTech, services publics.',
  en: 'Lead Product Designer, 15+ years of product design. Design systems, complex interfaces, AI-assisted prototyping. B2B SaaS, EdTech, public services.',
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const lang = toLang((await params).lang)
  const other = lang === 'fr' ? 'en' : 'fr'
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'Victor Soussan | Lead Product Designer',
      template: `%s | ${SITE_NAME}`,
    },
    description: DESCRIPTION[lang],
    applicationName: 'Victor Soussan Portfolio',
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    keywords: [
      'Product Design', 'UX Design', 'UI Design', 'Design System',
      'Design Lead', 'Lead Product Designer', 'Portfolio', 'Victor Soussan',
      'France', 'Paris', 'Figma', 'Claude Code', 'AI Prototyping',
      'User Research', 'Product Strategy', 'SaaS', 'EdTech',
    ],
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[lang],
      alternateLocale: [OG_LOCALE[other]],
      siteName: 'Victor Soussan Portfolio',
      title: 'Victor Soussan | Lead Product Designer',
      description: DESCRIPTION[lang],
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Victor Soussan | Lead Product Designer',
      description: DESCRIPTION[lang],
      images: [DEFAULT_OG_IMAGE.url],
    },
    icons: {
      icon: [{ url: '/favicon-32.png', sizes: '32x32', type: 'image/png' }],
      apple: [{ url: '/favicon-180.png', sizes: '180x180' }],
    },
    robots: { index: true, follow: true },
    ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)

  return (
    <html lang={HTML_LANG[lang]} className={publicSans.variable}>
      <body className="font-sans antialiased">
        <JsonLd data={[personLd(lang), websiteLd()]} />
        <LanguageProvider lang={lang}>
          <LayoutShell lang={lang} nav={<Nav lang={lang} />} footer={<Footer lang={lang} />}>
            {children}
          </LayoutShell>
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  )
}
