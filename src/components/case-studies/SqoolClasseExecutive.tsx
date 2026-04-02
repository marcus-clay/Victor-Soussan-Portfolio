/**
 * SqoolClasseExecutive - Minimalist "En bref" / "At a glance" for SQOOL Classe
 */

import React from 'react';
import { motion } from 'framer-motion';
import CaseStudyViewPills from '../CaseStudyViewPills';
import CaseStudyTestimonialBlock from './CaseStudyTestimonialBlock';
import { getTestimonials } from '@/data/testimonialsData';

interface SqoolClasseExecutiveProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  onImageClick: (src: string) => void;
  onViewFull: () => void;
  onContact?: () => void;
}

const TRANSLATIONS = {
  en: {
    hero: {
      eyebrow: 'Lead Interaction Designer \u00b7 2022',
      title: 'Giving teachers the composure to teach in a digital classroom',
      subtitle: 'SQOOL Classe: a supervision tool designed to fade behind the pedagogy. The teachers we interviewed described the same reality: the tablet added a layer of complexity that was difficult to absorb.',
      image: '/images/thumbnail_sqool_classe.webp',
    },
    role: {
      title: 'Role',
      items: [
        { label: 'Design Lead', detail: 'Product squad, 2 years' },
        { label: 'Field research', detail: 'Classroom observation' },
        { label: '42 prototypes', detail: 'GSAP animations' },
        { label: 'Design system', detail: 'SQOOL suite' },
        { label: '5 designers', detail: 'Team coordination' },
      ],
      context: 'Two years working alongside the CPO, 5 designers, product managers, and developers. From ideation workshops to delivery, through strategic framing and intensive prototyping of 42 usage scenarios.',
    },
    modules: {
      title: 'Product modules',
      phases: [
        {
          title: 'Supervision',
          period: 'Months 1-8',
          deliverables: [
            'Student grid with live status indicators',
            'Real-time screen previews',
            'One-tap lock for all tablets',
            'QR code class opening (30 seconds)',
            'Grid and carousel display modes',
          ],
        },
        {
          title: 'Collaboration',
          period: 'Months 9-16',
          deliverables: [
            'Document and link distribution',
            'Teacher-student messaging',
            'Live polling and shared timer',
            'Screen projection and live annotation',
            'Drag-and-drop group creation',
          ],
        },
        {
          title: 'Assessment',
          period: 'Months 17-24',
          deliverables: [
            'Assignment mode with configurable restrictions',
            'Official exam setup (MDM configuration)',
            '32-station parallel monitoring',
            'Copy collection and academic transmission',
            'URL filtering and content restriction',
          ],
        },
      ],
    },
    scope: {
      title: 'What we designed',
      intro: 'Six key interfaces covering the full teacher and student experience.',
      areas: [
        {
          title: 'Teacher grid view',
          description: 'Each student occupies a tile with name, active application, battery, and connection status. 32 students displayed simultaneously, readable at a glance.',
          image: '/images/sqool/sqool classe/UI - enseignant_vue_en_classe_grille_1_5x.webp',
        },
        {
          title: 'Screen sharing',
          description: 'The teacher selects a full screen or a specific window. An indicator confirms that sharing is active and received.',
          image: '/images/sqool/sqool classe/UI - enseignant_partager_son_cran_aux_l_ves_1_5x.webp',
        },
        {
          title: 'Document distribution',
          description: 'Documents arrive from local storage or Google Drive directly onto tablets. A timestamped notification confirms receipt.',
          image: '/images/sqool/sqool classe/UI - enseignant_envoyer_un_document_depuis_drive_1_5x.webp',
        },
        {
          title: 'Student experience',
          description: 'Two views coexist: class view (classmates, resources, messages) and group view (dedicated space with specific resources and instructions).',
          image: '/images/sqool/sqool classe/UI - enseignant_vue_groupe_classe_vue_groupe_individuel_1_5x.webp',
        },
        {
          title: 'Student interactions',
          description: 'Six ways to communicate with the teacher without disrupting the class: question, comprehension signal, assignment submission.',
          image: '/images/sqool/sqool classe/UI - eleve_interactions_vers_le_prof_1_5x.webp',
        },
        {
          title: 'Classrooms',
          description: 'The student home screen shows all active classes. One tap to join. No login, no configuration.',
          image: '/images/sqool/sqool classe/UI - eleve_vue_mes_salles_de_classe_1_5x.webp',
        },
      ],
    },
    highlights: {
      title: 'Interactive prototypes',
      subtitle: '42 animated scenarios',
      items: [
        {
          title: 'QR code class opening',
          description: 'Full-screen QR code, instant scan, student cards appearing progressively.',
          media: '/images/sqool/sqool classe/Visuel - Comm - Pilotage - En Classe - code big@2x.png',
        },
        {
          title: 'Link sharing to the whole class',
          description: 'The teacher types a URL, every student browser opens the same page at the same time.',
          media: '/images/sqool/sqool classe/Visuel - Comm - En Classe - Partager un lien - Toute la classe V0@2x.png',
        },
        {
          title: 'Screen sharing in progress',
          description: 'The teacher sees their screen and their students simultaneously during sharing.',
          media: '/images/sqool/sqool classe/UI - enseignant_partage_d_cran_en_cours_1_5x.webp',
        },
        {
          title: 'Classroom observation, Jean Vilar middle school',
          description: 'Before drawing anything, we sit in the classroom.',
          media: '/images/sqool/sqool classe/prototypes - observation - user testing - classe PXL_20231010_084158712.jpg',
        },
      ],
    },
    outcome: {
      title: 'Impact',
      metrics: [
        { value: '465', label: 'Equipped schools, \u00cele-de-France' },
        { value: '42', label: 'Interactive prototypes documented' },
        { value: '30s', label: 'To connect the class via QR code' },
      ],
    },
    testimonial: {
      quote: 'I had the chance to collaborate with Victor for 3 years as a duo and he is one of the most inspiring designers I have worked with. Victor combines overflowing creativity with an impressive work ethic.',
      author: 'Charlotte Rifflet',
      role: 'CPO, UNOWHY',
    },
  },
  fr: {
    hero: {
      eyebrow: 'Lead Interaction Designer \u00b7 2022',
      title: 'Donner aux enseignants la s\u00e9r\u00e9nit\u00e9 de faire cours dans une classe num\u00e9rique',
      subtitle: 'SQOOL Classe : l\u2019application de supervision con\u00e7ue pour s\u2019effacer derri\u00e8re la p\u00e9dagogie. Les enseignants que nous avons rencontr\u00e9s d\u00e9crivaient la m\u00eame r\u00e9alit\u00e9 : la tablette ajoutait une couche de complexit\u00e9 difficile \u00e0 absorber.',
      image: '/images/thumbnail_sqool_classe.webp',
    },
    role: {
      title: 'R\u00f4le',
      items: [
        { label: 'Design Lead', detail: 'Squad produit, 2 ans' },
        { label: 'Recherche terrain', detail: 'Observation en classe' },
        { label: '42 prototypes', detail: 'Animations GSAP' },
        { label: 'Design system', detail: 'Suite SQOOL' },
        { label: '5 designers', detail: 'Coordination \u00e9quipe' },
      ],
      context: 'Deux ans de travail avec la CPO, 5 designers, product managers et d\u00e9veloppeurs. Des ateliers d\u2019id\u00e9ation \u00e0 la livraison, en passant par le cadrage strat\u00e9gique et le prototypage intensif de 42 sc\u00e9narios d\u2019usage.',
    },
    modules: {
      title: 'Modules produit',
      phases: [
        {
          title: 'Supervision',
          period: 'Mois 1-8',
          deliverables: [
            'Grille \u00e9l\u00e8ves avec statuts temps r\u00e9el',
            'Aper\u00e7u des \u00e9crans en direct',
            'Verrouillage de toutes les tablettes en un tap',
            'Ouverture de classe par QR code (30 secondes)',
            'Mode d\u2019affichage grille et carrousel',
          ],
        },
        {
          title: 'Collaboration',
          period: 'Mois 9-16',
          deliverables: [
            'Distribution de documents et liens',
            'Messagerie enseignant-\u00e9l\u00e8ves',
            'Sondage en direct et minuteur partag\u00e9',
            'Projection d\u2019\u00e9cran et annotation en direct',
            'Cr\u00e9ation de groupes par glisser-d\u00e9poser',
          ],
        },
        {
          title: '\u00c9valuation',
          period: 'Mois 17-24',
          deliverables: [
            'Mode devoir avec restrictions configurables',
            'Examen officiel (configuration MDM)',
            'Surveillance de 32 postes en parall\u00e8le',
            'Collecte des copies et transmission acad\u00e9mie',
            'Filtrage d\u2019URL et restriction de contenu',
          ],
        },
      ],
    },
    scope: {
      title: 'Ce que nous avons con\u00e7u',
      intro: 'Six interfaces cl\u00e9s couvrant l\u2019exp\u00e9rience compl\u00e8te enseignant et \u00e9l\u00e8ve.',
      areas: [
        {
          title: 'Vue grille enseignant',
          description: 'Chaque \u00e9l\u00e8ve occupe une tuile avec nom, application active, batterie et \u00e9tat de connexion. 32 \u00e9l\u00e8ves affich\u00e9s simultan\u00e9ment, lisibles d\u2019un coup d\u2019\u0153il.',
          image: '/images/sqool/sqool classe/UI - enseignant_vue_en_classe_grille_1_5x.webp',
        },
        {
          title: 'Partage d\u2019\u00e9cran',
          description: 'L\u2019enseignant s\u00e9lectionne un \u00e9cran complet ou une fen\u00eatre sp\u00e9cifique. Un indicateur confirme que le partage est actif et re\u00e7u.',
          image: '/images/sqool/sqool classe/UI - enseignant_partager_son_cran_aux_l_ves_1_5x.webp',
        },
        {
          title: 'Distribution de documents',
          description: 'Les documents arrivent depuis le stockage local ou Google Drive directement sur les tablettes. Une notification horodat\u00e9e confirme la r\u00e9ception.',
          image: '/images/sqool/sqool classe/UI - enseignant_envoyer_un_document_depuis_drive_1_5x.webp',
        },
        {
          title: 'Exp\u00e9rience \u00e9l\u00e8ve',
          description: 'Deux vues coexistent : vue classe (camarades, ressources, messages) et vue groupe (espace d\u00e9di\u00e9 avec ressources et consignes sp\u00e9cifiques).',
          image: '/images/sqool/sqool classe/UI - enseignant_vue_groupe_classe_vue_groupe_individuel_1_5x.webp',
        },
        {
          title: 'Interactions \u00e9l\u00e8ve',
          description: 'Six fa\u00e7ons de communiquer avec l\u2019enseignant sans d\u00e9ranger la classe : question, signal de compr\u00e9hension, rendu de devoir.',
          image: '/images/sqool/sqool classe/UI - eleve_interactions_vers_le_prof_1_5x.webp',
        },
        {
          title: 'Salles de classe',
          description: 'L\u2019\u00e9cran d\u2019accueil \u00e9l\u00e8ve pr\u00e9sente toutes les classes actives. Un tap pour rejoindre. Pas de login, pas de configuration.',
          image: '/images/sqool/sqool classe/UI - eleve_vue_mes_salles_de_classe_1_5x.webp',
        },
      ],
    },
    highlights: {
      title: 'Prototypes interactifs',
      subtitle: '42 sc\u00e9narios anim\u00e9s',
      items: [
        {
          title: 'Ouverture de classe par QR code',
          description: 'QR code plein \u00e9cran, scan instantan\u00e9, cartes \u00e9l\u00e8ves qui apparaissent progressivement.',
          media: '/images/sqool/sqool classe/Visuel - Comm - Pilotage - En Classe - code big@2x.png',
        },
        {
          title: 'Partage de lien vers toute la classe',
          description: 'L\u2019enseignant tape une URL, chaque navigateur \u00e9l\u00e8ve ouvre la m\u00eame page au m\u00eame moment.',
          media: '/images/sqool/sqool classe/Visuel - Comm - En Classe - Partager un lien - Toute la classe V0@2x.png',
        },
        {
          title: '\u00c9cran de partage en cours',
          description: 'L\u2019enseignant voit son \u00e9cran et ses \u00e9l\u00e8ves simultan\u00e9ment pendant le partage.',
          media: '/images/sqool/sqool classe/UI - enseignant_partage_d_cran_en_cours_1_5x.webp',
        },
        {
          title: 'Observation en classe, Coll\u00e8ge Jean Vilar',
          description: 'Avant de dessiner quoi que ce soit, on s\u2019installe dans la salle de classe.',
          media: '/images/sqool/sqool classe/prototypes - observation - user testing - classe PXL_20231010_084158712.jpg',
        },
      ],
    },
    outcome: {
      title: 'Impact',
      metrics: [
        { value: '465', label: '\u00c9tablissements \u00e9quip\u00e9s, \u00cele-de-France' },
        { value: '42', label: 'Prototypes interactifs document\u00e9s' },
        { value: '30s', label: 'Pour connecter la classe via QR code' },
      ],
    },
    testimonial: {
      quote: 'J\u2019ai eu la chance de collaborer avec Victor pendant 3 ans en bin\u00f4me et c\u2019est l\u2019un des designers les plus inspirants avec qui j\u2019ai travaill\u00e9. Victor allie une cr\u00e9ativit\u00e9 d\u00e9bordante \u00e0 une rigueur de travail impressionnante.',
      author: 'Charlotte Rifflet',
      role: 'CPO, UNOWHY',
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

const SqoolClasseExecutive: React.FC<SqoolClasseExecutiveProps> = ({
  lang,
  onImageClick,
}) => {
  const t = TRANSLATIONS[lang];
  const testimonials = getTestimonials(lang);
  const testimonial = testimonials.find((x) => x.id === 'justine-le-tellier')!;

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
            <CaseStudyViewPills lang={lang} projectId="sqool-classe" isDark={false} showGallery={false} />
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
              alt="SQOOL Classe"
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
          <motion.p
            {...fadeIn}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="mt-8 text-base text-gray-500 leading-relaxed max-w-[65ch]"
          >
            {t.role.context}
          </motion.p>
        </div>
      </section>

      {/* PRODUCT MODULES */}
      <section id="modules" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.h2 {...fadeIn} className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-8">
            {t.modules.title}
          </motion.h2>
          <div className="space-y-10">
            {t.modules.phases.map((phase, idx) => (
              <motion.div
                key={idx}
                {...fadeIn}
                transition={{ duration: 0.4, delay: 0.05 + idx * 0.06, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-sm font-medium text-gray-900">{phase.title}</span>
                  <span className="text-xs text-gray-400">{phase.period}</span>
                </div>
                <ul className="divide-y divide-gray-100">
                  {phase.deliverables.map((d, i) => (
                    <li key={i} className="py-2 text-sm text-gray-500">{d}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
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
                className="rounded-xl overflow-hidden cursor-zoom-in group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
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

      {/* HIGHLIGHTS / PROTOTYPES */}
      <section id="highlights" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.div {...fadeIn}>
            <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-1">
              {t.highlights.title}
            </h2>
            <p className="text-xs text-gray-400 mb-4">{t.highlights.subtitle}</p>
          </motion.div>
        </div>
        {t.highlights.items.map((item, idx) => (
          <React.Fragment key={idx}>
            <motion.div {...fadeIn} className="max-w-[740px] mx-auto px-6 mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">{item.title}</h3>
              <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{item.description}</p>
            </motion.div>
            <motion.div {...fadeIn} className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
              <div
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
              <p className="mt-3 text-xs font-medium text-gray-400">{item.title}</p>
            </motion.div>
          </React.Fragment>
        ))}
      </section>

      {/* IMPACT */}
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

export default SqoolClasseExecutive;
