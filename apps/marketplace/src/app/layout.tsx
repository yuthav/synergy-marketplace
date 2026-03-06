/* ─── Synergetics Marketplace — Root Layout ─── */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
    title: { default: 'Synergetics.ai — AI Agent & Digital Goods Marketplace', template: '%s | Synergetics.ai' },
    description: 'The premier marketplace to discover, buy, and sell AI agents, digital assets, templates, datasets, APIs, and SaaS tools.',
    keywords: ['AI marketplace', 'AI agents', 'digital goods', 'datasets', 'APIs', 'templates', 'SaaS', 'Web3', 'blockchain'],
    openGraph: { type: 'website', siteName: 'Synergetics.ai', title: 'Synergetics.ai — AI Agent & Digital Goods Marketplace', description: 'The premier marketplace for the AI economy.' },
};

const NAV_LINKS = ['Categories', 'Explore', 'Pricing', 'Docs'];

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
            <body className="min-h-screen antialiased">

                {/* ── Announcement Bar ── */}
                <div className="relative z-50 flex items-center justify-center gap-3 bg-gradient-to-r from-[#3b82f6]/10 via-[#8b5cf6]/10 to-[#14b8a6]/10 px-4 py-2 text-sm border-b border-white/[0.06]">
                    <span className="dot-green" />
                    <span className="text-[#9ca3af]">Now live —&nbsp;</span>
                    <span className="font-semibold text-white">x402 Protocol payments</span>
                    <span className="text-[#9ca3af]">&amp; Web3 wallet login enabled</span>
                    <a href="/docs/x402" className="ml-2 text-xs font-medium text-[#3b82f6] underline underline-offset-2 hover:text-[#60a5fa]">Learn more →</a>
                </div>

                {/* ── Navigation ── */}
                <header className="glass sticky top-0 z-40 w-full border-b border-white/[0.07]">
                    <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        {/* Logo */}
                        <a href="/" className="flex items-center gap-2.5 shrink-0">
                            <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6]">
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                    <path d="M5 10.5L8.5 14L15 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent" />
                            </div>
                            <span className="text-[1.05rem] font-bold tracking-[-0.02em] text-white">Synergetics<span className="g-text-brand">.ai</span></span>
                        </a>

                        {/* Nav Links */}
                        <nav className="hidden md:flex items-center gap-1">
                            {NAV_LINKS.map(l => (
                                <a key={l} href={`/${l.toLowerCase()}`} className="px-3 py-1.5 rounded-lg text-sm text-[#9ca3af] hover:text-white hover:bg-white/[0.04] transition-all">
                                    {l}
                                </a>
                            ))}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {/* Search */}
                            <button className="flex h-9 w-9 items-center justify-center rounded-lg text-[#9ca3af] hover:text-white hover:bg-white/[0.05] transition-all" aria-label="Search">
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                            </button>
                            {/* Cart */}
                            <a href="/cart" className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#9ca3af] hover:text-white hover:bg-white/[0.05] transition-all" aria-label="Cart">
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="m1 1 4 2 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#3b82f6] text-[9px] font-bold text-white">2</span>
                            </a>
                            <div className="hidden sm:block w-px h-5 bg-white/10" />
                            <a href="/auth/signin" className="hidden sm:inline-flex btn-secondary h-9 px-4 text-sm">Sign In</a>
                            <a href="/auth/signup" className="btn-primary h-9 px-4 text-sm">Get Started</a>
                        </div>
                    </div>
                </header>

                <main>{children}</main>

                {/* ── Footer ── */}
                <footer className="border-t border-white/[0.06] bg-[#06061a] mt-20">
                    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                        {/* Top */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
                            {/* Brand */}
                            <div className="col-span-2 md:col-span-1">
                                <a href="/" className="flex items-center gap-2 mb-4">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6]">
                                        <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M5 10.5L8.5 14L15 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                    <span className="font-bold text-white text-sm">Synergetics.ai</span>
                                </a>
                                <p className="text-[#6b7280] text-xs leading-relaxed max-w-[180px]">The premier marketplace for the AI economy.</p>
                                <div className="flex gap-3 mt-5">
                                    {['twitter', 'github', 'discord'].map(s => (
                                        <a key={s} href={`https://${s}.com`} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] text-[#6b7280] hover:text-white hover:bg-white/[0.08] transition-all" aria-label={s}>
                                            <span className="text-xs">{s === 'twitter' ? '𝕏' : s === 'github' ? '⌥' : '💬'}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                            {/* Links */}
                            {[
                                { title: 'Marketplace', links: ['AI Agents', 'Digital Assets', 'Templates', 'Datasets', 'APIs', 'SaaS Tools'] },
                                { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press', 'Contact'] },
                                { title: 'Resources', links: ['Documentation', 'API Reference', 'Help Center', 'Community', 'Status'] },
                                { title: 'Legal', links: ['Privacy Policy', 'Terms', 'Cookie Policy', 'GDPR', 'Security'] },
                            ].map(col => (
                                <div key={col.title}>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af] mb-4">{col.title}</p>
                                    <ul className="space-y-2.5">
                                        {col.links.map(l => (
                                            <li key={l}><a href="#" className="text-xs text-[#6b7280] hover:text-[#9ca3af] transition-colors">{l}</a></li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        {/* Bottom */}
                        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-8">
                            <p className="text-xs text-[#4b5563]">© 2026 Synergetics.ai Inc. All rights reserved.</p>
                            <div className="flex items-center gap-2">
                                {['Stripe', 'ETH', 'SOL', 'USDC'].map(p => (
                                    <span key={p} className="px-2 py-0.5 rounded border border-white/[0.07] text-[10px] text-[#6b7280] font-medium">{p}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}
