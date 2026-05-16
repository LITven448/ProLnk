import { useState } from 'react';

const DOOR_MATERIALS = [
  { id: 'fiberglass', label: 'Fiberglass', rValue: 5.0, costBase: 1200, note: 'Best for DFW — resists sun warping, no painting, dent-resistant' },
  { id: 'steel', label: 'Steel', rValue: 3.5, costBase: 900, note: 'Most affordable, durable — can dent, can rust at bottom in DFW storms' },
  { id: 'wood', label: 'Wood', rValue: 2.0, costBase: 1800, note: 'Premium look — DFW sun/heat causes expansion and finish fading' },
];

const SMART_OPTIONS = [
  { id: 'none', label: 'No Smart Features', cost: 0 },
  { id: 'deadbolt', label: 'Smart Deadbolt Only', cost: 180 },
  { id: 'lock_camera', label: 'Smart Lock + Doorbell Camera', cost: 420 },
  { id: 'full', label: 'Full Smart Package (Lock + Camera + Keypad)', cost: 650 },
];

const STORM_OPTIONS = [
  { id: 'none', label: 'No Storm Door', cost: 0, note: 'Fine for covered porches' },
  { id: 'basic', label: 'Basic Storm Door', cost: 350, note: 'Adds ~R-2 buffer layer' },
  { id: 'retractable', label: 'Retractable Screen Storm Door', cost: 550, note: 'Full ventilation when open' },
];

const EXPOSURES = [
  { id: 'north', label: 'North / East Facing', fadeRisk: 'Low', coatNote: 'Standard exterior finish lasts 7-10 yrs' },
  { id: 'south', label: 'South Facing', fadeRisk: 'High', coatNote: 'UV-resistant finish critical — DFW south exposure is intense' },
  { id: 'west', label: 'West Facing', fadeRisk: 'Very High', coatNote: 'Worst case in DFW — afternoon sun bakes door finish, causes wood to split' },
];

export default function DFWDoorReplacementGuide() {
  const [material, setMaterial] = useState('fiberglass');
  const [smartOption, setSmartOption] = useState('none');
  const [stormOption, setStormOption] = useState('none');
  const [exposure, setExposure] = useState('north');
  const [doorCount, setDoorCount] = useState(1);

  const selectedMaterial = DOOR_MATERIALS.find(d => d.id === material)!;
  const selectedSmart = SMART_OPTIONS.find(s => s.id === smartOption)!;
  const selectedStorm = STORM_OPTIONS.find(s => s.id === stormOption)!;
  const selectedExposure = EXPOSURES.find(e => e.id === exposure)!;

  const laborCost = 350;
  const unitCost = selectedMaterial.costBase + selectedSmart.cost + selectedStorm.cost + laborCost;
  const totalCost = unitCost * doorCount;
  const annualSavings = Math.round((selectedMaterial.rValue / 2.0) * 120 * doorCount);
  const payback = (totalCost / annualSavings).toFixed(1);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF4', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ marginBottom: 8 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 10px', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
            DFW DOOR GUIDE
          </span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>
          🚪 Entry Door Replacement Guide — Dallas–Fort Worth
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 36 }}>
          DFW's intense sun, heat, and occasional severe storms make door material choice critical. The wrong door fades, warps, and leaks within 5 years. Here's how to choose right.
        </p>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16, fontSize: 18 }}>🌞 DFW Sun Exposure Impact by Facing</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {EXPOSURES.map(exp => (
              <div key={exp.id} style={{ background: '#0A1628', borderRadius: 10, padding: 16, border: exposure === exp.id ? '2px solid #F5E642' : '2px solid transparent', cursor: 'pointer' }}
                onClick={() => setExposure(exp.id)}>
                <div style={{ fontWeight: 700, color: '#E8EDF4', marginBottom: 6 }}>{exp.label}</div>
                <div style={{ color: exp.fadeRisk === 'Very High' ? '#EF4444' : exp.fadeRisk === 'High' ? '#F59E0B' : '#22C55E', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>
                  Fade Risk: {exp.fadeRisk}
                </div>
                <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.5 }}>{exp.coatNote}</div>
              </div>
            ))}
          </div>
          {(exposure === 'south' || exposure === 'west') && (
            <div style={{ background: '#2D1B00', border: '1px solid #F59E0B', borderRadius: 8, padding: 14, marginTop: 14, color: '#FCD34D', fontSize: 14 }}>
              ⚠️ {selectedExposure.label} doors in DFW require UV-stabilized finish or painted fiberglass. Budget for re-coating every 3-5 years for wood doors.
            </div>
          )}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16, fontSize: 18 }}>📊 Material Comparison</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ color: '#94A3B8', borderBottom: '1px solid #2D3F57' }}>
                  {['Material', 'R-Value', 'DFW Rating', 'Durability', 'Starting Cost'].map(h => (
                    <th key={h} style={{ textAlign: 'left', paddingBottom: 10, paddingRight: 16 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Fiberglass', '5.0', '⭐⭐⭐⭐⭐', 'Excellent', '$1,200'],
                  ['Steel', '3.5', '⭐⭐⭐⭐', 'Very Good', '$900'],
                  ['Wood', '2.0', '⭐⭐⭐', 'Moderate', '$1,800'],
                ].map(row => (
                  <tr key={row[0]} style={{ borderBottom: '1px solid #16213A' }}>
                    {row.map((cell, i) => (
                      <td key={i} style={{ padding: '10px 16px 10px 0', color: i === 0 ? '#E8EDF4' : '#94A3B8' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#131F33', border: '1.5px solid #F5E642', borderRadius: 14, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 800, fontSize: 20, marginBottom: 24 }}>💰 Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Number of Entry Doors</label>
              <input type="number" min={1} max={6} value={doorCount}
                onChange={e => setDoorCount(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ background: '#1E2D45', border: '1px solid #2D3F57', borderRadius: 8, padding: '10px 14px', color: '#F5E642', fontSize: 18, fontWeight: 700, width: '100%' }} />
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Door Material</label>
              <select value={material} onChange={e => setMaterial(e.target.value)}
                style={{ background: '#1E2D45', border: '1px solid #2D3F57', borderRadius: 8, padding: '10px 14px', color: '#E8EDF4', fontSize: 14, width: '100%' }}>
                {DOOR_MATERIALS.map(d => <option key={d.id} value={d.id}>{d.label} (R-{d.rValue})</option>)}
              </select>
              <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{selectedMaterial.note}</div>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Smart Lock Options</label>
              <select value={smartOption} onChange={e => setSmartOption(e.target.value)}
                style={{ background: '#1E2D45', border: '1px solid #2D3F57', borderRadius: 8, padding: '10px 14px', color: '#E8EDF4', fontSize: 14, width: '100%' }}>
                {SMART_OPTIONS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Storm Door Add-On</label>
              <select value={stormOption} onChange={e => setStormOption(e.target.value)}
                style={{ background: '#1E2D45', border: '1px solid #2D3F57', borderRadius: 8, padding: '10px 14px', color: '#E8EDF4', fontSize: 14, width: '100%' }}>
                {STORM_OPTIONS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
              <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{selectedStorm.note}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { label: 'Total Installed Cost', value: `$${totalCost.toLocaleString()}`, sub: `$${unitCost.toLocaleString()} per door` },
              { label: 'Est. Annual Energy Savings', value: `$${annualSavings.toLocaleString()}`, sub: 'Air sealing + insulation value' },
              { label: 'Simple Payback', value: `${payback} yrs`, sub: 'Before rebates & tax credits' },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 6 }}>{stat.label}</div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 24 }}>{stat.value}</div>
                <div style={{ color: '#64748B', fontSize: 11, marginTop: 4 }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {[
            { icon: '🔒', title: 'Smart Lock Prep', body: 'Pre-wire for smart deadbolt during install. Adding conduit later costs $150–$300. Most fiberglass doors come smart-lock-ready with standard bore holes.' },
            { icon: '🌧️', title: 'Storm Door Decision', body: 'DFW wind-driven rain hits hard. If your entry is exposed (no overhang), a storm door is worthwhile. Covered porches: skip it — it can trap heat against the door.' },
            { icon: '🎨', title: 'Finish Warranty', body: 'Fiberglass: look for 10-year finish warranty. Steel: ask about galvanized bottom rail (rusts in DFW storms). Wood: budget $200–400 every 3-5 years for refinishing.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#1E2D45', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 13, marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.5 }}>{card.body}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
