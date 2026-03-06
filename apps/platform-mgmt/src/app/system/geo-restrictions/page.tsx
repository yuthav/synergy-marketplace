'use client';
import { useState } from 'react';

const COUNTRY_FLAGS: Record<string, string> = { US: '🇺🇸', GB: '🇬🇧', DE: '🇩🇪', FR: '🇫🇷', CN: '🇨🇳', RU: '🇷🇺', KP: '🇰🇵', IR: '🇮🇷', SY: '🇸🇾', CU: '🇨🇺', VE: '🇻🇪' };

const INITIAL_RESTRICTIONS = [
    { country: 'North Korea', code: 'KP', portals: ['marketplace', 'seller'], reason: 'OFAC Sanction' },
    { country: 'Iran', code: 'IR', portals: ['marketplace', 'seller', 'platform'], reason: 'OFAC Sanction' },
    { country: 'Syria', code: 'SY', portals: ['marketplace', 'seller'], reason: 'OFAC Sanction' },
    { country: 'Cuba', code: 'CU', portals: ['marketplace'], reason: 'Regulatory Compliance' },
];

const COUNTRIES = [
    { name: 'China', code: 'CN' }, { name: 'Russia', code: 'RU' }, { name: 'Venezuela', code: 'VE' },
    { name: 'Sudan', code: 'SD' }, { name: 'Belarus', code: 'BY' },
];

export default function GeoRestrictionsPage() {
    const [restrictions, setRestrictions] = useState(INITIAL_RESTRICTIONS);
    const [newCountry, setNewCountry] = useState('');
    const [newCode, setNewCode] = useState('');
    const [newPortals, setNewPortals] = useState<string[]>(['marketplace']);
    const [newReason, setNewReason] = useState('');

    const add = () => {
        if (!newCountry || !newCode) return;
        setRestrictions(prev => [...prev, { country: newCountry, code: newCode.toUpperCase(), portals: newPortals, reason: newReason }]);
        setNewCountry(''); setNewCode(''); setNewPortals(['marketplace']); setNewReason('');
    };

    const remove = (code: string) => setRestrictions(prev => prev.filter(r => r.code !== code));

    const togglePortal = (portal: string) => setNewPortals(prev => prev.includes(portal) ? prev.filter(p => p !== portal) : [...prev, portal]);

    return (
        <div className="max-w-3xl space-y-6">
            <div><h1 className="text-xl font-bold text-white">Geo-Restrictions</h1><p className="text-sm text-[#6b7280]">Block portal access by country for regulatory compliance</p></div>

            {/* Active Restrictions */}
            <div className="glass-card overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">Active Restrictions ({restrictions.length})</h3>
                    <span className="badge bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20">{restrictions.length} countries blocked</span>
                </div>
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-white/[0.04]">{['Country', 'Portals Blocked', 'Reason', 'Action'].map(h => <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#4b5563]">{h}</th>)}</tr></thead>
                    <tbody>
                        {restrictions.map(r => (
                            <tr key={r.code} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                                <td className="px-5 py-3 font-medium text-white">{COUNTRY_FLAGS[r.code] ?? '🌍'} {r.country} <span className="text-[10px] text-[#4b5563] ml-1">{r.code}</span></td>
                                <td className="px-5 py-3"><div className="flex gap-1">{r.portals.map(p => <span key={p} className="badge border border-white/[0.07] bg-white/[0.03] text-[#6b7280] capitalize">{p.replace('-', ' ')}</span>)}</div></td>
                                <td className="px-5 py-3 text-xs text-[#6b7280]">{r.reason}</td>
                                <td className="px-5 py-3"><button onClick={() => remove(r.code)} className="text-xs text-[#ef4444] hover:text-red-300">Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Restriction */}
            <div className="glass-card p-6 space-y-4">
                <h3 className="font-semibold text-white">Add Restriction</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-xs text-[#9ca3af] mb-1.5">Country Name *</label><input value={newCountry} onChange={e => setNewCountry(e.target.value)} placeholder="e.g. China" className="input" /></div>
                    <div><label className="block text-xs text-[#9ca3af] mb-1.5">ISO Code *</label><input value={newCode} onChange={e => setNewCode(e.target.value.toUpperCase())} placeholder="CN" maxLength={2} className="input font-mono" /></div>
                </div>
                <div>
                    <label className="block text-xs text-[#9ca3af] mb-2">Portals to Block</label>
                    <div className="flex gap-2">
                        {['marketplace', 'seller', 'platform'].map(p => (
                            <button key={p} onClick={() => togglePortal(p)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors border ${newPortals.includes(p) ? 'border-[#ef4444]/40 bg-[#ef4444]/10 text-[#ef4444]' : 'border-white/[0.07] text-[#6b7280] hover:border-white/[0.15]'}`}>{p}</button>
                        ))}
                    </div>
                </div>
                <div><label className="block text-xs text-[#9ca3af] mb-1.5">Reason</label><input value={newReason} onChange={e => setNewReason(e.target.value)} placeholder="OFAC Sanction / Regulatory Compliance..." className="input" /></div>
                <button onClick={add} disabled={!newCountry || !newCode} className="btn-primary h-10 px-5 text-sm disabled:opacity-40" style={{ background: 'linear-gradient(to right, #f59e0b, #ef4444)', color: '#0a0a1a' }}>Add Restriction</button>
            </div>

            {/* Suggested */}
            <div className="glass-card p-5">
                <h3 className="text-sm font-semibold text-white mb-3">Suggested (Common Compliance)</h3>
                <div className="flex flex-wrap gap-2">
                    {COUNTRIES.filter(c => !restrictions.find(r => r.code === c.code)).map(c => (
                        <button key={c.code} onClick={() => { setNewCountry(c.name); setNewCode(c.code); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-white/[0.07] text-[#6b7280] hover:border-white/[0.15] hover:text-white transition-colors">
                            {COUNTRY_FLAGS[c.code] ?? '🌍'} {c.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
