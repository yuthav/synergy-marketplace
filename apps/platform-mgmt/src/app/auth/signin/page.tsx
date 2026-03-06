export default function PlatformSignInPage() {
    return (
        <div className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center py-12 px-4 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/3 top-1/4 w-80 h-80 bg-[#f59e0b]/10 rounded-full blur-[120px]" />
                <div className="absolute right-1/4 bottom-1/3 w-72 h-72 bg-[#ef4444]/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md">
                <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-[#6b7280] mb-6">Platform Management HQ</p>
                <div className="glass-card rounded-2xl p-8 sm:p-10 border border-[#f59e0b]/10">
                    <div className="text-center mb-8">
                        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center mb-5 shadow-lg shadow-amber-500/25 text-2xl font-black text-[#0a0a1a]">⬡</div>
                        <h1 className="text-2xl font-bold text-white">Admin Sign In</h1>
                        <p className="mt-1 text-sm text-[#6b7280]">Authorized personnel only</p>
                    </div>

                    <div className="space-y-2.5 mb-6">
                        {[
                            { id: 'google', label: 'Continue with Google', icon: <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg> },
                        ].map(p => (
                            <button key={p.id} type="button" className="w-full flex items-center justify-center gap-3 h-11 rounded-xl border border-[#f59e0b]/20 bg-[#f59e0b]/[0.04] hover:bg-[#f59e0b]/[0.08] text-sm font-medium text-white transition-all">
                                {p.icon}{p.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative mb-6 flex items-center">
                        <div className="flex-1 border-t border-white/[0.07]" /><span className="mx-4 text-xs text-[#4b5563]">or with credentials</span><div className="flex-1 border-t border-white/[0.07]" />
                    </div>

                    <form className="space-y-4">
                        <div><label htmlFor="admin-email" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Admin Email</label><input id="admin-email" type="email" placeholder="admin@synergetics.ai" className="input border-[#f59e0b]/10 focus:border-[#f59e0b]/40" /></div>
                        <div><label htmlFor="admin-password" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Password</label><input id="admin-password" type="password" placeholder="••••••••" className="input border-[#f59e0b]/10 focus:border-[#f59e0b]/40" /></div>
                        <div><label htmlFor="admin-mfa" className="block text-xs font-medium text-[#9ca3af] mb-1.5">MFA Code</label><input id="admin-mfa" type="text" placeholder="000000" maxLength={6} className="input font-mono border-[#f59e0b]/10 focus:border-[#f59e0b]/40" /></div>
                        <button type="submit" className="w-full h-11 text-sm font-semibold rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-[#0a0a1a] hover:opacity-90 transition-opacity">Access Platform HQ</button>
                    </form>

                    <div className="mt-6 flex justify-center gap-6">
                        <a href="http://localhost:3000/auth/signin" className="text-xs text-[#4b5563] hover:text-[#9ca3af]">→ Marketplace</a>
                        <a href="http://localhost:3001/auth/signin" className="text-xs text-[#4b5563] hover:text-[#9ca3af]">→ Seller Portal</a>
                    </div>
                    <p className="text-center text-[10px] text-[#4b5563] mt-4">🔒 MFA required for all admin accounts</p>
                </div>
            </div>
        </div>
    );
}
