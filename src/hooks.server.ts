import { lucia } from '$lib/server/db';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const { name, value, attributes } = lucia.createSessionCookie(session.id);

		event.cookies.set(name, value, { path: '.', ...attributes });
	}

	if (!session) {
		const { name, value, attributes } = lucia.createBlankSessionCookie();

		event.cookies.set(name, value, { path: '.', ...attributes });
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};
