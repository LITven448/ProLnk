import { useState } from 'react';

const scopeData: Record<string, Record<string, string[]>> = {
  'Under 3,000 sqft': {
    '2015-2020': [
      '❄️ 2-ton HVAC — approaching first service at 6–10 years',
      '🏗️ Foundation still settling — monitor door frames annually',
      '🏘️ HOA landscaping standards — irrigation backflow test required',
      '🪟 Builder windows at mid-life — seal performance check',
      '🔋 Smoke/CO detectors — replace at 10-year mark',
    ],
    '2020-2026': [
      '📋 Builder warranty active — document all cosmetic and structural items',
      '🌿 Establish positive drainage in first 2 years — Prosper clay soil critical',
      '🏗️ Truss settling — minor drywall cracks at ceiling are normal',
      '🔌 Pre-wire for EV charger — builder conduit usually roughed in',
      '🛡️ HOA architectural committee approval for any exterior change',
    ],
  },
  'Over 3,000 sqft': {
    '2015-2020': [
      '❄️ Dual-zone HVAC — two systems, two replacement timelines to manage',
      '🏗️ Large footprint slab — perimeter inspection for differential settlement',
      '💧 3+ bathrooms = complex plumbing manifold — annual leak audit',
      '🌳 Mature landscaping pressure — root barrier installation recommended',
      '🔆 Media room / bonus room — check attic spray foam adequacy',
    ],
    '2020-2026': [
      '🏗️ Large new-build slab — higher settling risk over 3,000 sqft footprint',
      '🌬️ 3-zone HVAC design — verify balancing at 1-year anniversary',
      '📋 Punch list items — Prosper builders have long queues; document early',
      '🪟 Large windows common — thermal seal warranty claim window open',
      '🌿 Acreage lots — well and septic if outside city utility boundary',
    ],
  },
};

export default function DFWProsperhomeownerGuide2026B() {
  const [size, setSize] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const sizes = Object.keys(scopeData);
  const ages = ['2015-2020', '2020-2026'];
  const tips = size && age ? scopeData[size]?.[age] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · PROSPER TX · PART 2 OF 2</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Prosper TX Homeowner Deep Dive 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Prosper's premium market — $600K+ median, large homes, active HOA, and nearly all built 2015–2026. Your maintenance scope depends on both size and age.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 28 }}>
          {[{ icon: '💰', label: 'Median Home Price', val: '$600K+ (2026)' }, { icon: '📐', label: 'Avg Home Size', val: '3,200 sqft' }, { icon: '🏘️', label: 'HOA Saturation', val: '~90% of neighborhoods' }, { icon: '🏗️', label: 'Build Vintage', val: '95% built 2015–2026′ }].map(c => (
            <div key={c.label} style={{ background: '#111e35', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22 }}>{c.icon}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{c.label}</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>{c.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📐 Your Prosper Maintenance Scope</h2>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Home Size</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {sizes.map(s => (
                <button key={s} onClick={() => setSize(s === size ? null : s)}
                  style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, background: size === s ? '#F5E642′ : '#1e2f4a', color: size === s ? '#0A1628' : '#fff' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Build Year</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {ages.map(a => (
                <button key={a} onClick={() => setAge(a === age ? null : a)}
                  style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, background: age === a ? '#F5E642′ : '#1e2f4a', color: age === a ? '#0A1628' : '#fff' }}>
                  {a}
                </button>
              ))}
            </div>
          </div>
          {tips && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginTop: 8 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>{size} · {age} Scope</div>
              {tips.map((t, i) => <div key={i} style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.5 }}>{t}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🏘️ Prosper HOA Pro Tips</h2>
          {[{ icon: '📝', text: 'Submit ARC applications 30+ days before any exterior project — Prosper HOAs are strict' }, { icon: '🌿', text: 'Landscaping maintenance plans — keep records for HOA compliance inspections' }, { icon: '💰', text: 'Special assessments risk — verify reserve fund health before buying in any community' }].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.5 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#F5E642', borderRadius: 10, color: '#0A1628', textAlign: 'center', fontWeight: 700 }}>
          Get Prosper-Verified Pros on ProLnk — Free Quotes in 24 Hours
        </div>
      </div>
    </div>
  );
}