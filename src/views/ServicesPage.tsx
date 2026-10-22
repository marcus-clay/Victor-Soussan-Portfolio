/**
 * ServicesPage - Expertise page. Same grammar as the Approach page: a display statement,
 * then four chapters (hairline, number in the gutter, title, one lead sentence) that each
 * hold ONE row of three cards: what you get (the deliverables) and two case studies that
 * show the pillar at work. Then a pointer to the Approach page, client logos and contact.
 */

import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { ActRule, ActTitle } from '@/components/case-study/ActSection'
import CardGrid from '@/components/ui/CardGrid'
import ContentCard from '@/components/ui/ContentCard'
import { getProjects, type Project } from '@/data/projectsData'
import { CASE_STUDY_SHELL } from '@/data/caseStudyShell'
import { imgDims } from '@/utils/imageDimensions'

type Language = 'en' | 'fr'

interface Pillar {
  title: string
  desc: string
  deliverables: string[]
}

interface ServicesPageProps {
  lang: Language
}

const PILLAR_IDS = ['design-prototyping', 'product-strategy', 'design-ops', 'leadership']

/** Two case studies per pillar, in the order they are shown. */
const PILLAR_PROJECTS: string[][] = [
  ['toolkit', 'riskos'],
  ['france-vae', 'connect'],
  ['pagesjaunes', 'dailymotion'],
  ['sqool', 'sqool-classe'],
]

/** Deliverables shown at first; the rest wait behind a "Show all" disclosure (Miller, Hick). */
const VISIBLE_DELIVERABLES = 4

const TRANSLATIONS = {
  en: {
    page_title: "Expertise",
    page_statement: "I work with product teams, startups, and public services to reduce risk through design.",
    page_lead: "Whether you need an end-to-end designer, a strategic partner, or someone to structure your design practice, here is what I bring.",
    deliverables_label: "What you get",
    show_all: (n: number) => `Show all ${n}`,
    pillars: [
      {
        title: "Design & Prototyping",
        desc: "I design interfaces from first wireframe to production-ready screens, then prototype at high fidelity so decisions get made on real artifacts instead of assumptions. When the timeline is tight, I build functional MVPs directly: auth, database, GenAI integration, shipped to Vercel. At Toolkit.ac, this approach took a product from first concepts to 2,000 paying users.",
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
        desc: "A design system is only valuable when the whole team uses it without friction. At UNOWHY, I built a unified system across five product brands that sped up delivery across the five SQOOL applications and made developer handoff predictable. The work was not just components: it was structure, shared language, and the rituals that keep it alive.",
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
        desc: "I have built design teams from the ground up. At UNOWHY, I hired, managed, and mentored five designers over six years: annual reviews, mid-year check-ins, design challenges, and a culture built around critique and shared learning. At PagesJaunes, I introduced the weekly design review that became the team's core ritual.",
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
    approach_text: "Frame the problem, build in short cycles, decide from evidence. The full process is documented on the Approach page.",
    approach_cta: "See my approach",
    trusted_by: "Trusted by leading companies",
    cta_text: "Let's talk about your project",
  },
  fr: {
    page_title: "Expertises",
    page_statement: "J'accompagne les équipes produit, les startups et les services publics pour réduire le risque par le design.",
    page_lead: "Que vous cherchiez un designer end-to-end, un partenaire stratégique ou quelqu'un pour structurer votre pratique design, voici ce que j'apporte.",
    deliverables_label: "Ce que vous obtenez",
    show_all: (n: number) => `Voir les ${n}`,
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
        desc: "Un design system n'a de valeur que lorsque toute l'équipe l'utilise sans friction. Chez UNOWHY, j'ai construit un système unifié sur cinq marques produit qui a accéléré la livraison sur les cinq applications SQOOL et rendu le handoff développeur prévisible. Le travail n'était pas qu'une bibliothèque de composants : c'était une structure, un langage partagé et les rituels qui le font vivre.",
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
    approach_text: "Cadrer le problème, construire en cycles courts, décider par les faits. Le processus complet est documenté sur la page Approche.",
    approach_cta: "Voir mon approche",
    trusted_by: "Ils me font confiance",
    cta_text: "Parlons de votre projet",
  }
}

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
]

// Thumbnails that ship with 400w / 800w / 1200w variants next to the 1920w original.
const RESPONSIVE_THUMBS = new Set([
  '/images/thumbnail-toolkit.webp',
  '/images/thumbnail-dailymotion-web-platform.webp',
  '/images/thumbnail-connect.webp',
  '/images/thumbnail-sqool-suite.webp',
  '/images/thumbnail-pagesjaunes-multidevices.webp',
])

function srcSetFor(src: string): string | undefined {
  if (!RESPONSIVE_THUMBS.has(src)) return undefined
  const base = src.replace(/\.webp$/, '')
  return `${base}-400w.webp 400w, ${base}-800w.webp 800w, ${base}-1200w.webp 1200w, ${src} 1920w`
}

const CARD_PRESS =
  'transition-[border-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:hover:border-gray-200 active:scale-[0.985]'

/**
 * A pillar description opens with its claim and goes on with the proof. The first sentence is
 * the lead; the others follow in body size. Only the layout changes: words and order are kept.
 */
function splitLead(text: string): { claim: string; proof: string } {
  const at = text.search(/(?<=[.!?]) (?=[A-ZÀ-ÖØ-Þ])/)
  if (at === -1) return { claim: text, proof: '' }
  return { claim: text.slice(0, at), proof: text.slice(at + 1) }
}

// ---------------------------------------------------------------------------
// Card 1: what you get
// ---------------------------------------------------------------------------

function DeliverablesCard({
  label,
  items,
  showAll,
}: {
  label: string
  items: string[]
  showAll: string
}) {
  // Collapse only when at least two entries would be hidden: a disclosure for one line is noise
  const visible = items.length - VISIBLE_DELIVERABLES >= 2 ? VISIBLE_DELIVERABLES : items.length
  const shown = items.slice(0, visible)
  const rest = items.slice(visible)

  return (
    <ContentCard label={label}>
      <ul role="list" className="mt-2 divide-y divide-gray-100">
        {shown.map((item) => (
          <li key={item} className="py-3 text-sm text-gray-900 first:pt-1">
            {item}
          </li>
        ))}
      </ul>
      {rest.length > 0 && (
        <details className="group">
          <summary className="mt-3 inline-flex min-h-11 cursor-pointer list-none items-center rounded-full border border-gray-200 px-5 text-sm font-medium text-gray-900 transition-[color,border-color,transform] duration-150 ease-out active:scale-[0.97] group-open:hidden [@media(hover:hover)]:hover:border-gray-300 [@media(hover:hover)]:hover:text-gray-500 [&::-webkit-details-marker]:hidden">
            {showAll}
          </summary>
          <ul role="list" className="divide-y divide-gray-100 border-t border-gray-100">
            {rest.map((item) => (
              <li key={item} className="py-3 text-sm text-gray-900">
                {item}
              </li>
            ))}
          </ul>
        </details>
      )}
    </ContentCard>
  )
}

// ---------------------------------------------------------------------------
// Cards 2 and 3: seen in practice, one case study each
// ---------------------------------------------------------------------------

function CaseCard({ project, lang }: { project: Project; lang: Language }) {
  const shell = CASE_STUDY_SHELL[project.id]
  const srcSet = srcSetFor(shell.visual)
  const cover = shell.fit === 'cover' || shell.fit === 'bleed'

  return (
    <Link
      href={`/${lang}/project/${project.id}`}
      className={`group block min-w-0 flex-1 rounded-2xl border border-gray-100 bg-white p-5 md:p-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900 ${CARD_PRESS}`}
    >
      <div
        className="aspect-[3/2] overflow-hidden rounded-2xl ring-1 ring-inset ring-black/[0.05]"
        style={{ backgroundColor: shell.tone }}
      >
        <img
          src={shell.visual}
          srcSet={srcSet}
          sizes={srcSet ? '(min-width: 1024px) 340px, (min-width: 768px) 60vw, 90vw' : undefined}
          {...imgDims(shell.visual)}
          alt=""
          loading="lazy"
          decoding="async"
          className={`h-full w-full ${cover ? 'object-cover' : 'object-contain p-[5%]'}`}
          style={cover && shell.position ? { objectPosition: shell.position } : undefined}
        />
      </div>

      <p className="mt-4 mb-1.5 text-xs text-gray-500">{project.role}</p>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-title-3 text-gray-900 transition-colors duration-150 [@media(hover:hover)]:group-hover:text-gray-500">
          {project.title}
        </h3>
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="mt-1 shrink-0 text-gray-900 transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:translate-x-0.5"
        />
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-gray-600">{project.summary}</p>
    </Link>
  )
}

// ---------------------------------------------------------------------------
// One pillar: hairline, number in the gutter, title, lead, then one row of three cards
// ---------------------------------------------------------------------------

function PillarChapter({
  id,
  index,
  pillar,
  projects,
  lang,
}: {
  id: string
  index: number
  pillar: Pillar
  projects: Project[]
  lang: Language
}) {
  const t = TRANSLATIONS[lang]
  const { claim, proof } = splitLead(pillar.desc)

  return (
    <section id={id} aria-label={pillar.title} className="scroll-mt-20">
      <ActRule />
      <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-20">
        <div className="md:max-w-[66.666%]">
          <ActTitle index={String(index + 1).padStart(2, '0')} title={pillar.title} />
          <p className="text-lead-lg text-gray-900 max-w-[40ch]">{claim}</p>
          {proof && <p className="mt-4 text-base text-gray-600 max-w-[62ch]">{proof}</p>}
        </div>

        <CardGrid cols={3} label={pillar.title} className="mt-8 md:mt-10">
          <DeliverablesCard
            label={t.deliverables_label}
            items={pillar.deliverables}
            showAll={t.show_all(pillar.deliverables.length)}
          />
          {projects.map((project) => (
            <CaseCard key={project.id} project={project} lang={lang} />
          ))}
        </CardGrid>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ServicesPage({ lang }: ServicesPageProps) {
  const t = TRANSLATIONS[lang]
  const all = getProjects(lang)
  const byId = (id: string) => all.find((p) => p.id === id && CASE_STUDY_SHELL[p.id])

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      {/* Nav reads this before falling back to the long statement in the h1 */}
      <span data-nav-title className="sr-only">{t.page_title}</span>

      {/* The claim */}
      <header className="wrap pt-10 md:pt-16 pb-12 md:pb-16">
        <h1 className="text-display text-gray-900 text-balance">{t.page_statement}</h1>
        <p className="mt-6 md:mt-8 text-lead-lg text-gray-600 max-w-[54ch]">{t.page_lead}</p>
      </header>

      {/* Four pillars, linked by one vertical line in the gutter, behind the hairlines */}
      <div className="relative mx-auto w-full max-w-[var(--wrap-max)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 top-[4.5rem] left-[calc(var(--pad)+2rem)] hidden border-l border-gray-100 md:block"
        />
        {t.pillars.map((pillar, i) => (
          <PillarChapter
            key={PILLAR_IDS[i]}
            id={PILLAR_IDS[i]}
            index={i}
            pillar={pillar}
            projects={PILLAR_PROJECTS[i].map(byId).filter((p): p is Project => Boolean(p))}
            lang={lang}
          />
        ))}
      </div>

      {/* How I work: pointer to the Approach page */}
      <section id="approach" aria-label={t.approach_title} className="scroll-mt-20">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <h2 className="text-title-2 text-gray-900">{t.approach_title}</h2>
          <p className="mt-3 text-base text-gray-600 max-w-[62ch]">{t.approach_text}</p>
          <Link
            href={`/${lang}/approche`}
            className="group mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-gray-900 px-5 text-sm font-medium text-white shadow-sm [@media(hover:hover)]:hover:bg-black [@media(hover:hover)]:hover:shadow-md active:scale-[0.97] transition-[background-color,box-shadow,transform] duration-150 ease-out"
          >
            {t.approach_cta}
            <ArrowRight
              size={14}
              aria-hidden="true"
              className="transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>

      {/* Trusted by */}
      <section id="clients" aria-label={t.trusted_by} className="scroll-mt-20">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <h2 className="text-title-2 text-gray-900 mb-8 md:mb-10">{t.trusted_by}</h2>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-16 z-20 pointer-events-none bg-gradient-to-r from-[#FDFDFC] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-20 pointer-events-none bg-gradient-to-l from-[#FDFDFC] to-transparent" />

            <div className="logo-carousel-track flex [@media(hover:hover)]:hover:[animation-play-state:paused]">
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
                        className="h-[50px] sm:h-[60px] md:h-[70px] w-auto grayscale opacity-50 [@media(hover:hover)]:hover:grayscale-0 [@media(hover:hover)]:hover:opacity-75"
                        style={{ transition: 'filter 250ms ease, opacity 250ms ease' }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section aria-label="Contact">
        <ActRule />
        <div className="act-wide pt-10 md:pt-12 pb-14 md:pb-16">
          <Link
            href={`/${lang}/contact`}
            className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-gray-900 px-5 text-sm font-medium text-white shadow-sm [@media(hover:hover)]:hover:bg-black [@media(hover:hover)]:hover:shadow-md active:scale-[0.97] transition-[background-color,box-shadow,transform] duration-150 ease-out"
          >
            {t.cta_text}
            <ArrowRight
              size={14}
              weight="bold"
              aria-hidden="true"
              className="transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </div>
  )
}
