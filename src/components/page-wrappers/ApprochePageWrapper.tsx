import ApprocheV2Page from '@/views/ApprocheV2Page'
import { ALL_CONTENT, TYPE_LABELS } from '@/data/contentData'
import { RELATED_ARTICLE_IDS } from '@/data/approcheData'
import type { RelatedItem } from '@/components/RelatedContent'

// Server component: only the card fields of the related articles reach the page, not their bodies.
export default function ApprochePageWrapper({ lang }: { lang: 'en' | 'fr' }) {
  const related: RelatedItem[] = RELATED_ARTICLE_IDS
    .map((id) => ALL_CONTENT.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((item) => ({
      href: `/${lang}/signal/${item.id}`,
      title: lang === 'fr' ? item.title_fr : item.title_en,
      label: TYPE_LABELS[item.type][lang],
      description: lang === 'fr' ? item.excerpt_fr : item.excerpt_en,
      cover: item.heroImage ? { src: item.heroImage } : undefined,
    }))

  return <ApprocheV2Page lang={lang} related={related} />
}
