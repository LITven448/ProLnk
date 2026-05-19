import { useState } from 'react';

export default function DFWCapitalGainsTaxGuide2026() {
  const [purchasePrice, setPurchasePrice] = useState('300000');
  const [salePrice, setSalePrice] = useState('500000');
  const [yearsOwned, setYearsOwned] = useState('5');
  const [filingStatus, setFilingStatus] = useState('married');

  const purchase = parseFloat(purchasePrice) || 0;
  const sale = parseFloat(salePrice) || 0;
  const years = parseFloat(yearsOwned) || 0;
  const gain = sale - purchase;
  const exclusion = filingStatus === 'married' ? 500000 : 250000;
  const qualifies = years >= 2;
  const taxableGain = qualifies ? Math.max(0, gain - exclusion) : gain;
  const federalTax = taxableGain > 0 ? (years >= 1 ? taxableGain * 0.15 : taxableGain * 0.22) : 0;

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>💰</div>
          <h1 style={{ fontSize: '1.8rem', color: '#F5E642', margin: '0.5rem 0' }}>DFW Capital Gains on Home Sale 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Texas has NO state capital gains tax — major advantage over CA or NY</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '👫', label: 'Married Exclusion', val: '$500,000', sub: 'Lived in 2 of last 5 yrs' },
            { icon: '🧍', label: 'Single Exclusion', val: '$250,000', sub: 'Lived in 2 of last 5 yrs' },
            { icon: '🤠', label: 'TX State Tax', val: '$0', sub: 'No state capital gains' },
            { icon: '🔄', label: '1031 Exchange', val: 'Defer all gains', sub: 'Investment properties only' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginTop: 2 }}>{s.val}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginTop: 0 }}>🧮 Tax Liability Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {[
              { label: 'Purchase Price ($)', value: purchasePrice, setter: setPurchasePrice },
              { label: 'Sale Price ($)', value: salePrice, setter: setSalePrice },
              { label: 'Years Owned', value: yearsOwned, setter: setYearsOwned },
            ].map((f) => (
              <div key={f.label}>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: 4 }}>{f.label}</div>
                <input type="number" value={f.value} onChange={(e) => f.setter(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: '0.9rem', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: 4 }}>Filing Status</div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {['single', 'married'].map((s) => (
                  <button key={s} onClick={() => setFilingStatus(s)} style={{ flex: 1, padding: '0.5rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', background: filingStatus === s ? '#F5E642' : '#1e3a5f', color: filingStatus === s ? '#0A1628' : '#fff' }}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: '1rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Total Gain</span>
              <span style={{ fontWeight: 700, color: gain >= 0 ? '#22c55e' : '#ef4444' }}>{fmt(gain)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Exclusion ({qualifies ? 'qualifies' : 'does not qualify'})</span>
              <span style={{ fontWeight: 700, color: '#F5E642' }}>{qualifies ? fmt(Math.min(exclusion, gain)) : '$0'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>TX State Tax</span>
              <span style={{ fontWeight: 700, color: '#22c55e' }}>$0</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1e3a5f', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
              <span style={{ fontWeight: 700 }}>Est. Federal Tax Owed</span>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: federalTax > 0 ? '#ef4444' : '#22c55e' }}>{fmt(federalTax)}</span>
            </div>
            {!qualifies && <div style={{ color: '#f97316', fontSize: '0.75rem', marginTop: '0.5rem' }}>⚠️ Must live in home 2 of last 5 years to qualify for exclusion</div>}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', border: '1px solid #F5E642', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem' }}>⚠️</div>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0.5rem 0 0.25rem' }}>Consult a CPA Before Selling</p>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>This is an estimate only. Depreciation recapture, home office deductions, and cost basis adjustments can significantly change your liability.</p>
        </div>
      </div>
    </div>
  );
}

