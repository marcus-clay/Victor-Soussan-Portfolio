# Interaction Patterns Library

Reusable interaction patterns for common UI elements and flows.

---

## Navigation Patterns

### Hamburger Menu
**Context:** Mobile navigation, collapsible menu

**States:**
- Closed (Icon visible)
- Opening (Icon → X animation, menu sliding in)
- Open (Full menu visible)
- Closing (X → Icon animation, menu sliding out)

**Interaction Flow:**
1. Tap hamburger icon
2. Icon morphs to X (200ms)
3. Menu slides in from left (300ms)
4. Background overlay fades in (300ms)
5. Tap X or overlay to close

**Animation:**
- Menu slide: 300ms, Ease Out
- Icon morph: 200ms, Ease In-Out
- Overlay: 300ms fade

**Considerations:**
- Prevent body scroll when open
- Trap focus within menu (accessibility)
- Swipe-to-close gesture optional

---

### Tab Bar Navigation
**Context:** Bottom navigation (mobile), top tabs (desktop)

**States:**
- Default (unselected tabs)
- Selected (active tab highlighted)
- Transition (switching tabs)

**Interaction Flow:**
1. Tap tab
2. Selected indicator moves (300ms)
3. Content crossfades or slides
4. Update tab icon/color

**Animation:**
- Indicator slide: 300ms, Ease In-Out
- Content transition: 250ms
- Icon scale/color: 150ms

**Variations:**
- Sliding indicator bar
- Background pill that moves
- Icon scale + color change

---

### Breadcrumb Navigation
**Context:** Hierarchical navigation

**Interaction:**
- Tap breadcrumb level to navigate back
- Animate transition based on hierarchy depth
- Current page non-clickable

---

## Input Patterns

### Search Bar
**States:**
- Idle (collapsed or placeholder visible)
- Focus (cursor active, keyboard shown)
- Typing (showing results)
- Results (autocomplete/suggestions)

**Interaction Flow:**
1. Tap search field
2. Field expands (if collapsed) - 200ms
3. Keyboard appears
4. Live search as user types (300ms debounce)
5. Show results dropdown
6. Tap result or press Enter

**Animation:**
- Expand: 200ms, Ease Out
- Results appear: 150ms fade in
- Clear button appears when typing

---

### Form Input States
**States:**
- Empty (placeholder visible)
- Focus (border highlighted)
- Filled (content visible)
- Error (red border, error message)
- Success (green check, confirmation)
- Disabled (greyed out)

**Validation Feedback:**
- Inline validation on blur
- Error shake animation (200ms)
- Success checkmark fade in (150ms)

---

### Dropdown Select
**Interaction Flow:**
1. Tap dropdown trigger
2. Options menu appears (200ms)
3. Scroll through options
4. Tap option to select
5. Menu closes, selected value shown

**Animation:**
- Menu open: 200ms, Ease Out, slight scale
- Option hover: 100ms background change
- Selection: 150ms, menu closes

---

## Modal Patterns

### Alert Dialog
**Context:** Important messages requiring acknowledgment

**Interaction Flow:**
1. Trigger alert
2. Background dims (250ms)
3. Alert scales in from 0.85 to 1.0 (250ms)
4. User taps button
5. Alert dismisses (200ms)

**Animation:**
- Entry: Scale + Fade, 250ms, Ease Out
- Exit: Fade, 200ms, Ease In
- Background: 0 → 0.5 opacity

**Buttons:**
- Primary action (right)
- Secondary/cancel (left)
- Close X (top right)

---

### Bottom Sheet
**Context:** Mobile drawer from bottom

**Interaction Flow:**
1. Trigger sheet
2. Sheet slides up (350ms)
3. Background dims
4. Handle appears at top
5. Drag handle to adjust height or dismiss

**Animation:**
- Slide up: 350ms, Ease Out
- Snap to breakpoints (50%, 100%)
- Swipe down to dismiss

**Breakpoints:**
- Collapsed (preview)
- Half screen
- Full screen

---

### Fullscreen Modal
**Context:** Focus mode, multi-step forms

**Interaction Flow:**
1. Transition from parent screen
2. Modal takes over screen
3. Close button (X) top-left
4. Back gesture dismisses

**Animation:**
- Slide up from bottom: 300ms
- Or scale from tap point: 350ms

---

## Card Patterns

### Expandable Card
**Interaction Flow:**
1. Card shows summary
2. Tap card or expand button
3. Card expands with more content (250ms)
4. Tap again to collapse

**Animation:**
- Height: Auto-animate
- Content: Fade in on expand
- Icon: Rotate chevron 180°

---

### Swipeable Card
**Use case:** Tinder-style, dismissible notifications

**Interaction Flow:**
1. Drag card left/right
2. If < threshold: Spring back
3. If > threshold: Complete swipe
4. Card exits screen
5. Next card appears

**Thresholds:**
- 40% width for dismiss
- Visual hint at 20% (color change)

---

### Card Flip
**Use case:** Reveal more info on reverse

**Interaction Flow:**
1. Tap card
2. Card rotates 180° on Y-axis (400ms)
3. Content crossfades at 50% point
4. Tap again to flip back

---

## List Patterns

### Pull to Refresh
**Interaction Flow:**
1. User pulls list down
2. Indicator appears (spinner/arrow)
3. Release when threshold reached
4. Spinner rotates (loading)
5. List refreshes
6. Spring back to top

**Animation:**
- Pull: Follows finger, resistance after threshold
- Release: Spring, 400ms
- Spinner: 800ms rotation loop

---

### Infinite Scroll
**Interaction Flow:**
1. User scrolls to bottom
2. Detect proximity (200px from end)
3. Show loading indicator
4. Load more items
5. Append to list smoothly

**Loading:**
- Spinner at bottom
- Fade in new items (150ms)

---

### Swipe Actions (iOS-style)
**Use case:** Reveal actions on swipe

**Interaction Flow:**
1. Swipe list item left/right
2. Actions revealed (delete, archive, etc.)
3. Tap action or swipe back
4. Item animates accordingly

**Actions:**
- Delete: Red background, trash icon
- Archive: Blue background, folder icon
- More: Grey background, ellipsis

---

## Button Patterns

### Loading Button
**States:**
- Default
- Loading (spinner inside)
- Success (checkmark briefly)
- Error (shake animation)

**Interaction Flow:**
1. Tap button
2. Text changes to spinner (150ms)
3. Button disabled
4. On success: Show checkmark (1s)
5. Return to default

---

### Toggle Switch
**Interaction Flow:**
1. Tap switch
2. Circle slides to other side (200ms)
3. Background color changes
4. State updates

**Animation:**
- Slide: 200ms, Spring
- Color: 200ms, Ease In-Out

---

### Floating Action Button (FAB)
**Interaction Flow:**
1. FAB visible at bottom-right
2. Tap to expand into menu or morph
3. Mini FABs appear (staggered 50ms)
4. Tap action or background to dismiss

**Animation:**
- Expand: 300ms, morph into sheet
- Mini FABs: Stagger 50ms each

---

## Gesture Patterns

### Pinch to Zoom
**Use case:** Images, maps

**Interaction:**
- Two-finger pinch
- Scale content proportionally
- Snap back if too small
- Max zoom limit

---

### Long Press Context Menu
**Interaction Flow:**
1. Long press element (500ms)
2. Haptic feedback
3. Context menu appears
4. Background dims slightly
5. Select action or tap outside to dismiss

**Animation:**
- Menu: Scale + fade, 200ms
- Preview: Slight lift (shadow)

---

### Drag and Drop
**Interaction Flow:**
1. Long press to enter drag mode
2. Element lifts (shadow, scale 1.05)
3. Drag to new position
4. Visual placeholder shows drop zone
5. Release to drop
6. Element animates to final position

---

## Microinteractions

### Like/Heart Animation
**Interaction Flow:**
1. Tap heart icon
2. Icon scales up (150ms)
3. Color changes (grey → red)
4. Particles burst (optional)
5. Scale back to normal (100ms)

**Animation:**
- Scale: 1.0 → 1.3 → 1.0
- Duration: 250ms total
- Color: Instant or 100ms fade

---

### Toast Notification
**Interaction Flow:**
1. Notification slides in (300ms)
2. Stays visible (3-5s)
3. Auto-dismiss or tap X
4. Slides out (200ms)

**Animation:**
- Enter: Slide from top/bottom
- Exit: Fade + slide

**Positions:**
- Top center
- Bottom center
- Bottom right (desktop)

---

## Progressive Disclosure Patterns

### Accordion
**Interaction Flow:**
1. Section collapsed by default
2. Tap header to expand
3. Content slides down (250ms)
4. Chevron rotates 180°
5. Tap again to collapse

**Behavior:**
- Single expand (close others)
- Or multi-expand (independent)

---

### Tooltip
**Interaction Flow:**
1. Hover element (desktop) or tap (mobile)
2. Tooltip appears after 300ms delay
3. Positioned above/below/side
4. Auto-dismiss or tap elsewhere

**Animation:**
- Fade + slight Y movement
- 150ms, Ease Out

---

## Loading Patterns

### Skeleton Screen
**Use case:** Content placeholder

**Behavior:**
- Show grey boxes in place of content
- Shimmer animation (1200ms loop)
- Crossfade to real content when loaded

---

### Progress Indicators
**Types:**
- **Spinner:** Indeterminate loading
- **Progress bar:** Determinate (0-100%)
- **Dots:** Minimal loading indicator

---

## Onboarding Patterns

### Welcome Tour
**Interaction Flow:**
1. Highlight element with spotlight
2. Dim background
3. Show explanation tooltip
4. Next/Skip buttons
5. Step indicators (dots)

**Animation:**
- Spotlight: 300ms fade in
- Tooltip: 200ms after spotlight

---

### Progressive Onboarding
**Context:** Introduce features contextually

**Interaction:**
- First-time tooltips
- Dismiss or complete action
- Mark as seen, don't show again

---

## Best Practices

### Do's ✅
- Provide immediate visual feedback (<100ms)
- Show loading states for operations >500ms
- Use consistent patterns across app
- Make interactive elements obvious (visual affordance)
- Allow cancellation of actions when possible

### Don'ts ❌
- Don't hide critical actions behind too many taps
- Avoid surprise animations (respect reduced motion)
- Don't block UI unnecessarily
- Avoid patterns that conflict with platform conventions
- Don't animate everything (be purposeful)

---

## Accessibility Considerations

- **Keyboard navigation:** All interactions accessible via keyboard
- **Focus indicators:** Visible focus states
- **Screen readers:** Announce state changes
- **Reduced motion:** Respect prefers-reduced-motion
- **Touch targets:** Minimum 44x44px (iOS) / 48x48dp (Android)
