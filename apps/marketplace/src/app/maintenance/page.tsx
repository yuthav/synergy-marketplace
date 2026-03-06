export default function MaintenancePage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            {/* bg glows */}
            <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3b82f6]/[0.06] rounded-full blur-[120px]" />
                <div className="absolute right-1/4 bottom-1/4 w-64 h-64 bg-[#8b5cf6]/[0.06] rounded-full blur-[100px]" />
            </div>

            <div className="text-center max-w-md">
                {/* Animated icon */}
                <div className="mx-auto mb-8 w-24 h-24 rounded-3xl border border-[#3b82f6]/25 bg-[#3b82f6]/[0.07] flex items-center justify-center text-5xl" style={{ animation: 'spin 8s linear infinite' }}>
                    ⚙️
                </div>

                <span className="badge bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20 mb-6">System Maintenance</span>
                <h1 className="text-4xl font-black text-white mt-4">We&apos;ll be back soon</h1>
                <p className="text-[#9ca3af] mt-4 leading-relaxed">
                    The Synergetics.ai Marketplace is undergoing scheduled maintenance to bring you new features and improvements. We apologize for the inconvenience.
                </p>

                {/* Estimated time */}
                <div className="glass-card p-5 mt-8 text-center">
                    <p className="text-xs text-[#4b5563] uppercase tracking-wider mb-1">Estimated completion</p>
                    <p className="text-2xl font-bold text-white">~2 hours</p>
                    <p className="text-xs text-[#6b7280] mt-1">Started: March 10, 2026 · 02:00 UTC</p>
                </div>

                {/* Status */}
                <div className="mt-6 space-y-2 text-sm">
                    {[
                        { label: 'Database migration', status: 'complete' },
                        { label: 'Cache invalidation', status: 'complete' },
                        { label: 'Service deployment', status: 'in_progress' },
                        { label: 'Health checks', status: 'pending' },
                    ].map(s => (
                        <div key={s.label} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                            <span className={`text-base ${s.status === 'complete' ? 'text-[#10b981]' : s.status === 'in_progress' ? 'text-[#f59e0b]' : 'text-[#4b5563]'}`}>
                                {s.status === 'complete' ? '✓' : s.status === 'in_progress' ? '↻' : '○'}
                            </span>
                            <span className={`${s.status === 'complete' ? 'text-[#9ca3af]' : s.status === 'in_progress' ? 'text-white font-medium' : 'text-[#4b5563]'}`}>{s.label}</span>
                            <span className={`ml-auto text-[10px] font-semibold uppercase ${s.status === 'complete' ? 'text-[#10b981]' : s.status === 'in_progress' ? 'text-[#f59e0b]' : 'text-[#4b5563]'}`}>{s.status.replace('_', ' ')}</span>
                        </div>
                    ))}
                </div>

                <p className="text-xs text-[#4b5563] mt-8">
                    Follow <span className="text-[#3b82f6]">@SynergeticsAI</span> for live updates.
                </p>
            </div>
        </div>
    );
}
