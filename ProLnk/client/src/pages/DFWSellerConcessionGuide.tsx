import { useState } from 'react';

export default function DFWSellerConcessionGuide() {
  const [requestType, setRequestType] = useState('');
  const [marketCondition, setMarketCondition] = useState('');
  const [motivation, setMotivation] = useState('');
  const [result, setResult] = useState<{ strategy: string; comparison: { option: string; cost: string; pros: string; cons: string }[] } | null>(null);

  function calculate() {
    if (!requestType || !marketCondition || !motivation) return;

    let strategy = '';
    let comparison: { option: string; cost: string; pros: string; cons: string }[] = [];

    if (requestType === 'closing-costs') {
      strategy = marketCondition === 'buyers'
        ? 'In a DFW buyer\’s market, closing cost credits are standard. Offer the credit rather than dropping price — it\’s the same money to you, but keeps your public sale price higher (matters for appraisals and comps).'
        : 'In a seller\’s market, resist closing cost credits — counter by holding price and letting buyer use their own funds. If you must concede, cap it at 2%.';
      comparison = [
        { option: 'Closing Cost Credit (2%)', cost: '$8,000 on $400K home', pros: 'Keeps sale price high, helps buyer qualify', cons: 'Cash out of proceeds at closing' },
        { option: 'Price Reduction (2%)', cost: '$8,000 on $400K home', pros: 'Simpler negotiation', cons: 'Lowers comp value for neighborhood, same net' },
      ];
    } else if (requestType === 'rate-buydown') {
      strategy = 'Rate buydowns are extremely popular in 2024–2026 DFW due to elevated interest rates. A 2-1 buydown ($6,000–$10,000) can reduce buyer\’s monthly payment by $300–400/month for first two years — very compelling. Often more effective than a price cut at the same cost.';
      comparison = [
        { option: '2-1 Temporary Buydown', cost: '$6,000–$10,000', pros: 'Lowers buyer\’s payment yr 1–2, very marketable', cons: 'Rate returns to full rate in year 3' },
        { option: 'Permanent Rate Buydown (1pt)', cost: '~$5,000/point', pros: 'Permanent payment reduction', cons: 'More expensive, less buyer preference' },
        { option: 'Equivalent Price Reduction', cost: 'Same dollar amount', pros: 'Simpler', cons: 'Lower comp value, less buyer impact on monthly payment' },
      ];
    } else if (requestType === 'repair-credit') {
      strategy = motivation === 'close-fast'
        ? 'Offer repair credits rather than doing the work yourself. It closes faster, avoids contractor scheduling delays, and lets the buyer choose their own vendors. Price the credit at 125% of your repair estimate to account for buyer\’s premium.'
        : 'If time permits, fix before listing. DFW buyers discount repair credits by 2x — they assume work will cost more than quoted. A $5,000 repair credit reduces offers by $8,000–10,000 in negotiation. Fix it, list it, and eliminate the negotiation lever.';
      comparison = [
        { option: 'Fix Before Listing', cost: 'Actual repair cost', pros: 'Eliminates negotiation leverage, cleaner inspection', cons: 'Time and contractor coordination required' },
        { option: 'Repair Credit at Closing', cost: 'Credit amount agreed', pros: 'Fast, no contractor hassle', cons: 'Buyer discounts credit heavily in negotiations' },
        { option: 'Price Reduction', cost: 'Reduced sale price', pros: 'Simple to execute', cons: 'Largest net cost, lowers comps' },
      ];
    } else {
      strategy = 'Home warranties ($400–$700/year) are low-cost, high-value concessions in DFW. They reduce buyer anxiety about unknown repairs and can unlock deals stuck over inspection concerns. Offer a 1-year home warranty rather than a repair credit when issues are minor.';
      comparison = [
        { option: 'Home Warranty (1 year)', cost: '$400–$700', pros: 'Low cost, high perceived value, fast to execute', cons: 'Doesn\’t address structural or major system issues' },
        { option: 'Repair Credit', cost: 'Negotiated amount', pros: 'Flexible amount', cons: 'Can re-open negotiation spiral' },
      ];
    }
    setResult({ strategy, comparison });
  }

  return (
    <div style={{ background: '#f5f5f0', minHeight: '100vh', fontFamily: 'Georgia, serif', color: '#1a1a2e' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: '#888' }}>DFW Seller Guide</div>
        <h1 style={{ fontSize: 38, fontWeight: 700, margin: '0 0 12px', lineHeight: 1.2 }}>
          🤝 Seller Concessions in DFW
        </h1>
        <p style={{ fontSize: 17, color: '#555', marginBottom: 40, lineHeight: 1.7 }}>
          Concessions aren't weakness — they're strategy. The right concession closes deals faster and often costs less than a price reduction. Here's how to think about each type in the current DFW market.
        </p>

        <div style={{ display: 'grid', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '💵', title: 'Closing Cost Credits', body: 'The most common DFW concession. Buyers ask sellers to cover 1–3% of closing costs. Key insight: a $8,000 closing cost credit costs you the same as an $8,000 price reduction — but keeps your public sale price higher, which matters for neighborhood comps and appraisals.' },
            { icon: '📉', title: 'Rate Buydowns — Very Hot in 2024–2026', body: "With mortgage rates elevated, 2-1 buydowns are one of the most effective tools in DFW. A $8,000 buydown can reduce a buyer's payment by $350/month for 2 years — far more compelling than $8,000 off the price, which only saves ~$40/month in payment terms." },
            { icon: '🔨', title: 'Repair Credits vs. Fix Before Listing', body: "DFW buyers discount repair credits by 1.5–2x. If you quote a $5,000 repair, expect buyers to demand $8,000–$10,000 credit. Better to fix the item before listing, eliminate the negotiation lever, and present a clean inspection report." },
            { icon: '🛡️', title: 'Home Warranties — Low Cost, High Value', body: 'A 1-year home warranty ($400–700) is one of the highest ROI concessions available. It covers HVAC, plumbing, appliances, and electrical after closing — reducing buyer anxiety about unknown repairs at a fraction of any repair credit cost.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#fff', borderRadius: 12, padding: '24px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>{card.title}</h3>
              <p style={{ fontSize: 15, color: '#555', lineHeight: 1.7, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 24px' }}>🎯 Concession Strategy Advisor</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'What is the buyer requesting?', value: requestType, setter: setRequestType, options: [
                { v: 'closing-costs', l: 'Closing cost credit' },
                { v: 'rate-buydown', l: 'Interest rate buydown' },
                { v: 'repair-credit', l: 'Repair credit / inspection items' },
                { v: 'warranty', l: 'Home warranty or minor items' },
              ]},
              { label: 'Current DFW Market Conditions', value: marketCondition, setter: setMarketCondition, options: [
                { v: 'sellers', l: "Seller's market (low inventory, multiple offers)" },
                { v: 'balanced', l: 'Balanced market (3–4 months inventory)' },
                { v: 'buyers', l: "Buyer's market (high inventory, slow sales)" },
              ]},
              { label: 'Your Motivation', value: motivation, setter: setMotivation, options: [
                { v: 'close-fast', l: 'Close as fast as possible' },
                { v: 'max-net', l: 'Maximize net proceeds' },
                { v: 'certainty', l: 'Deal certainty over price' },
              ]},
            ].map(field => (
              <div key={field.label}>
                <label style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6 }}>{field.label}</label>
                <select
                  value={field.value}
                  onChange={e => field.setter(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 15 }}
                >
                  <option value="">Select...</option>
                  {field.options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button
            onClick={calculate}
            style={{ background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
          >
            Get Concession Strategy →
          </button>

          {result && (
            <div style={{ marginTop: 24 }}>
              <div style={{ padding: '16px 20px', background: '#f0f7ff', borderRadius: 10, borderLeft: '4px solid #2d6abf', marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#2d6abf', marginBottom: 6 }}>Recommended Strategy</div>
                <div style={{ fontSize: 15, color: '#333', lineHeight: 1.6 }}>{result.strategy}</div>
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                {result.comparison.map((o, i) => (
                  <div key={i} style={{ padding: '16px 20px', background: '#f8f8f4', borderRadius: 10, border: '1px solid #eee' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 15 }}>{o.option}</span>
                      <span style={{ fontWeight: 600, color: '#555', fontSize: 14 }}>{o.cost}</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#2d8a4e', marginBottom: 4 }}>✓ {o.pros}</div>
                    <div style={{ fontSize: 13, color: '#c0392b' }}>✗ {o.cons}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
