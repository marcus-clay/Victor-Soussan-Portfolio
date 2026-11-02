import type { Metadata } from 'next'
import { GUIDE_OS_META, GUIDE_OS_PATH } from '@/data/guideOsData'
import GuideOsPage from '@/views/GuideOsPage'
import JsonLd from '@/components/JsonLd'
import { relatedContent } from '@/lib/related'
import { articleLd, breadcrumbLd, buildMetadata, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: GUIDE_OS_PATH,
    title: GUIDE_OS_META.title[lang],
    description: GUIDE_OS_META.description[lang],
    type: 'article',
    publishedTime: GUIDE_OS_META.date,
  })
}

export default async function PersonalOsGuidePage({ params }: Props) {
  const lang = toLang((await params).lang)
  return (
    <>
      <JsonLd
        data={[
          articleLd({
            lang,
            path: GUIDE_OS_PATH,
            headline: GUIDE_OS_META.title[lang],
            description: GUIDE_OS_META.description[lang],
            datePublished: GUIDE_OS_META.date,
            keywords: GUIDE_OS_META.keywords,
          }),
          breadcrumbLd(lang, [
            { name: lang === 'fr' ? 'Ressources' : 'Resources', path: 'ressources' },
            { name: GUIDE_OS_META.title[lang], path: GUIDE_OS_PATH },
          ]),
        ]}
      />
      <GuideOsPage lang={lang} related={relatedContent(lang, 'guide-personal-os')} />
    </>
  )
}
