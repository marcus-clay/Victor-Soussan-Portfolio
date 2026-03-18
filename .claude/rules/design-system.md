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

## Page Header Pattern
All full-page overlays use the same header:
```
<header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/80 (dark) | bg-[#FCFCFD]/80 (light)">
  <div className="w-full pl-6 pr-2.5 h-16 flex items-center justify-between">
    <span className="font-semibold text-lg tracking-[-0.02em]">{title}</span>
    <button className="relative p-3 rounded-full transition-colors before:absolute before:inset-[-12px] before:content-['']">
      <X size={24} />
    </button>
  </div>
</header>
```
- Title on LEFT, X close button on RIGHT
- X icon size={24} with enlarged hitbox (before: pseudo-element)
- Glass effect with backdrop-blur-xl

## Typography
- Headings: font-bold, tracking-[-0.02em] or tracking-[-0.03em]
- Body: text-sm to text-base, leading-relaxed
- Dark mode text: text-white (headings), text-gray-400 (body)
- Light mode text: text-gray-900 (headings), text-gray-600 (body)
