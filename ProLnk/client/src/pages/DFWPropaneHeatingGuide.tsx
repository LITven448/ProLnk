import { useState } from 'react';

export default function DFWPropaneHeatingGuide() {
  const [gallonsPerYear, setGallonsPerYear] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<null | { tankSize: string; annualCostPropane: number; annualCostGas: number; recommendation: string }>(null);

  function calculate() {
    const gal = parseInt(gallonsPerYear, 10);
    if (!gal || !location) return;

    const propanePricePerGallon = 2.85;
    const annualCostPropane = Math.round(gal * propanePricePerGallon);

    const btuPerGallon = 91500;
    const totalBtu = gal * btuPerGallon;
    const gasTherms = totalBtu / 100000;
    const annualCostGas = Math.round(gasTherms * 1.35);

    let tankSize = '';
    if (gal <= 300) tankSize = '250-gallon tank (fill 1–2x per year, ideal for light users)';
    else if (gal <= 600) tankSize = '500-gallon tank (fill 1–2x per year, standard for DFW outer areas)';
    else tankSize = '1,000-gallon tank (annual fill, best for heavy users or budget fill scheduling)';

    let recommendation = '';
    const savings = annualCostPropane - annualCostGas;
    if (location === 'gas-available') {
      recommendation = `Atmos natural gas is available in your area. Converting to gas could save ~$${savings}/year. Get a conversion quote — it typically pays back in 2–4 years.`;
    } else if (location === 'outer-dfw') {
      recommendation = `Propane is your best option in outer DFW without gas service. Lock in summer fill pricing (June–Aug) to avoid winter price spikes. Consider a 500-gallon or larger tank for price stability.`;
    } else {
      recommendation = `Rural DFW propane users have limited alternatives. Monitor Ferrellgas and AmeriGas for competitive pricing. A generator and propane combo is a smart backup for ice storm events.`;
    }

    setResult({ tankSize, annualCostPropane, annualCostGas, recommendation });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.5rem' }}>🔵 DFW Propane Heating Guide</div>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>Outer DFW areas — Weatherford, Granbury, Cleburne, Kaufman — often lack Atmos natural gas. Propane fills the gap. Here's what you need to know.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📦 Propane Basics for DFW Homeowners</div>
          <ul style={{ color: '#ccc', lineHeight: 1.8, paddingLeft: '1.2rem' }}>
            <li>Propane delivers <strong style={{ color: '#F5E642′ }}>91,500 BTU per gallon</strong> vs natural gas at ~100,000 BTU per therm</li>
            <li>Propane is ~30–50% more expensive than Atmos gas per BTU in DFW</li>
            <li>DFW propane prices spike in winter — lock in summer fill rates (June–August)</li>
            <li>Tank ownership vs rental: owned tanks allow switching suppliers; rented tanks lock you to one provider</li>
            <li>Major DFW propane suppliers: Ferrellgas, AmeriGas, Blue Flame Gas, local co-ops</li>
          </ul>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>⚠️ DFW Propane Safety & Delivery Tips</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              ['Winter Delivery Scheduling', 'DFW roads ice over in winter events. Pre-schedule October delivery to avoid delays during cold fronts.'],
              ['Tank Level Monitoring', 'Keep tank above 20% at all times. Running out in winter means waiting for emergency delivery at premium rates.'],
              ['Price Cap Programs', 'Some DFW suppliers offer budget billing or price cap plans — useful for fixed-income households.'],
              ['Feb 2021 Lesson', 'Propane delivery stopped for days during the 2021 ice storm. A full tank going into winter is critical.'],
            ].map(([tip, detail]) => (
              <div key={tip} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600 }}>💡 {tip}</div>
                <div style={{ color: '#aaa', fontSize: '0.9rem', marginTop: 4 }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🧮 Propane Cost & Tank Size Calculator</div>
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.9rem' }}>Estimated Annual Propane Usage (gallons)</label>
              <input type="number" value={gallonsPerYear} onChange={e => setGallonsPerYear(e.target.value)} placeholder="e.g. 400″
                style={{ width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 6, border: '1px solid #334', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.9rem' }}>Your DFW Location / Gas Access</label>
              <select value={location} onChange={e => setLocation(e.target.value)}
                style={{ width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 6, border: '1px solid #334', background: '#0A1628', color: '#fff' }}>
                <option value="">Select location type</option>
                <option value="gas-available">Atmos natural gas available in my area</option>
                <option value="outer-dfw">Outer DFW suburb — no gas service</option>
                <option value="rural">Rural DFW — far from gas lines</option>
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Get My Propane Analysis
          </button>
          {result && (
            <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🎯 Your Results</div>
              <div style={{ color: '#fff', marginBottom: 4 }}>📦 <strong>Tank Size:</strong> {result.tankSize}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', margin: '0.75rem 0′ }}>
                <div style={{ background: '#1a2a4a', borderRadius: 6, padding: '0.6rem', textAlign: 'center' }}>
                  <div style={{ color: '#aaa', fontSize: '0.8rem' }}>Annual Propane Cost</div>
                  <div style={{ color: '#f87', fontSize: '1.3rem', fontWeight: 700 }}>${result.annualCostPropane}</div>
                </div>
                <div style={{ background: '#1a2a4a', borderRadius: 6, padding: '0.6rem', textAlign: 'center' }}>
                  <div style={{ color: '#aaa', fontSize: '0.8rem' }}>Equivalent Gas Cost</div>
                  <div style={{ color: '#4f4', fontSize: '1.3rem', fontWeight: 700 }}>${result.annualCostGas}</div>
                </div>
              </div>
              <div style={{ color: '#aaa', fontSize: '0.9rem' }}>{result.recommendation}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
