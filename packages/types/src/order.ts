import { z } from 'zod';
import { OrderStatus, PaymentMethod, Currency } from './enums';

// ─── Order ─────────────────────────────────────────────────────────────────
export const OrderSchema = z.object({
    id: z.string().uuid(),
    orderNumber: z.string(),
    buyerId: z.string().uuid(),
    sellerId: z.string().uuid(),
    status: OrderStatus,
    paymentMethod: PaymentMethod,
    currency: Currency,
    subtotalUsd: z.number().nonnegative(),
    platformFeeUsd: z.number().nonnegative(),
    totalUsd: z.number().nonnegative(),
    cryptoAmount: z.number().nonnegative().nullable(),
    cryptoCurrency: Currency.nullable(),
    txHash: z.string().nullable(),
    stripePaymentIntentId: z.string().nullable(),
    notes: z.string().max(500).nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    completedAt: z.string().datetime().nullable(),
});
export type Order = z.infer<typeof OrderSchema>;

// ─── Order Item ────────────────────────────────────────────────────────────
export const OrderItemSchema = z.object({
    id: z.string().uuid(),
    orderId: z.string().uuid(),
    listingId: z.string().uuid(),
    pricingId: z.string().uuid(),
    quantity: z.number().int().positive(),
    unitPriceUsd: z.number().nonnegative(),
    totalUsd: z.number().nonnegative(),
    licenseKey: z.string().nullable(),
    downloadUrl: z.string().url().nullable(),
    downloadExpiresAt: z.string().datetime().nullable(),
    createdAt: z.string().datetime(),
});
export type OrderItem = z.infer<typeof OrderItemSchema>;

// ─── Create Order (Checkout) ──────────────────────────────────────────────
export const CheckoutRequestSchema = z.object({
    paymentMethod: PaymentMethod,
    currency: Currency.default('USD'),
    walletAddress: z.string().optional(),
    couponCode: z.string().optional(),
    notes: z.string().max(500).optional(),
});
export type CheckoutRequest = z.infer<typeof CheckoutRequestSchema>;

export const CheckoutResponseSchema = z.object({
    orderId: z.string().uuid(),
    orderNumber: z.string(),
    totalUsd: z.number().nonnegative(),
    // Stripe-specific
    clientSecret: z.string().nullable(),
    // Crypto-specific
    paymentAddress: z.string().nullable(),
    cryptoAmount: z.number().nonnegative().nullable(),
    cryptoCurrency: Currency.nullable(),
    // x402-specific
    paymentRequirements: z.unknown().nullable(),
});
export type CheckoutResponse = z.infer<typeof CheckoutResponseSchema>;

// ─── Order Filters ────────────────────────────────────────────────────────
export const OrderFiltersSchema = z.object({
    status: OrderStatus.optional(),
    paymentMethod: PaymentMethod.optional(),
    sellerId: z.string().uuid().optional(),
    buyerId: z.string().uuid().optional(),
    dateFrom: z.string().datetime().optional(),
    dateTo: z.string().datetime().optional(),
    sortBy: z.enum(['newest', 'oldest', 'total_asc', 'total_desc']).default('newest'),
    cursor: z.string().optional(),
    limit: z.number().int().min(1).max(100).default(20),
});
export type OrderFilters = z.infer<typeof OrderFiltersSchema>;
