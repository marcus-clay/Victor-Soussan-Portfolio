/**
 * Case study hero visuals whose original file carries a grey (#E8E8E8) backdrop baked into the
 * image. The hero frame is white, so these have a `_white` twin (same artwork, backdrop and
 * shadow converted to white). Galleries, summaries and cards keep using the original file.
 *
 * Pages resolve the hero through `heroSrc()` and also in `openLightbox`, so a click coming
 * from a gallery card (original src) and a click on the hero (white src) open the same slide.
 */
const WHITE_HERO: Record<string, string> = {
  '/images/connect/connect_overview.webp': '/images/connect/connect_overview_white.webp',
  '/images/sqool/hero_ecosystem_sqool.webp': '/images/sqool/hero_ecosystem_sqool_white.webp',
  '/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.webp':
    '/images/dailymotion/thumbnail_dailymotion_-_web_platform2x_white.webp',
  '/images/toolkit/hero.webp': '/images/toolkit/hero_white.webp',
  '/images/francevae/france_vae_home.webp': '/images/francevae/france_vae_home_white.webp',
}

export function heroSrc(src: string): string {
  return WHITE_HERO[src] ?? src
}
