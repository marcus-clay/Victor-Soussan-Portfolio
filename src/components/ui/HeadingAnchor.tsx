'use client'

/**
 * Share control of a section title, as in Notion or Confluence: a small link icon after the title, shown
 * when the pointer is on the title (the title carries `group/h`) or when the button has keyboard focus.
 * A click opens the same share control as the rest of the site (the browser's share sheet, or the menu with
 * "Copy link", LinkedIn and e-mail) for the address of the section: the page plus the id of the nearest
 * section around the title.
 *
 * Motion: the icon appears in 150ms (opacity and a 2px slide). Without a hover pointer (phones, tablets) the
 * icon is always there, quiet, so the control can be found; with a keyboard it is reachable in the tab order.
 */

import { useEffect, useRef, useState } from 'react'
import { LinkSimple } from '@phosphor-icons/react'
import { useVideoLang } from '@/components/media/videoLabels'
import ShareButton from '@/components/share/ShareButton'

const LABEL = {
  fr: 'Partager cette section',
  en: 'Share this section',
} as const

export default function HeadingAnchor({ id, title }: { id?: string; title?: string }) {
  const probe = useRef<HTMLSpanElement>(null)
  const [target, setTarget] = useState<string | null>(id ?? null)
  const [pinned, setPinned] = useState(false)
  const lang = useVideoLang()

  // Without an explicit id, the <section id> around the title gives the address (none, no button)
  useEffect(() => {
    if (id) return
    const section = probe.current?.parentElement?.closest<HTMLElement>('section[id]')
    setTarget(section?.id ?? null)
  }, [id])

  if (!target) return <span ref={probe} hidden />

  return (
    <span className="relative ml-1 inline-flex items-center align-middle -my-3">
      <ShareButton
        target="section"
        hash={target}
        title={title}
        variant="custom"
        label={LABEL[lang]}
        onOpenChange={setPinned}
        className={`grid size-10 place-items-center rounded-full text-gray-400 transition-[opacity,transform,background-color,color] duration-150 ease-out focus-visible:opacity-100 focus-visible:translate-x-0 [@media(hover:hover)]:hover:bg-gray-100 [@media(hover:hover)]:hover:text-gray-900 active:scale-[0.94] ${
          pinned
            ? 'opacity-100 translate-x-0 text-gray-900'
            : 'opacity-100 [@media(hover:hover)]:-translate-x-0.5 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/h:translate-x-0 [@media(hover:hover)]:group-hover/h:opacity-100'
        }`}
      >
        <LinkSimple size={16} weight="bold" aria-hidden="true" />
      </ShareButton>
    </span>
  )
}
