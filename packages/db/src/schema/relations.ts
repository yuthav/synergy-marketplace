import { relations } from 'drizzle-orm';
import { users, oauthAccounts, sessions, wallets, notificationPreferences, apiKeys } from './users';
import { sellers, sellerTeamMembers } from './sellers';
import {
    categories, listings, listingMedia, pricing, listingVersions,
    collections, collectionItems,
} from './listings';
import {
    carts, cartItems, orders, orderItems, subscriptions, reviews, invoices,
} from './commerce';
import { transactions, payouts, disputes, platformCredits } from './finance';
import { messageThreads, threadParticipants, messages } from './messaging';
import {
    actionWorkflows, workflowSteps, internalTickets, adminAuditLogs,
} from './platform';

// ─── User Relations ───────────────────────────────────────────────────────
export const usersRelations = relations(users, ({ one, many }) => ({
    seller: one(sellers, { fields: [users.id], references: [sellers.userId] }),
    oauthAccounts: many(oauthAccounts),
    sessions: many(sessions),
    wallets: many(wallets),
    notificationPreferences: one(notificationPreferences, { fields: [users.id], references: [notificationPreferences.userId] }),
    apiKeys: many(apiKeys),
    cart: one(carts, { fields: [users.id], references: [carts.userId] }),
    orders: many(orders),
    subscriptions: many(subscriptions),
    reviews: many(reviews),
    invoices: many(invoices),
    credits: one(platformCredits, { fields: [users.id], references: [platformCredits.userId] }),
}));

export const oauthAccountsRelations = relations(oauthAccounts, ({ one }) => ({
    user: one(users, { fields: [oauthAccounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const walletsRelations = relations(wallets, ({ one }) => ({
    user: one(users, { fields: [wallets.userId], references: [users.id] }),
}));

// ─── Seller Relations ─────────────────────────────────────────────────────
export const sellersRelations = relations(sellers, ({ one, many }) => ({
    user: one(users, { fields: [sellers.userId], references: [users.id] }),
    teamMembers: many(sellerTeamMembers),
    listings: many(listings),
    orders: many(orders),
    payouts: many(payouts),
    disputes: many(disputes),
}));

export const teamMembersRelations = relations(sellerTeamMembers, ({ one }) => ({
    seller: one(sellers, { fields: [sellerTeamMembers.sellerId], references: [sellers.id] }),
    user: one(users, { fields: [sellerTeamMembers.userId], references: [users.id] }),
}));

// ─── Listing Relations ────────────────────────────────────────────────────
export const categoriesRelations = relations(categories, ({ many }) => ({
    listings: many(listings),
}));

export const listingsRelations = relations(listings, ({ one, many }) => ({
    seller: one(sellers, { fields: [listings.sellerId], references: [sellers.id] }),
    categoryRef: one(categories, { fields: [listings.categoryId], references: [categories.id] }),
    media: many(listingMedia),
    pricingTiers: many(pricing),
    versions: many(listingVersions),
    reviews: many(reviews),
    orderItems: many(orderItems),
}));

export const listingMediaRelations = relations(listingMedia, ({ one }) => ({
    listing: one(listings, { fields: [listingMedia.listingId], references: [listings.id] }),
}));

export const pricingRelations = relations(pricing, ({ one }) => ({
    listing: one(listings, { fields: [pricing.listingId], references: [listings.id] }),
}));

// ─── Commerce Relations ───────────────────────────────────────────────────
export const cartsRelations = relations(carts, ({ one, many }) => ({
    user: one(users, { fields: [carts.userId], references: [users.id] }),
    items: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
    cart: one(carts, { fields: [cartItems.cartId], references: [carts.id] }),
    listing: one(listings, { fields: [cartItems.listingId], references: [listings.id] }),
    pricing: one(pricing, { fields: [cartItems.pricingId], references: [pricing.id] }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
    buyer: one(users, { fields: [orders.buyerId], references: [users.id] }),
    seller: one(sellers, { fields: [orders.sellerId], references: [sellers.id] }),
    items: many(orderItems),
    invoice: one(invoices, { fields: [orders.id], references: [invoices.orderId] }),
    transactions: many(transactions),
    disputes: many(disputes),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
    listing: one(listings, { fields: [orderItems.listingId], references: [listings.id] }),
    pricing: one(pricing, { fields: [orderItems.pricingId], references: [pricing.id] }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
    buyer: one(users, { fields: [subscriptions.buyerId], references: [users.id] }),
    seller: one(sellers, { fields: [subscriptions.sellerId], references: [sellers.id] }),
    listing: one(listings, { fields: [subscriptions.listingId], references: [listings.id] }),
    pricing: one(pricing, { fields: [subscriptions.pricingId], references: [pricing.id] }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
    listing: one(listings, { fields: [reviews.listingId], references: [listings.id] }),
    user: one(users, { fields: [reviews.userId], references: [users.id] }),
    order: one(orders, { fields: [reviews.orderId], references: [orders.id] }),
}));

// ─── Finance Relations ────────────────────────────────────────────────────
export const transactionsRelations = relations(transactions, ({ one }) => ({
    buyer: one(users, { fields: [transactions.buyerId], references: [users.id] }),
    seller: one(sellers, { fields: [transactions.sellerId], references: [sellers.id] }),
    order: one(orders, { fields: [transactions.orderId], references: [orders.id] }),
}));

export const payoutsRelations = relations(payouts, ({ one }) => ({
    seller: one(sellers, { fields: [payouts.sellerId], references: [sellers.id] }),
}));

export const disputesRelations = relations(disputes, ({ one }) => ({
    order: one(orders, { fields: [disputes.orderId], references: [orders.id] }),
    buyer: one(users, { fields: [disputes.buyerId], references: [users.id] }),
    seller: one(sellers, { fields: [disputes.sellerId], references: [sellers.id] }),
}));

// ─── Messaging Relations ──────────────────────────────────────────────────
export const threadRelations = relations(messageThreads, ({ many }) => ({
    participants: many(threadParticipants),
    messages: many(messages),
}));

export const participantRelations = relations(threadParticipants, ({ one }) => ({
    thread: one(messageThreads, { fields: [threadParticipants.threadId], references: [messageThreads.id] }),
    user: one(users, { fields: [threadParticipants.userId], references: [users.id] }),
}));

export const messageRelations = relations(messages, ({ one }) => ({
    thread: one(messageThreads, { fields: [messages.threadId], references: [messageThreads.id] }),
    sender: one(users, { fields: [messages.senderId], references: [users.id] }),
}));

// ─── Platform Relations ───────────────────────────────────────────────────
export const workflowRelations = relations(actionWorkflows, ({ many }) => ({
    steps: many(workflowSteps),
}));

export const workflowStepRelations = relations(workflowSteps, ({ one }) => ({
    workflow: one(actionWorkflows, { fields: [workflowSteps.workflowId], references: [actionWorkflows.id] }),
    assignee: one(users, { fields: [workflowSteps.assigneeId], references: [users.id] }),
}));
