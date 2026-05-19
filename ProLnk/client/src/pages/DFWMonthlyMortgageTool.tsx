import { useState } from 'react';

export default function DFWMonthlyMortgageTool() {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [rate, setRate] = useState('');
  const [county, setCounty] = useState('dallas');
  const [hoa, setHoa] = useState('');
  const [results, setResults] = useState<null | {
    loanAmount: number;
    principal: number;
    propertyTax: number;
    insurance: number;
    hoaAmount: number;
    maintenanceReserve: number;
    total: number;
  }>(null);

  const counties: Record<string, { label: string; taxRate: number }> = {
    dallas: { label: '🏙️ Dallas County', taxRate: 0.0196 },
    collin: { label: '🌆 Collin County (Plano/Frisco)', taxRate: 0.0166 },
    denton: { label: '🏘️ Denton County (Flower Mound/Lewisville)', taxRate: 0.0182 },
    tarrant: { label: '🤠 Tarrant County (Fort Worth/Arlington)', taxRate: 0.0194 },
    rockwall: { label: '🏡 Rockwall County', taxRate: 0.0176 },
  };

  function calcMonthlyPayment(principal: number, annualRate: number) {
    const r = annualRate / 100 / 12;
    const n = 360;
    if (r === 0) return principal / n;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  function calculate() {
    const pp = parseFloat(purchasePrice.replace(/,/g, '')) || 0;
    const dp = parseFloat(downPayment.replace(/,/g, '')) || 0;
    const r = parseFloat(rate) || 0;
    const loanAmount = pp - dp;
    const principal = calcMonthlyPayment(loanAmount, r);
    const taxRate = counties[county].taxRate;
    const propertyTax = (pp * taxRate) / 12;
    const insurance = (pp * 0.006) / 12;
    const hoaAmount = parseFloat(hoa) || 0;
    const maintenanceReserve = (pp * 0.01 * 1.15) / 12;
    const total = principal + propertyTax + insurance + hoaAmount + maintenanceReserve;
    setResults({ loanAmount, principal, propertyTax, insurance, hoaAmount, maintenanceReserve, total });
  }

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏠💵</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0A1628', margin: '8px 0 4px' }}>DFW Monthly Mortgage Tool</h1>
          <p style={{ color: '#4B5563', fontSize: 15 }}>True total cost of homeownership across all DFW counties</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 24 }}>
          {[
            { label: 'Purchase Price ($)', value: purchasePrice, set: setPurchasePrice, placeholder: '475,000′ },
            { label: 'Down Payment ($)', value: downPayment, set: setDownPayment, placeholder: '95,000′ },
            { label: 'Interest Rate (%)', value: rate, set: setRate, placeholder: '6.75′ },
            { label: 'Monthly HOA ($)', value: hoa, set: setHoa, placeholder: '150′ },
          ].map(({ label, value, set, placeholder }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{label}</label>
              <input value={value} onChange={e => set(e.target.value)} placeholder={placeholder}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #D1D5DB', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          ))}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>DFW County (for property tax rate)</label>
            <select value={county} onChange={e => setCounty(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #D1D5DB', fontSize: 15, background: '#fff', boxSizing: 'border-box' }}>
              {Object.entries(counties).map(([key, { label, taxRate }]) => (
                <option key={key} value={key}>{label} — {(taxRate * 100).toFixed(2)}%</option>
              ))}
            </select>
          </div>
          <button onClick={calculate}
            style={{ width: '100%', padding: '13px', background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Calculate Total Monthly Cost 🔍
          </button>
        </div>

        {results && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>📊 True Monthly Cost of Ownership</h2>
            <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>Loan Amount: {fmt(results.loanAmount)}</p>
            {[
              { label: '🏦 Principal & Interest', value: fmt(results.principal) },
              { label: '🏛️ Property Tax', value: fmt(results.propertyTax) },
              { label: '🛡️ Homeowners Insurance', value: fmt(results.insurance) },
              { label: '🏘️ HOA Dues', value: fmt(results.hoaAmount) },
              { label: '🔧 Maintenance Reserve (DFW adjusted)', value: fmt(results.maintenanceReserve) },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F3F4F6′ }}>
                <span style={{ fontSize: 14 }}>{label}</span>
                <span style={{ fontWeight: 600 }}>{value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', background: '#F5E642', borderRadius: 8, marginTop: 12, paddingLeft: 12, paddingRight: 12 }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>💰 Total Monthly Cost</span>
              <span style={{ fontWeight: 800, fontSize: 20 }}>{fmt(results.total)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
