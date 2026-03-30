import { redirect } from 'next/navigation'

type Props = { params: Promise<{ lang: string }> }

export default async function InterventionsPage({ params }: Props) {
  const { lang: langParam } = await params
  const lang = langParam === 'fr' ? 'fr' : 'en'
  redirect(`/${lang}/contact#interventions`)
}
