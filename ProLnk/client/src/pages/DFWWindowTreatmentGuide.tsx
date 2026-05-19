import { useState } from 'react';

const TREATMENT_TYPES = [
  { id: 'solar_shade', label: 'Solar Shades', heatRejection: 80, costPerWindow: 180, note: 'Best DFW choice — blocks 40–90% of solar heat while maintaining view' },
  { id: 'cellular', label: 'Cellular / Honeycomb Shades', heatRejection: 55, costPerWindow: 145, note: 'Double-cell for DFW — excellent insulation top and bottom of window' },
  { id: 'plantation', label: 'Plantation Shutters', heatRejection: 45, costPerWindow: 320, note: 'DFW favorite — adjustable, durable, adds resale value' },
  { id: 'blackout', label: 'Blackout Curtains', heatRejection: 70, costPerWindow: 85, note: 'Best for west-facing bedrooms — blocks afternoon DFW sun completely' },
  { id: 'motorized', label: 'Motorized Solar Shades', heatRejection: 82, costPerWindow: 380, note: 'Smart home integration — auto-adjust to sun position throughout the day' },
];

const ORIENTATIONS = [
  { id: 'north', label: 'North Facing', heatMultiplier: 0.3, note: 'Minimal solar heat gain — any treatment works well' },
  { id: 'east', label: 'East Facing', heatMultiplier: 0.6, note: 'Morning sun only — solar shades or light filtering adequate' },
  { id: 'south', label: 'South Facing', heatMultiplier: 0.8, note: 'Year-round sun — Low-E glass + solar shades recommended' },
  { id: 'west', label: 'West Facing', heatMultiplier: 1.0, note: 'Worst in DFW — intense afternoon sun requires maximum heat rejection' },
];

export default function DFWWindowTreatmentGuide() {
  const [treatmentType, setTreatmentType] = useState('solar_shade');
  const [orientation, setOrientation] = useState('west');
  const [windowCount, setWindowCount] = useState(8);
  const [motorized, setMotorized] = useState(false);

  const selectedTreatment = TREATMENT_TYPES.find(t => t.id === treatmentType)!;
  const selectedOrientation = ORIENTATIONS.find(o => o.id === orientation)!;

  const baseCostPerWindow = motorized && treatmentType !== 'motorized'
    ? selectedTreatment.costPerWindow + 200
    : selectedTreatment.costPerWindow;
  const totalCost = Math.round(baseCostPerWindow * windowCount);
  const effectiveHeatRejection = Math.round(selectedTreatment.heatRejection * selectedOrientation.heatMultiplier);
  const annualSavings = Math.round(effectiveHeatRejection * 1.8 * windowCount * 0.6);
  const payback = annualSavings > 0 ? (totalCost / annualSavings).toFixed(1) : 'N/A';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF4', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ marginBottom: 8 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 10px', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
            DFW WINDOW TREATMENT GUIDE
          </span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>
          🪟 Window Treatments for DFW Energy Efficiency
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 36 }}>
          Window treatments are the fastest ROI upgrade for DFW homes. The right shades on west-facing windows can cut afternoon cooling loads by 25–40% — often paying back in 2–3 cooling seasons.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 28 }}>
          {ORIENTATIONS.map(o => (
            <div key={o.id}
              onClick={() => setOrientation(o.id)}
              style={{ background: orientation === o.id ? '#1A2A45′ : '#1E2D45', border: `2px solid ${orientation === o.id ? '#F5E642' : '#2D3F57'}`, borderRadius: 10, padding: 16, cursor: ’pointer' }}>
              <div style={{ fontWeight: 700, color: '#E8EDF4', fontSize: 14, marginBottom: 6 }}>{o.label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ height: 8, background: '#1E2D45', borderRadius: 4, flex: 1 }}>
                  <div style={{ height: 8, background: o.heatMultiplier >= 0.9 ? '#EF4444′ : o.heatMultiplier >= 0.7 ? '#F59E0B' : '#22C55E', borderRadius: 4, width: `${o.heatMultiplier * 100}%` }} />
                </div>
                <span style={{ color: '#94A3B8', fontSize: 11 }}>{Math.round(o.heatMultiplier * 100)}%</span>
              </div>
              <div style={{ color: '#64748B', fontSize: 12, lineHeight: 1.4 }}>{o.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16, fontSize: 18 }}>📊 Treatment Type Comparison</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ color: '#94A3B8', borderBottom: '1px solid #2D3F57′ }}>
                  {['Type', 'Heat Rejection', 'View', 'Maintenance', 'Cost / Window'].map(h => (
                    <th key={h} style={{ textAlign: 'left', paddingBottom: 10, paddingRight: 16 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Solar Shades', '40–90%', '⭐⭐⭐⭐', 'Wipe clean', '$150–250'],
                  ['Cellular Shades', '40–60%', '⭐⭐⭐', 'Dust regularly', '$120–180'],
                  ['Plantation Shutters', '35–50%', '⭐⭐⭐⭐⭐', 'Wipe/paint every 10yr', '$250–450'],
                  ['Blackout Curtains', '60–75%', '⭐ (when closed)', 'Machine wash', '$60–120'],
                  ['Motorized Solar', '50–85%', '⭐⭐⭐⭐', 'Annual motor check', '$320–500'],
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
          <h2 style={{ color: '#F5E642', fontWeight: 800, fontSize: 20, marginBottom: 24 }}>💰 Energy Savings Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Number of Windows</label>
              <input type="number" min={1} max={40} value={windowCount}
                onChange={e => setWindowCount(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ background: '#1E2D45', border: '1px solid #2D3F57', borderRadius: 8, padding: '10px 14px', color: '#F5E642', fontSize: 18, fontWeight: 700, width: '100%' }} />
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Treatment Type</label>
              <select value={treatmentType} onChange={e => setTreatmentType(e.target.value)}
                style={{ background: '#1E2D45', border: '1px solid #2D3F57', borderRadius: 8, padding: '10px 14px', color: '#E8EDF4', fontSize: 14, width: '100%' }}>
                {TREATMENT_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
              <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{selectedTreatment.note}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 24 }}>
              <input type="checkbox" id="motorized" checked={motorized} onChange={e => setMotorized(e.target.checked)}
                style={{ width: 18, height: 18, cursor: 'pointer' }} />
              <label htmlFor="motorized" style={{ color: '#E8EDF4', fontSize: 14, cursor: 'pointer' }}>
                Add motorization (+$200/window)
              </label>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { label: 'Total Cost', value: `$${totalCost.toLocaleString()}` },
              { label: 'Per Window', value: `$${baseCostPerWindow}` },
              { label: 'Est. Heat Reduction', value: `${effectiveHeatRejection}%` },
              { label: 'Annual Savings', value: `$${annualSavings}` },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ color: '#94A3B8', fontSize: 11, marginBottom: 6 }}>{stat.label}</div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 22 }}>{stat.value}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', color: '#64748B', fontSize: 13, marginTop: 12 }}>
            Simple payback: <span style={{ color: '#F5E642', fontWeight: 700 }}>{payback} years</span> · Based on DFW avg cooling costs
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 14, fontSize: 16 }}>🏠 DFW-Specific Tips by Room</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { room: 'West Bedrooms', rec: 'Blackout + solar shade layered. Both closed by 2pm stops heat before it builds.' },
              { room: 'Kitchen / South', rec: 'Cellular shade — pull down during cooking. Slat controls light without full blackout.' },
              { room: 'Living Room', rec: 'Plantation shutters — adjust louvers for view + light control without full shade.' },
              { room: 'Home Office', rec: 'Motorized solar shade — scheduled close at noon, reopen at sunset automatically.' },
            ].map(item => (
              <div key={item.room} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{item.room}</div>
                <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.5 }}>{item.rec}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
