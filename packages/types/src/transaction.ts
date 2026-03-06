import { z } from 'zod';
import { TransactionType, PaymentMethod, Currency } from './enums';

// ─── Transaction (Unified Ledger) ──────────────────────────────────────────
export const TransactionSchema = z.object({
    id: z.string().uuid(),
    transactionNumber: z.string(),
    type: TransactionType,
    paymentMethod: PaymentMethod,
    currency: Currency,
    amountUsd: z.number(),
    cryptoAmount: z.number().nullable(),
    cryptoCurrency: Currency.nullable(),
    conversionRate: z.number().positive().nullable(),
    platformFeeUsd: z.number().nonnegative(),
    netAmountUsd: z.number(),
    buyerId: z.string().uuid().nullable(),
    sellerId: z.string().uuid().nullable(),
    orderId: z.string().uuid().nullable(),
    subscriptionId: z.string().uuid().nullable(),
    payoutId: z.string().uuid().nullable(),
    stripePaymentIntentId: z.string().nullable(),
    txHash: z.string().nullable(),
    x402PaymentId: z.string().nullable(),
    status: z.enum(['pending', 'completed', 'failed', 'reversed']),
    metadata: z.record(z.unknown()).nullable(),
    createdAt: z.string().datetime(),
});
export type Transaction = z.infer<typeof TransactionSchema>;

export const TransactionFiltersSchema = z.object({
    type: TransactionType.optional(),
    paymentMethod: PaymentMethod.optional(),
    status: z.enum(['pending', 'completed', 'failed', 'reversed']).optional(),
    sellerId: z.string().uuid().optional(),
    buyerId: z.string().uuid().optional(),
    dateFrom: z.string().datetime().optional(),
    dateTo: z.string().datetime().optional(),
    minAmount: z.number().optional(),
    maxAmount: z.number().optional(),
    cursor: z.string().optional(),
    limit: z.number().int().min(1).max(100).default(50),
});
export type TransactionFilters = z.infer<typeof TransactionFiltersSchema>;
