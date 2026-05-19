import { useState } from 'react';

const applianceData: Record<string, { savings: number; taxCredit: number; lookFor: string[] }> = {
  'Central AC': {
    savings: 420,
    taxCredit: 600,
    lookFor: ['SEER2 rating ≥ 16', 'Two-stage or variable-speed compressor', 'EER2 ≥ 12'],
  },
  'Heat Pump': {
    savings: 580,
    taxCredit: 2000,
    lookFor: ['HSPF2 ≥ 7.8', 'SEER2 ≥ 16', 'Variable-speed inverter drive'],
  },
  'Water Heater (Heat Pump)': {
    savings: 370,
    taxCredit: 2000,
    lookFor: ['UEF ≥ 2.0', 'First Hour Rating ≥ 60 gal', '50-65 gallon tank ideal for DFW'],
  },
  'Refrigerator': {
    savings: 90,
    taxCredit: 0,
    lookFor: ['At least 15% below federal standard', 'Top or bottom freezer (most efficient)', 'No ice dispenser for max efficiency'],
  },
  'Dishwasher': {
    savings: 55,
    taxCredit: 0,
    lookFor: ['≤ 3.5 gallons per cycle', 'Soil sensor', 'Dry boost/heated dry option'],
  },
  'Washer/Dryer': {
    savings: 110,
    taxCredit: 500,
    lookFor: ['Modified Energy Factor (MEF) ≥ 2.4', 'Front-load preferred', 'Steam cycle for DFW dust/allergies'],
  },
  'Smart Thermostat': {
    savings: 180,
    taxCredit: 150,
    lookFor: ['Demand response capable (Oncor Smart Hours)', 'Geo-fencing', 'Learning algorithms'],
  },
};

export default function DFWEnergyStarAppliances() {
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState<null | typeof applianceData[string]>(null);

  function calculate() {
    if (selected && applianceData[selected]) {
      setResult(applianceData[selected]);
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡ ENERGY STAR Appliances — DFW 2026</div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          DFW's high-usage climate — triple-digit summers and peak AC loads — makes ENERGY STAR upgrades pay off faster here than almost anywhere in the US.
          Federal tax credits under the Inflation Reduction Act (IRA) stack on top of energy savings.
        </p>

        <div style={{ background: '#132140', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 DFW Savings Estimator</div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8′ }}>Select appliance type</label>
          <select
            value={selected}
            onChange={e => { setSelected(e.target.value); setResult(null); }}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', marginBottom: '1rem', fontSize: '1rem' }}
          >
            <option value="">-- Choose appliance --</option>
            {Object.keys(applianceData).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
          <button
            onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
          >
            Calculate DFW Savings
          </button>

          {result && (
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700 }}>${result.savings}/yr</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Est. DFW energy savings</div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                  <div style={{ color: '#4ade80', fontSize: '1.8rem', fontWeight: 700 }}>
                    {result.taxCredit > 0 ? `$${result.taxCredit.toLocaleString()}` : 'None'}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Federal IRA tax credit</div>
                </div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>✅ What to look for</div>
                {result.lookFor.map((item, i) => (
                  <div key={i} style={{ color: '#cbd5e1', padding: '0.25rem 0', borderBottom: i < result.lookFor.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
                    • {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#132140', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📋 DFW Climate Context</div>
          {[
            ['🌡️', 'Summer peak load', 'DFW runs AC 6+ months; HVAC upgrades return 2–3× national average savings'],
            ['💧', 'Water heating', 'Hard water and high hot water use make heat pump water heaters ideal in DFW'],
            ['🏛️', 'IRA deadlines', 'Claim tax credits on your 2026 return; credits reset each calendar year'],
            ['🔌', 'Oncor rebates', 'Stack Oncor Smart Hours rebates on top of IRA credits for maximum return'],
          ].map(([icon, label, desc]) => (
            <div key={label} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ fontSize: '1.4rem' }}>{icon}</span>
              <div>
                <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>{label}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
