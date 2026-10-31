import type { Metadata } from 'next'
import ApprochePageWrapper from '@/components/page-wrappers/ApprochePageWrapper'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, pageLd, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

const COPY = {
  fr: { title: 'Approche du product design', description: 'Structurer ce qu’une équipe produit doit concevoir, puis concevoir l’expérience jusqu’au détail des interactions et jusqu’aux livrables prêts à implémenter.' },
  en: { title: 'Product design approach', description: 'Structuring what a product team has to design, then designing the experience down to the detail of its interactions and to deliverables ready to build.' },
} as const

/** The short name of the page in breadcrumbs, as in the navigation */
const CRUMB = { fr: 'Approche', en: 'Approach' } as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: 'approche',
    title: COPY[lang].title,
    description: COPY[lang].description,
  })
}

export default async function Page({ params }: Props) {
  const lang = toLang((await params).lang)
  return (
    <>
      <JsonLd
        data={pageLd({
          lang,
          path: 'approche',
          type: 'WebPage',
          name: COPY[lang].title,
          description: COPY[lang].description,
          crumbs: [{ name: CRUMB[lang], path: 'approche' }],
        })}
      />
      <ApprochePageWrapper lang={lang} />
    </>
  )
}
