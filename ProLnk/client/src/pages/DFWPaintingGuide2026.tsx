import { useState } from 'react';

export default function DFWPaintingGuide2026() {
  const [homeSize, setHomeSize] = useState('medium');
  const [condition, setCondition] = useState('fair');

  const estimates: Record<string, Record<string, { cost: string; time: string }>> = {
    small: {
      good: { cost: '$1,800 - $2,800', time: '2-3 days' },
      fair: { cost: '$2,400 - $3,600', time: '3-4 days' },
      poor: { cost: '$3,200 - $4,800', time: '4-6 days' },
    },
    medium: {
      good: { cost: '$3,200 - $4,800', time: '3-4 days' },
      fair: { cost: '$4,000 - $6,000', time: '4-6 days' },
      poor: { cost: '$5,500 - $8,000', time: '6-8 days' },
    },
    large: {
      good: { cost: '$5,500 - $8,000', time: '5-7 days' },
      fair: { cost: '$7,000 - $10,000', time: '7-10 days' },
      poor: { cost: '$9,500 - $14,000', time: '10-14 days' },
    },
  };

  const est = estimates[homeSize][condition];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2 }}>DFW HOME SERVICES 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🎨 DFW Exterior Painting Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          Exterior paint in DFW lasts 5-7 years due to UV intensity and heat. Best seasons to paint: spring (Mar-May) and fall (Sep-Nov). HOAs may restrict color choices.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[{ icon: '☀️', label: 'Paint Lifespan', val: '5-7 years in DFW' }, { icon: '🌡️', label: 'Best Season', val: 'Spring & Fall' }, { icon: '📋', label: 'HOA Check', val: 'Color approval first' }].map((s, i) => (
            <div key={i} style={{ background: '#1E2D45', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: 14, marginTop: 4, color: '#cbd5e1′ }}>{s.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>💰 Cost Estimator</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>HOME SIZE</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{ k: 'small', label: 'Under 1,500 sqft' }, { k: 'medium', label: '1,500-3,000 sqft' }, { k: 'large', label: '3,000+ sqft' }].map(s => (
                <button key={s.k} onClick={() => setHomeSize(s.k)}
                  style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 12,
                    background: homeSize === s.k ? '#F5E642′ : '#2d3f5a', color: homeSize === s.k ? '#0A1628' : '#fff' }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>CURRENT PAINT CONDITION</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {['good', 'fair', 'poor'].map(c => (
                <button key={c} onClick={() => setCondition(c)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                    background: condition === c ? '#F5E642′ : '#2d3f5a', color: condition === c ? '#0A1628' : '#fff' }}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>ESTIMATED COST</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{est.cost}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>PROJECT TIMELINE</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{est.time}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}