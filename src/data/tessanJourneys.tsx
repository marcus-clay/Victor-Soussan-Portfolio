// The journeys of the Tessan patient app, as the case study reads them: the consultation for oneself and for
// a relative, the two scans that replace typing (bank card, health card), and the two prototype families that
// settled the order of the screens. Screens are exports of the Figma file (flows folder) or prototype captures.
// Captions only say what the screen shows. Product copy stays in French on both language versions.

import React from 'react'
import type { Journey } from '@/components/case-study/JourneyPlayer'
import { CardScanOverlay, PulseOverlay, TapOverlay } from '@/components/case-study/ScanOverlays'
import { TESSAN_SHOTS } from '@/data/tessanShots'

type Lang = 'en' | 'fr'
type L = { fr: string; en: string }

const flow = (name: string) => `/images/tessan/flows/${name}.webp`

interface StepSpec {
  shot: string
  label: L
  caption?: L
  dwell?: number
  overlay?: React.ReactNode
}

const build = (lang: Lang, id: string, label: L, line: L | undefined, steps: StepSpec[]): Journey => ({
  id,
  label: label[lang],
  line: line?.[lang],
  steps: steps.map((s) => ({ src: s.shot, label: s.label[lang], caption: s.caption?.[lang], dwell: s.dwell, overlay: s.overlay })),
})

/** The consultation funnel, for oneself and for a relative. */
export function tunnelJourneys(lang: Lang): Journey[] {
  const shared = {
    consent: { fr: 'Trois accords sur un écran à part, obligatoires ou optionnels, avant de rejoindre la file.', en: 'Three agreements on a screen of their own, required or optional, before joining the queue.' },
    advance: { fr: 'Honoraires, remboursement et montant à avancer s’affichent avant de payer. Ce n’est pas un paiement définitif.', en: 'Fees, reimbursement and the amount to advance show before paying. It is not a final payment.' },
    queue: { fr: 'Confirmation immédiate, puis redirection vers la salle d’attente.', en: 'Immediate confirmation, then a redirect to the waiting room.' },
    wait: { fr: 'Une position dans la file et une jauge : pas de minuteur qui mentirait.', en: 'A position in the queue and a gauge: no timer that would lie.' },
    done: { fr: 'Ordonnance, arrêt de travail et compte-rendu dès la fin, puis une question sur l’expérience.', en: 'Prescription, sick note and report right at the end, then one question about the experience.' },
  }
  return [
    build(lang, 'self', { fr: 'Pour moi', en: 'For me' }, undefined, [
      { shot: flow('accueil-hp'), label: { fr: 'Accueil', en: 'Home' }, caption: { fr: 'Une carte dédiée à la consultation, au-dessus des documents et des pharmacies.', en: 'A card of its own for the consultation, above the documents and the pharmacies.' } },
      { shot: flow('identification'), label: { fr: 'Identification', en: 'Identification' }, caption: { fr: 'La carte Vitale se scanne ou se saisit. Avec elle, aucune avance de frais.', en: 'The health card is scanned or typed. With it, nothing to advance.' } },
      { shot: flow('verification'), label: { fr: 'Vérification', en: 'Checking' }, caption: { fr: 'Carte lue, droits confirmés : le patient voit que cela a marché.', en: 'Card read, rights confirmed: the patient sees it worked.' } },
      { shot: flow('motif'), label: { fr: 'Motif', en: 'Reason' }, caption: { fr: 'Une phrase libre, une durée, et l’arrêt de travail en option.', en: 'A free sentence, a duration, and the sick note as an option.' } },
      { shot: flow('consentements'), label: { fr: 'Consentements', en: 'Consents' }, caption: shared.consent },
      { shot: flow('avance-frais'), label: { fr: 'Avance de frais', en: 'Advance payment' }, caption: shared.advance },
      { shot: flow('succes-file'), label: { fr: 'Dans la file', en: 'In the queue' }, caption: shared.queue },
      { shot: flow('position-file'), label: { fr: 'Salle d’attente', en: 'Waiting room' }, caption: shared.wait },
      { shot: flow('consultation-prete'), label: { fr: 'Médecin prêt', en: 'Doctor ready' }, caption: { fr: 'Un seul bouton : « Rejoindre la consultation ».', en: 'A single button: “Rejoindre la consultation”.' } },
      { shot: flow('consultation-terminee'), label: { fr: 'Après la consultation', en: 'After the consultation' }, caption: shared.done },
    ]),
    build(lang, 'relative', { fr: 'Pour un proche', en: 'For a relative' }, { fr: 'Avec un proche déjà enregistré, une seule question s’ajoute au départ : pour qui ? Le reste du parcours ne change pas.', en: 'With a relative already registered, one question is added at the start: who is it for? The rest of the journey stays the same.' }, [
      { shot: flow('proche-accueil'), label: { fr: 'Accueil', en: 'Home' }, caption: { fr: 'Le même accueil, le même bouton.', en: 'The same home, the same button.' } },
      { shot: flow('proche-pourqui'), label: { fr: 'Pour qui ?', en: 'Who is it for?' }, caption: { fr: 'Moi-même, un proche enregistré, ou ajouter un proche : la carte Vitale est requise pour l’ajout.', en: 'Myself, a registered relative, or add one: the health card is required to add.' } },
      { shot: flow('proche-motif'), label: { fr: 'Motif', en: 'Reason' }, caption: { fr: 'Un motif en un tap, une description libre, une durée.', en: 'A reason in one tap, a free description, a duration.' } },
      { shot: flow('proche-consentements'), label: { fr: 'Consentements', en: 'Consents' }, caption: shared.consent },
      { shot: flow('proche-avance'), label: { fr: 'Avance de frais', en: 'Advance payment' }, caption: shared.advance },
      { shot: flow('proche-succes'), label: { fr: 'Dans la file', en: 'In the queue' }, caption: shared.queue },
      { shot: flow('position-file'), label: { fr: 'Salle d’attente', en: 'Waiting room' }, caption: shared.wait },
      { shot: flow('proche-terminee'), label: { fr: 'Après la consultation', en: 'After the consultation' }, caption: shared.done },
    ]),
  ]
}

/** The two scans that replace typing, animated at the moment the camera reads the card. */
export function scanJourneys(lang: Lang): Journey[] {
  const done = lang === 'fr' ? 'Carte reconnue' : 'Card recognized'
  return [
    build(lang, 'bank', { fr: 'Carte bancaire', en: 'Bank card' }, { fr: 'Payer à la volée : la caméra remplace la saisie du numéro.', en: 'Pay on the spot: the camera replaces typing the number.' }, [
      { shot: flow('moyens-vide'), label: { fr: 'Aucune carte enregistrée', en: 'No card saved' }, caption: { fr: 'Un seul bouton : « Ajouter une carte ».', en: 'A single button: “Ajouter une carte”.' }, overlay: <TapOverlay x={195} y={784} /> },
      { shot: flow('scan-cb'), label: { fr: 'Scan de la carte', en: 'Card scan' }, caption: { fr: 'La caméra lit la carte, plus de numéro à saisir. Les données bancaires sont chiffrées et jamais stockées par Tessan.', en: 'The camera reads the card, no number to type. Bank data is encrypted and never stored by Tessan.' }, dwell: 5000, overlay: <CardScanOverlay kind="bank" frame={{ x: 35, y: 327 }} doneLabel={done} /> },
      { shot: flow('moyens-paiement'), label: { fr: 'Carte enregistrée', en: 'Card saved' }, caption: { fr: 'Elle rejoint les cartes enregistrées, à côté d’Apple Pay et de Google Pay.', en: 'It joins the saved cards, next to Apple Pay and Google Pay.' }, overlay: <PulseOverlay x={16} y={302} width={358} height={64} /> },
      { shot: flow('paiement-confirme'), label: { fr: 'Paiement confirmé', en: 'Payment confirmed' }, caption: { fr: 'Le montant, une phrase, et un bouton vers la salle d’attente.', en: 'The amount, one sentence, and a button to the waiting room.' } },
    ]),
    build(lang, 'vitale', { fr: 'Carte Vitale', en: 'Health card' }, { fr: 'Lire la carte Vitale : les droits remplacent la saisie.', en: 'Reading the health card: the rights replace typing.' }, [
      { shot: flow('identification'), label: { fr: 'Identification', en: 'Identification' }, caption: { fr: 'Le patient choisit de scanner sa carte plutôt que de saisir quinze chiffres.', en: 'The patient chooses to scan the card rather than type fifteen digits.' }, overlay: <TapOverlay x={195} y={381} /> },
      { shot: flow('scan-vitale'), label: { fr: 'Scan de la carte Vitale', en: 'Health card scan' }, caption: { fr: 'L’analyse se fait sur l’appareil : rien n’est envoyé sans l’accord du patient. Un import depuis le Wallet est possible.', en: 'The analysis happens on the device: nothing is sent without the patient’s agreement. Importing from the Wallet is possible.' }, dwell: 5000, overlay: <CardScanOverlay kind="vitale" frame={{ x: 35, y: 308 }} doneLabel={done} /> },
      { shot: flow('vitale-reussi'), label: { fr: 'Carte reconnue', en: 'Card recognized' }, caption: { fr: 'Nom, prénom, numéro et médecin traitant se remplissent seuls, à vérifier avant de confirmer.', en: 'Name, number and family doctor fill in on their own, to check before confirming.' }, overlay: <PulseOverlay x={16} y={109} width={358} height={68} /> },
      { shot: flow('pec-70'), label: { fr: 'Prise en charge', en: 'Coverage' }, caption: { fr: 'Les droits se traduisent aussitôt : ici 70 %, il reste 7,50 € à avancer.', en: 'The rights turn into a figure at once: here 70%, 7.50 € is left to advance.' } },
    ]),
    build(lang, 'coverage', { fr: 'Prise en charge', en: 'Coverage' }, { fr: 'Chaque cas dit en une phrase ce qui reste à régler, et propose l’action qui peut le changer.', en: 'Each case says in one sentence what is left to pay, and offers the action that can change it.' }, [
      { shot: flow('pec-100'), label: { fr: '100 %, carte Vitale et mutuelle', en: '100%, health card and supplementary cover' }, caption: { fr: 'La carte Vitale et la mutuelle couvrent l’intégralité : rien à payer, aucune avance.', en: 'The health card and the supplementary cover pay everything: nothing to pay, no advance.' } },
      { shot: flow('pec-100-am'), label: { fr: '100 %, Assurance Maladie seule', en: '100%, national health insurance only' }, caption: { fr: 'Un acte pris en charge à 100 % par l’Assurance Maladie : aucune mutuelle requise.', en: 'An act covered at 100% by national health insurance: no supplementary cover needed.' } },
      { shot: flow('pec-100-exo'), label: { fr: '100 %, exonération', en: '100%, exemption' }, caption: { fr: 'Exonération du ticket modérateur (ALD, complémentaire santé solidaire, maternité) : 100 %.', en: 'Exemption from the patient share (long-term condition, solidarity cover, maternity): 100%.' } },
      { shot: flow('pec-70'), label: { fr: '70 %, carte Vitale seule', en: '70%, health card only' }, caption: { fr: 'L’Assurance Maladie couvre 70 % : 7,50 € à avancer, que l’ajout de la mutuelle ferait disparaître.', en: 'National health insurance covers 70%: 7.50 € to advance, which adding the supplementary cover would remove.' } },
      { shot: flow('pec-90'), label: { fr: '90 %, mutuelle partielle', en: '90%, partial supplementary cover' }, caption: { fr: 'La mutuelle ne couvre pas tout le ticket modérateur : il reste 2,50 €.', en: 'The supplementary cover does not pay the whole patient share: 2.50 € is left.' } },
      { shot: flow('pec-0'), label: { fr: '0 %, sans carte Vitale', en: '0%, no health card' }, caption: { fr: 'Sans carte Vitale, le patient avance 25 € et pourra demander le remboursement avec une feuille de soins.', en: 'Without a health card, the patient advances 25 € and can claim reimbursement with a care sheet.' } },
      { shot: flow('paiement-refuse'), label: { fr: 'Paiement refusé', en: 'Payment declined' }, caption: { fr: 'La banque a refusé : le patient réessaie ou choisit un autre moyen, sans repartir de zéro.', en: 'The bank declined: the patient tries again or picks another method, without starting over.' } },
    ]),
  ]
}

/** The two prototype families that settled the order of the screens, read as journeys of stills. */
export function prototypeJourneys(lang: Lang): Journey[] {
  const fromShots = (group: 'wireStills' | 'v4Stills') =>
    TESSAN_SHOTS[group].items.map((it) => ({ shot: it.src, label: { fr: it.fr, en: it.en } }))
  return [
    build(lang, 'wire', { fr: 'Wireframes', en: 'Wireframes' }, { fr: 'Des wireframes interactifs en noir et blanc, revus avec la direction produit : pour qui, quel motif, quelle cabine, quand demander l’authentification.', en: 'Interactive black and white wireframes, reviewed with product leadership: who for, which reason, which booth, when to ask for sign-in.' }, fromShots('wireStills')),
    build(lang, 'booking', { fr: 'Réservation en cabine', en: 'Booth booking' }, { fr: 'Un prototype de réservation : de la carte des cabines à l’accès confirmé, avec les vraies officines autour des cabines.', en: 'A booking prototype: from the booth map to confirmed access, with the real pharmacies around the booths.' }, fromShots('v4Stills')),
  ]
}
