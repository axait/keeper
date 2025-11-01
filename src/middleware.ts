import { NextResponse, NextRequest } from 'next/server'
import { myVerifyJwt } from './lib/jwt';


const exceptionalRoutes = [
	"/api/logfiler/save",
	"/api/user/signin",
	"/api/user/create",
];

export async function middleware(req: NextRequest) {
	const currentUrl = req.nextUrl.pathname;
	console.log(`[?] Middleware triggered! ${currentUrl}`);

	// checking for exceptional routes
	if (exceptionalRoutes.includes(currentUrl)) {
		console.log(`[OK] skiped the route ${currentUrl}`)
		return NextResponse.next();
	}


	// trying to extract token
	const token = req.cookies?.get('token')?.value;

	// checking whther token exist or not and then allowing to signin
	if (currentUrl === "/signin") {
		if (!token) {
			console.log("no token")
			return NextResponse.next();
		} else {
			return NextResponse.redirect(new URL('/todo', req.url))
		}
	}

	// checking whther token exist or not.
	if (!token) {
		console.log("no token")
		return NextResponse.rewrite(new URL('/404', req.url))
	}

	// checking whther token exist or not.
	const { valid, payload } = await myVerifyJwt(token)

	if (!valid) {
		console.log("InValid token")
		return NextResponse.rewrite(new URL('/404', req.url))
	}

	// here you adds custom checks for specific routes.
	if (currentUrl === "/logfiler" || currentUrl === "/api/logfiler/get") {
		console.log("level: ",payload?.level)
		if (payload?.level !== "admin") {
			return NextResponse.redirect(new URL('/404', req.url));
		}
	}

	// adding headers with data for backend
	const res = NextResponse.next();
	res.headers.set("x-user-id", payload?.userId || "");
	res.headers.set("x-session-id", payload?.sessionId || "");
	res.headers.set("x-user-level", payload?.level || "normal");
	// res.headers.set("x-user-level", payload?.level || "");

	console.log("[*] Access granted to ", currentUrl)
	return res;
}

export const config = {
	matcher: [
		'/api/:path*',
		'/todo/:path*',
		"/signin",
		"/logfiler",
		"/api/logfiler/get",
		"/api/logfiler/save"
	],
}

