'use client';
import { useState } from 'react';

const TEAM = [
    { id: 't1', name: 'Alice Chen', email: 'alice@neuralforge.ai', role: 'manager', avatar: 'AC', status: 'active', joinedAt: '2025-10-01' },
    { id: 't2', name: 'Bob Kumar', email: 'bob@neuralforge.ai', role: 'support', avatar: 'BK', status: 'active', joinedAt: '2025-11-15' },
    { id: 't3', name: 'Carol Lee', email: 'carol@neuralforge.ai', role: 'viewer', avatar: 'CL', status: 'invited', joinedAt: '2026-03-01' },
];

const ROLES = ['manager', 'support', 'viewer'];
const ROLE_DESC: Record<string, string> = {
    manager: 'Can manage listings, view orders and analytics',
    support: 'Can respond to messages and view orders only',
    viewer: 'Read-only access to analytics and orders',
};

export default function TeamPage() {
    const [invite, setInvite] = useState({ email: '', role: 'support' });
    const [sent, setSent] = useState(false);

    return (
        <div className="space-y-6">
            <div><h1 className="text-xl font-bold text-white">Team</h1><p className="text-sm text-[#6b7280]">Manage your team members</p></div>

            {/* Invite */}
            <div className="glass-card p-6 space-y-4">
                <h3 className="font-semibold text-white">Invite Team Member</h3>
                {sent ? (
                    <div className="glass-card p-4 border border-[#10b981]/20 bg-[#10b981]/[0.03]">
                        <p className="text-sm text-[#10b981]">✓ Invitation sent to {invite.email}</p>
                    </div>
                ) : (
                    <div className="flex gap-3 flex-wrap">
                        <input value={invite.email} onChange={e => setInvite(p => ({ ...p, email: e.target.value }))} placeholder="email@company.com" className="input flex-1 min-w-[200px] h-10 text-sm" />
                        <select value={invite.role} onChange={e => setInvite(p => ({ ...p, role: e.target.value }))} className="input h-10 text-sm w-36">
                            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                        <button onClick={() => setSent(true)} disabled={!invite.email} className="btn-primary h-10 px-4 text-sm disabled:opacity-40">Send Invite</button>
                    </div>
                )}
                <p className="text-[10px] text-[#4b5563]">Role: {ROLE_DESC[invite.role]}</p>
            </div>

            {/* Members */}
            <div className="glass-card overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-white/[0.06]">{['Member', 'Role', 'Joined', 'Status', 'Actions'].map(h => <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#4b5563]">{h}</th>)}</tr></thead>
                    <tbody>
                        {TEAM.map(m => (
                            <tr key={m.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                                <td className="px-5 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-[10px] font-bold text-white">{m.avatar}</div>
                                        <div><p className="font-semibold text-white">{m.name}</p><p className="text-[10px] text-[#6b7280]">{m.email}</p></div>
                                    </div>
                                </td>
                                <td className="px-5 py-3 capitalize"><span className="badge border border-white/[0.07] bg-white/[0.03] text-[#9ca3af]">{m.role}</span></td>
                                <td className="px-5 py-3 text-xs text-[#6b7280]">{m.joinedAt}</td>
                                <td className="px-5 py-3"><span className={`badge border ${m.status === 'active' ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20' : 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20'}`}>{m.status}</span></td>
                                <td className="px-5 py-3">
                                    <div className="flex gap-3 text-xs">
                                        <button className="text-[#3b82f6] hover:text-[#60a5fa]">Edit</button>
                                        <button className="text-[#ef4444] hover:text-red-300">Remove</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
