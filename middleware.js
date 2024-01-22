// import { NextResponse } from 'next/server';
// import { checkToken } from './app/utils/Useful';

// export default function middleware(request) {
// 	let token = request.cookies.get('excktn')?.value || "";
// 	const path = request.nextUrl.pathname;
// 	if (!token && path !== '/login') {
// 		return NextResponse.redirect(new URL('/login', request.nextUrl));
// 	}
// 	const { check } = await checkToken(token);
// 	if (check && path === "/login") {
// 		return NextResponse.redirect(new URL('/main/dashboard', request.nextUrl));
// 	}
// 	if (!check && path !== "/login") {
// 		request.cookies.delete('excktn')
// 		return NextResponse.redirect(new URL('/login', request.nextUrl));
// 	}
// }

// export const config = {
// 	matcher: ['/prosite/:path*', '/login', '/main/:path*', '/settings/:path*', '/']
// };

import { NextResponse } from "next/server";
export default function middleware(request) {
	return NextResponse.next()
}
