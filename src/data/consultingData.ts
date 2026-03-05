/**
 * Consulting Page - Structured Data
 * Bilingual content for the corporate consulting landing page.
 * Approach: Clay Christensen JTBD (symptom / cause / cost).
 */

// --- Types ---

export interface LifecyclePhase {
  id: string;
  icon: string; // Lucide icon name
  title_en: string;
  title_fr: string;
  symptom_en: string;
  symptom_fr: string;
  cause_en: string;
  cause_fr: string;
  cost_en: string;
  cost_fr: string;
}

export interface Offering {
  id: string;
  icon: string;
  title_en: string;
  title_fr: string;
  desc_en: string;
  desc_fr: string;
  deliverables_en: string[];
  deliverables_fr: string[];
  duration_en: string;
  duration_fr: string;
}

export interface ScenarioStep {
  label_en: string;
  label_fr: string;
  detail_en: string;
  detail_fr: string;
}

export interface Scenario {
  id: string;
  title_en: string;
  title_fr: string;
  duration_en: string;
  duration_fr: string;
  context_en: string;
  context_fr: string;
  steps: ScenarioStep[];
  outcome_en: string;
  outcome_fr: string;
  offerings: string[];
}

export interface Reference {
  id: string;
  client: string;
  logo: string;
  sector_en: string;
  sector_fr: string;
  scope_en: string;
  scope_fr: string;
  outcome_en: string;
  outcome_fr: string;
  duration_en: string;
  duration_fr: string;
  caseStudyId?: string;
}

export interface DeliveryMode {
  id: string;
  icon: string;
  title_en: string;
  title_fr: string;
  desc_en: string;
  desc_fr: string;
  duration_en: string;
  duration_fr: string;
  best_for_en: string[];
  best_for_fr: string[];
}

// --- Data ---

export const LIFECYCLE_PHASES: LifecyclePhase[] = [
  {
    id: 'structuring',
    icon: 'Target',
    title_en: 'Structuring the product',
    title_fr: 'Structurer le produit',
    symptom_en: 'Development is progressing but the client keeps requesting changes. Each delivery triggers a new round of adjustments. The team works hard, yet the product does not converge.',
    symptom_fr: 'Le d\u00e9veloppement avance mais le client demande sans cesse des modifications. Chaque livraison d\u00e9clenche un nouveau cycle d\'ajustements. L\'\u00e9quipe travaille beaucoup, et pourtant le produit ne converge pas.',
    cause_en: 'There is no upstream product framing. User journeys are not arbitrated, feature scope is not validated, and the team builds on assumptions rather than evidence.',
    cause_fr: 'Il n\'y a pas de cadrage produit en amont. Les parcours utilisateurs ne sont pas arbitr\u00e9s, le p\u00e9rim\u00e8tre fonctionnel n\'est pas valid\u00e9, et l\'\u00e9quipe construit sur des suppositions plut\u00f4t que sur des faits.',
    cost_en: 'Rework accumulates. Delivery timelines slip. The engineering team loses velocity, and the client loses confidence in the process.',
    cost_fr: 'Le retravail s\'accumule. Les d\u00e9lais de livraison glissent. L\'\u00e9quipe technique perd en v\u00e9locit\u00e9, et le client perd confiance dans le processus.',
  },
  {
    id: 'acquisition',
    icon: 'Users',
    title_en: 'Acquiring and onboarding users',
    title_fr: 'Acqu\u00e9rir et embarquer les utilisateurs',
    symptom_en: 'The platform is live. It works. But usage remains flat. The onboarding flow is technically functional, yet new users drop off before completing their first meaningful action.',
    symptom_fr: 'La plateforme est en ligne. Elle fonctionne. Mais l\'usage reste \u00e0 plat. Le parcours d\'inscription est techniquement op\u00e9rationnel, et pourtant les nouveaux utilisateurs d\u00e9crochent avant de r\u00e9aliser leur premi\u00e8re action significative.',
    cause_en: 'There is no formalized acquisition strategy. The onboarding does not guide users toward the core value. Landing pages do not speak the language of the people they are trying to reach.',
    cause_fr: 'Il n\'y a pas de strat\u00e9gie d\'acquisition formalis\u00e9e. L\'onboarding ne guide pas les utilisateurs vers la valeur cl\u00e9. Les landing pages ne parlent pas le langage des personnes qu\'elles cherchent \u00e0 atteindre.',
    cost_en: 'The development investment does not translate into adoption. The gap between the tool as conceived and the tool as experienced generates frustration on both sides.',
    cost_fr: 'L\'investissement technique ne se traduit pas en adoption. L\'\u00e9cart entre l\'outil tel qu\'il a \u00e9t\u00e9 con\u00e7u et l\'outil tel qu\'il est v\u00e9cu g\u00e9n\u00e8re de la frustration des deux c\u00f4t\u00e9s.',
  },
  {
    id: 'conversion',
    icon: 'Zap',
    title_en: 'Converting usage into value',
    title_fr: 'Convertir l\'usage en valeur',
    symptom_en: 'The platform generates traffic. Users browse, search, explore. But the key actions that drive value (contact, booking, transaction) remain consistently low.',
    symptom_fr: 'La plateforme g\u00e9n\u00e8re du trafic. Les utilisateurs naviguent, cherchent, explorent. Mais les actions cl\u00e9s qui cr\u00e9ent de la valeur (contact, r\u00e9servation, transaction) restent syst\u00e9matiquement basses.',
    cause_en: 'The user journey contains friction points that were never mapped or tested. Calls to action do not match user intent. The interface pushes features rather than guiding toward outcomes.',
    cause_fr: 'Le parcours utilisateur contient des points de friction qui n\'ont jamais \u00e9t\u00e9 cartographi\u00e9s ni test\u00e9s. Les appels \u00e0 l\'action ne correspondent pas \u00e0 l\'intention de l\'utilisateur. L\'interface pousse des fonctionnalit\u00e9s plut\u00f4t que de guider vers un r\u00e9sultat.',
    cost_en: 'Acquisition spend is not recovered. Users leave before generating value. The product team invests in new features while the existing funnel leaks.',
    cost_fr: 'Les d\u00e9penses d\'acquisition ne sont pas amorties. Les utilisateurs repartent avant de g\u00e9n\u00e9rer de la valeur. L\'\u00e9quipe produit investit dans de nouvelles fonctionnalit\u00e9s alors que le funnel existant fuit.',
  },
  {
    id: 'retention',
    icon: 'RefreshCw',
    title_en: 'Retaining and growing engagement',
    title_fr: 'Fid\u00e9liser et d\u00e9velopper l\'engagement',
    symptom_en: 'Users come once and do not return. The platform acquires new users each month, but the active user base does not grow. Revenue stagnates despite continuous investment.',
    symptom_fr: 'Les utilisateurs viennent une fois et ne reviennent pas. La plateforme acquiert de nouveaux utilisateurs chaque mois, mais la base active ne progresse pas. Le revenu stagne malgr\u00e9 un investissement continu.',
    cause_en: 'There is no compelling reason to return. The experience does not evolve with usage. Notifications are generic. The value that brought users in the first time is not reinforced over time.',
    cause_fr: 'Il n\'y a pas de raison forte de revenir. L\'exp\u00e9rience n\'\u00e9volue pas avec l\'usage. Les notifications sont g\u00e9n\u00e9riques. La valeur qui a amen\u00e9 les utilisateurs la premi\u00e8re fois n\'est pas renforc\u00e9e au fil du temps.',
    cost_en: 'Customer acquisition cost is not amortized. Revenue growth requires a constant flow of new users rather than deepening existing relationships. The business model does not compound.',
    cost_fr: 'Le co\u00fbt d\'acquisition n\'est pas amorti. La croissance du revenu n\u00e9cessite un flux constant de nouveaux utilisateurs plut\u00f4t que d\'approfondir les relations existantes. Le mod\u00e8le \u00e9conomique ne capitalise pas.',
  },
];

export const OFFERINGS: Offering[] = [
  {
    id: 'diagnostic',
    icon: 'Search',
    title_en: 'Product Diagnostic',
    title_fr: 'Diagnostic Produit',
    desc_en: 'Audit of the existing product, user behavior analysis, stakeholder interviews, and structured restitution. The diagnostic reveals the root causes of visible problems and produces a prioritized action plan.',
    desc_fr: 'Audit du produit existant, analyse des comportements utilisateurs, entretiens avec les parties prenantes, et restitution structur\u00e9e. Le diagnostic r\u00e9v\u00e8le les causes profondes des probl\u00e8mes visibles et produit un plan d\'action prioris\u00e9.',
    deliverables_en: [
      'Illustrated diagnosis report',
      'Structured hypotheses and risk mapping',
      'Prioritized backlog with recommendations',
      'Stakeholder presentation',
    ],
    deliverables_fr: [
      'Compte rendu de diagnostic illustr\u00e9',
      'Hypoth\u00e8ses structur\u00e9es et cartographie des risques',
      'Backlog prioris\u00e9 avec recommandations',
      'Pr\u00e9sentation aux parties prenantes',
    ],
    duration_en: '1 to 2 weeks',
    duration_fr: '1 \u00e0 2 semaines',
  },
  {
    id: 'sprint-prototype',
    icon: 'Zap',
    title_en: 'Prototype Sprint',
    title_fr: 'Sprint Prototype',
    desc_en: 'Rapid design of interactive prototypes to test hypotheses with real users before committing to development. Functional HTML prototypes that stakeholders can experience directly, not static mockups.',
    desc_fr: 'Conception rapide de prototypes interactifs pour tester des hypoth\u00e8ses avec de vrais utilisateurs avant d\'engager du d\u00e9veloppement. Des prototypes HTML fonctionnels que les parties prenantes peuvent manipuler directement.',
    deliverables_en: [
      'Functional HTML prototypes (5 to 15 screens)',
      'User test report (5 sessions)',
      'Functional specifications',
      'Implementation backlog',
    ],
    deliverables_fr: [
      'Prototypes HTML fonctionnels (5 \u00e0 15 \u00e9crans)',
      'Rapport de tests utilisateurs (5 sessions)',
      'Sp\u00e9cifications fonctionnelles',
      'Backlog d\'impl\u00e9mentation',
    ],
    duration_en: '2 to 3 weeks',
    duration_fr: '2 \u00e0 3 semaines',
  },
  {
    id: 'user-research',
    icon: 'Users',
    title_en: 'User Research',
    title_fr: 'Recherche Utilisateur',
    desc_en: 'Qualitative interviews, usability tests, or combined methodology. Protocol adapted to context: moderated or unmoderated, remote or in-person, panel recruited for purpose. The synthesis produces actionable data to inform product decisions.',
    desc_fr: 'Entretiens qualitatifs, tests d\'usabilit\u00e9, ou m\u00e9thodologie combin\u00e9e. Protocole adapt\u00e9 au contexte : mod\u00e9r\u00e9 ou non, \u00e0 distance ou en pr\u00e9sentiel, panel recrut\u00e9 sur mesure. La synth\u00e8se produit des donn\u00e9es actionnables pour informer les d\u00e9cisions produit.',
    deliverables_en: [
      'Research brief and interview guides',
      'Individual session syntheses',
      'Consolidated report with insight matrix',
      'Prioritized recommendations and backlog',
    ],
    deliverables_fr: [
      'Brief recherche et guides d\'entretien',
      'Synth\u00e8ses individuelles par session',
      'Rapport consolid\u00e9 avec matrice d\'insights',
      'Recommandations prioris\u00e9es et backlog',
    ],
    duration_en: '3 to 6 weeks',
    duration_fr: '3 \u00e0 6 semaines',
  },
  {
    id: 'ux-continue',
    icon: 'RefreshCw',
    title_en: 'Ongoing UX Partnership',
    title_fr: 'UX Continue',
    desc_en: 'Regular support alongside the product team: sprint reviews, UX arbitration, intermediate testing, mockup evolutions. A flexible format adapted to your sprint rhythm, providing senior design input without the overhead of a full-time hire.',
    desc_fr: 'Accompagnement r\u00e9gulier aux c\u00f4t\u00e9s de l\'\u00e9quipe produit : revues de sprint, arbitrages UX, tests interm\u00e9diaires, \u00e9volutions de maquettes. Un format souple adapt\u00e9 au rythme de vos sprints, qui apporte une expertise design senior sans le co\u00fbt d\'un recrutement.',
    deliverables_en: [
      'Evolving mockups and design iterations',
      'Sprint reviews and UX arbitration',
      'Intermediate user tests',
      'Continuous design adjustments',
    ],
    deliverables_fr: [
      'Maquettes \u00e9volutives et it\u00e9rations design',
      'Revues de sprint et arbitrages UX',
      'Tests utilisateurs interm\u00e9diaires',
      'Ajustements design continus',
    ],
    duration_en: '3 to 12 months',
    duration_fr: '3 \u00e0 12 mois',
  },
  {
    id: 'lead-experience',
    icon: 'Layers',
    title_en: 'Lead Experience',
    title_fr: 'Lead Exp\u00e9rience',
    desc_en: 'Senior positioning in direct contact with the product director or executive committee. Conceptualization, design project structuring, framing, and execution planning. For organizations that need strategic design leadership without hiring a full-time Head of Design.',
    desc_fr: 'Positionnement senior en lien direct avec la direction produit ou le comit\u00e9 de direction. Conceptualisation, structuration du projet design, cadrage et plan de r\u00e9alisation. Pour les organisations qui ont besoin d\'un leadership design strat\u00e9gique sans recruter un Head of Design \u00e0 plein temps.',
    deliverables_en: [
      'Execution plan and experience roadmap',
      'Product practice structuring',
      'Stakeholder alignment (C-Level, PM, Engineering)',
      'Individual coaching and team mentoring',
    ],
    deliverables_fr: [
      'Plan de r\u00e9alisation et roadmap exp\u00e9rience',
      'Structuration de la pratique produit',
      'Alignement des parties prenantes (Codir, PM, Engineering)',
      'Coaching individuel et mentorat d\'\u00e9quipe',
    ],
    duration_en: '3 to 6 months',
    duration_fr: '3 \u00e0 6 mois',
  },
];

export const SCENARIOS: Scenario[] = [
  {
    id: 'first-collaboration',
    title_en: 'First collaboration: from diagnostic to tested prototype',
    title_fr: 'Premi\u00e8re collaboration : du diagnostic au prototype test\u00e9',
    duration_en: '6 weeks',
    duration_fr: '6 semaines',
    context_en: 'A digital director at a public institution manages a platform connecting local actors with funding programs. The product is live, technically functional, but adoption is flat. Before committing to a full redesign, the team needs to understand what is actually blocking users and to see what an improved experience could look like.',
    context_fr: 'Le directeur digital d\'une institution publique pilote une plateforme qui met en relation des acteurs locaux avec des programmes de financement. Le produit est en ligne, techniquement fonctionnel, mais l\'adoption stagne. Avant de s\'engager dans une refonte compl\u00e8te, l\'\u00e9quipe a besoin de comprendre ce qui bloque concr\u00e8tement les utilisateurs et de visualiser ce que pourrait donner une exp\u00e9rience am\u00e9lior\u00e9e.',
    steps: [
      {
        label_en: 'Weeks 1-2',
        label_fr: 'Semaines 1-2',
        detail_en: 'Product diagnostic: audit existing flows, analyze behavioral data, conduct 5 user interviews.',
        detail_fr: 'Diagnostic produit : audit des parcours existants, analyse des donn\u00e9es comportementales, 5 entretiens utilisateurs.',
      },
      {
        label_en: 'Week 3',
        label_fr: 'Semaine 3',
        detail_en: 'Framing workshop with the product team: restitution of findings, alignment on 3 priority improvements.',
        detail_fr: 'Atelier de cadrage avec l\'\u00e9quipe produit : restitution des constats, alignement sur 3 am\u00e9liorations prioritaires.',
      },
      {
        label_en: 'Weeks 4-5',
        label_fr: 'Semaines 4-5',
        detail_en: 'Prototype sprint: redesign 3 key user flows, build a functional clickable prototype.',
        detail_fr: 'Sprint prototype : refonte de 3 parcours cl\u00e9s, production d\'un prototype interactif fonctionnel.',
      },
      {
        label_en: 'Week 6',
        label_fr: 'Semaine 6',
        detail_en: 'User testing with 5 end users. Synthesis, prioritized backlog, and recommendations.',
        detail_fr: 'Tests utilisateurs avec 5 usagers finaux. Synth\u00e8se, backlog prioris\u00e9 et recommandations.',
      },
    ],
    outcome_en: 'A tested prototype demonstrating the improvement potential. A prioritized backlog the product team can execute on. Factual evidence to secure the budget for the next phase.',
    outcome_fr: 'Un prototype test\u00e9 qui d\u00e9montre le potentiel d\'am\u00e9lioration. Un backlog prioris\u00e9 que l\'\u00e9quipe produit peut ex\u00e9cuter. Des \u00e9l\u00e9ments factuels pour d\u00e9fendre le budget de la phase suivante.',
    offerings: ['diagnostic', 'sprint-prototype'],
  },
  {
    id: 'phase-2',
    title_en: 'Phase 2: scaling what works',
    title_fr: 'Phase 2 : passer \u00e0 l\'\u00e9chelle',
    duration_en: '3 months',
    duration_fr: '3 mois',
    context_en: 'The initial diagnostic delivered clear results. The research validated several hypotheses, and the first prototype convinced stakeholders. The team now wants to go further: a complete redesign of the key flows, with a solid research foundation and tested prototypes ready for development.',
    context_fr: 'Le diagnostic initial a produit des r\u00e9sultats clairs. La recherche a valid\u00e9 plusieurs hypoth\u00e8ses, et le premier prototype a convaincu les parties prenantes. L\'\u00e9quipe veut maintenant aller plus loin : une refonte compl\u00e8te des parcours cl\u00e9s, avec une base de recherche solide et des prototypes test\u00e9s pr\u00eats pour le d\u00e9veloppement.',
    steps: [
      {
        label_en: 'Week 1',
        label_fr: 'Semaine 1',
        detail_en: 'Framing V2: define scope, research protocol, and success metrics for the extended engagement.',
        detail_fr: 'Cadrage V2 : d\u00e9finir le p\u00e9rim\u00e8tre, le protocole de recherche et les m\u00e9triques de succ\u00e8s pour la phase \u00e9tendue.',
      },
      {
        label_en: 'Weeks 2-6',
        label_fr: 'Semaines 2-6',
        detail_en: 'Complete user research: 10 moderated sessions, double methodology (interviews + usability tests).',
        detail_fr: 'Recherche utilisateur compl\u00e8te : 10 sessions mod\u00e9r\u00e9es, double m\u00e9thodologie (entretiens + tests d\'usabilit\u00e9).',
      },
      {
        label_en: 'Weeks 7-10',
        label_fr: 'Semaines 7-10',
        detail_en: 'Iterative design: prototypes, user tests, design system foundations. Each cycle informed by the previous.',
        detail_fr: 'Conception it\u00e9rative : prototypes, tests utilisateurs, fondations du design system. Chaque cycle nourri par le pr\u00e9c\u00e9dent.',
      },
      {
        label_en: 'Weeks 11-12',
        label_fr: 'Semaines 11-12',
        detail_en: 'Delivery and handoff: specifications, documentation, team training on new processes.',
        detail_fr: 'Livraison et passation : sp\u00e9cifications, documentation, formation de l\'\u00e9quipe aux nouveaux processus.',
      },
    ],
    outcome_en: 'Redesigned and tested user flows. Initial design system. Implementation-ready specifications. The team knows exactly what to build and in what order.',
    outcome_fr: 'Parcours utilisateurs redesign\u00e9s et test\u00e9s. Design system initial. Sp\u00e9cifications exploitables. L\'\u00e9quipe sait exactement quoi construire et dans quel ordre.',
    offerings: ['user-research', 'sprint-prototype', 'ux-continue'],
  },
  {
    id: 'structural-partnership',
    title_en: 'Structural partnership: building the design practice',
    title_fr: 'Partenariat structurel : construire la pratique design',
    duration_en: '6 months',
    duration_fr: '6 mois',
    context_en: 'A large organization is launching a digital product that will serve thousands of users. Six months of development are planned. The product team needs structured framing before the first sprint, and ongoing design support throughout execution to avoid the rework that typically costs 30 to 40 percent of the initial budget.',
    context_fr: 'Un grand compte lance un produit num\u00e9rique qui servira des milliers d\'utilisateurs. Six mois de d\u00e9veloppement sont pr\u00e9vus. L\'\u00e9quipe produit a besoin d\'un cadrage structur\u00e9 avant le premier sprint, et d\'un accompagnement design continu tout au long de l\'ex\u00e9cution pour \u00e9viter le retravail qui co\u00fbte g\u00e9n\u00e9ralement 30 \u00e0 40 % du budget initial.',
    steps: [
      {
        label_en: 'Week 1',
        label_fr: 'Semaine 1',
        detail_en: 'Framing workshop (2 days): product model, key journeys, stakeholder prioritization.',
        detail_fr: 'Atelier de cadrage (2 jours) : mod\u00e8le produit, parcours cl\u00e9s, priorisation parties prenantes.',
      },
      {
        label_en: 'Weeks 2-4',
        label_fr: 'Semaines 2-4',
        detail_en: 'Design sprint (10 days): wireframes, interactive prototype, design system, functional specifications.',
        detail_fr: 'Sprint conception (10 jours) : wireframes, prototype interactif, design system, sp\u00e9cifications fonctionnelles.',
      },
      {
        label_en: 'Week 5',
        label_fr: 'Semaine 5',
        detail_en: 'Production handoff: implementation-ready specs delivered to the engineering team.',
        detail_fr: 'Handoff production : sp\u00e9cifications exploitables livr\u00e9es \u00e0 l\'\u00e9quipe technique.',
      },
      {
        label_en: 'Months 2-6',
        label_fr: 'Mois 2-6',
        detail_en: 'Ongoing UX (4 days/month): sprint reviews, intermediate tests, UX arbitration.',
        detail_fr: 'UX continue (4 jours/mois) : revues de sprint, tests interm\u00e9diaires, arbitrages UX.',
      },
    ],
    outcome_en: 'Project delivered on time. No rework from insufficient framing. The design practice is established and the team is autonomous by month 6.',
    outcome_fr: 'Projet livr\u00e9 dans les temps. Pas de retravail li\u00e9 \u00e0 un cadrage insuffisant. La pratique design est \u00e9tablie et l\'\u00e9quipe est autonome au mois 6.',
    offerings: ['lead-experience', 'sprint-prototype', 'ux-continue'],
  },
];

export const REFERENCES: Reference[] = [
  {
    id: 'bdt',
    client: 'Banque des Territoires',
    logo: '/logos/Logo-Banque-des-territoires-600x300-1.webp',
    sector_en: 'B2G Marketplace',
    sector_fr: 'Marketplace B2G',
    scope_en: 'Search engine redesign and conversion optimization across two marketplace platforms (Aquagir, Num\u00e9rique360).',
    scope_fr: 'Refonte du moteur de recherche et optimisation de la conversion sur deux plateformes marketplace (Aquagir, Num\u00e9rique360).',
    outcome_en: 'Conversion funnel redesigned with 27+ tested HTML prototypes. 70+ days of downstream development generated.',
    outcome_fr: 'Funnel de conversion redesign\u00e9 avec 27+ prototypes HTML test\u00e9s. 70+ jours de d\u00e9veloppement g\u00e9n\u00e9r\u00e9s en aval.',
    duration_en: '6 months (2 missions)',
    duration_fr: '6 mois (2 missions)',
  },
  {
    id: 'fepem',
    client: 'FEPEM',
    logo: '/logos/logo fepem.webp',
    sector_en: 'Service Platform',
    sector_fr: 'Plateforme de services',
    scope_en: 'User research for the MonEmploiDirect mobile app launch. Moderated and unmoderated usability tests with employers and employees.',
    scope_fr: 'Recherche utilisateur pour le lancement de l\'application mobile MonEmploiDirect. Tests d\'usabilit\u00e9 mod\u00e9r\u00e9s et non mod\u00e9r\u00e9s avec employeurs et salari\u00e9s.',
    outcome_en: 'Research methodology established. 18 user test sessions conducted. Prioritized improvement backlog integrated into sprints.',
    outcome_fr: 'M\u00e9thodologie de recherche \u00e9tablie. 18 sessions de tests utilisateurs r\u00e9alis\u00e9es. Backlog d\'am\u00e9liorations prioris\u00e9 int\u00e9gr\u00e9 aux sprints.',
    duration_en: '2 months',
    duration_fr: '2 mois',
  },
  {
    id: 'sqool',
    client: 'UNOWHY / SQOOL',
    logo: '/logos/LOGO UNOWHY.svg',
    sector_en: 'EdTech SaaS',
    sector_fr: 'EdTech SaaS',
    scope_en: '6-year product transformation. From Android launcher to 7-app SaaS suite. Design team built from 0 to 5 designers. Executive committee member.',
    scope_fr: 'Transformation produit sur 6 ans. Du launcher Android \u00e0 une suite SaaS de 7 applications. \u00c9quipe design construite de 0 \u00e0 5 designers. Membre du comit\u00e9 de direction.',
    outcome_en: 'SaaS suite serving 500,000 students across 465 schools. Design system reducing production time by 60%.',
    outcome_fr: 'Suite SaaS au service de 500 000 \u00e9l\u00e8ves dans 465 \u00e9tablissements. Design system r\u00e9duisant le temps de production de 60 %.',
    duration_en: '6 years',
    duration_fr: '6 ans',
    caseStudyId: 'sqool',
  },
  {
    id: 'dailymotion',
    client: 'Dailymotion',
    logo: '/logos/LOGO DAILYMOTION-1.svg',
    sector_en: 'Media Tech',
    sector_fr: 'Media Tech',
    scope_en: 'Redesign of B2B publisher tools. Design system, upload flows, live dashboard, player manager. Coordination across Paris, Marseille, New York.',
    scope_fr: 'Refonte des outils partenaires B2B. Design system, flows d\'upload, live dashboard, gestionnaire de lecteur. Coordination Paris, Marseille, New York.',
    outcome_en: 'Livestream setup time cut by 50%. Clip creation time cut by 75%. Partner NPS increased by 34 points.',
    outcome_fr: 'Temps de setup livestream divis\u00e9 par 2. Temps de cr\u00e9ation de clip divis\u00e9 par 4. NPS partenaire en hausse de 34 points.',
    duration_en: '2 years',
    duration_fr: '2 ans',
    caseStudyId: 'dailymotion',
  },
  {
    id: 'toolkit',
    client: 'Toolkit.ac',
    logo: '/logos/LOGO TOOLKIT.svg',
    sector_en: 'Construction SaaS',
    sector_fr: 'SaaS Construction',
    scope_en: 'End-to-end product design from 0 to 1. Three major releases in 12 months: funding prototype, enriched V2, mobile-first V3.',
    scope_fr: 'Design produit end-to-end de 0 \u00e0 1. Trois releases majeures en 12 mois : prototype de financement, V2 enrichie, V3 mobile-first.',
    outcome_en: '2,000 paying customers in 24 months. Series A raised November 2025. Task access time halved.',
    outcome_fr: '2 000 clients payants en 24 mois. S\u00e9rie A lev\u00e9e en novembre 2025. Temps d\'acc\u00e8s aux t\u00e2ches divis\u00e9 par 2.',
    duration_en: '12 months',
    duration_fr: '12 mois',
    caseStudyId: 'toolkit',
  },
  {
    id: 'france-vae',
    client: 'France VAE',
    logo: '/logos/LOGO BETAGOUV.svg',
    sector_en: 'Public Service (beta.gouv)',
    sector_fr: 'Service public (beta.gouv)',
    scope_en: 'Lead Product Designer for the national VAE simplification platform. User research, design thinking workshops, product ops restructuring.',
    scope_fr: 'Lead Product Designer pour la plateforme nationale de simplification de la VAE. Recherche utilisateur, ateliers design thinking, restructuration des ops produit.',
    outcome_en: 'AI prototype deployed in one week. Enterprise journey operational. Product workflows restructured.',
    outcome_fr: 'Prototype IA d\u00e9ploy\u00e9 en une semaine. Parcours entreprise op\u00e9rationnel. Workflows produit restructur\u00e9s.',
    duration_en: '6 months',
    duration_fr: '6 mois',
    caseStudyId: 'france-vae',
  },
];

export const DELIVERY_MODES: DeliveryMode[] = [
  {
    id: 'focused-mission',
    icon: 'Calendar',
    title_en: 'Focused Mission',
    title_fr: 'Mission ponctuelle',
    desc_en: 'A defined scope with a start, a delivery, and an end. The most direct format for diagnostics, prototyping sprints, and research programs. Clear deliverables, clear timeline.',
    desc_fr: 'Un p\u00e9rim\u00e8tre d\u00e9fini avec un d\u00e9but, une livraison et une fin. Le format le plus direct pour les diagnostics, sprints de prototypage et programmes de recherche. Des livrables clairs, un calendrier clair.',
    duration_en: '1 to 12 weeks',
    duration_fr: '1 \u00e0 12 semaines',
    best_for_en: [
      'Clear brief with a limited perimeter',
      'Hypothesis to validate before engaging development',
      'Budget to defend with tangible deliverables',
    ],
    best_for_fr: [
      'Brief clair avec un p\u00e9rim\u00e8tre d\u00e9limit\u00e9',
      'Hypoth\u00e8se \u00e0 valider avant d\'engager du d\u00e9veloppement',
      'Budget \u00e0 d\u00e9fendre avec des livrables tangibles',
    ],
  },
  {
    id: 'embedded',
    icon: 'Briefcase',
    title_en: 'Embedded Partnership',
    title_fr: 'R\u00e9gie int\u00e9gr\u00e9e',
    desc_en: 'I join your product team for a defined period. Daily collaboration with PM, engineering, and stakeholders. Full integration into your processes, tools, and rituals.',
    desc_fr: 'J\'int\u00e8gre votre \u00e9quipe produit pour une p\u00e9riode d\u00e9finie. Collaboration quotidienne avec le PM, l\'engineering et les parties prenantes. Int\u00e9gration compl\u00e8te dans vos processus, outils et rituels.',
    duration_en: '1 to 6 months',
    duration_fr: '1 \u00e0 6 mois',
    best_for_en: [
      'New product launch needing structured design from day one',
      'Team missing a senior design resource',
      'Complex organization requiring embedded presence',
    ],
    best_for_fr: [
      'Lancement de produit n\u00e9cessitant un design structur\u00e9 d\u00e8s le d\u00e9part',
      '\u00c9quipe qui manque d\'une ressource design senior',
      'Organisation complexe n\u00e9cessitant une pr\u00e9sence int\u00e9gr\u00e9e',
    ],
  },
  {
    id: 'ongoing',
    icon: 'RefreshCw',
    title_en: 'Ongoing Advisory',
    title_fr: 'Accompagnement continu',
    desc_en: 'Part-time, recurring engagement. Weekly or biweekly sessions. Design reviews, mentoring, strategic input. The right format for teams that need ongoing expertise without the commitment of a full-time hire.',
    desc_fr: 'Engagement r\u00e9current \u00e0 temps partiel. Sessions hebdomadaires ou bimensuelles. Revues design, mentorat, apport strat\u00e9gique. Le format adapt\u00e9 pour les \u00e9quipes qui ont besoin d\'une expertise continue sans engager un recrutement \u00e0 plein temps.',
    duration_en: '3 to 12 months',
    duration_fr: '3 \u00e0 12 mois',
    best_for_en: [
      'Product in production needing regular UX input',
      'Growing team needing mentoring and structure',
      'Long-term projects requiring strategic continuity',
    ],
    best_for_fr: [
      'Produit en production qui a besoin d\'un apport UX r\u00e9gulier',
      '\u00c9quipe en croissance qui a besoin de mentorat et de structure',
      'Projets long terme qui n\u00e9cessitent une continuit\u00e9 strat\u00e9gique',
    ],
  },
];
