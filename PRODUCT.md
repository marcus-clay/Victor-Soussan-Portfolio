# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences reach the site, each with a different first question:

- **Hiring side** (head of design, design director, recruiters, for a permanent role): how senior is this person, what is the specialty, can I see two or three convincing projects in a few minutes.
- **Clients for consulting and missions** (product teams, founders, B2B scale-ups): has this person designed dense, data-heavy business tools before, and how do they work with a product manager.
- **Stages and training** (conference organisers, schools, communities): what is the stance, what resources and guides exist, can this person speak or teach.

## Product Purpose

The personal portfolio of Victor Soussan, Lead Product Designer, in French and English. It exists to turn a visit into one of three actions: contact for a role, contact for a mission, or an invitation to speak or teach. Success is a visitor who can state in one sentence what Victor is good at and has opened at least one case study.

## Positioning

Dense, data-rich business products (B2B tools, platforms, back offices) designed in pair with a product manager: frame the problem, build a testable answer within a week, decide on what is observed, not on what is assumed. Nine case studies back this: Toolkit, Dailymotion, Connect, SQOOL Suite, SQOOL Classe, France VAE, PagesJaunes, Android Wear, RiskOS.

## Capabilities and Constraints

- Next.js App Router, bilingual by path prefix (`/en`, `/fr`), statically generated, deployed on Vercel.
- Content spaces: Projets (case studies and short projects), Ressources (articles, guides, templates), plus Approche, Témoignages, À propos, Contact.
- One canonical URL per project (`/project/[id]`), gallery view at `/project/[id]/gallery`.
- Client logos are provided by Victor as files; none are in the repository yet.
- The sqool-classe gallery is intentionally disabled pending rework.

## Brand Commitments

- Peer-to-peer, factual tone grounded in experience. No marketing declarations, no retrospective positioning ("15 years of experience"), forward-looking content, value offered rather than a CV.
- Studio feel, experience-led rather than AI-led.
- French copy follows francais-parfait. No emdash anywhere. No "not X, it's Y" constructions.
- No colored accent borders or accent bars on cards (perceived as generic AI styling).
- Primary call to action is brand blue `#2D5CF3`.

## Evidence on Hand

- Nine case studies with real screens, videos and prototypes under `public/images` and `public/videos`.
- Named client testimonials (for example the founder of Toolkit) in `src/data/testimonialsData.ts`.
- Guides and articles (Claude Code guide, Ship to Show).
- Absent, and not to be invented: client logo files, measured outcomes for Android Wear, RiskOS, Connect and France VAE, and several unsourced figures flagged in the case study audit (see open decisions there).

## Product Principles

1. Show the work before describing the person: a visitor should see real product screens within the first viewport.
2. Every case study answers the same questions in the same order, so two projects can be compared without relearning the page.
3. Proof over claims: a number, a quote or a screen earns its place; an adjective does not.
4. Fast to scan for a recruiter, deep enough for a client: summaries first, detail one level down.

## Accessibility & Inclusion

Keyboard operable throughout, visible focus, reduced-motion respected with fades instead of travel, readable at 390 px and 1440 px, French and English at parity.
