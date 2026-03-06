import type { FastifyPluginAsync } from 'fastify';

export const paymentsRoutes: FastifyPluginAsync = async (app) => {
    const auth = (app as any).authenticate;

    // POST /api/v1/payments/stripe/checkout — create Stripe payment intent
    app.post<{ Body: { orderId: string; amount: number; currency?: string; metadata?: Record<string, string> } }>(
        '/stripe/checkout',
        { onRequest: [auth], schema: { tags: ['payments'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            // In production: use Stripe SDK to create payment intent
            const { orderId, amount, currency = 'usd' } = req.body;
            if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.startsWith('sk_test_...')) {
                // Return mock data when no real Stripe key configured
                return {
                    success: true,
                    data: {
                        paymentIntentId: `pi_mock_${Date.now()}`,
                        clientSecret: `pi_mock_${Date.now()}_secret_mock`,
                        amount,
                        currency,
                        orderId,
                        status: 'requires_payment_method',
                        note: 'Mock — set STRIPE_SECRET_KEY in .env to use real Stripe',
                    },
                };
            }
            // Real Stripe integration would go here
            return { success: true, data: { orderId, amount, currency, status: 'requires_payment_method' } };
        }
    );

    // POST /api/v1/payments/stripe/webhook
    app.post(
        '/stripe/webhook',
        {
            config: { rawBody: true },
            schema: { tags: ['payments'] },
        },
        async (req, reply) => {
            const sig = req.headers['stripe-signature'];
            if (!sig) return reply.status(400).send({ error: 'Missing stripe-signature header' });

            // Production: verify webhook signature with Stripe SDK
            // const event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
            const body = req.body as { type?: string; data?: { object?: { id?: string; metadata?: { orderId?: string } } } };
            const eventType = body?.type ?? 'unknown';

            if (eventType === 'payment_intent.succeeded') {
                const pi = body?.data?.object;
                const orderId = pi?.metadata?.orderId;
                app.log.info({ orderId, piId: pi?.id }, 'Payment succeeded — fulfilling order');
                // TODO: mark order as completed, trigger download access
            }

            return reply.status(200).send({ received: true });
        }
    );

    // POST /api/v1/payments/crypto/verify
    app.post<{ Body: { txHash: string; network: 'eth' | 'base' | 'sol'; expectedAmount: string; orderId: string } }>(
        '/crypto/verify',
        { onRequest: [auth], schema: { tags: ['payments'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            const { txHash, network, expectedAmount, orderId } = req.body;
            // Production: use ethers.js / web3.js to verify on-chain
            // Mock response:
            return {
                success: true,
                data: {
                    txHash,
                    network,
                    orderId,
                    verified: true,
                    amount: expectedAmount,
                    confirmations: 12,
                    status: 'confirmed',
                    note: 'Mock verification — wire to RPC in production',
                },
            };
        }
    );

    // POST /api/v1/payments/x402/facilitate
    app.post<{ Body: { resource: string; paymentHeader: string; amount: string; network: string } }>(
        '/x402/facilitate',
        { schema: { tags: ['payments'] } },
        async (req) => {
            const { resource, amount, network } = req.body;
            // Production: use @synergetics/x402 package X402Facilitator
            return {
                success: true,
                data: {
                    resource,
                    amount,
                    network,
                    facilitated: true,
                    settlementTx: `0xmock${Date.now().toString(16)}`,
                    accessGranted: true,
                    note: 'Mock x402 facilitation — wire to X402Facilitator in production',
                },
            };
        }
    );

    // GET /api/v1/payments/methods
    app.get('/methods', { schema: { tags: ['payments'] } }, async () => ({
        success: true,
        data: [
            { id: 'stripe', name: 'Credit / Debit Card', provider: 'Stripe', enabled: true, fee: '2.9% + 30¢' },
            { id: 'eth', name: 'Ethereum (ETH)', provider: 'Web3', enabled: true, fee: '0.5%' },
            { id: 'sol', name: 'Solana (SOL)', provider: 'Web3', enabled: true, fee: '0.3%' },
            { id: 'usdc', name: 'USD Coin (USDC)', provider: 'Web3', enabled: true, fee: '0.2%' },
            { id: 'x402', name: 'x402 Protocol', provider: 'x402', enabled: true, fee: '1%' },
        ],
    }));
};
