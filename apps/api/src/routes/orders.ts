import type { FastifyPluginAsync } from 'fastify';

const MOCK_ORDERS = [
    { id: 'SYN-A1B2', buyerId: 'u1', sellerId: 'u2', listingId: 'l1', listingTitle: 'AutoCodeAgent Pro', amount: 49, currency: 'USD', paymentMethod: 'stripe', status: 'completed', downloadUrl: '/api/v1/downloads/autocode-v2.zip', createdAt: '2026-03-04T10:00:00Z' },
    { id: 'SYN-C3D4', buyerId: 'u1', sellerId: 'u2', listingId: 'l3', listingTitle: 'PromptCraft Studio', amount: 29, currency: 'USD', paymentMethod: 'eth', status: 'completed', downloadUrl: '/api/v1/downloads/promptcraft-v1.zip', createdAt: '2026-03-03T12:00:00Z' },
    { id: 'SYN-E5F6', buyerId: 'u3', sellerId: 'u2', listingId: 'l2', listingTitle: 'DataVault Enterprise', amount: 199, currency: 'USD', paymentMethod: 'stripe', status: 'completed', downloadUrl: null, createdAt: '2026-03-02T08:00:00Z' },
    { id: 'SYN-G7H8', buyerId: 'u3', sellerId: 'u2', listingId: 'l4', listingTitle: 'API Gateway Ultra', amount: 99, currency: 'USD', paymentMethod: 'usdc', status: 'processing', downloadUrl: null, createdAt: '2026-03-01T15:00:00Z' },
];

export const ordersRoutes: FastifyPluginAsync = async (app) => {
    const auth = (app as any).authenticate;

    // GET /api/v1/orders — buyer's orders
    app.get<{ Querystring: { page?: string; status?: string } }>(
        '/orders',
        { onRequest: [auth], schema: { tags: ['orders'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            const user = (req as any).user as { sub: string; role: string };
            const { page = '1', status } = req.query;
            let orders = MOCK_ORDERS.filter(o => o.buyerId === user.sub);
            if (status) orders = orders.filter(o => o.status === status);
            const pageNum = Number(page);
            const paged = orders.slice((pageNum - 1) * 10, pageNum * 10);
            return { success: true, data: { items: paged, total: orders.length, page: pageNum } };
        }
    );

    // GET /api/v1/orders/:id
    app.get<{ Params: { id: string } }>(
        '/orders/:id',
        { onRequest: [auth], schema: { tags: ['orders'], security: [{ BearerAuth: [] }] } },
        async (req, reply) => {
            const order = MOCK_ORDERS.find(o => o.id === req.params.id);
            if (!order) return reply.status(404).send({ success: false, error: 'Order not found' });
            return { success: true, data: order };
        }
    );

    // POST /api/v1/orders/:id/download — generate signed download URL
    app.post<{ Params: { id: string } }>(
        '/orders/:id/download',
        { onRequest: [auth], schema: { tags: ['orders'], security: [{ BearerAuth: [] }] } },
        async (req, reply) => {
            const order = MOCK_ORDERS.find(o => o.id === req.params.id);
            if (!order) return reply.status(404).send({ success: false, error: 'Order not found' });
            if (order.status !== 'completed') return reply.status(400).send({ success: false, error: 'Order not yet completed' });
            const signedUrl = `https://cdn.synergetics.ai/downloads/${order.listingId}?token=${Buffer.from(`${order.id}:${Date.now()}`).toString('base64')}&expires=${Date.now() + 3600000}`;
            return { success: true, data: { downloadUrl: signedUrl, expiresAt: new Date(Date.now() + 3600000).toISOString() } };
        }
    );

    // GET /api/v1/seller/orders — seller's received orders
    app.get<{ Querystring: { page?: string; status?: string } }>(
        '/seller/orders',
        { onRequest: [auth], schema: { tags: ['orders'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            const user = (req as any).user as { sub: string };
            const { page = '1', status } = req.query;
            let orders = MOCK_ORDERS.filter(o => o.sellerId === user.sub);
            if (status) orders = orders.filter(o => o.status === status);
            const pageNum = Number(page);
            return { success: true, data: { items: orders.slice((pageNum - 1) * 10, pageNum * 10), total: orders.length } };
        }
    );

    // PATCH /api/v1/seller/orders/:id/status
    app.patch<{ Params: { id: string }; Body: { status: string } }>(
        '/seller/orders/:id/status',
        { onRequest: [auth], schema: { tags: ['orders'], security: [{ BearerAuth: [] }] } },
        async (req, reply) => {
            const order = MOCK_ORDERS.find(o => o.id === req.params.id);
            if (!order) return reply.status(404).send({ success: false, error: 'Order not found' });
            const updated = { ...order, status: req.body.status };
            return { success: true, data: updated };
        }
    );
};
