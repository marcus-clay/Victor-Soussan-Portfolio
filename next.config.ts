import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Vercel handles SSG natively, no need for static export
  // Middleware + headers + redirects require server mode

  poweredByHeader: false,

  experimental: {
    // The root <html> lives in app/[lang]/layout.tsx so lang matches the page language;
    // unmatched URLs are rendered by app/global-not-found.tsx.
    globalNotFound: true,
    optimizePackageImports: ['@phosphor-icons/react', 'framer-motion'],
  },

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

  // Security headers (migrated from vercel.json) + long cache for public media
  headers: async () => [
    {
      // Vercel serves files from /public with max-age=0 by default, which forces a revalidation
      // round trip for every image and video on every visit. One week + stale-while-revalidate keeps
      // repeat visits instant while a replaced file still shows up within days.
      source: '/:path(images|videos|logos|sounds|articles|cv|prototypes)/:rest*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=2592000' },
      ],
    },
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
            "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://scripts.clarity.ms",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https: blob:",
            "media-src 'self' https:",
            "frame-src 'self' https://www.youtube.com https://player.vimeo.com",
            [
              "connect-src 'self' https://api.emailjs.com https://res.cloudinary.com",
              // Google Analytics 4 (collect endpoints, regional endpoints, Google Signals)
              'https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com',
              // Microsoft Clarity
              'https://*.clarity.ms https://c.bing.com',
              // Vercel Web Analytics and Speed Insights
              'https://vitals.vercel-insights.com',
            ].join(' '),
            "object-src 'none'",
          ].join('; '),
        },
      ],
    },
  ],

  // Redirects from old SPA routes to new i18n routes
  redirects: async () => [
    // One canonical host: apex -> www (Search Console reports the apex as duplicate content)
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'victorsoussan.fr' }],
      destination: 'https://www.victorsoussan.fr/:path*',
      permanent: true,
    },
    // Old query param routes -> path prefix
    { source: '/', has: [{ type: 'query', key: 'lang', value: 'fr' }], destination: '/fr', permanent: true },
    { source: '/', has: [{ type: 'query', key: 'lang', value: 'en' }], destination: '/en', permanent: true },
    // Old SPA routes without lang prefix -> default /en
    ...[
      'about', 'services', 'visual-archive',
      'consulting', 'presentation', 'contact', 'quote', 'resume', 'testimonials',
    ].map((route) => ({
      source: `/${route}`,
      destination: `/en/${route}`,
      permanent: true,
    })),
    // Renamed routes go straight to their final URL (one hop instead of two)
    { source: '/work', destination: '/en/projets', permanent: true },
    { source: '/signals', destination: '/en/ressources', permanent: true },
    // /interventions was a client-side redirect page; a real 308 is cleaner for crawlers
    { source: '/:lang(en|fr)/interventions', destination: '/:lang/contact#interventions', permanent: true },
    // Old signal routes
    { source: '/signal/:id', destination: '/en/signal/:id', permanent: true },
    // Old project routes
    { source: '/project/:id/:view', destination: '/en/project/:id/:view', permanent: true },
    { source: '/project/:id', destination: '/en/project/:id/summary', permanent: true },
    // Route renames: work -> projets, signals -> ressources
    { source: '/:lang/work', destination: '/:lang/projets', permanent: true },
    { source: '/:lang/signals', destination: '/:lang/ressources', permanent: true },
    // Guide: redirect FR slugs on EN path to localized EN slugs
    { source: '/en/guide/claude-code/comprendre', destination: '/en/guide/claude-code/understanding', permanent: true },
    { source: '/en/guide/claude-code/environnement', destination: '/en/guide/claude-code/setup', permanent: true },
    { source: '/en/guide/claude-code/approches', destination: '/en/guide/claude-code/getting-started', permanent: true },
    { source: '/en/guide/claude-code/iterer', destination: '/en/guide/claude-code/iterating', permanent: true },
    { source: '/en/guide/claude-code/deployer', destination: '/en/guide/claude-code/deploying', permanent: true },
    { source: '/en/guide/claude-code/aller-plus-loin', destination: '/en/guide/claude-code/going-further', permanent: true },
    { source: '/en/guide/claude-code/resultat-visuel', destination: '/en/guide/claude-code/visual-quality', permanent: true },
    // Guide: redirect EN slugs on FR path to localized FR slugs
    { source: '/fr/guide/claude-code/understanding', destination: '/fr/guide/claude-code/comprendre', permanent: true },
    { source: '/fr/guide/claude-code/setup', destination: '/fr/guide/claude-code/environnement', permanent: true },
    { source: '/fr/guide/claude-code/getting-started', destination: '/fr/guide/claude-code/approches', permanent: true },
    { source: '/fr/guide/claude-code/iterating', destination: '/fr/guide/claude-code/iterer', permanent: true },
    { source: '/fr/guide/claude-code/deploying', destination: '/fr/guide/claude-code/deployer', permanent: true },
    { source: '/fr/guide/claude-code/going-further', destination: '/fr/guide/claude-code/aller-plus-loin', permanent: true },
    { source: '/fr/guide/claude-code/visual-quality', destination: '/fr/guide/claude-code/resultat-visuel', permanent: true },
    // Guide: redirect old ch1-ch9 slugs
    { source: '/:lang/guide/claude-code/ch1', destination: '/:lang/guide/claude-code/comprendre', permanent: true },
    { source: '/:lang/guide/claude-code/ch2', destination: '/:lang/guide/claude-code/environnement', permanent: true },
    { source: '/:lang/guide/claude-code/ch3', destination: '/:lang/guide/claude-code/approches', permanent: true },
    { source: '/:lang/guide/claude-code/ch4', destination: '/:lang/guide/claude-code/stack', permanent: true },
    { source: '/:lang/guide/claude-code/ch5', destination: '/:lang/guide/claude-code/iterer', permanent: true },
    { source: '/:lang/guide/claude-code/ch6', destination: '/:lang/guide/claude-code/deployer', permanent: true },
    { source: '/:lang/guide/claude-code/ch7', destination: '/:lang/guide/claude-code/aller-plus-loin', permanent: true },
    { source: '/:lang/guide/claude-code/ch8', destination: '/:lang/guide/claude-code/resultat-visuel', permanent: true },
    { source: '/:lang/guide/claude-code/ch9', destination: '/:lang/guide/claude-code/skills', permanent: true },
    // Legacy WordPress routes -> redirect to relevant current pages
    { source: '/portfolio/toolkit/:path*', destination: '/fr/project/toolkit/summary', permanent: true },
    { source: '/portfolio/sqool/:path*', destination: '/fr/project/sqool/summary', permanent: true },
    { source: '/portfolio/sqool-classe-2022-2024', destination: '/fr/project/sqool-classe/summary', permanent: true },
    // Gallery disabled (scroll bug with iframe loading) — redirect to summary until rework
    { source: '/:lang/project/sqool-classe/gallery', destination: '/:lang/project/sqool-classe/summary', permanent: false },
    { source: '/portfolio/sqool-software-ecosystem-evolution-2018-2024', destination: '/fr/project/sqool/summary', permanent: true },
    { source: '/portfolio/sqool-extend-2024/:path*', destination: '/fr/project/sqool/summary', permanent: true },
    { source: '/portfolio/pagesjaunes/:path*', destination: '/fr/project/pagesjaunes/summary', permanent: true },
    { source: '/portfolio/pagesjaunes-2014-2016', destination: '/fr/project/pagesjaunes/summary', permanent: true },
    { source: '/portfolio/connect/:path*', destination: '/fr/project/connect/summary', permanent: true },
    { source: '/portfolio/connect-la-bulle-2020-2021', destination: '/fr/project/connect/summary', permanent: true },
    { source: '/portfolio/france-vae/:path*', destination: '/fr/project/france-vae/summary', permanent: true },
    { source: '/portfolio/toolkit-2023-2024', destination: '/fr/project/toolkit/summary', permanent: true },
    { source: '/portfolio/:path*', destination: '/fr/projets', permanent: true },
    { source: '/portfolio_category/:path*', destination: '/fr/projets', permanent: true },
    { source: '/portfolio_tag/:path*', destination: '/fr/projets', permanent: true },
    { source: '/category/:path*', destination: '/fr/ressources', permanent: true },
    { source: '/projects/:path*', destination: '/fr/projets', permanent: true },
    { source: '/project_category/:path*', destination: '/fr/projets', permanent: true },
    { source: '/blog', destination: '/fr/ressources', permanent: true },
    { source: '/blog/:path*', destination: '/fr/ressources', permanent: true },
    { source: '/a-propos-design-philosophy-claude', destination: '/fr/about', permanent: true },
    { source: '/feed', destination: '/fr/ressources', permanent: true },
    { source: '/feed/:path*', destination: '/fr/ressources', permanent: true },
    { source: '/comments/feed', destination: '/fr/ressources', permanent: true },
    { source: '/journal', destination: '/fr/ressources', permanent: true },
    { source: '/reviews', destination: '/fr/testimonials', permanent: true },
    { source: '/a-propos', destination: '/fr/about', permanent: true },
    { source: '/a-propos/:path*', destination: '/fr/about', permanent: true },
    { source: '/cv', destination: '/fr/resume', permanent: true },
    { source: '/agency/:path*', destination: '/fr/about', permanent: true },
    { source: '/studio', destination: '/fr/about', permanent: true },
    { source: '/freelance-2', destination: '/fr/about', permanent: true },
    { source: '/contact-2', destination: '/fr/contact', permanent: true },
    { source: '/magazine', destination: '/fr/ressources', permanent: true },
    // WordPress artifacts -> homepage
    { source: '/wp-content/:path*', destination: '/fr', permanent: true },
    { source: '/sample-page', destination: '/fr', permanent: true },
    { source: '/cover-half', destination: '/fr', permanent: true },
    { source: '/works-cleaner', destination: '/fr/projets', permanent: true },
    { source: '/works-boring', destination: '/fr/projets', permanent: true },
    // Old blog articles -> ressources
    { source: '/levolution-du-design-digital-25-ans-de-mutations', destination: '/fr/ressources', permanent: true },
    { source: '/lequilibre-perdu-quand-les-equipes-produit-etaient-vraiment-collaboratives', destination: '/fr/ressources', permanent: true },
    { source: '/sqool-ecosystem-transformation-20251031', destination: '/fr/project/sqool/summary', permanent: true },
  ],
}

export default nextConfig
