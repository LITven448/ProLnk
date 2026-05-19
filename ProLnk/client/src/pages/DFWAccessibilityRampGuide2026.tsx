import { useState } from 'react';

const riseOptions = [
  { label: '1–2 Steps (6″–14″)', rampLength: '6–14 ft', material: 'Modular aluminum or wood', cost: '$1,500–$2,500', permit: 'Usually not required for portable/modular ramps in DFW.' },
  { label: '3–4 Steps (18″–28″)', rampLength: '18–28 ft', material: 'Aluminum modular or concrete', cost: '$2,500–$4,000', permit: 'Permit required for permanent ramps in most DFW municipalities.' },
  { label: '5–6 Steps (30″–42″)', rampLength: '30–42 ft', material: 'Concrete with handrails or switchback design', cost: '$4,000–$7,000', permit: 'Permit required. Switchback design may be needed to fit property.' },
];

export default function DFWAccessibilityRampGuide2026() {
  const [riseIdx, setRiseIdx] = useState<number | null>(null);
  const [matIdx, setMatIdx] = useState<number | null>(null);

  const materials = [
    { name: 'Modular Aluminum', pros: 'Portable, no permit, rust-proof, ADA-compliant', cons: 'Higher upfront cost than wood, industrial look' },
    { name: 'Pressure-Treated Wood', pros: 'Lower cost, blends with home aesthetic', cons: 'Requires sealing, can warp in DFW heat/humidity' },
    { name: 'Concrete', pros: 'Permanent, low maintenance, highest durability', cons: 'Most expensive, requires permit, not portable' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '0.3rem 0.8rem', borderRadius: 4, fontWeight: 700, marginBottom: '1rem', fontSize: 13 }}>
          DFW GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>♿ Accessibility Ramp Guide — DFW 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.7 }}>
          ADA standard is 1 foot of ramp per 1 inch of rise (1:12 slope). DFW costs range $1,500–$5,000+. Permanent ramps require permits in most DFW cities. Modular aluminum ramps can often be installed without a permit.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[{ label: 'ADA Slope Standard', value: '1:12', icon: '📐' }, { label: 'DFW Avg Cost', value: '$1.5K–$5K', icon: '💰' }, { label: 'Permit (Permanent)', value: 'Required', icon: '📋' }, { label: 'Modular Permit', value: 'Usually No', icon: '✅' }].map(s => (
            <div key={s.label} style={{ background: '#132036', borderRadius: 10, padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F5E642′ }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642′ }}>How many steps do you need to overcome?</h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {riseOptions.map((r, i) => (
            <button key={i} onClick={() => setRiseIdx(i === riseIdx ? null : i)}
              style={{ background: riseIdx === i ? '#F5E642′ : '#132036', color: riseIdx === i ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '0.65rem 1.1rem', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
              {r.label}
            </button>
          ))}
        </div>

        {riseIdx !== null && (
          <div style={{ background: '#132036', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
              {[['Ramp Length Needed', riseOptions[riseIdx].rampLength], ['Recommended Material', riseOptions[riseIdx].material], ['Estimated Cost', riseOptions[riseIdx].cost]].map(([k, v]) => (
                <div key={k}><div style={{ fontSize: 12, color: '#94A3B8′ }}>{k}</div><div style={{ fontWeight: 700, color: '#F5E642', marginTop: 4 }}>{v}</div></div>
              ))}
            </div>
            <p style={{ color: '#94A3B8', fontSize: 13, marginTop: '1rem' }}>{riseOptions[riseIdx].permit}</p>
          </div>
        )}

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642′ }}>Compare Ramp Materials</h2>
        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
          {materials.map((m, i) => (
            <button key={i} onClick={() => setMatIdx(matIdx === i ? null : i)}
              style={{ background: matIdx === i ? '#1a3a60′ : '#132036', color: '#fff', border: matIdx === i ? '2px solid #F5E642' : '2px solid transparent', borderRadius: 10, padding: '1rem', cursor: ’pointer', textAlign: 'left' }}>
              <div style={{ fontWeight: 700, marginBottom: matIdx === i ? 8 : 0 }}>{m.name}</div>
              {matIdx === i && <div style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6 }}><strong style={{ color: '#4ade80′ }}>Pros:</strong> {m.pros}<br /><strong style={{ color: '#f87171' }}>Cons:</strong> {m.cons}</div>}
            </button>
          ))}
        </div>

        <div style={{ background: '#132036', borderRadius: 10, padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>🔧 Get Ramp Quotes from DFW Contractors</h3>
          <p style={{ color: '#94A3B8', marginBottom: '1rem', fontSize: 14 }}>ProLnk connects you with licensed contractors who build ADA-compliant ramps across the DFW metroplex.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Get Free Ramp Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}