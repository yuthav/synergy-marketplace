import type { PortalType, UserRole } from '@synergetics/types';

/** Extended session object available on every authenticated request */
export interface PortalSession {
    user: PortalUser;
    portal: PortalType;
    accessToken: string;
    expires: string;
}

export interface PortalUser {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
    role: UserRole;
    portal: PortalType;
    sellerId: string | null;
    permissions: string[];
    walletAddress: string | null;
}

/** Per-portal OAuth provider definition (read from env) */
export interface PortalProviderConfig {
    google?: { clientId: string; clientSecret: string };
    github?: { clientId: string; clientSecret: string };
    microsoft?: { clientId: string; clientSecret: string; tenantId?: string };
    oidc?: { issuer: string; clientId: string; clientSecret: string };
    saml?: { issuer: string; cert: string; entryPoint: string };
    credentials?: boolean; // email/password always available
    web3?: boolean; // SIWE wallet login
}

/** Lookup tables used by auth to find / create users */
export interface AuthAdapters {
    findUserByEmail: (email: string, portal: PortalType) => Promise<PortalUser | null>;
    findUserById: (id: string) => Promise<PortalUser | null>;
    createUser: (data: {
        email: string;
        name: string;
        hashedPassword: string;
        portal: PortalType;
        role: UserRole;
    }) => Promise<PortalUser>;
    verifyPassword: (email: string, password: string, portal: PortalType) => Promise<PortalUser | null>;
    findOrCreateOAuthUser: (data: {
        email: string;
        name: string;
        image: string | null;
        provider: string;
        providerAccountId: string;
        portal: PortalType;
    }) => Promise<PortalUser>;
}
