import { useState } from 'react';

export default function DFWBRRRRGuide() {
  const [purchasePrice, setPurchasePrice] = useState(120000);
  const [rehabCost, setRehabCost] = useState(30000);
  const [arv, setArv] = useState(180000);
  const [monthlyRent, setMonthlyRent] = useState(1400);

  const totalIn = purchasePrice + rehabCost;
  const equity = arv - totalIn;
  const cashOutRefi = arv * 0.75;
  const cashRecovered = Math.max(0, cashOutRefi - purchasePrice);
  const leftIn = Math.max(0, totalIn - cashOutRefi);
  const annualRent = monthlyRent * 12;
  const noi = annualRent * 0.6;
  const refiLoanPayment = (cashOutRefi * 0.07 / 12) * (Math.pow(1 + 0.07/12, 360)) / (Math.pow(1 + 0.07/12, 360) - 1);
  const annualCashFlow = noi - (refiLoanPayment * 12);
  const monthsToNextDeal = leftIn > 0 ? Math.ceil(leftIn / (annualCashFlow / 12)) : 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 12, fontSize: 13, color: '#F5E642' }}>🔁 DFW REAL ESTATE INVESTOR SERIES</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          DFW BRRRR Strategy Guide
        </h1>
        <p style={{ color: '#8A9BB5', fontSize: 17, marginBottom: 40 }}>
          Buy, Rehab, Rent, Refinance, Repeat — the DFW investor's playbook for building a portfolio with minimal additional capital.
        </p>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>⚙️ How BRRRR Works in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
            {[
              { step: 'B', label: 'Buy', desc: 'Distressed property below market' },
              { step: 'R', label: 'Rehab', desc: 'Force appreciation with renovations' },
              { step: 'R', label: 'Rent', desc: 'Place tenant at market rate' },
              { step: 'R', label: 'Refinance', desc: 'Cash-out refi at 75% ARV' },
              { step: 'R', label: 'Repeat', desc: 'Use cash for next deal' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#F5E642' }}>{item.step}</div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: '#8A9BB5' }}>{item.desc}</div>
              </div>
            ))}
          </div>
          <p style={{ color: '#C4D0E3', lineHeight: 1.7 }}>
            The goal is to pull out most or all of your invested capital via a cash-out refinance after stabilizing the property, 
            leaving you with a rented asset and little-to-no money left in the deal — then repeat.
          </p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>📍 Best DFW Neighborhoods for BRRRR</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { area: 'East Dallas', why: 'Strong ARV growth, walkable, gentrifying corridors' },
              { area: 'Oak Cliff', why: 'Affordable entry, Bishop Arts spillover effect' },
              { area: 'South Fort Worth', why: 'Value-add inventory, solid blue-collar rents' },
              { area: 'Garland', why: 'Large housing stock, predictable rent comps' },
              { area: 'West Dallas', why: 'Near Design District, rapid appreciation' },
              { area: 'Haltom City', why: 'Low prices, remodel potential, stable tenants' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 12, padding: 16, borderLeft: '3px solid #F5E642' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.area}</div>
                <div style={{ fontSize: 13, color: '#8A9BB5' }}>{item.why}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📋 Typical DFW BRRRR Deal</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            {[
              { label: 'Purchase Price', value: '$120,000' },
              { label: 'Rehab Cost', value: '$30,000' },
              { label: 'After Repair Value', value: '$180,000' },
              { label: 'Monthly Rent', value: '$1,400' },
              { label: 'Cash-Out Refi (75%)', value: '$135,000' },
              { label: 'Capital Recovered', value: '$135K – $120K = $15K' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 12, padding: 14 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#F5E642' }}>{item.value}</div>
                <div style={{ fontSize: 12, color: '#8A9BB5' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#F5E642' }}>🧮 BRRRR Deal Analyzer</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
            {[
              { label: 'Purchase Price', value: purchasePrice, min: 50000, max: 400000, step: 5000, set: setPurchasePrice, fmt: (v: number) => `$${v.toLocaleString()}` },
              { label: 'Rehab Cost', value: rehabCost, min: 5000, max: 150000, step: 2500, set: setRehabCost, fmt: (v: number) => `$${v.toLocaleString()}` },
              { label: 'After Repair Value', value: arv, min: 80000, max: 600000, step: 5000, set: setArv, fmt: (v: number) => `$${v.toLocaleString()}` },
              { label: 'Monthly Rent', value: monthlyRent, min: 700, max: 3000, step: 50, set: setMonthlyRent, fmt: (v: number) => `$${v.toLocaleString()}/mo` },
            ].map((item, i) => (
              <div key={i}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#8A9BB5' }}>{item.label}</label>
                <input type="range" min={item.min} max={item.max} step={item.step} value={item.value}
                  onChange={e => item.set(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#F5E642' }} />
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{item.fmt(item.value)}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { label: 'Total Capital In', value: `$${totalIn.toLocaleString()}` },
              { label: 'Equity Created', value: `$${equity.toLocaleString()}` },
              { label: 'Cash-Out Refi (75% ARV)', value: `$${Math.round(cashOutRefi).toLocaleString()}` },
              { label: 'Capital Recovered', value: `$${Math.round(cashRecovered).toLocaleString()}` },
              { label: 'Capital Left In Deal', value: `$${Math.round(leftIn).toLocaleString()}`, highlight: true },
              { label: 'Months to Next Deal', value: leftIn === 0 ? 'Ready Now' : `~${monthsToNextDeal} mos`, highlight: true },
            ].map((item, i) => (
              <div key={i} style={{ background: item.highlight ? '#1A2E4A' : '#0A1628', borderRadius: 12, padding: 16, border: item.highlight ? '2px solid #F5E642' : 'none' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: item.highlight ? '#F5E642' : '#E8EDF5', marginBottom: 4 }}>{item.value}</div>
                <div style={{ fontSize: 12, color: '#8A9BB5' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

