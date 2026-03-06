'use client';
import { useState } from 'react';

const INITIAL_ITEMS = [
    { id: 'ci1', listingId: 'l1', title: 'AutoCodeAgent Pro', seller: 'NeuralForge Labs', price: 49, period: '/mo', color: '#3b82f6', icon: '🤖', pricingType: 'subscription' },
    { id: 'ci2', listingId: 'l3', title: 'PromptCraft Studio', seller: 'PromptWizards', price: 29, period: '', color: '#8b5cf6', icon: '📋', pricingType: 'one_time' },
];

const PAYMENT_METHODS = [
    { id: 'stripe', label: 'Credit / Debit Card', icon: '💳', fee: '2.9% + 30¢' },
    { id: 'eth', label: 'Ethereum (ETH)', icon: '⟠', fee: '0.5%' },
    { id: 'sol', label: 'Solana (SOL)', icon: '◎', fee: '0.3%' },
    { id: 'usdc', label: 'USD Coin (USDC)', icon: '💵', fee: '0.2%' },
    { id: 'x402', label: 'x402 Protocol', icon: '⚡', fee: '1%' },
];

export default function CartPage() {
    const [items, setItems] = useState(INITIAL_ITEMS);
    const [payment, setPayment] = useState('stripe');
    const [coupon, setCoupon] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);

    const subtotal = items.reduce((s, i) => s + i.price, 0);
    const discount = couponApplied ? 10 : 0;
    const fee = +((subtotal - discount) * 0.05).toFixed(2);
    const total = +(subtotal - discount + fee).toFixed(2);

    const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
    const applyCoupon = () => { if (coupon.toUpperCase() === 'SYNERGY10') setCouponApplied(true); };

    return (
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-2xl font-bold text-white mb-8">Your Cart <span className="text-[#6b7280] font-normal text-base">({items.length} items)</span></h1>

            {items.length === 0 ? (
                <div className="flex flex-col items-center py-28 text-center">
                    <span className="text-7xl mb-4">🛒</span>
                    <h2 className="text-xl font-bold text-white">Your cart is empty</h2>
                    <p className="text-[#6b7280] mt-2 mb-6">Browse the marketplace to find AI tools and datasets.</p>
                    <a href="/search" className="btn-primary h-11 px-6">Browse Listings</a>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="glass-card p-5 flex items-center gap-5">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: `${item.color}20` }}>{item.icon}</div>
                                <div className="flex-1 min-w-0">
                                    <a href={`/listing/${item.listingId}`} className="font-semibold text-white hover:text-[#60a5fa] transition-colors">{item.title}</a>
                                    <p className="text-xs text-[#6b7280] mt-0.5">{item.seller} · {item.pricingType === 'subscription' ? 'Subscription' : 'One-time purchase'}</p>
                                </div>
                                <div className="shrink-0 text-right">
                                    <p className="text-lg font-bold" style={{ color: item.color }}>${item.price}<span className="text-xs text-[#6b7280] font-normal">{item.period}</span></p>
                                    <button onClick={() => remove(item.id)} className="mt-1 text-[10px] text-[#4b5563] hover:text-[#ef4444] transition-colors">Remove</button>
                                </div>
                            </div>
                        ))}

                        {/* Payment Method */}
                        <div className="glass-card p-5">
                            <h3 className="text-sm font-semibold text-white mb-4">Payment Method</h3>
                            <div className="space-y-2">
                                {PAYMENT_METHODS.map(m => (
                                    <label key={m.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${payment === m.id ? 'border-[#3b82f6]/50 bg-[#3b82f6]/[0.07]' : 'border-white/[0.06] hover:border-white/[0.12]'}`}>
                                        <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)} className="sr-only" />
                                        <span className="text-xl">{m.icon}</span>
                                        <span className="flex-1 text-sm font-medium text-white">{m.label}</span>
                                        <span className="text-[10px] text-[#4b5563]">Fee: {m.fee}</span>
                                        <div className={`w-4 h-4 rounded-full border-2 transition-all ${payment === m.id ? 'border-[#3b82f6] bg-[#3b82f6]' : 'border-white/[0.2]'}`} />
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="space-y-4">
                        <div className="glass-card p-6 space-y-5 sticky top-20">
                            <h3 className="text-sm font-semibold text-white">Order Summary</h3>

                            <ul className="space-y-2 text-sm">
                                {items.map(i => (
                                    <li key={i.id} className="flex justify-between text-[#9ca3af]">
                                        <span className="truncate max-w-[160px]">{i.title}</span>
                                        <span className="font-medium text-white">${i.price}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Coupon */}
                            <div className="flex gap-2">
                                <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Coupon code" className="input flex-1 h-9 text-xs" id="coupon-input" />
                                <button onClick={applyCoupon} className="btn-secondary h-9 px-3 text-xs">Apply</button>
                            </div>
                            {couponApplied && <p className="text-xs text-[#10b981] -mt-3">✓ SYNERGY10 applied — $10 off!</p>}

                            <div className="space-y-2 text-sm border-t border-white/[0.06] pt-4">
                                <div className="flex justify-between text-[#9ca3af]"><span>Subtotal</span><span>${subtotal}</span></div>
                                {discount > 0 && <div className="flex justify-between text-[#10b981]"><span>Discount</span><span>−${discount}</span></div>}
                                <div className="flex justify-between text-[#9ca3af]"><span>Platform fee (5%)</span><span>${fee}</span></div>
                                <div className="flex justify-between text-base font-bold text-white border-t border-white/[0.06] pt-2 mt-2">
                                    <span>Total</span><span>${total}</span>
                                </div>
                            </div>

                            <a href="/checkout" className="btn-primary w-full h-11 text-sm">Proceed to Checkout</a>

                            <ul className="text-[10px] text-[#4b5563] space-y-1">
                                <li>✓ SSL encrypted checkout</li>
                                <li>✓ 14-day money-back guarantee</li>
                                <li>✓ Instant access after payment</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
