import { useState } from 'react';

const MARKET_CONDITIONS = ['Hot (multiple offers, under 30 days DOM)', 'Warm (some competition, 30-60 days DOM)', 'Balanced (60-90 days DOM)', 'Cool (90+ days DOM, price cuts common)'];
const PRICE_TIERS = ['Under $300K', '$300K–$500K', '$500K–$750K', '$750K–$1M', '$1M+'];

interface BidResult {
  strategy: string;
  aboveList: string;
  escalation: string;
  contingencies: string;
  notes: string;
}

function getBidStrategy(market: string, tier: string, offers: number): BidResult {
  const isHot = market.startsWith('Hot');
  const isWarm = market.startsWith('Warm');
  const isBalanced = market.startsWith('Balanced');
  const isLuxury = tier === '$1M+' || tier === '$750K–$1M';
  const isEntry = tier === 'Under $300K';

  if (isHot && offers >= 3) {
    return {
      strategy: 'Aggressive offer required',
      aboveList: isEntry ? '5–10% over list' : isLuxury ? '2–5% over list' : '4–8% over list',
      escalation: 'Add escalation clause up to 2% above highest competing offer',
      contingencies: 'Waive inspection or use information-only. Offer appraisal gap coverage.',
      notes: 'DFW data 2022-2024: entry-level homes averaged 6.2% over list in hot markets',
    };
  }
  if (isHot && offers < 3) {
    return {
      strategy: 'Competitive but not panic',
      aboveList: isLuxury ? '1–3% over list' : '3–5% over list',
      escalation: 'Escalation clause optional — may signal less competition than you think',
      contingencies: 'Keep inspection but shorten to 5 days. Match or beat list with cash proof.',
      notes: 'One or two competing offers in DFW does not always mean a bidding war',
    };
  }
  if (isWarm) {
    return {
      strategy: 'Solid offer, some room to negotiate',
      aboveList: '0–3% over list',
      escalation: 'Skip escalation — makes you look desperate in warm market',
      contingencies: 'Keep all standard contingencies. 10-day inspection window is fine.',
      notes: 'DFW warm markets often settle within 1-2% of list price at close',
    };
  }
  if (isBalanced) {
    return {
      strategy: 'Negotiation leverage exists',
      aboveList: 'At list or 1–2% below',
      escalation: 'No escalation needed',
      contingencies: 'Full contingencies. Request seller concessions for closing costs.',
      notes: 'Balanced DFW markets: buyers averaged 98.5% of list price 2023-2024',
    };
  }
  return {
    strategy: 'Buyer has significant leverage',
    aboveList: '2–5% below list, sometimes more',
    escalation: 'No escalation — go in low and negotiate up',
    contingencies: 'Full contingencies plus inspection credits. Request repairs or price reduction.',
    notes: 'Cool DFW markets: days on market correlation with price reductions averages 7-12%',
  };
}

export default function DFWBidAboveListGuide() {
  const [market, setMarket] = useState('');
  const [tier, setTier] = useState('');
  const [offers, setOffers] = useState('');
  const [result, setResult] = useState<BidResult | null>(null);

  function calculate() {
    if (!market || !tier) return;
    setResult(getBidStrategy(market, tier, parseInt(offers) || 0));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>🏆 DFW Buyer Strategy</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Bidding Above List Price in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>How much above list is normal in DFW, when to bid up, and how to structure a winning offer without overpaying.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'DFW 2022 Peak', stat: '+8.4% avg over list', sub: 'Entry-level homes in hot suburbs' },
            { label: 'DFW 2023 Reset', stat: '+1.2% avg over list', sub: 'Rate shock cooled competition fast' },
            { label: 'DFW 2024-2025', stat: '+2–4% over list', sub: 'Hot pockets returning in Frisco/Prosper' },
            { label: 'Luxury Segment', stat: 'At or below list', sub: '$1M+ still negotiable in most DFW markets' },
          ].map(c => (
            <div key={c.label} style={{ background: '#0f1f3a', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#64748b', fontSize: 12, marginBottom: 4 }}>{c.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{c.stat}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3a', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Build Your DFW Bid Strategy</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Market Conditions</label>
              <select value={market} onChange={e => setMarket(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 13 }}>
                <option value=''>Select conditions...</option>
                {MARKET_CONDITIONS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Price Tier</label>
              <select value={tier} onChange={e => setTier(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 13 }}>
                <option value=''>Select tier...</option>
                {PRICE_TIERS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Competing Offers (if known)</label>
            <input type='number' value={offers} onChange={e => setOffers(e.target.value)} placeholder='0′ min='0' style={{ width: 120, padding: '10px 12px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }} />
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer' }}>Get Strategy</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 12 }}>{result.strategy}</div>
              <div style={{ display: 'grid', gap: 10 }}>
                <div><span style={{ color: '#64748b', fontSize: 12 }}>Bid amount:</span><br /><span style={{ color: '#e2e8f0', fontSize: 14 }}>{result.aboveList}</span></div>
                <div><span style={{ color: '#64748b', fontSize: 12 }}>Escalation:</span><br /><span style={{ color: '#e2e8f0', fontSize: 14 }}>{result.escalation}</span></div>
                <div><span style={{ color: '#64748b', fontSize: 12 }}>Contingencies:</span><br /><span style={{ color: '#e2e8f0', fontSize: 14 }}>{result.contingencies}</span></div>
                <div style={{ borderTop: '1px solid #1e3a5f', paddingTop: 10 }}><span style={{ color: '#64748b', fontSize: 12 }}>DFW data context:</span><br /><span style={{ color: '#94a3b8', fontSize: 13 }}>{result.notes}</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}