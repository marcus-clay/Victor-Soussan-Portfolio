// Approche page V2 — prose-first layout
// 4 sections: hero, process, lessons, collaboration + deliverables table + CTA

export type Language = 'en' | 'fr'

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const HERO = {
  fr: {
    title: 'Approche',
    paragraphs: [
      "La plupart des produits B2B qui \u00e9chouent ne sont pas mal con\u00e7us. Ils sont con\u00e7us sans avoir pos\u00e9 la bonne question au d\u00e9part, ou sans avoir v\u00e9rifi\u00e9 la r\u00e9ponse assez t\u00f4t. Le prototype arrive trop tard, apr\u00e8s les sp\u00e9cifications, apr\u00e8s les arbitrages budg\u00e9taires, quand il ne peut plus rien changer.",
      "Je con\u00e7ois des outils m\u00e9tiers denses en donn\u00e9es, en bin\u00f4me avec un responsable produit. EdTech, construction, civic tech, m\u00e9dia. Ma m\u00e9thode repose sur un principe simple\u00a0: cadrer le probl\u00e8me, mat\u00e9rialiser une r\u00e9ponse testable en une semaine, et arbitrer sur la base de ce qu\u2019on observe, pas de ce qu\u2019on suppose.",
    ],
  },
  en: {
    title: 'Approach',
    paragraphs: [
      "Most B2B products that fail are not poorly designed. They are designed without asking the right question early enough, or without verifying the answer soon enough. The prototype arrives too late, after the specs, after the budget decisions, when it can no longer change anything.",
      "I design data-dense business tools in partnership with a product lead. EdTech, construction, civic tech, media. My method rests on a simple principle: frame the problem, build a testable answer within a week, and decide based on what we observe, not what we assume.",
    ],
  },
}

// ---------------------------------------------------------------------------
// Process phases (visual block)
// ---------------------------------------------------------------------------

export interface ProcessPhase {
  id: string
  title: { en: string; fr: string }
  description: { en: string; fr: string }
  detail: { en: string; fr: string }
  output: { en: string; fr: string }
  example: { en: string; fr: string }
  color: string
}

export const PROCESS_PHASES: ProcessPhase[] = [
  {
    id: 'frame',
    title: { en: 'Frame', fr: 'Cadrer' },
    description: {
      en: 'Before the first screen, we align on what we are solving and why it matters.',
      fr: 'Avant le premier \u00e9cran, on s\u2019aligne sur ce qu\u2019on r\u00e9sout et pourquoi.',
    },
    detail: {
      en: 'I work with the PM and the business team to define the problem perimeter, the hypotheses we want to test, and the success criteria. We identify the user profiles involved, their real workflows, their frustrations. We map the risks. This framing produces a shared document that everyone can refer to throughout the project, so the team does not revisit the same questions later.',
      fr: 'Je travaille avec le PM et le m\u00e9tier pour d\u00e9finir le p\u00e9rim\u00e8tre du probl\u00e8me, les hypoth\u00e8ses qu\u2019on veut tester, et les crit\u00e8res de succ\u00e8s. On identifie les profils utilisateurs concern\u00e9s, leurs parcours r\u00e9els, leurs frustrations. On cartographie les risques. Ce cadrage produit un document partag\u00e9 auquel tout le monde peut se r\u00e9f\u00e9rer pendant le projet, pour ne pas revenir sur les m\u00eames questions plus tard.',
    },
    output: {
      en: 'Scoping document with perimeter, risks, and hypotheses. FigJam board or Notion doc, restitution deck.',
      fr: 'Document de cadrage avec p\u00e9rim\u00e8tre, risques et hypoth\u00e8ses. Board FigJam ou doc Notion, deck de restitution.',
    },
    example: {
      en: 'France VAE: 10 field interviews with counselors restructured the collective MVP priorities before a single screen was designed.',
      fr: 'France VAE\u00a0: 10 entretiens terrain avec les accompagnateurs ont restructur\u00e9 les priorit\u00e9s du MVP collectif avant qu\u2019un seul \u00e9cran ne soit con\u00e7u.',
    },
    color: '#2D5CF3',
  },
  {
    id: 'build',
    title: { en: 'Build', fr: 'Mat\u00e9rialiser' },
    description: {
      en: 'Short cycles. One week, one testable prototype. Something concrete to put in front of a user or a decision-maker.',
      fr: 'Cycles courts. Une semaine, un prototype testable. Quelque chose de concret \u00e0 mettre devant un utilisateur ou un d\u00e9cideur.',
    },
    detail: {
      en: 'I explore two to three directions, then converge on the one we test. The prototype can be a Figma interactive flow, an HTML page deployed on Vercel, or a coded component, depending on what the question requires. Discovery and delivery run in parallel: while one sprint produces a testable artifact, the previous one is being evaluated. The right level of fidelity depends on the question being asked, not on the project stage.',
      fr: 'J\u2019explore deux \u00e0 trois directions, puis on converge sur celle qu\u2019on teste. Le prototype peut \u00eatre un parcours interactif Figma, une page HTML d\u00e9ploy\u00e9e sur Vercel, ou un composant cod\u00e9, selon ce que la question demande. Discovery et delivery tournent en parall\u00e8le\u00a0: pendant qu\u2019un sprint produit un artefact testable, le pr\u00e9c\u00e9dent est en cours d\u2019\u00e9valuation. Le bon niveau de fid\u00e9lit\u00e9 d\u00e9pend de la question qu\u2019on se pose, pas de l\u2019\u00e9tape du projet.',
    },
    output: {
      en: 'Testable prototype (Figma or HTML), annotated mockups, 2-3 explored directions with rationale.',
      fr: 'Prototype testable (Figma ou HTML), maquettes annot\u00e9es, 2 \u00e0 3 directions explor\u00e9es avec argumentaire.',
    },
    example: {
      en: 'Toolkit: the V2 prototype helped the CEO secure the second funding round. The investors saw the product, not a slide deck.',
      fr: 'Toolkit\u00a0: le prototype V2 a permis au CEO de s\u00e9curiser la 2e lev\u00e9e de fonds. Les investisseurs ont vu le produit, pas un deck de slides.',
    },
    color: '#16A34A',
  },
  {
    id: 'decide',
    title: { en: 'Decide', fr: 'Arbitrer' },
    description: {
      en: 'We test with real users, observe what happens, and let the results shape what comes next.',
      fr: 'On teste avec de vrais utilisateurs, on observe ce qui se passe, et on laisse les r\u00e9sultats orienter la suite.',
    },
    detail: {
      en: 'Moderated tests with five to eight participants, or unmoderated tests via Maze or Lookback with thirty users. Precise scenarios, direct observation. What matters is what people do, not what they say they would do. Every tradeoff is documented. The backlog is fed by test observations and storymaps, not by assumptions. When we need to decide what enters V1 and what waits, we have data to support the conversation.',
      fr: 'Tests mod\u00e9r\u00e9s avec cinq \u00e0 huit participants, ou tests non mod\u00e9r\u00e9s via Maze ou Lookback avec trente utilisateurs. Sc\u00e9narios pr\u00e9cis, observation directe. Ce qui compte, c\u2019est ce que les gens font, pas ce qu\u2019ils disent qu\u2019ils feraient. Chaque arbitrage est document\u00e9. Le backlog se nourrit des observations de test et des storymaps, pas des suppositions. Quand il faut d\u00e9cider ce qui entre dans la V1 et ce qui attend, on a des donn\u00e9es pour appuyer la conversation.',
    },
    output: {
      en: 'Test report (Notion), annotated videos, documented decisions, prioritized backlog informed by facts.',
      fr: 'Rapport de test (Notion), vid\u00e9os annot\u00e9es, d\u00e9cisions document\u00e9es, backlog prioris\u00e9 sur la base de faits.',
    },
    example: {
      en: 'UNOWHY Connect: the dashboard prototype revealed that teachers needed specialized apps. We changed direction. SQOOL Extend V1 was deployed in 5 pilot schools, validated before industrialization.',
      fr: 'UNOWHY Connect\u00a0: le prototype du dashboard a r\u00e9v\u00e9l\u00e9 que les enseignants avaient besoin d\u2019apps sp\u00e9cialis\u00e9es. On a chang\u00e9 de direction. SQOOL Extend V1 a \u00e9t\u00e9 d\u00e9ploy\u00e9e dans 5 lyc\u00e9es pilotes, valid\u00e9e avant industrialisation.',
    },
    color: '#EA580C',
  },
]

// ---------------------------------------------------------------------------
// Process prose (follows the visual block)
// ---------------------------------------------------------------------------

export const PROCESS_SECTION = {
  fr: {
    title: 'Comment le travail se structure',
    subtitle: 'Trois temps, adapt\u00e9s \u00e0 chaque projet. Le rythme se construit ensemble d\u00e8s la premi\u00e8re semaine.',
  },
  en: {
    title: 'How the work is structured',
    subtitle: 'Three stages, adapted to each project. We set the rhythm together from the first week.',
  },
}

// ---------------------------------------------------------------------------
// Lessons (prose section with inline examples)
// ---------------------------------------------------------------------------

export const LESSONS = {
  fr: {
    title: 'Ce qui guide les d\u00e9cisions',
    intro: 'Trois principes qui orientent chaque projet.',
    blocks: [
      {
        heading: 'Un prototype fait avancer un projet plus vite qu\u2019un document.',
        body: "Chez UNOWHY, le prototype du dashboard Connect a montr\u00e9 que les enseignants avaient besoin d\u2019applications sp\u00e9cialis\u00e9es, pas d\u2019un tableau de bord unifi\u00e9. On a chang\u00e9 de direction. Ce prototype qui montrait la \u00ab\u00a0mauvaise\u00a0\u00bb direction a fait gagner six mois au projet, parce qu\u2019il a pos\u00e9 la bonne question au bon moment. Chez Toolkit, le prototype V2 a permis au CEO de s\u00e9curiser la deuxi\u00e8me lev\u00e9e de fonds. Dans les deux cas, le prototype a fait ce qu\u2019un document de sp\u00e9cifications n\u2019aurait jamais fait\u00a0: il a rendu la d\u00e9cision tangible.",
        link: {
          href: '/project/connect/summary',
          label: 'SQOOL Connect',
          thumbnail: '/images/thumbnail-connect.webp',
          description: { en: 'How prototyping the wrong direction saved six months and redefined the product.', fr: 'Comment prototyper la mauvaise direction a économisé six mois et redéfini le produit.' },
        },
      },
      {
        heading: 'On construit une vision cible, on la d\u00e9coupe en incr\u00e9ments testables.',
        body: "Chez UNOWHY, la suite SQOOL est pass\u00e9e de z\u00e9ro \u00e0 cinq applications en deux ans, livr\u00e9es trimestre par trimestre. Chaque incr\u00e9ment \u00e9tait con\u00e7u, test\u00e9, \u00e9valu\u00e9, puis le suivant int\u00e9grait ce qu\u2019on avait appris. SQOOL Extend a \u00e9t\u00e9 d\u00e9ploy\u00e9e dans cinq lyc\u00e9es pilotes avant d\u2019\u00eatre industrialis\u00e9e.",
        link: {
          href: '/project/sqool-classe/summary',
          label: 'SQOOL Classe',
          thumbnail: '/images/thumbnail_sqool_classe.webp',
          description: { en: 'Real-time classroom supervision for 500,000 tablets across 465 high schools.', fr: 'Supervision de classe temps réel pour 500\u00a0000 tablettes dans 465 lycées.' },
        },
      },
      {
        heading: 'L\u2019utilisateur sait ce qui ne fonctionne pas, m\u00eame sans le formuler.',
        body: "Les entretiens servent \u00e0 comprendre les comportements r\u00e9els. Le prototype sert \u00e0 confronter les hypoth\u00e8ses qu\u2019on en tire. Les deux sont n\u00e9cessaires, et les faire dans cet ordre change la qualit\u00e9 de ce qu\u2019on construit. Chez la Banque des Territoires, les tests sur Aquagir ont montr\u00e9 un d\u00e9calage entre le parcours con\u00e7u et le moment r\u00e9el du besoin utilisateur. Chez France VAE, dix entretiens terrain ont suffi \u00e0 r\u00e9ordonner les priorit\u00e9s d\u2019un MVP entier. Je pratique la recherche utilisateur en continu\u00a0: observation sur site, calls avec les \u00e9quipes sales et support, analyse des tickets. La recherche n\u2019est pas une phase, c\u2019est un flux permanent qui alimente les d\u00e9cisions.",
        link: {
          href: '/project/france-vae/full#initiative-3',
          label: 'France VAE',
          thumbnail: '/images/francevae/thumbnail_france_vae.webp',
          description: { en: 'Ten field interviews that reordered the priorities of an entire MVP.', fr: 'Dix entretiens terrain qui ont réordonné les priorités d\u2019un MVP entier.' },
        },
      },
    ],
  },
  en: {
    title: 'What guides the decisions',
    intro: 'Three principles that orient every project.',
    blocks: [
      {
        heading: 'A prototype moves a project forward faster than a document.',
        body: "At UNOWHY, the Connect dashboard prototype showed that teachers needed specialized applications, not a unified dashboard. We changed direction. That prototype showing the \"wrong\" direction saved the project six months, because it asked the right question at the right time. At Toolkit, the V2 prototype helped the CEO secure the second funding round. In both cases, the prototype did what a specification document never could: it made the decision tangible.",
        link: {
          href: '/project/connect/summary',
          label: 'SQOOL Connect',
          thumbnail: '/images/thumbnail-connect.webp',
          description: { en: 'How prototyping the wrong direction saved six months and redefined the product.', fr: 'Comment prototyper la mauvaise direction a économisé six mois et redéfini le produit.' },
        },
      },
      {
        heading: 'Build a target vision, break it down into testable increments.',
        body: "At UNOWHY, the SQOOL suite went from zero to five applications in two years, shipped quarter by quarter. Each increment was designed, tested, evaluated, and the next one incorporated what we had learned. SQOOL Extend was deployed in five pilot schools before being industrialized.",
        link: {
          href: '/project/sqool-classe/summary',
          label: 'SQOOL Classe',
          thumbnail: '/images/thumbnail_sqool_classe.webp',
          description: { en: 'Real-time classroom supervision for 500,000 tablets across 465 high schools.', fr: 'Supervision de classe temps réel pour 500 000 tablettes dans 465 lycées.' },
        },
      },
      {
        heading: 'The user knows what does not work, even without saying it.',
        body: "Interviews help understand real behaviors. The prototype helps confront the hypotheses we draw from them. Both are necessary, and doing them in this order changes the quality of what gets built. At Banque des Territoires, tests on Aquagir showed a gap between the designed journey and the actual moment of user need. At France VAE, ten field interviews were enough to reorder the priorities of an entire MVP. I practice user research continuously: on-site observation, calls with sales and support teams, ticket analysis. Research is not a phase, it is an ongoing stream that feeds decisions.",
        link: {
          href: '/project/france-vae/full#initiative-3',
          label: 'France VAE',
          thumbnail: '/images/francevae/thumbnail_france_vae.webp',
          description: { en: 'Ten field interviews that reordered the priorities of an entire MVP.', fr: 'Dix entretiens terrain qui ont réordonné les priorités d\'un MVP entier.' },
        },
      },
    ],
  },
}

// ---------------------------------------------------------------------------
// Collaboration (prose section with 3 visual sub-blocks)
// ---------------------------------------------------------------------------

export const COLLABORATION = {
  fr: {
    title: 'Travailler ensemble',
    blocks: [
      {
        id: 'pm',
        label: 'Avec le PM',
        body: "Trois principes\u00a0: chaque atelier a un livrable d\u00e9fini, le PM voit l\u2019avancement en continu, et chaque arbitrage est document\u00e9. Les specs sont la responsabilit\u00e9 du PM. Je produis les maquettes annot\u00e9es et les parcours document\u00e9s qui les alimentent. La conception est visible d\u00e8s les premi\u00e8res explorations.",
      },
      {
        id: 'devs',
        label: 'Avec les d\u00e9veloppeurs',
        body: "J\u2019interviens en amont. Reviews des interactions, des cas limites, des \u00e9tats. Chez UNOWHY comme chez Dailymotion, le design system Storybook a \u00e9t\u00e9 construit avec les d\u00e9veloppeurs front, pas livr\u00e9 \u00e0 eux. Cette co-construction change la qualit\u00e9 des composants et r\u00e9duit les allers-retours.",
      },
      {
        id: 'culture',
        label: 'Culture design',
        body: "La culture design se construit par des micro-actions r\u00e9p\u00e9t\u00e9es\u00a0: inviter le PM \u00e0 observer un test utilisateur, animer un atelier d\u2019id\u00e9ation avec le m\u00e9tier et la tech, montrer concr\u00e8tement qu\u2019un test de trente minutes \u00e9vite trois semaines de d\u00e9veloppement dans la mauvaise direction.",
      },
    ],
  },
  en: {
    title: 'Working together',
    blocks: [
      {
        id: 'pm',
        label: 'With the PM',
        body: "Three principles: every workshop has a defined deliverable, the PM sees progress as it happens, and every tradeoff is documented. Product specs are the PM's responsibility. I produce annotated mockups and documented flows that feed them. Design is visible from the first explorations.",
      },
      {
        id: 'devs',
        label: 'With engineering',
        body: "I get involved early. Reviews on interactions, edge cases, states. At UNOWHY and at Dailymotion, the Storybook design system was built with front-end developers, not delivered to them. This co-construction changes the quality of components and reduces back and forth.",
      },
      {
        id: 'culture',
        label: 'Design culture',
        body: "Design culture is built through repeated small actions: inviting the PM to observe a user test, running an ideation workshop with business and tech, showing concretely that a thirty-minute test saves three weeks of development in the wrong direction.",
      },
    ],
  },
}

// ---------------------------------------------------------------------------
// Deliverables table
// ---------------------------------------------------------------------------

export const DELIVERABLES_SECTION = {
  en: {
    title: 'What I produce, by phase',
    subtitle: 'The right level of fidelity depends on the question being asked, not on the project stage.',
    col_activity: 'What we do together',
    col_output: 'What you receive',
    col_format: 'Format',
  },
  fr: {
    title: 'Ce que je produis, par phase',
    subtitle: 'Le bon niveau de fid\u00e9lit\u00e9 d\u00e9pend de la question qu\u2019on se pose, pas de l\u2019\u00e9tape du projet.',
    col_activity: 'Ce qu\u2019on fait ensemble',
    col_output: 'Ce que vous recevez',
    col_format: 'Format',
  },
}

export interface Deliverable {
  activity: { en: string; fr: string }
  output: { en: string; fr: string }
  format: { en: string; fr: string }
  image?: string
}

export const DELIVERABLES: Deliverable[] = [
  {
    activity: { en: 'Framing workshop', fr: 'Atelier de cadrage' },
    output: { en: 'Structured problem, hypotheses, success criteria', fr: 'Probl\u00e8me structur\u00e9, hypoth\u00e8ses, crit\u00e8res de succ\u00e8s' },
    format: { en: 'FigJam board, Notion/Confluence doc, restitution deck', fr: 'Board FigJam, doc Notion/Confluence, deck de restitution' },
    image: '/images/approche/double-diamond.png',
  },
  {
    activity: { en: 'Exploration', fr: 'Exploration' },
    output: { en: '2 to 3 directions to decide between', fr: '2 \u00e0 3 directions \u00e0 arbitrer' },
    format: { en: 'Sketches, lo-fi wireframes (Figma), presentation deck', fr: 'Sketches, wireframes basse fid\u00e9lit\u00e9 (Figma), deck de pr\u00e9sentation' },
  },
  {
    activity: { en: 'Design', fr: 'Conception' },
    output: { en: 'Complete flows, states, edge cases', fr: 'Parcours complets, \u00e9tats, cas limites' },
    format: { en: 'Interactive Figma or HTML prototype', fr: 'Prototype interactif Figma ou HTML' },
    image: '/images/approche/design-teardown.png',
  },
  {
    activity: { en: 'Validation', fr: 'Validation' },
    output: { en: 'Documented field insights, recommendations', fr: 'Insights terrain document\u00e9s, recommandations' },
    format: { en: 'Test report (Notion), annotated videos', fr: 'Rapport de test (Notion), vid\u00e9os annot\u00e9es' },
    image: '/images/approche/persona-journey.png',
  },
  {
    activity: { en: 'Handoff', fr: 'Handoff' },
    output: { en: 'Specs ready for developers', fr: 'Specs pr\u00eates pour les d\u00e9veloppeurs' },
    format: { en: 'Annotated Figma, flows/US, implementation specs', fr: 'Figma annot\u00e9, flows/US, specs d\u2019impl\u00e9mentation' },
  },
  {
    activity: { en: 'Deployment', fr: 'D\u00e9ploiement' },
    output: { en: 'Release presentation, changelog visuals, field demo', fr: 'Pr\u00e9sentation release, visuels changelog, d\u00e9mo terrain' },
    format: { en: 'Hi-fi Figma prototype, design rationale, product copy', fr: 'Prototype Figma hi-fi, partis pris de conception, r\u00e9dactionnel produit' },
  },
]

// ---------------------------------------------------------------------------
// CTA
// ---------------------------------------------------------------------------

export const CTA_SECTION = {
  en: {
    title: 'See the approach in action',
    articles_title: 'Related writing',
    contact_message: 'Interested in working together? Let\u2019s talk.',
  },
  fr: {
    title: 'Voir l\u2019approche en action',
    articles_title: '\u00c9crits li\u00e9s',
    contact_message: 'Envie de collaborer\u00a0? Discutons.',
  },
}

export const RELATED_PROJECT_IDS = ['france-vae', 'toolkit', 'connect']

export const RELATED_ARTICLE_IDS = ['binome-pm-designer', 'scoping-is-the-work']

// ---------------------------------------------------------------------------
// Image placeholders (to be replaced with retina extracts from deck PDFs)
// ---------------------------------------------------------------------------

export const SECTION_IMAGES = {
  process: '/images/approche/double-diamond.png',
  lessons: '/images/approche/persona-journey.png',
  collaboration: '/images/approche/design-teardown.png',
}
