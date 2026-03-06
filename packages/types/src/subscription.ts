import { z } from 'zod';
import { SubscriptionStatus, SubscriptionInterval, PaymentMethod } from './enums';

// ─── Subscription ──────────────────────────────────────────────────────────
export const SubscriptionSchema = z.object({
    id: z.string().uuid(),
    buyerId: z.string().uuid(),
    sellerId: z.string().uuid(),
    listingId: z.string().uuid(),
    pricingId: z.string().uuid(),
    status: SubscriptionStatus,
    interval: SubscriptionInterval,
    priceUsd: z.number().nonnegative(),
    paymentMethod: PaymentMethod,
    stripeSubscriptionId: z.string().nullable(),
    currentPeriodStart: z.string().datetime(),
    currentPeriodEnd: z.string().datetime(),
    cancelAtPeriodEnd: z.boolean().default(false),
    cancelledAt: z.string().datetime().nullable(),
    trialEndAt: z.string().datetime().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type Subscription = z.infer<typeof SubscriptionSchema>;

export const UpdateSubscriptionSchema = z.object({
    action: z.enum(['pause', 'resume', 'cancel', 'upgrade', 'downgrade']),
    newPricingId: z.string().uuid().optional(), // for upgrade/downgrade
});
export type UpdateSubscription = z.infer<typeof UpdateSubscriptionSchema>;
