import { useState } from 'react';

const strategies: Record<string, { action: string; leverage: string; template: string }> = {
  'Foundation Issues': {
    action: 'Request Amendment — Price Reduction',
    leverage: '🔴 High — structural issues are material and affect lendability',
    template: 'Buyer requests $X price reduction in lieu of seller repairs due to foundation concerns identified in independent structural engineering report dated [date].',
  },
  'Roof Damage': {
    action: 'Request Seller Repair OR Credit at Closing',
    leverage: '🟡 Medium-High — insurance and lending concerns apply',
    template: 'Seller to provide documentation of roof repair by licensed contractor prior to closing, or $X closing cost credit.',
  },
  'HVAC Failure': {
    action: 'Require Replacement Before Closing',
    leverage: '🟡 Medium — life safety and habitability issue',
    template: 'Seller to replace failed [unit] HVAC system with comparable system prior to closing. Buyer to approve replacement equipment.',
  },
  'Plumbing Leak': {
    action: 'Request Repair by Licensed Plumber',
    leverage: '🟡 Medium — depends on severity and location',
    template: 'Seller to repair [specific plumbing issue] by TREC licensed plumber and provide paid invoice prior to closing.',
  },
  'Cosmetic Only': {
    action: 'Accept As-Is or Walk Away Gracefully',
    leverage: '🟢 Low — cosmetic items rarely support renegotiation',
    template: 'Buyer accepts property in current condition. No repairs requested.',
  },
  'Pool Issues': {
    action: 'Request Credit or Repair of Equipment',
    leverage: '🟡 Medium — equipment failure = clear dollar value',
    template: 'Seller to credit Buyer $X at closing for pool [pump/heater/electrical bonding] repair per pool inspection report.',
  },
  'Multiple Major Issues': {
    action: 'Price Reduction + Repair Combination or Walk',
    leverage: '🔴 Very High — multiple material defects = strong exit or renegotiation',
    template: 'Buyer requests $X price reduction and repair of [critical items] prior to closing. Failure to agree will result in cancellation under option period.',
  },
};

export default function DFWOptionPeriodGuide2026() {
  const [finding, setFinding] = useState('');
  const strategy = finding ? strategies[finding] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📅</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '0 0 8px' }}>DFW Option Period Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Texas option period explained + inspection-driven negotiation strategies</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[
            { icon: '⏱️', label: 'Standard Duration', value: '7–10 Days' },
            { icon: '💵', label: 'Option Fee (Non-Refundable)', value: '$100–500' },
            { icon: '🚪', label: 'Cancel Right', value: 'Unrestricted' },
            { icon: '📋', label: 'Amendment Deadline', value: 'Before Option Expires' },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{stat.icon}</div>
              <div style={{ color: '#64748b', fontSize: 12, marginBottom: 4 }}>{stat.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 14px' }}>✅ What You CAN Do During Option Period</h2>
          {['Cancel for ANY reason — no explanation required', 'Conduct any inspections (general, foundation, pool, septic, well)', 'Submit Amendment to Contract requesting repairs or price reduction', 'Request seller disclosure updates', 'Renegotiate any contract term by mutual agreement'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: '1px solid #1e3a5f', color: '#cbd5e1', fontSize: 13 }}>
              <span style={{ color: '#22c55e' }}>✓</span><span>{item}</span>
            </div>
          ))}
          <h2 style={{ color: '#ef4444', fontSize: 16, margin: '14px 0 10px' }}>❌ What You CANNOT Do</h2>
          {['Recover option fee if you cancel (it is non-refundable to seller)', 'Extend option period unilaterally — requires seller agreement', 'Make repairs yourself without seller written consent'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: '1px solid #1e3a5f', color: '#cbd5e1', fontSize: 13 }}>
              <span style={{ color: '#ef4444' }}>✗</span><span>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 14px' }}>🧠 Inspection Finding → Negotiation Strategy</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {Object.keys(strategies).map(f => (
              <button key={f} onClick={() => setFinding(f)}
                style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid', cursor: 'pointer', fontSize: 12,
                  borderColor: finding === f ? '#F5E642' : '#334155', background: finding === f ? '#F5E642' : 'transparent',
                  color: finding === f ? '#0A1628' : '#94a3b8', fontWeight: finding === f ? 700 : 400 }}>
                {f}
              </button>
            ))}
          </div>
          {strategy && (
            <div style={{ background: '#0d1e36', borderRadius: 10, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 10 }}>🎯 {strategy.action}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>Leverage: {strategy.leverage}</div>
              <div style={{ background: '#112240', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#64748b', fontSize: 11, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Amendment Template Language:</div>
                <div style={{ color: '#e2e8f0', fontSize: 13, fontStyle: 'italic' }}>{strategy.template}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, margin: '0 0 10px' }}>📌 Extending the Option Period</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10 }}>Need more time? Both parties must agree in writing. Submit extension request early — don't wait until day 9. Sellers may require additional option fee for extended period.</p>
          <div style={{ background: '#0d1e36', borderRadius: 8, padding: 12 }}>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Pro Tip</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Book your foundation inspector on Day 1 — they're the hardest to schedule and the most important. Everything else can cascade from their report.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
