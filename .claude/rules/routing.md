## Custom URL-based Modal Routing

No router library. Custom implementation in App.tsx.

- `MODAL_ROUTES` maps URL paths to React state setters
- `openModalWithUrl(path)` closes all other modals, opens one, updates history
- `closeModalWithUrl(setterFn)` closes modal, resets to `/?lang=en`
- Browser back/forward handled by `popstate` event listener
- All pages rendered as AnimatePresence overlays with Suspense fallback
- Language via query param: `?lang=en` or `?lang=fr`

Key routes: /about, /work, /services, /signals, /visual-archive, /consulting,
/presentation, /contact, /quote, /resume, /testimonials, /signal/:id
