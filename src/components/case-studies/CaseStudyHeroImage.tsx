/**
 * Hero visual of a case study: fixed 3:2 frame, white background (dark for RiskOS), and a
 * real button that opens the page lightbox. The frame is fixed so every hero has the same
 * footprint and nothing shifts while the image loads.
 *
 * `fit="top"` is for a tall visual (a full page capture): it is cropped to its top in the
 * frame, and the lightbox shows it whole.
 */
export default function CaseStudyHeroImage({
  src,
  alt,
  onOpen,
  lang = 'fr',
  tone = 'light',
  fit = 'contain',
  caption,
  className = '',
}: {
  src: string
  alt: string
  onOpen: () => void
  lang?: 'en' | 'fr'
  tone?: 'light' | 'dark'
  fit?: 'contain' | 'top'
  caption?: string
  className?: string
}) {
  const dark = tone === 'dark'
  return (
    <figure className={className}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={lang === 'fr' ? `Agrandir l’image : ${alt}` : `Enlarge image: ${alt}`}
        className={`group relative block w-full aspect-[3/2] overflow-hidden rounded-xl cursor-zoom-in ring-1 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5CF3] focus-visible:ring-offset-2 ${
          dark
            ? 'bg-[#111111] ring-white/[0.06] hover:ring-white/[0.12] focus-visible:ring-offset-[#0a0a0a]'
            : 'bg-white ring-black/[0.04] hover:ring-black/[0.08]'
        }`}
      >
        <img
          loading="lazy"
          src={src}
          alt={alt}
          className={`absolute inset-0 h-full w-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02] ${
            fit === 'top' ? 'object-cover object-top' : 'object-contain'
          }`}
        />
      </button>
      {caption && <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">{caption}</figcaption>}
    </figure>
  )
}
