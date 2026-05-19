import { useState } from 'react';

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export default function DFWCostOfOwnershipGuide() {
  const [homePrice, setHomePrice] = useState(380000);
  const [monthlyRent, setMonthlyRent] = useState(2200);
  const [downPayment, setDownPayment] = useState(76000);
  const [rate, setRate] = useState(7.0);
  const [rentGrowth, setRentGrowth] = useState(3.5);
  const [appreciation, setAppreciation] = useState(6.0);

  const loanAmount = homePrice - downPayment;
  const monthlyRate = rate / 100 / 12;
  const monthlyPI = loanAmount > 0 ? (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -360)) : 0;
  const propertyTax = (homePrice * 0.024) / 12;
  const insurance = 175;
  const hoa = 120;
  const maintenance = (homePrice * 0.01) / 12;
  const totalOwningMonthly = monthlyPI + propertyTax + insurance + hoa + maintenance;

  const opportunityCost = (downPayment * 0.07) / 12;
  const totalOwningWithOpportunity = totalOwningMonthly + opportunityCost;

  const hiddenCostsList = [
    { item: 'Property Tax (2.4% DFW avg)', amount: propertyTax },
    { item: 'Homeowner\’s Insurance', amount: insurance },
    { item: 'HOA Fees (avg DFW)', amount: hoa },
    { item: 'Maintenance (1% rule)', amount: maintenance },
    { item: 'Opportunity Cost on Down Payment', amount: opportunityCost },
  ];

  let breakEvenYear = 0;
  let cumulativeOwnerCost = downPayment;
  let cumulativeRentCost = 0;
  let currentRent = monthlyRent;
  let currentHomeValue = homePrice;

  for (let yr = 1; yr <= 30; yr++) {
    for (let mo = 0; mo < 12; mo++) {
      cumulativeOwnerCost += totalOwningMonthly;
      cumulativeRentCost += currentRent;
    }
    currentRent *= 1 + rentGrowth / 100;
    currentHomeValue *= 1 + appreciation / 100;
    const remainingBalance = loanAmount > 0
      ? loanAmount * Math.pow(1 + monthlyRate, yr * 12) - monthlyPI * ((Math.pow(1 + monthlyRate, yr * 12) - 1) / monthlyRate)
      : 0;
    const equity = currentHomeValue - remainingBalance;
    const ownerNetCost = cumulativeOwnerCost - equity;
    if (breakEvenYear === 0 && ownerNetCost < cumulativeRentCost) breakEvenYear = yr;
  }

  const year10OwnerCost = totalOwningMonthly * 12 * 10 + downPayment;
  const year10RentCost = Array.from({ length: 10 }, (_, i) => monthlyRent * Math.pow(1 + rentGrowth / 100, i) * 12).reduce((a, b) => a + b, 0);
  const year10HomeValue = homePrice * Math.pow(1 + appreciation / 100, 10);
  const year10Equity = year10HomeValue - (loanAmount > 0 ? loanAmount * Math.pow(1 + monthlyRate, 120) - monthlyPI * ((Math.pow(1 + monthlyRate, 120) - 1) / monthlyRate) : 0);
  const year10OwnerNet = year10OwnerCost - year10Equity;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ background: '#0A1628', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 36 }}>🏠</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>
          True Cost of DFW Homeownership
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: 16, maxWidth: 640, margin: '0 auto' }}>
          Mortgage is just the beginning. Discover every dollar that goes into owning a DFW home — and when buying beats renting.
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ background: '#fff3cd', borderRadius: 12, padding: 20, marginBottom: 32, borderLeft: '4px solid #F5E642' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>💡 Hidden Costs First-Timers Miss</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13, color: '#475569' }}>
            {['🔧 HVAC service contracts ($200–400/yr)','🌊 Water heater replacement ($800–1,500)','🐜 Pest control ($400–600/yr in DFW)','🌳 Lawn & landscaping ($150–300/mo)','🏊 Pool maintenance ($150–250/mo if applicable)','🔒 Security system ($30–80/mo)','📦 Moving costs ($1,500–5,000)','🔑 Closing costs ($8,000–15,000 upfront)'].map(item => (
              <div key={item} style={{ background: '#fffbeb', padding: '6px 10px', borderRadius: 6 }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e2e8f0', marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>🧮 Own vs. Rent Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'Home Price ($)', value: homePrice, setValue: setHomePrice, step: 10000 },
              { label: 'Down Payment ($)', value: downPayment, setValue: setDownPayment, step: 5000 },
              { label: 'Mortgage Rate (%)', value: rate, setValue: setRate, step: 0.1 },
              { label: 'Rent Alternative ($/mo)', value: monthlyRent, setValue: setMonthlyRent, step: 100 },
              { label: 'Annual Rent Growth (%)', value: rentGrowth, setValue: setRentGrowth, step: 0.5 },
              { label: 'Annual Appreciation (%)', value: appreciation, setValue: setAppreciation, step: 0.5 },
            ].map(field => (
              <div key={field.label}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>{field.label}</label>
                <input
                  type="number"
                  step={field.step}
                  value={field.value}
                  onChange={e => field.setValue(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 15, boxSizing: 'border-box' }}
                />
              </div>
            ))}
          </div>

          <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, color: '#fff', marginBottom: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, textAlign: 'center' }}>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>Monthly Ownership Cost</div>
                <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800 }}>{formatCurrency(totalOwningMonthly)}</div>
                <div style={{ color: '#64748b', fontSize: 11 }}>all-in (excl. opportunity cost)</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>Break-Even Year</div>
                <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800 }}>{breakEvenYear > 0 ? `Year ${breakEvenYear}` : '30+ yrs'}</div>
                <div style={{ color: '#64748b', fontSize: 11 }}>buying beats renting</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>10-Year Net Cost Gap</div>
                <div style={{ color: year10OwnerNet < year10RentCost ? '#22c55e' : '#ef4444', fontSize: 26, fontWeight: 800 }}>
                  {year10OwnerNet < year10RentCost ? formatCurrency(year10RentCost - year10OwnerNet) + ' ahead' : formatCurrency(year10OwnerNet - year10RentCost) + ' behind'}
                </div>
                <div style={{ color: '#64748b', fontSize: 11 }}>owning vs renting (10 yr)</div>
              </div>
            </div>
          </div>

          <div style={{ borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ background: '#F9FAFB', padding: '10px 16px', fontSize: 12, fontWeight: 700, color: '#475569', display: 'grid', gridTemplateColumns: '1fr auto' }}>
              <span>MONTHLY COST BREAKDOWN</span><span>AMOUNT</span>
            </div>
            {[
              { label: 'Principal & Interest', amount: monthlyPI },
              ...hiddenCostsList,
            ].map((row, i) => (
              <div key={i} style={{ padding: '10px 16px', display: 'grid', gridTemplateColumns: '1fr auto', fontSize: 14, borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#F9FAFB' }}>
                <span style={{ color: '#475569' }}>{row.label}</span>
                <span style={{ fontWeight: 600 }}>{formatCurrency(row.amount)}/mo</span>
              </div>
            ))}
            <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: '1fr auto', fontSize: 15, fontWeight: 700, borderTop: '2px solid #0A1628', background: '#f8fafc' }}>
              <span>Total Monthly (all-in)</span>
              <span style={{ color: '#0A1628' }}>{formatCurrency(totalOwningWithOpportunity)}/mo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
