import {
    pgTable,
    uuid,
    varchar,
    text,
    boolean,
    timestamp,
    index,
} from 'drizzle-orm/pg-core';
import { users } from './users';

// ─── Message Threads ──────────────────────────────────────────────────────
export const messageThreads = pgTable('message_threads', {
    id: uuid('id').defaultRandom().primaryKey(),
    subject: varchar('subject', { length: 200 }).notNull(),
    listingId: uuid('listing_id'),
    orderId: uuid('order_id'),
    isArchived: boolean('is_archived').notNull().default(false),
    lastMessageAt: timestamp('last_message_at', { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// ─── Thread Participants ──────────────────────────────────────────────────
export const threadParticipants = pgTable('thread_participants', {
    id: uuid('id').defaultRandom().primaryKey(),
    threadId: uuid('thread_id').notNull().references(() => messageThreads.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').notNull().references(() => users.id),
    lastReadAt: timestamp('last_read_at', { withTimezone: true }),
    joinedAt: timestamp('joined_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('thread_participants_thread_id_idx').on(table.threadId),
    index('thread_participants_user_id_idx').on(table.userId),
]);

// ─── Messages ─────────────────────────────────────────────────────────────
export const messages = pgTable('messages', {
    id: uuid('id').defaultRandom().primaryKey(),
    threadId: uuid('thread_id').notNull().references(() => messageThreads.id, { onDelete: 'cascade' }),
    senderId: uuid('sender_id').notNull().references(() => users.id),
    content: text('content').notNull(),
    attachments: text('attachments'), // JSON array
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('messages_thread_id_idx').on(table.threadId),
    index('messages_sender_id_idx').on(table.senderId),
    index('messages_created_at_idx').on(table.createdAt),
]);
