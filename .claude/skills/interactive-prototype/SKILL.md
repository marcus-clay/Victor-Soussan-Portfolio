---
name: interactive-prototype
description: Create and document interactive prototypes for Figma, Principle, Bolt, and Lovable. Use when designing micro-interactions, animations, user flows, component states, or creating comprehensive interaction documentation with timelines, technical specs, and implementation details.
---

# Interactive Prototype Skill

Expert guidance for creating, documenting, and implementing interactive prototypes across multiple platforms (Figma, Principle, Bolt, Lovable).

## When to Use This Skill

Use this skill when the user asks to:
- Create prototypes with animations and interactions
- Design micro-interactions or button states
- Document interaction specifications
- Define animation timings and easing curves
- Create user flow prototypes
- Generate interaction documentation with technical details
- Specify component states and transitions
- Create timeline visualizations of interactions

## Core Capabilities

### 1. Prototype Creation
Design interactive prototypes with proper:
- Naming conventions for layers and frames
- Component states (default, hover, active, disabled, etc.)
- Animation specifications (duration, easing, properties)
- Interaction patterns (tap, swipe, hover, scroll)

### 2. Interaction Documentation
Generate comprehensive documentation including:
- Intention and context
- Trigger specifications
- State flow diagrams
- Animation timelines
- Technical implementation details
- Backend API specifications
- Error handling and edge cases

### 3. Platform-Specific Guidance
Tailored advice for:
- **Figma:** Smart Animate, variants, component properties
- **Principle:** Advanced spring physics, timeline editor
- **Bolt/Lovable:** Code-based prototypes with CSS/JS
- **ProtoPie:** Complex conditional logic and variables

## Quick Start

### Create a Simple Prototype

**Example Request:** "Create a button press animation prototype"

**Steps:**
1. Read `references/naming-conventions.md` for proper layer naming
2. Read `references/animation-library.md` for button press specs
3. Read `references/states-system.md` for button states
4. Create Figma frames with proper naming:
   - `Component/Button/Default`
   - `Component/Button/Hover`
   - `Component/Button/Active`
5. Apply animations: 200ms spring, scale 0.95

### Document an Interaction

**Example Request:** "Generate documentation for a menu animation"

**Steps:**
1. Run `scripts/generate_interaction_doc.py` for interactive wizard, OR
2. Use `templates/interaction-doc-template.md` to manually create documentation
3. Fill in all sections: trigger, states, animation, feedback, technical specs
4. Add visual timeline and state diagrams

## Detailed Workflows

### Workflow 1: Design a Micro-interaction

1. **Identify the interaction type**
   - Read `references/interaction-patterns.md` to find similar patterns
   - Choose base pattern (button press, card flip, menu slide, etc.)

2. **Define states**
   - Read `references/states-system.md` for state requirements
   - Create variants for each state (minimum: default, hover, active, disabled)

3. **Set up naming**
   - Follow `references/naming-conventions.md`
   - Use format: `Type-Name-State` or `Type/Name/State`

4. **Apply animations**
   - Read `references/animation-library.md` for timing specs
   - Use 150-300ms for most interactions
   - Choose appropriate easing (spring for tactile, ease-out for entrances)

5. **Test and refine**
   - Check all state transitions
   - Verify animations run at 60fps
   - Test on target platform

### Workflow 2: Create Comprehensive Interaction Documentation

1. **Gather requirements**
   - Understand interaction purpose
   - Identify all triggers and states
   - Determine technical requirements (API calls, data flow)

2. **Generate documentation**
   - Option A: Run `scripts/generate_interaction_doc.py` for guided process
   - Option B: Copy `templates/interaction-doc-template.md` and fill manually

3. **Complete all sections**
   - Overview: Intention and context
   - Trigger: What initiates the interaction
   - States: Visual flow with screenshots
   - Animation: Timing, easing, properties
   - Feedback: Visual, haptic, audio, system
   - Technical: User action, API specs, data flow, error handling
   - Timeline: Visual diagram of sequence
   - Edge cases: Error scenarios, platform considerations

4. **Review and share**
   - Add visual assets (screenshots, diagrams)
   - Complete testing checklist
   - Get team approval

### Workflow 3: Build a Complex User Flow Prototype

1. **Map the flow**
   - Identify all screens in the journey
   - Define transitions between screens
   - Note conditional paths and decision points

2. **Set up frames**
   - Create frames for each screen state: `Screen/Name/State`
   - Group related flows: `Flow/FlowName/Step-N`

3. **Add interactions**
   - Connect frames with appropriate transitions
   - Read `references/animation-library.md` for transition specs
   - Use slide (300ms), modal fade+scale (250ms), or morph (300ms)

4. **Handle edge cases**
   - Error states: `Screen/Name/Error`
   - Loading states: `Screen/Name/Loading`
   - Empty states: `Screen/Name/Empty`

5. **Test complete flow**
   - Walk through all paths
   - Verify all transitions work
   - Check performance on target device

## Platform-Specific Tips

### Figma
- Use **Smart Animate** for property interpolation (matching layer names required)
- Create **Component variants** for state management
- Durations: Instant (0ms), Ease In, Ease Out, Ease In-Out, Custom Bezier
- Prototype with **Overflow Behavior** for scrolling

### Principle
- More advanced **spring physics** controls (mass, stiffness, damping)
- **Timeline editor** for complex multi-step animations
- Better **gesture support** (drag thresholds, velocity)
- Import from Figma or Sketch

### Bolt / Lovable
- Code-based with full **CSS/JS control**
- Use **Framer Motion** for React animations
- **Tailwind CSS** for styling utilities
- Better for **complex state management** and logic

### ProtoPie
- Most advanced **conditional logic** (if/then, variables)
- **Chain multiple conditions** for complex interactions
- **Formulas and calculations** for dynamic values
- Best for **high-fidelity prototypes** close to production

## Common Patterns

### Menu Hamburger with Animation
```
States: Closed → Opening → Open → Closing → Closed
Trigger: Tap icon
Animation: 
  - Icon morph to X: 200ms, Ease In-Out
  - Menu slide from left: 300ms, Ease Out
  - Background overlay fade: 300ms
```

### Button Press Feedback
```
States: Default → Active → Default (or → Loading → Success)
Trigger: Tap button
Animation:
  - Scale 100% → 95% → 100%: 200ms total, Spring
  - Optional: Opacity shift 100% → 90%
Haptic: Light impact (iOS)
```

### Card Swipe to Dismiss
```
States: Default → Dragging → (Dismiss or Snap Back)
Trigger: Swipe left/right
Threshold: 40% of card width
Animation:
  - Follow finger during drag
  - Spring back if < 40%: 250ms
  - Complete swipe if > 40%: 200ms, Ease Out
```

## Reference Files

### Load as needed:
- **`references/naming-conventions.md`** - Layer and frame naming standards
- **`references/animation-library.md`** - Complete animation catalog with durations and easing
- **`references/interaction-patterns.md`** - Reusable UI interaction patterns
- **`references/states-system.md`** - Component state management system

### Generate documentation:
- **`scripts/generate_interaction_doc.py`** - Interactive documentation generator
- **`templates/interaction-doc-template.md`** - Manual documentation template

## Best Practices

### Do's ✅
- Always read relevant reference files before starting
- Use consistent naming conventions across all prototypes
- Keep animations under 300ms for snappy feel
- Document complex interactions thoroughly
- Test on target devices/platforms
- Provide keyboard and screen reader alternatives
- Use spring animations for tactile, organic feel
- Respect `prefers-reduced-motion` for accessibility

### Don'ts ❌
- Don't animate without purpose
- Don't exceed 400ms (feels sluggish)
- Don't forget disabled and error states
- Don't use hover states on mobile (no mouse)
- Don't skip documentation for handoff
- Don't ignore platform conventions
- Don't forget to test performance (60fps target)

## Examples

**Example 1:** "Create a menu hamburger prototype with animation"
1. Read `references/interaction-patterns.md` (Hamburger Menu section)
2. Read `references/animation-library.md` (Screen Transitions)
3. Create frames: `Component/Menu/Closed`, `Component/Menu/Open`
4. Apply: Icon morph 200ms + Menu slide 300ms + Overlay fade 300ms

**Example 2:** "Help me define interactions for a file manager screen"
1. Read `references/interaction-patterns.md` (List, Card, Drag patterns)
2. Read `references/states-system.md` (Component states)
3. Define: List item states, swipe actions, drag & drop, selection
4. Document each interaction with template

**Example 3:** "Generate documentation for an onboarding flow"
1. Run `scripts/generate_interaction_doc.py`
2. Fill in: 3-step flow, slide transitions, skip button, progress indicators
3. Add: Timeline visualization, API calls for step completion tracking
4. Complete: Edge cases (back navigation, incomplete steps)

## Getting Started

For any prototype task:
1. Identify the interaction type (micro-interaction, flow, animation)
2. Read the relevant reference file(s)
3. Follow platform-specific guidelines
4. Document if needed for handoff
5. Test thoroughly

The skill provides everything needed to create professional, well-documented interactive prototypes across all major platforms.
