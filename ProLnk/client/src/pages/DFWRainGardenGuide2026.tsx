import { useState } from 'react';

export default function DFWRainGardenGuide2026() {
  const [problem, setProblem] = useState('standing water');
  const [drainageArea, setDrainageArea] = useState('500');
  const [result, setResult] = useState('');

  const getFeasibility = () => {
    const size = Math.round(parseInt(drainageArea) * 0.1);
    const guides: Record<string, string> = {
      'standing water': `Rain garden of ~${size} sqft placed 12+ feet from foundation will capture runoff and redirect it safely. Use native DFW plants like Texas Sedge or Gulf Coast Muhly.`,
      'foundation seepage': `A ${size} sqft rain garden with a French drain connection can divert water threatening your slab foundation. Critical for DFW expansive clay soils.`,
      'erosion': `Install a ${size} sqft rain garden at the low point of the slope. Planting native grasses will hold soil while managing runoff from heavy DFW storms.`,
      'neighbor runoff': `A ${size} sqft rain garden along your property edge creates a buffer. Combine with a berm to intercept incoming runoff before it reaches your foundation.`,
    };
    setResult(guides[problem] ?? 'Select a drainage problem above.');
  };

  const plants = [
    { name: 'Texas Sedge', icon: '🌿', note: 'Tolerates wet-dry DFW cycles, low maintenance' },
    { name: 'Gulf Coast Muhly', icon: '🌾', note: 'Native grass, pink plumes in fall, drought tolerant after establish' },
    { name: 'Turkshead Cactus', icon: '🌵', note: 'Dry zone border plant for outer rain garden edge' },
    { name: 'Blue Mistflower', icon: '💜', note: 'Attracts pollinators, thrives in DFW seasonal flooding' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK RESOURCE GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Rain Garden Guide 2026 🌧</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Protect your DFW foundation with a rain garden — capture runoff, feed native plants, and stop foundation damage before it starts.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>📐 Design Rules for DFW</h2>
          <ul style={{ margin: 0, paddingLeft: 20, color: '#94a3b8', lineHeight: 1.9, fontSize: 14 }}>
            <li>Size rain garden at <strong style={{ color: '#fff' }}>10% of drainage area</strong> (roof + paving that drains to it)</li>
            <li>Place <strong style={{ color: '#fff' }}>12+ feet from foundation</strong> — critical for DFW expansive clay</li>
            <li>Depth: <strong style={{ color: '#fff' }}>6-8 inches</strong> max — deeper risks mosquito breeding in DFW heat</li>
            <li>Slope inlet: direct downspouts and graded lawn into garden</li>
            <li>Add overflow outlet toward street or drainage easement</li>
          </ul>
        </div>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#F5E642', marginBottom: 14 }}>🌱 Best Native Plants for DFW Rain Gardens</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {plants.map(p => (
              <div key={p.name} style={{ background: '#112240', borderRadius: 10, padding: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24 }}>{p.icon}</span>
                <div><div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div><div style={{ color: '#94a3b8', fontSize: 13 }}>{p.note}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔍 Rain Garden Feasibility Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Drainage Problem</label>
              <select value={problem} onChange={e => setProblem(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', fontSize: 14 }}>
                <option value="standing water">Standing Water</option>
                <option value="foundation seepage">Foundation Seepage</option>
                <option value="erosion">Slope Erosion</option>
                <option value="neighbor runoff">Neighbor Runoff</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Drainage Area (sqft)</label>
              <input type="number" value={drainageArea} onChange={e => setDrainageArea(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={getFeasibility} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer', fontSize: 15 }}>Get Feasibility Guide</button>
          {result && <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 16, color: '#F5E642', fontWeight: 600, fontSize: 15 }}>🌧 {result}</div>}
        </div>
        <p style={{ marginTop: 32, color: '#475569', fontSize: 13, textAlign: 'center' }}>ProLnk connects you with DFW landscape pros experienced in rain garden installation.</p>
      </div>
    </div>
  );
}