
import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Layers, 
  Users, 
  Briefcase, 
  Figma, 
  PenTool, 
  ArrowUpRight,
  Mail,
  Linkedin,
  CheckCircle2,
  Target,
  Box,
  Cpu,
  Smartphone,
  Menu as MenuIcon,
  X,
  Download,
  BookOpen,
  ScrollText,
  Zap,
  Settings,
  Lightbulb,
  ExternalLink,
  Quote,
  User,
  FlaskConical,
  Bot,
  Palette,
  Calendar,
  GraduationCap
} from 'lucide-react';

// --- Types ---

type Language = 'en' | 'fr';

interface GlassCardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface BadgeProps {
  children?: React.ReactNode;
  color?: 'blue' | 'gray' | 'indigo' | 'purple' | 'green' | 'orange';
}

type Category = 'All' | 'Management' | 'Design' | 'Product & Tech' | 'Clients';

interface Testimonial {
  id: string;
  author: string;
  role: string;
  date: string;
  content: string;
  image: string; // Just the filename
  linkedin?: string;
  category: Category;
}

interface Project {
  id: string;
  title: string;
  role: string;
  period: string;
  summary: string;
  missions: string[];
  system: {
    title: string;
    desc: string;
  };
  deliverables: string[];
  icon: React.ReactNode;
  color: 'blue' | 'gray' | 'indigo' | 'purple';
  externalLink?: string;
  testimonialId?: string;
}

interface Resource {
  title: string;
  type: string;
  desc: string;
  link: string;
  icon: React.ReactNode;
}

// --- Components ---

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-apple-glass backdrop-blur-xl border border-apple-glassBorder rounded-3xl shadow-sm ${className}`}
  >
    {children}
  </div>
);

const Badge: React.FC<BadgeProps> = ({ children, color = 'blue' }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200",
    indigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    green: "bg-green-100 text-green-700 border-green-200",
    orange: "bg-orange-100 text-orange-700 border-orange-200",
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[color] || colors.blue}`}>
      {children}
    </span>
  );
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

const Avatar: React.FC<{ filename: string; alt: string; className?: string }> = ({ filename, alt, className = "" }) => {
  const cleanFilename = filename.split('/').pop() || filename;
  const imagePath = `/images/${cleanFilename}`;

  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${className}`}>
      {!hasError ? (
        <img
          src={imagePath}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 font-bold tracking-wider">
           {getInitials(alt)}
        </div>
      )}
    </div>
  );
};

// --- Localization Data ---

const TRANSLATIONS = {
  en: {
    nav: {
      services: "Services",
      bio: "Bio & Toolkit",
      projects: "Case Studies",
      lab: "The Lab",
      testimonials: "Testimonials",
      contact: "Contact"
    },
    hero: {
      availability: "Available for new missions starting Jan '26",
      title: "Vision-driven design,",
      subtitle: "grounded in prototyping and craft.",
      desc: "With 15 years in tech and 10 in product design, I build intuitive, high-impact interfaces for enterprise software, education, and public services.",
      cta_projects: "See Case Studies",
      cta_book: "Book a Consultation"
    },
    services: {
      title: "Services",
      subtitle: "From early ambiguity to clear form, I help you define what your product should be, its logic, its look, and the way people experience it.",
      execution: "Hands-on Execution",
      utility: "Product Utility",
      efficiency: "Operational Efficiency",
      impact: "Organizational Impact",
      items: {
        execution: [
          "UX framing, UI design, micro-interactions",
          "Hi-fi prototyping to validate ideas and sell a vision",
          "MVP build-outs using Bolt, Lovable, Figma",
          "Make Fast concept-to-interface workflows in complex domains"
        ],
        utility: [
          "Build new product capabilities and core features",
          "Shape product vision through interaction-first design",
          "Develop accessibility and inclusive UX from the ground up"
        ],
        efficiency: [
          "Set up design ops, systems, and reusable libraries",
          "Improve design/dev handoff and collaboration rituals",
          "Reduce repetitive work with documentation and prototypes"
        ],
        impact: [
          "Align product strategy with user needs via UX research",
          "Shape team culture through clarity, coaching, and tools"
        ]
      }
    },
    bio: {
      title: "Biography & Toolkit",
      subtitle: "Who I am, what I believe, and the tools I use.",
      role: "Product Design Lead • Mentor • Strategist",
      exp: "10+ Years Experience",
      loc: "Based in Paris",
      p1: "Passionate designer with experience in innovation, media groups and startups. I work at the intersection between product vision, strategy, interface design and content.",
      p2: "I am used to leading a team as well as being hands-on, with extensive knowledge in hardware, software and operating systems.",
      beliefs_title: "I believe in",
      beliefs: [
        "Creating digital products that help clients, not overwhelm or nag them.",
        "Precision in craft, standard patterns over fancy UI, and valuable interactions.",
        "Empowering teams with guidelines and coaching to navigate complexity."
      ],
      toolkit_title: "My Resource Toolkit",
      toolkit_desc: "I believe senior designers should give back. Here are templates I use to structure design teams and workflows."
    },
    projects: {
      title: "Case Studies",
      subtitle: "Select a project to explore missions, deliverables, and design systems.",
      missions: "Key Missions",
      system: "Design System",
      deliverables: "Key Deliverables",
      read_more: "Read Full Case Study on Notion"
    },
    lab: {
      tag: "Virtual R&D Laboratory",
      title: "Condamine Studio",
      desc: "Beyond pixel-perfect UI, I explore the frontiers of generative AI. My dedicated studio for rapid prototyping, prompt engineering, and synthetic art.",
      apps_title: "Condamine Apps",
      apps_sub: "37+ Apps Deployed",
      apps_desc: "A living archive of functional web prototypes built since 2025. Showcasing the speed of AI-assisted development.",
      apps_cta: "Visit App Gallery",
      learning_title: "Condamine Learning",
      learning_sub: "Education & Training",
      learning_desc: "Master the new stack. Courses, workshops, and resources to help designers and PMs leverage AI tools effectively.",
      learning_cta: "Explore Courses",
      agents_title: "Agents & Prompts",
      agents_sub: "System Engineering",
      agents_desc: "My personal Notion library of custom GPTs, system prompts, and agent workflows optimized for design tasks.",
      agents_cta: "Access Database",
      art_title: "AI Art Gallery",
      art_sub: "Midjourney V6",
      art_desc: "A curated collection of synthetic imagery, exploring light, texture, and surreal composition via generative models.",
      art_cta: "View Gallery"
    },
    testimonials: {
      title: "Trusted By",
      subtitle: "Feedback from clients, managers, and team members who have witnessed my impact on product and culture.",
      view_all: "View All 14 Recommendations",
      modal_title: "All Recommendations",
      modal_sub: "verified reviews from colleagues and partners",
      empty: "No testimonials found in this category.",
      close: "Close"
    },
    contact: {
      title: "Ready to build something robust?",
      subtitle: "I am currently open to freelance missions or leadership roles. Let's discuss how we can elevate your product.",
      email: "Send an Email",
      book: "Book a 30min Chat",
      linkedin: "LinkedIn Profile"
    }
  },
  fr: {
    nav: {
      services: "Services",
      bio: "Bio & Outils",
      projects: "Études de Cas",
      lab: "Le Labo",
      testimonials: "Recommandations",
      contact: "Contact"
    },
    hero: {
      availability: "Disponible pour missions dès Janv. '26",
      title: "Design orienté vision,",
      subtitle: "ancré dans le craft et le prototype.",
      desc: "Avec 15 ans dans la tech et 10 en product design, je conçois des interfaces intuitives à fort impact pour le logiciel d'entreprise, l'éducation et les services publics.",
      cta_projects: "Voir les Études de Cas",
      cta_book: "Réserver une consultation"
    },
    services: {
      title: "Services",
      subtitle: "De l'ambiguïté initiale à la forme claire, je vous aide à définir ce que doit être votre produit, sa logique, son apparence et l'expérience qu'il procure.",
      execution: "Exécution & Craft",
      utility: "Utilité Produit",
      efficiency: "Efficacité Opérationnelle",
      impact: "Impact Organisationnel",
      items: {
        execution: [
          "Cadrage UX, design UI, micro-interactions",
          "Prototypage Hi-fi pour valider et vendre une vision",
          "Développement MVP avec Bolt, Lovable, Figma",
          "Workflows 'Make Fast' du concept à l'interface"
        ],
        utility: [
          "Construire de nouvelles capacités et fonctionnalités clés",
          "Façonner la vision produit par le design d'interaction",
          "Développer l'accessibilité et l'UX inclusive dès la base"
        ],
        efficiency: [
          "Mise en place de Design Ops, systèmes et librairies",
          "Amélioration du handoff design/dev et rituels",
          "Réduire le travail répétitif via documentation et prototypes"
        ],
        impact: [
          "Aligner la stratégie produit avec les besoins utilisateurs",
          "Façonner la culture d'équipe par la clarté et le coaching"
        ]
      }
    },
    bio: {
      title: "Biographie & Outils",
      subtitle: "Qui je suis, mes convictions et mes outils.",
      role: "Product Design Lead • Mentor • Stratège",
      exp: "10+ Ans d'Expérience",
      loc: "Basé à Paris",
      p1: "Designer passionné avec de l'expérience dans l'innovation, les groupes médias et les startups. Je travaille à l'intersection entre vision produit, stratégie, design d'interface et contenu.",
      p2: "J'ai l'habitude de diriger une équipe tout en restant opérationnel, avec une connaissance approfondie du hardware, du software et des systèmes d'exploitation.",
      beliefs_title: "Mes convictions",
      beliefs: [
        "Créer des produits numériques qui aident les clients, sans les surcharger.",
        "La précision du craft, les patterns standards plutôt que l'UI fantaisiste.",
        "Autonomiser les équipes avec des directives et du coaching."
      ],
      toolkit_title: "Ma Boîte à Outils",
      toolkit_desc: "Je crois que les designers seniors doivent transmettre. Voici les templates que j'utilise pour structurer les équipes et les workflows."
    },
    projects: {
      title: "Études de Cas",
      subtitle: "Sélectionnez un projet pour explorer les missions, livrables et systèmes de design.",
      missions: "Missions Clés",
      system: "Design System",
      deliverables: "Livrables Clés",
      read_more: "Lire l'étude complète sur Notion"
    },
    lab: {
      tag: "Laboratoire R&D Virtuel",
      title: "Studio Condamine",
      desc: "Au-delà de l'UI pixel-perfect, j'explore les frontières de l'IA générative. Mon studio dédié au prototypage rapide, au prompt engineering et à l'art synthétique.",
      apps_title: "Condamine Apps",
      apps_sub: "37+ Apps Déployées",
      apps_desc: "Une archive vivante de prototypes web fonctionnels construits depuis 2025. Démontrant la vitesse du développement assisté par IA.",
      apps_cta: "Visiter la Galerie d'Apps",
      learning_title: "Condamine Learning",
      learning_sub: "Éducation & Formation",
      learning_desc: "Maîtrisez la nouvelle stack. Cours, ateliers et ressources pour aider les designers et PMs à exploiter efficacement les outils IA.",
      learning_cta: "Explorer les Cours",
      agents_title: "Agents & Prompts",
      agents_sub: "System Engineering",
      agents_desc: "Ma bibliothèque Notion personnelle de GPTs personnalisés, prompts système et workflows d'agents optimisés pour le design.",
      agents_cta: "Accéder à la Base",
      art_title: "Galerie d'Art IA",
      art_sub: "Midjourney V6",
      art_desc: "Une collection d'imagerie synthétique, explorant la lumière, la texture et la composition surréaliste via modèles génératifs.",
      art_cta: "Voir la Galerie"
    },
    testimonials: {
      title: "Ils m'ont fait confiance",
      subtitle: "Retours de clients, managers et membres d'équipe ayant témoigné de mon impact sur le produit et la culture.",
      view_all: "Voir les 14 Recommandations",
      modal_title: "Toutes les Recommandations",
      modal_sub: "avis vérifiés de collègues et partenaires",
      empty: "Aucune recommandation trouvée dans cette catégorie.",
      close: "Fermer"
    },
    contact: {
      title: "Prêt à construire du solide ?",
      subtitle: "Je suis actuellement ouvert aux missions freelance ou rôles de leadership. Discutons de comment élever votre produit.",
      email: "Envoyer un Email",
      book: "Réserver un chat de 30min",
      linkedin: "Profil LinkedIn"
    }
  }
};

// --- Localized Data Functions ---

const getResources = (lang: Language): Resource[] => {
  const isEn = lang === 'en';
  return [
    {
      title: isEn ? "Checklist: Feature Design" : "Checklist: Design d'une fonctionnalité",
      type: "Notion",
      desc: isEn ? "A granular checklist to ensure quality from kickoff to handoff." : "Une checklist granulaire pour assurer la qualité du lancement à la livraison.",
      link: "https://victor-soussan.notion.site/LONG-Checklist-Design-d-une-nouvelle-fonctionnalit-112a519b0dea8119b5ecc4084f3c0e53",
      icon: <CheckCircle2 size={20} className="text-green-600"/>
    },
    {
      title: isEn ? "Process: UI Slicing" : "Process: Découpage UI (Slicing)",
      type: "Notion",
      desc: isEn ? "Methodology to break down interfaces into atomic components for devs." : "Méthodologie pour découper les interfaces en composants atomiques pour les devs.",
      link: "https://victor-soussan.notion.site/Process-D-couper-finement-une-UI-22ea519b0dea81158739d163fc196f0c",
      icon: <Layers size={20} className="text-blue-600"/>
    },
    {
      title: isEn ? "Template: Design Scoping" : "Template: Cadrage de conception",
      type: "Notion",
      desc: isEn ? "A framework to frame design problems, scope, and goals before starting UI." : "Un cadre pour définir les problèmes, le périmètre et les objectifs avant de commencer l'UI.",
      link: "https://victor-soussan.notion.site/Template-Id-ation-Cadrage-de-conception-22ea519b0dea810f9d50cf4eeb7f0c48",
      icon: <Target size={20} className="text-red-600"/>
    },
    {
      title: isEn ? "Process: PO / Design Sync" : "Process: Synchro PO / Design",
      type: "Notion",
      desc: isEn ? "Rituals and workflows to align Product Owners and Designers efficiently." : "Rituels et workflows pour aligner efficacement Product Owners et Designers.",
      link: "https://victor-soussan.notion.site/Process-de-synchro-PO-Design-22ea519b0dea815690c0c5e178b61bf7",
      icon: <Users size={20} className="text-orange-600"/>
    },
    {
      title: "Atelier: Design Teardown",
      type: "Notion",
      desc: isEn ? "Workshop template for analyzing and critiquing existing interfaces collectively." : "Template d'atelier pour analyser et critiquer collectivement les interfaces existantes.",
      link: "https://victor-soussan.notion.site/Template-Id-ation-Atelier-Design-Teardown-22ea519b0dea81b09215c004b04ef56d",
      icon: <ScrollText size={20} className="text-purple-600"/>
    },
    {
      title: "Atelier: Design Studio",
      type: "Notion",
      desc: isEn ? "Facilitation guide for Crazy 8s and collaborative sketching sessions." : "Guide de facilitation pour Crazy 8s et sessions de croquis collaboratifs.",
      link: "https://victor-soussan.notion.site/Template-Id-ation-Atelier-Design-Studio-22ea519b0dea811ea219efa2ae2569a8",
      icon: <PenTool size={20} className="text-pink-600"/>
    },
    {
      title: isEn ? "Figma: File Status" : "Figma: Status des maquettes",
      type: "Notion",
      desc: isEn ? "Naming conventions and status tags for keeping Figma files clean." : "Conventions de nommage et tags de statut pour garder les fichiers Figma propres.",
      link: "https://victor-soussan.notion.site/Figma-Status-des-maquettes-et-prototypes-22ea519b0dea8121a1acd9e1fd59212f",
      icon: <Figma size={20} className="text-indigo-600"/>
    }
  ];
};

const getProjects = (lang: Language): Project[] => {
  const isEn = lang === 'en';
  return [
    {
      id: "toolkit",
      title: "Toolkit",
      role: isEn ? "Founding Designer" : "Designer Fondateur",
      period: "2023 – 2024",
      summary: isEn ? "0-to-1 Product Design for a Construction Tech SaaS. From pitch deck to MVP." : "Product Design de 0 à 1 pour un SaaS Construction Tech. Du pitch deck au MVP.",
      missions: isEn ? [
        "Defined the entire product architecture from scratch",
        "Worked directly with Founders (CEO/CTO) in Lean mode",
        "Designed Investor Pitch Decks & Marketing Assets",
        "Conducted field research with construction site managers"
      ] : [
        "Définition de l'architecture produit complète depuis zéro",
        "Travail en direct avec les fondateurs (CEO/CTO) en mode Lean",
        "Design des Pitch Decks investisseurs & Assets Marketing",
        "Recherche terrain avec des conducteurs de travaux"
      ],
      system: {
        title: isEn ? "Tailwind-ready UI Kit" : "UI Kit Tailwind-ready",
        desc: isEn ? "Designed a lightweight, mobile-first system optimized for messy field conditions (high contrast, large touch targets) ready for rapid Tailwind integration." : "Conception d'un système léger, mobile-first optimisé pour les conditions de chantier (haut contraste, grandes zones tactiles) prêt pour l'intégration Tailwind."
      },
      deliverables: isEn ? [
        "SaaS Platform (Web & Mobile)",
        "Planning & Gantt Interaction Model",
        "Admin & Billing Panels",
        "Brand Identity & Logo"
      ] : [
        "Plateforme SaaS (Web & Mobile)",
        "Modèle d'interaction Planning & Gantt",
        "Panneaux Admin & Facturation",
        "Identité de marque & Logo"
      ],
      icon: <Cpu size={24} />,
      color: "indigo",
      externalLink: "https://victor-soussan.notion.site/Toolkit-2b7a519b0dea80d9b40cc730ce4cfc4b",
      testimonialId: "pierre-marie-nigay"
    },
    {
      id: "sqool",
      title: "SQOOL Suite (UNOWHY)",
      role: isEn ? "Product Lead & Manager" : "Product Lead & Manager",
      period: "2018 – 2024",
      summary: isEn ? "Leading the design transformation of a hardware company into a comprehensive EdTech SaaS ecosystem." : "Pilotage de la transformation design d'une entreprise hardware vers un écosystème SaaS EdTech complet.",
      missions: isEn ? [
        "Managed a team of 4 designers: hiring, annual reviews, career coaching",
        "Led design strategy workshops for 'Road to 2025' vision",
        "Structured Design Ops: Figma organization, templates, and rituals",
        "Bridged Product & Tech: Designed decks for C-Level & All-Hands demos"
      ] : [
        "Management d'une équipe de 4 designers : recrutement, entretiens annuels, coaching",
        "Animation d'ateliers de stratégie design pour la vision 'Road to 2025'",
        "Structuration Design Ops : organisation Figma, templates et rituels",
        "Pont Produit & Tech : Design de présentations C-Level & Démos"
      ],
      system: {
        title: isEn ? "Multi-Brand Design System" : "Design System Multi-Marques",
        desc: isEn ? "Built a centralized Figma system supporting 8+ apps (Web/Android/PC). Created shared libraries for icons, gestures, and device frames to speed up hand-offs." : "Construction d'un système Figma centralisé supportant 8+ apps (Web/Android/PC). Création de bibliothèques partagées pour icônes, gestes et frames pour accélérer les hand-offs."
      },
      deliverables: [
        "SQOOL Classe (Classroom mgmt)",
        "SQOOL MDM (Fleet mgmt)",
        "Zeroheight Documentation",
        "Strategic PRDs & Vision Decks"
      ],
      icon: <Briefcase size={24} />,
      color: "blue",
      testimonialId: "charlotte-rifflet"
    },
    {
      id: "dailymotion",
      title: "Dailymotion Partner",
      role: isEn ? "Senior Product Designer" : "Senior Product Designer",
      period: "2017 – 2018",
      summary: isEn ? "Redesigning the professional video management suite for tier-1 media partners (CBS, Bein Sports)." : "Refonte de la suite de gestion vidéo professionnelle pour les partenaires médias tier-1 (CBS, Bein Sports).",
      missions: isEn ? [
        "Led UX for high-volume upload & livestreaming dashboards",
        "Mentored junior designers on interaction specs",
        "Collaborated across Paris, NYC & Marseille teams",
        "Initiated the internal 'Pattern Library' for consistency"
      ] : [
        "Lead UX pour les dashboards d'upload de masse & livestreaming",
        "Mentorat de designers juniors sur les spécifications d'interaction",
        "Collaboration entre les équipes Paris, NYC & Marseille",
        "Initiation de la 'Pattern Library' interne pour la cohérence"
      ],
      system: {
        title: isEn ? "Storybook UI Kit" : "UI Kit Storybook",
        desc: isEn ? "Created the first atomic component library in Sketch (pre-Figma) and collaborated with frontend to implement it in Storybook for global scalability." : "Création de la première bibliothèque de composants atomiques sous Sketch (pré-Figma) et collaboration avec le frontend pour l'implémenter dans Storybook."
      },
      deliverables: isEn ? [
        "Live Dashboard & Clipping Tool",
        "Batch Upload & Metadata Editor",
        "Motion Guidelines",
        "Partner Mobile App (iOS/Android)"
      ] : [
        "Dashboard Live & Outil de Clipping",
        "Upload par lot & Éditeur de Métadonnées",
        "Guidelines Motion",
        "App Mobile Partenaire (iOS/Android)"
      ],
      icon: <Users size={24} />,
      color: "gray",
      externalLink: "https://victor-soussan.notion.site/Dailymotion-Partner-s-web-platform-2b7a519b0dea80b99138d4b51a65620b"
    },
    {
      id: "pagesjaunes",
      title: "PagesJaunes",
      role: isEn ? "Mobile UI Lead" : "Mobile UI Lead",
      period: "2014 – 2017",
      summary: isEn ? "Modernizing a legacy giant. Bringing mobile-first thinking to 22M+ users." : "Modernisation d'un géant historique. Apport de la pensée mobile-first à 22M+ utilisateurs.",
      missions: isEn ? [
        "Led UI for iOS & Android apps (22M downloads)",
        "Managed transition to Material Design standards",
        "Supervised Android Wear prototyping & Motion Design",
        "Coordinated cross-platform consistency with Engineering"
      ] : [
        "Lead UI pour les apps iOS & Android (22M téléchargements)",
        "Gestion de la transition vers les standards Material Design",
        "Supervision du prototypage Android Wear & Motion Design",
        "Coordination de la cohérence cross-platform avec l'ingénierie"
      ],
      system: {
        title: isEn ? "Cross-Platform Foundations" : "Fondations Cross-Platform",
        desc: isEn ? "Established the first shared design language between iOS, Android, and Responsive Web to unify the brand experience across millions of daily interactions." : "Établissement du premier langage design partagé entre iOS, Android et Web Responsive pour unifier l'expérience de marque sur des millions d'interactions quotidiennes."
      },
      deliverables: isEn ? [
        "Onboarding Redesign (iOS/Android)",
        "Navigation & Search UI",
        "Android Wear Prototype",
        "User Retention Flows"
      ] : [
        "Redesign Onboarding (iOS/Android)",
        "UI Navigation & Recherche",
        "Prototype Android Wear",
        "Flux de Rétention Utilisateur"
      ],
      icon: <Smartphone size={24} />,
      color: "purple",
      testimonialId: "nicolas-moulin"
    }
  ];
};

const getTestimonials = (lang: Language): Testimonial[] => {
  const isEn = lang === 'en';
  // If French, we use the original texts. If English, we use the translations.
  return [
    {
      id: "pierre-marie-nigay",
      author: "Pierre-Marie Nigay",
      role: isEn ? "Founder of Toolkit" : "Fondateur de Toolkit",
      date: "14/11/2025",
      content: isEn 
        ? "Victor didn't just create mockups. We worked in workshops before the product even existed... He transformed business requirements into perfectly adapted user journeys. Victor is a great guy: curious, positive, ready to challenge to go further."
        : "Victor ne s’est pas contenté de faire des maquettes. Nous avons travaillé en ateliers avant même la création du produit... Il a transformé les besoins métiers en parcours utilisateurs parfaitement adaptés. Victor est un super gars : curieux, positif, prêt à challenger pour aller toujours plus loin.",
      image: "pierre-marie-nigay.png",
      linkedin: "https://www.linkedin.com/in/pierremarienigay",
      category: "Clients"
    },
    {
      id: "charlotte-rifflet",
      author: "Charlotte Rifflet",
      role: isEn ? "CPO @UNOWHY" : "CPO @UNOWHY",
      date: "24/06/2025",
      content: isEn 
        ? "Victor combines overflowing creativity with impressive rigor. He translates complex visions into clear, impactful user experiences. Always listening, curious, he constantly pushes thinking further."
        : "Victor allie une créativité débordante à une rigueur de travail impressionnante. Il sait traduire des visions complexes en expériences utilisateur claires et percutantes. Toujours à l’écoute, curieux, il pousse constamment les réflexions plus loin.",
      image: "charlotte-rifflet.png",
      linkedin: "https://www.linkedin.com/in/charlotterifflet",
      category: "Management"
    },
    {
      id: "boris-aime",
      author: "Boris Aimé-Bauderlique",
      role: isEn ? "Deployment Manager @FranceVAE" : "Chargé de déploiement @FranceVAE",
      date: "28/06/2025",
      content: isEn
        ? "Always proposing ideas that shake things up... you never settled for just thinking: you produced, tested, wireframed, prototyped. Your UX expertise is undeniable, but your experience made the difference."
        : "Toujours en train de proposer des idées qui bousculent... tu ne t’es jamais contenté de rester dans la réflexion : tu as produit, testé, maquetté, prototypé. Ton expertise UX est indéniable, mais c’est ton expérience qui a vraiment fait la différence.",
      image: "boris-aime-bauderlique.png",
      linkedin: "https://www.linkedin.com/in/boris-aimé-bauderlique",
      category: "Product & Tech"
    },
    {
      id: "achref-akkari",
      author: "Achref Akkari",
      role: isEn ? "Product Manager @UNOWHY" : "Product Manager @UNOWHY",
      date: "18/12/2024",
      content: isEn
        ? "Victor is a true source of inspiration. I was lucky to work with him on several projects... he brought a pragmatic and professional approach. His leadership and ability to collaborate were essential."
        : "Victor est une véritable source d’inspiration. J’ai eu la chance de travailler avec lui sur plusieurs projets... il a su apporter une approche pragmatique et professionnelle. Son leadership et sa capacité à collaborer étaient essentiels.",
      image: "achref-akkari.png",
      linkedin: "https://www.linkedin.com/in/achref-akkari",
      category: "Product & Tech"
    },
    {
      id: "justine-le-tellier",
      author: "Justine Le Tellier",
      role: isEn ? "UX Researcher @UNOWHY" : "UX Researcher @UNOWHY",
      date: "12/12/2024",
      content: isEn
        ? "As Product Lead in UI & Interaction Design, he played a central role in defining the product vision... I was struck by Victor's curiosity and his ability to share knowledge pedagogically. He was a real driver of progress."
        : "En tant que Product Lead en UI & Interaction Design, il a joué un rôle central dans la définition de la vision produit... J’ai été très marquée par la curiosité de Victor et sa capacité à partager son savoir avec pédagogie. Il a été un véritable moteur de progrès.",
      image: "justine-le-tellier.png",
      linkedin: "https://www.linkedin.com/in/justine-le-tellier",
      category: "Design"
    },
    {
      id: "hortense-jan",
      author: "Hortense Jan",
      role: isEn ? "Marketing Director @UNOWHY" : "Directrice Marketing @UNOWHY",
      date: "09/12/2024",
      content: isEn
        ? "I worked alongside Victor for 5 beautiful years. His expertise, 360 vision, and design talent enabled the creation and success of many projects... Victor is passionate and fascinating."
        : "J’ai travaillé aux côtés de Victor pendant 5 belles années. Son expertise, sa vision 360 et son talent de designer ont permis la création et la réussite de nombreux projets... Victor est passionné et passionnant.",
      image: "hortense-jan.png",
      linkedin: "https://www.linkedin.com/in/hortense-jan",
      category: "Management"
    },
    {
      id: "hubert-bloch",
      author: "Hubert Bloch",
      role: isEn ? "Deputy CEO @UNOWHY" : "Directeur Général Adjoint @UNOWHY",
      date: "08/12/2024",
      content: isEn
        ? "Highly cultivated, curious, and creative, he always brings relevant ideas and original perspectives. Beyond his talent, Victor is particularly friendly, which makes collaborating with him even more enjoyable."
        : "Très cultivé, curieux et créatif, il apporte toujours des idées pertinentes et des perspectives originales. En plus de son talent, Victor est quelqu’un de particulièrement sympathique, ce qui rend la collaboration avec lui d’autant plus agréable.",
      image: "hubert-bloch.png",
      linkedin: "https://www.linkedin.com/in/hubert-bloch",
      category: "Management"
    },
    {
      id: "mbagna-johan",
      author: "Mbagna Johan Gaby",
      role: "Product Designer",
      date: "30/09/2024",
      content: isEn
        ? "Passionate and reliable... Lover of details... his feedback allowed me to reach a new level. He has the will to listen to his team, putting them in the best conditions."
        : "Passionné et fiable... Amoureux des détails... ses retours m'ont permis d'atteindre un nouveau palier. Il a la volonté d'être à l'écoute de son équipe, de les mettre dans les meilleures conditions.",
      image: "johan-mbagna-gaby.png",
      linkedin: "https://www.linkedin.com/in/mbagna-johan-gaby",
      category: "Design"
    },
    {
      id: "safak-aktas",
      author: "Şafak Aktaş",
      role: isEn ? "Graphic Designer at Reflet Digital" : "Graphiste chez Reflet Digital",
      date: "10/12/2020",
      content: isEn
        ? "Beyond being a manager concerned with his team's well-being, he is passionate about details. Patient and pedagogical, he doesn't hesitate to give constructive advice... A mentor I appreciated working with."
        : "En plus d'être un manager soucieux du bien-être de son équipe, c'est un passionné qui a le souci du détail. Patient et pédagogue, il n'hésite pas à donner des conseils constructifs... Un mentor avec lequel j'ai apprécié travailler.",
      image: "safak-aktas.png",
      linkedin: "https://www.linkedin.com/in/safak-aktas",
      category: "Design"
    },
    {
      id: "frederic-rodriguez",
      author: "Frederic Rodriguez",
      role: isEn ? "Head of Poker - FDJ" : "Head of Poker - FDJ",
      date: "29/06/2017",
      content: isEn
        ? "Professional and rigorous, Victor knows how to translate business stakes into relevant implementations... Victor is very attentive to his collaborators and different trades, both technical and marketing."
        : "Professionnel et rigoureux, Victor sait traduire les enjeux business dans des réalisations pertinentes... Victor est très à l'écoute de ses collaborateurs et des différents métiers, à la fois technique ou marketing.",
      image: "frederic-rodriguez.png",
      linkedin: "https://www.linkedin.com/in/frederic-rodriguez",
      category: "Management"
    },
    {
      id: "remi-serougne",
      author: "Rémi Serougne",
      role: isEn ? "Web Developer" : "Développeur Web",
      date: "08/03/2017",
      content: isEn
        ? "Accessible, attentive, and responsible... working with Victor is a pleasure as he adheres to collective intelligence principles and facilitates interactions between Design and Engineering."
        : "Accessible, à l'écoute et responsable... travailler avec Victor est un plaisir car il adhère aux principes de l'intelligence collective et facilite les interactions entre l'équipe Design et la maîtrise d'œuvre.",
      image: "remi-serougne.png",
      linkedin: "https://www.linkedin.com/in/remi-serougne",
      category: "Product & Tech"
    },
    {
      id: "simon-white",
      author: "Simon White",
      role: "Senior UX",
      date: "22/04/2016",
      content: isEn
        ? "He is a very capable designer who can do the legwork but also take a step back and advise on more strategic aspects... He's worked on mobile and web, and has a keen eye for interaction design. Highly recommended."
        : "Victor is passionate about UX... He is a very capable designer who can do the legwork but also take a step back... He's worked on mobile and web, and has a keen eye for interaction design. Highly recommended.",
      image: "simon-white.png",
      linkedin: "https://www.linkedin.com/in/simon-white",
      category: "Design"
    },
    {
      id: "nicolas-moulin",
      author: "Nicolas Moulin",
      role: isEn ? "Entrepreneur / Advisor" : "Entrepreneur / Advisor",
      date: "12/04/2016",
      content: isEn
        ? "He knows how to unite people around a project, allowing for total autonomy to see it through. It is very useful to discuss the medium-term service vision with him."
        : "Il sait fédérer les gens autour d'un projet et qu'on peut par conséquent lui laisser une autonomie totale pour le mener à bien. Il est très utile de discuter avec lui lorsqu'il s'agit d'aborder la vision moyen terme.",
      image: "nicolas-moulin.png",
      linkedin: "https://www.linkedin.com/in/nicolasmoulin",
      category: "Management"
    },
    {
      id: "francois-khoury",
      author: "François Khoury",
      role: isEn ? "Senior Presales" : "Senior Presales",
      date: "30/10/2014",
      content: isEn
        ? "His previous experiences as Art Director and Designer bring a critical sense and a new approach to our projects which allow us to improve user experience... Victor helped us a lot on the embedded PagesJaunes application."
        : "Ses expériences précédentes de DA et Designer apportent un sens critique et une nouvelle approche... Victor nous a beaucoup aidé sur l'application embarquée PagesJaunes que nous avons conçue ensemble.",
      image: "francois-khoury.png",
      linkedin: "https://www.linkedin.com/in/francoiskhoury",
      category: "Product & Tech"
    }
  ];
};

// --- Main App Component ---

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const content = TRANSLATIONS[lang];
  const resources = getResources(lang);
  const projects = getProjects(lang);
  const testimonials = getTestimonials(lang);

  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [isTestimonialsOpen, setIsTestimonialsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Update selected project when language changes
  useEffect(() => {
    const currentId = selectedProject.id;
    const newProject = projects.find(p => p.id === currentId) || projects[0];
    setSelectedProject(newProject);
  }, [lang]);

  // Testimonial Filters
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  // Handle Escape key to close modals
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
        setIsBioOpen(false);
        setIsTestimonialsOpen(false);
        setIsBookingOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (selectedImage || isBioOpen || isTestimonialsOpen || isBookingOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage, isBioOpen, isTestimonialsOpen, isBookingOpen]);

  // Scroll to section with offset for fixed header
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const detailsElement = document.getElementById('project-details');
        if (detailsElement) {
          const offset = 100;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = detailsElement.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const filteredTestimonials = activeCategory === 'All' 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory);

  const linkedTestimonial = selectedProject.testimonialId 
    ? testimonials.find(t => t.id === selectedProject.testimonialId) 
    : null;

  return (
    <div className="min-h-screen font-sans bg-[#F5F5F7] text-[#1D1D1F]">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#F5F5F7]/80 backdrop-blur-md border-b border-white/50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="font-semibold text-lg tracking-tight cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Victor Soussan
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            <button onClick={() => scrollToSection('services')} className="hover:text-black transition-colors">{content.nav.services}</button>
            <button onClick={() => scrollToSection('bio')} className="hover:text-black transition-colors">{content.nav.bio}</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-black transition-colors">{content.nav.projects}</button>
            <button onClick={() => scrollToSection('lab')} className="hover:text-black transition-colors flex items-center"><FlaskConical size={14} className="mr-1.5"/>{content.nav.lab}</button>
            <button onClick={() => scrollToSection('testimonials')} className="hover:text-black transition-colors">{content.nav.testimonials}</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-black transition-colors">{content.nav.contact}</button>
            
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="relative flex items-center bg-gray-200/50 hover:bg-gray-200 transition-colors rounded-full p-1 cursor-pointer"
              aria-label="Switch Language"
            >
               <div
                 className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-spring ${lang === 'fr' ? 'translate-x-[100%] ml-1' : ''}`}
               />
               <span className={`relative z-10 px-2 py-0.5 text-[10px] font-bold transition-colors duration-300 ${lang === 'en' ? 'text-black' : 'text-gray-500'}`}>EN</span>
               <span className={`relative z-10 px-2 py-0.5 text-[10px] font-bold transition-colors duration-300 ${lang === 'fr' ? 'text-black' : 'text-gray-500'}`}>FR</span>
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
             {/* Mobile Language Toggle */}
             <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="relative flex items-center bg-gray-200/50 rounded-full p-1 cursor-pointer"
            >
               <div
                 className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300 ${lang === 'fr' ? 'translate-x-[100%] ml-1' : ''}`}
               />
               <span className={`relative z-10 px-2 py-0.5 text-[10px] font-bold transition-colors duration-300 ${lang === 'en' ? 'text-black' : 'text-gray-500'}`}>EN</span>
               <span className={`relative z-10 px-2 py-0.5 text-[10px] font-bold transition-colors duration-300 ${lang === 'fr' ? 'text-black' : 'text-gray-500'}`}>FR</span>
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-[#F5F5F7] border-b border-gray-200 shadow-lg p-6 flex flex-col space-y-4">
            <button onClick={() => scrollToSection('services')} className="text-left text-lg font-medium">{content.nav.services}</button>
            <button onClick={() => scrollToSection('bio')} className="text-left text-lg font-medium">{content.nav.bio}</button>
            <button onClick={() => scrollToSection('projects')} className="text-left text-lg font-medium">{content.nav.projects}</button>
            <button onClick={() => scrollToSection('lab')} className="text-left text-lg font-medium flex items-center"><FlaskConical size={18} className="mr-2"/>{content.nav.lab}</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-left text-lg font-medium">{content.nav.testimonials}</button>
            <button onClick={() => scrollToSection('contact')} className="text-left text-lg font-medium">{content.nav.contact}</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/60 backdrop-blur border border-white/50 rounded-full mb-8 shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-gray-600">{content.hero.availability}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1D1D1F] mb-6 leading-tight">
            {content.hero.title} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {content.hero.subtitle}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed mb-10">
            {content.hero.desc}
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-[#1D1D1F] text-white rounded-full font-medium text-lg hover:bg-black hover:scale-105 transition-all duration-300 shadow-lg flex items-center cursor-pointer relative z-20"
            >
              {content.hero.cta_projects} <ChevronRight className="ml-2" size={20} />
            </button>
            <button 
               onClick={() => setIsBookingOpen(true)}
               className="px-8 py-4 bg-white text-[#1D1D1F] border border-gray-200 rounded-full font-medium text-lg hover:bg-gray-50 transition-all duration-300 shadow-sm cursor-pointer relative z-20 flex items-center"
            >
              <Calendar size={20} className="mr-2"/> {content.hero.cta_book}
            </button>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center md:text-left">
             <h2 className="text-3xl font-bold mb-4">{content.services.title}</h2>
             <p className="text-gray-500 text-lg max-w-2xl">
               {content.services.subtitle}
             </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Hands-on Execution */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
               <div className="mb-6 p-4 bg-pink-50 w-fit rounded-2xl text-pink-600"><PenTool size={28}/></div>
               <h3 className="text-xl font-bold mb-4">{content.services.execution}</h3>
               <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
                  {content.services.items.execution.map((item, i) => (
                    <li key={i} className="flex items-start"><CheckCircle2 size={16} className="mr-2 mt-0.5 text-pink-400 flex-shrink-0"/> {item}</li>
                  ))}
               </ul>
            </div>

            {/* Product Utility */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
               <div className="mb-6 p-4 bg-blue-50 w-fit rounded-2xl text-blue-600"><Zap size={28}/></div>
               <h3 className="text-xl font-bold mb-4">{content.services.utility}</h3>
               <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
                  {content.services.items.utility.map((item, i) => (
                    <li key={i} className="flex items-start"><CheckCircle2 size={16} className="mr-2 mt-0.5 text-blue-400 flex-shrink-0"/> {item}</li>
                  ))}
               </ul>
            </div>

            {/* Operational Efficiency */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
               <div className="mb-6 p-4 bg-orange-50 w-fit rounded-2xl text-orange-600"><Settings size={28}/></div>
               <h3 className="text-xl font-bold mb-4">{content.services.efficiency}</h3>
               <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
                  {content.services.items.efficiency.map((item, i) => (
                    <li key={i} className="flex items-start"><CheckCircle2 size={16} className="mr-2 mt-0.5 text-orange-400 flex-shrink-0"/> {item}</li>
                  ))}
               </ul>
            </div>

            {/* Organizational Impact */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
               <div className="mb-6 p-4 bg-teal-50 w-fit rounded-2xl text-teal-600"><Users size={28}/></div>
               <h3 className="text-xl font-bold mb-4">{content.services.impact}</h3>
               <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
                  {content.services.items.impact.map((item, i) => (
                    <li key={i} className="flex items-start"><CheckCircle2 size={16} className="mr-2 mt-0.5 text-teal-400 flex-shrink-0"/> {item}</li>
                  ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Biography & Toolkit Section */}
      <section id="bio" className="py-20 px-6 relative bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">{content.bio.title}</h2>
            <p className="text-gray-500 text-lg">{content.bio.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
            
            {/* Left: Bio Card */}
            <div className="md:col-span-7">
               <GlassCard className="p-8 h-full flex flex-col justify-between overflow-hidden relative">
                  <div>
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-8">
                      <Avatar 
                        filename="victor-soussan.png" 
                        alt="Victor Soussan" 
                        className="w-40 h-40 rounded-[2rem] shadow-lg border border-white/20"
                      />
                      <div className="text-center md:text-left pt-2 flex-1">
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">Victor Soussan</h3>
                        <p className="text-gray-500 font-medium mb-4 text-lg">{content.bio.role}</p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          <Badge color="blue">{content.bio.exp}</Badge>
                          <Badge color="gray">{content.bio.loc}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6 text-gray-600 leading-relaxed text-[15px]">
                      <p>{content.bio.p1}</p>
                      <p>{content.bio.p2}</p>
                      
                      <div className="pt-6 border-t border-gray-100">
                        <h4 className="text-gray-900 font-semibold mb-4 flex items-center">
                          <Lightbulb size={18} className="mr-2 text-yellow-500"/> {content.bio.beliefs_title}
                        </h4>
                        <ul className="space-y-3 text-sm">
                          {content.bio.beliefs.map((belief, i) => (
                             <li key={i} className="flex items-start">
                                <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                                {belief}
                             </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-6 border-t border-gray-100">
                         <h4 className="text-gray-900 font-semibold mb-3 text-xs uppercase tracking-wider text-opacity-70">Daily Drivers</h4>
                         <div className="flex flex-wrap gap-2">
                            {['Figma', 'Bolt', 'Lovable', 'ZeroHeight', 'Notion', 'Loom', 'Claude', 'Perplexity'].map(tool => (
                              <span key={tool} className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium border border-gray-200">
                                {tool}
                              </span>
                            ))}
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-100">
                     <a 
                       href="https://linkedin.com/in/victorsoussan" 
                       target="_blank" 
                       rel="noreferrer"
                       className="px-5 py-2.5 bg-[#0077b5] text-white rounded-full text-sm font-medium hover:bg-[#006097] transition-colors flex items-center"
                     >
                       <Linkedin size={16} className="mr-2"/> LinkedIn
                     </a>
                     
                     <div className="flex space-x-2">
                        <a 
                          href="https://drive.google.com/file/d/1LqbuLyNUTn0zEf--wk_MaTynO8mHlokc/view?usp=drive_link" 
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex items-center"
                        >
                          <Download size={16} className="mr-2"/> FR
                        </a>
                        <a 
                          href="https://docs.google.com/document/d/1YN-bE-x6Pmx2QMdYUm_q_uY4hafSb8mR/edit?usp=sharing&ouid=102321755574001298179&rtpof=true&sd=true" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex items-center"
                        >
                          <Download size={16} className="mr-2"/> EN
                        </a>
                     </div>
                  </div>
               </GlassCard>
            </div>

            {/* Right: Toolkit Grid */}
            <div className="md:col-span-5 flex flex-col space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-full flex flex-col">
                 <div className="flex items-center mb-4 text-gray-900 font-bold">
                   <BookOpen size={20} className="mr-2 text-blue-600"/> 
                   <h3>{content.bio.toolkit_title}</h3>
                 </div>
                 <p className="text-sm text-gray-500 mb-6">
                   {content.bio.toolkit_desc}
                 </p>
                 
                 <div className="space-y-3 flex-1">
                    {resources.map((res, idx) => (
                       <a 
                         key={idx} 
                         href={res.link} 
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-700 transition-colors group cursor-pointer border border-transparent hover:border-blue-100"
                       >
                          <div className="mr-3 bg-white p-2 rounded-lg border border-gray-100 group-hover:border-blue-100 shadow-sm">
                            {res.icon}
                          </div>
                          <div className="flex-1">
                             <div className="text-sm font-semibold">{res.title}</div>
                             <div className="text-xs text-gray-400 group-hover:text-blue-400">{res.desc}</div>
                          </div>
                          <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500"/>
                       </a>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Case Studies Section */}
      <section id="projects" className="py-20 px-6 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">{content.projects.title}</h2>
            <p className="text-gray-500 text-lg">{content.projects.subtitle}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 h-auto md:h-[750px]">
            
            {/* Project List (Master) */}
            <div className="w-full md:w-1/3 flex flex-col space-y-4 overflow-y-auto pr-2 no-scrollbar">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => handleProjectClick(project)}
                  className={`
                    cursor-pointer p-6 rounded-3xl border transition-all duration-300 group relative overflow-hidden
                    ${selectedProject.id === project.id 
                      ? 'bg-[#1D1D1F] text-white shadow-xl scale-[1.02]' 
                      : 'bg-white border-gray-100 hover:border-gray-300 hover:bg-gray-50 text-gray-600'}
                  `}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className={`
                      p-2 rounded-xl mb-3 
                      ${selectedProject.id === project.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}
                    `}>
                      {project.icon}
                    </div>
                    {selectedProject.id === project.id && <ArrowUpRight size={20} className="opacity-50" />}
                  </div>
                  <h3 className={`text-lg font-bold mb-1 ${selectedProject.id === project.id ? 'text-white' : 'text-gray-900'}`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm ${selectedProject.id === project.id ? 'text-gray-400' : 'text-gray-500'}`}>
                    {project.period}
                  </p>
                  <p className={`text-xs mt-2 font-medium ${selectedProject.id === project.id ? 'text-blue-300' : 'text-blue-600'}`}>
                    {project.role}
                  </p>
                </div>
              ))}
            </div>

            {/* Project Details (Detail) */}
            <div id="project-details" className="w-full md:w-2/3 h-full">
              <GlassCard className="h-full p-8 md:p-10 flex flex-col overflow-y-auto relative no-scrollbar">
                {/* Header */}
                <div className="border-b border-gray-100 pb-6 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Badge color="indigo">{selectedProject.period}</Badge>
                    <Badge color="gray">{selectedProject.role}</Badge>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {selectedProject.title}
                  </h2>
                  <p className="text-xl text-gray-500 leading-relaxed">
                    {selectedProject.summary}
                  </p>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  
                  {/* Missions */}
                  <div>
                    <div className="flex items-center space-x-2 mb-4 text-gray-900 font-semibold">
                      <Target size={20} className="text-blue-600" />
                      <h3>{content.projects.missions}</h3>
                    </div>
                    <ul className="space-y-3">
                      {selectedProject.missions.map((m, i) => (
                        <li key={i} className="flex items-start text-gray-600 text-sm leading-relaxed">
                          <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Design System */}
                  <div>
                    <div className="flex items-center space-x-2 mb-4 text-gray-900 font-semibold">
                      <Figma size={20} className="text-purple-600" />
                      <h3>{content.projects.system}</h3>
                    </div>
                    <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
                      <h4 className="text-sm font-bold text-purple-900 mb-1">{selectedProject.system.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{selectedProject.system.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Deliverables & External Link */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4 text-gray-900 font-semibold">
                    <Box size={20} className="text-indigo-600" />
                    <h3>{content.projects.deliverables}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {selectedProject.deliverables.map((d, i) => (
                      <div key={i} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600 flex items-center">
                        <CheckCircle2 size={14} className="mr-2 text-green-500" />
                        {d}
                      </div>
                    ))}
                  </div>

                  {selectedProject.externalLink && (
                    <a 
                      href={selectedProject.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-5 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-black transition-all hover:scale-[1.01] shadow-md"
                    >
                      <BookOpen size={16} className="mr-2"/> {content.projects.read_more} <ExternalLink size={14} className="ml-2 opacity-70"/>
                    </a>
                  )}
                </div>

                {/* Project Linked Testimonial */}
                {linkedTestimonial && (
                  <div className="mt-auto pt-8 border-t border-gray-100">
                    <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-6 rounded-2xl border border-blue-100">
                       <div className="flex items-center mb-4">
                          <Avatar filename={linkedTestimonial.image} alt={linkedTestimonial.author} className="w-10 h-10 rounded-full mr-3 border border-white shadow-sm" />
                          <div>
                            <div className="text-sm font-bold text-gray-900">{linkedTestimonial.author}</div>
                            <div className="text-xs text-gray-500">{linkedTestimonial.role}</div>
                          </div>
                       </div>
                       <div className="relative">
                          <Quote size={16} className="text-blue-200 absolute -top-1 -left-1 transform -scale-x-100" />
                          <p className="text-sm text-gray-700 italic relative z-10 pl-4">
                            "{linkedTestimonial.content}"
                          </p>
                       </div>
                    </div>
                  </div>
                )}

              </GlassCard>
            </div>

          </div>
        </div>
      </section>

      {/* Condamine Studio Section */}
      <section id="lab" className="py-24 px-6 bg-[#09090b] text-white relative overflow-hidden">
         {/* Atmospheric Glows */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>
         
         <div className="max-w-6xl mx-auto relative z-10">
            <div className="mb-12 flex flex-col md:flex-row items-end justify-between">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-blue-300 mb-4 backdrop-blur-md">
                   <FlaskConical size={14} className="mr-2"/> {content.lab.tag}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">{content.lab.title}</h2>
                <p className="text-gray-400 mt-4 text-lg max-w-xl">
                   {content.lab.desc}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
               {/* Card 1: Condamine Apps */}
               <a 
                 href="https://imaginative-youtiao-371d08.netlify.app"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="group relative bg-[#151517] border border-white/5 hover:border-blue-500/50 p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 flex flex-col overflow-hidden"
               >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="mb-6 p-4 bg-blue-900/20 w-fit rounded-2xl text-blue-400 group-hover:scale-110 transition-transform duration-300">
                     <Smartphone size={32}/>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{content.lab.apps_title}</h3>
                  <div className="text-xs font-mono text-blue-400 mb-4">{content.lab.apps_sub}</div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                     {content.lab.apps_desc}
                  </p>
                  <div className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                     {content.lab.apps_cta} <ArrowUpRight size={16} className="ml-2"/>
                  </div>
               </a>

               {/* Card 2: Condamine Learning (NEW) */}
               <a 
                 href="https://condamine-learning-a-5xzh.bolt.host"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="group relative bg-[#151517] border border-white/5 hover:border-amber-500/50 p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-amber-900/10 flex flex-col overflow-hidden"
               >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="mb-6 p-4 bg-amber-900/20 w-fit rounded-2xl text-amber-400 group-hover:scale-110 transition-transform duration-300">
                     <GraduationCap size={32}/>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{content.lab.learning_title}</h3>
                  <div className="text-xs font-mono text-amber-400 mb-4">{content.lab.learning_sub}</div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                     {content.lab.learning_desc}
                  </p>
                  <div className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                     {content.lab.learning_cta} <ArrowUpRight size={16} className="ml-2"/>
                  </div>
               </a>

               {/* Card 3: Prompts DB */}
               <a 
                 href="https://victor-soussan.notion.site/Prompts-agents-database-VSO-155a519b0dea80ec9c99cdd229649c56"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="group relative bg-[#151517] border border-white/5 hover:border-purple-500/50 p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/10 flex flex-col overflow-hidden"
               >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="mb-6 p-4 bg-purple-900/20 w-fit rounded-2xl text-purple-400 group-hover:scale-110 transition-transform duration-300">
                     <Bot size={32}/>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{content.lab.agents_title}</h3>
                  <div className="text-xs font-mono text-purple-400 mb-4">{content.lab.agents_sub}</div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                     {content.lab.agents_desc}
                  </p>
                  <div className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                     {content.lab.agents_cta} <ArrowUpRight size={16} className="ml-2"/>
                  </div>
               </a>

               {/* Card 4: Art Gallery */}
               <a 
                 href="https://victor-soussan.notion.site/IA-Art-gallery-created-by-Victor-Soussan-2b8a519b0dea80b19385c8fe25dc9bb7"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="group relative bg-[#151517] border border-white/5 hover:border-pink-500/50 p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-pink-900/10 flex flex-col overflow-hidden"
               >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="mb-6 p-4 bg-pink-900/20 w-fit rounded-2xl text-pink-400 group-hover:scale-110 transition-transform duration-300">
                     <Palette size={32}/>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{content.lab.art_title}</h3>
                  <div className="text-xs font-mono text-pink-400 mb-4">{content.lab.art_sub}</div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                     {content.lab.art_desc}
                  </p>
                  <div className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                     {content.lab.art_cta} <ArrowUpRight size={16} className="ml-2"/>
                  </div>
               </a>
            </div>
         </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">{content.testimonials.title}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {content.testimonials.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* Preview: Top 3 curated testimonials */}
             {[testimonials[0], testimonials[1], testimonials[2]].map((t, i) => (
                <div key={i} className="bg-[#F5F5F7] p-8 rounded-3xl border border-transparent hover:border-gray-200 transition-colors shadow-sm h-full flex flex-col justify-between">
                   <div className="mb-6">
                      <div className="flex items-center mb-6">
                        <Avatar filename={t.image} alt={t.author} className="w-14 h-14 rounded-full mr-4 border-2 border-white shadow-sm" />
                        <div>
                           {t.linkedin ? (
                             <a 
                               href={t.linkedin} 
                               target="_blank" 
                               rel="noreferrer" 
                               className="font-bold text-gray-900 leading-none hover:text-[#0077b5] transition-colors flex items-center group text-lg"
                             >
                               {t.author}
                               <Linkedin size={16} className="ml-2 text-gray-400 group-hover:text-[#0077b5] transition-colors" />
                             </a>
                           ) : (
                             <div className="font-bold text-gray-900 leading-none text-lg">{t.author}</div>
                           )}
                           <div className="text-xs font-medium text-gray-500 mt-1">{t.role}</div>
                        </div>
                      </div>
                      <div className="relative">
                        <Quote size={20} className="text-gray-300 absolute -top-2 -left-2 transform -scale-x-100" />
                        <p className="text-gray-700 leading-relaxed text-[15px] pl-4 relative z-10">
                          "{t.content.length > 180 ? t.content.substring(0, 180) + '...' : t.content}"
                        </p>
                      </div>
                   </div>
                   
                   <div className="flex justify-between items-center border-t border-gray-200/50 pt-4 mt-auto">
                      <span className="text-xs text-gray-400 font-medium">{t.date}</span>
                      <span className="px-2.5 py-1 bg-white rounded-md text-[10px] font-semibold text-gray-500 border border-gray-100 uppercase tracking-wide">
                        {t.category}
                      </span>
                   </div>
                </div>
             ))}
          </div>
          
          <div className="mt-12 text-center">
             <button 
               onClick={() => setIsTestimonialsOpen(true)}
               className="group px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors inline-flex items-center shadow-sm hover:shadow-md"
             >
               {content.testimonials.view_all} <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
             </button>
          </div>
        </div>
      </section>

      {/* Full Screen Testimonials Modal */}
      {isTestimonialsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
           <div 
             className="absolute inset-0 bg-white/95 backdrop-blur-xl"
             onClick={() => setIsTestimonialsOpen(false)}
           />
           <div className="relative w-full max-w-7xl h-full flex flex-col bg-white/50 rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl border border-gray-200/50">
              
              {/* Modal Header */}
              <div className="flex flex-col md:flex-row justify-between items-center py-6 px-8 border-b border-gray-200/50 bg-white/80 backdrop-blur-md z-10">
                 <div className="mb-4 md:mb-0 text-center md:text-left">
                   <h2 className="text-2xl font-bold text-gray-900">{content.testimonials.modal_title}</h2>
                   <p className="text-sm text-gray-500">{testimonials.length} {content.testimonials.modal_sub}</p>
                 </div>

                 {/* Filters */}
                 <div className="flex space-x-2 p-1 bg-gray-100 rounded-full overflow-x-auto max-w-full no-scrollbar">
                    {(['All', 'Management', 'Design', 'Product & Tech', 'Clients'] as Category[]).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`
                          px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap
                          ${activeCategory === cat 
                            ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5' 
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'}
                        `}
                      >
                        {cat}
                      </button>
                    ))}
                 </div>

                 <button 
                   onClick={() => setIsTestimonialsOpen(false)} 
                   className="hidden md:flex p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors ml-6"
                 >
                    <X size={24} />
                 </button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto p-6 md:p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#F5F5F7]/50">
                 {filteredTestimonials.map((t, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all h-fit break-inside-avoid flex flex-col">
                       <div className="flex items-center mb-6">
                          <Avatar filename={t.image} alt={t.author} className="w-14 h-14 rounded-full mr-4 border-2 border-white shadow-sm" />
                          <div>
                             {t.linkedin ? (
                               <a 
                                 href={t.linkedin} 
                                 target="_blank" 
                                 rel="noreferrer" 
                                 className="font-bold text-gray-900 leading-none hover:text-[#0077b5] transition-colors flex items-center group text-lg"
                               >
                                 {t.author}
                                 <Linkedin size={16} className="ml-2 text-gray-400 group-hover:text-[#0077b5] transition-colors" />
                               </a>
                             ) : (
                               <div className="font-bold text-gray-900 leading-none text-lg">{t.author}</div>
                             )}
                             <div className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full w-fit mt-1">{t.role}</div>
                          </div>
                       </div>
                       
                       <div className="relative mb-6">
                          <Quote size={24} className="text-gray-100 absolute -top-4 -left-2 transform -scale-x-100" />
                          <p className="text-gray-700 leading-relaxed text-[15px] relative z-10 pt-2">
                            "{t.content}"
                          </p>
                       </div>

                       <div className="border-t border-gray-50 pt-4 mt-auto flex justify-between items-center">
                          <span className="text-xs font-medium text-gray-400">{t.date}</span>
                          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold bg-gray-50 px-2 py-1 rounded">{t.category}</span>
                       </div>
                    </div>
                 ))}
                 
                 {filteredTestimonials.length === 0 && (
                   <div className="col-span-full text-center py-20 text-gray-400">
                     {content.testimonials.empty}
                   </div>
                 )}
              </div>
              
              {/* Mobile Close Button */}
              <div className="md:hidden absolute bottom-6 left-0 w-full flex justify-center pointer-events-none">
                 <button 
                   onClick={() => setIsTestimonialsOpen(false)}
                   className="pointer-events-auto px-6 py-3 bg-black text-white rounded-full shadow-xl flex items-center font-medium"
                 >
                    <X size={18} className="mr-2"/> {content.testimonials.close}
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
           <div 
             className="absolute inset-0 bg-white/95 backdrop-blur-xl"
             onClick={() => setIsBookingOpen(false)}
           />
           <div className="relative w-full max-w-4xl h-[80vh] flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              <div className="absolute top-4 right-4 z-10">
                 <button 
                   onClick={() => setIsBookingOpen(false)}
                   className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                 >
                    <X size={24} />
                 </button>
              </div>
              <iframe 
                src="https://cal.com/victorsoussan/consulting-chat?user=victorsoussan&overlayCalendar=true&month=2025-12"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Book a consultation with Victor"
              ></iframe>
           </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-[#1D1D1F] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{content.contact.title}</h2>
          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
            {content.contact.subtitle}
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
             <a href="mailto:victorsoussan@gmail.com" className="px-8 py-4 bg-white text-black rounded-full font-medium text-lg hover:bg-gray-200 transition-colors flex items-center w-full md:w-auto justify-center">
                <Mail className="mr-2" size={20} /> {content.contact.email}
             </a>
             <button 
               onClick={() => setIsBookingOpen(true)}
               className="px-8 py-4 bg-blue-600 text-white rounded-full font-medium text-lg hover:bg-blue-700 transition-colors flex items-center w-full md:w-auto justify-center"
             >
                <Calendar className="mr-2" size={20} /> {content.contact.book}
             </button>
             <a href="https://linkedin.com/in/victorsoussan/" target="_blank" rel="noreferrer" className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-colors flex items-center w-full md:w-auto justify-center">
                <Linkedin className="mr-2" size={20} /> {content.contact.linkedin}
             </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#1D1D1F] text-gray-500 py-12 px-6 border-t border-gray-800">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
               <span className="font-bold text-white">Victor Soussan</span>
               <span className="mx-2">•</span>
               <span>Senior Product Design Lead</span>
            </div>
            <div className="text-sm">
               © {new Date().getFullYear()} — Designed & Built with React & Tailwind
            </div>
         </div>
      </footer>

    </div>
  );
};

export default App;
