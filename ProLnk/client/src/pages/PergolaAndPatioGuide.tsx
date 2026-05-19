import { useState } from 'react';

const materials = [
  { name: 'Pressure-Treated Wood', icon: '🪵', cost: '$15–25/sqft', durability: '10–15 years', maintenance: 'High (stain/seal every 2–3 yrs)', heat: 'Hot in sun', dfw: 'Budget-friendly but warps in DFW heat/humidity swings' },
  { name: 'Cedar / Redwood', icon: '🌲', cost: '$20–35/sqft', durability: '15–20 years', maintenance: 'Medium (seal every 3–4 yrs)', heat: 'Moderate', dfw: 'Naturally rot-resistant, better than pine for DFW climate' },
  { name: 'Aluminum', icon: '⚙️', cost: '$25–45/sqft', durability: '30+ years', maintenance: 'Very Low', heat: 'Can get hot', dfw: 'Best for DFW — no warping, no rot, powder-coat resists UV' },
  { name: 'Vinyl / PVC', icon: '🏗️', cost: '$20–40/sqft', durability: '20–25 years', maintenance: 'Very Low (hose off)', heat: 'Can fade', dfw: 'Good low-maintenance option, check UV rating for Texas sun' },
  { name: 'Steel', icon: '🔩', cost: '$30–60/sqft', durability: '30+ years', maintenance: 'Low (paint every 5–10 yrs)', heat: 'Very hot', dfw: 'Industrial look, strong for DFW wind loads — risk of rust without powder coat' },
];

const coverageOptions = [
  { type: 'Open pergola', shade: '20–30%', cost: 'Lowest', description: 'Classic lattice style — decorative, minimal shade' },
  { type: 'Louvered pergola', shade: '40–80%', cost: 'Medium-High', description: 'Adjustable slats — control shade/ventilation on demand' },
  { type: 'Solid roof cover', shade: '100%', cost: 'Medium', description: 'Full protection from rain and sun — best for DFW summers' },
  { type: 'Shade sails', shade: '90%', cost: 'Low ($300–1,200)', description: 'Fabric alternative — easy install, seasonal use, DFW wind risk' },
  { type: 'Polycarbonate panels', shade: '60–90%', cost: 'Medium', description: 'Translucent — bright while blocking UV, handles DFW hail better than glass' },
];

const windLoadNote = {
  title: '💨 DFW Wind Load Requirements — Critical',
  body: 'DFW sits in a high-wind zone. Pergolas act like sails in straight-line storms and tornadoes. Most North Texas cities require engineered plans for freestanding structures over 200 sq ft. Posts must be set in concrete footings (typically 24–36″ deep for DFW clay soil). Failure to comply can result in demolition orders and denied insurance claims after storm damage.',
};

const hoaChecklist = [
  'Submit design plans with dimensions and materials',
  'Confirm height restrictions (typically 10–12ft max in DFW HOAs)',
  'Verify setback requirements from property lines',
  'Get written approval before ordering materials',
  'Confirm color must match home exterior',
  'Check if attached vs freestanding has different rules',
];

export default function PergolaAndPatioGuide() {
  const [width, setWidth] = useState(14);
  const [depth, setDepth] = useState(16);
  const [material, setMaterial] = useState('Aluminum');
  const [coverage, setCoverage] = useState('Open pergola');

  const sqft = width * depth;
  const selectedMat = materials.find(m => m.name === material) || materials[2];
  const [minRate, maxRate] = selectedMat.cost.replace('$', '').split('/')[0].split('–').map(Number);
  const selectedCov = coverageOptions.find(c => c.type === coverage) || coverageOptions[0];

  const coverageMultiplier = coverage === 'Open pergola' ? 1 : coverage === 'Louvered pergola' ? 1.6 : coverage === 'Solid roof cover' ? 1.4 : coverage === 'Polycarbonate panels' ? 1.3 : 1;
  const totalMin = sqft * minRate * coverageMultiplier;
  const totalMax = sqft * maxRate * coverageMultiplier;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏛️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>
            DFW Pergola & Patio Cover Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 620, margin: '0 auto' }}>
            Wood vs aluminum, HOA requirements, DFW wind loads, shade options, and cost estimator
          </p>
        </div>

        <div style={{ background: '#7F1D1D', borderRadius: 12, padding: 20, marginBottom: 32, borderLeft: '4px solid #F87171′ }}>
          <h2 style={{ color: '#FCA5A5', marginBottom: 10, fontSize: 18 }}>{windLoadNote.title}</h2>
          <p style={{ color: '#FEE2E2', lineHeight: 1.7, marginBottom: 0 }}>{windLoadNote.body}</p>
        </div>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 20 }}>🪵 Material Comparison</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {materials.map((m, i) => (
              <div key={i} style={{ background: '#1E2D45', borderRadius: 10, padding: 18, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 16, alignItems: 'start' }}>
                <span style={{ fontSize: 28 }}>{m.icon}</span>
                <div>
                  <h3 style={{ color: '#E8EDF5', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{m.name}</h3>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: '#94A3B8′ }}>Lifespan: <strong style={{ color: '#60A5FA' }}>{m.durability}</strong></span>
                    <span style={{ fontSize: 13, color: '#94A3B8′ }}>Maint: <strong style={{ color: '#F5E642' }}>{m.maintenance}</strong></span>
                    <span style={{ fontSize: 13, color: '#94A3B8′ }}>Texas heat: <strong style={{ color: '#F87171' }}>{m.heat}</strong></span>
                  </div>
                  <div style={{ fontSize: 13, color: '#64748B' }}>{m.dfw}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#4ADE80', fontWeight: 800, fontSize: 16, whiteSpace: 'nowrap' }}>{m.cost}</div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>installed</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 20 }}>☀️ Shade Coverage Options</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {coverageOptions.map((c, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#E8EDF5', marginBottom: 4 }}>{c.type}</div>
                  <div style={{ fontSize: 13, color: '#64748B' }}>{c.description}</div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ background: '#1E2D45', padding: '4px 12px', borderRadius: 20, fontSize: 13, color: '#F5E642′ }}>☀️ {c.shade} shade</span>
                  <span style={{ background: '#1E2D45', padding: '4px 12px', borderRadius: 20, fontSize: 13, color: '#4ADE80′ }}>{c.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 20 }}>📋 HOA Approval Checklist</h2>
          <p style={{ color: '#94A3B8', marginBottom: 16, fontSize: 14 }}>Most DFW neighborhoods have HOAs. Get written approval before construction starts.</p>
          <div style={{ display: 'grid', gap: 8 }}>
            {hoaChecklist.map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ color: '#F5E642', flexShrink: 0 }}>☐</span>
                <span style={{ color: '#CBD5E1', fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 20 }}>🧮 Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', marginBottom: 8, fontSize: 14 }}>Width: <strong style={{ color: '#F5E642′ }}>{width} ft</strong></label>
              <input type="range" min={8} max={30} step={1} value={width}
                onChange={e => setWidth(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', marginBottom: 8, fontSize: 14 }}>Depth: <strong style={{ color: '#F5E642′ }}>{depth} ft</strong></label>
              <input type="range" min={8} max={30} step={1} value={depth}
                onChange={e => setDepth(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94A3B8', marginBottom: 10, fontSize: 14 }}>Material</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {materials.map(m => (
                <button key={m.name} onClick={() => setMaterial(m.name)}
                  style={{ padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                    background: material === m.name ? '#F5E642′ : '#0A1628', color: material === m.name ? '#0A1628' : '#94A3B8' }}>
                  {m.icon} {m.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#94A3B8', marginBottom: 10, fontSize: 14 }}>Shade Coverage</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {coverageOptions.map(c => (
                <button key={c.type} onClick={() => setCoverage(c.type)}
                  style={{ padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                    background: coverage === c.type ? '#F5E642′ : '#0A1628', color: coverage === c.type ? '#0A1628' : '#94A3B8' }}>
                  {c.type}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
            {[
              { label: 'Patio Size', value: `${sqft} sq ft`, color: '#60A5FA' },
              { label: 'Estimated Cost', value: `$${Math.round(totalMin).toLocaleString()}–$${Math.round(totalMax).toLocaleString()}`, color: '#F5E642′ },
              { label: 'Coverage Type', value: selectedCov.shade + ' shade', color: '#4ADE80′ },
            ].map((stat, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 6 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Get Pergola Quotes in DFW</h3>
          <p style={{ color: '#1E3A5F', marginBottom: 16 }}>Vetted contractors familiar with DFW wind codes and HOA requirements</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', padding: '14px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
