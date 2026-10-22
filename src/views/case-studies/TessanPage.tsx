// Tessan Case Study Page
// Order: hero, summary, then seven short acts (app, funnel, assistant, design system, product management, vision, limits).
// Each act reads as a lead, three ideas with their visuals, and a folded detail.

import React, { useMemo, useState } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { ActRule, ActTitle } from '@/components/case-study/ActSection'
import CaseStudySummary from '@/components/case-study/CaseStudySummary'
import CaseStudyHero from '@/components/case-study/CaseStudyHero'
import DeviceCarousel from '@/components/case-study/DeviceCarousel'
import DeviceMockup, { type DeviceKind, type DeviceScreen } from '@/components/case-study/DeviceMockup'
import EnhancedLightbox, { type LightboxImage } from '@/components/media/EnhancedLightbox'
import { zoomable } from '@/utils/zoomable'
import { TESSAN_TRANSLATIONS } from '@/data/caseStudyTranslations/tessanTranslations'
import { TESSAN_SHOTS } from '@/data/tessanShots'

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
  href?: string
}

type FigureSource = ImageFigure | DeviceFigure

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

/** A strip of captured screens (prototype stills, demo captures), straight from the generated manifest. */
const strip = (group: string, share?: number): DeviceFigure => {
  const g = TESSAN_SHOTS[group]
  return {
    type: 'devices',
    kind: g.kind,
    carousel: true,
    share,
    screens: g.items.map((it) => ({
      src: it.src,
      width: it.width,
      height: it.height,
      aspect: it.width / it.height,
      label: { fr: it.fr, en: it.en },
    })),
  }
}

/** Visuals of the page, by key. Captions live in the translations under the same key. */
const FIGURES: Record<string, FigureSource> = {
  appScreens: {
    type: 'devices',
    kind: 'phone',
    carousel: true,
    screens: [
      app('connexion', { fr: 'Saisie unique', en: 'Single entry' }),
      app('code', { fr: 'Code à usage unique', en: 'One-time code' }),
      app('accueil', { fr: 'Accueil', en: 'Home' }),
      app('consulter', { fr: 'Consultations', en: 'Consultations' }),
      app('documents', { fr: 'Documents', en: 'Documents' }),
      app('proches', { fr: 'Mes proches', en: 'Relatives' }),
      app('notifications', { fr: 'Notifications', en: 'Notifications' }),
      app('confidentialite', { fr: 'Confidentialité', en: 'Privacy' }),
    ],
  },
  tunnelScreens: {
    type: 'devices',
    kind: 'phone',
    carousel: true,
    screens: [
      app('tunnel-carte-vitale', { fr: 'Carte vitale', en: 'Health card' }),
      app('tunnel-motif', { fr: 'Motif', en: 'Reason' }),
      app('tunnel-consentements', { fr: 'Consentements', en: 'Consents' }),
      app('tunnel-avance-frais', { fr: 'Avance de frais', en: 'Advance payment' }),
      app('tunnel-prise-en-charge-100', { fr: 'Prise en charge à 100 %', en: 'Fully covered' }),
      app('tunnel-prise-en-charge-90', { fr: 'Prise en charge à 90 %', en: '90% covered' }),
      app('tunnel-prise-en-charge', { fr: 'Prise en charge à 70 %', en: '70% covered' }),
      app('tunnel-position-file', { fr: 'Position dans la file', en: 'Place in the queue' }),
      app('tunnel-consultation-prete', { fr: 'Consultation prête', en: 'Consultation ready' }),
    ],
  },
  assistantScreen: {
    type: 'devices',
    kind: 'phone',
    screens: [app('assistant', { fr: 'Assistant Santé', en: 'Health Assistant' })],
  },
  dsInteractions: {
    type: 'devices',
    kind: 'browser',
    url: 'tessan-ui',
    share: 0.86,
    screens: [proto('tessan-ui-dialog-et-sheet-interactions', { fr: 'Dialog et sheet', en: 'Dialog and sheet' }, 2160 / 1350)],
  },
  wireStills: strip('wireStills'),
  v4Stills: strip('v4Stills'),
  doctorStills: strip('doctorStills'),
  osStills: strip('osStills'),
  osDesktop: strip('osDesktop'),
  dsDemos: strip('dsDemos'),
  dsDemosMobile: strip('dsDemosMobile'),
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

const HERO_COVER = '/images/tessan/cover_tessan_front.webp'

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
      <figcaption className={figure.type === 'devices' && figure.carousel ? 'sr-only' : 'mt-3 text-left text-xs text-gray-500 leading-relaxed'}>
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

export const TessanPage: React.FC<TessanPageProps> = ({ lang = 'fr' }) => {
  const t = TESSAN_TRANSLATIONS[lang]

  // Every visual of the page, in reading order, so the lightbox walks the page from top to bottom
  const lightboxImages = useMemo(() => {
    const items: (LightboxImage & { key: string })[] = [{ key: HERO_COVER, src: HERO_COVER, caption: t.captions.parcours, type: 'image' }]
    for (const section of t.sections) {
      {
        for (const key of section.figures ?? []) {
          const figure = FIGURES[key]
          if (!figure) continue
          if (figure.type === 'devices') {
            for (const screen of figure.screens) {
              items.push({ key: screenKey(screen), src: screen.video ?? screen.src, caption: `${t.captions[key] ?? ''}, ${screen.label[lang]}`, type: screen.video ? 'video' : 'image' })
            }
          } else {
            items.push({ key: figure.src, src: figure.src, caption: t.captions[key] ?? '', type: 'image' })
          }
        }
      }
    }
    return items
  }, [t, lang])

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (src: string) => {
    const index = lightboxImages.findIndex((img) => img.key === src)
    if (index !== -1) {
      setLightboxIndex(index)
      setLightboxOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        lang={lang}
        projectId="tessan"
      />

      <div id="top">
        <CaseStudyHero
          lang={lang}
          projectId="tessan"
          title={t.hero.title}
          intro={t.hero.intro}
          meta={[
            { label: t.metaLabels.role, value: t.hero.role },
            { label: t.metaLabels.period, value: t.hero.period },
            { label: t.metaLabels.team, value: t.hero.team },
            { label: t.metaLabels.scope, value: t.hero.scope },
          ]}
          hideGallery
          onZoom={() => openLightbox(HERO_COVER)}
          visualAlt={t.captions.parcours}
        />

        <CaseStudySummary
          lang={lang}
          context={t.summary.context}
          role={t.summary.role}
          roleItems={t.summary.roleItems}
          deliverables={t.summary.deliverables}
          metrics={t.summary.metrics}
        />

        {t.sections.map((section, index) => (
          <section key={section.id} id={section.id}>
            <ActRule />
            <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
              <ActTitle index={String(index + 1).padStart(2, '0')} title={section.title} />
              <p className="max-w-[62ch] text-base text-gray-600">{section.text}</p>
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

export default TessanPage
