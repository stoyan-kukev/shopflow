import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db, lucia } from '$lib/server/db';
import { userTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import { verify } from '@node-rs/argon2';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		const username = formData.get('username');
		if (
			typeof username !== 'string' ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			return fail(400, {
				message: 'Invalid username'
			});
		}

		const password = formData.get('password');
		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		}

		const existingUser = await db.select().from(userTable).where(eq(userTable.username, username));
		if (!existingUser) {
			return fail(400, {
				message: 'Incorrect username or password'
			});
		}

		const user = existingUser[0];

		const validPassword = await verify(user.password_hash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		if (!validPassword) {
			return fail(400, {
				message: 'Incorrect username or password'
			});
		}

		const session = await lucia.createSession(user.id, {});
		const { name, value, attributes } = lucia.createSessionCookie(session.id);
		event.cookies.set(name, value, { path: '.', ...attributes });

		redirect(302, '/');
	}
};
