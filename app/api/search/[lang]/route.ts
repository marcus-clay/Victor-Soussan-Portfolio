import { NextResponse } from 'next/server'
import { buildSearchIndex } from '@/lib/searchIndex'
import { toLang } from '@/lib/seo'

/** The index of the header search, one static file per language: GET /api/search/fr */
export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }]
}

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const lang = toLang((await params).lang)
  return NextResponse.json(buildSearchIndex(lang), {
    // The browser and the CDN keep the file but ask each time whether it changed (a cheap 304): a new deploy, or a new word in
    // a page, is in the search at once, never an hour or a day late
    headers: { 'Cache-Control': 'public, max-age=0, must-revalidate' },
  })
}
