import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, Minus } from '@phosphor-icons/react';

export interface AccordionPhase {
  title: string;
  period?: string;
  goal?: string;
  deliverables: string[];
}

interface PhaseAccordionProps {
  phases: AccordionPhase[];
}

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/**
 * PhaseAccordion — collapsible phase list for case study journey sections.
 *
 * Each phase shows as a clickable header (title + period + deliverable count + +/− toggle).
 * The first phase is open by default; all others are collapsed.
 * Each phase can be toggled independently.
 * Deliverable count badge is shown only when the phase is collapsed.
 */
const PhaseAccordion: React.FC<PhaseAccordionProps> = ({ phases }) => {
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set([0]));
  const prefersReduced = useReducedMotion();

  const toggle = (idx: number) => {
    setOpenSet(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="divide-y divide-gray-100">
      {phases.map((phase, idx) => {
        const isOpen = openSet.has(idx);
        const count = phase.deliverables.length;

        return (
          <div key={idx}>
            {/* Header row — clickable trigger */}
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 py-3 -mx-3 px-3 rounded-lg text-left transition-[background-color,transform] duration-150 hover:bg-gray-100 active:scale-[0.995]"
            >
              <div className="flex items-baseline gap-3 min-w-0">
                <span className="text-sm font-medium text-gray-900">
                  {phase.title}
                </span>
                {phase.period && (
                  <span className="text-xs text-gray-400 shrink-0">{phase.period}</span>
                )}
                {/* Count badge — visible only when collapsed */}
                <AnimatePresence initial={false}>
                  {!isOpen && (
                    <motion.span
                      key="badge"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={prefersReduced ? { duration: 0 } : { duration: 0.12 }}
                      className="text-xs text-gray-400 shrink-0 tabular-nums"
                    >
                      {count} {count === 1 ? 'item' : 'items'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* +/− icon */}
              <span className="shrink-0 text-gray-400 w-4 h-4 flex items-center justify-center">
                {isOpen
                  ? <Minus size={13} weight="bold" />
                  : <Plus size={13} weight="bold" />
                }
              </span>
            </button>

            {/* Collapsible content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
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
                  <div className="pb-5">
                    {phase.goal && (
                      <p className="text-sm text-gray-500 mb-3 max-w-[65ch]">{phase.goal}</p>
                    )}
                    <div className="divide-y divide-gray-100">
                      {phase.deliverables.map((item, dIdx) => (
                        <div
                          key={dIdx}
                          className="py-2.5 text-sm text-gray-500 leading-relaxed"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default PhaseAccordion;
