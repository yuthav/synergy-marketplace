const CATEGORIES = [
    {
        slug: 'ai-agents', name: 'AI Agents', icon: '🤖', count: 3200, color: '#3b82f6', listings: [
            { slug: 'autocode-agent-pro', title: 'AutoCodeAgent Pro', price: 49, period: '/mo', rating: 4.9, reviews: 312, tags: ['GPT-4', 'Code Gen'] },
            { slug: 'docgen-ai', title: 'DocGenAI Pro', price: 39, period: '/mo', rating: 4.5, reviews: 211, tags: ['Docs', 'PDF'] },
        ]
    },
    { slug: 'digital-assets', name: 'Digital Assets', icon: '🎨', count: 2150, color: '#8b5cf6', listings: [] },
    {
        slug: 'templates', name: 'Templates', icon: '📋', count: 1800, color: '#14b8a6', listings: [
            { slug: 'promptcraft-studio', title: 'PromptCraft Studio', price: 29, period: '', rating: 4.7, reviews: 489, tags: ['GPT-4', 'Claude'] },
        ]
    },
    {
        slug: 'datasets', name: 'Datasets', icon: '📊', count: 950, color: '#f59e0b', listings: [
            { slug: 'datavault-enterprise', title: 'DataVault Enterprise', price: 199, period: '', rating: 4.8, reviews: 156, tags: ['NLP', '128GB'] },
        ]
    },
    {
        slug: 'apis', name: 'APIs', icon: '⚡', count: 1100, color: '#10b981', listings: [
            { slug: 'api-gateway-ultra', title: 'API Gateway Ultra', price: 99, period: '/mo', rating: 4.9, reviews: 203, tags: ['REST', '10ms'] },
            { slug: 'sentiment-ai-api', title: 'SentimentAI API', price: 19, period: '/mo', rating: 4.6, reviews: 831, tags: ['NLP', '50 langs'] },
        ]
    },
    {
        slug: 'saas-tools', name: 'SaaS Tools', icon: '🛠️', count: 680, color: '#ec4899', listings: [
            { slug: 'visionml-toolkit', title: 'VisionML Toolkit', price: 79, period: '/mo', rating: 4.8, reviews: 97, tags: ['CV', 'PyTorch'] },
        ]
    },
];

function Stars({ r }: { r: number }) {
    return <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map(i => <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={i <= Math.round(r) ? '#f59e0b' : 'rgba(255,255,255,0.12)'}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" /></svg>)}</div>;
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
    const cat = CATEGORIES.find(c => c.slug === params.slug) ?? CATEGORIES[0];

    return (
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10">
            {/* Hero */}
            <div className="glass-card p-10 mb-10 text-center relative overflow-hidden">
                <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 0%, ${cat.color}18 0%, transparent 70%)` }} />
                <div className="relative">
                    <span className="text-7xl">{cat.icon}</span>
                    <h1 className="text-4xl font-black text-white mt-4">{cat.name}</h1>
                    <p className="text-[#6b7280] mt-2">{cat.count.toLocaleString()} listings available</p>
                    <div className="flex justify-center gap-3 mt-6">
                        <a href={`/search?category=${encodeURIComponent(cat.name)}&sort=bestselling`} className="btn-primary h-10 px-5 text-sm">Browse All</a>
                        <a href={`/search?category=${encodeURIComponent(cat.name)}&sort=newest`} className="btn-secondary h-10 px-5 text-sm">Newest Arrivals</a>
                    </div>
                </div>
            </div>

            {/* All categories nav */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
                {CATEGORIES.map(c => (
                    <a key={c.slug} href={`/categories/${c.slug}`} className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${c.slug === cat.slug ? 'border-white/[0.15] bg-white/[0.06] text-white' : 'border-white/[0.06] text-[#6b7280] hover:border-white/[0.12] hover:text-white'}`}>
                        <span>{c.icon}</span>{c.name}
                    </a>
                ))}
            </div>

            {/* Listings */}
            {cat.listings.length > 0 ? (
                <>
                    <h2 className="text-lg font-bold text-white mb-5">Top in {cat.name}</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {cat.listings.map(l => (
                            <a key={l.slug} href={`/listing/${l.slug}`} className="listing-card group">
                                <div className="h-40 flex items-center justify-center text-5xl relative" style={{ background: `linear-gradient(135deg, ${cat.color}20, ${cat.color}08)` }}>
                                    {cat.icon}
                                </div>
                                <div className="p-5">
                                    <h3 className="font-semibold text-white group-hover:text-[#60a5fa] transition-colors">{l.title}</h3>
                                    <div className="flex gap-1 mt-2">{l.tags.map(t => <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-white/[0.04] border border-white/[0.06] text-[#6b7280]">{t}</span>)}</div>
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
                                        <div><span className="text-lg font-bold" style={{ color: cat.color }}>${l.price}</span><span className="text-xs text-[#6b7280]">{l.period}</span></div>
                                        <div className="flex items-center gap-1"><Stars r={l.rating} /><span className="text-xs text-[#9ca3af]">{l.rating} ({l.reviews})</span></div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-20">
                    <span className="text-5xl">{cat.icon}</span>
                    <h2 className="text-xl font-bold text-white mt-4">Coming Soon</h2>
                    <p className="text-[#6b7280] mt-2">Sellers are listing in this category. Check back soon!</p>
                    <a href="/search" className="btn-primary h-10 px-5 text-sm mt-6 inline-flex">Browse All Listings</a>
                </div>
            )}
        </div>
    );
}
