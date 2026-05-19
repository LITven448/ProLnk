import { useState } from 'react';

export default function DFWProjectBudgetCalculator2026() {
  const [projectType, setProjectType] = useState('kitchen');
  const [size, setSize] = useState('medium');
  const [quality, setQuality] = useState('standard');

  const costs: Record<string, Record<string, Record<string, [number, number]>>> = {
    kitchen: {
      small: { budget: [8000, 15000], standard: [18000, 32000], premium: [40000, 75000] },
      medium: { budget: [15000, 28000], standard: [32000, 65000], premium: [75000, 140000] },
      large: { budget: [28000, 50000], standard: [65000, 120000], premium: [140000, 250000] },
    },
    bathroom: {
      small: { budget: [4000, 8000], standard: [9000, 18000], premium: [22000, 45000] },
      medium: { budget: [8000, 18000], standard: [20000, 40000], premium: [48000, 90000] },
      large: { budget: [18000, 35000], standard: [40000, 75000], premium: [90000, 160000] },
    },
    roofing: {
      small: { budget: [5000, 9000], standard: [10000, 16000], premium: [18000, 30000] },
      medium: { budget: [9000, 16000], standard: [16000, 28000], premium: [30000, 55000] },
      large: { budget: [16000, 28000], standard: [28000, 50000], premium: [55000, 95000] },
    },
    hvac: {
      small: { budget: [3500, 6000], standard: [6500, 11000], premium: [13000, 22000] },
      medium: { budget: [6000, 10000], standard: [11000, 18000], premium: [22000, 38000] },
      large: { budget: [10000, 18000], standard: [18000, 32000], premium: [38000, 65000] },
    },
    addition: {
      small: { budget: [25000, 45000], standard: [50000, 90000], premium: [100000, 180000] },
      medium: { budget: [50000, 90000], standard: [95000, 175000], premium: [190000, 350000] },
      large: { budget: [90000, 160000], standard: [175000, 320000], premium: [350000, 600000] },
    },
  };

  const range = costs[projectType]?.[size]?.[quality] ?? [0, 0];
  const low = range[0];
  const high = range[1];
  const avg = Math.round((low + high) / 2);
  const contingencyLow = Math.round(avg * 0.15);
  const contingencyHigh = Math.round(avg * 0.20);

  const fmt = (n: number) => n.toLocaleString();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Project Budget Calculator 2026</h1>
          <p style={{ color: '#8899BB', fontSize: 14 }}>Real DFW market cost ranges based on current contractor data</p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <label style={{ display: 'block', color: '#F5E642', marginBottom: 8, fontWeight: 700 }}>Project Type</label>
          <select value={projectType} onChange={e => setProjectType(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #2A3A5A', borderRadius: 8, fontSize: 15 }}>
            <option value="kitchen">Kitchen Renovation</option>
            <option value="bathroom">Bathroom Remodel</option>
            <option value="roofing">Roof Replacement</option>
            <option value="hvac">HVAC System</option>
            <option value="addition">Room Addition</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div style={{ background: '#111D35', borderRadius: 12, padding: 20 }}>
            <label style={{ display: 'block', color: '#F5E642', marginBottom: 8, fontWeight: 700 }}>Project Size</label>
            {['small', 'medium', 'large'].map(s => (
              <button key={s} onClick={() => setSize(s)}
                style={{ display: 'block', width: '100%', margin: '4px 0', padding: '8px', background: size === s ? '#F5E642′ : '#1A2A45',
                  color: size === s ? '#0A1628′ : '#fff', border: ’none', borderRadius: 6, cursor: 'pointer', fontWeight: 700, textTransform: 'capitalize' }}>
                {s}
              </button>
            ))}
          </div>
          <div style={{ background: '#111D35', borderRadius: 12, padding: 20 }}>
            <label style={{ display: 'block', color: '#F5E642', marginBottom: 8, fontWeight: 700 }}>Quality Level</label>
            {['budget', 'standard', 'premium'].map(q => (
              <button key={q} onClick={() => setQuality(q)}
                style={{ display: 'block', width: '100%', margin: '4px 0', padding: '8px', background: quality === q ? '#F5E642′ : '#1A2A45',
                  color: quality === q ? '#0A1628′ : '#fff', border: ’none', borderRadius: 6, cursor: 'pointer', fontWeight: 700, textTransform: 'capitalize' }}>
                {q}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0D1F3C', border: '2px solid #F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ color: '#8899BB', fontSize: 13, marginBottom: 8 }}>DFW MARKET ESTIMATE</div>
          <div style={{ fontSize: 36, fontWeight: 900, color: '#F5E642′ }}>${fmt(low)} – ${fmt(high)}</div>
          <div style={{ color: '#8899BB', marginTop: 4 }}>Average: ${fmt(avg)}</div>
          <div style={{ marginTop: 16, padding: '12px', background: '#1A2A45', borderRadius: 8 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>⚠️ DFW Contingency (15–20%)</div>
            <div style={{ color: '#ccc' }}>Add ${fmt(contingencyLow)} – ${fmt(contingencyHigh)} for surprises</div>
          </div>
          <div style={{ marginTop: 16, color: '#8899BB', fontSize: 13 }}>
            Get 3 verified DFW contractor quotes through <span style={{ color: '#F5E642′ }}>ProLnk</span> — free, no commitment
          </div>
        </div>
      </div>
    </div>
  );
}

