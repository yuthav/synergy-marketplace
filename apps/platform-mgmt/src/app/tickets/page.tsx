'use client';
import { useState } from 'react';

const INITIAL_TICKETS = [
    { id: 'TK-001', title: 'Payment gateway timeout on crypto checkout', priority: 'high', status: 'open', category: 'Technical', assignee: 'Unassigned', reporter: 'auto', createdAt: '2026-03-04 10:00' },
    { id: 'TK-002', title: 'DataNova Corp KYB document review required', priority: 'medium', status: 'in_review', category: 'Compliance', assignee: 'Priya Rao', reporter: 'system', createdAt: '2026-03-03 09:00' },
    { id: 'TK-003', title: 'Marketplace search returns wrong results for "python"', priority: 'medium', status: 'open', category: 'Product', assignee: 'Unassigned', reporter: 'user', createdAt: '2026-03-02 14:00' },
    { id: 'TK-004', title: 'Seller commission rate configuration UI not saving', priority: 'low', status: 'resolved', category: 'Technical', assignee: 'Dev Team', reporter: 'user', createdAt: '2026-02-28 11:00' },
];

const PRIORITY_COLORS: Record<string, string> = { high: '#ef4444', medium: '#f59e0b', low: '#3b82f6' };
const STATUS_COLORS: Record<string, string> = { open: '#ef4444', in_review: '#f59e0b', resolved: '#10b981' };

export default function TicketsPage() {
    const [tickets, setTickets] = useState(INITIAL_TICKETS);
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState('Technical');
    const [newPriority, setNewPriority] = useState('medium');
    const [creating, setCreating] = useState(false);

    const createTicket = () => {
        if (!newTitle) return;
        setTickets(prev => [...prev, { id: `TK-${String(prev.length + 1).padStart(3, '0')}`, title: newTitle, priority: newPriority, status: 'open', category: newCategory, assignee: 'Unassigned', reporter: 'admin', createdAt: new Date().toLocaleString() }]);
        setNewTitle(''); setCreating(false);
    };

    const updateStatus = (id: string, status: string) => setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div><h1 className="text-xl font-bold text-white">Tickets</h1><p className="text-sm text-[#6b7280]">Internal support and action items</p></div>
                <button onClick={() => setCreating(v => !v)} className="btn-primary h-9 px-4 text-sm" style={{ background: 'linear-gradient(to right, #f59e0b, #ef4444)', color: '#0a0a1a' }}>+ Create Ticket</button>
            </div>

            {/* Create form */}
            {creating && (
                <div className="glass-card p-5 space-y-4 border border-[#f59e0b]/15">
                    <h3 className="font-semibold text-white">New Ticket</h3>
                    <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Describe the issue..." className="input" />
                    <div className="flex gap-4">
                        <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="input h-9 text-sm flex-1">
                            {['Technical', 'Compliance', 'Product', 'Finance', 'Merchant'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <select value={newPriority} onChange={e => setNewPriority(e.target.value)} className="input h-9 text-sm flex-1">
                            {['high', 'medium', 'low'].map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setCreating(false)} className="btn-secondary h-9 px-4 text-sm">Cancel</button>
                        <button onClick={createTicket} disabled={!newTitle} className="btn-primary h-9 px-5 text-sm disabled:opacity-40">Create</button>
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="flex gap-3">
                {Object.entries({ open: '#ef4444', in_review: '#f59e0b', resolved: '#10b981' }).map(([s, c]) => (
                    <div key={s} className="glass-card p-3 flex items-center gap-2 flex-1">
                        <span className="w-2 h-2 rounded-full" style={{ background: c }} />
                        <span className="text-sm font-bold text-white">{tickets.filter(t => t.status === s).length}</span>
                        <span className="text-xs text-[#6b7280] capitalize">{s.replace('_', ' ')}</span>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="glass-card overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-white/[0.06]">{['ID', 'Title', 'Priority', 'Category', 'Assignee', 'Created', 'Status', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#4b5563]">{h}</th>)}</tr></thead>
                    <tbody>
                        {tickets.map(t => (
                            <tr key={t.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                                <td className="px-4 py-3 font-mono text-[11px] text-[#3b82f6]">{t.id}</td>
                                <td className="px-4 py-3 font-medium text-white max-w-[280px]"><p className="truncate">{t.title}</p></td>
                                <td className="px-4 py-3"><span className="badge border font-semibold" style={{ background: `${PRIORITY_COLORS[t.priority]}15`, color: PRIORITY_COLORS[t.priority], borderColor: `${PRIORITY_COLORS[t.priority]}30` }}>{t.priority}</span></td>
                                <td className="px-4 py-3 text-xs text-[#6b7280]">{t.category}</td>
                                <td className="px-4 py-3 text-xs text-[#6b7280]">{t.assignee}</td>
                                <td className="px-4 py-3 text-[10px] text-[#4b5563]">{t.createdAt}</td>
                                <td className="px-4 py-3"><span className="badge border" style={{ background: `${STATUS_COLORS[t.status]}15`, color: STATUS_COLORS[t.status], borderColor: `${STATUS_COLORS[t.status]}30` }}>{t.status.replace('_', ' ')}</span></td>
                                <td className="px-4 py-3">
                                    <select value={t.status} onChange={e => updateStatus(t.id, e.target.value)} className="h-7 text-[10px] rounded-lg border border-white/[0.07] bg-white/[0.03] px-2 text-[#9ca3af] outline-none cursor-pointer">
                                        {['open', 'in_review', 'resolved'].map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
