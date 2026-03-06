const EARNINGS = { total: 49600, pending: 3240, lifetime: 185400 };
const INVOICES = [
    { id: 'INV-001', period: 'Feb 2026', gross: 9800, commission: 1176, net: 8624, status: 'paid' },
    { id: 'INV-002', period: 'Jan 2026', gross: 8200, commission: 984, net: 7216, status: 'paid' },
    { id: 'INV-003', period: 'Dec 2025', gross: 7400, commission: 888, net: 6512, status: 'paid' },
    { id: 'INV-004', period: 'Mar 2026', gross: 3240, commission: 389, net: 2851, status: 'pending' },
];

function StatusBadge({ s }: { s: string }) {
    return <span className={`badge border ${s === 'paid' ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20' : 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20'}`}>{s}</span>;
}

export default function FinancePage() {
    return (
        <div className="space-y-6">
            <div><h1 className="text-xl font-bold text-white">Finance</h1><p className="text-sm text-[#6b7280]">Earnings and invoices</p></div>

            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'This Month', val: `$${EARNINGS.total.toLocaleString()}`, sub: 'Before commission' },
                    { label: 'Pending Payout', val: `$${EARNINGS.pending.toLocaleString()}`, sub: 'Releases Mar 15' },
                    { label: 'Lifetime Net', val: `$${EARNINGS.lifetime.toLocaleString()}`, sub: 'After all fees' },
                ].map(s => (
                    <div key={s.label} className="stat-card p-5">
                        <p className="text-xs text-[#6b7280]">{s.label}</p>
                        <p className="text-2xl font-bold text-white mt-1">{s.val}</p>
                        <p className="text-[10px] text-[#4b5563] mt-1">{s.sub}</p>
                    </div>
                ))}
            </div>

            {/* Commission breakdown */}
            <div className="glass-card p-6">
                <h3 className="text-sm font-semibold text-white mb-4">Commission Structure (Gold Tier)</h3>
                <div className="flex gap-8 text-sm">
                    <div><p className="text-[#6b7280]">Gross Revenue</p><p className="text-xl font-bold text-white mt-1">$49,600</p></div>
                    <div className="text-[#4b5563] self-center">−</div>
                    <div><p className="text-[#6b7280]">Platform Commission (12%)</p><p className="text-xl font-bold text-[#ef4444] mt-1">−$5,952</p></div>
                    <div className="text-[#4b5563] self-center">=</div>
                    <div><p className="text-[#6b7280]">Your Net Earnings</p><p className="text-xl font-bold text-[#10b981] mt-1">$43,648</p></div>
                </div>
            </div>

            {/* Invoices */}
            <div className="glass-card overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                    <h3 className="text-sm font-semibold text-white">Monthly Invoices</h3>
                    <button className="text-xs text-[#3b82f6] hover:text-[#60a5fa]">Download All</button>
                </div>
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-white/[0.04]">{['Period', 'Gross', 'Commission', 'Net', 'Status', ''].map(h => <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#4b5563]">{h}</th>)}</tr></thead>
                    <tbody>
                        {INVOICES.map(inv => (
                            <tr key={inv.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                                <td className="px-5 py-3 text-white font-medium">{inv.period}</td>
                                <td className="px-5 py-3 text-[#9ca3af]">${inv.gross.toLocaleString()}</td>
                                <td className="px-5 py-3 text-[#ef4444]">−${inv.commission.toLocaleString()}</td>
                                <td className="px-5 py-3 font-bold text-[#10b981]">${inv.net.toLocaleString()}</td>
                                <td className="px-5 py-3"><StatusBadge s={inv.status} /></td>
                                <td className="px-5 py-3"><button className="text-xs text-[#3b82f6] hover:text-[#60a5fa]">⬇ PDF</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
