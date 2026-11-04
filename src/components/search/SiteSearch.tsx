'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MagnifyingGlass, X } from '@phosphor-icons/react'
import type { SearchEntry, SearchGroup } from '@/lib/searchIndex'

/**
 * Search of the whole site, in the header between the logo and the navigation. From lg up it is the field of the Resources
 * and Skills pages in small, with its results in a list that opens under it; below lg there is not the room for a field, so
 * a button opens the same search on a sheet under the bar. Ctrl/Cmd+K jumps to it from anywhere ("/" belongs to the
 * library pages). The index (projects, resources, guides, About, Resume, Contact) is a static file fetched the first
 * time the search is used, so no page carries it.
 */

type Lang = 'en' | 'fr'

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

const COPY = {
  en: {
    placeholder: 'Search the site',
    label: 'Search the site',
    open: 'Open the search',
    close: 'Close the search',
    clear: 'Clear the search',
    goTo: 'Go to',
    groups: { page: 'Pages', project: 'Projects', resource: 'Resources', guide: 'Guides', skill: 'Skills', article: 'Articles' },
    none: (q: string) => `No result for “${q}”`,
    noneHint: 'Try another word, or browse',
    loading: 'Loading…',
    didYouMean: 'Showing results for',
    count: (n: number) => `${n} result${n > 1 ? 's' : ''}`,
  },
  fr: {
    placeholder: 'Rechercher sur le site',
    label: 'Rechercher sur le site',
    open: 'Ouvrir la recherche',
    close: 'Fermer la recherche',
    clear: 'Effacer la recherche',
    goTo: 'Aller à',
    groups: { page: 'Pages', project: 'Projets', resource: 'Ressources', guide: 'Guides', skill: 'Skills', article: 'Articles' },
    none: (q: string) => `Aucun résultat pour « ${q} »`,
    noneHint: 'Essayez un autre mot, ou parcourez',
    loading: 'Chargement…',
    didYouMean: 'Résultats pour',
    count: (n: number) => `${n} résultat${n > 1 ? 's' : ''}`,
  },
} as const

const PER_GROUP = 4

/** Lower case, no accents, punctuation as spaces: « Application mobile, IA » becomes « application mobile ia » */
const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()

/** A word of the query is found when it starts a word of the text (« design » finds « designer », « ia » finds « IA » and not « média ») */
const hasWord = (haystack: string, token: string) => {
  const padded = ` ${haystack}`
  if (padded.includes(` ${token}`)) return true
  // « designers » finds « designer », « projets » finds « projet » (a plural s or x is not part of the word searched)
  return token.length > 4 && /[^sx][sx]$/.test(token) && padded.includes(` ${token.slice(0, -1)}`)
}

interface Prepared extends SearchEntry {
  nTitle: string
  nAlt: string
  nSub: string
  nText: string
}

/** The words of a text and every start of them, to know at once whether what is typed begins a word */
interface Vocab {
  words: string[]
  prefixes: Set<string>
}

interface Searchable {
  items: Prepared[]
  /** The words of the names: titles, titles of the other language, the line under them */
  names: Vocab
  /** All the words, bodies included */
  all: Vocab
}

function vocabulary(texts: string[]): Vocab {
  const set = new Set<string>()
  for (const t of texts) for (const w of t.split(' ')) if (w.length >= 2) set.add(w)
  const prefixes = new Set<string>()
  for (const w of set) for (let i = 1; i <= w.length; i++) prefixes.add(w.slice(0, i))
  return { words: [...set], prefixes }
}

const indexes: Partial<Record<Lang, Promise<Searchable>>> = {}

function loadIndex(lang: Lang): Promise<Searchable> {
  if (!indexes[lang]) {
    indexes[lang] = fetch(`/api/search/${lang}`, { cache: 'no-cache' })
      .then((r) => (r.ok ? (r.json() as Promise<SearchEntry[]>) : Promise.reject(new Error(String(r.status)))))
      .then((list) => {
        const items = list.map((e) => ({ ...e, nTitle: normalize(e.title), nAlt: normalize(`${e.alt ?? ''} ${e.aka ?? ''}`), nSub: normalize(e.sub), nText: normalize(e.text) }))
        return {
          items,
          names: vocabulary(items.flatMap((e) => [e.nTitle, e.nAlt, e.nSub])),
          all: vocabulary(items.flatMap((e) => [e.nTitle, e.nAlt, e.nSub, e.nText])),
        }
      })
      .catch(() => {
        delete indexes[lang]
        return { items: [], names: vocabulary([]), all: vocabulary([]) }
      })
  }
  return indexes[lang]!
}

/** Edit distance counting a swap of two letters as one, given up as soon as it passes `max` */
function distance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1
  let prev2: number[] = []
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j)
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]
    let rowMin = i
    for (let j = 1; j <= b.length; j++) {
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1)
      cur[j] = v
      if (v < rowMin) rowMin = v
    }
    if (rowMin > max) return max + 1
    prev2 = prev
    prev = cur
  }
  return prev[b.length]
}

/** How many letters may be wrong: none in a short word, one up to seven letters, two beyond */
const tolerance = (length: number) => (length < 4 ? 0 : length < 8 ? 1 : 2)

/** The words of a vocabulary close to what was typed, the closest first: « worl » gives « work », « tessap » gives « tessan ».
 *  A word is compared whole and by its start, since what is typed is often unfinished. */
function nearWords(token: string, vocab: Vocab, limit = 3): string[] {
  const max = tolerance(token.length)
  if (!max) return []
  const found: { w: string; d: number }[] = []
  for (const w of vocab.words) {
    if (w.length < token.length - max) continue
    const whole = distance(token, w, max)
    const start = w.length > token.length ? distance(token, w.slice(0, token.length), max) : max + 1
    const d = Math.min(whole, start)
    if (d <= max) found.push({ w, d })
  }
  found.sort((x, y) => x.d - y.d || x.w.length - y.w.length || (x.w < y.w ? -1 : 1))
  return found.slice(0, limit).map((f) => f.w)
}

interface Hit {
  entry: Prepared
  score: number
  order: number
  /** Found through the title of the other language: the row says so */
  viaAlt: boolean
  /** Found through a word near the one typed, not the one typed */
  fuzzy: boolean
}

/** How well a word is found in an entry: in the title most, then the title of the other language, the line under it, the body */
function scoreWord(entry: Prepared, w: string): { score: number; viaAlt: boolean } {
  if (hasWord(entry.nTitle, w)) return { score: 12, viaAlt: false }
  if (entry.nAlt && hasWord(entry.nAlt, w)) return { score: 10, viaAlt: true }
  if (hasWord(entry.nSub, w)) return { score: 4, viaAlt: false }
  if (hasWord(entry.nText, w)) return { score: 1, viaAlt: false }
  return { score: 0, viaAlt: false }
}

/** A word found through a near one counts for less, so what was typed exactly always comes first */
const NEAR_WEIGHT = 0.6

/**
 * Every word of the query must be found. A word that is not found as typed is looked for near: in the names first (titles
 * and the line under them), then everywhere, so that a slip of a letter or two still leads somewhere and the visitor is
 * told what was understood (`suggestion`) instead of meeting an empty list.
 */
function search(s: Searchable, query: string): { hits: Hit[]; suggestion: string | null } {
  const tokens = normalize(query).split(' ').filter(Boolean)
  if (!tokens.length) return { hits: [], suggestion: null }

  const plans = tokens.map((t) => {
    const stem = t.length > 4 && /[^sx][sx]$/.test(t) ? t.slice(0, -1) : t
    const known = s.all.prefixes.has(t) || s.all.prefixes.has(stem)
    const inNames = s.names.prefixes.has(t) || s.names.prefixes.has(stem)
    let near = inNames ? [] : nearWords(t, s.names)
    if (!near.length && !known) near = nearWords(t, s.all)
    return { t, known, near }
  })

  const hits: Hit[] = []
  s.items.forEach((entry, order) => {
    let total = 0
    let viaAlt = false
    let fuzzy = false
    for (const { t, near } of plans) {
      let best = scoreWord(entry, t)
      let viaNear = false
      for (const w of near) {
        const c = scoreWord(entry, w)
        if (c.score * NEAR_WEIGHT > best.score) {
          best = { score: c.score * NEAR_WEIGHT, viaAlt: c.viaAlt }
          viaNear = true
        }
      }
      if (!best.score) return
      total += best.score
      if (best.viaAlt) viaAlt = true
      if (viaNear) fuzzy = true
    }
    // A page ahead of a project only when its own name matches, not because its text mentions the word
    if (entry.group === 'page' && total >= 12 * NEAR_WEIGHT) total += 2
    hits.push({ entry, score: total, order, viaAlt, fuzzy })
  })
  hits.sort((a, b) => b.score - a.score || a.order - b.order)

  // The correction is offered when a word was not found as typed, or when the words as typed lead to almost nothing
  const corrected = plans.some((p) => p.near.length)
  const exact = hits.filter((h) => !h.fuzzy).length
  const understood = plans.map((p) => p.near[0] ?? p.t).join(' ')
  const suggestion = corrected && understood !== tokens.join(' ') && (plans.some((p) => !p.known) || exact <= 2) ? understood : null
  return { hits, suggestion }
}

/** A result as shown: `viaAlt` when the words typed are those of the other language's title */
type Shown = Prepared & { viaAlt?: boolean }

interface Section {
  group: SearchGroup
  entries: Shown[]
}

/** The best hits in groups, the group holding the best hit first */
function groupHits(hits: Hit[]): Section[] {
  const by = new Map<SearchGroup, Shown[]>()
  for (const h of hits) {
    const list = by.get(h.entry.group) ?? []
    if (list.length < PER_GROUP) list.push({ ...h.entry, viaAlt: h.viaAlt })
    by.set(h.entry.group, list)
  }
  const firstSeen = new Map<SearchGroup, number>()
  hits.forEach((h, i) => { if (!firstSeen.has(h.entry.group)) firstSeen.set(h.entry.group, i) })
  return [...by.entries()]
    .sort((a, b) => (firstSeen.get(a[0]) ?? 0) - (firstSeen.get(b[0]) ?? 0))
    .map(([group, entries]) => ({ group, entries }))
}

export default function SiteSearch({ lang }: { lang: Lang }) {
  const copy = COPY[lang]
  const router = useRouter()
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const fieldRef = useRef<HTMLInputElement>(null)
  const sheetInputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [wide, setWide] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [index, setIndex] = useState<Searchable | null>(null)
  const [active, setActive] = useState(0)
  const [shortcut, setShortcut] = useState('⌘K')

  useEffect(() => {
    setMounted(true)
    if (!/Mac|iPhone|iPad/.test(navigator.platform)) setShortcut('Ctrl K')
    const mq = window.matchMedia('(min-width: 1024px)')
    const sync = () => setWide(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const ensureIndex = useCallback(() => {
    loadIndex(lang).then(setIndex)
  }, [lang])

  const close = useCallback(() => {
    setOpen(false)
    fieldRef.current?.blur()
  }, [])

  // A new page closes the search. When the search itself led there, the field keeps the words that were searched; any
  // other way to a page (a link, the menu, back) empties it.
  const launched = useRef(false)
  useEffect(() => {
    setOpen(false)
    if (launched.current) launched.current = false
    else setQuery('')
  }, [pathname])

  // Ctrl/Cmd+K from anywhere. No animation: a key is not a gesture.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== 'k') return
      e.preventDefault()
      ensureIndex()
      setOpen(true)
      if (wide) fieldRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [wide, ensureIndex])

  // A press outside the field, its list and the sheet closes the search
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (rootRef.current?.contains(target) || sheetRef.current?.contains(target)) return
      setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  // The sheet below lg takes the keyboard as it opens
  useEffect(() => {
    if (open && !wide) sheetInputRef.current?.focus()
  }, [open, wide])

  const trimmed = query.trim()
  const found = useMemo(() => (index && trimmed ? search(index, trimmed) : null), [index, trimmed])
  const sections = useMemo(() => (found ? groupHits(found.hits) : []), [found])
  const quickLinks = useMemo(() => (index ? index.items.filter((e) => e.group === 'page') : []), [index])
  const flat = useMemo<Shown[]>(() => (trimmed ? sections.flatMap((s) => s.entries) : quickLinks), [trimmed, sections, quickLinks])

  useEffect(() => { setActive(0) }, [trimmed])

  // The active row stays in view when the arrows go past the list
  useEffect(() => {
    if (!open || !flat[active]) return
    document.getElementById(`${listId}-${flat[active].id}`)?.scrollIntoView({ block: 'nearest' })
  }, [active, flat, open, listId])

  // A result is chosen: the list closes, the focus leaves the field, and the field keeps the words searched
  const go = (entry: Prepared) => {
    launched.current = entry.href !== pathname
    setOpen(false)
    fieldRef.current?.blur()
    sheetInputRef.current?.blur()
    router.push(entry.href)
  }

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
      return
    }
    if (!flat.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActive((i) => (i + 1) % flat.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (i - 1 + flat.length) % flat.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (flat[active]) go(flat[active])
    }
  }

  const activeId = open && flat[active] ? `${listId}-${flat[active].id}` : undefined

  const inputProps = {
    type: 'search' as const,
    role: 'combobox' as const,
    value: query,
    placeholder: copy.placeholder,
    'aria-label': copy.label,
    'aria-expanded': open,
    'aria-controls': listId,
    'aria-autocomplete': 'list' as const,
    'aria-activedescendant': activeId,
    autoComplete: 'off',
    spellCheck: false,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setQuery(e.target.value); setOpen(true) },
    onKeyDown: onInputKey,
  }

  const results = (
    <Results
      id={listId}
      lang={lang}
      loading={!index}
      query={trimmed}
      sections={sections}
      suggestion={found?.suggestion ?? null}
      onSuggest={(q) => { setQuery(q); const el = wide ? fieldRef.current : sheetInputRef.current; el?.focus() }}
      quickLinks={quickLinks}
      flat={flat}
      active={active}
      onHover={setActive}
      onPick={go}
    />
  )

  const panelMotion = {
    initial: { opacity: 0, y: reduce ? 0 : -6, scale: reduce ? 1 : 0.985 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: EASE_OUT } },
    exit: { opacity: 0, y: reduce ? 0 : -4, scale: 1, transition: { duration: 0.12, ease: EASE_OUT } },
  }

  return (
    // The slot takes the room between the logo and the navigation. The field is anchored on the navigation side, so it
    // reads as part of it, and grows toward the logo when it is used: 264 px at rest, 420 px active (never wider than the
    // slot). Opening takes 250 ms on the smooth ease-out, closing 150 ms: closing gets out of the way. Its list opens
    // under the field, aligned on its right edge.
    <div className="flex-none lg:flex lg:min-w-[200px] lg:flex-1 lg:justify-end lg:px-5">
    <div
      ref={rootRef}
      className={`relative lg:max-w-full lg:transition-[width] lg:ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? 'lg:w-[420px] lg:duration-[250ms]' : 'lg:w-[264px] lg:duration-150'
      }`}
    >
      {/* From lg up: the field */}
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative hidden lg:block">
        <MagnifyingGlass size={16} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          ref={fieldRef}
          {...inputProps}
          onFocus={() => { ensureIndex(); setOpen(true) }}
          className="peer h-10 w-full rounded-full bg-white/80 pl-10 pr-14 text-sm text-gray-900 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] outline-none transition-[box-shadow,background-color] duration-150 placeholder:text-gray-500 [@media(hover:hover)]:hover:bg-white focus:bg-white focus:shadow-[inset_0_0_0_1.5px_#111827,0_0_0_4px_rgba(17,24,39,0.06)] [&::-webkit-search-cancel-button]:hidden"
        />
        {query ? (
          <button
            type="button"
            onClick={() => { setQuery(''); fieldRef.current?.focus() }}
            aria-label={copy.clear}
            className="absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 transition-colors duration-150 [@media(hover:hover)]:hover:bg-black/[0.05] [@media(hover:hover)]:hover:text-gray-900"
          >
            <X size={14} aria-hidden="true" />
          </button>
        ) : (
          <kbd
            aria-hidden="true"
            className="pointer-events-none absolute right-2.5 top-1/2 inline-flex h-5 -translate-y-1/2 items-center rounded-md border border-gray-200 bg-gray-50 px-1.5 font-mono text-[11px] text-gray-500 transition-opacity duration-150 peer-focus:opacity-0"
          >
            {shortcut}
          </kbd>
        )}
      </form>

      <AnimatePresence>
        {open && wide && (
          <motion.div
            key="list"
            {...panelMotion}
            style={{ transformOrigin: 'top right' }}
            className="absolute right-0 top-full z-50 mt-2 w-[min(480px,calc(100vw-2.5rem))] overflow-hidden rounded-2xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_16px_40px_-12px_rgba(0,0,0,0.18)]"
          >
            <div className="max-h-[min(460px,calc(100svh-6rem))] overflow-y-auto overscroll-contain p-2">{results}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Below lg: a button, and the sheet under the bar */}
      <button
        type="button"
        onClick={() => {
          if (open) { setOpen(false); return }
          ensureIndex()
          setOpen(true)
        }}
        aria-label={open ? copy.close : copy.open}
        aria-expanded={open}
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-[background-color,color,transform] duration-150 active:scale-[0.95] lg:hidden [@media(hover:hover)]:hover:bg-black/[0.04]"
      >
        {open ? <X size={20} aria-hidden="true" /> : <MagnifyingGlass size={20} aria-hidden="true" />}
      </button>

      {mounted &&
        !wide &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  key="scrim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.2 } }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  className="fixed inset-0 z-40 bg-black/20"
                  onClick={() => setOpen(false)}
                  aria-hidden="true"
                />
                <motion.div
                  key="sheet"
                  ref={sheetRef}
                  {...panelMotion}
                  style={{ top: 'var(--nav-height)', transformOrigin: 'top center' }}
                  className="fixed inset-x-0 z-50 border-b border-gray-100 bg-[#FDFDFC] shadow-[0_24px_40px_-24px_rgba(0,0,0,0.2)]"
                >
                  <div className="wrap pb-3 pt-1">
                    <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
                      <MagnifyingGlass size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        ref={sheetInputRef}
                        {...inputProps}
                        className="h-11 w-full rounded-full bg-white pl-11 pr-11 text-base text-gray-900 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.09)] outline-none transition-shadow duration-150 placeholder:text-gray-500 focus:shadow-[inset_0_0_0_1.5px_#111827,0_0_0_4px_rgba(17,24,39,0.06)] [&::-webkit-search-cancel-button]:hidden"
                      />
                      {query && (
                        <button
                          type="button"
                          onClick={() => { setQuery(''); sheetInputRef.current?.focus() }}
                          aria-label={copy.clear}
                          className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 active:bg-black/[0.05]"
                        >
                          <X size={16} aria-hidden="true" />
                        </button>
                      )}
                    </form>
                    <div className="-mx-2 mt-2 max-h-[calc(100svh-var(--nav-height)-5.5rem)] overflow-y-auto overscroll-contain px-2">{results}</div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
    </div>
  )
}

function Results({
  id,
  lang,
  loading,
  query,
  sections,
  suggestion,
  onSuggest,
  quickLinks,
  flat,
  active,
  onHover,
  onPick,
}: {
  id: string
  lang: Lang
  loading: boolean
  query: string
  sections: Section[]
  suggestion: string | null
  onSuggest: (q: string) => void
  quickLinks: Shown[]
  flat: Shown[]
  active: number
  onHover: (i: number) => void
  onPick: (e: Shown) => void
}) {
  const copy = COPY[lang]

  const row = (entry: Shown) => {
    const i = flat.indexOf(entry)
    const isActive = i === active
    return (
      <Link
        key={entry.id}
        id={`${id}-${entry.id}`}
        href={entry.href}
        role="option"
        aria-selected={isActive}
        tabIndex={-1}
        onMouseMove={() => { if (!isActive) onHover(i) }}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey) return
          e.preventDefault()
          onPick(entry)
        }}
        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-100 ${isActive ? 'bg-black/[0.05]' : ''}`}
      >
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-medium text-gray-900">{entry.title}</span>
          <span className="mt-0.5 block truncate text-[13px] text-gray-500">{entry.sub}</span>
        </span>
        {entry.viaAlt && entry.alt && (
          <span className="flex-none text-xs text-gray-500" lang={lang === 'fr' ? 'en' : 'fr'}>
            {entry.alt}
          </span>
        )}
        <kbd
          aria-hidden="true"
          className={`hidden h-5 items-center rounded-md border border-gray-200 bg-white px-1.5 font-mono text-[11px] text-gray-500 transition-opacity duration-100 sm:inline-flex ${isActive ? 'opacity-100' : 'opacity-0'}`}
        >
          ↵
        </kbd>
      </Link>
    )
  }

  const label = (text: string) => <div className="px-3 pb-1 pt-2.5 text-xs font-medium text-gray-500">{text}</div>

  let body: React.ReactNode
  if (loading) {
    body = <p className="px-3 py-6 text-sm text-gray-500">{copy.loading}</p>
  } else if (!query) {
    body = (
      <div role="group" aria-label={copy.goTo}>
        {label(copy.goTo)}
        {quickLinks.map(row)}
      </div>
    )
  } else if (!sections.length) {
    body = (
      <div className="px-3 py-5">
        <p className="text-sm font-medium text-gray-900">{copy.none(query)}</p>
        <p className="mt-1 text-sm text-gray-500">
          {copy.noneHint}{' '}
          <Link href={`/${lang}/projets`} className="text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
            {lang === 'fr' ? 'les projets' : 'the projects'}
          </Link>
          {lang === 'fr' ? ' ou ' : ' or '}
          <Link href={`/${lang}/ressources`} className="text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
            {lang === 'fr' ? 'les ressources' : 'the resources'}
          </Link>
          .
        </p>
      </div>
    )
  } else {
    body = sections.map((s) => (
      <div key={s.group} role="group" aria-label={copy.groups[s.group]}>
        {label(copy.groups[s.group])}
        {s.entries.map(row)}
      </div>
    ))
  }

  return (
    <>
      {/* What was understood, when the words typed were not found as they stand: the results are already there below, one press
          puts the corrected words in the field */}
      {suggestion && !loading && (
        <p className="px-3 pb-0.5 pt-2.5 text-[13px] text-gray-500">
          {copy.didYouMean}{' '}
          <button
            type="button"
            onClick={() => onSuggest(suggestion)}
            className="rounded font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 transition-colors duration-150 [@media(hover:hover)]:hover:decoration-gray-900"
          >
            {suggestion}
          </button>
        </p>
      )}
      <div id={id} role="listbox" aria-label={copy.label}>
        {body}
        <p className="sr-only" aria-live="polite">
          {query && !loading ? (flat.length ? `${suggestion ? `${copy.didYouMean} ${suggestion}. ` : ''}${copy.count(flat.length)}` : copy.none(query)) : ''}
        </p>
      </div>
    </>
  )
}
