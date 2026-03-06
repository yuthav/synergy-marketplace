import { SignJWT, jwtVerify, decodeJwt as joseDecodeJwt } from 'jose';
import type { PortalType, UserRole } from '@synergetics/types';

export interface JwtPayload {
    sub: string;       // user ID
    aud: PortalType;   // portal identifier
    role: UserRole;
    email: string;
    sellerId?: string | null;
    permissions?: string[];
}

const DEFAULT_EXPIRY = '24h';

/**
 * Sign a JWT with portal-specific audience claim.
 * The API server validates the `aud` claim to reject cross-portal tokens.
 */
export async function signJwt(
    payload: JwtPayload,
    secret: string,
    expiresIn: string = DEFAULT_EXPIRY,
): Promise<string> {
    const key = new TextEncoder().encode(secret);

    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .setAudience(payload.aud)
        .setSubject(payload.sub)
        .sign(key);
}

/**
 * Verify a JWT and ensure the audience matches the expected portal.
 * Returns the decoded payload or throws an error.
 */
export async function verifyJwt(
    token: string,
    secret: string,
    expectedAudience?: PortalType,
): Promise<JwtPayload> {
    const key = new TextEncoder().encode(secret);

    const { payload } = await jwtVerify(token, key, {
        audience: expectedAudience,
    });

    return {
        sub: payload.sub as string,
        aud: payload.aud as PortalType,
        role: (payload as Record<string, unknown>).role as UserRole,
        email: (payload as Record<string, unknown>).email as string,
        sellerId: (payload as Record<string, unknown>).sellerId as string | null | undefined,
        permissions: (payload as Record<string, unknown>).permissions as string[] | undefined,
    };
}

/**
 * Decode a JWT without verification (for inspection/debugging).
 */
export function decodeJwt(token: string): JwtPayload {
    const payload = joseDecodeJwt(token);
    return {
        sub: payload.sub as string,
        aud: payload.aud as PortalType,
        role: (payload as Record<string, unknown>).role as UserRole,
        email: (payload as Record<string, unknown>).email as string,
        sellerId: (payload as Record<string, unknown>).sellerId as string | null | undefined,
        permissions: (payload as Record<string, unknown>).permissions as string[] | undefined,
    };
}
