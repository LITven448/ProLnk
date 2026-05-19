import { useState } from 'react';

export default function DFWIBuyerGuide() {
  const [homeValue, setHomeValue] = useState('');
  const [timeline, setTimeline] = useState('');
  const [condition, setCondition] = useState('');
  const [result, setResult] = useState<{
    ibuyer: { offer: number; fees: number; net: number };
    traditional: { offer: number; costs: number; net: number };
    diff: number;
    rec: string;
  } | null>(null);

  function calculate() {
    const value = parseFloat(homeValue.replace(/,/g, '')) || 0;
    if (!value || !timeline || !condition) return;

    const conditionDiscount = condition === 'excellent' ? 0.05 : condition === 'good' ? 0.07 : 0.10;
    const ibuyer_offer = value * (1 - conditionDiscount);
    const ibuyer_fees = ibuyer_offer * 0.065;
    const ibuyer_net = ibuyer_offer - ibuyer_fees;

    const trad_offer = value * (timeline === 'fast' ? 0.985 : 1.0);
    const trad_costs = trad_offer * 0.085;
    const trad_net = trad_offer - trad_costs;

    const diff = trad_net - ibuyer_net;

    const rec = timeline === 'fast' && condition !== 'excellent'
      ? 'iBuyer may be worth considering — you gain speed and certainty but expect to leave significant money on the table. Best for sellers who prioritize convenience over maximum proceeds.'
      : timeline === 'flexible' && condition === 'excellent'
      ? 'Traditional listing is strongly recommended. Your home\’s condition supports a competitive market listing, and you have time to maximize proceeds. The iBuyer discount on a well-maintained home is rarely justified.'
      : 'Run both paths in parallel — get an iBuyer offer for free and compare to a local agent\’s CMA. Use the iBuyer offer as your floor, not your ceiling.';

    setResult({ ibuyer: { offer: ibuyer_offer, fees: ibuyer_fees, net: ibuyer_net }, traditional: { offer: trad_offer, costs: trad_costs, net: trad_net }, diff, rec });
  }

  const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif", color: '#e8e8e8' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: '#F5E642', fontWeight: 600 }}>DFW Seller Guide</div>
        <h1 style={{ fontSize: 38, fontWeight: 700, margin: '0 0 12px', lineHeight: 1.2, color: '#fff' }}>
          🤖 iBuyers in DFW: Opendoor & Offerpad
        </h1>
        <p style={{ fontSize: 17, color: '#aaa', marginBottom: 40, lineHeight: 1.7 }}>
          iBuyers are instant cash buyers who purchase homes directly — skipping the traditional listing process. In DFW they're most active in Frisco, McKinney, Plano, Allen, and Irving. Here's what you need to know before requesting an offer.
        </p>

        <div style={{ display: 'grid', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '⚡', title: 'How iBuyers Work', body: 'Opendoor and Offerpad use algorithms to generate a cash offer within 24–48 hours. You choose a flexible closing date (typically 14–90 days). No showings, no contingencies, no open houses. The trade-off: their offer reflects their risk margin, not your home\’s market ceiling.' },
            { icon: '📉', title: 'What iBuyers Actually Pay', body: 'iBuyer offers in DFW typically come in 5–10% below market value, depending on condition and the current algorithmic pricing model. On top of that, they charge a "service fee" of 5–8% — similar to agent commissions. Total gap vs. traditional: 8–15% of value.' },
            { icon: '✅', title: 'When iBuyer Makes Sense', body: 'Speed and certainty are the only valid reasons to choose an iBuyer over a traditional listing. Ideal candidates: sellers who\’ve already purchased another home and can\’t carry two mortgages, sellers relocating on a fixed deadline, or homes with deferred maintenance the seller can\’t address before listing.' },
            { icon: '🔄', title: 'DFW Market Conditions & iBuyer Activity', body: 'iBuyers scale back offers and activity in volatile markets. In hot markets they\’re more aggressive; in cooling markets they pad their margins further. In 2024–2026 DFW (balanced to slight buyer\’s market), expect iBuyer offers to be on the conservative side — they price in inventory risk.' },
            { icon: '🎯', title: 'The Smart Move: Run Both Tracks', body: 'Getting an iBuyer offer is free and takes 10 minutes. Use it as your guaranteed floor. Simultaneously, get a local agent\’s CMA and price comparison. If the spread is under $15,000, convenience may win. If it\’s $30,000+, the traditional listing is almost always worth the effort.' },
          ].map(card => (
            <div key={card.title} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '24px 28px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px', color: '#fff' }}>{card.title}</h3>
              <p style={{ fontSize: 15, color: '#aaa', lineHeight: 1.7, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: '32px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 24px', color: '#F5E642' }}>📊 iBuyer vs. Traditional Listing Comparison</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6, color: '#ccc' }}>Estimated Market Value</label>
              <input
                type="text"
                value={homeValue}
                onChange={e => setHomeValue(e.target.value)}
                placeholder="e.g. 480,000"
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.15)', fontSize: 15, background: 'rgba(255,255,255,0.08)', color: '#fff', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6, color: '#ccc' }}>Your Timeline</label>
              <select
                value={timeline}
                onChange={e => setTimeline(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.15)', fontSize: 15, background: '#0A1628', color: '#fff' }}
              >
                <option value="">Select timeline...</option>
                <option value="fast">Need to close within 30 days</option>
                <option value="normal">30–60 day timeline</option>
                <option value="flexible">Flexible — 60+ days</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6, color: '#ccc' }}>Home Condition</label>
              <select
                value={condition}
                onChange={e => setCondition(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.15)', fontSize: 15, background: '#0A1628', color: '#fff' }}
              >
                <option value="">Select condition...</option>
                <option value="excellent">Excellent — move-in ready, updated</option>
                <option value="good">Good — minor items, no major repairs</option>
                <option value="fair">Fair — needs work, deferred maintenance</option>
              </select>
            </div>
          </div>
          <button
            onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
          >
            Compare My Options →
          </button>

          {result && (
            <div style={{ marginTop: 28 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                {[
                  { label: '🤖 iBuyer Path', color: '#eb5757', offer: result.ibuyer.offer, costs: result.ibuyer.fees, net: result.ibuyer.net, costLabel: 'Service Fee (avg 6.5%)' },
                  { label: '🏡 Traditional Listing', color: '#6fcf97', offer: result.traditional.offer, costs: result.traditional.costs, net: result.traditional.net, costLabel: 'Agent + Closing Costs (avg 8.5%)' },
                ].map(p => (
                  <div key={p.label} style={{ padding: '20px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: `1px solid ${p.color}33` }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: p.color, marginBottom: 16 }}>{p.label}</div>
                    <div style={{ display: 'grid', gap: 10 }}>
                      <div>
                        <div style={{ fontSize: 12, color: '#777' }}>Offer/Sale Price</div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{fmt(p.offer)}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: '#777' }}>{p.costLabel}</div>
                        <div style={{ fontSize: 16, fontWeight: 600, color: '#eb5757' }}>-{fmt(p.costs)}</div>
                      </div>
                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 10 }}>
                        <div style={{ fontSize: 12, color: '#777' }}>Est. Net Proceeds</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: p.color }}>{fmt(p.net)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '16px 20px', background: result.diff > 20000 ? 'rgba(111,207,151,0.1)' : 'rgba(245,230,66,0.1)', borderRadius: 10, border: `1px solid ${result.diff > 20000 ? '#6fcf97' : '#F5E642'}44`, marginBottom: 20 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: result.diff > 20000 ? '#6fcf97' : '#F5E642', marginBottom: 8 }}>
                  Traditional listing nets ~{fmt(result.diff)} more
                </div>
                <div style={{ fontSize: 14, color: '#ccc', lineHeight: 1.6 }}>{result.rec}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '24px 28px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px', color: '#fff' }}>🏢 Active iBuyers in DFW (2026)</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { name: 'Opendoor', status: 'Active in DFW', coverage: 'Frisco, McKinney, Plano, Allen, Irving, Arlington, Grand Prairie', note: 'Largest iBuyer by volume, fastest offer turnaround' },
              { name: 'Offerpad', status: 'Active in DFW', coverage: 'Dallas, Fort Worth, Garland, Mesquite, Irving', note: 'More flexible on condition, longer close windows available' },
            ].map(b => (
              <div key={b.name} style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>{b.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#6fcf97', background: 'rgba(111,207,151,0.15)', padding: '2px 10px', borderRadius: 20 }}>{b.status}</span>
                </div>
                <div style={{ fontSize: 13, color: '#aaa', marginBottom: 4 }}>📍 {b.coverage}</div>
                <div style={{ fontSize: 13, color: '#777' }}>{b.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
