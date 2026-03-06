import { z } from 'zod';

// ─── Review ────────────────────────────────────────────────────────────────
export const ReviewSchema = z.object({
    id: z.string().uuid(),
    listingId: z.string().uuid(),
    userId: z.string().uuid(),
    orderId: z.string().uuid().nullable(),
    rating: z.number().int().min(1).max(5),
    title: z.string().max(200),
    content: z.string().max(2000),
    isVerifiedPurchase: z.boolean().default(false),
    helpfulCount: z.number().int().nonnegative().default(0),
    sellerReply: z.string().max(1000).nullable(),
    sellerRepliedAt: z.string().datetime().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    deletedAt: z.string().datetime().nullable(),
});
export type Review = z.infer<typeof ReviewSchema>;

export const CreateReviewSchema = z.object({
    listingId: z.string().uuid(),
    rating: z.number().int().min(1).max(5),
    title: z.string().min(3).max(200),
    content: z.string().min(10).max(2000),
});
export type CreateReview = z.infer<typeof CreateReviewSchema>;

export const ReplyToReviewSchema = z.object({
    reply: z.string().min(1).max(1000),
});
export type ReplyToReview = z.infer<typeof ReplyToReviewSchema>;
