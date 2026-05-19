import { useState } from 'react';

const PAINT_TIERS: Record<string, { label: string; pricePerSqft: number; lifespan: number }> = {
  economy: { label: 'Economy Acrylic', pricePerSqft: 1.80, lifespan: 4 },
  standard: { label: 'Standard 100% Acrylic', pricePerSqft: 2.60, lifespan: 6 },
  premium: { label: 'Premium Elastomeric', pricePerSqft: 3.50, lifespan: 9 },
};

const STORIES_MULTIPLIER: Record<string, number> = {
  '1': 1.0,
  '2': 1.35,
  '3': 1.65,
};

const LABOR_SQFT = 1.40;
const PREP_FLAT = 450;

export default function DFWExteriorPaintCostGuide() {
  const [homeSqft, setHomeSqft] = useState(2200);
  const [stories, setStories] = useState('2');
  const [tier, setTier] = useState('standard');

  const paintData = PAINT_TIERS[tier];
  const storyMult = STORIES_MULTIPLIER[stories];
  const paintableSqft = homeSqft * 0.55 * storyMult;
  const materialCost = paintableSqft * paintData.pricePerSqft;
  const laborCost = paintableSqft * LABOR_SQFT;
  const totalCost = materialCost + laborCost + PREP_FLAT;
  const annualCost = totalCost / paintData.lifespan;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ marginBottom: 12 }}>
          <span style={{ backgroundColor: '#F5E642', color: '#0A1628', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 4 }}>
            ☀️ DFW EXTERIOR PAINTING
          </span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
          Exterior Paint Cost Guide for DFW Homes
        </h1>
        <p style={{ color: '#8A9BBE', fontSize: 16, marginBottom: 40 }}>
          Texas UV is brutal. The wrong paint fails in 3 years. Here's what actually holds up in DFW heat, hail, and humidity — and what it costs.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '☀️', title: 'Texas UV Destroys Cheap Paint', body: 'DFW receives 230+ sunny days per year. UV breaks down binder in economy paints within 3-4 years. Only elastomeric or 100% acrylic paints with UV inhibitors have proven longevity on North Texas exteriors.' },
            { icon: '🏗️', title: 'Prep Determines Lifespan', body: 'Pressure wash at 2,000+ PSI, scrape all peeling paint, caulk every gap and window joint, and prime bare wood. Skipping prep on DFW homes costs double when paint fails early — especially after hail seasons.' },
            { icon: '📅', title: 'How Often to Repaint in DFW', body: 'Budget paint: 3-4 years. Standard acrylic: 5-7 years. Elastomeric: 8-10 years. Brick and stucco can go 15+ years with proper paint. Wood siding needs the shortest cycle due to Texas moisture cycling.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#111D35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{card.title}</h3>
              <p style={{ color: '#8A9BBE', fontSize: 14, lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 16, padding: 32, border: '1px solid #1E2D4A', marginBottom: 40 }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>🧮 DFW Exterior Paint Cost Calculator</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 28 }}>
            <div>
              <label style={{ color: '#8A9BBE', fontSize: 13, display: 'block', marginBottom: 8 }}>Home Size (sqft)</label>
              <input
                type="range" min={800} max={6000} step={100} value={homeSqft}
                onChange={e => setHomeSqft(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }}
              />
              <div style={{ color: '#FFFFFF', fontWeight: 700, marginTop: 4 }}>{homeSqft.toLocaleString()} sqft</div>
            </div>
            <div>
              <label style={{ color: '#8A9BBE', fontSize: 13, display: 'block', marginBottom: 8 }}>Stories</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['1', '2', '3'].map(s => (
                  <button key={s} onClick={() => setStories(s)} style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 16, backgroundColor: stories === s ? '#F5E642′ : '#1E2D4A', color: stories === s ? '#0A1628' : '#8A9BBE' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ color: '#8A9BBE', fontSize: 13, display: 'block', marginBottom: 8 }}>Paint Tier</label>
              <select value={tier} onChange={e => setTier(e.target.value)} style={{ backgroundColor: '#1E2D4A', color: '#FFFFFF', border: '1px solid #2A3D5E', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
                {Object.entries(PAINT_TIERS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            {[
              { label: 'Materials', value: `$${Math.round(materialCost).toLocaleString()}`, sub: `${Math.round(paintableSqft)} paintable sqft` },
              { label: 'Labor + Prep', value: `$${Math.round(laborCost + PREP_FLAT).toLocaleString()}`, sub: 'includes pressure wash' },
              { label: 'Total Project', value: `$${Math.round(totalCost).toLocaleString()}`, sub: 'full exterior job', highlight: true },
              { label: 'Annual Cost', value: `$${Math.round(annualCost).toLocaleString()}/yr`, sub: `over ${paintData.lifespan} yrs` },
            ].map(stat => (
              <div key={stat.label} style={{ backgroundColor: stat.highlight ? '#F5E642′ : '#0A1628', borderRadius: 10, padding: 16, textAlign: ’center' }}>
                <div style={{ color: stat.highlight ? '#0A1628′ : '#8A9BBE', fontSize: 12, marginBottom: 4 }}>{stat.label}</div>
                <div style={{ color: stat.highlight ? '#0A1628′ : '#FFFFFF', fontSize: 20, fontWeight: 800 }}>{stat.value}</div>
                <div style={{ color: stat.highlight ? '#0A162880′ : '#4A5B7A', fontSize: 11 }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
            <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🎨 Best Paints for DFW Exteriors</h3>
            <ul style={{ color: '#8A9BBE', fontSize: 14, lineHeight: 2, paddingLeft: 18 }}>
              <li>Sherwin-Williams Emerald Exterior (top-rated UV)</li>
              <li>Behr Marquee Exterior (Home Depot, solid value)</li>
              <li>Benjamin Moore Aura (premium sheen retention)</li>
              <li>BASF Texcoat Elastomeric (stucco specialist)</li>
            </ul>
          </div>
          <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
            <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>⚠️ Common DFW Mistakes</h3>
            <ul style={{ color: '#8A9BBE', fontSize: 14, lineHeight: 2, paddingLeft: 18 }}>
              <li>Painting in summer heat over 90°F causes lap marks</li>
              <li>Skipping caulk on trim leads to water intrusion</li>
              <li>Using interior paint on soffits — blistering guaranteed</li>
              <li>Not priming new wood in DFW humidity = peeling in 18 mo</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
