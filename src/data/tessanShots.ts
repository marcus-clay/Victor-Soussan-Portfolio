// Generated from the prototype and demo captures: screens by group, with their real dimensions.
// Each group is one strip on the Tessan page. Labels are the screen names under each device.

export interface TessanShot {
  src: string
  width: number
  height: number
  fr: string
  en: string
}

export const TESSAN_SHOTS: Record<string, { kind: 'phone' | 'browser'; items: TessanShot[] }> = {
  wireStills: {
    kind: 'phone',
    items: [
      { src: '/images/tessan/proto/stills/wireStills-wf-02.webp', width: 780, height: 1688, fr: 'Pour qui', en: 'For whom' },
      { src: '/images/tessan/proto/stills/wireStills-wf-03.webp', width: 780, height: 1688, fr: 'Motif', en: 'Reason' },
      { src: '/images/tessan/proto/stills/wireStills-wf-04.webp', width: 780, height: 1688, fr: 'Disponibilité de la cabine', en: 'Booth availability' },
      { src: '/images/tessan/proto/stills/wireStills-wf-05.webp', width: 780, height: 1688, fr: 'Mur d’authentification', en: 'Sign-in wall' },
      { src: '/images/tessan/proto/stills/wireStills-wf-06.webp', width: 780, height: 1688, fr: 'Récapitulatif après la consultation', en: 'Recap after the consultation' },
      { src: '/images/tessan/proto/stills/wireStills-wf-07.webp', width: 780, height: 1688, fr: 'Ordonnance', en: 'Prescription' },
      { src: '/images/tessan/proto/stills/wireStills-wf-08.webp', width: 780, height: 1688, fr: 'Suivi : créneau recommandé', en: 'Follow-up: recommended slot' },
      { src: '/images/tessan/proto/stills/wireStills-wf-09.webp', width: 780, height: 1688, fr: 'Gestion des proches', en: 'Relatives' },
      { src: '/images/tessan/proto/stills/wireStills-wf-10.webp', width: 780, height: 1688, fr: 'Micro-qualification', en: 'Micro-qualification' },
      { src: '/images/tessan/proto/stills/wireStills-wf-13.webp', width: 780, height: 1688, fr: 'Carte vitale', en: 'Health card' },
    ],
  },
  v4Stills: {
    kind: 'phone',
    items: [
      { src: '/images/tessan/proto/stills/v4Stills-v4-01.webp', width: 780, height: 1688, fr: 'Résultats : pharmacies et créneaux', en: 'Results: pharmacies and slots' },
      { src: '/images/tessan/proto/stills/v4Stills-v4-02.webp', width: 780, height: 1688, fr: 'Saisie de l’e-mail', en: 'E-mail entry' },
      { src: '/images/tessan/proto/stills/v4Stills-v4-03.webp', width: 780, height: 1688, fr: 'Code par SMS', en: 'Code by SMS' },
      { src: '/images/tessan/proto/stills/v4Stills-v4-04.webp', width: 780, height: 1688, fr: 'Boîte mail', en: 'Mailbox' },
      { src: '/images/tessan/proto/stills/v4Stills-v4-05.webp', width: 780, height: 1688, fr: 'Passage confirmé', en: 'Visit confirmed' },
      { src: '/images/tessan/proto/stills/v4Stills-v4-06.webp', width: 780, height: 1688, fr: 'Créneaux creux : notification', en: 'Quiet slots: notification' },
      { src: '/images/tessan/proto/stills/v4Stills-v4-07.webp', width: 780, height: 1688, fr: 'Créneaux creux : affluence', en: 'Quiet slots: footfall' },
      { src: '/images/tessan/proto/stills/v4Stills-v4-08.webp', width: 780, height: 1688, fr: 'Accès confirmé', en: 'Access confirmed' },
      { src: '/images/tessan/proto/stills/v4Stills-v4-09.webp', width: 780, height: 1688, fr: 'Explorer le réseau', en: 'Exploring the network' },
      { src: '/images/tessan/proto/stills/v4Stills-v4-10.webp', width: 780, height: 1688, fr: 'Fiche pharmacie', en: 'Pharmacy page' },
    ],
  },
  doctorStills: {
    kind: 'phone',
    items: [
      { src: '/images/tessan/proto/stills/doctorStills-dr-01.webp', width: 780, height: 1688, fr: 'Conversation', en: 'Conversation' },
      { src: '/images/tessan/proto/stills/doctorStills-dr-02.webp', width: 780, height: 1688, fr: 'Orientation vers la consultation', en: 'Guidance to a consultation' },
      { src: '/images/tessan/proto/stills/doctorStills-dr-03.webp', width: 780, height: 1688, fr: 'Questions de préparation', en: 'Preparation questions' },
      { src: '/images/tessan/proto/stills/doctorStills-dr-04.webp', width: 780, height: 1688, fr: 'Partage sécurisé', en: 'Secure sharing' },
      { src: '/images/tessan/proto/stills/doctorStills-dr-05.webp', width: 780, height: 1688, fr: 'Consultation prête', en: 'Consultation ready' },
      { src: '/images/tessan/proto/stills/doctorStills-dr-06.webp', width: 780, height: 1688, fr: 'Choix du créneau', en: 'Choosing a slot' },
      { src: '/images/tessan/proto/stills/doctorStills-dr-07.webp', width: 780, height: 1688, fr: 'Rendez-vous confirmé', en: 'Appointment confirmed' },
      { src: '/images/tessan/proto/stills/doctorStills-dr-08.webp', width: 780, height: 1688, fr: 'Salle d’attente', en: 'Waiting room' },
      { src: '/images/tessan/proto/stills/doctorStills-dr-appel-video.webp', width: 780, height: 1688, fr: 'Appel vidéo', en: 'Video call' },
      { src: '/images/tessan/proto/stills/doctorStills-dr-fin.webp', width: 780, height: 1688, fr: 'Fin de consultation', en: 'End of consultation' },
    ],
  },
  osStills: {
    kind: 'phone',
    items: [
      { src: '/images/tessan/proto/stills/osStills-score-01.webp', width: 780, height: 1688, fr: 'Score : tendance et insights', en: 'Score: trend and insights' },
      { src: '/images/tessan/proto/stills/osStills-score-02.webp', width: 780, height: 1688, fr: 'Score : évolution sur 7 jours', en: 'Score: 7-day evolution' },
      { src: '/images/tessan/proto/stills/osStills-score-03.webp', width: 780, height: 1688, fr: 'Score : trajectoire sur 3 mois', en: 'Score: 3-month trajectory' },
      { src: '/images/tessan/proto/stills/osStills-prev-01.webp', width: 780, height: 1688, fr: 'Prévention : missions', en: 'Prevention: missions' },
      { src: '/images/tessan/proto/stills/osStills-prev-02.webp', width: 780, height: 1688, fr: 'Prévention : appui long', en: 'Prevention: hold to confirm' },
      { src: '/images/tessan/proto/stills/osStills-prev-03.webp', width: 780, height: 1688, fr: 'Prévention : mission validée', en: 'Prevention: mission done' },
      { src: '/images/tessan/proto/stills/osStills-defis-01.webp', width: 780, height: 1688, fr: 'Défis', en: 'Challenges' },
      { src: '/images/tessan/proto/stills/osStills-defis-03.webp', width: 780, height: 1688, fr: 'Détail d’un défi', en: 'Challenge detail' },
      { src: '/images/tessan/proto/stills/osStills-defis-04.webp', width: 780, height: 1688, fr: 'Classement', en: 'Leaderboard' },
      { src: '/images/tessan/proto/stills/osStills-wa-01.webp', width: 780, height: 1688, fr: 'WhatsApp : suivi', en: 'WhatsApp: follow-up' },
      { src: '/images/tessan/proto/stills/osStills-wa-02.webp', width: 780, height: 1688, fr: 'WhatsApp : carte de mission', en: 'WhatsApp: mission card' },
      { src: '/images/tessan/proto/stills/osStills-ep-01.webp', width: 780, height: 1688, fr: 'Espace patient : connexion', en: 'Patient space: sign-in' },
      { src: '/images/tessan/proto/stills/osStills-ep-02.webp', width: 780, height: 1688, fr: 'Espace patient : assistant', en: 'Patient space: assistant' },
      { src: '/images/tessan/proto/stills/osStills-ep-03.webp', width: 780, height: 1688, fr: 'Espace patient : tableau de bord', en: 'Patient space: dashboard' },
    ],
  },
  osDesktop: {
    kind: 'browser',
    items: [
      { src: '/images/tessan/proto/stills/osDesktop-pont-cabine.webp', width: 2160, height: 1500, fr: 'Le Pont : résumé en cabine', en: 'The Bridge: summary at the booth' },
      { src: '/images/tessan/proto/stills/osDesktop-pont-qr.webp', width: 2160, height: 1500, fr: 'Le Pont : QR de transfert', en: 'The Bridge: transfer QR' },
      { src: '/images/tessan/proto/stills/osDesktop-pt-appel.webp', width: 2200, height: 1375, fr: 'Première téléconsultation : appel vidéo', en: 'First teleconsultation: video call' },
      { src: '/images/tessan/proto/stills/osDesktop-pt-resume.webp', width: 2200, height: 1375, fr: 'Première téléconsultation : résumé', en: 'First teleconsultation: summary' },
      { src: '/images/tessan/proto/stills/osDesktop-pt-avis.webp', width: 2200, height: 1375, fr: 'Première téléconsultation : avis', en: 'First teleconsultation: feedback' },
      { src: '/images/tessan/proto/stills/osDesktop-pt-qr.webp', width: 2200, height: 1375, fr: 'Première téléconsultation : ordonnance', en: 'First teleconsultation: prescription' },
      { src: '/images/tessan/proto/stills/osDesktop-os-bureau.webp', width: 2160, height: 1350, fr: 'Tessan OS : bureau', en: 'Tessan OS: desktop' },
      { src: '/images/tessan/proto/stills/osDesktop-os-tablette.webp', width: 2160, height: 1350, fr: 'Tessan OS : tablette', en: 'Tessan OS: tablet' },
      { src: '/images/tessan/proto/stills/osDesktop-os-apres-connexion.webp', width: 2200, height: 1375, fr: 'Tessan OS : après la connexion', en: 'Tessan OS: after sign-in' },
      { src: '/images/tessan/proto/stills/osDesktop-os-medaillon.webp', width: 2200, height: 1375, fr: 'Tessan OS : médaillon de connexion', en: 'Tessan OS: sign-in badge' },
      { src: '/images/tessan/proto/stills/osDesktop-lab-prototypes.webp', width: 2160, height: 1350, fr: 'Le laboratoire produit', en: 'The product lab' },
      { src: '/images/tessan/proto/stills/osDesktop-pharmacien-vue.webp', width: 2160, height: 1350, fr: 'Dashboard pharmacien', en: 'Pharmacist dashboard' },
      { src: '/images/tessan/proto/stills/osDesktop-pharmacien-motifs.webp', width: 2160, height: 1350, fr: 'Dashboard pharmacien : motifs', en: 'Pharmacist dashboard: reasons' },
    ],
  },
  dsDemos: {
    kind: 'browser',
    items: [
      { src: '/images/tessan/proto/stills/dsDemos-demo-catalogue.webp', width: 2160, height: 1350, fr: 'Tessan-UI : le catalogue', en: 'Tessan-UI: the catalog' },
      { src: '/images/tessan/proto/stills/dsDemos-demo-tokens-rampes.webp', width: 2160, height: 1350, fr: 'Tokens : rampes de couleur', en: 'Tokens: color ramps' },
      { src: '/images/tessan/proto/stills/dsDemos-demo-tokens-semantiques.webp', width: 2160, height: 1350, fr: 'Tokens : couleurs sémantiques', en: 'Tokens: semantic colors' },
      { src: '/images/tessan/proto/stills/dsDemos-demo-tokens-typo.webp', width: 2160, height: 1350, fr: 'Tokens : échelle typographique', en: 'Tokens: type scale' },
      { src: '/images/tessan/proto/stills/dsDemos-demo-tokens-motion.webp', width: 2160, height: 960, fr: 'Tokens : mouvement et cibles tactiles', en: 'Tokens: motion and touch targets' },
      { src: '/images/tessan/proto/stills/dsDemos-demo-bouton.webp', width: 2160, height: 1350, fr: 'Composant bouton : tailles et états', en: 'Button: sizes and states' },
      { src: '/images/tessan/proto/stills/dsDemos-demo-mobile-cabine.webp', width: 2160, height: 1350, fr: 'Composants mobile et cabine', en: 'Mobile and booth components' },
      { src: '/images/tessan/proto/stills/dsDemos-demo-cloud.webp', width: 2160, height: 1350, fr: 'Tessan Cloud : tableau de bord', en: 'Tessan Cloud: dashboard' },
      { src: '/images/tessan/proto/stills/dsDemos-demo-playground.webp', width: 2160, height: 1350, fr: 'Playground : prise de rendez-vous', en: 'Playground: appointment form' },
    ],
  },
  dsDemosMobile: {
    kind: 'phone',
    items: [
      { src: '/images/tessan/proto/stills/dsDemosMobile-demo-cloud-mobile.webp', width: 780, height: 1688, fr: 'Tessan Cloud sur mobile', en: 'Tessan Cloud on mobile' },
      { src: '/images/tessan/proto/stills/dsDemosMobile-demo-playground-mobile.webp', width: 780, height: 1688, fr: 'Playground sur mobile', en: 'Playground on mobile' },
    ],
  },
}
