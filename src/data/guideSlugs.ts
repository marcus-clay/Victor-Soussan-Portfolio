/**
 * The translated addresses of the guide chapters, [english, french], for the language switch of the site
 * header: small enough for every page, unlike the guide itself. The chapter route checks at build time that
 * this table matches GUIDE_CHAPTERS, so it cannot drift.
 */
export const GUIDE_SLUG_PAIRS: [en: string, fr: string][] = [
  ['understanding', 'comprendre'],
  ['setup', 'environnement'],
  ['getting-started', 'approches'],
  ['stack', 'stack'],
  ['iterating', 'iterer'],
  ['deploying', 'deployer'],
  ['going-further', 'aller-plus-loin'],
  ['visual-quality', 'resultat-visuel'],
  ['skills', 'skills'],
]

import { TEMPLATE_SLUG_PAIRS } from './templatesData'

const GUIDE = '/guide/claude-code/'
const TEMPLATE = '/ressources/'

/** The same page in the other language: the prefix swapped, and a translated slug (guide chapters, templates) swapped */
export function otherLangPath(pathname: string, lang: 'en' | 'fr', other: 'en' | 'fr') {
  let rest = pathname.replace(new RegExp(`^/${lang}`), '')
  const translated: [prefix: string, pairs: [string, string][]][] = [[GUIDE, GUIDE_SLUG_PAIRS], [TEMPLATE, TEMPLATE_SLUG_PAIRS]]
  for (const [prefix, pairs] of translated) {
    if (!rest.startsWith(prefix)) continue
    const slug = rest.slice(prefix.length)
    const pair = pairs.find(([en, fr]) => (lang === 'en' ? en : fr) === slug)
    if (pair) rest = prefix + (other === 'en' ? pair[0] : pair[1])
  }
  return `/${other}${rest}`
}
