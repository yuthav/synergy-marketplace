'use client';
import { useState } from 'react';

const STEPS = ['Select Payment', 'Enter Details', 'Confirmation'];

const ITEMS = [
    { id: 'l1', title: 'AutoCodeAgent Pro', price: 49, period: '/mo', color: '#3b82f6' },
    { id: 'l3', title: 'PromptCraft Studio', price: 29, period: '', color: '#8b5cf6' },
];

const METHODS = [
    { id: 'stripe', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, Amex' },
    { id: 'eth', label: 'Ethereum', icon: '⟠', desc: 'Pay with ETH on mainnet/Base' },
    { id: 'usdc', label: 'USDC', icon: '💵', desc: 'Stablecoin on Ethereum or Solana' },
    { id: 'x402', label: 'x402 Protocol', icon: '⚡', desc: 'Micropayment protocol' },
];

export default function CheckoutPage() {
    const [step, setStep] = useState(0);
    const [method, setMethod] = useState('stripe');
    const [cardData, setCardData] = useState({ name: '', number: '', expiry: '', cvc: '' });
    const [done, setDone] = useState(false);
    const total = ITEMS.reduce((s, i) => s + i.price, 0);
    const orderId = `SYN-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const proceed = () => {
        if (step < STEPS.length - 1) setStep(s => s + 1);
        if (step === 1) setDone(true);
    };

    return (
        <div className="mx-auto max-w-2xl px-4 py-12">
            {/* Stepper */}
            <div className="flex items-center justify-center mb-10">
                {STEPS.map((s, i) => (
                    <div key={s} className="flex items-center">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${i < step + (done ? 1 : 0) ? 'bg-[#10b981] text-white' : i === step && !done ? 'bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] text-white' : 'border border-white/[0.12] text-[#4b5563]'}`}>
                            {i < step + (done ? 1 : 0) ? '✓' : i + 1}
                        </div>
                        <div className="ml-2 hidden sm:block">
                            <p className={`text-xs font-medium ${i === step && !done ? 'text-white' : 'text-[#4b5563]'}`}>{s}</p>
                        </div>
                        {i < STEPS.length - 1 && <div className="mx-4 w-16 h-px bg-white/[0.08]" />}
                    </div>
                ))}
            </div>

            {/* Confirmation */}
            {done ? (
                <div className="glass-card p-10 text-center space-y-5">
                    <div className="w-20 h-20 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-4xl mx-auto">✅</div>
                    <h1 className="text-2xl font-bold text-white">Payment Successful!</h1>
                    <p className="text-[#9ca3af]">Your order <span className="font-semibold text-white">{orderId}</span> has been placed. You now have instant access to your purchases.</p>
                    <div className="grid grid-cols-2 gap-3 pt-4">
                        <a href="/profile" className="btn-primary h-11 text-sm">Go to My Library</a>
                        <a href="/search" className="btn-secondary h-11 text-sm">Continue Shopping</a>
                    </div>
                    <p className="text-xs text-[#4b5563]">A receipt has been sent to your email.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {/* Step 1: Choose Method */}
                    {step === 0 && (
                        <div className="glass-card p-7 space-y-5">
                            <h2 className="text-lg font-bold text-white">Choose Payment Method</h2>
                            <div className="space-y-3">
                                {METHODS.map(m => (
                                    <label key={m.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${method === m.id ? 'border-[#3b82f6]/50 bg-[#3b82f6]/[0.07]' : 'border-white/[0.06] hover:border-white/[0.12]'}`}>
                                        <input type="radio" name="method" checked={method === m.id} onChange={() => setMethod(m.id)} className="sr-only" />
                                        <span className="text-2xl">{m.icon}</span>
                                        <div className="flex-1">
                                            <p className="font-semibold text-white text-sm">{m.label}</p>
                                            <p className="text-[10px] text-[#4b5563] mt-0.5">{m.desc}</p>
                                        </div>
                                        <div className={`w-4 h-4 rounded-full border-2 ${method === m.id ? 'border-[#3b82f6] bg-[#3b82f6]' : 'border-white/20'}`} />
                                    </label>
                                ))}
                            </div>
                            <button onClick={proceed} className="btn-primary w-full h-11 text-sm">Continue</button>
                        </div>
                    )}

                    {/* Step 2: Enter Details */}
                    {step === 1 && (
                        <div className="glass-card p-7 space-y-5">
                            <h2 className="text-lg font-bold text-white">
                                {method === 'stripe' ? '💳 Card Details' : method === 'eth' ? '⟠ Ethereum Payment' : method === 'usdc' ? '💵 USDC Payment' : '⚡ x402 Payment'}
                            </h2>

                            {method === 'stripe' && (
                                <div className="space-y-4">
                                    <div><label className="block text-xs text-[#9ca3af] mb-1.5">Name on Card</label><input value={cardData.name} onChange={e => setCardData(p => ({ ...p, name: e.target.value }))} placeholder="Alex Johnson" className="input" id="card-name" /></div>
                                    <div><label className="block text-xs text-[#9ca3af] mb-1.5">Card Number</label><input value={cardData.number} onChange={e => setCardData(p => ({ ...p, number: e.target.value }))} placeholder="4242 4242 4242 4242" className="input font-mono" id="card-number" /></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><label className="block text-xs text-[#9ca3af] mb-1.5">Expiry</label><input value={cardData.expiry} onChange={e => setCardData(p => ({ ...p, expiry: e.target.value }))} placeholder="MM/YY" className="input" /></div>
                                        <div><label className="block text-xs text-[#9ca3af] mb-1.5">CVC</label><input value={cardData.cvc} onChange={e => setCardData(p => ({ ...p, cvc: e.target.value }))} placeholder="•••" className="input" /></div>
                                    </div>
                                </div>
                            )}

                            {(method === 'eth' || method === 'usdc' || method === 'x402') && (
                                <div className="text-center py-8 space-y-4">
                                    <div className="w-32 h-32 mx-auto rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center">
                                        <div className="text-xs text-[#4b5563] text-center p-4">[QR Code for<br />{method.toUpperCase()}<br />Payment]</div>
                                    </div>
                                    <p className="text-sm text-[#9ca3af]">Send exactly <span className="font-bold text-white">${total} USD equivalent</span> to the address above.</p>
                                    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 font-mono text-xs text-[#60a5fa] break-all">0x742d35Cc6634C0532925a3b8D4C9E2d0f6E1234a</div>
                                    <p className="text-[10px] text-[#4b5563]">Payment verifies automatically on-chain. This page will refresh once confirmed.</p>
                                </div>
                            )}

                            <div className="border-t border-white/[0.06] pt-4 space-y-2 text-sm">
                                <div className="flex justify-between text-[#6b7280]"><span>Subtotal</span><span>${total}</span></div>
                                <div className="flex justify-between text-[#6b7280]"><span>Platform fee (5%)</span><span>${(total * 0.05).toFixed(2)}</span></div>
                                <div className="flex justify-between font-bold text-white text-base border-t border-white/[0.06] pt-2"><span>Total</span><span>${(total * 1.05).toFixed(2)}</span></div>
                            </div>

                            <div className="flex gap-3">
                                <button onClick={() => setStep(0)} className="btn-secondary h-11 px-5 text-sm">← Back</button>
                                <button onClick={proceed} className="btn-primary flex-1 h-11 text-sm">Pay ${(total * 1.05).toFixed(2)}</button>
                            </div>
                        </div>
                    )}

                    {/* Order Summary Sidebar Always Visible */}
                    <div className="glass-card p-5">
                        <h3 className="text-sm font-semibold text-white mb-3">Order Summary</h3>
                        <ul className="space-y-2">
                            {ITEMS.map(i => (
                                <li key={i.id} className="flex justify-between text-sm"><span className="text-[#9ca3af]">{i.title}</span><span className="font-semibold" style={{ color: i.color }}>${i.price}{i.period}</span></li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
