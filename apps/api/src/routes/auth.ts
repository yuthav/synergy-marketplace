import type { FastifyPluginAsync } from 'fastify';

// Mock user store — replace with DB queries when DB is wired
const MOCK_USERS: Record<string, { id: string; email: string; password: string; role: string; portal: string }> = {
    'buyer@test.com': { id: 'u1', email: 'buyer@test.com', password: 'password', role: 'buyer', portal: 'marketplace' },
    'seller@test.com': { id: 'u2', email: 'seller@test.com', password: 'password', role: 'seller', portal: 'seller' },
    'admin@test.com': { id: 'u3', email: 'admin@test.com', password: 'password', role: 'admin', portal: 'platform' },
};

export const authRoutes: FastifyPluginAsync = async (app) => {
    // POST /api/v1/auth/token — issue JWT (any portal)
    app.post<{ Body: { email: string; password: string; portal: 'marketplace' | 'seller' | 'platform' } }>(
        '/token',
        {
            schema: {
                tags: ['auth'],
                summary: 'Issue access token',
                body: {
                    type: 'object',
                    required: ['email', 'password', 'portal'],
                    properties: {
                        email: { type: 'string', format: 'email' },
                        password: { type: 'string', minLength: 6 },
                        portal: { type: 'string', enum: ['marketplace', 'seller', 'platform'] },
                    },
                },
            },
        },
        async (request, reply) => {
            const { email, password, portal } = request.body;
            const user = MOCK_USERS[email];

            if (!user || user.password !== password) {
                return reply.status(401).send({ success: false, error: 'Invalid credentials' });
            }

            // Portal access control
            const allowedRoles: Record<string, string[]> = {
                marketplace: ['buyer', 'seller'],
                seller: ['seller'],
                platform: ['admin', 'super_admin'],
            };

            if (!allowedRoles[portal]?.includes(user.role)) {
                return reply.status(403).send({ success: false, error: `Access denied for ${portal} portal` });
            }

            const token = app.jwt.sign({
                sub: user.id,
                email: user.email,
                role: user.role,
                portal,
                aud: portal,
            });

            const refreshToken = app.jwt.sign({ sub: user.id, type: 'refresh', portal }, { expiresIn: '7d' });

            return {
                success: true,
                data: {
                    accessToken: token,
                    refreshToken,
                    expiresIn: 3600,
                    tokenType: 'Bearer',
                    user: { id: user.id, email: user.email, role: user.role },
                },
            };
        }
    );

    // POST /api/v1/auth/refresh
    app.post<{ Body: { refreshToken: string } }>(
        '/refresh',
        { schema: { tags: ['auth'], summary: 'Refresh access token' } },
        async (request, reply) => {
            try {
                const payload = app.jwt.verify<{ sub: string; portal: string; type: string }>(request.body.refreshToken);
                if (payload.type !== 'refresh') throw new Error('Invalid token type');

                const newToken = app.jwt.sign({ sub: payload.sub, portal: payload.portal }, { expiresIn: '1h' });
                return { success: true, data: { accessToken: newToken, expiresIn: 3600 } };
            } catch {
                return reply.status(401).send({ success: false, error: 'Invalid or expired refresh token' });
            }
        }
    );

    // DELETE /api/v1/auth/logout
    app.delete('/logout', { schema: { tags: ['auth'] } }, async () => ({
        success: true,
        message: 'Logged out successfully',
    }));

    // GET /api/v1/auth/me
    app.get(
        '/me',
        { onRequest: [(app as any).authenticate], schema: { tags: ['auth'], security: [{ BearerAuth: [] }] } },
        async (request) => {
            const payload = (request as any).user as { sub: string; email: string; role: string };
            return {
                success: true,
                data: { id: payload.sub, email: payload.email, role: payload.role },
            };
        }
    );
};
