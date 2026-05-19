import { useState } from 'react';

const homeSizes = [
  { label: 'Under 1,500 sq ft', piers: '8–12 piers', pattern: '4 corners + 4–8 perimeter. Corners take priority — install first. Interior load wall gets 2–3 if slab shows center sag.' },
  { label: '1,500–2,500 sq ft', piers: '12–18 piers', pattern: 'All 4 corners + perimeter every 7–9 ft + interior load-bearing walls. Most common DFW single-story configuration.' },
  { label: '2,500–4,000 sq ft', piers: '18–28 piers', pattern: 'Corner piers + perimeter every 7 ft + full interior grid under load walls. 2-story homes add stairwell support piers.' },
  { label: 'Over 4,000 sq ft', piers: '28–50+ piers', pattern: 'Engineer-specified grid. Full perimeter + interior matrix. Often mixed helical (new movement) and push pier (stable areas).' },
];

const pierTypes = [
  {
    type: 'Push Piers',
    icon: '⬇️',
    depth: '15–20 ft in DFW (to bedrock or stable layer)',
    placement: 'Best for settled, stable-soil areas. Hydraulic pressure drives steel pipe to refusal. Exterior walls preferred.',
  },
  {
    type: 'Helical Piers',
    icon: '🌀',
    depth: '12–18 ft typical, deeper in high-PI clay zones',
    placement: 'Best for interior and tight-access areas. Screwed in with torque motor. Can install in confined spaces — ideal for interior load walls.',
  },
];

export default function DFWSlabFoundationPierPattern2026() {
  const [sizeIdx, setSizeIdx] = useState(1);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: 48 }}>📍</span>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>DFW Foundation Pier Placement Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 16 }}>How DFW contractors determine where — and how deep — every pier goes</p>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏠 Select Your Home Size</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }}>
            {homeSizes.map((h, i) => (
              <button key={i} onClick={() => setSizeIdx(i)}
                style={{ padding: '12px', borderRadius: 8, border: sizeIdx === i ? '2px solid #F5E642′ : '2px solid #334155',
                  backgroundColor: sizeIdx === i ? '#0A1628′ : '#0F2340', color: sizeIdx === i ? '#F5E642' : '#CBD5E1',
                  cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                {h.label}
              </button>
            ))}
          </div>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
            <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Estimated: {homeSizes[sizeIdx].piers}</p>
            <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7 }}>{homeSizes[sizeIdx].pattern}</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔩 Pier Type Placement Rules</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {pierTypes.map((p, i) => (
              <div key={i} style={{ backgroundColor: '#0F2340', borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: 22, marginBottom: 6 }}>{p.icon}</p>
                <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{p.type}</p>
                <p style={{ color: '#94A3B8', fontSize: 12, marginBottom: 8 }}>Depth: {p.depth}</p>
                <p style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.6 }}>{p.placement}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 10 }}>📏 DFW Spacing Standard</h3>
          <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7 }}>
            Industry standard in DFW is 7–10 feet between piers along the perimeter. High-PI Expansive clay areas (Plano, McKinney, Frisco)
            often require tighter 6–7 ft spacing. Never accept spacing over 10 ft — it leaves unsupported spans vulnerable to DFW seasonal movement.
          </p>
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>🗺️ ProLnk connects you with DFW engineers who provide written pier placement plans — not just verbal estimates.</p>
        </div>
      </div>
    </div>
  );
}
