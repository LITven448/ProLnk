import { useState } from 'react';

export default function DFWPressureWashingGuide2026() {
  const [surface, setSurface] = useState('driveway');

  const surfaceData: Record<string, { service: string; costRange: string; frequency: string; warning?: string }> = {
    driveway: {
      service: 'High-pressure concrete wash + optional sealing',
      costRange: '$150 - $250',
      frequency: 'Once per year (after pollen season)',
    },
    house: {
      service: 'Soft-wash exterior house cleaning (safe for siding)',
      costRange: '$300 - $600',
      frequency: 'Every 1-2 years',
    },
    roof: {
      service: 'Low-pressure soft-wash (NEVER high-pressure)',
      costRange: '$350 - $700',
      frequency: 'Every 2-3 years',
      warning: 'High pressure WILL damage shingles. Only hire soft-wash certified pros for roofs.',
    },
    deck: {
      service: 'Medium-pressure deck wash + stain/seal option',
      costRange: '$200 - $400',
      frequency: 'Every 1-2 years + re-seal every 2 years',
    },
    fence: {
      service: 'Low-to-medium pressure wash (wood) or high-pressure (vinyl)',
      costRange: '$150 - $350',
      frequency: 'Annually before re-staining wood',
    },
  };

  const s = surfaceData[surface];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2 }}>DFW HOME SERVICES 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>💧 DFW Pressure Washing Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW pollen season (Feb-May) + summer dust coats everything. Annual washing protects surfaces and keeps curb appeal high. Roof soft-washing is critical — high pressure destroys shingles.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[{ icon: '🌿', label: 'Pollen Season', val: 'Feb-May peak' }, { icon: '⚠️', label: 'Roof Warning', val: 'Soft-wash only' }, { icon: '🔒', label: 'Sealing After', val: 'Extends surface life' }].map((s, i) => (
            <div key={i} style={{ background: '#1E2D45', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: 14, marginTop: 4, color: '#cbd5e1' }}>{s.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 Service Recommender</h2>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>SELECT SURFACE</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {Object.keys(surfaceData).map(t => (
                <button key={t} onClick={() => setSurface(t)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                    background: surface === t ? '#F5E642' : '#2d3f5a', color: surface === t ? '#0A1628' : '#fff' }}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {s.warning && (
            <div style={{ background: '#7c2d12', borderRadius: 10, padding: 14, marginBottom: 16, color: '#fed7aa', fontSize: 14 }}>
              ⚠️ {s.warning}
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>TYPICAL COST</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{s.costRange}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>RECOMMENDED FREQUENCY</div>
              <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 700, marginTop: 4 }}>{s.frequency}</div>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 14, color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>
            <strong style={{ color: '#F5E642' }}>Recommended Service: </strong>{s.service}
          </div>
        </div>
      </div>
    </div>
  );
}