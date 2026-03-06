'use client';
import { useState } from 'react';

const WORKFLOWS = [
    { id: 'wf1', name: 'Merchant Onboarding', trigger: 'New KYB submission', steps: ['KYB Document Review', 'Compliance Check', 'Tier Assignment', 'Welcome Email Sequence'], status: 'active', executions: 47, lastRun: '2026-03-04 10:00' },
    { id: 'wf2', name: 'Dispute Resolution', trigger: 'Dispute ticket created', steps: ['Evidence Collection', 'Admin Review (48h)', 'Decision + Notification', 'Refund or Dismiss'], status: 'active', executions: 12, lastRun: '2026-03-03 15:00' },
    { id: 'wf3', name: 'Payout Processing', trigger: 'Monthly (15th, 00:00 UTC)', steps: ['Calculate Net Earnings', 'Deduct Platform Fee', 'Initiate Bank Transfer', 'Send Payout Receipt'], status: 'active', executions: 5, lastRun: '2026-03-15 00:00' },
    { id: 'wf4', name: 'Content Moderation', trigger: 'Listing flagged by AI', steps: ['AI Confidence Score Check', 'Queue for Human Review', 'Admin Decision', 'Notify Seller'], status: 'paused', executions: 89, lastRun: '2026-03-01 08:00' },
];

export default function WorkflowsPage() {
    const [flows, setFlows] = useState(WORKFLOWS);
    const toggle = (id: string) => setFlows(prev => prev.map(w => w.id === id ? { ...w, status: w.status === 'active' ? 'paused' : 'active' } : w));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-xl font-bold text-white">Workflows</h1><p className="text-sm text-[#6b7280]">Automated action pipelines</p></div>
                <button className="btn-primary h-9 px-4 text-sm" style={{ background: 'linear-gradient(to right, #f59e0b, #ef4444)', color: '#0a0a1a' }}>+ New Workflow</button>
            </div>

            <div className="grid gap-5">
                {flows.map(wf => (
                    <div key={wf.id} className="glass-card p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h3 className="font-bold text-white">{wf.name}</h3>
                                    <span className={`badge border ${wf.status === 'active' ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20' : 'bg-[#6b7280]/10 text-[#6b7280] border-[#6b7280]/20'}`}>{wf.status}</span>
                                </div>
                                <p className="text-xs text-[#6b7280] mt-1">Trigger: {wf.trigger}</p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="text-right">
                                    <p className="text-xs text-[#4b5563]">{wf.executions} runs</p>
                                    <p className="text-[10px] text-[#4b5563]">{wf.lastRun}</p>
                                </div>
                                <button onClick={() => toggle(wf.id)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${wf.status === 'active' ? 'bg-[#10b981]' : 'bg-white/[0.1]'}`}>
                                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${wf.status === 'active' ? 'translate-x-4' : 'translate-x-0.5'}`} />
                                </button>
                            </div>
                        </div>
                        {/* Steps */}
                        <div className="flex items-center gap-1 overflow-x-auto pb-1">
                            {wf.steps.map((step, i) => (
                                <div key={step} className="flex items-center gap-1 shrink-0">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-[#9ca3af]">
                                        <span className="w-4 h-4 rounded-full bg-[#3b82f6]/20 text-[#3b82f6] flex items-center justify-center text-[9px] font-bold shrink-0">{i + 1}</span>
                                        {step}
                                    </div>
                                    {i < wf.steps.length - 1 && <span className="text-[#4b5563] text-xs shrink-0">→</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
