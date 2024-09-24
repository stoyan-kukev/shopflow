import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/lib/server/schema.ts',
	out: './drizzle',
	dbCredentials: {
		user: 'postgres',
		password: 'postgres',
		host: '127.0.0.1',
		port: 5432,
		database: 'test',
		ssl: false
	}
});
