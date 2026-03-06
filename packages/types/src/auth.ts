import { z } from 'zod';
import { PortalType, UserRole } from './enums';

// ─── Auth Session ──────────────────────────────────────────────────────────
export const AuthSessionSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    portal: PortalType,
    role: UserRole,
    email: z.string().email(),
    name: z.string().nullable(),
    avatar: z.string().url().nullable(),
    walletAddress: z.string().nullable(),
    sellerId: z.string().uuid().nullable(),
    permissions: z.array(z.string()),
    expiresAt: z.string().datetime(),
});
export type AuthSession = z.infer<typeof AuthSessionSchema>;

// ─── JWT Token Payload ─────────────────────────────────────────────────────
export const JwtPayloadSchema = z.object({
    sub: z.string().uuid(),
    aud: PortalType,
    role: UserRole,
    email: z.string().email(),
    sellerId: z.string().uuid().nullable().optional(),
    permissions: z.array(z.string()).optional(),
    iat: z.number(),
    exp: z.number(),
});
export type JwtPayload = z.infer<typeof JwtPayloadSchema>;

// ─── Login Request ─────────────────────────────────────────────────────────
export const LoginRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    portal: PortalType,
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

// ─── Register Request ──────────────────────────────────────────────────────
export const RegisterRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(128),
    name: z.string().min(2).max(100),
    portal: PortalType,
    acceptTerms: z.literal(true),
});
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

// ─── OAuth Provider Config ─────────────────────────────────────────────────
export const OAuthProviderSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(['oauth', 'oidc', 'saml', 'credentials', 'web3']),
    clientId: z.string().optional(),
    clientSecret: z.string().optional(),
    issuer: z.string().url().optional(),
    enabled: z.boolean().default(true),
});
export type OAuthProvider = z.infer<typeof OAuthProviderSchema>;

// ─── Web3 Wallet Auth (SIWE) ──────────────────────────────────────────────
export const WalletConnectRequestSchema = z.object({
    address: z.string(),
    message: z.string(),
    signature: z.string(),
    chainId: z.number(),
    portal: PortalType,
});
export type WalletConnectRequest = z.infer<typeof WalletConnectRequestSchema>;

// ─── Auth Response ─────────────────────────────────────────────────────────
export const AuthResponseSchema = z.object({
    user: AuthSessionSchema,
    accessToken: z.string(),
    refreshToken: z.string(),
    expiresIn: z.number(),
});
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

// ─── Refresh Token Request ─────────────────────────────────────────────────
export const RefreshTokenRequestSchema = z.object({
    refreshToken: z.string(),
});
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;

// ─── 2FA ───────────────────────────────────────────────────────────────────
export const TwoFactorSetupSchema = z.object({
    secret: z.string(),
    qrCodeUrl: z.string(),
    backupCodes: z.array(z.string()),
});
export type TwoFactorSetup = z.infer<typeof TwoFactorSetupSchema>;

export const TwoFactorVerifySchema = z.object({
    code: z.string().length(6),
});
export type TwoFactorVerify = z.infer<typeof TwoFactorVerifySchema>;
