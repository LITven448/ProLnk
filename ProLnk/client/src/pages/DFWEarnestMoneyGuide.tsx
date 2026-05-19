import { useState } from 'react';

const prices = [
  { id: 'u300', label: 'Under $300K', val: 300000 },
  { id: '300to500', label: '$300K–$500K', val: 400000 },
  { id: '500to750', label: '$500K–$750K', val: 625000 },
  { id: 'over750', label: 'Over $750K', val: 800000 },
];

const markets = [
  { id: 'buyers', label: 'Buyer Market (slower)' },
  { id: 'balanced', label: 'Balanced Market' },
  { id: 'competitive', label: 'Competitive Market' },
  { id: 'hot', label: 'Hot Market (multiple offers)' },
];

function getRecommendation(price: string, market: string) {
  const priceMap: Record<string, number> = { u300: 300000, '300to500': 400000, '500to750': 625000, over750: 800000 };
  const base = priceMap[price] || 400000;
  let pct = 0.01;
  let minAmt = 2000;
  if (market === 'competitive') { pct = 0.015; minAmt = 5000; }
  if (market === 'hot') { pct = 0.02; minAmt = 7500; }
  const rec = Math.max(minAmt, Math.round(base * pct / 500) * 500);
  const low = Math.round(base * 0.01 / 500) * 500;
  const high = Math.round(base * 0.02 / 500) * 500;
  return {
    recommended: rec.toLocaleString(),
    range: `$${low.toLocaleString()} – $${high.toLocaleString()}`,
    risk: market === 'hot' ? 'High — low earnest money may cause seller to pick competing offer' : market === 'competitive' ? 'Medium — match or exceed 1% to stay competitive' : 'Low — standard 1% is acceptable in this market',
  };
}

export default function DFWEarnestMoneyGuide() {
  const [price, setPrice] = useState('');
  const [market, setMarket] = useState('');
  const [showResult, setShowResult] = useState(false);
  const result = price && market ? getRecommendation(price, market) : null;

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a1a' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: '#0A1628', color: '#F5E642', display: 'inline-block', padding: '6px 14px', borderRadius: 4, fontSize: 13, marginBottom: 16 }}>
          💰 DFW EARNEST MONEY
        </div>
        <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 8 }}>Earnest Money in DFW — What You Need to Know</h1>
        <p style={{ fontSize: 17, color: '#555', marginBottom: 36 }}>
          Earnest money is your deposit that signals serious intent. In DFW competitive markets, the amount can make or break your offer.
        </p>
        <div style={{ background: '#fff', border: '2px solid #0A1628', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 DFW Earnest Money Basics</h2>
          <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
            <li>Typical range in DFW: <strong>$2,000–$10,000</strong> or roughly <strong>1% of purchase price</strong></li>
            <li>Hot DFW submarkets (Frisco, Southlake, Highland Park): sellers may expect <strong>1.5–2%</strong></li>
            <li>Held by the <strong>title company</strong> — not the seller, not the agent</li>
            <li>Applied toward your closing costs or down payment at closing</li>
            <li>Due within <strong>3 business days</strong> of contract execution in Texas</li>
          </ul>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
          <div style={{ background: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: '#1b5e20′ }}>✅ When You Keep It</h3>
            <ul style={{ paddingLeft: 18, lineHeight: 1.9, fontSize: 14, color: '#2e7d32′ }}>
              <li>Terminate during option period</li>
              <li>Financing falls through with financing contingency intact</li>
              <li>Seller fails to close per contract terms</li>
              <li>Seller makes material misrepresentations</li>
            </ul>
          </div>
          <div style={{ background: '#ffebee', border: '1px solid #ef9a9a', borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: '#b71c1c' }}>❌ When You Lose It</h3>
            <ul style={{ paddingLeft: 18, lineHeight: 1.9, fontSize: 14, color: '#c62828′ }}>
              <li>Terminate after option period with no valid contingency</li>
              <li>Breach of contract terms</li>
              <li>Waived financing contingency and financing falls through</li>
              <li>Walk away with no documented reason</li>
            </ul>
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🛡️ The Financing Contingency — Your Protection</h2>
          <p style={{ lineHeight: 1.7, color: '#444', marginBottom: 14 }}>
            Including a financing contingency in your offer protects your earnest money if your loan falls through. In DFW hot markets, some buyers waive this to compete — understand the risk before doing so.
          </p>
          <div style={{ background: '#FFF3E0', borderLeft: '4px solid #FF9800', padding: '14px 18px', borderRadius: 6 }}>
            <strong>DFW Warning:</strong> Some listing agents will pressure buyers to waive the financing contingency. Only do this if you have a strong pre-approval and your lender confirms you can close without it.
          </div>
        </div>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: 28, marginBottom: 28, color: '#fff' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🧮 Earnest Money Recommendation</h2>
          <p style={{ color: '#ccc', marginBottom: 20 }}>Home price plus market competitiveness → recommended amount and risk assessment</p>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 10 }}>Home Purchase Price</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {prices.map(p => (
                <button key={p.id} onClick={() => { setPrice(p.id); setShowResult(false); }}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: price === p.id ? '#F5E642′ : '#444', background: price === p.id ? '#F5E642' : ’transparent', color: price === p.id ? '#0A1628′ : '#fff', fontWeight: 600, cursor: ’pointer' }}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 10 }}>Market Competitiveness</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {markets.map(m => (
                <button key={m.id} onClick={() => { setMarket(m.id); setShowResult(false); }}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: market === m.id ? '#F5E642′ : '#444', background: market === m.id ? '#F5E642' : ’transparent', color: market === m.id ? '#0A1628′ : '#fff', fontWeight: 600, cursor: ’pointer' }}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!price || !market}
            style={{ background: price && market ? '#F5E642′ : '#333', color: '#0A1628', border: ’none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: price && market ? 'pointer' : 'not-allowed', fontSize: 16 }}>
            Get Recommendation →
          </button>
          {showResult && result && (
            <div style={{ marginTop: 24, background: 'rgba(245,230,66,0.1)', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 10, padding: 20 }}>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Recommended Amount: </span>${result.recommended}</div>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Typical DFW Range: </span>{result.range}</div>
              <div style={{ color: '#ccc', fontSize: 14 }}>⚠️ Risk Level: {result.risk}</div>
            </div>
          )}
        </div>
        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>📌 How to Get Earnest Money Back If Deal Falls Through</h2>
          <ol style={{ paddingLeft: 20, lineHeight: 2, color: '#444′ }}>
            <li>Both buyer and seller sign a release form (called a Release of Earnest Money)</li>
            <li>Title company releases funds once both parties sign</li>
            <li>If seller refuses to sign, dispute goes to escrow arbitration</li>
            <li>Keep all documentation — inspection reports, loan denial letters, contingency notices</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
