import type { FastifyPluginAsync } from 'fastify';

const MOCK_PROFILE: Record<string, any> = {
    u1: { id: 'u1', email: 'buyer@test.com', name: 'Alex Johnson', avatar: null, bio: '', role: 'buyer', createdAt: '2025-01-01', wishlist: ['l3', 'l5'], purchases: ['l1', 'l3'] },
    u2: { id: 'u2', email: 'seller@test.com', name: 'NeuralForge Labs', avatar: null, bio: 'AI tool studio', role: 'seller', createdAt: '2025-02-01', wishlist: [], purchases: [] },
};

export const usersRoutes: FastifyPluginAsync = async (app) => {
    const auth = (app as any).authenticate;

    // GET /api/v1/me
    app.get('/me', { onRequest: [auth], schema: { tags: ['users'], security: [{ BearerAuth: [] }] } }, async (req) => {
        const user = (req as any).user as { sub: string };
        const profile = MOCK_PROFILE[user.sub] ?? { id: user.sub, email: 'unknown', role: 'buyer' };
        return { success: true, data: profile };
    });

    // PATCH /api/v1/me
    app.patch<{ Body: { name?: string; bio?: string; avatar?: string } }>(
        '/me',
        { onRequest: [auth], schema: { tags: ['users'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            const user = (req as any).user as { sub: string };
            const profile = MOCK_PROFILE[user.sub] ?? {};
            const updated = { ...profile, ...req.body, updatedAt: new Date().toISOString() };
            MOCK_PROFILE[user.sub] = updated;
            return { success: true, data: updated };
        }
    );

    // GET /api/v1/me/purchases
    app.get('/me/purchases', { onRequest: [auth], schema: { tags: ['users'], security: [{ BearerAuth: [] }] } }, async (req) => {
        const user = (req as any).user as { sub: string };
        const profile = MOCK_PROFILE[user.sub];
        return { success: true, data: { purchasedListingIds: profile?.purchases ?? [], total: profile?.purchases?.length ?? 0 } };
    });

    // GET /api/v1/me/wishlist
    app.get('/me/wishlist', { onRequest: [auth], schema: { tags: ['users'], security: [{ BearerAuth: [] }] } }, async (req) => {
        const user = (req as any).user as { sub: string };
        const profile = MOCK_PROFILE[user.sub];
        return { success: true, data: { items: profile?.wishlist ?? [], total: profile?.wishlist?.length ?? 0 } };
    });

    // POST /api/v1/me/wishlist/:listingId
    app.post<{ Params: { listingId: string } }>(
        '/me/wishlist/:listingId',
        { onRequest: [auth], schema: { tags: ['users'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            const user = (req as any).user as { sub: string };
            if (!MOCK_PROFILE[user.sub]) MOCK_PROFILE[user.sub] = { wishlist: [], purchases: [] };
            const profile = MOCK_PROFILE[user.sub];
            const { listingId } = req.params;
            const idx = profile.wishlist.indexOf(listingId);
            if (idx > -1) {
                profile.wishlist.splice(idx, 1);
                return { success: true, message: 'Removed from wishlist', wishlisted: false };
            } else {
                profile.wishlist.push(listingId);
                return { success: true, message: 'Added to wishlist', wishlisted: true };
            }
        }
    );
};
