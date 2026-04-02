/**
 * SqoolExecutive - Minimalist "En bref" / "At a glance" for SQOOL Suite
 */

import React from 'react';
import { motion } from 'framer-motion';
import CaseStudyViewPills from '../CaseStudyViewPills';
import CaseStudyTestimonialBlock from './CaseStudyTestimonialBlock';
import { getTestimonials } from '@/data/testimonialsData';
import PhaseAccordion from './PhaseAccordion';

interface SqoolExecutiveProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  onImageClick: (src: string) => void;
  onViewFull: () => void;
  onContact?: () => void;
}

const TRANSLATIONS = {
  en: {
    hero: {
      eyebrow: 'Product Design Lead · 2018-2024',
      title: 'Building an EdTech ecosystem at scale',
      subtitle: 'From hardware launcher to 7+ web apps serving 500K+ students. I joined UNOWHY as Senior UX/UI Designer in 2018, grew into Design Lead in 2020, then Product Lead in 2023.',
      image: '/images/sqool/hero_ecosystem_sqool.webp',
    },
    role: {
      title: 'Role',
      items: [
        { label: 'Product Design Lead', detail: '2020-2024' },
        { label: 'Team of 5 designers', detail: 'Recruited & managed' },
        { label: 'Brand identity', detail: 'Full visual system' },
        { label: 'Design system', detail: 'ZeroHeight + Figma' },
        { label: 'Product strategy', detail: 'Co-led with CPO' },
      ],
    },
    scope: {
      title: 'Scope of work',
      intro: 'From classroom supervision to parental controls, each app solves one clear problem.',
      areas: [
        {
          title: 'SQOOL Classe',
          description: 'Real-time classroom supervision. Teachers see every student screen, lock devices, push content.',
          image: '/images/sqool/sqool classe/Visuel - Comm - Pilotage - accueil - Focus Classe temporaire@2x.webp',
        },
        {
          title: 'SQOOL Partage',
          description: 'One-gesture file sharing. Drag and drop to share files with a class, like AirDrop for classrooms.',
          image: '/images/sqool/hero_ecosystem_sqool.webp',
        },
        {
          title: 'SQOOL MDM',
          description: 'Device fleet management for IT admins. Security policies, app deployments, remote troubleshooting.',
          image: '/images/sqool/sqool_legacy_mdm.webp',
        },
        {
          title: 'SQOOL Protect',
          description: 'Parental controls with QR code pairing. Screen time limits, 3-minute setup, shipped in 3 months.',
          image: '/images/sqool/systeme de marque/visuels_systeme_de_marque_08_2x.webp',
        },
        {
          title: 'SQOOL Extend',
          description: 'Cloud desktops for heavy software. Virtual Windows with professional tools on light devices.',
          image: '/images/sqool/systeme de marque/visuels_systeme_de_marque_07_2x.webp',
        },
        {
          title: 'Design System',
          description: 'Figma libraries, ZeroHeight documentation, tokens, and components scaling to 7+ apps.',
          image: '/images/sqool/hi sqool/hisqoolcomponents2x.webp',
        },
      ],
    },
    journey: {
      title: '6-year journey',
      phases: [
        {
          title: 'Discovery',
          period: '2018-2020',
          deliverables: [
            'Hi-SQOOL student platform',
            'New authentication system',
            'Cloud storage foundations',
            'Connect vision prototype',
            '"La Bulle" concept UI',
            'First design patterns',
          ],
        },
        {
          title: 'Strategic Pivot',
          period: '2021',
          deliverables: [
            'Product manifesto: Simple, Fluid, Magical',
            'Brand system with agency Fllow',
            'App color differentiation',
            'Figma design libraries',
            'ZeroHeight documentation',
            'Weekly design syncs',
          ],
        },
        {
          title: 'Suite Delivery',
          period: '2022-2024',
          deliverables: [
            'SQOOL Classe (classroom control)',
            'SQOOL Partage (file sharing)',
            'SQOOL Protect (parental controls)',
            'SQOOL Extend (cloud desktops)',
            'Design QA rituals',
            'Team scaled to 5 designers',
          ],
        },
      ],
    },
    highlights: {
      title: 'Brand system',
      items: [
        {
          title: 'Color System',
          description: 'Each app has a signature color while maintaining family recognition across the suite.',
          media: '/images/sqool/sqool brand/ColorsGradients.webp',
        },
        {
          title: 'Apps Hub',
          description: 'Landing page showcasing all SQOOL apps with consistent card design and navigation.',
          media: '/images/sqool/systeme de marque/visuels_systeme_de_marque_12_2x.webp',
        },
        {
          title: 'Android Launcher',
          description: 'Tablet launcher with ecosystem app grid, maintaining brand consistency on Android.',
          media: '/images/sqool/systeme de marque/visuels_systeme_de_marque_14_2x.webp',
        },
        {
          title: 'Component Library',
          description: 'Reusable UI components ensuring consistency across 7+ applications and 120+ screens.',
          media: '/images/sqool/hi sqool/hisqooltokens2x3.webp',
        },
      ],
    },
    insights: {
      title: 'What teachers taught us',
      items: [
        {
          title: 'Simplicity beats features',
          description: 'Every time we added options, adoption dropped. The apps that worked had fewer screens and clearer paths.',
        },
        {
          title: 'Teachers don\'t collaborate real-time',
          description: 'They want to prepare content, distribute it, collect work, then grade. Sequential, not simultaneous.',
        },
        {
          title: 'Design for bad WiFi',
          description: 'School networks are unreliable. Apps show clear status when offline, not cryptic errors.',
        },
        {
          title: 'Consistency builds trust',
          description: 'When teachers move between apps, they don\'t want to relearn interfaces. Our design system paid off.',
        },
      ],
    },
    outcome: {
      title: 'Impact',
      metrics: [
        { value: '500K+', label: 'Students & teachers served daily' },
        { value: '465', label: 'High schools in Ile-de-France' },
        { value: '7+', label: 'Web applications shipped' },
      ],
    },
    testimonial: {
      quote: 'Victor played a key role in our design transformation. He built the team, established our design system, and brought the rigor we needed to scale from one product to an entire ecosystem. His ability to balance strategic vision with hands-on execution was essential to SQOOL\'s evolution.',
      author: 'Charlotte Rifflet',
      role: 'CPO @ UNOWHY',
    },
  },
  fr: {
    hero: {
      eyebrow: 'Product Design Lead · 2018-2024',
      title: 'Construire un \u00e9cosyst\u00e8me EdTech \u00e0 grande \u00e9chelle',
      subtitle: 'Du launcher mat\u00e9riel \u00e0 7+ apps web pour 500K+ \u00e9l\u00e8ves. J\u2019ai rejoint UNOWHY comme Senior UX/UI Designer en 2018, suis devenu Design Lead en 2020, puis Product Lead en 2023.',
      image: '/images/sqool/hero_ecosystem_sqool.webp',
    },
    role: {
      title: 'R\u00f4le',
      items: [
        { label: 'Product Design Lead', detail: '2020-2024' },
        { label: '\u00c9quipe de 5 designers', detail: 'Recrut\u00e9s & manag\u00e9s' },
        { label: 'Identit\u00e9 de marque', detail: 'Syst\u00e8me visuel complet' },
        { label: 'Design system', detail: 'ZeroHeight + Figma' },
        { label: 'Strat\u00e9gie produit', detail: 'Co-pilot\u00e9e avec CPO' },
      ],
    },
    scope: {
      title: 'P\u00e9rim\u00e8tre',
      intro: 'De la supervision de classe au contr\u00f4le parental, chaque app r\u00e9sout un probl\u00e8me clair.',
      areas: [
        {
          title: 'SQOOL Classe',
          description: 'Supervision de classe en temps r\u00e9el. Les enseignants voient chaque \u00e9cran, verrouillent les appareils, poussent du contenu.',
          image: '/images/sqool/sqool classe/Visuel - Comm - Pilotage - accueil - Focus Classe temporaire@2x.webp',
        },
        {
          title: 'SQOOL Partage',
          description: 'Partage de fichiers en un geste. Glisser-d\u00e9poser pour partager avec une classe, comme AirDrop pour les salles de classe.',
          image: '/images/sqool/hero_ecosystem_sqool.webp',
        },
        {
          title: 'SQOOL MDM',
          description: 'Gestion de flotte d\u2019appareils pour admins IT. Politiques de s\u00e9curit\u00e9, d\u00e9ploiements d\u2019apps, d\u00e9pannage \u00e0 distance.',
          image: '/images/sqool/sqool_legacy_mdm.webp',
        },
        {
          title: 'SQOOL Protect',
          description: 'Contr\u00f4le parental avec appairage QR code. Limites de temps d\u2019\u00e9cran, configuration en 3 minutes, livr\u00e9 en 3 mois.',
          image: '/images/sqool/systeme de marque/visuels_systeme_de_marque_08_2x.webp',
        },
        {
          title: 'SQOOL Extend',
          description: 'Bureaux virtuels pour logiciels lourds. Windows virtuel avec outils pros sur appareils l\u00e9gers.',
          image: '/images/sqool/systeme de marque/visuels_systeme_de_marque_07_2x.webp',
        },
        {
          title: 'Design System',
          description: 'Biblioth\u00e8ques Figma, documentation ZeroHeight, tokens et composants scalant sur 7+ apps.',
          image: '/images/sqool/hi sqool/hisqoolcomponents2x.webp',
        },
      ],
    },
    journey: {
      title: 'Parcours 6 ans',
      phases: [
        {
          title: 'D\u00e9couverte',
          period: '2018-2020',
          deliverables: [
            'Plateforme \u00e9l\u00e8ve Hi-SQOOL',
            'Nouveau syst\u00e8me d\u2019authentification',
            'Fondations stockage cloud',
            'Prototype de vision Connect',
            'Concept UI \u00ab La Bulle \u00bb',
            'Premiers patterns design',
          ],
        },
        {
          title: 'Pivot Strat\u00e9gique',
          period: '2021',
          deliverables: [
            'Manifeste produit : Simple, Fluide, Magique',
            'Syst\u00e8me de marque avec agence Fllow',
            'Diff\u00e9renciation couleur par app',
            'Biblioth\u00e8ques design Figma',
            'Documentation ZeroHeight',
            'Syncs design hebdomadaires',
          ],
        },
        {
          title: 'Livraison Suite',
          period: '2022-2024',
          deliverables: [
            'SQOOL Classe (contr\u00f4le de classe)',
            'SQOOL Partage (partage fichiers)',
            'SQOOL Protect (contr\u00f4le parental)',
            'SQOOL Extend (bureaux virtuels)',
            'Rituels Design QA',
            '\u00c9quipe \u00e0 5 designers',
          ],
        },
      ],
    },
    highlights: {
      title: 'Syst\u00e8me de marque',
      items: [
        {
          title: 'Syst\u00e8me de couleurs',
          description: 'Chaque app a une couleur signature tout en maintenant la reconnaissance famille dans la suite.',
          media: '/images/sqool/sqool brand/ColorsGradients.webp',
        },
        {
          title: 'Hub Apps',
          description: 'Page d\u2019accueil pr\u00e9sentant toutes les apps SQOOL avec design de cartes et navigation coh\u00e9rents.',
          media: '/images/sqool/systeme de marque/visuels_systeme_de_marque_12_2x.webp',
        },
        {
          title: 'Launcher Android',
          description: 'Launcher tablette avec grille d\u2019apps \u00e9cosyst\u00e8me, maintenant la coh\u00e9rence de marque sur Android.',
          media: '/images/sqool/systeme de marque/visuels_systeme_de_marque_14_2x.webp',
        },
        {
          title: 'Biblioth\u00e8que de composants',
          description: 'Composants UI r\u00e9utilisables assurant la coh\u00e9rence sur 7+ applications et 120+ \u00e9crans.',
          media: '/images/sqool/hi sqool/hisqooltokens2x3.webp',
        },
      ],
    },
    insights: {
      title: 'Ce que les enseignants nous ont appris',
      items: [
        {
          title: 'La simplicit\u00e9 bat les fonctionnalit\u00e9s',
          description: 'Chaque fois qu\u2019on ajoutait des options, l\u2019adoption baissait. Les apps qui marchaient avaient moins d\u2019\u00e9crans et des chemins plus clairs.',
        },
        {
          title: 'Les enseignants ne collaborent pas en temps r\u00e9el',
          description: 'Ils veulent pr\u00e9parer du contenu, le distribuer, collecter les travaux, puis noter. S\u00e9quentiel, pas simultan\u00e9.',
        },
        {
          title: 'Designer pour le WiFi instable',
          description: 'Les r\u00e9seaux scolaires sont peu fiables. Les apps montrent un statut clair hors ligne, pas des erreurs cryptiques.',
        },
        {
          title: 'La coh\u00e9rence construit la confiance',
          description: 'Quand les enseignants passent d\u2019une app \u00e0 l\u2019autre, ils ne veulent pas r\u00e9apprendre. Notre design system a pay\u00e9.',
        },
      ],
    },
    outcome: {
      title: 'Impact',
      metrics: [
        { value: '500K+', label: '\u00c9l\u00e8ves & enseignants servis quotidiennement' },
        { value: '465', label: 'Lyc\u00e9es en \u00cele-de-France' },
        { value: '7+', label: 'Applications web livr\u00e9es' },
      ],
    },
    testimonial: {
      quote: 'Victor a jou\u00e9 un r\u00f4le cl\u00e9 dans notre transformation design. Il a construit l\u2019\u00e9quipe, \u00e9tabli notre design system, et apport\u00e9 la rigueur n\u00e9cessaire pour passer d\u2019un produit \u00e0 un \u00e9cosyst\u00e8me entier. Sa capacit\u00e9 \u00e0 \u00e9quilibrer vision strat\u00e9gique et ex\u00e9cution concr\u00e8te a \u00e9t\u00e9 essentielle \u00e0 l\u2019\u00e9volution de SQOOL.',
      author: 'Charlotte Rifflet',
      role: 'CPO @ UNOWHY',
    },
  },
};

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const SqoolExecutive: React.FC<SqoolExecutiveProps> = ({
  lang,
  onImageClick,
}) => {
  const t = TRANSLATIONS[lang];
  const testimonials = getTestimonials(lang);
  const testimonial = testimonials.find((x) => x.id === 'charlotte-rifflet')!;

  return (
    <div className="bg-[#FDFDFC] min-h-screen">

      {/* HERO */}
      <section id="hero" className="pt-16 md:pt-24 mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.p {...fadeIn} className="text-xs text-gray-400 mb-4">
            {t.hero.eyebrow}
          </motion.p>
          <motion.h1
            {...fadeIn}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            {...fadeIn}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="text-base text-gray-500 leading-relaxed max-w-[65ch]"
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            <CaseStudyViewPills lang={lang} projectId="sqool" isDark={false} />
          </motion.div>

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
        <div className="max-w-[960px] mx-auto px-6 mt-10">
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            onClick={() => onImageClick(t.hero.image)}
            className="rounded-xl overflow-hidden cursor-zoom-in group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
          >
            <img
              loading="lazy"
              src={t.hero.image}
              alt="SQOOL Ecosystem"
              className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
            />
          </motion.div>
        </div>
      </section>

      {/* ROLE */}
      <section id="role" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.h2 {...fadeIn} className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
            {t.role.title}
          </motion.h2>
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="divide-y divide-gray-100"
          >
            {t.role.items.map((item, idx) => (
              <div key={idx} className="flex items-baseline justify-between py-3">
                <span className="text-sm text-gray-500">{item.label}</span>
                <span className="text-xs text-gray-400">{item.detail}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SCOPE */}
      <section id="scope" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.h2 {...fadeIn} className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
            {t.scope.title}
          </motion.h2>
          <motion.p
            {...fadeIn}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-4"
          >
            {t.scope.intro}
          </motion.p>
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="divide-y divide-gray-100"
          >
            {t.scope.areas.map((area, idx) => (
              <div key={idx} className="py-5 -mx-3 px-3 rounded-lg transition-colors duration-150 hover:bg-black/[.04] active:bg-black/[.06]">
                <h3 className="text-sm font-medium text-gray-900 mb-1">{area.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{area.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div
          {...fadeIn}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-[960px] mx-auto px-6 mt-10"
        >
          <div className="space-y-4">
            {t.scope.areas.map((area, idx) => (
              <div
                key={idx}
                onClick={() => onImageClick(area.image)}
                className="rounded-xl overflow-hidden cursor-zoom-in group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
              >
                <img
                  loading="lazy"
                  src={area.image}
                  alt={area.title}
                  className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* JOURNEY */}
      <section id="journey" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.h2 {...fadeIn} className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-8">
            {t.journey.title}
          </motion.h2>
          <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}>
            <PhaseAccordion phases={t.journey.phases} />
          </motion.div>
        </div>
      </section>

      {/* BRAND SYSTEM / HIGHLIGHTS */}
      <section id="highlights" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.h2 {...fadeIn} className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
            {t.highlights.title}
          </motion.h2>
        </div>
        <motion.div
          {...fadeIn}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-[960px] mx-auto px-6 mt-6"
        >
          <div className="space-y-4">
            {t.highlights.items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onImageClick(item.media)}
                className="rounded-xl overflow-hidden cursor-zoom-in group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
              >
                <img
                  loading="lazy"
                  src={item.media}
                  alt={item.title}
                  className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* USER RESEARCH INSIGHTS */}
      <section id="insights" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.h2 {...fadeIn} className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-8">
            {t.insights.title}
          </motion.h2>
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="divide-y divide-gray-100"
          >
            {t.insights.items.map((item, idx) => (
              <div key={idx} className="py-5 -mx-3 px-3 rounded-lg transition-colors duration-150 hover:bg-black/[.04] active:bg-black/[.06]">
                <h3 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* IMPACT / METRICS */}
      <section id="outcome" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.h2 {...fadeIn} className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-8">
            {t.outcome.title}
          </motion.h2>
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-baseline gap-12 md:gap-16"
          >
            {t.outcome.metrics.map((metric, idx) => (
              <div key={idx}>
                <span className="text-base font-semibold text-gray-900">{metric.value}</span>
                <p className="text-xs text-gray-400 mt-1">{metric.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default SqoolExecutive;
