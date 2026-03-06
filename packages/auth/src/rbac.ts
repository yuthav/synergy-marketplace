import type { UserRole } from '@synergetics/types';

// ─── Permission Definitions ───────────────────────────────────────────────
export const PERMISSIONS = {
    // Listings
    LISTINGS_VIEW: 'listings:view',
    LISTINGS_CREATE: 'listings:create',
    LISTINGS_EDIT: 'listings:edit',
    LISTINGS_DELETE: 'listings:delete',
    LISTINGS_MODERATE: 'listings:moderate',
    LISTINGS_FEATURE: 'listings:feature',

    // Orders
    ORDERS_VIEW: 'orders:view',
    ORDERS_MANAGE: 'orders:manage',
    ORDERS_REFUND: 'orders:refund',

    // Subscriptions
    SUBSCRIPTIONS_VIEW: 'subscriptions:view',
    SUBSCRIPTIONS_MANAGE: 'subscriptions:manage',

    // Finance
    FINANCE_VIEW: 'finance:view',
    FINANCE_MANAGE: 'finance:manage',
    FINANCE_PAYOUTS: 'finance:payouts',
    FINANCE_VAULT: 'finance:vault',

    // Team
    TEAM_VIEW: 'team:view',
    TEAM_MANAGE: 'team:manage',

    // Users
    USERS_VIEW: 'users:view',
    USERS_MANAGE: 'users:manage',
    USERS_SUSPEND: 'users:suspend',

    // Merchants
    MERCHANTS_VIEW: 'merchants:view',
    MERCHANTS_MANAGE: 'merchants:manage',
    MERCHANTS_SUSPEND: 'merchants:suspend',

    // Platform
    PLATFORM_CONFIG: 'platform:config',
    PLATFORM_MAINTENANCE: 'platform:maintenance',
    PLATFORM_GEO_RULES: 'platform:geo-rules',
    PLATFORM_FEATURE_FLAGS: 'platform:feature-flags',

    // Communication
    MESSAGES_VIEW: 'messages:view',
    MESSAGES_SEND: 'messages:send',
    TICKETS_VIEW: 'tickets:view',
    TICKETS_MANAGE: 'tickets:manage',
    ANNOUNCEMENTS_MANAGE: 'announcements:manage',

    // Workflows
    WORKFLOWS_VIEW: 'workflows:view',
    WORKFLOWS_MANAGE: 'workflows:manage',
    WORKFLOWS_APPROVE: 'workflows:approve',

    // Compliance
    COMPLIANCE_VIEW: 'compliance:view',
    COMPLIANCE_MANAGE: 'compliance:manage',
    DISPUTES_VIEW: 'disputes:view',
    DISPUTES_MANAGE: 'disputes:manage',

    // Analytics
    ANALYTICS_VIEW: 'analytics:view',
    ANALYTICS_EXPORT: 'analytics:export',

    // Audit
    AUDIT_VIEW: 'audit:view',

    // System
    SYSTEM_HEALTH: 'system:health',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

// ─── Role → Permission Mapping ────────────────────────────────────────────
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
    // Buyer
    buyer: [
        PERMISSIONS.LISTINGS_VIEW,
        PERMISSIONS.ORDERS_VIEW,
        PERMISSIONS.SUBSCRIPTIONS_VIEW,
        PERMISSIONS.MESSAGES_VIEW,
        PERMISSIONS.MESSAGES_SEND,
    ],

    // Seller roles
    seller_owner: [
        PERMISSIONS.LISTINGS_VIEW, PERMISSIONS.LISTINGS_CREATE, PERMISSIONS.LISTINGS_EDIT, PERMISSIONS.LISTINGS_DELETE,
        PERMISSIONS.ORDERS_VIEW, PERMISSIONS.ORDERS_MANAGE, PERMISSIONS.ORDERS_REFUND,
        PERMISSIONS.SUBSCRIPTIONS_VIEW, PERMISSIONS.SUBSCRIPTIONS_MANAGE,
        PERMISSIONS.FINANCE_VIEW, PERMISSIONS.FINANCE_MANAGE, PERMISSIONS.FINANCE_PAYOUTS,
        PERMISSIONS.TEAM_VIEW, PERMISSIONS.TEAM_MANAGE,
        PERMISSIONS.MESSAGES_VIEW, PERMISSIONS.MESSAGES_SEND,
        PERMISSIONS.ANALYTICS_VIEW, PERMISSIONS.ANALYTICS_EXPORT,
        PERMISSIONS.COMPLIANCE_VIEW,
    ],
    seller_admin: [
        PERMISSIONS.LISTINGS_VIEW, PERMISSIONS.LISTINGS_CREATE, PERMISSIONS.LISTINGS_EDIT,
        PERMISSIONS.ORDERS_VIEW, PERMISSIONS.ORDERS_MANAGE,
        PERMISSIONS.SUBSCRIPTIONS_VIEW, PERMISSIONS.SUBSCRIPTIONS_MANAGE,
        PERMISSIONS.FINANCE_VIEW,
        PERMISSIONS.TEAM_VIEW, PERMISSIONS.TEAM_MANAGE,
        PERMISSIONS.MESSAGES_VIEW, PERMISSIONS.MESSAGES_SEND,
        PERMISSIONS.ANALYTICS_VIEW,
        PERMISSIONS.COMPLIANCE_VIEW,
    ],
    seller_catalogue_mgr: [
        PERMISSIONS.LISTINGS_VIEW, PERMISSIONS.LISTINGS_CREATE, PERMISSIONS.LISTINGS_EDIT,
        PERMISSIONS.MESSAGES_VIEW, PERMISSIONS.MESSAGES_SEND,
    ],
    seller_finance_mgr: [
        PERMISSIONS.ORDERS_VIEW,
        PERMISSIONS.FINANCE_VIEW, PERMISSIONS.FINANCE_MANAGE, PERMISSIONS.FINANCE_PAYOUTS,
        PERMISSIONS.ANALYTICS_VIEW, PERMISSIONS.ANALYTICS_EXPORT,
    ],
    seller_support: [
        PERMISSIONS.ORDERS_VIEW,
        PERMISSIONS.MESSAGES_VIEW, PERMISSIONS.MESSAGES_SEND,
        PERMISSIONS.TICKETS_VIEW, PERMISSIONS.TICKETS_MANAGE,
    ],

    // Platform roles
    platform_super_admin: Object.values(PERMISSIONS), // All permissions
    platform_ops_manager: [
        PERMISSIONS.MERCHANTS_VIEW, PERMISSIONS.MERCHANTS_MANAGE, PERMISSIONS.MERCHANTS_SUSPEND,
        PERMISSIONS.LISTINGS_VIEW, PERMISSIONS.LISTINGS_MODERATE, PERMISSIONS.LISTINGS_FEATURE,
        PERMISSIONS.ORDERS_VIEW, PERMISSIONS.ORDERS_MANAGE,
        PERMISSIONS.USERS_VIEW, PERMISSIONS.USERS_MANAGE,
        PERMISSIONS.TICKETS_VIEW, PERMISSIONS.TICKETS_MANAGE,
        PERMISSIONS.WORKFLOWS_VIEW, PERMISSIONS.WORKFLOWS_MANAGE, PERMISSIONS.WORKFLOWS_APPROVE,
        PERMISSIONS.ANNOUNCEMENTS_MANAGE,
        PERMISSIONS.ANALYTICS_VIEW,
        PERMISSIONS.PLATFORM_MAINTENANCE,
        PERMISSIONS.COMPLIANCE_VIEW, PERMISSIONS.COMPLIANCE_MANAGE,
        PERMISSIONS.DISPUTES_VIEW, PERMISSIONS.DISPUTES_MANAGE,
        PERMISSIONS.AUDIT_VIEW,
    ],
    platform_finance_manager: [
        PERMISSIONS.FINANCE_VIEW, PERMISSIONS.FINANCE_MANAGE, PERMISSIONS.FINANCE_PAYOUTS, PERMISSIONS.FINANCE_VAULT,
        PERMISSIONS.ORDERS_VIEW,
        PERMISSIONS.MERCHANTS_VIEW,
        PERMISSIONS.ANALYTICS_VIEW, PERMISSIONS.ANALYTICS_EXPORT,
        PERMISSIONS.WORKFLOWS_VIEW, PERMISSIONS.WORKFLOWS_APPROVE,
        PERMISSIONS.AUDIT_VIEW,
    ],
    platform_content_moderator: [
        PERMISSIONS.LISTINGS_VIEW, PERMISSIONS.LISTINGS_MODERATE, PERMISSIONS.LISTINGS_FEATURE,
        PERMISSIONS.USERS_VIEW,
        PERMISSIONS.COMPLIANCE_VIEW, PERMISSIONS.COMPLIANCE_MANAGE,
        PERMISSIONS.TICKETS_VIEW, PERMISSIONS.TICKETS_MANAGE,
    ],
    platform_support_agent: [
        PERMISSIONS.USERS_VIEW,
        PERMISSIONS.ORDERS_VIEW,
        PERMISSIONS.MESSAGES_VIEW, PERMISSIONS.MESSAGES_SEND,
        PERMISSIONS.TICKETS_VIEW, PERMISSIONS.TICKETS_MANAGE,
        PERMISSIONS.DISPUTES_VIEW,
    ],
    platform_developer: [
        PERMISSIONS.SYSTEM_HEALTH,
        PERMISSIONS.PLATFORM_CONFIG,
        PERMISSIONS.PLATFORM_FEATURE_FLAGS,
        PERMISSIONS.ANALYTICS_VIEW,
        PERMISSIONS.AUDIT_VIEW,
    ],
};

// ─── Permission Check Helpers ─────────────────────────────────────────────

export function getRolePermissions(role: UserRole): Permission[] {
    return ROLE_PERMISSIONS[role] ?? [];
}

export function hasPermission(
    userPermissions: string[],
    required: Permission,
): boolean {
    return userPermissions.includes(required);
}

export function hasAnyPermission(
    userPermissions: string[],
    required: Permission[],
): boolean {
    return required.some((p) => userPermissions.includes(p));
}

export function hasAllPermissions(
    userPermissions: string[],
    required: Permission[],
): boolean {
    return required.every((p) => userPermissions.includes(p));
}
