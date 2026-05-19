import { useState } from 'react';

const ZONES = [
  { area: 'South Dallas', detail: 'Census tracts near I-45 corridor; focus on mixed-use redevelopment and multifamily.' },
  { area: 'West Fort Worth', detail: 'Near Loop 820 and Jacksboro Hwy; active QOF investment in industrial conversion.' },
  { area: 'Parts of Arlington', detail: 'Selected tracts between UTA and downtown Arlington; retail-to-residential plays.' },
];

const BENEFITS = [
  { icon: '⏳', label: 'Capital Gains Deferral', detail: 'Original gain deferred until Dec 31, 2026 (or fund exit, if earlier).' },
  { icon: '📉', label: 'Step-Up in Basis', detail: '10% basis step-up after 5 years; 15% after 7 years held in the QOF.' },
  { icon: '🚫', label: 'Gain Elimination', detail: 'New appreciation in the QOF is tax-free if held 10+ years — potentially zero federal tax on exit.' },
];

export default function DFWOpportunityZoneGuide() {
  const [investAmount, setInvestAmount] = useState('');
  const [years, setYears] = useState('10');
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    const inv = parseFloat(investAmount.replace(/,/g, '')) || 0;
    const yrs = parseInt(years) || 10;
    if (inv < 10000) {
      setResult('Enter an investment amount of at least $10,000.');
      return;
    }
    const capitalGainsTaxRate = 0.238;
    const traditionalTax = inv * capitalGainsTaxRate;
    const basisStepUp = yrs >= 7 ? 0.15 : yrs >= 5 ? 0.10 : 0;
    const deferredTaxSavings = traditionalTax * basisStepUp;
    const assumedGrowthRate = 0.08;
    const futureValue = inv * Math.pow(1 + assumedGrowthRate, yrs);
    const newGain = futureValue - inv;
    const qozSavings = yrs >= 10 ? newGain * capitalGainsTaxRate : 0;
    const totalSavings = traditionalTax + deferredTaxSavings + qozSavings;
    setResult(
      `Estimated total tax benefit: $${totalSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })} ` +
      `(deferred gain tax: $${traditionalTax.toLocaleString('en-US', { maximumFractionDigits: 0 })} + ` +
      `basis step-up: $${deferredTaxSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })} + ` +
      `new gain elimination: $${qozSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })})`
    );
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#e8eaf6', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🗺️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>DFW Opportunity Zone Guide</h1>
          <p style={{ color: '#a0aec0', fontSize: '1.05rem' }}>Defer and eliminate capital gains by investing in Qualified Opportunity Zones across Dallas-Fort Worth</p>
        </div>
        <div style={{ background: '#111d35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.15rem' }}>📍 DFW QOZ Locations</h2>
          {ZONES.map((z) => (
            <div key={z.area} style={{ marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #1e2d45' }}>
              <span style={{ fontWeight: 700, color: '#fff' }}>{z.area}: </span>
              <span style={{ color: '#a0aec0' }}>{z.detail}</span>
            </div>
          ))}
        </div>
        <div style={{ background: '#111d35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.15rem' }}>💰 Tax Benefits</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {BENEFITS.map((b) => (
              <div key={b.label} style={{ flex: '1 1 200px', background: '#0A1628', borderRadius: 10, padding: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{b.icon}</div>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.25rem' }}>{b.label}</div>
                <div style={{ color: '#a0aec0', fontSize: '0.9rem' }}>{b.detail}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#111d35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.15rem' }}>🏢 How to Invest</h2>
          <p style={{ color: '#a0aec0', lineHeight: 1.7 }}>Invest capital gains into a Qualified Opportunity Fund (QOF) within 180 days of realizing the gain. QOFs deploy capital into QOZ real estate or businesses. DFW-focused QOFs are active in South Dallas multifamily, West Fort Worth industrial, and mixed-use development near DART stations. Consult a tax attorney before investing — not all QOFs are equal in structure or track record.</p>
        </div>
        <div style={{ background: '#111d35', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.15rem' }}>📊 QOZ Tax Savings Calculator</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem', color: '#a0aec0' }}>Capital Gain to Invest ($)</label>
              <input value={investAmount} onChange={(e) => setInvestAmount(e.target.value)} placeholder="e.g. 250000" style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2d3748', background: '#0A1628', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: 1, minWidth: 140 }}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem', color: '#a0aec0' }}>Hold Period (years)</label>
              <select value={years} onChange={(e) => setYears(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2d3748', background: '#0A1628', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }}>
                {['3','5','7','10','15'].map((y) => <option key={y} value={y}>{y} years</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
            Estimate Savings
          </button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8, color: '#F5E642', fontWeight: 600, fontSize: '0.95rem' }}>
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
