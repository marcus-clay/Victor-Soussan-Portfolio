import React from 'react'
import Reveal from '@/components/ui/Reveal'

interface HomeBlockProps {
  id?: string
  title: string
  /** Short line under the title, in the left column */
  note?: string
  children: React.ReactNode
}

/**
 * One block of the homepage below the filmstrip: a hairline across the page margins, the title
 * in the left column, the content in the right one (12-column grid, same as the case studies).
 * Single column below md.
 */
export default function HomeBlock({ id, title, note, children }: HomeBlockProps) {
  const titleId = id ? `${id}-title` : undefined
  return (
    <section id={id} aria-labelledby={titleId} className="pb-16 md:pb-28">
      <div className="wrap">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6 border-t border-gray-200 pt-6 md:pt-8">
          <Reveal className="col-span-12 md:col-span-3">
            <h2 id={titleId} className="text-title-2 text-gray-900">
              {title}
            </h2>
            {note && <p className="mt-3 max-w-[30ch] text-sm text-gray-500">{note}</p>}
          </Reveal>
          <Reveal className="col-span-12 md:col-span-9">{children}</Reveal>
        </div>
      </div>
    </section>
  )
}
