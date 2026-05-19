import { useState } from 'react';

const roles = ['Buyer', 'Seller'];
const situations = [
  'Offer came in below asking price',
  'Buyer requesting repairs after inspection',
  'Seller not budging on price',
  'Multiple counteroffers stalling deal',
  'Buyer wants closing cost help',
  'Seller wants leaseback after closing',
];

function getStrategy(role: string, situation: string) {
  const isBuyer = role === 'Buyer';
  const strategies: Record<string, { counter: string; holdFirm: string; walkAway: string }> = {
    'Offer came in below asking price': {
      counter: isBuyer ? 'Come up 1-2% from your offer. Signal motivation with earnest money increase, not just price.' : 'Counter at 1-2% below asking. Texas TREC form 1-4 allows clean price counter — keep terms identical.',
      holdFirm: isBuyer ? 'Hold firm on inspection and financing contingencies — never waive those to offset price.' : 'Hold firm on price if you have another showing scheduled. Do not reveal urgency.',
      walkAway: isBuyer ? 'Walk if seller counters above your pre-approved limit. Emotional overpaying is the #1 DFW buyer regret.' : 'Walk if buyer cannot show proof of funds or pre-approval within 24 hours of counter.'
    },
    'Buyer requesting repairs after inspection': {
      counter: isBuyer ? 'Use TREC Amendment to Contract. Request dollar credit at closing rather than repairs — seller repair quality is unpredictable.' : 'Counter with a partial credit (50-60% of repair estimate). Use licensed contractor estimate, not buyer home inspector cost estimate.',
      holdFirm: isBuyer ? 'Hold firm on safety items: electrical panels, foundation, roof leaks, HVAC failures. These are non-negotiable.' : 'Hold firm against cosmetic repair requests (caulking, minor paint, worn carpet). Disclose what you know; do not repair cosmetics.',
      walkAway: isBuyer ? 'Walk if seller refuses to credit foundation issues or major roof damage. These compound post-closing.' : 'Walk if buyer demands more than 2% of purchase price in repair credits on a fairly-priced home.'
    },
    'Seller not budging on price': {
      counter: isBuyer ? 'Shift the negotiation to terms: faster close, larger earnest money, waive option period for credit back.' : 'If you must hold price, offer something else: include appliances, pay one month HOA, offer leaseback.',
      holdFirm: isBuyer ? 'Hold firm on your ceiling. Know your number before you start — do not calculate in emotion.' : 'Hold firm if you have another offer coming or days-on-market is under 10.',
      walkAway: isBuyer ? 'Walk after 2 rounds if seller will not move. In DFW, another comparable home lists every week.' : 'Walk if buyer keeps submitting low offers after 2 counters — they are likely not serious.'
    },
    'Multiple counteroffers stalling deal': {
      counter: isBuyer ? 'In Texas, counteroffers expire — use tight deadlines (12-24 hours) to force decision and prevent shopping.' : 'Do not let a counter sit more than 24 hours. Momentum matters in DFW — dead deals rarely revive.',
      holdFirm: isBuyer ? 'Hold firm on any counter you send — changing terms mid-round signals weakness.' : 'Hold firm on your most recent counter. Do not chase the buyer with a better offer unprompted.',
      walkAway: isBuyer ? 'Walk if you are on round 4+ with no movement. Seller is not motivated to sell to you.' : 'Walk if the buyer lets your counter expire without responding — they are not serious.'
    },
    'Buyer wants closing cost help': {
      counter: isBuyer ? 'Ask for 1-2% closing cost contribution rolled into the offer. Price slightly higher to offset — many sellers prefer this.' : 'Counter by raising purchase price equal to the closing cost ask. Net proceeds stay the same; buyer gets financing help.',
      holdFirm: isBuyer ? 'Hold firm on the closing cost request if you are short on cash to close — it is a legitimate need.' : 'Hold firm on not exceeding appraised value when closing costs are rolled into price — appraisal risk falls on buyer.',
      walkAway: isBuyer ? 'Walk if seller refuses and you genuinely cannot cover closing costs — do not overextend.' : 'Walk if buyer requests exceed 3% of purchase price — uncommon in DFW seller markets.'
    },
    'Seller wants leaseback after closing': {
      counter: isBuyer ? 'Counter with a short leaseback (7-14 days max) at fair market rent rate. Require escrow holdback for damages.' : 'Request leaseback upfront in listing — 30-60 days at below-market rate is common ask in DFW relocation situations.',
      holdFirm: isBuyer ? 'Hold firm on leaseback end date. Open-ended leasebacks create landlord-tenant law complications in Texas.' : 'Hold firm on rent amount — free leasebacks create legal liability and IRS issues for both parties.',
      walkAway: isBuyer ? 'Walk if seller wants leaseback longer than 60 days — you become a landlord, not a buyer.' : 'Walk if buyer refuses any leaseback and you have no place to go — do not close homeless.'
    }
  };
  return strategies[situation] || { counter: 'Evaluate the situation with your agent before countering.', holdFirm: 'Protect your key terms.', walkAway: 'Know your walk-away number before negotiations begin.' };
}

export default function DFWCounterofferGuide() {
  const [role, setRole] = useState('');
  const [situation, setSituation] = useState('');
  const result = role && situation ? getStrategy(role, situation) : null;

  return (
    <div style={{ background: '#F8F6F1', minHeight: '100vh', color: '#1A2B3C', fontFamily: 'Georgia, serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ borderBottom: '3px solid #1A2B3C', paddingBottom: 24, marginBottom: 40 }}>
          <p style={{ color: '#5C7A9F', letterSpacing: 3, fontSize: 11, textTransform: 'uppercase', margin: '0 0 12px' }}>DFW Negotiation Guide • 2026</p>
          <h1 style={{ fontSize: 38, fontWeight: 700, margin: '0 0 16px', lineHeight: 1.15 }}>Counteroffer Guide for DFW Buyers & Sellers</h1>
          <p style={{ color: '#4A5568', fontSize: 17, margin: 0, lineHeight: 1.6 }}>How counteroffers work under Texas law — what to counter, when to hold firm, and when to walk away.</p>
        </div>

        <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 6, padding: 20, marginBottom: 32 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: 15 }}>⚖️ Texas Counteroffer Law — Key Difference</p>
          <p style={{ margin: 0, color: '#4A5568', fontSize: 14, lineHeight: 1.6 }}>Texas does not use a separate counteroffer form. Sellers use the same TREC 1-4 Family Contract or an amendment addendum. Both parties must sign for a binding agreement — verbal counters are not enforceable. Each counter voids the prior offer.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
          <div>
            <label style={{ display: 'block', color: '#1A2B3C', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>👤 Your Role</label>
            <select value={role} onChange={e => setRole(e.target.value)} style={{ width: '100%', background: '#fff', border: '1.5px solid #CBD5E0', color: '#1A2B3C', padding: '12px 16px', fontSize: 15, borderRadius: 4 }}>
              <option value=''>Select...</option>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', color: '#1A2B3C', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>📋 Your Situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', background: '#fff', border: '1.5px solid #CBD5E0', color: '#1A2B3C', padding: '12px 16px', fontSize: 15, borderRadius: 4 }}>
              <option value=''>Select...</option>
              {situations.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {result && (
          <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 6, padding: 32, marginBottom: 40, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#1A2B3C', fontSize: 20, margin: '0 0 24px', borderBottom: '2px solid #1A2B3C', paddingBottom: 12 }}>Your Counteroffer Strategy →</h2>
            {[['🔄 How to Counter', result.counter, '#2D6A4F'], ['🛡️ Where to Hold Firm', result.holdFirm, '#1A4A8C'], ['🚪 When to Walk Away', result.walkAway, '#9B2335']].map(([label, text, color]) => (
              <div key={label as string} style={{ borderLeft: '4px solid ' + color, paddingLeft: 16, marginBottom: 24 }}>
                <div style={{ color: color as string, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 }}>{label}</div>
                <div style={{ color: '#4A5568', lineHeight: 1.7, fontSize: 15 }}>{text}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[['1-2', 'Typical counteroffer rounds in DFW before acceptance or walk'],['24hr', 'Maximum time to leave a counter open — urgency drives decisions'],['TREC', 'Texas contract forms used for all residential counteroffers']].map(([stat, desc]) => (
            <div key={stat as string} style={{ background: '#1A2B3C', color: '#F8F6F1', borderRadius: 4, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>{stat}</div>
              <div style={{ fontSize: 13, color: '#CBD5E0', lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
