import { useState } from 'react';

const DFW_CITIES = ['Dallas', 'Fort Worth', 'Plano', 'Frisco', 'McKinney', 'Arlington', 'Irving', 'Garland', 'Denton', 'Lewisville'];
const BILL_RANGES = ['Under $150', '$150-250', '$250-400', '$400-600', 'Over $600'];
const MONTHS_IN_HOME = ['Under 6 months', '6-12 months', '1-3 years', '3+ years'];

const causes: Record<string, { likelihood: string; actions: string[]; savings: string }> = {
  'Under $150': { likelihood: 'Normal for DFW — no action needed', actions: ['Review your rate plan annually', 'Set a usage alert at $175'], savings: 'Minimal opportunity' },
  '$150-250': { likelihood: 'Slightly elevated — check HVAC filter', actions: ['Replace HVAC filter if 90+ days old', 'Set thermostat to 78°F when away', 'Check for phantom loads on devices'], savings: '$15-40/month possible' },
  '$250-400': { likelihood: 'High — HVAC efficiency issue likely', actions: ['Schedule HVAC tune-up ($80-150)', 'Check duct leakage (common in DFW attics)', 'Audit insulation in attic', 'Compare your plan rate vs market'], savings: '$40-100/month possible' },
  '$400-600': { likelihood: 'Very high — multiple issues or wrong plan', actions: ['Get HVAC inspection immediately', 'Audit duct system for leaks', 'Switch to TDU pass-through plan if on fixed rate', 'Check for old single-pane windows', 'Inspect attic insulation — should be R-38 in DFW'], savings: '$80-200/month possible' },
  'Over $600': { likelihood: 'Critical — likely equipment failure + wrong plan', actions: ['HVAC inspection — likely needs repair or replacement', 'Energy audit from oncor (free)', 'Switch energy plan immediately on PowerToChoose.org', 'Check for pool pump or EV charger running peak hours', 'Consider smart thermostat (Nest/Ecobee) — saves 10-15%'], savings: '$150-350/month possible' },
};

export default function DFWElectricBillShockGuide() {
  const [city, setCity] = useState('Dallas');
  const [billRange, setBillRange] = useState('$250-400');
  const [months, setMonths] = useState('1-3 years');
  const rec = causes[billRange];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          ⚡ DFW Electric Bill Shock Guide
        </div>
        <p style={{ color: '#94A3B8', marginBottom: '1.5rem' }}>
          DFW's deregulated electricity market means you could be on the wrong plan. Combined with extreme summer heat, bills can spike 3-4x in July-August. Here's how to diagnose and fix high bills.
        </p>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '1.2rem', marginBottom: '1.2rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.8rem' }}>🏛️ DFW Deregulated Market — What You Need to Know</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.8rem' }}>
            {[
              { label: 'Choose Your Provider', desc: 'You pick your electricity retailer — over 60 options on PowerToChoose.org' },
              { label: 'Fixed vs Variable', desc: 'Fixed rate locks in price; variable follows market and can spike in summer' },
              { label: 'TDU Charges', desc: 'Oncor delivery fee is ~$30/month regardless of provider — non-negotiable' },
              { label: 'Switch Anytime', desc: 'No penalty to switch providers mid-contract — compare rates now' },
            ].map(item => (
              <div key={item.label} style={{ background: '#0A1628', borderRadius: 8, padding: '0.8rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.9rem' }}>{item.label}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: '0.3rem' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '1.2rem', marginBottom: '1.2rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '1rem' }}>🔍 Bill Shock Diagnosis Tool</div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>DFW City</div>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #2D4060', borderRadius: 6, padding: '0.5rem' }}>
                {DFW_CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Monthly Bill Amount</div>
              <select value={billRange} onChange={e => setBillRange(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #2D4060', borderRadius: 6, padding: '0.5rem' }}>
                {BILL_RANGES.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Time in Home</div>
              <select value={months} onChange={e => setMonths(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #2D4060', borderRadius: 6, padding: '0.5rem' }}>
                {MONTHS_IN_HOME.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>
          {rec && (
            <div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: '0.8rem' }}>
                <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>Diagnosis for {city}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginTop: '0.3rem' }}>{rec.likelihood}</div>
                <div style={{ color: '#22C55E', marginTop: '0.5rem', fontWeight: 600 }}>Potential savings: {rec.savings}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>✅ Action Plan</div>
                {rec.actions.map((a, i) => (
                  <div key={i} style={{ color: '#E8EDF5', fontSize: '0.9rem', padding: '0.3rem 0', borderBottom: '1px solid #1E2D45' }}>
                    {i + 1}. {a}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{ color: '#64748B', fontSize: '0.8rem', textAlign: 'center' }}>
          ProLnk connects DFW homeowners with vetted HVAC and energy efficiency professionals.
        </div>
      </div>
    </div>
  );
}
