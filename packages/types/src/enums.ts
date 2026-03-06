import { z } from 'zod';

// ─── Portal Types ──────────────────────────────────────────────────────────
export const PortalType = z.enum(['marketplace', 'seller', 'platform']);
export type PortalType = z.infer<typeof PortalType>;

// ─── User Roles ────────────────────────────────────────────────────────────
export const UserRole = z.enum([
    'buyer',
    'seller_owner',
    'seller_admin',
    'seller_catalogue_mgr',
    'seller_finance_mgr',
    'seller_support',
    'platform_super_admin',
    'platform_ops_manager',
    'platform_finance_manager',
    'platform_content_moderator',
    'platform_support_agent',
    'platform_developer',
]);
export type UserRole = z.infer<typeof UserRole>;

// ─── Listing Categories ───────────────────────────────────────────────────
export const ListingCategory = z.enum([
    'ai_agents',
    'digital_assets',
    'templates',
    'datasets',
    'apis',
    'saas_tools',
]);
export type ListingCategory = z.infer<typeof ListingCategory>;

// ─── Purchase Model ───────────────────────────────────────────────────────
export const PurchaseModel = z.enum([
    'one_time',
    'subscription',
    'freemium',
    'pay_per_use',
]);
export type PurchaseModel = z.infer<typeof PurchaseModel>;

// ─── Subscription Interval ────────────────────────────────────────────────
export const SubscriptionInterval = z.enum(['monthly', 'quarterly', 'yearly']);
export type SubscriptionInterval = z.infer<typeof SubscriptionInterval>;

// ─── Listing Status ───────────────────────────────────────────────────────
export const ListingStatus = z.enum(['draft', 'pending_review', 'published', 'archived', 'delisted']);
export type ListingStatus = z.infer<typeof ListingStatus>;

// ─── Order Status ─────────────────────────────────────────────────────────
export const OrderStatus = z.enum([
    'pending',
    'processing',
    'completed',
    'cancelled',
    'refunded',
    'disputed',
]);
export type OrderStatus = z.infer<typeof OrderStatus>;

// ─── Subscription Status ──────────────────────────────────────────────────
export const SubscriptionStatus = z.enum([
    'active',
    'paused',
    'cancelled',
    'past_due',
    'trialing',
    'expired',
]);
export type SubscriptionStatus = z.infer<typeof SubscriptionStatus>;

// ─── Payment Method ───────────────────────────────────────────────────────
export const PaymentMethod = z.enum([
    'stripe',
    'eth_wallet',
    'sol_wallet',
    'x402',
    'visa',
    'synergetics_pay',
]);
export type PaymentMethod = z.infer<typeof PaymentMethod>;

// ─── Currency ─────────────────────────────────────────────────────────────
export const Currency = z.enum(['USD', 'ETH', 'SOL', 'BTC', 'USDC', 'USDT']);
export type Currency = z.infer<typeof Currency>;

// ─── Blockchain ───────────────────────────────────────────────────────────
export const Blockchain = z.enum(['ethereum', 'solana', 'base', 'polygon']);
export type Blockchain = z.infer<typeof Blockchain>;

// ─── KYB Status ───────────────────────────────────────────────────────────
export const KybStatus = z.enum([
    'not_started',
    'pending',
    'in_review',
    'approved',
    'rejected',
    'expired',
]);
export type KybStatus = z.infer<typeof KybStatus>;

// ─── Merchant Tier ────────────────────────────────────────────────────────
export const MerchantTier = z.enum(['bronze', 'silver', 'gold', 'platinum']);
export type MerchantTier = z.infer<typeof MerchantTier>;

// ─── Dispute Status ───────────────────────────────────────────────────────
export const DisputeStatus = z.enum([
    'open',
    'under_review',
    'escalated',
    'resolved_buyer',
    'resolved_seller',
    'closed',
]);
export type DisputeStatus = z.infer<typeof DisputeStatus>;

// ─── Maintenance Mode ─────────────────────────────────────────────────────
export const MaintenanceMode = z.enum(['off', 'read_only', 'full_lockout']);
export type MaintenanceMode = z.infer<typeof MaintenanceMode>;

// ─── Workflow Status ──────────────────────────────────────────────────────
export const WorkflowStatus = z.enum([
    'pending',
    'in_progress',
    'approved',
    'rejected',
    'cancelled',
]);
export type WorkflowStatus = z.infer<typeof WorkflowStatus>;

// ─── Payout Status ────────────────────────────────────────────────────────
export const PayoutStatus = z.enum([
    'pending',
    'processing',
    'completed',
    'failed',
    'cancelled',
]);
export type PayoutStatus = z.infer<typeof PayoutStatus>;

// ─── Payout Schedule ──────────────────────────────────────────────────────
export const PayoutSchedule = z.enum(['daily', 'weekly', 'biweekly', 'monthly']);
export type PayoutSchedule = z.infer<typeof PayoutSchedule>;

// ─── Ticket Status ────────────────────────────────────────────────────────
export const TicketStatus = z.enum([
    'open',
    'in_progress',
    'waiting_response',
    'resolved',
    'closed',
]);
export type TicketStatus = z.infer<typeof TicketStatus>;

// ─── Ticket Priority ──────────────────────────────────────────────────────
export const TicketPriority = z.enum(['low', 'medium', 'high', 'critical']);
export type TicketPriority = z.infer<typeof TicketPriority>;

// ─── Media Type ───────────────────────────────────────────────────────────
export const MediaType = z.enum(['image', 'video', '3d_model', 'document', 'archive']);
export type MediaType = z.infer<typeof MediaType>;

// ─── Transaction Type ─────────────────────────────────────────────────────
export const TransactionType = z.enum([
    'purchase',
    'subscription_payment',
    'refund',
    'payout',
    'platform_commission',
    'credit_topup',
    'credit_spend',
    'deposit',
    'withdrawal',
]);
export type TransactionType = z.infer<typeof TransactionType>;

// ─── Geo Restriction Action ───────────────────────────────────────────────
export const GeoRestrictionAction = z.enum(['allow', 'block']);
export type GeoRestrictionAction = z.infer<typeof GeoRestrictionAction>;

// ─── Announcement Target ──────────────────────────────────────────────────
export const AnnouncementTarget = z.enum([
    'all_buyers',
    'all_sellers',
    'all_users',
    'specific_sellers',
    'specific_segment',
]);
export type AnnouncementTarget = z.infer<typeof AnnouncementTarget>;
