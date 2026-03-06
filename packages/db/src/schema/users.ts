import {
    pgTable,
    uuid,
    varchar,
    text,
    boolean,
    timestamp,
    pgEnum,
    index,
    uniqueIndex,
} from 'drizzle-orm/pg-core';

// ─── Enums ────────────────────────────────────────────────────────────────
export const portalTypeEnum = pgEnum('portal_type', ['marketplace', 'seller', 'platform']);

export const userRoleEnum = pgEnum('user_role', [
    'buyer',
    'seller_owner', 'seller_admin', 'seller_catalogue_mgr', 'seller_finance_mgr', 'seller_support',
    'platform_super_admin', 'platform_ops_manager', 'platform_finance_manager',
    'platform_content_moderator', 'platform_support_agent', 'platform_developer',
]);

export const blockchainEnum = pgEnum('blockchain', ['ethereum', 'solana', 'base', 'polygon']);

// ─── Users ────────────────────────────────────────────────────────────────
export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: varchar('email', { length: 255 }).notNull(),
    name: varchar('name', { length: 100 }).notNull(),
    displayName: varchar('display_name', { length: 50 }),
    hashedPassword: text('hashed_password'),
    avatar: text('avatar'),
    bio: text('bio'),
    role: userRoleEnum('role').notNull().default('buyer'),
    portalAccess: text('portal_access').array().notNull().default([]),
    emailVerified: boolean('email_verified').notNull().default(false),
    twoFactorEnabled: boolean('two_factor_enabled').notNull().default(false),
    twoFactorSecret: text('two_factor_secret'),
    preferredCurrency: varchar('preferred_currency', { length: 10 }).default('USD'),
    preferredLanguage: varchar('preferred_language', { length: 10 }).default('en'),
    isActive: boolean('is_active').notNull().default(true),
    lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
    uniqueIndex('users_email_role_idx').on(table.email, table.role),
    index('users_email_idx').on(table.email),
    index('users_role_idx').on(table.role),
    index('users_created_at_idx').on(table.createdAt),
]);

// ─── OAuth Accounts ───────────────────────────────────────────────────────
export const oauthAccounts = pgTable('oauth_accounts', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    provider: varchar('provider', { length: 50 }).notNull(),
    providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    expiresAt: timestamp('expires_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    uniqueIndex('oauth_provider_account_idx').on(table.provider, table.providerAccountId),
    index('oauth_user_id_idx').on(table.userId),
]);

// ─── Sessions ─────────────────────────────────────────────────────────────
export const sessions = pgTable('sessions', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    portal: portalTypeEnum('portal').notNull(),
    token: text('token').notNull().unique(),
    ipAddress: varchar('ip_address', { length: 45 }),
    userAgent: text('user_agent'),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('sessions_user_id_idx').on(table.userId),
    index('sessions_token_idx').on(table.token),
    index('sessions_expires_at_idx').on(table.expiresAt),
]);

// ─── Wallets ──────────────────────────────────────────────────────────────
export const wallets = pgTable('wallets', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    blockchain: blockchainEnum('blockchain').notNull(),
    address: varchar('address', { length: 255 }).notNull(),
    isCustodial: boolean('is_custodial').notNull().default(false),
    isPrimary: boolean('is_primary').notNull().default(false),
    label: varchar('label', { length: 50 }),
    encryptedPrivateKey: text('encrypted_private_key'), // For custodial wallets
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    uniqueIndex('wallets_address_blockchain_idx').on(table.address, table.blockchain),
    index('wallets_user_id_idx').on(table.userId),
]);

// ─── Notification Preferences ─────────────────────────────────────────────
export const notificationPreferences = pgTable('notification_preferences', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }).unique(),
    emailOrders: boolean('email_orders').notNull().default(true),
    emailSubscriptions: boolean('email_subscriptions').notNull().default(true),
    emailMarketing: boolean('email_marketing').notNull().default(false),
    emailSecurity: boolean('email_security').notNull().default(true),
    inAppOrders: boolean('in_app_orders').notNull().default(true),
    inAppMessages: boolean('in_app_messages').notNull().default(true),
    inAppAnnouncements: boolean('in_app_announcements').notNull().default(true),
    webhookUrl: text('webhook_url'),
    webhookEnabled: boolean('webhook_enabled').notNull().default(false),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// ─── API Keys ─────────────────────────────────────────────────────────────
export const apiKeys = pgTable('api_keys', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 100 }).notNull(),
    keyPrefix: varchar('key_prefix', { length: 20 }).notNull(),
    hashedKey: text('hashed_key').notNull(),
    scopes: text('scopes').array().notNull(),
    lastUsedAt: timestamp('last_used_at', { withTimezone: true }),
    expiresAt: timestamp('expires_at', { withTimezone: true }),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('api_keys_user_id_idx').on(table.userId),
    index('api_keys_prefix_idx').on(table.keyPrefix),
]);
