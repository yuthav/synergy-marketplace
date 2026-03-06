import {
    pgTable,
    uuid,
    varchar,
    text,
    boolean,
    timestamp,
    numeric,
    integer,
    pgEnum,
    index,
    uniqueIndex,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const kybStatusEnum = pgEnum('kyb_status', [
    'not_started', 'pending', 'in_review', 'approved', 'rejected', 'expired',
]);

export const merchantTierEnum = pgEnum('merchant_tier', ['bronze', 'silver', 'gold', 'platinum']);

export const payoutScheduleEnum = pgEnum('payout_schedule', ['daily', 'weekly', 'biweekly', 'monthly']);

export const sellerTeamRoleEnum = pgEnum('seller_team_role', [
    'owner', 'admin', 'catalogue_mgr', 'finance_mgr', 'support',
]);

// ─── Sellers ──────────────────────────────────────────────────────────────
export const sellers = pgTable('sellers', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id).unique(),
    businessName: varchar('business_name', { length: 200 }).notNull(),
    slug: varchar('slug', { length: 220 }).notNull().unique(),
    businessType: varchar('business_type', { length: 20 }).default('individual'),
    description: text('description'),
    logo: text('logo'),
    website: text('website'),
    contactEmail: varchar('contact_email', { length: 255 }).notNull(),
    country: varchar('country', { length: 2 }),
    taxId: varchar('tax_id', { length: 50 }),
    kybStatus: kybStatusEnum('kyb_status').notNull().default('not_started'),
    tier: merchantTierEnum('tier').notNull().default('bronze'),
    stripeAccountId: varchar('stripe_account_id', { length: 100 }),
    commissionRate: numeric('commission_rate', { precision: 5, scale: 2 }).notNull().default('15.00'),
    payoutSchedule: payoutScheduleEnum('payout_schedule').notNull().default('weekly'),
    minimumPayout: numeric('minimum_payout', { precision: 10, scale: 2 }).notNull().default('50.00'),
    holdPeriodDays: integer('hold_period_days').notNull().default(7),
    totalRevenue: numeric('total_revenue', { precision: 15, scale: 2 }).notNull().default('0.00'),
    totalOrders: integer('total_orders').notNull().default(0),
    avgRating: numeric('avg_rating', { precision: 3, scale: 2 }).notNull().default('0.00'),
    isActive: boolean('is_active').notNull().default(true),
    isSuspended: boolean('is_suspended').notNull().default(false),
    suspendedReason: text('suspended_reason'),
    suspendedAt: timestamp('suspended_at', { withTimezone: true }),
    onboardingCompleted: boolean('onboarding_completed').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
    index('sellers_user_id_idx').on(table.userId),
    uniqueIndex('sellers_slug_idx').on(table.slug),
    index('sellers_kyb_status_idx').on(table.kybStatus),
    index('sellers_tier_idx').on(table.tier),
    index('sellers_created_at_idx').on(table.createdAt),
]);

// ─── Seller Team Members ─────────────────────────────────────────────────
export const sellerTeamMembers = pgTable('seller_team_members', {
    id: uuid('id').defaultRandom().primaryKey(),
    sellerId: uuid('seller_id').notNull().references(() => sellers.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').references(() => users.id),
    role: sellerTeamRoleEnum('role').notNull(),
    invitedEmail: varchar('invited_email', { length: 255 }).notNull(),
    acceptedAt: timestamp('accepted_at', { withTimezone: true }),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('team_members_seller_id_idx').on(table.sellerId),
    index('team_members_user_id_idx').on(table.userId),
    uniqueIndex('team_members_seller_email_idx').on(table.sellerId, table.invitedEmail),
]);
