import type { Metadata } from 'next'
import { Public_Sans } from 'next/font/google'
import './globals.css'

const publicSans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-public-sans',
})

export const metadata: Metadata = {
  title: 'Page not found | Victor Soussan',
  robots: { index: false, follow: false },
}

/**
 * Rendered for any URL that matches no route. The layout lives in app/[lang], so this page
 * brings its own <html>. proxy.ts sends unprefixed paths to /en or /fr first.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={publicSans.variable}>
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-[#F9F9F9] flex flex-col items-center justify-center px-6">
          <div className="text-center max-w-md">
            <p className="text-micro text-gray-900 mb-4 uppercase tracking-[0.08em]">Page not found / Page introuvable</p>
            <h1 className="text-title-1 text-gray-900 mb-4">404</h1>
            <p className="text-base text-gray-600 mb-10">
              The page you are looking for does not exist or has been moved.
              <br />
              La page demand&eacute;e n&rsquo;existe pas ou a &eacute;t&eacute; d&eacute;plac&eacute;e.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/en"
                className="btn-dark inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-black transition-colors shadow-sm hover:shadow-md"
              >
                Portfolio
              </a>
              <a
                href="/en/projets"
                className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-full font-medium border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                Projects / Projets
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
