## Design skills stack

Three skills are used together on any UI, motion or interaction work. `anthropic-skills:apple-design` has priority: it leads, and it wins every conflict between the three.

| Priority | Skill | Owns |
|---|---|---|
| 1 | `apple-design` | Interaction model and principles: response, direct manipulation, interruptibility, springs, velocity handoff, momentum, rubber banding, spatial consistency, translucent materials, reduced motion tiers, the eight design principles used as review vocabulary |
| 2 | `emil-design-eng` | Component craft where Apple is silent: easing and durations for non-gesture transitions, press and hover states, stagger, enter and exit details |
| 3 | `impeccable` | Mode (the site is mostly Experience, case studies and guides are Read), shape, critique, audit, polish, craft floor, absolute bans |

## Order

1. `apple-design`: frame the interaction first. Is it touchable or gesture-driven? Then it is a spring, 1:1 tracking, interruptible, with velocity handoff. Is it static? Then use its principles (purpose, familiarity, simplicity, craft), materials and typography rules as the reference.
2. `emil-design-eng`: fill in component-level decisions that Apple does not cover.
3. `impeccable`: load context, pick the sub-command (`shape`, `critique`, `audit`, `polish`), read `craft-floor.md` before any UI edit. Run `polish` or `audit` last, on the rendered result at the sizes it ships at.

For motion work, `design-motion-principles` still runs after `emil-design-eng`, as in the global skills priority rule.

## Conflicts between the skills

- Gesture-driven or interruptible motion: Apple wins. Springs, not CSS transitions or keyframes, damping 1.0 by default, bounce only after a gesture that carried momentum.
- Non-gesture micro-interactions (hover, press, fade, small state changes): Emil's easing and durations apply, within Apple's rules on instant response and reduced motion.
- Materials, depth, enter and exit paths, boundaries: Apple wins.
- Aesthetic direction and bans: Impeccable's craft floor and absolute bans still apply, but its direction never overrides an Apple interaction rule.

## Project rules above all three

`design-system.md` and `writing-rules.md` win over all three skills. Where a skill disagrees with them, keep the project rule:

- Font stays Public Sans. Ignore Apple's "default to the system font".
- Type sizes, tracking and leading come from the Tailwind tokens. Ignore fixed `letter-spacing` values quoted by the skills.
- Carousels stay on `useSnapScroller` (spring, rubber band, momentum already implemented). Do not rebuild them from the Apple examples.
- Overlays lock scroll with `useScrollLock`. Hover patterns for media and lists stay as documented.
- Brand blue CTA, no colored accent borders or bars, no emdash, `francais-parfait` for French copy.
- Reduced motion follows the gentle behavior already shipped (commit e450cdd): shorter cross-fades, no removal of feedback.

## Guardrails

- `impeccable` sub-commands `bolder`, `overdrive`, `delight` and `colorize` run only on explicit request. Default is refinement that preserves the existing hierarchy.
- No overshoot on fades, menus or page transitions.
- When invoked as part of this chain, ignore the Apple skill's canned "I'm ready to help" opening and go straight to the task.
- Verify by rendering on localhost at 390px and desktop before reporting done.
