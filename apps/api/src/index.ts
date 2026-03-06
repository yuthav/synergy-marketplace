import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import jwt from '@fastify/jwt';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

import { authRoutes } from './routes/auth.js';
import { listingsRoutes } from './routes/listings.js';
import { cartRoutes } from './routes/cart.js';
import { ordersRoutes } from './routes/orders.js';
import { usersRoutes } from './routes/users.js';
import { sellerRoutes } from './routes/seller.js';
import { platformRoutes } from './routes/platform.js';
import { paymentsRoutes } from './routes/payments.js';

const app = Fastify({
    logger: {
        level: process.env.LOG_LEVEL ?? 'info',
        transport: process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty', options: { colorize: true } }
            : undefined,
    },
});

// ─── Security ─────────────────────────────────────────────────────────────
await app.register(helmet, { contentSecurityPolicy: false });

await app.register(rateLimit, {
    global: true,
    max: 200,
    timeWindow: '1 minute',
    keyGenerator: (req) => req.headers['x-forwarded-for'] as string ?? req.ip,
});

await app.register(cors, {
    origin: [
        process.env.MARKETPLACE_URL ?? 'http://localhost:3000',
        process.env.SELLER_URL ?? 'http://localhost:3001',
        process.env.PLATFORM_URL ?? 'http://localhost:3002',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
});

// ─── JWT (separate secrets per portal) ────────────────────────────────────
await app.register(jwt, {
    secret: {
        private: process.env.JWT_PRIVATE_KEY ?? 'synergetics-dev-secret-32chars!!',
        public: process.env.JWT_PUBLIC_KEY ?? 'synergetics-dev-secret-32chars!!',
    },
    sign: { algorithm: 'HS256', expiresIn: '1h' },
});

// Decorate request with helpers
app.decorate('authenticate', async function (request: any, reply: any) {
    try {
        await request.jwtVerify();
    } catch {
        reply.status(401).send({ success: false, error: 'Unauthorized' });
    }
});

app.decorate('requireRole', (roles: string[]) => async function (request: any, reply: any) {
    try {
        await request.jwtVerify();
        const payload = request.user as any;
        if (!roles.includes(payload.role)) {
            reply.status(403).send({ success: false, error: 'Forbidden' });
        }
    } catch {
        reply.status(401).send({ success: false, error: 'Unauthorized' });
    }
});

// ─── Swagger Docs ─────────────────────────────────────────────────────────
await app.register(swagger, {
    openapi: {
        info: { title: 'Synergetics.ai API', version: '1.0.0', description: 'Multi-portal marketplace API' },
        servers: [{ url: `http://localhost:${process.env.API_PORT ?? 4000}` }],
        tags: [
            { name: 'auth', description: 'Authentication' },
            { name: 'listings', description: 'Marketplace listings' },
            { name: 'cart', description: 'Shopping cart' },
            { name: 'orders', description: 'Orders' },
            { name: 'users', description: 'User profile' },
            { name: 'seller', description: 'Seller operations' },
            { name: 'platform', description: 'Platform management' },
            { name: 'payments', description: 'Payments' },
        ],
        components: {
            securitySchemes: {
                BearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
            },
        },
    },
});

await app.register(swaggerUi, {
    routePrefix: '/api/v1/docs',
    uiConfig: { docExpansion: 'list', deepLinking: false },
});

// ─── Health & Root ─────────────────────────────────────────────────────────
app.get('/api/v1/health', { schema: { tags: ['system'] } }, async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: Math.round(process.uptime()),
    env: process.env.NODE_ENV ?? 'development',
}));

app.get('/', async () => ({
    name: 'Synergetics.ai API',
    version: '1.0.0',
    docs: '/api/v1/docs',
    health: '/api/v1/health',
}));

// ─── Route Registration ────────────────────────────────────────────────────
await app.register(authRoutes, { prefix: '/api/v1/auth' });
await app.register(listingsRoutes, { prefix: '/api/v1' });
await app.register(cartRoutes, { prefix: '/api/v1' });
await app.register(ordersRoutes, { prefix: '/api/v1' });
await app.register(usersRoutes, { prefix: '/api/v1' });
await app.register(sellerRoutes, { prefix: '/api/v1/seller' });
await app.register(platformRoutes, { prefix: '/api/v1/platform' });
await app.register(paymentsRoutes, { prefix: '/api/v1/payments' });

// ─── Error Handler ─────────────────────────────────────────────────────────
app.setErrorHandler((error, _req, reply) => {
    const status = error.statusCode ?? 500;
    reply.status(status).send({
        success: false,
        error: error.message ?? 'Internal Server Error',
        ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
    });
});

app.setNotFoundHandler((_req, reply) => {
    reply.status(404).send({ success: false, error: 'Route not found' });
});

// ─── Start ─────────────────────────────────────────────────────────────────
const PORT = Number(process.env.API_PORT ?? 4000);
const HOST = process.env.API_HOST ?? '0.0.0.0';

try {
    await app.listen({ port: PORT, host: HOST });
    console.log(`🚀 Synergetics API at http://localhost:${PORT}`);
    console.log(`📚 API Docs at http://localhost:${PORT}/api/v1/docs`);
} catch (err) {
    app.log.error(err);
    process.exit(1);
}
