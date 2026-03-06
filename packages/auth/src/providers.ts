import type { PortalType } from '@synergetics/types';
import type { PortalProviderConfig } from './types';

export interface ProviderRegistryOptions {
    portal: PortalType;
    providers: PortalProviderConfig;
}

/**
 * Creates the list of Auth.js provider objects for a given portal.
 * Providers are configured via env vars — no code changes needed to swap providers.
 *
 * Usage:
 * ```ts
 * const providers = createProviderRegistry({
 *   portal: 'marketplace',
 *   providers: {
 *     google: { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET },
 *     github: { clientId: env.GITHUB_CLIENT_ID, clientSecret: env.GITHUB_CLIENT_SECRET },
 *     credentials: true,
 *     web3: true,
 *   },
 * });
 * ```
 */
export function createProviderRegistry(options: ProviderRegistryOptions): ProviderDefinition[] {
    const { providers } = options;
    const registry: ProviderDefinition[] = [];

    // Credentials provider (email/password) — always available as fallback
    if (providers.credentials !== false) {
        registry.push({
            id: 'credentials',
            name: 'Email & Password',
            type: 'credentials',
            config: {},
        });
    }

    // Google OAuth
    if (providers.google) {
        registry.push({
            id: 'google',
            name: 'Google',
            type: 'oauth',
            config: {
                clientId: providers.google.clientId,
                clientSecret: providers.google.clientSecret,
            },
        });
    }

    // GitHub OAuth
    if (providers.github) {
        registry.push({
            id: 'github',
            name: 'GitHub',
            type: 'oauth',
            config: {
                clientId: providers.github.clientId,
                clientSecret: providers.github.clientSecret,
            },
        });
    }

    // Microsoft / Azure AD
    if (providers.microsoft) {
        registry.push({
            id: 'microsoft',
            name: 'Microsoft',
            type: 'oauth',
            config: {
                clientId: providers.microsoft.clientId,
                clientSecret: providers.microsoft.clientSecret,
                tenantId: providers.microsoft.tenantId ?? 'common',
            },
        });
    }

    // Custom OIDC (e.g., Okta, Auth0, Keycloak)
    if (providers.oidc) {
        registry.push({
            id: 'oidc',
            name: 'Enterprise SSO',
            type: 'oidc',
            config: {
                issuer: providers.oidc.issuer,
                clientId: providers.oidc.clientId,
                clientSecret: providers.oidc.clientSecret,
            },
        });
    }

    // Web3 wallet (SIWE)
    if (providers.web3) {
        registry.push({
            id: 'web3',
            name: 'Web3 Wallet',
            type: 'web3',
            config: {},
        });
    }

    return registry;
}

export interface ProviderDefinition {
    id: string;
    name: string;
    type: 'credentials' | 'oauth' | 'oidc' | 'saml' | 'web3';
    config: Record<string, string | undefined>;
}

/** Get list of enabled provider IDs for display on login page */
export function getEnabledProviderIds(providers: ProviderDefinition[]): string[] {
    return providers.map((p) => p.id);
}

/** Check if a specific provider is enabled */
export function isProviderEnabled(providers: ProviderDefinition[], providerId: string): boolean {
    return providers.some((p) => p.id === providerId);
}
