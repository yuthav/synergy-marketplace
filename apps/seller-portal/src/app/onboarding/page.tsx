'use client';
import { useState } from 'react';

const STEPS = [
    { id: 'business', label: 'Business Info' },
    { id: 'identity', label: 'Identity' },
    { id: 'banking', label: 'Payouts' },
    { id: 'agree', label: 'Agreement' },
];

export default function OnboardingPage() {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState({ businessName: '', regNumber: '', country: 'US', website: '', taxId: '', bankName: '', accountNumber: '', routingNumber: '', agreed: false });
    const [done, setDone] = useState(false);
    const update = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }));

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-xl font-bold text-white">Seller Onboarding (KYB)</h1>
                <p className="text-sm text-[#6b7280] mt-0.5">Complete verification to start selling on Synergetics.ai</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center">
                {STEPS.map((s, i) => (
                    <div key={s.id} className="flex items-center flex-1">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shrink-0 transition-all ${i < step + (done ? 1 : 0) ? 'bg-[#10b981] text-white' : i === step && !done ? 'bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] text-white' : 'border border-white/[0.12] text-[#4b5563]'}`}>
                            {i < step + (done ? 1 : 0) ? '✓' : i + 1}
                        </div>
                        <div className="ml-2 hidden sm:block flex-1">
                            <p className={`text-xs font-medium truncate ${i === step && !done ? 'text-white' : 'text-[#4b5563]'}`}>{s.label}</p>
                        </div>
                        {i < STEPS.length - 1 && <div className="flex-1 h-px bg-white/[0.06] mx-3" />}
                    </div>
                ))}
            </div>

            {done ? (
                <div className="glass-card p-10 text-center space-y-4">
                    <div className="text-5xl">🎉</div>
                    <h2 className="text-xl font-bold text-white">KYB Submitted!</h2>
                    <p className="text-[#9ca3af]">Your application is under review. We&apos;ll notify you within 1–2 business days.</p>
                    <a href="/" className="btn-primary h-11 px-6 inline-flex">Go to Dashboard</a>
                </div>
            ) : (
                <div className="glass-card p-7 space-y-5">
                    {step === 0 && (
                        <>
                            <h2 className="text-base font-bold text-white">Business Information</h2>
                            <div><label className="block text-xs text-[#9ca3af] mb-1.5">Legal Business Name *</label><input value={form.businessName} onChange={e => update('businessName', e.target.value)} placeholder="Acme Corp Ltd." className="input" /></div>
                            <div><label className="block text-xs text-[#9ca3af] mb-1.5">Registration Number *</label><input value={form.regNumber} onChange={e => update('regNumber', e.target.value)} placeholder="e.g. 12345678" className="input" /></div>
                            <div><label className="block text-xs text-[#9ca3af] mb-1.5">Country of Incorporation *</label>
                                <select value={form.country} onChange={e => update('country', e.target.value)} className="input">
                                    {['US', 'GB', 'IN', 'DE', 'CA', 'AU', 'SG', 'AE'].map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div><label className="block text-xs text-[#9ca3af] mb-1.5">Website</label><input value={form.website} onChange={e => update('website', e.target.value)} placeholder="https://yourstore.com" className="input" /></div>
                        </>
                    )}

                    {step === 1 && (
                        <>
                            <h2 className="text-base font-bold text-white">Identity Verification</h2>
                            <div><label className="block text-xs text-[#9ca3af] mb-1.5">Tax ID / EIN (optional)</label><input value={form.taxId} onChange={e => update('taxId', e.target.value)} placeholder="XX-XXXXXXX" className="input" /></div>
                            <div className="glass-card p-5 border-dashed text-center cursor-pointer hover:border-white/[0.2] transition-colors">
                                <span className="text-3xl">📄</span>
                                <p className="text-sm font-medium text-white mt-2">Upload Government ID</p>
                                <p className="text-xs text-[#4b5563] mt-1">Passport, Driver&apos;s License, or National ID. Max 10MB.</p>
                                <button className="btn-secondary h-8 px-4 text-xs mt-3">Choose File</button>
                            </div>
                            <div className="glass-card p-5 border-dashed text-center cursor-pointer hover:border-white/[0.2] transition-colors">
                                <span className="text-3xl">🏢</span>
                                <p className="text-sm font-medium text-white mt-2">Upload Business Registration Certificate</p>
                                <p className="text-xs text-[#4b5563] mt-1">Official certificate. Max 10MB.</p>
                                <button className="btn-secondary h-8 px-4 text-xs mt-3">Choose File</button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h2 className="text-base font-bold text-white">Payout Account</h2>
                            <div><label className="block text-xs text-[#9ca3af] mb-1.5">Bank Name</label><input value={form.bankName} onChange={e => update('bankName', e.target.value)} placeholder="e.g. Chase Bank" className="input" /></div>
                            <div><label className="block text-xs text-[#9ca3af] mb-1.5">Account Number</label><input value={form.accountNumber} onChange={e => update('accountNumber', e.target.value)} placeholder="••••••••" type="password" className="input" /></div>
                            <div><label className="block text-xs text-[#9ca3af] mb-1.5">Routing / SWIFT / IBAN</label><input value={form.routingNumber} onChange={e => update('routingNumber', e.target.value)} placeholder="e.g. 021000021" className="input" /></div>
                            <div className="glass-card p-4 border border-[#f59e0b]/20 bg-[#f59e0b]/[0.04]">
                                <p className="text-xs text-[#f59e0b]">⚠ Your banking details are encrypted and only accessible to our compliance team.</p>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <h2 className="text-base font-bold text-white">Merchant Agreement</h2>
                            <div className="glass-card p-5 h-48 overflow-y-auto text-xs text-[#6b7280] space-y-3">
                                <p className="font-semibold text-white">Synergetics.ai Merchant Terms of Service</p>
                                <p>By becoming a seller on Synergetics.ai, you agree to our platform fee structure, content policies, and payout schedule. Platform fees are deducted automatically from each transaction based on your merchant tier...</p>
                                <p>You agree to only list digital products that you own the rights to sell. Listing counterfeit or stolen content will result in immediate account termination and potential legal action...</p>
                                <p>Revenue share is calculated monthly. Payouts are processed within 5 business days of the 15th of each month...</p>
                            </div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" checked={form.agreed} onChange={e => update('agreed', e.target.checked)} className="mt-0.5 w-4 h-4 accent-[#3b82f6]" />
                                <span className="text-sm text-[#9ca3af]">I have read and agree to the <a href="#" className="text-[#3b82f6] hover:underline">Merchant Terms of Service</a> and <a href="#" className="text-[#3b82f6] hover:underline">Privacy Policy</a>.</span>
                            </label>
                        </>
                    )}

                    <div className="flex gap-3 pt-2">
                        {step > 0 && <button onClick={() => setStep(s => s - 1)} className="btn-secondary h-11 px-5 text-sm">← Back</button>}
                        <button
                            onClick={() => { if (step < STEPS.length - 1) setStep(s => s + 1); else setDone(true); }}
                            disabled={step === 3 && !form.agreed}
                            className="btn-primary flex-1 h-11 text-sm disabled:opacity-40"
                        >
                            {step < STEPS.length - 1 ? 'Continue →' : 'Submit KYB Application'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
