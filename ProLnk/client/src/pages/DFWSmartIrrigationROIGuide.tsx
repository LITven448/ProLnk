import { useState } from 'react';

const systems = ['Manual Hose Watering', 'Basic Timer (no weather)', 'Older Smart Controller (5+ years)', 'Rachio 3 Already Installed', 'Rain Bird Smart Controller'];
const yardSizes = ['Small (under 3,000 sqft lawn)', 'Medium (3,000-8,000 sqft lawn)', 'Large (8,000-15,000 sqft lawn)', 'Estate (15,000+ sqft lawn)'];
const cities = ['Dallas', 'Frisco', 'Plano', 'Allen', 'McKinney', 'Prosper', 'Celina', 'Fort Worth', 'Arlington', 'Irving', 'Garland', 'Richardson'];

const waterRates: Record<string, number> = { Dallas: 6.8, Frisco: 7.2, Plano: 6.5, Allen: 6.9, McKinney: 6.3, Prosper: 7.0, Celina: 7.4, 'Fort Worth': 5.9, Arlington: 6.1, Irving: 6.3, Garland: 6.0, Richardson: 6.7 };
const rebates: Record<string, { amount: string; url: string }> = {
  Dallas: { amount: '$100', url: 'dallas water' }, Frisco: { amount: '$150', url: 'frisco water efficiency' }, Plano: { amount: '$75', url: 'plano water rebate' },
  Allen: { amount: '$100', url: 'allen water conservation' }, McKinney: { amount: '$100', url: 'mckinney utilities' }, Prosper: { amount: '$75', url: 'prosper town water' },
  Fort Worth: { amount: '$150', url: 'fort worth water' }, Arlington: { amount: '$75', url: 'arlington water rebate' }, Frisco: { amount: '$150', url: 'frisco' },
};

function calcROI(system: string, yard: string, city: string) {
  const gallonsPerMonth: Record<string, number> = { 'Small (under 3,000 sqft lawn)': 8000, 'Medium (3,000-8,000 sqft lawn)': 18000, 'Large (8,000-15,000 sqft lawn)': 35000, 'Estate (15,000+ sqft lawn)': 65000 };
  const gallons = gallonsPerMonth[yard] || 18000;
  const rate = waterRates[city] || 6.5;
  const savings = system.includes('Manual') ? 0.45 : system.includes('Basic Timer') ? 0.38 : system.includes('Older') ? 0.30 : 0.10;
  const monthlySavingsGallons = gallons * savings;
  const monthlySavingsDollars = (monthlySavingsGallons / 1000) * rate;
  const annualSavings = monthlySavingsDollars * 7;
  const installCost = system.includes('Manual') || system.includes('Basic') || system.includes('Older') ? 250 : 80;
  const payback = annualSavings > 0 ? (installCost / annualSavings * 12).toFixed(1) : 'N/A';
  const rebate = rebates[city] || { amount: '$75-100 (check city website)', url: 'your city water utility' };
  return { annualSavings: annualSavings.toFixed(0), monthlySavings: monthlySavingsDollars.toFixed(0), savingsPct: Math.round(savings * 100), installCost, payback, rebate, gallonsSaved: Math.round(monthlySavingsGallons * 7).toLocaleString() };
}

export default function DFWSmartIrrigationROIGuide() {
  const [system, setSystem] = useState('');
  const [yard, setYard] = useState('');
  const [city, setCity] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calcROI> | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>💧📊</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Smart Irrigation ROI Calculator</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW's Stage 1-3 water restrictions, clay soil, and extreme summer heat make smart irrigation ROI exceptional.
          Rachio and similar systems typically pay back in 6-18 months in DFW. Calculate your specific savings.
        </p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '12px 16px', marginBottom: 32, fontWeight: 600 }}>
          💰 DFW Average: Smart irrigation saves 30-50% on summer water bills. Most DFW cities offer $75-$150 rebates on smart controllers.
        </div>

        <div style={{ display: 'grid', gap: 20, marginBottom: 28 }}>
          {[
            { label: 'Current Irrigation System', value: system, setter: setSystem, options: systems },
            { label: 'Lawn/Yard Size', value: yard, setter: setYard, options: yardSizes },
            { label: 'DFW City', value: city, setter: setCity, options: cities },
          ].map(field => (
            <div key={field.label}>
              <label style={{ color: '#F5E642', display: 'block', marginBottom: 8, fontWeight: 600 }}>{field.label}</label>
              <select value={field.value} onChange={e => field.setter(e.target.value)}
                style={{ width: '100%', padding: '12px', background: '#1E2D45', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value=''>Select...</option>
                {field.options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        <button onClick={() => { if (system && yard && city) setResult(calcROI(system, yard, city)); }}
          style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 32, width: '100%' }}>
          💧 Calculate My DFW Water Savings
        </button>

        {result && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              {[
                { label: 'Annual Water Savings', value: `$${result.annualSavings}`, sub: `${result.savingsPct}% reduction` },
                { label: 'Monthly Savings', value: `$${result.monthlySavings}`, sub: 'During 7-month irrigation season' },
                { label: 'Payback Period', value: `${result.payback} months`, sub: `Install cost ~$${result.installCost}` },
                { label: 'Gallons Saved/Season', value: result.gallonsSaved, sub: 'Supports DFW water restrictions' },
              ].map(stat => (
                <div key={stat.label} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>{stat.label}</div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 22 }}>{stat.value}</div>
                  <div style={{ color: '#64748B', fontSize: 12 }}>{stat.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>💰 {city} City Rebate: {result.rebate.amount}</div>
              <div style={{ color: '#CBD5E1', fontSize: 14 }}>Check {result.rebate.url} for current rebate program details. Apply after installation with receipt.</div>
            </div>
          </div>
        )}

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🏆 Why Smart Irrigation ROI is Exceptional in DFW</h3>
          {['DFW irrigation season runs April-October (7 months) — 2x longer than northern states', 'Clay soil over-absorbs then repels water — smart controllers adjust for DFW clay behavior', 'Stage 1-3 water restrictions fine non-compliance — smart systems keep you automatically compliant', 'NTMWD (North Texas Municipal Water District) future rate increases make savings compound over time', 'Rachio\’s Weather Intelligence uses DFW NWS data to skip watering before/after rain events'].map((fact, i) => (
            <div key={i} style={{ color: '#CBD5E1', marginBottom: 10, paddingLeft: 16, borderLeft: '2px solid #F5E642', lineHeight: 1.5 }}>{fact}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
