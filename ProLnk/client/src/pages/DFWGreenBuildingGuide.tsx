import { useState } from 'react';

const certifications = [
  { name: 'LEED', org: 'U.S. Green Building Council', focus: 'Comprehensive sustainability across all building systems', levels: ['Certified', 'Silver', 'Gold', 'Platinum'], cost: '$3,000–$30,000', bestFor: 'New construction or major renovations' },
  { name: 'ENERGY STAR', org: 'EPA', focus: 'Energy efficiency — must score 75+ on 1–100 scale', levels: ['Certified'], cost: '$300–$1,500', bestFor: 'Existing homes seeking proven energy savings' },
  { name: 'Green Built Texas', org: 'Texas Association of Builders', focus: 'Texas climate–specific green building practices', levels: ['Bronze', 'Silver', 'Gold'], cost: '$1,500–$8,000', bestFor: 'DFW new builds tuned to local climate' },
];

const features = [
  { icon: '☀️', title: 'Solar Panels', desc: 'DFW averages 229 sunny days/year — one of the best solar markets in Texas. 8–10 kW system covers most DFW homes.', savings: '$1,200–$2,400/yr' },
  { icon: '❄️', title: 'High-Efficiency HVAC', desc: 'SEER 18+ units cut cooling costs 30–40% vs standard SEER 14 units. Critical in DFW where AC runs 7+ months.', savings: '$600–$1,000/yr' },
  { icon: '🏠', title: 'Spray Foam Insulation', desc: 'Closed-cell spray foam creates air barrier + insulation in one step. Especially valuable in DFW attics hitting 140°F+ in summer.', savings: '$800–$1,500/yr' },
  { icon: '🌳', title: 'Shade Trees', desc: 'Strategic tree placement on west and southwest exposures reduces cooling load 20–30%. Live oaks and cedar elms thrive in DFW clay.', savings: '$400–$800/yr' },
  { icon: '⬜', title: 'Cool/White Roofs', desc: 'Reflective roofing reduces urban heat island effect and attic temps by 20–30°F. Metal roofing with cool coating is ideal.', savings: '$300–$600/yr' },
  { icon: '💧', title: 'Low-Flow Fixtures', desc: 'WaterSense fixtures cut indoor water use 20%. With DFW water rates rising, payback under 2 years.', savings: '$150–$300/yr' },
];

const upgrades = [
  { name: 'Air Sealing & Insulation', cost: 3500, annualSavings: 900, payback: 3.9 },
  { name: 'High-Efficiency HVAC (SEER 18+)', cost: 8000, annualSavings: 800, payback: 10.0 },
  { name: 'Solar Panel System (8 kW)', cost: 22000, annualSavings: 1800, payback: 12.2 },
  { name: 'Cool Roof Coating', cost: 2500, annualSavings: 450, payback: 5.6 },
  { name: 'Spray Foam Attic Insulation', cost: 6000, annualSavings: 1100, payback: 5.5 },
  { name: 'Smart Thermostat', cost: 350, annualSavings: 180, payback: 1.9 },
  { name: 'Low-Flow Fixtures (whole home)', cost: 800, annualSavings: 200, payback: 4.0 },
  { name: 'LED Lighting Upgrade', cost: 600, annualSavings: 240, payback: 2.5 },
  { name: 'Shade Tree Planting (3 trees)', cost: 1200, annualSavings: 600, payback: 2.0 },
  { name: 'Window Film / Low-E Windows', cost: 4500, annualSavings: 500, payback: 9.0 },
];

export default function DFWGreenBuildingGuide() {
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<{ list: typeof upgrades; totalSavings: number; avgPayback: number } | null>(null);

  function calculate() {
    const b = parseFloat(budget);
    if (!b || b <= 0) return;
    let remaining = b;
    const sorted = [...upgrades].sort((a, c) => a.payback - c.payback);
    const selected: typeof upgrades = [];
    for (const u of sorted) {
      if (u.cost <= remaining) { selected.push(u); remaining -= u.cost; }
    }
    const totalSavings = selected.reduce((s, u) => s + u.annualSavings, 0);
    const avgPayback = selected.length ? selected.reduce((s, u) => s + u.payback, 0) / selected.length : 0;
    setResult({ list: selected, totalSavings, avgPayback });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg,#0A1628 0%,#1a2d4a 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🌿</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Green Building Guide</h1>
        <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 640, margin: '0 auto' }}>Certifications, sustainable upgrades, and DFW-specific strategies to lower your energy bills and carbon footprint.</p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 20px' }}>Green Certifications Compared</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
          {certifications.map(c => (
            <div key={c.name} style={{ background: '#1E2D45', borderRadius: 16, padding: 24, border: '1px solid #2A3F5C' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 12 }}>{c.org}</div>
              <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 12 }}>{c.focus}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {c.levels.map(l => <span key={l} style={{ background: '#0A1628', color: '#F5E642', padding: '3px 10px', borderRadius: 20, fontSize: 12 }}>{l}</span>)}
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8' }}><strong style={{ color: '#E8EDF5' }}>Cost:</strong> {c.cost}</div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}><strong style={{ color: '#E8EDF5' }}>Best for:</strong> {c.bestFor}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 20px' }}>DFW Sustainable Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
          {features.map(f => (
            <div key={f.title} style={{ background: '#1E2D45', borderRadius: 16, padding: 20, border: '1px solid #2A3F5C', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 32 }}>{f.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: '#E8EDF5', marginBottom: 6 }}>{f.title}</div>
                <p style={{ color: '#94A3B8', fontSize: 13, margin: '0 0 8px' }}>{f.desc}</p>
                <div style={{ color: '#4ADE80', fontSize: 13, fontWeight: 600 }}>💰 {f.savings}/yr savings</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 8px' }}>Green Upgrade Priority Calculator</h2>
        <p style={{ color: '#94A3B8', marginBottom: 20 }}>Enter your green improvement budget and we'll prioritize upgrades by fastest payback.</p>
        <div style={{ background: '#1E2D45', borderRadius: 16, padding: 28, border: '1px solid #2A3F5C', maxWidth: 500 }}>
          <label style={{ color: '#94A3B8', fontSize: 14, display: 'block', marginBottom: 6 }}>Your Budget ($)</label>
          <input type="number" value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. 15000"
            style={{ width: '100%', background: '#0A1628', border: '1px solid #2A3F5C', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 16, marginBottom: 16, boxSizing: 'border-box' }} />
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>
            Show My Green Upgrade Plan
          </button>
        </div>
        {result && (
          <div style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
              <div style={{ background: '#1E2D45', borderRadius: 12, padding: '16px 24px', border: '1px solid #2A3F5C', flex: 1, minWidth: 180 }}>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>Estimated Annual Savings</div>
                <div style={{ color: '#4ADE80', fontSize: 28, fontWeight: 800 }}>${result.totalSavings.toLocaleString()}</div>
              </div>
              <div style={{ background: '#1E2D45', borderRadius: 12, padding: '16px 24px', border: '1px solid #2A3F5C', flex: 1, minWidth: 180 }}>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>Avg Payback Period</div>
                <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 800 }}>{result.avgPayback.toFixed(1)} yrs</div>
              </div>
            </div>
            {result.list.map((u, i) => (
              <div key={u.name} style={{ background: '#1E2D45', borderRadius: 12, padding: '14px 20px', border: '1px solid #2A3F5C', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, marginRight: 10 }}>{i + 1}</span>
                  <span style={{ fontWeight: 600 }}>{u.name}</span>
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: 14 }}>
                  <span style={{ color: '#94A3B8' }}>Cost: <strong style={{ color: '#E8EDF5' }}>${u.cost.toLocaleString()}</strong></span>
                  <span style={{ color: '#4ADE80' }}>+${u.annualSavings}/yr</span>
                  <span style={{ color: '#F5E642' }}>{u.payback} yr payback</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
