import { useState } from 'react';

const WOOD_TYPES: Record<string, { label: string; materialPerSqft: number; movementRisk: string; installMultiplier: number }> = {
  whiteOak: { label: 'White Oak (engineered)', materialPerSqft: 7.50, movementRisk: 'Low', installMultiplier: 1.0 },
  hickory: { label: 'Hickory (engineered)', materialPerSqft: 6.80, movementRisk: 'Low', installMultiplier: 1.0 },
  redOak: { label: 'Red Oak (solid)', materialPerSqft: 5.50, movementRisk: 'Medium', installMultiplier: 1.15 },
  walnut: { label: 'Walnut (engineered)', materialPerSqft: 10.50, movementRisk: 'Low', installMultiplier: 1.0 },
  pine: { label: 'Heart Pine (solid)', materialPerSqft: 6.00, movementRisk: 'High', installMultiplier: 1.25 },
};

const INSTALL_BASE_SQFT = 4.50;
const ANNUAL_MAINTENANCE = 0.18;

export default function DFWHardwoodFlooringGuide() {
  const [sqft, setSqft] = useState(800);
  const [woodType, setWoodType] = useState('whiteOak');

  const wood = WOOD_TYPES[woodType];
  const materialCost = sqft * wood.materialPerSqft;
  const laborCost = sqft * INSTALL_BASE_SQFT * wood.installMultiplier;
  const totalCost = materialCost + laborCost;
  const annualMaintenance = sqft * ANNUAL_MAINTENANCE;
  const costPerSqft = totalCost / sqft;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ marginBottom: 12 }}>
          <span style={{ backgroundColor: '#F5E642', color: '#0A1628', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 4 }}>
            🌲 DFW HARDWOOD FLOORING
          </span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
          Hardwood Flooring Guide for DFW Homes
        </h1>
        <p style={{ color: '#8A9BBE', fontSize: 16, marginBottom: 40 }}>
          Dallas humidity swings from 20% in winter to 80% in summer. Hardwood expands and contracts — choosing the right species and install method is critical.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '💧', title: 'DFW Humidity Challenge', body: 'North Texas sees extreme humidity cycling: dry winters (20-30% RH) and humid summers (65-80% RH). Solid hardwood can gap ¼-inch seasonally. Engineered hardwood with a thick wear layer is the preferred solution for most DFW slabs.' },
            { icon: '🌳', title: 'Best Species for DFW', body: 'White oak and hickory handle movement best due to grain structure. Their Janka hardness (1290+ lbs) resists Texas traffic. Red oak is cheaper but moves more. Exotic species like Brazilian cherry look great but shrink dramatically in dry DFW winters.' },
            { icon: '🔨', title: 'Installation Methods', body: 'Over concrete slab: glue-down or floating (never nail). Glue-down is more stable but harder to replace. Floating over underlayment allows movement and is fastest. Over wood subfloor: nail-down solid hardwood is classic and long-lasting.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#111D35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{card.title}</h3>
              <p style={{ color: '#8A9BBE', fontSize: 14, lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 16, padding: 32, border: '1px solid #1E2D4A', marginBottom: 40 }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>🧮 Hardwood Cost Calculator</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 28 }}>
            <div>
              <label style={{ color: '#8A9BBE', fontSize: 13, display: 'block', marginBottom: 8 }}>Room Size (sqft)</label>
              <input
                type="range" min={100} max={3000} step={50} value={sqft}
                onChange={e => setSqft(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }}
              />
              <div style={{ color: '#FFFFFF', fontWeight: 700, marginTop: 4 }}>{sqft.toLocaleString()} sqft</div>
            </div>
            <div>
              <label style={{ color: '#8A9BBE', fontSize: 13, display: 'block', marginBottom: 8 }}>Wood Species / Type</label>
              <select value={woodType} onChange={e => setWoodType(e.target.value)} style={{ backgroundColor: '#1E2D4A', color: '#FFFFFF', border: '1px solid #2A3D5E', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
                {Object.entries(WOOD_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
              <div style={{ marginTop: 8 }}>
                <span style={{ fontSize: 12, backgroundColor: wood.movementRisk === 'Low' ? '#166534′ : wood.movementRisk === ’Medium' ? '#92400E' : '#991B1B', color: '#FFFFFF', padding: '2px 8px', borderRadius: 4 }}>
                  Movement Risk: {wood.movementRisk}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
            {[
              { label: 'Materials', value: `$${Math.round(materialCost).toLocaleString()}`, sub: `$${wood.materialPerSqft}/sqft` },
              { label: 'Installation', value: `$${Math.round(laborCost).toLocaleString()}`, sub: 'labor only' },
              { label: 'Total Cost', value: `$${Math.round(totalCost).toLocaleString()}`, sub: `$${costPerSqft.toFixed(2)}/sqft`, highlight: true },
              { label: 'Annual Upkeep', value: `$${Math.round(annualMaintenance).toLocaleString()}`, sub: 'cleaning + refinish fund' },
            ].map(stat => (
              <div key={stat.label} style={{ backgroundColor: stat.highlight ? '#F5E642′ : '#0A1628', borderRadius: 10, padding: 16, textAlign: ’center' }}>
                <div style={{ color: stat.highlight ? '#0A1628′ : '#8A9BBE', fontSize: 12, marginBottom: 4 }}>{stat.label}</div>
                <div style={{ color: stat.highlight ? '#0A1628′ : '#FFFFFF', fontSize: 20, fontWeight: 800 }}>{stat.value}</div>
                <div style={{ color: stat.highlight ? '#0A162880′ : '#4A5B7A', fontSize: 11 }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🔍 Engineered vs Solid for DFW Slabs</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { title: '✅ Engineered Hardwood', points: ['Handles humidity swings', 'Glue or float over slab', '3-5 refinishes over lifespan', '$6-12/sqft installed'] },
              { title: '⚠️ Solid Hardwood', points: ['NOT recommended over slab', 'Can buckle in DFW summers', 'Unlimited refinish cycles', 'Best for 2nd story / crawl space'] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>{col.title}</div>
                <ul style={{ color: '#8A9BBE', fontSize: 13, lineHeight: 1.9, paddingLeft: 16 }}>
                  {col.points.map(p => <li key={p}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
