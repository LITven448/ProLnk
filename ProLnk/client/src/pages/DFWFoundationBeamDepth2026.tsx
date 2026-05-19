import { useState } from 'react';

const vintages = [
  {
    era: 'Pre-1960',
    icon: '🏚️',
    beamSpec: 'Conventional reinforced concrete — no post-tension cables. Exterior grade beams typically 18–24 inches deep, 12 inches wide. Interior turndown beams at 12–16 inches.',
    concern: 'High',
    note: 'Pre-code construction — beam depth and rebar may be undersized by modern standards. Full engineer assessment recommended before any repair.',
  },
  {
    era: '1960–1980',
    icon: '🏠',
    beamSpec: 'Early post-tension slab introduction. Mixed conventional and PT construction. Grade beams 18–24 inches typical. PT cables run in a grid — usually 4 ft centers.',
    concern: 'Medium-High',
    note: 'Check for early PT cable corrosion — common in DFW homes from this era. Look for pop-outs at slab edges indicating cable failure.',
  },
  {
    era: '1980–2000',
    icon: '🏡',
    beamSpec: 'Standard post-tension slab. Grade beams 18–24 in deep, PT cables every 4–5 ft on center. Typical DFW slab 4 inches thick with PT reinforcement.',
    concern: 'Medium',
    note: 'Well-documented era. TxDOT and city building codes consistent. Permits accessible through city records or ProLnk Vault lookup.',
  },
  {
    era: '2000–Present',
    icon: '🏘️',
    beamSpec: 'Modern post-tension per ACI 318. Grade beams 24 inches deep minimum in high-PI clay zones. PT cables every 5 ft, stressing logs filed with city.',
    concern: 'Lower',
    note: 'Best documentation era. Stressing records, engineer inspections, and soil reports should be available. Demand full documentation packet.',
  },
];

export default function DFWFoundationBeamDepth2026() {
  const [active, setActive] = useState(2);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: 48 }}>📐</span>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>DFW Foundation Beam Depth Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 16 }}>What's under your DFW slab — beam specs by home vintage</p>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🗓️ Select Your Home's Era</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {vintages.map((v, i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{ padding: '12px 8px', borderRadius: 8, border: active === i ? '2px solid #F5E642′ : '2px solid #334155',
                  backgroundColor: active === i ? '#0A1628′ : '#0F2340', color: active === i ? '#F5E642' : '#CBD5E1',
                  cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                {v.icon}<br />{v.era}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 20, backgroundColor: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>Era: {vintages[active].era}</span>
              <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                backgroundColor: vintages[active].concern === 'High' || vintages[active].concern === 'Medium-High' ? '#7F1D1D' : '#14532D',
                color: vintages[active].concern === 'High' || vintages[active].concern === 'Medium-High' ? '#FCA5A5′ : '#86EFAC' }}>
                Risk: {vintages[active].concern}
              </span>
            </div>
            <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7, marginBottom: 10 }}>{vintages[active].beamSpec}</p>
            <p style={{ color: '#94A3B8', fontSize: 13, fontStyle: 'italic' }}>💡 {vintages[active].note}</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 10 }}>🌍 DFW High-PI Clay Zones</h3>
          <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7 }}>
            Areas with Plasticity Index above 40 — Plano, Allen, McKinney, Flower Mound — require deeper beams by local amendment.
            Depth requirements can reach 30+ inches in these zones. Always verify local soil PI before evaluating beam adequacy.
          </p>
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>🏗️ ProLnk connects you with DFW engineers who read original PT stressing logs — not just visual inspections.</p>
        </div>
      </div>
    </div>
  );
}
