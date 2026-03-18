# Claude Code and Figma MCP: designing and implementing without switching tools

## The design-code gap is a tooling problem, not a skills problem

For as long as digital product design has existed, a gap has separated the mockup from the code. Designers work in one environment, developers in another, and between the two sits a translation layer made of specs documents, redlines, handoff tools, and meetings. Every translation introduces drift. Colors shift by a few hex values. Spacing gets approximated. A component that looked right in Figma renders differently in the browser because the developer interpreted the layout logic their own way.

This gap has real costs, and they are rarely accounted for. Integration cycles that should take hours stretch into days. Designers file visual QA tickets. Developers push back on designs they consider too expensive to implement faithfully. Over time, the team develops a quiet tolerance for "close enough," and the product accumulates small inconsistencies that erode the user experience pixel by pixel.

The problem is structural. When two disciplines work from separate sources of truth, alignment requires constant manual effort. Handoff tools (Zeplin, then Figma's Dev Mode) reduced friction, but they did not eliminate translation. The designer still produces a static artifact that someone else must interpret to turn into code. That interpretation is where drift is born.


## How the Figma MCP and Claude Code connection actually works

Figma MCP (Model Context Protocol) is a protocol that allows external tools to read design data directly from Figma files. Connected to Claude Code, it creates a bridge: the AI agent can inspect a component in Figma, read its properties (spacing, colors, typography tokens, layout constraints, variant states), and generate code that matches the design intent with high fidelity.

The workflow in practice follows three beats. First, I design a component or screen in Figma, following the tokens and structure of the design system I have established. Then, in Claude Code, I reference the relevant Figma frame. Claude Code reads the component through MCP: it pulls the layer hierarchy, the auto-layout settings, the specific token values, the text content. From that structured data, it generates a React component with Tailwind classes that matches the original design.

The first output is rarely perfect. But it is close enough that iteration happens at the right level. Instead of rebuilding a component from scratch, I adjust padding values, refine responsive behavior, or fine-tune an interaction state. The conversation between design and code becomes granular and productive rather than wholesale and frustrating.

The second step is where the real value appears. Once the component renders in the browser, I evaluate it in context: alongside other components, with real content, at different viewport sizes. If something needs to change, I go back to Figma, adjust the design, and Claude Code reads the updated version. The loop takes minutes. I can run through five or six iterations in a single working session, each one informed by what I saw in the actual product.


## A concrete case: from Figma component to deployed component

To make this workflow tangible, here is how it played out on a recent project. I was working on the redesign of my portfolio (the one you are reading), and I needed to create a project card component: a thumbnail with cover image, title, role, period, and a one-line summary. The component had to work in light and dark mode, adapt from mobile to desktop, and respect the existing design system (color tokens, spacing, typography).

In Figma, I designed the component with auto-layout, named tokens for every color and spacing value, and two variants (light/dark). The design work took about 45 minutes, which is normal for a component with responsive constraints and two themes.

In Claude Code, I referenced the Figma frame. The agent read the structure: a vertical flex container, an image at 16:9 ratio with 12px border-radius, a text block with the title in font-semibold, subtitle in text-sm text-gray-500, and 12px spacing between image and text. It generated a functional React/Tailwind component in under two minutes.

The first render in the browser revealed two necessary adjustments. The cover image needed an object-cover treatment that the Figma component did not explicitly specify. And the spacing between cards in grid mode required a different gap value than what Figma used in auto-layout (Figma reasons in spacing between children, CSS in gap on the parent container). I corrected both points in a five-minute iteration.

The final component, tested on mobile and desktop, in light and dark mode, with real content (titles of varying lengths, images of different ratios), was deployed on Vercel less than two hours after starting the work in Figma. In a traditional handoff workflow, this sequence would have taken between two and five days, depending on developer availability and the number of QA back-and-forth cycles.

A second case illustrates behavior on more complex components. On the same project, I needed to produce a full case study page: a layout with a sidebar navigation (table of contents), an editorial body with full-width images, embedded testimonial blocks, and a lightbox system for screenshots. The whole thing had to adapt between a two-column layout on desktop and a stacked layout on mobile, with the sidebar transforming into a dropdown menu.

Here, the workflow showed its limits and strengths simultaneously. The overall page structure (sidebar plus editorial body) was generated correctly on the first pass. The sticky positioning of the sidebar, the scroll-spy calculation to highlight the active section in the table of contents, and the responsive logic for the sidebar-to-dropdown switch required three additional iterations with precise instructions. The final result was functional and faithful to the design, but it took about half a day instead of the two hours for the card component. Complexity is not linear: a component that appears twice as complex can require five times as many iterations.


## What works, what breaks, what requires judgment

After several months of using this workflow across varied projects (personal portfolio, case studies, client prototypes), here is a field assessment.

Simple to moderately complex components translate reliably. Cards, headers, navigation bars, form layouts, list items: these come through with high fidelity because their structure maps cleanly to code. The time savings on these bread-and-butter components is substantial, often between 70 and 80 percent compared to a traditional handoff process.

Complex interactions, animations, and edge cases still require human judgment. Claude Code can generate a hover state or a CSS transition, but nuanced micro-interactions (a spring animation on a card expansion, a staggered list entrance) require explicit and precise instructions. The default result, without guidance, will be functional but generic.

Responsive behavior is an area where the designer's input remains essential. Figma designs are typically created at specific breakpoints. The AI can generate responsive code, but the decisions about how a layout should adapt between breakpoints (what collapses, what reflows, what gets hidden) are design decisions that must be articulated, not assumed.

There is also a quality threshold to consider. If the Figma file is messy (unnamed layers, inconsistent auto-layout usage, detached components), the AI will read messy data and produce messy code. The tool amplifies the quality of your design practice, and it does not compensate for a lack of rigor.


## Design systems become the keystone

This workflow highlights a phenomenon I have observed for several years in product teams: the value of a design system is measured less by its component coverage than by the consistency of its structure.

When tokens are well-named and components follow consistent patterns, the AI generates better code because it has clearer data to work with. A button named "Button/Primary/Large" with tokens "color/brand-primary" and "spacing/button-padding-lg" translates to clean, predictable code. The same button with a layer named "Frame 247" and hardcoded color values produces fragile, hard-to-maintain code.

On a recent project, I designed a complete design system in Figma (foundations, atomic components, composite patterns), then implemented it on a dedicated site in Astro and Tailwind, driven entirely by Claude Code. The design system covered foundations (color, typography, spacing, elevation), atomic components (buttons, inputs, badges, tags), and composite patterns (cards, navigation, forms). The gap between the intended design and the implemented result was near zero on atomic components, and minimal on composite patterns.

This experience confirmed an intuition: in an AI-assisted workflow, the design system is no longer just a tool for visual consistency. It becomes the interface contract between the designer and the code agent. The more explicit and structured that contract is, the more faithful the result.

I observed the same mechanism at larger scale at UNOWHY, where I designed a design system spanning five product brands within a software ecosystem serving 500,000 students. The real challenge of a multi-brand design system is not technical, it is organizational: maintaining token and component consistency when multiple teams contribute in parallel. In a traditional workflow, this consistency naturally degrades over months. With a code agent that reads tokens as the source of truth, drift is detected immediately: if a component does not respect the token, the generated code exposes it. The design system becomes self-auditing. This is a strong argument for investing in design system rigor upfront, even when the team is small, and especially when it is large.


## The feedback loop changes how you design

The most significant change in this workflow is the quality of the feedback loop. In a traditional process, a designer makes decisions in a static environment (Figma) and then waits days or weeks to see those decisions rendered in the actual product. By the time the implementation is ready for review, the designer has moved on to the next feature. Visual QA becomes an afterthought, and compromises accumulate.

With Figma MCP and Claude Code, I see the result of a design decision within minutes. This immediacy changes how I design. I take more risks in the mockup because I know I can evaluate them quickly. I catch proportion issues earlier because I see the component in a real browser context, not just on a Figma canvas. I make better typographic choices because I can test them with actual content and real rendering.

The loop also changes the nature of iteration. Instead of one large feedback cycle (design, handoff, implementation, QA, revision), the process becomes a series of small, fast cycles. Each cycle produces a tangible increment. The cumulative effect is a higher-quality result in less time, with fewer misunderstandings along the way.


## What this means for teams, not just individuals

Most discussions about AI in design focus on the individual practitioner: does it make me faster? Does it replace part of my job? These questions are legitimate, but they miss a broader organizational point.

In a typical product team, the design-development cycle is the primary bottleneck. A designer produces mockups, hands them to a developer, waits for implementation, reviews the result, files correction tickets, and the cycle restarts. This sequential process creates queues, dependencies, and frustrations on both sides.

When a designer can validate component implementation in real time, team dynamics shift. The designer no longer produces an intermediate artifact (the mockup) hoping it will be translated faithfully. They produce an immediately verifiable result. Visual QA back-and-forth decreases. The developer can focus on business logic, architecture, and performance rather than pixel-perfecting a margin that differs by three pixels between the mockup and the browser.

This does not mean the developer disappears from the process. Front-end integration remains a craft that requires a fine understanding of accessibility, performance, state management, and component architecture. What changes is the nature of the collaboration: instead of translating mockups into code, the developer validates, optimizes, and extends the code that the AI workflow produced. The conversation rises in level. Discussions focus on architecture and technical trade-offs, not on adjusting a padding value.

This observation resonates particularly in the French context, where public service and education technology budgets are constrained. I spent six years working in digital education (SQOOL, at UNOWHY), and I saw firsthand how difficult it is to build quality products with small teams and annual budget cycles. A classroom supervision tool designed for teachers must be impeccable in terms of usability, because the teacher has neither the time nor the tolerance for a product that is "good enough." When a team of three can produce and validate components in real time instead of going through a handoff cycle that consumes half the sprint, the quality of the final product changes perceptibly for the end user.

More recently, on France VAE (Validation of Prior Learning), a public digital service operated by beta.gouv, I used this workflow to prototype and deploy a complex interface in one week, where the standard process of specs, validation, development, and testing would have taken a month. The deployed prototype enabled testing hypotheses with real users before committing to definitive development. In a public service context where every euro invested must be justified, this ability to validate quickly and at low cost changes decision dynamics.

What I observe among designers integrating this type of workflow into their practice is that the quality of their work improves measurably, because the loop between intention and execution becomes short enough for them to correct, refine, and learn continuously. The gap between what we design and what actually ships is narrowing. And for those of us who have always cared about that coherence between the design and the final product, this is probably the most concrete transformation these tools bring.
