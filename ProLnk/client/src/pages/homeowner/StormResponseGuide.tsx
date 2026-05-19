import { useState } from 'react';

const phases = [
  {
    id: 'first2',
    label: '⏱️ First 2 Hours',
    color: '#f87171',
    items: [
      { id: 's1', text: 'Stay inside until storm fully passes — Texas severe weather can spawn multiple cells' },
      { id: 's2', text: 'Check for obvious structural damage before entering outbuildings' },
      { id: 's3', text: 'VIDEO walk your entire property BEFORE any cleanup — document everything' },
      { id: 's4', text: 'Check for gas odors — if detected, evacuate and call Atmos 800-460-3030′ },
      { id: 's5', text: 'Check for downed power lines — stay 30+ feet away, call Oncor 888-313-4747′ },
    ],
  },
  {
    id: 'hours24',
    label: '🕐 Hours 2–24',
    color: '#fbbf24',
    items: [
      { id: 'h1', text: 'Photograph ALL damage thoroughly (required for insurance claim)' },
      { id: 'h2', text: 'Make TEMPORARY repairs only — tarps on roof holes, board broken windows' },
      { id: 'h3', text: 'Do NOT sign anything with a contractor yet' },
      { id: 'h4', text: 'Call your insurance company to report damage and get your claim number' },
      { id: 'h5', text: 'File claim within 24–48 hours — many policies have strict notification deadlines' },
    ],
  },
  {
    id: 'days7',
    label: '📅 Days 2–7',
    color: '#34d399',
    items: [
      { id: 'd1', text: 'Get 3 contractor estimates BEFORE accepting any insurance settlement offer' },
      { id: 'd2', text: 'Verify contractor license — TDLR required for HVAC, electrical, plumbing (not roofing)' },
      { id: 'd3', text: 'Consider a public adjuster if settlement seems low (10–15% fee, often worth it on large claims)' },
      { id: 'd4', text: 'Request adjuster re-inspection if you disagree with the damage assessment' },
    ],
  },
];

export default function StormResponseGuide() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [activePhase, setActivePhase] = useState('first2');

  function toggle(id: string) {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const total = phases.flatMap((p) => p.items).length;
  const done = Object.values(completed).filter(Boolean).length;

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ color: '#f87171', fontSize: 14, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
            ⛈️ Emergency Response Guide
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px' }}>
            After the Storm
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', margin: 0 }}>
            DFW Homeowner's Hour-by-Hour Response Checklist
          </p>
          <div style={{ marginTop: 20, padding: '16px 20px', background: '#2d1a1a', borderRadius: 10, borderLeft: '4px solid #f87171′ }}>
            <strong style={{ color: '#f87171′ }}>Critical:</strong>
            <span style={{ color: '#fca5a5', marginLeft: 8 }}>
              Do NOT sign anything with a contractor until you have your insurance claim number and at least 2–3 estimates.
              Storm chasers target DFW neighborhoods within hours of major events.
            </span>
          </div>
        </div>

        {/* Progress */}
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, padding: 20, marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: '#94a3b8', fontWeight: 600 }}>Response Checklist Progress</span>
            <span style={{ color: '#e2e8f0', fontWeight: 700 }}>{done}/{total} completed</span>
          </div>
          <div style={{ background: '#1e293b', borderRadius: 6, height: 8 }}>
            <div style={{ background: done === total ? '#34d399′ : '#6366f1', height: 8, borderRadius: 6, width: `${(done / total) * 100}%`, transition: ’width 0.3s' }} />
          </div>
          {done === total && (
            <div style={{ color: '#34d399', fontWeight: 600, marginTop: 10, textAlign: 'center' }}>
              ✅ All response steps complete. You're protected.
            </div>
          )}
        </div>

        {/* Phase Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {phases.map((p) => (
            <button key={p.id} onClick={() => setActivePhase(p.id)} style={{
              padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: activePhase === p.id ? p.color : '#1e293b',
              color: activePhase === p.id ? '#0a0a0f' : '#94a3b8',
            }}>{p.label}</button>
          ))}
        </div>

        {/* Active Phase Items */}
        {phases.filter((p) => p.id === activePhase).map((phase) => (
          <div key={phase.id} style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {phase.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 14,
                    background: completed[item.id] ? '#0d2a1e' : '#0f172a',
                    border: `1px solid ${completed[item.id] ? '#34d399' : '#1e293b'}`,
                    borderRadius: 10, padding: '16px 18px', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                    background: completed[item.id] ? '#34d399′ : ’transparent',
                    border: `2px solid ${completed[item.id] ? '#34d399' : '#334155'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#0a0a0f', fontSize: 13, fontWeight: 900,
                  }}>
                    {completed[item.id] ? '✓' : ''}
                  </div>
                  <span style={{
                    color: completed[item.id] ? '#64748b' : '#e2e8f0',
                    textDecoration: completed[item.id] ? 'line-through' : 'none',
                    lineHeight: 1.6, fontSize: 15,
                  }}>
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Key Warnings */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16, marginBottom: 40 }}>
          <div style={{ background: '#2d1a1a', border: '1px solid #f87171', borderRadius: 10, padding: 20 }}>
            <h4 style={{ color: '#f87171', marginTop: 0 }}>⚠️ Emergency Contacts</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                ['Gas Emergency', 'Atmos 800-460-3030'],
                ['Power Lines', 'Oncor 888-313-4747'],
                ['Police Non-Emergency', '911 (if emergency)'],
              ].map(([label, num]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8', fontSize: 14 }}>{label}</span>
                  <span style={{ color: '#fca5a5', fontWeight: 600, fontSize: 14 }}>{num}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#1a1a0d', border: '1px solid #fbbf24', borderRadius: 10, padding: 20 }}>
            <h4 style={{ color: '#fbbf24', marginTop: 0 }}>⚠️ Contractor Red Flags</h4>
            <ul style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, paddingLeft: 18, margin: 0 }}>
              <li>Asks you to sign anything before inspection</li>
              <li>Demands large cash payment upfront</li>
              <li>Can't provide a physical address or license number</li>
              <li>Knocked on your door unsolicited after the storm</li>
            </ul>
          </div>
          <div style={{ background: '#0d2a1e', border: '1px solid #34d399', borderRadius: 10, padding: 20 }}>
            <h4 style={{ color: '#34d399', marginTop: 0 }}>✅ Public Adjuster Info</h4>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              A licensed public adjuster works for YOU (not the insurance company). Typical fee: 10–15% of settlement.
              Worth hiring when your claim exceeds $10,000 and the initial offer seems low.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🛠️</div>
          <h3 style={{ color: '#e2e8f0', marginTop: 0 }}>Get Storm Damage Repair Quotes</h3>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>ProLnk connects you with licensed, verified contractors — no storm chasers, no door-knockers.</p>
          <button style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff',
            border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16,
            fontWeight: 700, cursor: 'pointer',
          }}>
            Get Verified Storm Repair Quotes →
          </button>
        </div>

      </div>
    </div>
  );
}
