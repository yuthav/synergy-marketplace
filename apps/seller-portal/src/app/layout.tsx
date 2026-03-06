import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
    title: { default: 'Seller Portal — Synergetics.ai', template: '%s | Seller Portal' },
    description: 'Manage your AI listings, orders, analytics, and payouts.',
};

const NAV = [
    { group: 'Overview', items: [{ icon: '▦', label: 'Dashboard', href: '/', active: true }, { icon: '📈', label: 'Analytics', href: '/analytics' }] },
    { group: 'Commerce', items: [{ icon: '📦', label: 'Listings', href: '/listings' }, { icon: '🛒', label: 'Orders', href: '/orders' }, { icon: '🔄', label: 'Subscriptions', href: '/subscriptions' }, { icon: '⭐', label: 'Reviews', href: '/reviews' }] },
    { group: 'Finance', items: [{ icon: '💰', label: 'Revenue', href: '/finance' }, { icon: '💳', label: 'Payouts', href: '/payouts' }, { icon: '🧾', label: 'Invoices', href: '/invoices' }] },
    { group: 'Workspace', items: [{ icon: '💬', label: 'Messages', href: '/messages' }, { icon: '👥', label: 'Team', href: '/team' }, { icon: '⚙️', label: 'Settings', href: '/settings' }] },
];

export default function SellerLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`dark ${inter.className}`} suppressHydrationWarning>
            <body className="min-h-screen antialiased">
                <div className="flex min-h-screen">
                    {/* ─── Sidebar ─── */}
                    <aside className="glass hidden lg:flex lg:w-60 flex-col border-r border-white/[0.065] fixed inset-y-0 left-0 z-50">
                        {/* Logo */}
                        <div className="flex h-14 items-center gap-2.5 px-5 border-b border-white/[0.065]">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center">
                                <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M5 10.5L8.5 14L15 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                            <span className="text-sm font-bold text-white">Seller Portal</span>
                        </div>

                        {/* Nav */}
                        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
                            {NAV.map(group => (
                                <div key={group.group}>
                                    <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#4b5563]">{group.group}</p>
                                    <ul className="space-y-0.5">
                                        {group.items.map(item => (
                                            <li key={item.label}>
                                                <a
                                                    href={item.href}
                                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium border-l-2 ${item.active ? 'nav-active' : 'nav-item'}`}
                                                >
                                                    <span className="text-base leading-none">{item.icon}</span>
                                                    {item.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </nav>

                        {/* KYB status band */}
                        <div className="mx-3 mb-3 rounded-lg border border-[#10b981]/20 bg-[#10b981]/[0.05] px-3 py-2">
                            <div className="flex items-center gap-2">
                                <span className="dot-green" />
                                <span className="text-xs font-medium text-[#10b981]">KYB Verified</span>
                            </div>
                            <p className="text-[10px] text-[#4b5563] mt-0.5">Gold Tier · 12% commission</p>
                        </div>

                        {/* User */}
                        <div className="border-t border-white/[0.065] p-3">
                            <div className="flex items-center gap-2.5 rounded-lg p-2 hover:bg-white/[0.03] cursor-pointer transition-colors">
                                <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-[11px] font-bold text-white">NF</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-white truncate">NeuralForge Labs</p>
                                    <p className="text-[10px] text-[#4b5563] truncate">seller@neuralforge.ai</p>
                                </div>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                            </div>
                        </div>
                    </aside>

                    {/* ─── Main ─── */}
                    <div className="flex-1 lg:pl-60">
                        {/* Top bar */}
                        <header className="glass sticky top-0 z-40 flex h-14 items-center justify-between px-5 border-b border-white/[0.065]">
                            <div className="flex items-center gap-3">
                                <nav className="hidden sm:flex items-center gap-1 text-xs text-[#4b5563]">
                                    <span>Seller Portal</span>
                                    <span>/</span>
                                    <span className="text-white font-medium">Dashboard</span>
                                </nav>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Notification */}
                                <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#6b7280] hover:text-white hover:bg-white/[0.05] transition-all">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ef4444] rounded-full border border-[#05050f]" />
                                </button>
                                <a href="/listings/new" className="btn-primary text-xs h-8 px-3.5">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                    New Listing
                                </a>
                            </div>
                        </header>

                        <main className="p-5 lg:p-7">{children}</main>
                    </div>
                </div>
            </body>
        </html>
    );
}
