import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { imgDims } from '@/utils/imageDimensions'
import { HERO_VIDEOS } from '@/data/heroVideos'
import HeroLoop from '@/components/media/HeroLoop'
import ArrowPill from '@/components/ui/ArrowPill'

/**
 * Follow-up content at the bottom of a page (next project, related articles, next guide).
 * One principle for every page: a short heading and at most three whole-card links (the next
 * item first, then one or two related ones: Miller and Hick).
 *
 * One card anatomy, with or without a picture (common region: one white container, one level):
 * - an optional cover at the top, flush with the card edges;
 * - below it, a small label, the title with a plain arrow at its end, two lines of description.
 * Without a cover the card is the same container reduced to its text, so a row that mixes both
 * still reads as one set. The whole card is the hit area, and it presses on tap.
 */

export interface RelatedItem {
  href: string
  title: string
  /** Small line above the title: the kind of content, a role */
  label?: string
  /** Two lines at most are shown */
  description?: string
  /** Cover image; without it the card is text only */
  cover?: {
    src: string
    /** Ground behind a contained image */
    tone?: string
    fit?: 'cover' | 'contain'
    position?: string
    /** Looping hero video; found from the href of a project card when left out (see `heroLoopFor`) */
    video?: string
  }
  /** Opens in a new tab (templates hosted elsewhere) */
  external?: boolean
}

interface RelatedContentProps {
  heading: string
  items: RelatedItem[]
  /** Anchor id, so a link can reach the block */
  id?: string
  /** A quiet link opposite the heading, for the full list ("All projects") */
  action?: { label: string; href: string }
  /** Hairline above the block. Turn it off when a tinted band already ends right above */
  bordered?: boolean
  /** Sit in the content column (case studies, Approche, Contact) instead of the full wrap */
  inColumn?: boolean
}

const MAX_ITEMS = 3

/** Columns from md up by number of items, so two cards never leave an empty column */
const COLUMNS: Record<number, string> = {
  1: 'md:max-w-[420px]',
  2: 'md:grid-cols-2 md:max-w-[700px]',
  3: 'md:grid-cols-3',
}

const CARD_CLASS =
  'group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white outline-offset-4 ' +
  'transition-[transform,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.985] ' +
  '[@media(hover:hover)]:hover:border-gray-200'

const PROJECT_HREF = /^\/(?:en|fr)\/project\/([^/?#]+)\/?$/

/** The hero loop of the project a card points to, when its file exists in the registry */
function heroLoopFor(item: RelatedItem): { src: string } | null {
  const match = item.external ? null : PROJECT_HREF.exec(item.href)
  if (!match) return null
  const src = item.cover?.video ?? HERO_VIDEOS[match[1]]?.src
  return src ? { src } : null
}

export default function RelatedContent({ heading, items, id, action, bordered = true, inColumn = false }: RelatedContentProps) {
  const shown = items.slice(0, MAX_ITEMS)
  if (shown.length === 0) return null
  const headingId = `${id ?? 'related'}-heading`

  return (
    <section id={id} aria-labelledby={headingId} className={bordered ? 'border-t border-gray-100' : undefined}>
      <div className={`${inColumn ? 'act-wide' : 'wrap'} pt-12 md:pt-16 pb-16 md:pb-24`}>
        <div className="mb-8 md:mb-10 flex items-baseline justify-between gap-4">
          <h2 id={headingId} className="text-title-2 text-gray-900">
            {heading}
          </h2>
          {action && (
            <Link
              href={action.href}
              className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-medium text-gray-900 transition-[color,transform] duration-150 ease-out active:scale-[0.97] [@media(hover:hover)]:hover:text-gray-500"
            >
              {action.label} <ArrowRight size={12} weight="bold" aria-hidden="true" />
            </Link>
          )}
        </div>
        <ul className={`grid grid-cols-1 gap-4 md:gap-6 ${COLUMNS[shown.length]}`}>
          {shown.map((item) => (
            <li key={item.href} className="min-w-0">
              <RelatedCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function RelatedCard({ item }: { item: RelatedItem }) {
  const body = (
    <>
      {item.cover && <Cover cover={item.cover} loop={heroLoopFor(item)} />}
      <div className={`flex flex-1 flex-col p-5 md:p-6 ${item.cover ? '' : 'min-h-[8.5rem]'}`}>
        {item.label && <p className="text-xs text-gray-500">{item.label}</p>}
        <div className={`${item.label ? 'mt-1' : ''} flex items-start justify-between gap-3`}>
          <h3 className="text-title-3 text-gray-900">{item.title}</h3>
          <span
            aria-hidden="true"
            className="mt-1 shrink-0 text-gray-500 transition-[transform,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:translate-x-0.5 [@media(hover:hover)]:group-hover:text-gray-900"
          >
            {item.external ? <ArrowUpRight size={16} weight="bold" /> : <ArrowRight size={16} weight="bold" />}
          </span>
        </div>
        {item.description && <p className="mt-1.5 text-sm text-gray-600 line-clamp-2">{item.description}</p>}
      </div>
    </>
  )

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={CARD_CLASS} draggable={false}>
        {body}
      </a>
    )
  }
  return (
    <Link href={item.href} className={CARD_CLASS} draggable={false}>
      {body}
    </Link>
  )
}

function Cover({ cover, loop }: { cover: NonNullable<RelatedItem['cover']>; loop: ReturnType<typeof heroLoopFor> }) {
  const mediaClass = `h-full w-full transition-transform duration-300 ease-media [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03] ${
    cover.fit === 'contain' ? 'object-contain p-[5%]' : 'object-cover'
  }`
  const mediaStyle = cover.position ? { objectPosition: cover.position } : undefined
  return (
    <div className="relative aspect-[3/2] shrink-0 overflow-hidden" style={{ backgroundColor: cover.tone ?? '#E8E8E8' }}>
      <img
        src={cover.src}
        {...imgDims(cover.src)}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        className={mediaClass}
        style={mediaStyle}
      />
      {loop && <HeroLoop src={loop.src} mediaClassName={mediaClass} mediaStyle={mediaStyle} />}
      <ArrowPill size="sm" />
    </div>
  )
}
