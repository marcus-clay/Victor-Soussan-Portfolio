# Code Review Guidelines

## Always check
- TypeScript type safety: no `any` types, proper generic constraints
- Custom routing logic uses `MODAL_ROUTES` convention correctly
- Tailwind utility classes match design system tokens (colors, spacing from .claude/rules/design-system.md)
- No emdashes in UI copy or case study text
- Bilingual content (EN/FR) both present in TRANSLATIONS objects
- Framer Motion animations don't block render
- Code-split pages use React.lazy + Suspense correctly
- Iframe usage: must include sandbox="allow-scripts allow-same-origin" and tabIndex={-1}

## Style
- Prefer composition over conditional nesting in components
- Keep case study data in /src/data/ files, not hardcoded in components
- Typography must follow francais-parfait rules for French content
- No "Ce n'est pas X, c'est Y" constructions in any text content
- Section headings must be narrative and specific, never generic

## Performance
- No lazy loading via IntersectionObserver for iframes (causes layout shift)
- Images use loading="lazy" native attribute
- Container dimensions must be stable before and after content loads (padding-bottom trick or fixed aspect-ratio)

## Skip
- Auto-generated files or vendor bundles
- Vendored GSAP or third-party script copies in public/prototypes/
- Minor whitespace or format changes in lock files
- Phosphor Icons deprecation hints (v2 migration planned)
