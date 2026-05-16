import { useState } from 'react';

export default function DFWFHAVsConventionalGuide2026() {
  const [creditScore, setCreditScore] = useState(700);
  const [downPct, setDownPct] = useState(5);
  const [homePrice, setHomePrice] = useState(385000);

  const down = homePrice * (downPct / 100);
  const loan = homePrice - down;

  const fhaRate = creditScore >= 720 ? 6.75 : creditScore >= 680 ? 7.0 : 7.25;
  const convRate = creditScore >= 760 ? 6.5 : creditScore >= 720 ? 6.75 : creditScore >= 680 ? 7.0 : 7.5;

  const mip = (loan * 0.0085) / 12;
  const convPmi = downPct < 20 ? (loan * 0.008) / 12 : 0;

  const fhaPayment = (loan * (fhaRate / 100 / 12)) / (1 - Math.pow(1 + fhaRate / 100 / 12, -360)) + mip;
  const convPayment = (loan * (convRate / 100 / 12)) / (1 - Math.pow(1 + convRate / 100 / 12, -360)) + convPmi;

  const fhaEligible = downPct >= 3.5;
  const convEligible = downPct >= 3;

  const recommendation = creditScore >= 720 && downPct >= 10 ? 'CONVENTIONAL' : creditScore < 660 || downPct < 5 ? 'FHA' : 'EITHER';
  const recColor = recommendation === 'CONVENTIONAL' ? '#34D399' : recommendation === 'FHA' ? '#60A5FA' : '#F5E642';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOMEBUYER GUIDE 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 8px' }}>🏦 FHA vs Conventional Loans in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>FHA = lower credit ok but MIP never drops. Conventional = PMI drops at 80% LTV. The right choice depends on your credit score and down payment.</p>

        <div style={{ background: '#1E293B', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>⚙️ Your Loan Comparison</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            {[['Credit Score', creditScore, 580, 850, 10, setCreditScore], ['Down Payment %', downPct, 3, 25, 0.5, setDownPct], ['Home Price $K', homePrice / 1000, 200, 700, 5, (v: number) => setHomePrice(v * 1000)]].map(([label, val, min, max, step, setter]) => (
              <div key={label as string}>
                <label style={{ color: '#94A3B8', fontSize: 12, display: 'block', marginBottom: 6 }}>{label as string}</label>
                <input type="range" min={min as number} max={max as number} step={step as number} value={val as number} onChange={e => (setter as Function)(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642' }} />
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{label === 'Down Payment %' ? `${val}%` : label === 'Home Price $K' ? `$${val}K` : val}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { type: 'FHA Loan', eligible: fhaEligible, payment: fhaPayment, rate: fhaRate, extra: mip, extraLabel: 'MIP/mo', extraNote: 'Lasts full 30 yrs', color: '#60A5FA' },
              { type: 'Conventional', eligible: convEligible, payment: convPayment, rate: convRate, extra: convPmi, extraLabel: 'PMI/mo', extraNote: downPct >= 20 ? 'No PMI!' : 'Drops at 80% LTV', color: '#34D399' },
            ].map(({ type, eligible, payment, rate, extra, extraLabel, extraNote, color }) => (
              <div key={type} style={{ background: '#0A1628', borderRadius: 10, padding: 20, border: `2px solid ${eligible ? color : '#374151'}`, opacity: eligible ? 1 : 0.5 }}>
                <div style={{ color, fontWeight: 800, fontSize: 16, marginBottom: 12 }}>{type}</div>
                {!eligible && <div style={{ color: '#EF4444', fontSize: 12, marginBottom: 8 }}>↑ Increase down payment</div>}
                <div style={{ marginBottom: 8 }}><span style={{ color: '#64748B', fontSize: 12 }}>Rate: </span><span style={{ color: '#fff', fontWeight: 700 }}>{rate}%</span></div>
                <div style={{ marginBottom: 8 }}><span style={{ color: '#64748B', fontSize: 12 }}>P&I + Insurance: </span><span style={{ color, fontWeight: 700 }}>${Math.round(payment).toLocaleString()}/mo</span></div>
                <div><span style={{ color: '#64748B', fontSize: 12 }}>{extraLabel}: </span><span style={{ color: '#fff', fontWeight: 600 }}>${Math.round(extra).toLocaleString()}/mo</span> <span style={{ color: '#64748B', fontSize: 11 }}>({extraNote})</span></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: `${recColor}22`, border: `2px solid ${recColor}`, borderRadius: 12, padding: 20, marginBottom: 24, textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 22, color: recColor }}>
            {recommendation === 'CONVENTIONAL' ? '✅ Go Conventional' : recommendation === 'FHA' ? '🔵 FHA is Your Path' : '⚡ Both Work — Compare Closely'}
          </div>
          <div style={{ color: '#94A3B8', marginTop: 8, fontSize: 14 }}>
            {recommendation === 'CONVENTIONAL' ? 'Your credit + down payment qualify for better conventional terms. PMI drops off at 80% LTV.'
              : recommendation === 'FHA' ? 'FHA\'s lower credit threshold and flexible underwriting makes this the smart choice.'
              : 'Run both scenarios with a DFW lender — the rate difference could go either way.'}
          </div>
        </div>

        <div style={{ background: '#1E293B', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📋 Quick Comparison Table</h2>
          {[['Min Credit Score', '580 (500 w/ 10% down)', '620 (better rates 740+)'],
            ['Min Down Payment', '3.5% (10% if 500-579)', '3% (standard), 5% typical'],
            ['Mortgage Insurance', 'MIP — full loan term', 'PMI — drops at 80% LTV'],
            ['Seller Contribution', 'Up to 6% of price', 'Up to 3-9% based on down'],
            ['Loan Limit (DFW)', '$524,225 (2026)', '$806,500 conforming limit'],
          ].map(([feat, fha, conv]) => (
            <div key={feat} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 8, marginBottom: 8, fontSize: 13 }}>
              <div style={{ color: '#64748B' }}>{feat}</div>
              <div style={{ color: '#60A5FA' }}>{fha}</div>
              <div style={{ color: '#34D399' }}>{conv}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
