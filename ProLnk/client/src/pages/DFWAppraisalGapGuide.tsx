import { useState } from 'react';

export default function DFWAppraisalGapGuide() {
  const [offerPrice, setOfferPrice] = useState('');
  const [likelyAppraisal, setLikelyAppraisal] = useState('');
  const [availableCash, setAvailableCash] = useState('');
  const [competitiveness, setCompetitiveness] = useState('');

  const getAnalysis = () => {
    const offer = parseFloat(offerPrice) || 0;
    const appraisal = parseFloat(likelyAppraisal) || 0;
    const cash = parseFloat(availableCash) || 0;
    if (!offer || !appraisal || !cash || !competitiveness) return null;

    const gap = Math.max(0, offer - appraisal);
    const gapPct = offer > 0 ? ((gap / offer) * 100).toFixed(1) : '0';
    const canCoverFull = cash >= gap;
    const canCoverPartial = cash > 0 && cash < gap;
    const noGap = gap === 0;

    if (noGap) return {
      label: '✅ No Gap — Clean Situation',
      color: '#27ae60',
      gapAmt: 0,
      feasibility: 'Excellent',
      summary: 'Your offer price is at or below likely appraisal — no gap coverage needed. You are in a strong position.',
      strategy: 'Submit offer normally. No appraisal gap clause needed. Focus on other competitive factors.',
      alternatives: [],
      warning: null,
    };

    if (canCoverFull) return {
      label: gap < 10000 ? '✅ Manageable Gap — Cover It to Win' : gap < 25000 ? '⚠️ Significant Gap — Evaluate Carefully' : '🔴 Large Gap — Consider Alternatives',
      color: gap < 10000 ? '#27ae60' : gap < 25000 ? '#e67e22' : '#e74c3c',
      gapAmt: gap,
      feasibility: gap < 10000 ? 'Strong' : gap < 25000 ? 'Feasible' : 'Risky',
      summary: `You would need $${gap.toLocaleString()} (${gapPct}% of offer) in cash at closing above what lender will loan. You have enough cash available.`,
      strategy: competitiveness === 'Hot Seller Market' || competitiveness === 'Moderate Competition'
        ? `Include appraisal gap coverage clause up to $${Math.min(gap, cash).toLocaleString()} in your offer. In DFW hot pockets this is increasingly expected and required to win.`
        : 'In a balanced DFW market you may be able to renegotiate after appraisal comes in. Include gap coverage clause only if competition requires it.',
      alternatives: gap >= 20000 ? ['Renegotiate purchase price after appraisal — seller may accept lower', 'Challenge appraisal with comparable sales data (works 30% of time)', 'Second appraisal from different appraiser'] : [],
      warning: gap >= 30000 ? '⚠️ Covering a $30K+ gap means you may be significantly overpaying. Verify comps before proceeding.' : null,
    };

    if (canCoverPartial) return {
      label: '⚠️ Partial Gap Coverage Available',
      color: '#e67e22',
      gapAmt: gap,
      feasibility: 'Limited',
      summary: `Gap is $${gap.toLocaleString()} but you only have $${cash.toLocaleString()} available. You can offer partial gap coverage of $${cash.toLocaleString()}.`,
      strategy: `Include appraisal gap clause covering up to $${cash.toLocaleString()}. Beyond that, offer renegotiation or exit. Be transparent with your agent about your ceiling.`,
      alternatives: ['Renegotiate with seller on remaining gap above your coverage limit', 'Gift funds from family to increase gap coverage capacity', 'Challenge appraisal — DFW market data is strong, appraisers sometimes miss comps'],
      warning: '⚠️ Make sure your agent knows your exact cash ceiling before submitting offer — surprises kill deals.',
    };

    return {
      label: '🔴 No Cash for Gap Coverage',
      color: '#e74c3c',
      gapAmt: gap,
      feasibility: 'Not Feasible',
      summary: `Gap is $${gap.toLocaleString()} but you have no cash available beyond down payment. You cannot cover this gap.`,
      strategy: 'Do not offer above appraisal value without gap coverage funds. Lower your offer price to what the property is likely to appraise for.',
      alternatives: ['Lower offer to match expected appraisal value', 'Challenge appraisal with comparable DFW sales data', 'Find a property with less competition where gaps are smaller', 'Include appraisal contingency — protects exit if appraisal comes in low'],
      warning: '🔴 Offering above appraisal without gap funds risks losing your earnest money. Never do this.',
    };
  };

  const result = getAnalysis();
  const gap = result?.gapAmt || 0;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>📐</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>DFW Appraisal Gap Guide</h1>
          <p style={{ color: '#aaa', fontSize: '1.05rem' }}>When DFW runs hot, homes sell above appraisal. Know your numbers before you offer.</p>
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.75rem' }}>📚 How Appraisal Gap Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem' }}>
            {[
              { icon: '1️⃣', step: 'Offer Accepted', detail: 'Seller accepts your offer of $450K' },
              { icon: '2️⃣', step: 'Appraisal Ordered', detail: 'Lender orders appraisal — comes in at $430K' },
              { icon: '3️⃣', step: 'Gap Appears', detail: 'Lender will only loan based on $430K — $20K gap' },
              { icon: '4️⃣', step: 'You Must Decide', detail: 'Pay gap in cash, renegotiate, or exit deal' },
              { icon: '5️⃣', step: 'Gap Coverage Clause', detail: 'Pre-agree in offer to cover up to $X above appraisal' },
              { icon: '6️⃣', step: 'DFW Reality', detail: 'Hot areas: gaps of $15K-$50K are common in 2024-2025' },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '0.75rem' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>{item.icon}</div>
                <div style={{ fontWeight: 700, color: '#F5E642', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{item.step}</div>
                <div style={{ fontSize: '0.82rem', color: '#aaa' }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>🧮 Appraisal Gap Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {[
              { label: 'Your Offer Price ($)', value: offerPrice, set: setOfferPrice, placeholder: 'e.g. 475000' },
              { label: 'Likely Appraisal Value ($)', value: likelyAppraisal, set: setLikelyAppraisal, placeholder: 'e.g. 450000' },
              { label: 'Available Cash for Gap ($)', value: availableCash, set: setAvailableCash, placeholder: 'e.g. 20000' },
            ].map((field, i) => (
              <div key={i}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: '0.4rem' }}>{field.label}</label>
                <input type='number' value={field.value} onChange={e => field.set(e.target.value)} placeholder={field.placeholder} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1.5px solid #333', backgroundColor: '#0A1628', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: '0.4rem' }}>DFW Market Conditions</label>
              <select value={competitiveness} onChange={e => setCompetitiveness(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1.5px solid #333', backgroundColor: '#0A1628', color: '#fff', fontSize: '0.95rem' }}>
                <option value=''>Select...</option>
                <option>Hot Seller Market</option>
                <option>Moderate Competition</option>
                <option>Balanced Market</option>
                <option>Buyer Market</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ border: `2px solid ${result.color}`, borderRadius: '10px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ fontWeight: 800, color: result.color, fontSize: '1.05rem' }}>{result.label}</div>
                <div style={{ backgroundColor: result.color + '33', color: result.color, fontWeight: 700, padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem' }}>{result.feasibility}</div>
              </div>
              {gap > 0 && (
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#0A1628', borderRadius: '8px' }}>
                  <div><div style={{ fontSize: '0.75rem', color: '#aaa' }}>Gap Amount</div><div style={{ fontSize: '1.5rem', fontWeight: 800, color: result.color }}>${gap.toLocaleString()}</div></div>
                </div>
              )}
              <div style={{ fontSize: '0.95rem', color: '#ddd', marginBottom: '1rem' }}>{result.summary}</div>
              <div style={{ padding: '0.75rem', backgroundColor: '#0A1628', borderRadius: '8px', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem' }}>📋 Strategy:</div>
                <div style={{ fontSize: '0.9rem', color: '#ccc' }}>{result.strategy}</div>
              </div>
              {result.alternatives.length > 0 && (
                <div style={{ padding: '0.75rem', backgroundColor: '#0A1628', borderRadius: '8px', marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem' }}>💡 Alternatives:</div>
                  {result.alternatives.map((a, i) => <div key={i} style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.25rem' }}>• {a}</div>)}
                </div>
              )}
              {result.warning && <div style={{ padding: '0.75rem', backgroundColor: '#2a1010', borderRadius: '8px', fontSize: '0.9rem', color: '#ff9999' }}>{result.warning}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
