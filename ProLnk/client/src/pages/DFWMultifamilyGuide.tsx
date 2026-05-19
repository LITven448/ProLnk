import { useState } from 'react';

export default function DFWMultifamilyGuide() {
  const [unitCount, setUnitCount] = useState(4);
  const [purchasePrice, setPurchasePrice] = useState(600000);
  const [rentPerUnit, setRentPerUnit] = useState(1300);

  const grossRent = unitCount * rentPerUnit * 12;
  const vacancy = grossRent * 0.05;
  const effectiveGrossIncome = grossRent - vacancy;
  const expenses = effectiveGrossIncome * 0.35;
  const noi = effectiveGrossIncome - expenses;
  const capRate = (noi / purchasePrice) * 100;
  const downPct = unitCount >= 5 ? 0.25 : 0.20;
  const downPayment = purchasePrice * downPct;
  const loanAmount = purchasePrice - downPayment;
  const rate = unitCount >= 5 ? 0.075 : 0.07;
  const monthlyRate = rate / 12;
  const n = 360;
  const mortgagePayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  const annualDebtService = mortgagePayment * 12;
  const cashFlow = noi - annualDebtService;
  const cocReturn = (cashFlow / downPayment) * 100;
  const pmCost = grossRent * 0.08;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 12, fontSize: 13, color: '#F5E642′ }}>🏢 DFW REAL ESTATE INVESTOR SERIES</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          DFW Multifamily Investing Guide
        </h1>
        <p style={{ color: '#8A9BB5', fontSize: 17, marginBottom: 40 }}>
          DFW's population growth and housing shortage make multifamily one of the most resilient asset classes in the market — from duplexes to apartment complexes.
        </p>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🏗️ Small vs Large Multifamily</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, borderTop: '3px solid #F5E642′ }}>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 12 }}>🏘️ Small (2-4 Units)</div>
              <ul style={{ color: '#C4D0E3', fontSize: 14, lineHeight: 2, margin: 0, paddingLeft: 18 }}>
                <li>Residential financing (conventional, FHA)</li>
                <li>As low as 3.5% down (FHA, owner-occupied)</li>
                <li>Easier to manage directly</li>
                <li>Easier to sell (larger buyer pool)</li>
                <li>Valued like residential (comparables)</li>
              </ul>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, borderTop: '3px solid #8A9BB5′ }}>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 12 }}>🏢 Large (5+ Units)</div>
              <ul style={{ color: '#C4D0E3', fontSize: 14, lineHeight: 2, margin: 0, paddingLeft: 18 }}>
                <li>Commercial financing (25%+ down)</li>
                <li>Higher rates, shorter amortization</li>
                <li>Valued on income (cap rate, NOI)</li>
                <li>Requires professional management</li>
                <li>Higher cash flow ceiling</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>📊 DFW Multifamily Market Overview</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { metric: 'Cap Rate (small)', value: '4.5–6.5%' },
              { metric: 'Cap Rate (large)', value: '4.0–5.5%' },
              { metric: 'Avg Vacancy Rate', value: '~5% DFW' },
              { metric: 'Rent Growth (2023-25)', value: '3–7%/yr' },
              { metric: 'Section 8 Premiums', value: '10–15% above market' },
              { metric: 'Property Mgmt Cost', value: '8–10% of gross' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>{item.value}</div>
                <div style={{ fontSize: 13, color: '#8A9BB5′ }}>{item.metric}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🏷️ Section 8 in DFW</h2>
          <p style={{ color: '#C4D0E3', lineHeight: 1.7, marginBottom: 16 }}>
            DFW has one of the largest HUD Section 8 voucher programs in Texas. Landlords who accept vouchers often receive 
            10–15% above-market rents paid directly by the housing authority, with guaranteed monthly payments. Vacancy is 
            lower because voucher holders are motivated to maintain tenancy.
          </p>
          <p style={{ color: '#C4D0E3', lineHeight: 1.7 }}>
            South Dallas, East Fort Worth, and Garland have the highest concentrations of eligible tenants. Properties must 
            pass an HQS (Housing Quality Standards) inspection — a net positive, since it forces deferred maintenance to be addressed.
          </p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#F5E642′ }}>🧮 Multifamily Return Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#8A9BB5′ }}>Unit Count</label>
              <input type="range" min={2} max={20} step={1} value={unitCount}
                onChange={e => setUnitCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{unitCount} units {unitCount >= 5 ? '(commercial loan)' : '(residential loan)'}</div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#8A9BB5′ }}>Purchase Price ($)</label>
              <input type="range" min={200000} max={3000000} step={25000} value={purchasePrice}
                onChange={e => setPurchasePrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>${purchasePrice.toLocaleString()}</div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#8A9BB5′ }}>Rent Per Unit ($/mo)</label>
              <input type="range" min={700} max={2500} step={50} value={rentPerUnit}
                onChange={e => setRentPerUnit(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>${rentPerUnit.toLocaleString()}/mo</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { label: 'Gross Annual Rent', value: `$${Math.round(grossRent).toLocaleString()}` },
              { label: 'Net Operating Income', value: `$${Math.round(noi).toLocaleString()}/yr`, highlight: true },
              { label: 'Cap Rate', value: `${capRate.toFixed(2)}%`, highlight: true },
              { label: 'Down Payment', value: `$${Math.round(downPayment).toLocaleString()} (${Math.round(downPct*100)}%)` },
              { label: 'Annual Cash Flow', value: cashFlow >= 0 ? `+$${Math.round(cashFlow).toLocaleString()}` : `-$${Math.round(Math.abs(cashFlow)).toLocaleString()}` },
              { label: 'Cash-on-Cash Return', value: `${cocReturn.toFixed(1)}%`, highlight: true },
              { label: 'Property Mgmt Cost (8%)', value: `$${Math.round(pmCost).toLocaleString()}/yr` },
              { label: 'Price Per Unit', value: `$${Math.round(purchasePrice / unitCount).toLocaleString()}` },
            ].map((item, i) => (
              <div key={i} style={{ background: item.highlight ? '#1A2E4A' : '#0A1628', borderRadius: 12, padding: 16, border: item.highlight ? '2px solid #F5E642′ : ’none' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: item.highlight ? '#F5E642′ : '#E8EDF5', marginBottom: 4 }}>{item.value}</div>
                <div style={{ fontSize: 12, color: '#8A9BB5′ }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

