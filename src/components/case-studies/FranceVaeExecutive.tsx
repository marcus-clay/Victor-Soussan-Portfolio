/**
 * FranceVaeExecutive - Minimalist executive summary
 *
 * Structure: Hero → Hero image (with caption) → Role/Context →
 *            Scope (interleaved text + image per initiative) → Metrics → Testimonial → CTA
 */

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import CaseStudyViewPills from '../CaseStudyViewPills';
import CaseStudyTestimonialBlock from './CaseStudyTestimonialBlock';
import { getTestimonials } from '@/data/testimonialsData';

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

interface FranceVaeExecutiveProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  onImageClick: (src: string) => void;
  onViewFull: () => void;
  onContact?: () => void;
}

const TRANSLATIONS = {
  en: {
    hero: {
      eyebrow: 'Lead Product Designer, beta.gouv.fr, Dec 2024 – Jul 2025',
      title: 'Shipping fast in a complex environment',
      subtitle: '6-month mission structuring product operations for France\'s national VAE platform serving 100K+ citizens.',
    },
    heroCaption: 'France VAE homepage redesign',
    heroDescription: 'Redesigned the homepage and search engine as part of a broader UI delivery sprint. The redesign clarified candidate orientation and reduced drop-off at the first step of the VAE journey.',
    role: {
      title: 'Role',
      items: [
        { label: 'Lead Product Designer', detail: '6-month mission' },
        { label: 'Season workflow', detail: '1-month cycles' },
        { label: 'Prioritization matrix', detail: 'Co-designed with PM' },
        { label: 'User research', detail: '10 interviews + workshops' },
        { label: 'Design ops', detail: 'Figma + delivery' },
      ],
      context: 'France VAE is the national public service for Validation of Acquired Experience. I joined to lead the design team process, co-drive the roadmap with the Lead PM, and structure discovery to help the delivery team ship faster, especially on politically-driven initiatives lacking clear specs.',
    },
    scope: {
      title: 'Scope of work',
      areas: [
        {
          title: 'Product Workflow Redesign',
          description: 'Co-designed a new org model based on 1-month delivery seasons with a cross-team prioritization matrix. Gave the team a shared language to negotiate scope, timelines, and politically-driven requests.',
          image: '/images/francevae/presentation process_discovery @2x.webp',
          caption: 'Season-based process model',
        },
        {
          title: 'MVP VAE Collective',
          description: 'Full employer journey for collective certification programs, from cohort creation to candidate tracking. First dedicated tool for HR teams that previously juggled emails and spreadsheets.',
          image: '/images/francevae/prototype vae collective .webp',
          caption: 'Employer journey, MVP prototype',
        },
        {
          title: 'User Research',
          description: '10 interviews across 2 research waves on the new candidate dashboard. Surfaced orientation funnel friction points that informed three key design decisions upstream of delivery.',
          image: '/images/francevae/UXR - interface tableau de bord candidat.webp',
          caption: 'Candidate dashboard research interface',
        },
        {
          title: 'Design Thinking Workshops',
          description: '2-day workshop with AAP advisors and training center directors. From problem framing to solution sketching, with direct input into the product roadmap.',
          image: '/images/francevae/photo atelier aap 02.webp',
          caption: 'Field workshop with AAP practitioners',
        },
        {
          title: 'Design Ops',
          description: 'Rebuilt the Figma workspace around user journeys instead of features. Introduced lot-based prototyping to reduce handoff latency and clarify scope per sprint.',
          image: '/images/francevae/Design ops/workspace UX 02.webp',
          caption: 'Figma workspace, organized by user journey',
        },
        {
          title: 'AI Experimentation',
          description: 'Built 2 functional prototypes: a positioning chatbot and a skills radar for career guidance. Tested candidate validation on early-stage concepts before committing to roadmap.',
          image: '/images/francevae/proto IA - orientation professionnelle assistee par IA.webp',
          caption: 'AI-assisted career orientation prototype',
        },
      ],
    },
    metrics: [
      { value: '10', label: 'User interviews' },
      { value: '14', label: 'Mockups delivered' },
      { value: '1', label: 'Complete MVP' },
    ],
    testimonial: {
      quote: 'Victor brought structure and clarity to our design operations at a critical scaling phase. His ability to balance strategic thinking with hands-on delivery made a real difference for our team.',
      author: 'Boris Aime-Bauderlique',
      role: 'Product Lead, France VAE',
    },
    cta: {
      viewFull: 'View full case study',
      contact: 'Get in touch',
    },
  },
  fr: {
    hero: {
      eyebrow: 'Lead Product Designer, beta.gouv.fr, Déc 2024 – Juil 2025',
      title: 'Livrer vite dans un environnement complexe',
      subtitle: 'Mission de 6 mois pour structurer les opérations produit de la plateforme nationale VAE servant plus de 100 000 citoyens.',
    },
    heroCaption: 'Refonte de la page d\'accueil France VAE',
    heroDescription: 'Refonte de la page d\'accueil et du moteur de recherche dans le cadre d\'un sprint de livraison UI plus large. La refonte a clarifié l\'orientation des candidats et réduit le taux d\'abandon à la première étape du parcours VAE.',
    role: {
      title: 'Rôle',
      items: [
        { label: 'Lead Product Designer', detail: 'Mission 6 mois' },
        { label: 'Workflow saisons', detail: 'Cycles d\'1 mois' },
        { label: 'Matrice de priorisation', detail: 'Co-conçue avec PM' },
        { label: 'Recherche utilisateur', detail: '10 entretiens + ateliers' },
        { label: 'Design ops', detail: 'Figma + delivery' },
      ],
      context: 'France VAE est le service public national de Validation des Acquis de l\'Expérience. J\'ai rejoint l\'équipe pour encadrer le processus design, co-piloter la roadmap avec la Lead PM, et structurer la découverte pour permettre à l\'équipe de réalisation de livrer plus vite, notamment sur des commandes politiques floues manquant de specs claires.',
    },
    scope: {
      title: 'Périmètre',
      areas: [
        {
          title: 'Refonte du workflow produit',
          description: 'Co-conception d\'un modèle organisationnel basé sur des saisons de livraison d\'un mois, avec une matrice de priorisation inter-équipes. A fourni un langage commun pour négocier le périmètre, les délais et les commandes politiques.',
          image: '/images/francevae/presentation process_discovery @2x.webp',
          caption: 'Modèle de processus par saisons',
        },
        {
          title: 'MVP VAE Collective',
          description: 'Parcours employeur complet pour les programmes de certification collective, de la création de cohorte au suivi des candidats. Premier outil dédié pour les équipes RH qui jonglaient jusque-là entre e-mails et tableurs.',
          image: '/images/francevae/prototype vae collective .webp',
          caption: 'Parcours employeur, prototype MVP',
        },
        {
          title: 'Recherche utilisateur',
          description: '10 entretiens sur 2 vagues de recherche sur le nouveau tableau de bord candidat. A mis en lumière les points de friction dans le tunnel d\'orientation et informé trois décisions de design en amont de la réalisation.',
          image: '/images/francevae/UXR - interface tableau de bord candidat.webp',
          caption: 'Interface de recherche, tableau de bord candidat',
        },
        {
          title: 'Ateliers Design Thinking',
          description: 'Atelier de 2 jours avec des conseillers AAP et des directeurs de centres de formation. Du cadrage du problème au croquis de solutions, avec une contribution directe à la roadmap produit.',
          image: '/images/francevae/photo atelier aap 02.webp',
          caption: 'Atelier terrain avec les praticiens AAP',
        },
        {
          title: 'Design Ops',
          description: 'Reconstruction de l\'espace de travail Figma organisé par parcours utilisateur plutôt que par fonctionnalité. Introduction du prototypage par lots pour réduire la latence de handoff et clarifier le périmètre par sprint.',
          image: '/images/francevae/Design ops/workspace UX 02.webp',
          caption: 'Espace de travail Figma, par parcours utilisateur',
        },
        {
          title: 'Expérimentation IA',
          description: 'Construction de 2 prototypes fonctionnels : chatbot de positionnement et radar de compétences pour l\'orientation professionnelle. Validation précoce de concepts candidats avant intégration à la roadmap.',
          image: '/images/francevae/proto IA - orientation professionnelle assistee par IA.webp',
          caption: 'Prototype d\'orientation professionnelle assistée par IA',
        },
      ],
    },
    metrics: [
      { value: '10', label: 'Entretiens utilisateurs' },
      { value: '14', label: 'Maquettes livrées' },
      { value: '1', label: 'MVP complet' },
    ],
    testimonial: {
      quote: 'Victor a apporté structure et clarté à nos opérations design dans une phase critique de croissance. Sa capacité à équilibrer réflexion stratégique et livraison concrète a fait une vraie différence pour notre équipe.',
      author: 'Boris Aime-Bauderlique',
      role: 'Product Lead, France VAE',
    },
    cta: {
      viewFull: 'Voir le case study complet',
      contact: 'Me contacter',
    },
  },
};

// Hardware-accelerated fade-in (transform string, not Framer Motion shorthand y which runs on main thread)
const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, transform: 'translateY(12px)' }}
      animate={
        isInView
          ? { opacity: 1, transform: 'translateY(0px)' }
          : { opacity: 0, transform: 'translateY(12px)' }
      }
      transition={{ duration: 0.35, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Image card with caption — mirrors RiskOS VideoCard pattern (caption + optional description below)
const ImageCard: React.FC<{
  src: string;
  alt: string;
  caption: string;
  description?: string;
  delay?: number;
  aspectRatio?: string;
  onImageClick: (src: string) => void;
}> = ({ src, alt, caption, description, delay = 0, aspectRatio, onImageClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, transform: 'translateY(12px)' }}
      animate={
        isInView
          ? { opacity: 1, transform: 'translateY(0px)' }
          : { opacity: 0, transform: 'translateY(12px)' }
      }
      transition={{ duration: 0.35, delay, ease: EASE_OUT }}
    >
      <div
        onClick={() => onImageClick(src)}
        className={`cursor-zoom-in group rounded-2xl overflow-hidden ring-1 ring-black/[0.06]
          transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
          hover:ring-black/[0.10] active:scale-[0.99] ${aspectRatio || ''}`}
      >
        <img
          loading="lazy"
          src={src}
          alt={alt}
          className={`w-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02] ${aspectRatio ? 'h-full object-cover object-top' : 'h-auto'}`}
        />
      </div>
      <div className="mt-3 max-w-[740px] mx-auto px-6">
        <p className="text-xs font-medium text-gray-400 mb-1">{caption}</p>
        {description && (
          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        )}
      </div>
    </motion.div>
  );
};

const FranceVaeExecutive: React.FC<FranceVaeExecutiveProps> = ({
  lang,
  onImageClick,
  onViewFull,
  onContact,
}) => {
  const t = TRANSLATIONS[lang];
  const testimonials = getTestimonials(lang);
  const testimonial = testimonials.find((x) => x.id === 'boris-aime')!;

  return (
    <div className="min-h-screen bg-[#FDFDFC]">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section id="hero" className="pt-16 md:pt-24 pb-10">
        <div className="max-w-[740px] mx-auto px-6">
          <FadeIn>
            <img
              loading="lazy"
              src="/images/francevae/logo fvae.webp"
              alt="France VAE"
              className="h-8 w-auto mb-6"
            />
          </FadeIn>

          <FadeIn delay={0.03}>
            <p className="text-xs text-gray-400 mb-4">{t.hero.eyebrow}</p>
          </FadeIn>

          <FadeIn delay={0.06}>
            <h1 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-3">
              {t.hero.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.09}>
            <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
              {t.hero.subtitle}
            </p>
          </FadeIn>

          <CaseStudyViewPills lang={lang} projectId="france-vae" isDark={false} />

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
      </section>

      {/* ── Hero image ────────────────────────────────────────────────── */}
      <section id="initiatives" className="mb-24 md:mb-32">
        <div className="max-w-[960px] mx-auto px-6">
          <ImageCard
            src="/images/francevae/france_vae_home.webp"
            alt="France VAE homepage redesign"
            caption={t.heroCaption}
            description={t.heroDescription}
            delay={0.12}
            aspectRatio="aspect-[3/2]"
            onImageClick={onImageClick}
          />
        </div>
      </section>

      {/* ── Role / Context ────────────────────────────────────────────── */}
      <section id="role" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <FadeIn>
            <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
              {t.role.title}
            </h2>
          </FadeIn>

          <FadeIn delay={0.04}>
            <div className="divide-y divide-gray-100">
              {t.role.items.map((item, idx) => (
                <div key={idx} className="flex items-baseline justify-between py-3">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className="text-xs text-gray-400">{item.detail}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <p className="mt-8 text-base text-gray-500 leading-relaxed max-w-[65ch]">
              {t.role.context}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Scope of work — interleaved text + image ──────────────────── */}
      <section id="scope" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6 mb-10">
          <FadeIn>
            <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900">
              {t.scope.title}
            </h2>
          </FadeIn>
        </div>

        <div className="space-y-20 md:space-y-28">
          {t.scope.areas.map((area, idx) => (
            <div key={idx}>
              <div className="max-w-[740px] mx-auto px-6 mb-6">
                <FadeIn delay={0.02}>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    {area.title}
                  </h3>
                  <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                    {area.description}
                  </p>
                </FadeIn>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                <ImageCard
                  src={area.image}
                  alt={area.title}
                  caption={area.caption}
                  delay={idx * 0.02}
                  onImageClick={onImageClick}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Metrics ───────────────────────────────────────────────────── */}
      <section id="outcome" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <FadeIn>
            <div className="flex items-baseline gap-12 md:gap-16">
              {t.metrics.map((metric, idx) => (
                <div key={idx}>
                  <span className="text-2xl font-semibold text-gray-900">
                    {metric.value}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">{metric.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <FadeIn>
            <div className="flex items-center gap-6">
              <button
                onClick={onViewFull}
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150"
              >
                {t.cta.viewFull}
                <ArrowRight size={14} />
              </button>
              <button
                onClick={onContact}
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150"
              >
                {t.cta.contact}
                <ArrowRight size={14} />
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
};

export default FranceVaeExecutive;
