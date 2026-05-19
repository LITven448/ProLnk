import { useState } from 'react';

const MATERIALS = [
  {
    name: 'Granite',
    costMin: 45,
    costMax: 200,
    heatResistance: 5,
    scratchResistance: 5,
    stainResistance: 3,
    maintenance: 'Seal annually, avoid acidic cleaners',
    dfwNote: 'Sealing critical in DFW hard water areas — mineral deposits etch unsealed granite',
    popular: false,
  },
  {
    name: 'Quartz',
    costMin: 55,
    costMax: 150,
    heatResistance: 3,
    scratchResistance: 4,
    stainResistance: 5,
    maintenance: 'Wipe clean, no sealing needed',
    dfwNote: 'Top choice in DFW 2024-2026 — white quartz dominates new builds and remodels',
    popular: true,
  },
  {
    name: 'Quartzite',
    costMin: 60,
    costMax: 200,
    heatResistance: 5,
    scratchResistance: 5,
    stainResistance: 3,
    maintenance: 'Seal every 1-2 years, natural stone care',
    dfwNote: 'Natural stone requiring diligent sealing — DFW hard water accelerates surface etching',
    popular: false,
  },
  {
    name: 'Marble',
    costMin: 75,
    costMax: 250,
    heatResistance: 4,
    scratchResistance: 2,
    stainResistance: 2,
    maintenance: 'Seal 2-4x yearly, very high maintenance',
    dfwNote: 'Beautiful but demanding — DFW hard water causes heavy spotting without frequent sealing',
    popular: false,
  },
  {
    name: 'Butcher Block',
    costMin: 30,
    costMax: 100,
    heatResistance: 1,
    scratchResistance: 2,
    stainResistance: 2,
    maintenance: 'Oil monthly, avoid standing water',
    dfwNote: 'Popular for islands — keep away from DFW summer heat near windows to prevent warping',
    popular: false,
  },
  {
    name: 'Laminate',
    costMin: 10,
    costMax: 40,
    heatResistance: 2,
    scratchResistance: 3,
    stainResistance: 4,
    maintenance: 'Wipe clean, avoid heat directly',
    dfwNote: 'Budget-friendly but not ideal for avid DFW cooks who barbecue and fry frequently',
    popular: false,
  },
];

const KITCHEN_SIZES = [
  { label: 'Small (under 100 sq ft)', sqft: 80 },
  { label: 'Medium (100-150 sq ft)', sqft: 125 },
  { label: 'Large (150-250 sq ft)', sqft: 200 },
  { label: 'Open Concept (250+ sq ft)', sqft: 300 },
];

function RatingDots({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 3 }}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: i < rating ? '#F5E642′ : '#1E2D45',
            display: 'inline-block',
          }}
        />
      ))}
    </span>
  );
}

export default function DFWCountertopGuide() {
  const [selectedMaterial, setSelectedMaterial] = useState('Quartz');
  const [selectedSize, setSelectedSize] = useState(KITCHEN_SIZES[1]);
  const [countertopPct, setCountertopPct] = useState(30);

  const material = MATERIALS.find((m) => m.name === selectedMaterial) || MATERIALS[1];
  const sqft = Math.round((selectedSize.sqft * countertopPct) / 100);
  const minCost = sqft * material.costMin;
  const maxCost = sqft * material.costMax;

  const maintenanceSchedule =
    material.name === 'Granite' || material.name === 'Quartzite'
      ? ['Seal annually (spring recommended)', 'Clean with pH-neutral cleaner weekly', 'Inspect for chips after heavy use']
      : material.name === 'Marble'
      ? ['Seal every 3 months', 'Polish semi-annually', 'Wipe spills immediately — no acids']
      : material.name === 'Butcher Block'
      ? ['Oil with food-safe mineral oil monthly', 'Sand lightly if stained', 'Keep dry between uses']
      : ['Wipe with mild soap and water weekly', 'Check seams annually for lifting'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🍳</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>
            DFW Countertop Guide 2024-2026
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 600, margin: '0 auto' }}>
            Compare materials built for DFW kitchens — hard water, high heat, and heavy cooking demand the right surface.
          </p>
        </div>

        <div style={{ background: '#0F1F35', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 24 }}>Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', marginBottom: 8, fontSize: 14 }}>Kitchen Size</label>
              <select
                value={selectedSize.label}
                onChange={(e) => setSelectedSize(KITCHEN_SIZES.find((s) => s.label === e.target.value) || KITCHEN_SIZES[1])}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#1A2E4A', border: '1px solid #2A4A6A', color: '#E8EDF5', fontSize: 15 }}
              >
                {KITCHEN_SIZES.map((s) => (
                  <option key={s.label} value={s.label}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', marginBottom: 8, fontSize: 14 }}>
                Countertop Coverage: {countertopPct}% of kitchen ({sqft} sq ft)
              </label>
              <input
                type="range"
                min={15}
                max={50}
                value={countertopPct}
                onChange={(e) => setCountertopPct(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }}
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', color: '#94A3B8', marginBottom: 12, fontSize: 14 }}>Select Material</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {MATERIALS.map((m) => (
                <button
                  key={m.name}
                  onClick={() => setSelectedMaterial(m.name)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 10,
                    border: `2px solid ${selectedMaterial === m.name ? '#F5E642' : '#1E3A5F'}`,
                    background: selectedMaterial === m.name ? '#1A2E4A' : '#0D1A2E',
                    color: selectedMaterial === m.name ? '#F5E642′ : '#94A3B8',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: 14,
                    position: 'relative',
                  }}
                >
                  {m.popular && (
                    <span style={{ position: 'absolute', top: -8, right: -8, background: '#F5E642', color: '#0A1628', fontSize: 10, padding: '2px 6px', borderRadius: 10, fontWeight: 700 }}>
                      POPULAR
                    </span>
                  )}
                  {m.name}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 24, padding: 20, background: '#0A1628', borderRadius: 12, border: '1px solid #F5E642′ }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>Estimated Total (Installed)</div>
                <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 800 }}>
                  ${minCost.toLocaleString()} - ${maxCost.toLocaleString()}
                </div>
                <div style={{ color: '#64748B', fontSize: 12 }}>{sqft} sq ft at ${material.costMin}-${material.costMax}/sq ft installed</div>
              </div>
              <div>
                <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>Performance Ratings</div>
                <div style={{ fontSize: 13, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Heat Resistance</span>
                    <RatingDots rating={material.heatResistance} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Scratch Resistance</span>
                    <RatingDots rating={material.scratchResistance} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Stain Resistance</span>
                    <RatingDots rating={material.stainResistance} />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 16, padding: 12, background: '#1A2E4A', borderRadius: 8 }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>DFW Hard Water Note</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>{material.dfwNote}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0F1F35', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>Maintenance Schedule - {selectedMaterial}</h2>
          <div style={{ color: '#94A3B8', fontSize: 14, marginBottom: 12 }}>{material.maintenance}</div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {maintenanceSchedule.map((task, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#CBD5E1', fontSize: 15 }}>
                <span style={{ color: '#F5E642', fontSize: 18 }}>✓</span>
                {task}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: '#0F1F35', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>Full Material Comparison</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #1E3A5F' }}>
                  {['Material', 'Cost/sq ft', 'Heat', 'Scratch', 'Stain', 'Sealing'].map((h) => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#94A3B8', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATERIALS.map((m, i) => (
                  <tr key={m.name} style={{ borderBottom: '1px solid #1E3A5F', background: i % 2 === 0 ? '#0A1628′ : ’transparent' }}>
                    <td style={{ padding: '10px 12px', color: m.popular ? '#F5E642′ : '#E8EDF5', fontWeight: m.popular ? 700 : 400 }}>
                      {m.name} {m.popular ? '★' : ''}
                    </td>
                    <td style={{ padding: '10px 12px', color: '#CBD5E1′ }}>${m.costMin}-${m.costMax}</td>
                    <td style={{ padding: '10px 12px' }}><RatingDots rating={m.heatResistance} /></td>
                    <td style={{ padding: '10px 12px' }}><RatingDots rating={m.scratchResistance} /></td>
                    <td style={{ padding: '10px 12px' }}><RatingDots rating={m.stainResistance} /></td>
                    <td style={{ padding: '10px 12px', color: '#94A3B8′ }}>
                      {m.name === 'Granite' || m.name === 'Quartzite' ? 'Annual' : m.name === 'Marble' ? 'Quarterly' : 'None'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: 24, background: '#0F1F35', borderRadius: 16, border: '1px solid #F5E642′ }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏠</div>
          <h3 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>Get DFW Countertop Quotes</h3>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>Connect with vetted DFW countertop installers through ProLnk — free quotes, no commitment.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', padding: '14px 32px', borderRadius: 10, border: 'none', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
            Get Free Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
