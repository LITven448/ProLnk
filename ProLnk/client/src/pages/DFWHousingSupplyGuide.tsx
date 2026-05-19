import { useState } from 'react';

const segments = [
  { budget: 'Under $300K', size: '< 1,500 sqft', inventory: 'Critically Low', months: '0.8 months', note: 'Entry-level DFW inventory near historic lows. 15-25 offers per listing common in Fort Worth and Garland.' },
  { budget: 'Under $300K', size: '1,500-2,500 sqft', inventory: 'Very Low', months: '1.1 months', note: 'Older suburban stock. Competitive but more available in outer suburbs like Mesquite and Grand Prairie.' },
  { budget: '$300K-$500K', size: '< 1,500 sqft', inventory: 'Low', months: '1.8 months', note: 'Townhomes and condos in urban Dallas and Fort Worth. Rising demand from young professionals.' },
  { budget: '$300K-$500K', size: '1,500-2,500 sqft', inventory: 'Moderate', months: '2.6 months', note: 'The sweet spot of DFW supply. Most active segment. McKinney, Wylie, and Mansfield lead availability.' },
  { budget: '$300K-$500K', size: '2,500+ sqft', inventory: 'Low', months: '1.9 months', note: 'Families competing hard. North Frisco and Allen offer best relative supply in this range.' },
  { budget: '$500K-$800K', size: '2,500+ sqft', inventory: 'Moderate', months: '3.2 months', note: 'Move-up segment. Prosper, Southlake, and Colleyville have best active inventory. Interest rates bite here.' },
  { budget: 'Over $800K', size: '2,500+ sqft', inventory: 'Good', months: '5.8 months', note: 'Luxury DFW has supply. Highland Park, Westlake, and Preston Hollow buyers have negotiating room.' },
];

export default function DFWHousingSupplyGuide() {
  const [budget, setBudget] = useState('');
  const [size, setSize] = useState('');
  const [result, setResult] = useState<null | typeof segments[0]>(null);

  function lookup() {
    const found = segments.find(s => s.budget === budget && s.size === size)
      || segments.find(s => s.budget === budget);
    setResult(found || null);
  }

  const budgets = [...new Set(segments.map(s => s.budget))];
  const sizes = [...new Set(segments.map(s => s.size))];

  const getInventoryColor = (inv: string) => {
    if (inv.includes('Critically') || inv.includes('Very Low')) return '#ef4444';
    if (inv.includes('Low')) return '#f97316';
    if (inv.includes('Moderate')) return '#eab308';
    return '#22c55e';
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW HOUSING MARKET</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>DFW Housing Supply Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 17, marginBottom: 40, lineHeight: 1.7 }}>
          DFW has remained one of America's most affordable major metros because of a combination of factors no coastal city can replicate: vast buildable land, local governments that approve permits in weeks not years, and an active builder ecosystem with 14 major national homebuilders operating simultaneously.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { icon: '🏠', label: 'Active Listings (Metro)', value: '22,400', sub: 'As of May 2026' },
            { icon: '📅', label: 'Months of Supply', value: '2.1 months', sub: 'Below 3 = seller\’s market' },
            { icon: '🏗️', label: 'New Permits Issued', value: '48,200/yr', sub: '2025 DFW building permits' },
            { icon: '💰', label: 'Median Home Price', value: '$394,000', sub: 'DFW metro, May 2026' },
          ].map(card => (
            <div key={card.label} style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: '20px 18px', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{card.value}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{card.label}</div>
              <div style={{ color: '#64748b', fontSize: 13 }}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 16, padding: '28px', marginBottom: 40, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🏗️ Why DFW Stays Relatively Affordable</h2>
          <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
            {[
              { icon: '🌾', title: 'Buildable Land', desc: 'DFW has 9,000+ sq miles of metro land. Houston and DFW together account for 40% of all US new home construction.' },
              { icon: '🏛️', title: 'Pro-Development Government', desc: 'Texas cities approve permits in 60-90 days. Compare to San Francisco: 2-5 years. NIMBYism has less political power.' },
              { icon: '🏗️', title: 'Active Builder Market', desc: '14 national builders competing in DFW keeps new home prices from spiking. D.R. Horton alone built 9,000+ DFW homes in 2025.' },
              { icon: '📉', title: 'No State Income Tax', desc: 'TX has no income tax, making DFW ownership effective cost lower than equivalent CA or NY properties even at similar prices.' },
            ].map(item => (
              <div key={item.title} style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '14px 16px', display: 'flex', gap: 14 }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 16, padding: '32px 28px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>📊 Inventory Lookup — Your Segment</h2>
          <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 20 }}>Find current DFW inventory levels and months of supply for your target home segment.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Budget Range</label>
              <select value={budget} onChange={e => setBudget(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0d1b30', border: '1px solid #1e3a5f', borderRadius: 8, padding: '12px 14px', color: '#fff', fontSize: 14 }}>
                <option value=''>Select budget...</option>
                {budgets.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Home Size</label>
              <select value={size} onChange={e => setSize(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0d1b30', border: '1px solid #1e3a5f', borderRadius: 8, padding: '12px 14px', color: '#fff', fontSize: 14 }}>
                <option value=''>Select size...</option>
                {sizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={lookup}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer', marginBottom: 24 }}>
            Check Inventory
          </button>
          {result && (
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#64748b', fontSize: 13, marginBottom: 4 }}>Inventory Level</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: getInventoryColor(result.inventory) }}>{result.inventory}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#64748b', fontSize: 13, marginBottom: 4 }}>Months of Supply</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642' }}>{result.months}</div>
                </div>
              </div>
              <div style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '16px' }}>
                <div style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.7 }}>{result.note}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
