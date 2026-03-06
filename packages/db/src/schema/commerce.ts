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
import { users } from './users';
import { sellers } from './sellers';
import { listings, pricing } from './listings';

export const orderStatusEnum = pgEnum('order_status', [
    'pending', 'processing', 'completed', 'cancelled', 'refunded', 'disputed',
]);

export const paymentMethodEnum = pgEnum('payment_method', [
    'stripe', 'eth_wallet', 'sol_wallet', 'x402', 'visa', 'synergetics_pay',
]);

export const currencyEnum = pgEnum('currency', ['USD', 'ETH', 'SOL', 'BTC', 'USDC', 'USDT']);

export const subscriptionStatusEnum = pgEnum('subscription_status', [
    'active', 'paused', 'cancelled', 'past_due', 'trialing', 'expired',
]);

// ─── Cart ─────────────────────────────────────────────────────────────────
export const carts = pgTable('carts', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }).unique(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const cartItems = pgTable('cart_items', {
    id: uuid('id').defaultRandom().primaryKey(),
    cartId: uuid('cart_id').notNull().references(() => carts.id, { onDelete: 'cascade' }),
    listingId: uuid('listing_id').notNull().references(() => listings.id),
    pricingId: uuid('pricing_id').notNull().references(() => pricing.id),
    quantity: integer('quantity').notNull().default(1),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('cart_items_cart_id_idx').on(table.cartId),
    uniqueIndex('cart_items_cart_listing_pricing_idx').on(table.cartId, table.listingId, table.pricingId),
]);

// ─── Orders ───────────────────────────────────────────────────────────────
export const orders = pgTable('orders', {
    id: uuid('id').defaultRandom().primaryKey(),
    orderNumber: varchar('order_number', { length: 30 }).notNull().unique(),
    buyerId: uuid('buyer_id').notNull().references(() => users.id),
    sellerId: uuid('seller_id').notNull().references(() => sellers.id),
    status: orderStatusEnum('status').notNull().default('pending'),
    paymentMethod: paymentMethodEnum('payment_method').notNull(),
    currency: currencyEnum('currency').notNull().default('USD'),
    subtotalUsd: numeric('subtotal_usd', { precision: 12, scale: 2 }).notNull(),
    platformFeeUsd: numeric('platform_fee_usd', { precision: 12, scale: 2 }).notNull(),
    totalUsd: numeric('total_usd', { precision: 12, scale: 2 }).notNull(),
    cryptoAmount: numeric('crypto_amount', { precision: 20, scale: 8 }),
    cryptoCurrency: currencyEnum('crypto_currency'),
    txHash: varchar('tx_hash', { length: 100 }),
    stripePaymentIntentId: varchar('stripe_payment_intent_id', { length: 100 }),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    completedAt: timestamp('completed_at', { withTimezone: true }),
}, (table) => [
    uniqueIndex('orders_number_idx').on(table.orderNumber),
    index('orders_buyer_id_idx').on(table.buyerId),
    index('orders_seller_id_idx').on(table.sellerId),
    index('orders_status_idx').on(table.status),
    index('orders_created_at_idx').on(table.createdAt),
    index('orders_payment_method_idx').on(table.paymentMethod),
]);

export const orderItems = pgTable('order_items', {
    id: uuid('id').defaultRandom().primaryKey(),
    orderId: uuid('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
    listingId: uuid('listing_id').notNull().references(() => listings.id),
    pricingId: uuid('pricing_id').notNull().references(() => pricing.id),
    quantity: integer('quantity').notNull().default(1),
    unitPriceUsd: numeric('unit_price_usd', { precision: 12, scale: 2 }).notNull(),
    totalUsd: numeric('total_usd', { precision: 12, scale: 2 }).notNull(),
    licenseKey: varchar('license_key', { length: 255 }),
    downloadUrl: text('download_url'),
    downloadExpiresAt: timestamp('download_expires_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('order_items_order_id_idx').on(table.orderId),
    index('order_items_listing_id_idx').on(table.listingId),
]);

// ─── Subscriptions ────────────────────────────────────────────────────────
export const subscriptions = pgTable('subscriptions', {
    id: uuid('id').defaultRandom().primaryKey(),
    buyerId: uuid('buyer_id').notNull().references(() => users.id),
    sellerId: uuid('seller_id').notNull().references(() => sellers.id),
    listingId: uuid('listing_id').notNull().references(() => listings.id),
    pricingId: uuid('pricing_id').notNull().references(() => pricing.id),
    status: subscriptionStatusEnum('status').notNull().default('active'),
    interval: varchar('interval', { length: 20 }).notNull(),
    priceUsd: numeric('price_usd', { precision: 12, scale: 2 }).notNull(),
    paymentMethod: paymentMethodEnum('payment_method').notNull(),
    stripeSubscriptionId: varchar('stripe_subscription_id', { length: 100 }),
    currentPeriodStart: timestamp('current_period_start', { withTimezone: true }).notNull(),
    currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }).notNull(),
    cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
    cancelledAt: timestamp('cancelled_at', { withTimezone: true }),
    trialEndAt: timestamp('trial_end_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('subscriptions_buyer_id_idx').on(table.buyerId),
    index('subscriptions_seller_id_idx').on(table.sellerId),
    index('subscriptions_listing_id_idx').on(table.listingId),
    index('subscriptions_status_idx').on(table.status),
]);

// ─── Reviews ──────────────────────────────────────────────────────────────
export const reviews = pgTable('reviews', {
    id: uuid('id').defaultRandom().primaryKey(),
    listingId: uuid('listing_id').notNull().references(() => listings.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').notNull().references(() => users.id),
    orderId: uuid('order_id').references(() => orders.id),
    rating: integer('rating').notNull(),
    title: varchar('title', { length: 200 }).notNull(),
    content: text('content').notNull(),
    isVerifiedPurchase: boolean('is_verified_purchase').notNull().default(false),
    helpfulCount: integer('helpful_count').notNull().default(0),
    sellerReply: text('seller_reply'),
    sellerRepliedAt: timestamp('seller_replied_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
    index('reviews_listing_id_idx').on(table.listingId),
    index('reviews_user_id_idx').on(table.userId),
    index('reviews_rating_idx').on(table.rating),
    uniqueIndex('reviews_user_listing_idx').on(table.userId, table.listingId),
    check('reviews_rating_check', sql`${table.rating} >= 1 AND ${table.rating} <= 5`),
]);

// ─── Invoices ─────────────────────────────────────────────────────────────
export const invoices = pgTable('invoices', {
    id: uuid('id').defaultRandom().primaryKey(),
    invoiceNumber: varchar('invoice_number', { length: 30 }).notNull().unique(),
    userId: uuid('user_id').notNull().references(() => users.id),
    orderId: uuid('order_id').references(() => orders.id),
    subscriptionId: uuid('subscription_id').references(() => subscriptions.id),
    subtotalUsd: numeric('subtotal_usd', { precision: 12, scale: 2 }).notNull(),
    taxUsd: numeric('tax_usd', { precision: 12, scale: 2 }).notNull().default('0.00'),
    totalUsd: numeric('total_usd', { precision: 12, scale: 2 }).notNull(),
    status: varchar('status', { length: 20 }).notNull().default('draft'),
    pdfUrl: text('pdf_url'),
    dueDate: timestamp('due_date', { withTimezone: true }),
    paidAt: timestamp('paid_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('invoices_user_id_idx').on(table.userId),
    index('invoices_order_id_idx').on(table.orderId),
    uniqueIndex('invoices_number_idx').on(table.invoiceNumber),
]);
