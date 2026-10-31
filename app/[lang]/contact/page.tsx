import type { Metadata } from 'next'
import ContactPageClient from '@/components/page-wrappers/ContactPageClient'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, pageLd, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

const COPY = {
  fr: { title: 'Contact, missions de product design', description: 'Contactez Victor Soussan, Lead Product Designer basé à Paris. Missions de product design, audits de design system, ateliers.' },
  en: { title: 'Contact, product design engagements', description: 'Get in touch with Victor Soussan, Lead Product Designer based in Paris. Product design missions, design system audits, workshops.' },
} as const

/** The short name of the page in breadcrumbs, as in the navigation */
const CRUMB = { fr: 'Contact', en: 'Contact' } as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return buildMetadata({
    lang,
    path: 'contact',
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
          path: 'contact',
          type: 'ContactPage',
          name: COPY[lang].title,
          description: COPY[lang].description,
          crumbs: [{ name: CRUMB[lang], path: 'contact' }],
        })}
      />
      <ContactPageClient lang={lang} />
    </>
  )
}
