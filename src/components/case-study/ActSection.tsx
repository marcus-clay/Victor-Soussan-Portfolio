import type { ReactNode } from 'react'
import Reveal from '@/components/ui/Reveal'

interface ActHeaderProps {
  /** Act number ("01"): the order of a case study carries meaning, so it is shown */
  index: string
  title: string
  /** Optional one-paragraph lead under the title */
  lead?: string
}

/**
 * The opening of an act: a hairline across the container, the act number in the left
 * gutter and the title on the text edge. Every section of every case study starts
 * with it, so acts read as the same kind of thing (similarity) and the number gutter
 * draws a continuous vertical edge down the page (continuity).
 */
export function ActHeader({ index, title, lead }: ActHeaderProps) {
  return (
    <>
      <ActRule />
      <div className="act-text pt-9 md:pt-14 pb-8 md:pb-12">
        <Reveal as="span" className="block md:absolute md:left-[var(--pad)] md:top-[3.95rem] mb-3 md:mb-0 text-xs font-medium text-gray-500 tabular-nums">
          {index}
        </Reveal>
        <Reveal as="h2" className="text-subhead text-gray-900 max-w-[26ch]">{title}</Reveal>
        {lead && <Reveal as="p" className="mt-5 text-lead-lg text-gray-900 max-w-[40ch]">{lead}</Reveal>}
      </div>
    </>
  )
}

/** Hairline across the container: first child of every act */
export function ActRule() {
  return (
    <div className="wrap" aria-hidden="true">
      {/* The line draws itself from the left as the act comes into view */}
      <Reveal kind="line" className="border-t border-gray-100" />
    </div>
  )
}

/**
 * Act number and title, for pages that keep their own `act-text` wrapper around the
 * header: the number sits in the left gutter, the title on the text edge.
 */
export function ActTitle({ index, title }: { index: string; title: string }) {
  return (
    <>
      <Reveal as="span" className="block md:absolute md:left-[var(--pad)] md:top-[3.95rem] mb-3 md:mb-0 text-xs font-medium text-gray-500 tabular-nums">
        {index}
      </Reveal>
      <Reveal as="h2" className="text-subhead text-gray-900 max-w-[26ch] mb-5">{title}</Reveal>
    </>
  )
}

/** Reading column body: 18px, paragraphs spaced, sub-headings as h3. */
export function Prose({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className="act-text">
      <Reveal className={`max-w-[62ch] text-base text-gray-600 [&>p+p]:mt-5 [&>h3]:mt-10 [&>h3]:mb-2 [&>h3:first-child]:mt-0 [&>h3]:text-title-3 [&>h3]:text-gray-900 ${className}`}>
        {children}
      </Reveal>
    </div>
  )
}

/** One design decision: the question as an h3, then the reasoning in the reading column. */
export function DecisionBlock({ id, title, paragraphs }: { id: string; title: string; paragraphs: string[] }) {
  return (
    <Reveal id={id} className="act-text mb-12 md:mb-16 last:mb-0 scroll-mt-24">
      <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{title}</h3>
      <div className="max-w-[62ch] text-base text-gray-600 [&>p+p]:mt-4">
        {paragraphs.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
    </Reveal>
  )
}

/** One shipped module: h3 and optional lead in the reading column, its media below. */
export function Scene({ id, title, lead, children }: { id?: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <div id={id} className="mb-16 md:mb-24 last:mb-0 scroll-mt-24">
      <Reveal className="act-text mb-6 md:mb-8">
        <h3 className="text-title-3 text-gray-900 mb-3">{title}</h3>
        {lead && <p className="max-w-[62ch] text-base text-gray-600">{lead}</p>}
      </Reveal>
      {children}
    </div>
  )
}
