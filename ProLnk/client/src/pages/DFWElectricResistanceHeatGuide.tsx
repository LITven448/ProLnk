import { useState } from 'react';

export default function DFWElectricResistanceHeatGuide() {
  const [heatingType, setHeatingType] = useState('');
  const [sqft, setSqft] = useState('');
  const [result, setResult] = useState<null | { annualCost: number; heatPumpCost: number; savings: number; payback: string; recommendation: string }>(null);

  function calculate() {
    const s = parseInt(sqft, 10);
    if (!s || !heatingType) return;

    const ratePerKwh = 0.13;
    const heatingMonths = 3.5;
    const hoursPerMonth = 300;

    let kw = 0;
    if (heatingType === 'baseboard') kw = s * 0.010;
    else if (heatingType === 'electric-furnace') kw = s * 0.012;
    else kw = s * 0.009;

    const annualCost = Math.round(kw * hoursPerMonth * heatingMonths * ratePerKwh);
    const heatPumpCost = Math.round(annualCost / 3.2);
    const savings = annualCost - heatPumpCost;
    const installCost = heatingType === 'baseboard' ? 8000 : 6000;
    const paybackYears = savings > 0 ? (installCost / savings).toFixed(1) : 'N/A';
    const payback = `~${paybackYears} years (with $${installCost.toLocaleString()} install)`;

    let recommendation = '';
    if (savings > 400) recommendation = `Strong case for heat pump conversion. You'd save $${savings}/year on heating alone — and gain efficient AC for DFW summers.`;
    else if (savings > 150) recommendation = `Moderate savings. Heat pump conversion makes sense if your current AC also needs replacement — bundle both for best ROI.`;
    else recommendation = `Small home with low usage. Electric resistance may be adequate for your DFW usage, but a mini-split adds summer cooling value.`;

    setResult({ annualCost, heatPumpCost, savings, payback, recommendation });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.5rem' }}>⚡ DFW Electric Resistance Heat Guide</div>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>Some older DFW homes use baseboard heating or electric furnaces. In a climate where heat pumps are highly efficient, electric resistance is often an expensive holdover.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>💡 Why Electric Resistance Is Costly in DFW</div>
          <ul style={{ color: '#ccc', lineHeight: 1.8, paddingLeft: '1.2rem' }}>
            <li>Electric resistance converts 1 kWh of electricity → 1 unit of heat (100% efficient)</li>
            <li>Heat pumps move heat — converting 1 kWh → 3–4 units of heat (<strong style={{ color: '#F5E642' }}>300–400% efficient</strong>)</li>
            <li>DFW mild winters are ideal for heat pumps — they work best above 25°F</li>
            <li>Electric resistance heating costs 3x more per BTU than a modern heat pump in DFW</li>
            <li>Baseboard heaters and electric furnaces found in 1960s–80s DFW construction</li>
          </ul>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🔄 Conversion Options for DFW</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              ['Mini-Split Heat Pump', 'Best for homes without ductwork. Handles both heating and DFW summer cooling. $3,000–$6,000 per zone.'],
              ['Central Heat Pump', 'Replace electric furnace with heat pump air handler. Reuses existing ducts. $6,000–$10,000 installed.'],
              ['Dual-Fuel System', 'Heat pump + gas backup. Handles rare DFW deep freezes when temps drop below 25°F. Premium option.'],
              ['Attic Insulation First', 'Before converting, improve insulation. Reduces heating load and improves any system ROI.'],
            ].map(([option, detail]) => (
              <div key={option} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600 }}>✅ {option}</div>
                <div style={{ color: '#aaa', fontSize: '0.9rem', marginTop: 4 }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🧮 Heat Pump Conversion ROI Calculator</div>
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.9rem' }}>Home Size (sq ft)</label>
              <input type="number" value={sqft} onChange={e => setSqft(e.target.value)} placeholder="e.g. 1800"
                style={{ width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 6, border: '1px solid #334', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.9rem' }}>Current Heating Type</label>
              <select value={heatingType} onChange={e => setHeatingType(e.target.value)}
                style={{ width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 6, border: '1px solid #334', background: '#0A1628', color: '#fff' }}>
                <option value="">Select heating type</option>
                <option value="baseboard">Electric Baseboard</option>
                <option value="electric-furnace">Electric Furnace (Forced Air)</option>
                <option value="wall-heater">Electric Wall Heaters</option>
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Calculate Conversion ROI
          </button>
          {result && (
            <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🎯 Your ROI Analysis</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ background: '#1a2a4a', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ color: '#aaa', fontSize: '0.8rem' }}>Current Annual Heating Cost</div>
                  <div style={{ color: '#f87', fontSize: '1.4rem', fontWeight: 700 }}>${result.annualCost}</div>
                </div>
                <div style={{ background: '#1a2a4a', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ color: '#aaa', fontSize: '0.8rem' }}>With Heat Pump</div>
                  <div style={{ color: '#4f4', fontSize: '1.4rem', fontWeight: 700 }}>${result.heatPumpCost}</div>
                </div>
                <div style={{ background: '#1a2a4a', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ color: '#aaa', fontSize: '0.8rem' }}>Annual Savings</div>
                  <div style={{ color: '#F5E642', fontSize: '1.4rem', fontWeight: 700 }}>${result.savings}</div>
                </div>
                <div style={{ background: '#1a2a4a', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ color: '#aaa', fontSize: '0.8rem' }}>Payback Period</div>
                  <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 700 }}>{result.payback}</div>
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
