import { NextResponse, NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  console.log("🚀 Middleware triggered!");
  return NextResponse.redirect(new URL('/', request.url))
}

// ✅ Tell Next.js: "Run this function as middleware"
export { proxy as middleware }

export const config = {
  matcher: ['/api/:path*', '/todo/:path*'],
}
