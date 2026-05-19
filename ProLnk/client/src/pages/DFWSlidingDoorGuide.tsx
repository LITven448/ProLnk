import { useState } from 'react';

const DOOR_TYPES = [
  { id: 'slider', label: 'Sliding Patio Door', costPerFt: 320, shgc: 0.22, note: 'Best for tight spaces — one panel slides, no swing clearance needed' },
  { id: 'french', label: 'French Doors', costPerFt: 390, shgc: 0.22, note: 'Classic look — both panels swing out (requires clearance inside or out)' },
  { id: 'bifold', label: 'Bifold / Multi-Panel', costPerFt: 520, shgc: 0.20, note: 'Opens fully — creates indoor-outdoor living space, most expensive' },
];

const GLASS_RATINGS = [
  { id: 'standard', label: 'Standard Low-E', shgcBonus: 0, costAdder: 0, heatBlock: 60 },
  { id: 'premium', label: 'Premium Low-E + Argon', shgcBonus: 0.03, costAdder: 180, heatBlock: 72 },
  { id: 'solar', label: 'Solar Control Low-E (Tinted)', shgcBonus: 0.06, costAdder: 280, heatBlock: 82 },
];

export default function DFWSlidingDoorGuide() {
  const [doorType, setDoorType] = useState('slider');
  const [glassRating, setGlassRating] = useState('standard');
  const [openingWidth, setOpeningWidth] = useState(8);

  const selectedType = DOOR_TYPES.find(d => d.id === doorType)!;
  const selectedGlass = GLASS_RATINGS.find(g => g.id === glassRating)!;

  const materialCost = selectedType.costPerFt * openingWidth;
  const glassCost = selectedGlass.costAdder;
  const laborCost = openingWidth * 85 + 400;
  const totalCost = Math.round(materialCost + glassCost + laborCost);
  const effectiveSHGC = (selectedType.shgc - selectedGlass.shgcBonus).toFixed(2);
  const heatBlock = selectedGlass.heatBlock;
  const annualSavings = Math.round(heatBlock * 2.4 * (openingWidth / 8));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF4', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ marginBottom: 8 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 10px', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
            DFW SLIDING DOOR GUIDE
          </span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>
          🪟 Sliding, French & Bifold Door Guide — DFW
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 36 }}>
          Large glass doors are the biggest heat gain vulnerability in DFW homes. A 8-foot patio door with standard glass can add $400+ annually to cooling costs. Glass selection and proper sealing make the difference.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '☀️', title: 'DFW Heat Gain Problem', body: 'An unshaded west-facing glass door can transmit 200–400 BTUs per square foot on summer afternoons. Solar Control Low-E glass blocks up to 82% of that heat before it enters your home.' },
            { icon: '🛤️', title: 'Track Maintenance for DFW Dust', body: 'DFW has significant dust and pollen. Clean slider tracks quarterly with a stiff brush and silicone spray — never oil-based lubricants which attract grit and clog the track.' },
            { icon: '🪲', title: 'Screen Door Options', body: 'Standard: fixed aluminum screen. Upgrade: retractable screens disappear when not in use. Best for DFW: solar screen mesh (80–90% shade) blocks heat AND insects.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#1E2D45', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 13, marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.5 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16, fontSize: 18 }}>📊 Door Type Comparison</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ color: '#94A3B8', borderBottom: '1px solid #2D3F57′ }}>
                  {['Type', 'Space Needed', 'Seal Quality', 'Cost / Linear Ft', 'Best For'].map(h => (
                    <th key={h} style={{ textAlign: 'left', paddingBottom: 10, paddingRight: 16 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Sliding', 'Panel width only', '⭐⭐⭐⭐', '$280–380', 'Limited interior space'],
                  ['French', 'Full swing clearance', '⭐⭐⭐⭐⭐', '$340–450', 'Classic aesthetics'],
                  ['Bifold', 'Minimal — folds flat', '⭐⭐⭐', '$460–600', 'Full open-air living'],
                ].map(row => (
                  <tr key={row[0]} style={{ borderBottom: '1px solid #16213A' }}>
                    {row.map((cell, i) => (
                      <td key={i} style={{ padding: '10px 16px 10px 0', color: i === 0 ? '#E8EDF4′ : '#94A3B8' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#131F33', border: '1.5px solid #F5E642', borderRadius: 14, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 800, fontSize: 20, marginBottom: 24 }}>💰 Cost + Solar Heat Gain Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Opening Width (feet)</label>
              <input type="number" min={4} max={24} value={openingWidth}
                onChange={e => setOpeningWidth(Math.max(4, parseInt(e.target.value) || 4))}
                style={{ background: '#1E2D45', border: '1px solid #2D3F57', borderRadius: 8, padding: '10px 14px', color: '#F5E642', fontSize: 18, fontWeight: 700, width: '100%' }} />
              <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>Standard sizes: 6, 8, 10, 12 ft</div>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Door Type</label>
              <select value={doorType} onChange={e => setDoorType(e.target.value)}
                style={{ background: '#1E2D45', border: '1px solid #2D3F57', borderRadius: 8, padding: '10px 14px', color: '#E8EDF4', fontSize: 14, width: '100%' }}>
                {DOOR_TYPES.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
              </select>
              <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{selectedType.note}</div>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Glass Rating</label>
              <select value={glassRating} onChange={e => setGlassRating(e.target.value)}
                style={{ background: '#1E2D45', border: '1px solid #2D3F57', borderRadius: 8, padding: '10px 14px', color: '#E8EDF4', fontSize: 14, width: '100%' }}>
                {GLASS_RATINGS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { label: 'Total Installed Cost', value: `$${totalCost.toLocaleString()}`, color: '#F5E642′ },
              { label: 'Effective SHGC', value: effectiveSHGC, color: parseFloat(effectiveSHGC) <= 0.20 ? '#22C55E' : '#F59E0B' },
              { label: 'Solar Heat Blocked', value: `${heatBlock}%`, color: '#22C55E' },
              { label: 'Est. Annual Savings', value: `$${annualSavings}`, color: '#F5E642′ },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ color: '#94A3B8', fontSize: 11, marginBottom: 6 }}>{stat.label}</div>
                <div style={{ color: stat.color, fontWeight: 800, fontSize: 22 }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 14, fontSize: 16 }}>🔧 DFW-Specific Installation Notes</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              '🧱 Concrete / masonry homes (common in older DFW suburbs) require structural headers — add $500–1,200 for rough opening prep.',
              '🌡️ Install door sill sweeps rated for 140°F+ — standard sweeps warp in DFW summer heat and break the air seal within 2 years.',
              '💨 DFW wind pressure codes: large glass doors in exposed areas need DP-50 or higher rating. Ask your installer to confirm.',
              '🌧️ Weep holes in sliding tracks must face outward — improper installation causes water infiltration during DFW storm events.',
            ].map((tip, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 14, color: '#94A3B8', fontSize: 14, lineHeight: 1.5 }}>{tip}</div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
