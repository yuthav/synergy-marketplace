'use client';
import { useState } from 'react';

const PURCHASES = [
    { id: 'l1', title: 'AutoCodeAgent Pro', seller: 'NeuralForge Labs', orderId: 'SYN-A1B2', purchasedAt: '2026-03-04', color: '#3b82f6', icon: '🤖', type: 'Subscription' },
    { id: 'l3', title: 'PromptCraft Studio', seller: 'PromptWizards', orderId: 'SYN-C3D4', purchasedAt: '2026-02-28', color: '#8b5cf6', icon: '📋', type: 'One-time' },
    { id: 'l2', title: 'DataVault Enterprise', seller: 'CloudScale AI', orderId: 'SYN-E5F6', purchasedAt: '2026-02-15', color: '#14b8a6', icon: '📊', type: 'One-time' },
];

const WISHLIST = [
    { id: 'l5', title: 'VisionML Toolkit', price: 79, period: '/mo', color: '#10b981', icon: '🎨' },
    { id: 'l6', title: 'SentimentAI API', price: 19, period: '/mo', color: '#ec4899', icon: '💬' },
];

const SUBSCRIPTIONS = [
    { id: 'l1', title: 'AutoCodeAgent Pro', next: '2026-04-04', amount: 49, status: 'active', color: '#3b82f6' },
];

const SESSIONS = [
    { device: 'Chrome on Windows', location: 'Mumbai, IN', ip: '103.21.xxx.xxx', lastActive: '2026-03-05 09:25', current: true },
    { device: 'Safari on iPhone', location: 'Mumbai, IN', ip: '103.21.xxx.xxx', lastActive: '2026-03-04 22:10', current: false },
];

type Tab = 'library' | 'wishlist' | 'subscriptions' | 'security';

export default function ProfilePage() {
    const [tab, setTab] = useState<Tab>('library');
    const [name, setName] = useState('Alex Johnson');
    const [bio, setBio] = useState('Developer & AI enthusiast');
    const [saved, setSaved] = useState(false);

    const TABS: { id: Tab; label: string }[] = [
        { id: 'library', label: `Library (${PURCHASES.length})` },
        { id: 'wishlist', label: `Wishlist (${WISHLIST.length})` },
        { id: 'subscriptions', label: 'Subscriptions' },
        { id: 'security', label: 'Security' },
    ];

    return (
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10">
            {/* Profile Header */}
            <div className="glass-card p-7 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-2xl font-black text-white">AJ</div>
                <div className="flex-1 space-y-3">
                    <input value={name} onChange={e => { setName(e.target.value); setSaved(false); }} className="bg-transparent text-xl font-bold text-white border-b border-white/[0.06] focus:border-[#3b82f6] outline-none w-full pb-1" id="profile-name" />
                    <input value={bio} onChange={e => { setBio(e.target.value); setSaved(false); }} placeholder="Add a short bio..." className="bg-transparent text-sm text-[#6b7280] border-b border-white/[0.06] focus:border-[#3b82f6] outline-none w-full pb-1" id="profile-bio" />
                    <p className="text-xs text-[#4b5563]">buyer@test.com · Member since January 2025</p>
                </div>
                <button onClick={() => setSaved(true)} className={`btn-primary h-10 px-5 text-sm ${saved ? 'opacity-60' : ''}`}>
                    {saved ? '✓ Saved' : 'Save Changes'}
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                    { label: 'Purchases', value: PURCHASES.length },
                    { label: 'Wishlist', value: WISHLIST.length },
                    { label: 'Total Spent', value: '$267' },
                ].map(s => (
                    <div key={s.label} className="glass-card p-5 text-center">
                        <p className="text-2xl font-bold text-white">{s.value}</p>
                        <p className="text-xs text-[#6b7280] mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-white/[0.06] mb-6">
                {TABS.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === t.id ? 'border-[#3b82f6] text-white' : 'border-transparent text-[#6b7280] hover:text-white'}`}>
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Library */}
            {tab === 'library' && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {PURCHASES.map(p => (
                        <div key={p.id} className="glass-card p-5 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: `${p.color}20` }}>{p.icon}</div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-white truncate">{p.title}</p>
                                <p className="text-[10px] text-[#4b5563] mt-0.5">{p.seller} · {p.type}</p>
                                <p className="text-[10px] text-[#4b5563] mt-1">{p.orderId} · {p.purchasedAt}</p>
                                <div className="flex gap-2 mt-3">
                                    <a href="#" className="btn-primary h-7 px-3 text-[10px]">⬇ Download</a>
                                    <a href={`/listing/${p.id}`} className="btn-secondary h-7 px-3 text-[10px]">View</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Wishlist */}
            {tab === 'wishlist' && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {WISHLIST.map(w => (
                        <div key={w.id} className="glass-card p-5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: `${w.color}20` }}>{w.icon}</div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-white truncate">{w.title}</p>
                                <p className="text-base font-bold mt-0.5" style={{ color: w.color }}>${w.price}<span className="text-xs text-[#6b7280] font-normal">{w.period}</span></p>
                            </div>
                            <a href={`/listing/${w.id}`} className="btn-primary h-8 px-3 text-xs shrink-0">Buy</a>
                        </div>
                    ))}
                </div>
            )}

            {/* Subscriptions */}
            {tab === 'subscriptions' && (
                <div className="space-y-4">
                    {SUBSCRIPTIONS.map(s => (
                        <div key={s.id} className="glass-card p-5 flex items-center gap-5">
                            <div className="flex-1">
                                <p className="font-semibold text-white">{s.title}</p>
                                <p className="text-xs text-[#6b7280] mt-1">Next billing: {s.next} · ${s.amount}/month</p>
                            </div>
                            <span className="badge bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">{s.status}</span>
                            <button className="btn-secondary h-8 px-3 text-xs">Manage</button>
                        </div>
                    ))}
                    {SUBSCRIPTIONS.length === 0 && <p className="text-center text-[#6b7280] py-12">No active subscriptions.</p>}
                </div>
            )}

            {/* Security */}
            {tab === 'security' && (
                <div className="space-y-6 max-w-xl">
                    {/* Password */}
                    <div className="glass-card p-5 space-y-4">
                        <h3 className="font-semibold text-white">Change Password</h3>
                        <input type="password" placeholder="Current password" className="input" />
                        <input type="password" placeholder="New password" className="input" />
                        <input type="password" placeholder="Confirm new password" className="input" />
                        <button className="btn-primary h-10 px-5 text-sm">Update Password</button>
                    </div>

                    {/* 2FA */}
                    <div className="glass-card p-5 flex items-center justify-between">
                        <div><p className="font-semibold text-white">Two-Factor Authentication</p><p className="text-xs text-[#6b7280] mt-0.5">Add an extra layer of security to your account</p></div>
                        <button className="btn-primary h-9 px-4 text-sm">Enable 2FA</button>
                    </div>

                    {/* Sessions */}
                    <div className="glass-card p-5">
                        <h3 className="font-semibold text-white mb-4">Active Sessions</h3>
                        <ul className="space-y-3">
                            {SESSIONS.map((s, i) => (
                                <li key={i} className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-white">{s.device} {s.current && <span className="badge bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 ml-1">Current</span>}</p>
                                        <p className="text-[10px] text-[#4b5563] mt-0.5">{s.location} · {s.ip} · {s.lastActive}</p>
                                    </div>
                                    {!s.current && <button className="text-[10px] text-[#ef4444] hover:underline shrink-0">Revoke</button>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
