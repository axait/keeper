import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL('/', request.url))
}
 
export const config = {
  matcher: '/about/:path*',
}

there is something wrnong with proxy.ts i have to make it work. 