'use client'

/**
 * Copy-link button of a section title, as in Notion or Confluence: a small link icon after the title, shown
 * when the pointer is on the title (the title carries `group/h`) or when the button has keyboard focus. A click
 * copies the address of the section (the page plus the id of the nearest section around the title) and the
 * icon becomes a check for a moment, with "Link copied" beside it.
 *
 * Motion: the icon appears in 150ms (opacity and a 2px slide); the swap to the check is a cross-fade with a
 * 2px blur and a slight scale (icon swap, 200ms). Without a hover pointer the button stays out of sight but
 * reachable by keyboard.
 */

import { useEffect, useRef, useState } from 'react'
import { Check, LinkSimple } from '@phosphor-icons/react'
import { useVideoLang } from '@/components/media/videoLabels'

const COPY = {
  fr: { copy: 'Copier le lien de cette section', copied: 'Lien copié' },
  en: { copy: 'Copy the link to this section', copied: 'Link copied' },
} as const

const SWAP = 'col-start-1 row-start-1 transition-[opacity,filter,transform] duration-200 ease-out'

export default function HeadingAnchor({ id }: { id?: string }) {
  const ref = useRef<HTMLButtonElement>(null)
  const [target, setTarget] = useState<string | null>(id ?? null)
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const copy = COPY[useVideoLang()]

  // Without an explicit id, the <section id> around the title gives the address (none, no button)
  useEffect(() => {
    if (id) return
    const section = ref.current?.parentElement?.closest<HTMLElement>('section[id]')
    setTarget(section?.id ?? null)
  }, [id])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  if (!target && !id) return <span ref={ref as unknown as React.Ref<HTMLSpanElement>} hidden />

  const onCopy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${target}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      return
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <span className="relative ml-2 inline-flex items-center align-middle">
      <button
        ref={ref}
        type="button"
        onClick={onCopy}
        aria-label={copy.copy}
        className={`grid size-8 place-items-center rounded-md text-gray-400 transition-[opacity,transform,background-color,color] duration-150 ease-out focus-visible:opacity-100 focus-visible:translate-x-0 [@media(hover:hover)]:hover:bg-gray-100 [@media(hover:hover)]:hover:text-gray-900 active:scale-[0.94] ${
          copied ? 'opacity-100 translate-x-0' : '-translate-x-0.5 opacity-0 [@media(hover:hover)]:group-hover/h:translate-x-0 [@media(hover:hover)]:group-hover/h:opacity-100'
        }`}
      >
        <LinkSimple size={16} weight="bold" aria-hidden="true" className={`${SWAP} ${copied ? 'scale-75 opacity-0 blur-[2px]' : 'scale-100 opacity-100 blur-0'}`} />
        <Check size={16} weight="bold" aria-hidden="true" className={`${SWAP} text-gray-900 ${copied ? 'scale-100 opacity-100 blur-0' : 'scale-75 opacity-0 blur-[2px]'}`} />
      </button>
      <span
        role="status"
        className={`pointer-events-none absolute left-full ml-1.5 whitespace-nowrap text-xs font-medium text-gray-500 transition-[opacity,transform] duration-200 ease-out ${copied ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'}`}
      >
        {copied ? copy.copied : ''}
      </span>
    </span>
  )
}
