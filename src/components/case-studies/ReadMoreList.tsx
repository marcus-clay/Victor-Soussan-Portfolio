import React, { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Plus, Minus } from '@phosphor-icons/react';

interface ReadMoreListProps {
  children: React.ReactNode;
  /** Number of items visible before collapsing. Defaults to 2. */
  initialCount?: number;
  /** Label for expand trigger. Defaults to "N more" / "N de plus". */
  expandLabel?: string;
  /** Label for collapse trigger. Defaults to "Show less" / "Réduire". */
  collapseLabel?: string;
  /** Language of the default labels. */
  lang?: 'en' | 'fr';
  className?: string;
}

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/**
 * ReadMoreList: inline expand for divide-y lists.
 *
 * Shows the first `initialCount` children. If there are more, renders
 * a Framer Motion animated section for the remainder with a +/− toggle.
 * Only renders the toggle UI when there are hidden items.
 */
const ReadMoreList: React.FC<ReadMoreListProps> = ({
  children,
  initialCount = 2,
  expandLabel,
  collapseLabel,
  lang = 'en',
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const overflowId = useId();
  const prefersReduced = useReducedMotion();

  const allChildren = React.Children.toArray(children);
  const visible = allChildren.slice(0, initialCount);
  const hidden = allChildren.slice(initialCount);

  if (hidden.length === 0) {
    // Nothing to collapse: render as-is
    return <div className={className}>{children}</div>;
  }

  const hiddenCount = hidden.length;
  const defaultExpandLabel = lang === 'fr' ? `${hiddenCount} de plus` : `${hiddenCount} more`;
  const defaultCollapseLabel = lang === 'fr' ? 'Réduire' : 'Show less';

  return (
    <div className={className}>
      {/* Always-visible items */}
      {visible}

      {/* Collapsible overflow: always in the DOM (find-in-page and crawlers see it), hidden from
          the tab order and the accessibility tree while collapsed */}
      <motion.div
        id={overflowId}
        initial={false}
        animate={
          isExpanded
            ? { height: 'auto', opacity: 1, visibility: 'visible' }
            : { height: 0, opacity: 0, transitionEnd: { visibility: 'hidden' } }
        }
        transition={
          prefersReduced
            ? { duration: 0 }
            : isExpanded
              ? {
                  height: { duration: 0.22, ease: EASE_OUT },
                  opacity: { duration: 0.18, ease: EASE_OUT },
                }
              : {
                  // Closing answers faster than opening (about 75% of the enter duration)
                  height: { duration: 0.17, ease: EASE_OUT },
                  opacity: { duration: 0.12, ease: EASE_OUT },
                }
        }
        style={{ overflow: 'hidden' }}
      >
        {hidden}
      </motion.div>

      {/* Toggle trigger: rendered as a divide-y row for visual consistency */}
      <div className="border-t border-gray-100 pt-3 pb-1">
        <button
          type="button"
          onClick={() => setIsExpanded(v => !v)}
          aria-expanded={isExpanded}
          aria-controls={overflowId}
          className="inline-flex items-center gap-1.5 min-h-11 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-150 active:scale-[0.97]"
        >
          {isExpanded
            ? <Minus size={12} weight="bold" />
            : <Plus size={12} weight="bold" />
          }
          {isExpanded
            ? (collapseLabel ?? defaultCollapseLabel)
            : (expandLabel ?? defaultExpandLabel)
          }
        </button>
      </div>
    </div>
  );
};

export default ReadMoreList;
