# Animation Library

Standard animations for interactive prototypes with Apple-inspired spring physics and smooth transitions.

---

## Micro-interactions

### Button Press
**Use case:** Tactile feedback for button taps

**Parameters:**
- Duration: 200ms
- Easing: Spring (Mass: 1, Stiffness: 80, Damping: 10)
- Scale: 0.95 (5% reduction)
- Optional: Slight opacity change (1.0 → 0.9)

**Figma/Principle:**
```
Scale: 100% → 95% → 100%
Easing: Ease Out (or Spring)
Duration: 200ms
```

**CSS equivalent:**
```css
transition: transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1);
transform: scale(0.95);
```

---

### Button Hover
**Use case:** Desktop hover feedback

**Parameters:**
- Duration: 150ms
- Easing: Ease In-Out
- Effects: Elevation increase OR color lightening
- Shadow: 0px 4px 12px rgba(0,0,0,0.15)

**Figma:**
```
Opacity: 1.0 → 1.0
Shadow: Small → Medium
Duration: 150ms
Easing: Ease In-Out
```

---

### Ripple Effect
**Use case:** Material Design tap feedback

**Parameters:**
- Duration: 300ms
- Easing: Ease Out
- Scale: 0 → 1.5
- Opacity: 0.3 → 0

**Principle:**
```
Circle Scale: 0 → 150%
Opacity: 30% → 0%
Duration: 300ms
Origin: Tap position
```

---

## Screen Transitions

### Slide Horizontal
**Use case:** Navigation between peer screens

**Parameters:**
- Duration: 300ms
- Easing: Ease In-Out (cubic-bezier(0.4, 0.0, 0.2, 1))
- Direction: Left (forward) / Right (back)
- Overlap: Previous screen stays visible, slightly darkened

**Figma Smart Animate:**
```
Position X: -375px → 0px (incoming screen)
Position X: 0px → 375px (outgoing screen)
Duration: 300ms
Easing: Ease In-Out
```

**Advanced:**
- Outgoing screen: Scale 0.95, Opacity 0.7
- Creates depth effect

---

### Slide Vertical
**Use case:** Modal presentation, bottom sheets

**Parameters:**
- Duration: 350ms
- Easing: Ease Out (spring-like)
- Direction: Bottom to top (present) / Top to bottom (dismiss)
- Background: Fade in overlay (opacity 0 → 0.4)

**Figma:**
```
Position Y: +812px → 0px
Overlay Opacity: 0 → 40%
Duration: 350ms
Easing: Ease Out
```

---

### Modal Fade + Scale
**Use case:** Alert dialogs, confirmations

**Parameters:**
- Duration: 250ms
- Easing: Ease Out (open) / Ease In (close)
- Scale: 0.85 → 1.0 (open) / 1.0 → 0.85 (close)
- Opacity: 0 → 1.0 (open) / 1.0 → 0 (close)
- Background overlay: Fade 0 → 0.5

**Figma:**
```
Open:
  Scale: 85% → 100%
  Opacity: 0% → 100%
  Duration: 250ms
  Easing: Ease Out

Close:
  Scale: 100% → 85%
  Opacity: 100% → 0%
  Duration: 200ms
  Easing: Ease In
```

---

## Morphing & Transformations

### Component Morph
**Use case:** Transforming one component into another (e.g., FAB → full screen)

**Parameters:**
- Duration: 300ms
- Easing: Custom Bezier (0.4, 0.0, 0.2, 1)
- Type: Smart Animate with matching layer names
- Properties: Position, Size, Color, Border Radius

**Figma Smart Animate:**
```
Ensure matching layer names between states
Duration: 300ms
Easing: Ease In-Out
Auto Layout: Enable for smooth resizing
```

**Example:**
```
FAB (56x56, border-radius: 28px)
  ↓ 300ms
Sheet (375x600, border-radius: 16px 16px 0 0)
```

---

### Skeleton Loading
**Use case:** Content placeholder while loading

**Parameters:**
- Duration: 1200ms (loop)
- Easing: Linear
- Shimmer: Linear gradient moving left to right
- Opacity pulse: 0.5 → 1.0 → 0.5

**CSS:**
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
animation: shimmer 1.2s ease-in-out infinite;
```

---

## Progressive Disclosure

### Expand/Collapse
**Use case:** Accordions, expandable sections

**Parameters:**
- Duration: 250ms
- Easing: Ease In-Out
- Height: 0 → auto (expand) / auto → 0 (collapse)
- Opacity: Content fades in/out
- Icon rotation: 0° → 180° (chevron)

**Figma:**
```
Height: Animate using Auto Layout
Opacity: 0% → 100% (content)
Rotation: 0° → 180° (icon)
Duration: 250ms
Easing: Ease In-Out
```

---

### Fade In/Out
**Use case:** Tooltips, notifications

**Parameters:**
- Duration: 200ms (in) / 150ms (out)
- Easing: Ease Out (in) / Ease In (out)
- Opacity: 0 → 1.0 (in) / 1.0 → 0 (out)
- Optional: Slight Y-movement (10px upward on fade in)

**Figma:**
```
Fade In:
  Opacity: 0% → 100%
  Position Y: +10px → 0px
  Duration: 200ms
  Easing: Ease Out

Fade Out:
  Opacity: 100% → 0%
  Duration: 150ms
  Easing: Ease In
```

---

## Scrolling & Parallax

### Parallax Background
**Use case:** Depth effect on scroll

**Parameters:**
- Scroll ratio: 0.3 to 0.5 (background moves slower)
- Easing: Linear (tied to scroll position)

**Principle:**
```
Background Position Y: scrollY * 0.3
Foreground Position Y: scrollY * 1.0
Creates depth perception
```

---

### Scroll-triggered Fade
**Use case:** Elements appearing on scroll

**Parameters:**
- Duration: 400ms
- Easing: Ease Out
- Opacity: 0 → 1.0
- Y Position: +30px → 0px

**Trigger:** When element enters viewport

---

## Gesture-based

### Swipe to Dismiss
**Use case:** Cards, notifications

**Parameters:**
- Threshold: 40% of card width
- Snap back: If < 40%, spring back to 0
- Dismiss: If > 40%, complete swipe
- Duration: 250ms (snap) / 200ms (dismiss)
- Easing: Spring

**Principle:**
```
Drag gesture bounds: -200px to +200px
If release < -75px: Dismiss left
If release > +75px: Dismiss right
Else: Spring back to 0
```

---

### Pull to Refresh
**Use case:** List refresh

**Parameters:**
- Pull distance: 80px trigger point
- Spring: Strong bounce back
- Spinner: Rotate 360° continuously
- Duration: 400ms (spring back)

---

## Loading States

### Spinner Rotation
**Use case:** Loading indicator

**Parameters:**
- Duration: 800ms (loop)
- Easing: Linear
- Rotation: 0° → 360°

**CSS:**
```css
animation: spin 0.8s linear infinite;
```

---

### Progress Bar Fill
**Use case:** Deterministic loading

**Parameters:**
- Duration: Tied to actual progress
- Easing: Ease Out for final 10%
- Width: 0% → 100%

---

## Timing Reference

| Speed | Duration | Use Case |
|-------|----------|----------|
| Instant | < 100ms | Micro-feedback |
| Fast | 100-200ms | Button interactions |
| Standard | 200-300ms | Screen transitions |
| Moderate | 300-400ms | Complex animations |
| Slow | 400-600ms | Deliberate focus draw |
| Very Slow | 600ms+ | Rare, special cases |

---

## Easing Curves Visual Reference

### Ease Out (Most Common)
```
Start fast, end slow
Use for: Enter animations, opening
```

### Ease In
```
Start slow, end fast
Use for: Exit animations, closing
```

### Ease In-Out
```
Start slow, fast middle, end slow
Use for: Transitions, movements
```

### Spring (Apple-style)
```
Slight overshoot, natural bounce
Use for: Tactile feedback, iOS-style
```

### Linear
```
Constant speed
Use for: Scrolling, continuous loops
```

---

## Best Practices

### Do's ✅
- Use 300ms or less for most UI interactions
- Match animation to user expectation (swipe direction, etc.)
- Maintain 60fps (avoid janky animations)
- Use spring for tactile, bounce-back interactions
- Ease Out for entrances, Ease In for exits

### Don'ts ❌
- Avoid animations longer than 400ms (feels sluggish)
- Don't animate too many properties simultaneously
- Avoid linear easing for organic movements
- Don't use animations without purpose
- Avoid conflicting animation directions

---

## Platform-specific Notes

### Figma
- Use Smart Animate for automatic property interpolation
- Instant (0ms), Ease In, Ease Out, Ease In-Out, Custom Bezier
- Layer names must match exactly for morphing

### Principle
- More advanced spring physics controls
- Timeline editor for complex sequences
- Better gesture support (drag, pull, etc.)

### ProtoPie
- Most advanced interaction capabilities
- Chain multiple conditions
- Variables and formulas for complex logic

### Bolt/Lovable
- Code-based, full CSS/JS control
- Use Framer Motion or CSS transitions
- Better for complex state management
