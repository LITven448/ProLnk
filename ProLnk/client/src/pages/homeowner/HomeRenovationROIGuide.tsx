import { useState } from 'react';

const renovations = [
  { id: 'garage', label: '🚗 Garage Door Replacement', roi: 94, avgCost: 4200, valueAdded: 3948 },
  { id: 'kitchen', label: '🍳 Minor Kitchen Remodel', roi: 81, avgCost: 28000, valueAdded: 22680 },
  { id: 'siding', label: '🏠 Vinyl Siding Replacement', roi: 77, avgCost: 18000, valueAdded: 13860 },
  { id: 'deck', label: '🌿 Deck / Patio Addition', roi: 75, avgCost: 22000, valueAdded: 16500 },
  { id: 'bathroom', label: '🛁 Mid-Range Bath Remodel', roi: 74, avgCost: 25000, valueAdded: 18500 },
  { id: 'hvac', label: '❄️ HVAC System Upgrade', roi: 72, avgCost: 9500, valueAdded: 6840 },
  { id: 'windows', label: '🪟 Window Replacement', roi: 68, avgCost: 20000, valueAdded: 13600 },
  { id: 'paint', label: '🎨 Interior Paint (full home)', roi: 62, avgCost: 5500, valueAdded: 3410 },
  { id: 'landscape', label: '🌳 Landscaping Upgrade', roi: 58, avgCost: 8000, valueAdded: 4640 },
  { id: 'roof', label: '🔨 Roof Replacement', roi: 55, avgCost: 12500, valueAdded: 6875 },
];

export default function HomeRenovationROIGuide() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const selectedRenovations = renovations.filter(r => selected.includes(r.id));
  const totalCost = selectedRenovations.reduce((acc, r) => acc + r.avgCost, 0);
  const totalValue = selectedRenovations.reduce((acc, r) => acc + r.valueAdded, 0);
  const blendedROI = totalCost > 0 ? Math.round((totalValue / totalCost) * 100) : 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📈</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            Best Home Renovations for DFW ROI — 2026
          </h1>
          <p style={{ color: '#94a3b8′ }}>Select renovations below to calculate your total investment and estimated value added</p>
        </div>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '1.5rem' }}>📊</span>
          <div>
            <strong>DFW Market Note:</strong> DFW home values grew 42% from 2020–2025. Outdoor living spaces and energy efficiency upgrades command above-national-average returns in North Texas.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {renovations.map((r, i) => (
            <div
              key={r.id}
              onClick={() => toggle(r.id)}
              style={{
                background: selected.includes(r.id) ? '#0f2a1a' : '#112240',
                border: `1px solid ${selected.includes(r.id) ? '#22c55e' : '#1e3a5f'}`,
                borderRadius: 10, padding: '1rem 1.25rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>{selected.includes(r.id) ? '✅' : '⬜'}</span>
              <div style={{ flex: 1, minWidth: 140 }}>
                <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem', marginRight: '0.4rem' }}>#{i + 1}</span>
                  {r.label}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                  Avg cost: ${r.avgCost.toLocaleString()} · Value added: ${r.valueAdded.toLocaleString()}
                </div>
              </div>
              <div style={{ textAlign: 'right', minWidth: 60 }}>
                <div style={{
                  fontSize: '1.25rem', fontWeight: 700,
                  color: r.roi >= 80 ? '#22c55e' : r.roi >= 65 ? '#F5E642′ : '#f59e0b',
                }}>{r.roi}%</div>
                <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>ROI</div>
              </div>
            </div>
          ))}
        </div>

        {selected.length > 0 && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
              🧮 Your Renovation Portfolio
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444′ }}>${totalCost.toLocaleString()}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.25rem' }}>Total Investment</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#22c55e' }}>${totalValue.toLocaleString()}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.25rem' }}>Est. Value Added</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#F5E642′ }}>{blendedROI}%</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.25rem' }}>Blended ROI</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {selectedRenovations.map(r => (
                <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.875rem', padding: '0.4rem 0', borderBottom: '1px solid #1e3a5f' }}>
                  <span>{r.label}</span>
                  <span style={{ color: '#fff' }}>${r.avgCost.toLocaleString()} → +${r.valueAdded.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            💡 DFW-Specific ROI Tips
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              '🌡️ HVAC upgrades outperform national average — buyers price in DFW summer heat costs',
              '🌿 Covered patios add $15K–$40K in DFW — outdoor living season is 9 months long',
              '🔆 Energy-efficient windows recoup faster here — utility bills are above national average',
              '🚿 Bathroom remodels with walk-in showers return strongest in $400K+ homes',
              '🏡 Curb appeal is magnified in DFW — buyers form decisions in the first 8 seconds',
            ].map((tip, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', color: '#e2e8f0', fontSize: '0.875rem' }}>{tip}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1a1a2e', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔨</div>
          <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>Ready to Start a Renovation?</h3>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.875rem' }}>ProLnk connects DFW homeowners with vetted contractors for any renovation project.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontSize: '1rem', cursor: 'pointer' }}>
            Get Free Renovation Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
