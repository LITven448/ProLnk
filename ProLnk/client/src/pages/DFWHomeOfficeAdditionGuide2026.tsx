import { useState } from 'react';

const spaces = [
  {
    label: 'Garage Conversion',
    icon: '🚗',
    budget: '$15K–40K',
    permit: 'Building permit required; may affect fire rating',
    hvac: 'Mini-split (no existing HVAC)',
    fiber: 'Run from main panel or exterior conduit',
    pros: ['Most square footage for the money','Already has electrical — just needs upgrade','No new foundation required'],
    cons: ['Lose vehicle storage','May require insulation upgrade for DFW summers','Some HOAs restrict garage conversions'],
  },
  {
    label: 'Room Addition',
    icon: '🏗️',
    budget: '$40K–120K',
    permit: 'Full building permit + structural engineer',
    hvac: 'Extend existing system or add mini-split zone',
    fiber: 'Run internally through walls',
    pros: ['Fully integrated with home','Can extend existing HVAC','Highest property value increase'],
    cons: ['Most expensive option','Longest timeline (3–6 months)','Structural engineer required for load-bearing changes'],
  },
  {
    label: 'Backyard ADU',
    icon: '🏡',
    budget: '$30K–150K',
    permit: 'Separate building permit; city-specific ADU rules',
    hvac: 'Standalone mini-split required',
    fiber: 'Buried conduit from main house',
    pros: ['True work/life separation','Can be rented when not needed','Best acoustic isolation'],
    cons: ['Highest permit complexity','Requires underground utility run','HOA approval often needed'],
  },
];

export default function DFWHomeOfficeAdditionGuide2026() {
  const [idx, setIdx] = useState(0);
  const rec = spaces[idx];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Home Office Addition Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Add dedicated office space to your DFW home — pick your path</p>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Choose Your Addition Type</h2>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            {spaces.map((s, i) => (
              <button key={s.label} onClick={() => setIdx(i)}
                style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, flex: 1,
                  background: idx === i ? '#F5E642′ : '#1e3a5f', color: idx === i ? '#0A1628' : '#fff', fontWeight: idx === i ? 700 : 400 }}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            {[['💰 Budget Range', rec.budget],['📋 Permits', rec.permit],['❄️ HVAC', rec.hvac],['🌐 Fiber Run', rec.fiber]].map(([label, val]) => (
              <div key={String(label)} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{String(label)}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{String(val)}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>✅ Pros</div>
              {rec.pros.map(p => <div key={p} style={{ color: '#94a3b8', fontSize: 12, marginBottom: 6 }}>• {p}</div>)}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#f87171', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>⚠️ Cons</div>
              {rec.cons.map(c => <div key={c} style={{ color: '#94a3b8', fontSize: 12, marginBottom: 6 }}>• {c}</div>)}
            </div>
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📋 Every DFW Office Addition Needs</h3>
          {['Building permit — no exceptions, even for garage conversions','Fiber or ethernet conduit planned before walls close — impossible to add cleanly later','Mini-split HVAC or zoned extension — DFW summers hit 110°F, offices without AC are unusable','Dedicated 20A circuit minimum — shared circuits trip under desk + monitor + lighting load','GFCI protection on all office outlets near any water source or exterior wall'].map(tip => (
            <div key={tip} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
