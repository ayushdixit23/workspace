import { NextResponse } from 'next/server';
import { checkToken } from './app/utils/Useful';
import { parse } from 'cookie';

export default async function middleware(request) {

	if (request.middlewareHasRun) {
		return NextResponse.next();
	}

	const cookieHeader = request.headers.get('cookie') || '';
	const cookies = parse(cookieHeader);

	const sessionIds = Object.keys(cookies)
		.filter(cookieName => cookieName.startsWith('sessionId'))
		.map(sessionId => sessionId.split('_')[1]);

	const tokenExists = sessionIds.some(sessionId => cookies[`frhktn${sessionId}`]);

	if (!tokenExists && request.nextUrl.pathname !== '/login') {

		console.log("Redirecting to login due to missing token");
		return NextResponse.redirect(new URL('/login', request.nextUrl));
	}

	if (tokenExists) {
		const tokenSession = sessionIds.find(sessionId => cookies[`frhktn${sessionId}`]);
		const token = cookies[`frhktn${tokenSession}`];

		const tokenValidation = await checkToken(token);

		if (!tokenValidation.check && request.nextUrl.pathname !== "/login") {
			console.log("Invalid token. Deleting and redirecting to login");

			request.cookies.delete(`excktn${tokenSession}`);
			request.cookies.delete(`sessionId_${tokenSession}`);
			request.cookies.delete(`frhktn${tokenSession}`);
			return NextResponse.redirect(new URL('/login', request.nextUrl));
		}

		if (request.nextUrl.pathname === '/login' && tokenValidation.check) {
			console.log("Redirecting to dashboard");
			return NextResponse.redirect(new URL('/main/dashboard', request.nextUrl));
		}
	}

	request.middlewareHasRun = true;

	return NextResponse.next();
}

export const config = {
	matcher: ['/login', '/main/:path*', '/']
};
