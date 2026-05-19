import { useState } from 'react';

const COUNTY_TAX: Record<string, number> = {
  dallas: 0.0224,
  tarrant: 0.0218,
  collin: 0.0198,
  denton: 0.0205,
  rockwall: 0.0212,
};

export default function DFWHomeOwnershipBudget() {
  const [homeValue, setHomeValue] = useState('');
  const [county, setCounty] = useState('dallas');
  const [mortgage, setMortgage] = useState('');
  const [hasHoa, setHasHoa] = useState(false);
  const [hoaAmount, setHoaAmount] = useState('');
  const [sqft, setSqft] = useState('');
  const [result, setResult] = useState<null | Record<string, number>>(null);

  function calculate() {
    const val = parseFloat(homeValue) || 0;
    const mort = parseFloat(mortgage) || 0;
    const sq = parseFloat(sqft) || 1800;
    const hoa = hasHoa ? (parseFloat(hoaAmount) || 0) : 0;

    const taxRate = COUNTY_TAX[county] || 0.022;
    const propertyTax = (val * taxRate) / 12;
    const insurance = (val * 0.005) / 12;
    const maintenance = (val * 0.015) / 12;
    const utilities = sq < 1500 ? 380 : sq < 2500 ? 520 : sq < 3500 ? 680 : 820;
    const improvements = (val * 0.01) / 12;

    setResult({ mortgage: mort, propertyTax, insurance, maintenance, utilities, hoa, improvements });
  }

  const totalMonthly = result ? Object.values(result).reduce((a, b) => a + b, 0) : 0;
  const rows = result ? [
    { label: 'Mortgage (P&I)', val: result.mortgage, note: '' },
    { label: 'Property Tax (escrow)', val: result.propertyTax, note: '⚠️ Most underestimated' },
    { label: 'Homeowner\’s Insurance', val: result.insurance, note: '' },
    { label: 'HOA Fees', val: result.hoa, note: '' },
    { label: 'Maintenance Reserve', val: result.maintenance, note: '1.5% of home value/yr' },
    { label: 'Utilities (est.)', val: result.utilities, note: 'Electric peaks in summer' },
    { label: 'Improvement Sinking Fund', val: result.improvements, note: '1% of value/yr' },
  ] : [];

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#0A1628′ }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 32 }}>📋💵</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Homeownership Budget Planner</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>The real monthly cost — not just your mortgage payment.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <div style={{ display: 'grid', gap: 16 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
              Home value ($)
              <input type="number" value={homeValue} onChange={e => setHomeValue(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 15 }} placeholder="e.g. 450000″ />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
              DFW County
              <select value={county} onChange={e => setCounty(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 15 }}>
                <option value="dallas">Dallas County (2.24%)</option>
                <option value="tarrant">Tarrant County (2.18%)</option>
                <option value="collin">Collin County (1.98%)</option>
                <option value="denton">Denton County (2.05%)</option>
                <option value="rockwall">Rockwall County (2.12%)</option>
              </select>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
                Monthly mortgage (P&I)
                <input type="number" value={mortgage} onChange={e => setMortgage(e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 15 }} placeholder="e.g. 2800″ />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
                Home sq ft
                <input type="number" value={sqft} onChange={e => setSqft(e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 15 }} placeholder="e.g. 2400″ />
              </label>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasHoa} onChange={e => setHasHoa(e.target.checked)} style={{ width: 18, height: 18 }} />
              My neighborhood has an HOA
            </label>
            {hasHoa && (
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
                Monthly HOA amount ($)
                <input type="number" value={hoaAmount} onChange={e => setHoaAmount(e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 15 }} placeholder="e.g. 150″ />
              </label>
            )}
          </div>
          <button onClick={calculate}
            style={{ marginTop: 22, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '13px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Build My Budget →
          </button>
        </div>

        {result && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontSize: 17, marginBottom: 16 }}>📊 Your Monthly Homeownership Budget</h2>
            {rows.map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F5F9′ }}>
                <div>
                  <span style={{ fontSize: 14 }}>{r.label}</span>
                  {r.note && <span style={{ fontSize: 12, color: '#F59E0B', marginLeft: 8 }}>{r.note}</span>}
                </div>
                <span style={{ fontWeight: 700, fontSize: 15 }}>${Math.round(r.val).toLocaleString()}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, padding: '14px 0 0', borderTop: '2.5px solid #0A1628′ }}>
              <span style={{ fontWeight: 800, fontSize: 16 }}>Total Monthly</span>
              <span style={{ fontWeight: 800, fontSize: 22, color: '#0A1628′ }}>${Math.round(totalMonthly).toLocaleString()}</span>
            </div>
            <div style={{ marginTop: 14, padding: 14, background: '#FEF9EC', borderRadius: 8, fontSize: 13, color: '#92400E' }}>
              ⚠️ Annual total: <strong>${Math.round(totalMonthly * 12).toLocaleString()}</strong> — Property taxes alone are ${Math.round((result?.propertyTax || 0) * 12).toLocaleString()}/yr, paid through escrow monthly but easy to forget.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
