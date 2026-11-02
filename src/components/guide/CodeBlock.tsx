import React from 'react'
import CopyButton from './CopyButton'

interface Props {
  code: string
  lang: 'en' | 'fr'
  /** File name or path shown above the code */
  file?: string
  caption?: string
  /** Show the Copy button (commands and prompts yes, long extracts no) */
  copy?: boolean
}

/** A dark code block with its file name on top and an optional Copy button. Server-compatible. */
export default function CodeBlock({ code, lang, file, caption, copy = false }: Props) {
  return (
    <figure className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#18181b]">
      {(file || copy) && (
        <figcaption className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-2">
          <span className="min-w-0 truncate font-mono text-xs text-gray-400">
            {file}
            {caption ? <span className="ml-2 font-sans text-gray-500">{caption}</span> : null}
          </span>
          {copy && <CopyButton text={code} lang={lang} tone="dark" label={file} />}
        </figcaption>
      )}
      <pre className="overflow-x-auto p-4 text-xs leading-[1.7] text-[#e4e4e7] md:p-5" tabIndex={0}>
        <code>{code}</code>
      </pre>
    </figure>
  )
}
