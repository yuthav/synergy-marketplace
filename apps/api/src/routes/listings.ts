import type { FastifyPluginAsync } from 'fastify';

const CATEGORIES = [
    { id: 'c1', name: 'AI Agents', slug: 'ai-agents', type: 'ai_agents', listingCount: 3200 },
    { id: 'c2', name: 'Digital Assets', slug: 'digital-assets', type: 'digital_assets', listingCount: 2150 },
    { id: 'c3', name: 'Templates', slug: 'templates', type: 'templates', listingCount: 1800 },
    { id: 'c4', name: 'Datasets', slug: 'datasets', type: 'datasets', listingCount: 950 },
    { id: 'c5', name: 'APIs', slug: 'apis', type: 'apis', listingCount: 1100 },
    { id: 'c6', name: 'SaaS Tools', slug: 'saas-tools', type: 'saas_tools', listingCount: 680 },
];

const LISTINGS = [
    { id: 'l1', slug: 'autocode-agent-pro', title: 'AutoCodeAgent Pro', sellerId: 'u2', sellerName: 'NeuralForge Labs', categoryId: 'c1', category: 'AI Agents', price: 49, pricingType: 'subscription', period: 'monthly', rating: 4.9, reviewCount: 312, purchaseCount: 2100, tags: ['GPT-4', 'Code Gen', 'API'], description: 'The most powerful code generation AI agent. Automates PR reviews, writes tests, and refactors legacy codebases at scale.', status: 'published', featured: true, createdAt: '2025-11-01' },
    { id: 'l2', slug: 'datavault-enterprise', title: 'DataVault Enterprise', sellerId: 'u2', sellerName: 'CloudScale AI', categoryId: 'c4', category: 'Datasets', price: 199, pricingType: 'one_time', period: null, rating: 4.8, reviewCount: 156, purchaseCount: 890, tags: ['128GB', 'Labeled', 'NLP'], description: 'The largest labeled enterprise NLP dataset available on the market. Pre-cleaned and formatted for LLM fine-tuning.', status: 'published', featured: false, createdAt: '2025-10-15' },
    { id: 'l3', slug: 'promptcraft-studio', title: 'PromptCraft Studio', sellerId: 'u2', sellerName: 'PromptWizards', categoryId: 'c3', category: 'Templates', price: 29, pricingType: 'one_time', period: null, rating: 4.7, reviewCount: 489, purchaseCount: 4800, tags: ['1200 Prompts', 'GPT-4', 'Claude'], description: 'A curated library of 1,200+ tested prompts for GPT-4, Claude, and Mistral across 40+ use cases.', status: 'published', featured: true, createdAt: '2025-09-01' },
    { id: 'l4', slug: 'api-gateway-ultra', title: 'API Gateway Ultra', sellerId: 'u2', sellerName: 'ByteStream Inc.', categoryId: 'c5', category: 'APIs', price: 99, pricingType: 'subscription', period: 'monthly', rating: 4.9, reviewCount: 203, purchaseCount: 1300, tags: ['REST', '99.99%', '10ms'], description: 'Enterprise-grade API gateway with automatic rate limiting, caching, and analytics. Sub-10ms response times guaranteed.', status: 'published', featured: false, createdAt: '2025-10-01' },
    { id: 'l5', slug: 'visionml-toolkit', title: 'VisionML Toolkit', sellerId: 'u2', sellerName: 'PixelMinds', categoryId: 'c6', category: 'SaaS Tools', price: 79, pricingType: 'subscription', period: 'monthly', rating: 4.8, reviewCount: 97, purchaseCount: 640, tags: ['CV', 'PyTorch', 'ONNX'], description: 'Computer vision toolkit with ONNX support, PyTorch models, and pre-built pipelines for object detection, segmentation, and classification.', status: 'published', featured: false, createdAt: '2025-11-10' },
    { id: 'l6', slug: 'sentiment-ai-api', title: 'SentimentAI API', sellerId: 'u2', sellerName: 'LinguaForge', categoryId: 'c5', category: 'APIs', price: 19, pricingType: 'subscription', period: 'monthly', rating: 4.6, reviewCount: 831, purchaseCount: 7200, tags: ['NLP', '50 langs', 'Real-time'], description: 'Real-time sentiment analysis API supporting 50 languages. Used by 7k+ developers in production today.', status: 'published', featured: false, createdAt: '2025-08-15' },
];

export const listingsRoutes: FastifyPluginAsync = async (app) => {
    // GET /api/v1/categories
    app.get('/categories', { schema: { tags: ['listings'] } }, async () => ({
        success: true,
        data: CATEGORIES,
    }));

    // GET /api/v1/categories/:slug
    app.get<{ Params: { slug: string } }>('/categories/:slug', { schema: { tags: ['listings'] } }, async (req, reply) => {
        const cat = CATEGORIES.find(c => c.slug === req.params.slug);
        if (!cat) return reply.status(404).send({ success: false, error: 'Category not found' });
        const listings = LISTINGS.filter(l => l.categoryId === cat.id && l.status === 'published');
        return { success: true, data: { category: cat, listings, total: listings.length } };
    });

    // GET /api/v1/listings
    app.get<{
        Querystring: {
            q?: string; category?: string; minPrice?: string; maxPrice?: string;
            sort?: string; page?: string; limit?: string; featured?: string;
        }
    }>(
        '/listings',
        { schema: { tags: ['listings'] } },
        async (req) => {
            const { q, category, minPrice, maxPrice, sort = 'relevance', page = '1', limit = '12', featured } = req.query;
            let items = [...LISTINGS].filter(l => l.status === 'published');

            if (q) items = items.filter(l => l.title.toLowerCase().includes(q.toLowerCase()) || l.description.toLowerCase().includes(q.toLowerCase()));
            if (category) items = items.filter(l => l.category.toLowerCase().replace(/\s+/g, '-') === category);
            if (minPrice) items = items.filter(l => l.price >= Number(minPrice));
            if (maxPrice) items = items.filter(l => l.price <= Number(maxPrice));
            if (featured === 'true') items = items.filter(l => l.featured);

            if (sort === 'price_asc') items.sort((a, b) => a.price - b.price);
            else if (sort === 'price_desc') items.sort((a, b) => b.price - a.price);
            else if (sort === 'rating') items.sort((a, b) => b.rating - a.rating);
            else if (sort === 'newest') items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
            else if (sort === 'bestselling') items.sort((a, b) => b.purchaseCount - a.purchaseCount);

            const pageNum = Math.max(1, Number(page));
            const limitNum = Math.min(48, Number(limit));
            const start = (pageNum - 1) * limitNum;
            const paged = items.slice(start, start + limitNum);

            return {
                success: true,
                data: {
                    items: paged,
                    total: items.length,
                    page: pageNum,
                    limit: limitNum,
                    hasMore: start + limitNum < items.length,
                    nextPage: start + limitNum < items.length ? pageNum + 1 : null,
                },
            };
        }
    );

    // GET /api/v1/listings/:slug
    app.get<{ Params: { slug: string } }>('/listings/:slug', { schema: { tags: ['listings'] } }, async (req, reply) => {
        const listing = LISTINGS.find(l => l.slug === req.params.slug);
        if (!listing) return reply.status(404).send({ success: false, error: 'Listing not found' });
        const related = LISTINGS.filter(l => l.categoryId === listing.categoryId && l.id !== listing.id).slice(0, 3);
        return { success: true, data: { listing, related } };
    });

    // POST /api/v1/listings — create (seller only)
    app.post<{ Body: { title: string; description: string; categoryId: string; price: number; pricingType: string; tags: string[] } }>(
        '/listings',
        { onRequest: [(app as any).authenticate], schema: { tags: ['listings'], security: [{ BearerAuth: [] }] } },
        async (req) => {
            const user = (req as any).user as { sub: string; role: string };
            const newListing = {
                id: `l${Date.now()}`,
                slug: req.body.title.toLowerCase().replace(/\s+/g, '-'),
                ...req.body,
                sellerId: user.sub,
                sellerName: 'Your Store',
                category: CATEGORIES.find(c => c.id === req.body.categoryId)?.name ?? 'Unknown',
                rating: 0, reviewCount: 0, purchaseCount: 0,
                period: null, featured: false, status: 'draft',
                createdAt: new Date().toISOString().split('T')[0],
            };
            return { success: true, data: newListing, message: 'Listing created as draft' };
        }
    );

    // PATCH /api/v1/listings/:id
    app.patch<{ Params: { id: string }; Body: Record<string, unknown> }>(
        '/listings/:id',
        { onRequest: [(app as any).authenticate], schema: { tags: ['listings'], security: [{ BearerAuth: [] }] } },
        async (req, reply) => {
            const listing = LISTINGS.find(l => l.id === req.params.id);
            if (!listing) return reply.status(404).send({ success: false, error: 'Listing not found' });
            const updated = { ...listing, ...req.body, updatedAt: new Date().toISOString() };
            return { success: true, data: updated };
        }
    );

    // POST /api/v1/listings/:id/publish
    app.post<{ Params: { id: string } }>(
        '/listings/:id/publish',
        { onRequest: [(app as any).authenticate], schema: { tags: ['listings'], security: [{ BearerAuth: [] }] } },
        async (req, reply) => {
            const listing = LISTINGS.find(l => l.id === req.params.id);
            if (!listing) return reply.status(404).send({ success: false, error: 'Listing not found' });
            return { success: true, data: { ...listing, status: 'published' }, message: 'Listing published' };
        }
    );

    // DELETE /api/v1/listings/:id
    app.delete<{ Params: { id: string } }>(
        '/listings/:id',
        { onRequest: [(app as any).authenticate], schema: { tags: ['listings'], security: [{ BearerAuth: [] }] } },
        async (req, reply) => {
            const listing = LISTINGS.find(l => l.id === req.params.id);
            if (!listing) return reply.status(404).send({ success: false, error: 'Listing not found' });
            return { success: true, message: 'Listing deleted' };
        }
    );
};
