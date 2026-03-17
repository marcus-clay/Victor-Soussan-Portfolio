import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.victorsoussan.fr'),
  title: {
    default: 'Victor Soussan | Product Design Lead',
    template: '%s | Victor Soussan',
  },
  description:
    'Senior Product Design Lead avec 15+ ans d\'experience. Specialise en Design System, UX Research, et transformation digitale.',
  keywords: [
    'Product Design', 'UX Design', 'UI Design', 'Design System',
    'Design Lead', 'Senior Designer', 'Portfolio', 'Victor Soussan',
    'France', 'Paris', 'Figma', 'User Research', 'Product Strategy',
  ],
  authors: [{ name: 'Victor Soussan' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    siteName: 'Victor Soussan Portfolio',
    title: 'Victor Soussan | Product Design Lead',
    description:
      'Senior Product Design Lead avec 15+ ans d\'experience. Specialise en Design System, UX Research, et transformation digitale.',
    images: [
      {
        url: '/images/og_victor_soussan.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Victor Soussan | Product Design Lead',
    description:
      'Senior Product Design Lead avec 15+ ans d\'experience. Specialise en Design System, UX Research, et transformation digitale.',
    images: ['/images/og_victor_soussan.webp'],
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
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              '@id': 'https://www.victorsoussan.fr/#person',
              name: 'Victor Soussan',
              jobTitle: 'Product Design Lead',
              description: 'Product Design Lead with 15+ years in tech. Expert in design systems, UX research, and digital transformation.',
              url: 'https://www.victorsoussan.fr',
              image: 'https://www.victorsoussan.fr/images/victor-soussan.webp',
              sameAs: [
                'https://www.linkedin.com/in/victorsoussan',
                'https://github.com/victorsoussan',
                'https://www.collective.work/profile/victor-soussan',
              ],
              email: 'victorsoussan@gmail.com',
              knowsAbout: [
                'Product Design', 'UX Research', 'Design Systems',
                'Digital Transformation', 'AI-Assisted Design',
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
