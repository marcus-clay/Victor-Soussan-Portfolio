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

const GUIDE = '/guide/claude-code/'

/** The same page in the other language: the prefix swapped, and a guide chapter's slug translated */
export function otherLangPath(pathname: string, lang: 'en' | 'fr', other: 'en' | 'fr') {
  let rest = pathname.replace(new RegExp(`^/${lang}`), '')
  if (rest.startsWith(GUIDE)) {
    const slug = rest.slice(GUIDE.length)
    const pair = GUIDE_SLUG_PAIRS.find(([en, fr]) => (lang === 'en' ? en : fr) === slug)
    if (pair) rest = GUIDE + (other === 'en' ? pair[0] : pair[1])
  }
  return `/${other}${rest}`
}
