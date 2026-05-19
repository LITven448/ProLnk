import { useState } from 'react';

const countyRates: Record<string, number> = {
  'Dallas County': 0.0217,
  'Tarrant County': 0.0234,
  'Collin County': 0.0185,
  'Denton County': 0.0194,
  'Rockwall County': 0.0201,
  'Ellis County': 0.0198,
};

export default function DFWPropertyTaxExemptionCalc() {
  const [county, setCounty] = useState('');
  const [homeValue, setHomeValue] = useState('');
  const [general, setGeneral] = useState(true);
  const [over65, setOver65] = useState(false);
  const [veteran, setVeteran] = useState(false);
  const [vetPercent, setVetPercent] = useState('0');

  const rate = countyRates[county] ?? 0;
  const val = parseFloat(homeValue) || 0;
  let totalExemption = 0;
  if (general) totalExemption += 100000;
  if (over65) totalExemption += 10000;
  const vetAmount = veteran ? Math.min(val, parseFloat(vetPercent) >= 100 ? val : (parseFloat(vetPercent) / 100) * val) : 0;
  totalExemption += vetAmount;
  const taxableValue = Math.max(0, val - totalExemption);
  const annualTax = taxableValue * rate;
  const fullTax = val * rate;
  const savings = fullTax - annualTax;

  const show = county && val > 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>🧮</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.75rem', marginBottom: '0.5rem' }}>DFW Property Tax Exemption Calculator</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          Stack all exemptions to minimize your DFW property tax bill. The general homestead exemption alone cuts $100,000 off your assessed value — combined with over-65 freeze and veteran disability, savings can exceed $3,000/year.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📍 Your Property</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>DFW County</label>
              <select value={county} onChange={e => setCounty(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 6, background: '#1a2f50', color: '#fff', border: '1px solid #2a4070', fontSize: '1rem' }}>
                <option value=''>-- Select county --</option>
                {Object.keys(countyRates).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Appraised Home Value ($)</label>
              <input type='number' value={homeValue} onChange={e => setHomeValue(e.target.value)} placeholder='e.g. 450000'
                style={{ width: '100%', padding: '0.75rem', borderRadius: 6, background: '#1a2f50', color: '#fff', border: '1px solid #2a4070', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>✅ Applicable Exemptions</h2>
          {[
            { label: '🏠 General Homestead — $100,000 off assessed value (all homeowners)', val: general, set: setGeneral },
            { label: '👴 Over-65 / Disabled — Additional $10,000 + school tax freeze', val: over65, set: setOver65 },
            { label: '🎖️ Veteran Disability Exemption', val: veteran, set: setVeteran },
          ].map(item => (
            <label key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', cursor: 'pointer' }}>
              <input type='checkbox' checked={item.val} onChange={e => item.set(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: '#F5E642′ }} />
              <span style={{ color: '#cbd5e1′ }}>{item.label}</span>
            </label>
          ))}
          {veteran && (
            <div style={{ marginTop: '0.75rem' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>VA Disability Rating (%)</label>
              <select value={vetPercent} onChange={e => setVetPercent(e.target.value)}
                style={{ padding: '0.75rem', borderRadius: 6, background: '#1a2f50', color: '#fff', border: '1px solid #2a4070', fontSize: '1rem' }}>
                {['0','10','20','30','40','50','60','70','80','90','100'].map(p => <option key={p} value={p}>{p}% {p === '100′ ? '(Full exemption)' : ''}</option>)}
              </select>
            </div>
          )}
        </div>

        {show && (
          <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📊 Your Estimated Savings</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { label: 'Total Exemption', value: `$${totalExemption.toLocaleString()}` },
                { label: 'Taxable Value', value: `$${taxableValue.toLocaleString()}` },
                { label: 'Annual Tax Without Exemptions', value: `$${Math.round(fullTax).toLocaleString()}` },
                { label: 'Annual Tax With Exemptions', value: `$${Math.round(annualTax).toLocaleString()}` },
              ].map(item => (
                <div key={item.label} style={{ background: '#1a2f50', borderRadius: 8, padding: '1rem' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{item.label}</div>
                  <div style={{ color: '#F5E642', fontSize: '1.2rem', fontWeight: 700 }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1rem', background: '#1a3a1a', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
              <div style={{ color: '#4ade80', fontSize: '0.9rem' }}>Annual Savings</div>
              <div style={{ color: '#4ade80', fontSize: '2rem', fontWeight: 700 }}>${Math.round(savings).toLocaleString()}</div>
            </div>
            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.8rem' }}>
              ⚠️ Apply by April 30 for current year. File with your county appraisal district. No fee required.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
