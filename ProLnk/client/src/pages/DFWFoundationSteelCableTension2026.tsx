import { useState } from 'react';

const concerns = [
  {
    id: 'visible_cracks', label: 'Visible Concrete Cracks', icon: '🔍',
    assessment: 'Medium-High Risk', color: '#f97316',
    detail: 'Diagonal cracks near cable anchors or spalling indicate cable stress zone failure. Map crack direction — 45° angles near slab edges = PT cable concern.',
    action: 'Hire structural engineer for PT-specific inspection within 30 days'
  },
  {
    id: 'heave_movement', label: 'Slab Heave / Movement', icon: '⬆️',
    assessment: 'High Risk', color: '#ef4444',
    detail: 'DFW expansive clay can exert 20,000+ lbs/sf upward. PT cables designed for 33,000-35,000 lb tension may be overloaded during extreme wet seasons.',
    action: 'Immediate structural engineer call — heave + PT = potential cable rupture risk'
  },
  {
    id: 'anchor_pop', label: 'Anchor End Popping / Rust Staining', icon: '🔩',
    assessment: 'Critical', color: '#dc2626',
    detail: 'Rust staining at PT cable pockets or exposed anchor ends means corrosion has compromised the cable sheath. Cable tension may be failing.',
    action: 'Do not ignore — structural engineer ASAP, possible emergency shoring'
  },
  {
    id: 'no_symptoms', label: 'No Visible Symptoms', icon: '✅',
    assessment: 'Monitoring Mode', color: '#4ade80',
    detail: 'PT slabs often fail internally before surface signs appear. DFW homes should have PT slab inspected every 5-7 years by qualified structural engineer.',
    action: 'Schedule preventive inspection — document cable layout from builder plans'
  },
];

const facts = [
  { icon: '⚡', label: 'Initial Tension', value: '33,000–35,000 lbs per cable' },
  { icon: '📐', label: 'Typical Cable Spacing', value: '4–6 feet on center' },
  { icon: '🏗️', label: 'Stressing Age', value: 'Typically 3-10 days after pour' },
  { icon: '🌧️', label: 'DFW Heave Risk', value: 'Clay expansion = added cable stress' },
];

export default function DFWFoundationSteelCableTension2026() {
  const [selected, setSelected] = useState('no_symptoms');
  const current = concerns.find(c => c.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔩</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Post-Tension Cable Tension Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Understanding cable tension in DFW PT slabs — risks, signs, and when to call an engineer</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {facts.map(f => (
            <div key={f.label} style={{ background: '#111d33', borderRadius: 10, padding: 14, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 22 }}>{f.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{f.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginTop: 2 }}>{f.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d33', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>Select Your PT Concern</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {concerns.map(c => (
              <div key={c.id} onClick={() => setSelected(c.id)}
                style={{ background: selected === c.id ? '#1a2a4a' : '#0A1628', border: `2px solid ${selected === c.id ? c.color : '#1e3a5f'}`, borderRadius: 8, padding: '12px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>{c.icon}</span>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{c.label}</div>
                  <div style={{ color: c.color, fontSize: 12, fontWeight: 700 }}>{c.assessment}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111d33', borderRadius: 12, padding: 20, marginBottom: 24, border: `2px solid ${current.color}` }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>{current.icon}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <h2 style={{ color: current.color, fontSize: 18, margin: 0 }}>{current.assessment}</h2>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{current.detail}</p>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', borderLeft: `4px solid ${current.color}` }}>
            <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 2 }}>RECOMMENDED ACTION</div>
            <div style={{ color: '#cbd5e1', fontSize: 13 }}>{current.action}</div>
          </div>
        </div>

        <div style={{ background: '#111d33', borderRadius: 12, padding: 18, border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 8 }}>⚠️ DFW PT Slab Reality Check</h3>
          <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
            Over 70% of DFW homes built after 1980 use post-tension slabs. DFW clay soil (PI 40-60+) 
            is among the most expansive in North America. Most PT failures in DFW are not from cable 
            defect — they are from prolonged drought followed by rapid saturation, causing uneven heave 
            that exceeds cable design parameters. Structural engineers with PT-specific experience are 
            essential — general foundation repair companies may not assess cable condition.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, color: '#475569', fontSize: 12 }}>
          ProLnk DFW Homeowner Resource · Dallas-Fort Worth · 2026
        </div>
      </div>
    </div>
  );
}
