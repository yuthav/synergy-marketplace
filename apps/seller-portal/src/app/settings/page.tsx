'use client';
import { useState } from 'react';

type Tab = 'profile' | 'store' | 'notifications' | 'api' | 'danger';

export default function SettingsPage() {
    const [tab, setTab] = useState<Tab>('profile');
    const [profile, setProfile] = useState({ name: 'NeuralForge Labs', email: 'seller@neuralforge.ai', website: 'https://neuralforge.ai', bio: 'Enterprise AI tools and datasets.' });
    const [notifications, setNotifications] = useState({ newOrder: true, review: true, payout: true, platform: true, newsletter: false });
    const [apiKeys] = useState([{ id: 'k1', name: 'Production Key', key: 'sk_live_****...****', created: '2026-01-01', lastUsed: '2026-03-04' }]);
    const TABS: { id: Tab; label: string }[] = [
        { id: 'profile', label: 'Profile' }, { id: 'store', label: 'Store' },
        { id: 'notifications', label: 'Notifications' }, { id: 'api', label: 'API Keys' }, { id: 'danger', label: 'Danger Zone' },
    ];

    return (
        <div className="max-w-2xl space-y-6">
            <div><h1 className="text-xl font-bold text-white">Settings</h1><p className="text-sm text-[#6b7280]">Manage your account preferences</p></div>
            <div className="flex gap-1 border-b border-white/[0.06]">
                {TABS.map(t => <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === t.id ? 'border-[#3b82f6] text-white' : 'border-transparent text-[#6b7280] hover:text-white'}`}>{t.label}</button>)}
            </div>

            {tab === 'profile' && (
                <div className="glass-card p-6 space-y-4">
                    <h3 className="font-semibold text-white">Account Details</h3>
                    <div><label className="block text-xs text-[#9ca3af] mb-1.5">Display Name</label><input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} className="input" /></div>
                    <div><label className="block text-xs text-[#9ca3af] mb-1.5">Business Email</label><input type="email" value={profile.email} className="input opacity-60" disabled /></div>
                    <div><label className="block text-xs text-[#9ca3af] mb-1.5">Bio</label><textarea value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} rows={3} className="input resize-none" /></div>
                    <button className="btn-primary h-10 px-5 text-sm">Save Changes</button>
                </div>
            )}

            {tab === 'store' && (
                <div className="glass-card p-6 space-y-4">
                    <h3 className="font-semibold text-white">Store Settings</h3>
                    <div><label className="block text-xs text-[#9ca3af] mb-1.5">Store URL</label><div className="flex"><span className="flex items-center px-3 border border-r-0 border-white/[0.08] rounded-l-xl bg-white/[0.02] text-xs text-[#6b7280]">synergetics.ai/store/</span><input defaultValue="neuralforge" className="input rounded-l-none flex-1" /></div></div>
                    <div><label className="block text-xs text-[#9ca3af] mb-1.5">Website</label><input value={profile.website} onChange={e => setProfile(p => ({ ...p, website: e.target.value }))} className="input" /></div>
                    <div className="glass-card p-5 border-dashed text-center cursor-pointer">
                        <span className="text-3xl">🏪</span>
                        <p className="text-sm font-medium text-white mt-2">Upload Store Logo</p>
                        <p className="text-xs text-[#4b5563]">PNG or SVG, min 200×200px</p>
                        <button className="btn-secondary h-8 px-4 text-xs mt-2">Choose Image</button>
                    </div>
                    <button className="btn-primary h-10 px-5 text-sm">Save Store Settings</button>
                </div>
            )}

            {tab === 'notifications' && (
                <div className="glass-card p-6 space-y-4">
                    <h3 className="font-semibold text-white">Email Notifications</h3>
                    {Object.entries(notifications).map(([key, val]) => (
                        <div key={key} className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                            <div>
                                <p className="text-sm font-medium text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                <p className="text-[10px] text-[#4b5563]">{key === 'newOrder' ? 'When a customer purchases your listing' : key === 'review' ? 'When someone leaves a review' : key === 'payout' ? 'Payout confirmation and receipts' : key === 'platform' ? 'Updates from the Synergetics platform team' : 'Monthly newsletters and product updates'}</p>
                            </div>
                            <button onClick={() => setNotifications(p => ({ ...p, [key]: !val }))} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${val ? 'bg-[#3b82f6]' : 'bg-white/[0.1]'}`}>
                                <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${val ? 'translate-x-4' : 'translate-x-0.5'}`} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'api' && (
                <div className="glass-card p-6 space-y-4">
                    <div className="flex items-center justify-between"><h3 className="font-semibold text-white">API Keys</h3><button className="btn-primary h-9 px-4 text-xs">+ Generate Key</button></div>
                    {apiKeys.map(k => (
                        <div key={k.id} className="glass-card p-4 space-y-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-white">{k.name}</p>
                                <button className="text-xs text-[#ef4444]">Revoke</button>
                            </div>
                            <p className="font-mono text-xs text-[#6b7280]">{k.key}</p>
                            <div className="flex gap-4 text-[10px] text-[#4b5563]">
                                <span>Created: {k.created}</span><span>Last used: {k.lastUsed}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'danger' && (
                <div className="space-y-4">
                    <div className="glass-card p-6 border border-[#ef4444]/20 space-y-3">
                        <h3 className="font-semibold text-[#ef4444]">Danger Zone</h3>
                        <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                            <div><p className="text-sm font-medium text-white">Suspend Account</p><p className="text-xs text-[#6b7280]">Temporarily hide all your listings from the marketplace</p></div>
                            <button className="h-9 px-4 rounded-xl border border-[#f59e0b]/30 text-[#f59e0b] text-sm hover:bg-[#f59e0b]/10 transition-colors">Suspend</button>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <div><p className="text-sm font-medium text-white">Delete Account</p><p className="text-xs text-[#6b7280]">Permanently delete all listings and data. This cannot be undone.</p></div>
                            <button className="h-9 px-4 rounded-xl border border-[#ef4444]/30 text-[#ef4444] text-sm hover:bg-[#ef4444]/10 transition-colors">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
