'use client';
import { useState } from 'react';

const LISTING = {
    slug: 'autocode-agent-pro', title: 'AutoCodeAgent Pro', seller: 'NeuralForge Labs', sellerAvatar: 'NF',
    sellerSince: '2024', sellerListings: 8, sellerRating: 4.9,
    price: 49, period: '/month', pricingType: 'subscription',
    altPlans: [{ label: 'Yearly', price: 399, saving: '$189/yr', period: '/year' }],
    rating: 4.9, reviewCount: 312, purchaseCount: 2100, category: 'AI Agents',
    tags: ['GPT-4', 'Code Generation', 'PR Reviews', 'Testing', 'Refactoring', 'API', 'CLI'],
    color: '#3b82f6',
    description: `AutoCodeAgent Pro is the most advanced AI-powered code generation agent available today. It integrates directly into your CI/CD pipeline, automatically:

- ✅ Reviews and approves pull requests based on your codebase conventions
- ✅ Writes comprehensive unit and integration tests
- ✅ Refactors legacy code to modern standards
- ✅ Generates documentation from source code
- ✅ Suggests performance optimizations with benchmarks

Supports: TypeScript, Python, Go, Rust, Java, C#, Ruby, PHP.`,
    changelog: ['v2.4 — Added Rust and Go support', 'v2.3 — 40% faster test generation', 'v2.0 — Multi-repo support'],
    screenshots: ['Dashboard overview', 'PR review in action', 'Test generation report'],
};

const REVIEWS = [
    { author: 'Arjun S.', rating: 5, date: '2026-02-28', text: 'Reviewed 200+ PRs automatically in 2 weeks. Saved our team 30 hours per sprint.' },
    { author: 'Sarah M.', rating: 5, date: '2026-02-20', text: 'The test generation alone is worth the price. Coverage went from 42% to 89% in a month.' },
    { author: 'James O.', rating: 5, date: '2026-02-15', text: 'Best AI dev tool I\'ve purchased. Integration was seamless with our GitHub Actions.' },
    { author: 'Priya R.', rating: 4, date: '2026-01-30', text: 'Excellent tool. Wish it had GitLab support, but GitHub integration is flawless.' },
];

const RELATED = [
    { slug: 'promptcraft-studio', title: 'PromptCraft Studio', price: 29, category: 'Templates', color: '#8b5cf6' },
    { slug: 'api-gateway-ultra', title: 'API Gateway Ultra', price: 99, category: 'APIs', color: '#f59e0b' },
    { slug: 'docgen-ai', title: 'DocGenAI Pro', price: 39, category: 'AI Agents', color: '#6366f1' },
];

const PAYMENT_METHODS = [
    { id: 'stripe', label: 'Card', icon: '💳' },
    { id: 'eth', label: 'ETH', icon: '⟠' },
    { id: 'sol', label: 'SOL', icon: '◎' },
    { id: 'usdc', label: 'USDC', icon: '💵' },
    { id: 'x402', label: 'x402', icon: '⚡' },
];

function Stars({ r }: { r: number }) {
    return <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map(i => <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i <= Math.round(r) ? '#f59e0b' : 'rgba(255,255,255,0.12)'}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" /></svg>)}</div>;
}

export default function ListingDetailPage({ params }: { params: { slug: string } }) {
    const [tab, setTab] = useState<'overview' | 'docs' | 'reviews' | 'changelog'>('overview');
    const [payment, setPayment] = useState('stripe');
    const [wishlisted, setWishlisted] = useState(false);
    const _ = params.slug; // use slug for real data fetching

    return (
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-[#4b5563] mb-8">
                <a href="/" className="hover:text-white">Home</a><span>/</span>
                <a href="/search" className="hover:text-white">Marketplace</a><span>/</span>
                <a href="/categories/ai-agents" className="hover:text-white">{LISTING.category}</a><span>/</span>
                <span className="text-white">{LISTING.title}</span>
            </nav>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* ─── Left — Main Content ─── */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Hero Card */}
                    <div className="glass-card overflow-hidden">
                        <div className="h-56 flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${LISTING.color}25, ${LISTING.color}08)` }}>
                            <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 30% 50%, ${LISTING.color}30 0%, transparent 70%)` }} />
                            <span className="text-8xl">🤖</span>
                            <span className="absolute top-4 left-4 badge bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/20">⭐ Featured</span>
                            <span className="absolute top-4 right-4 badge border" style={{ background: `${LISTING.color}15`, color: LISTING.color, borderColor: `${LISTING.color}30` }}>{LISTING.category}</span>
                        </div>
                        <div className="p-6">
                            <h1 className="text-2xl font-bold text-white">{LISTING.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 mt-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-[9px] font-bold text-white">{LISTING.sellerAvatar}</div>
                                    <a href="#seller" className="text-sm text-[#60a5fa] hover:underline">{LISTING.seller}</a>
                                </div>
                                <div className="flex items-center gap-1.5"><Stars r={LISTING.rating} /><span className="text-sm font-semibold text-white">{LISTING.rating}</span><span className="text-xs text-[#6b7280]">({LISTING.reviewCount} reviews)</span></div>
                                <span className="text-xs text-[#4b5563]">{LISTING.purchaseCount.toLocaleString()} purchases</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-4">
                                {LISTING.tags.map(t => <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-white/[0.04] border border-white/[0.06] text-[#6b7280]">{t}</span>)}
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div>
                        <div className="flex gap-1 border-b border-white/[0.06]">
                            {(['overview', 'docs', 'reviews', 'changelog'] as const).map(t => (
                                <button key={t} onClick={() => setTab(t)} className={`capitalize px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === t ? 'border-[#3b82f6] text-white' : 'border-transparent text-[#6b7280] hover:text-white'}`}>
                                    {t === 'reviews' ? `Reviews (${LISTING.reviewCount})` : t}
                                </button>
                            ))}
                        </div>

                        <div className="mt-6">
                            {tab === 'overview' && (
                                <div className="prose text-[#9ca3af] text-sm leading-relaxed whitespace-pre-line">{LISTING.description}</div>
                            )}
                            {tab === 'docs' && (
                                <div className="glass-card p-6 space-y-4">
                                    <h3 className="font-semibold text-white">Quick Start</h3>
                                    <div className="rounded-lg bg-[#0a0a1a] border border-white/[0.06] p-4 font-mono text-xs text-[#10b981]">
                                        <p># Install via npm</p>
                                        <p>npm install @neuralforge/autocode-agent</p>
                                        <p className="mt-2"># Set your API key</p>
                                        <p>export AUTOCODE_API_KEY=&quot;your_key_here&quot;</p>
                                        <p className="mt-2"># Run a PR review</p>
                                        <p>autocode review --pr 123 --repo owner/repo</p>
                                    </div>
                                    <p className="text-xs text-[#6b7280]">Full documentation and API reference available after purchase.</p>
                                </div>
                            )}
                            {tab === 'reviews' && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 glass-card p-4">
                                        <div className="text-center"><p className="text-5xl font-black text-white">{LISTING.rating}</p><Stars r={LISTING.rating} /><p className="text-xs text-[#6b7280] mt-1">{LISTING.reviewCount} reviews</p></div>
                                        <div className="flex-1 space-y-1.5">
                                            {[5, 4, 3, 2, 1].map(s => <div key={s} className="flex items-center gap-2 text-xs"><span className="w-3 text-[#6b7280]">{s}</span><div className="flex-1 h-1.5 rounded-full bg-white/[0.06]"><div className="h-full rounded-full bg-[#f59e0b]" style={{ width: `${s === 5 ? 75 : s === 4 ? 18 : s === 3 ? 5 : 1}%` }} /></div></div>)}
                                        </div>
                                    </div>
                                    {REVIEWS.map(r => (
                                        <div key={r.author} className="glass-card p-5">
                                            <div className="flex items-center gap-3 mb-3"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-[10px] font-bold text-white">{r.author[0]}</div><div><p className="text-sm font-semibold text-white">{r.author}</p><p className="text-[10px] text-[#4b5563]">{r.date}</p></div><div className="ml-auto"><Stars r={r.rating} /></div></div>
                                            <p className="text-sm text-[#9ca3af]">{r.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {tab === 'changelog' && (
                                <ul className="space-y-3">
                                    {LISTING.changelog.map(c => <li key={c} className="flex items-start gap-3 glass-card p-4"><span className="text-[#10b981] mt-0.5">✓</span><span className="text-sm text-[#9ca3af]">{c}</span></li>)}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Seller Card */}
                    <div id="seller" className="glass-card p-6">
                        <h3 className="font-semibold text-white mb-4">About the Seller</h3>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-lg font-bold text-white">{LISTING.sellerAvatar}</div>
                            <div>
                                <p className="font-semibold text-white">{LISTING.seller}</p>
                                <p className="text-xs text-[#6b7280]">Member since {LISTING.sellerSince} · {LISTING.sellerListings} listings</p>
                                <div className="flex items-center gap-1 mt-1"><Stars r={LISTING.sellerRating} /><span className="text-xs text-[#9ca3af]">{LISTING.sellerRating} seller rating</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Right — Purchase Panel ─── */}
                <div className="space-y-4">
                    <div className="glass-card p-6 sticky top-20 space-y-5">
                        <div>
                            <span className="text-3xl font-black text-white">${LISTING.price}</span>
                            <span className="text-sm text-[#6b7280]">{LISTING.period}</span>
                            <p className="text-xs text-[#10b981] mt-1">✓ {LISTING.altPlans[0].saving} with yearly plan</p>
                        </div>

                        {/* Payment Method */}
                        <div>
                            <p className="text-xs font-medium text-[#9ca3af] mb-2">Pay with</p>
                            <div className="grid grid-cols-5 gap-1.5">
                                {PAYMENT_METHODS.map(m => (
                                    <button key={m.id} onClick={() => setPayment(m.id)} className={`flex flex-col items-center gap-0.5 p-2 rounded-lg border text-xs font-medium transition-all ${payment === m.id ? 'border-[#3b82f6] bg-[#3b82f6]/10 text-[#60a5fa]' : 'border-white/[0.07] text-[#6b7280] hover:border-white/[0.15] hover:text-white'}`}>
                                        <span className="text-base">{m.icon}</span>
                                        <span>{m.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <a href="/checkout" className="btn-primary w-full h-11 text-sm">Buy Now — ${LISTING.price}</a>
                            <button className="btn-secondary w-full h-11 text-sm">Add to Cart</button>
                            <button onClick={() => setWishlisted(!wishlisted)} className={`w-full h-9 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2 ${wishlisted ? 'border-[#ec4899]/30 text-[#ec4899] bg-[#ec4899]/[0.05]' : 'border-white/[0.07] text-[#6b7280] hover:border-white/[0.14] hover:text-white'}`}>
                                {wishlisted ? '❤️ Wishlisted' : '🤍 Add to Wishlist'}
                            </button>
                        </div>

                        <ul className="space-y-2 text-xs text-[#6b7280] border-t border-white/[0.06] pt-4">
                            <li className="flex gap-2"><span className="text-[#10b981]">✓</span> Instant access after payment</li>
                            <li className="flex gap-2"><span className="text-[#10b981]">✓</span> Cancel anytime</li>
                            <li className="flex gap-2"><span className="text-[#10b981]">✓</span> 14-day money-back guarantee</li>
                            <li className="flex gap-2"><span className="text-[#10b981]">✓</span> Commercial use license</li>
                        </ul>
                    </div>

                    {/* Related */}
                    <div className="glass-card p-5">
                        <h3 className="text-sm font-semibold text-white mb-4">You May Also Like</h3>
                        <ul className="space-y-3">
                            {RELATED.map(r => (
                                <li key={r.slug}>
                                    <a href={`/listing/${r.slug}`} className="flex items-center gap-3 group">
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base" style={{ background: `${r.color}20` }}>
                                            {r.category === 'AI Agents' ? '🤖' : r.category === 'APIs' ? '⚡' : '📋'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-white group-hover:text-[#60a5fa] transition-colors truncate">{r.title}</p>
                                            <p className="text-[10px] text-[#4b5563]">{r.category}</p>
                                        </div>
                                        <p className="text-xs font-bold" style={{ color: r.color }}>${r.price}</p>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
