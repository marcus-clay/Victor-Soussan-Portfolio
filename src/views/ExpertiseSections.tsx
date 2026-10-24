/**
 * Domains of work and client logos of the Approach page (the former Expertise page, merged in).
 * Each domain keeps its claim (first sentence of the description) and its proof (the rest), plus
 * the case studies that show it. Domain ids stay the anchors of the old /services links.
 */

import { ActHeader } from '@/components/case-study/ActSection'
import { getProjects } from '@/data/projectsData'

type Language = 'en' | 'fr'

interface Pillar {
  title: string
  desc: string
  deliverables: string[]
}

const PILLAR_IDS = ['design-prototyping', 'product-strategy', 'design-ops', 'leadership']

/** Two case studies per domain, in the order they are shown. */
const PILLAR_PROJECTS: string[][] = [
  ['toolkit', 'riskos'],
  ['france-vae', 'connect'],
  ['pagesjaunes', 'dailymotion'],
  ['sqool', 'sqool-classe'],
]

const TRANSLATIONS = {
  en: {
    domains_title: "What I can take on",
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
        desc: "I take charge of the product design practice: the team, research, where design sits in the delivery cycle, the design system. At UNOWHY I hired, managed and mentored five designers over six years, and I now carry that responsibility at a European professional information publisher.",
        deliverables: [
          "Team: hiring, workload and allocation of topics, budgets, reviews, pair handovers (one lead, one support)",
          "User research set up with the customer community: framed studies, interview guides, a guide for teams who have never run a study",
          "Design in the delivery cycle: quarterly planning, definitions of ready and done, UX quality acceptance",
          "Platform coherence: a design system plan in batches, audit of specifications, accessibility rules",
          "Working memory: a decision log with the reasons, workload tracking that does not duplicate the team’s tools"
        ]
      }
    ] as Pillar[],
    trusted_by: "Trusted by leading companies",
  },
  fr: {
    domains_title: "Ce que je peux prendre en charge",
    pillars: [
      {
        title: "Design et prototypage",
        desc: "Je conçois les interfaces, du premier wireframe jusqu’à l’écran prêt à développer, puis je les prototype en haute fidélité : les décisions se prennent sur du concret plutôt que sur des suppositions. Quand le calendrier est serré, je construis directement des MVP fonctionnels (authentification, base de données, IA générative), déployés sur Vercel. Chez Toolkit.ac, cette méthode a mené un produit du concept à 2 000 utilisateurs payants.",
        deliverables: [
          "Cadrage UX, design UI, micro-interactions et motion",
          "Prototypage haute fidélité pour valider les idées et aligner les parties prenantes avant que l’ingénierie ne s’engage",
          "Prototypage assisté par l’IA : de Figma à un prototype déployé, avec Claude Code et Figma MCP",
          "MVP fonctionnel : authentification, base de données, IA générative, déployé sur Vercel",
          "Design mobile natif (iOS, Android) et web adaptatif",
          "Produits complexes : SaaS B2B, EdTech, logiciels métier, services publics"
        ]
      },
      {
        title: "Stratégie produit",
        desc: "Avant le premier écran, j’aide les équipes à s’accorder sur ce qu’elles construisent et pourquoi. J’anime des ateliers pour faire émerger les hypothèses, délimiter le périmètre et rassembler les parties prenantes autour d’une même direction. Pour France VAE (beta.gouv), dix entretiens utilisateurs et deux jours d’atelier de design thinking ont redéfini le périmètre de tout le MVP avant la moindre maquette.",
        deliverables: [
          "Cadrage du périmètre, du 0 au 1, et contribution à la feuille de route",
          "Vision produit clarifiée à partir des parcours clés",
          "Ateliers de vision et d’idéation avec utilisateurs et parties prenantes",
          "Recherche utilisateur : entretiens, observations, synthèse en enseignements exploitables",
          "Stratégie d’accessibilité et standards d’UX inclusive"
        ]
      },
      {
        title: "Design Ops",
        desc: "Un design system ne vaut que si toute l’équipe l’utilise sans friction. Chez UNOWHY, j’ai construit un système commun à cinq marques, qui a accéléré la livraison des cinq applications SQOOL et rendu la passation aux développeurs prévisible. Le travail ne se limitait pas à une bibliothèque de composants : il fallait une structure, un langage commun et les rituels qui les font vivre.",
        deliverables: [
          "Design systems partagés entre plusieurs marques et produits",
          "Bibliothèques de composants réutilisables, avec tokens Figma et documentation",
          "Passation aux développeurs structurée : spécifications d’interaction, ressources, normes d’annotation",
          "Rituels design et ingénierie : revues hebdomadaires, standards partagés, points d’alignement",
          "Espace Figma organisé : modèles, bibliothèques, guides d’accueil"
        ]
      },
      {
        title: "Leadership et organisation",
        desc: "Je prends en charge la pratique de product design : l’équipe, la recherche, la place du design dans le cycle de livraison, le design system. Chez UNOWHY, j’ai recruté, managé et fait grandir cinq designers pendant six ans, et j’exerce aujourd’hui cette responsabilité dans un éditeur européen d’information professionnelle.",
        deliverables: [
          "Équipe : recrutement, charge et répartition des sujets, budgets, évaluation, passations en binôme (un lead, un appui)",
          "Recherche utilisateur montée avec la communauté de clients : études cadrées, guides d’entretien, guide pour les équipes qui n’ont jamais mené d’étude",
          "Place du design dans la livraison : planification trimestrielle, critères de « prêt » et de « terminé », recette de qualité UX",
          "Cohérence de plateforme : plan de design system par lots, audit des spécifications, règles d’accessibilité",
          "Mémoire de travail : registre de décisions avec leur raison, suivi de la charge sans doubler les outils de l’équipe"
        ]
      }
    ] as Pillar[],
    trusted_by: "Ils me font confiance",
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

/**
 * A description opens with its claim and goes on with the proof. Only the layout changes: words and
 * order are kept.
 */
function splitLead(text: string): { claim: string; proof: string } {
  const at = text.search(/(?<=[.!?]) (?=[A-ZÀ-ÖØ-Þ])/)
  if (at === -1) return { claim: text, proof: '' }
  return { claim: text.slice(0, at), proof: text.slice(at + 1) }
}

export interface Domain {
  id: string
  title: string
  claim: string
  proof: string
  deliverables: string[]
  projects: { id: string; title: string }[]
}

export function getDomainsCopy(lang: Language) {
  return { title: TRANSLATIONS[lang].domains_title }
}

export function getDomains(lang: Language): Domain[] {
  const all = getProjects(lang)
  return TRANSLATIONS[lang].pillars.map((pillar, i) => ({
    id: PILLAR_IDS[i],
    title: pillar.title,
    ...splitLead(pillar.desc),
    deliverables: pillar.deliverables,
    projects: PILLAR_PROJECTS[i]
      .map((id) => all.find((p) => p.id === id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .map((p) => ({ id: p.id, title: p.title })),
  }))
}

export function ClientsStrip({ lang, index }: { lang: Language; index: string }) {
  const t = TRANSLATIONS[lang]

  return (
    <section id="clients" aria-label={t.trusted_by} className="scroll-mt-24">
      <ActHeader index={index} title={t.trusted_by} />
      <div className="act-wide pb-12 md:pb-16">
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 z-20 pointer-events-none bg-gradient-to-r from-[#FDFDFC] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-20 pointer-events-none bg-gradient-to-l from-[#FDFDFC] to-transparent" />

          <div className="logo-carousel-track flex [@media(hover:hover)]:hover:[animation-play-state:paused]">
            {[0, 1].map((setIndex) => (
              <div key={setIndex} className="flex shrink-0" aria-hidden={setIndex === 1 ? true : undefined}>
                {LOGOS.map((logo) => (
                  <div key={`${setIndex}-${logo.alt}`} className="flex items-center justify-center mx-3 flex-shrink-0">
                    <img
                      src={logo.src}
                      alt={setIndex === 1 ? '' : logo.alt}
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
  )
}
