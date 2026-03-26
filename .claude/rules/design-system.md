## Colors
- Brand blue (primary CTA): `#2D5CF3`, hover: `#2450d9`
- Dark background: `bg-[#0a0a0a]`
- Light background: `bg-[#FCFCFD]`
- Dark cards: `bg-[#1D1D1F]`
- Light cards: `bg-white`
- Dark borders: `border-white/5` to `border-white/10`
- Light borders: `border-gray-100` to `border-gray-200`

## Buttons
- Primary CTA: `bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-sm hover:shadow-md`
- Always blue, both light and dark mode
- Rounded-full, font-medium, inline-flex with gap-2
- Never use `bg-gray-900` for CTAs

## Site Header (Nav)
- Default height: 64px, reduces to 56px on scroll (transition 250ms ease-out)
- Logo: "Victor Soussan" at text-base (16px), font-semibold, tracking-[-0.02em]
- Nav items: text-sm, rounded-full pills with hover bg-black/[0.04]
- Active indicator: 2px blue underline inside pill
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

## Typography
- Headings: font-bold, tracking-[-0.02em] or tracking-[-0.03em]
- Body: text-sm to text-base, leading-relaxed
- Dark mode text: text-white (headings), text-gray-400 (body)
- Light mode text: text-gray-900 (headings), text-gray-600 (body)
