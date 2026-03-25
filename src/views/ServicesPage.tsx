/**
 * ServicesPage - Detailed expertise page with full descriptions and approach
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';
import {
  X,
  PencilSimple as PenTool,
  Lightning as Zap,
  Gear as Settings,
  Users,
  CheckCircle as CheckCircle2,
  ArrowRight,
  Envelope as Mail
} from '@phosphor-icons/react';
import CaseStudyTOCSidebar from '../components/CaseStudyTOCSidebar';

type Language = 'en' | 'fr';

interface Pillar {
  title: string;
  desc: string;
  deliverables: string[];
}

interface ApproachStep {
  title: string;
  desc: string;
  deliverable?: string;
}

interface ServicesPageProps {
  systemTheme: 'light' | 'dark';
  lang: Language;
  onBack: () => void;
  onContact: () => void;
}

const PILLAR_IDS = ['design-prototyping', 'product-strategy', 'design-ops', 'leadership'];

const TOC_SECTIONS = {
  en: [
    { id: 'top', label: 'Top' },
    { id: 'design-prototyping', label: 'Design & Prototyping' },
    { id: 'product-strategy', label: 'Product Strategy' },
    { id: 'design-ops', label: 'Design Ops' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'approach', label: 'How I work' },
    { id: 'clients', label: 'Clients' },
  ],
  fr: [
    { id: 'top', label: 'Début' },
    { id: 'design-prototyping', label: 'Design & Prototypage' },
    { id: 'product-strategy', label: 'Stratégie Produit' },
    { id: 'design-ops', label: 'Design Ops' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'approach', label: 'Méthode' },
    { id: 'clients', label: 'Clients' },
  ]
};

const TRANSLATIONS = {
  en: {
    page_title: "Expertise",
    page_subtitle: "From ambiguity to shipped product",
    page_intro: "I work with product teams, startups and public services to reduce risk through design. Whether you need an end-to-end designer, a strategic partner, or someone to structure your design practice, here is what I bring.",
    pillars: [
      {
        title: "Design & Prototyping",
        desc: "I design interfaces from wireframe to pixel-perfect screens, then prototype them at high fidelity to validate ideas before a single line of code is written. When speed matters, I build functional MVPs using Claude Code, Gemini and Vercel.",
        deliverables: [
          "UX framing, UI design, micro-interactions",
          "Hi-fi prototyping to validate ideas and sell a vision",
          "Rapid MVP development (auth, DB, GenAI integration)",
          "Mobile native (iOS/Android) and responsive web design",
          "Concept-to-interface workflows in complex domains"
        ]
      },
      {
        title: "Product Strategy",
        desc: "Before designing screens, I help clarify what the product should be, alongside the product manager. I facilitate workshops, structure hypotheses, define feature scope, and shape the vision through interaction-first thinking. The goal is always to reduce ambiguity, align the team, and produce decisions everyone can build on.",
        deliverables: [
          "Feature scoping (0 to 1) and product roadmap input",
          "Product vision clarification through key user journeys",
          "Ideation and vision workshops with users and stakeholders",
          "Accessibility strategy and inclusive UX standards"
        ]
      },
      {
        title: "Design Ops",
        desc: "A design system gains value when every team member treats it as the shared language of the product. I set up the tools, documentation and rituals that make collaboration between design, product and engineering efficient and sustainable.",
        deliverables: [
          "Scalable design systems and reusable component libraries",
          "Technical documentation for developer handoff",
          "Collaboration rituals between design, product and engineering"
        ]
      },
      {
        title: "Leadership & Organisation",
        desc: "I have recruited, managed and mentored design teams of up to five people. I build the rituals, documentation, and cross-functional habits that make design a shared practice across the organization. I align stakeholders, run workshops that bring product, tech, and business together, and establish the culture that lets a design practice thrive.",
        deliverables: [
          "Team leadership, hiring and onboarding of designers",
          "Design workshops for collaboration and creativity",
          "Stakeholder alignment (C-Level, PM, Engineering)",
          "Mentoring and skill development for junior designers"
        ]
      }
    ] as Pillar[],
    approach_title: "How I work",
    approach_steps: [
      { title: "Frame", desc: "We define the problem, the hypotheses, and the success criteria. Before the first screen.", deliverable: "A shared scoping document with a clear perimeter and identified risks." },
      { title: "Build", desc: "Short cycles. One week, one testable prototype. A concrete artifact to put in front of a decision-maker or a user.", deliverable: "A prototype ready to confront with a stakeholder or a user, built to collect feedback." },
      { title: "Decide", desc: "We test. We observe. We adjust. Insights feed the backlog directly.", deliverable: "Documented decisions and a backlog informed by facts." }
    ] as ApproachStep[],
    trusted_by: "Trusted by leading companies",
    cta_text: "Let's talk about your project",
    back: "Back"
  },
  fr: {
    page_title: "Expertises",
    page_subtitle: "Du flou au produit livré",
    page_intro: "J'accompagne les équipes produit, les startups et les services publics pour réduire le risque par le design. Que vous cherchiez un designer end-to-end, un partenaire stratégique ou quelqu'un pour structurer votre pratique design, voici ce que j'apporte.",
    pillars: [
      {
        title: "Design & Prototypage",
        desc: "Je conçois les interfaces du wireframe à l'écran pixel-perfect, puis je les prototype en haute fidélité pour valider les idées avant la moindre ligne de code. Quand la vitesse compte, je construis des MVP fonctionnels avec Claude Code, Gemini et Vercel.",
        deliverables: [
          "Cadrage UX, design UI, micro-interactions",
          "Prototypage haute fidélité pour valider et vendre une vision",
          "Développement MVP rapide (auth, BDD, intégration GenAI)",
          "Design mobile natif (iOS/Android) et responsive web",
          "Workflows concept-to-interface dans des domaines complexes"
        ]
      },
      {
        title: "Stratégie Produit",
        desc: "Avant de dessiner des écrans, j'aide à clarifier ce que le produit doit être, aux côtés du product manager. J'anime des ateliers, je structure les hypothèses, je définis le scope des fonctionnalités et je façonne la vision par le design d'interaction. L'objectif : réduire l'ambiguïté, aligner l'équipe, et produire des décisions sur lesquelles tout le monde peut construire.",
        deliverables: [
          "Cadrage de fonctionnalités (0 to 1) et contribution à la roadmap",
          "Clarification de la vision produit par les parcours utilisateurs clés",
          "Ateliers d'idéation et de vision avec utilisateurs et parties prenantes",
          "Stratégie d'accessibilité et standards UX inclusifs"
        ]
      },
      {
        title: "Design Ops",
        desc: "Un design system prend de la valeur quand chaque membre de l'équipe le traite comme le langage partagé du produit. Je mets en place les outils, la documentation et les rituels qui rendent la collaboration entre design, produit et engineering efficace et durable.",
        deliverables: [
          "Design systems scalables et bibliothèques de composants réutilisables",
          "Documentation technique pour le handoff développeur",
          "Rituels de collaboration entre design, produit et engineering"
        ]
      },
      {
        title: "Leadership & Organisation",
        desc: "J'ai recruté, managé et mentoré des équipes design jusqu'à cinq personnes. Je mets en place les rituels, la documentation et les habitudes cross-fonctionnelles qui font du design une pratique partagée dans l'organisation. J'aligne les parties prenantes, j'anime des ateliers qui réunissent produit, tech et métier, et je construis la culture qui permet à une pratique design de s'épanouir.",
        deliverables: [
          "Leadership d'équipe, recrutement et onboarding de designers",
          "Ateliers design pour la collaboration et la créativité",
          "Alignement des parties prenantes (C-Level, PM, Engineering)",
          "Mentorat et montée en compétence des juniors"
        ]
      }
    ] as Pillar[],
    approach_title: "Comment je travaille",
    approach_steps: [
      { title: "Cadrer", desc: "On pose le problème, les hypothèses, les critères de succès. Avant le premier écran.", deliverable: "Un document de cadrage partagé avec périmètre clair et risques identifiés." },
      { title: "Matérialiser", desc: "Cycles courts. Une semaine, un prototype testable. Un artefact concret à mettre devant un décideur ou un usager.", deliverable: "Un prototype à confronter à un stakeholder ou un utilisateur, prêt à recueillir du feedback." },
      { title: "Arbitrer", desc: "On teste. On observe. On ajuste. Les insights nourrissent le backlog directement.", deliverable: "Des décisions documentées et un backlog informé par des faits." }
    ] as ApproachStep[],
    trusted_by: "Ils me font confiance",
    cta_text: "Parlons de votre projet",
    back: "Retour"
  }
};

const PILLAR_CONFIG = [
  {
    icon: <PenTool size={24} />,
    color: {
      dark: { bg: 'bg-pink-500/20', text: 'text-pink-400', check: 'text-pink-400', accent: 'border-pink-500/20' },
      light: { bg: 'bg-pink-50', text: 'text-pink-600', check: 'text-pink-500', accent: 'border-pink-200' }
    },
    image: '/images/sketches services/gifs/01_image_hand_on_execution.gif'
  },
  {
    icon: <Zap size={24} />,
    color: {
      dark: { bg: 'bg-blue-600/20', text: 'text-blue-400', check: 'text-blue-400', accent: 'border-blue-500/20' },
      light: { bg: 'bg-blue-50', text: 'text-blue-600', check: 'text-blue-500', accent: 'border-blue-200' }
    },
    image: '/images/sketches services/gifs/02_workshop_product_vision.gif'
  },
  {
    icon: <Settings size={24} />,
    color: {
      dark: { bg: 'bg-orange-500/20', text: 'text-orange-400', check: 'text-orange-400', accent: 'border-orange-500/20' },
      light: { bg: 'bg-orange-50', text: 'text-orange-600', check: 'text-orange-500', accent: 'border-orange-200' }
    },
    image: '/images/sketches services/gifs/03 - product_vision_workshop_facilitation.gif'
  },
  {
    icon: <Users size={24} />,
    color: {
      dark: { bg: 'bg-teal-500/20', text: 'text-teal-400', check: 'text-teal-400', accent: 'border-teal-500/20' },
      light: { bg: 'bg-teal-50', text: 'text-teal-600', check: 'text-teal-500', accent: 'border-teal-200' }
    },
    image: '/images/sketches services/gifs/04_organisationtal_impact_workshop_alignment.gif'
  }
];

const LOGOS = [
  { src: '/logos/LOGO UNOWHY.svg', alt: 'Unowhy' },
  { src: '/logos/LOGO BETAGOUV.svg', alt: 'Beta.gouv' },
  { src: '/logos/LOGO TOOLKIT.svg', alt: 'Toolkit' },
  { src: '/logos/LOGO KYU.svg', alt: 'Kyu' },
  { src: '/logos/LOGO AIRBUS.svg', alt: 'Airbus' },
  { src: '/logos/LOGO ORANGE.svg', alt: 'Orange' },
  { src: '/logos/LOGO VINCI.svg', alt: 'Vinci' },
  { src: '/logos/LOGO DAILYMOTION-1.svg', alt: 'Dailymotion' },
  { src: '/logos/LOGO BOUYGUES IMMO.svg', alt: 'Bouygues Immobilier' },
  { src: '/logos/LOGO REGION ILE DE FRANCE.svg', alt: 'Région Île-de-France' },
  { src: '/logos/LOGO OGURY.svg', alt: 'Ogury' },
  { src: '/logos/LOGO SOLOCAL.svg', alt: 'Solocal' },
  { src: '/logos/LOGO CELIO.svg', alt: 'Celio' },
  { src: '/logos/LOGO OPERA COMIQUE.svg', alt: 'Opéra Comique' },
  { src: '/logos/LOGO VERLINDE.svg', alt: 'Verlinde' },
  { src: '/logos/LOGO UPTRADE.svg', alt: 'Uptrade' },
];

const SECTION_IDS = ['design-prototyping', 'product-strategy', 'design-ops', 'leadership', 'approach', 'clients'];

const ServicesPage: React.FC<ServicesPageProps> = ({ systemTheme, lang, onBack, onContact }) => {
  const isDark = systemTheme === 'dark';
  const t = TRANSLATIONS[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('top');
  const [showTOC, setShowTOC] = useState(false);

  const sections = TOC_SECTIONS[lang];

  // Scroll detection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowTOC(container.scrollTop > 300);

      // Find active section by checking which section is visible
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(SECTION_IDS[i]);
            return;
          }
        }
      }
      setActiveSection('top');
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    if (!containerRef.current) return;
    if (sectionId === 'top') {
      smoothScrollTo(containerRef.current, 0);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = el.offsetTop - 80;
      smoothScrollTo(containerRef.current, offset);
    }
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="services-page-title"
      className={`fixed inset-0 md:top-16 z-[100] overflow-y-auto ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-[#FCFCFD]'
      }`}
    >
      {/* Header - mobile only, desktop uses persistent nav */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl md:hidden ${
        isDark ? 'bg-[#0a0a0a]/80' : 'bg-[#FCFCFD]/80'
      }`}>
        <div className="w-full pl-6 pr-2.5 h-16 flex items-center justify-between">
          <span id="services-page-title" className={`font-semibold text-lg tracking-[-0.02em] ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t.page_title}
          </span>
          <button
            onClick={onBack}
            aria-label="Close"
            className={`relative p-3 rounded-full transition-colors cursor-pointer before:absolute before:inset-[-12px] before:content-[''] ${
              isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
            }`}
          >
            <X size={24} />
          </button>
        </div>
      </header>

      {/* TOC Sidebar */}
      <CaseStudyTOCSidebar
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isDark={isDark}
        isVisible={showTOC}
        lang={lang}
      />

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">

        {/* Header */}
        <div className="mb-10 md:mb-14">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>{t.page_title}</h1>
          <p className={`text-base md:text-lg leading-relaxed max-w-2xl ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>{t.page_intro}</p>
        </div>

        {/* Service Pillars */}
        <div className="space-y-12 md:space-y-16 mb-24">
          {t.pillars.map((pillar, i) => {
            const config = PILLAR_CONFIG[i];
            const colors = isDark ? config.color.dark : config.color.light;

            return (
              <div key={i} id={PILLAR_IDS[i]} className={`rounded-2xl border overflow-hidden ${
                isDark ? 'bg-[#1D1D1F] border-white/5' : 'bg-white border-gray-100'
              }`}>
                <div className="p-6 md:p-8">
                  {/* Title row */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${colors.bg} ${colors.text}`}>
                      {config.icon}
                    </div>
                    <h2 className={`text-2xl md:text-3xl font-bold tracking-[-0.02em] ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>{pillar.title}</h2>
                  </div>

                  {/* Description */}
                  <p className={`text-base leading-relaxed mb-6 max-w-2xl ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>{pillar.desc}</p>

                  {/* Content: image + deliverables */}
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Image */}
                    <div className="md:w-1/3 flex-shrink-0">
                      <div className={`rounded-xl overflow-hidden border ${
                        isDark ? 'border-white/10' : 'border-gray-200'
                      }`}>
                        <img
                          src={config.image}
                          alt={pillar.title}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div className="md:w-2/3">
                      <ul className="space-y-3">
                        {pillar.deliverables.map((item, j) => (
                          <li key={j} className="flex items-start">
                            <CheckCircle2 size={18} className={`mr-3 mt-0.5 flex-shrink-0 ${colors.check}`} />
                            <span className={`text-base leading-relaxed ${
                              isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Approach Section */}
        <div id="approach" className="mb-24">
          <h2 className={`text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-10 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>{t.approach_title}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {t.approach_steps.map((step, i) => (
              <div key={i} className={`p-5 rounded-xl border ${
                isDark ? 'bg-[#1D1D1F] border-white/5' : 'bg-white border-gray-100'
              }`}>
                <div className={`text-xs font-mono uppercase tracking-wider mb-3 ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>{String(i + 1).padStart(2, '0')}</div>
                <h3 className={`text-lg font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>{step.title}</h3>
                <p className={`text-sm leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>{step.desc}</p>
                {step.deliverable && (
                  <div className={`mt-3 pt-3 border-t text-xs leading-relaxed ${
                    isDark ? 'border-white/10 text-gray-500' : 'border-gray-100 text-gray-400'
                  }`}>
                    <span className={`font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {lang === 'en' ? 'What you get:' : 'Ce que vous obtenez :'}
                    </span>{' '}
                    {step.deliverable}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Trusted By */}
        <div id="clients" className="mb-24">
          <h3 className={`text-xl md:text-2xl font-bold tracking-[-0.02em] mb-8 text-center ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>{t.trusted_by}</h3>

          <div className="relative overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-24 z-20 pointer-events-none ${
              isDark
                ? 'bg-gradient-to-r from-[#0a0a0a] to-transparent'
                : 'bg-gradient-to-r from-[#FCFCFD] to-transparent'
            }`} />
            <div className={`absolute right-0 top-0 bottom-0 w-24 z-20 pointer-events-none ${
              isDark
                ? 'bg-gradient-to-l from-[#0a0a0a] to-transparent'
                : 'bg-gradient-to-l from-[#FCFCFD] to-transparent'
            }`} />

            <div className="logo-carousel-track flex hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex shrink-0">
                  {LOGOS.map((logo, index) => (
                    <div
                      key={`${setIndex}-${index}`}
                      className="flex items-center justify-center mx-2 md:mx-3 flex-shrink-0"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        width="80"
                        height="80"
                        className={`h-[50px] sm:h-[60px] md:h-[80px] w-auto transition-opacity duration-300 ${
                          isDark
                            ? 'brightness-0 invert opacity-60 hover:opacity-100'
                            : 'grayscale opacity-80 hover:grayscale-0 hover:opacity-100'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pb-16">
          <button
            onClick={onContact}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-medium transition-[background-color,box-shadow,transform] duration-200 ease-out cursor-pointer bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-sm hover:shadow-md active:scale-[0.97]"
          >
            <Mail size={18} />
            {t.cta_text}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesPage;
