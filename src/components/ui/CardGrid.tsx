import { Children, type ReactNode } from 'react'

type Cols = 2 | 3 | 4 | 'auto'

export interface CardGridProps {
  children: ReactNode
  /**
   * Columns from the breakpoint where the grid opens: 2 (md), 3 (lg), 4 (2 from sm, 4 from lg),
   * 'auto' (2 from sm, 3 from lg). Below that, one column in reading order.
   */
  cols?: Cols
  /** More cards than this go behind a "Show all" button (Miller, Hick). Default 6 */
  max?: number
  /** Text of that button, for example `Show all 8`. Required when there are more than `max` cards */
  moreLabel?: string
  /** Accessible name of the list */
  label?: string
  className?: string
}

const COLS: Record<Cols, string> = {
  2: 'md:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
  auto: 'sm:grid-cols-2 lg:grid-cols-3',
}

const GRID = 'grid gap-4 md:gap-6'

/**
 * A group of cards with equal heights (grid rows stretch) and one gap, 16px on phones and
 * 24px from md. Extra cards beyond `max` wait inside a native `<details>`, so they stay in the
 * page for search and print and nothing needs JavaScript.
 */
export default function CardGrid({
  children,
  cols = 'auto',
  max = 6,
  moreLabel,
  label,
  className = '',
}: CardGridProps) {
  const items = Children.toArray(children)
  const shown = items.slice(0, max)
  const rest = moreLabel ? items.slice(max) : []
  const visible = moreLabel ? shown : items

  return (
    <div className={className}>
      <ul role="list" aria-label={label} className={`${GRID} ${COLS[cols]}`}>
        {visible.map((item, i) => (
          <li key={i} className="flex min-w-0">
            {item}
          </li>
        ))}
      </ul>
      {rest.length > 0 && (
        <details className="group mt-4 md:mt-6">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center rounded-full border border-gray-200 px-5 text-sm font-medium text-gray-900 transition-[color,border-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] group-open:hidden [@media(hover:hover)]:hover:border-gray-300 [@media(hover:hover)]:hover:text-gray-500 [&::-webkit-details-marker]:hidden">
            {moreLabel}
          </summary>
          <ul role="list" className={`${GRID} ${COLS[cols]}`}>
            {rest.map((item, i) => (
              <li key={i} className="flex min-w-0">
                {item}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  )
}
