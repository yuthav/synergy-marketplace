import type { FastifyPluginAsync } from 'fastify';

export const sellerRoutes: FastifyPluginAsync = async (app) => {
    const auth = (app as any).authenticate;

    // GET /api/v1/seller/dashboard
    app.get('/dashboard', { onRequest: [auth], schema: { tags: ['seller'], security: [{ BearerAuth: [] }] } }, async () => ({
        success: true,
        data: {
            revenue: { total: 12450, change: 12.5, period: '30d' },
            orders: { total: 156, change: 18.2, period: '30d' },
            listings: { active: 24, draft: 3, underReview: 1 },
            rating: { avg: 4.8, change: 0.1, reviews: 1040 },
            recentOrders: [
                { id: 'SYN-A1B2', product: 'AutoCodeAgent Pro', amount: 49, status: 'completed', date: '2026-03-04T10:00:00Z' },
                { id: 'SYN-C3D4', product: 'PromptCraft Studio', amount: 29, status: 'completed', date: '2026-03-04T08:00:00Z' },
            ],
        },
    }));

    // GET /api/v1/seller/analytics
    app.get<{ Querystring: { period?: '7d' | '30d' | '90d' | '1y' } }>(
        '/analytics',
        { onRequest: [auth], schema: { tags: ['seller'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            const period = req.query.period ?? '30d';
            const points = period === '7d' ? 7 : period === '30d' ? 30 : period === '90d' ? 12 : 12;
            const revenueChart = Array.from({ length: points }, (_, i) => ({
                label: `Day ${i + 1}`,
                revenue: Math.round(200 + Math.random() * 800),
                orders: Math.round(2 + Math.random() * 12),
            }));
            return { success: true, data: { period, revenueChart, topCountries: [{ country: 'US', pct: 45 }, { country: 'IN', pct: 18 }, { country: 'GB', pct: 12 }, { country: 'DE', pct: 10 }] } };
        }
    );

    // GET /api/v1/seller/listings
    app.get<{ Querystring: { status?: string } }>(
        '/listings',
        { onRequest: [auth], schema: { tags: ['seller'], security: [{ BearerAuth: [] }] } },
        async () => ({
            success: true,
            data: {
                items: [
                    { id: 'l1', title: 'AutoCodeAgent Pro', status: 'published', sales: 312, revenue: 15288, rating: 4.9 },
                    { id: 'l3', title: 'PromptCraft Studio', status: 'published', sales: 489, revenue: 14181, rating: 4.7 },
                    { id: 'l4', title: 'API Gateway Ultra', status: 'published', sales: 203, revenue: 20097, rating: 4.9 },
                    { id: 'lx', title: 'MLPipeline Pro', status: 'draft', sales: 0, revenue: 0, rating: 0 },
                ],
                total: 4,
            },
        })
    );

    // GET /api/v1/seller/payouts
    app.get('/payouts', { onRequest: [auth], schema: { tags: ['seller'], security: [{ BearerAuth: [] }] } }, async () => ({
        success: true,
        data: {
            pendingBalance: 3240,
            nextPayoutDate: '2026-03-15',
            payoutHistory: [
                { id: 'po1', amount: 8900, status: 'completed', date: '2026-02-15', method: 'bank' },
                { id: 'po2', amount: 6200, status: 'completed', date: '2026-01-15', method: 'bank' },
            ],
            connectedAccount: { type: 'bank', last4: '4242', country: 'US' },
        },
    }));

    // POST /api/v1/seller/payouts/request
    app.post<{ Body: { amount: number } }>(
        '/payouts/request',
        { onRequest: [auth], schema: { tags: ['seller'], security: [{ BearerAuth: [] }] } },
        async (req, reply) => {
            if (req.body.amount < 50) return reply.status(400).send({ success: false, error: 'Minimum payout is $50' });
            return { success: true, data: { id: `po${Date.now()}`, amount: req.body.amount, status: 'pending', estimatedDate: '2026-03-20' } };
        }
    );

    // GET /api/v1/seller/team
    app.get('/team', { onRequest: [auth], schema: { tags: ['seller'], security: [{ BearerAuth: [] }] } }, async () => ({
        success: true,
        data: [
            { id: 't1', name: 'Alice Chen', email: 'alice@neuralforge.ai', role: 'manager', avatar: null, joinedAt: '2025-10-01', status: 'active' },
            { id: 't2', name: 'Bob Kumar', email: 'bob@neuralforge.ai', role: 'support', avatar: null, joinedAt: '2025-11-15', status: 'active' },
        ],
    }));

    // POST /api/v1/seller/team — invite
    app.post<{ Body: { email: string; role: string } }>(
        '/team',
        { onRequest: [auth], schema: { tags: ['seller'], security: [{ BearerAuth: [] }] } },
        async (req) => ({
            success: true,
            data: { id: `t${Date.now()}`, email: req.body.email, role: req.body.role, status: 'invited' },
            message: `Invitation sent to ${req.body.email}`,
        })
    );

    // POST /api/v1/seller/onboarding — KYB submission
    app.post<{ Body: { businessName: string; registrationNumber: string; country: string; website?: string } }>(
        '/onboarding',
        { onRequest: [auth], schema: { tags: ['seller'], security: [{ BearerAuth: [] }] } },
        async (req) => ({
            success: true,
            data: { kybStatus: 'pending_review', submittedAt: new Date().toISOString(), ...req.body },
            message: 'KYB submitted. Review takes 1–2 business days.',
        })
    );
};
