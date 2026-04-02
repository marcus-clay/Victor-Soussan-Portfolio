import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, Minus } from '@phosphor-icons/react';

interface ReadMoreListProps {
  children: React.ReactNode;
  /** Number of items visible before collapsing. Defaults to 2. */
  initialCount?: number;
  /** Label for expand trigger. Defaults to "Show more". */
  expandLabel?: string;
  /** Label for collapse trigger. Defaults to "Show less". */
  collapseLabel?: string;
  className?: string;
}

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/**
 * ReadMoreList — inline expand for divide-y lists.
 *
 * Shows the first `initialCount` children. If there are more, renders
 * a Framer Motion animated section for the remainder with a +/− toggle.
 * Only renders the toggle UI when there are hidden items.
 */
const ReadMoreList: React.FC<ReadMoreListProps> = ({
  children,
  initialCount = 2,
  expandLabel,
  collapseLabel = 'Show less',
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const prefersReduced = useReducedMotion();

  const allChildren = React.Children.toArray(children);
  const visible = allChildren.slice(0, initialCount);
  const hidden = allChildren.slice(initialCount);

  if (hidden.length === 0) {
    // Nothing to collapse — render as-is
    return <div className={className}>{children}</div>;
  }

  const hiddenCount = hidden.length;
  const defaultExpandLabel = `${hiddenCount} more`;

  return (
    <div className={className}>
      {/* Always-visible items */}
      {visible}

      {/* Collapsible overflow */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="overflow"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : {
                    height: { duration: 0.22, ease: EASE_OUT },
                    opacity: { duration: 0.18, ease: EASE_OUT },
                  }
            }
            style={{ overflow: 'hidden' }}
          >
            {hidden}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle trigger — rendered as a divide-y row for visual consistency */}
      <div className="border-t border-gray-100 pt-3 pb-1">
        <button
          type="button"
          onClick={() => setIsExpanded(v => !v)}
          aria-expanded={isExpanded}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors duration-150 active:scale-[0.97]"
        >
          {isExpanded
            ? <Minus size={12} weight="bold" />
            : <Plus size={12} weight="bold" />
          }
          {isExpanded
            ? collapseLabel
            : (expandLabel ?? defaultExpandLabel)
          }
        </button>
      </div>
    </div>
  );
};

export default ReadMoreList;
