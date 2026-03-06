'use client';
import { useState } from 'react';

const STEPS = ['Basic Info', 'Pricing', 'Media', 'Files & Docs', 'Review & Publish'];
const CATEGORIES = ['AI Agents', 'Digital Assets', 'Templates', 'Datasets', 'APIs', 'SaaS Tools'];
const PRICING_TYPES = [
    { id: 'one_time', label: 'One-Time', icon: '💰', desc: 'Customer pays once and keeps it forever' },
    { id: 'subscription', label: 'Subscription', icon: '🔄', desc: 'Monthly or yearly recurring billing' },
    { id: 'usage', label: 'Usage-Based', icon: '⚡', desc: 'Pay per API call or usage unit' },
    { id: 'free', label: 'Free', icon: '🎁', desc: 'Free with optional paid upgrades' },
];

export default function NewListingPage() {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState({ title: '', category: '', tags: '', description: '', pricingType: 'one_time', price: '', period: 'monthly', usageUnit: '', thumbnail: '', demoUrl: '', downloadType: 'file', repoUrl: '', apiEndpoint: '', docUrl: '' });
    const [done, setDone] = useState(false);
    const u = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div><h1 className="text-xl font-bold text-white">Create New Listing</h1><p className="text-sm text-[#6b7280]">5 steps to publish your product</p></div>

            {/* Stepper */}
            <div className="flex overflow-x-auto gap-1 pb-1">
                {STEPS.map((s, i) => (
                    <div key={s} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg shrink-0 text-xs font-medium transition-colors ${i === step ? 'bg-[#3b82f6]/15 text-[#3b82f6]' : i < step ? 'text-[#10b981]' : 'text-[#4b5563]'}`}>
                        <span>{i < step ? '✓' : i + 1}</span><span>{s}</span>
                    </div>
                ))}
            </div>

            {done ? (
                <div className="glass-card p-10 text-center space-y-4">
                    <div className="text-5xl">🚀</div>
                    <h2 className="text-xl font-bold text-white">Listing Submitted!</h2>
                    <p className="text-[#9ca3af]">Your listing is under review. It typically goes live within 24 hours.</p>
                    <div className="flex justify-center gap-3">
                        <a href="/listings" className="btn-primary h-10 px-5 text-sm">View All Listings</a>
                        <a href="/listings/new" className="btn-secondary h-10 px-5 text-sm">Create Another</a>
                    </div>
                </div>
            ) : (
                <div className="glass-card p-7 space-y-5">
                    {step === 0 && (
                        <>
                            <h2 className="font-bold text-white">Basic Information</h2>
                            <div><label className="block text-xs text-[#9ca3af] mb-1.5">Listing Title *</label><input value={form.title} onChange={e => u('title', e.target.value)} placeholder="e.g. AutoCodeAgent Pro" className="input" /></div>
                            <div><label className="block text-xs text-[#9ca3af] mb-1.5">Category *</label><select value={form.category} onChange={e => u('category', e.target.value)} className="input"><option value="">Select category</option>{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                            <div><label className="block text-xs text-[#9ca3af] mb-1.5">Tags (comma-separated)</label><input value={form.tags} onChange={e => u('tags', e.target.value)} placeholder="GPT-4, Code Generation, API" className="input" /></div>
                            <div><label className="block text-xs text-[#9ca3af] mb-1.5">Description *</label><textarea value={form.description} onChange={e => u('description', e.target.value)} placeholder="Describe your product in detail (min 100 characters)..." rows={6} className="input resize-none" /></div>
                        </>
                    )}

                    {step === 1 && (
                        <>
                            <h2 className="font-bold text-white">Pricing</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {PRICING_TYPES.map(pt => (
                                    <label key={pt.id} className={`flex flex-col gap-1 p-4 rounded-xl border cursor-pointer transition-all ${form.pricingType === pt.id ? 'border-[#3b82f6]/50 bg-[#3b82f6]/[0.07]' : 'border-white/[0.06] hover:border-white/[0.12]'}`}>
                                        <input type="radio" name="pricingType" value={pt.id} checked={form.pricingType === pt.id} onChange={() => u('pricingType', pt.id)} className="sr-only" />
                                        <span className="text-xl">{pt.icon}</span>
                                        <span className="font-semibold text-white text-sm">{pt.label}</span>
                                        <span className="text-[10px] text-[#4b5563]">{pt.desc}</span>
                                    </label>
                                ))}
                            </div>
                            {form.pricingType !== 'free' && (
                                <div className="flex gap-4">
                                    <div className="flex-1"><label className="block text-xs text-[#9ca3af] mb-1.5">Price (USD) *</label><input type="number" value={form.price} onChange={e => u('price', e.target.value)} placeholder="49" className="input" /></div>
                                    {form.pricingType === 'subscription' && <div className="flex-1"><label className="block text-xs text-[#9ca3af] mb-1.5">Billing Period</label><select value={form.period} onChange={e => u('period', e.target.value)} className="input"><option value="monthly">Monthly</option><option value="yearly">Yearly</option></select></div>}
                                    {form.pricingType === 'usage' && <div className="flex-1"><label className="block text-xs text-[#9ca3af] mb-1.5">Per Unit</label><input value={form.usageUnit} onChange={e => u('usageUnit', e.target.value)} placeholder="e.g. per API call" className="input" /></div>}
                                </div>
                            )}
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h2 className="font-bold text-white">Media</h2>
                            <div className="glass-card p-5 border-dashed text-center cursor-pointer hover:border-white/[0.2] transition-colors">
                                <span className="text-4xl">🖼️</span>
                                <p className="text-sm font-medium text-white mt-2">Upload Thumbnail</p>
                                <p className="text-xs text-[#4b5563] mt-1">PNG or JPG, min 400×400px. Used on listing card.</p>
                                <button className="btn-secondary h-8 px-4 text-xs mt-3">Choose Image</button>
                            </div>
                            <div><label className="block text-xs text-[#9ca3af] mb-1.5">Demo / Preview Video URL (optional)</label><input value={form.demoUrl} onChange={e => u('demoUrl', e.target.value)} placeholder="https://youtube.com/watch?v=..." className="input" /></div>
                            <div className="glass-card p-5 border-dashed text-center cursor-pointer hover:border-white/[0.2] transition-colors">
                                <span className="text-4xl">📸</span>
                                <p className="text-sm font-medium text-white mt-2">Upload Screenshots (up to 6)</p>
                                <p className="text-xs text-[#4b5563] mt-1">Show your product in action</p>
                                <button className="btn-secondary h-8 px-4 text-xs mt-3">Choose Files</button>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <h2 className="font-bold text-white">Files & Documentation</h2>
                            <div>
                                <label className="block text-xs text-[#9ca3af] mb-2">Delivery Type *</label>
                                <div className="flex gap-3">
                                    {['file', 'api', 'repo'].map(dt => (
                                        <label key={dt} className={`flex-1 flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-sm capitalize transition-all ${form.downloadType === dt ? 'border-[#3b82f6]/50 bg-[#3b82f6]/[0.07] text-white font-medium' : 'border-white/[0.06] text-[#6b7280] hover:border-white/[0.12]'}`}>
                                            <input type="radio" name="downloadType" value={dt} checked={form.downloadType === dt} onChange={() => u('downloadType', dt)} className="sr-only" />
                                            {dt === 'file' ? '📁 File Download' : dt === 'api' ? '⚡ API Access' : '🔗 Git Repo'}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            {form.downloadType === 'file' && <div className="glass-card p-5 border-dashed text-center cursor-pointer"><span className="text-3xl">📦</span><p className="text-sm font-medium text-white mt-2">Upload Deliverable File</p><p className="text-xs text-[#4b5563] mt-1">ZIP, PDF, or any format. Max 500MB.</p><button className="btn-secondary h-8 px-4 text-xs mt-3">Choose File</button></div>}
                            {form.downloadType === 'api' && <div><label className="block text-xs text-[#9ca3af] mb-1.5">API Endpoint Base URL</label><input value={form.apiEndpoint} onChange={e => u('apiEndpoint', e.target.value)} placeholder="https://api.yourservice.com/v1" className="input" /></div>}
                            {form.downloadType === 'repo' && <div><label className="block text-xs text-[#9ca3af] mb-1.5">Repository URL</label><input value={form.repoUrl} onChange={e => u('repoUrl', e.target.value)} placeholder="https://github.com/org/repo" className="input" /></div>}
                            <div><label className="block text-xs text-[#9ca3af] mb-1.5">Documentation URL (optional)</label><input value={form.docUrl} onChange={e => u('docUrl', e.target.value)} placeholder="https://docs.yoursite.com" className="input" /></div>
                        </>
                    )}

                    {step === 4 && (
                        <>
                            <h2 className="font-bold text-white">Review & Publish</h2>
                            <div className="space-y-3">
                                {[
                                    { label: 'Title', val: form.title || '—' },
                                    { label: 'Category', val: form.category || '—' },
                                    { label: 'Price', val: form.pricingType === 'free' ? 'Free' : form.price ? `$${form.price}` : '—' },
                                    { label: 'Delivery', val: form.downloadType },
                                ].map(r => (
                                    <div key={r.label} className="flex justify-between py-2 border-b border-white/[0.04] text-sm">
                                        <span className="text-[#6b7280]">{r.label}</span>
                                        <span className="font-medium text-white">{r.val}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="glass-card p-4 border border-[#3b82f6]/15 bg-[#3b82f6]/[0.04]">
                                <p className="text-xs text-[#60a5fa]">ℹ Your listing will go through a quick review (usually &lt;24h) before going live on the marketplace.</p>
                            </div>
                        </>
                    )}

                    <div className="flex gap-3 pt-2">
                        {step > 0 && <button onClick={() => setStep(s => s - 1)} className="btn-secondary h-11 px-5 text-sm">← Back</button>}
                        <button onClick={() => { if (step < STEPS.length - 1) setStep(s => s + 1); else setDone(true); }} className="btn-primary flex-1 h-11 text-sm">
                            {step < STEPS.length - 1 ? 'Continue →' : 'Submit for Review'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
