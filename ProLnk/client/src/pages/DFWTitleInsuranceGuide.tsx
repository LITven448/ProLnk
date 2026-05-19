import { useState } from 'react';

const purchasePrices = [
  { id: 'u300', label: 'Under $300K', val: 250000 },
  { id: '300to500', label: '$300K–$500K', val: 400000 },
  { id: '500to750', label: '$500K–$750K', val: 625000 },
  { id: '750to1m', label: '$750K–$1M', val: 875000 },
  { id: 'over1m', label: 'Over $1M', val: 1200000 },
];

function calcTitleCost(priceId: string) {
  const priceMap: Record<string, number> = { u300: 250000, '300to500': 400000, '500to750': 625000, '750to1m': 875000, over1m: 1200000 };
  const val = priceMap[priceId] || 400000;
  const ownerBase = val <= 100000 ? 100000 * 0.006 : 100000 * 0.006 + (val - 100000) * 0.00575;
  const lenderBase = val * 0.003;
  return {
    ownerPolicy: Math.round(ownerBase / 50) * 50,
    lenderPolicy: Math.round(lenderBase / 50) * 50,
    total: Math.round((ownerBase + lenderBase) / 50) * 50,
    simultaneous: Math.round((ownerBase + lenderBase * 0.7) / 50) * 50,
  };
}

export default function DFWTitleInsuranceGuide() {
  const [selectedPrice, setSelectedPrice] = useState('');
  const [showResult, setShowResult] = useState(false);
  const costs = selectedPrice ? calcTitleCost(selectedPrice) : null;

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a1a' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: '#0A1628', color: '#F5E642', display: 'inline-block', padding: '6px 14px', borderRadius: 4, fontSize: 13, marginBottom: 16 }}>
          📜 DFW TITLE INSURANCE
        </div>
        <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 8 }}>Title Insurance in DFW — What You Are Actually Buying</h1>
        <p style={{ fontSize: 17, color: '#555', marginBottom: 36 }}>
          Title insurance is a one-time premium that protects you from ownership disputes and hidden liens. In Texas, who pays is negotiable — and that negotiation can save you thousands.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
          <div style={{ background: '#fff', border: '2px solid #0A1628', borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>🏠 Owner Policy</h3>
            <p style={{ color: '#444', fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>Protects you — the buyer — for as long as you or your heirs own the property. Covers the full purchase price.</p>
            <div style={{ background: '#F0F4FF', borderRadius: 8, padding: 12, fontSize: 13 }}>
              <strong>In Texas:</strong> Seller traditionally pays this — but it is negotiable. Always ask.
            </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>🏦 Lender Policy</h3>
            <p style={{ color: '#444', fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>Protects your mortgage lender up to the loan amount. Required by virtually all lenders. Decreases as you pay down your mortgage.</p>
            <div style={{ background: '#FFF3E0', borderRadius: 8, padding: 12, fontSize: 13 }}>
              <strong>In Texas:</strong> Buyer typically pays this — though you can negotiate it into the deal.
            </div>
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🛡️ What Title Insurance Covers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              'Hidden liens from prior owners or contractors',
              'Ownership disputes and competing claims',
              'Errors in public records or prior deeds',
              'Forged documents in chain of title',
              'Undisclosed heirs claiming ownership',
              'Boundary disputes and encroachments',
              'Fraud or misrepresentation in prior sale',
              'Unpaid property taxes from prior owner',
            ].map(item => (
              <div key={item} style={{ background: '#F0F4FF', borderRadius: 8, padding: '10px 14px', fontSize: 14 }}>✅ {item}</div>
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>⚡ Key Facts About Title Insurance</h2>
          <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
            <li><strong>One-time premium</strong> — paid at closing, no ongoing payments</li>
            <li>Owner policy protects you <strong>permanently</strong> — even decades after purchase</li>
            <li>When purchased simultaneously, lender policy gets a significant <strong>simultaneous issue discount</strong></li>
            <li>Title company conducts a <strong>title search</strong> before issuing — but some issues are undetectable in public records</li>
            <li>DFW has had rapid development and many ownership transfers — title issues do occur</li>
          </ul>
        </div>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: 28, marginBottom: 28, color: '#fff' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🧮 Title Insurance Cost Estimator</h2>
          <p style={{ color: '#ccc', marginBottom: 20 }}>Enter your home purchase price to estimate title insurance costs and see negotiation tips</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {purchasePrices.map(p => (
              <button key={p.id} onClick={() => { setSelectedPrice(p.id); setShowResult(false); }}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: selectedPrice === p.id ? '#F5E642′ : '#444', background: selectedPrice === p.id ? '#F5E642' : ’transparent', color: selectedPrice === p.id ? '#0A1628′ : '#fff', fontWeight: 600, cursor: ’pointer' }}>
                {p.label}
              </button>
            ))}
          </div>
          <button onClick={() => setShowResult(true)} disabled={!selectedPrice}
            style={{ background: selectedPrice ? '#F5E642′ : '#333', color: '#0A1628', border: ’none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: selectedPrice ? 'pointer' : 'not-allowed', fontSize: 16 }}>
            Estimate Costs →
          </button>
          {showResult && costs && (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                {[
                  { label: 'Owner Policy (est.)', val: `$${costs.ownerPolicy.toLocaleString()}` },
                  { label: 'Lender Policy (est.)', val: `$${costs.lenderPolicy.toLocaleString()}` },
                  { label: 'Total If Purchased Separately', val: `$${costs.total.toLocaleString()}` },
                  { label: 'With Simultaneous Issue Discount', val: `$${costs.simultaneous.toLocaleString()}` },
                ].map(item => (
                  <div key={item.label} style={{ background: 'rgba(245,230,66,0.1)', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#ccc', fontSize: 13, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>{item.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 16, fontSize: 14 }}>
                <strong style={{ color: '#F5E642′ }}>Negotiation Tips:</strong>
                <ul style={{ paddingLeft: 18, marginTop: 8, color: '#ccc', lineHeight: 1.9 }}>
                  <li>Ask seller to pay the owner policy — common in Texas and saves you the larger premium</li>
                  <li>Ensure both policies are issued simultaneously to get the discount</li>
                  <li>In a buyer market, ask seller to cover both policies as a closing cost concession</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>📌 DFW Title Insurance Notes</h2>
          <ul style={{ paddingLeft: 20, lineHeight: 2, color: '#444′ }}>
            <li>Texas title insurance rates are set by the state — all companies charge the same base rate</li>
            <li>Title companies compete on service and closing speed, not price — ask your agent for a referral</li>
            <li>New construction in DFW — verify builder has clear title before closing</li>
            <li>Enhanced owner policies are available and worth considering for older homes with complex ownership history</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
