const ORDERS = [
    { id: 'SYN-A1B2', product: 'AutoCodeAgent Pro', buyer: 'john@dev.io', amount: 49, method: 'Stripe', status: 'completed', date: '2026-03-04 10:00' },
    { id: 'SYN-C3D4', product: 'PromptCraft Studio', buyer: 'alice@co.ai', amount: 29, method: 'ETH', status: 'completed', date: '2026-03-04 08:00' },
    { id: 'SYN-E5F6', product: 'API Gateway Ultra', buyer: 'bob@labs.io', amount: 99, method: 'USDC', status: 'processing', date: '2026-03-03 15:00' },
    { id: 'SYN-G7H8', product: 'AutoCodeAgent Pro', buyer: 'sara@startup.ai', amount: 49, method: 'Stripe', status: 'completed', date: '2026-03-02 20:00' },
    { id: 'SYN-I9J0', product: 'API Gateway Ultra', buyer: 'mike@corp.com', amount: 99, method: 'x402', status: 'pending', date: '2026-03-01 12:00' },
];

function StatusBadge({ s }: { s: string }) {
    const c = s === 'completed' ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20' : s === 'processing' ? 'bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20' : 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20';
    return <span className={`badge border ${c}`}>{s}</span>;
}

export default function OrdersPage() {
    const total = ORDERS.reduce((s, o) => s + o.amount, 0);
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between"><div><h1 className="text-xl font-bold text-white">Orders</h1><p className="text-sm text-[#6b7280]">{ORDERS.length} orders · ${total} total</p></div><button className="btn-primary h-9 px-4 text-sm">⬇ Export CSV</button></div>
            <div className="glass-card overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-white/[0.06]">{['Order ID', 'Product', 'Buyer', 'Amount', 'Method', 'Status', 'Date', 'Action'].map(h => <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#4b5563]">{h}</th>)}</tr></thead>
                    <tbody>
                        {ORDERS.map(o => (
                            <tr key={o.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                                <td className="px-5 py-3 font-mono text-[11px] text-[#3b82f6]">{o.id}</td>
                                <td className="px-5 py-3 font-medium text-white">{o.product}</td>
                                <td className="px-5 py-3 text-xs text-[#6b7280]">{o.buyer}</td>
                                <td className="px-5 py-3 font-bold text-white">${o.amount}</td>
                                <td className="px-5 py-3"><span className="badge border border-white/[0.07] bg-white/[0.03] text-[#6b7280]">{o.method}</span></td>
                                <td className="px-5 py-3"><StatusBadge s={o.status} /></td>
                                <td className="px-5 py-3 text-[10px] text-[#4b5563]">{o.date}</td>
                                <td className="px-5 py-3"><a href={`/orders/${o.id}`} className="text-xs text-[#3b82f6] hover:text-[#60a5fa]">Details</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
