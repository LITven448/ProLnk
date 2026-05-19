import { useState } from 'react';

const costs = {
  carpet_to_hardwood: { low: 2500, high: 6000, label: 'Carpet → Hardwood/LVP' },
  paint: { low: 500, high: 1200, label: 'Interior Paint' },
  lighting: { low: 300, high: 800, label: 'New Lighting Fixtures' },
  ceiling_fan: { low: 150, high: 400, label: 'Ceiling Fan' },
  closet_system: { low: 1500, high: 5000, label: 'Closet System' },
};

const sizeMultipliers: Record<string, number> = { small: 0.8, medium: 1.0, large: 1.3, xlarge: 1.6 };
const scopeMultipliers: Record<string, number> = { light: 0.6, moderate: 1.0, full: 1.0 };
const scopeItems: Record<string, string[]> = {
  light: ['paint', 'ceiling_fan'],
  moderate: ['paint', 'lighting', 'ceiling_fan', 'closet_system'],
  full: ['carpet_to_hardwood', 'paint', 'lighting', 'ceiling_fan', 'closet_system'],
};

export default function DFWMasterBedroomRemodelCost() {
  const [roomSize, setRoomSize] = useState('medium');
  const [scope, setScope] = useState('moderate');

  const sm = sizeMultipliers[roomSize];
  const selectedItems = scopeItems[scope];

  const lineItems = selectedItems.map((key) => {
    const c = costs[key as keyof typeof costs];
    return {
      label: c.label,
      low: Math.round(c.low * sm),
      high: Math.round(c.high * sm),
    };
  });

  const totalLow = lineItems.reduce((s, i) => s + i.low, 0);
  const totalHigh = lineItems.reduce((s, i) => s + i.high, 0);
  const diyDiscount = 0.35;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏠 DFW COST GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Master Bedroom Remodel Cost</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Dallas-Fort Worth · 2026 Contractor Pricing</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Room Size</label>
            <select value={roomSize} onChange={e => setRoomSize(e.target.value)}
              style={{ width: '100%', background: '#1e2d45', color: '#fff', border: '1px solid #2d3f5e', borderRadius: 8, padding: '0.6rem', fontSize: '1rem' }}>
              <option value="small">Small (under 150 sq ft)</option>
              <option value="medium">Medium (150–250 sq ft)</option>
              <option value="large">Large (250–350 sq ft)</option>
              <option value="xlarge">Extra Large (350+ sq ft)</option>
            </select>
          </div>
          <div>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Upgrade Scope</label>
            <select value={scope} onChange={e => setScope(e.target.value)}
              style={{ width: '100%', background: '#1e2d45', color: '#fff', border: '1px solid #2d3f5e', borderRadius: 8, padding: '0.6rem', fontSize: '1rem' }}>
              <option value="light">Light Refresh (paint + fan)</option>
              <option value="moderate">Moderate (paint, lighting, closet)</option>
              <option value="full">Full Refresh (all upgrades)</option>
            </select>
          </div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#F5E642′ }}>📋 Itemized Estimate</h2>
          {lineItems.map((item) => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #2d3f5e' }}>
              <span style={{ color: '#cbd5e1′ }}>{item.label}</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>${item.low.toLocaleString()} – ${item.high.toLocaleString()}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0 0', fontWeight: 700, fontSize: '1.1rem' }}>
            <span style={{ color: '#F5E642′ }}>Total (Contractor)</span>
            <span style={{ color: '#F5E642′ }}>${totalLow.toLocaleString()} – ${totalHigh.toLocaleString()}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔨</div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>DIY Savings Estimate</div>
            <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#4ade80′ }}>
              ${Math.round(totalLow * diyDiscount).toLocaleString()} – ${Math.round(totalHigh * diyDiscount).toLocaleString()} saved
            </div>
            <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.4rem' }}>~35% labor reduction doing it yourself</div>
          </div>
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📈</div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Typical ROI at Resale</div>
            <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#F5E642′ }}>60–75%</div>
            <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.4rem' }}>DFW buyer expectation: updated master</div>
          </div>
        </div>
      </div>
    </div>
  );
}
