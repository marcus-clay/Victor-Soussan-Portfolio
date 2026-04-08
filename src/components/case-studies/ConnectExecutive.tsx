/**
 * ConnectExecutive - Minimalist executive summary
 *
 * Structure: Hero -> Image -> Context -> Role (divide-y) -> Scope (divide-y + images) ->
 *            Videos -> User Testing -> Metrics -> Testimonial
 */

import React from 'react';
import { motion } from 'framer-motion';
import CaseStudyViewPills from '../CaseStudyViewPills';
import VideoPlayer from '@/components/VideoPlayer';
import CaseStudyTestimonialBlock from './CaseStudyTestimonialBlock';
import { getTestimonials } from '@/data/testimonialsData';

interface ConnectExecutiveProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  onImageClick: (src: string) => void;
  onViewFull: () => void;
  onContact?: () => void;
}

const TRANSLATIONS = {
  en: {
    hero: {
      eyebrow: 'Product Design Lead, UNOWHY, 2020-2021',
      title: 'Classroom orchestration reimagined',
      subtitle: 'A vision-casting prototype that catalyzed UNOWHY\'s product pivot.',
    },
    context: {
      title: 'Context',
      description: 'By 2020, UNOWHY\'s Android launcher was technically obsolete and visually outdated. The COVID-19 acceleration of digital usage made the need even more critical. Connect was the proof-of-concept for a modern, web-based dashboard designed to centralize classroom control, app access, and notifications for 500,000+ students across France.',
    },
    role: {
      title: 'Role',
      subtitle: 'From strategic vision to functional demonstrator.',
      items: [
        { label: 'Product Design Lead', detail: 'UX strategy & UI design' },
        { label: 'Vision initiator', detail: 'Co-authored the PRD' },
        { label: 'Prototype design', detail: 'Functional React demo' },
        { label: 'System design', detail: 'UI kit foundations' },
        { label: 'Cross-team', detail: 'Dev & C-level alignment' },
      ],
      context: 'I initiated the Connect vision with the Head of Product, designed all interfaces, and worked directly with a React developer to build a functional prototype that convinced C-level executives of the strategic direction.',
    },
    scope: {
      title: 'Scope of work',
      areas: [
        {
          title: 'Dashboard (Light)',
          description: 'Modular web-based teacher dashboard with quick actions, app catalog, and notifications.',
          image: '/images/connect/connect_dashboard_home_light_full-scaled.webp',
        },
        {
          title: 'Dashboard (Dark)',
          description: 'Dark theme variant optimized for classroom projection and reduced eye strain.',
          image: '/images/connect/connect_dashboard_home_dark_full_smartphone-scaled.webp',
        },
        {
          title: 'App Catalog',
          description: 'Searchable, filtered access to educational apps with MDM policy integration.',
          image: '/images/connect/connect_dashboard_applications_full-scaled.webp',
        },
        {
          title: 'La Bulle, Concept',
          description: 'Persistent floating UI for quick contextual actions, inspired by gaming overlays.',
          image: '/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp',
        },
        {
          title: 'La Bulle, UI',
          description: 'Refined visual system with radial menu and contextual shortcuts.',
          image: '/images/connect/connect_bulle_ui_focus-scaled.webp',
        },
        {
          title: 'Technical Architecture',
          description: 'System overview showing web dashboard integration with existing Android infrastructure.',
          image: '/images/connect/connect_tech_architecture-1-scaled.webp',
        },
        {
          title: 'Design System',
          description: 'Component library and visual language foundation for the Connect ecosystem.',
          image: '/images/connect/connect_design_system.webp',
        },
      ],
    },
    videos: {
      title: 'Key interactions',
      items: [
        {
          title: 'Design Sprint Flow',
          description: 'Complete prototype flow from onboarding to classroom piloting.',
          media: '/videos/connect/connect-design-sprint-compressed.mp4',
        },
        {
          title: 'Dashboard Prototype',
          description: 'Full walkthrough demonstrating modular capabilities and responsive behavior.',
          media: '/videos/connect/connect-dashboard-prototype_complet_4k-compressed.mp4',
        },
        {
          title: 'La Bulle Demo',
          description: 'Full demonstration of shortcuts, search, and sharing.',
          media: '/videos/connect/Video-demo-bulle-interactions-02-compressed.mp4',
        },
        {
          title: 'Bubble Animation',
          description: 'Motion prototype showing the opening animation and menu transitions.',
          media: '/videos/connect/interaction-bulle-connect-compressed.mp4',
        },
      ],
    },
    userTesting: {
      title: 'What teachers told us',
      insights: [
        { quote: 'The interface is clear, not overloaded. Categories are well-labeled. You know what you\'re looking at.', author: 'Solveig T., Teacher' },
        { quote: 'Widget customization is frequently requested by SQOOL clients. Great to let users arrange their interface.', author: 'Solveig T., Teacher' },
        { quote: 'Intuitive, modern, better than what exists. The piloting feature is a real value-add for our solution.', author: 'Kevin C., Teacher' },
      ],
      keyFindings: [
        'Onboarding: Users want to skip and discover on their own',
        'Quick Actions: Class piloting is the #1 priority feature',
        'Messages: Concerns about overlap with existing ENT messaging',
        'Customization: High demand for widget rearrangement',
        'Navigation: Need clearer "return to home" affordance',
      ],
    },
    metrics: [
      { value: 'Pivot', label: 'Strategic catalyst' },
      { value: 'React', label: 'Tech validated' },
      { value: 'UI Kit', label: 'Design foundation' },
    ],
    testimonial: {
      quote: 'I had the pleasure of collaborating with Victor for nearly 2 years at UNOWHY. As Product Lead, he played a central role in defining the product vision. His expertise, leadership, and close collaboration with stakeholders were essential in designing solutions that met user needs and strategic challenges.',
      author: 'Justine Le Tellier',
      role: 'UX Researcher',
    },
    cta: {
      viewFull: 'View full case study',
      contact: 'Get in touch',
    },
  },
  fr: {
    hero: {
      eyebrow: 'Product Design Lead, UNOWHY, 2020-2021',
      title: 'L\'orchestration de classe réinventée',
      subtitle: 'Un prototype de vision qui a catalysé le pivot produit d\'UNOWHY.',
    },
    context: {
      title: 'Contexte',
      description: 'En 2020, le lanceur Android d\'UNOWHY était techniquement obsolète et visuellement dépassé. L\'accélération numérique COVID-19 rendait le besoin encore plus critique. Connect était le proof-of-concept pour un dashboard web moderne conçu pour centraliser le contrôle de classe, l\'accès aux apps et les notifications pour plus de 500 000 élèves en France.',
    },
    role: {
      title: 'Rôle',
      subtitle: 'De la vision stratégique au démonstrateur fonctionnel.',
      items: [
        { label: 'Product Design Lead', detail: 'Stratégie UX & design UI' },
        { label: 'Initiateur de vision', detail: 'Co-auteur du PRD' },
        { label: 'Design prototype', detail: 'Démo React fonctionnelle' },
        { label: 'Design système', detail: 'Fondations UI kit' },
        { label: 'Transversal', detail: 'Alignement dev & C-level' },
      ],
      context: 'J\'ai initié la vision Connect avec le Head of Product, conçu toutes les interfaces, et travaillé directement avec un développeur React pour construire un prototype fonctionnel qui a convaincu les dirigeants de la direction stratégique.',
    },
    scope: {
      title: 'Périmètre',
      areas: [
        {
          title: 'Dashboard (Clair)',
          description: 'Dashboard web modulaire pour enseignants avec actions rapides, catalogue d\'apps et notifications.',
          image: '/images/connect/connect_dashboard_home_light_full-scaled.webp',
        },
        {
          title: 'Dashboard (Sombre)',
          description: 'Variante thème sombre optimisée pour la projection en classe et le confort visuel.',
          image: '/images/connect/connect_dashboard_home_dark_full_smartphone-scaled.webp',
        },
        {
          title: 'Catalogue d\'Apps',
          description: 'Accès recherchable et filtré aux apps éducatives avec intégration politique MDM.',
          image: '/images/connect/connect_dashboard_applications_full-scaled.webp',
        },
        {
          title: 'La Bulle, Concept',
          description: 'UI flottante persistante pour actions contextuelles rapides, inspirée des overlays gaming.',
          image: '/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp',
        },
        {
          title: 'La Bulle, UI',
          description: 'Système visuel affiné avec menu radial et raccourcis contextuels.',
          image: '/images/connect/connect_bulle_ui_focus-scaled.webp',
        },
        {
          title: 'Architecture Technique',
          description: 'Vue d\'ensemble système montrant l\'intégration du dashboard web avec l\'infrastructure Android existante.',
          image: '/images/connect/connect_tech_architecture-1-scaled.webp',
        },
        {
          title: 'Design System',
          description: 'Bibliothèque de composants et fondation du langage visuel pour l\'écosystème Connect.',
          image: '/images/connect/connect_design_system.webp',
        },
      ],
    },
    videos: {
      title: 'Interactions clés',
      items: [
        {
          title: 'Parcours Design Sprint',
          description: 'Flux prototype complet de l\'onboarding au pilotage de classe.',
          media: '/videos/connect/connect-design-sprint-compressed.mp4',
        },
        {
          title: 'Prototype Dashboard',
          description: 'Walkthrough complet démontrant les capacités modulaires et le comportement responsive.',
          media: '/videos/connect/connect-dashboard-prototype_complet_4k-compressed.mp4',
        },
        {
          title: 'Démo La Bulle',
          description: 'Démonstration complète des raccourcis, recherche et partage.',
          media: '/videos/connect/Video-demo-bulle-interactions-02-compressed.mp4',
        },
        {
          title: 'Animation Bulle',
          description: 'Prototype motion montrant l\'animation d\'ouverture et les transitions menu.',
          media: '/videos/connect/interaction-bulle-connect-compressed.mp4',
        },
      ],
    },
    userTesting: {
      title: 'Ce que les enseignants nous ont dit',
      insights: [
        { quote: 'L\'interface est claire, pas surchargée. Les catégories sont bien nommées. On sait de quoi on parle.', author: 'Solveig T., Enseignante' },
        { quote: 'La personnalisation des widgets est régulièrement demandée par les clients SQOOL. Bien de laisser le choix à l\'utilisateur d\'agencer son interface.', author: 'Solveig T., Enseignante' },
        { quote: 'Intuitif, moderne, mieux que l\'existant. Le pilotage est une vraie plus-value de notre solution.', author: 'Kevin C., Enseignant' },
      ],
      keyFindings: [
        'Onboarding : Les utilisateurs veulent skipper et découvrir seuls',
        'Actions rapides : Le pilotage de classe est la fonctionnalité #1',
        'Messages : Inquiétudes sur le chevauchement avec la messagerie ENT',
        'Personnalisation : Forte demande de réarrangement des widgets',
        'Navigation : Besoin d\'un retour à l\'accueil plus clair',
      ],
    },
    metrics: [
      { value: 'Pivot', label: 'Catalyseur stratégique' },
      { value: 'React', label: 'Tech validée' },
      { value: 'UI Kit', label: 'Fondation design' },
    ],
    testimonial: {
      quote: 'J\'ai eu le plaisir de collaborer avec Victor pendant près de 2 ans chez UNOWHY. En tant que Product Lead, il a joué un rôle central dans la définition de la vision produit. Son expertise, son leadership et sa collaboration étroite avec les parties prenantes ont été essentiels pour concevoir des solutions répondant aux besoins utilisateurs et aux enjeux stratégiques.',
      author: 'Justine Le Tellier',
      role: 'UX Researcher',
    },
    cta: {
      viewFull: 'Voir l\'étude complète',
      contact: 'Me contacter',
    },
  },
};

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
};

const ConnectExecutive: React.FC<ConnectExecutiveProps> = ({
  lang,
  onImageClick,
}) => {
  const t = TRANSLATIONS[lang];
  const testimonials = getTestimonials(lang);
  const testimonial = testimonials.find((x) => x.id === 'hubert-bloch')!;

  return (
    <div className="min-h-screen bg-[#FDFDFC]">

      {/* Hero */}
      <section id="hero" className="pt-16 md:pt-24 mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.div {...fadeIn}>
            <img
              loading="lazy"
              src="/images/unowhy/Logo-Unowhy-LightBg.svg"
              alt="UNOWHY"
              className="h-5 w-auto mb-6"
            />
          </motion.div>

          <motion.div {...fadeIn}>
            <p className="text-xs text-gray-400 mb-4">{t.hero.eyebrow}</p>
          </motion.div>

          <motion.div {...fadeIn}>
            <h1 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-3">
              {t.hero.title}
            </h1>
          </motion.div>

          <motion.div {...fadeIn}>
            <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
              {t.hero.subtitle}
            </p>
          </motion.div>

          <CaseStudyViewPills lang={lang} projectId="connect" isDark={false} />

          {/* Testimonial */}
          {testimonial && (
            <CaseStudyTestimonialBlock
              quote={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
              image={testimonial.image}
              linkedin={testimonial.linkedin}
              lang={lang}
            />
          )}
        </div>

        {/* Hero image */}
        <motion.div {...fadeIn} className="mt-10">
          <div className="max-w-[960px] mx-auto px-6">
            <div
              onClick={() => onImageClick('/images/connect/connect_overview.webp')}
              className="rounded-xl overflow-hidden cursor-zoom-in group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
            >
              <img
                loading="lazy"
                src="/images/connect/connect_overview.webp"
                alt="Connect Dashboard Overview"
                className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Context */}
      <section id="context" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.div {...fadeIn}>
            <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
              {t.context.title}
            </h2>
          </motion.div>

          <motion.div {...fadeIn}>
            <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
              {t.context.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Role */}
      <section id="role" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.div {...fadeIn}>
            <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-2">
              {t.role.title}
            </h2>
            <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-4">
              {t.role.subtitle}
            </p>
          </motion.div>

          <motion.div {...fadeIn}>
            <div className="divide-y divide-gray-100">
              {t.role.items.map((item, idx) => (
                <div key={idx} className="flex items-baseline justify-between py-3">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className="text-xs text-gray-400">{item.detail}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeIn}>
            <p className="mt-8 text-base text-gray-500 leading-relaxed max-w-[65ch]">
              {t.role.context}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Scope of work */}
      <section id="scope" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.div {...fadeIn}>
            <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
              {t.scope.title}
            </h2>
          </motion.div>

        </div>

        {t.scope.areas.map((area, idx) => (
          <React.Fragment key={idx}>
            <motion.div {...fadeIn} className="max-w-[740px] mx-auto px-6 mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">{area.title}</h3>
              <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{area.description}</p>
            </motion.div>
            <motion.div {...fadeIn} className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
              <div
                onClick={() => onImageClick(area.image)}
                className="rounded-xl overflow-hidden cursor-zoom-in group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
              >
                <img
                  loading="lazy"
                  src={area.image}
                  alt={area.title}
                  className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                />
              </div>
              <p className="mt-3 text-xs font-medium text-gray-400">{area.title}</p>
            </motion.div>
          </React.Fragment>
        ))}
      </section>

      {/* Key interactions (videos) */}
      <section id="highlights" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.div {...fadeIn}>
            <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
              {t.videos.title}
            </h2>
          </motion.div>
        </div>

        {t.videos.items.map((item, idx) => (
          <React.Fragment key={idx}>
            <motion.div {...fadeIn} className="max-w-[740px] mx-auto px-6 mb-6">
              <p className="text-sm font-medium text-gray-900">{item.title}</p>
            </motion.div>
            <motion.div {...fadeIn} className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
              <div
                onClick={() => onImageClick(item.media)}
                className="rounded-xl overflow-hidden cursor-zoom-in group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
              >
                <VideoPlayer src={item.media} className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" />
              </div>
              <p className="mt-3 text-xs font-medium text-gray-400">{item.title}</p>
            </motion.div>
          </React.Fragment>
        ))}
      </section>

      {/* User testing */}
      <section id="user-testing" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.div {...fadeIn}>
            <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
              {t.userTesting.title}
            </h2>
          </motion.div>

          <motion.div {...fadeIn}>
            <div className="space-y-6">
              {t.userTesting.insights.map((insight, idx) => (
                <div key={idx}>
                  <blockquote className="text-base text-gray-500 leading-relaxed italic max-w-[65ch]">
                    "{insight.quote}"
                  </blockquote>
                  <p className="mt-1 text-xs text-gray-400">{insight.author}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeIn}>
            <div className="mt-8 divide-y divide-gray-100">
              {t.userTesting.keyFindings.map((finding, idx) => (
                <p key={idx} className="py-2.5 text-sm text-gray-500">{finding}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section id="outcome" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.div {...fadeIn}>
            <div className="flex items-baseline gap-12 md:gap-16">
              {t.metrics.map((metric, idx) => (
                <div key={idx}>
                  <span className="text-base font-semibold text-gray-900">{metric.value}</span>
                  <p className="text-xs text-gray-400 mt-1">{metric.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ConnectExecutive;
