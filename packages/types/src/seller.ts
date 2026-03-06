import { z } from 'zod';
import { KybStatus, MerchantTier, PayoutSchedule } from './enums';

// ─── Seller ────────────────────────────────────────────────────────────────
export const SellerSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    businessName: z.string().max(200),
    slug: z.string(),
    description: z.string().max(1000).nullable(),
    logo: z.string().url().nullable(),
    website: z.string().url().nullable(),
    contactEmail: z.string().email(),
    kybStatus: KybStatus,
    tier: MerchantTier,
    stripeAccountId: z.string().nullable(),
    commissionRate: z.number().min(0).max(100).default(15), // percentage
    payoutSchedule: PayoutSchedule.default('weekly'),
    minimumPayout: z.number().nonnegative().default(50),
    holdPeriodDays: z.number().int().nonnegative().default(7),
    totalRevenue: z.number().nonnegative().default(0),
    totalOrders: z.number().int().nonnegative().default(0),
    avgRating: z.number().min(0).max(5).default(0),
    isActive: z.boolean().default(true),
    isSuspended: z.boolean().default(false),
    suspendedReason: z.string().nullable(),
    onboardingCompleted: z.boolean().default(false),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    deletedAt: z.string().datetime().nullable(),
});
export type Seller = z.infer<typeof SellerSchema>;

// ─── Seller Onboarding ─────────────────────────────────────────────────────
export const SellerOnboardingSchema = z.object({
    businessName: z.string().min(2).max(200),
    businessType: z.enum(['individual', 'company', 'non_profit']),
    description: z.string().max(1000).optional(),
    website: z.string().url().optional(),
    contactEmail: z.string().email(),
    country: z.string().length(2), // ISO 3166-1 alpha-2
    taxId: z.string().optional(),
});
export type SellerOnboarding = z.infer<typeof SellerOnboardingSchema>;

// ─── Seller Team Member ───────────────────────────────────────────────────
export const SellerTeamMemberSchema = z.object({
    id: z.string().uuid(),
    sellerId: z.string().uuid(),
    userId: z.string().uuid(),
    role: z.enum(['owner', 'admin', 'catalogue_mgr', 'finance_mgr', 'support']),
    invitedEmail: z.string().email(),
    acceptedAt: z.string().datetime().nullable(),
    isActive: z.boolean().default(true),
    createdAt: z.string().datetime(),
});
export type SellerTeamMember = z.infer<typeof SellerTeamMemberSchema>;

export const InviteTeamMemberSchema = z.object({
    email: z.string().email(),
    role: z.enum(['admin', 'catalogue_mgr', 'finance_mgr', 'support']),
});
export type InviteTeamMember = z.infer<typeof InviteTeamMemberSchema>;

// ─── Seller Analytics ──────────────────────────────────────────────────────
export const SellerAnalyticsSchema = z.object({
    sellerId: z.string().uuid(),
    period: z.enum(['7d', '30d', '90d', '1y', 'all']),
    revenue: z.number().nonnegative(),
    orders: z.number().int().nonnegative(),
    subscribers: z.number().int().nonnegative(),
    mrr: z.number().nonnegative(),
    churnRate: z.number().min(0).max(100),
    avgOrderValue: z.number().nonnegative(),
    conversionRate: z.number().min(0).max(100),
    topProducts: z.array(
        z.object({
            listingId: z.string().uuid(),
            title: z.string(),
            revenue: z.number().nonnegative(),
            orders: z.number().int().nonnegative(),
        }),
    ),
    revenueTimeSeries: z.array(
        z.object({
            date: z.string(),
            revenue: z.number().nonnegative(),
            orders: z.number().int().nonnegative(),
        }),
    ),
});
export type SellerAnalytics = z.infer<typeof SellerAnalyticsSchema>;
