'use client';
import { useState } from 'react';

export default function MaintenancePage() {
    const [marketplace, setMarketplace] = useState(false);
    const [sellerPortal, setSellerPortal] = useState(false);
    const [message, setMessage] = useState('');
    const [scheduledEnd, setScheduledEnd] = useState('');
    const [saved, setSaved] = useState(false);

    const Toggle = ({ label, desc, val, onChange }: { label: string; desc: string; val: boolean; onChange: () => void }) => (
        <div className="flex items-center justify-between py-4 border-b border-white/[0.04]">
            <div>
                <p className="font-semibold text-white">{label}</p>
                <p className="text-xs text-[#6b7280] mt-0.5">{desc}</p>
            </div>
            <button onClick={onChange} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${val ? 'bg-[#ef4444]' : 'bg-white/[0.1]'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${val ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
    );

    return (
        <div className="max-w-2xl space-y-6">
            <div>
                <h1 className="text-xl font-bold text-white">Maintenance Mode</h1>
                <p className="text-sm text-[#6b7280]">Enable maintenance mode to block public access during system updates</p>
            </div>

            {(marketplace || sellerPortal) && (
                <div className="glass-card p-4 border border-[#ef4444]/20 bg-[#ef4444]/[0.04]">
                    <p className="text-sm font-semibold text-[#ef4444]">⚠ Maintenance mode is ACTIVE</p>
                    <p className="text-xs text-[#6b7280] mt-1">
                        {marketplace && <span className="block">• Marketplace: Visitors will see the maintenance page</span>}
                        {sellerPortal && <span className="block">• Seller Portal: Sellers cannot access their dashboard</span>}
                    </p>
                </div>
            )}

            <div className="glass-card p-6 space-y-0">
                <Toggle label="Marketplace" desc="http://localhost:3000 — blocks all public visitors" val={marketplace} onChange={() => { setMarketplace(v => !v); setSaved(false); }} />
                <Toggle label="Seller Portal" desc="http://localhost:3001 — blocks all seller logins" val={sellerPortal} onChange={() => { setSellerPortal(v => !v); setSaved(false); }} />
            </div>

            <div className="glass-card p-6 space-y-4">
                <h3 className="font-semibold text-white">Maintenance Message</h3>
                <div><label className="block text-xs text-[#9ca3af] mb-1.5">Custom message (shown on maintenance page)</label><textarea value={message} onChange={e => { setMessage(e.target.value); setSaved(false); }} placeholder="We are performing scheduled maintenance. We'll be back soon!" rows={3} className="input resize-none" /></div>
                <div><label className="block text-xs text-[#9ca3af] mb-1.5">Scheduled End Time (optional)</label><input type="datetime-local" value={scheduledEnd} onChange={e => { setScheduledEnd(e.target.value); setSaved(false); }} className="input" /></div>
                <button onClick={() => setSaved(true)} className="btn-primary h-10 px-5 text-sm" style={{ background: saved ? undefined : 'linear-gradient(to right, #f59e0b, #ef4444)', color: '#0a0a1a' }}>
                    {saved ? '✓ Settings Saved' : 'Apply Maintenance Settings'}
                </button>
            </div>

            <div className="glass-card p-6 space-y-3">
                <h3 className="font-semibold text-white">Recent Maintenance Events</h3>
                {[
                    { label: 'Database Migration v3.2', period: 'Mar 1, 2026 · 2:00–3:45 AM UTC', type: 'Scheduled' },
                    { label: 'Payment Gateway Failover', period: 'Feb 18, 2026 · 14:10–14:28 UTC', type: 'Emergency' },
                ].map(e => (
                    <div key={e.label} className="flex items-center justify-between py-2 border-b border-white/[0.04] text-sm">
                        <div><p className="font-medium text-white">{e.label}</p><p className="text-xs text-[#4b5563]">{e.period}</p></div>
                        <span className={`badge border ${e.type === 'Scheduled' ? 'bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20' : 'bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/20'}`}>{e.type}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
