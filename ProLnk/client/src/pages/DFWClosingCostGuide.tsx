import { useState } from 'react';

export default function DFWClosingCostGuide() {
  const [salePrice, setSalePrice] = useState('');
  const [buyerPaysTitlePolicy, setBuyerPaysTitlePolicy] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const calculate = () => {
    if (salePrice) setShowResult(true);
  };

  const getResult = () => {
    const price = parseFloat(salePrice.replace(/[^0-9.]/g, ''));
    if (!price) return null;

    const agentCommission = price * 0.055;
    const titlePolicy = buyerPaysTitlePolicy ? 0 : price * 0.006;
    const surveyEst = 650;
    const taxProration = price * 0.018 / 2;
    const otherSeller = price * 0.005;
    const totalSellerCosts = agentCommission + titlePolicy + surveyEst + taxProration + otherSeller;
    const sellerNet = price - totalSellerCosts;

    const buyerLenderFees = 3200;
    const buyerTitleIns = buyerPaysTitlePolicy ? price * 0.006 : price * 0.003;
    const prepaids = price * 0.015;
    const buyerOther = 800;
    const totalBuyerCosts = buyerLenderFees + buyerTitleIns + prepaids + buyerOther;

    return { price, agentCommission, titlePolicy, surveyEst, taxProration, otherSeller, totalSellerCosts, sellerNet, buyerLenderFees, buyerTitleIns, prepaids, buyerOther, totalBuyerCosts };
  };

  const r = showResult ? getResult() : null;
  const fmt = (n: number) => '$' + Math.round(n).toLocaleString();

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a2e' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>💰</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0A1628', marginBottom: 12 }}>
            DFW Home Closing Costs Guide
          </h1>
          <p style={{ fontSize: 18, color: '#555', maxWidth: 620, margin: '0 auto' }}>
            Who pays what at closing in Texas — seller costs, buyer costs, and how to negotiate.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 48 }}>
          <div style={{ backgroundColor: '#fef3c7', borderRadius: 16, padding: 28, border: '1px solid #fde68a' }}>
            <h2 style={{ color: '#92400e', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏠 Seller Closing Costs</h2>
            {[
              { label: 'Agent Commission', value: '5–6% of sale price', note: 'Split between listing and buyer agent' },
              { label: 'Owner\’s Title Policy', value: '~0.5–0.6% of price', note: 'Negotiable — sometimes buyer pays in DFW' },
              { label: 'Survey', value: '$500–$800', note: 'Required by most lenders' },
              { label: 'Tax Proration', value: 'Varies', note: 'Seller pays taxes through closing date' },
              { label: 'HOA Resale Certificate', value: '$200–$500', note: 'If in HOA' },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #fde68a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontWeight: 600, color: '#1a1a2e', fontSize: 14 }}>{item.label}</span>
                  <span style={{ color: '#92400e', fontWeight: 700, fontSize: 14 }}>{item.value}</span>
                </div>
                <div style={{ fontSize: 12, color: '#78716c' }}>{item.note}</div>
              </div>
            ))}
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>~8–10% of sale price</div>
              <div style={{ color: '#ccc', fontSize: 12 }}>Typical total seller costs in DFW</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#f0f9ff', borderRadius: 16, padding: 28, border: '1px solid #bae6fd' }}>
            <h2 style={{ color: '#0c4a6e', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔑 Buyer Closing Costs</h2>
            {[
              { label: 'Lender Origination Fees', value: '$2,500–$4,000', note: 'Varies by loan type and lender' },
              { label: 'Title Insurance (Lender\’s)', value: '~0.3% of loan', note: 'Required by all lenders' },
              { label: 'Prepaid Interest', value: '15–30 days', note: 'Interest paid through first payment date' },
              { label: 'Homeowners Insurance', value: '$1,500–$3,000', note: 'Full year upfront at closing' },
              { label: 'Property Tax Escrow', value: '2–3 months', note: 'Escrowed for future tax payments' },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #bae6fd' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontWeight: 600, color: '#1a1a2e', fontSize: 14 }}>{item.label}</span>
                  <span style={{ color: '#0c4a6e', fontWeight: 700, fontSize: 14 }}>{item.value}</span>
                </div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{item.note}</div>
              </div>
            ))}
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>~2–4% of purchase price</div>
              <div style={{ color: '#ccc', fontSize: 12 }}>Typical total buyer costs in DFW</div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#f0fdf4', borderRadius: 16, padding: 28, marginBottom: 48, border: '1px solid #bbf7d0′ }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#166534', marginBottom: 12 }}>🤝 TX Title Policy: A Negotiating Chip</h2>
          <p style={{ color: '#15803d', fontSize: 14, lineHeight: 1.7 }}>
            In Texas, the Owner's Title Policy is negotiable — unlike many states where it’s customary for sellers to pay. In DFW’s competitive market, buyers sometimes agree to pay it to make their offer more attractive to sellers. It’s worth <strong>~0.5–0.6% of the sale price</strong>, so on a $450K home, that’s $2,250–$2,700.
          </p>
        </div>

        <div style={{ backgroundColor: '#0A1628', borderRadius: 16, padding: 32, marginBottom: 32, color: '#fff' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🧮 Net Proceeds & Cash-to-Close Estimator</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#ccc', fontSize: 14 }}>Sale Price ($)</label>
              <input type="number" placeholder="e.g. 450000″ value={salePrice} onChange={e => { setSalePrice(e.target.value); setShowResult(false); }}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, backgroundColor: '#1a2a40', color: '#fff', border: '1px solid #2a3a50', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <input type="checkbox" checked={buyerPaysTitlePolicy} onChange={e => { setBuyerPaysTitlePolicy(e.target.checked); setShowResult(false); }}
                  style={{ width: 18, height: 18, cursor: 'pointer' }} />
                <span style={{ color: '#ccc', fontSize: 14 }}>Buyer pays Owner's Title Policy<br /><span style={{ fontSize: 12, color: '#9aa5b4' }}>(negotiated in contract)</span></span>
              </label>
            </div>
          </div>

          <button onClick={calculate} disabled={!salePrice}
            style={{ padding: '12px 32px', backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: salePrice ? 'pointer' : 'not-allowed', opacity: salePrice ? 1 : 0.5 }}>
            Calculate Net Proceeds & Buyer Cash
          </button>

          {r && (
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div style={{ backgroundColor: '#1a2a40', borderRadius: 12, padding: 20 }}>
                <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🏠 Seller Breakdown</h3>
                {[
                  { label: 'Sale Price', value: fmt(r.price), highlight: false },
                  { label: 'Agent Commission (5.5%)', value: `-${fmt(r.agentCommission)}`, highlight: false },
                  { label: "Owner's Title Policy", value: r.buyerPaysTitlePolicy ? 'Buyer pays' : `-${fmt(r.titlePolicy)}`, highlight: false },
                  { label: 'Survey', value: `-${fmt(r.surveyEst)}`, highlight: false },
                  { label: 'Tax Proration (est.)', value: `-${fmt(r.taxProration)}`, highlight: false },
                  { label: 'Other Costs', value: `-${fmt(r.otherSeller)}`, highlight: false },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid #2a3a50′ }}>
                    <span style={{ fontSize: 13, color: '#9aa5b4′ }}>{row.label}</span>
                    <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                  <span style={{ fontWeight: 700, color: '#4ade80′ }}>Estimated Net</span>
                  <span style={{ fontWeight: 800, color: '#4ade80', fontSize: 18 }}>{fmt(r.sellerNet)}</span>
                </div>
              </div>
              <div style={{ backgroundColor: '#1a2a40', borderRadius: 12, padding: 20 }}>
                <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🔑 Buyer Cash-to-Close</h3>
                {[
                  { label: 'Lender Origination Fees', value: fmt(r.buyerLenderFees) },
                  { label: 'Title Insurance (Lender)', value: fmt(r.buyerTitleIns) },
                  { label: "Owner's Title Policy", value: r.buyerPaysTitlePolicy ? fmt(r.price * 0.006) : 'Seller pays' },
                  { label: 'Prepaids & Escrow', value: fmt(r.prepaids) },
                  { label: 'Other Fees', value: fmt(r.buyerOther) },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid #2a3a50′ }}>
                    <span style={{ fontSize: 13, color: '#9aa5b4′ }}>{row.label}</span>
                    <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                  <span style={{ fontWeight: 700, color: '#818cf8′ }}>Total Cash Needed</span>
                  <span style={{ fontWeight: 800, color: '#818cf8', fontSize: 18 }}>{fmt(r.totalBuyerCosts)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', color: '#888', fontSize: 13 }}>
          ⚠️ Estimates only. Actual costs depend on lender, title company, property taxes, and negotiated terms.
        </p>
      </div>
    </div>
  );
}
