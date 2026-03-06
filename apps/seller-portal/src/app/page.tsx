const STATS = [
    { label: 'Revenue (30d)', value: '$12,450', change: '+12.5%', up: true, icon: '💰', color: '#3b82f6' },
    { label: 'Orders (30d)', value: '156', change: '+18.2%', up: true, icon: '🛒', color: '#8b5cf6' },
    { label: 'Active Listings', value: '24', change: '+3', up: true, icon: '📦', color: '#14b8a6' },
    { label: 'Avg Rating', value: '4.8 ★', change: '+0.1', up: true, icon: '⭐', color: '#f59e0b' },
];

const ORDERS = [
    { id: 'SYN-A1B2', product: 'AutoCodeAgent Pro', buyer: 'john@dev.io', amount: '$49', method: 'Stripe', status: 'Completed', date: '2h ago' },
    { id: 'SYN-C3D4', product: 'PromptCraft Studio', buyer: 'alice@co.ai', amount: '$29', method: 'ETH', status: 'Processing', date: '4h ago' },
    { id: 'SYN-E5F6', product: 'DataVault Enterprise', buyer: 'bob@labs.io', amount: '$199', method: 'Stripe', status: 'Completed', date: '6h ago' },
    { id: 'SYN-G7H8', product: 'API Gateway Ultra', buyer: 'sara@startup.ai', amount: '$99', method: 'USDC', status: 'Pending', date: '8h ago' },
    { id: 'SYN-I9J0', product: 'AutoCodeAgent Pro', buyer: 'mike@corp.com', amount: '$49', method: 'Stripe', status: 'Completed', date: '1d ago' },
];

const TOP_LISTINGS = [
    { name: 'AutoCodeAgent Pro', sales: 312, revenue: '$15,288', growth: '+22%', status: 'Published' },
    { name: 'PromptCraft Studio', sales: 489, revenue: '$14,181', growth: '+8%', status: 'Published' },
    { name: 'API Gateway Ultra', sales: 203, revenue: '$20,097', growth: '+14%', status: 'Published' },
    { name: 'DataVault Enterprise', sales: 87, revenue: '$17,313', growth: '+5%', status: 'Review' },
];

const CHART_BARS = [24, 38, 30, 55, 47, 72, 60, 88, 75, 92, 80, 100];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function StatusBadge({ status }: { status: string }) {
    const cfg =
        status === 'Completed' ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20' :
            status === 'Processing' ? 'bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20' :
                status === 'Pending' ? 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20' :
                    status === 'Published' ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20' :
                        'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20';
    return <span className={`badge border ${cfg}`}>{status}</span>;
}

export default function SellerDashboard() {
    return (
        <div className="space-y-6">
            {/* Page title */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-white">Dashboard</h1>
                    <p className="text-sm text-[#6b7280] mt-0.5">Good morning, NeuralForge Labs 👋</p>
                </div>
                <div className="flex items-center gap-2">
                    <select className="h-8 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 text-xs text-[#9ca3af] outline-none cursor-pointer">
                        <option>Last 30 days</option>
                        <option>Last 7 days</option>
                        <option>Last 90 days</option>
                    </select>
                </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS.map(s => (
                    <div key={s.label} className="stat-card p-5 relative overflow-hidden">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs text-[#6b7280] font-medium">{s.label}</p>
                                <p className="text-2xl font-bold text-white mt-1.5">{s.value}</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <span className={`text-xs font-semibold ${s.up ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>{s.change}</span>
                                    <span className="text-[10px] text-[#4b5563]">vs last period</span>
                                </div>
                            </div>
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ background: `${s.color}18`, border: `1px solid ${s.color}28` }}>
                                {s.icon}
                            </div>
                        </div>
                        {/* Mini sparkline */}
                        <div className="flex gap-0.5 mt-4 h-8 items-end opacity-60">
                            {[40, 60, 35, 80, 55, 90, 70, 85, 65, 100].map((h, i) => (
                                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: s.color, opacity: 0.4 + i * 0.06 }} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Revenue chart + top listings */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 glass-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-sm font-semibold text-white">Revenue Overview</h2>
                            <p className="text-xs text-[#6b7280] mt-0.5">Monthly earnings trend</p>
                        </div>
                        <div className="flex gap-1">
                            {['7D', '30D', '90D', '1Y'].map(p => (
                                <button key={p} className={`px-2.5 py-1 text-[10px] rounded-md font-medium transition-colors ${p === '30D' ? 'bg-[#3b82f6]/15 text-[#3b82f6]' : 'text-[#6b7280] hover:text-white hover:bg-white/[0.04]'}`}>
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Chart */}
                    <div className="relative h-48">
                        <div className="flex gap-2 h-full items-end pb-6">
                            {CHART_BARS.map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer">
                                    <div
                                        className="w-full rounded-t-md transition-all group-hover:opacity-100"
                                        style={{ height: `${h}%`, background: `linear-gradient(to top, #3b82f6, #8b5cf6)`, opacity: i === 11 ? 1 : 0.45 }}
                                    />
                                    <span className="text-[9px] text-[#4b5563] group-hover:text-[#6b7280] transition-colors">{MONTHS[i]}</span>
                                </div>
                            ))}
                        </div>
                        {/* Y-axis labels */}
                        <div className="absolute top-0 right-0 flex flex-col justify-between h-[calc(100%-1.5rem)] text-[9px] text-[#4b5563]">
                            <span>$20k</span>
                            <span>$15k</span>
                            <span>$10k</span>
                            <span>$5k</span>
                            <span>$0</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 mt-2 pt-4 border-t border-white/[0.06]">
                        <div><p className="text-xs text-[#6b7280]">Total revenue</p><p className="text-base font-bold text-white">$12,450</p></div>
                        <div><p className="text-xs text-[#6b7280]">Avg order value</p><p className="text-base font-bold text-white">$79.80</p></div>
                        <div><p className="text-xs text-[#6b7280]">Net after fees</p><p className="text-base font-bold text-[#10b981]">$10,947</p></div>
                    </div>
                </div>

                {/* Top Listings */}
                <div className="glass-card p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-sm font-semibold text-white">Top Listings</h2>
                        <a href="/listings" className="text-xs text-[#3b82f6] hover:text-[#60a5fa]">View all →</a>
                    </div>
                    <ul className="space-y-4">
                        {TOP_LISTINGS.map((l, i) => (
                            <li key={l.name} className="flex items-start gap-3">
                                <span className="text-xs font-bold text-[#4b5563] w-4 pt-0.5">{i + 1}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-white truncate">{l.name}</p>
                                    <p className="text-[10px] text-[#4b5563] mt-0.5">{l.sales} sales · {l.revenue}</p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-[10px] font-semibold text-[#10b981]">{l.growth}</span>
                                    <StatusBadge status={l.status} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="glass-card overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                    <h2 className="text-sm font-semibold text-white">Recent Orders</h2>
                    <a href="/orders" className="text-xs text-[#3b82f6] hover:text-[#60a5fa]">View all →</a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/[0.04]">
                                {['Order ID', 'Product', 'Buyer', 'Amount', 'Method', 'Status', 'Date'].map(h => (
                                    <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#4b5563]">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {ORDERS.map(o => (
                                <tr key={o.id} className="border-b border-white/[0.03] table-row">
                                    <td className="px-5 py-3 font-mono text-[11px] text-[#3b82f6]">{o.id}</td>
                                    <td className="px-5 py-3 text-xs text-white font-medium">{o.product}</td>
                                    <td className="px-5 py-3 text-xs text-[#6b7280]">{o.buyer}</td>
                                    <td className="px-5 py-3 text-xs font-bold text-white">{o.amount}</td>
                                    <td className="px-5 py-3">
                                        <span className="badge border border-white/[0.07] bg-white/[0.03] text-[#6b7280]">{o.method}</span>
                                    </td>
                                    <td className="px-5 py-3"><StatusBadge status={o.status} /></td>
                                    <td className="px-5 py-3 text-[10px] text-[#4b5563]">{o.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
