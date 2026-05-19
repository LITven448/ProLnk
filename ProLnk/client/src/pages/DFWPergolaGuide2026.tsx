import { useState } from 'react';

export default function DFWPergolaGuide2026() {
  const [style, setStyle] = useState('aluminum');
  const [budget, setBudget] = useState('medium');

  const getGuide = () => {
    if (style === 'wood' && budget === 'low') return { rec: 'Cedar Freestanding Pergola', cost: '$8,000–$11,000', note: 'Requires annual staining in TX sun — skip if low-maintenance is priority' };
    if (style === 'wood') return { rec: 'Attached Cedar Pergola', cost: '$12,000–$18,000', note: 'Beautiful but plan for yearly maintenance in DFW heat and UV' };
    if (style === 'aluminum' && budget === 'low') return { rec: 'Aluminum Freestanding Pergola', cost: '$9,000–$13,000', note: 'Low maintenance, no staining, powder-coat holds up in DFW' };
    if (style === 'aluminum') return { rec: 'Louvered Aluminum Pergola', cost: '$15,000–$22,000', note: 'Adjustable louvers handle DFW spring storms — best DFW choice' };
    if (style === 'vinyl') return { rec: 'Vinyl Pergola Kit', cost: '$8,000–$14,000', note: 'DFW heat can warp low-grade vinyl — specify high-UV-rated material' };
    return { rec: 'Premium Louvered Pergola', cost: '$20,000–$30,000', note: 'Motorized louvers + LED lighting — top-tier DFW outdoor living' };
  };

  const guide = getGuide();

  const materials = [
    { name: 'Wood', icon: '🪵', maint: 'Annual staining', life: '15–25 yrs', dfwNote: 'UV fades fast in TX sun' },
    { name: 'Aluminum', icon: '🔩', maint: 'None', life: '30–50 yrs', dfwNote: 'Best for DFW climate' },
    { name: 'Vinyl', icon: '🏠', maint: 'Occasional wash', life: '20–30 yrs', dfwNote: 'Specify UV-rated grade' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px' }}>⛺</div>
          <h1 style={{ fontSize: '2rem', color: '#F5E642', margin: '8px 0 4px' }}>DFW Pergola Guide 2026</h1>
          <p style={{ color: '#8899aa', margin: 0 }}>Outdoor shade solutions built for DFW heat, UV, and spring storms</p>
        </div>

        <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
          <p style={{ margin: 0, color: '#F5E642′ }}>⚡ DFW Key Fact: Louvered aluminum pergolas handle spring storms and summer UV better than any other material — and require zero maintenance.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '28px' }}>
          {materials.map(m => (
            <div key={m.name} style={{ background: '#111d30', borderRadius: '8px', padding: '16px', border: '1px solid #1e3050′ }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{m.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '6px' }}>{m.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#8899aa', marginBottom: '4px' }}>🔧 {m.maint}</div>
              <div style={{ fontSize: '0.8rem', color: '#8899aa', marginBottom: '4px' }}>⏱️ {m.life}</div>
              <div style={{ fontSize: '0.8rem', color: '#F5E642′ }}>🌞 {m.dfwNote}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d30', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🎯 Pergola Recommendation Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ color: '#8899aa', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Material Style</label>
              <select value={style} onChange={e => setStyle(e.target.value)} style={{ width: '100%', padding: '10px', background: '#0A1628', color: '#fff', border: '1px solid #1e3050', borderRadius: '6px' }}>
                <option value="wood">Wood (Natural look)</option>
                <option value="aluminum">Aluminum (Low maintenance)</option>
                <option value="vinyl">Vinyl (Budget-friendly)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#8899aa', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Budget</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '10px', background: '#0A1628', color: '#fff', border: '1px solid #1e3050', borderRadius: '6px' }}>
                <option value="low">Low ($8K–$13K)</option>
                <option value="medium">Medium ($13K–$22K)</option>
                <option value="high">High ($22K+)</option>
              </select>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: '8px', padding: '16px', border: '1px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '6px' }}>Recommended: {guide.rec}</div>
            <div style={{ color: '#8899aa', fontSize: '0.85rem', marginBottom: '4px' }}>Estimated cost: {guide.cost}</div>
            <div style={{ color: '#ccc', fontSize: '0.9rem' }}>{guide.note}</div>
          </div>
        </div>

        <div style={{ background: '#111d30', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>📋 DFW Pergola Permit Notes</h3>
          {['Permit requirements vary by city — always check with your municipality', 'Freestanding pergolas under 200 sq ft often permit-exempt (verify locally)', 'Attached pergolas typically require structural review', 'HOA approval required in most DFW communities', 'Louvered roofs classified as semi-permanent — check local codes'].map((item, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e3050', color: '#ccc', fontSize: '0.9rem' }}>✅ {item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
