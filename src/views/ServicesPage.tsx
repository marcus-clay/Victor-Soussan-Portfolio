/**
 * ServicesPage - Expertise page with pillars, approach, and client logos
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
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
        desc: "Before designing screens, I help clarify what the product should be, alongside the product manager. I facilitate workshops, structure hypotheses, define feature scope, and shape the vision through interaction-first thinking.",
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
        desc: "I have recruited, managed and mentored design teams of up to five people. I build the rituals, documentation, and cross-functional habits that make design a shared practice across the organization.",
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
  },
  fr: {
    page_title: "Expertises",
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
        desc: "Avant de dessiner des écrans, j'aide à clarifier ce que le produit doit être, aux côtés du product manager. J'anime des ateliers, je structure les hypothèses, je définis le scope des fonctionnalités et je façonne la vision par le design d'interaction.",
        deliverables: [
          "Cadrage de fonctionnalités (0 to 1) et contribution à la roadmap",
          "Clarification de la vision produit par les parcours utilisateurs clés",
          "Ateliers d'idéation et de vision avec utilisateurs et parties prenantes",
          "Stratégie d'accessibilité et standards UX inclusifs"
        ]
      },
      {
        title: "Design Ops",
        desc: "Un design system prend de la valeur quand chaque membre de l'équipe le traite comme le langage partagé du produit. Je mets en place les outils, la documentation et les rituels qui rendent la collaboration efficace et durable.",
        deliverables: [
          "Design systems scalables et bibliothèques de composants réutilisables",
          "Documentation technique pour le handoff développeur",
          "Rituels de collaboration entre design, produit et engineering"
        ]
      },
      {
        title: "Leadership & Organisation",
        desc: "J'ai recruté, managé et mentoré des équipes design jusqu'à cinq personnes. Je mets en place les rituels, la documentation et les habitudes cross-fonctionnelles qui font du design une pratique partagée dans l'organisation.",
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
  }
};

const PILLAR_CONFIG = [
  {
    icon: <PenTool size={24} />,
    color: { bg: 'bg-pink-50', text: 'text-pink-600', check: 'text-pink-500' },
    image: '/images/sketches services/gifs/01_image_hand_on_execution.gif'
  },
  {
    icon: <Zap size={24} />,
    color: { bg: 'bg-blue-50', text: 'text-blue-600', check: 'text-blue-500' },
    image: '/images/sketches services/gifs/02_workshop_product_vision.gif'
  },
  {
    icon: <Settings size={24} />,
    color: { bg: 'bg-orange-50', text: 'text-orange-600', check: 'text-orange-500' },
    image: '/images/sketches services/gifs/03 - product_vision_workshop_facilitation.gif'
  },
  {
    icon: <Users size={24} />,
    color: { bg: 'bg-teal-50', text: 'text-teal-600', check: 'text-teal-500' },
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

const ServicesPage: React.FC<ServicesPageProps> = ({ lang, onContact }) => {
  const t = TRANSLATIONS[lang];
  const [activeSection, setActiveSection] = useState('top');
  const [showTOC, setShowTOC] = useState(false);
  const sections = TOC_SECTIONS[lang];

  // Window-based scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setShowTOC(window.scrollY > 300);

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="min-h-screen bg-[#FCFCFD]">
      {/* TOC Sidebar */}
      <CaseStudyTOCSidebar
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isDark={false}
        isVisible={showTOC}
        lang={lang}
      />

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-20">

        {/* Header — stagger entrance matching Projects page */}
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gray-900 leading-[1.08]"
          >
            {t.page_title}
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="mt-4 text-lg md:text-xl text-gray-500 leading-relaxed max-w-[55ch]"
          >
            {t.page_intro}
          </motion.p>
        </motion.div>

        {/* Service Pillars */}
        <div className="space-y-12 md:space-y-16 mb-24">
          {t.pillars.map((pillar, i) => {
            const config = PILLAR_CONFIG[i];

            return (
              <motion.div
                key={i}
                id={PILLAR_IDS[i]}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="scroll-mt-28 rounded-2xl border bg-white border-gray-100 overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  {/* Title row */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${config.color.bg} ${config.color.text}`}>
                      {config.icon}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-gray-900">
                      {pillar.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-base leading-relaxed mb-6 max-w-2xl text-gray-600">
                    {pillar.desc}
                  </p>

                  {/* Content: image + deliverables */}
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Image */}
                    <div className="md:w-1/3 flex-shrink-0">
                      <div className="rounded-xl overflow-hidden border border-gray-200">
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
                            <CheckCircle2 size={18} className={`mr-3 mt-0.5 flex-shrink-0 ${config.color.check}`} />
                            <span className="text-base leading-relaxed text-gray-700">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Approach Section */}
        <motion.div
          id="approach"
          className="scroll-mt-28 mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-10 text-gray-900">
            {t.approach_title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {t.approach_steps.map((step, i) => (
              <div key={i} className="p-5 rounded-2xl border bg-white border-gray-100">
                <div className="text-xs font-mono uppercase tracking-wider mb-3 text-blue-600">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {step.desc}
                </p>
                {step.deliverable && (
                  <div className="mt-3 pt-3 border-t border-gray-100 text-xs leading-relaxed text-gray-400">
                    <span className="font-semibold text-gray-500">
                      {lang === 'en' ? 'What you get:' : 'Ce que vous obtenez :'}
                    </span>{' '}
                    {step.deliverable}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trusted By */}
        <motion.div
          id="clients"
          className="scroll-mt-28 mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <h3 className="text-xl md:text-2xl font-bold tracking-[-0.02em] mb-8 text-center text-gray-900">
            {t.trusted_by}
          </h3>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-20 pointer-events-none bg-gradient-to-r from-[#FCFCFD] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-20 pointer-events-none bg-gradient-to-l from-[#FCFCFD] to-transparent" />

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
                        className="h-[50px] sm:h-[60px] md:h-[80px] w-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100"
                        style={{ transition: 'filter 300ms ease, opacity 300ms ease' }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center pb-16">
          <button
            onClick={onContact}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-medium cursor-pointer bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-sm hover:shadow-md active:scale-[0.97]"
            style={{ transition: 'background-color 200ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 200ms ease' }}
          >
            <Mail size={18} />
            {t.cta_text}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
