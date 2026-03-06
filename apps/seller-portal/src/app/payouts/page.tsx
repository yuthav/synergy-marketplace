'use client';
import { useState } from 'react';

const PAYOUTS = [
    { id: 'po1', amount: 8624, status: 'completed', date: '2026-02-15', method: 'Bank (Chase ••4242)' },
    { id: 'po2', amount: 7216, status: 'completed', date: '2026-01-15', method: 'Bank (Chase ••4242)' },
    { id: 'po3', amount: 6512, status: 'completed', date: '2025-12-15', method: 'Bank (Chase ••4242)' },
];

export default function PayoutsPage() {
    const [amount, setAmount] = useState('');
    const [requested, setRequested] = useState(false);

    return (
        <div className="space-y-6">
            <div><h1 className="text-xl font-bold text-white">Payouts</h1><p className="text-sm text-[#6b7280]">Request and track your payouts</p></div>

            {/* Connected account */}
            <div className="glass-card p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center text-2xl">🏦</div>
                    <div><p className="font-semibold text-white">Chase Bank ••••4242</p><p className="text-xs text-[#6b7280]">USD · Routing: ••••0021 · Verified</p></div>
                </div>
                <button className="btn-secondary h-9 px-4 text-sm">Update Account</button>
            </div>

            {/* Request payout */}
            <div className="glass-card p-6 space-y-4">
                <h3 className="font-semibold text-white">Request Payout</h3>
                <div className="flex items-center gap-3">
                    <p className="text-sm text-[#6b7280]">Available balance:</p>
                    <p className="text-xl font-bold text-[#10b981]">$3,240</p>
                </div>
                {requested ? (
                    <div className="glass-card p-4 border border-[#10b981]/20 bg-[#10b981]/[0.04]">
                        <p className="text-sm font-semibold text-[#10b981]">✓ Payout request submitted!</p>
                        <p className="text-xs text-[#4b5563] mt-1">Expected arrival: 3–5 business days. You&apos;ll receive an email confirmation.</p>
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <div className="relative flex-1"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280] text-sm">$</span><input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Min $50" className="input pl-7" /></div>
                        <button onClick={() => setRequested(true)} disabled={!amount || Number(amount) < 50} className="btn-primary h-11 px-6 text-sm disabled:opacity-40">Request Payout</button>
                    </div>
                )}
                <p className="text-[10px] text-[#4b5563]">Payouts are processed weekly on Fridays. Minimum $50.</p>
            </div>

            {/* History */}
            <div className="glass-card overflow-hidden">
                <div className="px-6 py-4 border-b border-white/[0.06]"><h3 className="text-sm font-semibold text-white">Payout History</h3></div>
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-white/[0.04]">{['Date', 'Amount (Net)', 'Method', 'Status'].map(h => <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#4b5563]">{h}</th>)}</tr></thead>
                    <tbody>
                        {PAYOUTS.map(p => (
                            <tr key={p.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                                <td className="px-5 py-3 text-[#9ca3af]">{p.date}</td>
                                <td className="px-5 py-3 font-bold text-white">${p.amount.toLocaleString()}</td>
                                <td className="px-5 py-3 text-[#6b7280]">{p.method}</td>
                                <td className="px-5 py-3"><span className="badge bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">Completed</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
