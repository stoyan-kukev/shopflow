import { db } from '$lib/server/db';
import { userTable } from '$lib/server/schema';
import { Elysia, t } from 'elysia';

const app = new Elysia({ prefix: '/api' })
	.get('/', () => db.select().from(userTable))
	.post('/', ({ body }) => body, {
		body: t.Object({
			name: t.String()
		})
	});

type RequestHandler = (v: { request: Request }) => Response | Promise<Response>;

export const GET: RequestHandler = ({ request }) => app.handle(request);
export const POST: RequestHandler = ({ request }) => app.handle(request);

export type App = typeof app;
