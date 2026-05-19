import { useState } from 'react';

const scenarios = [
  {
    id: 'weather', icon: '🌧️', label: 'Weather Delay',
    guide: 'Legitimate if documented (photos + weather report). Should only extend timeline, NOT increase cost unless materials are exposed. Require written notice within 48 hours of delay.',
    verdict: 'Usually Legitimate', color: '#16a34a'
  },
  {
    id: 'hidden', icon: '🔍', label: 'Hidden Damage Found',
    guide: 'Legitimate only if truly hidden (not visible with reasonable inspection). Contractor must stop work, document with photos, and get written approval BEFORE proceeding. Get a second opinion on cost.',
    verdict: 'Verify Carefully', color: '#d97706'
  },
  {
    id: 'upgrade', icon: '⬆️', label: 'Material Upgrade Request',
    guide: 'This is your choice, not theirs. Never accept verbal upgrade agreements. Every upgrade needs a written CO with exact cost delta signed before materials are ordered.',
    verdict: 'Always Legitimate (if you agreed)', color: '#16a34a'
  },
  {
    id: 'permit', icon: '📋', label: 'Permit / Inspection Failure',
    guide: 'If contractor failed inspection due to substandard work, they pay to rework — not you. If it failed due to design changes you requested, that is a valid CO. Get the inspection report in writing.',
    verdict: 'Depends on Cause', color: '#d97706'
  },
  {
    id: 'scope', icon: '📐', label: 'Scope Creep / While We Are At It',
    guide: 'Classic red flag. Verbal additions are how DFW homeowners lose thousands. Stop work, write a formal CO, sign it, then proceed. No exceptions.',
    verdict: 'Red Flag — Get It in Writing', color: '#dc2626'
  },
  {
    id: 'labor', icon: '👷', label: 'Labor Cost Increase',
    guide: 'Contractor absorbs labor cost increases unless the contract explicitly includes an escalation clause. Fixed-price contracts are binding in Texas. Reject any CO for labor increases on fixed bids.',
    verdict: 'Usually Illegitimate', color: '#dc2626'
  },
];

export default function DFWChangeOrderGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = scenarios.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔄</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Change Order Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Scope creep is the #1 budget killer in DFW renovations. Select a scenario to evaluate the change order.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {scenarios.map(s => (
            <button key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{ background: '#0f2340', border: '2px solid', borderColor: selected === s.id ? '#F5E642' : '#1e3a5f', borderRadius: 12, padding: 16, cursor: 'pointer', color: '#fff', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{s.label}</span>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0f2340', border: '2px solid #F5E642', borderRadius: 16, padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h2 style={{ margin: 0, color: '#F5E642', fontSize: 18 }}>{active.icon} {active.label}</h2>
              <span style={{ background: active.color, color: '#fff', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>{active.verdict}</span>
            </div>
            <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.7 }}>{active.guide}</p>
          </div>
        )}

        <div style={{ background: '#0f2340', border: '1px solid #1e3a5f', borderRadius: 16, padding: 20 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 700, color: '#F5E642' }}>📌 The Golden Rule</p>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>Every change to scope, cost, or timeline must be in writing and signed by both parties BEFORE work starts. ProLnk contractors use digital COs stored in your Health Vault — no verbal agreements, ever.</p>
        </div>
      </div>
    </div>
  );
}
