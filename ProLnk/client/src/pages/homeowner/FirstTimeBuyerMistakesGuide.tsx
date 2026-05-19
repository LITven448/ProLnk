import { useState } from 'react';

const mistakes = [
  {
    id: 1,
    title: "Not getting pre-approved BEFORE house hunting",
    detail: "Losing deals because you weren't ready. Sellers in DFW routinely reject offers without pre-approval letters.",
    recovery: "Get pre-approved today — takes 24-48h and costs nothing. Choose a lender who can close in 21 days.",
  },
  {
    id: 2,
    title: "Skipping the inspection to 'win' the offer",
    detail: "Never do this in DFW. Foundation issues, HVAC failures, and roof replacements regularly cost $15,000–$60,000.",
    recovery: "Always include inspection contingency. Offer a shorter option period (5 days) instead of waiving it.",
  },
  {
    id: 3,
    title: "Ignoring flood zone status",
    detail: "DFW has significant flood-prone areas. Flood insurance adds $1,500–$4,000/year to your costs.",
    recovery: "Check FEMA flood maps for every property before making an offer. Ask your agent for the flood zone certificate.",
  },
  {
    id: 4,
    title: "Not understanding the option period",
    detail: "You have 7–10 days. Many buyers waste the first 3 days before hiring an inspector.",
    recovery: "Book your inspector BEFORE going under contract so they're ready day one. Use every hour of your option period.",
  },
  {
    id: 5,
    title: "Waiving the appraisal contingency",
    detail: "If the home doesn't appraise, you owe the difference in cash at closing — often $10,000–$30,000.",
    recovery: "Only waive if you have verified cash reserves to cover the gap. Never waive blindly to win a bid.",
  },
  {
    id: 6,
    title: "Moving money before closing",
    detail: "Lenders re-check your finances 24–48h before closing. Transferring funds triggers red flags and can kill the loan.",
    recovery: "Freeze all account activity after going under contract. Don't open new accounts, move large sums, or make big purchases.",
  },
  {
    id: 7,
    title: "Buying too much house on variable rate",
    detail: "DFW property taxes average 2.1–2.8% of value + homeowners insurance adds $500–$1,000/month to your payment.",
    recovery: "Calculate your total PITI (principal, interest, taxes, insurance) before budgeting — not just the sticker price.",
  },
  {
    id: 8,
    title: "Ignoring HOA docs during option period",
    detail: "Some HOAs restrict short-term rental, pets, parking structures, and exterior modifications.",
    recovery: "Request CC&Rs, bylaws, and meeting minutes on day one. Review them before your option period expires.",
  },
  {
    id: 9,
    title: "Not considering resale",
    detail: "Homes in poor school districts sell slower and appreciate less — even if you have no kids.",
    recovery: "Always check school district ratings. The top 10 DFW districts consistently outperform on resale value.",
  },
  {
    id: 10,
    title: "Failing to scan with TrustyPro before option period expires",
    detail: "Traditional inspectors check systems — TrustyPro's visual AI finds what inspectors miss: hidden moisture, foundation micro-cracks, early mold signatures.",
    recovery: "Schedule a TrustyPro scan on day one of your option period. It's the last line of defense before you're committed.",
  },
];

const recoveryActions: Record<number, string> = {
  1: "Action: Contact 2 lenders today. Get pre-approval letters in hand before your next showing.",
  2: "Action: Find a local DFW inspector with foundation certification. Book them now, before you need them.",
  3: "Action: Go to msc.fema.gov and check your target zip codes right now.",
  4: "Action: Ask your agent to build a 5-day option period into your next offer with a day-one inspection.",
  5: "Action: Ask your lender: 'What is the maximum appraisal gap I can cover from savings?' Know your number.",
  6: "Action: Tell your bank you're in an active home purchase. Pause all transfers until after closing.",
  7: "Action: Use a DFW mortgage calculator that includes estimated tax rate. Recalculate your max budget.",
  8: "Action: Add HOA doc review to your option period checklist. Flag any restriction that affects your plans.",
  9: "Action: Filter your home search to only include top-rated school districts, even if schools aren't relevant to you.",
  10: "Action: Join the TrustyPro waitlist now so you're ready for your next purchase.",
};

export default function FirstTimeBuyerMistakesGuide() {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [showResults, setShowResults] = useState(false);

  const toggle = (id: number) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const checkedList = Array.from(checked).sort((a, b) => a - b);

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px 0′ }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>🏠</div>
          <h1 style={{ fontSize: 'clamp(26px,4vw,42px)', fontWeight: 800, color: '#f1f5f9', margin: '0 0 16px', lineHeight: 1.15 }}>
            DFW First-Time Buyer Mistakes<br />Don't Learn These the Hard Way
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 620, margin: '0 auto' }}>
            The Dallas-Fort Worth market moves fast. These are the 10 mistakes that cost buyers the most — in money, time, and regret.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
          {mistakes.map(m => {
            const isChecked = checked.has(m.id);
            return (
              <div
                key={m.id}
                onClick={() => toggle(m.id)}
                style={{
                  background: isChecked ? '#1e293b' : '#1e293b',
                  border: `2px solid ${isChecked ? '#ef4444' : '#334155'}`,
                  borderRadius: 14,
                  padding: '22px 24px',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: isChecked ? '#ef4444′ : '#0f172a',
                    border: `2px solid ${isChecked ? '#ef4444' : '#475569'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: 2, fontSize: 16, color: '#fff',
                  }}>
                    {isChecked ? '✓' : ''}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>#{m.id}</span>
                      <span style={{ fontWeight: 700, fontSize: 16, color: '#f1f5f9′ }}>{m.title}</span>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{m.detail}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {checked.size > 0 && (
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <button
              onClick={() => setShowResults(r => !r)}
              style={{
                background: '#3b82f6', color: '#fff', border: 'none',
                borderRadius: 10, padding: '14px 32px', fontSize: 16,
                fontWeight: 700, cursor: 'pointer',
              }}
            >
              {showResults ? 'Hide Recovery Plan' : `See Recovery Actions for ${checked.size} Mistake${checked.size > 1 ? 's' : ''} You Checked`}
            </button>
          </div>
        )}

        {showResults && checked.size > 0 && (
          <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 48, border: '1px solid #334155′ }}>
            <h2 style={{ color: '#f1f5f9', fontSize: 20, fontWeight: 800, margin: '0 0 24px' }}>
              📋 Your Personalized Recovery Plan
            </h2>
            {checkedList.map(id => {
              const m = mistakes.find(x => x.id === id)!;
              return (
                <div key={id} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #0f172a' }}>
                  <div style={{ color: '#ef4444', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Mistake #{id}: {m.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{recoveryActions[id]}</div>
                </div>
              );
            })}
            <div style={{ color: '#64748b', fontSize: 13, marginTop: 8 }}>
              {checked.has(10) && (
                <div style={{ background: '#0f172a', borderRadius: 10, padding: 16, marginTop: 12 }}>
                  <span style={{ color: '#3b82f6', fontWeight: 700 }}>TrustyPro Tip: </span>
                  <span style={{ color: '#94a3b8′ }}>Mistake #10 is the one most buyers can’t undo. Once your option period expires, you own whatever the inspector missed. Join the waitlist before your next purchase.</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)', borderRadius: 20, padding: '48px 36px', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🛡️</div>
          <h2 style={{ color: '#fff', fontSize: 26, fontWeight: 800, margin: '0 0 12px' }}>TrustyPro Protects You from Mistake #10</h2>
          <p style={{ color: '#bfdbfe', fontSize: 16, margin: '0 0 28px', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
            AI-powered visual inspection catches what standard inspectors miss — foundation micro-movement, hidden moisture, early mold — all during your option period.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{
              display: 'inline-block', background: '#fff', color: '#1d4ed8',
              fontWeight: 800, fontSize: 16, padding: '14px 36px',
              borderRadius: 10, textDecoration: 'none',
            }}
          >
            Join TrustyPro Waitlist →
          </a>
        </div>
      </div>
    </div>
  );
}
