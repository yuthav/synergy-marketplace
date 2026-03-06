export default function GeoBlockedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ef4444]/[0.05] rounded-full blur-[100px]" />
            </div>

            <div className="text-center max-w-md">
                <div className="mx-auto mb-8 w-24 h-24 rounded-3xl border border-[#ef4444]/25 bg-[#ef4444]/[0.07] flex items-center justify-center text-5xl">
                    🌍
                </div>

                <span className="badge bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20 mb-4">Access Restricted</span>
                <h1 className="text-3xl font-black text-white mt-3">Not Available in Your Region</h1>
                <p className="text-[#9ca3af] mt-4">
                    Synergetics.ai Marketplace is currently not available in your country. This may be due to local regulations or regulatory compliance requirements.
                </p>

                <div className="glass-card p-5 mt-8 text-left space-y-3 text-sm text-[#6b7280]">
                    <p className="font-semibold text-white text-sm">Why am I seeing this?</p>
                    <ul className="space-y-2 list-disc list-inside">
                        <li>Your IP address or location is in a restricted region</li>
                        <li>Your country may have local regulations we must comply with</li>
                        <li>A VPN or proxy may have triggered this screen incorrectly</li>
                    </ul>
                </div>

                <div className="mt-6 space-y-3">
                    <a href="mailto:support@synergetics.ai" className="btn-primary w-full h-11 text-sm">Contact Support</a>
                    <p className="text-xs text-[#4b5563]">If you believe this is an error, please contact our support team with your location and order details.</p>
                </div>
            </div>
        </div>
    );
}
