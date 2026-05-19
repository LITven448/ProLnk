import { useState } from 'react';

const marketTypes = ['Seller\’s market (low inventory, fast sales)','Balanced market','Buyer\’s market (high inventory, slow sales)','Seasonal slow (Nov-Jan DFW)'];

const domBands = [
  { range: '0-14 days', label: 'Fresh Listing', buyerSignal: 'Buyers see a new listing — normal interest, no concern.', sellerAction: 'Hold steady. Do not reduce or negotiate below ask unless offer is strong.', color: '#15803D' },
  { range: '15-28 days', label: 'Normal Market Pace', buyerSignal: 'DFW buyers see this as standard. No stigma. Home is in active consideration.', sellerAction: 'Evaluate feedback patterns. If 10+ showings with no offer, begin price conversation.', color: '#1D4ED8' },
  { range: '29-45 days', label: 'Starting to Raise Questions', buyerSignal: 'Sophisticated buyers (and their agents) begin to wonder — is there something wrong? Is there an inspection issue? Savvy buyers will use DOM as leverage.', sellerAction: 'Proactive price reduction of 2-3% needed. Consider staging refresh, new photography, or open house push to generate activity.', color: '#92400E' },
  { range: '46-60 days', label: 'Stigma Setting In', buyerSignal: 'Most DFW buyers at this DOM assume either overpriced or defective. Agents will advise clients to make low offers. Your negotiating position is weakening.', sellerAction: 'Significant price reset (4-6%) or strategic relist. Withdrawal + fresh MLS entry resets the DOM clock and removes the stigma.', color: '#C2410C' },
  { range: '60+ days', label: 'Distressed Signal', buyerSignal: 'Buyers see a problem. Even if the home is perfect, 60+ DOM in DFW signals that something is wrong. Agents routinely skip showing these to clients without a compelling reason to look.', sellerAction: 'Pull from market. Rest 10-14 days. Relist at a price that reflects current comps — not your original expectations.', color: '#BE123C' },
];

const marketAdjustments: Record<string, string> = {
  'Seller\’s market (low inventory, fast sales)': 'In a hot DFW seller\’s market, normal DOM is 7-18 days. Anything over 21 days signals real problems. The stigma timeline above accelerates by roughly 30%. Act faster than normal.',
  'Balanced market': 'Standard DFW balanced market. The DOM bands above apply as written. 28-35 days is typical without concern.',
  'Buyer\’s market (high inventory, slow sales)': 'In a slow DFW market, buyers expect to see homes sit. Normal DOM extends to 45-60 days before questions begin. Adjust your tolerance accordingly before reducing.',
  'Seasonal slow (Nov-Jan DFW)': 'DFW November-January is historically slow. A 45-60 day DOM in this window is not unusual and carries less stigma. Buyers who are active in DFW winter are serious — price for them.',
};

const reframeScripts = [
  ['Home was in probate/estate', 'This home just cleared estate proceedings — it\’s been off market during that process, not sitting unsold.'],
  ['Seller was relocated mid-listing', 'Sellers relocated mid-listing and paused showings. The home is now available and priced to reflect current market.'],
  ['Price was reduced to true market', 'The seller made a strategic pricing adjustment to reflect current DFW comps. This is a buying opportunity at fair market value.'],
  ['Relisted after withdrawal', 'This is a new MLS listing. The prior listing was withdrawn and relisted fresh with updated pricing and marketing.'],
];

export default function DFWDaysOnMarketGuide() {
  const [currentDom, setCurrentDom] = useState('');
  const [marketType, setMarketType] = useState('');

  const domNum = parseInt(currentDom) || 0;
  const activeBand = domBands.find(b => {
    const [min, max] = b.range.replace('+ days', '-999').replace(' days', '').split('-').map(Number);
    return domNum >= min && domNum <= max;
  });

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui,sans-serif', color: '#0A1628' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 24px', marginBottom: 28 }}>
          <div style={{ fontSize: 28 }}>📆</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>Days on Market Guide — DFW Sellers</h1>
          <p style={{ color: '#CBD5E1', margin: 0 }}>What different DOM numbers signal in DFW, how market conditions change the math, and how to handle the stigma of high DOM.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 20, marginBottom: 20, border: '1px solid #E2E8F0' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📊 DFW DOM Signal Chart</h2>
          {domBands.map(b => (
            <div key={b.range} style={{ borderLeft: `4px solid ${b.color}`, paddingLeft: 12, marginBottom: 14 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <span style={{ background: b.color, color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 4 }}>{b.range}</span>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{b.label}</span>
              </div>
              <div style={{ fontSize: 12, color: '#64748B', marginBottom: 2 }}>👁️ Buyer view: {b.buyerSignal}</div>
              <div style={{ fontSize: 12, color: '#334155' }}>✅ Seller action: {b.sellerAction}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 20, marginBottom: 20, border: '1px solid #E2E8F0' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>🎯 Your Current DOM + Market Type</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ fontSize: 12, color: '#64748B', display: 'block', marginBottom: 4 }}>Current Days on Market</label>
              <input type='number' value={currentDom} onChange={e => setCurrentDom(e.target.value)} placeholder='e.g. 38' style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ fontSize: 12, color: '#64748B', display: 'block', marginBottom: 4 }}>DFW Market Type</label>
              <select value={marketType} onChange={e => setMarketType(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, background: '#fff', color: '#0A1628' }}>
                <option value=''>Select market type</option>
                {marketTypes.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
          {activeBand && (
            <div style={{ background: '#F8FAFC', border: `2px solid ${activeBand.color}`, borderRadius: 8, padding: 14, marginBottom: 10 }}>
              <div style={{ fontWeight: 700, color: activeBand.color, marginBottom: 6 }}>{currentDom} DOM → {activeBand.label}</div>
              <div style={{ fontSize: 13, color: '#334155', marginBottom: 4 }}>Buyers are thinking: {activeBand.buyerSignal}</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Recommended action: {activeBand.sellerAction}</div>
            </div>
          )}
          {marketType && (
            <div style={{ background: '#FFFBEA', border: '1px solid #F5E642', borderRadius: 8, padding: 12 }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>Market adjustment for {marketType}:</div>
              <div style={{ fontSize: 13, color: '#334155' }}>{marketAdjustments[marketType]}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 20, border: '1px solid #E2E8F0' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>🗣️ How to Reframe High DOM Narrative</h2>
          {reframeScripts.map(([situation, script]) => (
            <div key={situation} style={{ background: '#F8FAFC', borderRadius: 8, padding: '10px 14px', marginBottom: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{situation}</div>
              <div style={{ fontSize: 12, color: '#475569', marginTop: 3, fontStyle: 'italic' }}>"{script}"</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
