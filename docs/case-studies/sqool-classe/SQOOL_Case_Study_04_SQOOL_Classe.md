
# Case Study 04 — SQOOL Classe

**Subtitle:** Designing a teacher-facing supervision tool for digital classrooms

---

## Context

After Connect’s experiments in 2020–2021, we identified that teachers needed more than just a dashboard: they needed real-time supervision of student activity, especially in classrooms equipped with tablets and PCs.

In 2022, we launched the design of **SQOOL Classe**, a focused web application to let teachers see what students were doing, project screens, and maintain pedagogical flow.

This tool was built from scratch, both technically and from a UX perspective.

---

## My Role

- Product Design Lead — UX, UI, interaction patterns, visual system
- Led vision framing, flows, visual mockups and motion spec
- Worked with the Product Owner and front-end lead in a tight iteration loop
- Built PRDs, prototypes, and supported UXR with teachers

---

## The Challenge

- Design a supervision app that works on low-speed school networks
- Offer visibility into student activity **without being invasive**
- Support classroom rhythm: transitions, pauses, screen projection
- Fit into existing infrastructure and fleet management constraints

---

## What We Made

**SQOOL Classe = Real-time classroom supervision**
- View grid of student screens
- Live preview (thumbnail + refresh)
- Lock/unlock devices
- Project a student screen to the whole class
- Timer and "freeze screen" modes for transitions
- Notifications system with minimal disruption

### Interaction Design Highlights
- **Skeleton loading** to reduce perception of latency
- **State transitions** for devices (off, idle, live, projecting)
- **Hover reveals** and drag-based projection interactions
- Light/dark mode parity
- Adaptable layout for 6 to 32 students per classroom

---

## Outcomes

- Launched in production and deployed in regional contracts
- Positive user feedback from teachers through Customer Success teams
- Became a reference for usability within the suite
- Inspired future projection tools in SQOOL Extend

---

## Artifacts

- **[sqool-classe-ui@2x.png]** — Grid view + projection
- **[motion.gif]** — Screen projection interaction
- **[Deck – Supervision Strategy 2022]**

---

## Testimonial Placeholder

> “This is the first time I felt I could manage my classroom without shouting. SQOOL Classe gave me peace of mind.”  
> — [Teacher, test pilot, 2023]

---

## Learnings

- Supervision UX is about **transparency, not control**
- Teachers want **fluid, legible layouts** — even in stressful moments
- Building for real classrooms means designing for **unreliable networks**
