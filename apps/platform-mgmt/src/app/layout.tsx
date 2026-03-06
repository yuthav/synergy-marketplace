import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
    title: { default: 'Platform HQ — Synergetics.ai', template: '%s | Platform HQ' },
    description: 'Command center for the Synergetics marketplace platform.',
};

const SIDEBAR = [
    { group: 'HQ', items: [{ icon: '▦', label: 'Dashboard', href: '/', active: true }, { icon: '📈', label: 'Analytics', href: '/analytics' }, { icon: '🔔', label: 'Activity Feed', href: '/activity' }] },
    { group: 'Commerce', items: [{ icon: '🏪', label: 'Merchants', href: '/merchants' }, { icon: '📦', label: 'Listings', href: '/listings' }, { icon: '🛒', label: 'Orders', href: '/orders' }, { icon: '👥', label: 'Users', href: '/users' }, { icon: '⭐', label: 'Reviews', href: '/reviews' }] },
    { group: 'Finance', items: [{ icon: '💰', label: 'Revenue', href: '/finance/revenue' }, { icon: '💳', label: 'Payouts', href: '/finance/payouts' }, { icon: '📊', label: 'Revenue Shares', href: '/finance/revenue-shares' }, { icon: '🔐', label: 'Payment Vault', href: '/finance/payment-vault' }, { icon: '⚖️', label: 'Disputes', href: '/finance/disputes' }] },
    { group: 'Operations', items: [{ icon: '💬', label: 'Communications', href: '/communications' }, { icon: '🔄', label: 'Workflows', href: '/workflows' }, { icon: '🎫', label: 'Tickets', href: '/tickets' }, { icon: '📢', label: 'Announcements', href: '/announcements' }] },
    { group: 'System', items: [{ icon: '🛠️', label: 'Maintenance', href: '/system/maintenance' }, { icon: '🌍', label: 'Geo Restrictions', href: '/system/geo-restrictions' }, { icon: '🏷️', label: 'Merchant Tiers', href: '/system/merchant-tiers' }, { icon: '🚩', label: 'Feature Flags', href: '/system/feature-flags' }, { icon: '👤', label: 'Access Control', href: '/system/access-control' }, { icon: '📋', label: 'Audit Log', href: '/system/audit-log' }] },
];

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`dark ${inter.className}`} suppressHydrationWarning>
            <body className="min-h-screen antialiased">
                <div className="flex min-h-screen">
                    {/* ─── Sidebar ─── */}
                    <aside className="glass hidden lg:flex lg:w-64 flex-col border-r border-white/[0.055] fixed inset-y-0 left-0 z-50">
                        {/* Logo */}
                        <div className="flex h-14 items-center gap-2.5 px-5 border-b border-white/[0.055]">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center">
                                <span className="text-[10px] font-black text-white">HQ</span>
                            </div>
                            <div>
                                <span className="text-sm font-bold text-white">Platform HQ</span>
                                <p className="text-[9px] text-[#4b5563] leading-none mt-0.5">Synergetics.ai</p>
                            </div>
                        </div>

                        {/* Nav */}
                        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
                            {SIDEBAR.map(group => (
                                <div key={group.group}>
                                    <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#4b5563]">{group.group}</p>
                                    <ul className="space-y-0.5">
                                        {group.items.map(item => (
                                            <li key={item.label}>
                                                <a href={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium border-l-2 ${(item as { active?: boolean }).active ? 'nav-active' : 'nav-item'}`}>
                                                    <span className="text-sm leading-none">{item.icon}</span>
                                                    {item.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </nav>

                        {/* Alert band */}
                        <div className="mx-3 mb-3 rounded-lg border border-[#f59e0b]/20 bg-[#f59e0b]/[0.05] px-3 py-2">
                            <div className="flex items-center gap-2">
                                <span className="dot-amber" />
                                <span className="text-xs font-medium text-[#f59e0b]">3 Pending Actions</span>
                            </div>
                            <p className="text-[10px] text-[#4b5563] mt-0.5">KYB, dispute, payout approval</p>
                        </div>

                        {/* Admin user */}
                        <div className="border-t border-white/[0.055] p-3">
                            <div className="flex items-center gap-2.5 rounded-lg p-2 hover:bg-white/[0.02] cursor-pointer transition-colors">
                                <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center text-[10px] font-black text-white">SA</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-white truncate">Super Admin</p>
                                    <p className="text-[10px] text-[#4b5563] truncate">admin@synergetics.ai</p>
                                </div>
                                <span className="badge bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20">Root</span>
                            </div>
                        </div>
                    </aside>

                    {/* ─── Main ─── */}
                    <div className="flex-1 lg:pl-64">
                        <header className="glass sticky top-0 z-40 flex h-14 items-center justify-between px-5 border-b border-white/[0.055]">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="dot-green" />
                                    <span className="text-xs font-medium text-[#10b981]">All Systems Operational</span>
                                </div>
                                <div className="hidden sm:block h-3 w-px bg-white/10" />
                                <nav className="hidden sm:flex items-center gap-1 text-xs text-[#4b5563]">
                                    <span>Platform HQ</span>
                                    <span>/</span>
                                    <span className="text-white font-medium">Dashboard</span>
                                </nav>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#6b7280] hover:text-white hover:bg-white/[0.04] transition-all">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ef4444] rounded-full border border-[#030309]" />
                                </button>
                                <button className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6b7280] hover:text-white hover:bg-white/[0.04] transition-all">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="m12 1-2 3H7l-1 3-3 1v2l3 1 1 3h3l1 3 2-1 2 1 1-3h3l1-3-3-1-1-3H15L13 1z" /></svg>
                                </button>
                            </div>
                        </header>

                        <main className="p-5 lg:p-7">{children}</main>
                    </div>
                </div>
            </body>
        </html>
    );
}
