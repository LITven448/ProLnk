import { useState } from 'react';

const schedules: Record<string, { stage: string; pct: number; trigger: string }[]> = {
  small: [
    { stage: 'Contract Signing', pct: 25, trigger: 'Executed contract + permit application submitted' },
    { stage: 'Materials Delivered', pct: 35, trigger: 'All materials on-site and verified by homeowner' },
    { stage: 'Rough Work Complete', pct: 30, trigger: 'Passed rough inspection (if applicable)' },
    { stage: 'Final Completion', pct: 10, trigger: 'Punch list cleared + final walkthrough approved' },
  ],
  medium: [
    { stage: 'Contract Signing', pct: 20, trigger: 'Executed contract + permit pulled' },
    { stage: 'Demo & Rough-In', pct: 25, trigger: 'Demo complete, rough-in passed inspection' },
    { stage: 'Mid-Point Milestone', pct: 30, trigger: 'Drywall, mechanicals, or specified milestone' },
    { stage: 'Near Completion', pct: 15, trigger: '95% complete per written punch list' },
    { stage: 'Final Acceptance', pct: 10, trigger: 'Certificate of occupancy + final walkthrough' },
  ],
  large: [
    { stage: 'Contract Signing', pct: 15, trigger: 'Executed contract + all permits pulled' },
    { stage: 'Foundation / Demo', pct: 20, trigger: 'Phase 1 inspection passed' },
    { stage: 'Framing / Rough-In', pct: 20, trigger: 'Framing inspection passed' },
    { stage: 'Mechanicals', pct: 20, trigger: 'MEP rough inspections passed' },
    { stage: 'Drywall & Finishes', pct: 15, trigger: 'Drywall complete, finishes 50%' },
    { stage: 'Final Acceptance', pct: 10, trigger: 'CO issued + punch list cleared' },
  ],
};

const labels: Record<string, string> = { small: 'Small ($5K–$25K)', medium: 'Medium ($25K–$100K)', large: 'Large ($100K+)' };

export default function DFWPaymentScheduleGuide2026() {
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>💰</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Payment Schedule Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Structure milestone payments that protect your money — never pay more than 30% upfront on any DFW project.</p>
        </div>

        <div style={{ background: '#7c2d12', border: '1px solid #ea580c', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <p style={{ margin: 0, fontWeight: 700, color: '#fed7aa' }}>⚠️ Texas Rule: Never pay more than 30% upfront. Any contractor requiring 50%+ upfront is a red flag.</p>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {(Object.keys(labels) as Array<keyof typeof labels>).map(k => (
            <button key={k} onClick={() => setSize(k as 'small' | 'medium' | 'large')}
              style={{ flex: 1, padding: '12px', borderRadius: 10, border: '2px solid', borderColor: size === k ? '#F5E642' : '#1e3a5f', background: size === k ? '#F5E642' : '#0f2340', color: size === k ? '#0A1628' : '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
              {labels[k]}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {schedules[size].map((s, i) => (
            <div key={i} style={{ background: '#0f2340', border: '1px solid #1e3a5f', borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ minWidth: 56, height: 56, borderRadius: '50%', background: '#F5E642', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A1628', fontWeight: 800, fontSize: 18 }}>{s.pct}%</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{s.stage}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>Release when: {s.trigger}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2340', border: '1px solid #1e3a5f', borderRadius: 16, padding: 20, marginTop: 24 }}>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>🔒 <strong style={{ color: '#F5E642' }}>ProLnk Payment Protection</strong> — All milestone payments are held in escrow and released only when you approve each stage. Your Health Vault documents every payment with photo verification.</p>
        </div>
      </div>
    </div>
  );
}
