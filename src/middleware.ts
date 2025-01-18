import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
	'/remove-bg',
	'/history',
	'/api/(.*)',
]);

const isExcludedRoute = createRouteMatcher([
	'/api/auth',
]);

export default clerkMiddleware(async (auth, req) => {
	const { userId, redirectToSignIn } = await auth();
	console.log('req.url', req.url);
	if (!userId && isProtectedRoute(req) && !isExcludedRoute(req)) {
		if (req.url.includes('/api/')) {
			return new Response(
				JSON.stringify({ success: false, error: 'Not Authenticated' }),
				{
					status: 401,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}
		return redirectToSignIn({ returnBackUrl: req.url });
	}
});

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		'/(api|trpc)(.*)',
	],
};
