// The two journeys of the Tessan patient app played as films in one phone: getting started, from the store
// to the home screen, then a teleconsultation, from the home screen to the end of the call. Screens are the
// exports of the Figma file (flows folder) and of the app; the moments without a picture (store, opening,
// keyboard, text message, video call) are drawn in code. Coordinates are in the 390 × 844 space of the screens.
// One finger plays the reader: each step ends just after its last press, so the next screen answers it.
// Product copy stays in French.

import React from 'react'
import type { FilmStep, FilmTap } from '@/components/case-study/JourneyFilm'
import { CheckboxCheck, CodeBoxes, Countdown, NumPad, Reveal, Selected, SmsBanner, SplashScreen, StoreScreen, TypeField, VideoCallScreen } from '@/components/case-study/FilmOverlays'
import { CardScanOverlay, PulseOverlay } from '@/components/case-study/ScanOverlays'

const flow = (name: string) => `/images/tessan/flows/${name}.webp`
const app = (name: string) => `/images/tessan/tessan-app-${name}.webp`

/** The wide green button at the foot of most screens */
const CTA = { w: 358, h: 56, r: 12 }
/** Time between a press and the screen it opens */
const ANSWER = 0.45

/** Centre of a key of the number pad; `top` is the first row (pad without suggestion bar: 625) */
const KEY_X = [67, 195, 323]
const key = (digit: string, top = 625) => {
  if (digit === '0') return { x: 195, y: top + 3 * 52 }
  const n = Number(digit) - 1
  return { x: KEY_X[n % 3], y: top + Math.floor(n / 3) * 52 }
}

const PHONE = '0612345678'
const TYPE_AT = 0.9
const CPS = 5
const typing: FilmTap[] = PHONE.split('').map((d, i) => ({ ...key(d), at: TYPE_AT + i / CPS, hold: 0.1, press: undefined }))
const TYPED = TYPE_AT + (PHONE.length - 1) / CPS

/** From the store listing to the home screen: install, open, one field, one code. */
export function startFilm(): FilmStep[] {
  return [
    {
      duration: 2.7 + 0.3,
      transition: 'fade',
      screen: <StoreScreen icon="/images/tessan/tessan-app-icon.webp" shots={['/images/tessan/store/play-store-01.webp', '/images/tessan/store/play-store-03.webp']} installAt={0.7} openAt={2.7} />,
      taps: [
        { x: 186, y: 162, at: 0.7 },
        { x: 180, y: 162, at: 2.7 },
      ],
      camera: [
        { at: 0.1, x: 195, y: 250, zoom: 1.4 },
        { at: 2.75, x: 195, y: 422, zoom: 1 },
      ],
    },
    { duration: 1.4, transition: 'launch', screen: <SplashScreen logo="/images/tessan/tessan-logo.svg" /> },
    {
      duration: 0.8 + ANSWER,
      transition: 'fade',
      src: app('demarrer'),
      taps: [{ x: 195, y: 784, at: 0.8, press: CTA }],
    },
    {
      duration: TYPED + 0.75 + ANSWER,
      src: app('connexion'),
      overlay: (
        <>
          <TypeField x={30} y={226} w={330} h={36} text={PHONE} pairs at={TYPE_AT} focusAt={0.35} cps={CPS} field={{ x: 16, y: 220, w: 358, h: 48, r: 10 }} />
          <NumPad showAt={0.4} hideAt={TYPED + 0.3} text={PHONE} typeAt={TYPE_AT} cps={CPS} />
        </>
      ),
      taps: [{ x: 160, y: 244, at: 0.3 }, ...typing, { x: 195, y: 784, at: TYPED + 0.75, press: CTA }],
      camera: [
        { at: 0.15, x: 195, y: 470, zoom: 1.22 },
        { at: TYPED + 0.4, x: 195, y: 560, zoom: 1.1 },
      ],
    },
    {
      duration: 2.4 + ANSWER,
      src: app('code'),
      overlay: (
        <>
          <SmsBanner at={0.15} until={1.9} title="Tessan" body="Votre code de connexion : 481926" />
          <CodeBoxes x={16} y={185} digits="481926" at={1.55} every={0.05} />
          <NumPad showAt={0.85} hideAt={1.95} suggestion={{ label: '481926', pressAt: 1.45 }} />
        </>
      ),
      taps: [
        { x: 40, y: 212, at: 0.75 },
        { x: 195, y: 574, at: 1.45 },
        { x: 195, y: 784, at: 2.4, press: CTA },
      ],
      camera: [
        { at: 0, x: 195, y: 150, zoom: 1.45 },
        { at: 1.2, x: 195, y: 400, zoom: 1.15 },
        { at: 2.1, x: 195, y: 422, zoom: 1 },
      ],
    },
    {
      duration: 2.8,
      src: app('accueil-connecte'),
      overlay: <PulseOverlay x={16} y={294} width={358} height={184} radius={22} delay={0.5} />,
    },
  ]
}

/** From the home screen to the end of the consultation: identity, reason, consents, card scan, queue, call. */
export function consultationFilm(): FilmStep[] {
  const done = 'Carte reconnue'
  return [
    {
      duration: 0.9 + ANSWER,
      transition: 'fade',
      src: flow('accueil-hp'),
      taps: [{ x: 141, y: 268, at: 0.9, press: { w: 206, h: 48, r: 10 } }],
    },
    {
      duration: 0.8 + ANSWER,
      src: flow('identification'),
      taps: [{ x: 195, y: 381, at: 0.8, press: { w: 358, h: 52, r: 10 } }],
    },
    {
      duration: 3.5,
      transition: 'up',
      src: flow('scan-vitale'),
      overlay: <CardScanOverlay kind="vitale" frame={{ x: 35, y: 308 }} doneLabel={done} />,
      camera: [
        { at: 0.35, x: 195, y: 420, zoom: 1.45 },
        { at: 3.1, x: 195, y: 422, zoom: 1 },
      ],
    },
    {
      duration: 1.8,
      src: flow('verification'),
      overlay: <Reveal x={14} y={404} w={362} h={68} r={12} until={0.9} color="#F5F7F9" />,
    },
    {
      duration: 1.5 + ANSWER,
      src: flow('motif'),
      overlay: <Selected x={16} y={360} w={120} h={38} at={0.5} />,
      taps: [
        { x: 76, y: 379, at: 0.5, press: { w: 120, h: 38, r: 19 } },
        { x: 195, y: 784, at: 1.5, press: CTA },
      ],
      camera: [
        { at: 0, x: 170, y: 330, zoom: 1.35 },
        { at: 1.05, x: 195, y: 422, zoom: 1 },
      ],
    },
    {
      duration: 1.9 + ANSWER,
      src: flow('consentements'),
      overlay: (
        <>
          <CheckboxCheck x={32} y={184} at={0.4} />
          <CheckboxCheck x={32} y={306} at={1} />
        </>
      ),
      camera: [
        { at: 0, x: 150, y: 270, zoom: 1.4 },
        { at: 1.45, x: 195, y: 422, zoom: 1 },
      ],
      taps: [
        { x: 44, y: 196, at: 0.4 },
        { x: 44, y: 318, at: 1 },
        { x: 195, y: 767, at: 1.9, press: CTA },
      ],
    },
    {
      duration: 0.8 + ANSWER,
      src: flow('moyens-vide'),
      taps: [{ x: 195, y: 784, at: 0.8, press: CTA }],
    },
    {
      duration: 3.5,
      transition: 'up',
      src: flow('scan-cb'),
      overlay: <CardScanOverlay kind="bank" frame={{ x: 35, y: 327 }} doneLabel={done} />,
      camera: [
        { at: 0.35, x: 195, y: 430, zoom: 1.45 },
        { at: 3.1, x: 195, y: 422, zoom: 1 },
      ],
    },
    {
      duration: 1.2 + ANSWER,
      src: flow('moyens-paiement'),
      overlay: <PulseOverlay x={16} y={302} width={358} height={62} radius={12} delay={0.3} />,
      taps: [{ x: 195, y: 333, at: 1.2, press: { w: 358, h: 62, r: 12 } }],
    },
    {
      duration: 1 + ANSWER,
      src: flow('avance-frais'),
      taps: [{ x: 195, y: 804, at: 1, press: CTA }],
      camera: [
        { at: 0, x: 195, y: 300, zoom: 1.3 },
        { at: 0.75, x: 195, y: 422, zoom: 1 },
      ],
    },
    {
      duration: 1.3 + ANSWER,
      transition: 'fade',
      src: flow('paiement-confirme'),
      taps: [{ x: 195, y: 791, at: 1.3, press: { w: 350, h: 56, r: 12 } }],
    },
    { duration: 1.5, src: flow('succes-file'), transition: 'fade' },
    {
      duration: 3.1,
      src: flow('position-file'),
      overlay: <Countdown x={150} y={198} w={90} h={52} values={[32, 27, 19, 12, 6, 2, 1]} at={0.3} every={0.38} />,
      camera: [
        { at: 0.1, x: 195, y: 250, zoom: 1.55 },
        { at: 2.7, x: 195, y: 422, zoom: 1 },
      ],
    },
    {
      duration: 0.8 + ANSWER,
      src: flow('consultation-prete'),
      taps: [{ x: 195, y: 390, at: 0.8, press: { w: 326, h: 56, r: 12 } }],
    },
    {
      duration: 4 + ANSWER,
      transition: 'fade',
      screen: <VideoCallScreen doctor="Dr Delphine Monnier" initials="DM" specialty="Médecine générale" />,
      camera: [
        { at: 1, x: 195, y: 400, zoom: 1.3 },
        { at: 3.2, x: 195, y: 560, zoom: 1.12 },
      ],
      taps: [{ x: 195, y: 771, at: 4, press: { w: 64, h: 64, r: 32 } }],
    },
    {
      duration: 2.8,
      transition: 'fade',
      src: flow('consultation-terminee'),
      overlay: <PulseOverlay x={16} y={288} width={358} height={64} radius={12} delay={0.6} />,
    },
  ]
}
