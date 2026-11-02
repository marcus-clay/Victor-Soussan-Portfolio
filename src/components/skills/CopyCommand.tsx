'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Check, Copy } from '@phosphor-icons/react'
import './copy-command.css'

/**
 * A command in a code block, with one button to copy it. The block scrolls sideways when the command is long.
 * The button holds its two states (Copy, Copied) stacked in one place and cross-fades them with a short blur, so the
 * button never changes width and the label does not jump; "Copied" stays two seconds and is announced to screen readers.
 */
export default function CopyCommand({ command, label, copiedLabel }: { command: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command)
    } catch {
      return
    }
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-stretch overflow-hidden rounded-xl border border-gray-200 bg-white">
      <pre className="min-w-0 flex-1 overflow-x-auto px-4 py-3.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <code className="whitespace-pre font-mono text-[13px] leading-relaxed text-gray-900">{command}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        className="flex shrink-0 cursor-pointer items-center justify-center border-l border-gray-200 px-4 text-xs font-medium text-gray-900 transition-[background-color,transform] duration-150 ease-out active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gray-900 [@media(hover:hover)]:hover:bg-gray-50"
      >
        <span className="cc-states">
          <span className="cc-state" data-on={!copied || undefined} aria-hidden={copied || undefined}>
            <Copy size={14} aria-hidden="true" />
            {label}
          </span>
          <span className="cc-state" data-on={copied || undefined} aria-hidden={!copied || undefined}>
            <Check size={14} weight="bold" aria-hidden="true" />
            {copiedLabel}
          </span>
        </span>
        <span className="sr-only" aria-live="polite">{copied ? copiedLabel : ''}</span>
      </button>
    </div>
  )
}
