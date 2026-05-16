import { useState } from 'react';

export default function DFWCashVsFinancedGuide() {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [availableCash, setAvailableCash] = useState('');
  const [competitiveness, setCompetitiveness] = useState('');

  const getRecommendation = () => {
    const p = parseFloat(purchasePrice) || 0;
    const c = parseFloat(availableCash) || 0;
    if (!p || !c || !competitiveness) return null;
    const cashPct = c / p;
    const isFullCash = cashPct >= 1;
    const isHighDown = cashPct >= 0.4;
    const isModDown = cashPct >= 0.2;

    if (isFullCash) return {
      label: '💵 All-Cash Offer — Maximum Competitive Advantage',
      score: '10/10 Strength',
      color: '#27ae60',
      main: 'Full cash offer is the strongest possible in DFW. Sellers skip appraisal risk, financing conditions, and timeline uncertainty.',
      actions: ['Submit proof of funds with offer', 'Offer 14-day close for maximum appeal', 'Still do inspection — you have nothing to lose', 'Negotiate price more aggressively — cash earns 1-3% discount often'],
      alternatives: [],
    };
    if (isHighDown && competitiveness !== 'Slow Market') return {
      label: '💪 Large Down Payment — Highly Competitive',
      score: '8/10 Strength',
      color: '#2980b9',
      main: `With ${Math.round(cashPct * 100)}% down, your financed offer rivals cash. DFW sellers see large down payments as near-certain to close.`,
      actions: ['Get pre-underwritten approval (not just pre-qual)', 'Offer short inspection period (5-7 days)', 'Limit contingency negotiation demands', 'Offer appraisal gap coverage up to $15K if market is hot'],
      alternatives: ['Bridge loan: access home equity from current property', 'Portfolio loan: asset-based lending, faster close timeline'],
    };
    if (isModDown) return {
      label: '📋 Standard Down — Make Your Financing Look Strong',
      score: competitiveness === 'Hot Seller Market' ? '5/10 Strength' : '7/10 Strength',
      color: '#e67e22',
      main: `${Math.round(cashPct * 100)}% down is workable but you need to compensate with approval quality and offer terms in DFW's competitive pockets.`,
      actions: ['Full underwriting approval required — not just pre-qual letter', 'Use a DFW-based lender who closes in 14-21 days', 'Consider escalation clause to compete on price', 'Offer appraisal gap coverage of $5K-$10K'],
      alternatives: ['DFW fast lenders: Movement Mortgage, CrossCountry, local credit unions', 'Bridge financing if you own a home already', 'Negotiate seller-paid buydown to reduce rate vs price'],
    };
    return {
      label: '⚠️ Low Down Payment — Creative Strategy Required',
      score: '4/10 Strength in DFW',
      color: '#e74c3c',
      main: `Under 20% down in a competitive DFW market is challenging but not impossible. You need to stand out in every other way.`,
      actions: ['FHA/VA loans: DFW sellers know these take longer — get a strong agent', 'FHA: Get underwriting fully done before offering', 'VA: Include your certificate of eligibility with offer', 'Compete on speed and certainty, not price'],
      alternatives: ['Down payment assistance programs: Texas TSAHC, My First Texas Home', 'Seller-paid closing costs to preserve cash for down payment', 'Consider slower DFW submarkets: Mesquite, Desoto, Garland — less competition'],
    };
  };

  const rec = getRecommendation();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>💵</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>Cash vs Financed Guide — DFW</h1>
          <p style={{ color: '#aaa', fontSize: '1.05rem' }}>Cash wins in DFW — but financed buyers can still compete. Here's how.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Cash Offer', score: '95%', detail: 'Acceptance rate when competing', color: '#27ae60' },
            { label: 'Pre-Underwritten', score: '80%', detail: 'Acceptance rate vs. standard pre-qual', color: '#2980b9' },
            { label: 'Standard Pre-Qual', score: '55%', detail: 'Acceptance rate in hot DFW pockets', color: '#e67e22' },
            { label: 'Low Down FHA', score: '35%', detail: 'Acceptance rate vs cash in hot areas', color: '#e74c3c' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#1a2744', borderRadius: '10px', padding: '1rem', borderLeft: `4px solid ${item.color}` }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: item.color }}>{item.score}</div>
              <div style={{ fontWeight: 700, color: '#fff', marginBottom: '0.2rem' }}>{item.label}</div>
              <div style={{ fontSize: '0.85rem', color: '#aaa' }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>🔧 Your Competitive Offer Strategy</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: '0.4rem' }}>Purchase Price ($)</label>
              <input type='number' value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)} placeholder='e.g. 450000' style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1.5px solid #333', backgroundColor: '#0A1628', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: '0.4rem' }}>Available Cash ($)</label>
              <input type='number' value={availableCash} onChange={e => setAvailableCash(e.target.value)} placeholder='e.g. 90000' style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1.5px solid #333', backgroundColor: '#0A1628', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: '0.4rem' }}>DFW Market Competitiveness</label>
              <select value={competitiveness} onChange={e => setCompetitiveness(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1.5px solid #333', backgroundColor: '#0A1628', color: '#fff', fontSize: '0.95rem' }}>
                <option value=''>Select...</option>
                <option>Hot Seller Market</option>
                <option>Moderate Competition</option>
                <option>Balanced Market</option>
                <option>Slow Market</option>
              </select>
            </div>
          </div>
          {rec && (
            <div style={{ border: `2px solid ${rec.color}`, borderRadius: '10px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: rec.color }}>{rec.label}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#F5E642', backgroundColor: '#0A1628', padding: '0.3rem 0.7rem', borderRadius: '20px' }}>{rec.score}</div>
              </div>
              <div style={{ fontSize: '0.95rem', color: '#ddd', marginBottom: '1rem' }}>{rec.main}</div>
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#aaa', marginBottom: '0.4rem' }}>ACTION PLAN:</div>
                {rec.actions.map((a, i) => <div key={i} style={{ fontSize: '0.9rem', color: '#e0e0e0', marginBottom: '0.3rem', paddingLeft: '0.5rem' }}>• {a}</div>)}
              </div>
              {rec.alternatives.length > 0 && (
                <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem' }}>💡 Financing Alternatives:</div>
                  {rec.alternatives.map((a, i) => <div key={i} style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.25rem' }}>• {a}</div>)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
