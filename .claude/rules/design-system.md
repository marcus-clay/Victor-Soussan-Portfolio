## Colors
- No brand blue: the site is monochrome. Primary CTA is black (`bg-gray-900`, hover `bg-black`), decided by the owner on 2026-10-21
- Dark background: `bg-[#0a0a0a]`
- Light background: `bg-[#FCFCFD]`
- Dark cards: `bg-[#1D1D1F]`
- Light cards: `bg-white`
- Dark borders: `border-white/5` to `border-white/10`
- Light borders: `border-gray-100` to `border-gray-200`

## Buttons
- Primary CTA: `bg-gray-900 text-white hover:bg-black shadow-sm hover:shadow-md`
- Always black, on light and dark grounds. Links hover to `hover:text-gray-500`
- Rounded-full, font-medium, inline-flex with gap-2
- Never introduce a colored button

## Site Header (Nav)
- Default height: 80px (`--nav-height-top`), reduces to 56px on scroll (`--nav-height-scrolled`, transition 250ms ease-out). `main` reserves the 80px so the content never moves when the header shrinks.
- Logo: "Victor Soussan" at text-base (16px), font-semibold, tracking-[-0.02em]
- Nav items: text-sm, rounded-full pills with hover bg-black/[0.04]
- Active indicator: `font-semibold` plus a 2px black underline (`bg-current`) under the label
- Menu panel: the active row has a black 8px dot on the left (fixed slot on every row, so labels stay aligned) and a `bg-black/[0.04]` background, like the table of contents
- Contact button: bg-gray-900 text-white, rounded-full, same height as nav pills
- Glass effect: bg-white/80 backdrop-blur-xl border-b border-gray-100/80
- Scrollbar gutter: `scrollbar-gutter: stable` on html to prevent layout shift

## Page Header Pattern (overlays)
```
<header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/80 (dark) | bg-[#FCFCFD]/80 (light)">
  <div className="w-full pl-6 pr-2.5 h-16 flex items-center justify-between">
    <span className="font-semibold text-base tracking-[-0.02em]">{title}</span>
    <button className="relative p-3 rounded-full transition-colors before:absolute before:inset-[-12px] before:content-['']">
      <X size={24} />
    </button>
  </div>
</header>
```
- Title on LEFT at 16px (text-base), X close button on RIGHT
- X icon size={24} with enlarged hitbox (before: pseudo-element)
- Glass effect with backdrop-blur-xl

## Media Hover Pattern (images, videos, galleries)
Every clickable image or video on the site uses the same hover treatment:
- Container: `cursor-zoom-in group` with `transition-[border-color,box-shadow,transform] duration-300 ease-out`
- Container hover: `hover:scale-[1.01]` (subtle lift on the whole card)
- Media inside: `transition-transform duration-300 ease-out group-hover:scale-[1.02]` (zoom inside the container)
- Shadow: `shadow-lg` at rest, `hover:shadow-2xl` on hover
- Border (dark theme): `border-white/[0.06] hover:border-white/[0.12]`
- Border (light theme): `border-gray-100 hover:border-gray-200` or `ring-1 ring-black/[0.04]`
- No 3D tilt, no perspective, no rotateX/rotateY
- Videos: `autoPlay loop muted playsInline`, hover zoom applied to `<video>` element
- When clicking to open lightbox: pass `videoRef.current.currentTime` so playback continues from the same position

```
{/* Light theme example */}
<div className="rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-zoom-in group
  transition-[border-color,box-shadow,transform] duration-300 ease-out
  shadow-sm hover:shadow-lg hover:scale-[1.01]">
  <img className="w-full transition-transform duration-300 ease-out group-hover:scale-[1.02]" />
</div>

{/* Dark theme example */}
<div className="rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] cursor-zoom-in group
  transition-[border-color,box-shadow,transform] duration-300 ease-out
  shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-black/50 hover:scale-[1.01]">
  <video className="w-full transition-transform duration-300 ease-out group-hover:scale-[1.02]" autoPlay loop muted playsInline />
</div>
```

## List and block hover pattern
For interactive rows in lists, menus, accordions, and divide-y blocks:
- Light mode: `hover:bg-gray-100` (Tailwind #F3F4F6) — visually distinct on `#FDFDFC`/`#F9F9F9` backgrounds
- Dark mode: `hover:bg-white/[0.08]` — equivalent contrast on dark surfaces
- Always pair with `-mx-3 px-3 rounded-lg` to create a pill-shaped hit area that bleeds into margins
- Transition: `transition-colors duration-150`
- Never use `hover:bg-gray-50` (#F9FAFB) for list items — too close to the page background to read as interactive

## Forbidden patterns
- No colored accent borders on cards or containers (colored border-l, border-t, border-left). Use uniform `border-gray-100` on all sides.
- No colored accent bars inside cards (e.g. colored div as visual separator). Keep cards clean.

## Typography (type scale)
Sizes are Tailwind tokens defined in `tailwind.config.js`. Each size carries its own tracking and leading (tighter as it grows), so do not add `tracking-*` or `leading-*` on headings unless there is a reason. Never use `text-[Npx]`: pick the closest token.

| Role | Class | Size | Weight | Use |
|---|---|---|---|---|
| Page title | `text-title-1` | 24 to 28px (fluid) | 600 | the page `h1`, including the homepage name |
| Section | `text-title-2` | 20px | 600 | `h2` |
| Sub-section, card title | `text-title-3` | 17px | 600 | `h3`, project and article card titles |
| Lead | `text-lg` | 18px | 400 | subtitle under a page title, role line |
| Body | `text-base` | 16px | 400 | running text |
| UI, summaries | `text-sm` | 15px | 400 / 500 | buttons, card summaries, navigation |
| Caption | `text-xs` | 13px | 400 / 500 | metadata, breadcrumbs, footers |
| Micro | `text-micro` | 11px | 500 | labels, years, counters (use `uppercase tracking-[0.08em]` for overlines) |

- Hierarchy comes from size first, then weight, then color: `gray-900` for titles, `gray-600` for body, `gray-500` minimum for metadata.
- Large display sizes (`text-4xl` and up) are reserved for the `/presentation`, `/quote` and resume surfaces.
- Dark mode text: `text-white` (headings), `text-gray-400` (body).
- The header repeats the page identity once the first `h1` (the whole hero on the homepage) leaves the viewport.

## Carousels (horizontal scrollers)
Every swipeable carousel uses `useSnapScroller` (`src/hooks/useSnapScroller.ts`) on top of CSS scroll-snap:
- Touch and trackpad scrolling stay native (`scroll-snap-type` + `snap-scroller` for `overscroll-behavior-x: contain`).
- Mouse drag is 1:1, then lands on the snap point the gesture was heading to (momentum projection, rate 0.998), through a critically damped spring that inherits the release velocity.
- Rubber banding at both ends via `.snap-rubber` (individual `translate` on direct children, never `transform`).
- Arrows, dots and ArrowLeft/ArrowRight go through the same spring. A press or a wheel stops the motion where it is.
- Never use `scroll-behavior: smooth` or `scrollTo({ behavior: 'smooth' })` on a carousel: it fights the spring.
- Track needs `tabIndex={0}`, `role="group"`, `aria-roledescription="carousel"` and an `aria-label`; items get `scroll-snap-align`, and the container `scroll-padding-left` equal to its left padding.

## Overlays and scroll lock
Lightboxes and galleries lock the page with `useScrollLock(isOpen)` (`src/hooks/useScrollLock.ts`), never with `body.style.overflow`, `position: fixed` or a `scrollTo`. The page must stay exactly where it was. Do not change the pathname from an overlay (the router scrolls to top on pathname change); use the URL hash.
