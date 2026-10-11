import type { Metadata } from 'next'
import { Public_Sans } from 'next/font/google'
import './globals.css'

const publicSans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-public-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.victorsoussan.fr'),
  title: {
    default: 'Victor Soussan | Lead Product Designer',
    template: '%s | Victor Soussan',
  },
  description:
    'Lead Product Designer, 15 ans de conception produit. Design systems, interfaces complexes, prototypage assist\u00e9 par IA. SaaS B2B, EdTech, services publics.',
  keywords: [
    'Product Design', 'UX Design', 'UI Design', 'Design System',
    'Design Lead', 'Senior Designer', 'Portfolio', 'Victor Soussan',
    'France', 'Paris', 'Figma', 'Claude Code', 'AI Prototyping',
    'User Research', 'Product Strategy', 'SaaS', 'EdTech',
  ],
  authors: [{ name: 'Victor Soussan' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    siteName: 'Victor Soussan Portfolio',
    title: 'Victor Soussan | Lead Product Designer',
    description:
      'Lead Product Designer, 15 ans de conception produit. Design systems, interfaces complexes, prototypage assist\u00e9 par IA.',
    images: [
      {
        url: '/images/og_victor_soussan.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Victor Soussan | Lead Product Designer',
    description:
      'Lead Product Designer, 15 ans de conception produit. Design systems, interfaces complexes, prototypage assist\u00e9 par IA.',
    images: ['/images/og_victor_soussan.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon-180.png', sizes: '180x180' },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={publicSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              '@id': 'https://www.victorsoussan.fr/#person',
              name: 'Victor Soussan',
              jobTitle: 'Lead Product Designer',
              description: 'Lead Product Designer with 15+ years in tech. Expert in design systems, UX research, and digital transformation.',
              url: 'https://www.victorsoussan.fr',
              image: 'https://www.victorsoussan.fr/images/victor-soussan.webp',
              sameAs: [
                'https://www.linkedin.com/in/victorsoussan',
                'https://github.com/marcus-clay',
                'https://www.condamine.studio',
              ],
              email: 'victor@victorsoussan.fr',
              knowsAbout: [
                'Product Design', 'UX Research', 'Design Systems',
                'AI-Assisted Design', 'Claude Code', 'Figma',
                'SaaS B2B', 'EdTech', 'Public Services',
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
