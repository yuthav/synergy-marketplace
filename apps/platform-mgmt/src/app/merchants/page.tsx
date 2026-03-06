'use client';
import { useState } from 'react';

const MERCHANTS = [
    { id: 'u2', name: 'NeuralForge Labs', email: 'seller@neuralforge.ai', tier: 'platinum', status: 'active', revenue: 45200, kybStatus: 'verified', listings: 8, joinedAt: '2025-02-01', commission: 10 },
    { id: 'u5', name: 'CloudScale AI', email: 'cs@cloudscale.ai', tier: 'gold', status: 'active', revenue: 32100, kybStatus: 'verified', listings: 5, joinedAt: '2025-03-15', commission: 12 },
    { id: 'u6', name: 'PromptWizards', email: 'pw@promptwizards.ai', tier: 'gold', status: 'active', revenue: 28900, kybStatus: 'verified', listings: 12, joinedAt: '2025-04-01', commission: 12 },
    { id: 'u7', name: 'DataNova Corp', email: 'dn@datanova.io', tier: 'bronze', status: 'under_review', revenue: 8200, kybStatus: 'pending', listings: 3, joinedAt: '2025-12-01', commission: 15 },
    { id: 'u8', name: 'PixelMinds', email: 'pm@pixelminds.ai', tier: 'silver', status: 'active', revenue: 19400, kybStatus: 'verified', listings: 7, joinedAt: '2025-06-01', commission: 13 },
];

const TIER_COLORS: Record<string, string> = { platinum: '#8b5cf6', gold: '#f59e0b', silver: '#9ca3af', bronze: '#92400e' };
const STATUS_COLORS: Record<string, string> = { active: '#10b981', under_review: '#f59e0b', suspended: '#ef4444' };

export default function MerchantsPage() {
    const [search, setSearch] = useState('');
    const [tier, setTier] = useState('all');
    const [status, setStatus] = useState('all');

    const filtered = MERCHANTS.filter(m => {
        const qOk = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
        const tOk = tier === 'all' || m.tier === tier;
        const sOk = status === 'all' || m.status === status;
        return qOk && tOk && sOk;
    });

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div><h1 className="text-xl font-bold text-white">Merchants</h1><p className="text-sm text-[#6b7280]">{MERCHANTS.length} total merchants</p></div>
                <button className="btn-primary text-sm h-9 px-4" style={{ background: 'linear-gradient(to right, #f59e0b, #ef4444)', color: '#0a0a1a' }}>+ Invite Merchant</button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
                {[
                    { label: 'Total', val: MERCHANTS.length, color: '#9ca3af' },
                    { label: 'Active', val: MERCHANTS.filter(m => m.status === 'active').length, color: '#10b981' },
                    { label: 'Under Review', val: MERCHANTS.filter(m => m.status === 'under_review').length, color: '#f59e0b' },
                    { label: 'Total GMV', val: `$${MERCHANTS.reduce((s, m) => s + m.revenue, 0).toLocaleString()}`, color: '#3b82f6' },
                ].map(s => (
                    <div key={s.label} className="glass-card p-4 text-center">
                        <p className="text-lg font-bold" style={{ color: s.color }}>{s.val}</p>
                        <p className="text-[10px] text-[#6b7280] mt-0.5">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[200px]">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search merchants..." className="input pl-9 h-9 text-sm" />
                </div>
                <select value={tier} onChange={e => setTier(e.target.value)} className="input h-9 text-sm w-36">
                    <option value="all">All Tiers</option>
                    {['platinum', 'gold', 'silver', 'bronze'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <select value={status} onChange={e => setStatus(e.target.value)} className="input h-9 text-sm w-40">
                    <option value="all">All Statuses</option>
                    {['active', 'under_review', 'suspended'].map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
            </div>

            {/* Table */}
            <div className="glass-card overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-white/[0.06]">
                        {['Merchant', 'Tier', 'Revenue', 'Listings', 'Commission', 'KYB', 'Status', 'Actions'].map(h => (
                            <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#4b5563]">{h}</th>
                        ))}
                    </tr></thead>
                    <tbody>
                        {filtered.map(m => (
                            <tr key={m.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                                <td className="px-5 py-3">
                                    <p className="font-semibold text-white">{m.name}</p>
                                    <p className="text-[10px] text-[#6b7280]">{m.email}</p>
                                </td>
                                <td className="px-5 py-3 capitalize"><span className="badge border font-semibold" style={{ background: `${TIER_COLORS[m.tier]}15`, color: TIER_COLORS[m.tier], borderColor: `${TIER_COLORS[m.tier]}30` }}>{m.tier}</span></td>
                                <td className="px-5 py-3 font-bold text-[#10b981]">${m.revenue.toLocaleString()}</td>
                                <td className="px-5 py-3 text-[#9ca3af]">{m.listings}</td>
                                <td className="px-5 py-3 text-[#9ca3af]">{m.commission}%</td>
                                <td className="px-5 py-3"><span className={`badge border ${m.kybStatus === 'verified' ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20' : 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20'}`}>{m.kybStatus}</span></td>
                                <td className="px-5 py-3"><span className={`badge border`} style={{ background: `${STATUS_COLORS[m.status]}15`, color: STATUS_COLORS[m.status], borderColor: `${STATUS_COLORS[m.status]}30` }}>{m.status.replace('_', ' ')}</span></td>
                                <td className="px-5 py-3">
                                    <div className="flex gap-2 text-xs">
                                        <a href={`/merchants/${m.id}`} className="text-[#3b82f6] hover:text-[#60a5fa]">View</a>
                                        <span className="text-[#4b5563]">·</span>
                                        <button className="text-[#f59e0b] hover:text-amber-300">Edit</button>
                                        {m.status === 'active' && <><span className="text-[#4b5563]">·</span><button className="text-[#ef4444] hover:text-red-300">Suspend</button></>}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && <div className="text-center py-16 text-[#4b5563]">No merchants match your filters.</div>}
            </div>
        </div>
    );
}
