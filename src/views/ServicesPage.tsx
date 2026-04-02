/**
 * ServicesPage - Expertise page with pillars, approach, and client logos
 * Minimalist Emil Kowalski aesthetic
 */

import React, { useState, useEffect } from 'react';
import { scrollToElement } from '../utils/smoothScroll';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import Link from 'next/link';
import CaseStudyTOCBar from '../components/CaseStudyTOCBar';

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
    page_intro: "I work with product teams, startups, and public services to reduce risk through design. Whether you need an end-to-end designer, a strategic partner, or someone to structure your design practice — here is what I bring.",
    pillars: [
      {
        title: "Design & Prototyping",
        desc: "I design interfaces from first wireframe to production-ready screens, then prototype at high fidelity so decisions get made on real artifacts instead of assumptions. When the timeline is tight, I build functional MVPs directly — auth, database, GenAI integration, shipped to Vercel. At Toolkit.ac, this approach took a product from first concepts to 2,000 paying users.",
        deliverables: [
          "UX framing, UI design, micro-interactions, and motion",
          "High-fidelity prototyping to validate ideas and align stakeholders before engineering commits",
          "AI-assisted prototyping: Figma to deployed prototype via Claude Code and Figma MCP",
          "Functional MVP development: auth, database, GenAI integration, shipped to Vercel",
          "Mobile native (iOS/Android) and responsive web design",
          "Product design in complex domains: B2B SaaS, EdTech, enterprise software, public services"
        ]
      },
      {
        title: "Product Strategy",
        desc: "Before a single screen, I help teams agree on what they are building and why. I run workshops to surface assumptions, structure hypotheses, and align stakeholders around a shared direction. At beta.gouv for France VAE, ten user interviews and a two-day design thinking workshop reshaped the scope of the entire MVP before any design was produced.",
        deliverables: [
          "Feature scoping from 0 to 1, with roadmap contribution",
          "Product vision clarification through key user journey mapping",
          "Ideation and vision workshops with users and stakeholders",
          "User research: interviews, observation sessions, synthesis into actionable insights",
          "Accessibility strategy and inclusive UX standards"
        ]
      },
      {
        title: "Design Ops",
        desc: "A design system is only valuable when the whole team uses it without friction. At UNOWHY, I built a unified system across five product brands that cut design production time by 60% and made developer handoff predictable. The work was not just components — it was structure, shared language, and the rituals that keep it alive.",
        deliverables: [
          "Design systems built across multiple brands and product surfaces",
          "Reusable component libraries with Figma tokens and documentation",
          "Structured developer handoff: interaction specs, assets, annotation standards",
          "Design-engineering rituals: weekly reviews, shared standards, alignment syncs",
          "Figma workspace organization: templates, libraries, onboarding guides"
        ]
      },
      {
        title: "Leadership & Organisation",
        desc: "I have built design teams from the ground up. At UNOWHY, I hired, managed, and mentored five designers over six years — annual reviews, mid-year check-ins, design challenges, and a culture built around critique and shared learning. At PagesJaunes, I introduced the weekly design review that became the team's core ritual.",
        deliverables: [
          "Team building: hiring, onboarding, and structured performance reviews",
          "Career development and mentoring for junior and mid-level designers",
          "Design culture: peer critiques, design challenges, shared learning rituals",
          "Stakeholder alignment across C-Level, Product, and Engineering",
          "Cross-functional workshops: design thinking, product ideation, retrospectives"
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
        desc: "Je conçois les interfaces du premier wireframe à l'écran prêt pour l'implémentation, puis je les prototype en haute fidélité pour que les décisions s'appuient sur des artefacts concrets plutôt que sur des suppositions. Quand le calendrier est serré, je construis des MVP fonctionnels directement : authentification, base de données, intégration GenAI, déployés sur Vercel. Chez Toolkit.ac, cette approche a conduit un produit du concept à 2 000 utilisateurs payants.",
        deliverables: [
          "Cadrage UX, design UI, micro-interactions et motion",
          "Prototypage haute fidélité pour valider les idées et aligner les parties prenantes avant l'engagement engineering",
          "Prototypage assisté IA : de Figma à prototype déployé via Claude Code et Figma MCP",
          "Développement MVP fonctionnel : auth, BDD, intégration GenAI, déployé sur Vercel",
          "Design mobile natif (iOS/Android) et responsive web",
          "Design produit dans des domaines complexes : SaaS B2B, EdTech, logiciels d'entreprise, services publics"
        ]
      },
      {
        title: "Stratégie Produit",
        desc: "Avant le premier écran, j'aide les équipes à s'aligner sur ce qu'elles construisent et pourquoi. J'anime des ateliers pour faire émerger les hypothèses, structurer le scope et aligner les parties prenantes sur une direction commune. Pour France VAE chez beta.gouv, dix entretiens utilisateurs et un atelier design thinking de deux jours ont reconfiguré le périmètre de l'ensemble du MVP avant la moindre production design.",
        deliverables: [
          "Cadrage fonctionnel 0-to-1 et contribution à la roadmap produit",
          "Clarification de la vision produit par les parcours utilisateurs clés",
          "Ateliers d'idéation et de vision avec utilisateurs et parties prenantes",
          "Recherche utilisateurs : entretiens, observations, synthèse en insights actionnables",
          "Stratégie d'accessibilité et standards UX inclusifs"
        ]
      },
      {
        title: "Design Ops",
        desc: "Un design system n'a de valeur que lorsque toute l'équipe l'utilise sans friction. Chez UNOWHY, j'ai construit un système unifié sur cinq marques produit qui a réduit le temps de production design de 60% et rendu le handoff développeur prévisible. Le travail n'était pas qu'une bibliothèque de composants : c'était une structure, un langage partagé et les rituels qui le font vivre.",
        deliverables: [
          "Design systems construits sur plusieurs marques et surfaces produit",
          "Bibliothèques de composants réutilisables avec tokens Figma et documentation",
          "Handoff développeur structuré : specs d'interaction, assets, standards d'annotation",
          "Rituels design-engineering : reviews hebdomadaires, standards partagés, syncs d'alignement",
          "Organisation du workspace Figma : templates, librairies, guides d'onboarding"
        ]
      },
      {
        title: "Leadership & Organisation",
        desc: "J'ai construit des équipes design de zéro. Chez UNOWHY, j'ai recruté, managé et fait grandir cinq designers sur six ans : entretiens annuels, points mi-année, design challenges et une culture construite autour de la critique et de l'apprentissage partagé. Chez PagesJaunes, j'ai introduit la design review hebdomadaire qui est devenue le rituel central de l'équipe.",
        deliverables: [
          "Construction d'équipe : recrutement, onboarding et entretiens de performance structurés",
          "Développement de carrière et mentorat pour designers juniors et confirmés",
          "Culture design : critiques entre pairs, design challenges, rituels d'apprentissage partagé",
          "Alignement des parties prenantes : C-Level, Produit, Engineering",
          "Ateliers cross-fonctionnels : design thinking, idéation produit, rétrospectives"
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

const ulVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const liVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0 },
};

const ServicesPage: React.FC<ServicesPageProps> = ({ lang, onContact }) => {
  const t = TRANSLATIONS[lang];
  const [activeSection, setActiveSection] = useState('top');
  const [showTOC, setShowTOC] = useState(false);
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);
  const sections = TOC_SECTIONS[lang];

  // Scroll to anchor on initial load — Next.js App Router doesn't handle
  // cross-page hash navigation natively; we do it after the first paint.
  // 'instant' matches native browser anchor behavior (no scroll animation).
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const id = hash.slice(1)
    const timer = setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'instant' })
    }, 150)
    return () => clearTimeout(timer)
  }, [])

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

  const scrollToSection = scrollToElement;

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      {/* Sticky TOC bar */}
      {showTOC && (
        <div
          className="sticky z-10 backdrop-blur-xl bg-[#FDFDFC]/80"
          style={{ top: 'var(--nav-height, 72px)', transition: 'top 250ms cubic-bezier(0.23, 1, 0.32, 1)' }}
        >
          <CaseStudyTOCBar
            sections={sections}
            activeSection={activeSection}
            onSectionClick={scrollToSection}
            isDark={false}
            lang={lang}
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-[740px] mx-auto px-6 pt-32 sm:pt-40 md:pt-48 pb-24 md:pb-40">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="text-base font-semibold tracking-[-0.01em] text-gray-900 leading-[1.08]"
          >
            {t.page_title}
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="mt-4 text-base text-gray-500 leading-relaxed"
          >
            {t.page_intro}
          </motion.p>
        </motion.div>

        {/* Service Pillars as divide-y list */}
        <div
          className="divide-y divide-gray-100 mb-24"
          onMouseLeave={() => setHoveredPillar(null)}
        >
          {t.pillars.map((pillar, i) => (
            <motion.div
              key={i}
              id={PILLAR_IDS[i]}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="scroll-mt-28 py-10 first:pt-0 -mx-3 px-3 rounded-lg"
              onMouseEnter={() => setHoveredPillar(i)}
              style={{
                opacity: hoveredPillar === null ? 1 : hoveredPillar === i ? 1 : 0.4,
                transition: 'opacity 200ms ease',
              }}
            >
              <div className="flex items-baseline gap-3 mb-3">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900">
                  {pillar.title}
                </h2>
                <span
                  className="text-xs text-gray-400"
                  style={{
                    opacity: hoveredPillar === i ? 1 : 0,
                    transform: hoveredPillar === i ? 'translateX(0)' : 'translateX(-6px)',
                    transition: 'opacity 200ms cubic-bezier(0.23, 1, 0.32, 1), transform 200ms cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                >
                  {`→ ${pillar.deliverables.length} deliverables`}
                </span>
              </div>
              <p className="text-base text-gray-500 leading-relaxed mb-5">
                {pillar.desc}
              </p>
              <motion.ul
                className="space-y-2"
                variants={ulVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                {pillar.deliverables.map((item, j) => (
                  <motion.li
                    key={j}
                    className="text-base text-gray-500 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1 before:h-1 before:rounded-full before:bg-gray-300"
                    variants={liVariants}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>

        {/* Approach Section — CTA to Approach page */}
        <motion.div
          id="approach"
          className="scroll-mt-28 py-24 md:py-40"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
            {t.approach_title}
          </h2>

          <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-[50ch]">
            {lang === 'en'
              ? 'Frame the problem, build in short cycles, decide from evidence. The full process is documented on the Approach page.'
              : 'Cadrer le problème, construire en cycles courts, décider par les faits. Le processus complet est documenté sur la page Approche.'}
          </p>

          <Link
            href={`/${lang}/approche`}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 active:scale-[0.97]"
            style={{ transition: 'border-color 200ms ease, color 200ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
          >
            {lang === 'en' ? 'See my approach' : 'Voir mon approche'}
            <ArrowRight
              size={14}
              className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>

        {/* Trusted By */}
        <motion.div
          id="clients"
          className="scroll-mt-28 py-24 md:py-40"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-10">
            {t.trusted_by}
          </h2>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-16 z-20 pointer-events-none bg-gradient-to-r from-[#FDFDFC] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-20 pointer-events-none bg-gradient-to-l from-[#FDFDFC] to-transparent" />

            <div className="logo-carousel-track flex hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex shrink-0">
                  {LOGOS.map((logo, index) => (
                    <div
                      key={`${setIndex}-${index}`}
                      className="flex items-center justify-center mx-3 flex-shrink-0"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        width="80"
                        height="80"
                        className="h-[50px] sm:h-[60px] md:h-[70px] w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-75"
                        style={{ transition: 'filter 250ms ease, opacity 250ms ease' }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA as text link */}
        <div className="pb-16">
          <button
            onClick={onContact}
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer active:scale-[0.97]"
            style={{ transition: 'color 200ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
          >
            {t.cta_text}
            <ArrowRight
              size={14}
              weight="bold"
              className="transition-transform duration-200 ease-out group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
