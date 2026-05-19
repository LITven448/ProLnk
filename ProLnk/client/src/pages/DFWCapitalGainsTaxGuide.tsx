import { useState } from 'react';

const RATES = { single: 250000, married: 500000 };
const LTCG_BRACKETS = [
  { max: 47025, rate: 0, label: '0%' },
  { max: 518900, rate: 0.15, label: '15%' },
  { max: Infinity, rate: 0.20, label: '20%' },
];

export default function DFWCapitalGainsTaxGuide() {
  const [profit, setProfit] = useState('');
  const [owned, setOwned] = useState('');
  const [lived, setLived] = useState('');
  const [filing, setFiling] = useState('married');
  const [wasRental, setWasRental] = useState('no');
  const [income, setIncome] = useState('');
  const [result, setResult] = useState<null | any>(null);

  function estimate() {
    const gain = parseFloat(profit);
    const ownYrs = parseFloat(owned);
    const liveYrs = parseFloat(lived);
    const inc = parseFloat(income) || 100000;
    if (!gain) return;

    const exclusionLimit = filing === 'married' ? RATES.married : RATES.single;
    const meetsOwnership = ownYrs >= 2;
    const meetsUse = liveYrs >= 2;
    const eligible = meetsOwnership && meetsUse;
    const exclusion = eligible ? Math.min(gain, exclusionLimit) : 0;
    const taxableGain = Math.max(0, gain - exclusion);
    const bracket = LTCG_BRACKETS.find(b => inc <= b.max) || LTCG_BRACKETS[2];
    const taxOwed = taxableGain * bracket.rate;
    const niit = (inc > 200000 && filing === 'single') || (inc > 250000 && filing === 'married') ? taxableGain * 0.038 : 0;
    const deprecRecapture = wasRental === 'yes' ? gain * 0.02 * 0.25 : 0;
    setResult({ eligible, exclusion, taxableGain, taxOwed, niit, deprecRecapture, bracket, meetsOwnership, meetsUse });
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏛️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '0 0 8px' }}>DFW Capital Gains Tax Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>Texas has no state income tax — but federal capital gains still apply. Know your exclusion and estimate what you'll owe before you sell.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 20, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginTop: 0 }}>📋 Primary Residence Exclusion Rules</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              { icon: '👤', label: 'Single filers', desc: 'Exclude up to $250,000 in gains' },
              { icon: '👫', label: 'Married filing jointly', desc: 'Exclude up to $500,000 in gains' },
              { icon: '📅', label: 'Ownership test', desc: 'Must own home ≥2 of last 5 years' },
              { icon: '🏠', label: 'Use test', desc: 'Must live there ≥2 of last 5 years' },
              { icon: '⚡', label: 'Exceptions', desc: 'Partial exclusion for job relocation, health, unforeseen events' },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', borderBottom: '1px solid #F1F5F9′ }}>
                <span style={{ fontSize: 18 }}>{r.icon}</span>
                <div><span style={{ fontWeight: 600, fontSize: 13, color: '#0A1628′ }}>{r.label}: </span><span style={{ fontSize: 13, color: '#64748B' }}>{r.desc}</span></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 17, fontWeight: 700, marginTop: 0 }}>🧮 Estimate Your Tax</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>Estimated Profit / Gain ($)</label>
              <input type="number" value={profit} onChange={e => setProfit(e.target.value)} placeholder="e.g. 380000″ style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>Years Owned</label>
                <input type="number" value={owned} onChange={e => setOwned(e.target.value)} placeholder="e.g. 4″ style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>Years Lived There</label>
                <input type="number" value={lived} onChange={e => setLived(e.target.value)} placeholder="e.g. 3″ style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>Filing Status</label>
                <select value={filing} onChange={e => setFiling(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14 }}>
                  <option value="married">Married Jointly</option>
                  <option value="single">Single</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>Was It a Rental?</label>
                <select value={wasRental} onChange={e => setWasRental(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14 }}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>Annual Household Income ($) <span style={{ color: '#94A3B8', fontWeight: 400 }}>for tax bracket</span></label>
              <input type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="e.g. 150000″ style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={estimate} style={{ marginTop: 18, background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer', width: '100%' }}>Estimate My Tax →</button>
        </div>

        {result && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
            <div style={{ marginBottom: 16, padding: 14, background: result.eligible ? '#F0FDF4′ : '#FEF2F2', borderRadius: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: result.eligible ? '#166534′ : '#991B1B' }}>{result.eligible ? '✅ Exclusion Eligible' : '⚠️ Exclusion Not Fully Met'}</div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>Ownership: {result.meetsOwnership ? '✅' : '❌'} · Use: {result.meetsUse ? '✅' : '❌'}</div>
            </div>
            {[
              { label: 'Exclusion Applied', value: `$${result.exclusion.toLocaleString()}` },
              { label: 'Taxable Gain', value: `$${result.taxableGain.toLocaleString()}` },
              { label: `Federal LT Cap Gains (${result.bracket.label})`, value: `$${Math.round(result.taxOwed).toLocaleString()}` },
              { label: 'NIIT (3.8% if high income)', value: `$${Math.round(result.niit).toLocaleString()}` },
              { label: 'Depreciation Recapture (est.)', value: `$${Math.round(result.deprecRecapture).toLocaleString()}` },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9', fontSize: 13 }}>
                <span style={{ color: '#64748B' }}>{row.label}</span>
                <span style={{ fontWeight: 700, color: '#0A1628′ }}>{row.value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: 15, fontWeight: 800 }}>
              <span style={{ color: '#0A1628′ }}>Estimated Total Tax</span>
              <span style={{ color: '#DC2626′ }}>${Math.round(result.taxOwed + result.niit + result.deprecRecapture).toLocaleString()}</span>
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>Texas has no state income tax — a significant DFW advantage vs. CA, NY, IL sellers.</div>
          </div>
        )}
      </div>
    </div>
  );
}
