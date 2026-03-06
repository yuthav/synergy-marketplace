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
    check,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { sellers } from './sellers';

export const listingCategoryEnum = pgEnum('listing_category', [
    'ai_agents', 'digital_assets', 'templates', 'datasets', 'apis', 'saas_tools',
]);

export const listingStatusEnum = pgEnum('listing_status', [
    'draft', 'pending_review', 'published', 'archived', 'delisted',
]);

export const purchaseModelEnum = pgEnum('purchase_model', [
    'one_time', 'subscription', 'freemium', 'pay_per_use',
]);

export const subscriptionIntervalEnum = pgEnum('subscription_interval', [
    'monthly', 'quarterly', 'yearly',
]);

export const mediaTypeEnum = pgEnum('media_type', [
    'image', 'video', '3d_model', 'document', 'archive',
]);

// ─── Categories ───────────────────────────────────────────────────────────
export const categories = pgTable('categories', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    slug: varchar('slug', { length: 120 }).notNull().unique(),
    description: text('description'),
    icon: varchar('icon', { length: 50 }),
    type: listingCategoryEnum('type').notNull(),
    parentId: uuid('parent_id'),
    listingCount: integer('listing_count').notNull().default(0),
    sortOrder: integer('sort_order').notNull().default(0),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    uniqueIndex('categories_slug_idx').on(table.slug),
    index('categories_type_idx').on(table.type),
    index('categories_parent_id_idx').on(table.parentId),
]);

// ─── Listings ─────────────────────────────────────────────────────────────
export const listings = pgTable('listings', {
    id: uuid('id').defaultRandom().primaryKey(),
    sellerId: uuid('seller_id').notNull().references(() => sellers.id),
    categoryId: uuid('category_id').notNull().references(() => categories.id),
    title: varchar('title', { length: 200 }).notNull(),
    slug: varchar('slug', { length: 220 }).notNull().unique(),
    shortDescription: varchar('short_description', { length: 300 }).notNull(),
    description: text('description').notNull(),
    status: listingStatusEnum('status').notNull().default('draft'),
    purchaseModel: purchaseModelEnum('purchase_model').notNull(),
    category: listingCategoryEnum('category_type').notNull(),
    tags: text('tags').array().notNull().default([]),
    version: varchar('version', { length: 20 }).notNull().default('1.0.0'),
    changelog: text('changelog'),
    supportedBlockchains: text('supported_blockchains').array().notNull().default([]),
    isVerified: boolean('is_verified').notNull().default(false),
    isFeatured: boolean('is_featured').notNull().default(false),
    viewCount: integer('view_count').notNull().default(0),
    purchaseCount: integer('purchase_count').notNull().default(0),
    avgRating: numeric('avg_rating', { precision: 3, scale: 2 }).notNull().default('0.00'),
    reviewCount: integer('review_count').notNull().default(0),
    apiDocsUrl: text('api_docs_url'),
    demoUrl: text('demo_url'),
    repositoryUrl: text('repository_url'),
    delistedReason: text('delisted_reason'),
    delistedBy: uuid('delisted_by'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
    uniqueIndex('listings_slug_idx').on(table.slug),
    index('listings_seller_id_idx').on(table.sellerId),
    index('listings_category_id_idx').on(table.categoryId),
    index('listings_status_idx').on(table.status),
    index('listings_purchase_model_idx').on(table.purchaseModel),
    index('listings_category_type_idx').on(table.category),
    index('listings_is_featured_idx').on(table.isFeatured),
    index('listings_published_at_idx').on(table.publishedAt),
    index('listings_created_at_idx').on(table.createdAt),
]);

// ─── Listing Media ────────────────────────────────────────────────────────
export const listingMedia = pgTable('listing_media', {
    id: uuid('id').defaultRandom().primaryKey(),
    listingId: uuid('listing_id').notNull().references(() => listings.id, { onDelete: 'cascade' }),
    type: mediaTypeEnum('type').notNull(),
    url: text('url').notNull(),
    thumbnailUrl: text('thumbnail_url'),
    alt: varchar('alt', { length: 200 }),
    sortOrder: integer('sort_order').notNull().default(0),
    metadata: text('metadata'), // JSON string
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('listing_media_listing_id_idx').on(table.listingId),
]);

// ─── Pricing ──────────────────────────────────────────────────────────────
export const pricing = pgTable('pricing', {
    id: uuid('id').defaultRandom().primaryKey(),
    listingId: uuid('listing_id').notNull().references(() => listings.id, { onDelete: 'cascade' }),
    label: varchar('label', { length: 50 }).notNull(),
    priceUsd: numeric('price_usd', { precision: 12, scale: 2 }).notNull(),
    interval: subscriptionIntervalEnum('interval'),
    features: text('features').array().notNull().default([]),
    isPopular: boolean('is_popular').notNull().default(false),
    maxUsage: integer('max_usage'),
    sortOrder: integer('sort_order').notNull().default(0),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('pricing_listing_id_idx').on(table.listingId),
]);

// ─── Listing Versions ─────────────────────────────────────────────────────
export const listingVersions = pgTable('listing_versions', {
    id: uuid('id').defaultRandom().primaryKey(),
    listingId: uuid('listing_id').notNull().references(() => listings.id, { onDelete: 'cascade' }),
    version: varchar('version', { length: 20 }).notNull(),
    changelog: text('changelog').notNull(),
    fileUrl: text('file_url'),
    fileSize: integer('file_size'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('listing_versions_listing_id_idx').on(table.listingId),
    uniqueIndex('listing_versions_listing_version_idx').on(table.listingId, table.version),
]);

// ─── Collections ──────────────────────────────────────────────────────────
export const collections = pgTable('collections', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    slug: varchar('slug', { length: 120 }).notNull().unique(),
    description: text('description'),
    coverImage: text('cover_image'),
    curatedBy: uuid('curated_by').notNull(),
    isPublic: boolean('is_public').notNull().default(true),
    itemCount: integer('item_count').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const collectionItems = pgTable('collection_items', {
    id: uuid('id').defaultRandom().primaryKey(),
    collectionId: uuid('collection_id').notNull().references(() => collections.id, { onDelete: 'cascade' }),
    listingId: uuid('listing_id').notNull().references(() => listings.id, { onDelete: 'cascade' }),
    sortOrder: integer('sort_order').notNull().default(0),
    addedAt: timestamp('added_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    uniqueIndex('collection_items_unique_idx').on(table.collectionId, table.listingId),
]);
