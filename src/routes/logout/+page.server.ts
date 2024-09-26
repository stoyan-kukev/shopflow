import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { lucia } from '$lib/server/db';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.session) {
		redirect(302, '/');
	}

	await lucia.invalidateSession(event.locals.session.id);
	const { name, value, attributes } = lucia.createBlankSessionCookie();
	event.cookies.set(name, value, { path: '.', ...attributes });

	redirect(302, '/login');
};
