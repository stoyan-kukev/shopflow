import { dev } from '$app/environment';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { drizzle } from 'drizzle-orm/node-postgres';
import { sessionTable, userTable } from './schema';
import { Lucia } from 'lucia';
import pg from 'pg';

const pool = new pg.Pool({
	host: '127.0.0.1',
	port: 5432,
	user: 'postgres',
	password: 'postgres',
	database: 'test'
});
export const db = drizzle(pool);

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
	}
}
