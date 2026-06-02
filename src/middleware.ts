import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Protect /compte/* — redirect to /connexion if not authenticated
  const isProtected = req.nextUrl.pathname.startsWith('/compte') || req.nextUrl.pathname.startsWith('/onboarding')
  if (isProtected && !session) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/connexion'
    redirectUrl.searchParams.set('redirect', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect /connexion and /inscription to /compte if already authenticated
  if ((req.nextUrl.pathname === '/connexion' || req.nextUrl.pathname === '/inscription') && session) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/compte'
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ['/compte/:path*', '/onboarding', '/connexion', '/inscription'],
}
