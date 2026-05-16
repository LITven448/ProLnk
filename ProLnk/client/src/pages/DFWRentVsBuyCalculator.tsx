import { useState } from 'react';

export default function DFWRentVsBuyCalculator() {
  const [monthlyRent, setMonthlyRent] = useState(2200);
  const [homePrice, setHomePrice] = useState(380000);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(6.8);
  const [propertyTaxRate, setPropertyTaxRate] = useState(2.3);
  const [hoa, setHoa] = useState(100);
  const [maintenance, setMaintenance] = useState(1);

  const downPaymentAmount = homePrice * (downPayment / 100);
  const loanAmount = homePrice - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = 360;
  const monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  const monthlyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyMaintenance = (homePrice * (maintenance / 100)) / 12;
  const monthlyInsurance = homePrice * 0.006 / 12;
  const totalMonthlyBuy = monthlyPI + monthlyTax + hoa + monthlyMaintenance + monthlyInsurance;

  const rentVsBuyDiff = totalMonthlyBuy - monthlyRent;
  const annualAppreciation = 0.045;
  const annualRentIncrease = 0.04;

  let breakEvenYear = 0;
  let buyWealth10 = -downPaymentAmount;
  let rentWealth10 = downPaymentAmount;
  const closingCosts = homePrice * 0.03;
  buyWealth10 -= closingCosts;

  for (let year = 1; year <= 30; year++) {
    const homeValue = homePrice * Math.pow(1 + annualAppreciation, year);
    const remainingLoan = loanAmount * (Math.pow(1 + monthlyRate, numPayments) - Math.pow(1 + monthlyRate, year * 12)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const equity = homeValue - remainingLoan;
    const buyNet = equity - downPaymentAmount - closingCosts;
    const currentRent = monthlyRent * 12 * Math.pow(1 + annualRentIncrease, year - 1);
    const buyAnnualCost = totalMonthlyBuy * 12;
    const rentSavings = buyAnnualCost > currentRent ? buyAnnualCost - currentRent : 0;
    if (buyNet > rentSavings * year && breakEvenYear === 0) breakEvenYear = year;
  }

  const homeValue10 = homePrice * Math.pow(1 + annualAppreciation, 10);
  const remaining10 = loanAmount * (Math.pow(1 + monthlyRate, numPayments) - Math.pow(1 + monthlyRate, 120)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  buyWealth10 = homeValue10 - remaining10 - closingCosts - (homePrice * 0.06);
  rentWealth10 = downPaymentAmount * Math.pow(1.07, 10) - (monthlyRent * 12 * ((Math.pow(1.04, 10) - 1) / 0.04));
  rentWealth10 = Math.max(rentWealth10, 0);

  const fmt = (n: number) => '$' + Math.round(n).toLocaleString();

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '32px', marginBottom: 24 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🏠 DFW Rent vs Buy Calculator</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>Built for DFW's high property taxes (2–3% effective rate)</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { label: '💰 Monthly Rent', value: monthlyRent, min: 500, max: 8000, step: 50, set: setMonthlyRent, prefix: '$' },
            { label: '🏡 Home Price', value: homePrice, min: 150000, max: 2000000, step: 5000, set: setHomePrice, prefix: '$' },
            { label: '📉 Down Payment %', value: downPayment, min: 3, max: 50, step: 1, set: setDownPayment, suffix: '%' },
            { label: '📈 Interest Rate %', value: interestRate, min: 3, max: 12, step: 0.1, set: setInterestRate, suffix: '%' },
            { label: '🏛️ DFW Property Tax %', value: propertyTaxRate, min: 1.5, max: 3.5, step: 0.1, set: setPropertyTaxRate, suffix: '%' },
            { label: '🏘️ HOA Monthly', value: hoa, min: 0, max: 1000, step: 25, set: setHoa, prefix: '$' },
            { label: '🔧 Maintenance %/yr', value: maintenance, min: 0.5, max: 3, step: 0.1, set: setMaintenance, suffix: '%' },
          ].map(({ label, value, min, max, step, set, prefix, suffix }) => (
            <div key={label} style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0A1628', marginBottom: 8 }}>{label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', background: '#0A1628', borderRadius: 8, padding: '8px 12px', marginBottom: 8 }}>
                {prefix}{value}{suffix}
              </div>
              <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📊 Monthly Cost Comparison</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 16 }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>🔑 Renting</div>
              <div style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>{fmt(monthlyRent)}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>per month, all-in</div>
            </div>
            <div style={{ background: 'rgba(245,230,66,0.1)', borderRadius: 10, padding: 16, border: '1px solid #F5E642' }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>🏠 Buying</div>
              <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 700 }}>{fmt(totalMonthlyBuy)}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>P&I + tax + HOA + maint</div>
            </div>
          </div>
          <div style={{ marginTop: 12, color: rentVsBuyDiff > 0 ? '#f87171' : '#4ade80', fontSize: 14, textAlign: 'center' }}>
            Buying costs {rentVsBuyDiff > 0 ? `${fmt(rentVsBuyDiff)} MORE` : `${fmt(-rentVsBuyDiff)} LESS`} per month than renting
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>⏳ Break-Even Year</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#0A1628' }}>{breakEvenYear || '30+'}</div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>years until buying wins</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>💼 10-Year Wealth (Buy)</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: buyWealth10 > 0 ? '#16a34a' : '#dc2626' }}>{fmt(Math.abs(buyWealth10))}</div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>net equity after costs</div>
          </div>
        </div>

        <div style={{ marginTop: 16, background: '#fefce8', border: '1px solid #fde047', borderRadius: 12, padding: 16, fontSize: 13, color: '#713f12' }}>
          ⚠️ <strong>DFW Property Tax Alert:</strong> At {propertyTaxRate}% effective rate, your annual property tax is {fmt(homePrice * propertyTaxRate / 100)} — significantly higher than the national avg of 1.07%. This directly reduces your buying power.
        </div>
      </div>
    </div>
  );
}
