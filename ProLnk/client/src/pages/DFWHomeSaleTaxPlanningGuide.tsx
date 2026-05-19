import { useState } from 'react';

export default function DFWHomeSaleTaxPlanningGuide() {
  const [gain, setGain] = useState('');
  const [filingStatus, setFilingStatus] = useState('single');
  const [yearsLived, setYearsLived] = useState('');
  const [result, setResult] = useState<null | { exclusion: number; taxableGain: number; estimatedTax: number; strategies: string[] }>(null);

  const calculate = () => {
    const g = parseFloat(gain) || 0;
    const y = parseFloat(yearsLived) || 0;
    const exclusion = y >= 2 ? (filingStatus === 'married' ? 500000 : 250000) : 0;
    const taxableGain = Math.max(0, g - exclusion);
    const rate = taxableGain > 500000 ? 0.20 : taxableGain > 89250 ? 0.15 : 0;
    const estimatedTax = taxableGain * rate;
    const strategies: string[] = [];
    if (y < 2) strategies.push('Live in home 2+ years to qualify for primary residence exclusion');
    if (taxableGain > 0) strategies.push('Add qualifying home improvement costs to your cost basis (reduces taxable gain)');
    if (taxableGain > 0) strategies.push('Time sale to straddle tax years if near income thresholds');
    if (taxableGain > 50000) strategies.push('Consult a CPA about installment sale structure');
    if (filingStatus === 'single' && taxableGain > 0) strategies.push('If married, filing jointly doubles exclusion to $500K');
    strategies.push('Keep all improvement receipts — new roof, HVAC, kitchen, baths all add to basis');
    setResult({ exclusion, taxableGain, estimatedTax, strategies });
  };

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', color: '#1A2332', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#1A6B4A', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>💰 DFW HOME SELLER GUIDE</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#0A1628′ }}>DFW Home Sale Tax Planning Guide</h1>
        <p style={{ color: '#4A5568', marginBottom: '2rem' }}>DFW home values surged 40-60% since 2020. Before you sell, understand how much of your gain is tax-free — and how to keep more.</p>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#0A1628', marginBottom: '1rem' }}>🏠 Primary Residence Exclusion</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: '#F0FFF4', border: '1px solid #9AE6B4', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1A6B4A' }}>$250K</div>
              <div style={{ color: '#4A5568', fontSize: '0.85rem' }}>Tax-free gain — Single filer</div>
            </div>
            <div style={{ background: '#F0FFF4', border: '1px solid #9AE6B4', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1A6B4A' }}>$500K</div>
              <div style={{ color: '#4A5568', fontSize: '0.85rem' }}>Tax-free gain — Married filing jointly</div>
            </div>
          </div>
          <div style={{ background: '#FFFBEB', border: '1px solid #F6E05E', borderRadius: 8, padding: '1rem' }}>
            <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>⚠️ Qualification rules:</div>
            <div style={{ color: '#4A5568', fontSize: '0.9rem', lineHeight: 1.6 }}>• Owned the home for at least 2 of the last 5 years<br />• Lived in it as your primary residence for at least 2 of the last 5 years<br />• Have not used this exclusion in the last 2 years</div>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#0A1628', marginBottom: '1rem' }}>🧮 Tax Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#4A5568', marginBottom: '0.4rem', fontSize: '0.85rem' }}>Estimated gain (sale price minus purchase price)</label>
              <input type="number" value={gain} onChange={e => setGain(e.target.value)} placeholder="e.g. 350000″ style={{ width: '100%', padding: '0.7rem', border: '1px solid #CBD5E0', borderRadius: 8, fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#4A5568', marginBottom: '0.4rem', fontSize: '0.85rem' }}>Years lived as primary residence</label>
              <input type="number" value={yearsLived} onChange={e => setYearsLived(e.target.value)} placeholder="e.g. 4″ style={{ width: '100%', padding: '0.7rem', border: '1px solid #CBD5E0', borderRadius: 8, fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#4A5568', marginBottom: '0.4rem', fontSize: '0.85rem' }}>Filing status</label>
            <select value={filingStatus} onChange={e => setFilingStatus(e.target.value)} style={{ width: '100%', padding: '0.7rem', border: '1px solid #CBD5E0', borderRadius: 8, fontSize: '1rem' }}>
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
          <button onClick={calculate} style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>Calculate Tax Exposure</button>
          {result && (
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                {([['Tax-Free Exclusion', '$' + result.exclusion.toLocaleString(), '#F0FFF4', '#1A6B4A'], ['Taxable Gain', '$' + result.taxableGain.toLocaleString(), '#FFF5F5', '#C53030'], ['Est. Federal Tax', '$' + Math.round(result.estimatedTax).toLocaleString(), '#FFFBEB', '#B7791F']] as [string,string,string,string][]).map(([label, val, bg, color]) => (
                  <div key={label} style={{ background: bg, borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.4rem', color }}>{val}</div>
                    <div style={{ color: '#4A5568', fontSize: '0.8rem' }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#F7FAFC', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.75rem' }}>💡 Strategies to reduce your tax bill:</div>
                {result.strategies.map((s, i) => <div key={i} style={{ padding: '0.4rem 0', borderBottom: '1px solid #E2E8F0', fontSize: '0.9rem', color: '#4A5568′ }}>✅ {s}</div>)}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#0A1628', marginBottom: '1rem' }}>📁 Records to Keep</h2>
          {[['🏗', 'Improvement Receipts', 'New roof, HVAC, kitchen remodel, additions — all add to cost basis and reduce gain'], ['📄', 'Closing Documents', 'Original HUD-1/CD from purchase — your cost basis starts here'], ['💳', 'Permit Records', 'City permits prove improvements were done — required for larger projects'], ['🧾', 'HOA Special Assessments', 'Some assessments that improve the property may add to basis']].map(([icon, title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid #E2E8F0′ }}>
              <span style={{ fontSize: '1.2rem' }}>{icon}</span>
              <div><div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{title}</div><div style={{ color: '#4A5568', fontSize: '0.85rem' }}>{desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
