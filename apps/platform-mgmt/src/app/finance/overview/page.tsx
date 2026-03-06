const FINANCE_DATA = {
    totalRevenue: 42700, gmv: 284500,
    byMethod: [
        { method: 'Stripe (Card)', amount: 24300, pct: 57, icon: '💳', color: '#3b82f6' },
        { method: 'Crypto (ETH/SOL/USDC)', amount: 11200, pct: 26, icon: '⟠', color: '#8b5cf6' },
        { method: 'x402 Protocol', amount: 5100, pct: 12, icon: '⚡', color: '#14b8a6' },
        { method: 'Platform Credits', amount: 2100, pct: 5, icon: '🪙', color: '#f59e0b' },
    ],
    pendingPayouts: 18400, completedPayouts: 92000, topMerchants: [
        { name: 'NeuralForge Labs', revenue: 45200, commission: 4520 },
        { name: 'PromptWizards', revenue: 28900, commission: 3468 },
        { name: 'CloudScale AI', revenue: 32100, commission: 3852 },
    ],
    monthlyRevenue: [
        { month: 'Sep', gmv: 18200, revenue: 2730 },
        { month: 'Oct', gmv: 21500, revenue: 3225 },
        { month: 'Nov', gmv: 24800, revenue: 3720 },
        { month: 'Dec', gmv: 28100, revenue: 4215 },
        { month: 'Jan', gmv: 31500, revenue: 4725 },
        { month: 'Feb', gmv: 35200, revenue: 5280 },
        { month: 'Mar', gmv: 42700, revenue: 6405 },
    ],
};

export default function FinanceOverviewPage() {
    const maxGmv = Math.max(...FINANCE_DATA.monthlyRevenue.map(m => m.gmv));
    return (
        <div className="space-y-6">
            <div><h1 className="text-xl font-bold text-white">Finance Overview</h1><p className="text-sm text-[#6b7280]">Platform-wide revenue and payout monitoring</p></div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Platform Revenue', val: `$${FINANCE_DATA.totalRevenue.toLocaleString()}`, color: '#10b981', pct: '+18.7%' },
                    { label: 'Gross GMV', val: `$${FINANCE_DATA.gmv.toLocaleString()}`, color: '#3b82f6', pct: '+22.3%' },
                    { label: 'Pending Payouts', val: `$${FINANCE_DATA.pendingPayouts.toLocaleString()}`, color: '#f59e0b', pct: '' },
                    { label: 'All-time Payouts', val: `$${FINANCE_DATA.completedPayouts.toLocaleString()}`, color: '#8b5cf6', pct: '' },
                ].map(s => (
                    <div key={s.label} className="stat-card p-5">
                        <p className="text-xs text-[#6b7280]">{s.label}</p>
                        <p className="text-xl font-bold mt-1" style={{ color: s.color }}>{s.val}</p>
                        {s.pct && <span className="text-[10px] font-bold text-[#10b981]">↑ {s.pct} vs prev month</span>}
                    </div>
                ))}
            </div>

            {/* Revenue chart */}
            <div className="glass-card p-6">
                <h3 className="text-sm font-semibold text-white mb-5">Monthly GMV Growth</h3>
                <div className="flex gap-2 items-end h-36">
                    {FINANCE_DATA.monthlyRevenue.map((m, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                            <div className="w-full rounded-t-sm transition-all group-hover:opacity-100" style={{ height: `${(m.gmv / maxGmv) * 100}%`, background: `linear-gradient(to top, #f59e0b, #ef4444)`, opacity: i === FINANCE_DATA.monthlyRevenue.length - 1 ? 1 : 0.5 }} />
                            <span className="text-[8px] text-[#4b5563] group-hover:text-[#6b7280]">{m.month}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* By method */}
                <div className="glass-card p-6">
                    <h3 className="text-sm font-semibold text-white mb-5">Revenue by Payment Method</h3>
                    <ul className="space-y-4">
                        {FINANCE_DATA.byMethod.map(m => (
                            <li key={m.method}>
                                <div className="flex items-center justify-between text-xs mb-1.5">
                                    <span className="text-[#9ca3af]">{m.icon} {m.method}</span>
                                    <span className="font-bold text-white">${m.amount.toLocaleString()} ({m.pct}%)</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-white/[0.05]"><div className="h-full rounded-full transition-all" style={{ width: `${m.pct}%`, background: m.color }} /></div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Top merchants */}
                <div className="glass-card p-6">
                    <h3 className="text-sm font-semibold text-white mb-5">Top Merchants by Revenue</h3>
                    <ul className="space-y-4">
                        {FINANCE_DATA.topMerchants.map((m, i) => (
                            <li key={m.name} className="flex items-center gap-3">
                                <span className="text-[#4b5563] text-xs font-bold w-4">{i + 1}</span>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-white">{m.name}</p>
                                    <p className="text-[10px] text-[#4b5563]">Commission: ${m.commission.toLocaleString()}</p>
                                </div>
                                <p className="text-sm font-bold text-[#10b981]">${m.revenue.toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
