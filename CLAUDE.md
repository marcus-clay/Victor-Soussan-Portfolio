# Victor Soussan Portfolio

## Stack
- Next.js 16.1.7 (App Router, Turbopack) + React 18 + TypeScript 5.2
- Tailwind CSS 3.4 (build-time, not CDN)
- Framer Motion 12.x for animations
- Phosphor Icons 2.x
- Font: Public Sans (via next/font/google)
- Bilingual EN/FR via path prefix (/en/, /fr/) + LanguageProvider context
- SSG via generateStaticParams (135+ static pages)
- Deployed on Vercel (auto-detected Next.js)

## Content Architecture
Two main content spaces:
- **Projets** (`/projets`): case studies + short projects, filterable by category
- **Ressources** (`/ressources`): articles + guides + templates, filterable by type

Data sources:
- `src/data/projectsData.tsx`: all projects (format: 'case-study' | 'short')
- `src/data/contentData.ts`: unified content (articles + guide + templates)
- `src/data/signalsData.ts`: article bodies (imported by contentData)
- `src/data/guideClaudeCodeData.ts`: guide chapters
- `src/data/translations.ts`: all UI translations (EN/FR), includes `descShort` for mobile hero

## File Structure
- `app/` : Next.js App Router pages and layouts
  - `app/layout.tsx` : root layout (Public Sans font, JSON-LD, global meta)
  - `app/[lang]/layout.tsx` : i18n layout (LanguageProvider, conditional Nav/Footer via LayoutShell)
  - `app/[lang]/page.tsx` : homepage (HomepageClient with 7 sections)
  - `app/[lang]/projets/page.tsx` : projects page (ProjetsPageClient)
  - `app/[lang]/ressources/page.tsx` : resources page (RessourcesPageClient)
  - `app/[lang]/project/[id]/[view]/page.tsx` : project detail (case study or short)
  - `app/[lang]/signal/[id]/page.tsx` : article detail
  - `app/[lang]/guide/claude-code/[slug]/page.tsx` : guide chapters
  - `app/[lang]/guide/ship-to-show/page.tsx` : Ship to Show guide
  - `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`
- `proxy.ts` : i18n redirect (/ -> /en or /fr based on Accept-Language)
- `next.config.ts` : images, CSP headers, redirects (including /work->/projets, /signals->/ressources)
- `src/components/` : shared components
  - `Nav.tsx` : dynamic header (72px→56px on scroll), contextual page title, pill nav items
  - `Footer.tsx` : site footer (supports dark override via .footer-dark class)
  - `LayoutShell.tsx` : conditional Nav/Footer, SkillsPromoBanner
  - `AuthorContactCard.tsx` : design system contact card (used in case studies, articles, guides)
  - `CaseStudyViewPills.tsx` : glass pills for full/gallery navigation
  - `CaseStudyTOCSidebar.tsx` : TOC sidebar (uses --nav-height CSS variable)
  - `SkillsPromoBanner.tsx` : floating pill banner, 30% scroll, session-dismissable
  - `ShortProjectView.tsx` : short format project display
  - `page-wrappers/` : client wrappers
    - `CaseStudyPageWrapper.tsx` : breadcrumb, TOC, related projects, AuthorContactCard, dark theme toggle
    - `HomepageClient.tsx`, `ProjetsPageClient.tsx`, `RessourcesPageClient.tsx`, etc.
  - `sections/` : homepage sections (Hero, Featured, Projects, Gallery, Expertise, Testimonials, ContactCTA)
  - `ui/index.ts` : barrel export for design system components
- `src/views/` : page view components
  - `case-studies/` : 9 case study components (each with its own *Executive.tsx summary)
  - `SignalDetailPage.tsx`, `GuideClaudeCodePage.tsx`, `GuideShipToShowPage.tsx`
  - `VisualArchivePage.tsx`, `ServicesPage.tsx`, `AboutPageRedesign.tsx`
- `src/data/` : content data files
- `src/config/` : design system tokens
- `public/cv/` : CV PDF for download

## Architecture Patterns
- Server component page → client wrapper → view component (for case studies, guides)
- Server component page → client wrapper (for new pages: Projets, Ressources, Contact)
- LayoutShell: hides Nav/Footer only for bare routes (/presentation, /quote)
- All pages render in normal document flow (no fixed overlays)
- Window-based scroll tracking everywhere (not container scroll)
- CaseStudyPageWrapper: handles breadcrumb, TOC sidebar, related projects, AuthorContactCard, dark theme
- Short projects go through the same wrapper as case studies (breadcrumb included)

## Header Behavior
- CSS variable `--nav-height`: 72px default, 56px on scroll
- All sticky elements use `top: var(--nav-height)` with 250ms transition
- Contextual page title: IntersectionObserver on h1, baseline-aligned with logo
- Nav items: rounded-full pills, active = font-semibold (no background, no underline)
- No border-bottom on header or breadcrumbs
- Dark override: `.nav-dark` class on `#site-nav` for dark case studies

## Theme
Light only. Dark override for specific projects (RiskOS).
- Background: `bg-[#F9F9F9]` or `bg-white` or `bg-[#FCFCFD]`
- Text: `text-gray-900` (headings), `text-gray-600` (body), `text-gray-500` min for readable metadata
- Cards: `bg-white border border-gray-100 rounded-2xl`
- Brand blue CTA: `bg-[#2D5CF3] hover:bg-[#2450d9]`
- Max width: `max-w-[1200px]` (sections), `max-w-[720px]` (article body)
- Related projects section: `bg-[#F5F5F7]` (light) / `bg-[#111113]` (dark)
- Dark projects: `nav-dark`, `footer-dark`, `main-dark` CSS classes toggled via useEffect
- `scrollbar-gutter: stable` on html

## Rules (auto-loaded from .claude/rules/)
- `design-system.md` : colors, buttons, headers, typography, media hover pattern
- `writing-rules.md` : no emdash, peer-to-peer tone, francais-parfait
