/**
 * What every case study hero needs beyond its own translations: the client mark, and the
 * visual that fills the hero panel. One entry per project id.
 *
 * - `logo`: an SVG or WebP of the client mark on a light ground. Missing means the client
 *   name is set as text instead (no logo file in the repository yet).
 * - `visual`: the image shown whole in the 3:2 panel (object-fit: contain), so a screen is
 *   never cropped. `tone` is the panel ground: white for every project (the visuals are
 *   transparent cut-outs), RiskOS being the one dark exception like its whole page.
 * - `fit: 'cover'` fills the panel instead, for photographs that survive a crop.
 */
export interface CaseStudyShell {
  client: string
  logo?: string
  visual: string
  tone: string
  fit?: 'contain' | 'cover'
  position?: string
}

export const CASE_STUDY_SHELL: Record<string, CaseStudyShell> = {
  toolkit: {
    client: 'Toolkit',
    logo: '/images/toolkit/Logo toolkit - light bg - large - horizontal.svg',
    visual: '/images/thumbnail-toolkit.webp',
    tone: '#FFFFFF',
  },
  dailymotion: {
    client: 'Dailymotion',
    logo: '/images/dailymotion/logo-dailymotion-black.svg',
    visual: '/images/thumbnail-dailymotion-web-platform.webp',
    tone: '#FFFFFF',
  },
  connect: {
    client: 'Unowhy',
    logo: '/images/unowhy/Logo-Unowhy-LightBg.svg',
    visual: '/images/thumbnail-connect.webp',
    tone: '#FFFFFF',
  },
  sqool: {
    client: 'SQOOL',
    logo: '/images/sqool/logo-sqool.svg',
    visual: '/images/thumbnail-sqool-suite.webp',
    tone: '#FFFFFF',
  },
  'sqool-classe': {
    client: 'SQOOL Classe',
    logo: '/prototypes/images/logo/logo-sqool-classe-horizontal-light.svg',
    visual: '/images/thumbnail_sqool_classe.webp',
    tone: '#FFFFFF',
  },
  'france-vae': {
    client: 'France VAE',
    logo: '/images/francevae/logo fvae.webp',
    visual: '/images/francevae/thumbnail_france_vae.webp',
    tone: '#FFFFFF',
  },
  pagesjaunes: {
    client: 'PagesJaunes',
    logo: '/logos/LOGO SOLOCAL.svg',
    visual: '/images/thumbnail-pagesjaunes-multidevices.webp',
    tone: '#FFFFFF',
  },
  androidwear: {
    client: 'PagesJaunes',
    visual: '/images/pagesjaunes/Android%20wear/android_wear_thumbnail%2002.webp',
    tone: '#FFFFFF',
  },
  riskos: {
    client: 'RiskOS',
    visual: '/images/riskos/02-case-detail.webp',
    tone: '#000000',
  },
}
