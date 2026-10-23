// The journeys of the Tessan patient app and of its prototypes, as the case studies show them: one row of
// screens side by side per journey, with a caption under the row that says which journey it is.
// Screens are exports of the Figma file (flows folder) or prototype captures. Product copy stays in French.

import React from 'react'
import { CardScanOverlay, LoopOverlay } from '@/components/case-study/ScanOverlays'
import { TESSAN_SHOTS } from '@/data/tessanShots'

type Lang = 'en' | 'fr'
type L = { fr: string; en: string }

export interface JourneyStep {
  src: string
  /** Name of the screen, under its phone */
  label: string
  /** Animated moment on the screen */
  overlay?: React.ReactNode
}

export interface Journey {
  id: string
  /** Under the row: which journey it is, then what it shows */
  caption: string
  kind?: 'phone' | 'tablet' | 'browser'
  /** Width / height of the screens, for a tablet or a browser */
  aspect?: number
  /** Live prototype behind the journey */
  href?: string
  steps: JourneyStep[]
}

const flow = (name: string) => `/images/tessan/flows/${name}.webp`

interface StepSpec {
  shot: string
  label: L
  overlay?: React.ReactNode
}

const build = (lang: Lang, id: string, caption: L, steps: StepSpec[], extra: Partial<Journey> = {}): Journey => ({
  id,
  caption: caption[lang],
  steps: steps.map((s) => ({ src: s.shot, label: s.label[lang], overlay: s.overlay })),
  ...extra,
})

/** The consultation funnel, for oneself and for a relative. */
export function tunnelJourneys(lang: Lang): Journey[] {
  return [
    build(
      lang,
      'self',
      { fr: 'Parcours 1 · Téléconsulter pour soi : de l’accueil à la fin de la consultation, dix écrans.', en: 'Journey 1 · Consulting for oneself: from the home screen to the end of the consultation, ten screens.' },
      [
        { shot: flow('accueil-hp'), label: { fr: 'Accueil', en: 'Home' } },
        { shot: flow('identification'), label: { fr: 'Identification', en: 'Identification' } },
        { shot: flow('verification'), label: { fr: 'Vérification', en: 'Checking' } },
        { shot: flow('motif'), label: { fr: 'Motif', en: 'Reason' } },
        { shot: flow('consentements'), label: { fr: 'Consentements', en: 'Consents' } },
        { shot: flow('avance-frais'), label: { fr: 'Avance de frais', en: 'Advance payment' } },
        { shot: flow('succes-file'), label: { fr: 'Dans la file', en: 'In the queue' } },
        { shot: flow('position-file'), label: { fr: 'Salle d’attente', en: 'Waiting room' } },
        { shot: flow('consultation-prete'), label: { fr: 'Médecin prêt', en: 'Doctor ready' } },
        { shot: flow('consultation-terminee'), label: { fr: 'Après la consultation', en: 'After the consultation' } },
      ]
    ),
    build(
      lang,
      'relative',
      { fr: 'Parcours 2 · Téléconsulter pour un proche déjà enregistré : une question s’ajoute au départ, le reste du parcours ne change pas.', en: 'Journey 2 · Consulting for a relative already registered: one question is added at the start, the rest of the journey stays the same.' },
      [
        { shot: flow('proche-accueil'), label: { fr: 'Accueil', en: 'Home' } },
        { shot: flow('proche-pourqui'), label: { fr: 'Pour qui ?', en: 'Who is it for?' } },
        { shot: flow('proche-motif'), label: { fr: 'Motif', en: 'Reason' } },
        { shot: flow('proche-consentements'), label: { fr: 'Consentements', en: 'Consents' } },
        { shot: flow('proche-avance'), label: { fr: 'Avance de frais', en: 'Advance payment' } },
        { shot: flow('proche-succes'), label: { fr: 'Dans la file', en: 'In the queue' } },
        { shot: flow('position-file'), label: { fr: 'Salle d’attente', en: 'Waiting room' } },
        { shot: flow('proche-terminee'), label: { fr: 'Après la consultation', en: 'After the consultation' } },
      ]
    ),
  ]
}

/** The two scans that replace typing, and the coverage cases. The scan screens play their moment in place. */
export function scanJourneys(lang: Lang): Journey[] {
  const done = lang === 'fr' ? 'Carte reconnue' : 'Card recognized'
  return [
    build(
      lang,
      'bank',
      { fr: 'Parcours 3 · Payer à la volée : le scan de la carte bancaire remplace la saisie du numéro.', en: 'Journey 3 · Paying on the spot: scanning the bank card replaces typing the number.' },
      [
        { shot: flow('moyens-vide'), label: { fr: 'Aucune carte enregistrée', en: 'No card saved' } },
        {
          shot: flow('scan-cb'),
          label: { fr: 'Scan de la carte', en: 'Card scan' },
          overlay: (
            <LoopOverlay>
              <CardScanOverlay kind="bank" frame={{ x: 35, y: 327 }} doneLabel={done} />
            </LoopOverlay>
          ),
        },
        { shot: flow('moyens-paiement'), label: { fr: 'Carte enregistrée', en: 'Card saved' } },
        { shot: flow('paiement-confirme'), label: { fr: 'Paiement confirmé', en: 'Payment confirmed' } },
      ]
    ),
    build(
      lang,
      'vitale',
      { fr: 'Parcours 4 · Faire valoir ses droits : le scan de la carte Vitale remplace la saisie, puis la prise en charge s’affiche.', en: 'Journey 4 · Claiming one’s rights: scanning the health card replaces typing, then the coverage shows.' },
      [
        { shot: flow('identification'), label: { fr: 'Identification', en: 'Identification' } },
        {
          shot: flow('scan-vitale'),
          label: { fr: 'Scan de la carte Vitale', en: 'Health card scan' },
          overlay: (
            <LoopOverlay>
              <CardScanOverlay kind="vitale" frame={{ x: 35, y: 308 }} doneLabel={done} />
            </LoopOverlay>
          ),
        },
        { shot: flow('vitale-reussi'), label: { fr: 'Carte reconnue', en: 'Card recognized' } },
        { shot: flow('pec-70'), label: { fr: 'Prise en charge', en: 'Coverage' } },
      ]
    ),
    build(
      lang,
      'coverage',
      { fr: 'Prise en charge · Quatre cas : 100 % (rien à payer), 70 % (carte Vitale seule), 0 % (sans carte Vitale), et le paiement refusé.', en: 'Coverage · Four cases: 100% (nothing to pay), 70% (health card only), 0% (no health card), and the declined payment.' },
      [
        { shot: flow('pec-100'), label: { fr: '100 %, rien à payer', en: '100%, nothing to pay' } },
        { shot: flow('pec-70'), label: { fr: '70 %, carte Vitale seule', en: '70%, health card only' } },
        { shot: flow('pec-0'), label: { fr: '0 %, sans carte Vitale', en: '0%, no health card' } },
        { shot: flow('paiement-refuse'), label: { fr: 'Paiement refusé', en: 'Payment declined' } },
      ]
    ),
  ]
}

/** The two prototype families that settled the order of the screens. */
export function prototypeJourneys(lang: Lang): Journey[] {
  const fromShots = (group: 'wireStills' | 'v4Stills'): StepSpec[] => TESSAN_SHOTS[group].items.map((it) => ({ shot: it.src, label: { fr: it.fr, en: it.en } }))
  return [
    build(lang, 'wire', { fr: 'Prototype 1 · Wireframes interactifs en noir et blanc, revus avec la direction produit : pour qui, quel motif, quelle cabine, quand demander l’authentification.', en: 'Prototype 1 · Interactive black and white wireframes, reviewed with product leadership: who for, which reason, which booth, when to ask for sign-in.' }, fromShots('wireStills')),
    build(lang, 'booking', { fr: 'Prototype 2 · Réservation en cabine : de la carte des cabines à l’accès confirmé, avec les vraies officines autour des cabines.', en: 'Prototype 2 · Booth booking: from the booth map to confirmed access, with the real pharmacies around the booths.' }, fromShots('v4Stills')),
  ]
}

/** The assistant: the screen of the app, then the prototype that designed it. */
export function assistantJourneys(lang: Lang): Journey[] {
  return [
    build(
      lang,
      'assistant',
      { fr: 'L’Assistant Santé · L’écran de l’app avec son périmètre affiché, puis le prototype Docteur Tessan, de la conversation à la salle d’attente.', en: 'The Health Assistant · The app screen with its scope displayed, then the Doctor Tessan prototype, from the conversation to the waiting room.' },
      [
        { shot: '/images/tessan/tessan-app-assistant.webp', label: { fr: 'Dans l’app : Assistant Santé', en: 'In the app: Health Assistant' } },
        ...TESSAN_SHOTS.doctorStills.items.map((it) => ({ shot: it.src, label: { fr: `Prototype : ${it.fr}`, en: `Prototype: ${it.en}` } })),
      ]
    ),
  ]
}

/** The seven Tessan OS prototypes, each as a row of its screens with a link to try it. */
export function osJourneys(lang: Lang): Journey[] {
  const shots = (group: 'osStills' | 'osDesktop', names: string[]): StepSpec[] =>
    names.map((n) => {
      const it = TESSAN_SHOTS[group].items.find((x) => x.src.includes(n))!
      return { shot: it.src, label: { fr: it.fr, en: it.en } }
    })
  const base = 'https://tessan-os-prototypes.vercel.app'
  const mk = (n: string, name: L, line: L, steps: StepSpec[], extra: Partial<Journey>): Journey =>
    build(lang, n, { fr: `Prototype ${n} · ${name.fr} : ${line.fr}`, en: `Prototype ${n} · ${name.en}: ${line.en}` }, steps, extra)
  return [
    mk('01', { fr: 'Le Pont', en: 'The Bridge' }, { fr: 'la cabine émet, l’application reçoit : en fin de consultation, un QR code transfère le contexte vers le mobile.', en: 'the booth sends, the app receives: at the end of a consultation, a QR code moves the context to mobile.' }, shots('osDesktop', ['pont-cabine', 'pont-qr']), { kind: 'tablet', aspect: 2160 / 1500, href: `${base}/bridge` }),
    mk('02', { fr: 'Première téléconsultation', en: 'First teleconsultation' }, { fr: 'de la prise des constantes en cabine à l’appel vidéo avec le médecin.', en: 'from the vitals at the booth to the video call with the doctor.' }, shots('osDesktop', ['pt-appel', 'pt-resume', 'pt-avis', 'pt-qr']), { kind: 'browser', aspect: 1.6, href: `${base}/bridge-alt` }),
    mk('03', { fr: 'WhatsApp Tessan', en: 'WhatsApp Tessan' }, { fr: 'le suivi directement dans la messagerie : rappels, missions du jour, échanges.', en: 'follow-up inside the messaging app: reminders, daily missions, exchanges.' }, shots('osStills', ['wa-01', 'wa-02']), { href: `${base}/whatsapp` }),
    mk('04', { fr: 'Docteur Tessan', en: 'Doctor Tessan' }, { fr: 'un interlocuteur permanent, qui prépare la consultation et oriente vers un médecin.', en: 'a permanent interlocutor that prepares the consultation and points to a doctor.' }, TESSAN_SHOTS.doctorStills.items.map((it) => ({ shot: it.src, label: { fr: it.fr, en: it.en } })), { href: `${base}/doctor` }),
    mk('05', { fr: 'Tessan Score', en: 'Tessan Score' }, { fr: 'un signal de santé lisible : la tendance avant la valeur, trois insights actionnables.', en: 'a readable health signal: the trend before the value, three actionable insights.' }, shots('osStills', ['score-01', 'score-02', 'score-03']), { href: `${base}/score` }),
    mk('06', { fr: 'Tessan OS', en: 'Tessan OS' }, { fr: 'une couche commune au mobile, à la tablette et au bureau : trois hiérarchies d’information, pas un simple responsive.', en: 'a layer shared across mobile, tablet and desktop: three information hierarchies, not just responsive.' }, shots('osDesktop', ['os-bureau', 'os-tablette', 'os-apres-connexion', 'os-medaillon']), { kind: 'browser', aspect: 1.6, href: `${base}/cross-device` }),
    mk('07', { fr: 'Prévention Active', en: 'Active Prevention' }, { fr: 'la prévention par de petites missions, des séries, et un appui long pour valider.', en: 'prevention through small missions, streaks, and a long press to confirm.' }, shots('osStills', ['prev-01', 'prev-02', 'prev-03', 'defis-01', 'defis-03', 'defis-04']), { href: `${base}/prevention` }),
  ]
}
