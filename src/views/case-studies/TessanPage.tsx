// Tessan Case Study Page
// Order: hero, summary, then seven short acts (app, funnel, assistant, design system, product management, vision, limits).
// Each act reads as a lead, three ideas with their visuals, and a folded detail.

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { CASE_STUDY_SHELL } from '@/data/caseStudyShell'
import { ActRule, ActTitle } from '@/components/case-study/ActSection'
import CaseStudySummary from '@/components/case-study/CaseStudySummary'
import CaseStudyHero from '@/components/case-study/CaseStudyHero'
import DeviceCarousel from '@/components/case-study/DeviceCarousel'
import StoreBadges, { type StoreLinks } from '@/components/case-study/StoreBadges'
import NotificationsShowcase from '@/components/case-study/NotificationsShowcase'
import { assistantJourneys, osJourneys, prototypeJourneys, scanJourneys, tunnelJourneys, type Journey } from '@/data/tessanJourneys'
import DeviceMockup, { type DeviceKind, type DeviceScreen } from '@/components/case-study/DeviceMockup'
import EnhancedLightbox, { type LightboxImage } from '@/components/media/EnhancedLightbox'
import { zoomable } from '@/utils/zoomable'
import { TESSAN_TRANSLATIONS } from '@/data/caseStudyTranslations/tessanTranslations'

interface TessanPageProps {
  onClose: () => void
  systemTheme: 'light' | 'dark'
  onToggleTheme: () => void
  viewMode: 'caseStudy' | 'gallery' | 'executive'
  onViewModeChange: (mode: 'caseStudy' | 'gallery' | 'executive') => void
  lang?: 'en' | 'fr'
  onContact?: () => void
}

interface ImageFigure {
  type?: 'image'
  src: string
  width?: number
  height?: number
  /** Largest display width in px, for portrait or square visuals that would otherwise fill the column */
  maxWidth?: number
  /** Public prototype or demo behind the visual, when there is one */
  href?: string
}

interface DeviceScreenSpec extends DeviceScreen {
  /** Name of the screen, used as its accessible name and its lightbox caption */
  label: { fr: string; en: string }
  /** Width / height of the screen when it is not the device default */
  aspect?: number
}

/** One or several screens, each drawn inside a device. */
interface DeviceFigure {
  type: 'devices'
  kind: DeviceKind
  screens: DeviceScreenSpec[]
  /** Address shown in a browser bar */
  url?: string
  /** Widest a single browser or tablet gets, as a share of the stage */
  share?: number
  /** Screens at reading size in a horizontal strip instead of a row on one stage */
  carousel?: boolean
  /** Show the caption under a strip, when the screens need to be explained (a strip is named screen by screen otherwise) */
  showCaption?: boolean
  href?: string
}

/** The waiting-room notifications, drawn as the operating system shows them. */
interface NotificationsFigure {
  type: 'notifications'
}

/** One phone that plays a journey, with its steps as the way in. */
interface JourneyFigure {
  type: 'journey'
  kind: 'tunnel' | 'scan' | 'protos' | 'assistant' | 'os'
}

type FigureSource = ImageFigure | DeviceFigure | NotificationsFigure | JourneyFigure

const app = (name: string, label: { fr: string; en: string }): DeviceScreenSpec => ({
  src: `/images/tessan/tessan-app-${name}.webp`,
  width: 780,
  height: 1688,
  label,
})

const proto = (name: string, label: { fr: string; en: string }, aspect?: number): DeviceScreenSpec => ({
  src: `/images/tessan/proto/${name}.webp`,
  video: `/images/tessan/proto/${name}.mp4`,
  width: 780,
  height: 1688,
  aspect,
  label,
})

const hub = (name: string, label: { fr: string; en: string }): DeviceScreenSpec => ({
  src: `/images/tessan/tessan-hub-${name}.webp`,
  width: 780,
  height: 1706,
  aspect: 780 / 1706,
  label,
})

/** Visuals of the page, by key. Captions live in the translations under the same key. */
const FIGURES: Record<string, FigureSource> = {
  appScreens: {
    type: 'devices',
    kind: 'phone',
    carousel: true,
    screens: [
      app('demarrer', { fr: 'Démarrer', en: 'Get started' }),
      app('connexion', { fr: 'Saisie unique', en: 'Single entry' }),
      app('code', { fr: 'Code à usage unique', en: 'One-time code' }),
      app('accueil-connecte', { fr: 'Accueil', en: 'Home' }),
      app('consulter', { fr: 'Consultations', en: 'Consultations' }),
      app('documents', { fr: 'Documents', en: 'Documents' }),
      app('proches', { fr: 'Mes proches', en: 'Relatives' }),
      app('notifications', { fr: 'Notifications', en: 'Notifications' }),
      app('confidentialite', { fr: 'Confidentialité', en: 'Privacy' }),
    ],
  },
  storeVisuals: {
    type: 'devices',
    kind: 'poster',
    carousel: true,
    screens: [
      { src: '/images/tessan/store/play-store-01.webp', width: 720, height: 1280, aspect: 9 / 16, label: { fr: 'Un médecin en ligne, un examen en pharmacie', en: 'An online doctor, an exam at the pharmacy' } },
      { src: '/images/tessan/store/play-store-02.webp', width: 720, height: 1280, aspect: 9 / 16, label: { fr: 'Ordonnance, arrêt de travail, compte-rendu', en: 'Prescription, sick note, report' } },
      { src: '/images/tessan/store/play-store-03.webp', width: 720, height: 1280, aspect: 9 / 16, label: { fr: 'Jusqu’à 100 % remboursé', en: 'Up to 100% reimbursed' } },
      { src: '/images/tessan/store/play-store-04.webp', width: 720, height: 1280, aspect: 9 / 16, label: { fr: 'Plus de 500 médecins', en: 'Over 500 doctors' } },
      { src: '/images/tessan/store/play-store-05.webp', width: 720, height: 1280, aspect: 9 / 16, label: { fr: 'Sans rendez-vous, 7 jours sur 7', en: 'No appointment, 7 days a week' } },
      { src: '/images/tessan/store/play-store-06.webp', width: 720, height: 1280, aspect: 9 / 16, label: { fr: '1 600 pharmacies partenaires', en: '1,600 partner pharmacies' } },
      { src: '/images/tessan/store/play-store-07.webp', width: 720, height: 1280, aspect: 9 / 16, label: { fr: 'Vos enfants aussi', en: 'Your children too' } },
      { src: '/images/tessan/store/play-store-08.webp', width: 720, height: 1280, aspect: 9 / 16, label: { fr: '2 millions de patients, 4,7 sur 5', en: '2 million patients, 4.7 out of 5' } },
    ],
  },
  journeyTunnel: { type: 'journey', kind: 'tunnel' },
  journeyScan: { type: 'journey', kind: 'scan' },
  journeyProtos: { type: 'journey', kind: 'protos' },
  journeyAssistant: { type: 'journey', kind: 'assistant' },
  journeyOs: { type: 'journey', kind: 'os' },
  notifications: { type: 'notifications' },
  dsVideos: {
    type: 'devices',
    kind: 'browser',
    carousel: true,
    screens: [
      proto('tessan-ui-catalogue-navigation-1440', { fr: 'Tessan-UI : parcourir le catalogue', en: 'Tessan-UI: browsing the catalog' }, 2880 / 1800),
      proto('tessan-ui-tokens-couleurs-typo-motion-1440', { fr: 'Tessan-UI : tokens, couleurs, typographie, mouvement', en: 'Tessan-UI: tokens, color, type, motion' }, 2880 / 1800),
      proto('tessan-ui-dialog-formulaire-contact-1440', { fr: 'Tessan-UI : une boîte de dialogue', en: 'Tessan-UI: a dialog' }, 2880 / 1800),
      proto('tessan-ui-mobile-cabine-stepper-champs-1440', { fr: 'Tessan-UI : composants mobile et cabine', en: 'Tessan-UI: mobile and booth components' }, 2880 / 1800),
    ],
  },
  hubApp: {
    type: 'devices',
    kind: 'phone',
    screens: [
      app('demarrer', { fr: 'Démarrer', en: 'Get started' }),
      app('accueil-connecte', { fr: 'Accueil', en: 'Home' }),
    ],
  },
  hubOs: {
    type: 'devices',
    kind: 'browser',
    url: 'tessan-os',
    share: 0.86,
    screens: [proto('tessan-os-cross-device', { fr: 'Tessan OS', en: 'Tessan OS' }, 2160 / 1350)],
  },
  hubSysteme: {
    type: 'devices',
    kind: 'browser',
    url: 'tessan-ui',
    share: 0.86,
    screens: [proto('tessan-ui-catalogue-navigation-1440', { fr: 'Tessan-UI', en: 'Tessan-UI' }, 2880 / 1800)],
  },
  hubHorizon: {
    type: 'devices',
    kind: 'phone',
    carousel: true,
    screens: [
      { src: '/images/tessan/tessan-hub-horizon-assistant.webp', width: 780, height: 1453, aspect: 780 / 1453, label: { fr: 'Assistant Santé, l’horizon', en: 'Health Assistant, the horizon' } },
      { src: '/images/tessan/tessan-hub-horizon-agent.webp', width: 780, height: 1453, aspect: 780 / 1453, label: { fr: 'Agent obésité', en: 'Weight agent' } },
      { src: '/images/tessan/tessan-hub-horizon-v1.webp', width: 780, height: 1379, aspect: 780 / 1379, label: { fr: 'Ma Santé, version 1', en: 'My Health, version 1' } },
      { src: '/images/tessan/tessan-hub-horizon-v2.webp', width: 780, height: 1379, aspect: 780 / 1379, label: { fr: 'Ma Santé, version 2', en: 'My Health, version 2' } },
      { src: '/images/tessan/tessan-hub-horizon-v3.webp', width: 780, height: 1379, aspect: 780 / 1379, label: { fr: 'Ma Santé, version 3', en: 'My Health, version 3' } },
      { src: '/images/tessan/tessan-hub-horizon-source.webp', width: 780, height: 1580, aspect: 780 / 1580, label: { fr: 'Relier une source', en: 'Connecting a source' } },
    ],
  },
  dsPalette: { type: 'image', src: '/images/tessan/tessan-figma-palette.webp', width: 2000, height: 1806, maxWidth: 820 },
  skillsPack: { type: 'image', src: '/images/tessan/tessan-skills-pack.webp', width: 2160, height: 1154 },
  skillsDiptych: { type: 'image', src: '/images/tessan/tessan-skills-diptyque.webp', width: 2160, height: 1280 },
  skillsReact: { type: 'image', src: '/images/tessan/tessan-skills-react.webp', width: 2160, height: 1192 },
  skillsMotion: { type: 'image', src: '/images/tessan/tessan-skills-motion.webp', width: 2160, height: 1149 },
  figmaCodePalette: { type: 'image', src: '/images/tessan/tessan-figma-code-palette.webp', width: 2160, height: 1000 },
  figmaCodeBoutons: { type: 'image', src: '/images/tessan/tessan-figma-code-boutons.webp', width: 2160, height: 1000 },
  auditComposants: { type: 'image', src: '/images/tessan/tessan-audit-composants.webp', width: 2160, height: 1134 },
  pilotageAgent: { type: 'image', src: '/images/tessan/tessan-pilotage-agent.webp', width: 2160, height: 1236 },
  deliveryFigma: {
    type: 'devices',
    kind: 'browser',
    carousel: true,
    url: 'figma',
    showCaption: true,
    screens: [
      { src: '/images/tessan/tessan-livraison-01-acces.webp', width: 2400, height: 1225, aspect: 2400 / 1225, label: { fr: 'Accès et inscription', en: 'Access and sign-up' } },
      { src: '/images/tessan/tessan-livraison-02-consulter.webp', width: 2400, height: 1458, aspect: 2400 / 1458, label: { fr: 'Consulter, depuis l’accueil', en: 'Consulting, from the home screen' } },
      { src: '/images/tessan/tessan-livraison-03-paiement.webp', width: 2400, height: 923, aspect: 2400 / 923, label: { fr: 'Paiement et prise en charge', en: 'Payment and coverage' } },
    ],
  },
  hubScreens: {
    type: 'devices',
    kind: 'phone',
    carousel: true,
    screens: [
      hub('ma-sante', { fr: 'Ma Santé', en: 'My Health' }),
      hub('programme-objectif', { fr: 'Programme obésité, l’objectif', en: 'Weight program, the goal' }),
      hub('programme-actif', { fr: 'Programme obésité, la mission du jour', en: 'Weight program, the daily mission' }),
      hub('programme-suivi', { fr: 'Programme obésité, le suivi', en: 'Weight program, the follow-up' }),
    ],
  },
}

const screenKey = (screen: DeviceScreen) => screen.video ?? screen.src

const STAGE = 'bg-[#E8E8E8] rounded-xl overflow-hidden ring-1 ring-black/[0.04]'

/** A phone row shows at most three phones below md, so each one stays readable. */
function DeviceStage({
  figure,
  caption,
  lang,
  onZoom,
}: {
  figure: DeviceFigure
  caption: string
  lang: 'en' | 'fr'
  onZoom: (key: string) => void
}) {
  const count = figure.screens.length
  if (figure.carousel) {
    return (
      <DeviceCarousel
        kind={figure.kind}
        screens={figure.screens.map((screen) => ({ ...screen, label: screen.label[lang] }))}
        ariaLabel={caption}
        prevLabel={lang === 'fr' ? 'Écran précédent' : 'Previous screen'}
        nextLabel={lang === 'fr' ? 'Écran suivant' : 'Next screen'}
        onZoom={onZoom}
      />
    )
  }
  if (figure.kind === 'phone') {
    // Widths are shares of the stage; a lone phone stays narrower than a row of them.
    const wide = Math.min(count === 1 ? 24 : 30, 86 / count)
    const narrow = Math.min(count === 1 ? 44 : 30, 86 / Math.min(count, 3))
    return (
      <div className={`${STAGE} flex items-end justify-center gap-[3.5%] px-[5%] pt-[6%] pb-[6%]`}>
        {figure.screens.map((screen, i) => (
          <div
            key={screenKey(screen)}
            className={`w-[var(--phone-narrow)] md:w-[var(--phone-wide)] ${i >= 3 ? 'max-md:hidden' : ''}`}
            style={{ '--phone-narrow': `${narrow}%`, '--phone-wide': `${wide}%` } as React.CSSProperties}
          >
            <DeviceMockup
              kind="phone"
              screen={screen}
              label={`${caption}, ${screen.label[lang]}`}
              aspect={screen.aspect}
              onZoom={() => onZoom(screenKey(screen))}
            />
          </div>
        ))}
      </div>
    )
  }
  const screen = figure.screens[0]
  return (
    <div className={`${STAGE} flex items-center justify-center px-[5%] py-[5%]`}>
      <div style={{ width: `${(figure.share ?? 0.9) * 100}%` }}>
        <DeviceMockup
          kind={figure.kind}
          screen={screen}
          label={`${caption}, ${screen.label[lang]}`}
          aspect={screen.aspect}
          url={figure.url}
          onZoom={() => onZoom(screenKey(screen))}
        />
      </div>
    </div>
  )
}

/** The seven prototypes as a numbered list: each one with its idea, a playing demo and a link to try it. */
const JOURNEY_BUILDERS = { tunnel: tunnelJourneys, scan: scanJourneys, protos: prototypeJourneys, assistant: assistantJourneys, os: osJourneys }
const journeysOf = (kind: JourneyFigure['kind'], lang: 'en' | 'fr'): Journey[] => JOURNEY_BUILDERS[kind](lang)

/** A journey as a row of screens side by side, each named under its device. */
const journeyRow = (j: Journey): DeviceFigure => ({
  type: 'devices',
  kind: j.kind ?? 'phone',
  carousel: true,
  href: j.href,
  screens: j.steps.map((s) => ({ src: s.src, aspect: j.aspect, overlay: s.overlay, label: { fr: s.label, en: s.label } })),
})

function FigureView({
  figure,
  caption,
  lang,
  prototypeLabel,
  onZoom,
}: {
  figure: FigureSource
  caption: string
  lang: 'en' | 'fr'
  prototypeLabel: string
  onZoom: (key: string) => void
}) {
  if (figure.type === 'journey') {
    return (
      <div className="space-y-10 md:space-y-12">
        {journeysOf(figure.kind, lang).map((j) => (
          <FigureView key={j.id} figure={journeyRow(j)} caption={j.caption} lang={lang} prototypeLabel={prototypeLabel} onZoom={onZoom} />
        ))}
      </div>
    )
  }
  if (figure.type === 'notifications') {
    return (
      <figure>
        <NotificationsShowcase lang={lang} />
        <figcaption className="mt-3 text-left text-xs text-gray-500 leading-relaxed">{caption}</figcaption>
      </figure>
    )
  }
  return (
    <figure>
      {figure.type === 'devices' ? (
        <DeviceStage figure={figure} caption={caption} lang={lang} onZoom={onZoom} />
      ) : (
        <div
          {...zoomable(() => onZoom(figure.src))}
          aria-label={caption}
          style={figure.maxWidth ? { maxWidth: figure.maxWidth } : undefined}
          className={`group ${STAGE} cursor-zoom-in transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:hover:ring-black/[0.08] [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99]`}
        >
          <img
            loading="lazy"
            src={figure.src}
            width={figure.width}
            height={figure.height}
            alt=""
            className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.02]"
          />
        </div>
      )}
      {/* A strip names each screen under its device; a single visual carries its caption. */}
      <figcaption className="mt-3 text-left text-xs text-gray-500 leading-relaxed">
        {caption}
        {figure.href && (
          <>
            {' · '}
            <a
              href={figure.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gray-900 underline underline-offset-4 decoration-gray-300 [@media(hover:hover)]:hover:text-gray-500"
            >
              {prototypeLabel}
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </>
        )}
      </figcaption>
    </figure>
  )
}

/** The patient app, out on both stores since July 15, 2026. */
const APP_ICON = '/images/tessan/tessan-app-icon.webp'

const STORE_LINKS: StoreLinks = {
  apple: 'https://apps.apple.com/fr/app/tessan/id6755781046',
  google: 'https://play.google.com/store/apps/details?id=com.tessan.cloudpatient&hl=fr',
}

export type TessanVariant = 'hub' | 'app' | 'os' | 'systeme'

const PROJECT_ID: Record<TessanVariant, string> = {
  hub: 'tessan',
  app: 'tessan-app',
  os: 'tessan-os',
  systeme: 'tessan-systeme',
}

/**
 * The Tessan case study and its three deep dives share one set of sections, figures and strips.
 * The hub opens on three short chapters that lead to the deep dives; each deep dive reads its own sections.
 */
export const TessanChapterPage: React.FC<TessanPageProps & { variant: TessanVariant }> = ({ lang = 'fr', variant }) => {
  const t = TESSAN_TRANSLATIONS[lang]
  const projectId = PROJECT_ID[variant]
  const heroCover = CASE_STUDY_SHELL[projectId].visual
  const chapter = variant === 'hub' ? null : t.chapters[variant]
  const hero = chapter ? chapter.hero : t.hero
  const summary = chapter ? chapter.summary : t.summary
  const teasers = variant === 'hub' ? t.hub.teasers : []
  const sections = chapter ? t.sections.filter((s) => chapter.sectionIds.includes(s.id)) : t.sections.filter((s) => s.id === 'limites')

  // Every visual of the page, in reading order, so the lightbox walks the page from top to bottom
  const lightboxImages = useMemo(() => {
    const items: (LightboxImage & { key: string })[] = [{ key: heroCover, src: heroCover, caption: hero.title, type: 'image' }]
    const keys = [...teasers.map((x) => x.figure), ...sections.flatMap((s) => s.figures ?? [])]
    for (const key of keys) {
      const figure = FIGURES[key]
      if (!figure) continue
      if (figure.type === 'notifications') {
        continue
      } else if (figure.type === 'journey') {
        for (const j of journeysOf(figure.kind, lang)) {
          for (const s of j.steps) items.push({ key: s.src, src: s.src, caption: `${j.caption} ${s.label}`, type: 'image' })
        }
      } else if (figure.type === 'devices') {
        for (const screen of figure.screens) {
          items.push({ key: screenKey(screen), src: screen.video ?? screen.src, caption: `${t.captions[key] ?? ''}, ${screen.label[lang]}`, type: screen.video ? 'video' : 'image' })
        }
      } else {
        items.push({ key: figure.src, src: figure.src, caption: t.captions[key] ?? '', type: 'image' })
      }
    }
    return items
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, lang, variant])

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (src: string) => {
    const index = lightboxImages.findIndex((img) => img.key === src)
    if (index !== -1) {
      setLightboxIndex(index)
      setLightboxOpen(true)
    }
  }

  const firstIndex = teasers.length

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        lang={lang}
        projectId={projectId}
      />

      <div id="top">
        <CaseStudyHero
          lang={lang}
          projectId={projectId}
          title={hero.title}
          intro={hero.intro}
          meta={[
            { label: t.metaLabels.role, value: hero.role },
            { label: t.metaLabels.period, value: hero.period },
            { label: t.metaLabels.team, value: hero.team },
            { label: t.metaLabels.scope, value: hero.scope },
          ]}
          hideGallery
          onZoom={() => openLightbox(heroCover)}
          visualAlt={hero.title}
        />

        <CaseStudySummary
          lang={lang}
          context={summary.context}
          role={summary.role}
          roleItems={summary.roleItems}
          deliverables={summary.deliverables}
          metrics={summary.metrics}
        />

        {teasers.map((teaser, index) => (
          <section key={teaser.id} id={teaser.id}>
            <ActRule />
            <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
              <ActTitle index={String(index + 1).padStart(2, '0')} title={teaser.title} />
              <p className="max-w-[62ch] text-base text-gray-600">{teaser.text}</p>
              {teaser.id === 'app' && (
                <StoreBadges
                  lang={lang}
                  stores={STORE_LINKS}
                  label={t.ui.stores.label}
                  icon={APP_ICON}
                  appleLabel={t.ui.stores.apple}
                  googleLabel={t.ui.stores.google}
                  source="hub_teaser"
                  className="mt-6 max-w-[62ch]"
                />
              )}
              <div className="mt-8 md:mt-10">
                <FigureView
                  figure={FIGURES[teaser.figure]}
                  caption={t.captions[teaser.figure] ?? teaser.title}
                  lang={lang}
                  prototypeLabel={t.ui.prototype}
                  onZoom={openLightbox}
                />
              </div>
              <Link
                href={`/${lang}/project/${PROJECT_ID[teaser.id]}`}
                className="mt-8 inline-flex items-center gap-2 min-h-11 px-5 rounded-full bg-gray-900 hover:bg-black text-white text-sm font-medium shadow-sm hover:shadow-md active:scale-[0.97] transition-[background-color,box-shadow,transform] duration-150"
              >
                {t.hub.read}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </section>
        ))}

        {sections.map((section, index) => (
          <section key={section.id} id={section.id}>
            <ActRule />
            <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
              <ActTitle index={String(firstIndex + index + 1).padStart(2, '0')} title={section.title} />
              <p className="max-w-[62ch] text-base text-gray-600">{section.text}</p>
              {section.id === 'app' && (
                <StoreBadges
                  lang={lang}
                  stores={STORE_LINKS}
                  label={t.ui.stores.label}
                  icon={APP_ICON}
                  appleLabel={t.ui.stores.apple}
                  googleLabel={t.ui.stores.google}
                  source="app_section"
                  className="mt-6"
                />
              )}
              {section.figures && (
                <div className="mt-8 md:mt-10 space-y-6 md:space-y-8">
                  {section.figures
                    .filter((key) => FIGURES[key])
                    .map((key) => (
                      <FigureView
                        key={key}
                        figure={FIGURES[key]}
                        caption={t.captions[key] ?? ''}
                        lang={lang}
                        prototypeLabel={t.ui.prototype}
                        onZoom={openLightbox}
                      />
                    ))}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export const TessanPage: React.FC<TessanPageProps> = (props) => <TessanChapterPage {...props} variant="hub" />

export default TessanPage
