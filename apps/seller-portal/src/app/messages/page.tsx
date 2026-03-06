'use client';
import { useState } from 'react';

const CONVERSATIONS = [
    { id: 'c1', from: 'Platform Admin', avatar: 'PA', subject: 'KYB Review Update', preview: 'Your merchant tier has been upgraded to Gold. Congratulations!', time: '2h ago', unread: true, type: 'platform' },
    { id: 'c2', from: 'john@dev.io', avatar: 'JD', subject: 'Re: Download Issue — SYN-A1B2', preview: 'Thanks for the fast response! The issue is now resolved.', time: '5h ago', unread: false, type: 'buyer' },
    { id: 'c3', from: 'Platform Admin', avatar: 'PA', subject: 'Policy Update: API Listings', preview: 'Please review the updated API listing policy that takes effect March 15...', time: '1d ago', unread: false, type: 'platform' },
    { id: 'c4', from: 'alice@co.ai', avatar: 'AL', subject: 'Feature request for AutoCodeAgent', preview: 'Hi, would it be possible to add GitLab support in the next version?', time: '2d ago', unread: false, type: 'buyer' },
];

export default function MessagesPage() {
    const [selected, setSelected] = useState(CONVERSATIONS[0]);
    const [reply, setReply] = useState('');

    return (
        <div className="space-y-5">
            <div><h1 className="text-xl font-bold text-white">Messages</h1><p className="text-sm text-[#6b7280]">Inbox and communications</p></div>
            <div className="glass-card overflow-hidden" style={{ height: 'calc(100vh - 14rem)', minHeight: '550px' }}>
                <div className="grid h-full" style={{ gridTemplateColumns: '280px 1fr' }}>
                    {/* Sidebar */}
                    <div className="border-r border-white/[0.06] flex flex-col">
                        <div className="p-4 border-b border-white/[0.06]"><p className="text-xs font-semibold uppercase tracking-wider text-[#4b5563]">All Messages</p></div>
                        <ul className="flex-1 overflow-y-auto">
                            {CONVERSATIONS.map(c => (
                                <li key={c.id}>
                                    <button onClick={() => setSelected(c)} className={`w-full text-left p-4 border-b border-white/[0.04] transition-colors ${selected.id === c.id ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}>
                                        <div className="flex items-start gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${c.type === 'platform' ? 'bg-gradient-to-br from-[#f59e0b] to-[#ef4444]' : 'bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6]'}`}>{c.avatar}</div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between"><p className="text-xs font-semibold text-white truncate">{c.from}</p><p className="text-[9px] text-[#4b5563] shrink-0 ml-1">{c.time}</p></div>
                                                <p className="text-[10px] font-medium text-[#9ca3af] truncate mt-0.5">{c.subject}</p>
                                                <p className="text-[10px] text-[#4b5563] truncate">{c.preview}</p>
                                            </div>
                                            {c.unread && <span className="w-2 h-2 rounded-full bg-[#3b82f6] shrink-0 mt-1" />}
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Message Detail */}
                    <div className="flex flex-col">
                        <div className="p-5 border-b border-white/[0.06]">
                            <h3 className="font-semibold text-white">{selected.subject}</h3>
                            <p className="text-xs text-[#6b7280] mt-0.5">From: {selected.from} · {selected.time}</p>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5">
                            <div className="glass-card p-5 text-sm text-[#9ca3af] leading-relaxed">{selected.preview}</div>
                        </div>
                        <div className="p-4 border-t border-white/[0.06]">
                            <div className="flex gap-3">
                                <textarea value={reply} onChange={e => setReply(e.target.value)} placeholder="Type your reply..." rows={2} className="input flex-1 resize-none text-sm" />
                                <button onClick={() => setReply('')} disabled={!reply} className="btn-primary h-auto px-4 self-stretch text-sm disabled:opacity-40">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
