'use client';
import { useState } from 'react';

const FLAG_DEFINITIONS: Record<string, { label: string; desc: string; risk: 'low' | 'medium' | 'high' }> = {
    x402_payments: { label: 'x402 Protocol Payments', desc: 'Enable x402 micropayment checkout option', risk: 'low' },
    crypto_checkout: { label: 'Crypto Checkout', desc: 'Allow ETH/SOL/USDC payment at checkout', risk: 'low' },
    ai_recommendations: { label: 'AI Recommendations', desc: 'Show ML-powered listing recommendations', risk: 'medium' },
    subscription_billing: { label: 'Subscription Billing', desc: 'Enable recurring subscription products', risk: 'low' },
    beta_seller_tools: { label: 'Beta Seller Tools', desc: 'New analytics dashboard beta for sellers', risk: 'medium' },
    merchant_wallet: { label: 'Merchant Crypto Wallet', desc: 'Integrated wallet for merchants to receive crypto', risk: 'high' },
    marketplace_v2: { label: 'Marketplace v2 UI', desc: 'New redesigned marketplace with instant search', risk: 'high' },
};

const RISK_COLORS = { low: '#10b981', medium: '#f59e0b', high: '#ef4444' };

export default function FeatureFlagsPage() {
    const [flags, setFlags] = useState<Record<string, boolean>>({
        x402_payments: true, crypto_checkout: true, ai_recommendations: false,
        subscription_billing: true, beta_seller_tools: false, merchant_wallet: false, marketplace_v2: false,
    });

    const toggle = (key: string) => setFlags(p => ({ ...p, [key]: !p[key] }));
    const active = Object.values(flags).filter(Boolean).length;

    return (
        <div className="max-w-2xl space-y-5">
            <div className="flex items-center justify-between">
                <div><h1 className="text-xl font-bold text-white">Feature Flags</h1><p className="text-sm text-[#6b7280]">Control platform feature rollouts</p></div>
                <div className="flex gap-2 text-sm">
                    <span className="badge bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">{active} active</span>
                    <span className="badge bg-white/[0.04] text-[#6b7280] border border-white/[0.07]">{Object.keys(flags).length - active} off</span>
                </div>
            </div>

            <div className="space-y-3">
                {Object.entries(FLAG_DEFINITIONS).map(([key, def]) => (
                    <div key={key} className={`glass-card p-5 flex items-center gap-4 transition-all ${flags[key] ? 'border border-[#10b981]/10' : ''}`}>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-white">{def.label}</p>
                                <span className="badge border text-[9px] font-bold uppercase" style={{ background: `${RISK_COLORS[def.risk]}15`, color: RISK_COLORS[def.risk], borderColor: `${RISK_COLORS[def.risk]}30` }}>{def.risk}</span>
                            </div>
                            <p className="text-xs text-[#6b7280] mt-0.5">{def.desc}</p>
                            <p className="font-mono text-[9px] text-[#4b5563] mt-1">{key}</p>
                        </div>
                        <button onClick={() => toggle(key)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${flags[key] ? 'bg-[#10b981]' : 'bg-white/[0.1]'}`}>
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${flags[key] ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="glass-card p-5 border border-[#f59e0b]/15 bg-[#f59e0b]/[0.03]">
                <p className="text-xs text-[#f59e0b]">⚠ High-risk flags affect core payment or UI flows. Test in staging before enabling in production.</p>
            </div>
        </div>
    );
}
