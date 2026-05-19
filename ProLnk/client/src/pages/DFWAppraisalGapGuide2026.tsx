import { useState } from 'react';

export default function DFWAppraisalGapGuide2026() {
  const [offerPrice, setOfferPrice] = useState(400000);
  const [appraisalValue, setAppraisalValue] = useState(380000);
  const [cashReserves, setCashReserves] = useState(25000);

  const gap = offerPrice - appraisalValue;
  const canCover = cashReserves >= gap && gap > 0;
  const gapPct = gap > 0 ? ((gap / offerPrice) * 100).toFixed(1) : '0';

  const decision = gap <= 0 ? 'APPRAISE_OK' : gap <= 5000 ? 'COVER_GAP' : canCover && gap <= 20000 ? 'CONSIDER_COVERING' : 'NEGOTIATE_OR_WALK';
  const decisionColors: Record<string, string> = { APPRAISE_OK: '#34D399', COVER_GAP: '#F5E642', CONSIDER_COVERING: '#F59E0B', NEGOTIATE_OR_WALK: '#EF4444′ };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOMEBUYER GUIDE 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 8px' }}>📉 DFW Appraisal Gap Guide 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW homes move fast but appraisers use 3–6 month old comps. When your offer tops the appraisal, you have options — and some are better than others.</p>

        <div style={{ background: '#1E293B', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>⚙️ Appraisal Gap Calculator</h2>
          {[
            ['Your Offer Price', offerPrice, 200000, 700000, 5000, setOfferPrice],
            ['Home Appraised At', appraisalValue, 180000, 700000, 5000, setAppraisalValue],
            ['Your Cash Reserves', cashReserves, 0, 100000, 1000, setCashReserves],
          ].map(([label, val, min, max, step, setter]) => (
            <div key={label as string} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ color: '#94A3B8', fontSize: 13 }}>{label as string}</label>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>${(val as number).toLocaleString()}</span>
              </div>
              <input type="range" min={min as number} max={max as number} step={step as number} value={val as number}
                onChange={e => (setter as Function)(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
          ))}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
            {[
              ['Appraisal Gap', gap > 0 ? `$${gap.toLocaleString()}` : 'No Gap ✅', gap > 0 ? '#EF4444′ : '#34D399'],
              ['Gap as % of Offer', gap > 0 ? `${gapPct}%` : '—', '#F5E642'],
              ['Can You Cover?', gap <= 0 ? 'N/A' : canCover ? 'Yes ✅' : 'No ❌', canCover || gap <= 0 ? '#34D399′ : '#EF4444'],
            ].map(([k, v, c]) => (
              <div key={k as string} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', textAlign: 'center' }}>
                <div style={{ color: '#64748B', fontSize: 11 }}>{k}</div>
                <div style={{ color: c as string, fontWeight: 700, fontSize: 18 }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ background: `${decisionColors[decision]}22`, border: `2px solid ${decisionColors[decision]}`, borderRadius: 10, padding: 20 }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: decisionColors[decision] }}>
              {decision === 'APPRAISE_OK' && '✅ You\’re in the Clear!'}
              {decision === 'COVER_GAP' && '💰 Cover the Small Gap'}
              {decision === 'CONSIDER_COVERING' && '⚠️ Consider Covering — But Negotiate First'}
              {decision === 'NEGOTIATE_OR_WALK' && '🚨 Negotiate Hard or Walk Away'}
            </div>
            <div style={{ color: '#94A3B8', marginTop: 8, fontSize: 14 }}>
              {decision === 'APPRAISE_OK' && 'Home appraised at or above offer — your lender is happy and you have no gap to cover.'}
              {decision === 'COVER_GAP' && `$${gap.toLocaleString()} is manageable. Paying the gap makes sense if you love the home and the market's competitive.`}
              {decision === 'CONSIDER_COVERING' && 'Ask the seller to reduce price first. If they won\’t budge, weigh the gap against how much you want this home.'}
              {decision === 'NEGOTIATE_OR_WALK' && 'This gap is significant. Try renegotiating the price, challenge the appraisal with recent comps, or protect yourself with an appraisal contingency.'}
            </div>
          </div>
        </div>

        <div style={{ background: '#1E293B', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🛠️ Your 4 Options When There's a Gap</h2>
          {[
            ['1', 'Pay the Difference in Cash', 'Bridge the gap from savings. Only works if you have the reserves — and it\’s worth it to you.', '#34D399'],
            ['2', 'Renegotiate the Price', 'Use the appraisal as leverage to ask seller to reduce. Works best in a slower market.', '#60A5FA'],
            ['3', 'Challenge the Appraisal', 'Provide recent comparable sales to the appraiser. If the comps support it, they can revise upward.', '#F5E642'],
            ['4', 'Walk Away', 'If you have an appraisal contingency, you can exit without losing your earnest money. Know your rights.', '#F87171'],
          ].map(([num, title, desc, color]) => (
            <div key={num} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{ background: color, color: '#0A1628', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>{num}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color }}>{title}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
