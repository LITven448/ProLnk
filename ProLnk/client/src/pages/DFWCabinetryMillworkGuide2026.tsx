import { useState } from 'react';

export default function DFWCabinetryMillworkGuide2026() {
  const [projectType, setProjectType] = useState('kitchen');
  const [budget, setBudget] = useState('mid');

  const recommendations: Record<string, Record<string, string>> = {
    kitchen: {
      low: 'Stock cabinets — available immediately, limited customization. Expect $3K-8K installed.',
      mid: 'Semi-custom — 6-8 week lead time, more finish options, $10K-25K installed.',
      high: 'Custom cabinetry — 10-16 week lead time, unlimited design, $25K-60K+ installed.',
    },
    bathroom: {
      low: 'Prefab vanity units — quick ship, standard sizes, $800-2K installed.',
      mid: 'Semi-custom bath cabinets — 4-6 weeks, $3K-8K installed.',
      high: 'Full custom bath millwork — 8-12 weeks, $8K-20K installed.',
    },
    office: {
      low: 'Flat-pack shelving — same day, $500-1.5K.',
      mid: 'Semi-custom built-ins — 4-6 weeks, $4K-10K installed.',
      high: 'Custom wood built-ins — 10-14 weeks, $12K-30K installed.',
    },
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2 }}>DFW HOME SERVICES 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🪵 DFW Cabinetry & Millwork Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          Custom cabinets carry 10-16 week lead times in DFW. Humidity expansion is a real factor — choose finishes designed for Texas climate.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[{ icon: '⏱️', label: 'Custom Lead Time', val: '10-16 weeks' }, { icon: '💧', label: 'Humidity Impact', val: 'Expansion risk' }, { icon: '🎨', label: 'Best Finish', val: 'Painted or stained' }].map((s, i) => (
            <div key={i} style={{ background: '#1E2D45', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: 14, marginTop: 4, color: '#cbd5e1′ }}>{s.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔧 Cabinet Option Guide</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>PROJECT TYPE</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {['kitchen', 'bathroom', 'office'].map(t => (
                <button key={t} onClick={() => setProjectType(t)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                    background: projectType === t ? '#F5E642′ : '#2d3f5a', color: projectType === t ? '#0A1628' : '#fff' }}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>BUDGET TIER</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{ k: 'low', label: 'Under $10K' }, { k: 'mid', label: '$10K-30K' }, { k: 'high', label: '$30K+' }].map(b => (
                <button key={b.k} onClick={() => setBudget(b.k)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                    background: budget === b.k ? '#F5E642′ : '#2d3f5a', color: budget === b.k ? '#0A1628' : '#fff' }}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, color: '#cbd5e1', lineHeight: 1.7 }}>
            {recommendations[projectType][budget]}
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 16, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>🌡️ DFW Climate Tip</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>Painted cabinets show wear faster in DFW heat. Stained hardwood handles humidity expansion better. Always ask contractors about acclimation time before installation.</p>
        </div>
      </div>
    </div>
  );
}