import { useState } from 'react';

const materials = [
  { name: 'Vinyl', costLow: 3, costHigh: 7, hail: 4, energy: 3, hoa: 5, lifespan: 25, description: 'Most affordable, low maintenance, wide color range. Lightweight and easy to install.' },
  { name: 'Fiber Cement', costLow: 6, costHigh: 12, hail: 9, energy: 7, hoa: 9, lifespan: 50, description: 'Excellent hail resistance. Mimics wood look. Class 4 impact rating — ideal for DFW hail zones.' },
  { name: 'Brick', costLow: 8, costHigh: 18, hail: 10, energy: 8, hoa: 10, lifespan: 100, description: 'Maximum durability and resale value. Virtually maintenance-free. Premium HOA acceptance.' },
  { name: 'Stucco', costLow: 7, costHigh: 14, hail: 5, energy: 9, hoa: 7, lifespan: 50, description: 'Excellent insulation value. Popular in DFW Mediterranean-style homes. Requires professional repair.' },
];

function RatingBar({ value, max = 10 }: { value: number; max?: number }) {
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          style={{
            width: 10,
            height: 10,
            borderRadius: 2,
            background: i < value ? '#F5E642' : '#1E2D45',
          }}
        />
      ))}
    </div>
  );
}

export default function SidingReplacementGuide() {
  const [sqft, setSqft] = useState('');
  const [material, setMaterial] = useState('Vinyl');

  const selected = materials.find(m => m.name === material)!;
  const area = parseFloat(sqft) || 0;
  const low = area * selected.costLow;
  const high = area * selected.costHigh;
  const roiEst = material === 'Fiber Cement' ? 76 : material === 'Brick' ? 85 : material === 'Stucco' ? 70 : 68;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px 0' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a2a45 100%)', borderBottom: '2px solid #F5E642', padding: '48px 24px 36px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>🏠 DFW Homeowner Guide</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>Siding Replacement Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, margin: 0, maxWidth: 600 }}>
            Vinyl vs fiber cement vs brick vs stucco — what works best for DFW hail, heat, and HOA requirements.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px 0' }}>
        <div style={{ background: '#0f1e35', border: '1px solid #1E2D45', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>⚡ Why Siding Choice Matters More in DFW</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            DFW averages 6–8 hail events per year. Choosing the wrong siding can mean multiple insurance claims and constant repairs. Additionally, HOA restrictions in communities like Southlake, Frisco, and Allen often mandate specific materials or color families.
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Material Comparison</h2>
        <div style={{ overflowX: 'auto', marginBottom: 40 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#0f1e35' }}>
                {['Material', 'Cost / Sq Ft', 'Hail Resistance', 'Energy Impact', 'HOA Acceptance', 'Lifespan'].map(h => (
                  <th key={h} style={{ padding: '12px 14px', textAlign: 'left', color: '#F5E642', fontWeight: 700, borderBottom: '1px solid #1E2D45', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {materials.map((m, i) => (
                <tr key={m.name} style={{ background: i % 2 === 0 ? '#0A1628' : '#0d1a2e' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700 }}>{m.name}</td>
                  <td style={{ padding: '12px 14px', color: '#94a3b8' }}>${m.costLow}–${m.costHigh}</td>
                  <td style={{ padding: '12px 14px' }}><RatingBar value={m.hail} /></td>
                  <td style={{ padding: '12px 14px' }}><RatingBar value={m.energy} /></td>
                  <td style={{ padding: '12px 14px' }}><RatingBar value={m.hoa} /></td>
                  <td style={{ padding: '12px 14px', color: '#94a3b8' }}>{m.lifespan} yrs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 40 }}>
          {materials.map(m => (
            <div key={m.name} style={{ background: '#0f1e35', border: '1px solid #1E2D45', borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 8 }}>{m.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{m.description}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1e35', border: '2px solid #F5E642', borderRadius: 14, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>🧮 Interactive Cost Estimator</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Enter your home's exterior square footage and select a material to estimate total project cost and ROI.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 8 }}>Exterior Sq Footage</label>
              <input
                type="number"
                value={sqft}
                onChange={e => setSqft(e.target.value)}
                placeholder="e.g. 2400"
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D45', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 8 }}>Material</label>
              <select
                value={material}
                onChange={e => setMaterial(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D45', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
              >
                {materials.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
              </select>
            </div>
          </div>

          {area > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { label: 'Low Estimate', value: `$${low.toLocaleString()}` },
                { label: 'High Estimate', value: `$${high.toLocaleString()}` },
                { label: 'Avg ROI at Resale', value: `${roiEst}%` },
              ].map(s => (
                <div key={s.label} style={{ background: '#0A1628', borderRadius: 10, padding: '18px 20px', textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>{s.value}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0f1e35', border: '1px solid #1E2D45', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 16px' }}>📋 HOA Considerations</h3>
          <ul style={{ color: '#94a3b8', lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
            <li>Most DFW HOAs require prior approval before any exterior change</li>
            <li>Color palettes are often restricted to approved earth tones or neighborhood-matching schemes</li>
            <li>Fiber cement and brick are typically pre-approved; vinyl may face restrictions in upscale communities</li>
            <li>Permit from your city is required regardless of HOA approval</li>
            <li>Collin, Denton, and Tarrant counties each have separate permit processes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
