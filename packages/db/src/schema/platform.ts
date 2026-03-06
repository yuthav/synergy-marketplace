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
import { sellers } from './sellers';

export const maintenanceModeEnum = pgEnum('maintenance_mode', ['off', 'read_only', 'full_lockout']);
export const geoActionEnum = pgEnum('geo_action', ['allow', 'block']);
export const workflowStatusEnum = pgEnum('workflow_status', ['pending', 'in_progress', 'approved', 'rejected', 'cancelled']);
export const ticketStatusEnum = pgEnum('ticket_status', ['open', 'in_progress', 'waiting_response', 'resolved', 'closed']);
export const ticketPriorityEnum = pgEnum('ticket_priority', ['low', 'medium', 'high', 'critical']);
export const announcementTargetEnum = pgEnum('announcement_target', ['all_buyers', 'all_sellers', 'all_users', 'specific_sellers', 'specific_segment']);

// ─── Platform Config ──────────────────────────────────────────────────────
export const platformConfig = pgTable('platform_config', {
    id: uuid('id').defaultRandom().primaryKey(),
    key: varchar('key', { length: 100 }).notNull().unique(),
    value: text('value').notNull(),
    description: text('description'),
    isSecret: boolean('is_secret').notNull().default(false),
    updatedBy: uuid('updated_by').references(() => users.id),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    uniqueIndex('platform_config_key_idx').on(table.key),
]);

// ─── Maintenance Windows ─────────────────────────────────────────────────
export const maintenanceWindows = pgTable('maintenance_windows', {
    id: uuid('id').defaultRandom().primaryKey(),
    portal: varchar('portal', { length: 20 }).notNull(), // marketplace | seller
    mode: maintenanceModeEnum('mode').notNull(),
    message: text('message').notNull(),
    estimatedEndAt: timestamp('estimated_end_at', { withTimezone: true }),
    scheduledStartAt: timestamp('scheduled_start_at', { withTimezone: true }),
    startedAt: timestamp('started_at', { withTimezone: true }),
    endedAt: timestamp('ended_at', { withTimezone: true }),
    createdBy: uuid('created_by').notNull().references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('maintenance_portal_idx').on(table.portal),
]);

// ─── Geo Restrictions ─────────────────────────────────────────────────────
export const geoRestrictions = pgTable('geo_restrictions', {
    id: uuid('id').defaultRandom().primaryKey(),
    portal: varchar('portal', { length: 20 }).notNull(),
    countryCode: varchar('country_code', { length: 2 }).notNull(),
    countryName: varchar('country_name', { length: 100 }).notNull(),
    action: geoActionEnum('action').notNull(),
    reason: text('reason'),
    createdBy: uuid('created_by').notNull().references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    uniqueIndex('geo_portal_country_idx').on(table.portal, table.countryCode),
    index('geo_portal_idx').on(table.portal),
]);

// ─── IP Rules ─────────────────────────────────────────────────────────────
export const ipRules = pgTable('ip_rules', {
    id: uuid('id').defaultRandom().primaryKey(),
    ipOrCidr: varchar('ip_or_cidr', { length: 50 }).notNull(),
    action: geoActionEnum('action').notNull(),
    portal: varchar('portal', { length: 20 }), // null = all portals
    description: text('description'),
    expiresAt: timestamp('expires_at', { withTimezone: true }),
    createdBy: uuid('created_by').notNull().references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('ip_rules_action_idx').on(table.action),
]);

// ─── Revenue Share Rules ──────────────────────────────────────────────────
export const revenueShareRules = pgTable('revenue_share_rules', {
    id: uuid('id').defaultRandom().primaryKey(),
    sellerId: uuid('seller_id').references(() => sellers.id), // null = global
    categoryId: uuid('category_id'),
    commissionRate: numeric('commission_rate', { precision: 5, scale: 2 }).notNull(),
    minVolumeUsd: numeric('min_volume_usd', { precision: 15, scale: 2 }),
    maxVolumeUsd: numeric('max_volume_usd', { precision: 15, scale: 2 }),
    effectiveFrom: timestamp('effective_from', { withTimezone: true }).notNull(),
    effectiveTo: timestamp('effective_to', { withTimezone: true }),
    createdBy: uuid('created_by').notNull().references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('revenue_share_seller_idx').on(table.sellerId),
    index('revenue_share_category_idx').on(table.categoryId),
]);

// ─── Platform Payment Details (Vault) ─────────────────────────────────────
export const platformPaymentDetails = pgTable('platform_payment_details', {
    id: uuid('id').defaultRandom().primaryKey(),
    label: varchar('label', { length: 100 }).notNull(),
    type: varchar('type', { length: 20 }).notNull(), // bank_account, crypto_wallet, stripe
    encryptedData: text('encrypted_data').notNull(), // AES-256
    lastFour: varchar('last_four', { length: 4 }),
    isPrimary: boolean('is_primary').notNull().default(false),
    createdBy: uuid('created_by').notNull().references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// ─── Action Workflows ─────────────────────────────────────────────────────
export const actionWorkflows = pgTable('action_workflows', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 200 }).notNull(),
    description: text('description'),
    type: varchar('type', { length: 30 }).notNull(), // refund, payout, listing_approval, dispute, kyb_review, custom
    status: workflowStatusEnum('status').notNull().default('pending'),
    priority: ticketPriorityEnum('priority').notNull().default('medium'),
    initiatedBy: uuid('initiated_by').notNull().references(() => users.id),
    assignedTo: uuid('assigned_to').references(() => users.id),
    relatedEntityType: varchar('related_entity_type', { length: 50 }),
    relatedEntityId: uuid('related_entity_id'),
    metadata: text('metadata'), // JSON
    completedAt: timestamp('completed_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('workflows_status_idx').on(table.status),
    index('workflows_type_idx').on(table.type),
    index('workflows_assigned_to_idx').on(table.assignedTo),
    index('workflows_created_at_idx').on(table.createdAt),
]);

export const workflowSteps = pgTable('workflow_steps', {
    id: uuid('id').defaultRandom().primaryKey(),
    workflowId: uuid('workflow_id').notNull().references(() => actionWorkflows.id, { onDelete: 'cascade' }),
    stepOrder: integer('step_order').notNull(),
    title: varchar('title', { length: 200 }).notNull(),
    assigneeId: uuid('assignee_id').notNull().references(() => users.id),
    status: workflowStatusEnum('status').notNull().default('pending'),
    notes: text('notes'),
    deadline: timestamp('deadline', { withTimezone: true }),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('workflow_steps_workflow_id_idx').on(table.workflowId),
]);

// ─── Internal Tickets ─────────────────────────────────────────────────────
export const internalTickets = pgTable('internal_tickets', {
    id: uuid('id').defaultRandom().primaryKey(),
    ticketNumber: varchar('ticket_number', { length: 30 }).notNull().unique(),
    subject: varchar('subject', { length: 300 }).notNull(),
    description: text('description').notNull(),
    status: ticketStatusEnum('status').notNull().default('open'),
    priority: ticketPriorityEnum('priority').notNull().default('medium'),
    createdById: uuid('created_by_id').notNull().references(() => users.id),
    assignedToId: uuid('assigned_to_id').references(() => users.id),
    relatedSellerId: uuid('related_seller_id').references(() => sellers.id),
    relatedBuyerId: uuid('related_buyer_id').references(() => users.id),
    relatedOrderId: uuid('related_order_id'),
    tags: text('tags').array().notNull().default([]),
    resolvedAt: timestamp('resolved_at', { withTimezone: true }),
    closedAt: timestamp('closed_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('tickets_status_idx').on(table.status),
    index('tickets_priority_idx').on(table.priority),
    index('tickets_assigned_to_idx').on(table.assignedToId),
    index('tickets_created_at_idx').on(table.createdAt),
]);

// ─── Announcements ───────────────────────────────────────────────────────
export const announcements = pgTable('announcements', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 200 }).notNull(),
    content: text('content').notNull(),
    target: announcementTargetEnum('target').notNull(),
    targetIds: text('target_ids').array(), // for specific_sellers
    isPublished: boolean('is_published').notNull().default(false),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    expiresAt: timestamp('expires_at', { withTimezone: true }),
    createdBy: uuid('created_by').notNull().references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('announcements_target_idx').on(table.target),
    index('announcements_published_idx').on(table.isPublished),
]);

// ─── Merchant Tier Config ─────────────────────────────────────────────────
export const merchantTierConfigs = pgTable('merchant_tier_configs', {
    id: uuid('id').defaultRandom().primaryKey(),
    tier: varchar('tier', { length: 20 }).notNull().unique(), // bronze, silver, gold, platinum
    minRevenue: numeric('min_revenue', { precision: 15, scale: 2 }).notNull(),
    minOrders: integer('min_orders').notNull(),
    commissionDiscount: numeric('commission_discount', { precision: 5, scale: 2 }).notNull().default('0.00'),
    maxListings: integer('max_listings').notNull(),
    prioritySupport: boolean('priority_support').notNull().default(false),
    featuredSlots: integer('featured_slots').notNull().default(0),
    description: text('description').notNull(),
});

// ─── Feature Flags ────────────────────────────────────────────────────────
export const featureFlags = pgTable('feature_flags', {
    id: uuid('id').defaultRandom().primaryKey(),
    key: varchar('key', { length: 100 }).notNull().unique(),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description'),
    isEnabled: boolean('is_enabled').notNull().default(false),
    portals: text('portals').array().notNull().default([]),
    updatedBy: uuid('updated_by').references(() => users.id),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    uniqueIndex('feature_flags_key_idx').on(table.key),
]);

// ─── Admin Audit Logs ─────────────────────────────────────────────────────
export const adminAuditLogs = pgTable('admin_audit_logs', {
    id: uuid('id').defaultRandom().primaryKey(),
    actorId: uuid('actor_id').notNull().references(() => users.id),
    actorEmail: varchar('actor_email', { length: 255 }).notNull(),
    action: varchar('action', { length: 100 }).notNull(),
    resource: varchar('resource', { length: 100 }).notNull(),
    resourceId: uuid('resource_id'),
    beforeState: text('before_state'), // JSON
    afterState: text('after_state'), // JSON
    reason: text('reason'),
    ipAddress: varchar('ip_address', { length: 45 }).notNull(),
    userAgent: text('user_agent').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('audit_actor_id_idx').on(table.actorId),
    index('audit_action_idx').on(table.action),
    index('audit_resource_idx').on(table.resource),
    index('audit_created_at_idx').on(table.createdAt),
]);
