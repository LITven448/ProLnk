import { useState } from 'react';

type ShopType = 'woodworking' | 'metalworking' | 'general' | 'automotive';

const shopData: Record<ShopType, { equipment: string[]; electrical: string; ventilation: string }> = {
  woodworking: {
    equipment: ['Table saw', 'Planer', 'Jointer', 'Dust collector'],
    electrical: '200A panel, 240V circuits for major tools',
    ventilation: 'Dedicated dust collection + wall exhaust fans',
  },
  metalworking: {
    equipment: ['Welder', 'Grinder', 'Mill', 'Lathe'],
    electrical: '200A panel, 240V for welder + plasma cutter',
    ventilation: 'Fume extraction hood + fresh air intake required',
  },
  general: {
    equipment: ['Air compressor', 'Drill press', 'Band saw'],
    electrical: '100A panel, mix of 120V and 240V circuits',
    ventilation: 'Ceiling fans + wall exhaust adequate',
  },
  automotive: {
    equipment: ['Lift', 'Compressor', 'Welder'],
    electrical: '200A panel, 240V lift circuit + 50A for welder',
    ventilation: 'Carbon monoxide exhaust + ceiling fans mandatory',
  },
};

const sqftCost = (sqft: number) => {
  const base = sqft * 85;
  const electrical = sqft > 600 ? 12000 : 7500;
  const hvac = Math.round(sqft * 18);
  const permit = 1500;
  return { base, electrical, hvac, permit, total: base + electrical + hvac + permit };
};

export default function DFWSmallShopGuide() {
  const [shopType, setShopType] = useState<ShopType>('woodworking');
  const [sqft, setSqft] = useState(400);
  const [structure, setStructure] = useState<'detached' | 'garage'>('detached');
  const [showResults, setShowResults] = useState(false);

  const data = shopData[shopType];
  const costs = sqftCost(sqft);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🔨</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Small Shop & Workshop Guide</h1>
        <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 600, margin: '0 auto' }}>Everything you need to build the perfect workshop in North Texas — permits, electrical, HVAC, and costs.</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, margin: '40px 0' }}>
          {[
            { icon: '⚡', title: '220V Required', desc: 'Most shop equipment runs on 240V. Plan your panel from day one.' },
            { icon: '🌡️', title: 'DFW Heat Critical', desc: 'Summers hit 105°F. Mini-split AC is essential, not optional.' },
            { icon: '💨', title: 'Ventilation Code', desc: 'Dust and fumes require dedicated exhaust per DFW building code.' },
            { icon: '📋', title: 'Permit Always Required', desc: 'Detached structures over 200 sq ft require a permit in all DFW cities.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#112240', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', margin: '0 0 8px', fontSize: 16 }}>{card.title}</h3>
              <p style={{ color: '#94A3B8', margin: 0, fontSize: 14, lineHeight: 1.5 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 8px' }}>🧰 Detached Shop vs Garage Conversion</h2>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>Both have tradeoffs for DFW conditions.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <h4 style={{ color: '#F5E642', margin: '0 0 10px' }}>Detached Shop</h4>
              {['Full control over layout', 'Better sound isolation', 'Requires setback compliance', 'Higher upfront cost', 'No loss of garage parking'].map(i => <div key={i} style={{ color: '#94A3B8', fontSize: 13, padding: '3px 0' }}>{'✓ ' + i}</div>)}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <h4 style={{ color: '#F5E642', margin: '0 0 10px' }}>Garage Conversion</h4>
              {['Lower cost ($15K–$30K)', 'Existing electrical to upgrade', 'Climate control easier', 'Loses parking space', 'HOA may restrict use'].map(i => <div key={i} style={{ color: '#94A3B8', fontSize: 13, padding: '3px 0' }}>{'✓ ' + i}</div>)}
            </div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 24px' }}>📊 Workshop Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Shop Type</label>
              <select value={shopType} onChange={e => { setShopType(e.target.value as ShopType); setShowResults(false); }} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="woodworking">Woodworking</option>
                <option value="metalworking">Metalworking</option>
                <option value="general">General Workshop</option>
                <option value="automotive">Automotive</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Structure Type</label>
              <select value={structure} onChange={e => { setStructure(e.target.value as 'detached' | 'garage'); setShowResults(false); }} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="detached">Detached Shop</option>
                <option value="garage">Garage Conversion</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Square Footage: {sqft} sq ft</label>
              <input type="range" min={200} max={1200} step={50} value={sqft} onChange={e => { setSqft(+e.target.value); setShowResults(false); }} style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
          </div>
          <button onClick={() => setShowResults(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Calculate Estimate →</button>
          {showResults && (
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>Construction</div><div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>${costs.base.toLocaleString()}</div></div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>Electrical Panel</div><div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>${costs.electrical.toLocaleString()}</div></div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>HVAC / Mini-Split</div><div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>${costs.hvac.toLocaleString()}</div></div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>Permits</div><div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>${costs.permit.toLocaleString()}</div></div>
              <div style={{ background: '#F5E642', borderRadius: 10, padding: 16 }}><div style={{ color: '#0A1628', fontSize: 12, fontWeight: 600 }}>Total Estimate</div><div style={{ color: '#0A1628', fontSize: 22, fontWeight: 700 }}>${costs.total.toLocaleString()}</div></div>
            </div>
          )}
          {showResults && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <h4 style={{ color: '#F5E642', margin: '0 0 10px' }}>⚡ {shopType.charAt(0).toUpperCase() + shopType.slice(1)} Requirements</h4>
              <p style={{ color: '#94A3B8', margin: '0 0 8px', fontSize: 14 }}><strong style={{ color: '#fff' }}>Electrical:</strong> {data.electrical}</p>
              <p style={{ color: '#94A3B8', margin: '0 0 8px', fontSize: 14 }}><strong style={{ color: '#fff' }}>Ventilation:</strong> {data.ventilation}</p>
              <div style={{ color: '#94A3B8', fontSize: 14 }}><strong style={{ color: '#fff' }}>Key Equipment:</strong> {data.equipment.join(', ')}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
