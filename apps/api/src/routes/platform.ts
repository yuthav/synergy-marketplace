import type { FastifyPluginAsync } from 'fastify';

let maintenanceState = { marketplace: false, sellerPortal: false, message: '', scheduledEnd: null as string | null };
const geoRestrictions: { country: string; code: string; portals: string[]; reason: string }[] = [];
const revenueShares: Record<string, number> = { u2: 12, default: 15 };
const featureFlags: Record<string, boolean> = { x402_payments: true, crypto_checkout: true, ai_recommendations: false, subscription_billing: true };

const MERCHANTS = [
    { id: 'u2', name: 'NeuralForge Labs', email: 'seller@neuralforge.ai', tier: 'platinum', status: 'active', revenue: 45200, kybStatus: 'verified', joinedAt: '2025-02-01' },
    { id: 'u5', name: 'CloudScale AI', email: 'cs@cloudscale.ai', tier: 'gold', status: 'active', revenue: 32100, kybStatus: 'verified', joinedAt: '2025-03-15' },
    { id: 'u6', name: 'PromptWizards', email: 'pw@promptwizards.ai', tier: 'gold', status: 'active', revenue: 28900, kybStatus: 'verified', joinedAt: '2025-04-01' },
    { id: 'u7', name: 'DataNova Corp', email: 'dn@datanova.io', tier: 'bronze', status: 'under_review', revenue: 8200, kybStatus: 'pending', joinedAt: '2025-12-01' },
];

const TICKETS = [
    { id: 'tk1', title: 'Payment gateway timeout', priority: 'high', status: 'open', assignee: 'Admin', createdAt: '2026-03-04T10:00:00Z' },
    { id: 'tk2', title: 'DataNova KYB review', priority: 'medium', status: 'in_review', assignee: 'Admin', createdAt: '2026-03-03T09:00:00Z' },
];

const WORKFLOWS = [
    { id: 'wf1', name: 'Merchant Onboarding', steps: ['KYB Review', 'Tier Assignment', 'Welcome Email'], status: 'active' },
    { id: 'wf2', name: 'Dispute Resolution', steps: ['Evidence Collection', 'Admin Review', 'Resolution'], status: 'active' },
];

const ANNOUNCEMENTS = [
    { id: 'an1', title: 'Platform Upgrade v2.1', content: 'Scheduled maintenance on March 10, 2:00–4:00 AM UTC.', targets: ['all'], sentAt: '2026-03-01T08:00:00Z' },
];

export const platformRoutes: FastifyPluginAsync = async (app) => {
    const auth = (app as any).authenticate;

    // GET /api/v1/platform/dashboard
    app.get('/dashboard', { schema: { tags: ['platform'] } }, async () => ({
        success: true,
        data: {
            gmv: { total: 284500, change: 22.3, period: '30d' },
            revenue: { total: 42700, change: 18.7, period: '30d' },
            merchants: { total: 156, new: 8, period: '30d' },
            listings: { total: 3247, new: 124, period: '30d' },
            users: { total: 12890, new: 1200, period: '30d' },
            disputes: { open: 3, change: -2, period: '30d' },
            systemStatus: maintenanceState,
        },
    }));

    // ─── Merchants ────────────────────────────────────────────────────────
    app.get<{ Querystring: { page?: string; tier?: string; status?: string; q?: string } }>(
        '/merchants',
        { onRequest: [auth], schema: { tags: ['platform'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            let items = [...MERCHANTS];
            if (req.query.tier) items = items.filter(m => m.tier === req.query.tier);
            if (req.query.status) items = items.filter(m => m.status === req.query.status);
            if (req.query.q) items = items.filter(m => m.name.toLowerCase().includes(req.query.q!.toLowerCase()));
            return { success: true, data: { items, total: items.length } };
        }
    );

    app.get<{ Params: { id: string } }>(
        '/merchants/:id',
        { onRequest: [auth], schema: { tags: ['platform'], security: [{ BearerAuth: [] }] } },
        async (req, reply) => {
            const m = MERCHANTS.find(m => m.id === req.params.id);
            if (!m) return reply.status(404).send({ success: false, error: 'Merchant not found' });
            return { success: true, data: { ...m, commissionRate: revenueShares[m.id] ?? revenueShares.default } };
        }
    );

    app.patch<{ Params: { id: string }; Body: { status?: string; tier?: string } }>(
        '/merchants/:id',
        { onRequest: [auth], schema: { tags: ['platform'], security: [{ BearerAuth: [] }] } },
        async (req, reply) => {
            const idx = MERCHANTS.findIndex(m => m.id === req.params.id);
            if (idx === -1) return reply.status(404).send({ success: false, error: 'Merchant not found' });
            MERCHANTS[idx] = { ...MERCHANTS[idx], ...req.body };
            return { success: true, data: MERCHANTS[idx] };
        }
    );

    // ─── Maintenance ──────────────────────────────────────────────────────
    app.get('/maintenance', { schema: { tags: ['platform'] } }, async () => ({
        success: true, data: maintenanceState,
    }));

    app.post<{ Body: { marketplace?: boolean; sellerPortal?: boolean; message?: string; scheduledEnd?: string } }>(
        '/maintenance',
        { onRequest: [auth], schema: { tags: ['platform'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            maintenanceState = { ...maintenanceState, ...req.body };
            return { success: true, data: maintenanceState, message: 'Maintenance mode updated' };
        }
    );

    // ─── Geo Restrictions ─────────────────────────────────────────────────
    app.get('/geo-restrictions', { onRequest: [auth], schema: { tags: ['platform'], security: [{ BearerAuth: [] }] } }, async () => ({
        success: true, data: geoRestrictions,
    }));

    app.post<{ Body: { country: string; code: string; portals: string[]; reason?: string } }>(
        '/geo-restrictions',
        { onRequest: [auth], schema: { tags: ['platform'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            const existing = geoRestrictions.findIndex(g => g.code === req.body.code);
            if (existing > -1) geoRestrictions.splice(existing, 1);
            geoRestrictions.push({ ...req.body, reason: req.body.reason ?? '' });
            return { success: true, data: geoRestrictions, message: `Geo restriction added for ${req.body.country}` };
        }
    );

    app.delete<{ Params: { code: string } }>(
        '/geo-restrictions/:code',
        { onRequest: [auth], schema: { tags: ['platform'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            const idx = geoRestrictions.findIndex(g => g.code === req.params.code);
            if (idx > -1) geoRestrictions.splice(idx, 1);
            return { success: true, message: `Restriction removed for ${req.params.code}` };
        }
    );

    // ─── Revenue Shares ───────────────────────────────────────────────────
    app.get('/revenue-shares', { onRequest: [auth], schema: { tags: ['platform'], security: [{ BearerAuth: [] }] } }, async () => ({
        success: true, data: { shares: revenueShares, defaultRate: revenueShares.default },
    }));

    app.patch<{ Params: { merchantId: string }; Body: { rate: number } }>(
        '/revenue-shares/:merchantId',
        { onRequest: [auth], schema: { tags: ['platform'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            revenueShares[req.params.merchantId] = req.body.rate;
            return { success: true, data: { merchantId: req.params.merchantId, rate: req.body.rate }, message: 'Revenue share updated' };
        }
    );

    // ─── Finance Overview ─────────────────────────────────────────────────
    app.get('/finance/overview', { onRequest: [auth], schema: { tags: ['platform'], security: [{ BearerAuth: [] }] } }, async () => ({
        success: true,
        data: {
            totalRevenue: 42700,
            byMethod: { stripe: 24300, crypto: 11200, x402: 5100, credits: 2075 },
            pendingPayouts: 18400,
            completedPayouts: 92000,
            disputedAmount: 1200,
        },
    }));

    // ─── Audit Log ────────────────────────────────────────────────────────
    app.get<{ Querystring: { page?: string; actor?: string } }>(
        '/audit-log',
        { onRequest: [auth], schema: { tags: ['platform'], security: [{ BearerAuth: [] }] } },
        async () => ({
            success: true,
            data: {
                items: [
                    { id: 'al1', actor: 'admin@synergetics.ai', action: 'MERCHANT_STATUS_CHANGED', resource: 'merchant:u7', before: { status: 'active' }, after: { status: 'under_review' }, ip: '192.168.1.1', timestamp: '2026-03-04T10:00:00Z' },
                    { id: 'al2', actor: 'admin@synergetics.ai', action: 'MAINTENANCE_MODE_SET', resource: 'system', before: { marketplace: false }, after: { marketplace: false }, ip: '192.168.1.1', timestamp: '2026-03-03T09:00:00Z' },
                ],
                total: 2,
            },
        })
    );

    // ─── System Status ─────────────────────────────────────────────────────
    app.get('/system/status', { schema: { tags: ['platform'] } }, async () => ({
        success: true,
        data: {
            services: [
                { name: 'Marketplace', status: 'operational', latency: 48, uptime: 99.98 },
                { name: 'Seller Portal', status: 'operational', latency: 51, uptime: 99.95 },
                { name: 'API Server', status: 'operational', latency: 12, uptime: 99.99 },
                { name: 'Payment Gateway', status: maintenanceState.marketplace ? 'degraded' : 'operational', latency: 320, uptime: 99.89 },
                { name: 'Database', status: 'optimal', latency: 4, uptime: 100 },
            ],
            maintenance: maintenanceState,
        },
    }));

    // ─── Feature Flags ────────────────────────────────────────────────────
    app.get('/feature-flags', { onRequest: [auth], schema: { tags: ['platform'], security: [{ BearerAuth: [] }] } }, async () => ({
        success: true, data: featureFlags,
    }));

    app.patch<{ Params: { flag: string }; Body: { enabled: boolean } }>(
        '/feature-flags/:flag',
        { onRequest: [auth], schema: { tags: ['platform'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            featureFlags[req.params.flag] = req.body.enabled;
            return { success: true, data: { flag: req.params.flag, enabled: req.body.enabled } };
        }
    );

    // ─── Workflows ────────────────────────────────────────────────────────
    app.get('/workflows', { onRequest: [auth], schema: { tags: ['platform'], security: [{ BearerAuth: [] }] } }, async () => ({
        success: true, data: WORKFLOWS,
    }));

    app.post<{ Body: { name: string; steps: string[] } }>(
        '/workflows',
        { onRequest: [auth], schema: { tags: ['platform'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            const wf = { id: `wf${Date.now()}`, ...req.body, status: 'active' };
            WORKFLOWS.push(wf);
            return { success: true, data: wf };
        }
    );

    // ─── Tickets ─────────────────────────────────────────────────────────
    app.get('/tickets', { onRequest: [auth], schema: { tags: ['platform'], security: [{ BearerAuth: [] }] } }, async () => ({
        success: true, data: { items: TICKETS, total: TICKETS.length },
    }));

    app.post<{ Body: { title: string; priority: string; description: string } }>(
        '/tickets',
        { onRequest: [auth], schema: { tags: ['platform'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            const tk = { id: `tk${Date.now()}`, ...req.body, status: 'open', assignee: null, createdAt: new Date().toISOString() };
            TICKETS.push(tk as any);
            return { success: true, data: tk };
        }
    );

    // ─── Announcements / Communications ──────────────────────────────────
    app.get('/announcements', { onRequest: [auth], schema: { tags: ['platform'], security: [{ BearerAuth: [] }] } }, async () => ({
        success: true, data: ANNOUNCEMENTS,
    }));

    app.post<{ Body: { title: string; content: string; targets: string[] } }>(
        '/announcements',
        { onRequest: [auth], schema: { tags: ['platform'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            const ann = { id: `an${Date.now()}`, ...req.body, sentAt: new Date().toISOString() };
            ANNOUNCEMENTS.push(ann);
            return { success: true, data: ann, message: `Announcement sent to ${req.body.targets.join(', ')}` };
        }
    );
};
