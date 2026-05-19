import { useState } from 'react';

const COUNTY_RATES: Record<string, number> = {
  Dallas: 2.18,
  Tarrant: 2.26,
  Collin: 1.97,
  Denton: 2.01,
  Rockwall: 2.05,
};

const NATIONAL_AVERAGE = 1.07;

export default function DFWPropertyTaxCalculator() {
  const [homeValue, setHomeValue] = useState(400000);
  const [county, setCounty] = useState('Dallas');
  const [homestead, setHomestead] = useState(true);
  const [over65, setOver65] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const baseExemption = homestead ? 40000 : 0;
  const seniorExemption = over65 ? 10000 : 0;
  const disabledExemption = disabled ? 10000 : 0;
  const totalExemptions = baseExemption + seniorExemption + disabledExemption;
  const taxableValue = Math.max(0, homeValue - totalExemptions);
  const rate = COUNTY_RATES[county];
  const annualTax = (taxableValue * rate) / 100;
  const monthlyEscrow = annualTax / 12;
  const effectiveRate = homeValue > 0 ? (annualTax / homeValue) * 100 : 0;
  const nationalTax = (homeValue * NATIONAL_AVERAGE) / 100;
  const dfwPremium = annualTax - nationalTax;

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>🏠 DFW Property Tax Calculator</h1>
          <p style={{ color: '#555', marginTop: 8 }}>Estimate your annual property tax across DFW counties</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ fontWeight: 600, color: '#333′ }}>Home Value: {fmt(homeValue)}</span>
            <input type="range" min={100000} max={2000000} step={10000} value={homeValue}
              onChange={e => setHomeValue(Number(e.target.value))}
              style={{ width: '100%', marginTop: 8, accentColor: '#2563eb' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#888′ }}>
              <span>$100K</span><span>$2M</span>
            </div>
          </label>

          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ fontWeight: 600, color: '#333′ }}>County</span>
            <select value={county} onChange={e => setCounty(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 8, padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 16 }}>
              {Object.keys(COUNTY_RATES).map(c => <option key={c}>{c}</option>)}
            </select>
          </label>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[['🏡 Homestead Exemption (-$40K)', homestead, setHomestead],
              ['👴 Over 65 Exemption (-$10K)', over65, setOver65],
              ['♿ Disabled Exemption (-$10K)', disabled, setDisabled]].map(([label, val, set]: any) => (
              <label key={label as string} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#333', fontSize: 14 }}>
                <input type="checkbox" checked={val} onChange={e => set(e.target.checked)} style={{ accentColor: '#2563eb', width: 16, height: 16 }} />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 20 }}>
          {[['Annual Tax', fmt(annualTax), '#2563eb'],
            ['Monthly Escrow', fmt(monthlyEscrow), '#059669'],
            ['Effective Rate', `${effectiveRate.toFixed(2)}%`, '#7c3aed'],
            ['Total Exemptions', fmt(totalExemptions), '#d97706']].map(([label, value, color]) => (
            <div key={label as string} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: color as string }}>{value}</div>
              <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#333', marginTop: 0 }}>📊 DFW vs National Average</h2>
          <p style={{ color: '#555', fontSize: 14 }}>National avg rate: {NATIONAL_AVERAGE}% → {fmt(nationalTax)}/yr</p>
          <p style={{ color: '#555', fontSize: 14 }}>{county} County rate: {rate}% → {fmt(annualTax)}/yr</p>
          <p style={{ fontWeight: 700, color: dfwPremium > 0 ? '#dc2626′ : '#059669', fontSize: 15 }}>
            {dfwPremium > 0 ? `⚠️ You pay ${fmt(dfwPremium)}/yr more than the national average` : `✅ You save ${fmt(Math.abs(dfwPremium))}/yr vs national average`}
          </p>
          <p style={{ color: '#888', fontSize: 12, marginBottom: 0 }}>* Rates approximate. Consult your county appraisal district for exact figures.</p>
        </div>
      </div>
    </div>
  );
}
