import type { PortalType } from '@synergetics/types';
import type { AuthAdapters, PortalProviderConfig, PortalSession } from './types';
import { createProviderRegistry } from './providers';

export interface AuthConfigOptions {
    /** Which portal this auth config is for */
    portal: PortalType;
    /** OAuth / credential providers to enable */
    providers: PortalProviderConfig;
    /** Auth.js secret for encrypting sessions/tokens */
    secret: string;
    /** Database adapters for user lookups */
    adapters: AuthAdapters;
    /** Session max age in seconds (default: 24 hours) */
    sessionMaxAge?: number;
    /** Custom pages paths */
    pages?: {
        signIn?: string;
        signUp?: string;
        error?: string;
        verifyRequest?: string;
    };
    /** Callbacks for custom JWT/session handling */
    callbacks?: {
        onSignIn?: (user: PortalSession['user']) => Promise<boolean>;
        onSignUp?: (user: PortalSession['user']) => Promise<void>;
    };
}

/**
 * Factory function that creates an Auth.js configuration for a specific portal.
 *
 * Each portal (marketplace, seller, platform) calls this with its own
 * providers and config. The providers are configurable via env vars —
 * zero code changes to swap or add OAuth providers.
 *
 * ```ts
 * // apps/marketplace/src/auth.ts
 * import { createAuthConfig } from '@synergetics/auth';
 *
 * export const authConfig = createAuthConfig({
 *   portal: 'marketplace',
 *   secret: process.env.AUTH_SECRET!,
 *   providers: {
 *     credentials: true,
 *     google: {
 *       clientId: process.env.MARKETPLACE_GOOGLE_CLIENT_ID!,
 *       clientSecret: process.env.MARKETPLACE_GOOGLE_CLIENT_SECRET!,
 *     },
 *     web3: true,
 *   },
 *   adapters: dbAdapters,
 * });
 * ```
 */
export function createAuthConfig(options: AuthConfigOptions): AuthConfig {
    const {
        portal,
        providers: providerConfig,
        secret,
        adapters,
        sessionMaxAge = 86400, // 24 hours
        pages,
        callbacks,
    } = options;

    const providerRegistry = createProviderRegistry({
        portal,
        providers: providerConfig,
    });

    return {
        portal,
        secret,
        sessionMaxAge,
        providerRegistry,
        adapters,
        pages: {
            signIn: pages?.signIn ?? '/auth/signin',
            signUp: pages?.signUp ?? '/auth/signup',
            error: pages?.error ?? '/auth/error',
        },
        callbacks: {
            onSignIn: callbacks?.onSignIn,
            onSignUp: callbacks?.onSignUp,
        },

        // Auth.js compatible config
        toNextAuthConfig() {
            return {
                secret,
                session: {
                    strategy: 'jwt' as const,
                    maxAge: sessionMaxAge,
                },
                pages: this.pages,
                providers: providerRegistry.map((p) => ({
                    id: p.id,
                    name: p.name,
                    type: p.type,
                    ...p.config,
                })),
                callbacks: {
                    jwt: async ({ token, user }: { token: Record<string, unknown>; user?: Record<string, unknown> }) => {
                        if (user) {
                            token.id = (user as Record<string, unknown>).id;
                            token.role = (user as Record<string, unknown>).role;
                            token.portal = portal;
                            token.sellerId = (user as Record<string, unknown>).sellerId ?? null;
                            token.permissions = (user as Record<string, unknown>).permissions ?? [];
                        }
                        return token;
                    },
                    session: async ({ session, token }: { session: Record<string, unknown>; token: Record<string, unknown> }) => {
                        const sessionUser = session.user as Record<string, unknown> | undefined;
                        if (sessionUser) {
                            sessionUser.id = token.id;
                            sessionUser.role = token.role;
                            sessionUser.portal = token.portal;
                            sessionUser.sellerId = token.sellerId;
                            sessionUser.permissions = token.permissions;
                        }
                        (session as Record<string, unknown>).portal = portal;
                        return session;
                    },
                },
            };
        },
    };
}

export interface AuthConfig {
    portal: PortalType;
    secret: string;
    sessionMaxAge: number;
    providerRegistry: ReturnType<typeof createProviderRegistry>;
    adapters: AuthAdapters;
    pages: { signIn: string; signUp: string; error: string };
    callbacks: {
        onSignIn?: (user: PortalSession['user']) => Promise<boolean>;
        onSignUp?: (user: PortalSession['user']) => Promise<void>;
    };
    toNextAuthConfig: () => Record<string, unknown>;
}
