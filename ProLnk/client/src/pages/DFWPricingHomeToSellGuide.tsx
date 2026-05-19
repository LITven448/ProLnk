import { useState } from 'react';

const DOM_IMPACT = [
  { days: '0–7', perception: 'Fresh listing — buyers compete', offerStrength: '100–103% of list' },
  { days: '8–21', perception: 'Solid interest, some hesitation', offerStrength: '97–100% of list' },
  { days: '22–45', perception: '"Why hasn’t this sold?" stigma begins', offerStrength: '94–97% of list' },
  { days: '46–90', perception: 'Distressed or overpriced perception', offerStrength: '88–94% of list' },
  { days: '90+', perception: 'Major red flag — buyers lowball', offerStrength: '<88% of list' },
];

export default function DFWPricingHomeToSellGuide() {
  const [listPrice, setListPrice] = useState('');
  const [timeline, setTimeline] = useState('');
  const [strategy, setStrategy] = useState('');
  const [result, setResult] = useState<{ rec: string; outcomes: { label: string; price: number; note: string }[] } | null>(null);

  function calculate() {
    const price = parseFloat(listPrice.replace(/,/g, '')) || 0;
    if (!price || !timeline || !strategy) return;

    let rec = '';
    const outcomes: { label: string; price: number; note: string }[] = [];

    if (timeline === 'fast' && strategy === 'multiple-offers') {
      rec = 'Price 1–2% below comparable sales to trigger multiple-offer scenario. DFW buyers are data-savvy — they will know if you’re priced right.';
      outcomes.push({ label: 'Aggressive (below market)', price: price * 0.98, note: 'Highest chance of multiple offers, closes in 7–14 days' });
      outcomes.push({ label: 'At market', price: price, note: 'Solid demand, likely 1–2 offers in first week' });
      outcomes.push({ label: 'Slightly over', price: price * 1.02, note: 'Risk of sitting — reduce expected by week 3' });
    } else if (timeline === 'flexible' && strategy === 'max-price') {
      rec = 'Price at or just above comparables. You have time to test the market, but cap your experiment at 3 weeks before adjusting.';
      outcomes.push({ label: 'At market', price: price, note: 'Proven clearing price — reliable baseline' });
      outcomes.push({ label: '2% above market', price: price * 1.02, note: 'Acceptable test — plan a reduction at day 21' });
      outcomes.push({ label: '4% above market', price: price * 1.04, note: 'High risk — stigma likely, net result often lower' });
    } else {
      rec = 'Price within 1% of the most recent comparable sales in your ZIP. DFW buyers have strong comp data — overpricing by even 3% can add 30+ days on market.';
      outcomes.push({ label: '1% below market', price: price * 0.99, note: 'Best risk-adjusted position — attracts buyers fast' });
      outcomes.push({ label: 'At market', price: price, note: 'Standard expectation — solid demand expected' });
      outcomes.push({ label: '3% over market', price: price * 1.03, note: 'Likely adds 3–5 weeks and reduces final net' });
    }
    setResult({ rec, outcomes });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif", color: '#e8e8e8' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: '#F5E642', fontWeight: 600 }}>DFW Seller Guide</div>
        <h1 style={{ fontSize: 38, fontWeight: 700, margin: '0 0 12px', lineHeight: 1.2, color: '#fff' }}>
          📊 Pricing Your DFW Home to Sell
        </h1>
        <p style={{ fontSize: 17, color: '#aaa', marginBottom: 40, lineHeight: 1.7 }}>
          The #1 seller mistake in DFW is overpricing. The market is data-rich — buyers and their agents pull comps in seconds. A home priced wrong sits, stigmatizes, and ultimately sells for less than it would have if priced right on day one.
        </p>

        <div style={{ display: 'grid', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '🕷️', title: 'The Overpricing Trap', body: 'DFW buyers are among the most comp-savvy in the country. When a home is overpriced by even 3–4%, buyers notice immediately — and so do buyer agents who track list-to-sale ratios. The result: fewer showings, lower offers, and a price cut that signals weakness.' },
            { icon: '🎯', title: 'The Multiple-Offer Strategy', body: 'Pricing 1–2% below recent comparable sales in DFW neighborhoods like Frisco, McKinney, Plano, and Southlake consistently generates multiple-offer scenarios. When you get 3–5 offers, buyers drive the price up above list — you win more than you gave up.' },
            { icon: '📅', title: 'When to List in DFW', body: 'March through May is peak DFW listing season. Avoid listing in August — the Texas summer heat kills foot traffic, families are in back-to-school mode, and homes listed in August sit 40% longer than spring listings. January and September are second-tier windows.' },
            { icon: '✂️', title: 'Price Reductions Signal Weakness', body: 'Every price reduction in DFW is public record on Zillow, Redfin, and MLS history. Buyers use reductions as negotiating leverage — "it’s been reduced twice, let’s offer under asking." One well-priced listing is worth more than two reductions.' },
          ].map(card => (
            <div key={card.title} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '24px 28px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px', color: '#fff' }}>{card.title}</h3>
              <p style={{ fontSize: 15, color: '#aaa', lineHeight: 1.7, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: '32px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 24px', color: '#F5E642' }}>🔢 Pricing Strategy Simulator</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6, color: '#ccc' }}>Your Target List Price</label>
              <input
                type="text"
                value={listPrice}
                onChange={e => setListPrice(e.target.value)}
                placeholder="e.g. 525,000"
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.15)', fontSize: 15, background: 'rgba(255,255,255,0.08)', color: '#fff', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6, color: '#ccc' }}>Timeline to Sell</label>
              <select
                value={timeline}
                onChange={e => setTimeline(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.15)', fontSize: 15, background: '#0A1628', color: '#fff' }}
              >
                <option value="">Select timeline...</option>
                <option value="fast">Fast — within 30 days</option>
                <option value="normal">Normal — 30–60 days</option>
                <option value="flexible">Flexible — 60–90+ days</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6, color: '#ccc' }}>Primary Goal</label>
              <select
                value={strategy}
                onChange={e => setStrategy(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.15)', fontSize: 15, background: '#0A1628', color: '#fff' }}
              >
                <option value="">Select goal...</option>
                <option value="multiple-offers">Trigger multiple offers</option>
                <option value="max-price">Maximize sale price</option>
                <option value="certainty">Certainty of close</option>
              </select>
            </div>
          </div>
          <button
            onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
          >
            Get Pricing Strategy →
          </button>

          {result && (
            <div style={{ marginTop: 24 }}>
              <div style={{ padding: '16px 20px', background: 'rgba(245,230,66,0.1)', borderRadius: 10, borderLeft: '4px solid #F5E642', marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#F5E642', marginBottom: 6 }}>Strategy Recommendation</div>
                <div style={{ fontSize: 15, color: '#ccc', lineHeight: 1.6 }}>{result.rec}</div>
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                {result.outcomes.map((o, i) => (
                  <div key={i} style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontWeight: 600, color: '#fff' }}>{o.label}</span>
                      <span style={{ fontWeight: 700, color: '#F5E642' }}>${o.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#777' }}>{o.note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '24px 28px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px', color: '#fff' }}>📆 Days on Market vs. Final Price — DFW Reality</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  {['Days on Market', 'Buyer Perception', 'Typical Offer Strength'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 12, color: '#F5E642', fontWeight: 600, letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DOM_IMPACT.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px 12px', fontSize: 14, fontWeight: 600, color: '#fff' }}>{row.days}</td>
                    <td style={{ padding: '10px 12px', fontSize: 13, color: '#aaa' }}>{row.perception}</td>
                    <td style={{ padding: '10px 12px', fontSize: 13, color: i < 2 ? '#6fcf97' : i < 3 ? '#f2c94c' : '#eb5757' }}>{row.offerStrength}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
