'use client';
import { useState } from 'react';

const ANNOUNCEMENTS = [
    { id: 'an1', title: 'Platform Upgrade v2.1', targets: ['All Users'], channel: 'in-app + email', sentAt: '2026-03-01 08:00', status: 'sent', reach: 12890 },
    { id: 'an2', title: 'New API rate limits for Platinum Tier', targets: ['Merchants'], channel: 'email', sentAt: '2026-02-28 10:00', status: 'sent', reach: 45 },
    { id: 'an3', title: 'Scheduled maintenance - March 10', targets: ['All Users'], channel: 'in-app + email + banner', sentAt: '2026-02-25 09:00', status: 'sent', reach: 12890 },
];

const TEMPLATES = [
    'System Maintenance Notice', 'Policy Update', 'New Feature Announcement', 'Merchant Tier Upgrade', 'Payout Schedule Update',
];

export default function CommunicationsPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [targets, setTargets] = useState<string[]>(['all_users']);
    const [channels, setChannels] = useState<string[]>(['in_app']);
    const [sent, setSent] = useState(false);

    const toggleTarget = (t: string) => setTargets(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);
    const toggleChannel = (c: string) => setChannels(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);

    return (
        <div className="space-y-6">
            <div><h1 className="text-xl font-bold text-white">Communications</h1><p className="text-sm text-[#6b7280]">Send announcements to merchants and users</p></div>

            {/* Compose */}
            <div className="glass-card p-6 space-y-4">
                <h3 className="font-semibold text-white">New Announcement</h3>

                {/* Templates */}
                <div>
                    <label className="block text-xs text-[#9ca3af] mb-2">Quick Templates</label>
                    <div className="flex flex-wrap gap-2">
                        {TEMPLATES.map(t => <button key={t} onClick={() => setTitle(t)} className="px-2.5 py-1 rounded-lg text-[10px] border border-white/[0.07] text-[#6b7280] hover:text-white hover:border-white/[0.15] transition-colors">{t}</button>)}
                    </div>
                </div>

                <div><label className="block text-xs text-[#9ca3af] mb-1.5">Subject *</label><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Announcement subject..." className="input" /></div>
                <div><label className="block text-xs text-[#9ca3af] mb-1.5">Message *</label><textarea value={content} onChange={e => setContent(e.target.value)} rows={4} placeholder="Write your message..." className="input resize-none" /></div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-[#9ca3af] mb-2">Target Audience</label>
                        <div className="space-y-1.5">
                            {[{ id: 'all_users', label: 'All Users (12.9k)' }, { id: 'merchants', label: 'Merchants (156)' }, { id: 'buyers', label: 'Buyers (12.7k)' }].map(t => (
                                <label key={t.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors text-sm ${targets.includes(t.id) ? 'border-[#3b82f6]/40 bg-[#3b82f6]/[0.07] text-white' : 'border-white/[0.06] text-[#6b7280] hover:border-white/[0.12]'}`}>
                                    <input type="checkbox" checked={targets.includes(t.id)} onChange={() => toggleTarget(t.id)} className="accent-[#3b82f6] w-3.5 h-3.5" />
                                    {t.label}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-[#9ca3af] mb-2">Channels</label>
                        <div className="space-y-1.5">
                            {[{ id: 'in_app', label: '🔔 In-App Banner' }, { id: 'email', label: '📧 Email' }, { id: 'push', label: '📱 Push Notification' }].map(c => (
                                <label key={c.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors text-sm ${channels.includes(c.id) ? 'border-[#f59e0b]/40 bg-[#f59e0b]/[0.05] text-white' : 'border-white/[0.06] text-[#6b7280] hover:border-white/[0.12]'}`}>
                                    <input type="checkbox" checked={channels.includes(c.id)} onChange={() => toggleChannel(c.id)} className="accent-[#f59e0b] w-3.5 h-3.5" />
                                    {c.label}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {sent ? (
                    <div className="glass-card p-4 border border-[#10b981]/20 bg-[#10b981]/[0.03]"><p className="text-sm text-[#10b981]">✓ Announcement sent successfully!</p></div>
                ) : (
                    <div className="flex gap-3">
                        <button className="btn-secondary h-10 px-4 text-sm">Schedule</button>
                        <button onClick={() => setSent(true)} disabled={!title || !content} className="btn-primary h-10 px-5 text-sm disabled:opacity-40">Send Now</button>
                    </div>
                )}
            </div>

            {/* History */}
            <div className="glass-card overflow-hidden">
                <div className="px-6 py-4 border-b border-white/[0.06]"><h3 className="text-sm font-semibold text-white">Recent Announcements</h3></div>
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-white/[0.04]">{['Title', 'Targets', 'Channel', 'Sent', 'Reach'].map(h => <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#4b5563]">{h}</th>)}</tr></thead>
                    <tbody>
                        {ANNOUNCEMENTS.map(a => (
                            <tr key={a.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                                <td className="px-5 py-3 font-medium text-white">{a.title}</td>
                                <td className="px-5 py-3"><div className="flex gap-1">{a.targets.map(t => <span key={t} className="badge border border-white/[0.07] bg-white/[0.03] text-[#6b7280]">{t}</span>)}</div></td>
                                <td className="px-5 py-3 text-xs text-[#6b7280]">{a.channel}</td>
                                <td className="px-5 py-3 text-xs text-[#4b5563]">{a.sentAt}</td>
                                <td className="px-5 py-3 font-bold text-white">{a.reach.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
