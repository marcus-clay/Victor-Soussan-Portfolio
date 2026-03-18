import { NextRequest, NextResponse } from 'next/server'

const SUPPORTED_LANGS = ['en', 'fr']
const DEFAULT_LANG = 'en'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files, API routes, _next
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // static files (images, favicons, etc.)
  ) {
    return NextResponse.next()
  }

  // Check if pathname already has a valid lang prefix
  const segments = pathname.split('/')
  const firstSegment = segments[1]
  if (SUPPORTED_LANGS.includes(firstSegment)) {
    return NextResponse.next()
  }

  // Detect preferred language from Accept-Language header
  const acceptLang = request.headers.get('accept-language') || ''
  const prefersFrench = acceptLang.toLowerCase().startsWith('fr')
  const lang = prefersFrench ? 'fr' : DEFAULT_LANG

  // Redirect to lang-prefixed path
  const url = request.nextUrl.clone()
  url.pathname = `/${lang}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    // Match all paths except static files and _next
    '/((?!_next/static|_next/image|favicon|images|videos|logos|sounds|robots.txt|sitemap.xml).*)',
  ],
}
