import React from 'react'
import { GithubLogo } from '@phosphor-icons/react/ssr'

/**
 * The controls of the Claude pages (landing, catalogue, skill pages), written once on the conventions of the rest of
 * the site (contact page, footer, home blocks): the black pill with `.btn-dark`, the text link with a `.link-line`
 * label, the row that tints on hover. One definition, so that a state changes everywhere at once.
 */

/** Black pill, the one primary action of a page */
export const PILL =
  'btn-dark inline-flex items-center gap-2 min-h-11 px-5 rounded-full bg-gray-900 [@media(hover:hover)]:hover:bg-black text-white text-sm font-medium active:scale-[0.97] transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'

/** Text link: ink at rest, grey on hover, 44 px tall hit area, presses on tap. Put the label in `<span className="link-line">`. */
export const TEXT_LINK =
  'inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97] transition-[color,transform] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 rounded-sm'

/** Same link, quieter: grey at rest, ink on hover */
export const TEXT_LINK_MUTED =
  'inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-gray-500 [@media(hover:hover)]:hover:text-gray-900 active:scale-[0.97] transition-[color,transform] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 rounded-sm'

/** A row that leads to a page: tints on hover, its arrow moves a few pixels the way it points */
export const ROW =
  'group -mx-3 flex items-start justify-between gap-6 rounded-lg px-3 py-5 transition-colors duration-150 [@media(hover:hover)]:hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-900 md:py-6'

export const ROW_ARROW = 'mt-1 shrink-0 text-gray-500 transition-[transform,color] duration-300 ease-out group-hover:translate-x-1 group-hover:text-gray-900'

/** "owner/repo" of a GitHub address, or the host of any other */
export function repoName(href: string): string {
  try {
    const u = new URL(href)
    if (u.hostname === 'github.com') return u.pathname.split('/').filter(Boolean).slice(0, 2).join('/')
    return u.hostname.replace(/^www\./, '')
  } catch {
    return href
  }
}

/**
 * The link to a repository: the name of the repo, with the GitHub mark in light grey before it (a little darker on
 * hover). Opens in a new tab. Any other address shows its host, without the mark.
 */
export function RepoLink({ href, muted = false, className = '' }: { href: string; muted?: boolean; className?: string }) {
  const github = href.includes('github.com')
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`group ${muted ? TEXT_LINK_MUTED : TEXT_LINK} ${className}`}>
      {github && <GithubLogo size={16} weight="fill" aria-hidden="true" className="shrink-0 text-gray-400 transition-colors duration-150 [@media(hover:hover)]:group-hover:text-gray-600" />}
      <span className="link-line">{repoName(href)}</span>
    </a>
  )
}

/** The tag of what is new: soft green fill (the emerald of the accent palette), deep green text, no dot. */
export function NewTag({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full bg-[#DDF5E9] px-2.5 py-0.5 text-[11px] font-semibold leading-5 text-[#0F5132]">{children}</span>
}
