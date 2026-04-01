/**
 * PagesJaunesExecutive - Minimalist executive summary
 *
 * Structure: Hero -> Image -> Context -> Role (divide-y) -> Scope (divide-y + images) -> Insights -> Metrics
 */

import React from 'react';
import { motion } from 'framer-motion';
import CaseStudyViewPills from '../CaseStudyViewPills';
import CaseStudyTestimonialBlock from './CaseStudyTestimonialBlock';
import { getTestimonials } from '@/data/testimonialsData';

interface PagesJaunesExecutiveProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  onImageClick: (src: string) => void;
  onViewFull: () => void;
  onContact?: () => void;
}

const TRANSLATIONS = {
  en: {
    hero: {
      eyebrow: 'Product Designer then UI Lead, PagesJaunes, 2014-2016',
      title: 'Redesigning PagesJaunes apps',
      subtitle: 'Two years modernizing France\'s most downloaded utility app. Homepage, onboarding, maps, and the groundwork for a design system.',
    },
    context: {
      title: 'Context',
      description: 'In 2014, PagesJaunes served 15M+ monthly visitors but felt stuck in web directory logic. The mobile apps existed, had millions of downloads, but the experience was heavy. Navigation felt dated. The challenge: make it faster, cleaner, more useful, without breaking what worked for existing users.',
    },
    role: {
      title: 'Role',
      subtitle: 'Product Designer in 2014, then UI Team Lead managing 4 designers.',
      items: [
        { label: 'UI Team Lead', detail: '4 designers, 2015-2016' },
        { label: 'Homepage redesign', detail: 'New search experience' },
        { label: 'iOS & Android', detail: 'First launch onboarding' },
        { label: 'Maps & directions', detail: 'Pedestrian routes' },
        { label: 'System audit', detail: 'Yellowstrap roadmap' },
      ],
      context: 'I joined as Product Designer working on web, partnerships (TheFork, Renault R-Link), and login flows. In 2015, I became UI Team Lead: coordinating 4 designers, owning the mobile app redesign, and running weekly syncs with iOS/Android devs.',
    },
    scope: {
      title: 'Scope of work',
      areas: [
        {
          title: 'Homepage Redesign',
          description: 'A conversational greeting reframes search from directory lookup to problem-solving. Users act faster when the interface feels personal.',
          image: '/images/pagesjaunes/pagesjaunes homepage.webp',
        },
        {
          title: 'First Launch Onboarding',
          description: 'Non-blocking animations at first launch. CAAnimation on iOS, Material transitions on Android. Tested in Paris UX lab.',
          image: '/images/pagesjaunes/pj 01@2x.webp',
        },
        {
          title: 'Walking Itinerary',
          description: 'Three modes: walk, drive, transit. The interface adapts to the user\'s choice. Built on Mappy API with handoff to external navigation apps.',
          image: '/images/pagesjaunes/pj 08@2x.webp',
        },
        {
          title: 'My PagesJaunes',
          description: 'History and Favorites turn one-time searches into retained value. Each saved business is a reason to return.',
          image: '/images/pagesjaunes/pj 06@2x.webp',
        },
        {
          title: 'Android Wear',
          description: 'Wearable task flows: search then call, or search then navigate. Two jobs, two paths, minimal taps.',
          image: '/images/pagesjaunes/Android wear/pj android wear ui.webp',
        },
        {
          title: 'Design System Strategy',
          description: 'Component audit across iOS, Android, and web. Identifying inconsistencies, documenting patterns, building the roadmap for "Yellowstrap".',
          image: '/images/pagesjaunes/Android wear/screens/cover_yellow strap apps.webp',
        },
      ],
    },
    insights: {
      title: 'What I learned',
      items: [
        { title: 'Don\'t break habits', description: '22M users have muscle memory. Radical changes confuse them. Small, clear improvements work better.' },
        { title: 'Utility apps need speed', description: 'People search for a plumber when they have a leak. Every millisecond counts. Especially on 3G.' },
        { title: 'Consistency is hard', description: 'iOS, Android, web, Wear: each platform has its own constraints. Shared patterns require constant negotiation.' },
        { title: 'Politics slow things down', description: 'Big company, many stakeholders. Sometimes the hardest part isn\'t design, it\'s alignment.' },
      ],
    },
    metrics: [
      { value: '22M+', label: 'Downloads' },
      { value: '300K', label: 'Daily users at peak' },
      { value: '4', label: 'Designers managed' },
    ],
    cta: {
      viewFull: 'View full case study',
      contact: 'Get in touch',
    },
  },
  fr: {
    hero: {
      eyebrow: 'Product Designer puis UI Lead, PagesJaunes, 2014-2016',
      title: 'Refonte des apps PagesJaunes',
      subtitle: 'Deux ans a moderniser l\'app utilitaire la plus telechargee de France. Homepage, onboarding, cartes, et les bases d\'un design system.',
    },
    context: {
      title: 'Contexte',
      description: 'En 2014, PagesJaunes servait 15M+ de visiteurs mensuels mais restait ancre dans une logique d\'annuaire web. Les apps mobiles existaient, avaient des millions de telechargements, mais l\'experience etait lourde. La navigation datee. Le defi : rendre tout ca plus rapide, plus clair, plus utile, sans casser ce qui marchait pour les utilisateurs existants.',
    },
    role: {
      title: 'Role',
      subtitle: 'Product Designer en 2014, puis UI Team Lead avec 4 designers.',
      items: [
        { label: 'UI Team Lead', detail: '4 designers, 2015-2016' },
        { label: 'Refonte homepage', detail: 'Nouvelle recherche' },
        { label: 'iOS & Android', detail: 'Onboarding premiere ouverture' },
        { label: 'Cartes & itineraires', detail: 'Navigation pieton' },
        { label: 'Audit systeme', detail: 'Roadmap Yellowstrap' },
      ],
      context: 'J\'ai rejoint comme Product Designer sur le web, les partenariats (TheFork, Renault R-Link), et les flows de login. En 2015, je suis devenu UI Team Lead : coordination de 4 designers, ownership de la refonte mobile, et syncs hebdo avec les devs iOS/Android.',
    },
    scope: {
      title: 'Perimetre',
      areas: [
        {
          title: 'Refonte Homepage',
          description: 'Une accroche conversationnelle transforme la recherche d\'annuaire en resolution de probleme. Les utilisateurs agissent plus vite quand l\'interface est personnelle.',
          image: '/images/pagesjaunes/pagesjaunes homepage.webp',
        },
        {
          title: 'Onboarding Premiere Ouverture',
          description: 'Animations non-bloquantes au premier lancement. CAAnimation sur iOS, transitions Material sur Android. Teste au labo UX Paris.',
          image: '/images/pagesjaunes/pj 01@2x.webp',
        },
        {
          title: 'Itineraire Pieton',
          description: 'Trois modes : marche, voiture, transports. L\'interface s\'adapte au choix de l\'utilisateur. Base sur l\'API Mappy avec handoff vers les apps de navigation.',
          image: '/images/pagesjaunes/pj 08@2x.webp',
        },
        {
          title: 'Mon PagesJaunes',
          description: 'Historique et Favoris transforment les recherches ponctuelles en valeur conservee. Chaque etablissement sauvegarde est une raison de revenir.',
          image: '/images/pagesjaunes/pj 06@2x.webp',
        },
        {
          title: 'Android Wear',
          description: 'Flows wearable : recherche puis appel, ou recherche puis navigation. Deux jobs, deux chemins, minimum de taps.',
          image: '/images/pagesjaunes/Android wear/pj android wear ui.webp',
        },
        {
          title: 'Strategie Design System',
          description: 'Audit de composants sur iOS, Android et web. Identification des incoherences, documentation des patterns, construction de la roadmap "Yellowstrap".',
          image: '/images/pagesjaunes/Android wear/screens/cover_yellow strap apps.webp',
        },
      ],
    },
    insights: {
      title: 'Ce que j\'ai appris',
      items: [
        { title: 'Ne pas casser les habitudes', description: '22M d\'utilisateurs ont une memoire musculaire. Les changements radicaux les perdent. Des ameliorations petites et claires marchent mieux.' },
        { title: 'L\'utilitaire exige la vitesse', description: 'Les gens cherchent un plombier quand ils ont une fuite. Chaque milliseconde compte. Surtout en 3G.' },
        { title: 'La coherence, c\'est dur', description: 'iOS, Android, web, Wear : chaque plateforme a ses contraintes. Les patterns partages demandent une negociation constante.' },
        { title: 'La politique ralentit', description: 'Grande boite, beaucoup de stakeholders. Parfois le plus dur n\'est pas le design, c\'est l\'alignement.' },
      ],
    },
    metrics: [
      { value: '22M+', label: 'Telechargements' },
      { value: '300K', label: 'Utilisateurs/jour au pic' },
      { value: '4', label: 'Designers manages' },
    ],
    cta: {
      viewFull: 'Voir le case study complet',
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

const PagesJaunesExecutive: React.FC<PagesJaunesExecutiveProps> = ({
  lang,
  onImageClick,
}) => {
  const t = TRANSLATIONS[lang];
  const testimonials = getTestimonials(lang);
  const testimonial = testimonials.find((x) => x.id === 'frederic-rodriguez')!;

  return (
    <div className="min-h-screen bg-[#FDFDFC]">

      {/* Hero */}
      <section id="hero" className="pt-16 md:pt-24 mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
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

          <CaseStudyViewPills lang={lang} projectId="pagesjaunes" isDark={false} />

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
              onClick={() => onImageClick('/images/pagesjaunes/pagesjaunes homepage.webp')}
              className="rounded-xl overflow-hidden cursor-zoom-in group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
            >
              <img
                loading="lazy"
                src="/images/pagesjaunes/pagesjaunes homepage.webp"
                alt="PagesJaunes Mobile Apps"
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

          <motion.div {...fadeIn}>
            <div className="divide-y divide-gray-100">
              {t.scope.areas.map((area, idx) => (
                <div key={idx} className="py-5 -mx-3 px-3 rounded-lg transition-colors duration-150 hover:bg-black/[.04]">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">{area.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{area.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scope images */}
        <motion.div {...fadeIn} className="mt-10">
          <div className="max-w-[960px] mx-auto px-6">
            <div className="space-y-4">
              {t.scope.areas.map((area, idx) => (
                <div
                  key={idx}
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
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Insights */}
      <section id="insights" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.div {...fadeIn}>
            <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
              {t.insights.title}
            </h2>
          </motion.div>

          <motion.div {...fadeIn}>
            <div className="divide-y divide-gray-100">
              {t.insights.items.map((item, idx) => (
                <div key={idx} className="py-5 -mx-3 px-3 rounded-lg transition-colors duration-150 hover:bg-black/[.04]">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{item.description}</p>
                </div>
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

export default PagesJaunesExecutive;
