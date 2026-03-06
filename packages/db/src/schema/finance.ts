import {
    pgTable,
    uuid,
    varchar,
    text,
    timestamp,
    numeric,
    pgEnum,
    index,
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { sellers } from './sellers';
import { orders } from './commerce';

export const transactionTypeEnum = pgEnum('transaction_type', [
    'purchase', 'subscription_payment', 'refund', 'payout',
    'platform_commission', 'credit_topup', 'credit_spend', 'deposit', 'withdrawal',
]);

export const transactionStatusEnum = pgEnum('transaction_status', [
    'pending', 'completed', 'failed', 'reversed',
]);

export const payoutStatusEnum = pgEnum('payout_status', [
    'pending', 'processing', 'completed', 'failed', 'cancelled',
]);

export const disputeStatusEnum = pgEnum('dispute_status', [
    'open', 'under_review', 'escalated', 'resolved_buyer', 'resolved_seller', 'closed',
]);

// ─── Transactions (Unified Ledger) ────────────────────────────────────────
export const transactions = pgTable('transactions', {
    id: uuid('id').defaultRandom().primaryKey(),
    transactionNumber: varchar('transaction_number', { length: 30 }).notNull().unique(),
    type: transactionTypeEnum('type').notNull(),
    paymentMethod: varchar('payment_method', { length: 20 }).notNull(),
    currency: varchar('currency', { length: 10 }).notNull().default('USD'),
    amountUsd: numeric('amount_usd', { precision: 15, scale: 2 }).notNull(),
    cryptoAmount: numeric('crypto_amount', { precision: 20, scale: 8 }),
    cryptoCurrency: varchar('crypto_currency', { length: 10 }),
    conversionRate: numeric('conversion_rate', { precision: 20, scale: 8 }),
    platformFeeUsd: numeric('platform_fee_usd', { precision: 12, scale: 2 }).notNull().default('0.00'),
    netAmountUsd: numeric('net_amount_usd', { precision: 15, scale: 2 }).notNull(),
    buyerId: uuid('buyer_id').references(() => users.id),
    sellerId: uuid('seller_id').references(() => sellers.id),
    orderId: uuid('order_id').references(() => orders.id),
    subscriptionId: uuid('subscription_id'),
    payoutId: uuid('payout_id'),
    stripePaymentIntentId: varchar('stripe_payment_intent_id', { length: 100 }),
    txHash: varchar('tx_hash', { length: 100 }),
    x402PaymentId: varchar('x402_payment_id', { length: 100 }),
    status: transactionStatusEnum('status').notNull().default('pending'),
    metadata: text('metadata'), // JSON
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('transactions_type_idx').on(table.type),
    index('transactions_buyer_id_idx').on(table.buyerId),
    index('transactions_seller_id_idx').on(table.sellerId),
    index('transactions_order_id_idx').on(table.orderId),
    index('transactions_status_idx').on(table.status),
    index('transactions_created_at_idx').on(table.createdAt),
    index('transactions_payment_method_idx').on(table.paymentMethod),
]);

// ─── Payouts ──────────────────────────────────────────────────────────────
export const payouts = pgTable('payouts', {
    id: uuid('id').defaultRandom().primaryKey(),
    sellerId: uuid('seller_id').notNull().references(() => sellers.id),
    amountUsd: numeric('amount_usd', { precision: 12, scale: 2 }).notNull(),
    feeUsd: numeric('fee_usd', { precision: 12, scale: 2 }).notNull().default('0.00'),
    netAmountUsd: numeric('net_amount_usd', { precision: 12, scale: 2 }).notNull(),
    status: payoutStatusEnum('status').notNull().default('pending'),
    paymentMethod: varchar('payment_method', { length: 20 }).notNull(),
    stripeTransferId: varchar('stripe_transfer_id', { length: 100 }),
    cryptoTxHash: varchar('crypto_tx_hash', { length: 100 }),
    destinationAddress: text('destination_address'),
    periodStart: timestamp('period_start', { withTimezone: true }).notNull(),
    periodEnd: timestamp('period_end', { withTimezone: true }).notNull(),
    processedAt: timestamp('processed_at', { withTimezone: true }),
    failedReason: text('failed_reason'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('payouts_seller_id_idx').on(table.sellerId),
    index('payouts_status_idx').on(table.status),
    index('payouts_created_at_idx').on(table.createdAt),
]);

// ─── Disputes ─────────────────────────────────────────────────────────────
export const disputes = pgTable('disputes', {
    id: uuid('id').defaultRandom().primaryKey(),
    orderId: uuid('order_id').notNull().references(() => orders.id),
    buyerId: uuid('buyer_id').notNull().references(() => users.id),
    sellerId: uuid('seller_id').notNull().references(() => sellers.id),
    status: disputeStatusEnum('status').notNull().default('open'),
    reason: varchar('reason', { length: 500 }).notNull(),
    description: text('description').notNull(),
    evidenceUrls: text('evidence_urls').array().notNull().default([]),
    resolution: text('resolution'),
    resolvedBy: uuid('resolved_by'),
    refundAmount: numeric('refund_amount', { precision: 12, scale: 2 }),
    stripeDisputeId: varchar('stripe_dispute_id', { length: 100 }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    resolvedAt: timestamp('resolved_at', { withTimezone: true }),
}, (table) => [
    index('disputes_order_id_idx').on(table.orderId),
    index('disputes_buyer_id_idx').on(table.buyerId),
    index('disputes_seller_id_idx').on(table.sellerId),
    index('disputes_status_idx').on(table.status),
]);

// ─── Platform Credits ─────────────────────────────────────────────────────
export const platformCredits = pgTable('platform_credits', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id),
    balanceUsd: numeric('balance_usd', { precision: 12, scale: 2 }).notNull().default('0.00'),
    lifetimeEarned: numeric('lifetime_earned', { precision: 15, scale: 2 }).notNull().default('0.00'),
    lifetimeSpent: numeric('lifetime_spent', { precision: 15, scale: 2 }).notNull().default('0.00'),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('platform_credits_user_id_idx').on(table.userId),
]);
