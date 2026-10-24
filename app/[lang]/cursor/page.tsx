import { notFound } from 'next/navigation'
import HomepageCursorClient from '@/components/page-wrappers/HomepageCursorClient'

type Lang = 'en' | 'fr'

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }]
}

export default async function CursorPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (lang !== 'en' && lang !== 'fr') notFound()

  return <HomepageCursorClient lang={lang as Lang} />
}
