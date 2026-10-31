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
/**
 * Hovering an animated visual brings its mockups closer as the loop starts, 300 ms on a strong
 * ease-out (`ease-media`, the curve of every image hover of the site), for the picture and its loop alike (HeroLoop reads the same duration and curve).
 * Individual `scale` property, so it composes with the scroll-linked settle of the hero and with the
 * transforms of the cards. Needs a `group` on the panel.
 */
export const HOVER_ZOOM_MS = 300
export const HOVER_ZOOM_EASE = 'cubic-bezier(0.23, 1, 0.32, 1)'
const HOVER_ZOOM_MOTION = 'transition-[transform,scale] duration-300 ease-media'

/** Case study hero and featured projects of the home page: the cover framing at rest, 105% on hover */
export const HERO_HOVER_ZOOM = `${HOVER_ZOOM_MOTION} [@media(hover:hover)_and_(pointer:fine)]:group-hover:[scale:1.05]`

/** Work page: covers at their full size at rest, 105% on hover */
export const WORK_CARD_ZOOM = `${HOVER_ZOOM_MOTION} [@media(hover:hover)_and_(pointer:fine)]:group-hover:[scale:1.05]`

export interface HeroVideo {
  src: string
  /**
   * For a cover that shows the device in perspective: the four corners of its screen (top left, top right,
   * bottom right, bottom left), as shares of the 3:2 cover, and the screen's width-to-height ratio. The loop
   * then plays inside that screen, at the same angle, instead of over the whole picture.
   */
  screen?: { corners: [number, number][]; ratio: number }
  /** Screens of the cover animated in code over the loop (the devices the video leaves still) */
  overlay?: 'pagesjaunes'
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
  // The video animates the phone; the tablet and the laptop are animated in code (PagesJaunesScreens)
  pagesjaunes: { src: '/videos/hero/pagesjaunes-v2.mp4', overlay: 'pagesjaunes' },
  dailymotion: { src: '/videos/hero/dailymotion-v2.mp4' },
  // iPad Pro 11 in perspective (cover-riskos-ipad.webp, 2200 × 1467): corners measured on the picture
  riskos: {
    src: '/videos/hero/riskos.mp4',
    screen: { corners: [[325 / 2200, 212 / 1467], [1567 / 2200, 257 / 1467], [1865 / 2200, 1320 / 1467], [632 / 2200, 1325 / 1467]], ratio: 1.43 },
  },
  sqool: { src: '/videos/hero/sqool-v2.mp4' },
  'sqool-classe': { src: '/videos/hero/sqool-classe-v2.mp4' },
}
