'use client';
import { useState } from 'react';

const CHART_DATA: Record<string, { label: string; revenue: number; orders: number }[]> = {
    '7d': Array.from({ length: 7 }, (_, i) => ({ label: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i], revenue: 300 + Math.round(Math.random() * 700), orders: 2 + Math.round(Math.random() * 8) })),
    '30d': Array.from({ length: 12 }, (_, i) => ({ label: `W${i + 1}`, revenue: 600 + Math.round(Math.random() * 1400), orders: 5 + Math.round(Math.random() * 20) })),
    '90d': Array.from({ length: 12 }, (_, i) => ({ label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i], revenue: 1500 + Math.round(Math.random() * 3000), orders: 20 + Math.round(Math.random() * 50) })),
};

const GEO = [{ country: 'United States', pct: 45, flag: '🇺🇸' }, { country: 'India', pct: 18, flag: '🇮🇳' }, { country: 'United Kingdom', pct: 12, flag: '🇬🇧' }, { country: 'Germany', pct: 10, flag: '🇩🇪' }, { country: 'Others', pct: 15, flag: '🌍' }];

export default function AnalyticsPage() {
    const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');
    const data = CHART_DATA[period];
    const maxRevenue = Math.max(...data.map(d => d.revenue));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-xl font-bold text-white">Analytics</h1><p className="text-sm text-[#6b7280]">Performance metrics for your store</p></div>
                <div className="flex gap-1">
                    {(['7d', '30d', '90d'] as const).map(p => (
                        <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${period === p ? 'bg-[#3b82f6]/15 text-[#3b82f6]' : 'text-[#6b7280] hover:text-white hover:bg-white/[0.04]'}`}>{p.toUpperCase()}</button>
                    ))}
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Revenue', val: `$${data.reduce((s, d) => s + d.revenue, 0).toLocaleString()}`, up: true },
                    { label: 'Total Orders', val: data.reduce((s, d) => s + d.orders, 0).toString(), up: true },
                    { label: 'Avg Order Val', val: `$${Math.round(data.reduce((s, d) => s + d.revenue, 0) / Math.max(1, data.reduce((s, d) => s + d.orders, 0)))}`, up: true },
                    { label: 'Conv. Rate', val: '3.2%', up: false },
                ].map(k => (
                    <div key={k.label} className="stat-card p-5">
                        <p className="text-xs text-[#6b7280]">{k.label}</p>
                        <p className="text-2xl font-bold text-white mt-1">{k.val}</p>
                        <span className={`text-[10px] font-bold ${k.up ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>{k.up ? '↑' : '↓'} vs prev period</span>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div className="glass-card p-6">
                <h2 className="text-sm font-semibold text-white mb-5">Revenue Overview</h2>
                <div className="flex gap-2 items-end h-44">
                    {data.map((d, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer">
                            <div className="w-full rounded-t-sm relative overflow-hidden transition-all group-hover:opacity-100" style={{ height: `${(d.revenue / maxRevenue) * 100}%`, background: 'linear-gradient(to top, #3b82f6, #8b5cf6)', opacity: i === data.length - 1 ? 1 : 0.5 }}>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10" />
                            </div>
                            <span className="text-[8px] text-[#4b5563] truncate group-hover:text-[#6b7280]">{d.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Geographic + per-product */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                    <h2 className="text-sm font-semibold text-white mb-5">Revenue by Country</h2>
                    <ul className="space-y-4">
                        {GEO.map(g => (
                            <li key={g.country}>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-[#9ca3af]">{g.flag} {g.country}</span>
                                    <span className="font-bold text-white">{g.pct}%</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-white/[0.05]"><div className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]" style={{ width: `${g.pct}%` }} /></div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="glass-card p-6">
                    <h2 className="text-sm font-semibold text-white mb-5">Top Products by Revenue</h2>
                    <ul className="space-y-3">
                        {[
                            { name: 'AutoCodeAgent Pro', rev: 15288, pct: 43 },
                            { name: 'API Gateway Ultra', rev: 20097, pct: 57 },
                            { name: 'PromptCraft Studio', rev: 14181, pct: 40 },
                        ].map((p, i) => (
                            <li key={p.name} className="flex items-center gap-3">
                                <span className="text-xs font-bold text-[#4b5563] w-4">{i + 1}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-white truncate">{p.name}</p>
                                    <div className="h-1 rounded-full bg-white/[0.05] mt-1"><div className="h-full rounded-full bg-[#3b82f6]" style={{ width: `${p.pct}%` }} /></div>
                                </div>
                                <p className="text-xs font-bold text-[#10b981] shrink-0">${p.rev.toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
