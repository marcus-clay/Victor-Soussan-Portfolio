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
- `src/data/translations.ts`: all UI translations (EN/FR)

## File Structure
- `app/` : Next.js App Router pages and layouts
  - `app/layout.tsx` : root layout (Public Sans font, JSON-LD, global meta)
  - `app/[lang]/layout.tsx` : i18n layout (LanguageProvider, conditional Nav/Footer via LayoutShell)
  - `app/[lang]/page.tsx` : homepage (HomepageClient with 8 sections)
  - `app/[lang]/projets/page.tsx` : projects page (ProjetsPageClient)
  - `app/[lang]/ressources/page.tsx` : resources page (RessourcesPageClient)
  - `app/[lang]/project/[id]/[view]/page.tsx` : project detail (case study or short)
  - `app/[lang]/signal/[id]/page.tsx` : article detail
  - `app/[lang]/guide/claude-code/[slug]/page.tsx` : guide chapters
  - `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`
- `proxy.ts` : i18n redirect (/ -> /en or /fr based on Accept-Language)
- `next.config.ts` : images, CSP headers, redirects (including /work->/projets, /signals->/ressources)
- `src/components/` : shared components
  - `Nav.tsx`, `Footer.tsx`, `LayoutShell.tsx` (conditional Nav/Footer)
  - `Avatar.tsx`, `ScrollExpandCard.tsx`, `ShortProjectView.tsx`
  - `page-wrappers/` : client wrappers (HomepageClient, ProjetsPageClient, RessourcesPageClient, ContactPageClient, etc.)
  - `sections/` : homepage sections (Hero, Featured, Projects, Gallery, Expertise, Testimonials, ContactCTA)
- `src/views/` : legacy page components (case studies, guide, presentation, etc.)
- `src/data/` : content data files
- `src/config/` : design system tokens

## Architecture Patterns
- Server component page -> client wrapper -> legacy view component (for case studies)
- Server component page -> client wrapper (for new pages: Projets, Ressources, Contact)
- LayoutShell: hides Nav/Footer for bare routes (/project/, /presentation, /quote)
- Project format routing: CaseStudyPageWrapper checks `project.format` and renders ShortProjectView or legacy case study

## Theme
Light only. No dark mode.
- Background: `bg-[#F9F9F9]` or `bg-white`
- Text: `text-gray-900` (headings), `text-gray-600` (body)
- Cards: `bg-white border border-gray-100 rounded-2xl`
- Brand blue CTA: `bg-[#2D5CF3] hover:bg-[#2450d9]`
- Max width: `max-w-[1200px]` (sections), `max-w-[900px]` (contact)

## Rules (auto-loaded from .claude/rules/)
- `design-system.md` : colors, buttons, headers, typography tokens
- `writing-rules.md` : no emdash, peer-to-peer tone, francais-parfait
