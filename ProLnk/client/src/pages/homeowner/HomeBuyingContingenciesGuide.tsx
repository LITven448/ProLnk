import { useState } from 'react';

type Situation = {
  label: string;
  recommended: string[];
  warnings: string[];
};

const situations: Record<string, Situation> = {
  first: {
    label: 'First-time buyer, financing with a mortgage',
    recommended: ['Option Period', 'Inspection Contingency', 'Financing Contingency', 'Appraisal Contingency'],
    warnings: ['Never waive the option period as a first-time buyer — you need that exit ramp.'],
  },
  competitive: {
    label: 'Competitive market (Frisco / Plano / McKinney bidding war)',
    recommended: ['Option Period', 'Inspection Contingency', 'Financing Contingency'],
    warnings: ['Consider waiving appraisal only if you have cash to cover a gap AND this is your dream home.', 'Never waive inspection in DFW — foundation and HVAC risks are too high.'],
  },
  cash: {
    label: 'Paying cash (no mortgage)',
    recommended: ['Option Period', 'Inspection Contingency'],
    warnings: ['You can waive financing and appraisal since there’s no lender involved.', 'Still use the option period — it’s your best protection for any reason.'],
  },
  selling: {
    label: 'Need to sell current home first',
    recommended: ['Option Period', 'Inspection Contingency', 'Financing Contingency', 'Sale Contingency'],
    warnings: ['Sale contingencies are frequently rejected in hot DFW markets.', 'Consider a bridge loan to avoid the sale contingency — it makes your offer much stronger.', 'Talk to a lender about gap financing before making offers.'],
  },
};

const contingencyDetails = [
  {
    name: 'Option Period Contingency',
    icon: '🛡️',
    cost: '$200–$500 option fee',
    duration: '7–10 days typical',
    protection: 'Texas-specific. Pay a small option fee and get the right to cancel the contract for ANY reason during the option period. Non-refundable, but applied to purchase price if you proceed.',
    verdict: 'ALWAYS USE THIS',
    verdictColor: '#10b981',
  },
  {
    name: 'Inspection Contingency',
    icon: '🔍',
    cost: '$350–$600 inspection fee',
    duration: 'Usually within option period in Texas',
    protection: 'Right to have the home professionally inspected. In Texas, this is typically handled during the option period. Gives you the right to negotiate repairs or credits.',
    verdict: 'NEVER WAIVE IN DFW',
    verdictColor: '#ef4444',
  },
  {
    name: 'Financing Contingency',
    icon: '🏦',
    cost: 'No fee',
    duration: '21–30 days',
    protection: 'Sale is contingent on receiving mortgage approval. If your lender denies the loan, you can exit without losing your earnest money. Critical for most buyers.',
    verdict: 'Usually Keep',
    verdictColor: '#f59e0b',
  },
  {
    name: 'Appraisal Contingency',
    icon: '📊',
    cost: '$500–$700 appraisal fee',
    duration: 'Typically 2–3 weeks',
    protection: 'Sale contingent on the home appraising at or above the purchase price. Without it, if the home appraises low, you pay the difference — potentially tens of thousands.',
    verdict: 'Situational',
    verdictColor: '#a78bfa',
  },
  {
    name: 'Sale Contingency',
    icon: '🔄',
    cost: 'No fee',
    duration: 'Tied to your home sale timeline',
    protection: 'Your purchase is contingent on your current home selling. Protects you from owning two homes — but sellers in hot DFW markets frequently reject offers with this contingency.',
    verdict: 'Rarely Accepted in DFW',
    verdictColor: '#f87171',
  },
];

export default function HomeBuyingContingenciesGuide() {
  const [selectedSituation, setSelectedSituation] = useState<string>('');

  const advice = selectedSituation ? situations[selectedSituation] : null;

  return (
    <div style={{ background: '#0a0a0a', color: '#e5e7eb', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 12, fontSize: 13, color: '#6b7280′ }}>
          🏠 ProLnk Homeowner Resource — DFW Edition
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 700, color: '#f9fafb', lineHeight: 1.2, marginBottom: 16 }}>
          DFW Home Buying Contingencies Guide
        </h1>
        <p style={{ fontSize: 18, color: '#9ca3af', marginBottom: 48 }}>
          Know Your Protections — What Every DFW Buyer Must Understand Before Making an Offer
        </p>

        {/* What is a contingency */}
        <section style={{ marginBottom: 48, background: '#111827', borderRadius: 12, padding: 28, border: '1px solid #1f2937′ }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f3f4f6', marginBottom: 12 }}>
            📋 What Is a Contingency?
          </h2>
          <p style={{ color: '#9ca3af', lineHeight: 1.7, marginBottom: 16 }}>
            A contingency is a condition that must be met for the home sale to proceed. If the condition is not satisfied, the buyer has the right to exit the contract without losing their earnest money deposit.
          </p>
          <div style={{ background: '#0d1f33', borderRadius: 8, padding: 16, borderLeft: '4px solid #3b82f6′ }}>
            <span style={{ color: '#93c5fd', fontWeight: 600 }}>Texas-Specific Note: </span>
            <span style={{ color: '#d1d5db', fontSize: 14 }}>Texas has some of the strongest buyer protections in the country — particularly the Option Period, which gives you the right to back out for any reason. Most other states do not have this. Use it every time.</span>
          </div>
        </section>

        {/* Contingency details */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f3f4f6', marginBottom: 24 }}>
            🔐 DFW Standard Contingencies Explained
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {contingencyDetails.map(c => (
              <div key={c.name} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 12, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{c.icon}</span>
                    <span style={{ fontWeight: 700, color: '#f3f4f6', fontSize: 17 }}>{c.name}</span>
                  </div>
                  <span style={{ background: '#0a0a0a', border: `1px solid ${c.verdictColor}`, color: c.verdictColor, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                    {c.verdict}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 24, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 13, color: '#6b7280′ }}>💵 {c.cost}</span>
                  <span style={{ fontSize: 13, color: '#6b7280′ }}>⏱️ {c.duration}</span>
                </div>
                <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{c.protection}</p>
              </div>
            ))}
          </div>
        </section>

        {/* When to waive */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f3f4f6', marginBottom: 24 }}>
            ⚖️ When to Waive (and When Not To)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            <div style={{ background: '#0d2f1a', border: '1px solid #166534', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#86efac', marginBottom: 12 }}>✅ Safer to Waive</div>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#9ca3af', lineHeight: 2, fontSize: 14 }}>
                <li>Appraisal — if you have cash to cover any gap and you're in a bidding war</li>
                <li>Financing contingency — if paying all cash</li>
                <li>Short option period — can negotiate shorter but NEVER zero days</li>
              </ul>
            </div>
            <div style={{ background: '#2d1515', border: '1px solid #991b1b', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#fca5a5', marginBottom: 12 }}>🚫 Never Waive in DFW</div>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#9ca3af', lineHeight: 2, fontSize: 14 }}>
                <li>Inspection contingency — DFW foundation, HVAC, and roof risks are too high</li>
                <li>Option period entirely — it's your core exit right</li>
                <li>Financing without cash reserves to close regardless</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Interactive Advisor */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f3f4f6', marginBottom: 8 }}>
            🧭 Contingency Advisor
          </h2>
          <p style={{ color: '#9ca3af', marginBottom: 24, fontSize: 15 }}>
            Select your buying situation to see recommended contingencies.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {Object.entries(situations).map(([key, sit]) => (
              <button
                key={key}
                onClick={() => setSelectedSituation(key)}
                style={{
                  background: selectedSituation === key ? '#1e3a5f' : '#111827',
                  border: selectedSituation === key ? '2px solid #3b82f6′ : '2px solid #1f2937',
                  borderRadius: 10,
                  padding: '14px 20px',
                  color: selectedSituation === key ? '#93c5fd' : '#d1d5db',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                {sit.label}
              </button>
            ))}
          </div>

          {advice && (
            <div style={{ background: '#0d1f33', border: '1px solid #1e40af', borderRadius: 12, padding: 24 }}>
              <div style={{ fontWeight: 700, color: '#93c5fd', marginBottom: 16 }}>✅ Recommended Contingencies</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                {advice.recommended.map(r => (
                  <span key={r} style={{ background: '#1e3a5f', color: '#bfdbfe', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                    {r}
                  </span>
                ))}
              </div>
              {advice.warnings.length > 0 && (
                <div>
                  <div style={{ fontWeight: 700, color: '#fbbf24', marginBottom: 12 }}>⚠️ Important Warnings</div>
                  <ul style={{ margin: 0, paddingLeft: 20, color: '#d1d5db', lineHeight: 1.8, fontSize: 14 }}>
                    {advice.warnings.map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #1e1b4b)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#f9fafb', marginBottom: 12 }}>
            Use Your Option Period Wisely
          </h3>
          <p style={{ color: '#9ca3af', marginBottom: 24, maxWidth: 440, margin: '0 auto 24px' }}>
            Get a TrustyPro AI home scan during your option period. Know exactly what you're buying before your window closes.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{ display: 'inline-block', background: '#2563eb', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Get a TrustyPro Scan
          </a>
        </div>
      </div>
    </div>
  );
}
