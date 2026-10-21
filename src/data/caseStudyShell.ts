/**
 * What every case study hero needs beyond its own translations: the client mark, and the
 * visual that fills the hero panel. One entry per project id.
 *
 * - `logo`: an SVG or WebP of the client mark on a light ground. Missing means the client
 *   name is set as text instead (no logo file in the repository yet).
 * - `visual`: the image shown whole in the 21:9 panel (object-fit: contain), so a screen is
 *   never cropped. `tone` is the panel ground, picked to sit behind that image.
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
    tone: '#F3F3F1',
  },
  dailymotion: {
    client: 'Dailymotion',
    logo: '/images/dailymotion/logo-dailymotion-black.svg',
    visual: '/images/thumbnail-dailymotion-web-platform.webp',
    tone: '#F3F3F1',
  },
  connect: {
    client: 'Unowhy',
    logo: '/images/unowhy/Logo-Unowhy-LightBg.svg',
    visual: '/images/thumbnail-connect.webp',
    tone: '#F3F3F1',
  },
  sqool: {
    client: 'SQOOL',
    logo: '/images/sqool/logo-sqool.svg',
    visual: '/images/thumbnail-sqool-suite.webp',
    tone: '#F1F2F6',
  },
  'sqool-classe': {
    client: 'SQOOL Classe',
    logo: '/prototypes/images/logo/logo-sqool-classe-horizontal-light.svg',
    visual: '/images/thumbnail_sqool_classe.webp',
    tone: '#F1F3F5',
  },
  'france-vae': {
    client: 'France VAE',
    logo: '/images/francevae/logo fvae.webp',
    visual: '/images/francevae/thumbnail_france_vae.webp',
    tone: '#F2F2F4',
  },
  pagesjaunes: {
    client: 'PagesJaunes',
    logo: '/logos/LOGO SOLOCAL.svg',
    visual: '/images/thumbnail-pagesjaunes-multidevices.webp',
    tone: '#F3F3F1',
  },
  androidwear: {
    client: 'PagesJaunes',
    visual: '/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui%20modes.webp',
    tone: '#C8C8C8',
  },
  riskos: {
    client: 'RiskOS',
    visual: '/images/riskos/02-case-detail.webp',
    tone: '#000000',
  },
}
