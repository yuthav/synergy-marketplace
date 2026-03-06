import type { PortalType, UserRole } from '@synergetics/types';
import { hasPermission, hasAnyPermission, getRolePermissions, type Permission } from './rbac';

/**
 * Middleware-style helper to check authentication.
 * Returns the decoded session or throws.
 */
export function withAuth<T extends { user?: { id: string; role: UserRole; portal: PortalType; permissions: string[] } }>(
    session: T | null | undefined,
    expectedPortal?: PortalType,
): asserts session is T & { user: NonNullable<T['user']> } {
    if (!session?.user) {
        throw new AuthError('Not authenticated', 401);
    }

    if (expectedPortal && session.user.portal !== expectedPortal) {
        throw new AuthError('Access denied: invalid portal', 403);
    }
}

/**
 * Check that user has one of the specified roles.
 */
export function withRole(
    userRole: UserRole,
    allowedRoles: UserRole[],
): void {
    if (!allowedRoles.includes(userRole)) {
        throw new AuthError('Insufficient role', 403);
    }
}

/**
 * Check that user has a specific permission.
 */
export function withPermission(
    userPermissions: string[],
    required: Permission,
): void {
    if (!hasPermission(userPermissions, required)) {
        throw new AuthError(`Missing permission: ${required}`, 403);
    }
}

/**
 * Check that user has any of the specified permissions.
 */
export function withAnyPermission(
    userPermissions: string[],
    required: Permission[],
): void {
    if (!hasAnyPermission(userPermissions, required)) {
        throw new AuthError('Insufficient permissions', 403);
    }
}

/**
 * Populate permissions array from role if not already present.
 */
export function resolvePermissions(role: UserRole, existingPermissions?: string[]): string[] {
    if (existingPermissions && existingPermissions.length > 0) {
        return existingPermissions;
    }
    return getRolePermissions(role);
}

export class AuthError extends Error {
    constructor(
        message: string,
        public statusCode: number,
    ) {
        super(message);
        this.name = 'AuthError';
    }
}
