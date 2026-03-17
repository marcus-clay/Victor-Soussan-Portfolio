# Victor Soussan Portfolio

## Stack
- Next.js 16.1.7 (App Router, Turbopack) + React 18 + TypeScript 5.2
- Tailwind CSS 3.4 (build-time, not CDN)
- Framer Motion 12.x for animations
- Phosphor Icons 2.x
- Bilingual EN/FR via path prefix (/en/, /fr/) + LanguageProvider context
- SSG via generateStaticParams (129 static pages)
- Deployed on Vercel (auto-detected Next.js)

## File Structure
- `app/` : Next.js App Router pages and layouts
  - `app/layout.tsx` : root layout (Inter font, JSON-LD, global meta)
  - `app/[lang]/layout.tsx` : i18n layout (LanguageProvider, Nav, Footer)
  - `app/[lang]/page.tsx` : homepage
  - `app/[lang]/{route}/page.tsx` : 11 static pages
  - `app/[lang]/signal/[id]/page.tsx` : 17 signal detail pages (SSG)
  - `app/[lang]/project/[id]/[view]/page.tsx` : 8 projects x 3 views (SSG)
  - `app/[lang]/guide/claude-code/[slug]/page.tsx` : 9 guide chapters (SSG)
  - `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`
- `proxy.ts` : i18n redirect (/ -> /en or /fr based on Accept-Language)
- `next.config.ts` : Cloudinary images, CSP headers, old URL redirects
- `src/views/` : page-level components (ex-modals, being migrated to app/ pages)
- `src/views/case-studies/` : 9 case study page components
- `src/components/` : shared components
  - `Nav.tsx` : top nav with Next.js Link + mobile burger menu
  - `Footer.tsx` : 5-column footer with Next.js Link
  - `media/` : CloudinaryImage, EnhancedLightbox, LazyImage, etc.
  - `prototype/` : PrototypeCard, PrototypeCarousel, etc.
  - `case-studies/` : Executive + Full components per project
  - `sections/` : homepage sections (HeroSection, ProjectsSection, etc.)
  - `ui/` : InfiniteGrid, ResponsiveImage
- `src/providers/` : LanguageProvider (light theme only, no ThemeProvider)
- `src/data/` : content data (signals, translations, testimonials, career, etc.)
- `src/config/` : design system tokens, email config, style constants
- `src/hooks/` : custom React hooks
- `src/utils/` : utilities (SEO, Cloudinary, smooth scroll)
- `src/App.tsx` : legacy SPA entry (being decomposed into app/ pages)

## Migration Status
Next.js migration in progress on branch `feat/nextjs-migration`.
- Phase 0-1 complete: project setup, routing, Nav, Footer, all page stubs
- Phase 2 in progress: wiring real components into page stubs
- Legacy `src/App.tsx` still exists but is not used by Next.js

## Theme
Light only. No dark mode. All colors use light variants:
- Background: `bg-[#F9F9F9]` or `bg-white`
- Text: `text-gray-900` (headings), `text-gray-600` (body)
- Cards: `bg-white` with `border-gray-100`

## Homepage Flow
Hero -> Projects -> About (short bio) -> Gallery (preview) -> Services + Clients -> Signals -> Testimonials -> Contact/Footer

## Rules (auto-loaded from .claude/rules/)
- `design-system.md` : colors, buttons, headers, typography tokens
- `routing.md` : custom modal routing conventions (legacy, being replaced by App Router)
- `writing-rules.md` : no emdash, peer-to-peer tone, francais-parfait

## Documentation (on-demand, see .claude/docs/)
- `HANDOFF-NEXTJS-MIGRATION.md` : complete migration plan and architecture
- `architecture.md` : technical decisions and patterns
- `content-map.md` : all content sources, data files, translations
- `deploy.md` : Vercel config, CI/CD, environment
