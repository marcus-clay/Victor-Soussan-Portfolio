import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Vercel handles SSG natively, no need for static export
  // Middleware + headers + redirects require server mode

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dqohphelh/**',
      },
    ],
    // Since we use Cloudinary CDN with custom srcSet, disable Next.js image optimization
    unoptimized: true,
  },

  // Security headers (migrated from vercel.json)
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https: blob:",
            "media-src 'self' https:",
            "frame-src 'self' https://www.youtube.com https://player.vimeo.com",
            "connect-src 'self' https://api.emailjs.com https://res.cloudinary.com",
            "object-src 'none'",
          ].join('; '),
        },
      ],
    },
  ],

  // Redirects from old SPA routes to new i18n routes
  redirects: async () => [
    // Old query param routes -> path prefix
    { source: '/', has: [{ type: 'query', key: 'lang', value: 'fr' }], destination: '/fr', permanent: true },
    { source: '/', has: [{ type: 'query', key: 'lang', value: 'en' }], destination: '/en', permanent: true },
    // Old SPA routes without lang prefix -> default /en
    ...[
      'about', 'work', 'services', 'signals', 'visual-archive',
      'consulting', 'presentation', 'contact', 'quote', 'resume', 'testimonials',
    ].map((route) => ({
      source: `/${route}`,
      destination: `/en/${route}`,
      permanent: true,
    })),
    // Old signal routes
    { source: '/signal/:id', destination: '/en/signal/:id', permanent: true },
    // Old project routes
    { source: '/project/:id/:view', destination: '/en/project/:id/:view', permanent: true },
    { source: '/project/:id', destination: '/en/project/:id/summary', permanent: true },
    // Route renames: work -> projets, signals -> ressources
    { source: '/:lang/work', destination: '/:lang/projets', permanent: true },
    { source: '/:lang/signals', destination: '/:lang/ressources', permanent: true },
  ],
}

export default nextConfig
