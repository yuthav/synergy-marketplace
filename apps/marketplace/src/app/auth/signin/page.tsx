export default function SignInPage() {
    return (
        <div className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center py-12 px-4 overflow-hidden">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/3 top-1/4 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-[130px]" />
                <div className="absolute right-1/4 bottom-1/3 w-80 h-80 bg-[#8b5cf6]/10 rounded-full blur-[110px]" />
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)', backgroundSize: '48px 48px' }}
                />
            </div>

            <div className="w-full max-w-md">
                {/* Top label */}
                <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-[#4b5563] mb-6">Marketplace Portal</p>

                {/* Card */}
                <div className="g-border rounded-2xl">
                    <div className="glass-card rounded-2xl p-8 sm:p-10" style={{ border: 'none' }}>
                        {/* Logo */}
                        <div className="text-center mb-8">
                            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center mb-5 shadow-lg shadow-blue-500/25">
                                <svg width="26" height="26" viewBox="0 0 20 20" fill="none">
                                    <path d="M5 10.5L8.5 14L15 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
                            <p className="mt-1 text-sm text-[#6b7280]">Sign in to your buyer account</p>
                        </div>

                        {/* OAuth */}
                        <div className="space-y-2.5">
                            {[
                                {
                                    id: 'google', label: 'Continue with Google', icon: (
                                        <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                    )
                                },
                                {
                                    id: 'github', label: 'Continue with GitHub', icon: (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                                    )
                                },
                            ].map(p => (
                                <button key={p.id} type="button" className="w-full flex items-center justify-center gap-3 h-11 rounded-xl border border-white/[0.09] bg-white/[0.03] hover:bg-white/[0.07] text-sm font-medium text-white transition-all">
                                    {p.icon}
                                    {p.label}
                                </button>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="relative my-6 flex items-center">
                            <div className="flex-1 border-t border-white/[0.07]" />
                            <span className="mx-4 text-xs text-[#4b5563]">or with email</span>
                            <div className="flex-1 border-t border-white/[0.07]" />
                        </div>

                        {/* Form */}
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Email Address</label>
                                <input id="email" type="email" autoComplete="email" placeholder="you@example.com" className="input" />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label htmlFor="password" className="block text-xs font-medium text-[#9ca3af]">Password</label>
                                    <a href="/auth/forgot-password" className="text-xs text-[#3b82f6] hover:text-[#60a5fa] transition-colors">Forgot password?</a>
                                </div>
                                <input id="password" type="password" autoComplete="current-password" placeholder="••••••••" className="input" />
                            </div>
                            <button type="submit" className="btn-primary w-full h-11 text-sm mt-1">Sign In</button>
                        </form>

                        {/* Web3 */}
                        <button type="button" className="mt-3 w-full flex items-center justify-center gap-2 h-11 rounded-xl border border-[#14b8a6]/25 bg-[#14b8a6]/[0.05] hover:bg-[#14b8a6]/[0.1] text-sm font-medium text-[#14b8a6] transition-all">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            Connect Wallet (Sign-In with Ethereum)
                        </button>

                        {/* Footer */}
                        <p className="mt-7 text-center text-sm text-[#6b7280]">
                            New to Synergetics?{' '}
                            <a href="/auth/signup" className="text-[#3b82f6] hover:text-[#60a5fa] font-medium transition-colors">Create account</a>
                        </p>
                    </div>
                </div>

                {/* Portal links */}
                <div className="mt-5 flex items-center justify-center gap-6">
                    <a href="http://localhost:3001/auth/signin" className="text-xs text-[#4b5563] hover:text-[#9ca3af] transition-colors">→ Seller Portal</a>
                    <a href="http://localhost:3002/auth/signin" className="text-xs text-[#4b5563] hover:text-[#9ca3af] transition-colors">→ Platform HQ</a>
                </div>
            </div>
        </div>
    );
}
