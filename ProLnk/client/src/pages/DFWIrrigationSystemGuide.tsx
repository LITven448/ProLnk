import { useState } from 'react';

const systemTypes = [
  { type: 'Drip Irrigation', efficiency: '90%', bestFor: 'Beds, shrubs, trees', cost: '$500–2,000', waterSavings: '30–50% vs spray', icon: '💧' },
  { type: 'Spray Heads', efficiency: '65–75%', bestFor: 'Lawn areas', cost: '$1,500–4,000', waterSavings: 'Baseline', icon: '🌧️' },
  { type: 'Rotary Nozzles', efficiency: '80–85%', bestFor: 'Large turf areas', cost: '$1,800–4,500', waterSavings: '15–30% vs spray', icon: '🔄' },
  { type: 'Smart Controller', efficiency: 'Varies', bestFor: 'Any system upgrade', cost: '$150–500', waterSavings: '15–30% additional', icon: '🧠' },
];

const repairCosts = [
  { repair: 'Broken sprinkler head', cost: '$5–15 DIY / $50–100 pro', urgency: 'Moderate' },
  { repair: 'Valve replacement', cost: '$75–200', urgency: 'High' },
  { repair: 'Leak in main line', cost: '$150–500', urgency: 'Critical' },
  { repair: 'Controller replacement', cost: '$100–400', urgency: 'Low' },
  { repair: 'Winterization (blowout)', cost: '$75–150', urgency: 'Seasonal' },
  { repair: 'Backflow preventer repair', cost: '$75–250', urgency: 'Code required' },
  { repair: 'Zone not working', cost: '$100–300', urgency: 'High' },
  { repair: 'Full water audit', cost: '$150–400', urgency: 'Preventive' },
];

const winterizationSteps = [
  { step: 'Schedule blowout by Oct 15', detail: 'DFW hard freezes typically Nov–Feb' },
  { step: 'Turn off backflow preventer', detail: 'Locate shutoff — usually in a box in yard' },
  { step: 'Compressed air blowout', detail: 'Removes water from all zones — must use pro with correct CFM' },
  { step: 'Insulate exposed pipes', detail: 'Backflow preventer and above-ground lines' },
  { step: 'Enable controller seasonal mode', detail: 'Smart controllers auto-adjust to freeze warnings' },
];

const smartUpgradeFeatures = [
  { feature: 'Weather-based watering', benefit: 'Skips irrigation after rain' },
  { feature: 'ET adjustment', benefit: 'Waters based on evapotranspiration data' },
  { feature: 'Soil moisture sensors', benefit: 'Prevents overwatering saturated ground' },
  { feature: 'Remote app control', benefit: 'Adjust from anywhere, get alerts' },
  { feature: 'Leak detection', benefit: 'Alerts for zone over-usage' },
];

export default function DFWIrrigationSystemGuide() {
  const [yardSqft, setYardSqft] = useState(3000);
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [minutesPerZone, setMinutesPerZone] = useState(20);
  const [zones, setZones] = useState(6);

  const gallonsPerMinutePerZone = 1.5;
  const weeklyGallons = daysPerWeek * zones * minutesPerZone * gallonsPerMinutePerZone;
  const annualGallons = weeklyGallons * 26;
  const waterRate = 0.006;
  const annualCost = annualGallons * waterRate;
  const smartSavingsPct = 0.25;
  const annualSavings = annualCost * smartSavingsPct;

  const wastePct = Math.max(0, ((daysPerWeek - 2) / daysPerWeek) * 40);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>💦</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>
            DFW Sprinkler & Irrigation Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 620, margin: '0 auto' }}>
            Types, smart upgrades, winterization, repair costs, and water audit guidance for North Texas homeowners
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {systemTypes.map((s, i) => (
            <div key={i} style={{ background: '#1E2D45', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.type}</h3>
              <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>
                <span style={{ color: '#4ADE80′ }}>Efficiency:</span> {s.efficiency}
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>
                <span style={{ color: '#60A5FA' }}>Best for:</span> {s.bestFor}
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>
                <span style={{ color: '#F5E642′ }}>Cost:</span> {s.cost}
              </div>
              <div style={{ fontSize: 12, color: '#4ADE80', marginTop: 8, padding: '4px 8px', background: '#0A1628', borderRadius: 6 }}>
                💧 Saves: {s.waterSavings}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 20 }}>🧠 Smart Controller Upgrade Benefits</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
            {smartUpgradeFeatures.map((f, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 14, display: 'flex', gap: 12 }}>
                <span style={{ color: '#F5E642', fontSize: 18, flexShrink: 0 }}>✓</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#E8EDF5', marginBottom: 4 }}>{f.feature}</div>
                  <div style={{ fontSize: 13, color: '#64748B' }}>{f.benefit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32, borderLeft: '4px solid #F87171′ }}>
          <h2 style={{ color: '#F87171', marginBottom: 16, fontSize: 20 }}>❄️ Winterization — Critical for DFW</h2>
          <p style={{ color: '#CBD5E1', marginBottom: 16, lineHeight: 1.7 }}>
            DFW's winter freezes (especially February ice storms like Winter Storm Uri) can burst irrigation lines 
            that still hold water. A $100 blowout service prevents $500–5,000+ in repairs.
          </p>
          <div style={{ display: 'grid', gap: 10 }}>
            {winterizationSteps.map((s, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 14, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ background: '#F87171', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#E8EDF5′ }}>{s.step}</div>
                  <div style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 20 }}>🔧 Common Irrigation Repair Costs</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 14px', color: '#94A3B8', borderBottom: '2px solid #0A1628′ }}>Repair Type</th>
                  <th style={{ textAlign: 'right', padding: '10px 14px', color: '#F5E642', borderBottom: '2px solid #0A1628′ }}>Cost Estimate</th>
                  <th style={{ textAlign: 'right', padding: '10px 14px', color: '#94A3B8', borderBottom: '2px solid #0A1628′ }}>Urgency</th>
                </tr>
              </thead>
              <tbody>
                {repairCosts.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #0A1628′ }}>
                    <td style={{ padding: '10px 14px', color: '#CBD5E1′ }}>{r.repair}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#4ADE80', fontWeight: 600 }}>{r.cost}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                      <span style={{ background: r.urgency === 'Critical' ? '#7F1D1D' : r.urgency === 'High' ? '#7C2D12′ : '#1E2D45', color: r.urgency === ’Critical' ? '#FCA5A5′ : r.urgency === ’High' ? '#FDBA74′ : '#94A3B8', padding: '3px 10px', borderRadius: 20, fontSize: 12 }}>
                        {r.urgency}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 20 }}>💡 Water Waste & Savings Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, marginBottom: 24 }}>
            {[
              { label: 'Zones', value: zones, setter: setZones, min: 2, max: 16, step: 1 },
              { label: 'Days/Week', value: daysPerWeek, setter: setDaysPerWeek, min: 1, max: 7, step: 1 },
              { label: 'Min/Zone', value: minutesPerZone, setter: setMinutesPerZone, min: 5, max: 60, step: 5 },
            ].map((ctrl, i) => (
              <div key={i}>
                <label style={{ display: 'block', color: '#94A3B8', marginBottom: 8, fontSize: 14 }}>{ctrl.label}: <strong style={{ color: '#F5E642′ }}>{ctrl.value}</strong></label>
                <input type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step} value={ctrl.value}
                  onChange={e => ctrl.setter(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#F5E642′ }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
            {[
              { label: 'Weekly Usage', value: weeklyGallons.toLocaleString(undefined, { maximumFractionDigits: 0 }), unit: 'gallons/wk', color: '#60A5FA' },
              { label: 'Annual Cost', value: `$${annualCost.toFixed(0)}`, unit: 'per year', color: '#F87171′ },
              { label: 'Smart Upgrade Saves', value: `$${annualSavings.toFixed(0)}`, unit: '25% reduction', color: '#4ADE80′ },
            ].map((stat, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{stat.unit}</div>
                <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Schedule a DFW Irrigation Inspection</h3>
          <p style={{ color: '#1E3A5F', marginBottom: 16 }}>Licensed irrigation contractors — water audit, winterization, repairs</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', padding: '14px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Get Free Estimates →
          </button>
        </div>
      </div>
    </div>
  );
}
