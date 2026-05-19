import { useState } from 'react';

const plants = [
  { name: 'Live Oak', type: 'Tree', water: 'Very Low', bloom: 'Spring', note: 'Texas state tree, evergreen' },
  { name: 'Texas Sage (Cenizo)', type: 'Shrub', water: 'Very Low', bloom: 'After rain', note: 'Purple blooms signal rain' },
  { name: "Turk's Cap", type: 'Shrub', water: 'Low', bloom: 'Summer-Fall', note: 'Hummingbird magnet' },
  { name: 'Black-eyed Susan', type: 'Perennial', water: 'Low', bloom: 'Summer', note: 'Native wildflower' },
  { name: 'Yucca', type: 'Succulent', water: 'Very Low', bloom: 'Spring', note: 'Architectural focal point' },
  { name: 'Autumn Sage', type: 'Shrub', water: 'Low', bloom: 'Spring-Fall', note: 'Red blooms, deer resistant' },
  { name: 'Esperanza', type: 'Shrub', water: 'Low', bloom: 'Summer-Fall', note: 'Yellow trumpet flowers' },
  { name: 'Flame Acanthus', type: 'Shrub', water: 'Very Low', bloom: 'Summer-Fall', note: 'Orange-red, butterfly host' },
  { name: 'Inland Sea Oats', type: 'Grass', water: 'Low', bloom: 'Summer', note: 'Shade tolerant ornamental' },
  { name: 'Mexican Feather Grass', type: 'Grass', water: 'Very Low', bloom: 'Year-round', note: 'Airy, movement in wind' },
];

const costData = [
  { item: 'Installation (per sq ft)', xeriscape: '$3–6', traditional: '$2–4′ },
  { item: 'Annual water cost (per sq ft)', xeriscape: '$0.05–0.10', traditional: '$0.40–0.80′ },
  { item: 'Annual maintenance', xeriscape: '$200–400', traditional: '$800–1,800′ },
  { item: '5-year total cost (1,000 sq ft)', xeriscape: '$5,250–8,500', traditional: '$22,000–38,000′ },
];

const stages = [
  { stage: 'Stage 1', restriction: '2 days/week watering', trigger: 'Voluntary conservation' },
  { stage: 'Stage 2', restriction: '1 day/week watering', trigger: 'Moderate shortage' },
  { stage: 'Stage 3', restriction: 'No lawn watering', trigger: 'Severe shortage' },
  { stage: 'Stage 4', restriction: 'Emergency only', trigger: 'Critical shortage' },
];

export default function DFWXeriscapeGuide() {
  const [sqft, setSqft] = useState(2000);
  const [waterCost, setWaterCost] = useState(0.008);
  const [activeTab, setActiveTab] = useState<'plants' | 'costs' | 'stages'>('plants');

  const gallonsPerSqFtPerYear = 18;
  const xeriscapeReduction = 0.75;
  const annualSavingsGallons = sqft * gallonsPerSqFtPerYear * xeriscapeReduction;
  const annualSavingsDollars = annualSavingsGallons * waterCost;
  const fiveYearSavings = annualSavingsDollars * 5;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌵</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>
            DFW Xeriscape Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 600, margin: '0 auto' }}>
            Water-smart landscaping for North Texas drought conditions — save 50–75% on outdoor water use
          </p>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32, borderLeft: '4px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 20 }}>⚠️ DFW Drought Reality Check</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, marginBottom: 12 }}>
            The Dallas-Fort Worth Metroplex sits in one of the most water-stressed regions of Texas. With clay-heavy soils, 
            100°F+ summers, and recurring drought cycles, traditional turf lawns consume 50–70% of residential water use — 
            water you're paying for but largely wasting through evaporation.
          </p>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
            Cities like Dallas, Fort Worth, Plano, and Frisco cycle through water restrictions annually. Xeriscape eliminates 
            restriction anxiety and permanently reduces your water bill.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {(['plants', 'costs', 'stages'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600,
                background: activeTab === tab ? '#F5E642′ : '#1E2D45',
                color: activeTab === tab ? '#0A1628′ : '#94A3B8',
                transition: 'all 0.2s',
              }}
            >
              {tab === 'plants' ? '🌿 Native Plants' : tab === 'costs' ? '💰 Cost Compare' : '🚿 Water Stages'}
            </button>
          ))}
        </div>

        {activeTab === 'plants' && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 20 }}>Top 10 Drought-Tolerant Plants for North Texas</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {plants.map((p, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#E8EDF5', marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 13, color: '#64748B' }}>{p.note}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ background: '#1E2D45', padding: '4px 10px', borderRadius: 20, fontSize: 12, color: '#94A3B8′ }}>{p.type}</span>
                    <span style={{ background: p.water === 'Very Low' ? '#14532D' : '#1C3D2F', padding: '4px 10px', borderRadius: 20, fontSize: 12, color: '#4ADE80′ }}>
                      💧 {p.water}
                    </span>
                    <span style={{ background: '#1E2D45', padding: '4px 10px', borderRadius: 20, fontSize: 12, color: '#F5E642′ }}>🌸 {p.bloom}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'costs' && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 20 }}>Xeriscape vs Traditional Lawn Cost Comparison</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '12px 16px', color: '#94A3B8', borderBottom: '2px solid #0A1628′ }}>Cost Item</th>
                    <th style={{ textAlign: 'right', padding: '12px 16px', color: '#4ADE80', borderBottom: '2px solid #0A1628′ }}>🌵 Xeriscape</th>
                    <th style={{ textAlign: 'right', padding: '12px 16px', color: '#F87171', borderBottom: '2px solid #0A1628′ }}>🌱 Traditional</th>
                  </tr>
                </thead>
                <tbody>
                  {costData.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #0A1628′ }}>
                      <td style={{ padding: '12px 16px', color: '#CBD5E1′ }}>{row.item}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: '#4ADE80', fontWeight: 600 }}>{row.xeriscape}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: '#F87171', fontWeight: 600 }}>{row.traditional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'stages' && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 20 }}>DFW Water Restriction Stages</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {stages.map((s, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{s.stage}</div>
                    <div style={{ color: '#CBD5E1′ }}>{s.restriction}</div>
                  </div>
                  <span style={{ background: '#1E2D45', padding: '6px 14px', borderRadius: 20, fontSize: 13, color: '#94A3B8′ }}>{s.trigger}</span>
                </div>
              ))}
            </div>
            <p style={{ color: '#64748B', fontSize: 13, marginTop: 16 }}>
              * Xeriscape landscapes are typically exempt from Stages 1-2 restrictions and face minimal impact in Stages 3-4
            </p>
          </div>
        )}

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 20 }}>💧 Water Savings Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', marginBottom: 8, fontSize: 14 }}>Lawn Size (sq ft)</label>
              <input
                type="range" min={500} max={10000} step={100} value={sqft}
                onChange={e => setSqft(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }}
              />
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 4 }}>{sqft.toLocaleString()} sq ft</div>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', marginBottom: 8, fontSize: 14 }}>Water Cost ($/gallon)</label>
              <input
                type="range" min={0.003} max={0.015} step={0.001} value={waterCost}
                onChange={e => setWaterCost(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }}
              />
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 4 }}>${waterCost.toFixed(3)}/gallon</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            {[
              { label: 'Annual Gallons Saved', value: annualSavingsGallons.toLocaleString(undefined, { maximumFractionDigits: 0 }), unit: 'gal/yr' },
              { label: 'Annual $ Savings', value: `$${annualSavingsDollars.toFixed(0)}`, unit: 'per year' },
              { label: '5-Year Savings', value: `$${fiveYearSavings.toFixed(0)}`, unit: '5 years' },
            ].map((stat, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#4ADE80′ }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{stat.unit}</div>
                <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Get a Free Xeriscape Quote in DFW</h3>
          <p style={{ color: '#1E3A5F', marginBottom: 16 }}>Connect with certified xeriscaping pros in your neighborhood</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', padding: '14px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
