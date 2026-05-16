import { useState } from 'react';

const components: Record<string, { low: number; high: number; label: string; roi: string }> = {
  siding: { low: 8000, high: 20000, label: 'New Siding', roi: '75–80%' },
  exterior_paint: { low: 3000, high: 8000, label: 'Exterior Paint', roi: '55–65%' },
  windows: { low: 400, high: 1200, label: 'Windows (per unit)', roi: '65–70%' },
  garage_door: { low: 1200, high: 4000, label: 'Garage Door', roi: '94–102%' },
  front_door: { low: 500, high: 3000, label: 'Front Door', roi: '65–75%' },
  landscaping: { low: 2000, high: 10000, label: 'Landscaping', roi: '100–200%' },
};

const sizeMultipliers: Record<string, number> = { small: 0.75, medium: 1.0, large: 1.35, xlarge: 1.7 };

export default function DFWHomeExteriorCostGuide() {
  const [homeSize, setHomeSize] = useState('medium');
  const [windowCount, setWindowCount] = useState(12);
  const [selectedScope, setSelectedScope] = useState<string[]>(['exterior_paint', 'garage_door', 'front_door']);

  const sm = sizeMultipliers[homeSize];
  const toggleItem = (key: string) => {
    setSelectedScope(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const lineItems = selectedScope.map(key => {
    const c = components[key];
    const mult = key === 'windows' ? windowCount : sm;
    return { label: c.label + (key === 'windows' ? ` ×${windowCount}` : ''), low: Math.round(c.low * mult), high: Math.round(c.high * mult), roi: c.roi };
  });

  const totalLow = lineItems.reduce((s, i) => s + i.low, 0);
  const totalHigh = lineItems.reduce((s, i) => s + i.high, 0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏠 DFW COST GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Home Exterior Renovation Cost</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Dallas-Fort Worth · 2026 Contractor Pricing</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Home Size</label>
            <select value={homeSize} onChange={e => setHomeSize(e.target.value)}
              style={{ width: '100%', background: '#1e2d45', color: '#fff', border: '1px solid #2d3f5e', borderRadius: 8, padding: '0.6rem', fontSize: '1rem' }}>
              <option value="small">Small (under 1,500 sq ft)</option>
              <option value="medium">Medium (1,500–2,500 sq ft)</option>
              <option value="large">Large (2,500–3,500 sq ft)</option>
              <option value="xlarge">Extra Large (3,500+ sq ft)</option>
            </select>
          </div>
          <div>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Number of Windows: {windowCount}</label>
            <input type="range" min={4} max={30} value={windowCount} onChange={e => setWindowCount(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F5E642' }} />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.75rem' }}>Select Exterior Scope (tap to toggle)</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            {Object.entries(components).map(([key, c]) => (
              <button key={key} onClick={() => toggleItem(key)}
                style={{ background: selectedScope.includes(key) ? '#F5E642' : '#1e2d45', color: selectedScope.includes(key) ? '#0A1628' : '#94a3b8', border: '1px solid #2d3f5e', borderRadius: 8, padding: '0.5rem 0.75rem', fontSize: '0.8rem', cursor: 'pointer', fontWeight: selectedScope.includes(key) ? 700 : 400 }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {lineItems.length > 0 && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#F5E642' }}>📋 Cost + ROI Breakdown</h2>
            {lineItems.map((item) => (
              <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '1rem', padding: '0.5rem 0', borderBottom: '1px solid #2d3f5e', alignItems: 'center' }}>
                <span style={{ color: '#cbd5e1' }}>{item.label}</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>${item.low.toLocaleString()} – ${item.high.toLocaleString()}</span>
                <span style={{ background: '#0f2035', color: '#4ade80', borderRadius: 6, padding: '0.2rem 0.5rem', fontSize: '0.78rem', fontWeight: 600 }}>ROI {item.roi}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0 0', fontWeight: 700, fontSize: '1.1rem' }}>
              <span style={{ color: '#F5E642' }}>Total</span>
              <span style={{ color: '#F5E642' }}>${totalLow.toLocaleString()} – ${totalHigh.toLocaleString()}</span>
            </div>
          </div>
        )}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: '1.25rem' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💡</div>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.4rem' }}>DFW Pro Tip</div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>In DFW's competitive market, exterior curb appeal adds 7–14% to list price. Garage door replacement has the highest ROI of any exterior project — often 94–102% return at resale.</p>
        </div>
      </div>
    </div>
  );
}
