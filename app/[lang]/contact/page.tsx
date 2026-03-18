import type { Metadata } from 'next'
import ContactPageClient from '@/components/page-wrappers/ContactPageClient'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = langParam === 'fr' ? 'fr' : 'en'
  return {
    title: 'Contact',
    description: lang === 'fr'
      ? 'Contactez Victor Soussan, Lead Product Designer basé à Paris.'
      : 'Get in touch with Victor Soussan, Lead Product Designer based in Paris.',
    alternates: {
      canonical: `https://www.victorsoussan.fr/${lang}/contact`,
      languages: {
        fr: 'https://www.victorsoussan.fr/fr/contact',
        en: 'https://www.victorsoussan.fr/en/contact',
      },
    },
  }
}

export default async function ContactPage({ params }: Props) {
  const { lang: langParam } = await params
  const lang = (langParam === 'fr' ? 'fr' : 'en') as 'en' | 'fr'

  return <ContactPageClient lang={lang} />
}
