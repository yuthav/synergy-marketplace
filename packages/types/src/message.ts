import { z } from 'zod';

// ─── Message Thread ────────────────────────────────────────────────────────
export const MessageThreadSchema = z.object({
    id: z.string().uuid(),
    subject: z.string().max(200),
    participantIds: z.array(z.string().uuid()),
    listingId: z.string().uuid().nullable(),
    orderId: z.string().uuid().nullable(),
    lastMessageAt: z.string().datetime(),
    isArchived: z.boolean().default(false),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type MessageThread = z.infer<typeof MessageThreadSchema>;

// ─── Message ───────────────────────────────────────────────────────────────
export const MessageSchema = z.object({
    id: z.string().uuid(),
    threadId: z.string().uuid(),
    senderId: z.string().uuid(),
    content: z.string().max(5000),
    attachments: z.array(
        z.object({
            url: z.string().url(),
            name: z.string(),
            size: z.number().int().nonnegative(),
            mimeType: z.string(),
        }),
    ),
    isRead: z.boolean().default(false),
    readAt: z.string().datetime().nullable(),
    createdAt: z.string().datetime(),
});
export type Message = z.infer<typeof MessageSchema>;

export const SendMessageSchema = z.object({
    threadId: z.string().uuid().optional(), // omit to create new thread
    recipientId: z.string().uuid(),
    subject: z.string().max(200).optional(),
    content: z.string().min(1).max(5000),
    listingId: z.string().uuid().optional(),
    orderId: z.string().uuid().optional(),
});
export type SendMessage = z.infer<typeof SendMessageSchema>;
