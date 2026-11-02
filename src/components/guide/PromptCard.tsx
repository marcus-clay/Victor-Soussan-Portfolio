import React from 'react'
import CopyButton from './CopyButton'

interface Props {
  label: string
  text: string
  lang: 'en' | 'fr'
}

/** "What you tell Claude": a light card with the prompt and a Copy button. Server-compatible. */
export default function PromptCard({ label, text, lang }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-micro font-medium uppercase tracking-[0.08em] text-gray-500">{label}</p>
        <CopyButton text={text} lang={lang} tone="light" label={label} />
      </div>
      <p className="mt-3 text-sm leading-[1.6] text-gray-900">{text}</p>
    </div>
  )
}
