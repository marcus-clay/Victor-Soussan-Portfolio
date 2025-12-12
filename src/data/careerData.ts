// Career path data - bilingual EN/FR
export interface CareerItem {
  id: number;
  period: string;
  role: {
    en: string;
    fr: string;
  };
  company: string;
  color: string;
  details: {
    en: string[];
    fr: string[];
  };
  logo?: string;
}

export const careerData: CareerItem[] = [
  {
    id: 1,
    period: "2010-2014",
    role: {
      en: "Art Director",
      fr: "Directeur Artistique"
    },
    company: "Airbus",
    color: "bg-sky-500",
    details: {
      en: [
        "Training simulators UI design",
        "Cockpit interface concepts",
        "Aviation safety displays"
      ],
      fr: [
        "UI simulateurs de formation",
        "Concepts interfaces cockpit",
        "Affichages sécurité aviation"
      ]
    },
    logo: "/logos/LOGO AIRBUS.svg"
  },
  {
    id: 2,
    period: "2014-2016",
    role: {
      en: "Lead UI/UX Designer",
      fr: "Lead UI/UX Designer"
    },
    company: "PagesJaunes",
    color: "bg-yellow-500",
    details: {
      en: [
        "iOS & Android apps redesign (22M downloads)",
        "First cross-platform design system",
        "Management of a team of 4 UI designers"
      ],
      fr: [
        "Refonte des apps iOS & Android (22M téléchargements)",
        "Construction du premier design system cross-platform",
        "Management d'une équipe de 4 UI designers"
      ]
    },
    logo: "/logos/LOGO SOLOCAL.svg"
  },
  {
    id: 3,
    period: "2016-2017",
    role: {
      en: "Product Designer",
      fr: "Product Designer"
    },
    company: "Ogury",
    color: "bg-amber-400",
    details: {
      en: [
        "Complex dashboard design for ad-tech",
        "User data flow optimization",
        "Data-driven B2B interface design"
      ],
      fr: [
        "Conception de dashboards complexes pour l'ad-tech",
        "Optimisation des flux de données utilisateurs",
        "Design d'interfaces B2B data-driven"
      ]
    },
    logo: "/logos/LOGO OGURY.svg"
  },
  {
    id: 4,
    period: "2017-2018",
    role: {
      en: "Senior Product Designer",
      fr: "Senior Product Designer"
    },
    company: "Dailymotion",
    color: "bg-blue-500",
    details: {
      en: [
        "Senior Product Designer (8K+ publishers, 50-100 premium)",
        "Created first UI Kit with Storybook",
        "Managing 100K+ videos/month volume"
      ],
      fr: [
        "Senior Product Designer (8K+ éditeurs, 50-100 premium)",
        "Création du premier UI Kit avec Storybook",
        "Gestion d'un volume de 100K+ vidéos/mois"
      ]
    },
    logo: "/logos/LOGO DAILYMOTION-1.svg"
  },
  {
    id: 5,
    period: "2018-2019",
    role: {
      en: "Senior UX/UI Designer",
      fr: "Senior UX/UI Designer"
    },
    company: "UNOWHY",
    color: "bg-cyan-500",
    details: {
      en: [
        "Solutions design for 465 schools (Île-de-France)",
        "Deployment on 300,000 devices",
        "Digital educational ecosystems creation"
      ],
      fr: [
        "Conception de solutions pour 465 lycées (Île-de-France)",
        "Déploiement sur 300 000 équipements",
        "Création d'écosystèmes éducatifs numériques"
      ]
    },
    logo: "/logos/LOGO UNOWHY.svg"
  },
  {
    id: 6,
    period: "2020-2021",
    role: {
      en: "Design Lead",
      fr: "Design Lead"
    },
    company: "UNOWHY",
    color: "bg-teal-400",
    details: {
      en: [
        "SQOOL transformation into SaaS ecosystem (5 apps)",
        "Recruiting and training a team of 5 designers",
        "Design Ops processes implementation"
      ],
      fr: [
        "Transformation de SQOOL en écosystème SaaS (5 apps)",
        "Recrutement et formation d'une équipe de 5 designers",
        "Mise en place des processus de Design Ops"
      ]
    },
    logo: "/logos/LOGO UNOWHY.svg"
  },
  {
    id: 7,
    period: "2022",
    role: {
      en: "AI Exploration & Branding",
      fr: "Exploration IA & Branding"
    },
    company: "HI SQOOL",
    color: "bg-orange-400",
    details: {
      en: [
        "Early AI experimentation with ChatGPT",
        "HI SQOOL brand launch with full identity",
        "Integration of new AI design paradigms"
      ],
      fr: [
        "Expérimentation précoce IA avec ChatGPT",
        "Lancement de la marque HI SQOOL avec identité complète",
        "Intégration des nouveaux paradigmes de design IA"
      ]
    },
    logo: "/logos/LOGO UNOWHY.svg"
  },
  {
    id: 8,
    period: "2023",
    role: {
      en: "Product Lead & Direction",
      fr: "Product Lead & Direction"
    },
    company: "SQOOL Extend / Toolkit.ac",
    color: "bg-rose-500",
    details: {
      en: [
        "SQOOL Extend (educational VMs) direction from 0 to 1",
        "Joined Toolkit.ac as First Product Designer",
        "Promotion to Product Lead at UNOWHY"
      ],
      fr: [
        "Direction de SQOOL Extend (VM éducatives) de 0 à 1",
        "Rejoint Toolkit.ac en tant que Premier Product Designer",
        "Promotion Product Lead chez UNOWHY"
      ]
    },
    logo: "/logos/LOGO TOOLKIT.svg"
  },
  {
    id: 9,
    period: "2024",
    role: {
      en: "SaaS & Architecture",
      fr: "SaaS & Architecture"
    },
    company: "Toolkit.ac / UNOWHY",
    color: "bg-purple-500",
    details: {
      en: [
        "Toolkit.ac V2 design (SaaS construction, 2000+ users)",
        "SQOOL Protect (parental control) delivery in 3 months",
        "End of 6 years at UNOWHY (500K+ users)"
      ],
      fr: [
        "Design de Toolkit.ac V2 (SaaS construction, 2000+ users)",
        "Livraison de SQOOL Protect (contrôle parental) en 3 mois",
        "Fin de 6 ans chez UNOWHY (500K+ utilisateurs)"
      ]
    },
    logo: "/logos/LOGO TOOLKIT.svg"
  },
  {
    id: 10,
    period: "2025",
    role: {
      en: "Principal Designer & Entrepreneur",
      fr: "Principal Designer & Entrepreneur"
    },
    company: "Condamine Apps / beta.gouv.fr",
    color: "bg-indigo-500",
    details: {
      en: [
        "Condamine Apps launch (37+ apps prototyped)",
        "Joined beta.gouv.fr (Lead Product Designer France VAE)",
        "Freelance missions: Toolkit SaaS & Banque des Territoires (UX/Conversion)",
        "Victor Soussan Design creation (Principal Designer)"
      ],
      fr: [
        "Lancement de Condamine Apps (37+ apps prototypées)",
        "Rejoint beta.gouv.fr (Lead Product Designer France VAE)",
        "Missions Freelance : Toolkit SaaS & Banque des Territoires (UX/Conversion)",
        "Création de Victor Soussan Design (Principal Designer)"
      ]
    },
    logo: "/logos/LOGO BETAGOUV.svg"
  },
  {
    id: 11,
    period: "2026",
    role: {
      en: "Generative AI & Scale",
      fr: "IA Générative & Scale"
    },
    company: "Vision Future",
    color: "bg-blue-600",
    details: {
      en: [
        "Generative AI training program for product teams",
        "Industrialization of AI-assisted prototyping",
        "Goal: Deploy 100+ applications"
      ],
      fr: [
        "Programme de formation à l'IA générative pour équipes produit",
        "Industrialisation du prototypage assisté par l'IA",
        "Objectif : Déployer 100+ applications"
      ]
    }
  }
];
