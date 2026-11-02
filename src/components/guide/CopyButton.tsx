'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Check, Copy } from '@phosphor-icons/react'
import '../skills/copy-command.css'

interface Props {
  /** The text put on the clipboard */
  text: string
  lang: 'en' | 'fr'
  /** `dark` sits on a dark code block, `light` on a white card */
  tone?: 'dark' | 'light'
  /** What is copied, for the accessible name ("Copy the command") */
  label?: string
  className?: string
}

const WORDS = {
  fr: { copy: 'Copier', copied: 'Copié' },
  en: { copy: 'Copy', copied: 'Copied' },
}

const TONES = {
  dark: 'border-white/10 bg-white/[0.06] text-gray-200 [@media(hover:hover)]:hover:bg-white/[0.12]',
  light: 'border-gray-200 bg-white text-gray-700 [@media(hover:hover)]:hover:bg-gray-100',
}

/**
 * A small "Copy" button: puts `text` on the clipboard and says "Copied" for two seconds. The two states are stacked in
 * one place and cross-fade (the same swap as the install command of the skill pages). The state change is announced to screen readers through a polite live region.
 */
export default function CopyButton({ text, lang, tone = 'dark', label, className = '' }: Props) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const w = WORDS[lang]

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Clipboard API refused (insecure context, permissions): fall back to a hidden textarea
      const area = document.createElement('textarea')
      area.value = text
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      try { document.execCommand('copy') } catch { /* nothing more to try */ }
      document.body.removeChild(area)
    }
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
    <button
      type="button"
      onClick={onCopy}
      aria-label={label ? `${w.copy} (${label})` : w.copy}
      className={`inline-flex min-h-9 shrink-0 items-center justify-center rounded-full border px-3 text-xs font-medium transition-[background-color,color,transform] duration-200 ease-out active:scale-[0.97] cursor-pointer ${TONES[tone]} ${className}`}
    >
      <span className="cc-states">
        <span className="cc-state" data-on={!copied || undefined} aria-hidden={copied || undefined}>
          <Copy size={14} aria-hidden="true" />
          {w.copy}
        </span>
        <span className="cc-state" data-on={copied || undefined} aria-hidden={!copied || undefined}>
          <Check size={14} weight="bold" aria-hidden="true" />
          {w.copied}
        </span>
      </span>
    </button>
    <span className="sr-only" role="status" aria-live="polite">{copied ? w.copied : ''}</span>
    </>
  )
}
