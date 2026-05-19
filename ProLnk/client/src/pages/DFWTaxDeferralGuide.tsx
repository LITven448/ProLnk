import { useState } from 'react';

export default function DFWTaxDeferralGuide() {
  const [salePrice, setSalePrice] = useState(500000);
  const [originalBasis, setOriginalBasis] = useState(200000);
  const [depreciation, setDepreciation] = useState(40000);

  const adjustedBasis = originalBasis - depreciation;
  const capitalGain = salePrice - adjustedBasis;
  const federalTax = capitalGain * 0.20;
  const stateTax = capitalGain * 0.0;
  const depreciationRecapture = depreciation * 0.25;
  const totalTaxWithout = federalTax + depreciationRecapture;
  const replacementNeeded = salePrice;

  return (
    <div style={{ background: '#F8FAFF', minHeight: '100vh', color: '#1A2E4A', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 12, fontSize: 13, color: '#1A6DD8', fontWeight: 700 }}>💼 DFW REAL ESTATE INVESTOR SERIES</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 8, lineHeight: 1.2, color: '#0A1628′ }}>
          DFW 1031 Exchange Guide
        </h1>
        <p style={{ color: '#6B7E99', fontSize: 17, marginBottom: 40 }}>
          Defer capital gains taxes on the sale of your DFW investment property by rolling proceeds into a like-kind replacement — indefinitely.
        </p>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#0A1628′ }}>📋 1031 Exchange Rules at a Glance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { rule: '45 Days', desc: 'Identify replacement property after closing' },
              { rule: '180 Days', desc: 'Close on replacement property' },
              { rule: 'Like-Kind', desc: 'Must be real property held for investment' },
              { rule: 'Equal or Greater', desc: 'Replacement value ≥ sale price to fully defer' },
              { rule: 'QI Required', desc: 'Funds must flow through a Qualified Intermediary' },
              { rule: 'Boot = Taxable', desc: 'Any cash you take out is taxable that year' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#F0F5FF', borderRadius: 12, padding: 16, borderLeft: '3px solid #1A6DD8′ }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#1A6DD8', marginBottom: 4 }}>{item.rule}</div>
                <div style={{ fontSize: 13, color: '#6B7E99′ }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#0A1628′ }}>⚠️ DFW-Specific Challenges</h2>
          <p style={{ color: '#4A5E7A', lineHeight: 1.7, marginBottom: 16 }}>
            DFW's active investor market creates real competition for replacement properties. With thousands of investors looking 
            for deals simultaneously, the 45-day identification window can be stressful. You're allowed to identify up to 3 properties — 
            use all three slots.
          </p>
          <p style={{ color: '#4A5E7A', lineHeight: 1.7 }}>
            Many DFW investors use 1031 exchanges to move from single-family to small multifamily, or from DFW to out-of-state 
            markets for better cash flow. Texas has no state income tax, which is a major advantage — you only owe federal capital gains.
          </p>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#0A1628′ }}>🏦 Qualified Intermediary Requirement</h2>
          <div style={{ background: '#FFF8E1', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5A623′ }}>
            <p style={{ color: '#5A4010', lineHeight: 1.7, margin: 0, fontSize: 15 }}>
              <strong>Critical:</strong> You cannot touch the sale proceeds yourself. A Qualified Intermediary (QI) — an independent third party — 
              must hold the funds between closing on the sold property and purchasing the replacement. If proceeds hit your account, 
              the exchange is disqualified and taxes are due immediately. Budget $800–$1,500 for QI fees on a typical DFW exchange.
            </p>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#0A1628′ }}>🧮 1031 Tax Savings Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
            {[
              { label: 'Sale Price', value: salePrice, min: 100000, max: 2000000, step: 25000, set: setSalePrice, fmt: (v: number) => `$${v.toLocaleString()}` },
              { label: 'Original Cost Basis', value: originalBasis, min: 50000, max: 1000000, step: 10000, set: setOriginalBasis, fmt: (v: number) => `$${v.toLocaleString()}` },
              { label: 'Total Depreciation Taken', value: depreciation, min: 0, max: 200000, step: 5000, set: setDepreciation, fmt: (v: number) => `$${v.toLocaleString()}` },
            ].map((item, i) => (
              <div key={i}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#6B7E99′ }}>{item.label}</label>
                <input type="range" min={item.min} max={item.max} step={item.step} value={item.value}
                  onChange={e => item.set(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#1A6DD8′ }} />
                <div style={{ color: '#1A6DD8', fontWeight: 700 }}>{item.fmt(item.value)}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { label: 'Adjusted Basis', value: `$${adjustedBasis.toLocaleString()}` },
              { label: 'Capital Gain', value: `$${capitalGain.toLocaleString()}` },
              { label: 'Federal Cap Gains Tax (20%)', value: `$${Math.round(federalTax).toLocaleString()}` },
              { label: 'Depreciation Recapture (25%)', value: `$${Math.round(depreciationRecapture).toLocaleString()}` },
              { label: 'Total Tax WITHOUT 1031', value: `$${Math.round(totalTaxWithout).toLocaleString()}`, highlight: true, bad: true },
              { label: 'Tax Deferred WITH 1031', value: `$${Math.round(totalTaxWithout).toLocaleString()} saved`, highlight: true },
              { label: 'Replacement Property Needed', value: `≥ $${replacementNeeded.toLocaleString()}` },
            ].map((item: any, i) => (
              <div key={i} style={{ background: item.highlight ? (item.bad ? '#FFF0F0′ : '#F0FFF4') : '#F8FAFF', borderRadius: 12, padding: 16, border: item.highlight ? `2px solid ${item.bad ? '#E53935' : '#22C55E'}` : ’none' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: item.highlight ? (item.bad ? '#E53935′ : '#16A34A') : '#0A1628', marginBottom: 4 }}>{item.value}</div>
                <div style={{ fontSize: 12, color: '#6B7E99′ }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

