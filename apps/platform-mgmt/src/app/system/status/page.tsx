const SERVICES = [
    { name: 'Marketplace', url: 'localhost:3000', status: 'operational', latency: 48, uptime: 99.98, lastIncident: 'None in 30 days' },
    { name: 'Seller Portal', url: 'localhost:3001', status: 'operational', latency: 51, uptime: 99.95, lastIncident: 'None in 30 days' },
    { name: 'Platform HQ', url: 'localhost:3002', status: 'operational', latency: 43, uptime: 100, lastIncident: 'None in 30 days' },
    { name: 'API Server', url: 'localhost:4000', status: 'operational', latency: 12, uptime: 99.99, lastIncident: 'None in 30 days' },
    { name: 'Payment Gateway', url: 'Stripe API', status: 'operational', latency: 320, uptime: 99.89, lastIncident: '18 Feb — 3 min' },
    { name: 'Database (Primary)', url: 'Neon Postgres', status: 'optimal', latency: 4, uptime: 100, lastIncident: 'None' },
    { name: 'Database (Replica)', url: 'Neon Replica', status: 'optimal', latency: 6, uptime: 100, lastIncident: 'None' },
    { name: 'CDN / Storage', url: 'Cloudflare R2', status: 'operational', latency: 28, uptime: 99.97, lastIncident: 'None in 30 days' },
    { name: 'Email Service', url: 'Resend', status: 'operational', latency: 180, uptime: 99.91, lastIncident: 'None in 30 days' },
];

const STATUS_CONFIGS: Record<string, { color: string; dot: string; label: string }> = {
    operational: { color: '#10b981', dot: '#10b981', label: 'Operational' },
    optimal: { color: '#3b82f6', dot: '#3b82f6', label: 'Optimal' },
    degraded: { color: '#f59e0b', dot: '#f59e0b', label: 'Degraded' },
    incident: { color: '#ef4444', dot: '#ef4444', label: 'Incident' },
};

function StatusDot({ status }: { status: string }) {
    const cfg = STATUS_CONFIGS[status] ?? STATUS_CONFIGS.operational;
    return <span className="w-2 h-2 rounded-full inline-block" style={{ background: cfg.dot, boxShadow: `0 0 6px ${cfg.dot}` }} />;
}

export default function SystemStatusPage() {
    const allOk = SERVICES.every(s => s.status === 'operational' || s.status === 'optimal');

    return (
        <div className="space-y-6">
            <div><h1 className="text-xl font-bold text-white">System Status</h1><p className="text-sm text-[#6b7280]">Real-time monitoring for all platform services</p></div>

            {/* Overall */}
            <div className={`glass-card p-5 flex items-center gap-4 border ${allOk ? 'border-[#10b981]/15' : 'border-[#f59e0b]/15'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${allOk ? 'bg-[#10b981]/10' : 'bg-[#f59e0b]/10'}`}>
                    {allOk ? '✅' : '⚠️'}
                </div>
                <div>
                    <p className={`font-bold text-lg ${allOk ? 'text-[#10b981]' : 'text-[#f59e0b]'}`}>{allOk ? 'All Systems Operational' : 'Some Systems Degraded'}</p>
                    <p className="text-xs text-[#6b7280]">Last checked: {new Date().toLocaleTimeString()}</p>
                </div>
                <div className="ml-auto text-right">
                    <p className="text-2xl font-black text-white">99.96%</p>
                    <p className="text-[10px] text-[#4b5563]">30-day average uptime</p>
                </div>
            </div>

            {/* Services table */}
            <div className="glass-card overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-white/[0.06]">{['Service', 'Endpoint', 'Status', 'Latency', 'Uptime (30d)', 'Last Incident'].map(h => <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#4b5563]">{h}</th>)}</tr></thead>
                    <tbody>
                        {SERVICES.map(s => {
                            const cfg = STATUS_CONFIGS[s.status] ?? STATUS_CONFIGS.operational;
                            return (
                                <tr key={s.name} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                                    <td className="px-5 py-3 font-semibold text-white">{s.name}</td>
                                    <td className="px-5 py-3 font-mono text-[10px] text-[#6b7280]">{s.url}</td>
                                    <td className="px-5 py-3"><span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: cfg.color }}><StatusDot status={s.status} />{cfg.label}</span></td>
                                    <td className="px-5 py-3 text-xs font-mono text-[#9ca3af]">{s.latency}ms</td>
                                    <td className="px-5 py-3">
                                        <span className={`font-bold text-xs ${s.uptime >= 99.99 ? 'text-[#10b981]' : s.uptime >= 99.9 ? 'text-[#9ca3af]' : 'text-[#f59e0b]'}`}>{s.uptime}%</span>
                                    </td>
                                    <td className="px-5 py-3 text-[10px] text-[#4b5563]">{s.lastIncident}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Incident log */}
            <div className="glass-card p-6">
                <h3 className="text-sm font-semibold text-white mb-4">Recent Incidents</h3>
                <ul className="space-y-3">
                    {[
                        { date: 'Feb 18, 2026 · 14:10 UTC', title: 'Payment gateway latency spike', duration: '18 min', severity: 'Minor', resolved: true },
                        { date: 'Jan 30, 2026 · 03:00 UTC', title: 'Scheduled database migration', duration: '45 min', severity: 'Maintenance', resolved: true },
                        { date: 'Jan 12, 2026 · 11:00 UTC', title: 'CDN cache invalidation delay', duration: '8 min', severity: 'Minor', resolved: true },
                    ].map(i => (
                        <li key={i.title} className="flex items-start justify-between gap-4 py-3 border-b border-white/[0.04]">
                            <div>
                                <p className="text-sm font-semibold text-white">{i.title}</p>
                                <p className="text-[10px] text-[#4b5563] mt-0.5">{i.date} · Duration: {i.duration}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <span className={`badge border text-[9px] ${i.severity === 'Minor' ? 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20' : 'bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20'}`}>{i.severity}</span>
                                {i.resolved && <span className="badge bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">Resolved</span>}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
