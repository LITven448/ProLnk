import { useState } from 'react';

const loanTypes = [
  {
    id: 'greensky',
    label: 'GreenSky',
    icon: '🟢',
    rate: '0%–9.99% APR',
    term: '12–84 months',
    bestFor: 'Homeowners using a GreenSky-enrolled DFW contractor',
    trap: '0% promo ends → deferred interest adds up to 26% retroactively if not paid off',
    trueCost: '$8,000 system → $10,600 if not paid in promo period',
    verdict: '✅ Great if you pay off before promo ends. Dangerous if you carry a balance.',
    dfwNote: 'Many DFW HVAC contractors use GreenSky — ask upfront if enrolled',
  },
  {
    id: 'synchrony',
    label: 'Synchrony Home',
    icon: '🔵',
    rate: '0%–28.99% APR',
    term: '6–60 months',
    bestFor: 'Quick approval, many DFW contractors accept it',
    trap: 'High ongoing APR after promo; easy to get approved for more than you need',
    trueCost: '$8,000 at 26.99% over 36 months = ~$11,400 total',
    verdict: '⚠️ Use only for short promos you are certain to pay off',
    dfwNote: 'Widely available at DFW box stores and some contractors',
  },
  {
    id: 'heloc',
    label: 'HELOC',
    icon: '🏦',
    rate: 'Prime + 0.5% (~8–9% in 2025)',
    term: '10-year draw + 20-year repay',
    bestFor: 'DFW homeowners with equity who want lowest true cost',
    trap: 'Variable rate — if rates rise, payments increase; uses home as collateral',
    trueCost: '$8,000 at 8.5% over 5 years = ~$9,800 — best option for most',
    verdict: '✅ Best long-term option for DFW homeowners with 20%+ equity',
    dfwNote: 'DFW home appreciation means most owners have significant equity to tap',
  },
  {
    id: 'personal',
    label: 'Personal Loan',
    icon: '📋',
    rate: '7%–25% APR',
    term: '24–84 months',
    bestFor: 'No home equity, need fixed payments, good credit',
    trap: 'Higher rates than HELOC; no tax deduction',
    trueCost: '$8,000 at 14% over 48 months = ~$10,600',
    verdict: '⚠️ Use if HELOC is not available; shop at least 3 lenders',
    dfwNote: 'Credit unions in DFW (Texell, Amplify) often beat bank rates by 2–4%',
  },
];

export default function DFWHVACLoanGuide() {
  const [selected, setSelected] = useState(loanTypes[0]);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40 }}>💳</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>
            DFW HVAC Loan Guide
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW-specific HVAC financing — what to use, what to avoid</p>
        </div>

        <div style={{ background: '#1a1a2e', border: '1px solid #ef4444', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: 6 }}>⚠️ The 0% Financing Trap</div>
          <div style={{ color: '#94a3b8', fontSize: 13 }}>
            "0% for 18 months" sounds great until the promo ends. Most DFW contractors offer deferred-interest financing — if you carry any balance after the promo, you pay ALL the interest from day one retroactively. Always read the fine print.
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24, justifyContent: 'center' }}>
          {loanTypes.map(l => (
            <button
              key={l.id}
              onClick={() => setSelected(l)}
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                border: '2px solid',
                borderColor: selected.id === l.id ? '#F5E642' : '#1e3a5f',
                background: selected.id === l.id ? '#F5E642' : '#112240',
                color: selected.id === l.id ? '#0A1628' : '#94a3b8',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              {l.icon} {l.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 14, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>{selected.icon} {selected.label}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 14 }}>
              <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>📊 RATE RANGE</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{selected.rate}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 14 }}>
              <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>📅 TERM</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{selected.term}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 14 }}>
              <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>✅ BEST FOR</div>
              <div style={{ fontSize: 14 }}>{selected.bestFor}</div>
            </div>
            <div style={{ background: '#3a1a1a', borderRadius: 10, padding: 14 }}>
              <div style={{ color: '#ef4444', fontSize: 11, marginBottom: 4 }}>⚠️ THE TRAP</div>
              <div style={{ fontSize: 14 }}>{selected.trap}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 14 }}>
              <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>💰 TRUE COST EXAMPLE</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{selected.trueCost}</div>
            </div>
            <div style={{ background: '#0d2137', borderRadius: 10, padding: 14 }}>
              <div style={{ color: '#F5E642', fontSize: 11, marginBottom: 4 }}>🌡️ DFW-SPECIFIC NOTE</div>
              <div style={{ fontSize: 14 }}>{selected.dfwNote}</div>
            </div>
            <div style={{ background: '#1a3a1a', border: '1px solid #22c55e', borderRadius: 10, padding: 14 }}>
              <div style={{ color: '#22c55e', fontSize: 13, fontWeight: 700 }}>{selected.verdict}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>
            💰 Get HVAC quotes from TrustyPro-verified DFW contractors — compare financing options included
          </p>
          <div style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: 14 }}>
            Compare DFW HVAC Financing
          </div>
        </div>
      </div>
    </div>
  );
}
