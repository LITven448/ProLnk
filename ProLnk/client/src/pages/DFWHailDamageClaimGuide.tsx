import { useState } from 'react';

const steps = [
  {
    phase: 'Step 1',
    title: 'Document Before Touching Anything',
    icon: '📸',
    detail: 'Photograph every damaged area from multiple angles. Include close-ups of dents, cracks, and missing shingles. Date-stamp your photos. Save the storm date from weather apps or NOAA.',
    risk: 'Disturbing damage before documentation can void the claim.',
  },
  {
    phase: 'Step 2',
    title: 'Review Your Policy Deductible',
    icon: '📋',
    detail: 'DFW policies often have a separate "wind/hail deductible" — typically 1-2% of dwelling value. On a $400K home that\’s $4,000–$8,000 out of pocket before insurance pays.',
    risk: 'Missing the hail deductible is the #1 surprise for homeowners.',
  },
  {
    phase: 'Step 3',
    title: 'Call Your Insurance Company',
    icon: '📞',
    detail: 'File within 30 days of the storm in most TX policies. Report the storm date, describe visible damage. Get your claim number immediately.',
    risk: 'Waiting too long is grounds for denial in TX.',
  },
  {
    phase: 'Step 4',
    title: 'Adjuster Visit',
    icon: '🔍',
    detail: 'The adjuster inspects within 15 days (TX law). Have your roofer present if possible — they catch damage adjusters miss. Get a copy of the adjuster\’s report.',
    risk: 'Adjusters undercount damage. A second opinion is your right.',
  },
  {
    phase: 'Step 5',
    title: 'Review the Estimate & Negotiate',
    icon: '📊',
    detail: 'Compare the adjuster\’s estimate to your roofer\’s. Gaps of 20-40% are common. Submit your roofer\’s estimate as a counter. Document all communications.',
    risk: 'Accepting the first estimate often leaves money on the table.',
  },
  {
    phase: 'Step 6',
    title: 'Payout & Repair',
    icon: '💰',
    detail: 'Initial payment is ACV (Actual Cash Value). After repair completion, you receive the depreciation holdback to reach RCV (Replacement Cost Value). Do not skip this step — it\’s often $2,000–$5,000.',
    risk: 'Many homeowners forget to file for the depreciation release.',
  },
];

export default function DFWHailDamageClaimGuide() {
  const [deductible, setDeductible] = useState<string>('4000');
  const [damage, setDamage] = useState<string>('8500');
  const [activeStep, setActiveStep] = useState<number>(0);

  const ded = parseFloat(deductible) || 0;
  const dmg = parseFloat(damage) || 0;
  const netPayout = Math.max(0, dmg - ded);
  const shouldFile = netPayout > 1500;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>DFW INSURANCE GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
          Filing a Hail Damage Roof Claim in DFW
        </h1>
        <p style={{ color: '#9AA3B4', fontSize: 16, marginBottom: 12 }}>
          Step-by-step playbook for North Texas homeowners. Average DFW hail claim: <strong style={{ color: '#F5E642′ }}>$8,500</strong>.
        </p>
        <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
          {['⏱️ Avg timeline: 3-6 weeks', '💸 Avg payout: $8,500', '📍 TX law: adjuster in 15 days'].map(tag => (
            <span key={tag} style={{ background: '#111E33', borderRadius: 20, padding: '6px 14px', fontSize: 13, color: '#9AA3B4′ }}>{tag}</span>
          ))}
        </div>

        <div style={{ background: '#111E33', borderRadius: 16, padding: 24, marginBottom: 28 }}>
          <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: 16, fontSize: 18 }}>💡 File vs. Pay Out of Pocket Calculator</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#6B7A99', display: 'block', marginBottom: 6 }}>Your Wind/Hail Deductible ($)</label>
              <input
                type="number"
                value={deductible}
                onChange={e => setDeductible(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E2D45', borderRadius: 8, color: '#fff', fontSize: 16, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#6B7A99', display: 'block', marginBottom: 6 }}>Estimated Damage ($)</label>
              <input
                type="number"
                value={damage}
                onChange={e => setDamage(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E2D45', borderRadius: 8, color: '#fff', fontSize: 16, boxSizing: 'border-box' }}
              />
            </div>
          </div>
          <div style={{
            background: shouldFile ? '#0D2A1A' : '#2A1A0D',
            border: `1px solid ${shouldFile ? '#1A5C35' : '#5C3A1A'}`,
            borderRadius: 12, padding: '16px 20px'
          }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: shouldFile ? '#4ADE80′ : '#FBBF24', marginBottom: 4 }}>
              {shouldFile ? '✅ File the Claim' : '⚠️ Consider Paying Out of Pocket'}
            </div>
            <div style={{ color: '#C5CAD8', fontSize: 15 }}>
              {shouldFile
                ? `Estimated insurance payout: $${netPayout.toLocaleString()} after your deductible. Worth filing.`
                : `Net payout would be $${netPayout.toLocaleString()} — may not be worth a claim that raises your premium.`}
            </div>
          </div>
        </div>

        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 Step-by-Step Claim Process</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {steps.map((s, i) => (
            <button key={i} onClick={() => setActiveStep(i)} style={{
              padding: '8px 14px', borderRadius: 8, border: activeStep === i ? '2px solid #F5E642′ : '2px solid #1E2D45',
              background: activeStep === i ? '#F5E642′ : '#111E33',
              color: activeStep === i ? '#0A1628′ : '#9AA3B4', fontWeight: 700, fontSize: 13, cursor: ’pointer',
            }}>{s.phase}</button>
          ))}
        </div>
        <div style={{ background: '#111E33', borderRadius: 16, padding: 24 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>{steps[activeStep].icon}</div>
          <h3 style={{ color: '#F5E642', fontWeight: 700, fontSize: 20, marginBottom: 10 }}>{steps[activeStep].title}</h3>
          <p style={{ color: '#C5CAD8', lineHeight: 1.6, marginBottom: 14 }}>{steps[activeStep].detail}</p>
          <div style={{ background: '#2A1A0D', border: '1px solid #5C3A1A', borderRadius: 8, padding: '12px 16px' }}>
            <span style={{ color: '#FBBF24', fontWeight: 700 }}>⚠️ Watch out: </span>
            <span style={{ color: '#C5CAD8′ }}>{steps[activeStep].risk}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
