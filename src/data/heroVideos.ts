/**
 * Looping hero videos, by project id: the home cards and the case study hero panel play them over the
 * cover picture (which stays the poster and the fallback). One entry per project, added when its file exists.
 * Files live in `public/videos/hero/<id>.mp4`: H.264, no audio, exactly 3:2, about 8 to 12 seconds, a seamless loop.
 *
 * The first frame must have the cover picture's framing: same position and same size of the content
 * (measured on the bounding box of what is not ground, within 1 to 2%). The video fades in over the picture,
 * so any difference of scale shows as the picture shrinking or growing the moment the loop starts.
 * Rename a file (`-v2`) when it is re-encoded, so browsers and the CDN do not serve the old one.
 */
export interface HeroVideo {
  src: string
}

export const HERO_VIDEOS: Record<string, HeroVideo> = {
  tessan: { src: '/videos/hero/tessan-v6.mp4' },
  'tessan-app': { src: '/videos/hero/tessan-app-v3.mp4' },
  'tessan-os': { src: '/videos/hero/tessan-os.mp4' },
  'tessan-systeme': { src: '/videos/hero/tessan-systeme.mp4' },
  toolkit: { src: '/videos/hero/toolkit.mp4' },
  androidwear: { src: '/videos/hero/androidwear-v2.mp4' },
  'france-vae': { src: '/videos/hero/france-vae-v2.mp4' },
  connect: { src: '/videos/hero/connect-v2.mp4' },
  pagesjaunes: { src: '/videos/hero/pagesjaunes-v2.mp4' },
  dailymotion: { src: '/videos/hero/dailymotion-v2.mp4' },
  riskos: { src: '/videos/hero/riskos.mp4' },
  sqool: { src: '/videos/hero/sqool-v2.mp4' },
  'sqool-classe': { src: '/videos/hero/sqool-classe-v2.mp4' },
}
