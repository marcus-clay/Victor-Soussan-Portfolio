/**
 * FranceVaeExecutive - "En bref" / "At a glance" version of France VAE case study
 *
 * Concise executive summary like ToolkitExecutive:
 * - Hero with title
 * - Key Metrics
 * - Role cards
 * - Scope grid with clickable images
 * - Outcome metrics
 * - Testimonial
 * - CTA
 */

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ChevronDown,
  Layers,
  Users,
  ArrowRight,
  Briefcase,
  Target,
  Calendar,
  Lightbulb,
  Bot,
  CheckCircle2
} from 'lucide-react';

interface FranceVaeExecutiveProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  onImageClick: (src: string) => void;
  onViewFull: () => void;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const TRANSLATIONS = {
  en: {
    hero: {
      eyebrow: 'Lead Product Designer • beta.gouv.fr • 2024-2025',
      title: 'Shipping fast in a\ncomplex environment',
      subtitle: '6-month mission structuring product operations for France\'s national VAE platform serving 100K+ citizens',
      scrollHint: 'Scroll to explore'
    },
    role: {
      eyebrow: 'My Role',
      title: 'Lead designer\ndriving clarity',
      subtitle: 'Leading the design team process, co-driving the roadmap with Lead PM, structuring discovery to accelerate decision-making',
      items: [
        { icon: 'briefcase', label: 'Lead Product Designer', detail: '6-month mission' },
        { icon: 'calendar', label: 'Season workflow', detail: '1-month cycles' },
        { icon: 'target', label: 'Prioritization matrix', detail: 'Co-designed with PM' },
        { icon: 'users', label: 'User research', detail: '10 interviews + workshops' },
        { icon: 'layers', label: 'Design ops', detail: 'Figma + delivery' }
      ],
      context: 'France VAE is the national public service for Validation of Acquired Experience. I joined to lead the design team process, co-drive the roadmap with the Lead PM, and structure discovery to help the delivery team ship faster—especially on politically-driven initiatives lacking clear specs.'
    },
    scope: {
      eyebrow: 'Scope of Work',
      title: '6 high-impact\ninitiatives',
      intro: 'Strategic frameworks and hands-on design across the entire product lifecycle.',
      areas: [
        {
          id: 'workflow',
          title: 'Product Workflow Redesign',
          description: 'Co-designed new org model with 1-month seasons and cross-team prioritization matrix.',
          image: '/images/francevae/presentation process_discovery @2x.webp',
          caption: 'Discovery process and monthly seasons framework'
        },
        {
          id: 'vae-collective',
          title: 'VAE Collective MVP',
          description: 'End-to-end employer journey for collective certification programs.',
          image: '/images/francevae/prototype vae collective .webp',
          caption: 'Employer dashboard prototype for collective VAE programs'
        },
        {
          id: 'research',
          title: 'User Research',
          description: '10 interviews across 2 waves for the new candidate dashboard.',
          image: '/images/francevae/UXR - interface tableau de bord candidat.webp',
          caption: 'Candidate dashboard interface tested with users'
        },
        {
          id: 'workshop',
          title: 'Design Thinking Workshops',
          description: '2-day workshop with field practitioners. Problem framing to solution sketching.',
          image: '/images/francevae/photo atelier aap 02.webp',
          caption: 'Design thinking workshop with AAP practitioners'
        },
        {
          id: 'design-ops',
          title: 'Design Ops',
          description: 'New Figma architecture by user journey, lot-based prototyping for faster handoff.',
          image: '/images/francevae/Design ops/workspace UX 02.webp',
          caption: 'Figma workspace organized by user journey'
        },
        {
          id: 'ai-orientation',
          title: 'AI Experimentation',
          description: 'Built 2 functional prototypes: positioning chatbot and skills radar.',
          image: '/images/francevae/proto IA - orientation professionnelle assistee par IA.webp',
          caption: 'AI skills radar prototype for career orientation'
        }
      ]
    },
    outcome: {
      eyebrow: 'Impact',
      title: 'Structured foundations\nfor scale',
      metrics: [
        { value: '10', label: 'User interviews', sublabel: 'across 2 waves' },
        { value: '14', label: 'Mockups delivered', sublabel: '6 initiatives' },
        { value: '1', label: 'Complete MVP', sublabel: 'VAE Collective' }
      ]
    },
    testimonial: {
      quote: 'Victor brought structure and clarity to our design operations at a critical scaling phase. His ability to balance strategic thinking with hands-on delivery made a real difference for our team.',
      author: 'Boris Aimé-Bauderlique',
      role: 'Product Lead, France VAE'
    },
    cta: {
      title: 'Interested in similar results?',
      button: 'Get in touch'
    }
  },
  fr: {
    hero: {
      eyebrow: 'Lead Product Designer • beta.gouv.fr • 2024-2025',
      title: 'Livrer vite dans un\nenvironnement complexe',
      subtitle: 'Mission de 6 mois pour structurer les opérations produit de la plateforme nationale VAE servant 100K+ citoyens',
      scrollHint: 'Défiler pour explorer'
    },
    role: {
      eyebrow: 'Mon Rôle',
      title: 'Lead designer\nau service de la clarté',
      subtitle: 'Encadrer le processus design, co-piloter la roadmap avec la Lead PM, structurer la découverte pour accélérer la prise de décision',
      items: [
        { icon: 'briefcase', label: 'Lead Product Designer', detail: 'Mission 6 mois' },
        { icon: 'calendar', label: 'Workflow saisons', detail: 'Cycles d\'1 mois' },
        { icon: 'target', label: 'Matrice de priorisation', detail: 'Co-conçue avec PM' },
        { icon: 'users', label: 'Recherche utilisateur', detail: '10 entretiens + ateliers' },
        { icon: 'layers', label: 'Design ops', detail: 'Figma + delivery' }
      ],
      context: 'France VAE est le service public national de Validation des Acquis de l\'Expérience. J\'ai rejoint l\'équipe pour encadrer le processus design, co-piloter la roadmap avec la Lead PM, et structurer la découverte pour permettre à l\'équipe de réalisation de livrer plus vite—notamment sur des commandes politiques floues manquant de specs claires.'
    },
    scope: {
      eyebrow: 'Périmètre',
      title: '6 initiatives\nà fort impact',
      intro: 'Frameworks stratégiques et livraison design sur l\'ensemble du cycle produit.',
      areas: [
        {
          id: 'workflow',
          title: 'Refonte Workflow Produit',
          description: 'Co-conception d\'un nouveau modèle avec saisons d\'1 mois et matrice de priorisation.',
          image: '/images/francevae/presentation process_discovery @2x.webp',
          caption: 'Framework discovery et saisons mensuelles'
        },
        {
          id: 'vae-collective',
          title: 'MVP VAE Collective',
          description: 'Parcours employeur complet pour programmes de certification collective.',
          image: '/images/francevae/prototype vae collective .webp',
          caption: 'Prototype dashboard employeur pour VAE collective'
        },
        {
          id: 'research',
          title: 'Recherche Utilisateur',
          description: '10 entretiens sur 2 vagues pour le nouveau tableau de bord candidat.',
          image: '/images/francevae/UXR - interface tableau de bord candidat.webp',
          caption: 'Interface tableau de bord testée avec les utilisateurs'
        },
        {
          id: 'workshop',
          title: 'Ateliers Design Thinking',
          description: 'Atelier de 2 jours avec praticiens terrain. Du cadrage problème au croquis de solutions.',
          image: '/images/francevae/photo atelier aap 02.webp',
          caption: 'Atelier design thinking avec les praticiens AAP'
        },
        {
          id: 'design-ops',
          title: 'Design Ops',
          description: 'Nouvelle architecture Figma par parcours utilisateur, prototypage par lots.',
          image: '/images/francevae/Design ops/workspace UX 02.webp',
          caption: 'Espace Figma organisé par parcours utilisateur'
        },
        {
          id: 'ai-orientation',
          title: 'Expérimentation IA',
          description: 'Construction de 2 prototypes fonctionnels : chatbot et radar de compétences.',
          image: '/images/francevae/proto IA - orientation professionnelle assistee par IA.webp',
          caption: 'Prototype IA radar de compétences pour l\'orientation'
        }
      ]
    },
    outcome: {
      eyebrow: 'Impact',
      title: 'Des fondations\nstructurées pour scaler',
      metrics: [
        { value: '10', label: 'Entretiens utilisateurs', sublabel: 'sur 2 vagues' },
        { value: '14', label: 'Maquettes livrées', sublabel: '6 initiatives' },
        { value: '1', label: 'MVP complet', sublabel: 'VAE Collective' }
      ]
    },
    testimonial: {
      quote: 'Victor a apporté structure et clarté à nos opérations design dans une phase critique de croissance. Sa capacité à équilibrer réflexion stratégique et livraison concrète a fait une vraie différence pour notre équipe.',
      author: 'Boris Aimé-Bauderlique',
      role: 'Product Lead, France VAE'
    },
    cta: {
      title: 'Intéressé par des résultats similaires ?',
      button: 'Me contacter'
    }
  }
};

// ============================================================================
// ANIMATION COMPONENTS
// ============================================================================

const FadeInSection: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// ROLE DIAGRAM
// ============================================================================

const RoleDiagram: React.FC<{
  items: Array<{ icon: string; label: string; detail: string }>;
  isDark: boolean;
}> = ({ items, isDark }) => {
  const iconMap: Record<string, React.ReactNode> = {
    briefcase: <Briefcase size={24} />,
    calendar: <Calendar size={24} />,
    target: <Target size={24} />,
    users: <Users size={24} />,
    layers: <Layers size={24} />
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + idx * 0.08 }}
          className={`p-5 rounded-2xl text-center ${
            isDark ? 'bg-white/5' : 'bg-gray-50'
          }`}
        >
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${
            isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
          }`}>
            {iconMap[item.icon]}
          </div>
          <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {item.label}
          </p>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {item.detail}
          </p>
        </motion.div>
      ))}
    </div>
  );
};


// ============================================================================
// INTERACTIVE INITIATIVE DIAGRAM - Apple Keynote style carousel
// ============================================================================

const INITIATIVES_DATA = {
  en: [
    {
      id: 1,
      title: "VAE Collective MVP",
      duration: "5 weeks",
      icon: Target,
      description: "End-to-end employer journey for collective certification programs.",
      features: [
        "Discovery with HR managers and training centers",
        "Complete employer journey prototype",
        "B2B pitch deck for commercial outreach",
        "Promotional video with screencast",
        "Functional MVP ready for deployment"
      ]
    },
    {
      id: 2,
      title: "Product Operations",
      duration: "5 weeks",
      icon: Layers,
      description: "Restructuring team workflows for faster delivery.",
      features: [
        "Diagnosis of siloed team operations",
        "New org model with 1-month seasons",
        "Cross-team prioritization matrix",
        "Discovery/delivery workflow separation",
        "Weekly PO/designer sync rituals"
      ]
    },
    {
      id: 3,
      title: "User Research",
      duration: "4 weeks",
      icon: Users,
      description: "Building a knowledge base from candidate interviews.",
      features: [
        "Centralized user knowledge base",
        "10 moderated interviews (2 waves)",
        "Test protocols and interview guides",
        "Prioritization tables for feedback",
        "2 synthesis reports for product team"
      ]
    },
    {
      id: 4,
      title: "Design Thinking Workshops",
      duration: "3 weeks",
      icon: Lightbulb,
      description: "Co-creation with field practitioners.",
      features: [
        "2-day workshop with accompaniment structures",
        "Problem framing to solution sketching",
        "Crazy-8 ideation sessions",
        "Notification system audit",
        "Email categorization and optimization"
      ]
    },
    {
      id: 5,
      title: "AI Experimentation",
      duration: "2 weeks",
      icon: Bot,
      description: "Rapid prototyping of AI-powered orientation tools.",
      features: [
        "User archetype identification",
        "10+ AI concept explorations",
        "Positioning chatbot prototype",
        "Skills radar visualization",
        "2 functional prototypes deployed"
      ]
    }
  ],
  fr: [
    {
      id: 1,
      title: "MVP VAE Collective",
      duration: "5 semaines",
      icon: Target,
      description: "Parcours employeur complet pour programmes de certification collective.",
      features: [
        "Découverte avec RH et centres de formation",
        "Prototype complet du parcours employeur",
        "Pitch deck B2B pour démarchage",
        "Vidéo promotionnelle avec screencast",
        "MVP fonctionnel prêt au déploiement"
      ]
    },
    {
      id: 2,
      title: "Opérations Produit",
      duration: "5 semaines",
      icon: Layers,
      description: "Restructuration des workflows pour livrer plus vite.",
      features: [
        "Diagnostic des équipes en silos",
        "Nouveau modèle avec saisons d'1 mois",
        "Matrice de priorisation cross-équipe",
        "Séparation discovery/delivery",
        "Rituels hebdo PO/designer"
      ]
    },
    {
      id: 3,
      title: "Recherche Utilisateur",
      duration: "4 semaines",
      icon: Users,
      description: "Construction d'une base de connaissance candidat.",
      features: [
        "Base de connaissance utilisateur",
        "10 entretiens modérés (2 vagues)",
        "Protocoles de test et guides",
        "Tableaux de priorisation retours",
        "2 rapports de synthèse produit"
      ]
    },
    {
      id: 4,
      title: "Ateliers Design Thinking",
      duration: "3 semaines",
      icon: Lightbulb,
      description: "Co-création avec les acteurs terrain.",
      features: [
        "Atelier 2 jours avec structures AAP",
        "Du cadrage problème aux croquis",
        "Sessions d'idéation Crazy-8",
        "Audit système de notifications",
        "Catégorisation et optimisation emails"
      ]
    },
    {
      id: 5,
      title: "Expérimentation IA",
      duration: "2 semaines",
      icon: Bot,
      description: "Prototypage rapide d'outils d'orientation IA.",
      features: [
        "Identification archétypes utilisateurs",
        "10+ explorations concepts IA",
        "Prototype chatbot positionnement",
        "Visualisation radar compétences",
        "2 prototypes fonctionnels déployés"
      ]
    }
  ]
};

const InitiativesDiagram: React.FC<{
  isDark: boolean;
  lang: 'en' | 'fr';
}> = ({ isDark, lang }) => {
  const [activeInitiative, setActiveInitiative] = useState(0);
  const [viewMode, setViewMode] = useState<'focus' | 'overview'>('focus');
  const initiatives = INITIATIVES_DATA[lang];

  // Swipe logic for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handleNext = () => {
    if (activeInitiative < initiatives.length - 1) setActiveInitiative(prev => prev + 1);
  };

  const handlePrev = () => {
    if (activeInitiative > 0) setActiveInitiative(prev => prev - 1);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) handleNext();
    if (distance < -minSwipeDistance) handlePrev();
  };

  const texts = {
    focus: lang === 'fr' ? 'Focus' : 'Focus',
    overview: lang === 'fr' ? 'Vue d\'ensemble' : 'Overview',
    keyDeliverables: lang === 'fr' ? 'Livrables clés' : 'Key Deliverables',
    initiative: lang === 'fr' ? 'Initiative' : 'Initiative'
  };

  return (
    <div className="mt-8">
      {/* View Toggle */}
      <div className="flex justify-center mb-8">
        <div className={`inline-flex rounded-full p-1 ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
          <button
            onClick={() => setViewMode('focus')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              viewMode === 'focus'
                ? isDark ? 'bg-white text-black' : 'bg-gray-900 text-white'
                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {texts.focus}
          </button>
          <button
            onClick={() => setViewMode('overview')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              viewMode === 'overview'
                ? isDark ? 'bg-white text-black' : 'bg-gray-900 text-white'
                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {texts.overview}
          </button>
        </div>
      </div>

      {viewMode === 'focus' ? (
        /* Focus View */
        <div
          className="relative touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {initiatives.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveInitiative(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === activeInitiative
                    ? `w-10 ${isDark ? 'bg-white' : 'bg-gray-900'}`
                    : `w-2 ${isDark ? 'bg-white/20 hover:bg-white/40' : 'bg-gray-300 hover:bg-gray-400'}`
                }`}
              />
            ))}
          </div>

          {/* Card Container */}
          <div className="relative h-[520px] md:h-[420px]">
            {initiatives.map((initiative, idx) => {
              const isActive = idx === activeInitiative;
              const isPrev = idx < activeInitiative;
              const isNext = idx > activeInitiative;
              const InitiativeIcon = initiative.icon;

              return (
                <div
                  key={initiative.id}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out origin-bottom
                    ${isActive ? 'opacity-100 scale-100 translate-x-0 z-20' : ''}
                    ${isPrev ? 'opacity-0 scale-95 -translate-x-12 z-10 pointer-events-none' : ''}
                    ${isNext ? 'opacity-0 scale-95 translate-x-12 z-10 pointer-events-none' : ''}
                  `}
                >
                  <div className={`rounded-3xl overflow-hidden h-full flex flex-col md:flex-row ${
                    isDark ? 'bg-white/5 border border-white/10' : 'bg-white shadow-xl border border-gray-100'
                  }`}>
                    {/* Left: Identity */}
                    <div className={`md:w-1/3 p-8 md:p-10 flex flex-col justify-between ${
                      isDark ? 'bg-white/5 border-b md:border-b-0 md:border-r border-white/10' : 'bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100'
                    }`}>
                      <div>
                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 ${
                          isDark ? 'bg-white text-black' : 'bg-blue-600 text-white'
                        }`}>
                          <InitiativeIcon size={26} strokeWidth={2} />
                        </div>
                        <div className={`uppercase tracking-widest text-[10px] font-bold mb-2 ${
                          isDark ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {texts.initiative} {initiative.id}
                        </div>
                        <h3 className={`text-2xl md:text-3xl font-bold leading-tight mb-2 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {initiative.title}
                        </h3>
                        <div className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${
                          isDark ? 'bg-white/10 text-gray-300' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {initiative.duration}
                        </div>
                      </div>
                      <p className={`text-sm leading-relaxed mt-6 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {initiative.description}
                      </p>
                    </div>

                    {/* Right: Features */}
                    <div className="md:w-2/3 p-8 md:p-10 overflow-y-auto">
                      <h4 className={`text-xs font-semibold uppercase tracking-wider mb-6 ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {texts.keyDeliverables}
                      </h4>
                      <ul className="space-y-4">
                        {initiative.features.map((feature, fIdx) => (
                          <motion.li
                            key={fIdx}
                            initial={{ opacity: 0, x: 10 }}
                            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                            transition={{ delay: isActive ? 0.2 + fIdx * 0.08 : 0, duration: 0.4 }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                            <span className={`text-sm md:text-base font-medium leading-relaxed ${
                              isDark ? 'text-gray-200' : 'text-gray-800'
                            }`}>
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none px-2 md:-mx-4 z-50">
            <button
              onClick={handlePrev}
              disabled={activeInitiative === 0}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center pointer-events-auto transition-all duration-300 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none ${
                isDark ? 'bg-white/80 text-black' : 'bg-white shadow-lg text-gray-900'
              }`}
            >
              <ArrowRight size={20} className="rotate-180" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeInitiative === initiatives.length - 1}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center pointer-events-auto transition-all duration-300 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none ${
                isDark ? 'bg-white/80 text-black' : 'bg-white shadow-lg text-gray-900'
              }`}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      ) : (
        /* Overview View - Grid of all initiatives */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {initiatives.map((initiative) => {
            const InitiativeIcon = initiative.icon;
            return (
              <div
                key={initiative.id}
                onClick={() => {
                  setActiveInitiative(initiative.id - 1);
                  setViewMode('focus');
                }}
                className={`group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  isDark ? 'bg-white/5 hover:bg-white/10 border border-white/10' : 'bg-white shadow-sm hover:shadow-lg border border-gray-100'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl transition-colors duration-300 ${
                    isDark
                      ? 'bg-white/10 text-white group-hover:bg-white group-hover:text-black'
                      : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                  }`}>
                    <InitiativeIcon size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-bold tracking-wider ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {texts.initiative} {initiative.id}
                    </div>
                    <div className={`text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-blue-600'}`}>
                      {initiative.duration}
                    </div>
                  </div>
                </div>

                <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {initiative.title}
                </h4>

                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {initiative.description}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// METRICS ROW
// ============================================================================

const MetricsRow: React.FC<{
  metrics: Array<{ value: string; label: string; sublabel: string }>;
  isDark: boolean;
}> = ({ metrics, isDark }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      {metrics.map((metric, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
          className="text-center"
        >
          <div className={`text-5xl md:text-6xl font-bold tracking-tight mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {metric.value}
          </div>
          <p className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {metric.label}
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {metric.sublabel}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const FranceVaeExecutive: React.FC<FranceVaeExecutiveProps> = ({
  systemTheme,
  lang,
  onImageClick,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onViewFull
}) => {
  const isDark = systemTheme === 'dark';
  const t = TRANSLATIONS[lang];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>

      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <section className="min-h-[85vh] flex flex-col justify-center px-10 py-20">
        <div className="max-w-[1280px] mx-auto w-full">
          {/* Logo */}
          <FadeInSection>
            <img loading="lazy"
              src="/images/francevae/logo fvae.webp"
              alt="France VAE"
              className="h-10 md:h-12 w-auto mb-8"
            />
          </FadeInSection>

          <FadeInSection delay={0.05}>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.hero.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h1 className={`mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-[-0.02em] whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.hero.title}
            </h1>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <p className={`mt-6 text-xl md:text-2xl max-w-2xl ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.hero.subtitle}
            </p>
          </FadeInSection>

          {/* Hero Image */}
          <FadeInSection delay={0.3} className="mt-12">
            <figure>
              <div
                onClick={() => onImageClick('/images/francevae/france_vae_home.webp')}
                className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  isDark ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img loading="lazy"
                    src="/images/francevae/france_vae_home.webp"
                    alt="France VAE Homepage"
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
              <figcaption className={`mt-3 text-sm text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {lang === 'fr' ? 'Page d\'accueil de France VAE - Service public national' : 'France VAE Homepage - National public service'}
              </figcaption>
            </figure>
          </FadeInSection>

          {/* Scroll hint */}
          <FadeInSection delay={0.5} className="mt-12 flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`flex flex-col items-center gap-2 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              <span className="text-sm">{t.hero.scrollHint}</span>
              <ChevronDown size={20} />
            </motion.div>
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* INITIATIVES DIAGRAM SECTION */}
      {/* ================================================================== */}
      <section className="py-20 md:py-28 px-10">
        <div className="max-w-[1280px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`}>
              {lang === 'fr' ? 'Mission de 6 mois' : '6-Month Mission'}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {lang === 'fr' ? 'Cinq initiatives\nà fort impact' : 'Five high-impact\ninitiatives'}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <InitiativesDiagram isDark={isDark} lang={lang} />
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* ROLE SECTION */}
      {/* ================================================================== */}
      <section className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
        <div className="max-w-[1280px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}>
              {t.role.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.role.title}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.15}>
            <p className={`mt-4 text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.role.subtitle}
            </p>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <RoleDiagram items={t.role.items} isDark={isDark} />
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <p className={`mt-8 text-base leading-relaxed max-w-3xl ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.role.context}
            </p>
          </FadeInSection>
        </div>
      </section>


      {/* ================================================================== */}
      {/* OUTCOME SECTION */}
      {/* ================================================================== */}
      <section className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
        <div className="max-w-[1280px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-amber-400' : 'text-amber-600'
            }`}>
              {t.outcome.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.outcome.title}
            </h2>
          </FadeInSection>

          <MetricsRow metrics={t.outcome.metrics} isDark={isDark} />
        </div>
      </section>

      {/* ================================================================== */}
      {/* TESTIMONIAL SECTION */}
      {/* ================================================================== */}
      <section className="py-20 md:py-28 px-10">
        <div className="max-w-[1280px] mx-auto">
          <FadeInSection>
            <div className={`rounded-3xl p-8 md:p-12 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
              <div className={`text-4xl mb-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                "
              </div>
              <blockquote className={`text-lg md:text-xl leading-relaxed ${
                isDark ? 'text-gray-200' : 'text-gray-800'
              }`}>
                {t.testimonial.quote}
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  <Users size={20} />
                </div>
                <div>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t.testimonial.author}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t.testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* CTA SECTION */}
      {/* ================================================================== */}
      <section className="py-20 md:py-28 px-10">
        <div className="max-w-[1280px] mx-auto text-center">
          <FadeInSection>
            <h2 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t.cta.title}
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <a
              href="mailto:victor.soussan@gmail.com"
              className={`inline-flex items-center gap-2 mt-8 px-8 py-4 font-semibold rounded-full transition-colors ${
                isDark
                  ? 'bg-white hover:bg-gray-100 text-black'
                  : 'bg-gray-900 hover:bg-black text-white'
              }`}
            >
              {t.cta.button}
              <ArrowRight size={20} />
            </a>
          </FadeInSection>
        </div>
      </section>

    </div>
  );
};

export default FranceVaeExecutive;
