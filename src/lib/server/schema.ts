import { pgTable, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	password_hash: text('password_hash').notNull()
});

export const sessionTable = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const capabilityTable = pgTable('capability', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	description: text('description')
});

export const userCapabilityTable = pgTable(
	'user_capability',
	{
		userId: text('user_id')
			.notNull()
			.references(() => userTable.id),
		capabilityId: serial('capability_id')
			.notNull()
			.references(() => capabilityTable.id)
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.userId, table.capabilityId] })
		};
	}
);
