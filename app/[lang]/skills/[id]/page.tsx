import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SkillDetail from '@/components/skills/SkillDetail'
import JsonLd from '@/components/JsonLd'
import { SKILLS, getTheme } from '@/data/skillsCatalogue'
import { buildMetadata, clip, pageLd, toLang } from '@/lib/seo'

type Props = { params: Promise<{ lang: string; id: string }> }

export function generateStaticParams() {
  return ['en', 'fr'].flatMap((lang) => SKILLS.map((s) => ({ lang, id: s.id })))
}

const TITLE = {
  en: (name: string, theme: string) => `${name}: a Claude skill for ${theme.toLowerCase()}`,
  fr: (name: string, theme: string) => `${name} : une skill Claude, ${theme.toLowerCase()}`,
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam, id } = await params
  const lang = toLang(langParam)
  const skill = SKILLS.find((s) => s.id === id)
  if (!skill) return { robots: { index: false, follow: false } }
  const theme = getTheme(skill.themes[0]).label[lang]
  return buildMetadata({
    lang,
    path: `skills/${id}`,
    title: clip(TITLE[lang](skill.name, theme), 60),
    description: clip(`${skill.summary[lang]} ${skill.outcome[lang]}`, 158),
  })
}

export default async function Page({ params }: Props) {
  const { lang: langParam, id } = await params
  const lang = toLang(langParam)
  const skill = SKILLS.find((s) => s.id === id)
  if (!skill) notFound()
  const theme = getTheme(skill.themes[0]).label[lang]
  return (
    <>
      <JsonLd
        data={pageLd({
          lang,
          path: `skills/${id}`,
          type: 'WebPage',
          name: TITLE[lang](skill.name, theme),
          description: clip(`${skill.summary[lang]} ${skill.outcome[lang]}`, 158),
          crumbs: [
            { name: 'Claude', path: 'claude' },
            { name: 'Skills', path: 'skills' },
            { name: skill.name, path: `skills/${id}` },
          ],
        })}
      />
      <SkillDetail skill={skill} lang={lang} />
    </>
  )
}
