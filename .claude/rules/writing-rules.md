Rules for all text content in the portfolio (UI copy, case studies, signals):

- No emdashes (never use the — character anywhere in content)
- Use colons, commas, periods, or parentheses instead
- Apply the `francais-parfait` skill for all French text
- No "Ce n'est pas X, c'est Y" / "It's not X, it's Y" constructions
- No LLM tonality, no jargon, no exaggerated comparisons
- Peer-to-peer, factual, grounded in experience
- Full well-constructed sentences

## SEO and analytics rules
- Every page builds its metadata with `buildMetadata()` from `src/lib/seo.ts` (canonical, hreflang with x-default, Open Graph, Twitter). Never hand-write canonical URLs.
- Structured data goes through `src/lib/seo.ts` builders and `<JsonLd>` (server rendered). Never inject meta tags or JSON-LD from client components with `document.*`: it overwrites the server values that Google reads.
- The sitemap lists only indexable, canonical, 200 URLs. A page with `noindex`, a redirect or a gallery view never belongs in it. `lastModified` comes from content dates, never from the build time.
- Titles stay under about 60 characters, descriptions between 120 and 158. FR and EN pages have their own title and description.
- Images over 2200px wide or 400 KB are converted with `scripts/optimize-images.mjs` or `scripts/downscale-images.mjs` before commit.
- GA4 and Clarity load only after consent (`src/components/analytics`). Custom events go through `track()` from `src/lib/analytics.ts`.
- Components must not be declared inside another component body (they remount on every render). Use `useStableComponent` when a closure is needed.
- Portals to `document.body` render only after mount, otherwise hydration fails.
