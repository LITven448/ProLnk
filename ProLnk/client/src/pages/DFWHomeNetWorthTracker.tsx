import { useState } from 'react';

const submarketRates: Record<string, number> = {
  'Frisco / Prosper': 0.072,
  'Southlake / Keller': 0.065,
  'McKinney / Allen': 0.068,
  'Plano': 0.055,
  'North Dallas': 0.058,
  'Fort Worth': 0.062,
  'Arlington': 0.045,
  'Irving / Las Colinas': 0.052,
  'Garland / Mesquite': 0.041,
  'Grand Prairie': 0.043,
};

export default function DFWHomeNetWorthTracker() {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [yearsOwned, setYearsOwned] = useState('');
  const [mortgageBalance, setMortgageBalance] = useState('');
  const [improvements, setImprovements] = useState('');
  const [submarket, setSubmarket] = useState('');

  const pp = parseFloat(purchasePrice) || 0;
  const years = parseFloat(yearsOwned) || 0;
  const mortgage = parseFloat(mortgageBalance) || 0;
  const impr = parseFloat(improvements) || 0;
  const rate = submarket ? submarketRates[submarket] : 0.055;

  const currentValue = pp > 0 ? pp * Math.pow(1 + rate, years) : 0;
  const equity = currentValue - mortgage;
  const equityReturn = pp > 0 ? ((equity - (pp - mortgage - impr)) / (pp - mortgage - impr)) * 100 : 0;
  const fiveYearValue = currentValue * Math.pow(1 + rate, 5);
  const fiveYearEquity = fiveYearValue - (mortgage * 0.82);
  const equityGain = fiveYearEquity - equity;

  const downPayment = pp - mortgage - (pp * 0.8);
  const leverageMultiple = downPayment > 0 ? ((currentValue - pp) / downPayment).toFixed(1) : '—';

  const fmt = (n: number) => n > 0 ? `$${Math.round(n).toLocaleString()}` : '$0';

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>📈</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Home Net Worth Tracker</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>Calculate your home's contribution to your net worth — current equity, appreciation by DFW submarket, and projected 5-year growth.</p>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏡 Your Home Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            {[
              { label: 'PURCHASE PRICE ($)', val: purchasePrice, set: setPurchasePrice, ph: '380000′ },
              { label: 'YEARS OWNED', val: yearsOwned, set: setYearsOwned, ph: '5′ },
              { label: 'CURRENT MORTGAGE BALANCE ($)', val: mortgageBalance, set: setMortgageBalance, ph: '285000′ },
              { label: 'IMPROVEMENTS INVESTED ($)', val: improvements, set: setImprovements, ph: '22000′ },
            ].map(({ label, val, set, ph }) => (
              <div key={label}>
                <label style={{ color: '#94a3b8', fontSize: 12, display: 'block', marginBottom: 4 }}>{label}</label>
                <input type="number" value={val} onChange={e => set(e.target.value)} placeholder={ph} style={{ backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '8px 12px', width: '100%', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <div>
            <label style={{ color: '#94a3b8', fontSize: 12, display: 'block', marginBottom: 6 }}>DFW SUBMARKET</label>
            <select value={submarket} onChange={e => setSubmarket(e.target.value)} style={{ backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '8px 12px', width: '100%' }}>
              <option value="">Select submarket (or use DFW average 5.5%)</option>
              {Object.entries(submarketRates).map(([name, r]) => (
                <option key={name} value={name}>{name} — {(r * 100).toFixed(1)}% avg annual appreciation</option>
              ))}
            </select>
          </div>
        </div>

        {currentValue > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              {[
                { label: 'Est. Current Value', value: fmt(currentValue), sub: `${years}yr @ ${(rate * 100).toFixed(1)}%/yr` },
                { label: 'Current Equity', value: fmt(equity), sub: 'Value minus mortgage balance' },
                { label: 'Appreciation Gained', value: fmt(currentValue - pp), sub: `Since purchase ${fmt(pp)}` },
                { label: 'Leverage Multiple', value: `${leverageMultiple}x`, sub: 'Return on down payment' },
              ].map(({ label, value, sub }) => (
                <div key={label} style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20 }}>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{label}</div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 22 }}>{value}</div>
                  <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{sub}</div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 12 }}>
              <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔮 5-Year Equity Projection</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                {[
                  { label: 'Projected Value', value: fmt(fiveYearValue) },
                  { label: 'Projected Equity', value: fmt(fiveYearEquity) },
                  { label: 'Equity Growth', value: fmt(equityGain) },
                ].map(({ label, value }) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{label}</div>
                    <div style={{ color: '#22c55e', fontWeight: 700, fontSize: 18 }}>{value}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, backgroundColor: '#0A1628', borderRadius: 8, padding: 12, color: '#94a3b8', fontSize: 13 }}>
                Projection assumes {submarket ? submarket : 'DFW average'} appreciation rate of {(rate * 100).toFixed(1)}%/yr and standard principal paydown. Actual results vary. Not financial advice.
              </div>
            </div>

            <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24 }}>
              <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>💡 Grow Your Equity Faster</h2>
              {[
                ['🔧', 'Strategic Improvements', 'Kitchen and bathroom updates return 70–85% in DFW. HVAC and roof replacements protect value.'],
                ['💧', 'Foundation Protection', 'Consistent moisture prevents DFW clay soil damage — the #1 equity destroyer in North Texas.'],
                ['📊', 'Track Comps Annually', 'DFW appreciation varies 3–8% by submarket. Review your Zillow estimate each January.'],
              ].map(([icon, label, desc]) => (
                <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 20 }}>{icon}</span>
                  <div><div style={{ fontWeight: 600, marginBottom: 2 }}>{label}</div><div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!currentValue && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24, textAlign: 'center', color: '#64748b' }}>Enter your home details above to calculate your equity and net worth contribution.</div>
        )}

        <div style={{ textAlign: 'center', backgroundColor: '#F5E642', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16 }}>Protect and grow your home equity</div>
          <div style={{ color: '#0A1628', fontSize: 13, marginTop: 4 }}>ProLnk connects DFW homeowners with vetted contractors for strategic improvements</div>
        </div>
      </div>
    </div>
  );
}
