const CATEGORIES = [
    { icon: '🤖', name: 'AI Agents', count: '3,200+', href: '/categories/ai-agents', color1: '#3b82f6', color2: '#6366f1' },
    { icon: '🎨', name: 'Digital Assets', count: '2,150+', href: '/categories/digital-assets', color1: '#8b5cf6', color2: '#ec4899' },
    { icon: '📋', name: 'Templates', count: '1,800+', href: '/categories/templates', color1: '#14b8a6', color2: '#3b82f6' },
    { icon: '📊', name: 'Datasets', count: '950+', href: '/categories/datasets', color1: '#f59e0b', color2: '#f97316' },
    { icon: '⚡', name: 'APIs', count: '1,100+', href: '/categories/apis', color1: '#ec4899', color2: '#8b5cf6' },
    { icon: '🛠️', name: 'SaaS Tools', count: '680+', href: '/categories/saas-tools', color1: '#10b981', color2: '#14b8a6' },
];

const LISTINGS = [
    {
        title: 'AutoCodeAgent Pro',
        seller: 'NeuralForge Labs',
        avatar: 'NF',
        price: '$49',
        period: '/mo',
        rating: 4.9,
        reviews: 312,
        category: 'AI Agents',
        tags: ['GPT-4', 'Code Gen', 'API'],
        gradient: 'from-[#3b82f6]/25 to-[#8b5cf6]/15',
        color: '#3b82f6',
        purchases: '2.1k',
        featured: true,
    },
    {
        title: 'DataVault Enterprise',
        seller: 'CloudScale AI',
        avatar: 'CS',
        price: '$199',
        period: '',
        rating: 4.8,
        reviews: 156,
        category: 'Datasets',
        tags: ['128GB', 'Labeled', 'NLP'],
        gradient: 'from-[#14b8a6]/25 to-[#3b82f6]/15',
        color: '#14b8a6',
        purchases: '890',
        featured: false,
    },
    {
        title: 'PromptCraft Studio',
        seller: 'PromptWizards',
        avatar: 'PW',
        price: '$29',
        period: '',
        rating: 4.7,
        reviews: 489,
        category: 'Templates',
        tags: ['1,200 Prompts', 'GPT-4', 'Claude'],
        gradient: 'from-[#8b5cf6]/25 to-[#ec4899]/15',
        color: '#8b5cf6',
        purchases: '4.8k',
        featured: true,
    },
    {
        title: 'API Gateway Ultra',
        seller: 'ByteStream Inc.',
        avatar: 'BS',
        price: '$99',
        period: '/mo',
        rating: 4.9,
        reviews: 203,
        category: 'APIs',
        tags: ['REST', '99.99%', '10ms'],
        gradient: 'from-[#f59e0b]/25 to-[#ef4444]/15',
        color: '#f59e0b',
        purchases: '1.3k',
        featured: false,
    },
    {
        title: 'VisionML Toolkit',
        seller: 'PixelMinds',
        avatar: 'PM',
        price: '$79',
        period: '/mo',
        rating: 4.8,
        reviews: 97,
        category: 'SaaS Tools',
        tags: ['CV', 'PyTorch', 'ONNX'],
        gradient: 'from-[#10b981]/25 to-[#14b8a6]/15',
        color: '#10b981',
        purchases: '640',
        featured: false,
    },
    {
        title: 'SentimentAI API',
        seller: 'LinguaForge',
        avatar: 'LF',
        price: '$19',
        period: '/mo',
        rating: 4.6,
        reviews: 831,
        category: 'APIs',
        tags: ['NLP', '50 langs', 'Real-time'],
        gradient: 'from-[#ec4899]/25 to-[#8b5cf6]/15',
        color: '#ec4899',
        purchases: '7.2k',
        featured: false,
    },
];

const TESTIMONIALS = [
    { name: 'Arjun Sharma', role: 'CTO at Nexus Labs', avatar: 'AS', text: 'AutoCodeAgent Pro cut our dev sprint time in half. The quality of AI tools on this platform is unmatched.', rating: 5 },
    { name: 'Sarah Mitchell', role: 'ML Engineer at Vertex', avatar: 'SM', text: 'DataVault\'s labeled datasets are the cleanest I\'ve worked with. Made our fine-tuning pipeline 3x faster.', rating: 5 },
    { name: 'James Okonkwo', role: 'Founder at AgentX', avatar: 'JO', text: 'The crypto payment integration and instant delivery made it the best marketplace experience I\'ve had.', rating: 5 },
];

const STATS = [
    { value: '10K+', label: 'AI Agents & Tools', icon: '🤖' },
    { value: '$4.2M', label: 'Total GMV', icon: '💰' },
    { value: '450+', label: 'Verified Sellers', icon: '🏪' },
    { value: '98.7%', label: 'Satisfaction Rate', icon: '⭐' },
];

const PAYMENT_METHODS = ['Stripe', 'Visa', 'Mastercard', 'ETH', 'SOL', 'USDC', 'USDT', 'x402 Protocol'];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#f59e0b' : 'rgba(255,255,255,0.12)'}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                </svg>
            ))}
        </div>
    );
}

export default function HomePage() {
    return (
        <>
            {/* ════════════════════════════════════════════ HERO ═══════════════════════════════════════════ */}
            <section className="relative isolate overflow-hidden min-h-[92vh] flex items-center">
                {/* Mesh gradient background */}
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute left-[-10%] top-[-10%] h-[640px] w-[640px] rounded-full bg-[#3b82f6] opacity-[0.07] blur-[140px]" />
                    <div className="absolute right-[-5%] top-[20%] h-[520px] w-[520px] rounded-full bg-[#8b5cf6] opacity-[0.08] blur-[120px]" />
                    <div className="absolute left-[40%] bottom-[-5%] h-[480px] w-[480px] rounded-full bg-[#14b8a6] opacity-[0.06] blur-[130px]" />
                    {/* Grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.07) 1px,transparent 1px)', backgroundSize: '64px 64px' }}
                    />
                </div>

                <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left — Text */}
                        <div>
                            {/* Eyebrow badge */}
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/[0.08] px-4 py-1.5 backdrop-blur-sm">
                                <span className="dot-green" />
                                <span className="text-xs font-medium text-[#93c5fd]">The #1 AI & Digital Goods Marketplace</span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] leading-[1.05] text-white">
                                Build Faster<br />
                                with the{' '}
                                <span
                                    className="inline-block g-text animate-gradient-x"
                                    style={{ backgroundImage: 'linear-gradient(135deg,#3b82f6,#8b5cf6,#14b8a6,#3b82f6)', backgroundSize: '300% 300%' }}
                                >
                                    AI Economy
                                </span>
                            </h1>

                            {/* Sub */}
                            <p className="mt-6 text-lg text-[#9ca3af] leading-relaxed max-w-xl">
                                Discover, buy, and deploy AI agents, datasets, APIs, and digital goods — instantly. Pay with crypto, card, or the x402 protocol.
                            </p>

                            {/* CTAs */}
                            <div className="mt-10 flex flex-wrap gap-3">
                                <a href="/search" className="btn-primary text-base h-12 px-7 gap-2">
                                    Explore Marketplace
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </a>
                                <a href="/auth/signup" className="btn-secondary text-base h-12 px-7">
                                    Start Selling Free
                                </a>
                            </div>

                            {/* Mini stats */}
                            <div className="mt-10 flex flex-wrap gap-6">
                                {STATS.map(s => (
                                    <div key={s.label} className="flex items-center gap-2">
                                        <span className="text-lg">{s.icon}</span>
                                        <div>
                                            <span className="text-lg font-bold text-white">{s.value}&nbsp;</span>
                                            <span className="text-xs text-[#6b7280]">{s.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right — Floating card stack */}
                        <div className="relative hidden lg:flex items-center justify-center h-[520px]">
                            {/* Large card */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="glass-card w-[340px] p-6 animate-float" style={{ zIndex: 3 }}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br from-[#3b82f6]/20 to-[#8b5cf6]/10">🤖</div>
                                            <div>
                                                <p className="text-sm font-semibold text-white">AutoCodeAgent Pro</p>
                                                <p className="text-xs text-[#6b7280]">by NeuralForge Labs</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs">
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" /></svg>
                                            <span className="text-white font-semibold">4.9</span>
                                            <span className="text-[#6b7280]">(312)</span>
                                        </div>
                                    </div>
                                    {/* Mini chart bars */}
                                    <div className="flex gap-1 mb-4 h-12 items-end">
                                        {[30, 60, 45, 80, 65, 90, 75].map((h, i) => (
                                            <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-[#3b82f6]/40 to-[#3b82f6]/10" style={{ height: `${h}%`, opacity: 0.7 + i * 0.04 }} />
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-[#6b7280]">Revenue this month</p>
                                            <p className="text-lg font-bold text-white">$24,890</p>
                                        </div>
                                        <span className="badge bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">▲ 18.3%</span>
                                    </div>
                                </div>

                                {/* Floating small card — top right */}
                                <div className="absolute top-8 right-4 glass-card p-4 w-44 animate-float2" style={{ zIndex: 4 }}>
                                    <p className="text-xs text-[#6b7280] mb-2">New order</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-lg bg-[#8b5cf6]/20 flex items-center justify-center text-sm">📦</div>
                                        <div>
                                            <p className="text-xs font-semibold text-white">PromptCraft</p>
                                            <p className="text-xs text-[#10b981] font-semibold">+$29.00</p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-[#4b5563] mt-2">just now · Stripe</p>
                                </div>

                                {/* Floating small card — bottom left */}
                                <div className="absolute bottom-12 left-2 glass-card p-4 w-44 animate-float" style={{ animationDelay: '1.5s', zIndex: 4 }}>
                                    <p className="text-xs text-[#6b7280] mb-1">Active users</p>
                                    <p className="text-xl font-bold text-white">12,890</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <span className="dot-green" />
                                        <span className="text-[10px] text-[#10b981]">Online now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════ MARQUEE TRUST BAR ════════════════════════════════ */}
            <div className="border-y border-white/[0.06] bg-white/[0.01] py-4 overflow-hidden">
                <div className="flex animate-marquee whitespace-nowrap">
                    {[...Array(2)].map((_, di) => (
                        <div key={di} className="flex items-center gap-10 px-5">
                            {PAYMENT_METHODS.map(m => (
                                <span key={m} className="inline-flex items-center gap-2 text-xs font-medium text-[#6b7280]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]/40" />
                                    {m}
                                </span>
                            ))}
                            {['Instant Delivery', 'Non-Custodial', 'SOC 2 Compliant', 'End-to-End Encrypted', '24/7 Support', 'No Lock-in'].map(t => (
                                <span key={t} className="inline-flex items-center gap-2 text-xs font-medium text-[#6b7280]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]/40" />
                                    {t}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* ════════════════════════════════════════════ CATEGORIES ═════════════════════════════════════ */}
            <section className="py-24">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <p className="section-eyebrow justify-center">Browse Categories</p>
                        <h2 className="text-4xl font-bold tracking-tight text-white">
                            Everything You Need to <span className="g-text-brand">Build & Ship</span>
                        </h2>
                        <p className="mt-3 text-[#9ca3af] text-base max-w-lg mx-auto">From AI agents to production-ready datasets — all in one marketplace.</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {CATEGORIES.map(cat => (
                            <a
                                key={cat.name}
                                href={cat.href}
                                className="group relative glass-card p-5 text-center overflow-hidden"
                            >
                                {/* Hover glow */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" style={{ background: `radial-gradient(ellipse at 50% 0%, ${cat.color1}20 0%, transparent 70%)` }} />
                                {/* Icon */}
                                <div
                                    className="mx-auto mb-4 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
                                    style={{ background: `linear-gradient(135deg, ${cat.color1}22, ${cat.color2}11)`, border: `1px solid ${cat.color1}25` }}
                                >
                                    {cat.icon}
                                </div>
                                <h3 className="text-sm font-semibold text-white">{cat.name}</h3>
                                <p className="mt-1 text-xs text-[#4b5563] group-hover:text-[#6b7280] transition-colors">{cat.count}</p>
                                {/* Arrow */}
                                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 flex justify-center">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={cat.color1} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════ FEATURED LISTINGS ══════════════════════════════ */}
            <section className="py-24 relative">
                {/* Section bg */}
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d2b]/50 to-transparent" />
                </div>

                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <p className="section-eyebrow">Curated Picks</p>
                            <h2 className="text-4xl font-bold tracking-tight text-white">
                                Featured <span className="g-text-brand">Listings</span>
                            </h2>
                            <p className="mt-2 text-[#9ca3af]">Hand-verified by our team for quality, performance &amp; value</p>
                        </div>
                        <a href="/search?featured=true" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#3b82f6] hover:text-[#60a5fa] transition-colors">
                            View all listings
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </a>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {LISTINGS.map(l => (
                            <a key={l.title} href={`/listing/${l.title.toLowerCase().replace(/\s+/g, '-')}`} className="listing-card group">
                                {/* Thumbnail */}
                                <div className={`relative h-44 bg-gradient-to-br ${l.gradient} flex items-center justify-center overflow-hidden`}>
                                    {/* Pattern */}
                                    <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 70% 30%, ${l.color}25 0%, transparent 60%)` }} />
                                    <div className="w-16 h-16 rounded-2xl bg-white/[0.07] flex items-center justify-center text-3xl border border-white/[0.12] backdrop-blur-sm">
                                        {l.category === 'AI Agents' ? '🤖' : l.category === 'Datasets' ? '📊' : l.category === 'Templates' ? '📋' : l.category === 'APIs' ? '⚡' : l.category === 'SaaS Tools' ? '🛠️' : '📦'}
                                    </div>
                                    {/* Featured badge */}
                                    {l.featured && (
                                        <div className="absolute top-3 left-3">
                                            <span className="badge bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/20">
                                                <svg width="9" height="9" viewBox="0 0 24 24" fill="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" /></svg>
                                                Featured
                                            </span>
                                        </div>
                                    )}
                                    {/* Category */}
                                    <div className="absolute top-3 right-3">
                                        <span className="badge border" style={{ background: `${l.color}15`, color: l.color, borderColor: `${l.color}30` }}>{l.category}</span>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-5">
                                    {/* Title + tags */}
                                    <h3 className="font-semibold text-white group-hover:text-[#60a5fa] transition-colors">{l.title}</h3>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {l.tags.map(t => (
                                            <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.04] border border-white/[0.07] text-[#6b7280]">{t}</span>
                                        ))}
                                    </div>

                                    {/* Seller */}
                                    <div className="flex items-center gap-2 mt-3">
                                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${l.color}, ${l.color}88)` }}>{l.avatar}</div>
                                        <span className="text-xs text-[#6b7280]">{l.seller}</span>
                                        <span className="ml-auto text-xs text-[#4b5563]">{l.purchases} sold</span>
                                    </div>

                                    {/* Price + rating */}
                                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
                                        <div>
                                            <span className="text-xl font-bold" style={{ color: l.color }}>{l.price}</span>
                                            {l.period && <span className="text-xs text-[#6b7280]">{l.period}</span>}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <StarRating rating={l.rating} />
                                            <span className="text-xs text-[#9ca3af] font-medium">{l.rating}</span>
                                            <span className="text-xs text-[#4b5563]">({l.reviews})</span>
                                        </div>
                                    </div>

                                    {/* Buy button */}
                                    <button className="mt-4 w-full h-9 rounded-lg text-sm font-semibold text-white transition-all opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0" style={{ background: `linear-gradient(135deg, ${l.color}, ${l.color}bb)` }}>
                                        Add to Cart
                                    </button>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════ HOW IT WORKS ═══════════════════════════════════ */}
            <section className="py-24">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="section-eyebrow justify-center">Simple Process</p>
                        <h2 className="text-4xl font-bold text-white">How It <span className="g-text-brand">Works</span></h2>
                        <p className="mt-3 text-[#9ca3af] max-w-sm mx-auto">Get from discovery to deployment in minutes.</p>
                    </div>

                    {/* Steps */}
                    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* connector line */}
                        <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#3b82f6]/30 to-transparent" />

                        {[
                            { n: '01', title: 'Discover', desc: 'Browse 10,000+ verified AI tools, datasets, APIs, and templates with intelligent search and filters.', icon: '🔍', color: '#3b82f6' },
                            { n: '02', title: 'Purchase', desc: 'Pay instantly via Stripe, ETH, SOL, USDC, or the x402 micro-payment protocol. No friction.', icon: '💳', color: '#8b5cf6' },
                            { n: '03', title: 'Deploy', desc: 'Download instantly, use your API key, or integrate directly via our unified SDK.', icon: '🚀', color: '#14b8a6' },
                        ].map(step => (
                            <div key={step.n} className="relative glass-card p-8 text-center group hover:-translate-y-2">
                                {/* Step number */}
                                <div className="absolute top-5 right-5 text-[3.5rem] font-black leading-none select-none" style={{ color: `${step.color}08` }}>{step.n}</div>
                                {/* Icon */}
                                <div className="mx-auto mb-6 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${step.color}20, ${step.color}08)`, border: `1px solid ${step.color}25` }}>
                                    {step.icon}
                                </div>
                                <div className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white mb-3" style={{ background: step.color }}>{step.n}</div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-sm text-[#9ca3af] leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════ TESTIMONIALS ═══════════════════════════════════ */}
            <section className="py-24 relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="absolute left-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d2b]/40 via-[#0d0d2b]/20 to-transparent" />
                </div>

                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <p className="section-eyebrow justify-center">Social Proof</p>
                        <h2 className="text-4xl font-bold text-white">Loved by <span className="g-text-brand">Builders</span></h2>
                        <p className="mt-3 text-[#9ca3af]">Join thousands of engineers and creators who ship faster with Synergetics.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TESTIMONIALS.map(t => (
                            <div key={t.name} className="glass-card p-7 flex flex-col gap-5">
                                {/* Stars */}
                                <StarRating rating={t.rating} />
                                {/* Quote */}
                                <p className="text-[#cbd5e1] text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                                {/* Author */}
                                <div className="flex items-center gap-3 border-t border-white/[0.06] pt-4">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-xs font-bold text-white">{t.avatar}</div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">{t.name}</p>
                                        <p className="text-xs text-[#6b7280]">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════ PAYMENT STRIP ══════════════════════════════════ */}
            <section className="py-16">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="glass-card p-8 flex flex-col sm:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-white">Accept &amp; pay with anything</h3>
                            <p className="mt-1 text-sm text-[#9ca3af]">Every payment method, one unified checkout.</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {PAYMENT_METHODS.map(m => (
                                <div key={m} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.07] bg-white/[0.03] text-xs font-semibold text-[#9ca3af]">
                                    <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]" />
                                    {m}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════ CTA ════════════════════════════════════════════ */}
            <section className="py-24">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="relative g-border overflow-hidden rounded-3xl">
                        {/* Inner card */}
                        <div className="relative glass-card rounded-3xl p-14 sm:p-20 text-center overflow-hidden" style={{ border: 'none' }}>
                            {/* Bg glows */}
                            <div className="pointer-events-none absolute inset-0 -z-10">
                                <div className="absolute top-0 left-[20%] w-80 h-80 bg-[#3b82f6]/10 rounded-full blur-[100px]" />
                                <div className="absolute bottom-0 right-[15%] w-80 h-80 bg-[#8b5cf6]/10 rounded-full blur-[100px]" />
                            </div>

                            <p className="section-eyebrow justify-center mb-4">Get Started Today</p>
                            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
                                The AI Economy<br />Is Here — <span className="g-text-brand">Join It</span>
                            </h2>
                            <p className="mt-5 text-[#9ca3af] text-lg max-w-md mx-auto">
                                Thousands of developers, startups, and enterprises build faster with Synergetics.ai.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a href="/auth/signup" className="btn-primary text-base h-12 px-8 animate-glow-pulse">
                                    Create Free Account
                                </a>
                                <a href="/docs" className="btn-secondary text-base h-12 px-8">
                                    Read the Docs
                                </a>
                            </div>
                            {/* Trust micro-proof */}
                            <p className="mt-8 text-xs text-[#4b5563]">Free forever plan · No credit card required · GDPR compliant</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
