import { useState } from 'react';

const findings = [
  { label: 'Foundation cracks (active)', credit: '$8K–$25K', leverage: 'High', strategy: 'Demand repair credit or price reduction. Get contractor estimates before submitting. Foundation issues are DFW\'s #1 negotiation lever.' },
  { label: 'HVAC over 12 years old', credit: '$4K–$10K', leverage: 'High', strategy: 'Request replacement credit. DFW summers make this non-negotiable for buyers. Sellers often settle at $5–7K.' },
  { label: 'Roof damage or aging shingles', credit: '$6K–$18K', leverage: 'High', strategy: 'Get two roofing bids, submit the higher one. Sellers typically split the difference or offer closing cost credit.' },
  { label: 'Plumbing issues / galvanized pipes', credit: '$2K–$8K', leverage: 'Medium', strategy: 'Specify exact items only. Focus on sewer scope results if available. Avoid broad plumbing credit language.' },
  { label: 'Outdated electrical panel', credit: '$3K–$6K', leverage: 'Medium', strategy: 'Frame as insurance requirement. Many DFW insurers won\'t cover pre-2000 panels — strong negotiation position.' },
  { label: 'Minor cosmetic issues only', credit: '$0–$1K', leverage: 'Low', strategy: 'Do not over-negotiate cosmetics. DFW sellers in 2026 will walk if you nitpick paint and carpet in a well-maintained home.' },
];

const signals = [
  { icon: '⏰', signal: 'Listed 30+ days', meaning: 'Seller is anxious — push harder on credits' },
  { icon: '📉', signal: 'Price reduced before your offer', meaning: 'Already motivated — ask for 2–3% more than you planned' },
  { icon: '🏚️', signal: 'Vacant / seller already moved', meaning: 'Carrying two mortgages — credit requests get approved faster' },
  { icon: '⚠️', signal: 'Listing says as-is', meaning: 'Seller knows issues exist — price accordingly and still inspect' },
  { icon: '🔻', signal: 'Multiple price drops', meaning: 'Market has rejected this home — negotiate aggressively' },
];

export default function DFWHomePriceNegotiationGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showMotivation, setShowMotivation] = useState(false);

  const finding = findings.find(f => f.label === selected);

  const leverageColor = (lev: string) => lev === 'High' ? '#F5E642' : lev === 'Medium' ? '#f97316' : '#64748b';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW REAL ESTATE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🤝 DFW Home Price Negotiation Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          In 2026, DFW sits in a balanced-to-buyer market. Inspection findings are your primary leverage.
          Appraisal gaps are your biggest risk. Know the difference between a repair credit and a price reduction —
          one hits the seller's net, the other reduces your loan amount.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Inspection Finding — Negotiation Strategy</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>Select what your inspection found:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {findings.map(f => (
              <button
                key={f.label}
                onClick={() => setSelected(selected === f.label ? null : f.label)}
                style={{
                  background: selected === f.label ? '#1a3a5c' : '#0d2035',
                  border: `2px solid ${selected === f.label ? leverageColor(f.leverage) : 'transparent'}`,
                  color: '#fff', borderRadius: 8, padding: '10px 14px', cursor: 'pointer',
                  textAlign: 'left', fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}
              >
                <span>{f.label}</span>
                <span style={{ fontSize: 11, color: leverageColor(f.leverage), fontWeight: 700 }}>{f.leverage} Leverage</span>
              </button>
            ))}
          </div>
          {finding && (
            <div style={{ background: '#1a3a5c', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20, marginBottom: 6 }}>Ask for: {finding.credit}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}>{finding.strategy}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, margin: 0 }}>🎯 Seller Motivation Signals</h2>
            <button onClick={() => setShowMotivation(!showMotivation)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
              {showMotivation ? 'Hide' : 'Show'}
            </button>
          </div>
          {showMotivation && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {signals.map(s => (
                <div key={s.signal} style={{ background: '#1a3a5c', borderRadius: 8, padding: 12, display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: 24, minWidth: 32 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{s.signal}</div>
                    <div style={{ color: '#94a3b8', fontSize: 12 }}>{s.meaning}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>💡 Repair Credit vs Price Reduction</h2>
          {[
            'Repair credit: seller gives you cash at closing — you keep your loan amount the same',
            'Price reduction: lower purchase price — reduces your loan but also lowers your tax basis',
            'In DFW 2026 — repair credits are easier to get than price reductions in most zip codes',
            'Sellers prefer credits because it shows up as full-price sale in MLS comps',
          ].map(t => (
            <div key={t} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid #F5E642' }}>{t}</div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>🔨 Get ProLnk Repair Estimates for Your Credit Ask</div>
          <div style={{ color: '#1a3a5c', fontSize: 13, marginTop: 6 }}>Real contractor quotes strengthen your negotiation position</div>
        </div>
      </div>
    </div>
  );
}
