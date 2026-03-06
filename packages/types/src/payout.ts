import { z } from 'zod';
import { PayoutStatus, PayoutSchedule, PaymentMethod } from './enums';

// ─── Payout ────────────────────────────────────────────────────────────────
export const PayoutSchema = z.object({
    id: z.string().uuid(),
    sellerId: z.string().uuid(),
    amountUsd: z.number().nonnegative(),
    feeUsd: z.number().nonnegative(),
    netAmountUsd: z.number().nonnegative(),
    status: PayoutStatus,
    paymentMethod: PaymentMethod,
    stripeTransferId: z.string().nullable(),
    cryptoTxHash: z.string().nullable(),
    destinationAddress: z.string().nullable(),
    periodStart: z.string().datetime(),
    periodEnd: z.string().datetime(),
    processedAt: z.string().datetime().nullable(),
    failedReason: z.string().nullable(),
    createdAt: z.string().datetime(),
});
export type Payout = z.infer<typeof PayoutSchema>;

export const PayoutSettingsSchema = z.object({
    schedule: PayoutSchedule,
    minimumAmount: z.number().nonnegative().default(50),
    preferredMethod: PaymentMethod,
    bankAccountLast4: z.string().length(4).nullable(),
    cryptoWalletAddress: z.string().nullable(),
});
export type PayoutSettings = z.infer<typeof PayoutSettingsSchema>;
