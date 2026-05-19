import { useState } from 'react';

export default function DFWMosquitoLandscapeGuide2026() {
  const [yardType, setYardType] = useState('suburban');

  const getPlan = () => {
    if (yardType === 'wooded') return { plan: 'Dense Repellent Border', plants: 'Lantana + Citronella Grass + Rosemary', note: 'Focus on eliminating standing water under trees — primary mosquito breeding source in DFW wooded yards' };
    if (yardType === 'suburban') return { plan: 'Mixed Perennial Border', plants: 'Lantana + Texas Sage + Lavender + Citronella', note: 'Lantana is the DFW workhorse — handles heat, repels mosquitoes, attracts butterflies' };
    if (yardType === 'pool') return { plan: 'Poolside Repellent Garden', plants: 'Lavender + Citronella Grass + Marigolds', note: 'Keep citronella closest to seating areas — check pool drainage monthly for standing water' };
    return { plan: 'Container Garden Strategy', plants: 'Citronella + Basil + Marigolds in pots', note: 'Move containers to seating areas — great for apartment patios or small DFW yards' };
  };

  const plan = getPlan();

  const plants = [
    { name: 'Lantana', icon: '🌸', hardiness: 'Perennial in DFW', water: 'Low — drought tolerant', note: '#1 DFW mosquito repellent plant' },
    { name: 'Citronella Grass', icon: '🌿', hardiness: 'Annual/tender perennial', water: 'Medium', note: 'Plant near seating for best effect' },
    { name: 'Texas Sage', icon: '💜', hardiness: 'Native, fully hardy', water: 'Very low', note: 'Blooms after rain — gorgeous in DFW' },
    { name: 'Lavender', icon: '🪻', hardiness: 'Tough in DFW with drainage', water: 'Low', note: 'Plant in raised bed for DFW clay drainage' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px' }}>🦟</div>
          <h1 style={{ fontSize: '2rem', color: '#F5E642', margin: '8px 0 4px' }}>DFW Mosquito-Resistant Landscaping 2026</h1>
          <p style={{ color: '#8899aa', margin: 0 }}>Plants that repel mosquitoes naturally — designed for DFW heat and humidity</p>
        </div>

        <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
          <p style={{ margin: 0, color: '#F5E642′ }}>⚡ DFW Key Fact: Eliminating standing water is 10x more effective than any plant. Empty saucers, bird baths, and gutters every 7 days — mosquitoes breed in as little as 1 inch of water.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
          {plants.map(p => (
            <div key={p.name} style={{ background: '#111d30', borderRadius: '8px', padding: '16px', border: '1px solid #1e3050′ }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{p.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '6px' }}>{p.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#8899aa', marginBottom: '4px' }}>🌡️ {p.hardiness}</div>
              <div style={{ fontSize: '0.8rem', color: '#8899aa', marginBottom: '4px' }}>💧 {p.water}</div>
              <div style={{ fontSize: '0.8rem', color: '#F5E642′ }}>📍 {p.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d30', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🎯 Mosquito Landscaping Plan Tool</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#8899aa', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Yard Type</label>
            <select value={yardType} onChange={e => setYardType(e.target.value)} style={{ width: '100%', padding: '10px', background: '#0A1628', color: '#fff', border: '1px solid #1e3050', borderRadius: '6px' }}>
              <option value="suburban">Suburban yard (typical DFW)</option>
              <option value="wooded">Wooded or shaded yard</option>
              <option value="pool">Pool or water feature yard</option>
              <option value="small">Small yard or patio only</option>
            </select>
          </div>
          <div style={{ background: '#0A1628', borderRadius: '8px', padding: '16px', border: '1px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '6px' }}>{plan.plan}</div>
            <div style={{ color: '#8899aa', fontSize: '0.85rem', marginBottom: '4px' }}>🌿 Plants: {plan.plants}</div>
            <div style={{ color: '#ccc', fontSize: '0.9rem' }}>{plan.note}</div>
          </div>
        </div>

        <div style={{ background: '#111d30', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>💧 Standing Water Elimination Checklist</h3>
          {['Empty plant saucers weekly — mosquitoes love them', 'Clean gutters monthly during DFW spring and fall', 'Monitor bird baths — change water every 5–7 days', 'Install rain gauge to monitor drainage in low spots', 'Fill low spots in lawn that collect water after DFW storms'].map((item, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e3050', color: '#ccc', fontSize: '0.9rem' }}>✅ {item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
