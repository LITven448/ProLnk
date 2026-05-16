import { useState } from 'react';

const COUNTY_RATES: Record<string, number> = {
  Dallas: 2.18, Tarrant: 2.26, Collin: 1.97, Denton: 2.01, Rockwall: 2.05,
};

const APPRECIATION_RATE = 0.045;
const MORTGAGE_RATE = 0.07;

export default function DFWTotalCostOfOwnershipCalculator() {
  const [homePrice, setHomePrice] = useState(450000);
  const [downPct, setDownPct] = useState(20);
  const [county, setCounty] = useState('Collin');
  const [monthlyHOA, setMonthlyHOA] = useState(200);
  const [hasPool, setHasPool] = useState(false);

  const downPayment = homePrice * (downPct / 100);
  const loanAmount = homePrice - downPayment;
  const monthlyRate = MORTGAGE_RATE / 12;
  const payments = 360;
  const monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1);

  const annualTax = (homePrice * COUNTY_RATES[county]) / 100;
  const monthlyTax = annualTax / 12;

  const insuranceAnnual = homePrice * 0.0065;
  const monthlyInsurance = insuranceAnnual / 12;

  const maintenanceReserve = homePrice * 0.01 / 12;
  const poolMaintenance = hasPool ? 150 : 0;

  const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyHOA + maintenanceReserve + poolMaintenance;
  const totalAnnual = totalMonthly * 12;
  const fiveYearTotal = totalAnnual * 5;
  const tenYearTotal = totalAnnual * 10;

  const appreciatedValue5 = homePrice * Math.pow(1 + APPRECIATION_RATE, 5);
  const appreciatedValue10 = homePrice * Math.pow(1 + APPRECIATION_RATE, 10);
  const equityGain5 = appreciatedValue5 - homePrice;
  const netCost5 = fiveYearTotal - equityGain5;

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  const breakdown = [
    ['💳 Principal & Interest', monthlyPI],
    ['🏛️ Property Tax', monthlyTax],
    ['🛡️ Home Insurance', monthlyInsurance],
    ['🏘️ HOA Fee', monthlyHOA],
    ['🔧 Maintenance Reserve (1%)', maintenanceReserve],
    ...(hasPool ? [['🏊 Pool Maintenance', poolMaintenance] as [string, number]] : []),
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>🏡 DFW Total Cost of Ownership</h1>
          <p style={{ color: '#555', marginTop: 8 }}>See the full picture beyond your mortgage payment</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ fontWeight: 600, color: '#333' }}>Home Price: {fmt(homePrice)}</span>
            <input type="range" min={200000} max={2000000} step={10000} value={homePrice}
              onChange={e => setHomePrice(Number(e.target.value))}
              style={{ width: '100%', marginTop: 8, accentColor: '#2563eb' }} />
          </label>

          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ fontWeight: 600, color: '#333' }}>Down Payment: {downPct}% ({fmt(downPayment)})</span>
            <input type="range" min={3} max={50} step={1} value={downPct}
              onChange={e => setDownPct(Number(e.target.value))}
              style={{ width: '100%', marginTop: 8, accentColor: '#7c3aed' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#888' }}>
              <span>3% (FHA)</span><span>20% (conventional)</span><span>50%</span>
            </div>
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <label style={{ display: 'block' }}>
              <span style={{ fontWeight: 600, color: '#333', fontSize: 14 }}>County</span>
              <select value={county} onChange={e => setCounty(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 8, padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 15 }}>
                {Object.keys(COUNTY_RATES).map(c => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label style={{ display: 'block' }}>
              <span style={{ fontWeight: 600, color: '#333', fontSize: 14 }}>Monthly HOA: {fmt(monthlyHOA)}</span>
              <input type="range" min={0} max={800} step={25} value={monthlyHOA}
                onChange={e => setMonthlyHOA(Number(e.target.value))}
                style={{ width: '100%', marginTop: 14, accentColor: '#059669' }} />
            </label>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#333', fontSize: 14 }}>
            <input type="checkbox" checked={hasPool} onChange={e => setHasPool(e.target.checked)} style={{ accentColor: '#2563eb', width: 16, height: 16 }} />
            🏊 Has Swimming Pool (+$150/mo maintenance)
          </label>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#93c5fd', marginBottom: 4 }}>TRUE Monthly Cost of Ownership</div>
          <div style={{ fontSize: 40, fontWeight: 700, color: '#F5E642' }}>{fmt(totalMonthly)}</div>
          <div style={{ fontSize: 14, color: '#93c5fd', marginTop: 4 }}>vs. mortgage-only: {fmt(monthlyPI)} ({Math.round((totalMonthly / monthlyPI - 1) * 100)}% more than P&I)</div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#333', marginTop: 0 }}>📊 Monthly Cost Breakdown</h2>
          {breakdown.map(([label, amount]) => (
            <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: 14 }}>
              <span style={{ color: '#555' }}>{label}</span>
              <strong style={{ color: '#1e3a5f' }}>{fmt(amount as number)}</strong>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: 15 }}>
            <strong style={{ color: '#333' }}>Total Monthly</strong>
            <strong style={{ color: '#2563eb', fontSize: 18 }}>{fmt(totalMonthly)}</strong>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 20 }}>
          {[['Annual Total', fmt(totalAnnual), '#2563eb'],
            ['5-Year Total', fmt(fiveYearTotal), '#7c3aed'],
            ['10-Year Total', fmt(tenYearTotal), '#dc2626'],
            ['5yr Appreciation', fmt(equityGain5), '#059669']].map(([label, value, color]) => (
            <div key={label as string} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: color as string }}>{value}</div>
              <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#333', marginTop: 0 }}>📈 Net 5-Year Cost After Appreciation</h2>
          <p style={{ color: '#555', fontSize: 14 }}>At 4.5% annual DFW appreciation, your home reaches <strong>{fmt(appreciatedValue5)}</strong> in 5 years</p>
          <p style={{ color: '#555', fontSize: 14 }}>10-year projected value: <strong>{fmt(appreciatedValue10)}</strong></p>
          <p style={{ fontWeight: 700, color: netCost5 > 0 ? '#dc2626' : '#059669', fontSize: 15 }}>
            {netCost5 > 0 ? `Net cost after appreciation: ${fmt(netCost5)}` : `Net gain after 5 years: ${fmt(Math.abs(netCost5))}`}
          </p>
          <p style={{ color: '#888', fontSize: 12, marginBottom: 0 }}>* Rate at 7.0%, DFW avg appreciation 4.5%. Actual rates vary. PMI not included if &lt;20% down.</p>
        </div>
      </div>
    </div>
  );
}
