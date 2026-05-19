import { useState } from 'react';

const violations = [
  {
    type: 'Faded Paint', icon: '🎨', window: 'Mar–May & Sep–Nov',
    steps: ['Match existing color using HOA-approved palette', 'Prep surfaces: scrape, sand, prime all peeling areas', 'Use exterior-grade paint rated for Texas UV exposure', 'Complete within HOA-mandated 30-day cure window', 'Submit completion photo to HOA portal before deadline']
  },
  {
    type: 'Dead Grass/Lawn', icon: '🌿', window: 'Apr–Jun & Sep–Oct',
    steps: ['Soil test first — DFW clay soil often needs amendment', 'Reseed or lay sod (Bermuda/St. Augustine for DFW climate)', 'Install or repair irrigation zones if watering is the issue', 'Apply starter fertilizer and keep consistently watered', 'Document progress photos weekly for HOA records']
  },
  {
    type: 'Visible AC Unit', icon: '❄️', window: 'Year-round enforcement',
    steps: ['Install HOA-approved screening fence or lattice', 'Ensure screen allows minimum 18″ clearance for airflow', 'Use natural materials — wood or composite, not chain link', 'Submit screen plan to HOA for pre-approval', 'Professional installation recommended for permit compliance']
  },
  {
    type: 'Fence Damage', icon: '🪵', window: 'Spring/Fall inspections',
    steps: ['Replace broken boards with matching material and stain', 'Check post footings — DFW soil shifts seasonally', 'Confirm fence height complies with HOA rules (typically 6ft)', 'Use HOA-approved wood species or composite only', 'Obtain HOA variance approval if replacing full fence run']
  },
];

export default function DFWHOACompliance2026() {
  const [active, setActive] = useState(violations[0]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>PROLNK — DFW MARKET REPORT</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>DFW HOA Compliance — 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          Over <span style={{ color: '#F5E642', fontWeight: 700 }}>60% of DFW neighborhoods</span> have active HOAs. Fines start at $100/day. Know your inspection windows and fix fast.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 24 }}>
          {[{label:'Avg HOA Fine',val:'$150/day',color:'#f87171'},{label:'Inspections/Yr',val:'2–4x',color:'#F5E642'},{label:'Cure Window',val:'14–30 days',color:'#4ade80'}].map(s => (
            <div key={s.label} style={{ background: '#111c35', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: s.color, fontWeight: 800, fontSize: 20 }}>{s.val}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111c35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>🔍 Select Violation Type</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {violations.map(v => (
              <button key={v.type} onClick={() => setActive(v)}
                style={{ background: active.type === v.type ? '#F5E642′ : '#1a2f52', color: active.type === v.type ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {v.icon} {v.type}
              </button>
            ))}
          </div>
          <div style={{ marginBottom: 8 }}>
            <span style={{ color: '#94a3b8', fontSize: 13 }}>Inspection window: </span>
            <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{active.window}</span>
          </div>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>{active.icon} Remediation Steps</div>
          {active.steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
              <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 7px', fontWeight: 700, fontSize: 12, minWidth: 22, textAlign: 'center' }}>{i + 1}</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{s}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2444', border: '1px solid #F5E642', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>✅ ProLnk HOA-Approved Contractors</div>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk screens contractors on HOA material requirements and local permit compliance — so your fix gets approved the first time.</p>
        </div>
      </div>
    </div>
  );
}