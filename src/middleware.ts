import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

  // ⁡⁢⁢⁢​‌‍‌COMPLETE ME MY VALIDATING TOKEN HERE FOR THE USER AND THEN ALLOW REQUEST TO THE NEXT ROUTE​⁡

  console.log("🚀 Middleware triggered!");
  return NextResponse.redirect(new URL('/', request.url))
}

// ✅ Tell Next.js: "Run this function as middleware"
export { middleware }

export const config = {
  matcher: ['/api/:path*', '/todo/:path*'],
}
