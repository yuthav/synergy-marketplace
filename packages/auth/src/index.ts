export { createAuthConfig, type AuthConfigOptions } from './config';
export { createProviderRegistry, type ProviderRegistryOptions } from './providers';
export { hashPassword, verifyPassword } from './password';
export { signJwt, verifyJwt, decodeJwt } from './jwt';
export {
    PERMISSIONS,
    ROLE_PERMISSIONS,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getRolePermissions,
    type Permission,
} from './rbac';
export { withAuth, withRole, withPermission } from './middleware';
export type { PortalSession, PortalUser } from './types';
