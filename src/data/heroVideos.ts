/**
 * Looping hero videos, by project id: the home cards and the case study hero panel play them over the
 * cover picture (which stays the poster and the fallback). One entry per project, added when its file exists.
 * Files live in `public/videos/hero/<id>.mp4`: H.264, no audio, exactly 3:2, about 8 to 12 seconds, a seamless loop.
 */
export interface HeroVideo {
  src: string
}

export const HERO_VIDEOS: Record<string, HeroVideo> = {
  tessan: { src: '/videos/hero/tessan-v3.mp4' },
  'tessan-app': { src: '/videos/hero/tessan-app-v3.mp4' },
  'tessan-os': { src: '/videos/hero/tessan-os.mp4' },
  'tessan-systeme': { src: '/videos/hero/tessan-systeme.mp4' },
  toolkit: { src: '/videos/hero/toolkit.mp4' },
  androidwear: { src: '/videos/hero/androidwear.mp4' },
  'france-vae': { src: '/videos/hero/france-vae.mp4' },
  connect: { src: '/videos/hero/connect.mp4' },
  pagesjaunes: { src: '/videos/hero/pagesjaunes.mp4' },
  dailymotion: { src: '/videos/hero/dailymotion.mp4' },
  sqool: { src: '/videos/hero/sqool.mp4' },
  'sqool-classe': { src: '/videos/hero/sqool-classe.mp4' },
}
