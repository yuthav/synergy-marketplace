import { z } from 'zod';
import { UserRole, Blockchain } from './enums';

// ─── User ──────────────────────────────────────────────────────────────────
export const UserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    name: z.string().min(2).max(100),
    displayName: z.string().max(50).nullable(),
    avatar: z.string().url().nullable(),
    role: UserRole,
    portalAccess: z.array(z.enum(['marketplace', 'seller', 'platform'])),
    emailVerified: z.boolean().default(false),
    twoFactorEnabled: z.boolean().default(false),
    isActive: z.boolean().default(true),
    lastLoginAt: z.string().datetime().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    deletedAt: z.string().datetime().nullable(),
});
export type User = z.infer<typeof UserSchema>;

// ─── User Profile (public-facing) ─────────────────────────────────────────
export const UserProfileSchema = z.object({
    id: z.string().uuid(),
    displayName: z.string(),
    avatar: z.string().url().nullable(),
    bio: z.string().max(500).nullable(),
    joinedAt: z.string().datetime(),
    reviewCount: z.number().int().nonnegative(),
    purchaseCount: z.number().int().nonnegative(),
});
export type UserProfile = z.infer<typeof UserProfileSchema>;

// ─── Update Profile ───────────────────────────────────────────────────────
export const UpdateProfileSchema = z.object({
    name: z.string().min(2).max(100).optional(),
    displayName: z.string().max(50).optional(),
    avatar: z.string().url().optional(),
    bio: z.string().max(500).optional(),
    preferredCurrency: z.string().optional(),
    preferredLanguage: z.string().optional(),
});
export type UpdateProfile = z.infer<typeof UpdateProfileSchema>;

// ─── Wallet ────────────────────────────────────────────────────────────────
export const WalletSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    blockchain: Blockchain,
    address: z.string(),
    isCustodial: z.boolean().default(false),
    isPrimary: z.boolean().default(false),
    label: z.string().max(50).nullable(),
    createdAt: z.string().datetime(),
});
export type Wallet = z.infer<typeof WalletSchema>;

// ─── Notification Preferences ─────────────────────────────────────────────
export const NotificationPreferencesSchema = z.object({
    userId: z.string().uuid(),
    emailOrders: z.boolean().default(true),
    emailSubscriptions: z.boolean().default(true),
    emailMarketing: z.boolean().default(false),
    emailSecurity: z.boolean().default(true),
    inAppOrders: z.boolean().default(true),
    inAppMessages: z.boolean().default(true),
    inAppAnnouncements: z.boolean().default(true),
    webhookUrl: z.string().url().nullable(),
    webhookEnabled: z.boolean().default(false),
});
export type NotificationPreferences = z.infer<typeof NotificationPreferencesSchema>;

// ─── API Key ───────────────────────────────────────────────────────────────
export const ApiKeySchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    name: z.string().max(100),
    keyPrefix: z.string(),
    scopes: z.array(z.string()),
    lastUsedAt: z.string().datetime().nullable(),
    expiresAt: z.string().datetime().nullable(),
    isActive: z.boolean().default(true),
    createdAt: z.string().datetime(),
});
export type ApiKey = z.infer<typeof ApiKeySchema>;

export const CreateApiKeySchema = z.object({
    name: z.string().min(1).max(100),
    scopes: z.array(z.string()).min(1),
    expiresInDays: z.number().int().positive().optional(),
});
export type CreateApiKey = z.infer<typeof CreateApiKeySchema>;

export const CreateApiKeyResponseSchema = z.object({
    apiKey: ApiKeySchema,
    secretKey: z.string(), // Only shown once
});
export type CreateApiKeyResponse = z.infer<typeof CreateApiKeyResponseSchema>;
