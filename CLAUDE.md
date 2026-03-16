# Victor Soussan Portfolio

## Stack
- React 18 + TypeScript + Vite 5.1.4
- Tailwind CSS (CDN-based, not installed as dependency)
- Framer Motion 12.x for animations
- Lucide React + Phosphor Icons
- SPA with custom URL-based routing (no router library)
- React.lazy + Suspense for code-split pages
- Bilingual EN/FR via TRANSLATIONS objects
- Deployed on Vercel

## File Structure
- `src/App.tsx` : main app, homepage, routing, translations
- `src/pages/` : full-page modal components (About, Services, Work, Signals, etc.)
- `src/pages/case-studies/` : 9 case study pages
- `src/components/` : shared components (media/, prototype/, case-studies/, ui/)
- `src/data/` : content data (signals, testimonials, career, gallery, prototypes)
- `src/config/` : design system tokens, email config, style constants
- `src/hooks/` : custom React hooks
- `src/utils/` : utilities (SEO, Cloudinary, smooth scroll)

## Homepage Flow
Hero -> Projects -> About (short bio) -> Gallery (preview) -> Services + Clients -> Signals -> Testimonials -> Contact/Footer

## Rules (auto-loaded from .claude/rules/)
- `design-system.md` : colors, buttons, headers, typography tokens
- `routing.md` : custom modal routing conventions
- `writing-rules.md` : no emdash, peer-to-peer tone, francais-parfait

## Documentation (on-demand, see .claude/docs/)
- `architecture.md` : technical decisions and patterns
- `content-map.md` : all content sources, data files, translations
- `deploy.md` : Vercel config, CI/CD, environment
