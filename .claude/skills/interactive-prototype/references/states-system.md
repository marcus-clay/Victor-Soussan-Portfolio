# Component States System

Comprehensive guide to managing component states in interactive prototypes.

---

## Standard State Model

Every interactive component should define these states when applicable:

### Core States

#### 1. Default
- Initial/idle state when component loads
- No user interaction
- Standard styling

#### 2. Hover
- Desktop only (mouse over)
- Subtle visual feedback
- Cursor changes to pointer
- Should hint at interactivity

#### 3. Active / Pressed
- During click/tap (mousedown/touchstart)
- Usually darker or compressed
- Provides tactile feedback
- Brief state (while holding)

#### 4. Focus
- Keyboard navigation or accessibility
- Visible focus ring/outline
- Required for WCAG compliance
- Should work with Tab key

#### 5. Disabled
- Non-interactive state
- Reduced opacity (typically 0.4-0.6)
- Cursor: not-allowed
- Greyed out appearance

#### 6. Selected / Active (Navigation)
- Current active item in navigation
- Persistent state (not momentary)
- Visually distinct from other items
- Examples: Selected tab, active menu item

---

## Extended States

### Loading States

#### 7. Loading
- Processing user action
- Spinner or skeleton UI
- Usually disables interaction
- Show progress when possible

#### 8. Processing
- Similar to loading but for background tasks
- May allow continued interaction
- Subtle indicator (e.g., pulsing dot)

---

### Feedback States

#### 9. Success
- Positive confirmation
- Green color, checkmark icon
- Brief state (2-3s) or persistent
- Examples: Form submission, save confirmation

#### 10. Error
- Validation failure or system error
- Red color, error icon
- Error message visible
- May include shake animation

#### 11. Warning
- Caution state, requires attention
- Yellow/orange color
- Warning message
- Examples: Unsaved changes, quota limits

---

### Input-Specific States

#### 12. Empty
- Input field with no content
- Placeholder visible
- Neutral appearance

#### 13. Filled
- Input contains user data
- Placeholder hidden
- Value visible

#### 14. Valid
- Passes validation rules
- Optional green indicator
- May show checkmark

#### 15. Invalid
- Fails validation
- Red border/background
- Error message below field

---

### Advanced States

#### 16. Dragging
- During drag operation
- Lifted appearance (shadow)
- Reduced opacity (for ghost)
- Shows drop zones

#### 17. Drop Target
- Valid drop zone during drag
- Highlighted or outlined
- Visual feedback for valid drop

#### 18. Expanded
- Disclosure components (accordion, dropdown)
- Shows additional content
- Icon rotates (chevron)

#### 19. Collapsed
- Content hidden
- Compact view
- Clickable to expand

---

## State Combinations

Some components require **compound states** (multiple dimensions):

### Button Example
```
State dimensions:
- Interaction: Default, Hover, Active, Focus, Disabled
- Type: Primary, Secondary, Tertiary
- Size: Small, Medium, Large
- Loading: Idle, Loading

Total combinations: 5 × 3 × 3 × 2 = 90 states
(Not all need to be designed, but logic should handle)
```

### Input Field Example
```
State dimensions:
- Content: Empty, Filled
- Interaction: Default, Focus, Disabled
- Validation: None, Valid, Invalid, Warning

Example compound states:
- Empty-Focus-None
- Filled-Default-Invalid
- Filled-Focus-Valid
```

---

## State Transition Rules

### Transition Matrix

| From → To | Animation | Duration | Trigger |
|-----------|-----------|----------|---------|
| Default → Hover | Color shift | 150ms | Mouse enter |
| Hover → Active | Scale 0.95 | 200ms | Mouse down |
| Active → Default | Scale 1.0 | 200ms | Mouse up |
| Default → Focus | Border glow | Instant | Tab key |
| Default → Loading | Fade spinner | 150ms | Action triggered |
| Loading → Success | Morph to check | 300ms | Action complete |
| Success → Default | Fade out | 1000ms | After 2s delay |
| Default → Error | Shake + red | 200ms | Validation fail |

---

## State Design Guidelines

### Visual Hierarchy
States should have clear visual priority:

1. **Error** - Most attention-grabbing (red, high contrast)
2. **Warning** - Moderate attention (yellow/orange)
3. **Loading** - Indicates system working
4. **Active/Selected** - Shows current context
5. **Hover** - Subtle hint
6. **Default** - Baseline
7. **Disabled** - Least prominent

---

### Color System for States

#### Semantic Colors
```
Success: Green family (#10B981, #16A34A)
Error: Red family (#EF4444, #DC2626)
Warning: Yellow/Orange (#F59E0B, #F97316)
Info: Blue family (#3B82F6, #2563EB)
Neutral: Grey family (#6B7280, #9CA3AF)
```

#### Interaction States (Button Example)
```
Primary Button:
- Default: Blue (#3B82F6)
- Hover: Darker Blue (#2563EB)
- Active: Even Darker (#1D4ED8)
- Disabled: Grey (#9CA3AF) at 40% opacity
```

---

### Opacity Guidelines

| State | Typical Opacity |
|-------|----------------|
| Default | 100% |
| Hover | 100% (color shift instead) |
| Active | 90-95% |
| Disabled | 40-60% |
| Loading | 70-80% |
| Dragging | 50% (ghost) |

---

## State Management Strategies

### Figma Variants
Use component properties to manage states:

```
Button Component:
├─ Property: State
│  ├─ Default
│  ├─ Hover
│  ├─ Active
│  ├─ Focus
│  └─ Disabled
├─ Property: Type
│  ├─ Primary
│  ├─ Secondary
│  └─ Tertiary
└─ Property: Size
   ├─ Small
   ├─ Medium
   └─ Large
```

**Benefits:**
- Easy to swap states in prototype
- Centralized management
- Reduces redundant frames

---

### Prototype State Logic

#### Simple Toggle
```
State A <──→ State B
       (tap to toggle)
```

#### Linear Progression
```
Default → Loading → Success
              └→ Error
```

#### Complex State Machine
```
        ┌─────────┐
        │ Default │
        └────┬────┘
             │ (hover)
        ┌────▼────┐
        │  Hover  │
        └────┬────┘
             │ (click)
        ┌────▼────┐
        │ Loading │
        └────┬────┘
             │
    ┌────────┴────────┐
    ▼                 ▼
┌─────────┐      ┌────────┐
│ Success │      │ Error  │
└─────────┘      └────────┘
```

---

## State Documentation Template

For each component, document:

```markdown
### [Component Name] States

**Default**
- Visual: [Description]
- Trigger: Initial load
- Exit to: Hover (mouse enter)

**Hover**
- Visual: [Description]
- Trigger: Mouse enters bounds
- Animation: 150ms ease-in-out
- Exit to: Active (click), Default (mouse leave)

**Active**
- Visual: [Description]
- Trigger: Mouse down
- Animation: 200ms spring
- Exit to: Loading (on mouse up)

**Loading**
- Visual: Spinner, disabled interaction
- Trigger: Action initiated
- Duration: Variable (async)
- Exit to: Success or Error

**Success**
- Visual: Green checkmark
- Trigger: Action completes successfully
- Duration: 2s
- Animation: Fade in 300ms, fade out 1000ms
- Exit to: Default (after 2s)

**Error**
- Visual: Red border, shake animation
- Trigger: Validation fails or action errors
- Duration: Persistent until corrected
- Animation: Shake 200ms
- Exit to: Default (on correction)
```

---

## Accessibility & States

### ARIA States
Map visual states to ARIA attributes:

```html
<!-- Button -->
<button aria-pressed="false">Default</button>
<button aria-pressed="true">Selected</button>
<button disabled aria-disabled="true">Disabled</button>

<!-- Input -->
<input aria-invalid="false" /> <!-- Valid -->
<input aria-invalid="true" />  <!-- Invalid -->

<!-- Loading -->
<div aria-busy="true">Loading...</div>
```

### Focus Management
- Always show visible focus state
- Don't remove focus outline (use custom styling)
- Trap focus in modals
- Return focus after closing overlays

---

## Testing States

### Checklist
- [ ] All states visually distinct
- [ ] Smooth transitions between states
- [ ] Disabled states non-interactive
- [ ] Focus states keyboard-accessible
- [ ] Loading states prevent double-submission
- [ ] Error states provide clear guidance
- [ ] Success states confirm action
- [ ] Hover states desktop-only (no accidental mobile triggers)

---

## Platform-Specific Considerations

### iOS / Mobile
- No hover state (no mouse)
- Use active/pressed states
- Provide haptic feedback when applicable
- Touch targets: 44x44pt minimum

### Desktop / Web
- Hover states important for discoverability
- Cursor changes (pointer, not-allowed, grab)
- Keyboard focus critical
- Consider right-click states

---

## Common Mistakes to Avoid

❌ **Hover on mobile** - No mouse, won't work
❌ **Invisible focus states** - Accessibility failure
❌ **No disabled state** - Confusing UX
❌ **Instant state changes** - Jarring, no feedback
❌ **Too many states** - Over-engineered, confusing
❌ **Inconsistent states** - Button hover different from link hover
❌ **Forgetting loading states** - User doesn't know if action worked

---

## Quick Reference

| Component | Critical States |
|-----------|----------------|
| Button | Default, Hover, Active, Disabled, Loading |
| Input | Empty, Filled, Focus, Error, Disabled |
| Link | Default, Hover, Active, Visited |
| Checkbox | Unchecked, Checked, Indeterminate, Disabled |
| Toggle | Off, On, Disabled |
| Tab | Default, Selected, Disabled |
| Card | Default, Hover, Selected, Disabled |
| Modal | Closed, Opening, Open, Closing |
