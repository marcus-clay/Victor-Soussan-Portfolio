// Approche page: acts layout
// Hero statement, contrast block, three acts (Cadrer, Matérialiser, Arbitrer),
// collaboration, weekly rhythm, closing. All copy comes from the previous version of the page
// (prose tightened, nothing added). U+00A0 sits before : ; ? ! and %.

export type Language = 'en' | 'fr'

type Bi<T> = { en: T; fr: T }

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const HERO: Bi<{ title: string; statement: string; lead: string }> = {
  fr: {
    title: 'Approche',
    statement: 'La plupart des produits B2B qui échouent ont posé la bonne question trop tard.',
    lead: 'Je conçois des outils métiers denses en données, en binôme avec un responsable produit. EdTech, construction, civic tech, média.',
  },
  en: {
    title: 'Approach',
    statement: 'Most B2B products that fail asked the right question too late.',
    lead: 'I design data-dense business tools in partnership with a product lead. EdTech, construction, civic tech, media.',
  },
}

// ---------------------------------------------------------------------------
// Contrast: the usual sequence versus the method
// ---------------------------------------------------------------------------

export const CONTRAST: Bi<{
  usual: { title: string; note: string; steps: string[] }
  mine: { title: string; note: string; steps: string[] }
}> = {
  fr: {
    usual: {
      title: 'D’habitude',
      note: 'Le produit est conçu sans avoir posé la bonne question au départ, ou sans avoir vérifié la réponse assez tôt.',
      steps: [
        'Les spécifications.',
        'Les arbitrages budgétaires.',
        'Le prototype, quand il ne peut plus rien changer.',
      ],
    },
    mine: {
      title: 'Ma façon',
      note: 'Ma méthode repose sur un principe simple.',
      steps: [
        'Cadrer le problème.',
        'Matérialiser une réponse testable en une semaine.',
        'Arbitrer sur la base de ce qu’on observe, plutôt que de ce qu’on suppose.',
      ],
    },
  },
  en: {
    usual: {
      title: 'The usual way',
      note: 'The product is designed without asking the right question at the start, or without verifying the answer soon enough.',
      steps: [
        'The specs.',
        'The budget decisions.',
        'The prototype, when it can no longer change anything.',
      ],
    },
    mine: {
      title: 'My way',
      note: 'My method rests on a simple principle.',
      steps: [
        'Frame the problem.',
        'Build a testable answer within a week.',
        'Decide based on what we observe, rather than what we assume.',
      ],
    },
  },
}

// ---------------------------------------------------------------------------
// Acts
// ---------------------------------------------------------------------------

export const ACTS_INTRO: Bi<{ title: string; subtitle: string }> = {
  fr: {
    title: 'Comment le travail se structure',
    subtitle: 'Trois temps, adaptés à chaque projet. Le rythme se construit ensemble dès la première semaine.',
  },
  en: {
    title: 'How the work is structured',
    subtitle: 'Three stages, adapted to each project. We set the rhythm together from the first week.',
  },
}

export interface ActProofLink {
  href: string
  label: Bi<string>
}

/** One real artefact of the work shown under an act, with a short caption */
export interface ActEvidence {
  src: string
  label: Bi<string>
}

export interface ActDeliverable {
  activity: Bi<string>
  output: Bi<string>
  format: Bi<string>
}

export interface Act {
  id: string
  title: Bi<string>
  description: Bi<string>
  detail: Bi<string>
  deliverables: ActDeliverable[]
  /** Three real artefacts (photos, boards, screens, specs), read left to right */
  evidence: ActEvidence[]
  proof: {
    heading: Bi<string>
    body: Bi<string>
    links: ActProofLink[]
  }
}

export const ACTS: Act[] = [
  {
    id: 'frame',
    title: { en: 'Frame', fr: 'Cadrer' },
    description: {
      en: 'Before the first screen, we align on what we are solving and why it matters.',
      fr: 'Avant le premier écran, on s’aligne sur ce qu’on résout et pourquoi.',
    },
    detail: {
      en: 'I work with the PM and the business team to define the problem perimeter, the hypotheses we want to test, and the success criteria. We identify the user profiles involved, their real workflows, their frustrations, and we map the risks. This framing produces a shared document that everyone can refer to throughout the project, so the team does not revisit the same questions later.',
      fr: 'Je travaille avec le PM et le métier pour définir le périmètre du problème, les hypothèses qu’on veut tester et les critères de succès. On identifie les profils utilisateurs concernés, leurs parcours réels, leurs frustrations, et on cartographie les risques. Ce cadrage produit un document partagé auquel tout le monde peut se référer pendant le projet, pour ne pas revenir sur les mêmes questions plus tard.',
    },
    deliverables: [
      {
        activity: { en: 'Framing workshop', fr: 'Atelier de cadrage' },
        output: {
          en: 'Structured problem, perimeter, risks, hypotheses, success criteria',
          fr: 'Problème structuré, périmètre, risques, hypothèses, critères de succès',
        },
        format: {
          en: 'FigJam board, Notion/Confluence doc, restitution deck',
          fr: 'Board FigJam, doc Notion/Confluence, deck de restitution',
        },
      },
    ],
    evidence: [
      {
        src: '/images/approche/persona-journey.webp',
        label: { en: 'Persona and journey map', fr: 'Persona et parcours' },
      },
      {
        src: '/images/francevae/atelier france vae AAP 01.webp',
        label: { en: 'Workshop with the field', fr: 'Atelier avec le terrain' },
      },
      {
        src: '/images/francevae/animation atelier 00.webp',
        label: { en: 'Key figures from the research', fr: 'Chiffres clés de la recherche' },
      },
    ],
    proof: {
      heading: {
        en: 'The user knows what does not work, even without saying it.',
        fr: 'L’utilisateur sait ce qui ne fonctionne pas, même sans le formuler.',
      },
      body: {
        en: 'Interviews help understand real behaviors, the prototype confronts the hypotheses we draw from them. At France VAE, ten field interviews were enough to reorder the priorities of an entire MVP. At Banque des Territoires, tests on Aquagir showed a gap between the designed journey and the actual moment of user need. I practice user research continuously: on-site observation, calls with sales and support teams, ticket analysis.',
        fr: 'Les entretiens servent à comprendre les comportements réels, le prototype à confronter les hypothèses qu’on en tire. Chez France VAE, dix entretiens terrain ont suffi à réordonner les priorités d’un MVP entier. Chez la Banque des Territoires, les tests sur Aquagir ont montré un décalage entre le parcours conçu et le moment réel du besoin. Je pratique la recherche utilisateur en continu : observation sur site, calls avec les équipes sales et support, analyse des tickets.',
      },
      links: [{ href: '/project/france-vae#initiative-3', label: { en: 'France VAE', fr: 'France VAE' } }],
    },
  },
  {
    id: 'build',
    title: { en: 'Build', fr: 'Matérialiser' },
    description: {
      en: 'Short cycles. One week, one testable prototype. Something concrete to put in front of a user or a decision-maker.',
      fr: 'Cycles courts. Une semaine, un prototype testable. Quelque chose de concret à mettre devant un utilisateur ou un décideur.',
    },
    detail: {
      en: 'I explore two to three directions, then converge on the one we test. The prototype can be a Figma interactive flow, an HTML page deployed on Vercel, or a coded component, depending on what the question requires. Discovery and delivery run in parallel: while one sprint produces a testable artifact, the previous one is being evaluated. The right level of fidelity depends on the question being asked, whatever the project stage.',
      fr: 'J’explore deux à trois directions, puis on converge sur celle qu’on teste. Le prototype peut être un parcours interactif Figma, une page HTML déployée sur Vercel ou un composant codé, selon ce que la question demande. Discovery et delivery tournent en parallèle : pendant qu’un sprint produit un artefact testable, le précédent est en cours d’évaluation. Le bon niveau de fidélité dépend de la question qu’on se pose, quelle que soit l’étape du projet.',
    },
    deliverables: [
      {
        activity: { en: 'Exploration', fr: 'Exploration' },
        output: { en: '2 to 3 directions to decide between, with rationale', fr: '2 à 3 directions à arbitrer, avec argumentaire' },
        format: {
          en: 'Sketches, lo-fi wireframes (Figma), presentation deck',
          fr: 'Sketches, wireframes basse fidélité (Figma), deck de présentation',
        },
      },
      {
        activity: { en: 'Design', fr: 'Conception' },
        output: { en: 'Complete flows, states, edge cases', fr: 'Parcours complets, états, cas limites' },
        format: {
          en: 'Interactive Figma or HTML prototype, annotated mockups',
          fr: 'Prototype interactif Figma ou HTML, maquettes annotées',
        },
      },
    ],
    evidence: [
      {
        src: '/images/approche/design-teardown.webp',
        label: { en: 'Directions explored in a workshop', fr: 'Pistes explorées en atelier' },
      },
      {
        src: '/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp',
        label: { en: 'Low-fidelity wireframes', fr: 'Wireframes basse fidélité' },
      },
      {
        src: '/images/connect/connect_dashboard_home_light_full-scaled.webp',
        label: { en: 'The interface, high fidelity', fr: 'L’interface en haute fidélité' },
      },
    ],
    proof: {
      heading: {
        en: 'A prototype moves a project forward faster than a document.',
        fr: 'Un prototype fait avancer un projet plus vite qu’un document.',
      },
      body: {
        en: 'At Toolkit, the V2 prototype helped the CEO secure the second funding round: the investors saw the product instead of a slide deck. It did what a specification document never could, it made the decision tangible.',
        fr: 'Chez Toolkit, le prototype V2 a permis au CEO de sécuriser la deuxième levée de fonds : les investisseurs ont vu le produit plutôt qu’un deck de slides. Il a fait ce qu’un document de spécifications n’aurait jamais fait, il a rendu la décision tangible.',
      },
      links: [{ href: '/project/toolkit', label: { en: 'Toolkit', fr: 'Toolkit' } }],
    },
  },
  {
    id: 'decide',
    title: { en: 'Decide', fr: 'Arbitrer' },
    description: {
      en: 'We test with real users, observe what happens, and let the results shape what comes next.',
      fr: 'On teste avec de vrais utilisateurs, on observe ce qui se passe, et on laisse les résultats orienter la suite.',
    },
    detail: {
      en: 'Moderated tests with five to eight participants, or unmoderated tests via Maze or Lookback with thirty users. Precise scenarios, direct observation: we watch what people do rather than what they say they would do. Every tradeoff is documented. The backlog is fed by test observations and storymaps rather than assumptions. When we need to decide what enters V1 and what waits, we have data to support the conversation.',
      fr: 'Tests modérés avec cinq à huit participants, ou tests non modérés via Maze ou Lookback avec trente utilisateurs. Scénarios précis, observation directe : on regarde ce que les gens font, plus que ce qu’ils disent qu’ils feraient. Chaque arbitrage est documenté. Le backlog se nourrit des observations de test et des storymaps, sans passer par des suppositions. Quand il faut décider ce qui entre dans la V1 et ce qui attend, on a des données pour appuyer la conversation.',
    },
    deliverables: [
      {
        activity: { en: 'Validation', fr: 'Validation' },
        output: {
          en: 'Documented field insights, recommendations, documented decisions',
          fr: 'Insights terrain documentés, recommandations, décisions documentées',
        },
        format: { en: 'Test report (Notion), annotated videos', fr: 'Rapport de test (Notion), vidéos annotées' },
      },
      {
        activity: { en: 'Handoff', fr: 'Handoff' },
        output: { en: 'Specs ready for developers, backlog prioritised on facts', fr: 'Specs prêtes pour les développeurs, backlog priorisé sur la base de faits' },
        format: {
          en: 'Annotated Figma, flows/US, implementation specs',
          fr: 'Figma annoté, flows/US, specs d’implémentation',
        },
      },
      {
        activity: { en: 'Deployment', fr: 'Déploiement' },
        output: { en: 'Release presentation, changelog visuals, field demo', fr: 'Présentation release, visuels changelog, démo terrain' },
        format: {
          en: 'Hi-fi Figma prototype, design rationale, product copy',
          fr: 'Prototype Figma hi-fi, partis pris de conception, rédactionnel produit',
        },
      },
    ],
    evidence: [
      {
        src: '/images/francevae/UXR - interface tableau de bord candidat.webp',
        label: { en: 'The interface tested with users', fr: 'L’interface testée avec les utilisateurs' },
      },
      {
        src: '/images/francevae/UXR - test - tableau prio.webp',
        label: { en: 'Prioritisation after the tests', fr: 'Priorisation après les tests' },
      },
      {
        src: '/images/connect/connect_specifications_implem_01-scaled.webp',
        label: { en: 'Specs for the developers', fr: 'Specs pour les développeurs' },
      },
    ],
    proof: {
      heading: {
        en: 'Build a target vision, break it down into testable increments.',
        fr: 'On construit une vision cible, on la découpe en incréments testables.',
      },
      body: {
        en: 'At UNOWHY, the Connect dashboard prototype showed that teachers needed specialized applications rather than a unified dashboard. We changed direction, which saved the project six months. The SQOOL suite went from zero to five applications in two years, shipped quarter by quarter, and SQOOL Extend was deployed in five pilot schools before being industrialized.',
        fr: 'Chez UNOWHY, le prototype du dashboard Connect a montré que les enseignants avaient besoin d’applications spécialisées plutôt que d’un tableau de bord unifié. On a changé de direction, ce qui a fait gagner six mois au projet. La suite SQOOL est passée de zéro à cinq applications en deux ans, livrées trimestre par trimestre, et SQOOL Extend a été déployée dans cinq lycées pilotes avant d’être industrialisée.',
      },
      links: [
        { href: '/project/connect', label: { en: 'SQOOL Connect', fr: 'SQOOL Connect' } },
        { href: '/project/sqool-classe', label: { en: 'SQOOL Classe', fr: 'SQOOL Classe' } },
      ],
    },
  },
]

export const ACT_LABELS: Bi<{ practice: string; deliverables: string; proof: string; proofLink: string }> = {
  fr: { practice: 'En pratique', deliverables: 'Livrables', proof: 'Preuve', proofLink: 'Voir' },
  en: { practice: 'In practice', deliverables: 'Deliverables', proof: 'Proof', proofLink: 'See' },
}

// ---------------------------------------------------------------------------
// Collaboration
// ---------------------------------------------------------------------------

export const COLLABORATION = {
  fr: {
    title: 'Travailler ensemble',
    blocks: [
      {
        id: 'pm',
        label: 'Avec le PM',
        body: 'Trois principes : chaque atelier a un livrable défini, le PM voit l’avancement en continu, et chaque arbitrage est documenté. Les specs sont la responsabilité du PM. Je produis les maquettes annotées et les parcours documentés qui les alimentent. La conception est visible dès les premières explorations.',
      },
      {
        id: 'devs',
        label: 'Avec les développeurs',
        body: 'J’interviens en amont. Reviews des interactions, des cas limites, des états. Chez UNOWHY comme chez Dailymotion, le design system Storybook a été construit avec les développeurs front, pas livré à eux. Cette co-construction change la qualité des composants et réduit les allers-retours.',
      },
      {
        id: 'culture',
        label: 'Culture design',
        body: 'La culture design se construit par des micro-actions répétées : inviter le PM à observer un test utilisateur, animer un atelier d’idéation avec le métier et la tech, montrer concrètement qu’un test de trente minutes évite trois semaines de développement dans la mauvaise direction.',
      },
    ],
  },
  en: {
    title: 'Working together',
    blocks: [
      {
        id: 'pm',
        label: 'With the PM',
        body: 'Three principles: every workshop has a defined deliverable, the PM sees progress as it happens, and every tradeoff is documented. Product specs are the PM’s responsibility. I produce annotated mockups and documented flows that feed them. Design is visible from the first explorations.',
      },
      {
        id: 'devs',
        label: 'With engineering',
        body: 'I get involved early. Reviews on interactions, edge cases, states. At UNOWHY and at Dailymotion, the Storybook design system was built with front-end developers, not delivered to them. This co-construction changes the quality of components and reduces back and forth.',
      },
      {
        id: 'culture',
        label: 'Design culture',
        body: 'Design culture is built through repeated small actions: inviting the PM to observe a user test, running an ideation workshop with business and tech, showing concretely that a thirty-minute test saves three weeks of development in the wrong direction.',
      },
    ],
  },
}

// ---------------------------------------------------------------------------
// Weekly rhythm (Discovery and Delivery, Monday to Friday)
// ---------------------------------------------------------------------------

export const RHYTHM = {
  en: {
    label: 'Weekly rhythm',
    modes: ['Discovery', 'Delivery'],
    days4: ['Mon', 'Tue to Wed', 'Thu', 'Fri'],
    cells4: [
      ['Frame hypotheses. Who to talk to. Protocol.', 'User interviews. Observations. Data analysis.', 'Map insights. Emerging patterns. Reframe.', 'Restitution. Validate or pivot. Decision.'],
      ['Sync PM/Designer. Sprint goal. Review hypotheses.', 'Exploration or iteration. Async exchanges.', 'Pattern coherence. Prep refinement or demo.', 'Prototype presented. Backlog prioritised.'],
    ],
    footer: 'Monday: align. Midweek: deep work. Friday: share and decide. Rhythm is set together in the first week.',
  },
  fr: {
    label: 'Rythme hebdomadaire',
    modes: ['Discovery', 'Delivery'],
    days4: ['Lun', 'Mar à Mer', 'Jeu', 'Ven'],
    cells4: [
      ['Cadrage hypothèses. Qui on va voir. Protocole.', 'Entretiens utilisateurs. Observations. Analyse données.', 'Cartographie insights. Patterns. Reformulation.', 'Restitution. Validation ou pivot. Décision.'],
      ['Sync PM/Designer. Objectif sprint. Revue hypothèses.', 'Exploration ou itération. Échanges asynchrones.', 'Cohérence patterns. Préparation refinement ou démo.', 'Prototype présenté. Priorisation backlog.'],
    ],
    footer: 'Lundi : s’aligner. Milieu de semaine : travail de fond. Vendredi : partager et décider. Le rythme se construit ensemble dès la première semaine.',
  },
}

// ---------------------------------------------------------------------------
// Closing
// ---------------------------------------------------------------------------

export const CTA_SECTION = {
  en: {
    message: 'Interested in working together? Let’s talk.',
    email: 'Email',
    articles_title: 'Related writing',
  },
  fr: {
    message: 'Envie de collaborer ? Discutons.',
    email: 'Écrire un e-mail',
    articles_title: 'Écrits liés',
  },
}

export const RELATED_ARTICLE_IDS = ['binome-pm-designer', 'scoping-is-the-work']
