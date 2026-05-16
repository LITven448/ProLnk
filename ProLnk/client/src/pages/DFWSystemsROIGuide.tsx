import { useState } from 'react';

const systemProjects = [
  { label: 'HVAC Replacement', roiMin: 60, roiMax: 70, negotiationImpact: '$8,000–$15,000 price reduction if deferred', note: 'DFW summers make HVAC a must-have, not a negotiation point' },
  { label: 'Roof Replacement', roiMin: 55, roiMax: 65, negotiationImpact: '$10,000–$20,000 credit demand from buyers', note: 'Insurance ties and hail history make DFW roofs critical inspection items' },
  { label: 'Electrical Panel Upgrade', roiMin: 75, roiMax: 85, negotiationImpact: '$3,000–$7,000 credit if flagged by inspector', note: 'Pre-1990 DFW homes often have undersized panels — major lender flag' },
  { label: 'Water Heater Replacement', roiMin: 25, roiMax: 40, negotiationImpact: '$1,500–$3,000 inspection credit if failing', note: 'Prevents deal-killing inspection failures at low cost' },
];

export default function DFWSystemsROIGuide() {
  const [selectedSystem, setSelectedSystem] = useState('');
  const [cost, setCost] = useState('');
  const [homeAge, setHomeAge] = useState('');
  const [monthsToSell, setMonthsToSell] = useState('');
  const [result, setResult] = useState<{ valueAdded: number; roiPct: number; negotiationImpact: string; urgency: string; note: string } | null>(null);

  function calculate() {
    const sys = systemProjects.find(p => p.label === selectedSystem);
    const investCost = parseFloat(cost);
    if (!sys || isNaN(investCost) || investCost <= 0) return;

    const roiMid = (sys.roiMin + sys.roiMax) / 2 / 100;
    const valueAdded = Math.round(investCost * roiMid);
    const roiPct = Math.round(roiMid * 100);
    const months = parseFloat(monthsToSell);
    const urgency = !isNaN(months) && months <= 3 ? 'HIGH — replace before listing' : months <= 6 ? 'MODERATE — schedule soon' : 'PLAN AHEAD — budget for replacement';

    setResult({ valueAdded, roiPct, negotiationImpact: sys.negotiationImpact, urgency, note: sys.note });
  }

  const urgencyColor = (u: string) => u?.startsWith('HIGH') ? '#ef4444' : u?.startsWith('MODERATE') ? '#f59e0b' : '#22c55e';

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>
          🔧 DFW Market Guide
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          Major Systems ROI Guide
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 40, lineHeight: 1.6 }}>
          Major systems rarely recoup full cost — but ignoring them can cost far more in inspection credits and deal failures.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
          {systemProjects.map(p => (
            <div key={p.label} style={{ background: '#111d33', border: '1px solid #1e3a5f', borderRadius: 12, padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{p.label}</div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{p.roiMin}–{p.roiMax}% ROI</div>
                </div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>{p.note}</div>
              <div style={{ background: '#1e0a0a', border: '1px solid #7f1d1d', borderRadius: 6, padding: '6px 12px', fontSize: 12, color: '#fca5a5' }}>
                ⚠️ If deferred: {p.negotiationImpact}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d33', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#F5E642' }}>
            📊 Calculate Systems ROI
          </h2>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#cbd5e1' }}>System Type</label>
            <select
              value={selectedSystem}
              onChange={e => setSelectedSystem(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15 }}
            >
              <option value="">Select a system...</option>
              {systemProjects.map(p => <option key={p.label}>{p.label}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'Replacement Cost ($)', val: cost, set: setCost, ph: 'e.g. 12000' },
              { label: 'Home Age (years)', val: homeAge, set: setHomeAge, ph: 'e.g. 22' },
              { label: 'Months Until Listing', val: monthsToSell, set: setMonthsToSell, ph: 'e.g. 4' },
            ].map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#cbd5e1' }}>{f.label}</label>
                <input
                  type="number"
                  value={f.val}
                  onChange={e => f.set(e.target.value)}
                  placeholder={f.ph}
                  style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={calculate}
            style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 0', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}
          >
            Analyze This System →
          </button>

          {result && (
            <div style={{ marginTop: 28, background: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #F5E642' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 24 }}>${result.valueAdded.toLocaleString()}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>Direct Value Added</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 24 }}>{result.roiPct}%</div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>Direct ROI</div>
                </div>
              </div>
              <div style={{ background: '#111d33', borderRadius: 8, padding: 14, marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>URGENCY LEVEL</div>
                <div style={{ fontWeight: 800, color: urgencyColor(result.urgency) }}>{result.urgency}</div>
              </div>
              <div style={{ color: '#fca5a5', fontSize: 13, background: '#1e0a0a', borderRadius: 8, padding: 12, marginBottom: 12 }}>
                ⚠️ If deferred: {result.negotiationImpact}
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>💡 {result.note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
