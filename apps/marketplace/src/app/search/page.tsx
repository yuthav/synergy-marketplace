'use client';
import { useState } from 'react';

const CATEGORIES = ['All', 'AI Agents', 'Digital Assets', 'Templates', 'Datasets', 'APIs', 'SaaS Tools'];
const PRICE_RANGES = [{ label: 'Any', min: 0, max: 9999 }, { label: 'Under $25', min: 0, max: 25 }, { label: '$25–$100', min: 25, max: 100 }, { label: '$100–$500', min: 100, max: 500 }, { label: '$500+', min: 500, max: 9999 }];
const SORT_OPTIONS = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'bestselling', label: 'Best Selling' },
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
];

const LISTINGS = [
    { id: 'l1', slug: 'autocode-agent-pro', title: 'AutoCodeAgent Pro', seller: 'NeuralForge Labs', price: 49, period: '/mo', rating: 4.9, reviews: 312, category: 'AI Agents', tags: ['GPT-4', 'Code Gen'], featured: true, sales: '2.1k', color: '#3b82f6' },
    { id: 'l2', slug: 'datavault-enterprise', title: 'DataVault Enterprise', seller: 'CloudScale AI', price: 199, period: '', rating: 4.8, reviews: 156, category: 'Datasets', tags: ['NLP', 'Labeled'], featured: false, sales: '890', color: '#14b8a6' },
    { id: 'l3', slug: 'promptcraft-studio', title: 'PromptCraft Studio', seller: 'PromptWizards', price: 29, period: '', rating: 4.7, reviews: 489, category: 'Templates', tags: ['GPT-4', 'Claude'], featured: true, sales: '4.8k', color: '#8b5cf6' },
    { id: 'l4', slug: 'api-gateway-ultra', title: 'API Gateway Ultra', seller: 'ByteStream Inc.', price: 99, period: '/mo', rating: 4.9, reviews: 203, category: 'APIs', tags: ['REST', '10ms'], featured: false, sales: '1.3k', color: '#f59e0b' },
    { id: 'l5', slug: 'visionml-toolkit', title: 'VisionML Toolkit', seller: 'PixelMinds', price: 79, period: '/mo', rating: 4.8, reviews: 97, category: 'SaaS Tools', tags: ['CV', 'PyTorch'], featured: false, sales: '640', color: '#10b981' },
    { id: 'l6', slug: 'sentiment-ai-api', title: 'SentimentAI API', seller: 'LinguaForge', price: 19, period: '/mo', rating: 4.6, reviews: 831, category: 'APIs', tags: ['NLP', '50 langs'], featured: false, sales: '7.2k', color: '#ec4899' },
    { id: 'l7', slug: 'docgen-ai', title: 'DocGenAI Pro', seller: 'InkMinds', price: 39, period: '/mo', rating: 4.5, reviews: 211, category: 'AI Agents', tags: ['Docs', 'PDF', 'Word'], featured: false, sales: '980', color: '#6366f1' },
    { id: 'l8', slug: 'smart-scraper', title: 'SmartScraper API', seller: 'DataFlow Labs', price: 59, period: '/mo', rating: 4.7, reviews: 143, category: 'APIs', tags: ['Scraping', 'JS', 'Anti-bot'], featured: false, sales: '560', color: '#f97316' },
];

function Stars({ r }: { r: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={i <= Math.round(r) ? '#f59e0b' : 'rgba(255,255,255,0.12)'}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                </svg>
            ))}
        </div>
    );
}

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [priceRange, setPriceRange] = useState(0);
    const [sort, setSort] = useState('relevance');
    const [view, setView] = useState<'grid' | 'list'>('grid');

    const filtered = LISTINGS.filter(l => {
        const catOk = category === 'All' || l.category === category;
        const priceOk = l.price >= PRICE_RANGES[priceRange].min && l.price <= PRICE_RANGES[priceRange].max;
        const qOk = !query || l.title.toLowerCase().includes(query.toLowerCase()) || l.seller.toLowerCase().includes(query.toLowerCase()) || l.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
        return catOk && priceOk && qOk;
    }).sort((a, b) => {
        if (sort === 'rating') return b.rating - a.rating;
        if (sort === 'price_asc') return a.price - b.price;
        if (sort === 'price_desc') return b.price - a.price;
        return 0;
    });

    const activeFilters = [
        ...(category !== 'All' ? [category] : []),
        ...(priceRange !== 0 ? [PRICE_RANGES[priceRange].label] : []),
    ];

    return (
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10">
            {/* Search Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-4">
                    {query ? <>Results for &ldquo;<span className="g-text-brand">{query}</span>&rdquo;</> : 'Browse All Listings'}
                </h1>

                {/* Search Bar */}
                <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <input
                        type="search"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search AI agents, datasets, APIs, templates..."
                        className="input pl-11 h-12 text-base"
                        id="search-input"
                    />
                </div>

                {/* Active Filters */}
                {activeFilters.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        <span className="text-xs text-[#6b7280] mt-1">Active filters:</span>
                        {activeFilters.map(f => (
                            <span key={f} className="badge border border-[#3b82f6]/30 bg-[#3b82f6]/10 text-[#60a5fa]">
                                {f}
                                <button onClick={() => { if (f === category) setCategory('All'); else setPriceRange(0); }} className="ml-1 opacity-60 hover:opacity-100">✕</button>
                            </span>
                        ))}
                        <button onClick={() => { setCategory('All'); setPriceRange(0); setQuery(''); }} className="text-xs text-[#6b7280] hover:text-white underline">
                            Clear all
                        </button>
                    </div>
                )}
            </div>

            <div className="flex gap-8">
                {/* ─── Sidebar Filters ─── */}
                <aside className="hidden lg:block w-56 shrink-0 space-y-7">
                    {/* Category */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#4b5563] mb-3">Category</h3>
                        <ul className="space-y-1">
                            {CATEGORIES.map(c => (
                                <li key={c}>
                                    <button
                                        onClick={() => setCategory(c)}
                                        className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${category === c ? 'bg-[#3b82f6]/10 text-[#60a5fa] font-medium' : 'text-[#6b7280] hover:text-white hover:bg-white/[0.03]'}`}
                                    >
                                        {c}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Price Range */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#4b5563] mb-3">Price</h3>
                        <ul className="space-y-1">
                            {PRICE_RANGES.map((p, i) => (
                                <li key={p.label}>
                                    <button
                                        onClick={() => setPriceRange(i)}
                                        className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${priceRange === i ? 'bg-[#3b82f6]/10 text-[#60a5fa] font-medium' : 'text-[#6b7280] hover:text-white hover:bg-white/[0.03]'}`}
                                    >
                                        {p.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Rating */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#4b5563] mb-3">Min Rating</h3>
                        {[4.5, 4.0, 3.5].map(r => (
                            <button key={r} className="flex items-center gap-2 w-full px-3 py-1.5 rounded-lg text-sm text-[#6b7280] hover:text-white hover:bg-white/[0.03] transition-colors">
                                <Stars r={r} />
                                <span>{r}+</span>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* ─── Results ─── */}
                <div className="flex-1 min-w-0">
                    {/* Controls */}
                    <div className="flex items-center justify-between mb-5">
                        <p className="text-sm text-[#6b7280]">
                            <span className="font-semibold text-white">{filtered.length}</span> results
                        </p>
                        <div className="flex items-center gap-3">
                            <select value={sort} onChange={e => setSort(e.target.value)} className="h-8 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2 text-xs text-[#9ca3af] outline-none cursor-pointer">
                                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                            <div className="flex gap-1">
                                {(['grid', 'list'] as const).map(v => (
                                    <button key={v} onClick={() => setView(v)} className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${view === v ? 'bg-[#3b82f6]/15 text-[#3b82f6]' : 'text-[#6b7280] hover:text-white hover:bg-white/[0.04]'}`}>
                                        {v === 'grid' ? (
                                            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="7" height="7" rx="1" /><rect x="9" y="0" width="7" height="7" rx="1" /><rect x="0" y="9" width="7" height="7" rx="1" /><rect x="9" y="9" width="7" height="7" rx="1" /></svg>
                                        ) : (
                                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="0" y1="4" x2="16" y2="4" /><line x1="0" y1="9" x2="16" y2="9" /><line x1="0" y1="14" x2="16" y2="14" /></svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Grid */}
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="text-5xl mb-4">🔍</div>
                            <h3 className="text-lg font-semibold text-white">No results found</h3>
                            <p className="text-sm text-[#6b7280] mt-2">Try different keywords or remove some filters.</p>
                        </div>
                    ) : (
                        <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5' : 'flex flex-col gap-4'}>
                            {filtered.map(l => view === 'grid' ? (
                                <a key={l.id} href={`/listing/${l.slug}`} className="listing-card group">
                                    {/* Thumb */}
                                    <div className="h-40 flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${l.color}22, ${l.color}08)` }}>
                                        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 70% 30%, ${l.color}25 0%, transparent 60%)` }} />
                                        <span className="text-4xl">{l.category === 'AI Agents' ? '🤖' : l.category === 'Datasets' ? '📊' : l.category === 'Templates' ? '📋' : l.category === 'APIs' ? '⚡' : l.category === 'SaaS Tools' ? '🛠️' : '🎨'}</span>
                                        {l.featured && <span className="absolute top-3 left-3 badge bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/20">⭐ Featured</span>}
                                        <span className="absolute top-3 right-3 badge border" style={{ background: `${l.color}15`, color: l.color, borderColor: `${l.color}30` }}>{l.category}</span>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-semibold text-white group-hover:text-[#60a5fa] transition-colors">{l.title}</h3>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {l.tags.map(t => <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-white/[0.04] border border-white/[0.06] text-[#6b7280]">{t}</span>)}
                                        </div>
                                        <div className="flex items-center gap-2 mt-3">
                                            <span className="text-[10px] text-[#4b5563]">{l.seller}</span>
                                            <span className="ml-auto text-[10px] text-[#4b5563]">{l.sales} sold</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
                                            <div><span className="text-lg font-bold" style={{ color: l.color }}>${l.price}</span><span className="text-xs text-[#6b7280]">{l.period}</span></div>
                                            <div className="flex items-center gap-1"><Stars r={l.rating} /><span className="text-xs text-[#9ca3af]">{l.rating}</span></div>
                                        </div>
                                    </div>
                                </a>
                            ) : (
                                <a key={l.id} href={`/listing/${l.slug}`} className="glass-card p-5 flex items-center gap-5 group">
                                    <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: `linear-gradient(135deg, ${l.color}22, ${l.color}08)` }}>
                                        {l.category === 'AI Agents' ? '🤖' : l.category === 'Datasets' ? '📊' : '⚡'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-white group-hover:text-[#60a5fa] transition-colors">{l.title}</h3>
                                        <p className="text-xs text-[#6b7280] mt-0.5">{l.seller} · {l.category} · {l.sales} sold</p>
                                        <div className="flex items-center gap-1 mt-1"><Stars r={l.rating} /><span className="text-[10px] text-[#9ca3af]">{l.rating} ({l.reviews})</span></div>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <p className="text-lg font-bold" style={{ color: l.color }}>${l.price}<span className="text-xs text-[#6b7280] font-normal">{l.period}</span></p>
                                        <button className="mt-2 btn-primary h-8 px-3 text-xs">Add to Cart</button>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
