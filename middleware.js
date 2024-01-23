// import { NextResponse } from 'next/server';
// import { checkToken } from './app/utils/Useful';

// export default async function middleware(request) {

// 	if (request.nextUrl && request.nextUrl.pathname === '/login') {

// 		return NextResponse.next();
// 	}

// 	const sessionId = request.cookies.get("sessionId")?.value


// 	if (sessionId) {
// 		const token = request.cookies.get(`excktn${sessionId}`)?.value || ""
// 		const path = request.nextUrl.pathname;
// 		if (!token && path !== '/login') {
// 			return NextResponse.redirect(new URL('/login', request.nextUrl));
// 		}
// 		const { check } = await checkToken(token);

// 		if (check && path === "/login") {
// 			return NextResponse.redirect(new URL('/main/dashboard', request.nextUrl));
// 		}

// 		if (!check && path !== "/login") {
// 			request.cookies.delete(`excktn${sessionId}`);
// 			request.cookies.delete(`frhktn${sessionId}`);
// 			return NextResponse.redirect(new URL('/login', request.nextUrl));
// 		}
// 	} else {
// 		return NextResponse.redirect(new URL('/login', request.nextUrl));
// 	}
// }

// export const config = {
// 	matcher: ['/login', '/main/:path*', '/']
// };

import { NextResponse } from "next/server";

export default function middleware(request) {
	return NextResponse.next()
}