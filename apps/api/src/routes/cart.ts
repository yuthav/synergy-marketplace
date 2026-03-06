import type { FastifyPluginAsync } from 'fastify';

// In-memory cart store (keyed by userId)
const CARTS: Record<string, { items: any[] }> = {};

export const cartRoutes: FastifyPluginAsync = async (app) => {
    const auth = (app as any).authenticate;

    // GET /api/v1/cart
    app.get('/cart', { onRequest: [auth], schema: { tags: ['cart'], security: [{ BearerAuth: [] }] } }, async (req) => {
        const user = (req as any).user as { sub: string };
        const cart = CARTS[user.sub] ?? { items: [] };
        const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
        const fee = +(subtotal * 0.05).toFixed(2);
        return { success: true, data: { ...cart, subtotal, platformFee: fee, total: +(subtotal + fee).toFixed(2) } };
    });

    // POST /api/v1/cart/items
    app.post<{ Body: { listingId: string; qty?: number } }>(
        '/cart/items',
        { onRequest: [auth], schema: { tags: ['cart'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            const user = (req as any).user as { sub: string };
            if (!CARTS[user.sub]) CARTS[user.sub] = { items: [] };
            const { listingId, qty = 1 } = req.body;
            const existing = CARTS[user.sub].items.find(i => i.listingId === listingId);
            if (existing) {
                existing.qty += qty;
            } else {
                CARTS[user.sub].items.push({ id: `ci_${Date.now()}`, listingId, title: 'Item', price: 49, qty });
            }
            return { success: true, data: CARTS[user.sub], message: 'Item added to cart' };
        }
    );

    // DELETE /api/v1/cart/items/:id
    app.delete<{ Params: { id: string } }>(
        '/cart/items/:id',
        { onRequest: [auth], schema: { tags: ['cart'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            const user = (req as any).user as { sub: string };
            if (CARTS[user.sub]) {
                CARTS[user.sub].items = CARTS[user.sub].items.filter(i => i.id !== req.params.id);
            }
            return { success: true, message: 'Item removed' };
        }
    );

    // DELETE /api/v1/cart — clear cart
    app.delete('/cart', { onRequest: [auth], schema: { tags: ['cart'], security: [{ BearerAuth: [] }] } }, async (req) => {
        const user = (req as any).user as { sub: string };
        CARTS[user.sub] = { items: [] };
        return { success: true, message: 'Cart cleared' };
    });

    // POST /api/v1/cart/checkout — initiate
    app.post<{ Body: { paymentMethod: 'stripe' | 'eth' | 'sol' | 'usdc' | 'x402' } }>(
        '/cart/checkout',
        { onRequest: [auth], schema: { tags: ['cart'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            const user = (req as any).user as { sub: string };
            const cart = CARTS[user.sub] ?? { items: [] };
            if (cart.items.length === 0) return { success: false, error: 'Cart is empty' };
            const orderId = `SYN-${Date.now().toString(36).toUpperCase()}`;
            CARTS[user.sub] = { items: [] }; // clear cart
            return {
                success: true,
                data: {
                    orderId,
                    paymentMethod: req.body.paymentMethod,
                    status: 'pending_payment',
                    redirectUrl: req.body.paymentMethod === 'stripe'
                        ? `/checkout/stripe?order=${orderId}`
                        : `/checkout/crypto?order=${orderId}`,
                },
            };
        }
    );
};
