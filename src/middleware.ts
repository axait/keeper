import { NextResponse, NextRequest } from 'next/server'
import { myVerifyJwt } from './lib/jwt';


const exceptionalRoutes = ['/api', '/todo'];

export async function middleware(req: NextRequest) {
  console.log(`[?] Middleware triggered! ${req.nextUrl.pathname}`);

  // checking for exceptional routes
  if (exceptionalRoutes.includes(req.nextUrl.pathname)) {
    console.log("[OK] passed")
    return NextResponse.next();
  }

  // trying to extract token
  const token = req.cookies?.get('token')?.value;

  // checking whther token exist or not.
  if (!token) {
    console.log("no token")
    return NextResponse.redirect(new URL('/404', req.url))
  }

  // checking whther token exist or not.
  const { valid, payload } = await myVerifyJwt(token)

  if (!valid) {
    console.log("InValid token")
    return NextResponse.redirect(new URL('/404', req.url))
  }

  // adding headers with data for backend
  const res = NextResponse.next();
  res.headers.set("x-user-id", payload?.userId || "");
  res.headers.set("x-session-id", payload?.sessionId || "");
  // res.headers.set("x-user-level", payload?.level || "");


  return res;
}

export const config = {
  matcher: ['/api/:path*', '/todo/:path*'],
}

