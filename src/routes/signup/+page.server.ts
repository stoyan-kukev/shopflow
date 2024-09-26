import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { generateIdFromEntropySize } from 'lucia';
import { hash } from '@node-rs/argon2';
import { db, lucia } from '$lib/server/db';
import { userTable } from '$lib/server/schema';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

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

		if (typeof password !== 'string' || password.length < 6 || password.length > 200) {
			return fail(400, {
				message: 'Invalid password'
			});
		}

		const userId = generateIdFromEntropySize(10);
		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		await db.insert(userTable).values({
			id: userId,
			username: username,
			password_hash: passwordHash
		});

		const session = await lucia.createSession(userId, {});
		const { name, value, attributes } = lucia.createSessionCookie(session.id);
		event.cookies.set(name, value, { path: '.', ...attributes });

		redirect(302, '/');
	}
};
