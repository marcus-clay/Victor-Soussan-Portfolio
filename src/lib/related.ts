import { ALL_CONTENT, CATEGORY_LABELS, TYPE_LABELS, type ContentItem } from '@/data/contentData'
import { GUIDE_CHAPTERS } from '@/data/guideClaudeCodeData'
import type { RelatedItem } from '@/components/RelatedContent'

/** Where a content item lives: articles and guides on the site, templates on Notion. */
function contentHref(item: ContentItem, lang: 'en' | 'fr'): string {
  if (item.type === 'template' && item.link) return item.link
  if (item.type === 'guide') {
    return item.id === 'guide-ship-to-show' ? `/${lang}/guide/ship-to-show` : `/${lang}/guide/claude-code`
  }
  return `/${lang}/signal/${item.id}`
}

function toRelatedItem(item: ContentItem, lang: 'en' | 'fr'): RelatedItem {
  const kind = TYPE_LABELS[item.type][lang]
  const category = item.category ? CATEGORY_LABELS[item.category][lang] : undefined
  return {
    href: contentHref(item, lang),
    title: lang === 'fr' ? item.title_fr : item.title_en,
    label: category ? `${kind} · ${category}` : kind,
    description: lang === 'fr' ? item.excerpt_fr : item.excerpt_en,
    cover: item.heroImage ? { src: item.heroImage } : undefined,
    external: item.type === 'template',
  }
}

/**
 * Follow-up of an article or a guide, from the unified content list (newest first):
 * the next item of the same type first (looping at the end), then the best matches among
 * the rest: same category first, then the most recent. Three cards at most, `lead` items
 * (the next and previous chapter of a guide, for example) coming before all of them.
 */
export function relatedContent(
  lang: 'en' | 'fr',
  currentId: string,
  lead: RelatedItem[] = [],
): RelatedItem[] {
  const current = ALL_CONTENT.find((item) => item.id === currentId)
  const sameType = ALL_CONTENT.filter((item) => item.type === current?.type)
  const at = sameType.findIndex((item) => item.id === currentId)
  const next = at === -1 || sameType.length < 2 ? null : sameType[(at + 1) % sameType.length]

  const rest = ALL_CONTENT.filter((item) => item.id !== currentId && item.id !== next?.id).sort(
    (a, b) => Number(b.category === current?.category) - Number(a.category === current?.category),
  )
  // Templates are tools, not reading: they only appear when nothing else fills the block.
  const readable = rest.filter((item) => item.type !== 'template')
  const picks = [...(next ? [next] : []), ...readable, ...rest.filter((item) => item.type === 'template')]

  const items = [...lead, ...picks.map((item) => toRelatedItem(item, lang))]
  const seen = new Set<string>()
  return items.filter((item) => (seen.has(item.href) ? false : (seen.add(item.href), true))).slice(0, 3)
}

/** The next and the previous chapter of the Claude Code guide, as follow-up cards. */
export function guideChapterLead(lang: 'en' | 'fr', chapterIndex: number): RelatedItem[] {
  const chapterItem = (index: number): RelatedItem | null => {
    const chapter = GUIDE_CHAPTERS[index]
    if (!chapter) return null
    return {
      href: `/${lang}/guide/claude-code/${lang === 'fr' ? chapter.slug_fr : chapter.slug_en}`,
      title: lang === 'fr' ? chapter.title_fr : chapter.title_en,
      label: `${lang === 'fr' ? 'Chapitre' : 'Chapter'} ${chapter.number} / ${GUIDE_CHAPTERS.length}`,
      description: lang === 'fr' ? chapter.intro_fr : chapter.intro_en,
    }
  }
  return [chapterItem(chapterIndex + 1), chapterItem(chapterIndex - 1)].filter(
    (item): item is RelatedItem => item !== null,
  )
}
