/**
 * What every case study hero needs beyond its own translations: the client mark, and the
 * visual that fills the hero panel. One entry per project id.
 *
 * - `logo`: an SVG or WebP of the client mark on a light ground. Missing means the client
 *   name is set as text instead (no logo file in the repository yet).
 * - `visual`: the image shown whole in the 3:2 panel (object-fit: contain), so a screen is
 *   never cropped. `tone` is the panel ground: the shared stage grey (#E8E8E8) for every light project (the visuals are
 *   transparent cut-outs), RiskOS being the one dark exception like its whole page.
 * - `fit: 'cover'` fills the panel instead, for photographs that survive a crop.
 * - `fit: 'bleed'` fills the panel with a picture composed for it (devices running off the edge)
 *   on the panel's own tone: it crops like a photograph but keeps the dark-on-light caption.
 */
export interface CaseStudyShell {
  client: string
  logo?: string
  visual: string
  tone: string
  fit?: 'contain' | 'cover' | 'bleed'
  position?: string
}

export const CASE_STUDY_SHELL: Record<string, CaseStudyShell> = {
  tessan: {
    client: 'Tessan',
    logo: '/images/tessan/tessan-logo.svg',
    visual: '/images/tessan/cover_tessan_hub_v5.webp',
    tone: '#E8E8E8',
    fit: 'bleed',
  },
  'tessan-app': {
    client: 'Tessan',
    logo: '/images/tessan/tessan-logo.svg',
    visual: '/images/tessan/cover_tessan_app_v3.webp',
    tone: '#E8E8E8',
    fit: 'bleed',
  },
  'tessan-os': {
    client: 'Tessan',
    logo: '/images/tessan/tessan-logo.svg',
    visual: '/images/tessan/cover_tessan_os.webp',
    tone: '#E8E8E8',
    fit: 'bleed',
  },
  'tessan-systeme': {
    client: 'Tessan',
    logo: '/images/tessan/tessan-logo.svg',
    visual: '/images/tessan/cover_tessan_systeme.webp',
    tone: '#E8E8E8',
    fit: 'bleed',
  },
  toolkit: {
    client: 'Toolkit',
    logo: '/images/toolkit/Logo toolkit - light bg - large - horizontal.svg',
    visual: '/images/thumbnail-toolkit.webp',
    tone: '#E8E8E8',
  },
  dailymotion: {
    client: 'Dailymotion',
    logo: '/images/dailymotion/logo-dailymotion-black.svg',
    visual: '/images/thumbnail-dailymotion-web-platform.webp',
    tone: '#E8E8E8',
  },
  connect: {
    client: 'Unowhy',
    logo: '/images/unowhy/Logo-Unowhy-LightBg.svg',
    visual: '/images/thumbnail-connect.webp',
    tone: '#E8E8E8',
  },
  sqool: {
    client: 'SQOOL',
    logo: '/images/sqool/logo-sqool.svg',
    visual: '/images/thumbnail-sqool-suite.webp',
    tone: '#E8E8E8',
  },
  'sqool-classe': {
    client: 'SQOOL Classe',
    logo: '/prototypes/images/logo/logo-sqool-classe-horizontal-light.svg',
    visual: '/images/thumbnail_sqool_classe.webp',
    tone: '#E8E8E8',
  },
  'france-vae': {
    client: 'France VAE',
    logo: '/images/francevae/logo fvae.webp',
    visual: '/images/francevae/thumbnail_france_vae.webp',
    tone: '#E8E8E8',
  },
  pagesjaunes: {
    client: 'PagesJaunes',
    logo: '/logos/LOGO SOLOCAL.svg',
    visual: '/images/thumbnail-pagesjaunes-multidevices.webp',
    tone: '#E8E8E8',
  },
  androidwear: {
    client: 'PagesJaunes',
    visual: '/images/pagesjaunes/Android%20wear/android_wear_thumbnail%2002.webp',
    tone: '#E8E8E8',
  },
  riskos: {
    client: 'RiskOS',
    visual: '/images/riskos/02-case-detail.webp',
    tone: '#000000',
  },
}
