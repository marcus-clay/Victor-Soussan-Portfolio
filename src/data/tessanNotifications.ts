// Waiting-room notifications of the Tessan patient app: the eight states, with the exact copy of the
// product (French, as designed in Figma) and the context and scenario that explain each one.
// Product copy stays in French on both language versions, like the app screens of the page.
// Source: Figma "Notifications iOS" and "Notifications Android", patient app FR S2 2026.

export type Lang = 'en' | 'fr'
export type Localized = Record<Lang, string>

export type NotificationStateId =
  | 'en_file'
  | 'bientot'
  | 'medecin_disponible'
  | 'a_venir'
  | 'en_cours'
  | 'expiree'
  | 'interrompue'
  | 'reprise'

/** What the large value of a card shows: a number, a countdown, or a drawn state icon. */
export type CardValue =
  | { kind: 'text'; text: string }
  | { kind: 'countdown' }
  | { kind: 'icon'; icon: 'connect' | 'live' | 'pending' | 'sync' }

/** Progress under the text: a share of the bar, or a moving segment when no duration can be promised. */
export type Gauge = number | 'indeterminate' | null

export interface IosCompact {
  text: string
  tone: 'white' | 'green'
  icon?: 'check' | 'live'
}

export interface IosExpanded {
  title: string
  body?: string
  gauge: Gauge
  button?: string
  /** Shows "Expire dans m:ss" above the title */
  countdown?: boolean
}

export interface NotificationState {
  id: NotificationStateId
  group: 'flow' | 'edge'
  label: Localized
  /** What happens in the waiting room when this notification appears */
  context: Localized
  /** What the patient sees and why the notification takes this shape */
  scenario: Localized
  ios: {
    title: string
    value: CardValue
    body: string
    gauge: Gauge
    button?: string
    compact: IosCompact | null
    expanded: IosExpanded | null
    /** Banner and vibration that reinforce the two moments where the patient must act */
    alert?: { title: string; body: string }
  }
  android: {
    title: string
    collapsed: string
    body: string
    gauge: Gauge
    button?: string
    /** Live Updates chip in the status bar (Android 16+) */
    chip?: string
  }
}

export const NOTIFICATION_STATES: NotificationState[] = [
  {
    id: 'en_file',
    group: 'flow',
    label: { fr: 'En file', en: 'In the queue' },
    context: {
      fr: 'Le patient a lancé sa consultation et attend qu’un médecin se libère.',
      en: 'The patient has started a consultation and waits for a doctor to be free.',
    },
    scenario: {
      fr: 'Il pose son téléphone ou passe à une autre application. Sa position reste lisible sur l’écran verrouillé : un chiffre, une jauge et une phrase qui rappelle qu’elle peut varier. Aucune durée n’est promise.',
      en: 'They put the phone down or switch apps. Their position stays readable on the lock screen: a number, a gauge and a sentence that says it can change. No duration is promised.',
    },
    ios: {
      title: 'Votre place en file d’attente',
      value: { kind: 'text', text: '8' },
      body: 'La position peut varier selon la disponibilité des médecins.',
      gauge: 0.35,
      compact: { text: '8ᵉ', tone: 'white' },
      expanded: { title: 'Votre place en file d’attente', body: 'Un médecin vous prendra en charge dès que possible', gauge: null },
    },
    android: {
      title: 'Votre place en file d’attente',
      collapsed: '8ᵉ dans la file d’attente',
      body: 'Vous êtes actuellement 8ᵉ en attente d’un médecin disponible.',
      gauge: 0.35,
    },
  },
  {
    id: 'bientot',
    group: 'flow',
    label: { fr: 'Bientôt', en: 'Almost your turn' },
    context: {
      fr: 'Le patient est deuxième dans la file.',
      en: 'The patient is second in the queue.',
    },
    scenario: {
      fr: 'C’est le premier moment où l’on demande quelque chose au patient : rester à proximité. La notification passe en bannière avec une vibration, puis reprend sa place sur l’écran verrouillé et dans la Dynamic Island.',
      en: 'This is the first time the patient is asked to do something: stay close. The notification comes in as a banner with a vibration, then settles back on the lock screen and in the Dynamic Island.',
    },
    ios: {
      title: 'Votre tour approche',
      value: { kind: 'text', text: '2' },
      body: 'Vous êtes 2ᵉ dans la file. Restez à proximité de votre appareil.',
      gauge: 0.85,
      compact: { text: '2ᵉ', tone: 'white' },
      expanded: { title: 'Votre tour approche', body: 'Restez à proximité de votre appareil', gauge: 0.85 },
      alert: { title: 'Votre tour approche', body: 'Restez à proximité de votre appareil.' },
    },
    android: {
      title: 'Votre tour approche',
      collapsed: 'Votre tour approche',
      body: 'Vous êtes 2ᵉ dans la file. Restez à proximité de votre appareil.',
      gauge: 0.85,
    },
  },
  {
    id: 'medecin_disponible',
    group: 'flow',
    label: { fr: 'Médecin disponible', en: 'Doctor available' },
    context: {
      fr: 'Un médecin est disponible et le créneau est gardé pour le patient pendant un temps limité.',
      en: 'A doctor is available and the slot is held for the patient for a limited time.',
    },
    scenario: {
      fr: 'La notification devient actionnable : un compte à rebours et un seul bouton, « Rejoindre la consultation ». Bannière et vibration préviennent le patient, même téléphone verrouillé.',
      en: 'The notification becomes actionable: a countdown and a single button, “Rejoindre la consultation”. A banner and a vibration reach the patient even with the phone locked.',
    },
    ios: {
      title: 'Un médecin est disponible',
      value: { kind: 'countdown' },
      body: 'Rejoignez votre consultation avant l’expiration de votre créneau.',
      gauge: 1,
      button: 'Rejoindre la consultation',
      compact: { text: 'Dispo', tone: 'green', icon: 'check' },
      expanded: { title: 'Un médecin est disponible', gauge: 1, button: 'Rejoindre la consultation', countdown: true },
      alert: { title: 'Un médecin est disponible', body: 'Rejoignez votre consultation avant l’expiration de votre créneau.' },
    },
    android: {
      title: 'Un médecin est disponible',
      collapsed: 'Un médecin est disponible',
      body: 'Rejoignez votre consultation avant l’expiration de votre créneau.',
      gauge: 1,
      button: 'Rejoindre la consultation',
      chip: 'Dispo',
    },
  },
  {
    id: 'a_venir',
    group: 'flow',
    label: { fr: 'Connexion', en: 'Connecting' },
    context: {
      fr: 'Le patient a rejoint la consultation, la connexion avec le médecin s’établit.',
      en: 'The patient has joined, the connection with the doctor is being set up.',
    },
    scenario: {
      fr: 'Pas de chiffre à lire : une jauge indéterminée montre que quelque chose se passe, sans promettre une durée.',
      en: 'Nothing to read: an indeterminate gauge shows that something is happening, without promising a duration.',
    },
    ios: {
      title: 'Votre consultation va commencer',
      value: { kind: 'icon', icon: 'connect' },
      body: 'Connexion avec le médecin en cours.',
      gauge: 'indeterminate',
      compact: { text: 'Connexion', tone: 'white' },
      expanded: { title: 'Votre consultation va commencer', body: 'Connexion avec le médecin en cours', gauge: 'indeterminate' },
    },
    android: {
      title: 'Votre consultation va commencer',
      collapsed: 'Votre consultation va commencer',
      body: 'Connexion avec le médecin en cours.',
      gauge: 'indeterminate',
    },
  },
  {
    id: 'en_cours',
    group: 'flow',
    label: { fr: 'En cours', en: 'In consultation' },
    context: {
      fr: 'Le patient est en consultation avec le médecin.',
      en: 'The patient is in consultation with the doctor.',
    },
    scenario: {
      fr: 'La notification se fait discrète : un point vert et une phrase. Elle n’ajoute aucune action, la consultation a lieu dans l’application.',
      en: 'The notification steps back: a green dot and one sentence. It adds no action, the consultation happens in the app.',
    },
    ios: {
      title: 'Vous êtes en consultation',
      value: { kind: 'icon', icon: 'live' },
      body: 'Vous êtes en relation avec le médecin.',
      gauge: null,
      compact: { text: 'live', tone: 'green', icon: 'live' },
      expanded: { title: 'Consultation en cours', body: 'Vous êtes en relation avec le médecin', gauge: null },
    },
    android: {
      title: 'Vous êtes en consultation',
      collapsed: 'Vous êtes en consultation',
      body: 'Vous êtes en relation avec le médecin.',
      gauge: 1,
    },
  },
  {
    id: 'expiree',
    group: 'edge',
    label: { fr: 'Place expirée', en: 'Place expired' },
    context: {
      fr: 'Le patient n’a pas rejoint à temps, le créneau est rendu.',
      en: 'The patient did not join in time, the slot is given back.',
    },
    scenario: {
      fr: 'Le message explique sans reprocher et propose une seule action : reprendre une place dans la file.',
      en: 'The message explains without blaming and offers one action: take a place in the queue again.',
    },
    ios: {
      title: 'Votre place n’a pas pu être gardée',
      value: { kind: 'icon', icon: 'pending' },
      body: 'Vous n’avez pas rejoint la consultation à temps. Vous pouvez reprendre une place dans la file.',
      gauge: null,
      button: 'Reprendre une place',
      compact: { text: 'Expirée', tone: 'white' },
      expanded: {
        title: 'Votre place n’a pas pu être gardée',
        body: 'Vous n’avez pas rejoint la consultation à temps. Vous pouvez reprendre une place dans la file.',
        gauge: null,
        button: 'Reprendre une place',
      },
    },
    android: {
      title: 'Votre place n’a pas pu être gardée',
      collapsed: 'Votre place n’a pas pu être gardée',
      body: 'Vous n’avez pas rejoint la consultation à temps. Vous pouvez reprendre une place dans la file.',
      gauge: 0.15,
      button: 'Reprendre une place',
    },
  },
  {
    id: 'interrompue',
    group: 'edge',
    label: { fr: 'Connexion perdue', en: 'Connection lost' },
    context: {
      fr: 'La connexion est interrompue pendant l’attente.',
      en: 'The connection drops while the patient waits.',
    },
    scenario: {
      fr: 'La place est conservée quelques minutes et la notification le dit. Une jauge à moitié et une icône de mise à jour signalent un état en cours de rétablissement : l’interruption n’est jamais silencieuse.',
      en: 'The place is kept for a few minutes and the notification says so. A half gauge and an update icon show a state being restored: the interruption is never silent.',
    },
    ios: {
      title: 'Mise à jour de votre position en cours',
      value: { kind: 'icon', icon: 'sync' },
      body: 'La connexion a été interrompue. Votre place est conservée quelques minutes ; nous actualisons dès que possible.',
      gauge: 0.5,
      compact: { text: 'Reprise', tone: 'white' },
      expanded: {
        title: 'Mise à jour de votre position en cours',
        body: 'La connexion a été interrompue. Votre place est conservée quelques minutes ; nous actualisons dès que possible.',
        gauge: 0.5,
      },
    },
    android: {
      title: 'Mise à jour de votre position en cours',
      collapsed: 'Mise à jour de votre position en cours',
      body: 'La connexion a été interrompue. Votre place est conservée quelques minutes ; nous actualisons dès que possible.',
      gauge: 0.5,
    },
  },
  {
    id: 'reprise',
    group: 'edge',
    label: { fr: 'Reprise', en: 'Resume' },
    context: {
      fr: 'Le patient a quitté l’application alors qu’un médecin l’attendait.',
      en: 'The patient left the app while a doctor was waiting.',
    },
    scenario: {
      fr: 'Un seul bouton, « Rejoindre », ramène le patient dans sa consultation, avec le décompte du temps qui reste.',
      en: 'A single button, “Rejoindre”, takes the patient back into the consultation, with the time left counting down.',
    },
    ios: {
      title: 'Reprenez votre consultation',
      value: { kind: 'countdown' },
      body: 'Vous avez quitté l’application. Rejoignez votre consultation.',
      gauge: null,
      button: 'Rejoindre',
      compact: null,
      expanded: null,
    },
    android: {
      title: 'Reprenez votre consultation',
      collapsed: 'Reprenez votre consultation',
      body: 'Vous avez quitté l’application. Rejoignez votre consultation.',
      gauge: null,
      button: 'Rejoindre',
    },
  },
]

export const NOTIFICATIONS_COPY: Record<
  Lang,
  {
    platforms: { ios: string; android: string }
    group: { flow: string; edge: string }
    context: string
    scenario: string
    surfaces: {
      lock: string
      island: string
      center: string
      centerLight: string
      collapsed: string
      expanded: string
      chip: string
      banner: string
    }
    controls: {
      expandIsland: string
      collapseIsland: string
      steps: string
      platform: string
    }
    time: string
    date: Record<'ios' | 'android', string>
    expiresIn: string
  }
> = {
  fr: {
    platforms: { ios: 'iOS', android: 'Android' },
    group: { flow: 'Le parcours', edge: 'Les cas limites' },
    context: 'Contexte',
    scenario: 'Scénario',
    surfaces: {
      lock: 'Écran verrouillé',
      island: 'Dynamic Island',
      center: 'Centre de notifications',
      centerLight: 'Thème clair',
      collapsed: 'Notification réduite',
      expanded: 'Notification développée',
      chip: 'Puce Live Updates (Android 16)',
      banner: 'Bannière',
    },
    controls: {
      expandIsland: 'Ouvrir la Dynamic Island',
      collapseIsland: 'Réduire la Dynamic Island',
      steps: 'États de la notification',
      platform: 'Plateforme',
    },
    time: '9:41',
    date: { ios: 'Lundi 6 juin', android: 'Mardi 7 juillet' },
    expiresIn: 'Expire dans',
  },
  en: {
    platforms: { ios: 'iOS', android: 'Android' },
    group: { flow: 'The journey', edge: 'Edge cases' },
    context: 'Context',
    scenario: 'Scenario',
    surfaces: {
      lock: 'Lock screen',
      island: 'Dynamic Island',
      center: 'Notification center',
      centerLight: 'Light theme',
      collapsed: 'Collapsed notification',
      expanded: 'Expanded notification',
      chip: 'Live Updates chip (Android 16)',
      banner: 'Banner',
    },
    controls: {
      expandIsland: 'Expand the Dynamic Island',
      collapseIsland: 'Collapse the Dynamic Island',
      steps: 'Notification states',
      platform: 'Platform',
    },
    time: '9:41',
    date: { ios: 'Monday, June 6', android: 'Tuesday, July 7' },
    expiresIn: 'Expires in',
  },
}
