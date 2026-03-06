import { z } from 'zod';
import {
    MaintenanceMode,
    GeoRestrictionAction,
    MerchantTier,
    WorkflowStatus,
    TicketStatus,
    TicketPriority,
    AnnouncementTarget,
    DisputeStatus,
    PortalType,
} from './enums';

// ─── Platform Config ───────────────────────────────────────────────────────
export const PlatformConfigSchema = z.object({
    id: z.string().uuid(),
    key: z.string(),
    value: z.string(),
    description: z.string().nullable(),
    isSecret: z.boolean().default(false),
    updatedBy: z.string().uuid(),
    updatedAt: z.string().datetime(),
});
export type PlatformConfig = z.infer<typeof PlatformConfigSchema>;

// ─── Maintenance Window ───────────────────────────────────────────────────
export const MaintenanceWindowSchema = z.object({
    id: z.string().uuid(),
    portal: PortalType,
    mode: MaintenanceMode,
    message: z.string().max(500),
    estimatedEndAt: z.string().datetime().nullable(),
    scheduledStartAt: z.string().datetime().nullable(),
    startedAt: z.string().datetime().nullable(),
    endedAt: z.string().datetime().nullable(),
    createdBy: z.string().uuid(),
    createdAt: z.string().datetime(),
});
export type MaintenanceWindow = z.infer<typeof MaintenanceWindowSchema>;

export const SetMaintenanceModeSchema = z.object({
    portal: z.enum(['marketplace', 'seller']),
    mode: MaintenanceMode,
    message: z.string().max(500).default('We are currently performing scheduled maintenance.'),
    estimatedEndAt: z.string().datetime().optional(),
});
export type SetMaintenanceMode = z.infer<typeof SetMaintenanceModeSchema>;

// ─── Geo Restriction ──────────────────────────────────────────────────────
export const GeoRestrictionSchema = z.object({
    id: z.string().uuid(),
    portal: PortalType,
    countryCode: z.string().length(2),
    countryName: z.string(),
    action: GeoRestrictionAction,
    reason: z.string().max(500).nullable(),
    createdBy: z.string().uuid(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type GeoRestriction = z.infer<typeof GeoRestrictionSchema>;

export const CreateGeoRestrictionSchema = z.object({
    portal: z.enum(['marketplace', 'seller']),
    countryCode: z.string().length(2),
    countryName: z.string(),
    action: GeoRestrictionAction,
    reason: z.string().max(500).optional(),
});
export type CreateGeoRestriction = z.infer<typeof CreateGeoRestrictionSchema>;

// ─── IP Rules ─────────────────────────────────────────────────────────────
export const IpRuleSchema = z.object({
    id: z.string().uuid(),
    ipOrCidr: z.string(),
    action: z.enum(['allow', 'block']),
    portal: PortalType.nullable(), // null = all portals
    description: z.string().max(200).nullable(),
    expiresAt: z.string().datetime().nullable(),
    createdBy: z.string().uuid(),
    createdAt: z.string().datetime(),
});
export type IpRule = z.infer<typeof IpRuleSchema>;

// ─── Revenue Share Rule ───────────────────────────────────────────────────
export const RevenueShareRuleSchema = z.object({
    id: z.string().uuid(),
    sellerId: z.string().uuid().nullable(), // null = global default
    categoryId: z.string().uuid().nullable(),
    commissionRate: z.number().min(0).max(100),
    minVolumeUsd: z.number().nonnegative().nullable(), // for tiered rates
    maxVolumeUsd: z.number().nonnegative().nullable(),
    effectiveFrom: z.string().datetime(),
    effectiveTo: z.string().datetime().nullable(),
    createdBy: z.string().uuid(),
    createdAt: z.string().datetime(),
});
export type RevenueShareRule = z.infer<typeof RevenueShareRuleSchema>;

export const CreateRevenueShareRuleSchema = z.object({
    sellerId: z.string().uuid().optional(),
    categoryId: z.string().uuid().optional(),
    commissionRate: z.number().min(0).max(100),
    minVolumeUsd: z.number().nonnegative().optional(),
    maxVolumeUsd: z.number().nonnegative().optional(),
    effectiveFrom: z.string().datetime(),
    effectiveTo: z.string().datetime().optional(),
});
export type CreateRevenueShareRule = z.infer<typeof CreateRevenueShareRuleSchema>;

// ─── Platform Payment Details (Vault) ──────────────────────────────────────
export const PlatformPaymentDetailSchema = z.object({
    id: z.string().uuid(),
    label: z.string().max(100),
    type: z.enum(['bank_account', 'crypto_wallet', 'stripe']),
    encryptedData: z.string(), // AES-256 encrypted JSON
    lastFour: z.string().max(4).nullable(),
    isPrimary: z.boolean().default(false),
    createdBy: z.string().uuid(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type PlatformPaymentDetail = z.infer<typeof PlatformPaymentDetailSchema>;

// ─── Action Workflow ──────────────────────────────────────────────────────
export const ActionWorkflowSchema = z.object({
    id: z.string().uuid(),
    title: z.string().max(200),
    description: z.string().max(1000).nullable(),
    type: z.enum(['refund', 'payout', 'listing_approval', 'dispute', 'kyb_review', 'custom']),
    status: WorkflowStatus,
    priority: TicketPriority,
    initiatedBy: z.string().uuid(),
    assignedTo: z.string().uuid().nullable(),
    relatedEntityType: z.string().nullable(),
    relatedEntityId: z.string().uuid().nullable(),
    metadata: z.record(z.unknown()).nullable(),
    completedAt: z.string().datetime().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type ActionWorkflow = z.infer<typeof ActionWorkflowSchema>;

export const WorkflowStepSchema = z.object({
    id: z.string().uuid(),
    workflowId: z.string().uuid(),
    stepOrder: z.number().int().nonnegative(),
    title: z.string().max(200),
    assigneeId: z.string().uuid(),
    status: WorkflowStatus,
    notes: z.string().max(1000).nullable(),
    deadline: z.string().datetime().nullable(),
    completedAt: z.string().datetime().nullable(),
    createdAt: z.string().datetime(),
});
export type WorkflowStep = z.infer<typeof WorkflowStepSchema>;

// ─── Internal Ticket ──────────────────────────────────────────────────────
export const InternalTicketSchema = z.object({
    id: z.string().uuid(),
    ticketNumber: z.string(),
    subject: z.string().max(300),
    description: z.string(),
    status: TicketStatus,
    priority: TicketPriority,
    createdById: z.string().uuid(),
    assignedToId: z.string().uuid().nullable(),
    relatedSellerId: z.string().uuid().nullable(),
    relatedBuyerId: z.string().uuid().nullable(),
    relatedOrderId: z.string().uuid().nullable(),
    tags: z.array(z.string()),
    resolvedAt: z.string().datetime().nullable(),
    closedAt: z.string().datetime().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type InternalTicket = z.infer<typeof InternalTicketSchema>;

export const CreateTicketSchema = z.object({
    subject: z.string().min(3).max(300),
    description: z.string().min(10),
    priority: TicketPriority.default('medium'),
    assignedToId: z.string().uuid().optional(),
    relatedSellerId: z.string().uuid().optional(),
    relatedBuyerId: z.string().uuid().optional(),
    relatedOrderId: z.string().uuid().optional(),
    tags: z.array(z.string()).default([]),
});
export type CreateTicket = z.infer<typeof CreateTicketSchema>;

// ─── Announcement ─────────────────────────────────────────────────────────
export const AnnouncementSchema = z.object({
    id: z.string().uuid(),
    title: z.string().max(200),
    content: z.string(),
    target: AnnouncementTarget,
    targetIds: z.array(z.string().uuid()).nullable(), // for specific_sellers
    isPublished: z.boolean().default(false),
    publishedAt: z.string().datetime().nullable(),
    expiresAt: z.string().datetime().nullable(),
    createdBy: z.string().uuid(),
    createdAt: z.string().datetime(),
});
export type Announcement = z.infer<typeof AnnouncementSchema>;

// ─── Merchant Tier Config ─────────────────────────────────────────────────
export const MerchantTierConfigSchema = z.object({
    id: z.string().uuid(),
    tier: MerchantTier,
    minRevenue: z.number().nonnegative(),
    minOrders: z.number().int().nonnegative(),
    commissionDiscount: z.number().min(0).max(100), // percentage off base rate
    maxListings: z.number().int().positive(),
    prioritySupport: z.boolean().default(false),
    featuredSlots: z.number().int().nonnegative().default(0),
    description: z.string().max(500),
});
export type MerchantTierConfig = z.infer<typeof MerchantTierConfigSchema>;

// ─── Dispute ──────────────────────────────────────────────────────────────
export const DisputeSchema = z.object({
    id: z.string().uuid(),
    orderId: z.string().uuid(),
    buyerId: z.string().uuid(),
    sellerId: z.string().uuid(),
    status: DisputeStatus,
    reason: z.string().max(500),
    description: z.string(),
    evidenceUrls: z.array(z.string().url()),
    resolution: z.string().nullable(),
    resolvedBy: z.string().uuid().nullable(),
    refundAmount: z.number().nonnegative().nullable(),
    stripeDisputeId: z.string().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    resolvedAt: z.string().datetime().nullable(),
});
export type Dispute = z.infer<typeof DisputeSchema>;

// ─── Admin Audit Log ──────────────────────────────────────────────────────
export const AdminAuditLogSchema = z.object({
    id: z.string().uuid(),
    actorId: z.string().uuid(),
    actorEmail: z.string().email(),
    action: z.string(),
    resource: z.string(),
    resourceId: z.string().nullable(),
    beforeState: z.record(z.unknown()).nullable(),
    afterState: z.record(z.unknown()).nullable(),
    reason: z.string().max(500).nullable(),
    ipAddress: z.string(),
    userAgent: z.string(),
    createdAt: z.string().datetime(),
});
export type AdminAuditLog = z.infer<typeof AdminAuditLogSchema>;

// ─── Platform Dashboard Metrics ───────────────────────────────────────────
export const PlatformDashboardSchema = z.object({
    gmv: z.number().nonnegative(),
    revenue: z.number().nonnegative(),
    commissionEarned: z.number().nonnegative(),
    activeUsers: z.number().int().nonnegative(),
    activeSellers: z.number().int().nonnegative(),
    totalListings: z.number().int().nonnegative(),
    pendingOrders: z.number().int().nonnegative(),
    openDisputes: z.number().int().nonnegative(),
    pendingKyb: z.number().int().nonnegative(),
    moderationQueue: z.number().int().nonnegative(),
    systemHealth: z.object({
        apiUptime: z.number().min(0).max(100),
        errorRate: z.number().nonnegative(),
        avgLatencyMs: z.number().nonnegative(),
        queueDepth: z.number().int().nonnegative(),
    }),
});
export type PlatformDashboard = z.infer<typeof PlatformDashboardSchema>;

// ─── Feature Flag ─────────────────────────────────────────────────────────
export const FeatureFlagSchema = z.object({
    id: z.string().uuid(),
    key: z.string(),
    name: z.string().max(100),
    description: z.string().max(500).nullable(),
    isEnabled: z.boolean().default(false),
    portals: z.array(PortalType),
    updatedBy: z.string().uuid(),
    updatedAt: z.string().datetime(),
});
export type FeatureFlag = z.infer<typeof FeatureFlagSchema>;
