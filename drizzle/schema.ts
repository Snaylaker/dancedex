import { pgTable, pgEnum, timestamp, text, uuid, foreignKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])


export const users = pgTable("users", {
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	name: text("name"),
	id: uuid("id").primaryKey().notNull(),
});

export const dances = pgTable("dances", {
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: text("name"),
	fileName: text("file_name"),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").references(() => users.id),
});