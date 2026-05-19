import { useState } from 'react';

export default function DFWSellerNetProceedsGuide() {
  const [salePrice, setSalePrice] = useState('');
  const [mortgageBalance, setMortgageBalance] = useState('');
  const [agentRate, setAgentRate] = useState('5');
  const [hasHOA, setHasHOA] = useState(false);
  const [offersWarranty, setOffersWarranty] = useState(false);
  const [result, setResult] = useState<{ net: number; items: { label: string; amount: number; note: string }[] } | null>(null);

  function calculate() {
    const price = parseFloat(salePrice.replace(/,/g, '')) || 0;
    const mortgage = parseFloat(mortgageBalance.replace(/,/g, '')) || 0;
    const commissionRate = parseFloat(agentRate) / 100;
    if (!price) return;

    const items = [
      { label: 'Agent Commission', amount: -(price * commissionRate), note: `${agentRate}% of sale price (listing + buyer's agent)` },
      { label: 'Title Policy (Owner)', amount: -(price * 0.006), note: 'Texas seller typically pays owner\’s title policy (~0.6%)' },
      { label: 'Escrow / Closing Fee', amount: -1500, note: 'Title company closing/escrow fee (avg DFW)' },
      { label: 'Property Tax Proration', amount: -(price * 0.022 / 12 * 6), note: 'DFW avg 2.2% tax rate — prorated months to close' },
      { label: 'Survey (if needed)', amount: -650, note: 'New survey if existing not available (~$500–800)' },
      ...(hasHOA ? [{ label: 'HOA Transfer Fee', amount: -400, note: 'Avg DFW HOA transfer + resale cert fee' }] : []),
      ...(offersWarranty ? [{ label: 'Home Warranty (1 yr)', amount: -550, note: 'Seller-offered home warranty at closing' }] : []),
      { label: 'Mortgage Payoff', amount: -mortgage, note: 'Outstanding loan balance at close' },
    ];

    const totalDeductions = items.reduce((sum, i) => sum + i.amount, 0);
    const net = price + totalDeductions;
    setResult({ net, items });
  }

  const fmt = (n: number) => `${n < 0 ? '-' : ''}$${Math.abs(n).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  return (
    <div style={{ background: '#f8f6f0', minHeight: '100vh', fontFamily: 'Georgia, serif', color: '#1a1a2e' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: '#888′ }}>DFW Seller Guide</div>
        <h1 style={{ fontSize: 38, fontWeight: 700, margin: '0 0 12px', lineHeight: 1.2 }}>
          💰 What Will You Actually Walk Away With?
        </h1>
        <p style={{ fontSize: 17, color: '#555', marginBottom: 40, lineHeight: 1.7 }}>
          The sale price is not the check you receive. DFW sellers pay a range of closing costs, taxes, and fees that reduce net proceeds — sometimes by 8–10% of the sale price. Run your real numbers below before you accept an offer.
        </p>

        <div style={{ display: 'grid', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '🏷️', title: 'Agent Commission (Biggest Cost)', body: 'Traditionally 5–6% split between listing and buyer\’s agent. Post-NAR settlement, listing agents typically charge 2.5–3%, and buyer agent compensation is separately negotiated. On a $450K DFW home, 5% = $22,500.' },
            { icon: '📄', title: 'Texas Title Policy — Seller Pays', body: 'Unlike most states where the buyer pays for title insurance, Texas custom puts the owner\’s title policy on the seller. This runs approximately 0.5–0.6% of the sale price — about $2,700 on a $450K home.' },
            { icon: '🧾', title: 'Property Tax Proration', body: 'Texas has no state income tax, but property taxes average 2.1–2.5% in DFW. Sellers owe taxes for the months they owned the home in the closing year. On a $400K home at 2.2%, that\’s about $733/month — prorated to your closing date.' },
            { icon: '🏘️', title: 'HOA Fees at Closing', body: 'Most DFW communities (Frisco, Allen, McKinney, Prosper, Southlake) have HOAs. Expect a transfer fee ($200–500), resale certificate fee ($75–150), and possibly prorated HOA dues. Budget $400–700 total.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#fff', borderRadius: 12, padding: '24px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>{card.title}</h3>
              <p style={{ fontSize: 15, color: '#555', lineHeight: 1.7, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 24px' }}>🧮 Net Proceeds Calculator</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'Expected Sale Price', value: salePrice, setter: setSalePrice, placeholder: 'e.g. 475,000′ },
              { label: 'Current Mortgage Balance', value: mortgageBalance, setter: setMortgageBalance, placeholder: 'e.g. 280,000 (enter 0 if paid off)' },
            ].map(f => (
              <div key={f.label}>
                <label style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6 }}>{f.label}</label>
                <input
                  type="text"
                  value={f.value}
                  onChange={e => f.setter(e.target.value)}
                  placeholder={f.placeholder}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 15, boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6 }}>Total Agent Commission Rate</label>
              <select
                value={agentRate}
                onChange={e => setAgentRate(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 15 }}
              >
                <option value="6″>6% (traditional split)</option>
                <option value="5″>5% (negotiated)</option>
                <option value="4″>4% (discount)</option>
                <option value="3″>3% (listing agent only, no buyer's agent)</option>
                <option value="2″>2% (flat fee + minimal buyer's agent)</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
                <input type="checkbox" checked={hasHOA} onChange={e => setHasHOA(e.target.checked)} style={{ accentColor: '#1a1a2e' }} />
                HOA Community
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
                <input type="checkbox" checked={offersWarranty} onChange={e => setOffersWarranty(e.target.checked)} style={{ accentColor: '#1a1a2e' }} />
                Offering Home Warranty
              </label>
            </div>
          </div>
          <button
            onClick={calculate}
            style={{ background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
          >
            Calculate My Net Proceeds →
          </button>

          {result && (
            <div style={{ marginTop: 24 }}>
              <div style={{ padding: '20px 24px', background: result.net > 0 ? '#f0f9f0′ : '#fff5f5', borderRadius: 10, border: `2px solid ${result.net > 0 ? '#2d8a4e' : '#c0392b'}`, marginBottom: 20, textAlign: ’center' }}>
                <div style={{ fontSize: 14, color: '#777', marginBottom: 4 }}>Estimated Net Proceeds</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: result.net > 0 ? '#2d8a4e' : '#c0392b' }}>
                  {fmt(result.net)}
                </div>
                <div style={{ fontSize: 13, color: '#999', marginTop: 4 }}>What you'll actually walk away with at closing</div>
              </div>
              <div style={{ border: '1px solid #eee', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ padding: '12px 18px', background: '#f8f8f4', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>Sale Price</span>
                  <span style={{ fontWeight: 700, fontSize: 14, color: '#2d8a4e' }}>{fmt(parseFloat(salePrice.replace(/,/g, '')) || 0)}</span>
                </div>
                {result.items.map((item, i) => (
                  <div key={i} style={{ padding: '12px 18px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{item.note}</div>
                    </div>
                    <span style={{ fontWeight: 600, fontSize: 14, color: '#c0392b', whiteSpace: 'nowrap', marginLeft: 12 }}>{fmt(item.amount)}</span>
                  </div>
                ))}
                <div style={{ padding: '14px 18px', background: '#1a1a2e', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>Net Proceeds</span>
                  <span style={{ fontWeight: 800, fontSize: 18, color: result.net > 0 ? '#6fcf97′ : '#eb5757' }}>{fmt(result.net)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
