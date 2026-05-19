import { useState } from 'react';

const TRAFFIC_LEVELS: Record<string, { label: string; minWear: number; recWear: number }> = {
  light: { label: 'Light (bedroom, office)', minWear: 6, recWear: 8 },
  medium: { label: 'Medium (dining, living room)', minWear: 8, recWear: 12 },
  heavy: { label: 'Heavy (kitchen, entryway)', minWear: 12, recWear: 20 },
  commercial: { label: 'Commercial / Rental', minWear: 20, recWear: 28 },
};

const BUDGET_TIERS: Record<string, { label: string; priceRange: [number, number]; brands: string[] }> = {
  value: { label: 'Value', priceRange: [1.50, 2.50], brands: ['LifeProof (Home Depot)', 'Pergo Outlast'] },
  mid: { label: 'Mid-Range', priceRange: [2.50, 4.00], brands: ['Shaw Floorté', 'Armstrong Luxe'] },
  premium: { label: 'Premium', priceRange: [4.00, 7.00], brands: ['COREtec Plus', 'Karndean Korlok'] },
};

const INSTALL_COST = 2.20;

export default function DFWLVPFlooringGuide() {
  const [sqft, setSqft] = useState(1000);
  const [traffic, setTraffic] = useState('medium');
  const [budget, setBudget] = useState('mid');

  const trafficData = TRAFFIC_LEVELS[traffic];
  const budgetData = BUDGET_TIERS[budget];
  const [minPrice, maxPrice] = budgetData.priceRange;
  const minTotal = sqft * (minPrice + INSTALL_COST);
  const maxTotal = sqft * (maxPrice + INSTALL_COST);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ marginBottom: 12 }}>
          <span style={{ backgroundColor: '#F5E642', color: '#0A1628', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 4 }}>
            🏆 DFW LVP FLOORING
          </span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
          LVP Flooring Guide for DFW Homes
        </h1>
        <p style={{ color: '#8A9BBE', fontSize: 16, marginBottom: 40 }}>
          Luxury Vinyl Plank is the #1 selling floor in DFW — and for good reason. Waterproof, handles humidity swings, installs over uneven slabs. Here's everything you need to know.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '💧', title: 'Why LVP Dominates DFW', body: '100% waterproof — unmatched for DFW homes with slab foundations prone to moisture. No acclimation needed. Dimensional stability handles 20-80% humidity swings without gapping or buckling. Perfect for allergy-prone Texans.' },
            { icon: '📏', title: 'Wear Layer Thickness Guide', body: '6 mil: bedrooms only. 8 mil: medium residential. 12 mil: living rooms, kitchens. 20 mil: heavy residential or rental property. 28+ mil: commercial. Most DFW homeowners need 12 mil minimum for main living areas.' },
            { icon: '🔗', title: 'Click vs Glue vs Loose Lay', body: 'Click/float: fastest install, easy DIY, great for most DFW rooms. Glue-down: best on uneven slabs over 3/16″ variation, most stable. Loose lay: no adhesive, fastest removal, works on very flat DFW slabs.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#111D35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{card.title}</h3>
              <p style={{ color: '#8A9BBE', fontSize: 14, lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 16, padding: 32, border: '1px solid #1E2D4A', marginBottom: 40 }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>🧮 LVP Product Recommender + Cost Estimator</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 28 }}>
            <div>
              <label style={{ color: '#8A9BBE', fontSize: 13, display: 'block', marginBottom: 8 }}>Square Footage</label>
              <input
                type="range" min={100} max={4000} step={50} value={sqft}
                onChange={e => setSqft(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }}
              />
              <div style={{ color: '#FFFFFF', fontWeight: 700, marginTop: 4 }}>{sqft.toLocaleString()} sqft</div>
            </div>
            <div>
              <label style={{ color: '#8A9BBE', fontSize: 13, display: 'block', marginBottom: 8 }}>Traffic Level</label>
              <select value={traffic} onChange={e => setTraffic(e.target.value)} style={{ backgroundColor: '#1E2D4A', color: '#FFFFFF', border: '1px solid #2A3D5E', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
                {Object.entries(TRAFFIC_LEVELS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8A9BBE', fontSize: 13, display: 'block', marginBottom: 8 }}>Budget Tier</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ backgroundColor: '#1E2D4A', color: '#FFFFFF', border: '1px solid #2A3D5E', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
                {Object.entries(BUDGET_TIERS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
          </div>

          <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>✅ Recommended for Your Needs</div>
            <div style={{ color: '#8A9BBE', fontSize: 13, marginBottom: 6 }}>Minimum wear layer: <span style={{ color: '#FFFFFF', fontWeight: 700 }}>{trafficData.minWear} mil</span> — Recommended: <span style={{ color: '#F5E642', fontWeight: 700 }}>{trafficData.recWear} mil</span></div>
            <div style={{ color: '#8A9BBE', fontSize: 13 }}>Top brands at your budget level:</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
              {budgetData.brands.map(b => (
                <span key={b} style={{ backgroundColor: '#1E2D4A', color: '#E8EAF0', fontSize: 12, padding: '4px 10px', borderRadius: 6 }}>{b}</span>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            {[
              { label: 'Material Range', value: `$${(sqft * minPrice).toLocaleString()} – $${(sqft * maxPrice).toLocaleString()}`, sub: `$${minPrice}–$${maxPrice}/sqft` },
              { label: 'Install Cost', value: `$${(sqft * INSTALL_COST).toLocaleString()}`, sub: `$${INSTALL_COST}/sqft labor` },
              { label: 'Total Estimate', value: `$${Math.round(minTotal).toLocaleString()} – $${Math.round(maxTotal).toLocaleString()}`, sub: 'full project', highlight: true },
            ].map(stat => (
              <div key={stat.label} style={{ backgroundColor: stat.highlight ? '#F5E642′ : '#0A1628', borderRadius: 10, padding: 16, textAlign: ’center' }}>
                <div style={{ color: stat.highlight ? '#0A1628′ : '#8A9BBE', fontSize: 12, marginBottom: 4 }}>{stat.label}</div>
                <div style={{ color: stat.highlight ? '#0A1628′ : '#FFFFFF', fontSize: 16, fontWeight: 800 }}>{stat.value}</div>
                <div style={{ color: stat.highlight ? '#0A162880′ : '#4A5B7A', fontSize: 11 }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🏠 DFW-Specific LVP Tips</h3>
          <ul style={{ color: '#8A9BBE', fontSize: 14, lineHeight: 2, paddingLeft: 18 }}>
            <li>DFW slabs move — check flatness before click-lock install (3/16" per 10ft max)</li>
            <li>Leave ¼" expansion gap at all walls — critical in DFW climate cycling</li>
            <li>Add 10% to sqft for waste (15% with diagonal layout)</li>
            <li>Underlayment with moisture barrier is mandatory over DFW slab</li>
            <li>LVP is DIY-friendly — saves $1,500-$3,000 on a 1,000 sqft job</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
