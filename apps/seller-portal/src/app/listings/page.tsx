'use client';
import { useState } from 'react';

const LISTINGS = [
    { id: 'l1', title: 'AutoCodeAgent Pro', status: 'published', category: 'AI Agents', price: 49, sales: 312, revenue: 15288, rating: 4.9, createdAt: '2025-11-01' },
    { id: 'l3', title: 'PromptCraft Studio', status: 'published', category: 'Templates', price: 29, sales: 489, revenue: 14181, rating: 4.7, createdAt: '2025-09-01' },
    { id: 'l4', title: 'API Gateway Ultra', status: 'published', category: 'APIs', price: 99, sales: 203, revenue: 20097, rating: 4.9, createdAt: '2025-10-01' },
    { id: 'l8', title: 'MLPipeline Pro (Draft)', status: 'draft', category: 'AI Agents', price: 149, sales: 0, revenue: 0, rating: 0, createdAt: '2026-03-01' },
    { id: 'l9', title: 'DataBridge SDK', status: 'under_review', category: 'APIs', price: 79, sales: 0, revenue: 0, rating: 0, createdAt: '2026-02-20' },
];

type Status = 'all' | 'published' | 'draft' | 'under_review';

function StatusBadge({ s }: { s: string }) {
    const cfg = s === 'published' ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20' : s === 'draft' ? 'bg-[#6b7280]/10 text-[#6b7280] border-[#6b7280]/20' : 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20';
    return <span className={`badge border ${cfg}`}>{s.replace('_', ' ')}</span>;
}

export default function ListingsPage() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<Status>('all');
    const [selected, setSelected] = useState<string[]>([]);

    const filtered = LISTINGS.filter(l => {
        const sOk = statusFilter === 'all' || l.status === statusFilter;
        const qOk = !search || l.title.toLowerCase().includes(search.toLowerCase());
        return sOk && qOk;
    });

    const toggleSelect = (id: string) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
    const allSelected = filtered.length > 0 && filtered.every(l => selected.includes(l.id));
    const toggleAll = () => setSelected(allSelected ? [] : filtered.map(l => l.id));

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div><h1 className="text-xl font-bold text-white">Listings</h1><p className="text-sm text-[#6b7280]">Manage your products</p></div>
                <a href="/listings/new" className="btn-primary text-sm h-9 px-4">+ New Listing</a>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[200px]">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search listings..." className="input pl-9 h-9 text-sm" />
                </div>
                <div className="flex gap-1">
                    {(['all', 'published', 'draft', 'under_review'] as Status[]).map(s => (
                        <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 text-xs rounded-lg font-medium capitalize transition-colors ${statusFilter === s ? 'bg-[#3b82f6]/15 text-[#3b82f6]' : 'text-[#6b7280] hover:text-white hover:bg-white/[0.04]'}`}>
                            {s.replace('_', ' ')}
                        </button>
                    ))}
                </div>
                {selected.length > 0 && (
                    <div className="flex gap-2">
                        <span className="text-xs text-[#9ca3af] self-center">{selected.length} selected</span>
                        <button className="h-9 px-3 text-xs rounded-lg border border-[#ef4444]/20 text-[#ef4444] hover:bg-[#ef4444]/10">Bulk Delete</button>
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="glass-card overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-white/[0.06]">
                            <th className="px-5 py-3 text-left w-8"><input type="checkbox" checked={allSelected} onChange={toggleAll} className="accent-[#3b82f6] w-3.5 h-3.5" /></th>
                            {['Title', 'Category', 'Price', 'Sales', 'Revenue', 'Rating', 'Status', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#4b5563]">{h}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(l => (
                            <tr key={l.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                                <td className="px-5 py-3"><input type="checkbox" checked={selected.includes(l.id)} onChange={() => toggleSelect(l.id)} className="accent-[#3b82f6] w-3.5 h-3.5" /></td>
                                <td className="px-4 py-3 font-medium text-white">{l.title}</td>
                                <td className="px-4 py-3 text-[#6b7280]">{l.category}</td>
                                <td className="px-4 py-3 font-bold text-[#3b82f6]">${l.price}</td>
                                <td className="px-4 py-3 text-[#9ca3af]">{l.sales}</td>
                                <td className="px-4 py-3 font-bold text-[#10b981]">${l.revenue.toLocaleString()}</td>
                                <td className="px-4 py-3">{l.rating > 0 ? <span className="text-[#f59e0b]">{l.rating} ★</span> : <span className="text-[#4b5563]">—</span>}</td>
                                <td className="px-4 py-3"><StatusBadge s={l.status} /></td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2 text-xs">
                                        <a href={`/listings/${l.id}/edit`} className="text-[#3b82f6] hover:text-[#60a5fa]">Edit</a>
                                        <span className="text-[#4b5563]">·</span>
                                        <a href={`http://localhost:3000/listing/${l.id}`} target="_blank" className="text-[#6b7280] hover:text-white">View</a>
                                        <span className="text-[#4b5563]">·</span>
                                        <button className="text-[#ef4444] hover:text-red-300">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && <div className="text-center py-16 text-[#4b5563]">No listings match your filters.</div>}
            </div>
        </div>
    );
}
