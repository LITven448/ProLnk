import { useState } from 'react';

const PROXIMITY_OPTIONS = [
  { id: 'under-10', label: 'Pool within 10 ft of home', emoji: '🏊', risk: 'High', riskColor: '#FF4444', note: 'Soil disruption during excavation compromises perimeter beam. Annual foundation inspection required. Ensure pool drain points away from home.' },
  { id: '10-20', label: 'Pool 10–20 ft from home', emoji: '🌊', risk: 'Moderate', riskColor: '#FF8800', note: 'Hydrostatic pressure zone. Monitor clay soil expansion/contraction. Overflow and splash direction critical — must flow away from foundation.' },
  { id: 'over-20', label: 'Pool 20+ ft from home', emoji: '✅', risk: 'Low', riskColor: '#22C55E', note: 'Minimal direct risk. Maintain grade sloping away from home. Standard annual foundation monitoring sufficient.' },
  { id: 'planning', label: 'Planning a new pool', emoji: '📐', risk: 'Planning', riskColor: '#F5E642', note: 'Before digging: get a pre-construction foundation inspection. Require contractor to set pool drain 15+ ft from home, establish 6-in grade away from foundation.' },
];

const RISK_FACTORS = [
  { emoji: '💧', title: 'Overflow Direction', desc: 'Pool overflow and splash must drain away from the home. Improper grading saturates foundation soil — biggest pool-related risk in DFW.' },
  { emoji: '🏗️', title: 'Excavation Soil Disruption', desc: 'Pool excavation removes and disturbs compacted soil. Backfill settles unevenly in DFW clay — can cause perimeter beam settlement in first 2 years.' },
  { emoji: '⬇️', title: 'Hydrostatic Pressure', desc: 'Water pressure from a full pool can push against adjacent foundation. More critical in expansive DFW clay than in sandy soils.' },
  { emoji: '🌵', title: 'Evaporation & Refill Cycles', desc: 'DFW pools lose 1–2 inches/week to evaporation. Auto-fill systems continuously wet the perimeter soil — monitor for soil saturation near foundation.' },
];

export default function DFWFoundationSwimmingPool2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = PROXIMITY_OPTIONS.find(p => p.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏊</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 800, margin: '8px 0 4px' }}>
            DFW Swimming Pool and Foundation Guide 2026
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>How pools affect DFW slab foundations — risks, drainage, and prevention</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {RISK_FACTORS.map(r => (
            <div key={r.title} style={{ background: '#112240', borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 24 }}>{r.emoji}</div>
              <h3 style={{ color: '#F5E642', fontSize: 13, margin: '8px 0 6px' }}>{r.title}</h3>
              <p style={{ color: '#94A3B8', fontSize: 12, lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📏 Select Pool Proximity to Home → Foundation Risk Guide</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: 10, marginBottom: 24 }}>
          {PROXIMITY_OPTIONS.map(p => (
            <button key={p.id} onClick={() => setSelected(p.id === selected ? null : p.id)}
              style={{ background: selected === p.id ? '#1E3A5F' : '#112240', border: `2px solid ${selected === p.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '16px 12px', cursor: 'pointer', color: '#fff', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{p.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 8 }}>{p.label}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: p.riskColor, marginTop: 6, textTransform: 'uppercase' }}>{p.risk} Risk</div>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24, border: `2px solid ${active.riskColor}` }}>
            <div style={{ fontSize: 32 }}>{active.emoji}</div>
            <h3 style={{ color: '#F5E642', margin: '8px 0' }}>{active.label}</h3>
            <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{active.note}</p>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 18, marginBottom: 24, borderLeft: '4px solid #F5E642' }}>
          <h3 style={{ color: '#F5E642', fontSize: 14, margin: '0 0 8px' }}>✅ Key Drainage Rule for All DFW Pool Homes</h3>
          <p style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
            Grade must slope at least 6 inches over 10 feet away from the foundation on all sides — including pool side. If pool is uphill from home, install a French drain between pool and foundation perimeter.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94A3B8', fontSize: 13, margin: '0 0 12px' }}>Get a foundation inspection before or after pool installation</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            🔍 Find Foundation Pros in DFW
          </button>
        </div>
      </div>
    </div>
  );
}
