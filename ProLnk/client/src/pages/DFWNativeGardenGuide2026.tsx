import { useState } from 'react';

export default function DFWNativeGardenGuide2026() {
  const [gardenSize, setGardenSize] = useState('medium');
  const [sunExposure, setSunExposure] = useState('full');

  const getPlantSelection = () => {
    if (sunExposure === 'full' && gardenSize === 'small') return { plants: 'Black-eyed Susan + Texas Sage', note: 'Perfect small sunny border — both survive DFW summers with zero extra water once established' };
    if (sunExposure === 'full' && gardenSize === 'medium') return { plants: 'Black-eyed Susan + Coneflower + Texas Sage + Lantana', note: 'Classic DFW pollinator garden — attracts monarchs during fall migration' };
    if (sunExposure === 'full') return { plants: 'Full Native Mix: Black-eyed Susan, Coneflower, Texas Sage, Yaupon Holly, Possumhaw', note: 'Full native landscape — no supplemental water needed after 2-year establishment' };
    if (sunExposure === 'partial' && gardenSize === 'small') return { plants: 'Inland Sea Oats + Wild Ginger', note: 'Shade-tolerant natives perfect for DFW north-facing beds' };
    if (sunExposure === 'partial') return { plants: 'Yaupon Holly + Possumhaw + Inland Sea Oats', note: 'Native shrub layer with understory grasses — gorgeous winter berry display' };
    return { plants: 'Possumhaw + Yaupon Holly + Native Ferns', note: 'Deep shade natives — Possumhaw berries attract birds through DFW winter' };
  };

  const sel = getPlantSelection();

  const natives = [
    { name: 'Black-eyed Susan', icon: '🌻', sun: 'Full sun', water: 'Drought tolerant', bloom: 'May–Oct' },
    { name: 'Coneflower', icon: '💐', sun: 'Full sun', water: 'Low-medium', bloom: 'Jun–Sep' },
    { name: 'Texas Sage', icon: '💜', sun: 'Full sun', water: 'Very low', bloom: 'After rain' },
    { name: 'Yaupon Holly', icon: '🎄', sun: 'Full–part shade', water: 'Low', bloom: 'Berries Nov–Feb' },
    { name: 'Possumhaw', icon: '🔴', sun: 'Full–part shade', water: 'Low', bloom: 'Berries Dec–Feb' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px' }}>🌼</div>
          <h1 style={{ fontSize: '2rem', color: '#F5E642', margin: '8px 0 4px' }}>DFW Native Plant Garden Guide 2026</h1>
          <p style={{ color: '#8899aa', margin: 0 }}>Texas natives that survive DFW summers without extra water — and attract pollinators</p>
        </div>

        <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
          <p style={{ margin: 0, color: '#F5E642' }}>⚡ DFW Key Fact: Native plants need zero supplemental irrigation after a 2-year establishment period — saving DFW homeowners $200–$600/year in water bills vs. traditional landscaping.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
          {natives.map(n => (
            <div key={n.name} style={{ background: '#111d30', borderRadius: '8px', padding: '14px', border: '1px solid #1e3050' }}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>{n.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: '0.9rem', marginBottom: '4px' }}>{n.name}</div>
              <div style={{ fontSize: '0.75rem', color: '#8899aa', marginBottom: '2px' }}>☀️ {n.sun}</div>
              <div style={{ fontSize: '0.75rem', color: '#8899aa', marginBottom: '2px' }}>💧 {n.water}</div>
              <div style={{ fontSize: '0.75rem', color: '#F5E642' }}>🌸 {n.bloom}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d30', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🎯 Native Plant Selection Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ color: '#8899aa', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Garden Size</label>
              <select value={gardenSize} onChange={e => setGardenSize(e.target.value)} style={{ width: '100%', padding: '10px', background: '#0A1628', color: '#fff', border: '1px solid #1e3050', borderRadius: '6px' }}>
                <option value="small">Small (under 100 sq ft)</option>
                <option value="medium">Medium (100–400 sq ft)</option>
                <option value="large">Large (400+ sq ft)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#8899aa', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Sun Exposure</label>
              <select value={sunExposure} onChange={e => setSunExposure(e.target.value)} style={{ width: '100%', padding: '10px', background: '#0A1628', color: '#fff', border: '1px solid #1e3050', borderRadius: '6px' }}>
                <option value="full">Full sun (6+ hours)</option>
                <option value="partial">Partial shade (3–6 hours)</option>
                <option value="shade">Full shade (under 3 hours)</option>
              </select>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: '8px', padding: '16px', border: '1px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1rem', marginBottom: '6px' }}>🌿 Recommended: {sel.plants}</div>
            <div style={{ color: '#ccc', fontSize: '0.9rem' }}>{sel.note}</div>
          </div>
        </div>

        <div style={{ background: '#111d30', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>🦋 DFW Pollinator Garden Tips</h3>
          {['Plant in fall (Oct–Nov) for best DFW establishment — roots grow all winter', 'Group plants in clusters of 3+ for maximum pollinator impact', 'Leave seed heads through winter — birds rely on them in DFW', 'Avoid pesticides — they kill the pollinators you are attracting', 'DFW is on the monarch migration route — plant milkweed for monarchs'].map((item, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e3050', color: '#ccc', fontSize: '0.9rem' }}>✅ {item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
