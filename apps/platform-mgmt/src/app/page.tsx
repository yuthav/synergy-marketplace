const KPI = [
    { label: 'GMV (30d)', value: '$284.5K', change: '+22.3%', up: true, icon: '💰', color: '#f59e0b' },
    { label: 'Merchants', value: '156', change: '+8', up: true, icon: '🏪', color: '#3b82f6' },
    { label: 'Listings', value: '3,247', change: '+124', up: true, icon: '📦', color: '#8b5cf6' },
    { label: 'Platform Revenue', value: '$42.7K', change: '+18.7%', up: true, icon: '📈', color: '#14b8a6' },
    { label: 'Active Users', value: '12,890', change: '+1.2k', up: true, icon: '👥', color: '#10b981' },
    { label: 'Open Disputes', value: '3', change: '-2', up: true, icon: '⚖️', color: '#ef4444' },
];

const SERVICES = [
    { name: 'Marketplace', status: 'Operational', latency: '48ms', uptime: '99.98%', dot: 'green' },
    { name: 'Seller Portal', status: 'Operational', latency: '51ms', uptime: '99.95%', dot: 'green' },
    { name: 'API Server', status: 'Operational', latency: '12ms', uptime: '99.99%', dot: 'green' },
    { name: 'Payment Gateway', status: 'Degraded', latency: '320ms', uptime: '99.89%', dot: 'amber' },
    { name: 'Database', status: 'Optimal', latency: '4ms', uptime: '100%', dot: 'green' },
];

const ACTIONS = [
    { type: 'KYB Review', detail: 'DataNova Corp', priority: 'High', age: '2h' },
    { type: 'Dispute', detail: 'SYN-X1Y2Z3', priority: 'High', age: '5h' },
    { type: 'Payout Approval', detail: '$4,200 · PromptWizards', priority: 'Medium', age: '6h' },
    { type: 'Listing Review', detail: 'GPT-Tuner V2', priority: 'Medium', age: '8h' },
];

const REVENUE = [
    { method: 'Stripe', amount: '$24,300', pct: 57, color: '#3b82f6' },
    { method: 'Crypto', amount: '$11,200', pct: 26, color: '#8b5cf6' },
    { method: 'x402', amount: '$5,100', pct: 12, color: '#14b8a6' },
    { method: 'Pl. Credits', amount: '$2,075', pct: 5, color: '#f59e0b' },
];

const MERCHANTS = [
    { name: 'NeuralForge Labs', tier: 'Platinum', revenue: '$45,200', orders: 312, commission: '10%', status: 'Active' },
    { name: 'CloudScale AI', tier: 'Gold', revenue: '$32,100', orders: 245, commission: '12%', status: 'Active' },
    { name: 'PromptWizards', tier: 'Gold', revenue: '$28,900', orders: 489, commission: '12%', status: 'Active' },
    { name: 'ByteStream Inc.', tier: 'Silver', revenue: '$18,400', orders: 156, commission: '15%', status: 'Active' },
    { name: 'DataNova Corp', tier: 'Bronze', revenue: '$8,200', orders: 67, commission: '15%', status: 'Under Review' },
];

function TierBadge({ tier }: { tier: string }) {
    const map: Record<string, string> = {
        Platinum: 'bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20',
        Gold: 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20',
        Silver: 'bg-[#9ca3af]/10 text-[#9ca3af] border-[#9ca3af]/20',
        Bronze: 'bg-[#78716c]/10 text-[#78716c] border-[#78716c]/20',
    };
    return <span className={`badge border ${map[tier] ?? ''}`}>{tier}</span>;
}

function StatusBadge({ s }: { s: string }) {
    return (
        <span className={`badge border ${s === 'Active' ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20' :
                s === 'Operational' ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20' :
                    s === 'Optimal' ? 'bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20' :
                        s === 'Degraded' ? 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20' :
                            'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20'
            }`}>{s}</span>
    );
}

export default function PlatformDashboard() {
    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-white">Platform Dashboard</h1>
                    <p className="text-sm text-[#6b7280] mt-0.5">Synergetics.ai global operations — live view</p>
                </div>
                <button className="btn-admin text-xs h-8 px-3.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    Export Report
                </button>
            </div>

            {/* KPI grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {KPI.map(k => (
                    <div key={k.label} className="glass-card p-4">
                        <div className="flex items-start justify-between mb-3">
                            <span className="text-xl">{k.icon}</span>
                            <span className={`text-[10px] font-bold ${k.up ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>{k.change}</span>
                        </div>
                        <p className="text-xl font-bold text-white leading-none">{k.value}</p>
                        <p className="text-[10px] text-[#4b5563] mt-1.5 leading-tight">{k.label}</p>
                    </div>
                ))}
            </div>

            {/* Middle row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* System status */}
                <div className="glass-card p-5">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-sm font-semibold text-white">System Status</h2>
                        <span className="flex items-center gap-1.5">
                            <span className="dot-green" />
                            <span className="text-[10px] text-[#10b981] font-medium">Live</span>
                        </span>
                    </div>
                    <ul className="space-y-3">
                        {SERVICES.map(s => (
                            <li key={s.name} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className={`dot-${s.dot}`} />
                                    <span className="text-[#9ca3af]">{s.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[#4b5563]">{s.latency}</span>
                                    <span className="text-[#4b5563]">{s.uptime}</span>
                                    <StatusBadge s={s.status} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Revenue breakdown */}
                <div className="glass-card p-5">
                    <h2 className="text-sm font-semibold text-white mb-5">Revenue by Method</h2>
                    <ul className="space-y-4">
                        {REVENUE.map(r => (
                            <li key={r.method}>
                                <div className="flex items-center justify-between text-xs mb-1.5">
                                    <span className="text-[#9ca3af]">{r.method}</span>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-white">{r.amount}</span>
                                        <span className="text-[#4b5563] w-6 text-right">{r.pct}%</span>
                                    </div>
                                </div>
                                <div className="h-1.5 rounded-full bg-white/[0.05]">
                                    <div className="h-full rounded-full transition-all" style={{ width: `${r.pct}%`, background: r.color, opacity: 0.8 }} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Pending actions */}
                <div className="glass-card p-5">
                    <div className="flex items-center gap-2 mb-5">
                        <h2 className="text-sm font-semibold text-white">Pending Actions</h2>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f59e0b]/20 text-[10px] font-bold text-[#f59e0b]">{ACTIONS.length}</span>
                    </div>
                    <ul className="space-y-3">
                        {ACTIONS.map((a, i) => (
                            <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/[0.025] border border-white/[0.05]">
                                <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${a.priority === 'High' ? 'bg-[#ef4444]' : 'bg-[#f59e0b]'}`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-white">{a.type}</p>
                                    <p className="text-[10px] text-[#4b5563] truncate">{a.detail} · {a.age} ago</p>
                                </div>
                                <span className={`badge border text-[8px] ${a.priority === 'High' ? 'bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/20' : 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20'}`}>{a.priority}</span>
                            </li>
                        ))}
                    </ul>
                    <a href="/workflows" className="inline-flex mt-4 text-xs text-[#3b82f6] hover:text-[#60a5fa]">View all workflows →</a>
                </div>
            </div>

            {/* Merchants table */}
            <div className="glass-card overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.055]">
                    <h2 className="text-sm font-semibold text-white">Top Merchants</h2>
                    <a href="/merchants" className="text-xs text-[#3b82f6] hover:text-[#60a5fa]">View all →</a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="border-b border-white/[0.04]">
                                {['Merchant', 'Tier', 'Revenue (30d)', 'Orders', 'Commission', 'Status', 'Actions'].map(h => (
                                    <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#4b5563]">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {MERCHANTS.map(m => (
                                <tr key={m.name} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                                    <td className="px-5 py-3 font-semibold text-white">{m.name}</td>
                                    <td className="px-5 py-3"><TierBadge tier={m.tier} /></td>
                                    <td className="px-5 py-3 font-bold text-white">{m.revenue}</td>
                                    <td className="px-5 py-3 text-[#6b7280]">{m.orders}</td>
                                    <td className="px-5 py-3 text-[#6b7280]">{m.commission}</td>
                                    <td className="px-5 py-3">
                                        <StatusBadge s={m.status} />
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2">
                                            <button className="text-[10px] text-[#3b82f6] hover:text-[#60a5fa] font-medium transition-colors">View</button>
                                            <span className="text-[#4b5563]">·</span>
                                            <button className="text-[10px] text-[#6b7280] hover:text-white font-medium transition-colors">Edit Share</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
