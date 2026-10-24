// Source unique du parcours professionnel (EN/FR).
// Référence : export LinkedIn de fin octobre 2026. En cas d'écart ailleurs sur le site, ce fichier fait foi.
// Consommateurs : translations.ts (page /resume) et AboutPageRedesign.tsx (section parcours).
// Tessan peut être nommée (accord de Victor, octobre 2026).

export type ProfileLang = 'en' | 'fr'

type Localized = { en: string; fr: string }
type LocalizedList = { en: string[]; fr: string[] }

export interface ProfileExperience {
  id: string
  period: Localized
  role: Localized
  company: Localized
  /** Phrase de contexte chiffrée, en tête de l'entrée */
  context: Localized
  bullets: LocalizedList
}

export interface ProfileEra {
  id: string
  period: Localized
  title: Localized
  description: Localized
}

// Ordre : date de début décroissante
export const PROFILE_EXPERIENCE: ProfileExperience[] = [
  {
    id: 'freelance',
    period: { en: 'Jul 2025 - Present', fr: 'Juil 2025 - Présent' },
    role: { en: 'Lead Product Designer (Freelance)', fr: 'Lead Product Designer (Freelance)' },
    company: { en: 'Victor Soussan Design', fr: 'Victor Soussan Design' },
    context: {
      en: 'Product design and prototyping for B2B, B2G and growing startups. Full cycle: framing, user research, design, delivery.',
      fr: 'Conception produit et prototypage pour des entreprises B2B, B2G et des startups en croissance. Cycle complet : cadrage, recherche utilisateur, conception, livraison.',
    },
    bullets: {
      en: [
        'Tessan, telemedicine in pharmacies (3 months, April to July 2026), first designer: design lead and product owner of the patient mobile app (iOS, Android), rebuilt in 30 days with a tech lead and two developers',
        'Same engagement: design system (React, shadcn/ui, nearly 90 components), conversational AI assistant under regulatory constraints, product management rebuilt in Notion and made queryable by Claude',
        'Banque des Territoires: redesign of the search engine and conversion optimization for the B2G marketplaces Aquagir and Numérique360. UX/UI audit, user research, improvement backlog, product recommendations',
        'Toolkit.ac (construction SaaS): V2, site dashboard, planning, multi-device navigation',
        'FEPEM: user research for the launch of MonEmploiDirect, team mentoring, roadmap recommendations',
        'Condamine Apps: 50+ working prototypes deployed with Claude Code, Figma MCP and Vercel',
      ],
      fr: [
        'Tessan, téléconsultation en pharmacie (3 mois, avril à juillet 2026), premier designer : lead design et product owner de l’application mobile patient (iOS, Android), reconstruite en 30 jours avec un tech lead et deux développeurs',
        'Même mission : design system (React, shadcn/ui, près de 90 composants), assistant conversationnel IA sous contrainte réglementaire, pilotage produit repensé dans Notion et rendu interrogeable par Claude',
        'Banque des Territoires : refonte du moteur de recherche et optimisation de la conversion des marketplaces B2G Aquagir et Numérique360. Audit UX/UI, recherche utilisateur, backlog d’améliorations, recommandations produit',
        'Toolkit.ac (SaaS construction) : V2, dashboard chantier, planning, navigation multi-devices',
        'FEPEM : recherche utilisateur pour le lancement de MonEmploiDirect, mentoring d’équipe, recommandations de roadmap',
        'Condamine Apps : 50+ prototypes fonctionnels déployés avec Claude Code, Figma MCP et Vercel',
      ],
    },
  },
  {
    id: 'beta-gouv',
    period: { en: 'Dec 2024 - Jul 2025', fr: 'Déc 2024 - Juil 2025' },
    role: { en: 'Lead Product Designer, France VAE', fr: 'Lead Product Designer, France VAE' },
    company: { en: 'beta.gouv.fr', fr: 'beta.gouv.fr' },
    context: {
      en: 'MVP of collective VAE: a platform that lets companies manage the Validation of Acquired Experience (VAE) of their employees.',
      fr: 'MVP de la VAE collective : plateforme permettant aux entreprises de gérer la Validation des Acquis de l’Expérience de leurs salariés.',
    },
    bullets: {
      en: [
        '10 user interviews with VAE candidates',
        '2 days of design thinking workshops with decision makers and vocational training organizations',
        'Metrics, framing and launch with the product manager',
        'Company journeys: sign-up, candidate follow-up, dashboards',
        'Co-design of the Metabase dashboard tracking sign-ups',
        'Restructuring of product workflows and of the Figma architecture',
      ],
      fr: [
        '10 entretiens utilisateurs avec des candidats à la VAE',
        '2 jours d’ateliers design thinking avec décideurs et organismes de formation professionnelle',
        'Métriques, cadrage et lancement avec la product manager',
        'Parcours entreprises : inscription, suivi des candidats, tableaux de bord',
        'Co-conception du dashboard Metabase pour le suivi des inscriptions',
        'Restructuration des workflows produit et de l’architecture Figma',
      ],
    },
  },
  {
    id: 'toolkit',
    period: { en: 'Jul 2023 - Jul 2024', fr: 'Juil 2023 - Juil 2024' },
    role: { en: 'First Product Designer', fr: 'Premier Product Designer' },
    company: { en: 'Toolkit (construction tech)', fr: 'Toolkit (construction tech)' },
    context: {
      en: 'Sole product designer of a construction tech startup, from concept to launch, working directly with the CEO and the CTO. 2,000 paying customers. Series A raised.',
      fr: 'Seul designer produit d’une startup construction tech, du concept au lancement, en collaboration directe avec le CEO et le CTO. 2 000 clients payants. Série A levée.',
    },
    bullets: {
      en: [
        'All web and mobile journeys: onboarding, zone-based planning, progress tracking, site team coordination',
        'Three versions shipped in 12 months: funding prototype, working V2, mobile V3',
        'Visual identity and brand guidelines',
        'Initial design system: modular components, reusable patterns',
        'Investor pitch decks for the fundraising',
      ],
      fr: [
        'Tous les parcours web et mobile : onboarding, planification par zones, suivi d’avancement, coordination des équipes chantier',
        'Trois versions livrées en 12 mois : prototype de financement, V2 fonctionnelle, V3 mobile',
        'Identité visuelle et guidelines de marque',
        'Design system initial : composants modulaires, patterns réutilisables',
        'Pitch decks investisseurs pour la levée de fonds',
      ],
    },
  },
  {
    id: 'unowhy-product-lead',
    period: { en: 'Jan 2023 - Dec 2024', fr: 'Jan 2023 - Déc 2024' },
    role: { en: 'Product Lead UI & Design Manager', fr: 'Product Lead UI & Design Manager' },
    company: { en: 'UNOWHY (SQOOL)', fr: 'UNOWHY (SQOOL)' },
    context: {
      en: 'Led product design and design for the SQOOL suite: 7 web applications, 500,000 students, 465 schools in Île-de-France. Team of 5 designers. Member of the Executive Committee.',
      fr: 'Pilotage de la conception produit et du design de la suite SQOOL : 7 applications web, 500 000 élèves, 465 établissements en Île-de-France. Équipe de 5 designers. Membre du Comité de Direction.',
    },
    bullets: {
      en: [
        'Suite grown from 5 to 7 applications in 2023-2024: SQOOL Extend (virtual machines) and SQOOL Protect (parental control)',
        'Co-led 2 executive seminars: 2028 product vision, 2024 roadmap, manifesto',
        'Co-wrote strategic decks with the CPO for the CEO and the executive committee',
        'Hired, trained and managed 5 designers (3 product, 1 brand, 1 content)',
        'UX/UI supervision: Classe (real-time supervision), Partage (storage), MDM (device fleet management, data viz), Applications (catalog)',
        'Structured design operations: workflows, documentation, scaling',
        'Product demos for local authorities and institutional partners',
      ],
      fr: [
        'Suite portée de 5 à 7 applications en 2023-2024 : SQOOL Extend (machines virtuelles) et SQOOL Protect (contrôle parental)',
        'Co-animation de 2 séminaires de direction : vision produit 2028, feuille de route 2024, manifeste',
        'Co-rédaction des decks stratégiques avec la CPO pour le CEO et le CODIR',
        'Recrutement, formation et management de 5 designers (3 product, 1 brand, 1 content)',
        'Supervision UX/UI : Classe (supervision temps réel), Partage (stockage), MDM (gestion de parc, data viz), Applications (catalogue)',
        'Structuration des opérations design : workflows, documentation, passage à l’échelle',
        'Démos produit pour les collectivités et partenaires institutionnels',
      ],
    },
  },
  {
    id: 'unowhy-head-of-design',
    period: { en: 'Jan 2020 - Dec 2022', fr: 'Jan 2020 - Déc 2022' },
    role: { en: 'Head of Design', fr: 'Head of Design' },
    company: { en: 'UNOWHY (SQOOL)', fr: 'UNOWHY (SQOOL)' },
    context: {
      en: 'Design lead for the transformation of SQOOL: from an Android launcher to an ecosystem of modular web applications.',
      fr: 'Direction design de la transformation de SQOOL : d’un launcher Android à un écosystème d’applications web modulaires.',
    },
    bullets: {
      en: [
        'Connect: React web dashboard for tablets and PCs (modular home, application catalog, analytics). Tested internally for a year, it redirected the company’s application strategy',
        'La Bulle: persistent floating interface concept for tablets (contextual shortcuts, screenshot, casting). Animated vision prototype',
        'Application catalog: app store style interface with ratings, pedagogical tags, search and back-office',
        'Visual identity of the SQOOL ecosystem: logos, app icons, typography and colors for 5+ applications',
        'Multi-library Figma design system (styles, tokens, layouts, components) with guidelines published on Zeroheight, which sped up delivery across the five applications',
        'Strategic design sprint, 10 framing workshops with the CPO on the post-launcher direction, 20 internal tests and field observations',
      ],
      fr: [
        'Connect : dashboard web React pour tablettes et PC (accueil modulaire, catalogue d’applications, analytics). Testé en interne pendant 1 an, il a réorienté la stratégie applicative de l’entreprise',
        'La Bulle : concept d’interface flottante persistante pour tablettes (raccourcis contextuels, capture d’écran, diffusion). Prototype de vision animé',
        'Catalogue d’applications : interface de type appstore avec notes, tags pédagogiques, recherche et back-office',
        'Identité visuelle de l’écosystème SQOOL : logos, icônes, typographie et couleurs pour 5+ applications',
        'Design system multi-librairies Figma (styles, tokens, layouts, composants) avec guidelines publiées sur Zeroheight, qui a accéléré la livraison sur les cinq applications',
        'Design sprint stratégique, 10 ateliers de cadrage avec la CPO sur la direction post-launcher, 20 tests internes et observations terrain',
      ],
    },
  },
  {
    id: 'unowhy-senior',
    period: { en: 'Oct 2018 - Dec 2019', fr: 'Oct 2018 - Déc 2019' },
    role: { en: 'Senior Product Designer', fr: 'Senior Product Designer' },
    company: { en: 'UNOWHY (SQOOL)', fr: 'UNOWHY (SQOOL)' },
    context: {
      en: 'Redesign of the SQOOL educational platform interfaces: Android tablets deployed in middle and high schools of Île-de-France (465 schools).',
      fr: 'Refonte des interfaces de la plateforme éducative SQOOL : tablettes Android déployées dans les collèges et lycées d’Île-de-France (465 établissements).',
    },
    bullets: {
      en: [
        'Hi-SQOOL (2019): unified dashboard for high school students (sessions, cloud storage, application catalog, authentication). MVP shipped in 6 weeks with a PO and 2 developers, presented to the regional council',
        'SQOOL Séances: redesign of the web application for creating and broadcasting lessons (teacher to student tablets)',
        'SQOOL Manager: UI consistency on the desktop management tool',
        'Introduced component thinking: modular, reusable patterns, first component libraries and pattern documentation (Sketch)',
        'First coaching of junior designers',
      ],
      fr: [
        'Hi-SQOOL (2019) : dashboard unifié pour lycéens (sessions, stockage cloud, catalogue d’applications, authentification). MVP livré en 6 semaines avec un PO et 2 développeurs, présenté au conseil régional d’Île-de-France',
        'SQOOL Séances : refonte de l’application web de création et diffusion de séances pédagogiques (enseignant vers tablettes élèves)',
        'SQOOL Manager : cohérence UI de l’outil de gestion desktop',
        'Introduction de la logique composants : patterns modulaires et réutilisables, premières librairies et documentation de patterns (Sketch)',
        'Premiers accompagnements de designers juniors',
      ],
    },
  },
  {
    id: 'dailymotion',
    period: { en: 'Apr 2017 - Oct 2018', fr: 'Avr 2017 - Oct 2018' },
    role: {
      en: 'Senior Product Designer, Publisher tools & solutions',
      fr: 'Senior Product Designer, Publisher tools & solutions',
    },
    company: { en: 'Dailymotion', fr: 'Dailymotion' },
    context: {
      en: 'B2B tools for premium video publishers: 8,000+ direct users, 50 to 100 publishers (CBS, ESPN, CNN, BBC, Canal+, Le Monde), 100,000+ videos processed per month.',
      fr: 'Outils B2B pour les publishers vidéo premium : 8 000+ utilisateurs directs, 50 à 100 publishers (CBS, ESPN, CNN, BBC, Canal+, Le Monde), 100 000+ vidéos traitées par mois.',
    },
    bullets: {
      en: [
        'Video CMS, desktop and mobile upload (iOS, Android), livestream, Dailymotion player customization',
        'Animated interactive prototypes and interaction specifications for the engineering handoff',
        'The company’s first Storybook UI Kit, designed with Sketch and integrated in agile with developers',
        'Publisher admin dashboard: data visualization, audience metrics, content management',
        'Multi-site coordination: Paris, New York, Marseille',
      ],
      fr: [
        'CMS vidéo, upload desktop et mobile (iOS, Android), livestream, personnalisation du player Dailymotion',
        'Prototypes interactifs animés et spécifications d’interaction pour le handoff engineering',
        'Premier UI Kit Storybook de l’entreprise, conçu avec Sketch et intégré en agile avec les développeurs',
        'Dashboard d’administration publisher : data visualization, métriques d’audience, gestion de contenu',
        'Coordination multi-sites : Paris, New York, Marseille',
      ],
    },
  },
  {
    id: 'ogury',
    period: { en: 'Sep 2016 - Apr 2017', fr: 'Sep 2016 - Avr 2017' },
    role: { en: 'Senior Product Designer (Freelance)', fr: 'Senior Product Designer (Freelance)' },
    company: { en: 'Ogury (AdTech)', fr: 'Ogury (AdTech)' },
    context: {
      en: 'Analytics dashboards and programmatic campaign management tools for a growing AdTech platform. Clients: major advertisers and publisher networks.',
      fr: 'Dashboards analytics et outils de gestion de campagnes programmatiques pour une plateforme AdTech en croissance. Clients : annonceurs majeurs et réseaux de publishers.',
    },
    bullets: {
      en: [
        'Campaign management interface: creation, targeting, budget allocation, real-time performance tracking',
        'Complex data visualization (D3.js, Angular): time comparisons, drill-down, multi-criteria filtering',
        'UI components, interactive prototypes and specifications for front-end teams',
        'Reporting views: automated reports, data export, custom date ranges',
      ],
      fr: [
        'Interface de gestion de campagnes : création, ciblage, allocation budgétaire, suivi de performance temps réel',
        'Data visualisation complexe (D3.js, Angular) : comparaisons temporelles, drill-down, filtrage multi-critères',
        'Composants UI, prototypes interactifs et spécifications pour les équipes front-end',
        'Vues de reporting : rapports automatisés, export de données, plages de dates personnalisées',
      ],
    },
  },
  {
    id: 'pagesjaunes-senior',
    period: { en: 'Oct 2015 - Sep 2016', fr: 'Oct 2015 - Sep 2016' },
    role: { en: 'Senior Product Designer, UI team lead', fr: 'Senior Product Designer, UI team lead' },
    company: { en: 'PagesJaunes (Solocal)', fr: 'PagesJaunes (Solocal)' },
    context: {
      en: 'New features for the PagesJaunes mobile app: 22 million downloads, 300,000 daily users. Team of 4 UI designers.',
      fr: 'Nouvelles fonctionnalités de l’application mobile PagesJaunes : 22 millions de téléchargements, 300 000 utilisateurs par jour. Équipe de 4 UI designers.',
    },
    bullets: {
      en: [
        'Redesign of the homepage and onboarding journey (iOS and Android)',
        'Material Design evolution of the Android app',
        'Design of the Android Wear application',
        'iOS and Android specific design patterns: cross-platform consistency across the product',
        'UI mentoring: weekly reviews, tools and methods coaching, production organization',
      ],
      fr: [
        'Refonte de la homepage et du parcours d’onboarding (iOS et Android)',
        'Évolution Material Design de l’application Android',
        'Conception de l’application Android Wear',
        'Design patterns spécifiques iOS et Android : cohérence cross-plateforme sur l’ensemble du produit',
        'Mentoring UI : revues hebdomadaires, accompagnement outils et méthodes, organisation de la production',
      ],
    },
  },
  {
    id: 'pagesjaunes-designer',
    period: { en: 'Apr 2014 - Oct 2015', fr: 'Avr 2014 - Oct 2015' },
    role: { en: 'Product Designer', fr: 'Product Designer' },
    company: { en: 'PagesJaunes (Solocal)', fr: 'PagesJaunes (Solocal)' },
    context: {
      en: 'Responsive design for PagesJaunes.fr: 15 million unique visitors per month.',
      fr: 'Conception responsive de PagesJaunes.fr : 15 millions de visiteurs uniques par mois.',
    },
    bullets: {
      en: [
        'Sign-up and login system',
        'Co-branding and product partnership with TheFork (LaFourchette)',
        'Design supervision of the Renault R-Link application',
        'Contribution to the foundations of the PagesJaunes design system: first cross-platform guidelines (web, iOS, Android)',
        'Daily coordination between product owners, front-end developers and the design team',
      ],
      fr: [
        'Système d’inscription et de connexion',
        'Co-branding et partenariat produit avec TheFork (LaFourchette)',
        'Supervision design de l’application Renault R-Link',
        'Contribution aux fondations du design system PagesJaunes : premières guidelines cross-plateformes (web, iOS, Android)',
        'Coordination quotidienne entre product owners, développeurs front-end et équipe design',
      ],
    },
  },
  {
    id: 'louis21',
    period: { en: 'Nov 2010 - Apr 2014', fr: 'Nov 2010 - Avr 2014' },
    role: { en: 'Art Director / UX Designer', fr: 'Directeur Artistique / UX Designer' },
    company: { en: 'Louis 21 (digital agency)', fr: 'Louis 21 (agence digitale)' },
    context: {
      en: 'Art direction and UX/UI design in a digital agency. Key accounts: EADS (Airbus Group), Bouygues Immobilier, Sony Music, AFM Téléthon, Henner.',
      fr: 'Direction artistique et conception UX/UI en agence digitale. Clients grands comptes : EADS (Airbus Group), Bouygues Immobilier, Sony Music, AFM Téléthon, Henner.',
    },
    bullets: {
      en: [
        'UX/UI design of EADS’s internal social network for senior executives: 10,000 users, desktop and tablet',
        'Bouygues Immobilier Android application: 5,000+ installs',
        'AFM Téléthon 2013 iOS and Android applications: 12,000+ installs. Marketing concept, user scenarios, prototyping, interface design',
        'Henner extranet: online management platform for insurance brokers. Business analysis, user journeys, quote creation',
        'Sony Music France intranet',
      ],
      fr: [
        'Conception UX/UI du réseau social interne EADS pour les cadres dirigeants : 10 000 utilisateurs, desktop et tablette',
        'Application Android Bouygues Immobilier : 5 000+ installations',
        'Applications iOS et Android AFM Téléthon 2013 : 12 000+ installations. Concept marketing, scénarios utilisateurs, prototypage, design d’interface',
        'Extranet Henner : plateforme de gestion en ligne pour les courtiers en assurance. Analyse métier, parcours utilisateurs, création de devis',
        'Intranet Sony Music France',
      ],
    },
  },
  {
    id: 'early-career',
    period: { en: '2005 - 2010', fr: '2005 - 2010' },
    role: { en: 'Art Director', fr: 'Directeur Artistique' },
    company: {
      en: 'Groupe Hommell, freelance, Publicis Groupe (internship)',
      fr: 'Groupe Hommell, freelance, Publicis Groupe (stage)',
    },
    context: {
      en: 'Art direction in magazine publishing (2005-2009), freelance for fashion, retail and corporate brands (2009-2010), advertising agency internship (2005).',
      fr: 'Direction artistique en presse magazine (2005-2009), freelance pour des marques mode, retail et corporate (2009-2010), stage en agence de publicité (2005).',
    },
    bullets: {
      en: [
        'Déco Loisirs Magazine: 300,000 copies per month, distributed with 10 major regional dailies. Covers, iconography, layout, print production',
        'Freelance art direction: Galeries Lafayette, L’Oréal, Orange, Celio, Reed Business/Stratégies, Ykone',
        'Publicis Et Nous (internship): luxury and fashion campaigns for Hermès, Audemars Piguet, Printemps, Helena Rubinstein, Leica',
      ],
      fr: [
        'Déco Loisirs Magazine : 300 000 exemplaires par mois, distribué avec 10 quotidiens régionaux majeurs. Couvertures, iconographie, mise en page, production print',
        'Direction artistique freelance : Galeries Lafayette, L’Oréal, Orange, Celio, Reed Business/Stratégies, Ykone',
        'Publicis Et Nous (stage) : campagnes luxe et mode pour Hermès, Audemars Piguet, Printemps, Helena Rubinstein, Leica',
      ],
    },
  },
]

// Cartes de la section « Parcours » de la page À propos : une carte par employeur ou groupe d'expériences.
export const PROFILE_ERAS: ProfileEra[] = [
  {
    id: 'lead-ux',
    period: { en: 'Sep 2026 - Present', fr: 'Sept 2026 - Aujourd’hui' },
    title: { en: 'Lead UX France, European professional information publisher', fr: 'Lead UX France, éditeur européen d’information professionnelle' },
    description: {
      en: 'A European group of 2,500 people and €500M in revenue: I run the design practice and design on my own the journeys of a digital document library. I lead a team of two designers (workload, budgets, reviews), set up user research with the customer community and carry design into quarterly planning.',
      fr: 'Un groupe européen de 2 500 personnes et 500 M€ de chiffre d’affaires : je dirige la pratique design et je conçois seul les parcours d’une bibliothèque documentaire numérique. J’anime une équipe de deux designers (charge, budgets, évaluation), je monte la recherche utilisateur avec la communauté de clients et je porte le design dans la planification trimestrielle.',
    },
  },
  {
    id: 'freelance',
    period: { en: '2025 - 2026', fr: '2025 - 2026' },
    title: { en: 'Victor Soussan Design', fr: 'Victor Soussan Design' },
    description: {
      en: 'Product design and prototyping for B2B, B2G and growing startups. Recent engagement: first designer at Tessan (3 months, April to July 2026), with the patient mobile app rebuilt in 30 days, a design system, an AI assistant under regulatory constraints and a product management system an AI can query. Other engagements: search engine and conversion redesign for Banque des Territoires’ B2G marketplaces, V2 of Toolkit.ac, user research for FEPEM’s MonEmploiDirect. In parallel, Condamine Apps: 50+ prototypes deployed with Claude Code and Figma MCP.',
      fr: 'Conception produit et prototypage pour des entreprises B2B, B2G et des startups en croissance. Mission récente : premier designer chez Tessan (3 mois, avril à juillet 2026), avec l’application mobile patient reconstruite en 30 jours, un design system, un assistant IA sous contrainte réglementaire et une gestion produit qu’une IA peut interroger. Autres missions : refonte du moteur de recherche et de la conversion des marketplaces B2G de la Banque des Territoires, V2 de Toolkit.ac, recherche utilisateur pour MonEmploiDirect (FEPEM). En parallèle, Condamine Apps : 50+ prototypes déployés avec Claude Code et Figma MCP.',
    },
  },
  {
    id: 'beta-gouv',
    period: { en: 'Dec 2024 - Jul 2025', fr: 'Déc 2024 - Juil 2025' },
    title: { en: 'beta.gouv.fr, France VAE', fr: 'beta.gouv.fr, France VAE' },
    description: {
      en: 'Lead Product Designer of the collective VAE MVP: 10 user interviews, 2 days of design thinking workshops with decision makers and training organizations, company journeys and dashboards, delivery in batches with iterative validation.',
      fr: 'Lead Product Designer du MVP de la VAE collective : 10 entretiens utilisateurs, 2 jours d’ateliers design thinking avec décideurs et organismes de formation, parcours entreprises et tableaux de bord, livraison par lots avec validation itérative.',
    },
  },
  {
    id: 'toolkit',
    period: { en: 'Jul 2023 - Jul 2024', fr: 'Juil 2023 - Juil 2024' },
    title: { en: 'Toolkit', fr: 'Toolkit' },
    description: {
      en: 'Sole product designer of a construction tech startup, from concept to launch, with the CEO and the CTO. Three versions in 12 months, visual identity, initial design system and investor pitch decks. 2,000 paying customers, Series A raised.',
      fr: 'Seul designer produit d’une startup construction tech, du concept au lancement, avec le CEO et le CTO. Trois versions en 12 mois, identité visuelle, design system initial et pitch decks investisseurs. 2 000 clients payants, Série A levée.',
    },
  },
  {
    id: 'unowhy',
    period: { en: '2018 - 2024', fr: '2018 - 2024' },
    title: { en: 'UNOWHY / SQOOL', fr: 'UNOWHY / SQOOL' },
    description: {
      en: 'Six years transforming SQOOL from an Android launcher into a SaaS suite of 7 applications serving 500,000 students across 465 schools. Senior Product Designer, then Head of Design, then Product Lead UI & Design Manager and member of the Executive Committee. Team of 5 designers hired and managed, design system unified across five applications that sped up delivery. Two applications added in 2023-2024: SQOOL Extend and SQOOL Protect.',
      fr: 'Six ans de transformation de SQOOL, d’un launcher Android à une suite SaaS de 7 applications pour 500 000 élèves dans 465 établissements. Senior Product Designer, puis Head of Design, puis Product Lead UI & Design Manager et membre du Comité de Direction. Équipe de 5 designers recrutée et managée, design system unifié sur cinq applications qui a accéléré la livraison. Deux applications ajoutées en 2023-2024 : SQOOL Extend et SQOOL Protect.',
    },
  },
  {
    id: 'dailymotion',
    period: { en: 'Apr 2017 - Oct 2018', fr: 'Avr 2017 - Oct 2018' },
    title: { en: 'Dailymotion', fr: 'Dailymotion' },
    description: {
      en: 'B2B tools for premium video publishers: 8,000+ direct users, 50 to 100 publishers (CBS, ESPN, CNN, BBC, Canal+, Le Monde), 100,000+ videos processed per month. The company’s first Storybook UI Kit, coordination across Paris, New York and Marseille.',
      fr: 'Outils B2B pour les publishers vidéo premium : 8 000+ utilisateurs directs, 50 à 100 publishers (CBS, ESPN, CNN, BBC, Canal+, Le Monde), 100 000+ vidéos traitées par mois. Premier UI Kit Storybook de l’entreprise, coordination entre Paris, New York et Marseille.',
    },
  },
  {
    id: 'ogury',
    period: { en: 'Sep 2016 - Apr 2017', fr: 'Sep 2016 - Avr 2017' },
    title: { en: 'Ogury', fr: 'Ogury' },
    description: {
      en: 'Analytics dashboards and programmatic campaign management for an AdTech platform, with complex data visualization in D3.js and Angular.',
      fr: 'Dashboards analytics et gestion de campagnes programmatiques pour une plateforme AdTech, avec data visualisation complexe en D3.js et Angular.',
    },
  },
  {
    id: 'pagesjaunes',
    period: { en: 'Apr 2014 - Sep 2016', fr: 'Avr 2014 - Sep 2016' },
    title: { en: 'PagesJaunes', fr: 'PagesJaunes' },
    description: {
      en: 'PagesJaunes mobile app (22 million downloads, 300,000 daily users): homepage and onboarding redesign, Material Design, Android Wear, team of 4 UI designers. Before that, PagesJaunes.fr (15 million unique visitors per month) and the first cross-platform design system guidelines.',
      fr: 'Application mobile PagesJaunes (22 millions de téléchargements, 300 000 utilisateurs par jour) : refonte de la homepage et de l’onboarding, Material Design, Android Wear, équipe de 4 UI designers. Avant cela, PagesJaunes.fr (15 millions de visiteurs uniques par mois) et les premières guidelines de design system cross-plateformes.',
    },
  },
  {
    id: 'origins',
    period: { en: '2005 - 2014', fr: '2005 - 2014' },
    title: { en: 'Louis 21, Hommell, Publicis', fr: 'Louis 21, Hommell, Publicis' },
    description: {
      en: 'From creative origins to digital: UX/UI design in an agency for EADS (internal social network, 10,000 executives), Bouygues Immobilier, AFM Téléthon and Henner, after art directing Déco Loisirs Magazine (300,000 copies per month), freelance work for Galeries Lafayette, L’Oréal and Orange, and an internship at Publicis (Hermès, Leica, Helena Rubinstein).',
      fr: 'Des origines créatives au digital : conception UX/UI en agence pour EADS (réseau social interne, 10 000 cadres), Bouygues Immobilier, AFM Téléthon et Henner, après la direction artistique de Déco Loisirs Magazine (300 000 exemplaires par mois), du freelance pour Galeries Lafayette, L’Oréal et Orange, et un stage chez Publicis (Hermès, Leica, Helena Rubinstein).',
    },
  },
]

/** Forme attendue par la page /resume */
export function resumeExperience(lang: ProfileLang) {
  return PROFILE_EXPERIENCE.map((e) => ({
    period: e.period[lang],
    role: e.role[lang],
    company: e.company[lang],
    achievements: [e.context[lang], ...e.bullets[lang]],
  }))
}

/** Forme attendue par la section parcours de la page À propos */
export function aboutEras(lang: ProfileLang) {
  return PROFILE_ERAS.map((e) => ({
    period: e.period[lang],
    title: e.title[lang],
    description: e.description[lang],
  }))
}
