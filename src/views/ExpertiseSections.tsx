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
      },
      {
        title: "Product Strategy",
        desc: "Before a single screen, I help teams agree on what they are building and why. I run workshops to surface assumptions, structure hypotheses, and align stakeholders around a shared direction. At beta.gouv for France VAE, ten user interviews and a two-day design thinking workshop reshaped the scope of the entire MVP before any design was produced.",
      },
      {
        title: "Design Ops",
        desc: "A design system is only valuable when the whole team uses it without friction. At UNOWHY, I built a unified system across five product brands that sped up delivery across the five SQOOL applications and made developer handoff predictable. The work was not just components: it was structure, shared language, and the rituals that keep it alive.",
      },
      {
        title: "Leadership & Organisation",
        desc: "I have built design teams from the ground up. At UNOWHY, I hired, managed, and mentored five designers over six years: annual reviews, mid-year check-ins, design challenges, and a culture built around critique and shared learning. At PagesJaunes, I introduced the weekly design review that became the team's core ritual.",
      }
    ] as Pillar[],
    trusted_by: "Trusted by leading companies",
  },
  fr: {
    domains_title: "Ce que je peux prendre en charge",
    pillars: [
      {
        title: "Design & Prototypage",
        desc: "Je conçois les interfaces du premier wireframe à l'écran prêt pour l'implémentation, puis je les prototype en haute fidélité pour que les décisions s'appuient sur des artefacts concrets plutôt que sur des suppositions. Quand le calendrier est serré, je construis des MVP fonctionnels directement : authentification, base de données, intégration GenAI, déployés sur Vercel. Chez Toolkit.ac, cette approche a conduit un produit du concept à 2 000 utilisateurs payants.",
      },
      {
        title: "Stratégie Produit",
        desc: "Avant le premier écran, j'aide les équipes à s'aligner sur ce qu'elles construisent et pourquoi. J'anime des ateliers pour faire émerger les hypothèses, structurer le scope et aligner les parties prenantes sur une direction commune. Pour France VAE chez beta.gouv, dix entretiens utilisateurs et un atelier design thinking de deux jours ont reconfiguré le périmètre de l'ensemble du MVP avant la moindre production design.",
      },
      {
        title: "Design Ops",
        desc: "Un design system n'a de valeur que lorsque toute l'équipe l'utilise sans friction. Chez UNOWHY, j'ai construit un système unifié sur cinq marques produit qui a accéléré la livraison sur les cinq applications SQOOL et rendu le handoff développeur prévisible. Le travail n'était pas qu'une bibliothèque de composants : c'était une structure, un langage partagé et les rituels qui le font vivre.",
      },
      {
        title: "Leadership & Organisation",
        desc: "J'ai construit des équipes design de zéro. Chez UNOWHY, j'ai recruté, managé et fait grandir cinq designers sur six ans : entretiens annuels, points mi-année, design challenges et une culture construite autour de la critique et de l'apprentissage partagé. Chez PagesJaunes, j'ai introduit la design review hebdomadaire qui est devenue le rituel central de l'équipe.",
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
